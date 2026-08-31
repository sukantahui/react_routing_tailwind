import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import demoCode from "./topic6_files/StrictModeUseStrictMechanicsGlobalScopeLeakPreventionDemo.js?raw";

export default function Topic6() {
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
        
        {/* ─── 1. HEADER SECTION ──────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_001_getting-started-with-javascript · Topic 6</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Strict Mode ('use strict') Mechanics & Global Scope Leak Prevention"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate JavaScript silent bugs. Master how Strict Mode prevents accidental global leaks, secures <code>this</code> binding, enforces property immutability, and accelerates V8 TurboFan compilation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400">Course Code: JS-PRO-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* ─── 2. CONCEPT OVERVIEW ────────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span>💡</span> Detailed Discussion &amp; Strict Mode Evolution
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              Introduced in ECMAScript 5 (ES5), <strong className="text-amber-300">Strict Mode (<code>&apos;use strict&apos;</code>)</strong> was created to address historical language design flaws and prevent silent, hard-to-trace bugs. In legacy &quot;sloppy mode&quot;, JavaScript failed silently on numerous dangerous operations: assigning to undeclared variables created global properties on <code>window</code>, modifying read-only objects did nothing, and plain function calls coerced <code>this</code> to the global object.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              Strict Mode converts these silent failures into immediate, actionable exceptions (<code>ReferenceError</code>, <code>TypeError</code>, <code>SyntaxError</code>). Furthermore, by disallowing dynamic scope mutations (such as <code>with</code> statements and scope-leaking <code>eval()</code>), Strict Mode allows the V8 TurboFan compiler to generate faster, highly optimized machine code.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Naihati Lab):</span>
              </div>
              <p>
                Student <strong>Debangshu</strong> typed <code>studentMarks = 95</code> inside a function without a <code>let</code> or <code>const</code> declaration. In sloppy mode, this created a hidden global variable on <code>window.studentMarks</code> that silently corrupted calculations in other modules. Mentor <strong>Sukanta Hui</strong> demonstrated how adding <code>&apos;use strict&apos;</code> instantly threw a <code>ReferenceError: studentMarks is not defined</code>, catching the typo during testing rather than in production.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Sloppy Mode Global Leak vs Strict Mode Guard Architecture
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="Strict Mode Scope Guard">
                <defs>
                  <linearGradient id="smGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="smGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">Scope Architecture: Sloppy Mode Variable Leak vs Strict Mode Guard</text>

                {/* Left: Sloppy Mode Leak */}
                <g transform="translate(30, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">❌ Sloppy Mode (Legacy JavaScript)</text>

                  <rect x="20" y="40" width="330" height="38" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="58" fill="#fca5a5" fontSize="11">score = 98; // Missing let/const</text>
                  <text x="30" y="72" fill="#94a3b8" fontSize="9">Engine silently creates window.score = 98</text>

                  <rect x="20" y="88" width="330" height="75" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="110" fill="#f43f5e" fontSize="10" fontWeight="bold">Hazardous Silent Failures:</text>
                  <text x="30" y="128" fill="#94a3b8" fontSize="9">Pollutes global window scope across all files</text>
                  <text x="30" y="146" fill="#94a3b8" fontSize="9">this in plain function defaults to window (Security risk)</text>
                </g>

                {/* Right: Strict Mode Guard */}
                <g transform="translate(450, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✓ Strict Mode (&apos;use strict&apos; / ES Modules)</text>

                  <rect x="20" y="40" width="330" height="38" rx="6" fill="#0f172a" stroke="#059669" />
                  <text x="30" y="58" fill="#6ee7b7" fontSize="11">&apos;use strict&apos;; score = 98;</text>
                  <text x="30" y="72" fill="#34d399" fontSize="9">⚡ Throws: ReferenceError: score is not defined</text>

                  <rect x="20" y="88" width="330" height="75" rx="6" fill="url(#smGrad1)" stroke="#047857" />
                  <text x="30" y="110" fill="#ecfdf5" fontSize="10" fontWeight="bold">✓ Explicit Invariant Protection:</text>
                  <text x="30" y="128" fill="#d1fae5" fontSize="9">Forces explicit let/const declarations</text>
                  <text x="30" y="146" fill="#d1fae5" fontSize="9">this in plain function is undefined; TurboFan optimizes</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.7: Architectural contrast showing how Strict Mode halts silent leaks and enforces explicit bindings.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Strict Mode Invariants &amp; ECMAScript Specifications
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript specification defines formal execution invariants that are actively enforced when Strict Mode is enabled.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Syntax / Operation</th>
                    <th className="p-3 border border-slate-800">Sloppy Mode Behavior</th>
                    <th className="p-3 border border-slate-800">Strict Mode Behavior</th>
                    <th className="p-3 border border-slate-800">Thrown Error Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-amber-400 font-bold">Undeclared Var: x = 10</td>
                    <td className="p-3 text-slate-300 font-sans">Creates window.x property silently</td>
                    <td className="p-3 text-rose-400 font-sans">Throws immediately</td>
                    <td className="p-3 text-rose-400">ReferenceError</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">Mutate Object.freeze()</td>
                    <td className="p-3 text-slate-300 font-sans">Silent failure (property unchanged)</td>
                    <td className="p-3 text-rose-400 font-sans">Throws immediately</td>
                    <td className="p-3 text-rose-400">TypeError</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-purple-400 font-bold">Duplicate params: f(a, a)</td>
                    <td className="p-3 text-slate-300 font-sans">Allowed (second overwrites first)</td>
                    <td className="p-3 text-rose-400 font-sans">Throws at parse time</td>
                    <td className="p-3 text-rose-400">SyntaxError</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-bold">Plain function this</td>
                    <td className="p-3 text-slate-300 font-sans">Coerces to window / global</td>
                    <td className="p-3 text-emerald-400 font-sans">Remains undefined</td>
                    <td className="p-3 text-slate-400">None (Safe Binding)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Crucial Strict Mode Edge Cases
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Script Concatenation Trap:</strong> Placing <code>&quot;use strict&quot;;</code> at the top of a file that gets concatenated with non-strict legacy files forces the entire bundle into strict mode, potentially breaking third-party scripts.</li>
                <li><strong className="text-amber-300">Strict Mode in ES6:</strong> All ES6 Modules (<code>import/export</code>) and ES6 Classes are automatically strict. Manually adding <code>&quot;use strict&quot;</code> in React/Vite components is redundant.</li>
                <li><strong className="text-sky-300">Directive Placement:</strong> <code>&quot;use strict&quot;</code> must be the absolute first statement in a file or function; placing it after any variable declaration renders it ineffective.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 5. HANDS-ON MONACO CODE RUNNER ─────────────────────────── */}
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
              title="StrictModeUseStrictMechanicsGlobalScopeLeakPreventionDemo.js"
            />
          </div>
        </section>

        {/* ─── 6. COMMON PITFALLS & BEST PRACTICES ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: Global Unscoped Directive in Legacy Code</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Adding <code>&quot;use strict&quot;;</code> globally to an unbundled multi-script legacy project can cause unhandled exceptions in older plugins.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Top of monolithic legacy bundle
"use strict";
// Legacy plugins relying on sloppy 'this' will throw TypeError!`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: IIFE or Native ES Module Scoping</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Encapsulate strict mode within modern ES Modules or self-contained IIFEs to protect surrounding scripts.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Scoped and safe
(function() {
  "use strict";
  // Safe strict execution isolated from other scripts
})();`}</pre>
            </div>
          </div>
        </section>

        {/* ─── 7. 💎 JAVASCRIPT HIDDEN GEMS & PRO TRICKS ──────── */}
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
                  Runtime Strict Mode Detector Pattern
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              You can programmatically verify whether your current execution context is in Strict Mode by checking whether <code>this</code> evaluates to <code>undefined</code> inside an immediately invoked function expression.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Universal Strict Mode Detection Utility
const isStrictActive = (function() {
  return this === undefined;
})();
console.log("Is Current Context Strict?:", isStrictActive);`}</pre>
            </div>
          </div>
        </section>

        {/* ─── 8. THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Think About This...
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              If an object is frozen with <code>Object.freeze()</code>, why does mutating a property fail silently in sloppy mode, but throw a <code>TypeError</code> in strict mode?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: ECMAScript specification dictates that in non-strict mode, failing property assignments return <code>false</code> silently; in strict mode, failing the <code>[[Set]]</code> internal method throws an explicit <code>TypeError</code>!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · Strict Mode ('use strict') Mechanics"
            subtitle="Explore 25+ comprehensive questions on scoping, TypeError exceptions, and ES6 module defaults"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · Strict Mode ('use strict') Mechanics"
            downloadFileName="001_001_getting-started-with-javascript-topic6-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I teach that Strict Mode is the first line of defense against sloppy code. Always declare your variables explicitly with let and const, and let the engine protect you from global leaks."
          />
        </section>

      </div>
    </>
  );
}
