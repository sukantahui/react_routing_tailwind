import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – ENUM and SET Data Types for Constrained Choices
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive ENUM & SET Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [selectedCity, setSelectedCity] = useState("Barrackpore");
  const [selectedSkills, setSelectedSkills] = useState(["MySQL", "React"]);
  const [testInvalidMode, setTestInvalidMode] = useState(false);
  const [engineFeedback, setEngineFeedback] = useState(
    "Configure ENUM & SET choices and click 'Execute INSERT Query'."
  );

  const [studentProfiles, setStudentProfiles] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", skills: "MySQL,React", bitmask: 3 },
    { id: 102, name: "Abhronila Das", city: "Kolkata", skills: "MySQL,Python", bitmask: 5 },
  ]);

  const cityEnumOptions = [
    { name: "Barrackpore", index: 1 },
    { name: "Kolkata", index: 2 },
    { name: "Ichapur", index: 3 },
    { name: "Jadavpur", index: 4 },
  ];

  const skillSetOptions = [
    { name: "MySQL", bit: 1, power: "2^0" },
    { name: "React", bit: 2, power: "2^1" },
    { name: "Python", bit: 4, power: "2^2" },
    { name: "Accounting", bit: 8, power: "2^3" },
  ];

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

  const handleToggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  // Calculate SET bitmask
  const calculatedBitmask = selectedSkills.reduce((acc, skillName) => {
    const opt = skillSetOptions.find((o) => o.name === skillName);
    return acc | (opt ? opt.bit : 0);
  }, 0);

  const handleExecuteInsert = () => {
    if (testInvalidMode) {
      setEngineFeedback(
        "❌ ERROR 1265 (01000): Data truncated for column 'city' at row 1. 'Bangalore' is not a permitted choice in ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur')!"
      );
      return;
    }

    const newId = 100 + studentProfiles.length + 1;
    const skillsString = selectedSkills.length > 0 ? selectedSkills.join(",") : "";

    const newRow = {
      id: newId,
      name: "Susmita Ghosh",
      city: selectedCity,
      skills: skillsString || "(None)",
      bitmask: calculatedBitmask,
    };

    setStudentProfiles([...studentProfiles, newRow]);
    setEngineFeedback(
      `✓ Query OK, 1 row affected (0.01 sec). Inserted student ID ${newId}. ENUM city='${selectedCity}' (Index: ${
        cityEnumOptions.find((c) => c.name === selectedCity)?.index
      }), SET skills='${skillsString}' (Bitmask integer: ${calculatedBitmask}).`
    );
  };

  const handleReset = () => {
    setStudentProfiles([
      { id: 101, name: "Mamata Hui", city: "Barrackpore", skills: "MySQL,React", bitmask: 3 },
      { id: 102, name: "Abhronila Das", city: "Kolkata", skills: "MySQL,Python", bitmask: 5 },
    ]);
    setEngineFeedback("Simulator reset to initial state.");
  };

  const generatedDDL = `CREATE TABLE student_profiles (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_name VARCHAR(50) NOT NULL,\n    city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur') NOT NULL DEFAULT 'Barrackpore',\n    skills SET('MySQL', 'React', 'Python', 'Accounting') NOT NULL DEFAULT 'MySQL'\n) ENGINE=InnoDB;`;

  const generatedInsertSQL = `INSERT INTO student_profiles (student_name, city, skills)\nVALUES ('Susmita Ghosh', ${
    testInvalidMode ? "'Bangalore' -- Invalid ENUM!" : `'${selectedCity}'`
  }, '${selectedSkills.join(",")}');`;

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
            Module 001_003 · Keys & Constraints · Topic 10
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            ENUM & SET{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Data Types for Constrained Choices
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master mutually exclusive single-choice ENUMs, multi-choice bitmask SETs, internal 1-byte integer
            storage optimization, and querying with <code>FIND_IN_SET()</code>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 ENUM (1-Byte Integer Index)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧩 SET (Bitmask Powers of 2)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 FIND_IN_SET() Querying
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Instant DDL Appends
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Storage Mechanics & Comparison ─────────── */}
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
                ENUM vs SET Storage Architecture
              </h2>
              <p className="text-xs text-slate-400">
                How MySQL converts text choices into compact 1-byte integer indexes and bitmasks
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ENUM */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                ENUM: 1-Based Integer Index (1 Byte)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Stored as index 1, 2, 3... declaration order. Saves 90%+ RAM compared to VARCHAR.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur')
              </pre>
            </div>

            {/* SET */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                SET: Bitwise Powers of 2 Bitmask
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Combinations are stored as bitwise OR: <code>'MySQL,React' = 1 | 2 = 3</code>.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                skills SET('MySQL', 'React', 'Python', 'Accounting')
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: SET Bitmask Architecture ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: How MySQL SET Bitmasks Combine Multi-Choice Values
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="SET Bitmask Diagram"
            >
              {[
                { name: "MySQL", bit: "Bit 0 (1)", bin: "0001", color: "#10b981" },
                { name: "React", bit: "Bit 1 (2)", bin: "0010", color: "#38bdf8" },
                { name: "Python", bit: "Bit 2 (4)", bin: "0100", color: "#818cf8" },
                { name: "Accounting", bit: "Bit 3 (8)", bin: "1000", color: "#f59e0b" },
              ].map((b, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 190}, 20)`}>
                  <rect width="175" height="90" rx="8" fill="#1e293b" stroke={b.color} />
                  <text x="87" y="26" fill={b.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {b.name}
                  </text>
                  <line x1="10" y1="38" x2="165" y2="38" stroke="#334155" />
                  <text x="15" y="56" fill="#cbd5e1" fontSize="9">Value Value:</text>
                  <text x="160" y="56" fill="#cbd5e1" textAnchor="end" fontSize="9" fontWeight="bold">{b.bit}</text>
                  <text x="15" y="76" fill="#cbd5e1" fontSize="9">Binary Mask:</text>
                  <text x="160" y="76" fill={b.color} textAnchor="end" fontSize="9" fontWeight="bold">{b.bin}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive ENUM & SET Sandbox ──────────── */}
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
                Interactive ENUM & SET Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Select single ENUM radio choices and multi-check SET options, observing live bitmask calculations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* ENUM Radio Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Single ENUM City (1-Choice Only):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cityEnumOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedCity(c.name);
                        setTestInvalidMode(false);
                      }}
                      className={clsx(
                        "p-2 rounded-lg text-xs font-medium border text-left transition-all",
                        selectedCity === c.name && !testInvalidMode
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      <div className="font-bold">{c.name}</div>
                      <div className="text-[10px] text-slate-500">Index #{c.index}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SET Checkbox Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Select Multiple SET Skills:
                  </label>
                  <span className="text-xs font-mono text-cyan-400">
                    Bitmask = {calculatedBitmask} (0b{calculatedBitmask.toString(2).padStart(4, "0")})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {skillSetOptions.map((s) => {
                    const isChecked = selectedSkills.includes(s.name);
                    return (
                      <button
                        key={s.name}
                        onClick={() => handleToggleSkill(s.name)}
                        className={clsx(
                          "p-2 rounded-lg text-xs font-medium border text-left transition-all",
                          isChecked
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        )}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{s.name}</span>
                          <span>{isChecked ? "☑" : "☐"}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Bit Value: +{s.bit} ({s.power})</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Test Invalid Mode Checkbox */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={testInvalidMode}
                    onChange={(e) => setTestInvalidMode(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-900 text-rose-500 focus:ring-0"
                  />
                  <span>Test with invalid city <code>'Bangalore'</code> (Triggers Error 1265)</span>
                </label>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleExecuteInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Execute INSERT Query
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Feedback:
                </span>
                {engineFeedback}
              </div>
            </div>

            {/* Generated SQL & Live Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedInsertSQL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Active Student Profiles Table ({studentProfiles.length} rows):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">ENUM City</th>
                        <th className="p-2">SET Skills</th>
                        <th className="p-2">Bitmask</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentProfiles.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-cyan-300">{s.city}</td>
                          <td className="p-2 text-emerald-400">{s.skills}</td>
                          <td className="p-2 text-amber-400 font-bold">{s.bitmask}</td>
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
                ENUM and SET schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Enrollment Status & Location Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Restricting student residential zones to North 24 Parganas municipalities and managing academic status.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_profiles (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur') NOT NULL DEFAULT 'Barrackpore',
    academic_status ENUM('ENROLLED', 'ON_LEAVE', 'GRADUATED', 'WITHDRAWN') NOT NULL DEFAULT 'ENROLLED',
    hobbies SET('Coding', 'Music', 'Sports', 'Reading', 'Photography') NOT NULL DEFAULT 'Coding'
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Delivery & Payment State Machine
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using ENUM for order fulfillment states and SET for multi-payment gateway enablement.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE order_deliveries (
    delivery_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    delivery_status ENUM('PENDING', 'PACKED', 'SHIPPED', 'DELIVERED', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    payment_methods_allowed SET('UPI', 'NetBanking', 'CreditCard', 'CashOnDelivery') NOT NULL DEFAULT 'UPI,CashOnDelivery'
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
                Avoid ENUM sorting traps and slow SET queries
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
                  <strong className="text-white">1. Sorting ENUMs Alphabetically:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>ORDER BY status</code> sorts by internal declaration index. Must use <code>ORDER BY CAST(status AS CHAR)</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Searching SETs with LIKE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>LIKE '%MySQL%'</code> causes full table scans. Use <code>FIND_IN_SET('MySQL', skills)</code>.
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
                  <strong className="text-white">1. Append to End for Instant DDL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Adding new choices to the end of ENUM lists executes instantly with zero table rebuild.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. ANSI SQL Portability:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>VARCHAR(20) CHECK (col IN (...))</code> for portable multi-database codebases.
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
              <span><code>ENUM</code> stores mutually exclusive single choices as 1-byte integer indexes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>SET</code> stores multiple combined choices as compact bitmasks</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ORDER BY enum_col</code> sorts by internal declaration index, not alphabetically</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>FIND_IN_SET('val', set_col)</code> to query multi-value SET members</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Appending new items to the end of an ENUM list executes in sub-milliseconds</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Invalid string insertions in strict mode trigger Error 1265 immediately</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="ENUM and SET Data Types – FAQs"
            questions={questions}
            subtitle="Master constrained string choices, 1-byte integer storage, and bitmask querying with 30 comprehensive Q&As"
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
            title="ENUM and SET Data Types for Constrained Choices"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic10_enum_set_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "`ENUM` and `SET` are classic MySQL power features that deliver incredible storage density when used correctly. " +
              "In my classes in Barrackpore, I emphasize two critical lessons: First, never forget that `ORDER BY status` sorts by the " +
              "internal index of your declaration, not by the letters A to Z! If you want alphabetical order, cast to char: " +
              "`ORDER BY CAST(status AS CHAR)`. Second, when expanding your ENUM list in production, always append new items to the " +
              "END of the list. That allows MySQL 8.0 to execute an Instant DDL metadata alteration in 0.001 seconds without copying " +
              "millions of rows on disk."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 10 · ENUM & SET · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;
