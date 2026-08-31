import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Extended Relational Algebra: Generalized Projection (Arithmetic & Scalar Calculations)
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Generalized Projection Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive Projection Settings
  const [gstRate, setGstRate] = useState(18); // 0, 5, 12, 18 %
  const [discountVal, setDiscountVal] = useState(500); // 0, 500, 1000 ₹
  const [useUppercase, setUseUppercase] = useState(false);

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", baseFee: 5500, birthYear: 2004 },
    { id: 102, name: "Mahima Sharma", city: "Kolkata", baseFee: 4800, birthYear: 2005 },
    { id: 103, name: "Abhronila Das", city: "Barrackpore", baseFee: 3800, birthYear: 2003 },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur", baseFee: 5500, birthYear: 2004 },
    { id: 105, name: "Debangshu Roy", city: "Kolkata", baseFee: 4200, birthYear: 2005 },
  ]);

  const currentYear = 2026;

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

  // Compute Generalized Projections
  const projectedResults = students.map((s) => {
    const discounted = Math.max(0, s.baseFee - discountVal);
    const gstAmount = (discounted * (gstRate / 100));
    const totalPayable = discounted + gstAmount;
    const displayName = useUppercase ? s.name.toUpperCase() : s.name;
    const age = currentYear - s.birthYear;

    return {
      id: s.id,
      name: displayName,
      city: s.city,
      baseFee: s.baseFee,
      discount: discountVal,
      taxable: discounted,
      gst: gstAmount,
      total: totalPayable,
      age: age,
    };
  });

  const mathNotation = `π_{id, ${useUppercase ? "UPPER(name)" : "name"}, fee − ${discountVal} → taxable, taxable × ${(1 + gstRate / 100).toFixed(2)} → total, (2026 − birth_year) → age}(Students)`;

  const sqlQuery = `SELECT student_id,
       ${useUppercase ? "UPPER(full_name)" : "full_name"} AS student_name,
       admission_fee,
       (admission_fee - ${discountVal}) AS taxable_amount,
       ROUND((admission_fee - ${discountVal}) * ${gstRate / 100}, 2) AS gst_amount,
       ROUND((admission_fee - ${discountVal}) * ${(1 + gstRate / 100).toFixed(2)}, 2) AS total_fee_with_gst,
       (2026 - YEAR(dob)) AS age_years
FROM students;`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 11
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Generalized Projection (π):{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Arithmetic &amp; Scalar Calculations
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical extension of relational projection: Generalized Projection (π_F),
            row-level arithmetic formulas, scalar string/date transformations, tax computations, and SQL computed column mappings.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧮 Scalar Arithmetic: fee × 1.18 → total
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔤 String Scalars: UPPER / CONCAT
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📅 Date Functions: DATEDIFF / TIMESTAMPDIFF
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SQL SELECT Computed Columns
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Semantics & Notation ─────────── */}
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
                Generalized Projection Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Extending classical projection with row-by-row arithmetic, scalar expressions, and renaming
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Arithmetic Expressions</span>
              <strong className="text-white text-xs block font-mono">fee × 1.18 → fee_gst</strong>
              <p className="text-[11px] text-slate-400">Applies GST, discounts, currency conversions per row.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. String Transformations</span>
              <strong className="text-white text-xs block font-mono">UPPER(city) → city_upper</strong>
              <p className="text-[11px] text-slate-400">Case formatting, substrings, and string concatenations.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Relational Closure</span>
              <strong className="text-white text-xs block font-mono">Degree = n Expressions</strong>
              <p className="text-[11px] text-slate-400">Produces a strongly-typed relation with calculated headers.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Generalized Projection Calculation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Generalized Projection Pipeline (Raw Tuple → Scalar Pipeline → Computed Output)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Generalized Projection Pipeline Diagram"
            >
              {/* Raw Input Tuple */}
              <g transform="translate(30, 20)">
                <rect width="200" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="200" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="100" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Raw Input Tuple (Students)</text>
                <text x="10" y="42" fill="#cbd5e1">id: 101, name: 'Mamata Hui'</text>
                <text x="10" y="60" fill="#cbd5e1">base_fee: ₹5,500.00</text>
                <text x="10" y="78" fill="#cbd5e1">birth_year: 2004</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(245, 60)">
                <path d="M 0,5 L 35,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="35,1 45,5 35,9" fill="#64748b" />
                <text x="20" y="-5" fill="#f59e0b" fontSize="8" textAnchor="middle">π_F1..Fn</text>
              </g>

              {/* Calculation Kernel */}
              <g transform="translate(305, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="105" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Scalar Transformations</text>
                <text x="10" y="42" fill="#10b981">taxable = fee − ₹500 = ₹5,000</text>
                <text x="10" y="60" fill="#10b981">gst = 5,000 × 0.18 = ₹900</text>
                <text x="10" y="78" fill="#10b981">total = ₹5,900 | age = 22 yrs</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(530, 60)">
                <path d="M 0,5 L 35,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="35,1 45,5 35,9" fill="#64748b" />
              </g>

              {/* Output Tuple */}
              <g transform="translate(580, 20)">
                <rect width="170" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="85" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">Computed Output Schema</text>
                <text x="10" y="42" fill="#38bdf8">taxable_amount: ₹5,000</text>
                <text x="10" y="60" fill="#f59e0b">gst_amount: ₹900.00</text>
                <text x="10" y="78" fill="#10b981" fontWeight="bold">total_fee: ₹5,900.00</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Generalized Projection Sandbox ── */}
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
                Interactive Scalar Calculation &amp; Tax Engine
              </h2>
              <p className="text-xs text-slate-400">
                Adjust GST rates, discount vouchers, and string transforms to inspect live mathematical notation and SQL output
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Control Knobs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* GST Rate Knob */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">GST Rate Tier:</span>
                <div className="grid grid-cols-4 gap-1">
                  {[0, 5, 12, 18].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={clsx(
                        "py-1 rounded text-xs font-mono font-bold border transition-all",
                        gstRate === rate
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Knob */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <span className="text-xs font-bold text-cyan-400 block">Discount Voucher:</span>
                <div className="grid grid-cols-3 gap-1">
                  {[0, 500, 1000].map((disc) => (
                    <button
                      key={disc}
                      onClick={() => setDiscountVal(disc)}
                      className={clsx(
                        "py-1 rounded text-xs font-mono font-bold border transition-all",
                        discountVal === disc
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      ₹{disc}
                    </button>
                  ))}
                </div>
              </div>

              {/* String Case Knob */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">String Scalar Transform:</span>
                <button
                  onClick={() => setUseUppercase(!useUppercase)}
                  className={clsx(
                    "w-full py-1.5 rounded text-xs font-bold border transition-all",
                    useUppercase
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                  )}
                >
                  {useUppercase ? "✓ UPPER(name) Active" : "Original Case (name)"}
                </button>
              </div>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    Generalized Projection Breakdown:
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {mathNotation}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {sqlQuery}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Result Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Computed Projection ({projectedResults.length} records)</span>
                    <span className="text-teal-400 font-mono text-[11px]">Degree: 6 Cols</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">Student</th>
                          <th className="p-1.5">Base</th>
                          <th className="p-1.5">Taxable</th>
                          <th className="p-1.5">GST ({gstRate}%)</th>
                          <th className="p-1.5">Total Payable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {projectedResults.map((r) => (
                          <tr key={r.id}>
                            <td className="p-1.5 text-white font-bold">{r.name}</td>
                            <td className="p-1.5 text-slate-400">₹{r.baseFee}</td>
                            <td className="p-1.5 text-cyan-300 font-bold">₹{r.taxable}</td>
                            <td className="p-1.5 text-amber-300">₹{r.gst.toFixed(2)}</td>
                            <td className="p-1.5 text-emerald-300 font-bold">₹{r.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                GST invoice computations and student age metrics from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's GST Invoice Billing Generator (18% Tax)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\id, name, fee, fee \\times 0.18 \→ \gst, fee \\times 1.18 \→ \total}(\Students)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT student_id, full_name, admission_fee,
       ROUND(admission_fee * 0.18, 2) AS gst_amount,
       ROUND(admission_fee * 1.18, 2) AS total_fee_with_gst
FROM students;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Student Age Calculation in Years
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\name, TIMESTAMPDIFF(YEAR, dob, CURDATE()) \→ \age}(\Students)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT full_name, dob, TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age_in_years
FROM students;`}
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
                Avoid division by zero and NULL propagation in arithmetic expressions
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
                  <strong className="text-white">1. Division by Zero:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>score / count</code> yields <code>NULL</code> or crash if count is 0.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. NULL Propagation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Adding a bonus to a NULL salary (<code>salary + bonus</code>) results in NULL.
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
                  <strong className="text-white">1. Guard with NULLIF():</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always write <code>score / NULLIF(count, 0)</code> to safely handle zero denominators.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use COALESCE() for NULLs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wrap nullable columns with <code>COALESCE(bonus, 0)</code> to guarantee accurate totals.
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
              <span>Generalized Projection (π_F) allows scalar expressions in projection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Operates strictly row-by-row (scalar scope; multi-row aggregation requires $\mathcal{G}$)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Maps directly to calculated expressions and functions in SQL `SELECT`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always assign explicit aliases (`AS col_name`) for all computed columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `NULLIF(col, 0)` to guard against division-by-zero errors</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `COALESCE(col, 0)` to prevent NULL propagation in arithmetic expressions</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Generalized Projection – FAQs"
            questions={questions}
            subtitle="Master extended relational algebra, Generalized Projection (π), scalar arithmetic, string formatting, date calculations, and SQL calculated columns with 30 comprehensive Q&As"
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
            title="Extended Relational Algebra: Generalized Projection (Arithmetic & Scalar Calculations)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic11_generalized_projection_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Generalized Projection is the bridge between pure mathematical relational theory and real-world business applications! " +
              "In my classes in Barrackpore, I teach students that real applications never just retrieve raw columns: they calculate " +
              "18% GST amounts, compute discounted student fees, format student full names with `CONCAT`, and calculate age from `dob`. " +
              "Remember that Generalized Projection operates strictly ROW-BY-ROW. " +
              "Whenever you write arithmetic in SQL, always remember the 2 golden defensive programming rules: " +
              "1) Guard against division by zero with `NULLIF(denominator, 0)`, and 2) Prevent NULL propagation using `COALESCE(bonus, 0)`. " +
              "This guarantees robust, production-grade business logic in all your database queries!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 11 · Generalized Projection · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;
