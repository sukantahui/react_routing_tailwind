import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic19_files/topic19_questions";
import noteText from "./topic19_files/topic19_note.txt?raw";

/**
 * Topic19 – Real-World Comprehensive ER Case Study: Multi-Tenant Hospital & Pharmacy Management System
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Hospital & Pharmacy Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic19 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedDoctorId, setSelectedDoctorId] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState(101);
  const [selectedMedId, setSelectedMedId] = useState(501);
  const [dispenseQty, setDispenseQty] = useState(10);
  const [dosageText, setDosageText] = useState("1 tablet twice daily after meals");

  const [doctors] = useState([
    { id: 1, name: "Dr. Sukanta Hui", spec: "Cardiology", branch: "Barrackpore Clinic", fee: 800 },
    { id: 2, name: "Dr. Susmita Ghosh", spec: "Pediatrics", branch: "Kolkata Main Hospital", fee: 650 },
  ]);

  const [patients] = useState([
    { id: 101, name: "Mamata Hui", blood: "O+", aadhaar: "123456789012" },
    { id: 102, name: "Abhronila Das", blood: "B+", aadhaar: "987654321098" },
    { id: 103, name: "Debangshu Roy", blood: "A+", aadhaar: "555566667777" },
  ]);

  const [medicines, setMedicines] = useState([
    { id: 501, brand: "Paracetamol 650mg", generic: "Acetaminophen", price: 3.5, stock: 45 },
    { id: 502, brand: "Amoxicillin 500mg", generic: "Amoxicillin", price: 12.0, stock: 20 },
    { id: 503, brand: "Azithromycin 500mg", generic: "Azithromycin", price: 25.0, stock: 15 },
  ]);

  const [prescriptions, setPrescriptions] = useState([
    { id: 1001, apptId: 1, patientName: "Mamata Hui", docName: "Dr. Sukanta Hui", date: "2026-08-24" },
    { id: 1002, apptId: 2, patientName: "Abhronila Das", docName: "Dr. Susmita Ghosh", date: "2026-08-23" },
  ]);

  const [prescriptionItems, setPrescriptionItems] = useState([
    { prescId: 1001, medId: 501, brand: "Paracetamol 650mg", qty: 10, dosage: "1 tab BD", lineTotal: 35.0 },
    { prescId: 1002, medId: 502, brand: "Amoxicillin 500mg", qty: 6, dosage: "1 cap TDS", lineTotal: 72.0 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Hospital & Pharmacy Schema Active. Dispense medicines inside an atomic transaction with stock constraint protection."
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

  const handleDispenseMedicine = () => {
    const med = medicines.find((m) => m.id === Number(selectedMedId));
    const qty = Number(dispenseQty);

    if (!med) return;

    if (med.stock < qty) {
      setEngineLog(
        `❌ ERROR 3819 (HY000): Check constraint 'chk_stock' is violated!\nRequested: ${qty} units of '${med.brand}', but only ${med.stock} units remain in pharmacy inventory. Transaction rolled back!`
      );
      return;
    }

    const nextPrescId = prescriptions.length > 0 ? Math.max(...prescriptions.map((p) => p.id)) + 1 : 1001;
    const doc = doctors.find((d) => d.id === Number(selectedDoctorId));
    const pat = patients.find((p) => p.id === Number(selectedPatientId));
    const linePrice = med.price * qty;

    const newPresc = {
      id: nextPrescId,
      apptId: nextPrescId,
      patientName: pat?.name || "Patient",
      docName: doc?.name || "Doctor",
      date: "2026-08-24",
    };

    const newItem = {
      prescId: nextPrescId,
      medId: med.id,
      brand: med.brand,
      qty,
      dosage: dosageText,
      lineTotal: linePrice,
    };

    // Atomic transaction execution
    setPrescriptions([...prescriptions, newPresc]);
    setPrescriptionItems([...prescriptionItems, newItem]);
    setMedicines(
      medicines.map((m) =>
        m.id === med.id ? { ...m, stock: m.stock - qty } : m
      )
    );

    setEngineLog(
      `✓ Dispensing Transaction Committed:\n1) INSERT INTO prescriptions (#${nextPrescId} for ${pat?.name} by ${doc?.name})\n2) INSERT INTO prescription_items (#${nextPrescId}, ${med.brand}, Qty: ${qty}, ₹${linePrice})\n3) UPDATE pharmacy_medicines SET stock_quantity = ${med.stock - qty} WHERE medicine_id = ${med.id}.\nStock successfully decremented!`
    );
  };

  const handleRestockMedicine = (medId) => {
    setMedicines(
      medicines.map((m) => (m.id === medId ? { ...m, stock: m.stock + 50 } : m))
    );
    const med = medicines.find((m) => m.id === medId);
    setEngineLog(`✓ Restocked Pharmacy Inventory: Added +50 units of '${med?.brand}'.`);
  };

  const handleReset = () => {
    setMedicines([
      { id: 501, brand: "Paracetamol 650mg", generic: "Acetaminophen", price: 3.5, stock: 45 },
      { id: 502, brand: "Amoxicillin 500mg", generic: "Amoxicillin", price: 12.0, stock: 20 },
      { id: 503, brand: "Azithromycin 500mg", generic: "Azithromycin", price: 25.0, stock: 15 },
    ]);
    setPrescriptions([
      { id: 1001, apptId: 1, patientName: "Mamata Hui", docName: "Dr. Sukanta Hui", date: "2026-08-24" },
      { id: 1002, apptId: 2, patientName: "Abhronila Das", docName: "Dr. Susmita Ghosh", date: "2026-08-23" },
    ]);
    setPrescriptionItems([
      { prescId: 1001, medId: 501, brand: "Paracetamol 650mg", qty: 10, dosage: "1 tab BD", lineTotal: 35.0 },
      { prescId: 1002, medId: 502, brand: "Amoxicillin 500mg", qty: 6, dosage: "1 cap TDS", lineTotal: 72.0 },
    ]);
    setEngineLog("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- Prescriptions Table (1:1 with completed appointment)\nCREATE TABLE prescriptions (\n    prescription_id INT AUTO_INCREMENT PRIMARY KEY,\n    appointment_id INT NOT NULL UNIQUE,\n    issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    clinical_notes TEXT NULL,\n    CONSTRAINT fk_presc_appt FOREIGN KEY (appointment_id)\n        REFERENCES appointments(appointment_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- Pharmacy Medicines Catalog & Stock\nCREATE TABLE pharmacy_medicines (\n    medicine_id INT AUTO_INCREMENT PRIMARY KEY,\n    brand_name VARCHAR(100) NOT NULL,\n    generic_name VARCHAR(100) NOT NULL,\n    unit_price DECIMAL(10, 2) NOT NULL,\n    stock_quantity INT NOT NULL DEFAULT 0,\n    CONSTRAINT chk_stock CHECK (stock_quantity &ge; 0)\n) ENGINE=InnoDB;\n\n-- Prescription Line Items (Composite PK)\nCREATE TABLE prescription_items (\n    prescription_id INT NOT NULL,\n    medicine_id INT NOT NULL,\n    dosage VARCHAR(100) NOT NULL,\n    quantity_dispensed INT NOT NULL DEFAULT 1,\n    PRIMARY KEY (prescription_id, medicine_id),\n    CONSTRAINT fk_item_presc FOREIGN KEY (prescription_id)\n        REFERENCES prescriptions(prescription_id) ON DELETE CASCADE,\n    CONSTRAINT fk_item_med FOREIGN KEY (medicine_id)\n        REFERENCES pharmacy_medicines(medicine_id)\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 19
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Comprehensive ER Case Study:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Hospital & Pharmacy Management System
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Design, normalize, and query a multi-branch hospital and pharmacy management system serving Kolkata & Barrackpore:
            clinical appointments, 1:1 electronic prescriptions, composite pharmacy line items, and atomic inventory control.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏥 Multi-Branch Hospital Schema
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💊 In-House Pharmacy Inventory
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📋 1:1 Appointment-to-Prescription
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Atomic Dispensing Transactions
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: System Architecture & ER Diagram ─────────── */}
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
                Hospital &amp; Pharmacy Enterprise ER Architecture
              </h2>
              <p className="text-xs text-slate-400">
                End-to-end clinical workflow connecting patients, doctors, appointments, and pharmacy inventory
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Patient Master</span>
              <strong className="text-white text-xs block">Patients Table</strong>
              <p className="text-[11px] text-slate-400">12-digit Aadhaar unique key, blood group, demographics.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Consultation</span>
              <strong className="text-white text-xs block">Appointments</strong>
              <p className="text-[11px] text-slate-400">Links Doctor and Patient with scheduled timestamp and fee.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Clinical Rx</span>
              <strong className="text-white text-xs block">Prescriptions (1:1)</strong>
              <p className="text-[11px] text-slate-400">1:1 unique foreign key link to completed appointment.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">4. Pharmacy</span>
              <strong className="text-white text-xs block">Line Items &amp; Stock</strong>
              <p className="text-[11px] text-slate-400">Composite PK <code>(presc_id, med_id)</code> with stock check.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Full Hospital ER Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Hospital Clinical &amp; Pharmacy Relational Schema Diagram
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Hospital ER Diagram"
            >
              {/* Doctor */}
              <g transform="translate(20, 20)">
                <rect width="130" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="65" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">DOCTORS</text>
              </g>

              {/* Patient */}
              <g transform="translate(20, 90)">
                <rect width="130" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="65" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">PATIENTS</text>
              </g>

              {/* Connecting Lines to Appointments */}
              <line x1="150" y1="40" x2="220" y2="70" stroke="#64748b" strokeWidth="2" />
              <line x1="150" y1="110" x2="220" y2="80" stroke="#64748b" strokeWidth="2" />

              {/* Appointments */}
              <g transform="translate(220, 50)">
                <rect width="150" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="75" y="25" fill="#10b981" textAnchor="middle" fontWeight="bold">APPOINTMENTS</text>
                <text x="75" y="42" fill="#cbd5e1" textAnchor="middle" fontSize="9">PK: appt_id</text>
              </g>

              {/* 1:1 Arrow to Prescriptions */}
              <line x1="370" y1="75" x2="430" y2="75" stroke="#64748b" strokeWidth="2" />
              <text x="400" y="65" fill="#f59e0b" fontSize="10" textAnchor="middle">1 : 1</text>

              {/* Prescriptions */}
              <g transform="translate(430, 50)">
                <rect width="140" height="50" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="25" fill="#818cf8" textAnchor="middle" fontWeight="bold">PRESCRIPTIONS</text>
                <text x="70" y="42" fill="#cbd5e1" textAnchor="middle" fontSize="9">UNIQUE appt_id</text>
              </g>

              {/* Arrow to Line Items */}
              <line x1="570" y1="75" x2="630" y2="75" stroke="#64748b" strokeWidth="2" />

              {/* Prescription Items (M:N Bridge) */}
              <g transform="translate(630, 50)">
                <rect width="130" height="50" rx="4" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="65" y="25" fill="#f43f5e" textAnchor="middle" fontWeight="bold">RX_ITEMS</text>
                <text x="65" y="42" fill="#cbd5e1" textAnchor="middle" fontSize="9">PK: (rx_id, med_id)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Dispensing Sandbox ──────────── */}
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
                Interactive Clinical Dispensing Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Prescribe and dispense medicines, observe atomic inventory decrements, and test stock check constraints
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dispensing Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Issue Prescription &amp; Dispense Medicine (Atomic Transaction):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.spec})
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.blood})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={selectedMedId}
                    onChange={(e) => setSelectedMedId(Number(e.target.value))}
                    className="col-span-2 rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  &gt;
                    {medicines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.brand} (Stock: {m.stock}, ₹{m.price}/ea)
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={dispenseQty}
                    onChange={(e) => setDispenseQty(Number(e.target.value))}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Qty"
                  /&gt;
                </div>

                <input
                  type="text"
                  value={dosageText}
                  onChange={(e) => setDosageText(e.target.value)}
                  className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Dosage Instructions"
                /&gt;

                <button
                  onClick={handleDispenseMedicine}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ⚡ Execute Clinical Dispensing Transaction
                </button>
              </div>

              {/* Restock Medicine Controls */}
              <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold text-indigo-400 block">
                  Restock Pharmacy Inventory (+50 Units):
                </span>
                <div className="flex flex-wrap gap-2">
                  {medicines.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleRestockMedicine(m.id)}
                      className="py-1 px-2.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold hover:bg-indigo-500/30 transition-all"
                    &gt;
                      +50 {m.brand.split(" ")[0]}
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

            {/* DDL & Live Pharmacy Stock */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Hospital &amp; Pharmacy Schema DDL:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Inventory & Dispensed Items Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Pharmacy Inventory Stock (CHECK stock >= 0)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Brand Name</th>
                        <th className="p-1.5">Price</th>
                        <th className="p-1.5">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {medicines.map((m) => (
                        <tr key={m.id}>
                          <td className="p-1.5 text-cyan-300 font-bold">#{m.id}</td>
                          <td className="p-1.5 text-white">{m.brand}</td>
                          <td className="p-1.5 text-slate-400">₹{m.price}</td>
                          <td className={clsx("p-1.5 font-bold", m.stock < 20 ? "text-rose-400" : "text-emerald-400")}>
                            {m.stock} units
                          </td>
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
                Patient clinical histories and daily pharmacy sales reporting from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Patient Clinical Summary View
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Clinic</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pre-joined view assembling patient details, doctor notes, and prescribed line items.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE VIEW vw_patient_prescription_history AS
SELECT p.patient_id, p.full_name AS patient_name, pr.issued_at, d.full_name AS doctor_name,
       m.brand_name, i.dosage, i.quantity_dispensed, (m.unit_price * i.quantity_dispensed) AS item_total
FROM patients p
JOIN appointments a ON p.patient_id = a.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
JOIN prescriptions pr ON a.appointment_id = pr.appointment_id
JOIN prescription_items i ON pr.prescription_id = i.prescription_id
JOIN pharmacy_medicines m ON i.medicine_id = m.medicine_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Daily Hospital Consultation &amp; Pharmacy Revenue Aggregation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Main Hospital</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Aggregating consultation doctor fees and in-house pharmacy sales into unified daily earnings.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT (SELECT SUM(consultation_fee) FROM appointments WHERE status = 'Completed') AS total_consultations,
       (SELECT SUM(m.unit_price * i.quantity_dispensed)
        FROM prescription_items i JOIN pharmacy_medicines m ON i.medicine_id = m.medicine_id) AS total_pharmacy;`}
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
                Avoid dispensing without inventory transactions and missing 1:1 appointment constraints
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
                  <strong className="text-white">1. Missing 1:1 UNIQUE on Prescriptions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting UNIQUE on <code>prescriptions(appointment_id)</code> allows duplicate conflicting prescriptions.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Overwriting Inventory without Transactions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Dispensing without check constraints risks negative stock counts and untracked sales.
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
                  <strong className="text-white">1. 12-Digit Aadhaar Unique Candidate Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Enforces strict national patient identity uniqueness with regex validation.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Check Constraint on Inventory Stock:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>CHECK (stock_quantity >= 0)</code> guarantees that pharmacy stock cannot drop below zero.
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
              <span>Model Hospital Branches, Doctors, and Patients as base strong entities</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce 1:1 UNIQUE relationship between completed appointments and prescriptions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Model pharmacy line items with composite PK `(prescription_id, medicine_id)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce `stock_quantity >= 0` with a database-level CHECK constraint</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use atomic transactions for dispensing medicines and updating inventory</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Configure `ON DELETE CASCADE` down from prescriptions to line items</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Hospital & Pharmacy Case Study – FAQs"
            questions={questions}
            subtitle="Master multi-tenant hospital ER modeling, 1:1 electronic prescriptions, pharmacy inventory line items, and atomic dispensing with 30 comprehensive Q&As"
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
            title="Real-World Comprehensive ER Case Study: Multi-Tenant Hospital & Pharmacy Management System"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic19_hospital_pharmacy_case_study_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Healthcare database architecture requires uncompromising precision! " +
              "In my classes in Barrackpore, I teach students to protect patient safety with database constraints: " +
              "1) Enforce `UNIQUE` on `prescriptions(appointment_id)` so no doctor can accidentally issue conflicting prescriptions for the same visit. " +
              "2) Use a composite primary key `(prescription_id, medicine_id)` on the line-items table to prevent duplicate drug entries. " +
              "3) Always enforce `CHECK (stock_quantity >= 0)` in MySQL. When you execute medicine dispensing inside an atomic transaction, " +
              "the database itself acts as a safeguard, guaranteeing that pharmacy stock can never go negative. " +
              "That is how enterprise-grade software is built!"
            }
          /&gt;
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 19 · Hospital & Pharmacy Case Study · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic19;
