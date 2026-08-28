import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import demoCode from "./topic4_files/RunningJavascriptInBrowserConsoleScriptFilesDemo.js?raw";

export default function Topic4() {
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
            <span>Module 001_001_getting-started-with-javascript · Topic 4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            Running JavaScript in Browser Console &amp; Script Files
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deconstruct the four execution environments of modern JavaScript. Explore the DevTools REPL, inline scripts, external script files, and modular ES6 architectures with file-level lexical scope isolation.
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
              <span>💡</span> Detailed Discussion &amp; Execution Paradigms
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              JavaScript can be invoked through multiple execution pathways: the interactive <strong className="text-amber-300">DevTools Console (REPL)</strong>, inline <code>&lt;script&gt;</code> elements, external cached <code>.js</code> files, and modern <strong className="text-sky-300">ES Modules (<code>type=&quot;module&quot;</code>)</strong>.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              In classic scripts, variables declared with <code>var</code> and top-level function declarations pollute the global <code>window</code> object, creating risky namespace collisions in large multi-library applications. ES Modules eliminate this vulnerability by enforcing a private, file-level lexical environment, strict mode by default, and asynchronous parallel loading.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                Student <strong>Swadeep</strong> imported two third-party scripts in a classic HTML file and noticed that both scripts declared a global variable called <code>config</code>, overwriting each other and crashing the app. Mentor <strong>Sukanta Hui</strong> showed how refactoring to modern ES modules (<code>&lt;script type=&quot;module&quot;&gt;</code>) completely encapsulates file-level variables, preventing global namespace contamination.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Global Window Pollution vs ES Module Scope Isolation
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="Scope Isolation in Script Execution">
                <defs>
                  <linearGradient id="modGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="modGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">Script Execution Context: Classic Script vs Modern ES Module</text>

                {/* Left: Classic Script Global Pollution */}
                <g transform="translate(30, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">❌ Classic Script: &lt;script src=&quot;app.js&quot;&gt;</text>

                  <rect x="20" y="40" width="330" height="40" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="58" fill="#fca5a5" fontSize="11">var user = &quot;Swadeep&quot;;</text>
                  <text x="30" y="72" fill="#94a3b8" fontSize="9">Attaches directly to global window.user</text>

                  <rect x="20" y="90" width="330" height="75" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="112" fill="#f43f5e" fontSize="10" fontWeight="bold">Global Pollution &amp; Collision Risk:</text>
                  <text x="30" y="130" fill="#94a3b8" fontSize="9">Script 2 can accidentally overwrite window.user</text>
                  <text x="30" y="148" fill="#94a3b8" fontSize="9">Sloppy mode by default; blocks HTML parser</text>
                </g>

                {/* Right: ES Module Scope Isolation */}
                <g transform="translate(450, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✓ ES Module: &lt;script type=&quot;module&quot;&gt;</text>

                  <rect x="20" y="40" width="330" height="40" rx="6" fill="#0f172a" stroke="#059669" />
                  <text x="30" y="58" fill="#6ee7b7" fontSize="11">const user = &quot;Swadeep&quot;; export &#123; user &#125;;</text>
                  <text x="30" y="72" fill="#94a3b8" fontSize="9">Encapsulated in private module scope</text>

                  <rect x="20" y="90" width="330" height="75" rx="6" fill="url(#modGrad1)" stroke="#047857" />
                  <text x="30" y="112" fill="#ecfdf5" fontSize="10" fontWeight="bold">✓ True Lexical Encapsulation &amp; Safety:</text>
                  <text x="30" y="130" fill="#d1fae5" fontSize="9">Zero window pollution; strict mode by default</text>
                  <text x="30" y="148" fill="#d1fae5" fontSize="9">Deferred automatically; explicit import/export contracts</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.5: Lexical scope isolation comparison between classic scripts and modern ES Modules.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Technical Comparison of Execution Methods
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              Choosing the right execution vehicle determines application security, caching strategy, and modularity.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Execution Method</th>
                    <th className="p-3 border border-slate-800">Scope Lifetime</th>
                    <th className="p-3 border border-slate-800">Browser Caching</th>
                    <th className="p-3 border border-slate-800">Production Fitness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-amber-400 font-bold">DevTools Console</td>
                    <td className="p-3 text-slate-300 font-sans">Transient (lost on tab refresh)</td>
                    <td className="p-3 text-rose-400 font-sans">None</td>
                    <td className="p-3 text-slate-400 font-sans">Debugging &amp; testing only</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-rose-400 font-bold">Inline &lt;script&gt;</td>
                    <td className="p-3 text-slate-300 font-sans">Global window scope pollution</td>
                    <td className="p-3 text-rose-400 font-sans">Re-downloaded on every page load</td>
                    <td className="p-3 text-slate-400 font-sans">Avoid (except critical config boots)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">External .js File</td>
                    <td className="p-3 text-slate-300 font-sans">Global window scope unless wrapped</td>
                    <td className="p-3 text-emerald-400 font-sans">Full HTTP CDN Caching</td>
                    <td className="p-3 text-sky-400 font-sans">Good for standard bundled scripts</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-bold">&lt;script type=&quot;module&quot;&gt;</td>
                    <td className="p-3 text-slate-300 font-sans">Strict Module Lexical Scope</td>
                    <td className="p-3 text-emerald-400 font-sans">Full HTTP CDN Caching</td>
                    <td className="p-3 text-emerald-400 font-sans">Industry Gold Standard (Vite / ESM)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Common Execution Traps
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">CORS Failure on Local Modules:</strong> Loading <code>&lt;script type=&quot;module&quot;&gt;</code> over <code>file:///</code> triggers a CORS security rejection. Always serve via Live Server.</li>
                <li><strong className="text-amber-300">Third-Party Variable Collisions:</strong> Legacy scripts using <code>var</code> at top-level overwrite window properties silently without throwing errors in non-strict mode.</li>
                <li><strong className="text-sky-300">Order-of-Execution Race Conditions:</strong> Using <code>async</code> on interdependent scripts can cause reference errors if a child script loads before its parent.</li>
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
              title="RunningJavascriptInBrowserConsoleScriptFilesDemo.js"
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
                <span>Anti-Pattern: Global Namespace Pollution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Declaring variables globally in classic scripts creates naming collisions and untraceable state mutations across modules.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Pollutes window.currentUser
var currentUser = { name: "Swadeep" };
function login() { /* ... */ }`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: ES Module Explicit Exports</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Keep state local to the module and explicitly export only the minimal required public API contract.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Scoped and clean
const currentUser = { name: "Swadeep" };
export function getCurrentUser() {
  return { ...currentUser };
}`}
              </pre>
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
                  Dynamic import() for On-Demand Lazy Loading
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Instead of loading heavy analytics or visualization libraries on page load, use the native <code>import()</code> statement to fetch and evaluate modules on the fly when the user requests them.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Lazy Loading Module on Button Click
async function renderAnalyticsDashboard() {
  const { ChartEngine } = await import("./heavyChartModule.js");
  const chart = new ChartEngine("#dashboard-canvas");
  chart.render();
}`}</pre>
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
              If an external CDN script is hijacked by an attacker, how can a website use Subresource Integrity (SRI) to guarantee that the browser will automatically refuse to execute the compromised code?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: The browser compares the cryptographic SHA-384 hash of the downloaded bytes against the <code>integrity</code> attribute hash in the HTML <code>&lt;script&gt;</code> tag!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · Running JavaScript in Browser Console & Script Files"
            subtitle="Explore 25+ comprehensive questions on scripts, ES Modules, dynamic imports, and SRI security"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · Running JavaScript in Browser Console & Script Files"
            downloadFileName="001_001_getting-started-with-javascript-topic4-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I always advise moving away from monolithic global scripts. Learn to architect your applications using ES Modules with explicit import/export contracts for clean, maintainable, and bug-free codebases."
          />
        </section>

      </div>
    </>
  );
}
