import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Min-Max Constraint Notation (min, max) for Relationship Participation
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive (min, max) Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("student_course");

  const scenarios = {
    student_course: {
      title: "Student (1, N) ───< Enrolls_In >─── (0, M) Course",
      entityA: { name: "Student", minMax: "(1, N)", desc: "Every student MUST take at least 1 course, and may take N courses (Mandatory Many)." },
      entityB: { name: "Course", minMax: "(0, M)", desc: "A course can have 0 enrolled students (new course), and up to M students (Optional Many)." },
      relType: "Many-to-Many (M:N)",
      ddl: `-- M:N Bridge Table Mapping with Composite PK\nCREATE TABLE student_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrolled_at DATE NOT NULL DEFAULT (CURRENT_DATE),\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,\n    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`,
    },
    emp_dept: {
      title: "Employee (0, 1) ───< Manages >─── (1, 1) Department",
      entityA: { name: "Employee", minMax: "(0, 1)", desc: "An employee manages 0 departments (regular staff) or at most 1 department (Optional One)." },
      entityB: { name: "Department", minMax: "(1, 1)", desc: "Every department MUST have EXACTLY 1 manager (Mandatory Exactly One)." },
      relType: "One-to-One (1:1 Partial/Total)",
      ddl: `-- Foreign Key in Department (Total Side) with NOT NULL UNIQUE\nCREATE TABLE departments (\n    dept_id INT AUTO_INCREMENT PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL,\n    manager_emp_id INT NOT NULL, -- Total: (1, 1) enforced via NOT NULL\n    CONSTRAINT uq_dept_mgr UNIQUE (manager_emp_id), -- (max = 1) enforced via UNIQUE\n    FOREIGN KEY (manager_emp_id) REFERENCES employees(emp_id)\n) ENGINE=InnoDB;`,
    },
    customer_order: {
      title: "Customer (0, N) ───< Places >─── (1, 1) Order",
      entityA: { name: "Customer", minMax: "(0, N)", desc: "A registered customer can place 0 orders or up to N orders (Optional Many)." },
      entityB: { name: "Order", minMax: "(1, 1)", desc: "Every order MUST be placed by EXACTLY 1 customer (Mandatory Exactly One)." },
      relType: "One-to-Many (1:N Total on Many side)",
      ddl: `-- Foreign Key in Order (Many side) with NOT NULL\nCREATE TABLE orders (\n    order_id INT AUTO_INCREMENT PRIMARY KEY,\n    customer_id INT NOT NULL, -- Total: (1, 1) enforced via NOT NULL\n    order_total DECIMAL(10, 2) NOT NULL,\n    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n) ENGINE=InnoDB;`,
    },
    citizen_passport: {
      title: "Citizen (0, 1) ───< Holds >─── (0, 1) Passport",
      entityA: { name: "Citizen", minMax: "(0, 1)", desc: "A citizen can hold 0 or 1 passport (Optional One)." },
      entityB: { name: "Passport", minMax: "(0, 1)", desc: "A passport can be unassigned (0) or held by 1 citizen (Optional One)." },
      relType: "One-to-One (1:1 Partial/Partial)",
      ddl: `-- Foreign Key in Passport with Nullable UNIQUE\nCREATE TABLE passports (\n    passport_no VARCHAR(10) PRIMARY KEY,\n    citizen_id INT NULL, -- Optional (min = 0)\n    issued_date DATE NOT NULL,\n    CONSTRAINT uq_passport_citizen UNIQUE (citizen_id), -- (max = 1)\n    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)\n) ENGINE=InnoDB;`,
    },
  };

  const currentScenario = scenarios[selectedScenarioKey];

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
            Module 002_002 · ER & EER Modeling · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Min-Max Constraint Notation{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              (min, max) in ER Modeling
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the formal ISO `(min, max)` constraint notation: unifying participation lower bounds (min) and
            cardinality upper bounds (max) with Look-Here local semantics and relational DDL translation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 (0, 1) Optional One
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔒 (1, 1) Mandatory Exactly One
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 (0, N) Optional Many
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 (1, N) Mandatory Many
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 4 Classic (min, max) Pairs ──────────── */}
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
                The 4 Standard (min, max) Constraint Pairs
              </h2>
              <p className="text-xs text-slate-400">
                Participation (min) + Cardinality (max) unified into a single mathematical tuple
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
              <strong className="text-cyan-400 block font-mono text-sm">(0, 1) Optional One</strong>
              <p className="text-slate-300">Min = 0 (Partial), Max = 1 (Single). Example: Citizen's passport or Employee managing department.</p>
              <div className="text-[11px] text-cyan-300 font-mono font-bold">Crow's Foot: o|</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/40 space-y-1">
              <strong className="text-teal-400 block font-mono text-sm">(1, 1) Mandatory One</strong>
              <p className="text-slate-300">Min = 1 (Total), Max = 1 (Single). Example: Department having exactly 1 manager.</p>
              <div className="text-[11px] text-teal-300 font-mono font-bold">Crow's Foot: ||</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-1">
              <strong className="text-indigo-400 block font-mono text-sm">(0, N) Optional Many</strong>
              <p className="text-slate-300">Min = 0 (Partial), Max = N (Many). Example: Customer placing orders or Course enrollments.</p>
              <div className="text-[11px] text-indigo-300 font-mono font-bold">Crow's Foot: &gt;o</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
              <strong className="text-emerald-400 block font-mono text-sm">(1, N) Mandatory Many</strong>
              <p className="text-slate-300">Min = 1 (Total), Max = N (Many). Example: Invoice containing line items.</p>
              <div className="text-[11px] text-emerald-300 font-mono font-bold">Crow's Foot: &gt;|</div>
            </div>
          </div>

          {/* ── Semantic SVG 1: (min, max) Visual Guide ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Look-Here Semantics of (min, max) Notation
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Min Max Notation Guide"
            >
              {/* Student Entity */}
              <g transform="translate(30, 40)">
                <rect width="180" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="90" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="11">STUDENT</text>
                <text x="90" y="38" fill="#94a3b8" textAnchor="middle" fontSize="9">Local Bound: (1, N)</text>
              </g>

              {/* Edge 1 with (1, N) */}
              <line x1="210" y1="65" x2="310" y2="65" stroke="#38bdf8" strokeWidth="2" />
              <text x="260" y="55" fill="#38bdf8" textAnchor="middle" fontSize="10" fontWeight="bold">(1, N)</text>

              {/* Relationship Diamond */}
              <g transform="translate(310, 30)">
                <polygon points="70,0 140,35 70,70 0,35" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="38" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">Enrolls_In</text>
              </g>

              {/* Edge 2 with (0, M) */}
              <line x1="450" y1="65" x2="550" y2="65" stroke="#10b981" strokeWidth="2" />
              <text x="500" y="55" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold">(0, M)</text>

              {/* Course Entity */}
              <g transform="translate(550, 40)">
                <rect width="200" height="50" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="100" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="11">COURSE</text>
                <text x="100" y="38" fill="#94a3b8" textAnchor="middle" fontSize="9">Local Bound: (0, M)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive (min, max) Simulator ────────── */}
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
                Interactive (min, max) Scenario Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Select enterprise scenarios to examine local bounds, cardinality ratios, and relational MySQL DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedScenarioKey("student_course")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedScenarioKey === "student_course"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Student ── Course (1,N):(0,M)
              </button>
              <button
                onClick={() => setSelectedScenarioKey("emp_dept")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedScenarioKey === "emp_dept"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Employee ── Dept (0,1):(1,1)
              </button>
              <button
                onClick={() => setSelectedScenarioKey("customer_order")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedScenarioKey === "customer_order"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Customer ── Order (0,N):(1,1)
              </button>
              <button
                onClick={() => setSelectedScenarioKey("citizen_passport")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedScenarioKey === "citizen_passport"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Citizen ── Passport (0,1):(0,1)
              </button>
            </div>

            {/* Scenario Display */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white font-mono">{currentScenario.title}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {currentScenario.relType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-cyan-300 font-bold">{currentScenario.entityA.name}</strong>
                    <span className="font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                      {currentScenario.entityA.minMax}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{currentScenario.entityA.desc}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-emerald-300 font-bold">{currentScenario.entityB.name}</strong>
                    <span className="font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {currentScenario.entityB.minMax}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{currentScenario.entityB.desc}</p>
                </div>
              </div>

              {/* DDL */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational MySQL DDL Implementation:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {currentScenario.ddl}
                </pre>
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
                Tuition enrollments and departmental hierarchy bounds from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Enrollment Bounds (1, N) : (0, M)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Student must enroll in at least 1 course; courses can have 0 enrolled students initially.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Student (1, N) ──< Enrolls >── (0, M) Course
CREATE TABLE student_enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    CONSTRAINT fk_se_student FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT fk_se_course FOREIGN KEY (course_id) REFERENCES courses(course_id)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Department Head Bounds (0, 1) : (1, 1)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata College</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Employee is (0, 1) - most faculty are not managers; Department is (1, 1) - must have exactly 1 manager.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    manager_id INT NOT NULL UNIQUE, -- (1, 1) enforced via NOT NULL UNIQUE
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
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
                Avoid inverted bounds and mixing look-across with look-here semantics
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
                  <strong className="text-white">1. Inverting Bounds:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>(1, 0)</code> is mathematically invalid; <code>0 <= min <= max</code> must hold.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Mixing Semantic Perspectives:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Confusing Chen look-across 'N' with localized <code>(min, max)</code> look-here bounds.
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
                  <strong className="text-white">1. Map (1, 1) to NOT NULL UNIQUE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Enforce mandatory single associations with <code>NOT NULL UNIQUE</code> on the foreign key.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Check Mathematical Bounds:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Verify that every entity's <code>(min, max)</code> satisfies <code>min >= 0</code> and <code>max >= 1</code>.
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
              <span>`(min, max)` unifies participation (min) and cardinality (max) in one tuple</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`(0, 1)` represents Optional One (o| in Crow's Foot)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`(1, 1)` represents Mandatory Exactly One (|| in Crow's Foot)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`(0, N)` represents Optional Many (&gt;o in Crow's Foot)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`(1, N)` represents Mandatory Many (&gt;| in Crow's Foot)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`(min, max)` uses Look-Here (local) semantics for the adjacent entity</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="(min, max) Constraint Notation – FAQs"
            questions={questions}
            subtitle="Master ISO min-max tuples, Look-Here vs Look-Across semantics, and Crow's foot translation with 30 comprehensive Q&As"
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
            title="Min-Max Constraint Notation (min, max) for Relationship Participation"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_min_max_constraints_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "`(min, max)` notation is the cleanest mathematical notation in all of database modeling! " +
              "In my classes in Barrackpore, I emphasize the Look-Here Rule: when you write `(0, 1)` next to Employee on the Manages line, " +
              "you are describing Employee itself—an employee can manage 0 departments or at most 1. And when you write `(1, 1)` next to Department, " +
              "you are stating that a department MUST have exactly 1 manager. Once you understand this local perspective, translating business rules " +
              "into MySQL `NOT NULL UNIQUE` foreign keys becomes second nature."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · (min, max) Notation · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
