import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import demoCode from "./topic7_files/JavascriptLexicalGrammarCommentsWhitespaceAsiAutomaticSemicolonInsertionDemo.js?raw";

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
        
        {/* ─── 1. HEADER SECTION ──────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_001_getting-started-with-javascript · Topic 7</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            Lexical Grammar, Comments, Whitespace &amp; ASI
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deconstruct JavaScript tokenization mechanics, Automatic Semicolon Insertion (ASI) restricted productions, professional JSDoc type annotations, and numeric separator literals.
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
              <span>💡</span> Detailed Discussion &amp; Lexical Rules
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              Before JavaScript can execute, its engine scans raw source text during <strong className="text-amber-300">Lexical Analysis (Tokenization)</strong>, decomposing characters into tokens: keywords, identifiers, numbers, string literals, and punctuators.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              One of the most critical aspects of JavaScript grammar is <strong className="text-sky-300">Automatic Semicolon Insertion (ASI)</strong>. While ASI permits omitting semicolons in many scenarios, ECMAScript defines strict <em>&quot;Restricted Productions&quot;</em> (around keywords like <code>return</code>, <code>throw</code>, <code>break</code>, and <code>continue</code>) where newlines trigger automatic semicolon injection, frequently leading to confusing bugs like functions returning <code>undefined</code>.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Ichapur Lab):</span>
              </div>
              <p>
                Student <strong>Abhronila</strong> wrote a helper function with <code>return</code> on line 1 and an object literal <code>&#123; user: &apos;Abhronila&apos; &#125;</code> starting on line 2. The function returned <code>undefined</code> instead of the object! Mentor <strong>Sukanta Hui</strong> explained how ASI inserted an invisible semicolon after <code>return;</code>, treating the next lines as an unreachable code block. Moving the opening brace <code>&#123;</code> to the same line as <code>return</code> solved the issue instantly.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Automatic Semicolon Insertion (ASI) Token Hazard
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="Automatic Semicolon Insertion Mechanics">
                <defs>
                  <linearGradient id="asiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="asiGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">ASI Parser Behavior: Broken Multiline Return vs Correct Inline Syntax</text>

                {/* Left: Broken Multiline Return */}
                <g transform="translate(30, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">❌ Hazard: Newline after return (Restricted Production)</text>

                  <rect x="20" y="40" width="330" height="38" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="58" fill="#fca5a5" fontSize="11">return // [ASI inserts &apos;;&apos; automatically!]</text>
                  <text x="30" y="72" fill="#f43f5e" fontSize="9">Parsed as: return;</text>

                  <rect x="20" y="88" width="330" height="75" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="108" fill="#fca5a5" fontSize="11">&#123; name: &quot;Abhronila&quot; &#125;;</text>
                  <text x="30" y="128" fill="#f43f5e" fontSize="10" fontWeight="bold">Result: Returns undefined!</text>
                  <text x="30" y="146" fill="#94a3b8" fontSize="9">Object block becomes dead unreachable code</text>
                </g>

                {/* Right: Correct Inline Syntax */}
                <g transform="translate(450, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✓ Safe: Opening Brace on Same Line</text>

                  <rect x="20" y="40" width="330" height="38" rx="6" fill="#0f172a" stroke="#059669" />
                  <text x="30" y="58" fill="#6ee7b7" fontSize="11">return &#123; // Brace stops ASI insertion</text>
                  <text x="30" y="72" fill="#34d399" fontSize="9">Parser recognizes object literal start</text>

                  <rect x="20" y="88" width="330" height="75" rx="6" fill="url(#asiGrad1)" stroke="#047857" />
                  <text x="30" y="108" fill="#ecfdf5" fontSize="11">  name: &quot;Abhronila&quot; &#125;;</text>
                  <text x="30" y="128" fill="#ecfdf5" fontSize="10" fontWeight="bold">Result: Returns &#123; name: &quot;Abhronila&quot; &#125;</text>
                  <text x="30" y="146" fill="#d1fae5" fontSize="9">100% Deterministic execution across all engines</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.8: Automatic Semicolon Insertion (ASI) parser resolution in restricted productions.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> ECMAScript Lexical Grammar &amp; Identifier Rules
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript lexical grammar governs token definitions, restricted productions, and valid character sets.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Grammar Category</th>
                    <th className="p-3 border border-slate-800">Specification Rule</th>
                    <th className="p-3 border border-slate-800">Valid Example</th>
                    <th className="p-3 border border-slate-800">Invalid Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-amber-400 font-bold">Identifiers</td>
                    <td className="p-3 text-slate-300 font-sans">Unicode letter, $, or _ followed by digits/letters</td>
                    <td className="p-3 text-emerald-400">$student, _count, বাংলা</td>
                    <td className="p-3 text-rose-400">1stStudent, let, #id</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">Numeric Separators</td>
                    <td className="p-3 text-slate-300 font-sans">Underscore between digits for readability</td>
                    <td className="p-3 text-emerald-400">1_000_000, 0xFF_00</td>
                    <td className="p-3 text-rose-400">100_, _100, 10__00</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-purple-400 font-bold">Restricted ASI</td>
                    <td className="p-3 text-slate-300 font-sans">No newline permitted after return, throw, break</td>
                    <td className="p-3 text-emerald-400">return &#123; id: 1 &#125;;</td>
                    <td className="p-3 text-rose-400">return
