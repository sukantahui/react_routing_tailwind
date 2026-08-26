import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Attribute and Relationship Inheritance in Specialization Hierarchies
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Multi-Tier Inheritance Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive 3-Tier Hierarchy Sandbox State
  const [managerName, setManagerName] = useState("Mamata Hui");
  const [managerEmail, setManagerEmail] = useState("mamata.lead@barrackpore.in");
  const [salaryInput, setSalaryInput] = useState(65000);
  const [budgetInput, setBudgetInput] = useState(750000);

  const [persons, setPersons] = useState([
    { id: 1, name: "Mamata Hui", email: "mamata.lead@barrackpore.in" },
    { id: 2, name: "Prof. Sukanta Hui", email: "sukanta@accotax.in" },
    { id: 3, name: "Abhronila Das", email: "abhronila@barrackpore.in" },
  ]);

  const [employees, setEmployees] = useState([
    { personId: 1, salary: 65000, hireDate: "2024-01-15" },
    { personId: 2, salary: 85000, hireDate: "2022-06-01" },
    { personId: 3, salary: 42000, hireDate: "2025-03-10" },
  ]);

  const [managers, setManagers] = useState([
    { personId: 1, budget: 750000, teamSize: 8 },
    { personId: 2, budget: 1500000, teamSize: 15 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Multi-Tier Hierarchy Active. Insert an Engineering Manager to observe 3-table atomic transaction and shared PK propagation."
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

  const handleInsertManager = () => {
    const emailExists = persons.some((p) => p.email === managerEmail);
    if (emailExists) {
      setEngineLog(`❌ ERROR 1062 (23000): Duplicate entry '${managerEmail}' for key 'uq_person_email'.`);
      return;
    }

    const nextId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1;
    const newPerson = { id: nextId, name: managerName, email: managerEmail };
    const newEmployee = { personId: nextId, salary: Number(salaryInput), hireDate: "2026-08-24" };
    const newManager = { personId: nextId, budget: Number(budgetInput), teamSize: 5 };

    setPersons([...persons, newPerson]);
    setEmployees([...employees, newEmployee]);
    setManagers([...managers, newManager]);

    setEngineLog(
      `✓ 3-Tier Atomic Transaction Committed:\n1) INSERT INTO persons (person_id: ${nextId}, name: '${managerName}')\n2) INSERT INTO employees (person_id: ${nextId}, salary: ₹${salaryInput})\n3) INSERT INTO engineering_managers (person_id: ${nextId}, budget: ₹${budgetInput})\n\nRoot PK person_id #${nextId} propagated cleanly down all 3 tiers!`
    );
  };

  const handleDeletePerson = (id) => {
    const target = persons.find((p) => p.id === id);
    setPersons(persons.filter((p) => p.id !== id));
    // Cascading deletion across 3 tiers
    setEmployees(employees.filter((e) => e.personId !== id));
    setManagers(managers.filter((m) => m.personId !== id));

    setEngineLog(
      `✓ Multi-Tier ON DELETE CASCADE: Deleted Person #${id} ('${target?.name}'). All matching rows in 'employees' (Tier 2) and 'engineering_managers' (Tier 3) were automatically purged by MySQL InnoDB!`
    );
  };

  const handleReset = () => {
    setPersons([
      { id: 1, name: "Mamata Hui", email: "mamata.lead@barrackpore.in" },
      { id: 2, name: "Prof. Sukanta Hui", email: "sukanta@accotax.in" },
      { id: 3, name: "Abhronila Das", email: "abhronila@barrackpore.in" },
    ]);
    setEmployees([
      { personId: 1, salary: 65000, hireDate: "2024-01-15" },
      { personId: 2, salary: 85000, hireDate: "2022-06-01" },
      { personId: 3, salary: 42000, hireDate: "2025-03-10" },
    ]);
    setManagers([
      { personId: 1, budget: 750000, teamSize: 8 },
      { personId: 2, budget: 1500000, teamSize: 15 },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Tier 1: Root Superclass\nCREATE TABLE persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) NOT NULL UNIQUE\n) ENGINE=InnoDB;\n\n-- Tier 2: Subclass of Person / Superclass of Manager\nCREATE TABLE employees (\n    person_id INT PRIMARY KEY,\n    monthly_salary DECIMAL(10, 2) NOT NULL,\n    hire_date DATE NOT NULL,\n    CONSTRAINT fk_emp_person FOREIGN KEY (person_id)\n        REFERENCES persons(person_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- Tier 3: Leaf Subclass of Employee\nCREATE TABLE engineering_managers (\n    person_id INT PRIMARY KEY,\n    team_budget DECIMAL(12, 2) NOT NULL,\n    team_size INT NOT NULL DEFAULT 5,\n    CONSTRAINT fk_mgr_emp FOREIGN KEY (person_id)\n        REFERENCES employees(person_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 10
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Attribute & Relationship Inheritance in{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Specialization Hierarchies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master multi-level inheritance trees: transitive attribute propagation, relationship inheritance,
            shared Primary Key propagation across tiers, and multi-table polymorphic SQL queries.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌳 Multi-Level Hierarchy Trees
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧬 Transitive Attribute Flow
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Propagated Primary Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Multi-Tier Cascading Deletes
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Multi-Level Inheritance Flow ─────────────── */}
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
                Multi-Level Transitive Inheritance Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Root-to-leaf propagation of attributes, primary keys, and relationships
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level 1 */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Level 1: Root Superclass
              </span>
              <strong className="text-white text-sm block">Person</strong>
              <p className="text-xs text-slate-400">
                Defines root identity (<code>person_id</code>, <code>full_name</code>, <code>email</code>).
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Level 2: Intermediate Tier
              </span>
              <strong className="text-white text-sm block">Employee</strong>
              <p className="text-xs text-slate-400">
                Inherits <code>Person</code> attributes + adds <code>monthly_salary</code>, <code>hire_date</code>.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Level 3: Leaf Subclass
              </span>
              <strong className="text-white text-sm block">Engineering_Manager</strong>
              <p className="text-xs text-slate-400">
                Inherits all Level 1 + Level 2 attributes + adds <code>team_budget</code>.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 3-Tier Multi-Level Tree ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: 3-Tier Transitive Inheritance Cascade (Person ➔ Employee ➔ Manager)
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="3-Tier Inheritance Cascade"
            >
              {/* Box 1 */}
              <g transform="translate(30, 20)">
                <rect width="200" height="100" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="200" height="24" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="100" y="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Tier 1: Person</text>
                <text x="15" y="44" fill="#10b981" fontWeight="bold">PK person_id : INT</text>
                <text x="15" y="64" fill="#cbd5e1">full_name : VARCHAR</text>
                <text x="15" y="84" fill="#cbd5e1">email : VARCHAR</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(235, 60)">
                <path d="M 0,10 L 40,10" stroke="#64748b" strokeWidth="2" />
                <polygon points="40,6 50,10 40,14" fill="#64748b" />
              </g>

              {/* Box 2 */}
              <g transform="translate(290, 20)">
                <rect width="200" height="100" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="200" height="24" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="100" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Tier 2: Employee</text>
                <text x="15" y="44" fill="#10b981" fontWeight="bold">PK,FK person_id : INT</text>
                <text x="15" y="64" fill="#cbd5e1">monthly_salary : DECIMAL</text>
                <text x="15" y="84" fill="#cbd5e1">hire_date : DATE</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(495, 60)">
                <path d="M 0,10 L 40,10" stroke="#64748b" strokeWidth="2" />
                <polygon points="40,6 50,10 40,14" fill="#64748b" />
              </g>

              {/* Box 3 */}
              <g transform="translate(550, 20)">
                <rect width="200" height="100" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="200" height="24" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="100" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Tier 3: Eng Manager</text>
                <text x="15" y="44" fill="#10b981" fontWeight="bold">PK,FK person_id : INT</text>
                <text x="15" y="64" fill="#cbd5e1">team_budget : DECIMAL</text>
                <text x="15" y="84" fill="#cbd5e1">team_size : INT</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 3-Tier Sandbox ──────────────── */}
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
                Interactive Multi-Tier Specialization Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Insert a manager across all 3 tables and test multi-tier cascading deletions
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Insert Engineering Manager (3-Tier Cascade):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Full Name (Tier 1)"
                  /&gt;
                  <input
                    type="email"
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Email (Tier 1)"
                  /&gt;
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Salary ₹ (Tier 2)"
                  /&gt;
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Budget ₹ (Tier 3)"
                  /&gt;
                </div>
                <button
                  onClick={handleInsertManager}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ⚡ Execute 3-Table Atomic Insert
                </button>
              </div>

              {/* Cascade Delete Action */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Test Multi-Tier ON DELETE CASCADE:
                </span>
                <div className="flex flex-wrap gap-2">
                  {persons.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleDeletePerson(p.id)}
                      className="py-1 px-2.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                    &gt;
                      Drop #{p.id} ({p.name.split(" ")[0]})
                    </button>
                  ))}
                </div>
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
                <pre className="whitespace-pre-wrap">{engineLog}</pre>
              </div>
            </div>

            {/* DDL & Live Tables */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational 3-Tier DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Polymorphic Joined View */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Joined View: vw_engineering_managers ({managers.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID (PK)</th>
                        <th className="p-1.5">Name (T1)</th>
                        <th className="p-1.5">Salary (T2)</th>
                        <th className="p-1.5">Budget (T3)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {managers.map((m) => {
                        const person = persons.find((p) => p.id === m.personId);
                        const emp = employees.find((e) => e.personId === m.personId);
                        return (
                          <tr key={m.personId}>
                            <td className="p-1.5 text-cyan-300 font-bold">#{m.personId}</td>
                            <td className="p-1.5 text-white">{person?.name}</td>
                            <td className="p-1.5 text-emerald-300">₹{emp?.salary}</td>
                            <td className="p-1.5 text-teal-300">₹{m.budget}</td>
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
                Staff management and health insurance inheritance from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Staff Management (3-Tier Hierarchy)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Tech</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Polymorphic view assembling person identity, employee salary, and managerial budgets seamlessly.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE VIEW vw_engineering_managers AS
SELECT p.person_id, p.full_name, p.email, e.monthly_salary, m.team_budget
FROM persons p
JOIN employees e ON p.person_id = e.person_id
JOIN engineering_managers m ON e.person_id = m.person_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Healthcare Relationship Inheritance
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Health</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Health insurance is linked at the <code>Person</code> level; both <code>Student</code> and <code>Instructor</code> inherit coverage.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE health_policies (
    policy_id INT PRIMARY KEY,
    person_id INT NOT NULL, -- Linked to Root Superclass Person
    coverage_amount DECIMAL(12, 2) NOT NULL DEFAULT 500000.00,
    FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE
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
                Avoid attribute duplication across tiers and broken primary key chains
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
                  <strong className="text-white">1. Duplicating Superclass Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Copying <code>name</code> or <code>email</code> to subclass tables causes redundancy and update anomalies.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Standalone IDs on Subclasses:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Creating separate <code>manager_id AUTO_INCREMENT</code> breaks 1:1 polymorphic join paths.
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
                  <strong className="text-white">1. Propagate Root PK Down:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>person_id</code> as Primary Key and Foreign Key across all child and grandchild tables.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Multi-Tier ON DELETE CASCADE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure dropping a root entity cleans up all corresponding intermediate and leaf rows automatically.
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
              <span>Subclasses inherit all attributes and relationships from all ancestor superclasses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The Root Superclass Primary Key is propagated as the PK and FK down all tiers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Subclasses only define local specific attributes and local specific relationships</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Relationships attached to a superclass are inherited by all its subclasses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use database Views to simplify multi-tier inner joins for application developers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Configure `ON DELETE CASCADE` across all foreign keys in the hierarchy chain</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Attribute & Relationship Inheritance – FAQs"
            questions={questions}
            subtitle="Master transitive type inheritance, multi-tier Table-Per-Type schemas, shared PK propagation, and polymorphic views with 30 comprehensive Q&As"
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
            title="Attribute and Relationship Inheritance in Specialization Hierarchies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic10_inheritance_hierarchies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Inheritance is one of the most elegant concepts in data architecture! " +
              "In my classes in Barrackpore, I teach students the Transitive Flow Principle: " +
              "When you specialize `Person` into `Employee` and then specialize `Employee` into `Engineering_Manager`, " +
              "never duplicate a single column. Define `full_name` once in `persons`, `salary` once in `employees`, " +
              "and `budget` once in `engineering_managers`. Propagate `person_id` as the primary key down all three tables, " +
              "create a unified database view `vw_engineering_managers`, and your schema will remain perfectly normalized, " +
              "clean, and blazing fast."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 10 · Attribute & Relationship Inheritance · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;
