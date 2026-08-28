import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import demoCode from "./topic2_files/HowHtmlCssAndJavascriptWorkTogetherDemo.js?raw";

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
        
        {/* ─── 1. HEADER SECTION ──────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_001_getting-started-with-javascript · Topic 2</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"How HTML, CSS, and JavaScript Work Together"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the Critical Rendering Path (CRP). Discover how the browser engine parses HTML into the DOM, CSS into the CSSOM, builds the Render Tree, computes Layout (Reflow), and coordinates with JavaScript for silky smooth 60fps execution.
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
              <span>💡</span> Detailed Discussion &amp; The Rendering Pipeline
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              A web application is a harmonious collaboration between three foundational pillars: <strong className="text-amber-300">HTML (Semantic Structure)</strong>, <strong className="text-sky-300">CSS (Visual Presentation)</strong>, and <strong className="text-emerald-300">JavaScript (Dynamic Behavior)</strong>. When a browser receives network bytes, it transforms raw text into structured object models: the DOM (Document Object Model) and the CSSOM (CSS Object Model).
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              JavaScript acts as the controller of these trees. It queries DOM nodes, reads computed geometry from the CSSOM, listens to user events, and applies targeted mutations. Understanding how script execution influences the <strong className="text-amber-300">Critical Rendering Path</strong> (and how loading attributes like <code>defer</code> and <code>async</code> operate) prevents common pitfalls like layout thrashing and render blocking.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Ichapur Lab):</span>
              </div>
              <p>
                Student <strong>Abhronila</strong> created an interactive button in the <code>&lt;head&gt;</code> of an HTML document and received a confusing error: <code>TypeError: Cannot read properties of null (reading &apos;addEventListener&apos;)</code>. Mentor <strong>Sukanta Hui</strong> stepped through the browser parsing order to show that because the HTML parser had not yet encountered the <code>&lt;body&gt;</code>, the button node did not exist in the DOM tree when the script ran. Adding the <code>defer</code> attribute immediately solved the problem by delaying execution until DOM parsing completed.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> The Critical Rendering Path (CRP) Architecture
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="Critical Rendering Path Pipeline">
                <defs>
                  <linearGradient id="crpGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="crpGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="crpGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">Browser Critical Rendering Path (CRP) &amp; JavaScript Interaction</text>

                {/* HTML -&gt; DOM */}
                <g transform="translate(30, 50)">
                  <rect width="130" height="60" rx="8" fill="url(#crpGrad1)" stroke="#f59e0b" />
                  <text x="65" y="26" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">HTML Bytes</text>
                  <text x="65" y="44" fill="#fef3c7" fontSize="10" textAnchor="middle">→ DOM Tree</text>
                </g>

                {/* CSS -&gt; CSSOM */}
                <g transform="translate(30, 130)">
                  <rect width="130" height="60" rx="8" fill="url(#crpGrad2)" stroke="#38bdf8" />
                  <text x="65" y="26" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">CSS Bytes</text>
                  <text x="65" y="44" fill="#e0f2fe" fontSize="10" textAnchor="middle">→ CSSOM Tree</text>
                </g>

                {/* JavaScript Box Intercept */}
                <g transform="translate(200, 90)">
                  <rect width="150" height="60" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x="75" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">JavaScript Engine</text>
                  <text x="75" y="42" fill="#94a3b8" fontSize="9" textAnchor="middle">Mutates DOM &amp; CSSOM</text>
                </g>

                {/* Render Tree */}
                <g transform="translate(390, 90)">
                  <rect width="130" height="60" rx="8" fill="#1e293b" stroke="#a855f7" />
                  <text x="65" y="26" fill="#d8b4fe" fontSize="11" fontWeight="bold" textAnchor="middle">Render Tree</text>
                  <text x="65" y="44" fill="#94a3b8" fontSize="9" textAnchor="middle">Visible Nodes Only</text>
                </g>

                {/* Layout (Reflow) */}
                <g transform="translate(560, 90)">
                  <rect width="110" height="60" rx="8" fill="#1e293b" stroke="#ec4899" />
                  <text x="55" y="26" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">Layout (Reflow)</text>
                  <text x="55" y="44" fill="#94a3b8" fontSize="9" textAnchor="middle">x, y, w, h boxes</text>
                </g>

                {/* Paint & Composite */}
                <g transform="translate(710, 90)">
                  <rect width="110" height="60" rx="8" fill="url(#crpGrad3)" stroke="#10b981" />
                  <text x="55" y="26" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">Paint &amp; Raster</text>
                  <text x="55" y="44" fill="#d1fae5" fontSize="9" textAnchor="middle">GPU Screen Pixels</text>
                </g>

                {/* Connecting Arrows */}
                <path d="M 160 80 L 200 110" stroke="#f59e0b" strokeWidth="2" />
                <path d="M 160 160 L 200 130" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 350 120 L 390 120" stroke="#fbbf24" strokeWidth="2" />
                <path d="M 520 120 L 560 120" stroke="#a855f7" strokeWidth="2" />
                <path d="M 670 120 L 710 120" stroke="#ec4899" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.3: The Critical Rendering Path showing how JavaScript interlocks with HTML and CSS compilation.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Technical Specifications &amp; Script Loading Rules
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              When the browser encounters a <code>&lt;script&gt;</code> tag, its execution behavior depends critically on whether <code>defer</code>, <code>async</code>, or module semantics are specified.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Script Strategy</th>
                    <th className="p-3 border border-slate-800">Download Behavior</th>
                    <th className="p-3 border border-slate-800">Execution Phase</th>
                    <th className="p-3 border border-slate-800">Recommended Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-rose-400 font-bold">Classic &lt;script&gt;</td>
                    <td className="p-3 text-slate-300 font-sans">Blocks HTML Parser completely during network download</td>
                    <td className="p-3 text-amber-300 font-sans">Executes immediately on spot</td>
                    <td className="p-3 text-slate-400 font-sans">Legacy scripts or scripts at end of &lt;body&gt;</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-bold">&lt;script defer&gt;</td>
                    <td className="p-3 text-slate-300 font-sans">Downloads in parallel in background without blocking</td>
                    <td className="p-3 text-amber-300 font-sans">Executes in strict document order after DOM parsing</td>
                    <td className="p-3 text-emerald-400 font-sans">Gold standard for all application bundle scripts</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">&lt;script async&gt;</td>
                    <td className="p-3 text-slate-300 font-sans">Downloads in parallel in background without blocking</td>
                    <td className="p-3 text-amber-300 font-sans">Executes immediately the moment downloaded (out of order)</td>
                    <td className="p-3 text-sky-400 font-sans">Independent analytics &amp; tracking widgets</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-purple-400 font-bold">&lt;script type=&quot;module&quot;&gt;</td>
                    <td className="p-3 text-slate-300 font-sans">Downloads in parallel; deferred by default</td>
                    <td className="p-3 text-amber-300 font-sans">Strict mode scoped; executes after DOMContentLoaded</td>
                    <td className="p-3 text-purple-400 font-sans">Modern ES Module architectures with import/export</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Common Pitfalls in DOM / CSS Interaction
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Layout Thrashing:</strong> Querying geometry (<code>offsetWidth</code>) right after changing styles in a loop forces the engine into repeated synchronous reflows.</li>
                <li><strong className="text-amber-300">Flash of Unstyled Content (FOUC):</strong> Injecting critical layout CSS via asynchronous JS causes a visible layout jump during page load.</li>
                <li><strong className="text-sky-300">Inline Style Specificity Wars:</strong> Setting styles directly via <code>el.style.color</code> overrides stylesheet rules, making dark mode transitions difficult.</li>
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
              title="HowHtmlCssAndJavascriptWorkTogetherDemo.js"
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
                <span>Anti-Pattern: Multiple Reflow Injections</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Appending elements one-by-one inside a loop forces the browser to recalculate layout on every iteration.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: 100 separate DOM reflows!