&#123; id: 1 &#125;;</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-bold">JSDoc Types</td>
                    <td className="p-3 text-slate-300 font-sans">Block annotations for IDE type checking</td>
                    <td className="p-3 text-emerald-400">/** @type &#123;string&#125; */</td>
                    <td className="p-3 text-slate-400">// type string</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Common Lexical Grammar Pitfalls
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Leading Bracket / Parenthesis Collision:</strong> If a line starts with <code>(</code> or <code>[</code> and the previous line has no semicolon, JavaScript treats it as a function invocation on the previous line.</li>
                <li><strong className="text-amber-300">Zero-Width Invisible Characters:</strong> Copying code from websites can copy invisible zero-width Unicode characters (<code>​</code>), causing mysterious <code>SyntaxError</code> crashes.</li>
                <li><strong className="text-sky-300">Nested Multi-line Comments:</strong> Placing <code>/* ... /* nested */ ... */</code> is illegal because the first <code>*/</code> terminates the entire comment block.</li>
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
              title="JavascriptLexicalGrammarCommentsWhitespaceAsiAutomaticSemicolonInsertionDemo.js"
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
                <span>Anti-Pattern: Unsemicoloned IIFE Concatenation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Omitting semicolons before an IIFE causes the engine to invoke the preceding statement as a function.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Crashes with TypeError: 42 is not a function
const x = 42
(function() { /* ... */ })()`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: Defensive Semicolon &amp; Prettier</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use explicit semicolons or prepend a defensive <code>;</code> before standalone IIFEs and array expressions.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Defensive semicolon prevents collisions
const x = 42;
;(function() { /* ... */ })();`}</pre>
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
                  JSDoc @typedef for TypeScript-Grade Safety in Vanilla JS
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              You can get 100% of TypeScript&apos;s auto-completion, parameter hints, and compile-time type safety in pure vanilla JavaScript files using JSDoc <code>@typedef</code> without configuring TypeScript or a build step!
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Type contracts in Vanilla JS via JSDoc
/**
 * @typedef {Object} StudentRecord
 * @property {string} name - Candidate full name
 * @property {number} roll - Numeric roll identifier
 * @property {boolean} isEnrolled - Active enrollment status
 */

/** @type {StudentRecord} */
const record = { name: "Swadeep", roll: 101, isEnrolled: true };`}</pre>
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
              Why does JavaScript forbid placing a newline between the postfix increment operator <code>++</code> and its target identifier (e.g. <code>x
++</code>), while allowing a newline before prefix <code>++
x</code>?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Postfix <code>++</code> is an ECMAScript Restricted Production. A newline forces ASI to insert a semicolon after <code>x;</code>, leaving orphaned <code>++</code> as an illegal syntax error!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · Lexical Grammar, Comments, Whitespace & ASI"
            subtitle="Explore 25+ comprehensive questions on ASI, tokenization, JSDoc annotations, and numeric separators"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · Lexical Grammar, Comments, Whitespace & ASI"
            downloadFileName="001_001_getting-started-with-javascript-topic7-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I have seen countess bugs caused by ASI assumptions. Write unambiguous code, use Prettier with semicolons enabled, and document your interfaces with JSDoc. Clean code is professional code."
          />
        </section>

      </div>
    </>
  );
}
