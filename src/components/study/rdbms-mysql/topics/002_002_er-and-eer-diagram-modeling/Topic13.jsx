import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Step-by-Step ER-to-Relational Mapping Algorithm: Mapping Regular (Strong) Entities
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Step 1 Mapping Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic13 = () => {
  const sectionRefs = useRef([]);

  // Interactive Step 1 Mapping State
  const [firstName, setFirstName] = useState("Mamata");
  const [lastName, setLastName] = useState("Hui");
  const [street, setStreet] = useState("12 Ghoshpara Road");
  const [locality, setLocality] = useState("Barrackpore");
  const [pincode, setPincode] = useState("700120");
  const [dob, setDob] = useState("2003-05-14");
  const [fee, setFee] = useState(15000);

  const [studentRows, setStudentRows] = useState([
    {
      id: 1,
      firstName: "Mamata",
      lastName: "Hui",
      street: "12 Ghoshpara Road",
      locality: "Barrackpore",
      pincode: "700120",
      dob: "2003-05-14",
      fee: 15000,
    },
    {
      id: 2,
      firstName: "Abhronila",
      lastName: "Das",
      street: "45 Station Road",
      locality: "Ichapur",
      pincode: "743144",
      dob: "2004-11-20",
      fee: 18500,
    },
    {
      id: 3,
      firstName: "Debangshu",
      lastName: "Roy",
      street: "88 Southern Avenue",
      locality: "Kolkata",
      pincode: "700029",
      dob: "2002-09-08",
      fee: 15000,
    },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Step 1 Algorithm Ready. Enter composite conceptual attributes and click 'Execute Step 1 Mapping' to observe flattening and virtual column generation."
  );

  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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

  const handleInsertStudent = () => {
    const nextId = studentRows.length > 0 ? Math.max(...studentRows.map((s) => s.id)) + 1 : 1;
    const newStudent = {
      id: nextId,
      firstName,
      lastName,
      street,
      locality,
      pincode,
      dob,
      fee: Number(fee),
    };

    setStudentRows([...studentRows, newStudent]);
    const computedAge = calculateAge(dob);
    setEngineLog(
      `✓ Step 1 Applied: Flattened Name ('${firstName}', '${lastName}') and Address ('${street}', '${locality}', '${pincode}'). Virtual column 'age' generated as ${computedAge} years.`
    );
  };

  const handleReset = () => {
    setStudentRows([
      {
        id: 1,
        firstName: "Mamata",
        lastName: "Hui",
        street: "12 Ghoshpara Road",
        locality: "Barrackpore",
        pincode: "700120",
        dob: "2003-05-14",
        fee: 15000,
      },
      {
        id: 2,
        firstName: "Abhronila",
        lastName: "Das",
        street: "45 Station Road",
        locality: "Ichapur",
        pincode: "743144",
        dob: "2004-11-20",
        fee: 18500,
      },
      {
        id: 3,
        firstName: "Debangshu",
        lastName: "Roy",
        street: "88 Southern Avenue",
        locality: "Kolkata",
        pincode: "700029",
        dob: "2002-09-08",
        fee: 15000,
      },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Step 1: Mapping Strong Entity 'Student'\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    -- Flattened Composite 'Name'\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    -- Flattened Composite 'Address'\n    street VARCHAR(100) NOT NULL,\n    locality VARCHAR(50) NOT NULL DEFAULT 'Barrackpore',\n    pincode CHAR(6) NOT NULL,\n    -- Stored Date of Birth\n    dob DATE NOT NULL,\n    -- Virtual Generated Column for Derived 'age'\n    age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)) VIRTUAL,\n    tuition_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,\n    CONSTRAINT chk_pincode CHECK (pincode REGEXP '^[1-9][0-9]{5}$')\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 13
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            ER-to-Relational Mapping:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Step 1 – Regular (Strong) Entities
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Step 1 of the formal 7-step mapping algorithm: converting strong conceptual entities into physical base tables,
            flattening composite attributes into atomic columns, selecting primary keys, and computing derived attributes with MySQL virtual columns.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧱 Strong Entity Base Table
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧩 Composite Attribute Flattening
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ MySQL VIRTUAL Generated Columns
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Primary Key Selection
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Step 1 Transformation Architecture ──────── */}
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
                Step 1: The Transformation Matrix
              </h2>
              <p className="text-xs text-slate-400">
                How each conceptual attribute category translates into physical MySQL table columns
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Simple Stored</span>
              <p className="text-xs text-slate-300">Mapped directly to a column (e.g. <code>dob DATE</code>).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Composite</span>
              <p className="text-xs text-slate-300">Flattened into simple sub-columns (e.g. <code>first_name</code>, <code>last_name</code>).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Derived</span>
              <p className="text-xs text-slate-300">Virtual Generated Column (e.g. <code>age VIRTUAL</code>).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">4. Multi-Valued</span>
              <p className="text-xs text-slate-300">EXCLUDED in Step 1 (mapped to separate table in Step 6).</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Step 1 Transformation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Step 1 Conceptual Entity ➔ Relational Table Transformation
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Step 1 Mapping Flow"
            >
              {/* Conceptual Entity Box */}
              <g transform="translate(30, 20)">
                <rect width="220" height="100" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="220" height="24" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="110" y="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Conceptual: Student</text>
                <text x="15" y="44" fill="#38bdf8">Key: student_id</text>
                <text x="15" y="62" fill="#cbd5e1">Composite: Name(first, last)</text>
                <text x="15" y="80" fill="#cbd5e1">Composite: Address(street, loc, pin)</text>
                <text x="15" y="98" fill="#10b981">Derived: age [from dob]</text>
              </g>

              {/* Transformation Arrow */}
              <g transform="translate(270, 60)">
                <path d="M 0,10 L 60,10" stroke="#64748b" strokeWidth="2" />
                <polygon points="60,6 70,10 60,14" fill="#64748b" />
                <text x="35" y="0" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold">Step 1 Flattening</text>
              </g>

              {/* Physical Relational Table Box */}
              <g transform="translate(360, 20)">
                <rect width="380" height="100" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="380" height="24" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="190" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Physical: students (Table)</text>
                <text x="15" y="44" fill="#38bdf8" fontWeight="bold">PK student_id INT AUTO_INCREMENT</text>
                <text x="15" y="62" fill="#cbd5e1">first_name, last_name, street, locality, pincode</text>
                <text x="15" y="80" fill="#cbd5e1">dob DATE, tuition_fee DECIMAL(10, 2)</text>
                <text x="15" y="98" fill="#10b981">age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(...)) VIRTUAL</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Step 1 Sandbox ──────────────── */}
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
                Interactive Step 1 Mapping Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Input conceptual attributes and execute the Step 1 transformation algorithm
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Conceptual Attribute Input (Student):
                </span>

                {/* Composite Name */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold">Composite Attribute: Name</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                      placeholder="First Name"
                    /&gt;
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                      placeholder="Last Name"
                    /&gt;
                  </div>
                </div>

                {/* Composite Address */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold">Composite Attribute: Address</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Street"
                    /&gt;
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Locality"
                    /&gt;
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Pincode"
                    /&gt;
                  </div>
                </div>

                {/* Stored DOB & Tuition */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold">DOB (Derived Age Source)</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    /&gt;
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold">Tuition Fee (₹)</label>
                    <input
                      type="number"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    /&gt;
                  </div>
                </div>

                <button
                  onClick={handleInsertStudent}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all mt-1"
                >
                  ⚡ Execute Step 1 Mapping & Insert Row
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
                <pre className="whitespace-pre-wrap">{engineLog}</pre>
              </div>
            </div>

            {/* DDL & Live Atomic Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated Step 1 DDL:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Flattened Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Physical Base Table: students ({studentRows.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Name (Flattened)</th>
                        <th className="p-1.5">Address (Flattened)</th>
                        <th className="p-1.5">Age (Virtual)</th>
                        <th className="p-1.5">Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRows.map((s) => (
                        <tr key={s.id}>
                          <td className="p-1.5 text-cyan-300 font-bold">#{s.id}</td>
                          <td className="p-1.5 text-white">{s.firstName} {s.lastName}</td>
                          <td className="p-1.5 text-slate-400">{s.street}, {s.locality} - {s.pincode}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{calculateAge(s.dob)} yrs</td>
                          <td className="p-1.5 text-teal-300">₹{s.fee}</td>
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
                Academy student schemas and hospital patient records from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Academy Student Master Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Complete Step 1 transformation with flattened name, address, and virtual age calculation.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    street VARCHAR(100) NOT NULL,
    locality VARCHAR(50) NOT NULL DEFAULT 'Barrackpore',
    pincode CHAR(6) NOT NULL,
    dob DATE NOT NULL,
    age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)) VIRTUAL,
    tuition_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Hospital Patient Master Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Hospital</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Patients table with 12-digit Aadhaar candidate key and blood group constraints.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    aadhaar_no CHAR(12) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-') NOT NULL,
    emergency_contact VARCHAR(15) NOT NULL,
    CONSTRAINT chk_aadhaar CHECK (aadhaar_no REGEXP '^[0-9]{12}$')
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
                Avoid non-atomic strings and hardcoding stale derived values
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
                  <strong className="text-white">1. Single Unformatted Address Strings:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Storing address as a single VARCHAR violates 1NF atomicity and prevents city/pincode indexing.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Hardcoding Stale Derived Age:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Storing a static integer <code>age</code> column becomes inaccurate over time without manual updates.
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
                  <strong className="text-white">1. Flatten All Composite Leaves:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Decompose composite attributes into granular, individually typed atomic columns.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. MySQL VIRTUAL Generated Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>GENERATED ALWAYS AS (...) VIRTUAL</code> for zero-disk-overhead computed values.
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
              <span>Step 1 maps every Regular (Strong) entity type into a dedicated base table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Flatten composite attributes into simple, atomic component columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Select the most compact candidate key as the table's Primary Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Declare all remaining candidate keys as `UNIQUE NOT NULL`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Multi-valued attributes are EXCLUDED in Step 1 (handled in Step 6)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Implement derived attributes as MySQL `VIRTUAL GENERATED` columns</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Step 1: Mapping Strong Entities – FAQs"
            questions={questions}
            subtitle="Master Step 1 of the ER-to-Relational mapping algorithm, composite attribute flattening, and virtual generated columns with 30 comprehensive Q&As"
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
            title="Step-by-Step ER-to-Relational Mapping Algorithm: Mapping Regular (Strong) Entities"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic13_mapping_strong_entities_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Step 1 is the cornerstone of the entire ER-to-Relational mapping process! " +
              "In my classes in Barrackpore, I emphasize two golden rules for Step 1: " +
              "1) Never store a composite attribute as a single unformatted string—flatten `Name` into `first_name` and `last_name`, " +
              "and flatten `Address` into `street`, `locality`, and `pincode`. This gives you 100% 1NF atomicity and blazing-fast indexes. " +
              "2) Never store derived values like `age` as static integers; use MySQL 8's `GENERATED ALWAYS AS (TIMESTAMPDIFF(...)) VIRTUAL` " +
              "so the age is always dynamically calculated with zero disk storage overhead."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 13 · Mapping Strong Entities · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;
