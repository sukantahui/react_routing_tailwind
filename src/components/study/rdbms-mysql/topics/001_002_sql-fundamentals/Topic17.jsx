import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic17_files/topic17_questions";
import noteText from "./topic17_files/topic17_note.txt?raw";

/**
 * Topic17 – Pagination and Record Limiting with LIMIT and OFFSET
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Pagination Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic17 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMode, setPaginationMode] = useState("offset"); // "offset" vs "keyset"

  const dataset = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 15000 },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: 18500 },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", fee: 15000 },
    { id: 104, name: "Debangshu Roy", city: "Kolkata", fee: 20000 },
    { id: 105, name: "Mahima Sengupta", city: "Jadavpur", fee: 18500 },
    { id: 106, name: "Rahul Mukherjee", city: "Ichapur", fee: 12000 },
  ];

  const totalPages = Math.ceil(dataset.length / pageSize);

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

  const offset = (currentPage - 1) * pageSize;
  const pageRecords = dataset.slice(offset, offset + pageSize);

  const lastSeenId = offset > 0 ? dataset[offset - 1].id : 100;

  let generatedSQL = "";
  if (paginationMode === "offset") {
    generatedSQL = `SELECT student_id, first_name, city, admission_fee\nFROM students\nORDER BY student_id ASC\nLIMIT ${pageSize} OFFSET ${offset};`;
  } else {
    generatedSQL = `SELECT student_id, first_name, city, admission_fee\nFROM students\nWHERE student_id > ${lastSeenId} -- Keyset Cursor pointer\nORDER BY student_id ASC\nLIMIT ${pageSize};`;
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
            Module 001_002 · SQL Fundamentals · Topic 17
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Pagination & Record Limiting with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              LIMIT, OFFSET & Keyset
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master result set slicing, the deep offset performance cliff, Keyset (cursor-based) pagination,
            and deferred joins for large-scale enterprise data feeds.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 LIMIT & OFFSET
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Keyset (Cursor) Pagination
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📉 The Deep Offset Cliff
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Deferred Joins
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Offset vs Keyset Mechanics ─────────────── */}
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
                Offset Pagination vs Keyset (Cursor) Pagination
              </h2>
              <p className="text-xs text-slate-400">
                Why deep OFFSET degrades to O(N) and how Keyset preserves constant O(log N) latency
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Offset */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                Classic Offset Pagination: LIMIT 10 OFFSET 1000000
              </span>
              <p className="text-xs text-slate-400 mb-2">
                MySQL must read and discard 1,000,000 rows from disk before returning the 10 target records!
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                -- Degrades linearly with table size (Slow!)
                LIMIT 10 OFFSET 1000000;
              </pre>
            </div>

            {/* Card 2: Keyset */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Enterprise Keyset (Cursor) Pagination: WHERE id &gt; cursor
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Uses B-Tree index seeks to jump directly to target leaf nodes in O(log N) microseconds.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                -- Constant O(log N) latency on any page depth
                WHERE student_id &gt; 10500 LIMIT 10;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Deep Offset vs Keyset ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Deep Offset Waste vs Keyset Index Seek
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Pagination Comparison Diagram"
            >
              {/* Offset */}
              <g transform="translate(30, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ LIMIT 10 OFFSET 1,000,000
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Reads 1,000,010 full rows from disk</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• Discards 1,000,000 rows in memory</text>
                <text x="20" y="94" fill="#f43f5e" fontWeight="bold" fontSize="10">⚠️ High CPU & disk thrashing on deep pages</text>
              </g>

              {/* Keyset */}
              <g transform="translate(410, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ WHERE id &gt; 10500 LIMIT 10
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• B-Tree navigates directly to ID 10500 in O(log N)</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• Reads exactly 10 rows from disk</text>
                <text x="20" y="94" fill="#10b981" fontWeight="bold" fontSize="10">✓ Constant ~0.001s latency on 100M rows</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Pagination Sandbox ─────────── */}
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
                Interactive Pagination Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle page numbers, change page size, and switch between Offset vs Keyset pagination paradigms
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Pagination Strategy:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPaginationMode("offset")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      paginationMode === "offset"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Offset Pagination
                  </button>
                  <button
                    onClick={() => setPaginationMode("keyset")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      paginationMode === "keyset"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Keyset (Cursor)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Page Size (LIMIT):
                </label>
                <div className="flex gap-2">
                  {[2, 3, 5].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setPageSize(sz);
                        setCurrentPage(1);
                      }}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                        pageSize === sz
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {sz} records / page
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Navigate Pages:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 disabled:opacity-30"
                  >
                    ◀ Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={clsx(
                        "h-8 w-8 rounded-lg text-xs font-bold transition-all border",
                        currentPage === pg
                          ? "bg-teal-500 text-slate-950 border-teal-400"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 disabled:opacity-30"
                  >
                    Next ▶
                  </button>
                </div>
              </div>
            </div>

            {/* Generated SQL & Filter Output */}
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
                    Page {currentPage} Records (Showing {pageRecords.length} of {dataset.length}):
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    Offset: {offset}
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Fee (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {pageRecords.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">{s.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-indigo-400">{s.city}</td>
                          <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
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
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Pagination architecture from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Portal Tabular Pagination
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Deterministic offset-based pagination with 25 records per page.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    student_id,
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    admission_fee AS "Tuition (₹)"
FROM students
ORDER BY student_id ASC
LIMIT 25 OFFSET 50; -- Page 3`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Kolkata Mobile E-Commerce Infinite Scroll Keyset
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Mobile API</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                High-concurrency mobile infinite feed using Keyset pagination with zero offset performance degradation.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    product_id,
    product_name,
    unit_price AS "Price (₹)"
FROM products
WHERE product_id > 10500 -- Cursor ID from previous page
ORDER BY product_id ASC
LIMIT 20;`}
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
                Prevent pagination bugs and server memory exhaustion
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
                  <strong className="text-white">1. Missing ORDER BY:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Causes non-deterministic rows; page 2 may repeat rows already shown on page 1.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unbounded Limit Parameters:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Allowing clients to pass <code>limit=1000000</code> exhausts database memory.
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
                  <strong className="text-white">1. Adopt Keyset Pagination:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>WHERE id &gt; cursor LIMIT 20</code> for infinite scrolling feeds.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enforce Hard Limit Ceilings:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Cap maximum API request limits to 100 items in backend controllers.
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
              <span>Always combine <code>LIMIT</code> with a deterministic <code>ORDER BY</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Offset formula: <code>(page - 1) * page_size</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Deep <code>OFFSET</code> degrades to O(N) by reading and discarding skipped rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use Keyset (Cursor) pagination for constant O(log N) latency</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use Deferred Joins to optimize deep offset page jumps</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce maximum page size limits in application API endpoints</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Pagination with LIMIT & OFFSET – FAQs"
            questions={questions}
            subtitle="Master query slicing, cursor pagination, and deep offset optimization with 30 comprehensive Q&As"
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
            title="Pagination and Record Limiting with LIMIT and OFFSET"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic17_limit_offset_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Pagination is an essential feature of every modern web application, but standard offset pagination " +
              "has an architectural limitation: as users jump to page 10,000, your database must scan 100,000 rows only to " +
              "throw 99,990 of them away. In my classes in Barrackpore, I teach engineers to adopt Keyset (Cursor) pagination " +
              "(`WHERE id > last_seen_id LIMIT 20`) for all infinite-scroll mobile apps and high-volume REST APIs. " +
              "It keeps your application lightning-fast and provides constant microsecond response times regardless of data volume."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 17 · Pagination & LIMIT · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic17;
