import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import demoCode from "./topic1_files/RoleOfJavascriptInModernWebDevelopmentDemo.js?raw";

export default function Topic1() {
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
            <span>Module 001_001_getting-started-with-javascript · Topic 1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Role of JavaScript in Modern Web Development"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand how JavaScript powers modern Single Page Applications (SPAs), reactive state rendering, asynchronous cloud communications, and universal multi-platform architectures.
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
              <span>💡</span> Detailed Discussion &amp; Architectural Role
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              In modern web engineering, JavaScript is the dynamic behavioral engine that brings static HTML documents and CSS stylesheets to life. Rather than merely validating form fields as it did in the 1990s, JavaScript today orchestrates the entire application lifecycle: client-side routing, optimistic UI updates, real-time bidirectional WebSocket messaging, progressive caching, and offline synchronization.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              With the rise of <strong className="text-sky-300">Single Page Applications (SPAs)</strong> and hybrid Server-Side Rendering (SSR) frameworks like Next.js, JavaScript executes ubiquitously on both client browsers and cloud edge servers. The application state lives in memory, allowing users to interact with enterprise dashboards, maps, and real-time feeds without the jarring white-screen flickers of traditional multi-page reloads.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Naihati Lab):</span>
              </div>
              <p>
                Student <strong>Tuhina</strong> asked why modern websites feel as smooth and snappy as native desktop software like VS Code. Mentor <strong>Sukanta Hui</strong> demonstrated how JavaScript intercepts user navigation via the <code>HTML5 History API</code>, fetches lightweight JSON payloads over <code>fetch()</code> in the background, and dynamically patches only the modified sections of the DOM without re-downloading entire HTML pages.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Traditional MPA vs Modern JavaScript SPA Architecture
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full h-auto" role="img" aria-label="MPA vs SPA Architecture">
                <defs>
                  <linearGradient id="spaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="mpaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">Evolution: Multi-Page Web vs Modern Dynamic JavaScript Architecture</text>

                {/* Legacy MPA Box */}
                <g transform="translate(30, 50)">
                  <rect width="375" height="190" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="187" y="24" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">Traditional MPA (Server Round-Trip)</text>
                  
                  <rect x="20" y="42" width="335" height="35" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="64" fill="#fda4af" fontSize="11">1. User Clicks Link → Full HTTP Request to Server</text>

                  <rect x="20" y="85" width="335" height="35" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="107" fill="#fda4af" fontSize="11">2. Full Page HTML/CSS Re-parsed (White Screen Flash)</text>

                  <rect x="20" y="128" width="335" height="42" rx="6" fill="#0f172a" stroke="#e11d48" />
                  <text x="30" y="146" fill="#f43f5e" fontSize="10" fontWeight="bold">❌ Consequence: High latency, lost client state &amp; heavy load</text>
                  <text x="30" y="161" fill="#94a3b8" fontSize="9">Entire DOM discarded and rebuilt on every click</text>
                </g>

                {/* Modern SPA Box */}
                <g transform="translate(445, 50)">
                  <rect width="375" height="190" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="187" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Modern SPA (Client-Side JS State Engine)</text>
                  
                  <rect x="20" y="42" width="335" height="35" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="30" y="64" fill="#7dd3fc" fontSize="11">1. User Clicks Link → Intercepted by JS Router</text>

                  <rect x="20" y="85" width="335" height="35" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="30" y="107" fill="#7dd3fc" fontSize="11">2. Asynchronous JSON Fetch + Targeted DOM Mutation</text>

                  <rect x="20" y="128" width="335" height="42" rx="6" fill="url(#spaGrad)" stroke="#0369a1" />
                  <text x="30" y="146" fill="#f0f9ff" fontSize="10" fontWeight="bold">✓ Benefit: Instant navigation, zero flicker &amp; cached state</text>
                  <text x="30" y="161" fill="#bae6fd" fontSize="9">Maintains 60fps buttery smooth desktop app experience</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.2: Contrast between server-side page cycling and modern JavaScript reactive state management.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Core Ecosystem Roles &amp; Production Technical Stack
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              JavaScript serves as the unifying language across all architectural tiers of the modern web stack. By mastering the core runtime primitives, engineers can architect solutions spanning micro-frontends, serverless backends, and offline-first mobile apps.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Domain / Tier</th>
                    <th className="p-3 border border-slate-800">Primary Role of JavaScript</th>
                    <th className="p-3 border border-slate-800">Industry Technologies</th>
                    <th className="p-3 border border-slate-800">Key Engineering Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">1. Frontend UI / SPA</td>
                    <td className="p-3 text-slate-300 font-sans">Reactive state management, Virtual DOM diffing &amp; component orchestration</td>
                    <td className="p-3 text-amber-300 font-sans">React 19, Vite, Tailwind CSS, Vue, Svelte</td>
                    <td className="p-3 text-emerald-400 font-sans">Time To Interactive (TTI) &lt; 1.5s</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">2. Server-Side / APIs</td>
                    <td className="p-3 text-slate-300 font-sans">High-throughput REST/GraphQL microservices &amp; SSR rendering</td>
                    <td className="p-3 text-amber-300 font-sans">Node.js, Fastify, Express, Next.js, Bun</td>
                    <td className="p-3 text-emerald-400 font-sans">High concurrent I/O throughput</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">3. Mobile &amp; Desktop</td>
                    <td className="p-3 text-slate-300 font-sans">Single codebase driving native iOS/Android views &amp; desktop windows</td>
                    <td className="p-3 text-amber-300 font-sans">React Native, Electron, Tauri, Capacitor</td>
                    <td className="p-3 text-emerald-400 font-sans">90%+ cross-platform code reuse</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">4. Real-Time Streaming</td>
                    <td className="p-3 text-slate-300 font-sans">Bidirectional peer-to-peer data channels &amp; binary media streams</td>
                    <td className="p-3 text-amber-300 font-sans">WebSockets, WebRTC, Server-Sent Events (SSE)</td>
                    <td className="p-3 text-emerald-400 font-sans">Sub-50ms latency synchronization</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Critical Security &amp; Architectural Caveats
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Client Secrets Exposure:</strong> Never bundle private database connection strings or secret API keys in client JavaScript.</li>
                <li><strong className="text-amber-300">XSS Vulnerabilities:</strong> Using <code>innerHTML</code> with unescaped user data allows malicious script injection. Always prefer <code>textContent</code> or DOM sanitizers.</li>
                <li><strong className="text-sky-300">Over-Hydration Overhead:</strong> Sending massive JavaScript bundles for simple static content degrades mobile performance. Use selective hydration or static site generation where appropriate.</li>
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
              title="RoleOfJavascriptInModernWebDevelopmentDemo.js"
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
                <span>Anti-Pattern: Synchronous Blocking Data Processing</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Executing heavy array calculations on the main UI thread causes frame drops and makes input buttons completely unresponsive.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Freezes the UI on large datasets
