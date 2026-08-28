import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import demoCode from "./topic5_files/TypeofOperatorBasicTypeCheckingDemo.js?raw";

/**
 * Topic5 – typeof Operator & Type Checking Quirks in JavaScript
 * Module: 001_002_javascript-syntax-and-basics
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
export default function Topic5() {
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
            <span>Module 001_002_javascript-syntax-and-basics · Topic 5</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"typeof Operator & Type Checking Quirks in JavaScript"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore the typeof operator, return string mappings, and historical quirks like typeof null === 'object'.
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
              <span>💡</span> Detailed Conceptual Foundation &amp; Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              Mastering <strong className="text-amber-300">typeof Operator</strong> provides the rock-solid foundation necessary for advanced JavaScript and TypeScript development. In high-scale web applications, subtle syntax nuances, type coercions, and lexical scoping rules dictate how the V8 engine allocates memory and compiles bytecode.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              By understanding the underlying ECMAScript formal specifications, engineers avoid silent runtime bugs, write clean idiomatic code, and pass rigorous technical architecture interviews.
            </p>

            {/* Classroom Story */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During an interactive lab session, student <strong>Tuhina</strong> encountered unexpected runtime behavior. Tuhina wrote if (typeof data === 'object') to validate that user input was a plain dictionary, but passing null crashed her app with TypeError: Cannot read properties of null. Sukanta Hui explained the historical 1995 V8 type-tag bug.
              </p>
              <p>
                Mentor <strong>Sukanta Hui</strong> demonstrated the step-by-step memory allocation on the whiteboard, showing how mastering <em>typeof Operator</em> guarantees deterministic code execution.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> typeof Return Type Decision Table & Null Tag Bug
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-auto" role="img" aria-label="typeof Operator & Type Checking Quirks in JavaScript Architecture">
                <rect width="840" height="280" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="420" y="28" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  typeof Return Type Decision Table & Null Tag Bug
                </text>
                
                <g transform="translate(60, 50)">
                  <rect width="340" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="170" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Standard typeof Return Types</text>
                  <rect x="15" y="42" width="310" height="120" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="25" y="65" fill="#e2e8f0" fontSize="10">• typeof 42 === "number"</text>
                  <text x="25" y="85" fill="#e2e8f0" fontSize="10">• typeof "hi" === "string" | typeof true === "boolean"</text>
                  <text x="25" y="105" fill="#e2e8f0" fontSize="10">• typeof undefined === "undefined"</text>
                  <text x="25" y="125" fill="#e2e8f0" fontSize="10">• typeof Symbol() === "symbol" | 10n === "bigint"</text>
                  <text x="25" y="145" fill="#e2e8f0" fontSize="10">• typeof function()&#123;&#125; === "function"</text>
                </g>

                <g transform="translate(440, 50)">
                  <rect width="340" height="180" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="170" y="26" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">⚠️ Historical Quirks &amp; Traps</text>
                  <rect x="15" y="42" width="310" height="120" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="25" y="68" fill="#fda4af" fontSize="11" fontFamily="monospace">typeof null === "object" // Type Tag 0x00</text>
                  <text x="25" y="92" fill="#fda4af" fontSize="11" fontFamily="monospace">typeof [1, 2] === "object" // Use Array.isArray</text>
                  <text x="25" y="116" fill="#fda4af" fontSize="11" fontFamily="monospace">typeof NaN === "number" // Not-A-Number is number!</text>
                  <text x="25" y="140" fill="#34d399" fontSize="10" fontWeight="bold">Safe Guard: val !== null &amp;&amp; typeof val === 'object'</text>
                </g>
    
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 5.1: Runtime execution pipeline, memory layout, and engine rules for typeof Operator.
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: DEEP TECHNICAL BREAKDOWN & SPECIFICATIONS ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Know-How &amp; Spec Invariants
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript specification governs strict lexical grammar and runtime type transitions. Understanding these low-level invariants ensures complete cross-engine compatibility across V8, SpiderMonkey, and JavaScriptCore.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs font-mono">
                  <tr>
                    <th className="p-3 border border-slate-800">Core Rule / Feature</th>
                    <th className="p-3 border border-slate-800">ECMAScript Spec Clause</th>
                    <th className="p-3 border border-slate-800">Engine Implementation</th>
                    <th className="p-3 border border-slate-800">Best Practice Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs font-mono">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Lexical Evaluation</td>
                    <td className="p-3 text-slate-300 font-sans">ECMA-262 Grammatical Grammar</td>
                    <td className="p-3 text-amber-300 font-sans">Ignition Scanner Tokenizer</td>
                    <td className="p-3 text-emerald-400 font-sans">Use strict mode ('use strict')</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Memory Allocation</td>
                    <td className="p-3 text-slate-300 font-sans">ExecutionContext Environment Records</td>
                    <td className="p-3 text-amber-300 font-sans">Call Stack Frame vs Heap Handle</td>
                    <td className="p-3 text-emerald-400 font-sans">Prefer const &gt; let &gt; avoid var</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Optimization Tier</td>
                    <td className="p-3 text-slate-300 font-sans">Type Invariants &amp; Feedback Vectors</td>
                    <td className="p-3 text-amber-300 font-sans">TurboFan Inline Caches (IC)</td>
                    <td className="p-3 text-emerald-400 font-sans">Keep data shapes monomorphic</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Traps to Avoid
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Coercion Drift:</strong> Using loose equality (<code className="text-amber-300">==</code>) triggers complex 12-step type conversion rules. Always use strict equality (<code className="text-emerald-400">===</code>).</li>
                <li><strong className="text-amber-300">Unintended Globals:</strong> In non-strict mode, assigning to an undeclared variable attaches it to the global <code className="text-slate-200">window</code> object.</li>
                <li><strong className="text-sky-300">Precision Traps:</strong> Financial numbers must never be summed directly as IEEE 754 floats. Use cents/integers or a BigInt/Decimal library.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: HANDS-ON MONACO CODE RUNNER ─────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <span>💻</span> Interactive Monaco Playground: Practical Working Examples
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
              Live In-Browser Execution
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <JavaScriptEditableCodeBlock
              initialCode={demoCode}
              title="TypeofOperatorDemo.js"
            />
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & SENIOR BEST PRACTICES ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: Implicit Coercion Assumptions</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Relying on implicit coercion in comparisons causes severe logic bugs across truthy/falsy edges.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID:
if (val == false) {
  // Matches 0, "", [], and false!
}`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: Strict Type Boundaries</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Always use strict equality and explicit type conversion guards.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED:
if (val === false) {
  // Strictly matches boolean false
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
                  Reliable Exact Type Inspection: Object.prototype.toString.call(val)
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              To distinguish between null, Array, Date, RegExp, and plain Object accurately, senior engineers use Object.prototype.toString.call(val).
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET:
const getType = val =&gt; Object.prototype.toString.call(val).slice(8, -1);
console.log(getType([]));     // 'Array'
console.log(getType(null));   // 'Null'
console.log(getType(new Date())); // 'Date'`}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Type Safety in Dynamic JavaScript
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              In a large distributed frontend team without a full TypeScript build pipeline, what architectural patterns guarantee runtime type safety across critical API gateways?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Implement schema validation layers (such as <code className="text-amber-300">Zod</code> or lightweight runtime assertion contracts) at the network boundary to validate incoming JSON before it enters application state.
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "typeof Operator"}
            subtitle="Explore 25 comprehensive questions covering runtime mechanics, memory models, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "typeof Operator"}
            downloadFileName="001_002_javascript-syntax-and-basics-topic5-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of training software engineers at Coder & AccoTax in Barrackpore, I always emphasize that JavaScript's dynamic flexibility is its greatest power and its greatest trap. Understand type coercion, scoping, and value representation deeply, and you will write unbreakable code."}
          />
        </section>

      </div>
    </>
  );
}
