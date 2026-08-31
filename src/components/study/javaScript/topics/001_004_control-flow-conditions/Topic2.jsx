import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import demoCode from "./topic2_files/TheTernaryOperatorDemo.js?raw";

/**
 * Topic2 – The Ternary Operator (condition ? exprIfTrue : exprIfFalse)
 * Module: 001_004_control-flow-conditions
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
export default function Topic2() {
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
            <span>Module 001_004_control-flow-conditions · Topic 2</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"The Ternary Operator (condition ? exprIfTrue : exprIfFalse)"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master inline expression conditionals, JSX rendering patterns, and avoiding unreadable nested ternaries.
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
              Mastering <strong className="text-amber-300">Ternary Operator</strong> empowers developers to architect clear, bug-free, and high-performance control flow trees. In enterprise JavaScript applications, clean conditional logic determines how state transitions occur, how errors are guarded against, and how business rules execute.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              By structuring decisions with flat guard clauses and explicit boolean expressions, developers prevent cyclomatic complexity bloat, reduce cognitive load during code reviews, and ensure full unit test coverage.
            </p>

            {/* Classroom Story */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During an intensive lab test, student <strong>Abhronila</strong> encountered a subtle architectural issue. Abhronila used an if/else block inside a React JSX return block and got a syntax error because if is a statement, not an expression. Sukanta Hui explained that the ternary operator is an expression returning a value, making it ideal for JSX.
              </p>
              <p>
                Mentor <strong>Sukanta Hui</strong> demonstrated the exact decision tree on the whiteboard, proving that understanding <em>Ternary Operator</em> produces maintainable and robust production applications.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Ternary Operator (Expression) vs If (Statement) Pipeline
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-auto" role="img" aria-label="The Ternary Operator (condition ? exprIfTrue : exprIfFalse) Architecture">
                <rect width="840" height="280" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="420" y="28" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  Ternary Operator (Expression) vs If (Statement) Pipeline
                </text>
                
                <g transform="translate(60, 50)">
                  <rect width="330" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="165" y="26" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✓ Ternary: Expression (Returns a Value)</text>
                  <rect x="15" y="42" width="300" height="120" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="25" y="68" fill="#a7f3d0" fontSize="11" fontFamily="monospace">const status = isAuth ? "Logged In" : "Guest";</text>
                  <text x="25" y="95" fill="#e2e8f0" fontSize="10">• Assignable directly to variables</text>
                  <text x="25" y="115" fill="#e2e8f0" fontSize="10">• Usable inside JSX: &lt;div&gt;&#123;ok ? &lt;A/&gt; : &lt;B/&gt;&#125;&lt;/div&gt;</text>
                  <text x="25" y="135" fill="#34d399" fontSize="10">Right-associative (a ? b : c ? d : e)</text>
                </g>

                <g transform="translate(440, 50)">
                  <rect width="340" height="180" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="170" y="26" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">❌ If / Else: Statement (No Direct Value)</text>
                  <rect x="15" y="42" width="310" height="120" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="25" y="68" fill="#fda4af" fontSize="11" fontFamily="monospace">let status; // Requires external mutator</text>
                  <text x="25" y="90" fill="#fda4af" fontSize="10" fontFamily="monospace">if (isAuth) status = "Logged In";</text>
                  <text x="25" y="110" fill="#fda4af" fontSize="10" fontFamily="monospace">else status = "Guest";</text>
                  <text x="25" y="135" fill="#f87171" fontSize="10">Cannot be embedded inside expression slots</text>
                </g>
    
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 2.1: Runtime decision branching, bytecode flow, and control architecture for Ternary Operator.
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
              The ECMAScript specification governs strict boolean coercion rules and jump table branch targets in the V8 engine. Understanding these invariants prevents edge-case pitfalls and performance regressions.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs font-mono">
                  <tr>
                    <th className="p-3 border border-slate-800">Decision Pattern</th>
                    <th className="p-3 border border-slate-800">ECMA Spec Abstract Operation</th>
                    <th className="p-3 border border-slate-800">V8 Engine Bytecode</th>
                    <th className="p-3 border border-slate-800">Developer Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs font-mono">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">if / else</td>
                    <td className="p-3 text-slate-300 font-sans">ToBoolean(GetValue(expr))</td>
                    <td className="p-3 text-amber-300 font-sans">JumpIfFalse / JumpIfTrue</td>
                    <td className="p-3 text-emerald-400 font-sans">Use early returns to flatten flow</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">switch / case</td>
                    <td className="p-3 text-slate-300 font-sans">Strict Equality (===) matching</td>
                    <td className="p-3 text-amber-300 font-sans">JumpTable / SwitchOnSmi</td>
                    <td className="p-3 text-emerald-400 font-sans">Wrap cases in &#123; &#125; to isolate scope</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Ternary (?:)</td>
                    <td className="p-3 text-slate-300 font-sans">Conditional Expression Evaluation</td>
                    <td className="p-3 text-amber-300 font-sans">Inline branch register write</td>
                    <td className="p-3 text-emerald-400 font-sans">Never nest ternaries beyond 1 level</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Traps to Avoid
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Assignment in Condition:</strong> Accidental <code className="text-slate-200">if (x = y)</code> sets <code className="text-slate-200">x</code> to <code className="text-slate-200">y</code> instead of comparing! Always use <code className="text-emerald-400">===</code>.</li>
                <li><strong className="text-amber-300">Semicolon After Header:</strong> Writing <code className="text-slate-200">if (condition);</code> creates an empty statement and executes the subsequent block unconditionally.</li>
                <li><strong className="text-sky-300">Empty Array Truthiness:</strong> <code className="text-slate-200">Boolean([]) === true</code>. Checking <code className="text-slate-200">if (arr)</code> does not test if the array has elements. Use <code className="text-emerald-400">if (arr.length &gt; 0)</code>.</li>
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
              title="TernaryOperatorDemo.js"
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
                <span>Anti-Pattern: Sprawling Else-If Ladders</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Writing 15 else-if branches creates high cognitive load and is difficult to maintain when business rules change.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Sprawling ladder
if (type === 'A') doA();
else if (type === 'B') doB();
else if (type === 'C') doC();`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: Map Lookup / Strategy</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Map discrete keys directly to handlers for O(1) performance and modular extension.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED:
const handlers = { A: doA, B: doB, C: doC };
(handlers[type] || doDefault)();`}
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
                  Conditional Object Property Embedding with Spread & Ternary
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              You can conditionally inject properties into an object literal using object spread and a ternary operator returning either the object or empty object.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET:
const user = {
  name: 'Swadeep',
  ...(isAdmin ? { role: 'superadmin', accessLevel: 9 } : {})
};`}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Reducing Indentation
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              How does enforcing the Early Return Pattern in code reviews improve team productivity and reduce merge conflict risks in large enterprise repositories?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Early returns eliminate deep nested block diffs across git commits, ensure preconditions are validated upfront, and allow engineers to read happy-path logic without mentally tracking open scopes.
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "Ternary Operator"}
            subtitle="Explore 25 comprehensive questions covering runtime mechanics, memory models, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "Ternary Operator"}
            downloadFileName="001_004_control-flow-conditions-topic2-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring at Coder & AccoTax in Barrackpore, I teach every junior engineer: flat code is clean code. Invert your if conditions, return early, validate inputs at the door, and your software architecture will stand the test of time."}
          />
        </section>

      </div>
    </>
  );
}
