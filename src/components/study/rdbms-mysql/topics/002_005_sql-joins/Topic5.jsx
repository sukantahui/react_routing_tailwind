import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – SELF JOIN: Querying Hierarchical Data within a Single Table
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive SELF JOIN Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive SELF JOIN State
  const [selectedSelfMode, setSelectedSelfMode] = useState("mode_emp_mgr"); // "mode_emp_mgr" | "mode_two_tier" | "mode_peer_pair" | "mode_leaf_employees"

  const selfJoinScenarios = {
    mode_emp_mgr: {
      title: "1. Employee-Manager Hierarchy (LEFT SELF JOIN)",
      sqlQuery: `SELECT 
    e.staff_id AS employee_id,
    e.staff_name AS employee_name,
    e.role AS employee_role,
    COALESCE(m.staff_name, 'Top Leadership / Executive') AS manager_name
FROM tech_staff e
LEFT JOIN tech_staff m ON e.manager_id = m.staff_id;`,
      resultRows: [
        { id: "S101", name: "Sukanta Hui", role: "Founder & Director", parent: "Top Leadership / Executive", badgeColor: "emerald" },
        { id: "S102", name: "Mamata Hui", role: "Lead Instructor", parent: "Sukanta Hui", badgeColor: "cyan" },
        { id: "S103", name: "Debangshu Roy", role: "DB Architect", parent: "Sukanta Hui", badgeColor: "cyan" },
        { id: "S104", name: "Abhronila Das", role: "Junior Developer", parent: "Debangshu Roy", badgeColor: "indigo" },
        { id: "S105", name: "Susmita Sen", role: "React Developer", parent: "Mamata Hui", badgeColor: "indigo" },
      ],
      verdictText: "✓ PRESERVES DIRECTOR SUKANTA HUI",
      badgeColor: "emerald",
      explanation: "Using a LEFT SELF JOIN ensures that the top director (manager_id = NULL) is retained in the output, properly formatted via COALESCE().",
    },
    mode_two_tier: {
      title: "2. Two-Tier Management Chain (Employee ➔ Manager ➔ Grand-Manager)",
      sqlQuery: `SELECT 
    e.staff_name AS employee,
    COALESCE(m.staff_name, 'None') AS direct_manager,
    COALESCE(gm.staff_name, 'None') AS grand_manager
FROM tech_staff e
LEFT JOIN tech_staff m ON e.manager_id = m.staff_id
LEFT JOIN tech_staff gm ON m.manager_id = gm.staff_id;`,
      resultRows: [
        { id: "S104", name: "Abhronila Das", role: "Direct: Debangshu Roy", parent: "Grand: Sukanta Hui", badgeColor: "indigo" },
        { id: "S105", name: "Susmita Sen", role: "Direct: Mamata Hui", parent: "Grand: Sukanta Hui", badgeColor: "indigo" },
        { id: "S102", name: "Mamata Hui", role: "Direct: Sukanta Hui", parent: "Grand: None (Top Level)", badgeColor: "cyan" },
        { id: "S103", name: "Debangshu Roy", role: "Direct: Sukanta Hui", parent: "Grand: None (Top Level)", badgeColor: "cyan" },
        { id: "S101", name: "Sukanta Hui", role: "Direct: None", parent: "Grand: None", badgeColor: "emerald" },
      ],
      verdictText: "3-LEVEL CHAIN TRAVERSAL",
      badgeColor: "cyan",
      explanation: "Chaining two self joins (e ➔ m ➔ gm) resolves multiple levels of the organizational hierarchy within a single query.",
    },
    mode_peer_pair: {
      title: "3. Peer Comparison: Same-City Student Pairing",
      sqlQuery: `SELECT 
    s1.student_name AS student_1,
    s2.student_name AS student_2,
    s1.city
FROM students s1
INNER JOIN students s2 
    ON s1.city = s2.city 
   AND s1.student_id < s2.student_id;`,
      resultRows: [
        { id: "Pair 1", name: "Mamata Hui", role: "Debangshu Roy", parent: "City: Barrackpore", badgeColor: "amber" },
        { id: "Pair 2", name: "Abhronila Das", role: "Susmita Sen", parent: "City: Ichapur", badgeColor: "amber" },
      ],
      verdictText: "DEDUPLICATED UNIQUE PAIRS",
      badgeColor: "amber",
      explanation: "Using s1.student_id < s2.student_id eliminates both self-matches (Mamata with Mamata) and mirror duplicates (Debangshu with Mamata).",
    },
    mode_leaf_employees: {
      title: "4. Finding Leaf Nodes (Employees Who Manage No One)",
      sqlQuery: `SELECT 
    m.staff_id,
    m.staff_name,
    m.role
FROM tech_staff m
LEFT JOIN tech_staff e ON m.staff_id = e.manager_id
WHERE e.staff_id IS NULL;`,
      resultRows: [
        { id: "S104", name: "Abhronila Das", role: "Junior Developer", parent: "Leaf Node (0 Direct Reports)", badgeColor: "indigo" },
        { id: "S105", name: "Susmita Sen", role: "React Developer", parent: "Leaf Node (0 Direct Reports)", badgeColor: "indigo" },
      ],
      verdictText: "2 INDIVIDUAL CONTRIBUTORS",
      badgeColor: "indigo",
      explanation: "A reverse anti-join (WHERE child.id IS NULL) identifies individual contributors who currently have zero direct reports.",
    },
  };

  const currentSelf = selfJoinScenarios[selectedSelfMode];

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
            Module 002_005 · SQL Joins · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            SELF JOIN:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Querying Hierarchies within a Single Table
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master querying unary (recursive) relationships: table aliasing mechanisms, employee-manager organizational hierarchies,
            multi-tier leadership chains, peer comparison deduplication (`s1.id &lt; s2.id`), and finding leaf nodes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌲 Unary / Recursive Relationships
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏷️ Distinct Table Aliases (emp / mgr)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Preserving Root Nodes (LEFT SELF JOIN)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👥 Peer Pairing Deduplication (a.id &lt; b.id)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: SELF JOIN Mechanics & Theory ───────────── */}
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
                The Mechanics of SELF JOIN &amp; Hierarchical Trees
              </h2>
              <p className="text-xs text-slate-400">
                How referencing the same table twice unlocks organizational hierarchies and peer comparisons
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Dual Table Aliasing</span>
              <strong className="text-white text-xs block font-mono">FROM employees e JOIN employees m ON e.manager_id = m.emp_id</strong>
              <p className="text-xs text-slate-300">
                Table instance <code>e</code> represents the subordinate employee, while instance <code>m</code> represents their supervisor.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Peer Deduplication Rule</span>
              <strong className="text-white text-xs block font-mono">ON s1.city = s2.city AND s1.id &lt; s2.id</strong>
              <p className="text-xs text-slate-300">
                Using <code>s1.id &lt; s2.id</code> eliminates self-matches (A with A) and removes reverse mirror pairs (A,B and B,A) in peer matching queries.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Hierarchy Tree Traversal Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Organizational Tree Hierarchy Traversed via SELF JOIN
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Self Join Tree Diagram"
            >
              {/* Root Node: Director Sukanta Hui */}
              <g transform="translate(320, 10)">
                <rect width="140" height="35" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="70" y="18" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Sukanta Hui</text>
                <text x="70" y="29" fill="#a7f3d0" textAnchor="middle" fontSize="8">Director (manager_id=NULL)</text>
              </g>

              {/* Connecting Lines to Middle Managers */}
              <line x1="350" y1="45" x2="220" y2="70" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="430" y1="45" x2="560" y2="70" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Middle Manager 1: Mamata Hui */}
              <g transform="translate(150, 70)">
                <rect width="140" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="70" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="9">Mamata Hui</text>
                <text x="70" y="26" fill="#cbd5e1" textAnchor="middle" fontSize="8">Lead Instructor (mgr=S101)</text>
              </g>

              {/* Middle Manager 2: Debangshu Roy */}
              <g transform="translate(490, 70)">
                <rect width="140" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="70" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="9">Debangshu Roy</text>
                <text x="70" y="26" fill="#cbd5e1" textAnchor="middle" fontSize="8">DB Architect (mgr=S101)</text>
              </g>

              {/* Connecting Lines to Leaf Employees */}
              <line x1="220" y1="100" x2="220" y2="120" stroke="#818cf8" strokeWidth="1.5" />
              <line x1="560" y1="100" x2="560" y2="120" stroke="#818cf8" strokeWidth="1.5" />

              {/* Leaf Employee 1: Susmita Sen */}
              <g transform="translate(150, 120)">
                <rect width="140" height="26" rx="4" fill="#0f172a" stroke="#818cf8" />
                <text x="70" y="16" fill="#818cf8" textAnchor="middle" fontSize="8">Susmita Sen (mgr=S102)</text>
              </g>

              {/* Leaf Employee 2: Abhronila Das */}
              <g transform="translate(490, 120)">
                <rect width="140" height="26" rx="4" fill="#0f172a" stroke="#818cf8" />
                <text x="70" y="16" fill="#818cf8" textAnchor="middle" fontSize="8">Abhronila Das (mgr=S103)</text>
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
                Interactive SELF JOIN Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore Employee-Manager hierarchies, two-tier leadership chains, peer comparisons, and leaf node audits
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedSelfMode("mode_emp_mgr")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedSelfMode === "mode_emp_mgr"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Employee-Manager
              </button>

              <button
                onClick={() => setSelectedSelfMode("mode_two_tier")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedSelfMode === "mode_two_tier"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Two-Tier Chain
              </button>

              <button
                onClick={() => setSelectedSelfMode("mode_peer_pair")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedSelfMode === "mode_peer_pair"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Peer Pairing
              </button>

              <button
                onClick={() => setSelectedSelfMode("mode_leaf_employees")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedSelfMode === "mode_leaf_employees"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Leaf Employees
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentSelf.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentSelf.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentSelf.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentSelf.badgeColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                      )}
                    >
                      {currentSelf.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentSelf.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentSelf.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    SELF JOIN Output Hierarchy
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Staff ID</th>
                        <th className="p-1.5">Employee Name</th>
                        <th className="p-1.5">Role / Details</th>
                        <th className="p-1.5">Reports To / Pairing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentSelf.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.id}</td>
                          <td className="p-1.5 text-cyan-300 font-bold">{r.name}</td>
                          <td className="p-1.5 text-slate-300">{r.role}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.parent}</td>
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
                How Barrackpore and Kolkata training institutes structure hierarchical self joins in production
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Course Prerequisite Tree Traversal
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Displaying advanced courses alongside their mandatory prerequisite courses:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Course Prerequisite Mapping with LEFT SELF JOIN:
SELECT 
    adv.course_code AS advanced_course,
    adv.course_title AS advanced_title,
    COALESCE(pre.course_title, 'None (Beginner Friendly)') AS prerequisite_course
