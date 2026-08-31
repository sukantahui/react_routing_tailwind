import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Design Project 2: Multi-Branch Hospital & Patient Appointment DB
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and real-world project guide on healthcare schema modeling, UHID consolidation, and appointment concurrency.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedWorkflow, setSelectedWorkflow] = useState("bed_occupancy_rate_monitor");

  const hospitalWorkflows = {
    bed_occupancy_rate_monitor: {
      title: "1. Multi-Branch Bed Occupancy Rate Monitor",
      badge: "Hospital Operations",
      badgeColor: "emerald",
      sqlQuery: `-- Calculating live branch bed occupancy rates:
SELECT 
    b.branch_name,
    b.city,
    b.total_beds,
    COUNT(a.admission_id) AS currently_admitted_patients,
    ROUND((COUNT(a.admission_id) / b.total_beds) * 100.0, 2) AS occupancy_rate_pct,
    (b.total_beds - COUNT(a.admission_id)) AS available_vacant_beds
FROM hospital_branches b
LEFT JOIN inpatient_admissions a ON b.branch_id = a.branch_id AND a.discharge_date IS NULL
GROUP BY b.branch_id, b.branch_name, b.city, b.total_beds
ORDER BY occupancy_rate_pct DESC;`,
      resultRows: [
        { branch: "Barrackpore Multi-Specialty", city: "Barrackpore", beds: "100 Beds", occupied: "86 Admitted", rate: "86.00%", vacant: "14 Beds Vacant", status: "High Occupancy" },
        { branch: "Kolkata Central Apex Hospital", city: "Kolkata", beds: "250 Beds", occupied: "192 Admitted", rate: "76.80%", vacant: "58 Beds Vacant", status: "Optimal" },
        { branch: "Ichapur Medicare Clinic", city: "Ichapur", beds: "40 Beds", occupied: "22 Admitted", rate: "55.00%", vacant: "18 Beds Vacant", status: "Available" },
      ],
      explanation:
        "Calculates real-time inpatient bed occupancy metrics across distributed hospital branches using left joins to include branches with zero current admissions.",
    },
    patient_360_timeline: {
      title: "2. Patient 360° Clinical History & Prescription Timeline",
      badge: "Universal Health ID",
      badgeColor: "cyan",
      sqlQuery: `-- Retrieving consolidated medical history for Mamata Hui (UHID: UHID-WB-2026-101):
SELECT 
    p.uhid,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    p.blood_group,
    app.appointment_date,
    hb.branch_name,
    CONCAT('Dr. ', d.first_name, ' ', d.last_name) AS doctor_name,
    d.specialization,
    pr.diagnosis,
    GROUP_CONCAT(pm.medicine_name SEPARATOR ', ') AS prescribed_medications
FROM patients p
JOIN appointments app ON p.patient_id = app.patient_id
JOIN doctors d ON app.doctor_id = d.doctor_id
JOIN hospital_branches hb ON app.branch_id = hb.branch_id
LEFT JOIN prescriptions pr ON app.appointment_id = pr.appointment_id
LEFT JOIN prescription_medications pm ON pr.prescription_id = pm.prescription_id
WHERE p.uhid = 'UHID-WB-2026-101'
GROUP BY p.uhid, p.first_name, p.last_name, p.blood_group, app.appointment_date, 
         hb.branch_name, d.first_name, d.last_name, d.specialization, pr.diagnosis
ORDER BY app.appointment_date DESC;`,
      resultRows: [
        { branch: "Barrackpore Branch", city: "2026-08-15", beds: "Dr. Susmita Sen", occupied: "Cardiology", rate: "Mild Hypertension", vacant: "Amlodipine 5mg, Telmisartan 40mg", status: "Prescription Active" },
        { branch: "Kolkata Central", city: "2026-05-10", beds: "Dr. Debangshu Roy", occupied: "Endocrinology", rate: "Routine Checkup", vacant: "Metformin 500mg", status: "Completed" },
      ],
      explanation:
        "Traverses 5 normalized tables (patients, appointments, doctors, prescriptions, medications) to reconstruct a patient's complete cross-branch medical timeline.",
    },
    concurrency_slot_booking: {
      title: "3. Concurrency-Safe Appointment Booking & Slot Lock",
      badge: "Pessimistic Locking",
      badgeColor: "amber",
      sqlQuery: `-- Concurrency-Safe Appointment Booking with Slot Overbooking Protection:
START TRANSACTION;

-- Step 1: Check currently booked token count with row lock:
SELECT COUNT(appointment_id) AS current_booked_count
FROM appointments
WHERE doctor_id = 12 
  AND branch_id = 1 
  AND appointment_date = '2026-08-30' 
  AND time_slot = '10:00:00'
FOR UPDATE;

-- Step 2: If count < 20 (max_patients_per_slot), insert new booking:
INSERT INTO appointments (
    patient_id, doctor_id, branch_id, appointment_date, time_slot, token_number, consultation_fee_charged_inr
) VALUES (
    101, 12, 1, '2026-08-30', '10:00:00', 8, 800.00
);

COMMIT;`,
      resultRows: [
        { branch: "Token #8 Issued", city: "2026-08-30", beds: "Dr. Susmita Sen", occupied: "Slot: 10:00 AM", rate: "Fee: ₹800.00", vacant: "Row Lock Released", status: "✓ Confirmed (Committed)" },
      ],
      explanation:
        "Uses `SELECT ... FOR UPDATE` within a transaction to lock the time slot, preventing race conditions when multiple patients attempt to book the last remaining consultation token simultaneously.",
    },
  };

  const navItems = [
    { id: "project-overview", label: "1. Hospital Domain Scope" },
    { id: "schema-design", label: "2. 3NF Healthcare Schema" },
    { id: "svg-diagrams", label: "3. ER Diagram & Shift SVGs" },
    { id: "interactive-sandbox", label: "4. Live Hospital System Workbench" },
    { id: "ddl-scripts", label: "5. Production DDL Scripts" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_008</span>
            <span>•</span>
            <span>Design Project 2 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Healthcare Database Architecture
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Design Project 2: Multi-Branch Hospital & Patient Appointment DB
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Architect an enterprise healthcare database network. Model doctor branch rotations, Universal Health IDs (UHID), electronic prescriptions, inpatient bed occupancy metrics, and concurrency-safe OPD booking.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Hospital Scope */}
        <section id="project-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Healthcare System Scope & Business Requirements
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Unified healthcare operations across Barrackpore, Kolkata, and Ichapur hospital branches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🏥</span> Universal Health ID (UHID)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Consolidates patient clinical records into a single medical history profile accessible by doctors across all branches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🩺</span> Doctor Multi-Branch Shift Rotations
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manages doctor scheduling across multiple branches with strict constraints preventing double-booking across simultaneous shifts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🛏️</span> Live Inpatient Bed Census
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tracks real-time occupied vs vacant beds per department and calculates daily branch occupancy percentages.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3NF Relational Schema */}
        <section id="schema-design" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. 3NF Normalized Healthcare Relational Schema
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              9 normalized tables covering outpatients, doctors, clinical prescriptions, and inpatient billing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">1. hospital_branches</span>
              <p className="text-slate-400 font-sans">Branch locations, emergency helplines, total bed capacity.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">2. departments</span>
              <p className="text-slate-400 font-sans">Cardiology, Neurology, Oncology, Orthopedics, Pediatrics.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">3. doctors</span>
              <p className="text-slate-400 font-sans">Medical registration, specialization, base consultation fee.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">4. doctor_branch_schedules</span>
              <p className="text-slate-400 font-sans">Shift rotations: Doctor + Branch + Day of Week + Time Slot.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">5. patients</span>
              <p className="text-slate-400 font-sans">Universal Master Index: UHID, Aadhaar, blood group, DOB.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">6. appointments</span>
              <p className="text-slate-400 font-sans">OPD booking: Patient + Doctor + Date + Slot + Token + Status.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">7. prescriptions</span>
              <p className="text-slate-400 font-sans">1:1 Clinical consultation records and diagnosis summary.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">8. prescription_medications</span>
              <p className="text-slate-400 font-sans">1NF atomic medicine lines: Dosage, frequency, duration.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">9. inpatient_admissions</span>
              <p className="text-slate-400 font-sans">IPD bed census, admission dates, discharge logs, billing.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Hospital ER Schema & Shift Rotation Flow
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Relational architecture and patient consultation clinical pipeline.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: ER Schema */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Multi-Branch Hospital Network ER Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Patients */}
                  <g>
                    <rect x="20" y="20" width="160" height="95" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="100" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">patients (UHID)</text>
                    <text x="30" y="60" fill="#38bdf8" fontSize="8 font-mono">PK patient_id</text>
                    <text x="30" y="75" fill="#94a3b8" fontSize="8 font-mono">uhid (UQ), aadhaar (UQ)</text>
                    <text x="30" y="90" fill="#94a3b8" fontSize="8 font-mono">blood_group, dob</text>
                  </g>

                  {/* Appointments */}
                  <g>
                    <rect x="240" y="20" width="170" height="110" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="325" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">appointments</text>
                    <text x="250" y="60" fill="#38bdf8" fontSize="8 font-mono">PK appointment_id</text>
                    <text x="250" y="75" fill="#fcd34d" fontSize="8 font-mono">FK patient_id, FK doctor_id</text>
                    <text x="250" y="90" fill="#fcd34d" fontSize="8 font-mono">FK branch_id</text>
                    <text x="250" y="105" fill="#a7f3d0" fontSize="8 font-mono">token_number, status</text>
                  </g>

                  {/* Doctors */}
                  <g>
                    <rect x="470" y="20" width="160" height="95" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="550" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">doctors</text>
                    <text x="480" y="60" fill="#38bdf8" fontSize="8 font-mono">PK doctor_id</text>
                    <text x="480" y="75" fill="#94a3b8" fontSize="8 font-mono">registration_no (UQ)</text>
                    <text x="480" y="90" fill="#fcd34d" fontSize="8 font-mono">FK dept_id</text>
                  </g>

                  {/* Branches */}
                  <g>
                    <rect x="680" y="20" width="150" height="95" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="755" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">hospital_branches</text>
                    <text x="690" y="60" fill="#38bdf8" fontSize="8 font-mono">PK branch_id</text>
                    <text x="690" y="75" fill="#94a3b8" fontSize="8 font-mono">branch_name, city</text>
                    <text x="690" y="90" fill="#94a3b8" fontSize="8 font-mono">total_beds</text>
                  </g>

                  {/* Prescriptions */}
                  <g>
                    <rect x="240" y="160" width="170" height="85" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="325" y="182" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">prescriptions (1:1)</text>
                    <text x="250" y="200" fill="#38bdf8" fontSize="8 font-mono">PK prescription_id</text>
                    <text x="250" y="215" fill="#fcd34d" fontSize="8 font-mono">FK appointment_id (UQ)</text>
                    <text x="250" y="230" fill="#94a3b8" fontSize="8 font-mono">diagnosis</text>
                  </g>

                  {/* Prescription Medications */}
                  <g>
                    <rect x="470" y="160" width="180" height="85" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="560" y="182" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">prescription_medications</text>
                    <text x="480" y="200" fill="#38bdf8" fontSize="8 font-mono">PK med_id</text>
                    <text x="480" y="215" fill="#fcd34d" fontSize="8 font-mono">FK prescription_id</text>
                    <text x="480" y="230" fill="#94a3b8" fontSize="8 font-mono">medicine_name, dosage</text>
                  </g>

                  {/* Connecting Links */}
                  <path d="M 180 65 L 240 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 65 L 470 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 630 65 L 680 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 325 130 L 325 160" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 410 202 L 470 202" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Clinical Consultation Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram B:</span> Patient OPD Consultation & Prescription Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. OPD Booking</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="110" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Token #8 Reserved</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="240" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="330" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Doctor Consultation</text>
                    <rect x="250" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="330" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Status: COMPLETED</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="460" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="550" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Digital Prescription</text>
                    <rect x="470" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="550" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Diagnosis Recorded</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="680" y="30" width="150" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="755" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Pharmacy Dispense</text>
                    <rect x="690" y="70" width="130" height="25" rx="3" fill="#022c22" />
                    <text x="755" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">1NF Itemized Meds</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 200 75 L 240 75" stroke="#10b981" strokeWidth="2" />
                  <path d="M 420 75 L 460 75" stroke="#818cf8" strokeWidth="2" />
                  <path d="M 640 75 L 680 75" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Hospital System Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test branch bed census calculations, patient 360° clinical timelines, and concurrency slot locks live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(hospitalWorkflows).map(([key, item]) => {
              const isActive = selectedWorkflow === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWorkflow(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{hospitalWorkflows[selectedWorkflow].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{hospitalWorkflows[selectedWorkflow].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Healthcare SQL Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Clinical Data Pipeline</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {hospitalWorkflows[selectedWorkflow].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Branch / Token</th>
                    <th className="py-3 px-4 text-white">City / Date</th>
                    <th className="py-3 px-4 text-emerald-400">Capacity / Doctor</th>
                    <th className="py-3 px-4 text-cyan-400">Occupied / Specialization</th>
                    <th className="py-3 px-4 text-indigo-400">Occupancy / Diagnosis</th>
                    <th className="py-3 px-4 text-amber-400">Vacant / Medications</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {hospitalWorkflows[selectedWorkflow].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.branch}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.beds}</td>
                      <td className="py-3 px-4 text-white font-sans">{row.occupied}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.rate}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.vacant}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Confirmed") || row.status.includes("Active") || row.status.includes("Optimal")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-cyan-950 text-cyan-300 border-cyan-800"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production DDL Scripts */}
        <section id="ddl-scripts" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production DDL Schema Creation Script
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Ready-to-deploy MySQL schema script for multi-branch healthcare networks.
            </p>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-2xl">
{`-- 1. Hospital Branches
CREATE TABLE hospital_branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    total_beds INT NOT NULL DEFAULT 50
) ENGINE=InnoDB;

-- 2. Patients (Universal Health Index)
CREATE TABLE patients (
    patient_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uhid VARCHAR(25) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    dob DATE NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    aadhaar_number VARCHAR(14) NOT NULL UNIQUE,
    INDEX idx_phone (phone_number),
    INDEX idx_aadhaar (aadhaar_number)
) ENGINE=InnoDB;

-- 3. Doctor Branch Shift Schedules
CREATE TABLE doctor_branch_schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    branch_id INT NOT NULL,
    day_of_week ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_patients_per_slot TINYINT DEFAULT 20,
    UNIQUE KEY uq_doc_shift (doctor_id, day_of_week, start_time),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES hospital_branches(branch_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Appointments Ledger
CREATE TABLE appointments (
    appointment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id INT NOT NULL,
    branch_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot TIME NOT NULL,
    token_number TINYINT NOT NULL,
    consultation_fee_charged_inr DECIMAL(8,2) NOT NULL,
    status ENUM('BOOKED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'BOOKED',
    UNIQUE KEY uq_slot_token (doctor_id, branch_id, appointment_date, time_slot, token_number),
    INDEX idx_app_date_status (appointment_date, status),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE RESTRICT,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE RESTRICT,
    FOREIGN KEY (branch_id) REFERENCES hospital_branches(branch_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`}
          </pre>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world implementations of Universal Health IDs and clinical price-drift protection.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Clinical Price-Drift Protection on Consultation Invoices
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Hospital Network</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui protects hospital revenue audits by adding <code className="text-emerald-300 font-mono">consultation_fee_charged_inr</code> snapshot to the <code className="text-cyan-300 font-mono">appointments</code> table. When Dr. Susmita Sen raises her consultation fee from ₹600 to ₹800 in 2027, past 2026 financial records remain 100% accurate!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Immutable fee snapshot captured at booking time:
INSERT INTO appointments (patient_id, doctor_id, branch_id, appointment_date, time_slot, token_number, consultation_fee_charged_inr)
SELECT 101, d.doctor_id, 1, CURRENT_DATE, '10:00:00', 5, d.consultation_fee_inr
FROM doctors d WHERE d.doctor_id = 12;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Cross-Branch Clinical Record Sharing via UHID
                </h3>
                <span className="text-xs text-slate-400 font-mono">Universal Health Identifier</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                When student Mamata Hui has an initial consultation in Barrackpore and a follow-up in Kolkata Central, Dr. Debangshu Roy reads her complete historical diagnosis and prescriptions instantly via her unified UHID!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT a.appointment_date, b.city, pr.diagnosis
FROM appointments a
JOIN hospital_branches b ON a.branch_id = b.branch_id
JOIN prescriptions pr ON a.appointment_id = pr.appointment_id
WHERE a.patient_id = (SELECT patient_id FROM patients WHERE uhid = 'UHID-WB-2026-101');`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid medical data corruption and scheduling conflicts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Storing Age as a Static Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing <code className="text-rose-300 font-mono">age INT</code> becomes outdated every birthday!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always store <code className="text-emerald-400 font-mono">dob DATE</code> and compute age dynamically with <code className="text-cyan-300 font-mono">TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Itemize Prescriptions in 1NF
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never store multiple medicines in a single CSV text string. Storing each medicine in <code className="text-emerald-400 font-mono">prescription_medications</code> enables dosage auditing and pharmacy inventory sync.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees First Normal Form (1NF) atomicity.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for healthcare database defense and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Project Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use Universal Health IDs (UHID) to unify patient records across branches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Prevent doctor double-booking with UNIQUE constraints on shift schedule tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Calculate bed occupancy rate: <code className="text-cyan-300 font-mono">(Occupied Beds / Total Beds) * 100</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Freeze consultation fee snapshots on appointments to avoid price drift.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe pessimistic slot locking...”</span>
                  During morning OPD registration spikes, wrap slot token checks in <code className="text-cyan-300 font-mono">SELECT ... FOR UPDATE</code> transactions to prevent duplicate tokens from being issued to two patients!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ON DELETE RESTRICT on clinical records...”</span>
                  Never use CASCADE on doctor or patient foreign keys in medical ledgers; clinical consultation audit trails must remain permanent for legal compliance!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering hospital network schema modeling, UHID architecture, shift rotations, and clinical query optimization.
            </p>
          </div>

          <FAQTemplate
            title="Hospital Database System FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Design Project 2: Multi-Branch Hospital & Patient Appointment DB"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="In healthcare database design, data integrity is life-critical. Two major rules to teach your students: 1) Always enforce a Universal Health ID (UHID) so a patient's medical history doesn't fragment across branches. 2) Never calculate historical revenue by joining directly to the doctor's current consultation fee — always capture an immutable fee snapshot on the appointment record itself!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
