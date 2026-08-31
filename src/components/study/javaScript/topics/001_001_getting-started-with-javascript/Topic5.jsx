import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import demoCode from "./topic5_files/UsingConsolelogBasicDebuggingDemo.js?raw";

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
        
        {/* ─── 1. HEADER SECTION ──────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_001_getting-started-with-javascript · Topic 5</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Using console.log & Basic Debugging"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master professional diagnostic logging and DevTools debugging. Explore tabular profiling with <code>console.table()</code>, execution timers with <code>console.time()</code>, call stack tracing, and conditional breakpoints.
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
              <span>💡</span> Detailed Discussion &amp; Diagnostic Foundations
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              Debugging is the art of methodically isolating, reproducing, and resolving unexpected runtime behaviors. While beginners often rely solely on basic <code>console.log()</code> statements, the modern Console API offers specialized diagnostic tools: <strong className="text-amber-300"><code>console.table()</code></strong> for tabular array visualization, <strong className="text-sky-300"><code>console.time()</code></strong> for microsecond benchmarking, and <strong className="text-emerald-300"><code>console.trace()</code></strong> for call stack inspection.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              Furthermore, stepping beyond console output into interactive browser DevTools debugging (using breakpoints, conditional breakpoints, and the programmatic <code>debugger</code> statement) allows engineers to inspect the exact execution frame, memory heap, and closure scope variables in real time.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                Student <strong>Tuhina</strong> logged an object in a loop, modified its properties afterwards, and was surprised to see the modified values when expanding the logged object in Chrome DevTools. Mentor <strong>Sukanta Hui</strong> explained the <em>&quot;Live Object Mutation Trap&quot;</em>: the console logs a reference pointer, not an immutable snapshot. Logging with <code>JSON.parse(JSON.stringify(obj))</code> or <code>structuredClone()</code> instantly captures the true state at the exact moment of execution.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> DevTools Debugger: Breakpoint Execution &amp; Scope Hierarchy
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="DevTools Debugging Lifecycle">
                <defs>
                  <linearGradient id="dbgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="dbgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">DevTools Debugger Execution Pause &amp; Scope Inspection Lifecycle</text>

                {/* Left: Code with Breakpoint */}
                <g transform="translate(30, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Sources Panel · Code Execution Frame</text>

                  <rect x="20" y="40" width="330" height="30" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="30" y="60" fill="#94a3b8" fontSize="11">Line 12: function processStudent(data) &#123;</text>

                  {/* Paused Breakpoint Line */}
                  <rect x="20" y="75" width="330" height="35" rx="6" fill="url(#dbgGrad1)" stroke="#f59e0b" />
                  <text x="30" y="97" fill="#fff" fontSize="11" fontWeight="bold">🔴 Line 13: debugger; // PAUSED AT BREAKPOINT</text>

                  <rect x="20" y="115" width="330" height="30" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="30" y="135" fill="#94a3b8" fontSize="11">Line 14: return data.score * 1.1;</text>

                  <text x="30" y="170" fill="#fbbf24" fontSize="10">Controls: F10 (Step Over) · F11 (Step Into) · F8 (Resume)</text>
                </g>

                {/* Right: Scope Inspection Pane */}
                <g transform="translate(450, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Scope &amp; Call Stack Inspection Pane</text>

                  <rect x="20" y="40" width="330" height="38" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="30" y="56" fill="#38bdf8" fontSize="10" fontWeight="bold">Local Scope:</text>
                  <text x="30" y="70" fill="#e2e8f0" fontSize="10">data: &#123; name: &quot;Tuhina&quot;, score: 95 &#125;</text>

                  <rect x="20" y="85" width="330" height="38" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="30" y="101" fill="#38bdf8" fontSize="10" fontWeight="bold">Closure (LabModule):</text>
                  <text x="30" y="115" fill="#e2e8f0" fontSize="10">center: &quot;Barrackpore Lab&quot; · mentor: &quot;Sukanta Hui&quot;</text>

                  <rect x="20" y="130" width="330" height="38" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="30" y="146" fill="#38bdf8" fontSize="10" fontWeight="bold">Global Scope (window):</text>
                  <text x="30" y="160" fill="#94a3b8" fontSize="9">document, localStorage, fetch...</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.6: DevTools debugger execution suspension and hierarchical scope resolution.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Complete Diagnostic Console API Specification
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The Console API specification defines formal logging channels with distinct priority levels and visual indicators.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Method Signature</th>
                    <th className="p-3 border border-slate-800">Log Level</th>
                    <th className="p-3 border border-slate-800">Visual Indicator</th>
                    <th className="p-3 border border-slate-800">Primary Enterprise Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-amber-400 font-bold">console.log(data...)</td>
                    <td className="p-3 text-slate-400 font-sans">Info</td>
                    <td className="p-3 text-slate-300 font-sans">Standard text output</td>
                    <td className="p-3 text-slate-300 font-sans">General application flow tracing</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">console.table(tabularData, [cols])</td>
                    <td className="p-3 text-slate-400 font-sans">Info</td>
                    <td className="p-3 text-sky-300 font-sans">Interactive 2D Grid Table</td>
                    <td className="p-3 text-slate-300 font-sans">Inspecting arrays of objects &amp; API response lists</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-rose-400 font-bold">console.error(errorObj...)</td>
                    <td className="p-3 text-rose-400 font-sans">Error</td>
                    <td className="p-3 text-rose-300 font-sans">Red box + stack trace</td>
                    <td className="p-3 text-slate-300 font-sans">Unhandled catch blocks &amp; network failures</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-bold">console.time(label) / timeEnd(label)</td>
                    <td className="p-3 text-slate-400 font-sans">Timing</td>
                    <td className="p-3 text-emerald-300 font-sans">High-precision milliseconds</td>
                    <td className="p-3 text-slate-300 font-sans">Micro-benchmarking function execution speed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Debugging Quirks to Remember
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Live Object Mutation:</strong> Expanding logged objects shows their current memory state, not the state at log time. Always snapshot objects before logging.</li>
                <li><strong className="text-amber-300">console.assert() Does Not Throw:</strong> An assertion failure logs a red message but does NOT halt execution. Use explicit <code>throw new Error()</code> if halting is required.</li>
                <li><strong className="text-sky-300">Memory Leak in Production:</strong> Leaving heavy object logs in production prevents Garbage Collection. Strip console logs during production bundling.</li>
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
              title="UsingConsolelogBasicDebuggingDemo.js"
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
                <span>Anti-Pattern: String Concatenation Object Logging</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Concatenating objects with strings converts them to unreadable <code>&quot;[object Object]&quot;</code> in the console.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Logs 'User: [object Object]'
