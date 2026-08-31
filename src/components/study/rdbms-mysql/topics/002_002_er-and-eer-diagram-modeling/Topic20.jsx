import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic20_files/topic20_questions";
import noteText from "./topic20_files/topic20_note.txt?raw";

/**
 * Topic20 – Common ER Design Pitfalls: Fan Traps, Chasm Traps, and Misidentifying Attributes vs Entities
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Connection Trap Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic20 = () => {
  const sectionRefs = useRef([]);

  // Interactive Trap Sandbox State
  const [activeTrapTab, setActiveTrapTab] = useState("fan"); // "fan" | "chasm"
  const [fanResolved, setFanResolved] = useState(false);
  const [chasmResolved, setChasmResolved] = useState(false);

  // Fan Trap Data: Academy with Students & Batches
  const [students] = useState([
    { id: 101, name: "Mamata Hui", batchId: 1 },
    { id: 102, name: "Abhronila Das", batchId: 2 },
  ]);

  const [batches] = useState([
    { id: 1, name: "Morning React Batch" },
    { id: 2, name: "Evening MySQL Batch" },
  ]);

  // Chasm Trap Data: Real Estate Branch, Staff, and Unassigned Property
  const [properties] = useState([
    { id: 201, address: "14 Ghoshpara Rd, Barrackpore", staffId: 1, branchId: 1 },
    { id: 202, address: "55 Park Street, Kolkata", staffId: null, branchId: 2 }, // Unassigned!
  ]);

  const [engineLog, setEngineLog] = useState(
    "Connection Trap Analyzer Active. Toggle between Fan Trap and Chasm Trap to inspect structural flaws and verify resolutions."
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

  const handleToggleFan = () => {
    setFanResolved(!fanResolved);
    if (!fanResolved) {
      setEngineLog(
        "✓ Fan Trap Resolved: Restructured schema so Batches directly connect to Students via 1:N foreign key 'students.batch_id'. Query ambiguity eliminated!"
      );
    } else {
      setEngineLog(
        "⚠️ Fan Trap Active: Academy connects to Students AND Academy connects to Batches. Which student is in which batch? AMBIGUOUS!"
      );
    }
  };

  const handleToggleChasm = () => {
    setChasmResolved(!chasmResolved);
    if (!chasmResolved) {
      setEngineLog(
        "✓ Chasm Trap Resolved: Added direct 'branch_id' foreign key in properties table. Unassigned properties now retain their branch ownership!"
      );
    } else {
      setEngineLog(
        "⚠️ Chasm Trap Active: Property relies on optional staff manager to reach its Branch. Property #202 (Park Street) has staff_id = NULL, losing its Branch connection!"
      );
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
            Module 002_002 · ER & EER Modeling · Topic 20
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Common ER Design Pitfalls:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Fan Traps, Chasm Traps &amp; Connection Flaws
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the identification, diagnosis, and resolution of classical ER structural flaws: Fan Traps (pathway ambiguity),
            Chasm Traps (broken optional paths causing data loss), and Entity vs Attribute misidentification errors.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪤 Fan Traps (Diverging 1:N Ambiguity)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🕳️ Chasm Traps (Broken Optional Links)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Attribute vs Entity Classification
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Trap-Free Schema Design Rules
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Two Connection Traps Breakdown ──────── */}
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
                Fan Traps vs Chasm Traps Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Understanding structural pathway divergence and optional intermediate gaps
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fan Trap Card */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. The Fan Trap</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Causes Ambiguity
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Occurs when two 1:N links fan out from a single central entity (<code>B ◄── A ──► C</code>). We cannot tell which specific B belongs to which specific C.
              </p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-amber-300 font-mono">
                Fix: Restructure into serial chain (A ➔ B ➔ C) or connect child tables directly.
              </div>
            </div>

            {/* Chasm Trap Card */}
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">2. The Chasm Trap</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  Causes Data Loss
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Occurs when a query path relies on an intermediate entity with <strong>Partial (Optional)</strong> participation. When intermediate values are NULL, the path breaks!
              </p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-rose-300 font-mono">
                Fix: Add a direct mandatory foreign key between origin and target entities.
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Connection Traps Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Structural Comparison of Fan Trap vs Chasm Trap
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Fan Trap vs Chasm Trap Diagram"
            >
              {/* Fan Trap Diagram */}
              <g transform="translate(30, 15)">
                <rect width="100" height="35" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="50" y="22" fill="#f59e0b" textAnchor="middle" fontWeight="bold">STUDENTS</text>

                <line x1="100" y1="32" x2="160" y2="32" stroke="#f59e0b" strokeWidth="2" />
                <text x="130" y="25" fill="#f59e0b" fontSize="9" textAnchor="middle">N : 1</text>

                <rect x="160" y="15" width="100" height="35" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="210" y="37" fill="#f59e0b" textAnchor="middle" fontWeight="bold">ACADEMY</text>

                <line x1="260" y1="32" x2="320" y2="32" stroke="#f59e0b" strokeWidth="2" />
                <text x="290" y="25" fill="#f59e0b" fontSize="9" textAnchor="middle">1 : N</text>

                <rect x="320" y="15" width="100" height="35" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="370" y="22" fill="#f59e0b" textAnchor="middle" fontWeight="bold">BATCHES</text>

                <text x="210" y="80" fill="#cbd5e1" textAnchor="middle" fontSize="10">
                  Fan Trap: Which student in which batch? Ambiguous!
                </text>
              </g>

              {/* Chasm Trap Diagram */}
              <g transform="translate(480, 15)">
                <rect width="80" height="35" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="40" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold">BRANCH</text>

                <line x1="80" y1="32" x2="140" y2="32" stroke="#10b981" strokeWidth="2" />
                <text x="110" y="25" fill="#10b981" fontSize="9" textAnchor="middle">1 : N</text>

                <rect x="140" y="15" width="80" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="180" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold">STAFF</text>

                <line x1="220" y1="32" x2="280" y2="32" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 1" />
                <text x="250" y="25" fill="#f43f5e" fontSize="9" textAnchor="middle">0..1 (Opt)</text>

                <rect x="280" y="15" width="90" height="35" rx="4" fill="#1e293b" stroke="#f43f5e" />
                <text x="325" y="22" fill="#f43f5e" textAnchor="middle" fontWeight="bold">PROPERTY</text>

                <text x="180" y="80" fill="#cbd5e1" textAnchor="middle" fontSize="10">
                  Chasm Trap: Unmanaged property loses branch link!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Connection Trap Sandbox ─────── */}
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
                Interactive Connection Trap Diagnosis &amp; Resolution
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between Fan Trap and Chasm Trap to test flawed query behavior and apply schema fixes
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Trap Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTrapTab("fan")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeTrapTab === "fan"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Fan Trap (Diverging Ambiguity)
              </button>
              <button
                onClick={() => setActiveTrapTab("chasm")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeTrapTab === "chasm"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Chasm Trap (Broken Optional Links)
              </button>
            </div>

            {/* Sandbox Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-4">
                {activeTrapTab === "fan" && (
                  <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-3">
                    <span className="text-xs font-bold text-amber-400 block">
                      Fan Trap Sandbox: Academy, Students &amp; Batches
                    </span>
                    <p className="text-xs text-slate-300">
                      Current State: {fanResolved ? (
                        <span className="text-emerald-400 font-bold">✓ RESOLVED (Direct 1:N Link)</span>
                      ) : (
                        <span className="text-rose-400 font-bold">⚠️ FLAWED (Diverging Fan Trap)</span>
                      )}
                    </p>
                    <button
                      onClick={handleToggleFan}
                      className={clsx(
                        "w-full py-2.5 rounded-lg text-xs font-bold transition-all border",
                        fanResolved
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                      )}
                    >
                      {fanResolved ? "Revert to Flawed Fan Trap" : "⚡ Apply Direct 1:N Link Fix"}
                    </button>
                  </div>
                )}

                {activeTrapTab === "chasm" && (
                  <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4 space-y-3">
                    <span className="text-xs font-bold text-rose-400 block">
                      Chasm Trap Sandbox: Real Estate Branches &amp; Properties
                    </span>
                    <p className="text-xs text-slate-300">
                      Current State: {chasmResolved ? (
                        <span className="text-emerald-400 font-bold">✓ RESOLVED (Direct Ownership Link)</span>
                      ) : (
                        <span className="text-rose-400 font-bold">⚠️ FLAWED (Broken Optional Link)</span>
                      )}
                    </p>
                    <button
                      onClick={handleToggleChasm}
                      className={clsx(
                        "w-full py-2.5 rounded-lg text-xs font-bold transition-all border",
                        chasmResolved
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                      )}
                    >
                      {chasmResolved ? "Revert to Flawed Chasm Trap" : "⚡ Add Direct Branch FK Fix"}
                    </button>
                  </div>
                )}

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">{engineLog}</pre>
                </div>
              </div>

              {/* Live Query Results Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    {activeTrapTab === "fan" ? (
                      <span>Student Batch Assignments ({fanResolved ? "Unambiguous" : "Ambiguous Cartesian"})</span>
                    ) : (
                      <span>Property Branch Ownership ({chasmResolved ? "100% Owned" : "Data Lost on Null Staff"})</span>
                    )}
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      {activeTrapTab === "fan" ? (
                        <>
                          <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Student</th>
                              <th className="p-1.5">Assigned Batch</th>
                              <th className="p-1.5">Query Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {fanResolved ? (
                              students.map((s) => {
                                const b = batches.find((x) => x.id === s.batchId);
                                return (
                                  <tr key={s.id}>
                                    <td className="p-1.5 text-white">{s.name}</td>
                                    <td className="p-1.5 text-emerald-300 font-bold">{b?.name}</td>
                                    <td className="p-1.5 text-teal-300">✓ Accurate (Direct FK)</td>
                                  </tr>
                                );
                              })
                            ) : (
                              <>
                                <tr>
                                  <td className="p-1.5 text-white">Mamata Hui</td>
                                  <td className="p-1.5 text-rose-400">Morning React? OR Evening MySQL?</td>
                                  <td className="p-1.5 text-rose-400">⚠️ Ambiguous Cartesian</td>
                                </tr>
                                <tr>
                                  <td className="p-1.5 text-white">Abhronila Das</td>
                                  <td className="p-1.5 text-rose-400">Morning React? OR Evening MySQL?</td>
                                  <td className="p-1.5 text-rose-400">⚠️ Ambiguous Cartesian</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </>
                      ) : (
                        <>
                          <thead className="bg-slate-950 text-rose-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Property</th>
                              <th className="p-1.5">Staff Manager</th>
                              <th className="p-1.5">Owning Branch</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {chasmResolved ? (
                              properties.map((p) => (
                                <tr key={p.id}>
                                  <td className="p-1.5 text-white">{p.address.split(",")[0]}</td>
                                  <td className="p-1.5 text-slate-400">{p.staffId ? `Staff #${p.staffId}` : "None (Unassigned)"}</td>
                                  <td className="p-1.5 text-emerald-300 font-bold">Branch #{p.branchId} (Direct FK)</td>
                                </tr>
                              ))
                            ) : (
                              properties.map((p) => (
                                <tr key={p.id}>
                                  <td className="p-1.5 text-white">{p.address.split(",")[0]}</td>
                                  <td className="p-1.5 text-slate-400">{p.staffId ? `Staff #${p.staffId}` : "NULL"}</td>
                                  <td className={clsx("p-1.5 font-bold", p.staffId ? "text-emerald-300" : "text-rose-400")}>
                                    {p.staffId ? `Branch #${p.branchId}` : "NULL (Branch Lost!)"}
                                  </td>
                                </tr>
                              ))
                            )}
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
                Academy batch assignments and real estate branch management from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Batch Assignment (Fan Trap Resolution)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Direct foreign key in <code>students(batch_id)</code> eliminates the diverging fan trap.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE academy_batches (batch_id INT AUTO_INCREMENT PRIMARY KEY, batch_name VARCHAR(50) NOT NULL);
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    batch_id INT NOT NULL, -- Direct 1:N link resolves the fan trap!
    FOREIGN KEY (batch_id) REFERENCES academy_batches(batch_id)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Real Estate Property Ownership (Chasm Trap Resolution)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Real Estate</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Direct <code>branch_id</code> foreign key ensures unassigned properties remain linked to their owning branch.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE properties (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL, -- Direct mandatory link avoids the chasm trap!
    property_address VARCHAR(150) NOT NULL,
    allocated_staff_id INT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (allocated_staff_id) REFERENCES staff(staff_id)
) ENGINE=InnoDB;`}
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
                Avoid diverging 1:N fan traps and relying on multi-hop optional foreign keys
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
                  <strong className="text-white">1. Overlooking 1:N Divergence:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Diverging 1:N relationships from a single entity create Cartesian row multiplication and ambiguity.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Multi-Hop Optional Pathways:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Relying on nullable intermediate foreign keys causes complete data loss when joining unlinked rows.
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
                  <strong className="text-white">1. Direct Child Relationships:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Connect child entities directly (e.g. <code>students.batch_id</code>) to eliminate fan trap ambiguity.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Direct Mandatory Foreign Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add direct foreign keys (e.g. <code>properties.branch_id</code>) to bypass optional intermediate links.
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
              <span>Fan Trap: Two 1:N links diverging from a central entity causing query ambiguity</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Resolve Fan Traps by connecting child entities directly (e.g. Student ➔ Batch)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Chasm Trap: Pathway broken by optional intermediate links causing data loss</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Resolve Chasm Traps by adding a direct mandatory foreign key (e.g. Property ➔ Branch)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Promote attributes to entities if they have sub-attributes or independent lifecycles</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Trace all user story query paths during the conceptual design phase to catch traps early</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="ER Design Pitfalls: Fan & Chasm Traps – FAQs"
            questions={questions}
            subtitle="Master ER connection trap identification, Fan Traps, Chasm Traps, and Attribute vs Entity classification with 30 comprehensive Q&As"
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
            title="Common ER Design Pitfalls: Fan Traps, Chasm Traps, and Misidentifying Attributes vs Entities"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic20_er_pitfalls_traps_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Connection Traps are subtle conceptual bugs that can cripple a production database if not caught early! " +
              "In my classes in Barrackpore, I teach students the 2 Golden Rules of Trap Detection: " +
              "1) Whenever you see two 1:N arrows pointing away from a single entity (`B ◄── A ──► C`), ask: " +
              "'Can I associate an individual B with an individual C?' If not, you have a Fan Trap! Connect B directly to C. " +
              "2) Whenever your query path traverses an optional (nullable) link to find a mandatory parent, you have a Chasm Trap! " +
              "Add a direct mandatory foreign key between the origin and destination. " +
              "Spotting these traps in your ER diagram will save you months of costly database refactoring down the road."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 20 · ER Pitfalls &amp; Traps · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic20;