for (let i = 0; i < 100; i++) {
  const item = document.createElement("li");
  item.textContent = "Student " + i;
  list.appendChild(item); // Costly reflow!
}`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: DocumentFragment Batching</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Assemble items off-screen inside a <code>DocumentFragment</code> and perform a single atomic DOM insertion.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Exactly 1 atomic DOM reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const item = document.createElement("li");
  item.textContent = "Student " + i;
  fragment.appendChild(item);
}
list.appendChild(fragment); // Single reflow!`}
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
                  CSS Variable Reactivity via documentElement.style.setProperty
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Instead of manually updating hundreds of DOM element inline styles, senior frontend engineers update root CSS custom properties. The browser recalculates styles across the entire tree efficiently with zero layout thrashing.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Instant Dynamic Theming across the whole app
function applyUserBrandTheme(primaryHex, accentHex) {
  const root = document.documentElement;
  root.style.setProperty("--brand-primary", primaryHex);
  root.style.setProperty("--brand-accent", accentHex);
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
              Why do CSS animations on <code>transform</code> and <code>opacity</code> run smoothly at 60fps even when heavy JavaScript code is busy calculating on the main CPU thread?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: <code>transform</code> and <code>opacity</code> bypass both the Layout and Paint phases, running directly on the GPU Compositor thread!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · How HTML, CSS, and JavaScript Work Together"
            subtitle="Explore 25+ comprehensive questions on CRP, Reflow, Repaint, and script loading"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · How HTML, CSS, and JavaScript Work Together"
            downloadFileName="001_001_getting-started-with-javascript-topic2-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I always teach students that writing high-performance JavaScript requires understanding the browser engine. Learn how the Critical Rendering Path works, and you will never write code that causes layout thrashing or stuttering animations."
          />
        </section>

      </div>
    </>
  );
}
