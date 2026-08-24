import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Theta Join (⨝θ) and Equijoin Operations
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Theta Join Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Theta Join Simulator State
  const [joinMode, setJoinMode] = useState("equi"); // "equi" | "nonequi"

  const [students] = useState([
    { id: 101, name: "Mamata Hui", fee: 5500, city: "Barrackpore" },
    { id: 102, name: "Mahima Sharma", fee: 4800, city: "Kolkata" },
    { id: 103, name: "Abhronila Das", fee: 3800, city: "Barrackpore" },
    { id: 104, name: "Susmita Ghosh", fee: 5500, city: "Ichapur" },
  ]);

  const [enrollments] = useState([
    { studentId: 101, course: "MySQL Masterclass", grade: "A+" },
    { studentId: 102, course: "React Architect", grade: "A" },
    { studentId: 103, course: "Data Modeling", grade: "B+" },
    { studentId: 101, course: "Advanced SQL", grade: "A+" },
  ]);

  const [feeBands] = useState([
    { tier: "Tier 1 (Scholarship)", minFee: 3000, maxFee: 4000, discountPct: "20%" },
    { tier: "Tier 2 (Standard)", minFee: 4001, maxFee: 5000, discountPct: "10%" },
    { tier: "Tier 3 (Premium)", minFee: 5001, maxFee: 6000, discountPct: "0%" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Theta Join Engine Active. Toggle between Equijoin (Equality) and Non-Equi Join (Range Comparisons) to inspect relational algebra derivations."
  );

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

  // 1. Compute Equijoin (Students ⨝_{s.id = e.student_id} Enrollments)
  const equiResults = [];
  students.forEach((s) => {
    enrollments.forEach((e) => {
      if (s.id === e.studentId) {
        equiResults.push({
          studentId: s.id,
          name: s.name,
          city: s.city,
          enrollStudentId: e.studentId,
          course: e.course,
          grade: e.grade,
        });
      }
    });
  });

  // 2. Compute Non-Equi Range Join (Students ⨝_{fee BETWEEN minFee AND maxFee} FeeBands)
  const nonEquiResults = [];
  students.forEach((s) => {
    feeBands.forEach((b) => {
      if (s.fee >= b.minFee && s.fee <= b.maxFee) {
        nonEquiResults.push({
          studentId: s.id,
          name: s.name,
          fee: s.fee,
          tier: b.tier,
          minFee: b.minFee,
          maxFee: b.maxFee,
          discount: b.discountPct,
        });
      }
    });
  });

  const equiMath = "Students ⨝_{Students.id = Enrollments.student_id} Enrollments";
  const equiSQL = `SELECT s.student_id, s.full_name, s.city, e.student_id AS enroll_sid, e.course, e.grade\nFROM students s\nINNER JOIN enrollments e ON s.student_id = e.student_id;`;

  const nonEquiMath = "Students ⨝_{Students.fee ≥ Bands.min_fee ∧ Students.fee ≤ Bands.max_fee} Fee_Bands";
  const nonEquiSQL = `SELECT s.student_id, s.full_name, s.admission_fee, b.tier, b.min_fee, b.max_fee, b.discount_pct\nFROM students s\nINNER JOIN fee_bands b ON s.admission_fee >= b.min_fee AND s.admission_fee <= b.max_fee;`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 7
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Theta Join (⨝θ) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Equijoin Operations
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational join theory: Theta Join ($R \bowtie_\theta S \equiv \sigma_\theta(R \times S)$),
            Equijoins (equality matching preserving both columns), Non-Equi range joins, and index optimization.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👑 Theta Join: σ_θ(R × S)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🤝 Equijoin: θ is Strict Equality (=)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Non-Equi: Range &amp; Inequality (&lt;, &gt;, BETWEEN)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Degree: Deg(R) + Deg(S)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory & Derivation ─────────── */}
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
                Theta Join (⨝θ) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Definition as Selection over Cartesian Product, degree preservation, and Equijoin semantics
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Theta Join Definition</span>
              <strong className="text-white text-xs block font-mono">R ⨝_θ S ≡ σ_θ(R × S)</strong>
              <p className="text-[11px] text-slate-400">Combines Cartesian Product with a boolean predicate $\theta$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Equijoin (θ is =)</span>
              <strong className="text-white text-xs block font-mono">R ⨝_{`{R.A = S.B}`} S</strong>
              <p className="text-[11px] text-slate-400">Preserves BOTH $R.A$ and $S.B$ in schema (Degree = $n + m$).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Non-Equi Join</span>
              <strong className="text-white text-xs block font-mono">R ⨝_{`{R.A ≥ S.B}`} S</strong>
              <p className="text-[11px] text-slate-400">Uses inequalities (&lt;, &le;, &gt;, &ge;) for bands &amp; time ranges.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Theta Join Derivation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Theta Join Derivation Flow ($R \times S \rightarrow \sigma_\theta \rightarrow R \bowtie_\theta S$)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Theta Join Derivation Diagram"
            >
              {/* Step 1: Cross Product */}
              <g transform="translate(30, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="105" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. Cartesian Product (R × S)</text>
                <text x="10" y="42" fill="#cbd5e1">All Pairwise Combinations</text>
                <text x="10" y="60" fill="#cbd5e1">Degree = n + m</text>
                <text x="10" y="78" fill="#f59e0b">Cardinality = |R| × |S|</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(250, 60)">
                <path d="M 0,5 L 40,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="40,1 50,5 40,9" fill="#64748b" />
                <text x="20" y="-5" fill="#f59e0b" fontSize="9" textAnchor="middle">Apply σ_θ</text>
              </g>

              {/* Step 2: Selection Predicate */}
              <g transform="translate(310, 20)">
                <rect width="200" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="200" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="100" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">2. Selection Filter (σ_θ)</text>
                <text x="10" y="42" fill="#10b981">Condition: R.A = S.B (Equi)</text>
                <text x="10" y="60" fill="#38bdf8">OR R.fee ≥ S.min (Non-Equi)</text>
                <text x="10" y="78" fill="#cbd5e1">Discards Non-Matches</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(520, 60)">
                <path d="M 0,5 L 40,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="40,1 50,5 40,9" fill="#64748b" />
              </g>

              {/* Step 3: Resulting Theta Join */}
              <g transform="translate(570, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="90" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">3. Theta Join (R ⨝_θ S)</text>
                <text x="10" y="42" fill="#10b981">Preserves Both Columns</text>
                <text x="10" y="60" fill="#38bdf8">Evaluated via Hash Join</text>
                <text x="10" y="78" fill="#cbd5e1">Zero Cartesian Materialization</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Theta Join Simulator ────────── */}
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
                Interactive Theta Join &amp; Equijoin Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between Equijoin and Non-Equi Range Join to inspect mathematical notations and SQL executions
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Selectors */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setJoinMode("equi");
                  setEngineLog("✓ Evaluated Equijoin: Students ⨝_{s.id = e.student_id} Enrollments. Matched students to their enrolled courses on exact equality (=).");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  joinMode === "equi"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Equijoin Mode (Equality Match: s.id = e.student_id)
              </button>

              <button
                onClick={() => {
                  setJoinMode("nonequi");
                  setEngineLog("✓ Evaluated Non-Equi Join: Students ⨝_{fee BETWEEN min_fee AND max_fee} Fee_Bands. Matched students to scholarship bands on range inequalities (≥, ≤).");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  joinMode === "nonequi"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Non-Equi Join Mode (Range Match: fee BETWEEN min AND max)
              </button>
            </div>

            {/* Sandbox Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    {joinMode === "equi" ? "Equijoin Query Breakdown:" : "Non-Equi Range Join Breakdown:"}
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {joinMode === "equi" ? equiMath : nonEquiMath}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {joinMode === "equi" ? equiSQL : nonEquiSQL}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">{engineLog}</pre>
                </div>
              </div>

              {/* Right: Live Result Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    {joinMode === "equi" ? (
                      <span>Equijoin Result (Both Key Columns Preserved: {equiResults.length} rows)</span>
                    ) : (
                      <span>Non-Equi Band Matching ({nonEquiResults.length} rows)</span>
                    )}
                    <span className="text-teal-400 font-mono text-[11px]">
                      Degree: {joinMode === "equi" ? "6 Cols" : "7 Cols"}
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      {joinMode === "equi" ? (
                        <>
                          <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">s.id</th>
                              <th className="p-1.5">Student Name</th>
                              <th className="p-1.5">e.sid</th>
                              <th className="p-1.5">Course</th>
                              <th className="p-1.5">Grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {equiResults.map((r, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-cyan-300 font-bold">#{r.studentId}</td>
                                <td className="p-1.5 text-white font-bold">{r.name}</td>
                                <td className="p-1.5 text-amber-300 font-bold">#{r.enrollStudentId}</td>
                                <td className="p-1.5 text-emerald-300">{r.course}</td>
                                <td className="p-1.5 text-slate-400">{r.grade}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      ) : (
                        <>
                          <thead className="bg-slate-950 text-cyan-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">Student</th>
                              <th className="p-1.5">Fee</th>
                              <th className="p-1.5">Fee Tier</th>
                              <th className="p-1.5">Band Range</th>
                              <th className="p-1.5">Discount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {nonEquiResults.map((r, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-white font-bold">{r.name}</td>
                                <td className="p-1.5 text-amber-300 font-bold">₹{r.fee}</td>
                                <td className="p-1.5 text-emerald-300">{r.tier}</td>
                                <td className="p-1.5 text-slate-400 font-mono text-[10px]">₹{r.minFee}-₹{r.maxFee}</td>
                                <td className="p-1.5 text-cyan-300 font-bold">{r.discount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}
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
                Enrollment equijoins and scholarship fee band matches from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Student Enrollment Equijoin
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\text&#123;Students&#125; \bowtie_&#123;\text&#123;Students.student_id&#125; = \text&#123;Enrollments.student_id&#125;&#125; \text&#123;Enrollments&#125;$
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.student_id, s.full_name, e.course_id, e.enrolled_at
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Non-Equi Scholarship Fee Band Matching
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\text&#123;Students&#125; \bowtie_&#123;\text&#123;Students.fee&#125; \ge \text&#123;Bands.min_fee&#125; \land \text&#123;Students.fee&#125; \le \text&#123;Bands.max_fee&#125;&#125; \text&#123;Fee_Bands&#125;$
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name, s.admission_fee, b.band_tier, b.scholarship_pct
FROM students s
INNER JOIN fee_bands b ON s.admission_fee >= b.min_fee AND s.admission_fee <= b.max_fee;`}
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
                Avoid confusing Equijoin with Natural Join and unindexed non-equi full-table scans
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
                  <strong className="text-white">1. Equijoin vs Natural Join:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Equijoin retains both matching key columns in the schema; Natural Join merges them into one.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unindexed Non-Equi Joins:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Non-equi joins cannot use Hash Joins and force slow nested loop scans without B-Tree range indexes.
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
                  <strong className="text-white">1. Index Foreign Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always build B-Tree indexes on join key columns to enable $O(|R| \log |S|)$ Index Nested Loop execution.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Explicit ANSI INNER JOIN:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>INNER JOIN ... ON</code> syntax to ensure clear join intent and avoid accidental Cartesian products.
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
              <span>Theta Join definition: `R ⨝_θ S ≡ σ_θ(R × S)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Equijoin is a Theta Join where θ is strict equality (`=`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree of Equijoin is additive: `Degree(R ⨝_θ S) = Degree(R) + Degree(S)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Equijoins preserve both join columns in the schema header</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Non-Equi joins use range/inequality comparisons for tier matching and intervals</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always index foreign keys to enable high-speed Index Nested Loop joins</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Theta Join (⨝θ) & Equijoin – FAQs"
            questions={questions}
            subtitle="Master relational join theory, Theta Join derivation as σ_θ(R × S), Equijoins, Non-Equi range joins, and ANSI SQL INNER JOIN with 30 comprehensive Q&As"
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
            title="Theta Join (⨝θ) and Equijoin Operations"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_theta_equijoin_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Theta Join ($\\bowtie_\\theta$) is the true workhorse of relational databases! " +
              "In my classes in Barrackpore, I teach students that an Equijoin is simply a Theta Join where the condition is strict equality ($=$). " +
              "Remember: unlike Natural Join, an Equijoin keeps BOTH key columns in its output schema ($R.\\text{id}$ and $S.\\text{id}$). " +
              "And when you need to match values against continuous intervals—such as matching a student's admission fee to a scholarship tier—" +
              "a Non-Equi Join ($s.\\text{fee} \\ge b.\\text{min} \\land s.\\text{fee} \\le b.\\text{max}$) is the exact algebraic tool for the job. " +
              "Always make sure your join foreign keys are indexed with B-Trees so MySQL can turn a slow Cartesian search into a lightning-fast hash or index nested loop join!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · Theta Join &amp; Equijoin · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
