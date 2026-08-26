import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic16_files/topic16_questions";
import noteText from "./topic16_files/topic16_note.txt?raw";

/**
 * Topic16 – Step-by-Step Mapping: Multi-valued Attributes into Dedicated Tables
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Step 6 Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic16 = () => {
  const sectionRefs = useRef([]);

  // Interactive Step 6 State
  const [selectedStudentId, setSelectedStudentId] = useState(101);
  const [phoneInput, setPhoneInput] = useState("9830012345");
  const [phoneType, setPhoneType] = useState("Mobile");

  const [students, setStudents] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [phones, setPhones] = useState([
    { studentId: 101, number: "9830012345", type: "Mobile" },
    { studentId: 101, number: "9830098765", type: "WhatsApp" },
    { studentId: 102, number: "9830055555", type: "Mobile" },
    { studentId: 103, number: "9830077777", type: "Emergency" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Step 6 Simulator Active. Add multi-valued phone numbers for students and test composite primary key uniqueness."
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

  const handleAddPhone = () => {
    const sid = Number(selectedStudentId);
    const exists = phones.some((p) => p.studentId === sid && p.number === phoneInput);
    const st = students.find((s) => s.id === sid);

    if (exists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${sid}-${phoneInput}' for key 'PRIMARY'! ${st?.name} already has this phone number registered.`
      );
      return;
    }

    setPhones([...phones, { studentId: sid, number: phoneInput, type: phoneType }]);
    setEngineLog(
      `✓ Step 6 Applied: Added phone '${phoneInput}' (${phoneType}) for ${st?.name}. Composite PK (${sid}, '${phoneInput}') inserted into student_phones table.`
    );
  };

  const handleDeletePhone = (sid, num) => {
    setPhones(phones.filter((p) => !(p.studentId === sid && p.number === num)));
    setEngineLog(`✓ Dropped Phone: Removed '${num}' for Student #${sid}.`);
  };

  const handleDeleteStudent = (id) => {
    const target = students.find((s) => s.id === id);
    setStudents(students.filter((s) => s.id !== id));
    // Simulate ON DELETE CASCADE
    const deletedCount = phones.filter((p) => p.studentId === id).length;
    setPhones(phones.filter((p) => p.studentId !== id));

    setEngineLog(
      `✓ ON DELETE CASCADE: Dropped Student #${id} ('${target?.name}'). All ${deletedCount} matching phone number(s) in 'student_phones' automatically purged by MySQL InnoDB!`
    );
  };

  const handleReset = () => {
    setStudents([
      { id: 101, name: "Mamata Hui", city: "Barrackpore" },
      { id: 102, name: "Abhronila Das", city: "Barrackpore" },
      { id: 103, name: "Debangshu Roy", city: "Kolkata" },
    ]);
    setPhones([
      { studentId: 101, number: "9830012345", type: "Mobile" },
      { studentId: 101, number: "9830098765", type: "WhatsApp" },
      { studentId: 102, number: "9830055555", type: "Mobile" },
      { studentId: 103, number: "9830077777", type: "Emergency" },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Step 6: Dedicated Multi-Valued Attribute Table\nCREATE TABLE student_phones (\n    student_id INT NOT NULL,\n    phone_number VARCHAR(15) NOT NULL,\n    phone_type ENUM('Mobile', 'Home', 'WhatsApp', 'Emergency') NOT NULL DEFAULT 'Mobile',\n    PRIMARY KEY (student_id, phone_number),\n    -- Secondary index for fast reverse lookups by phone\n    INDEX idx_phone_num (phone_number),\n    CONSTRAINT fk_phone_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 16
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            ER-to-Relational Mapping:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Step 6 – Multi-Valued Attributes
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Step 6 of the mapping algorithm: eliminating non-atomic multi-valued attributes to satisfy First Normal Form (1NF),
            creating dedicated child tables with composite primary keys, and aggregating strings with MySQL `GROUP_CONCAT()`.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              1NF Atomic Normalization
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Composite PK (Parent_PK, Val)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ ON DELETE CASCADE Link
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧩 GROUP_CONCAT Aggregation
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: 1NF Architecture & Anti-Pattern Comparison ─ */}
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
                Step 6: First Normal Form (1NF) Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Why comma-separated strings fail in production and how Step 6 normalizes multi-valued data
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bad Design */}
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                ❌ Anti-Pattern (Comma-Separated String)
              </span>
              <p className="text-xs text-slate-300">
                <code>Student(101, "Mamata", "983001, 983002, 983003")</code>
              </p>
              <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                <li>Violates 1NF atomicity</li>
                <li>Cannot build B-Tree indexes on individual numbers</li>
                <li>Requires slow full-table scans with <code>LIKE '%983001%'</code></li>
              </ul>
            </div>

            {/* Normalized Step 6 */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                ✅ Step 6 Normalized (Dedicated Table)
              </span>
              <p className="text-xs text-slate-300">
                <code>student_phones(101, "983001", "Mobile")</code><br />
                <code>student_phones(101, "983002", "WhatsApp")</code>
              </p>
              <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                <li>100% 1NF &amp; 3NF compliant</li>
                <li>Instant $O(\log N)$ indexed lookups by phone number</li>
                <li>Automatic duplicate prevention via Composite PK</li>
              </ul>
            </div>
          </div>

          {/* ── Semantic SVG 1: Step 6 Transformation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Step 6 Multi-Valued Attribute ➔ Dedicated Table Transformation
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Step 6 Mapping Flow"
            >
              {/* Parent Table */}
              <g transform="translate(30, 20)">
                <rect width="200" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="200" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="100" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">students (Parent)</text>
                <text x="15" y="42" fill="#10b981" fontWeight="bold">PK: student_id INT</text>
                <text x="15" y="62" fill="#cbd5e1">first_name, last_name</text>
              </g>

              {/* Transformation Arrow */}
              <g transform="translate(250, 60)">
                <path d="M 0,10 L 60,10" stroke="#64748b" strokeWidth="2" />
                <polygon points="60,6 70,10 60,14" fill="#64748b" />
                <text x="35" y="0" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold">Step 6 Link</text>
              </g>

              {/* Dedicated Multi-Valued Table */}
              <g transform="translate(340, 10)">
                <rect width="410" height="110" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="410" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="205" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">student_phones (Dedicated Child Table)</text>
                <text x="15" y="42" fill="#38bdf8" fontWeight="bold">PK,FK: student_id INT</text>
                <text x="15" y="62" fill="#f59e0b" fontWeight="bold">PK: phone_number VARCHAR(15)</text>
                <text x="15" y="82" fill="#cbd5e1">phone_type ENUM('Mobile', 'WhatsApp', 'Emergency')</text>
                <text x="15" y="100" fill="#10b981">CONSTRAINT fk FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Step 6 Sandbox ──────────────── */}
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
                Interactive Step 6 Mapping Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Add multi-valued phones, test composite primary key uniqueness, and test cascading deletions
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Add Multi-Valued Phone to Student:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name.split(" ")[0]} (#{s.id})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Phone Number"
                  /&gt;
                  <select
                    value={phoneType}
                    onChange={(e) => setPhoneType(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  &gt;
                    <option value="Mobile">Mobile</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Home">Home</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <button
                  onClick={handleAddPhone}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ⚡ Insert Phone into student_phones
                </button>
              </div>

              {/* Cascade Delete Student Controls */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Test ON DELETE CASCADE (Delete Parent Student):
                </span>
                <div className="flex flex-wrap gap-2">
                  {students.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleDeleteStudent(s.id)}
                      className="py-1 px-2.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                    &gt;
                      Drop #{s.id} ({s.name.split(" ")[0]})
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
                  Generated Step 6 DDL:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live GROUP_CONCAT Aggregated View */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Aggregated GROUP_CONCAT() View ({students.length} students)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Student Name</th>
                        <th className="p-1.5">All Phone Numbers (GROUP_CONCAT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {students.map((s) => {
                        const studentPhones = phones.filter((p) => p.studentId === s.id);
                        const concatStr = studentPhones.length > 0
                          ? studentPhones.map((p) => `${p.type}: ${p.number}`).join(", ")
                          : "No phones registered";
                        return (
                          <tr key={s.id}>
                            <td className="p-1.5 text-cyan-300 font-bold">#{s.id}</td>
                            <td className="p-1.5 text-white">{s.name}</td>
                            <td className="p-1.5 text-emerald-300 text-[11px]">{concatStr}</td>
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
                Academy student contact numbers and university department locations from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Academy Student Phone Directory
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dedicated child table with composite primary key and reverse index for instant search by phone.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_phones (
    student_id INT NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    phone_type ENUM('Mobile', 'Home', 'WhatsApp', 'Emergency') NOT NULL DEFAULT 'Mobile',
    PRIMARY KEY (student_id, phone_number),
    INDEX idx_phone (phone_number),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata University Campus Locations
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                A single department operating across multiple campus buildings (Main Block, Science Park, Library).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE dept_locations (
    dept_id INT NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (dept_id, location_name),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE CASCADE
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
                Avoid comma-separated strings violating 1NF and missing reverse indexes
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
                  <strong className="text-white">1. Comma-Separated VARCHAR Strings:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Violates 1NF, prevents B-Tree indexing, and requires slow full-table <code>LIKE</code> searches.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Standalone PK on Child Table:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Defining only <code>student_id</code> as PK allows only one phone number per student!
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
                  <strong className="text-white">1. Composite PK (parent_id, value):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees automatic uniqueness per parent entity with zero duplicate phone entries.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Secondary Index on Value:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add <code>INDEX(phone_number)</code> to allow sub-millisecond reverse lookups by phone number.
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
              <span>Step 6 maps every multi-valued attribute into a dedicated child relation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Composite Primary Key = `{Parent_PK, Attribute_Value}`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never store multi-valued items as comma-separated strings (violates 1NF)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always specify `ON DELETE CASCADE` to clean up child items automatically</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Add a secondary B-Tree index on the attribute value column for reverse lookups</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use MySQL `GROUP_CONCAT()` to assemble values into clean display strings</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Step 6: Multi-Valued Attributes – FAQs"
            questions={questions}
            subtitle="Master Step 6 of the ER-to-Relational mapping algorithm, 1NF normalization, composite primary keys, reverse indexes, and GROUP_CONCAT queries with 30 comprehensive Q&As"
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
            title="Step-by-Step Mapping: Multi-valued Attributes into Dedicated Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic16_step6_multivalued_attributes_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Step 6 is where you protect your database from First Normal Form (1NF) violations! " +
              "In my classes in Barrackpore, I constantly warn junior developers against the temptation of storing phone numbers " +
              "as comma-separated strings like `phones: '983001, 983002'`. The moment you do that, you lose the ability to index, " +
              "you lose foreign key cascades, and you force MySQL into slow full-table scans. " +
              "Always create a clean, dedicated table `student_phones(student_id, phone_number, PRIMARY KEY(student_id, phone_number))`. " +
              "When your frontend UI needs a formatted string, let MySQL's `GROUP_CONCAT()` assemble it dynamically on the fly!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 16 · Step 6 Multi-Valued Mapping · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic16;
