import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import demoCode from "./topic3_files/LogicalOperatorsDemo.js?raw";

/**
 * Topic3 – Logical Operators in JavaScript (&&, ||, !)
 * Module: 001_003_operators-and-expressions
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
export default function Topic3() {
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
            <span>Module 001_003_operators-and-expressions · Topic 3</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Logical Operators in JavaScript (&&, ||, !)"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master short-circuit evaluation, default fallbacks, and boolean inversion mechanics in modern JavaScript.
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
              Mastering <strong className="text-amber-300">Logical Operators</strong> is fundamental for writing concise, reliable, and mathematically accurate JavaScript algorithms. In high-performance web applications, operator evaluations dictate CPU register utilization, expression precedence trees, and memory mutation patterns.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              By understanding how the ECMAScript runtime executes operator operands, engineers avoid unexpected side-effects, prevent precedence traps, and write self-documenting code.
            </p>

            {/* Classroom Story */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During a lab session, student <strong>Debangshu</strong> encountered a subtle logical glitch. Debangshu used const count = userCount || 10 for a cart item counter. When the user legitimately selected 0 items, count reset to 10 because 0 is falsy! Sukanta Hui explained why logical nullish coalescing (??) or explicit validation must be used for 0 and ''.
              </p>
              <p>
                Mentor <strong>Sukanta Hui</strong> demonstrated the exact step-by-step operand evaluation on the whiteboard, explaining why mastering <em>Logical Operators</em> eliminates ambiguity and prevents production regressions.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Short-Circuit Logical Evaluation Pipeline
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-auto" role="img" aria-label="Logical Operators in JavaScript (&&, ||, !) Architecture">
                <rect width="840" height="280" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="420" y="28" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  Short-Circuit Logical Evaluation Pipeline
                </text>
                
                <g transform="translate(60, 50)">
                  <rect width="330" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="165" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Logical AND (&amp;&amp;): First Falsy or Last Truthy</text>
                  <rect x="15" y="42" width="300" height="120" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="25" y="65" fill="#a7f3d0" fontSize="10" fontFamily="monospace">"apple" &amp;&amp; "banana" === "banana"</text>
                  <text x="25" y="85" fill="#f87171" fontSize="10" fontFamily="monospace">null &amp;&amp; "banana" === null (Stops early!)</text>
                  <text x="25" y="105" fill="#e2e8f0" fontSize="10">Short-circuit: Bypasses right side if left is falsy</text>
                  <text x="25" y="125" fill="#7dd3fc" fontSize="9">Used for conditional execution: isAuth &amp;&amp; renderUI()</text>
                </g>

                <g transform="translate(440, 50)">
                  <rect width="340" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="170" y="26" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Logical OR (||): First Truthy or Last Falsy</text>
                  <rect x="15" y="42" width="310" height="120" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="25" y="65" fill="#a7f3d0" fontSize="10" fontFamily="monospace">"apple" || "banana" === "apple" (Stops early!)</text>
                  <text x="25" y="85" fill="#fde68a" fontSize="10" fontFamily="monospace">"" || "default" === "default"</text>
                  <text x="25" y="105" fill="#f87171" fontSize="10">⚠️ Trap: 0 and false trigger fallback!</text>
                  <text x="25" y="125" fill="#34d399" fontSize="9" fontWeight="bold">Use ?? (Nullish Coalescing) when 0 is valid</text>
                </g>
    
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 3.1: Runtime execution lifecycle, memory flow, and operator evaluation rules for Logical Operators.
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
              The ECMAScript specification defines formal abstract operations (such as ToPrimitive, ToNumber, and SameValue) governing all operator expressions. Understanding these invariants prevents unexpected bugs.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs font-mono">
                  <tr>
                    <th className="p-3 border border-slate-800">Operator Class</th>
                    <th className="p-3 border border-slate-800">Associativity</th>
                    <th className="p-3 border border-slate-800">ECMA Spec Abstract Operation</th>
                    <th className="p-3 border border-slate-800">Developer Invariant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs font-mono">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Binary Operators</td>
                    <td className="p-3 text-slate-300 font-sans">Left-to-Right (except **)</td>
                    <td className="p-3 text-amber-300 font-sans">Evaluate(Left) -&gt; Evaluate(Right)</td>
                    <td className="p-3 text-emerald-400 font-sans">Avoid mutating same var in both operands</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Logical Short-Circuit</td>
                    <td className="p-3 text-slate-300 font-sans">Left-to-Right</td>
                    <td className="p-3 text-amber-300 font-sans">ToBoolean(Left) determines right eval</td>
                    <td className="p-3 text-emerald-400 font-sans">Use ?? instead of || when 0 is valid</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Assignments</td>
                    <td className="p-3 text-slate-300 font-sans">Right-to-Left</td>
                    <td className="p-3 text-amber-300 font-sans">PutValue(ref, value)</td>
                    <td className="p-3 text-emerald-400 font-sans">Use compound assignment for clarity</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Traps to Avoid
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Lexicographical String Comparison:</strong> Comparing two strings like <code className="text-slate-200">"10" &lt; "9"</code> evaluates to <code className="text-rose-300">true</code> because characters are compared by UTF-16 code point values.</li>
                <li><strong className="text-amber-300">Falsy Zero Fallback Trap:</strong> Using <code className="text-amber-300">||</code> with number zero (<code className="text-slate-200">0</code>) triggers fallback. Always use nullish coalescing (<code className="text-emerald-400">??</code>).</li>
                <li><strong className="text-sky-300">Operator Precedence Pitfalls:</strong> Never mix arithmetic and logical expressions without defensive parentheses.</li>
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
              title="LogicalOperatorsDemo.js"
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
                <span>Anti-Pattern: Ambiguous Operator Sequences</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Relying on implicit precedence across complex expressions makes code prone to misunderstandings.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID:
const isValid = a + b * c > d && e || f;`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: Defensive Grouping</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use explicit grouping parentheses to ensure mathematical and logical clarity.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED:
const isValid = (((a + (b * c)) > d) && e) || f;`}
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
                  Logical Operators Return Operands, NOT Booleans
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              In JavaScript, && and || do not return true/false; they return the actual evaluated operand value that resolved the short-circuit condition.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET:
const result = 'admin' && { role: 'super' };
console.log(result); // { role: 'super' } (Returns object!)`}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Performance &amp; Bitfields
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              When building high-frequency WebGL canvas renderers or physics engines in JavaScript, why do senior architects choose 32-bit bitwise flags over boolean objects?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Bitwise flags pack 32 separate boolean states into a single 4-byte CPU integer, eliminating object heap allocations and reducing garbage collector churn to zero.
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "Logical Operators"}
            subtitle="Explore 25 comprehensive questions covering runtime mechanics, memory models, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "Logical Operators"}
            downloadFileName="001_003_operators-and-expressions-topic3-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring at Coder & AccoTax in Barrackpore, I always teach students: operators are the arithmetic gears of your code. Write expressions so clearly that anyone reading your code understands the evaluation flow without needing to consult a precedence table."}
          />
        </section>

      </div>
    </>
  );
}
