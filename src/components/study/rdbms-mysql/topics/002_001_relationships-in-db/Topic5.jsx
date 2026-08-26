import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Self-Referencing Relationships (Hierarchies, Employees & Managers)
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Hierarchy Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [joinType, setJoinType] = useState("left"); // "left" vs "inner"
  const [newMemberName, setNewMemberName] = useState("Abhronila Das");
  const [newMemberTitle, setNewMemberTitle] = useState("Junior Developer");
  const [selectedManagerId, setSelectedManagerId] = useState(2);
  const [engineFeedback, setEngineFeedback] = useState(
    "AccoTax & Coder Org Structure loaded. Toggle JOIN modes or add team members."
  );

  const [employees, setEmployees] = useState([
    { id: 1, name: "Sukanta Hui", title: "Founder & Director (CEO)", managerId: null, salary: 85000 },
    { id: 2, name: "Mamata Hui", title: "Lead Consultant", managerId: 1, salary: 65000 },
    { id: 3, name: "Susmita Ghosh", title: "Senior Tax Analyst", managerId: 2, salary: 45000 },
    { id: 4, name: "Debangshu Roy", title: "Fullstack Engineer", managerId: 2, salary: 48000 },
  ]);

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

  const handleAddEmployee = () => {
    const nextId = employees.length + 1;
    const mgrId = selectedManagerId === "null" ? null : Number(selectedManagerId);
    const mgr = employees.find((e) => e.id === mgrId);

    const newEmp = {
      id: nextId,
      name: newMemberName,
      title: newMemberTitle,
      managerId: mgrId,
      salary: 35000,
    };

    setEmployees([...employees, newEmp]);
    setEngineFeedback(
      `✓ Query OK, 1 row affected. Inserted employee #${nextId} (${newMemberName}) reporting to ${
        mgr ? `${mgr.name} (#${mgr.id})` : "Nobody (Top Root)"
      }.`
    );
  };

  const handleDeleteEmployee = (empId) => {
    const target = employees.find((e) => e.id === empId);
    // Simulate ON DELETE SET NULL on subordinates
    const updated = employees
      .filter((e) => e.id !== empId)
      .map((e) => (e.managerId === empId ? { ...e, managerId: null } : e));

    setEmployees(updated);
    setEngineFeedback(
      `✓ ON DELETE SET NULL: Removed ${target?.name} (#${empId}). Any direct subordinates had their manager_id safely updated to NULL!`
    );
  };

  const handleReset = () => {
    setEmployees([
      { id: 1, name: "Sukanta Hui", title: "Founder & Director (CEO)", managerId: null, salary: 85000 },
      { id: 2, name: "Mamata Hui", title: "Lead Consultant", managerId: 1, salary: 65000 },
      { id: 3, name: "Susmita Ghosh", title: "Senior Tax Analyst", managerId: 2, salary: 45000 },
      { id: 4, name: "Debangshu Roy", title: "Fullstack Engineer", managerId: 2, salary: 48000 },
    ]);
    setJoinType("left");
    setEngineFeedback("Simulator reset to initial state.");
  };

  // Filtered list based on JOIN type
  const displayRows =
    joinType === "inner"
      ? employees.filter((e) => e.managerId !== null)
      : employees;

  const ddlSnippet = `CREATE TABLE employees (\n    emp_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    job_title VARCHAR(50) NOT NULL,\n    manager_id INT NULL, -- NULL allows top-level CEO root!\n    salary DECIMAL(10, 2) NOT NULL,\n    CONSTRAINT chk_no_self_mgr CHECK (manager_id != emp_id),\n    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id)\n        REFERENCES employees(emp_id)\n        ON DELETE SET NULL\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_001 · Relationships in DB · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Self-Referencing Relationships &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Recursive Hierarchies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master recursive tree modeling, why top-level root pointers must be <code>NULL</code>,
            avoiding <code>INNER JOIN</code> root filtering traps, and tree traversal with MySQL 8.0 <code>WITH RECURSIVE</code> CTEs.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌳 Recursive Adjacency Lists
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👑 Root Nullability Rules
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 LEFT JOIN Self-Joins
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ WITH RECURSIVE CTEs
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Architecture & Root Nullability ─────────── */}
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
                Self-Referencing Foreign Keys & The Root Nullability Rule
              </h2>
              <p className="text-xs text-slate-400">
                Why a table foreign-keying itself MUST permit NULL on the parent pointer column
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Nullability Rule */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                The Root Nullability Requirement
              </span>
              <p className="text-xs text-slate-400 mb-2">
                The top-level executive (CEO) or root category has no manager. <code>manager_id</code> MUST be nullable!
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                manager_id INT NULL,
                FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
              </pre>
            </div>

            {/* The JOIN Trap */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                The INNER JOIN Trap
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Using <code>INNER JOIN</code> on self-joins secretly filters out the CEO because <code>NULL</code> matches fail!
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                -- ALWAYS USE LEFT JOIN ON SELF-JOINS
                SELECT e.name, m.name AS manager
                FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Org Chart Tree ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Coder & AccoTax Barrackpore Staff Management Tree Hierarchy
            </h3>
            <svg
              viewBox="0 0 780 160"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Org Hierarchy Tree"
            >
              {/* Level 1: CEO */}
              <g transform="translate(290, 10)">
                <rect width="200" height="40" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="100" y="18" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Sukanta Hui (#1 - CEO)
                </text>
                <text x="100" y="32" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  manager_id = NULL
                </text>
              </g>

              {/* Line 1 to Level 2 */}
              <line x1="390" y1="50" x2="390" y2="70" stroke="#38bdf8" strokeWidth="2" />

              {/* Level 2: Mamata */}
              <g transform="translate(290, 70)">
                <rect width="200" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="100" y="18" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Mamata Hui (#2 - Lead)
                </text>
                <text x="100" y="32" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  manager_id = 1
                </text>
              </g>

              {/* Lines to Level 3 */}
              <path d="M 390,110 L 390,120 L 220,120 L 220,130" stroke="#818cf8" strokeWidth="2" fill="none" />
              <path d="M 390,110 L 390,120 L 560,120 L 560,130" stroke="#818cf8" strokeWidth="2" fill="none" />

              {/* Level 3: Susmita & Debangshu */}
              <g transform="translate(120, 130)">
                <rect width="200" height="25" rx="6" fill="#1e293b" stroke="#818cf8" />
                <text x="100" y="16" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  Susmita Ghosh (#3) ➔ mgr: 2
                </text>
              </g>

              <g transform="translate(460, 130)">
                <rect width="200" height="25" rx="6" fill="#1e293b" stroke="#818cf8" />
                <text x="100" y="16" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  Debangshu Roy (#4) ➔ mgr: 2
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Hierarchy Sandbox ───────────── */}
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
                Interactive Organizational Hierarchy Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Add reporting employees, test LEFT JOIN vs INNER JOIN CEO elimination, and simulate ON DELETE SET NULL
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* JOIN Type Switcher */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Self-Join Type:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setJoinType("left")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      joinType === "left"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    ✓ LEFT JOIN (Includes CEO)
                  </button>
                  <button
                    onClick={() => setJoinType("inner")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      joinType === "inner"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    ❌ INNER JOIN (CEO Vanishes!)
                  </button>
                </div>
              </div>

              {/* Add New Subordinate */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Add New Team Subordinate:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Employee Name"
                  />
                  <input
                    type="text"
                    value={newMemberTitle}
                    onChange={(e) => setNewMemberTitle(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Reports To (Direct Manager):
                  </label>
                  <select
                    value={selectedManagerId}
                    onChange={(e) => setSelectedManagerId(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        #{e.id} - {e.name} ({e.title})
                      </option>
                    ))}
                    <option value="null">None (Top-Level CEO / Root)</option>
                  </select>
                </div>
                <button
                  onClick={handleAddEmployee}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>➕</span> Add Employee to Hierarchy
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="py-1 px-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 text-xs hover:text-white transition-all"
                >
                  Reset Simulator
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                {engineFeedback}
              </div>
            </div>

            {/* Live Table Output */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Self-Referencing DDL Definition:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Results Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Query Output ({displayRows.length} rows returned with {joinType.toUpperCase()} JOIN):</span>
                  {joinType === "inner" && (
                    <span className="text-rose-400 text-[10px]">⚠️ CEO Filtered Out!</span>
                  )}
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Employee Name</th>
                        <th className="p-2">Designation</th>
                        <th className="p-2">Reports To (Manager)</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {displayRows.map((e) => {
                        const mgr = employees.find((m) => m.id === e.managerId);
                        return (
                          <tr key={e.id} className="hover:bg-slate-800/40">
                            <td className="p-2 font-sans font-medium text-white">{e.name}</td>
                            <td className="p-2 text-slate-300">{e.title}</td>
                            <td className="p-2">
                              {mgr ? (
                                <span className="text-teal-300 font-bold">
                                  #{mgr.id} ({mgr.name})
                                </span>
                              ) : (
                                <span className="text-amber-400 italic">
                                  --- (Top Executive / CEO)
                                </span>
                              )}
                            </td>
                            <td className="p-2">
                              <button
                                onClick={() => handleDeleteEmployee(e.id)}
                                className="text-[10px] text-rose-400 hover:text-rose-300 underline font-sans"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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
                Staff hierarchies and recursive nested category trees from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore AccoTax Staff Organizational Structure
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Org Chart</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Multi-tier management reporting with ON DELETE SET NULL to protect subordinate stability.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    manager_id INT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    CONSTRAINT chk_no_self_mgr CHECK (manager_id != emp_id),
    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id)
        REFERENCES employees(emp_id) ON DELETE SET NULL
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Nested Category Tree (WITH RECURSIVE CTE)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Traversing multi-depth category breadcrumb trees dynamically in MySQL 8.0.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`WITH RECURSIVE CategoryTree AS (
    -- Anchor: Root Categories
    SELECT category_id, category_name, parent_category_id, CAST(category_name AS CHAR(255)) AS breadcrumb_path
    FROM categories
    WHERE parent_category_id IS NULL

    UNION ALL

    -- Recursive Step: Subcategories
    SELECT c.category_id, c.category_name, c.parent_category_id, CONCAT(ct.breadcrumb_path, ' > ', c.category_name)
    FROM categories c
    INNER JOIN CategoryTree ct ON c.parent_category_id = ct.category_id
)
SELECT * FROM CategoryTree ORDER BY breadcrumb_path;`}
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
                Avoid deadlock insertion bugs and circular reporting loops
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
                  <strong className="text-white">1. Making Foreign Key NOT NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Creates an impossible deadlock where no initial CEO root record can be created.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using INNER JOIN:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Filters out the CEO because <code>manager_id IS NULL</code> fails inner join equality.
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
                  <strong className="text-white">1. Self-Cycle Prevention:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add <code>CHECK (manager_id != emp_id)</code> to block self-managing loops.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use WITH RECURSIVE CTEs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Traverse arbitrary depth hierarchies natively in MySQL 8.0.
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
              <span>Self-referencing Foreign Keys reference the Primary Key of the SAME table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The Foreign Key column MUST be nullable (`INT NULL`) to allow root nodes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use <code>LEFT JOIN</code> on self-joins so the root CEO is not lost</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ON DELETE SET NULL</code> for management org charts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ON DELETE CASCADE</code> for strict composite category trees</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Traverse deep trees using MySQL 8.0 <code>WITH RECURSIVE</code> CTEs</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Self-Referencing Relationships – FAQs"
            questions={questions}
            subtitle="Master recursive tree modeling, root nullability rules, and Recursive CTEs with 30 comprehensive Q&As"
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
            title="Self-Referencing Relationships (Hierarchies, Employees & Managers)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_self_referencing_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Self-referencing relationships are among the most elegant patterns in relational databases. " +
              "In my classes in Barrackpore, I always highlight the classic 'CEO Problem': if you declare your `manager_id` " +
              "as `NOT NULL`, you can never insert your very first employee (the CEO) because nobody exists yet to be their manager! " +
              "Keep the foreign key nullable (`INT NULL`), always query with `LEFT JOIN` so the CEO appears at the top of your reports, " +
              "and use MySQL 8.0's powerful `WITH RECURSIVE` Common Table Expressions to traverse multi-tier corporate hierarchies with ease."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · Self-Referencing Tables · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
