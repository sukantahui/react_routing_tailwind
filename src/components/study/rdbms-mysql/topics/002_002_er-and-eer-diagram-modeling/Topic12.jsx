import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Aggregation: Modeling Relationships between Relationships and Entities
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Aggregation Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive Aggregation State
  const [selectedStudentId, setSelectedStudentId] = useState(101);
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [selectedFacultyId, setSelectedFacultyId] = useState(10);

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [courses] = useState([
    { id: 1, title: "RDBMS & MySQL Masterclass", fee: 15000 },
    { id: 2, title: "React 19 & Tailwind Full-Stack", fee: 18500 },
  ]);

  const [faculty] = useState([
    { id: 10, name: "Prof. Sukanta Hui", dept: "Computer Science" },
    { id: 20, name: "Prof. Susmita Ghosh", dept: "Information Tech" },
  ]);

  // Tier 1: Aggregated Base Relationship
  const [enrollments, setEnrollments] = useState([
    { studentId: 101, courseId: 1, date: "2026-08-01" },
    { studentId: 101, courseId: 2, date: "2026-08-10" },
    { studentId: 102, courseId: 1, date: "2026-08-15" },
  ]);

  // Tier 2: Higher-Level Aggregated Relationship (Composite FK to Tier 1)
  const [mentors, setMentors] = useState([
    { studentId: 101, courseId: 1, facultyId: 10, assignedDate: "2026-08-02" },
    { studentId: 102, courseId: 1, facultyId: 20, assignedDate: "2026-08-16" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Aggregation Simulator Active. Test creating valid mentorship links or observe FK Error 1452 if student is not enrolled in the course."
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

  const handleEnrollStudent = () => {
    const sid = Number(selectedStudentId);
    const cid = Number(selectedCourseId);
    const exists = enrollments.some((e) => e.studentId === sid && e.courseId === cid);
    const st = students.find((s) => s.id === sid);
    const co = courses.find((c) => c.id === cid);

    if (exists) {
      setEngineLog(`❌ Duplicate Enrollment: ${st?.name} is already enrolled in '${co?.title}'.`);
      return;
    }

    setEnrollments([...enrollments, { studentId: sid, courseId: cid, date: "2026-08-24" }]);
    setEngineLog(`✓ Tier 1 Created: Enrolled ${st?.name} into '${co?.title}'. Composite PK (${sid}, ${cid}) active.`);
  };

  const handleAssignMentor = () => {
    const sid = Number(selectedStudentId);
    const cid = Number(selectedCourseId);
    const fid = Number(selectedFacultyId);

    const st = students.find((s) => s.id === sid);
    const co = courses.find((c) => c.id === cid);
    const fa = faculty.find((f) => f.id === fid);

    // Verify Composite Foreign Key Constraint
    const isEnrolled = enrollments.some((e) => e.studentId === sid && e.courseId === cid);
    if (!isEnrolled) {
      setEngineLog(
        `❌ ERROR 1452 (23000): Cannot add or update child row: foreign key constraint fails. '${st?.name}' is NOT enrolled in '${co?.title}'! Mentorship can ONLY attach to an existing aggregated enrollment.`
      );
      return;
    }

    const mentorExists = mentors.some(
      (m) => m.studentId === sid && m.courseId === cid && m.facultyId === fid
    );
    if (mentorExists) {
      setEngineLog(`❌ ${fa?.name} is already assigned as mentor for this enrollment.`);
      return;
    }

    setMentors([...mentors, { studentId: sid, courseId: cid, facultyId: fid, assignedDate: "2026-08-24" }]);
    setEngineLog(
      `✓ Tier 2 Aggregation Linked: ${fa?.name} assigned to mentor [${st?.name} ──<Enrolls>── ${co?.title}]. Composite FK (${sid}, ${cid}) verified!`
    );
  };

  const handleDeleteEnrollment = (sid, cid) => {
    setEnrollments(enrollments.filter((e) => !(e.studentId === sid && e.courseId === cid)));
    // Simulate ON DELETE CASCADE on Composite Foreign Key
    const deletedMentorsCount = mentors.filter((m) => m.studentId === sid && m.courseId === cid).length;
    setMentors(mentors.filter((m) => !(m.studentId === sid && m.courseId === cid)));

    setEngineLog(
      `✓ ON DELETE CASCADE: Dropped Tier 1 enrollment (${sid}, ${cid}). ${deletedMentorsCount} mentorship record(s) in 'enrollment_mentors' automatically purged by MySQL InnoDB!`
    );
  };

  const handleReset = () => {
    setEnrollments([
      { studentId: 101, courseId: 1, date: "2026-08-01" },
      { studentId: 101, courseId: 2, date: "2026-08-10" },
      { studentId: 102, courseId: 1, date: "2026-08-15" },
    ]);
    setMentors([
      { studentId: 101, courseId: 1, facultyId: 10, assignedDate: "2026-08-02" },
      { studentId: 102, courseId: 1, facultyId: 20, assignedDate: "2026-08-16" },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Tier 1: Aggregated Base Relationship\nCREATE TABLE student_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrolled_at DATE NOT NULL DEFAULT (CURRENT_DATE),\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,\n    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- Tier 2: Higher-Level Aggregated Relationship\nCREATE TABLE enrollment_mentors (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    faculty_id INT NOT NULL,\n    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (student_id, course_id, faculty_id),\n    -- Composite FK referencing the Tier 1 Aggregated Table!\n    CONSTRAINT fk_mentor_enrollment FOREIGN KEY (student_id, course_id)\n        REFERENCES student_enrollments(student_id, course_id) ON DELETE CASCADE,\n    CONSTRAINT fk_mentor_faculty FOREIGN KEY (faculty_id)\n        REFERENCES faculty(faculty_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 12
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Aggregation in ER Modeling:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relationships on Relationships
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the Aggregation abstraction: treating an entity-relationship cluster as a higher-level composite entity,
            differentiating aggregation from ternary relationships, and implementing composite foreign key schemas.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Bounding Box Aggregation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Aggregation vs Ternary Triads
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Composite Foreign Key Links
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Multi-Tier Cascading Purge
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Aggregation Architecture & Visuals ──────── */}
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
                The Aggregation Bounding Box Abstraction
              </h2>
              <p className="text-xs text-slate-400">
                Enclosing base entities and relationships so outer entities can interact with the composite
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Tier 1: Aggregated Base Unit
              </span>
              <p className="text-xs text-slate-300">
                <code>[Student] ──&lt; Enrolls_In &gt;── [Course]</code> enclosed inside a <strong>Bounding Box</strong>.
              </p>
              <div className="text-[11px] text-cyan-300 font-mono font-bold">Table: student_enrollments(student_id*, course_id*)</div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                Tier 2: Higher-Level Association
              </span>
              <p className="text-xs text-slate-300">
                <code>[Faculty] ──&lt; Mentors &gt;── [Bounding Box]</code> connecting faculty to that specific enrollment.
              </p>
              <div className="text-[11px] text-indigo-300 font-mono font-bold">Composite FK: (student_id, course_id) ➔ Tier 1</div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Aggregation Bounding Box ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Peter Chen Aggregation Bounding Box Diagram
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Aggregation Bounding Box"
            >
              {/* Bounding Box for Tier 1 Aggregation */}
              <g transform="translate(30, 25)">
                <rect width="420" height="95" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="20" y="20" fill="#f59e0b" fontSize="9" fontWeight="bold">AGGREGATION (Tier 1 Composite Entity)</text>

                {/* Student */}
                <rect x="20" y="35" width="100" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" />
                <text x="70" y="58" fill="#38bdf8" textAnchor="middle" fontWeight="bold">STUDENT</text>

                {/* Enrolls_In */}
                <polygon points="190,38 230,55 190,72 150,55" fill="#1e293b" stroke="#38bdf8" />
                <text x="190" y="58" fill="#38bdf8" textAnchor="middle" fontSize="9">Enrolls</text>
                <line x1="120" y1="55" x2="150" y2="55" stroke="#38bdf8" />

                {/* Course */}
                <rect x="270" y="35" width="100" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" />
                <text x="320" y="58" fill="#38bdf8" textAnchor="middle" fontWeight="bold">COURSE</text>
                <line x1="230" y1="55" x2="270" y2="55" stroke="#38bdf8" />
              </g>

              {/* Connecting Line from Bounding Box to Mentors */}
              <line x1="450" y1="72" x2="520" y2="72" stroke="#818cf8" strokeWidth="2" />

              {/* Mentors Diamond */}
              <g transform="translate(520, 47)">
                <polygon points="40,0 80,25 40,50 0,25" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="40" y="29" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="9">Mentors</text>
              </g>

              <line x1="600" y1="72" x2="660" y2="72" stroke="#818cf8" strokeWidth="2" />

              {/* Faculty Entity */}
              <g transform="translate(660, 50)">
                <rect width="100" height="45" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="50" y="27" fill="#10b981" textAnchor="middle" fontWeight="bold">FACULTY</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Aggregation Sandbox ─────────── */}
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
                Interactive Aggregation Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Enroll students into courses, assign mentorships, and observe composite foreign key constraint protection
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Student:</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                    className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name.split(" ")[0]} (#{s.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Course:</label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                    className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title.split(" ")[0]} (#{c.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Faculty Mentor:</label>
                  <select
                    value={selectedFacultyId}
                    onChange={(e) => setSelectedFacultyId(Number(e.target.value))}
                    className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {faculty.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name.split(" ")[1]} (#{f.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleEnrollStudent}
                  className="py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                >
                  1. Create Tier 1 Enrollment
                </button>
                <button
                  onClick={handleAssignMentor}
                  className="py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold hover:bg-indigo-500/30 transition-all"
                >
                  2. Assign Tier 2 Mentor
                </button>
              </div>

              {/* Active Enrollments Drop Controls */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Test ON DELETE CASCADE (Drop Tier 1 Enrollment):
                </span>
                <div className="flex flex-wrap gap-2">
                  {enrollments.map((en) => {
                    const st = students.find((s) => s.id === en.studentId);
                    const co = courses.find((c) => c.id === en.courseId);
                    return (
                      <button
                        key={`${en.studentId}-${en.courseId}`}
                        onClick={() => handleDeleteEnrollment(en.studentId, en.courseId)}
                        className="py-1 px-2.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                      >
                        Drop [{st?.name.split(" ")[0]} ── {co?.title.split(" ")[0]}]
                      </button>
                    );
                  })}
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
                  Relational Aggregation DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Mentors Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Tier 2: enrollment_mentors ({mentors.length} active assignments)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Composite FK (student, course)</th>
                        <th className="p-1.5">Mentor</th>
                        <th className="p-1.5">Assigned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {mentors.map((m, idx) => {
                        const st = students.find((s) => s.id === m.studentId);
                        const co = courses.find((c) => c.id === m.courseId);
                        const fa = faculty.find((f) => f.id === m.facultyId);
                        return (
                          <tr key={idx}>
                            <td className="p-1.5 text-cyan-300 font-bold">
                              ({st?.name.split(" ")[0]}, {co?.title.split(" ")[0]})
                            </td>
                            <td className="p-1.5 text-emerald-300 font-bold">{fa?.name}</td>
                            <td className="p-1.5 text-slate-400">{m.assignedDate}</td>
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
                Course mentorships and project supervisions from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Academy Mentorship Aggregation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Faculty mentors attach to pre-existing student course enrollments using composite foreign keys.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE enrollment_mentors (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    faculty_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id, faculty_id),
    CONSTRAINT fk_mentor_enroll FOREIGN KEY (student_id, course_id)
        REFERENCES student_enrollments(student_id, course_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Tech Enterprise Project Supervision
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Tech</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Senior tech leads evaluate specific employee-project assignments.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE project_supervisions (
    emp_id INT NOT NULL,
    project_id INT NOT NULL,
    lead_id INT NOT NULL,
    evaluation_score INT NOT NULL DEFAULT 100,
    PRIMARY KEY (emp_id, project_id, lead_id),
    FOREIGN KEY (emp_id, project_id) REFERENCES employee_projects(emp_id, project_id) ON DELETE CASCADE
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
                Avoid forcing aggregation into flat ternary tables and broken composite foreign key links
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
                  <strong className="text-white">1. Forcing Unnatural Ternary:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forcing mentor assignment at the exact instant of enrollment causes severe data entry friction.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Standalone FK References:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Referencing <code>students</code> and <code>courses</code> independently allows assigning mentors for non-existent enrollments.
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
                  <strong className="text-white">1. Composite Foreign Key Enforcement:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always point <code>FOREIGN KEY (student_id, course_id)</code> directly to <code>student_enrollments</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. ON DELETE CASCADE across Tiers:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure dropping a base enrollment automatically purges its higher-level mentorship records.
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
              <span>Aggregation treats a relationship and its entities as a higher-level composite entity</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enclosed inside a large Bounding Rectangle in Peter Chen ER diagrams</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Aggregation decouples creation timing between base links and higher-level links</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Tier 1 maps to a bridge table with Composite PK `(A_id, B_id)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Tier 2 uses a COMPOSITE FOREIGN KEY `(A_id, B_id)` referencing Tier 1</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always configure `ON DELETE CASCADE` across aggregated multi-tier foreign keys</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Aggregation in ER Modeling – FAQs"
            questions={questions}
            subtitle="Master ER Aggregation bounding boxes, composite foreign keys, temporal decoupling, and MySQL schema mapping with 30 comprehensive Q&As"
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
            title="Aggregation: Modeling Relationships between Relationships and Entities"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_aggregation_modeling_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Aggregation solves one of the classic limitations of basic ER diagrams! " +
              "In my classes in Barrackpore, I teach students to never confuse an Aggregation with a Ternary relationship. " +
              "A Ternary relationship forces all three entities to join at the exact same moment. But in real life, " +
              "a student first enrolls in a course (Tier 1), and then days or weeks later, a faculty mentor is assigned (Tier 2). " +
              "By enclosing the enrollment in an Aggregation bounding box, you can map it to a Tier 1 bridge table and use a " +
              "composite foreign key `FOREIGN KEY (student_id, course_id)` in the mentorship table. " +
              "This enforces complete temporal flexibility and guarantees bulletproof referential integrity."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 12 · Aggregation Modeling · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic12;