console.log("User: " + userObj); // Obscures all object fields!`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: Multi-Argument Interactive Logging</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pass objects as separate arguments to preserve interactive inspection and tabular formatting.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Interactive expandable object in DevTools
console.log("User Data:", userObj);
console.table([userObj]);`}</pre>
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
                  Custom CSS %c Styling &amp; console.table Column Filtering
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              You can style console output with custom gradients, badges, and font weights using <code>%c</code>. Additionally, <code>console.table(data, [&apos;col1&apos;, &apos;col2&apos;])</code> filters wide datasets to spotlight only key fields.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Branded Console Banner & Tabular Inspection
console.log(
  "%c Coder & AccoTax %c JS Masterclass Ready ",
  "background: #f59e0b; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;",
  "background: #0f172a; color: #38bdf8; padding: 4px 8px; border-radius: 0 4px 4px 0;"
);
console.table(studentList, ["name", "center", "score"]);`}</pre>
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
              If an enterprise frontend app logs thousands of user analytics events using <code>console.log()</code>, why can this trigger significant memory leaks and performance degradation even on modern high-end devices?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: The browser DevTools console maintains internal root references to every logged object for inspection, preventing the Garbage Collector from freeing their memory!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · Using console.log & Basic Debugging"
            subtitle="Explore 25+ comprehensive questions on Console APIs, breakpoints, and memory profiling"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · Using console.log & Basic Debugging"
            downloadFileName="001_001_getting-started-with-javascript-topic5-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I emphasize that mastering the debugger is what transforms an amateur into a professional software engineer. Don't guess what your code is doing — set a breakpoint, step through the Call Stack, and verify the state."
          />
        </section>

      </div>
    </>
  );
}
