import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import membershipIn from "./topic6_files/membership_in_operator.py?raw";
import notInDemo from "./topic6_files/not_in_operator_demo.py?raw";
import benchmarkDemo from "./topic6_files/membership_complexity_benchmark.py?raw";
import accessGuard from "./topic6_files/access_guard_real_world.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Membership Testing Using 'in' and 'not in'
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive exploration of O(1) set membership testing, __contains__ protocol,
 * benchmarking 1,000,000-item collections, Boolean quirks (True in {1}),
 * and preventing the O(N^2) set re-creation anti-pattern in loops.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("speed");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Segment 2 • Module 002_006
          </span>
          <span className="text-xs sm:text-sm font-mono bg-sky-950/80 text-sky-300 px-3 py-1 rounded-full border border-sky-800/80 shadow-sm shadow-sky-950/50">
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            High-Velocity Querying
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Membership Testing: <code className="text-emerald-400 font-mono">in</code> & <code className="text-sky-400 font-mono">not in</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Harnessing instantaneous <span className="text-emerald-400 font-semibold">O(1)</span> hash-powered membership queries, eliminating slow linear scans, and building high-throughput authorization gateways.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ 10,000x Faster than List Scan
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 __contains__ Dunder Protocol
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛑 Avoid O(N²) Loop Trap
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Firewall & Whitelist Guards
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE POWER OF O(1) MEMBERSHIP */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Superpower of Set Membership Testing
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In computer science, membership testing answers the fundamental question: <em className="text-white">"Is entity X present in dataset S?"</em>. The speed at which your program answers this question defines application scalability:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* List Search */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-800/60 shadow-lg shadow-amber-950/30 transition-all duration-300 hover:border-amber-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
                    <span>📜</span> List Search: O(N)
                  </div>
                  <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                    Linear Scan
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Python starts at index 0 and inspects every element sequentially until it finds a match or exhausts the list.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Across 1,000,000 items: Takes up to <strong className="text-rose-400">1,000,000 pointer checks</strong> (~15ms).
                </div>
              </div>

              {/* Set Search */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>⚡</span> Set Search: O(1)
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Constant Time
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Python computes <code className="font-mono text-emerald-300">hash(target)</code> and jumps directly to the pre-calculated bucket.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Across 1,000,000 items: Takes exactly <strong className="text-emerald-400">1 direct hash jump</strong> (&lt;0.0001ms).
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-emerald-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Under the Hood: The <code className="font-mono text-emerald-400">__contains__</code> Protocol
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                When you write <code className="text-emerald-300 font-mono">if candidate in certified_set:</code>, Python translates it directly to <code className="text-emerald-300 font-mono">certified_set.__contains__(candidate)</code>, executing in blazing fast C-level speed.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG BENCHMARK VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Lookup Complexity & The Loop Anti-Pattern
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("speed")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "speed"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                1 Million Item Benchmark
              </button>
              <button
                onClick={() => setActiveTab("antipattern")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "antipattern"
                    ? "bg-amber-900/50 text-amber-300 border border-amber-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The O(N²) Loop Trap
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "speed" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Searching for Item 999,999 in a 1,000,000 Element Collection</text>

                {/* List Lookup */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="50" y="95" fill="#fbbf24" fontSize="15" fontWeight="bold">List Search: 999,999 in my_list</text>

                <rect x="50" y="115" width="340" height="40" rx="6" fill="#451a03" stroke="#f59e0b" />
                <text x="65" y="140" fill="#fde68a" fontSize="13" fontWeight="bold">Time: ~15.2400 ms (1,000,000 checks)</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Inspects index 0, 1, 2, 3... up to 999,999.</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• High CPU usage and pointer iteration overhead.</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">❌ Slow O(N) linear scan!</text>

                {/* Set Lookup */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="460" y="95" fill="#34d399" fontSize="15" fontWeight="bold">Set Search: 999,999 in my_set</text>

                <rect x="460" y="115" width="340" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="140" fill="#a7f3d0" fontSize="13" fontWeight="bold">Time: ~0.0004 ms (1 direct jump)</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• hash(999999) jumps directly to bucket address.</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Zero memory traversal across other 999,999 items.</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">⚡ ~38,000x FASTER than List!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">The Catastrophic O(N²) Loop Anti-Pattern</text>

                {/* Left: Anti-Pattern */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">THE ANTI-PATTERN: Inside Loop</text>

                <rect x="50" y="115" width="340" height="45" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="60" y="142" fill="#fecaca" fontSize="11" fontWeight="mono">for x in data: if x in set(big_list):</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Re-builds 1,000,000-item set on EVERY iteration!</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• 10,000 iterations = 10,000,000,000 operations.</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">💥 Catastrophic O(N²) quadratic freeze!</text>

                {/* Right: Best Practice */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">THE PYTHONIC PATTERN: Hoist Set</text>

                <rect x="460" y="115" width="340" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="470" y="142" fill="#a7f3d0" fontSize="11" fontWeight="mono">fast_set = set(big_list) # ONCE outside</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• Set is built exactly once outside the loop O(N).</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Each loop check executes in O(1) constant time.</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">✓ Blazing fast O(N) linear completion!</text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CODE LABS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Python Code Labs
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab A: Positive & Negative Membership with 'in' and 'not in'
              </h3>
              <PythonFileLoader
                fileModule={membershipIn}
                title="membership_in_operator.py"
                highlightLines={[6, 14, 19, 24]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Security Blocklist Filtering with 'not in'
              </h3>
              <PythonFileLoader
                fileModule={notInDemo}
                title="not_in_operator_demo.py"
                highlightLines={[6, 13]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Million-Item Benchmark: O(1) Set vs O(N) List Lookup
              </h3>
              <PythonFileLoader
                fileModule={benchmarkDemo}
                title="membership_complexity_benchmark.py"
                highlightLines={[7, 14, 19, 28]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Authorization Gateway & Tuition Fee Audit in ₹
              </h3>
              <PythonFileLoader
                fileModule={accessGuard}
                title="access_guard_real_world.py"
                highlightLines={[6, 15, 22]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD APPLICATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Real-World Applications in West Bengal Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎓</span> 1. Cloud Lab Access Verification
              </div>
              <p className="text-sm text-slate-300">
                When Susmita, Mamata, and Debangshu log in to the Advanced Python Cloud Lab in <strong>Barrackpore</strong>, membership check <code className="font-mono text-emerald-400">if student_id in premium_students</code> validates tuition payment (<strong className="text-emerald-300">₹4,500</strong>) in under 1 microsecond.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛡️</span> 2. High-Velocity API Firewalls
              </div>
              <p className="text-sm text-slate-300">
                Payment gateways serving <strong>Kolkata</strong> fintech platforms evaluate incoming requests against banned IP sets <code className="font-mono text-sky-400">if client_ip not in banned_ips</code>, shielding backend servers from DDoS attacks at zero latency.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🕷️</span> 3. Web Scraper Deduplication
              </div>
              <p className="text-sm text-slate-300">
                Data engineering pipelines crawling product prices verify <code className="font-mono text-purple-400">if url not in visited_urls</code> before dispatching HTTP requests, avoiding duplicate network bandwidth consumption.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📖</span> 4. Real-Time Spell Checkers
              </div>
              <p className="text-sm text-slate-300">
                Document editing engines in <strong>Jadavpur</strong> load 250,000 vocabulary words into a set, validating typed words in <span className="font-semibold text-emerald-400">O(1)</span> time without stuttering user keystrokes.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Pitfalls & Tricky Gotchas with Membership Testing
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Set Re-Creation in Loops
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">if x in set(big_list):</code> inside a loop destroys performance to O(N²). Construct the set <strong className="text-white">once outside</strong> the loop!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Searching with Unhashable Target
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">[1, 2] in my_set</code> raises <code className="text-rose-400 font-bold">TypeError: unhashable type: 'list'</code>. Target search keys must be immutable.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Case-Sensitivity Assumptions
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">'kolkata' in {'{Kolkata}'}</code> is <code className="text-rose-400 font-bold">False</code>. String hashing is strictly case-sensitive.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Float Precision Glitches
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">0.1 + 0.2 in {'{0.3}'}</code> returns <code className="text-rose-400 font-bold">False</code> due to binary float representation (0.30000000000000004).
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Membership Testing Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic6_membership_testing_in_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 6 • Membership Testing (in / not in): Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Golden Speed Rule: If your code ever searches for items inside a collection more than once, NEVER use a list! Convert that collection to a set once, and enjoy instantaneous O(1) lookups that can make your code up to 38,000x faster. When Susmita, Abhronila, and Debangshu build authorization systems in Barrackpore, sets are your superhighway!"
          />
        </section>

      </div>
    </div>
  );
}
