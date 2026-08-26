import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Entities, Entity Sets, and Types of Attributes
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Attribute Explorer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive Attribute Sandbox State
  const [selectedStudentId, setSelectedStudentId] = useState(101);
  const [newPhone, setNewPhone] = useState("+91 98300 12345");
  const [phoneType, setPhoneType] = useState("Mobile");
  const [dob, setDob] = useState("2003-08-15");

  const [students, setStudents] = useState([
    { id: 101, firstName: "Mamata", lastName: "Hui", dob: "2003-08-15", city: "Barrackpore", fee: 15000 },
    { id: 102, firstName: "Abhronila", lastName: "Das", dob: "2004-03-22", city: "Barrackpore", fee: 18500 },
    { id: 103, firstName: "Debangshu", lastName: "Roy", dob: "2002-11-10", city: "Kolkata", fee: 16000 },
  ]);

  const [contacts, setContacts] = useState([
    { studentId: 101, phone: "+91 98300 11111", type: "Mobile" },
    { studentId: 101, phone: "+91 98300 22222", type: "Guardian" },
    { studentId: 102, phone: "+91 98300 33333", type: "Mobile" },
    { studentId: 103, phone: "+91 98300 44444", type: "Home" },
  ]);

  const [engineFeedback, setEngineFeedback] = useState(
    "Student Profile Loaded. Test adding multi-valued contact numbers or changing DOB to watch derived age recalculate."
  );

  // Compute derived age dynamically
  const calculateAge = (birthDateStr) => {
    const birth = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddPhone = () => {
    const sid = Number(selectedStudentId);
    const exists = contacts.some((c) => c.studentId === sid && c.phone === newPhone);
    const student = students.find((s) => s.id === sid);

    if (exists) {
      setEngineFeedback(`⚠️ Phone number '${newPhone}' already exists for ${student?.firstName}!`);
      return;
    }

    setContacts([...contacts, { studentId: sid, phone: newPhone, type: phoneType }]);
    setEngineFeedback(
      `✓ Multi-Valued Attribute: Added ${phoneType} phone '${newPhone}' to decomposed child table 'student_contacts' for ${student?.firstName}.`
    );
  };

  const handleUpdateDob = (newDob) => {
    setDob(newDob);
    const sid = Number(selectedStudentId);
    setStudents(
      students.map((s) => (s.id === sid ? { ...s, dob: newDob } : s))
    );
    const newAge = calculateAge(newDob);
    setEngineFeedback(
      `✓ Derived Virtual Column: Updated DOB to '${newDob}'. MySQL Virtual Generated Column 'current_age' dynamically computed to ${newAge} years old!`
    );
  };

  const handleReset = () => {
    setStudents([
      { id: 101, firstName: "Mamata", lastName: "Hui", dob: "2003-08-15", city: "Barrackpore", fee: 15000 },
      { id: 102, firstName: "Abhronila", lastName: "Das", dob: "2004-03-22", city: "Barrackpore", fee: 18500 },
      { id: 103, firstName: "Debangshu", lastName: "Roy", dob: "2002-11-10", city: "Kolkata", fee: 16000 },
    ]);
    setContacts([
      { studentId: 101, phone: "+91 98300 11111", type: "Mobile" },
      { studentId: 101, phone: "+91 98300 22222", type: "Guardian" },
      { studentId: 102, phone: "+91 98300 33333", type: "Mobile" },
      { studentId: 103, phone: "+91 98300 44444", type: "Home" },
    ]);
    setDob("2003-08-15");
    setEngineFeedback("Simulator reset to initial state.");
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

  const selectedStudent = students.find((s) => s.id === Number(selectedStudentId));
  const currentStudentPhones = contacts.filter((c) => c.studentId === Number(selectedStudentId));

  const ddlSnippet = `-- Master Entity (Atomic Columns + Virtual Derived Column)\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY, -- Key Attribute\n    first_name VARCHAR(50) NOT NULL,          -- Composite Leaf\n    last_name VARCHAR(50) NOT NULL,           -- Composite Leaf\n    dob DATE NOT NULL,                        -- Stored Attribute\n    current_age INT GENERATED ALWAYS AS (     -- Derived Virtual Attribute\n        TIMESTAMPDIFF(YEAR, dob, CURDATE())\n    ) VIRTUAL,\n    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00 -- Simple\n) ENGINE=InnoDB;\n\n-- Decomposed Multi-Valued Attribute Table\nCREATE TABLE student_contacts (\n    student_id INT NOT NULL,\n    phone_number VARCHAR(15) NOT NULL,\n    contact_type ENUM('Mobile', 'Home', 'Guardian') NOT NULL DEFAULT 'Mobile',\n    PRIMARY KEY (student_id, phone_number),\n    CONSTRAINT fk_contacts_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Entities, Entity Sets &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Types of Attributes
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the complete taxonomy of ER attributes: Simple vs Composite, Single vs Multi-valued (Double Ovals),
            Stored vs Derived (Dashed Ovals), and their translation into MySQL 8.0 Virtual Generated Columns and child tables.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Entities & Entity Sets
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌿 Simple vs Composite
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⭕⭕ Multi-Valued (Double Oval)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Derived Virtual Columns
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Peter Chen Notation Visual Dictionary ────── */}
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
                Peter Chen ER Attribute Notation Dictionary
              </h2>
              <p className="text-xs text-slate-400">
                Visual symbols for Entities, Identifiers, Multi-Valued, Composite, and Derived attributes
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/40">
              <span className="text-xs font-mono font-bold text-teal-400 block mb-1">Key Attribute</span>
              <div className="my-2 py-1 px-2 rounded-full border border-teal-500 bg-teal-500/10 text-teal-300 font-bold underline inline-block">
                student_id
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Underlined Text</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">Simple (Atomic)</span>
              <div className="my-2 py-1 px-2 rounded-full border border-cyan-500 bg-cyan-500/10 text-cyan-300 inline-block">
                admission_fee
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Standard Oval</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/40">
              <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">Composite</span>
              <div className="my-2 py-1 px-2 rounded-full border border-indigo-500 bg-indigo-500/10 text-indigo-300 inline-block">
                full_name ➔ (first, last)
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Branching Sub-Ovals</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/40">
              <span className="text-xs font-mono font-bold text-rose-400 block mb-1">Multi-Valued</span>
              <div className="my-2 py-1 px-2 rounded-full border-2 border-double border-rose-500 bg-rose-500/10 text-rose-300 inline-block">
                phone_numbers
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Double Oval (2 Lines)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-1">Derived</span>
              <div className="my-2 py-1 px-2 rounded-full border border-dashed border-amber-500 bg-amber-500/10 text-amber-300 inline-block">
                current_age
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Dashed Oval Line</span>
            </div>
          </div>

          {/* ── Semantic SVG 1: Student Entity Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Student Entity with All 5 Attribute Types in Peter Chen Notation
            </h3>
            <svg
              viewBox="0 0 780 160"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Peter Chen Entity Attributes"
            >
              {/* Central Entity */}
              <g transform="translate(300, 60)">
                <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="90" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="12">
                  STUDENT
                </text>
              </g>

              {/* Key: student_id */}
              <line x1="300" y1="70" x2="160" y2="35" stroke="#64748b" />
              <g transform="translate(70, 20)">
                <ellipse cx="60" cy="15" rx="55" ry="15" fill="#1e293b" stroke="#10b981" />
                <text x="60" y="19" fill="#10b981" textAnchor="middle" fontWeight="bold" textDecoration="underline" fontSize="10">
                  student_id
                </text>
              </g>

              {/* Composite: full_name */}
              <line x1="300" y1="90" x2="160" y2="125" stroke="#64748b" />
              <g transform="translate(70, 110)">
                <ellipse cx="60" cy="15" rx="55" ry="15" fill="#1e293b" stroke="#818cf8" />
                <text x="60" y="19" fill="#818cf8" textAnchor="middle" fontSize="10">
                  full_name
                </text>
              </g>

              {/* Stored: dob */}
              <line x1="390" y1="60" x2="390" y2="35" stroke="#64748b" />
              <g transform="translate(335, 10)">
                <ellipse cx="55" cy="15" rx="45" ry="15" fill="#1e293b" stroke="#38bdf8" />
                <text x="55" y="19" fill="#cbd5e1" textAnchor="middle" fontSize="10">
                  dob (Stored)
                </text>
              </g>

              {/* Derived: age */}
              <line x1="480" y1="70" x2="600" y2="35" stroke="#64748b" />
              <g transform="translate(560, 20)">
                <ellipse cx="55" cy="15" rx="50" ry="15" fill="#1e293b" stroke="#f59e0b" strokeDasharray="3 3" />
                <text x="55" y="19" fill="#f59e0b" textAnchor="middle" fontSize="10">
                  age (Derived)
                </text>
              </g>

              {/* Multi-Valued: phone_numbers */}
              <line x1="480" y1="90" x2="600" y2="125" stroke="#64748b" />
              <g transform="translate(550, 110)">
                <ellipse cx="65" cy="15" rx="60" ry="18" fill="#1e293b" stroke="#f43f5e" />
                <ellipse cx="65" cy="15" rx="55" ry="14" fill="#1e293b" stroke="#f43f5e" />
                <text x="65" y="19" fill="#f43f5e" textAnchor="middle" fontSize="9" fontWeight="bold">
                  phone_numbers
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Attribute Simulator ─────────── */}
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
                Interactive Attribute Mapping Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Observe multi-valued child table decomposition and watch MySQL Virtual Generated Columns calculate age on DOB change
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Student:
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => {
                    const sid = Number(e.target.value);
                    setSelectedStudentId(sid);
                    const st = students.find((s) => s.id === sid);
                    if (st) setDob(st.dob);
                  }}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      #{s.id} - {s.firstName} {s.lastName} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Derived Age Demonstration */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">
                    Derived Virtual Column: current_age
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    Age: {calculateAge(selectedStudent?.dob || dob)} yrs
                  </span>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Change Date of Birth (Stored Attribute):
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => handleUpdateDob(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  /&gt;
                </div>
              </div>

              {/* Multi-Valued Attribute Addition */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Add Multi-Valued Phone Number (Double Oval):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    placeholder="+91 Phone"
                  /&gt;
                  <select
                    value={phoneType}
                    onChange={(e) => setPhoneType(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                  &gt;
                    <option value="Mobile">Mobile</option>
                    <option value="Home">Home</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
                <button
                  onClick={handleAddPhone}
                  className="w-full py-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  ➕ Insert into Decomposed Child Table
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
                <pre className="whitespace-pre-wrap">{engineFeedback}</pre>
              </div>
            </div>

            {/* DDL & Live Child Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational MySQL 8.0 DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Multi-Valued Contacts */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>
                    Decomposed Child Table: student_contacts ({currentStudentPhones.length} phones for {selectedStudent?.firstName})
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Student ID (FK)</th>
                        <th className="p-1.5">Phone Number</th>
                        <th className="p-1.5">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {currentStudentPhones.map((c, idx) => (
                        <tr key={idx}>
                          <td className="p-1.5 text-cyan-400">#{c.studentId}</td>
                          <td className="p-1.5 text-rose-300 font-bold">{c.phone}</td>
                          <td className="p-1.5 text-slate-400">{c.type}</td>
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
                Student profiles and multi-valued contact decompositions from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Profile Entity Model
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing multi-valued phone numbers into <code>student_contacts</code> and generating virtual age.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    current_age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURDATE())) VIRTUAL,
    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Customer Address Composite Breakdown
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Flattening composite <code>delivery_address</code> into atomic columns <code>street</code>, <code>city</code>, <code>pincode</code>.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    -- Flattened Composite Address Attributes
    street_address VARCHAR(150) NOT NULL,
    city VARCHAR(50) NOT NULL DEFAULT 'Kolkata',
    state VARCHAR(50) NOT NULL DEFAULT 'West Bengal',
    pincode VARCHAR(10) NOT NULL
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
                Avoid stale derived columns and 1NF-violating comma-separated strings
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
                  <strong className="text-white">1. Storing Derived Age Statically:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Becomes obsolete on the student's next birthday. Store <code>dob</code> and calculate dynamically.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Comma-Separated Multi-Values:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Storing <code>'983001,983002'</code> violates 1NF atomicity and breaks indexing.
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
                  <strong className="text-white">1. Flatten Composite Attributes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Break composite attributes into atomic columns like <code>first_name</code> and <code>last_name</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use Virtual Generated Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Compute derived attributes on-the-fly using <code>GENERATED ALWAYS AS (...) VIRTUAL</code>.
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
              <span>Entity Sets represent collections of objects sharing identical attributes (Rectangles)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Key Attributes uniquely identify entity instances and are Underlined in ER diagrams</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Composite Attributes are divided into leaf sub-attributes and flattened into columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Multi-Valued Attributes (Double Ovals) MUST be decomposed into dedicated child tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Derived Attributes (Dashed Ovals) are calculated dynamically via Virtual Generated Columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never store multi-valued arrays in comma-separated strings (violates 1NF)</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Entities & Types of Attributes – FAQs"
            questions={questions}
            subtitle="Master Peter Chen notation symbols, multi-valued table decomposition, and derived virtual columns with 30 comprehensive Q&As"
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
            title="Entities, Entity Sets, and Types of Attributes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_entities_attributes_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding attribute classification is the foundation of high-performance database schema design! " +
              "In my classes in Barrackpore, I emphasize the Golden Rule of Multi-Valued Attributes: whenever you draw a double oval " +
              "in your ER diagram (like multiple student phone numbers), you are signaling that this CANNOT live in the parent table. " +
              "It must become its own child table with a foreign key. Pair that with MySQL 8.0's Virtual Generated Columns for derived attributes " +
              "like age or full name, and your relational schemas will remain clean, 1NF-compliant, and blazing fast."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · Entities & Attributes · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