function processTransactions(items) {
  for (let i = 0; i < 5000000; i++) {
    // Heavy CPU calculation on main thread!
  }
}`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: Chunked / Worker Asynchronous Task</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Offload heavy computation to dedicated Web Workers or chunk tasks using <code>requestIdleCallback</code> to preserve 60fps UI responsiveness.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Non-blocking worker offloading
const worker = new Worker("worker.js");
worker.postMessage({ items: dataset });
worker.onmessage = (e) => updateUI(e.data); // Smooth!`}
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
                  AbortSignal.timeout() for Resilient API Resilience
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Standardized in modern JavaScript, <code>AbortSignal.timeout(ms)</code> allows you to automatically cancel hanging network requests and teardown event listeners without cumbersome <code>setTimeout</code> cleanup boilerplate.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Instant 3-Second Timeout with Native AbortSignal
async function fetchWithDeadline(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
  return await res.json();
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
              Why do enterprise web architectures (like Netflix or Airbnb) increasingly choose Server-Side Rendering (SSR) or Static Site Generation (SSG) over pure Client-Side Rendering (CSR) for initial page loads?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Focus on Core Web Vitals (Largest Contentful Paint - LCP), search engine web crawler indexing, and mobile cellular data bandwidth savings!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · Role of JavaScript in Modern Web Development"
            subtitle="Explore 25+ comprehensive questions on SPAs, SSR, security, and full-stack architectures"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · Role of JavaScript in Modern Web Development"
            downloadFileName="001_001_getting-started-with-javascript-topic1-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I emphasize that learning JavaScript is not just learning syntax — it is mastering the universal runtime that connects user interfaces to databases, cloud functions, and mobile devices. Understand the client-server boundary deeply."
          />
        </section>

      </div>
    </>
  );
}
