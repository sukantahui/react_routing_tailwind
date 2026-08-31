import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – SELECT Syntax, Column Aliasing (AS), and DISTINCT Keyword
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Query Projection Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive Query Projection Sandbox State
  const [includeDistinct, setIncludeDistinct] = useState(false);
  const [selectedCols, setSelectedCols] = useState({
    name: true,
    city: true,
    fee: true,
    gst: true,
  });

  const rawData = [
    { name: "Mamata Hui", city: "Barrackpore", fee: 15000 },
    { name: "Abhronila Das", city: "Barrackpore", fee: 18500 },
    { name: "Susmita Ghosh", city: "Kolkata", fee: 15000 },
    { name: "Debangshu Roy", city: "Kolkata", fee: 20000 },
    { name: "Mahima Sengupta", city: "Jadavpur", fee: 18500 },
    { name: "Mamata Hui", city: "Barrackpore", fee: 15000 }, // duplicate
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleToggleCol = (col) => {
    setSelectedCols({ ...selectedCols, [col]: !selectedCols[col] });
  };

  // Build projected query string
  const colList = [];
  if (selectedCols.name) colList.push("CONCAT(first_name, ' ', last_name) AS full_name");
  if (selectedCols.city) colList.push("city AS student_city");
  if (selectedCols.fee) colList.push("admission_fee AS `Tuition (₹)`");
  if (selectedCols.gst) colList.push("ROUND(admission_fee * 0.18, 2) AS `GST (18%)`");

  const generatedSQL = `SELECT ${includeDistinct ? "DISTINCT " : ""}\n    ${colList.length > 0 ? colList.join(",\n    ") : "*"}\nFROM students;`;

  // Compute live output data based on active toggles
  let processedData = rawData.map((r) => {
    const obj = {};
    if (selectedCols.name) obj["Full Name"] = r.name;
    if (selectedCols.city) obj["City"] = r.city;
    if (selectedCols.fee) obj["Tuition (₹)"] = `₹${r.fee.toLocaleString("en-IN")}.00`;
    if (selectedCols.gst) obj["GST (18%)"] = `₹${(r.fee * 0.18).toLocaleString("en-IN")}.00`;
    return obj;
  });

  if (includeDistinct) {
    const seen = new Set();
    processedData = processedData.filter((item) => {
      const key = JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return (
    <>
      {/* ─── Scoped Component Styles & Reveal Keyframes ────────── */}
      <style>{`
        .reveal-section {
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-5xl mx-auto px-4 py-10 md:py-14",
          "bg-slate-950 text-slate-100 font-sans leading-relaxed"
        )}
      >
        {/* ─── Module Breadcrumb & Topic Header ────────────────── */}
        <div ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Module 001_002 · SQL Fundamentals · Topic 8
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            SELECT Syntax,{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Aliasing (AS) & DISTINCT
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational data projection, calculated expressions, output column aliasing,
            duplicate elimination with DISTINCT, and SQL execution ordering.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 SELECT Projections
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏷️ Column Aliasing with AS
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✨ DISTINCT Deduplication
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ SQL Execution Lifecycle
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Concepts & Anti-Pattern Alert ──────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                The SELECT Statement & The SELECT * Anti-Pattern
              </h2>
              <p className="text-xs text-slate-400">
                Explicit column projection vs full row retrieval overhead
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In production backend services and analytics engines, <strong>explicitly specifying required column names</strong> is mandatory.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                <h3 className="font-bold text-rose-300 flex items-center gap-2 text-sm mb-2">
                  <span>❌</span> Why SELECT * is Dangerous in Production:
                </h3>
                <ul className="space-y-1.5 text-xs text-rose-200/90">
                  <li>• <strong>Wasted Bandwidth:</strong> Transfers massive unused TEXT/BLOB fields over the wire.</li>
                  <li>• <strong>Breaks Covering Indexes:</strong> Forces InnoDB to scan clustered index disk pages.</li>
                  <li>• <strong>Fragile API Contracts:</strong> Schema alterations break positional frontend mappings.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 p-4">
                <h3 className="font-bold text-teal-300 flex items-center gap-2 text-sm mb-2">
                  <span>✅</span> Explicit Column Projection:
                </h3>
                <ul className="space-y-1.5 text-xs text-teal-200/90">
                  <li>• <strong>Optimized RAM:</strong> Minimal memory footprint in Node.js / Spring Boot buffers.</li>
                  <li>• <strong>Enables Covering Indexes:</strong> Executes queries in micro-seconds directly from index RAM.</li>
                  <li>• <strong>Self-Documenting:</strong> Clear contract of what attributes the query requires.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: SQL Execution Order ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 7-Stage SQL Query Logical Execution Pipeline
            </h3>
            <svg
              viewBox="0 0 780 120"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="SQL Execution Order Diagram"
            >
              {[
                { stage: "1. FROM", desc: "Identify Tables & JOINs", color: "#38bdf8" },
                { stage: "2. WHERE", desc: "Filter Raw Rows", color: "#818cf8" },
                { stage: "3. GROUP BY", desc: "Aggregate Buckets", color: "#c084fc" },
                { stage: "4. HAVING", desc: "Filter Aggregates", color: "#f472b6" },
                { stage: "5. SELECT", desc: "Compute Projections & Aliases", color: "#34d399" },
                { stage: "6. DISTINCT", desc: "Deduplicate Tuples", color: "#fbbf24" },
                { stage: "7. ORDER / LIMIT", desc: "Sort & Paginate", color: "#f87171" },
              ].map((step, idx) => (
                <g key={idx} transform={`translate(${15 + idx * 108}, 20)`}>
                  <rect width="102" height="75" rx="6" fill="#1e293b" stroke={step.color} strokeWidth="1.5" />
                  <text x="51" y="24" fill={step.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {step.stage}
                  </text>
                  <line x1="10" y1="34" x2="92" y2="34" stroke="#334155" />
                  <text x="51" y="52" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    {step.desc}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Projection & DISTINCT Sandbox ── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Query Projection & DISTINCT Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle projected attributes, apply calculated GST expressions, and test DISTINCT deduplication
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Controls */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Columns & Expressions to Project:
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCols.name}
                      onChange={() => handleToggleCol("name")}
                      className="rounded border-slate-700 bg-slate-800 text-teal-500"
                    />
                    <span><strong>Full Name:</strong> <code>CONCAT(first_name, ' ', last_name) AS full_name</code></span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCols.city}
                      onChange={() => handleToggleCol("city")}
                      className="rounded border-slate-700 bg-slate-800 text-teal-500"
                    />
                    <span><strong>City:</strong> <code>city AS student_city</code></span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCols.fee}
                      onChange={() => handleToggleCol("fee")}
                      className="rounded border-slate-700 bg-slate-800 text-teal-500"
                    />
                    <span><strong>Tuition Fee:</strong> <code>admission_fee AS `Tuition (₹)`</code></span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCols.gst}
                      onChange={() => handleToggleCol("gst")}
                      className="rounded border-slate-700 bg-slate-800 text-teal-500"
                    />
                    <span><strong>Calculated GST (18%):</strong> <code>ROUND(admission_fee * 0.18, 2) AS `GST (18%)`</code></span>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDistinct}
                    onChange={(e) => setIncludeDistinct(e.target.checked)}
                    className="rounded border-amber-600 bg-slate-800 text-amber-500"
                  />
                  <span><strong>Apply DISTINCT Modifier:</strong> Filter out duplicate output tuples</span>
                </label>
              </div>
            </div>

            {/* Right: Live Query & Result Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedSQL}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Result Set:
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {processedData.length} row(s) returned
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        {Object.keys(processedData[0] || {}).map((k) => (
                          <th key={k} className="p-2">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {processedData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          {Object.values(row).map((v, i) => (
                            <td key={i} className="p-2">{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Projection & Roster Reporting (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Production queries from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Student Fee Calculation Report
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Generates a clean tabular student invoice statement with calculated GST and formatted headers.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no AS "Registration Number",
    CONCAT(first_name, ' ', last_name) AS "Student Name",
    email AS "Email Address",
    admission_fee AS "Tuition Fee (₹)",
    ROUND(admission_fee * 0.18, 2) AS "GST Tax (₹)",
    ROUND(admission_fee * 1.18, 2) AS "Total Due (₹)"
FROM students
ORDER BY admission_fee DESC;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Distinct Category Discovery
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extracts unique brand and category pairings for the e-commerce navigation menu.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT DISTINCT
    category_name AS "Category",
    brand_name AS "Brand"
FROM products
ORDER BY category_name, brand_name;`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Avoid query errors and unnecessary database memory consumption
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Common Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Using Aliases in the WHERE Clause:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>WHERE total_fee &gt; 20000</code> fails because <code>WHERE</code> executes before <code>SELECT</code> creates the alias.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Believing DISTINCT Applies to 1 Column Only:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>SELECT DISTINCT a, b</code> applies to the combination of <code>(a, b)</code>, not <code>a</code> alone.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>✅</span> Production Best Practices
              </h3>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Explicit Column Projection:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Never use <code>SELECT *</code> in production backend code.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use Backticks for Special Aliases:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wrap aliases with spaces or currency symbols: <code>AS `Fee (₹)`</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Summary Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Summary Checklist (What You Must Remember)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Explicitly name columns; avoid <code>SELECT *</code> in production code</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>AS alias_name</code> to format computed expression headers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>DISTINCT</code> eliminates duplicate tuples across all projected columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>COUNT(DISTINCT col)</code> to count unique items</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Aliases CANNOT be referenced in <code>WHERE</code> (use in <code>ORDER BY</code> / <code>HAVING</code>)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>SQL Lifecycle: FROM -&gt; WHERE -&gt; GROUP BY -&gt; HAVING -&gt; SELECT -&gt; DISTINCT -&gt; ORDER BY</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="SELECT Syntax & DISTINCT – FAQs"
            questions={questions}
            subtitle="Master data projection, expression aliasing, duplicate filtering, and query execution pipelines with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 7: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="SELECT Syntax, Column Aliasing (AS), and DISTINCT Keyword"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_select_distinct_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Mastering the `SELECT` statement is the heart of database querying. In my classes at Barrackpore, " +
              "I frequently see students confused about why they cannot filter by a column alias in the `WHERE` clause. " +
              "Always remember the SQL lifecycle: the database must first filter rows with `WHERE` before it computes expressions " +
              "and assigns labels in `SELECT`. Understanding this internal pipeline will make writing complex queries intuitive " +
              "and second nature."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · SELECT Syntax & DISTINCT · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