FROM courses adv
LEFT JOIN courses pre ON adv.prerequisite_course_id = pre.course_id
ORDER BY adv.course_code;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's E-Commerce Category &amp; Parent Navigation Breadcrumbs
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Generating category breadcrumb paths (e.g. "Electronics ➔ Laptops"):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Building Category Breadcrumbs with SELF JOIN:
SELECT 
    sub.category_id,
    sub.category_name AS current_category,
    CASE 
        WHEN parent.category_name IS NOT NULL 
        THEN CONCAT(parent.category_name, ' > ', sub.category_name)
        ELSE sub.category_name 
    END AS breadcrumb_path
FROM product_categories sub
LEFT JOIN product_categories parent ON sub.parent_category_id = parent.category_id;`}
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
                Guidelines for querying self-referencing tables safely without losing root nodes
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
                  <strong className="text-white">1. Forgetting Table Aliases:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>FROM employees JOIN employees</code> triggers MySQL Error 1066 (Not unique table/alias).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using INNER JOIN for Root Nodes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    INNER JOIN silently discards top executives whose <code>manager_id</code> is NULL; always use <code>LEFT JOIN</code>.
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
                  <strong className="text-white">1. Use Semantic Alias Names:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Name aliases descriptively (e.g. <code>emp</code> and <code>mgr</code>, or <code>child</code> and <code>parent</code>).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Index the Recursive Foreign Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add a B-Tree index to <code>manager_id</code> to ensure instant index lookup during self join scans.
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
              <span>Self Join joins a table to itself using two distinct table aliases (e and m)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Models unary relationships (Employee-Manager, Categories, Prerequisites)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use LEFT JOIN on self joins to preserve root leadership rows (manager_id IS NULL)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use a.id &lt; b.id for peer comparison queries to eliminate mirror duplicates</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always create a B-Tree index on the recursive foreign key column</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>For multi-level tree traversal of unlimited depth, use MySQL 8.0 WITH RECURSIVE</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="SELF JOIN &amp; Hierarchical Querying – FAQs"
            questions={questions}
            subtitle="Master SELF JOIN, table aliasing, recursive foreign keys, employee-manager hierarchies, preserving root nodes with LEFT JOIN, and peer deduplication with 30 comprehensive Q&As"
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
            title="SELF JOIN: Querying Hierarchical Data within a Single Table"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_self_join_hierarchies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "A SELF JOIN is nothing more than looking in the mirror with a different badge! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I explain to students: " +
              "'Don't be intimidated by the term Self Join. You are simply taking two copies of the same table—one labeled Employee and one labeled Manager—and joining them together.' " +
              "The most important habit is to use `LEFT JOIN`. " +
              "If you use an `INNER JOIN`, the Director or CEO with `manager_id = NULL` will vanish into thin air. " +
              "Always use `LEFT JOIN` and `COALESCE()` so the top boss stays proudly at the top of the tree!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · SELF JOIN Hierarchies · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
