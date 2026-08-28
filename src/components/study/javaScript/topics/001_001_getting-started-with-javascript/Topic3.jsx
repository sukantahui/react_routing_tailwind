import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import demoCode from "./topic3_files/SettingUpEnvironmentBrowserVsCodeLiveServerDemo.js?raw";

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
        
        {/* ─── 1. HEADER SECTION ──────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_001_getting-started-with-javascript · Topic 3</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Setting Up Environment: Browser, VS Code & Live Server"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Construct a world-class professional development workspace. Configure Visual Studio Code, Prettier, ESLint, Chrome DevTools, and master why local HTTP servers are strictly required over direct file opening.
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
              <span>💡</span> Detailed Discussion &amp; Developer Environment
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              A high-productivity engineering workflow rests on three interconnected tools: an intelligent code editor (<strong className="text-amber-300">VS Code</strong>), a modern browser with an advanced debugging engine (<strong className="text-sky-300">Chrome/Edge DevTools</strong>), and a local HTTP development server (<strong className="text-emerald-300">Live Server</strong>).
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              Many beginners make the mistake of double-clicking an HTML file, launching it with the <code>file:///</code> protocol. This causes browsers to assign an opaque <code>null</code> origin, which immediately blocks ES Module <code>import/export</code> statements, Fetch API calls, and Web Workers due to Cross-Origin Resource Sharing (CORS) security rules. Live Server resolves this by spawning an internal HTTP server at <code>http://127.0.0.1:5500</code> and injecting a WebSocket live reload listener.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Shyamnagar Lab):</span>
              </div>
              <p>
                Student <strong>Debangshu</strong> was building an ES module with <code>import &#123; utils &#125; from &apos;./utils.js&apos;</code> and got a red console error: <em>&quot;Access to script at &apos;file:///...&apos; from origin &apos;null&apos; has been blocked by CORS policy&quot;</em>. Mentor <strong>Sukanta Hui</strong> demonstrated right-clicking the HTML file in VS Code and selecting <strong>&quot;Open with Live Server&quot;</strong>, instantly giving the project a proper HTTP origin and enabling hot-reloading on every file save.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Live Server WebSocket Hot-Reload &amp; Origin Architecture
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="Live Server vs File Protocol Architecture">
                <defs>
                  <linearGradient id="lsGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="lsGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">Development Protocol Comparison: file:/// vs Live Server (http://127.0.0.1:5500)</text>

                {/* Left: file:// (Broken) */}
                <g transform="translate(30, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">❌ Direct File Protocol (file:///)</text>

                  <rect x="20" y="40" width="330" height="35" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="62" fill="#fca5a5" fontSize="11">Origin: null (CORS Security Violation)</text>

                  <rect x="20" y="85" width="330" height="35" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="107" fill="#fca5a5" fontSize="11">ES Module imports &amp; Fetch API: BLOCKED</text>

                  <rect x="20" y="130" width="330" height="35" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="152" fill="#fca5a5" fontSize="11">Live Reload: ❌ Manual F5 required on every edit</text>
                </g>

                {/* Right: Live Server (Working) */}
                <g transform="translate(450, 55)">
                  <rect width="370" height="180" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="185" y="24" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✓ VS Code Live Server (http://127.0.0.1:5500)</text>

                  <rect x="20" y="40" width="330" height="35" rx="6" fill="#0f172a" stroke="#059669" />
                  <text x="30" y="62" fill="#6ee7b7" fontSize="11">Origin: http://127.0.0.1:5500 (Valid HTTP Origin)</text>

                  <rect x="20" y="85" width="330" height="35" rx="6" fill="#0f172a" stroke="#059669" />
                  <text x="30" y="107" fill="#6ee7b7" fontSize="11">ES Modules, Fetch, LocalStorage: ✓ 100% Working</text>

                  <rect x="20" y="130" width="330" height="35" rx="6" fill="url(#lsGrad1)" stroke="#047857" />
                  <text x="30" y="152" fill="#ecfdf5" fontSize="11" fontWeight="bold">Live Reload: ✓ Instant reload over WebSocket on save</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.4: Protocol security architecture explaining why local HTTP servers are mandatory for JavaScript engineering.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Essential VS Code Configuration &amp; Extension Stack
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              Setting up standard workspace configurations eliminates code formatting conflicts across development teams.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Tool / Extension</th>
                    <th className="p-3 border border-slate-800">Identifier</th>
                    <th className="p-3 border border-slate-800">Core Responsibility</th>
                    <th className="p-3 border border-slate-800">Recommended Setting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-amber-400 font-bold">Live Server</td>
                    <td className="p-3 text-slate-400">ritwickdey.LiveServer</td>
                    <td className="p-3 text-slate-300 font-sans">Local HTTP server with WebSocket hot-reloading</td>
                    <td className="p-3 text-emerald-400 font-sans">Port: 5500, Custom Browser: Chrome</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">Prettier Formatter</td>
                    <td className="p-3 text-slate-400">esbenp.prettier-vscode</td>
                    <td className="p-3 text-slate-300 font-sans">Enforces deterministic indentation, quotes, and commas</td>
                    <td className="p-3 text-emerald-400 font-sans">&quot;editor.formatOnSave&quot;: true</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-purple-400 font-bold">ESLint Linter</td>
                    <td className="p-3 text-slate-400">dbaeumer.vscode-eslint</td>
                    <td className="p-3 text-slate-300 font-sans">Catches syntax bugs, undeclared variables, and code smells</td>
                    <td className="p-3 text-emerald-400 font-sans">&quot;eslint.validate&quot;: [&quot;javascript&quot;]</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-bold">JavaScript Snippets</td>
                    <td className="p-3 text-slate-400">xabikos.JavaScriptSnippets</td>
                    <td className="p-3 text-slate-300 font-sans">Accelerates authoring of ES6+ syntax patterns</td>
                    <td className="p-3 text-emerald-400 font-sans">clg → console.log(), nfn → Named function</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Common Environment Gotchas &amp; Fixes
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Stale Browser Cache:</strong> Browsers often serve cached JavaScript files. Always check <strong>&quot;Disable Cache&quot;</strong> in the DevTools Network tab while developing.</li>
                <li><strong className="text-amber-300">Live Server Port Collisions:</strong> If port 5500 is occupied, Live Server silently shifts to 5501 or 5502. Ensure your API CORS whitelist accounts for dynamic ports.</li>
                <li><strong className="text-sky-300">Windows Line Endings (CRLF vs LF):</strong> Configure Git and VS Code to use standard <code>LF</code> line endings to avoid unexpected git diff churn.</li>
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
              title="SettingUpEnvironmentBrowserVsCodeLiveServerDemo.js"
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
                <span>Anti-Pattern: Opening via file:/// Explorer</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Double-clicking files opens them with <code>file:///</code>, which breaks ES Modules and Fetch calls due to null origin security blocks.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: file:///C:/Users/app/index.html
// Throws: CORS policy: Cross origin requests are only supported for http, https...`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: Serving via Local HTTP Loopback</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Always launch through Live Server or a local HTTP development server for complete Web API compliance and live reloading.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: http://127.0.0.1:5500/index.html
// Full Fetch, ES Module import/export, and LocalStorage capabilities enabled!`}
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
                  VS Code Multi-Cursor Mastery &amp; Emmet HTML Generation
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              In VS Code, pressing <code>Ctrl + D</code> (or <code>Cmd + D</code>) selects the next occurrence of the current word for simultaneous multi-line editing. In HTML files, typing <code>!</code> and pressing <code>Tab</code> generates a complete accessible HTML5 boilerplate in a fraction of a second.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Emmet HTML Expansion Shorthand
// Type: 'ul.student-list>li.student-item*3{Student $}' + Tab
// Generates:
// <ul class="student-list">
//   <li class="student-item">Student 1</li>
//   <li class="student-item">Student 2</li>
//   <li class="student-item">Student 3</li>
// </ul>`}</pre>
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
              Why do modern web build tools (like Vite) use native ES Modules in development to provide sub-10ms hot-reloads, while traditional tools like Webpack had to rebuild massive bundled files on every save?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Vite serves source code over native browser ES Module imports (<code>type=&quot;module&quot;</code>), letting the browser handle dependency graphs on demand without bundling!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · Setting Up Environment: Browser, VS Code & Live Server"
            subtitle="Explore 25+ comprehensive questions on IDE setups, DevTools shortcuts, and local HTTP servers"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · Setting Up Environment: Browser, VS Code & Live Server"
            downloadFileName="001_001_getting-started-with-javascript-topic3-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I have found that engineers who master their development environment code twice as fast with half the bugs. Configure your VS Code with formatOnSave and always launch your projects through Live Server."
          />
        </section>

      </div>
    </>
  );
}
