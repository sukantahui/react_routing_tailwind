import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – CROSS JOIN: Generating Combinations and Cartesian Matrixes
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive CROSS JOIN Matrix Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Matrix State
  const [selectedMatrixMode, setSelectedMatrixMode] = useState("mode_sku_matrix"); // "mode_sku_matrix" | "mode_cinema_seats" | "mode_attendance_grid" | "mode_explosion_warning"

  const matrixScenarios = {
    mode_sku_matrix: {
      title: "1. E-Commerce Apparel SKU Variant Matrix (3 Sizes × 2 Colors)",
      sqlQuery: `SELECT 
    'Coder Academy Hoodie' AS product_name,
    sz.size_label,
    clr.color_name,
    CONCAT('CA-HD-', sz.size_code, '-', clr.color_code) AS generated_sku,
    '₹1,299.00' AS retail_price
FROM apparel_sizes sz
CROSS JOIN apparel_colors clr;`,
      resultRows: [
        { itemA: "Small (S)", itemB: "Midnight Black (BLK)", sku: "CA-HD-S-BLK", detail: "₹1,299.00", badgeColor: "emerald" },
        { itemA: "Small (S)", itemB: "Navy Blue (BLU)", sku: "CA-HD-S-BLU", detail: "₹1,299.00", badgeColor: "emerald" },
        { itemA: "Medium (M)", itemB: "Midnight Black (BLK)", sku: "CA-HD-M-BLK", detail: "₹1,299.00", badgeColor: "emerald" },
        { itemA: "Medium (M)", itemB: "Navy Blue (BLU)", sku: "CA-HD-M-BLU", detail: "₹1,299.00", badgeColor: "emerald" },
        { itemA: "Large (L)", itemB: "Midnight Black (BLK)", sku: "CA-HD-L-BLK", detail: "₹1,299.00", badgeColor: "emerald" },
        { itemA: "Large (L)", itemB: "Navy Blue (BLU)", sku: "CA-HD-L-BLU", detail: "₹1,299.00", badgeColor: "emerald" },
      ],
      verdictText: "3 × 2 = 6 SKU VARIANTS",
      badgeColor: "emerald",
      explanation: "Cross joining sizes and colors generates every product permutation needed to initialize inventory database records in a single query.",
    },
    mode_cinema_seats: {
      title: "2. Cinema Hall Seating Map (3 Rows × 4 Seats)",
      sqlQuery: `SELECT 
    r.row_letter,
    s.seat_number,
    CONCAT('SEAT-', r.row_letter, s.seat_number) AS seat_identifier,
    r.tier_name,
    '₹250.00' AS standard_ticket_price
FROM cinema_rows r
CROSS JOIN cinema_seats s;`,
      resultRows: [
        { itemA: "Row A (Executive)", itemB: "Seat 1", sku: "SEAT-A1", detail: "₹250.00", badgeColor: "cyan" },
        { itemA: "Row A (Executive)", itemB: "Seat 2", sku: "SEAT-A2", detail: "₹250.00", badgeColor: "cyan" },
        { itemA: "Row A (Executive)", itemB: "Seat 3", sku: "SEAT-A3", detail: "₹250.00", badgeColor: "cyan" },
        { itemA: "Row A (Executive)", itemB: "Seat 4", sku: "SEAT-A4", detail: "₹250.00", badgeColor: "cyan" },
        { itemA: "Row B (Premium)", itemB: "Seat 1", sku: "SEAT-B1", detail: "₹250.00", badgeColor: "cyan" },
        { itemA: "Row B (Premium)", itemB: "Seat 2", sku: "SEAT-B2", detail: "₹250.00", badgeColor: "cyan" },
      ],
      verdictText: "3 × 4 = 12 SEAT IDENTIFIERS",
      badgeColor: "cyan",
      explanation: "Cross joining auditorium rows and seat numbers generates the entire physical seating grid for Barrackpore multiplexes.",
    },
    mode_attendance_grid: {
      title: "3. Master Class Attendance Grid (3 Students × 2 Dates)",
      sqlQuery: `SELECT 
    s.student_name,
    d.session_date,
    'Pending / Absent' AS initial_status
FROM students s
CROSS JOIN batch_dates d
WHERE s.city = 'Barrackpore';`,
      resultRows: [
        { itemA: "Mamata Hui", itemB: "2026-09-01 (Session 1)", sku: "Status: Pending", detail: "Barrackpore Batch", badgeColor: "indigo" },
        { itemA: "Mamata Hui", itemB: "2026-09-02 (Session 2)", sku: "Status: Pending", detail: "Barrackpore Batch", badgeColor: "indigo" },
        { itemA: "Debangshu Roy", itemB: "2026-09-01 (Session 1)", sku: "Status: Pending", detail: "Barrackpore Batch", badgeColor: "indigo" },
        { itemA: "Debangshu Roy", itemB: "2026-09-02 (Session 2)", sku: "Status: Pending", detail: "Barrackpore Batch", badgeColor: "indigo" },
      ],
      verdictText: "PRE-POPULATED ROSTER GRID",
      badgeColor: "indigo",
      explanation: "Cross joining active students with class calendar dates creates an empty attendance ledger template ready for daily roll calls.",
    },
    mode_explosion_warning: {
      title: "4. The Cartesian Explosion Hazard (10,000 × 10,000)",
      sqlQuery: `-- ⚠️ ACCIDENTAL DISASTER (Missing ON/WHERE clause):
SELECT * 
FROM orders o 
CROSS JOIN order_items oi;

-- Result Cardinality:
-- 10,000 Orders × 10,000 Items = 100,000,000 intermediate rows!
-- Can cause memory exhaustion, buffer pool thrashing, and server crashes.`,
      resultRows: [
        { itemA: "10,000 Orders", itemB: "10,000 Items", sku: "100 Million Rows", detail: "RAM Thrashing / Crash Hazard", badgeColor: "rose" },
      ],
      verdictText: "❌ 100,000,000 ROW EXPLOSION",
      badgeColor: "rose",
      explanation: "Omitting join conditions on large production tables causes exponential multiplication, locking database memory and CPU.",
    },
  };

  const currentMatrix = matrixScenarios[selectedMatrixMode];

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
            Module 002_005 · SQL Joins · Topic 6
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            CROSS JOIN:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Combinations &amp; Cartesian Matrixes
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master intentional Cartesian products: generating product SKU variant combinations, calendar date dimension grids,
            roster templates, and understanding safeguards against accidental multi-million row memory explosions.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✖️ Cartesian Product ($M \times N$ Rows)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Product SKU Variant Matrixes
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📅 Calendar Dimension Generation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Safeguards Against Accidental Explosions
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: CROSS JOIN Theory & Mechanics ──────────── */}
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
                The Mechanics of CROSS JOIN &amp; Matrix Generation
              </h2>
              <p className="text-xs text-slate-400">
                How unconditional Cartesian pairing powers product variants, seating layouts, and calendar grids
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Cartesian Multiplication</span>
              <strong className="text-white text-xs block font-mono">Cardinality = M × N | Degree = d1 + d2</strong>
              <p className="text-xs text-slate-300">
                A pure CROSS JOIN requires no <code>ON</code> clause. Every row in Table A pairs unconditionally with every row in Table B.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Intentional vs Accidental</span>
              <strong className="text-white text-xs block font-mono">Explicit ANSI syntax prevents accidental bugs</strong>
              <p className="text-xs text-slate-300">
                Always write <code>CROSS JOIN</code> explicitly rather than comma joins (<code>FROM A, B</code>) to document that Cartesian multiplication is intentional.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Matrix Grid Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: CROSS JOIN 3 × 2 Matrix Permutation Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="CROSS JOIN Matrix Diagram"
            >
              {/* Table A (Sizes) */}
              <g transform="translate(30, 20)">
                <rect width="160" height="100" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="160" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="80" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Sizes (M = 3)</text>
                <text x="12" y="42" fill="#cbd5e1" fontSize="9">1. Small (S)</text>
                <text x="12" y="62" fill="#cbd5e1" fontSize="9">2. Medium (M)</text>
                <text x="12" y="82" fill="#cbd5e1" fontSize="9">3. Large (L)</text>
              </g>

              {/* Multiplication Symbol */}
              <text x="215" y="75" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="24">×</text>

              {/* Table B (Colors) */}
              <g transform="translate(240, 20)">
                <rect width="160" height="100" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="160" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="80" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">Colors (N = 2)</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="9">1. Black (BLK)</text>
                <text x="12" y="70" fill="#cbd5e1" fontSize="9">2. Blue (BLU)</text>
              </g>

              {/* Equals Arrow */}
              <g transform="translate(420, 60)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="35,5 48,10 35,15" fill="#10b981" />
              </g>

              {/* Output Matrix (6 Rows) */}
              <g transform="translate(485, 20)">
                <rect width="270" height="100" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="135" y="18" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Generated Matrix (3 × 2 = 6 SKUs)</text>
                <text x="12" y="38" fill="#cbd5e1" fontSize="8">S-BLK · S-BLU · M-BLK · M-BLU · L-BLK · L-BLU</text>
                <text x="12" y="58" fill="#38bdf8" fontSize="8">✓ 100% Comprehensive Product Coverage</text>
                <text x="12" y="78" fill="#a7f3d0" fontSize="8" fontWeight="bold">Single Query SKU Generator</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
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
                Interactive CROSS JOIN Matrix Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore product variant matrixes, seating grids, attendance templates, and Cartesian memory warnings
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedMatrixMode("mode_sku_matrix")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMatrixMode === "mode_sku_matrix"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. SKU Variant Matrix
              </button>

              <button
                onClick={() => setSelectedMatrixMode("mode_cinema_seats")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMatrixMode === "mode_cinema_seats"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Seating Grid
              </button>

              <button
                onClick={() => setSelectedMatrixMode("mode_attendance_grid")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMatrixMode === "mode_attendance_grid"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Attendance Ledger
              </button>

              <button
                onClick={() => setSelectedMatrixMode("mode_explosion_warning")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMatrixMode === "mode_explosion_warning"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Explosion Hazard ⚠️
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentMatrix.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentMatrix.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentMatrix.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentMatrix.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentMatrix.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentMatrix.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentMatrix.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Cartesian Output Matrix
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Table A Attribute</th>
                        <th className="p-1.5">Table B Attribute</th>
                        <th className="p-1.5">Generated Value</th>
                        <th className="p-1.5">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentMatrix.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.itemA}</td>
                          <td className="p-1.5 text-cyan-300">{r.itemB}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.sku}</td>
                          <td className="p-1.5 text-slate-300">{r.detail}</td>
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
                How Barrackpore and Kolkata training institutes safely use CROSS JOINs for matrix generation
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Course Batch Attendance Matrix Generator
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pre-generating attendance roster rows for all enrolled students across all semester dates:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Initializing Attendance Ledger via CROSS JOIN:
INSERT INTO attendance_ledger (student_id, session_date, status)
SELECT 
    s.student_id,
    c_dates.class_date,
    'Pending'
FROM students s
CROSS JOIN (
    SELECT '2026-09-01' AS class_date UNION ALL
    SELECT '2026-09-02' UNION ALL
    SELECT '2026-09-03'
) c_dates
WHERE s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Product Pricing &amp; Currency Matrix
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Combining products with active currency exchange rates for international checkout:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- International Price Matrix Generation:
SELECT 
    p.product_name,
    curr.currency_code,
    ROUND(p.base_price_inr * curr.exchange_multiplier, 2) AS converted_price
FROM products p
CROSS JOIN currency_rates curr;`}
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
                Guidelines for generating Cartesian combinations safely without risking server outages
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
                  <strong className="text-white">1. Accidental Cross Joins:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>FROM orders, order_items</code> without a WHERE clause multiplies millions of rows, crashing server memory.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Empty Table Collapse:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If one table has 0 rows, the entire Cartesian product collapses to 0 rows ($M \times 0 = 0$).
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
                  <strong className="text-white">1. Always Write Explicit CROSS JOIN:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Avoid comma joins; writing <code>CROSS JOIN</code> documents that the Cartesian multiplication is intentional.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Pre-Calculate Multiplied Row Counts:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Multiply <code>COUNT(*)</code> of both tables before executing a CROSS JOIN in production environments.
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
              <span>CROSS JOIN computes the full Cartesian Product (M × N rows)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>A pure CROSS JOIN requires no ON predicate</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Essential for SKU variants, date dimensions, and default roster matrixes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>In MySQL, CROSS JOIN with an ON clause behaves like an INNER JOIN</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>If either table has 0 rows, the entire result returns 0 rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always verify table row counts to prevent accidental billion-row Cartesian explosions</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="CROSS JOIN &amp; Cartesian Matrixes – FAQs"
            questions={questions}
            subtitle="Master CROSS JOIN, Cartesian product generation (M × N), SKU variant matrices, calendar dimension tables, attendance grids, and memory explosion safeguards with 30 comprehensive Q&As"
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
            title="CROSS JOIN: Generating Combinations and Cartesian Matrixes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_cross_join_matrices_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "A CROSS JOIN is like a double-edged sword: dangerously sharp when accidental, but amazingly powerful when intentional! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I teach students: " +
              "'If you accidentally cross join two tables of 50,000 rows each, you generate 2.5 billion rows and crash your server.' " +
              "However, if you want to generate all sizes and colors for an e-commerce catalog, or build a complete calendar dimension table, " +
              "`CROSS JOIN` is the fastest, cleanest tool in SQL. " +
              "Always write `CROSS JOIN` explicitly rather than using legacy commas so your fellow developers know you intended to create a matrix!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · CROSS JOIN Matrixes · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
