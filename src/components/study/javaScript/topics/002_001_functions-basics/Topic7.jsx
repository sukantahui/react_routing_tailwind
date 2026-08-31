import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import demoCode from "./topic7_files/IifePrivateScopeEncapsulationDemoDemo.js?raw";

export default function Topic7() {
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
            <span>Module 002_001_functions-basics · Topic 7</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {"Master IIFE syntax and runtime execution: preventing global namespace pollution, creating private closures, and understanding module patterns before ES modules."}
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
              {"Master IIFE syntax and runtime execution: preventing global namespace pollution, creating private closures, and understanding module patterns before ES modules."} In modern software engineering, mastering this feature allows developers to write decoupled, resilient, and highly performant JavaScript applications across Node.js runtimes and client browsers.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              During evaluation, the JavaScript V8 engine parses code into an Abstract Syntax Tree (AST), generates bytecode via Ignition, and tracks variable bindings inside specialized Environment Records before optimizing hot paths via the TurboFan JIT compiler.
            </p>

            {/* Classroom Story with Code/State */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                {"Swadeep wrote `function() {}()` at the root level and encountered a `SyntaxError: Function statements require a function name`."}
              </p>
              <p>
                {"Sukanta Hui explained that the JavaScript parser treats `function` at the start of a statement as a declaration; wrapping it in parentheses `(function() {})()` forces expression parsing."}
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
              <svg viewBox="0 0 800 240" className="w-full h-auto" role="img" aria-label={"IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"}>
                <defs>
                  <linearGradient id="gradBox1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="gradBox2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="gradBox3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <rect width="800" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="400" y="30" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">&#123;"IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"&#125; · Architecture &amp; State Transitions</text>

                {/* Box 1 */}
                <rect x="40" y="70" width="200" height="110" rx="12" fill="url(#gradBox1)" stroke="#f59e0b" strokeWidth="1" />
                <text x="140" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 1: Input</text>
                <text x="140" y="135" fill="#fef3c7" fontSize="11" textAnchor="middle">&#123;"Enclosing Expression Operator ()"&#125;</text>

                {/* Arrow 1 */}
                <path d="M 250 125 L 290 125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Box 2 */}
                <rect x="300" y="70" width="200" height="110" rx="12" fill="url(#gradBox2)" stroke="#38bdf8" strokeWidth="1" />
                <text x="400" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 2: Execution</text>
                <text x="400" y="135" fill="#e0f2fe" fontSize="11" textAnchor="middle">&#123;"Immediate In-Place Call Stack Execution"&#125;</text>

                {/* Arrow 2 */}
                <path d="M 510 125 L 550 125" stroke="#38bdf8" strokeWidth="2" />

                {/* Box 3 */}
                <rect x="560" y="70" width="200" height="110" rx="12" fill="url(#gradBox3)" stroke="#10b981" strokeWidth="1" />
                <text x="660" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 3: Output State</text>
                <text x="660" y="135" fill="#d1fae5" fontSize="11" textAnchor="middle">&#123;"Private Scope Discarded (Closures Retained)"&#125;</text>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure: Step-by-step architectural execution and state transitions for {"IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"}.
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
              The ECMAScript specification mandates precise abstract operations during the lifecycle of {"IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"}. The table below outlines formal specification rules, engine runtime dynamics, and actionable developer invariants.
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
                    <td className="p-3 text-sky-400">{"Classic IIFE"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"(function() &#123; ... &#125;)();"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Creates anonymous lexical scope and evaluates immediately"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"Legacy script isolation and polyfills"}</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">{"Arrow IIFE"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"(() =&gt; &#123; ... &#125;)();"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Concise syntax with lexical this retention"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"Async top-level execution in scripts"}</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">{"Module Pattern IIFE"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"const Mod = (function() { return { api }; })();"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Encapsulates private state while exposing public API"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"Singleton services and state containers"}</td>
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
                <li><strong className="text-rose-300">{"SyntaxError on Leading Declaration:"}</strong> {"Omitting the enclosing grouping parentheses `(` causes parser SyntaxError."}</li>
                <li><strong className="text-rose-300">{"ASI Preceding Line Collision:"}</strong> {"If the line preceding an IIFE lacks a semicolon, the parser attempts to call the previous expression with the IIFE as arguments."}</li>
                <li><strong className="text-rose-300">{"Memory Leak in Retained Closures:"}</strong> {"If an IIFE returns an object referencing large arrays in its private scope, that memory is retained indefinitely."}</li>
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
              title="IifePrivateScopeEncapsulationDemoDemo.js"
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
                <span>Anti-Pattern: {"Omitting Semicolons Before an IIFE"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"ASI does not insert a semicolon before an opening parenthesis, causing runtime collisions with preceding statements."}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{"// ❌ AVOID: Collides with previous statement\nconst a = 5\n(function() { console.log(\"IIFE\"); })() // TypeError: 5 is not a function!"}
              </pre>
            </div>

            {/* Senior Best Practice */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro Practice: {"Defensive Semicolon Prefixing"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Always terminate statements with semicolons or prefix IIFEs with a defensive semicolon `;(function() {})()`."}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{"// ✓ RECOMMENDED: Safe and bulletproof\nconst a = 5;\n;(function initApp() {\n  const privateSecret = \"KEY_987\";\n  console.log(\"App Initialized Safely\");\n})();"}
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
                  {"Top-Level Await Emulation via Async IIFE"}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {"In environments or scripts that do not support ES2022 Top-Level Await, wrapping execution in an immediately invoked async arrow function provides clean concurrency."}
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{"(async () => {\n  const simulateFetch = () =&gt; new Promise(res =&gt; setTimeout(() =&gt; res({ status: 200 }), 50));\n  const response = await simulateFetch();\n  console.log(\"Async IIFE Data:\", response.status);\n})();"}</pre>
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
              {"Why does `+function(){ return 10; }()` or `!function(){ return true; }()` execute validly without outer grouping parentheses?"}
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: {"Unary operators (+, -, !, ~) force the following function keyword to be parsed in an expression context rather than a statement context."}
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION (25-30 ITEMS) ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"}
            subtitle="Explore 25+ comprehensive questions from basic concepts to senior enterprise architecture"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation"}
            downloadFileName="002-001-topic7-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring software engineers at Coder & AccoTax in Barrackpore, I have consistently seen that mastering " + "IIFE (Immediately Invoked Function Expressions) & Private Scope Encapsulation" + " separates code monkeys from genuine software engineers. " + "While modern ES Modules have largely superseded IIFEs for file-level isolation, IIFEs remain invaluable for one-time initialization logic and library bundling."}
          />
        </section>

      </div>
    </>
  );
}
