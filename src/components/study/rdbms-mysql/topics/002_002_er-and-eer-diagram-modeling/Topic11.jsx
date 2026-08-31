import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Union Types and Categories (Shared Subclasses with Multiple Superclasses)
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Union Category Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive Category Simulator State
  const [ownerType, setOwnerType] = useState("person"); // "person" | "company"
  const [personName, setPersonName] = useState("Mamata Hui");
  const [aadhaarNo, setAadhaarNo] = useState("1234-5678-9012");
  const [companyName, setCompanyName] = useState("AccoTax Solutions Pvt Ltd");
  const [gstin, setGstin] = useState("19AAACA1234A1Z5");
  const [selectedOwnerId, setSelectedOwnerId] = useState(1);
  const [vehicleReg, setVehicleReg] = useState("WB-24-AX-5555");
  const [vehicleModel, setVehicleModel] = useState("Tata Nexon EV");

  const [owners, setOwners] = useState([
    { id: 1, type: "Person", name: "Mamata Hui", identifier: "1234-5678-9012" },
    { id: 2, type: "Company", name: "AccoTax Solutions Pvt Ltd", identifier: "19AAACA1234A1Z5" },
    { id: 3, type: "Person", name: "Debangshu Roy", identifier: "9876-5432-1098" },
  ]);

  const [vehicles, setVehicles] = useState([
    { regNo: "WB-24-AX-1001", model: "Maruti Swift", ownerId: 1 },
    { regNo: "WB-02-ZZ-8888", model: "Mahindra Scorpio", ownerId: 2 },
    { regNo: "WB-24-BB-3333", model: "Hyundai Creta", ownerId: 3 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Union Category Schema Active. Register Persons or Companies into the Surrogate Owner Master and link Vehicles seamlessly."
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

  const handleRegisterOwner = () => {
    const nextOwnerId = owners.length > 0 ? Math.max(...owners.map((o) => o.id)) + 1 : 1;
    const name = ownerType === "person" ? personName : companyName;
    const identifier = ownerType === "person" ? aadhaarNo : gstin;

    const exists = owners.some((o) => o.identifier === identifier);
    if (exists) {
      setEngineLog(`❌ Duplicate identifier '${identifier}'! This entity is already registered as an owner.`);
      return;
    }

    const newOwner = {
      id: nextOwnerId,
      type: ownerType === "person" ? "Person" : "Company",
      name,
      identifier,
    };

    setOwners([...owners, newOwner]);
    setSelectedOwnerId(nextOwnerId);
    setEngineLog(
      `✓ Surrogate Category Master Created: Registered ${newOwner.type} '${name}' as Category Owner #${nextOwnerId}. 1:1 foreign key created.`
    );
  };

  const handleRegisterVehicle = () => {
    const exists = vehicles.some((v) => v.regNo === vehicleReg);
    if (exists) {
      setEngineLog(`❌ ERROR 1062: Duplicate vehicle registration number '${vehicleReg}'!`);
      return;
    }

    const owner = owners.find((o) => o.id === Number(selectedOwnerId));
    const newVeh = {
      regNo: vehicleReg,
      model: vehicleModel,
      ownerId: Number(selectedOwnerId),
    };

    setVehicles([...vehicles, newVeh]);
    setEngineLog(
      `✓ Vehicle Registered: '${vehicleReg}' (${vehicleModel}) linked to Category Owner #${selectedOwnerId} (${owner?.name}, ${owner?.type}).`
    );
  };

  const handleReset = () => {
    setOwners([
      { id: 1, type: "Person", name: "Mamata Hui", identifier: "1234-5678-9012" },
      { id: 2, type: "Company", name: "AccoTax Solutions Pvt Ltd", identifier: "19AAACA1234A1Z5" },
      { id: 3, type: "Person", name: "Debangshu Roy", identifier: "9876-5432-1098" },
    ]);
    setVehicles([
      { regNo: "WB-24-AX-1001", model: "Maruti Swift", ownerId: 1 },
      { regNo: "WB-02-ZZ-8888", model: "Mahindra Scorpio", ownerId: 2 },
      { regNo: "WB-24-BB-3333", model: "Hyundai Creta", ownerId: 3 },
    ]);
    setEngineLog("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- 1. Unified Category Master Table (Surrogate Key)\nCREATE TABLE vehicle_owners (\n    owner_id INT AUTO_INCREMENT PRIMARY KEY,\n    owner_type ENUM('Person', 'Company') NOT NULL,\n    registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP\n) ENGINE=InnoDB;\n\n-- 2. Superclass 1: persons\nCREATE TABLE persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    owner_id INT NOT NULL UNIQUE,\n    full_name VARCHAR(100) NOT NULL,\n    aadhaar_no CHAR(12) NOT NULL UNIQUE,\n    CONSTRAINT fk_person_owner FOREIGN KEY (owner_id)\n        REFERENCES vehicle_owners(owner_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- 3. Superclass 2: companies\nCREATE TABLE companies (\n    company_id INT AUTO_INCREMENT PRIMARY KEY,\n    owner_id INT NOT NULL UNIQUE,\n    company_name VARCHAR(100) NOT NULL,\n    gstin CHAR(15) NOT NULL UNIQUE,\n    CONSTRAINT fk_comp_owner FOREIGN KEY (owner_id)\n        REFERENCES vehicle_owners(owner_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- 4. Vehicles Table (Foreign Key to Category Master)\nCREATE TABLE vehicles (\n    vehicle_reg_no VARCHAR(20) PRIMARY KEY,\n    owner_id INT NOT NULL,\n    vehicle_model VARCHAR(50) NOT NULL,\n    CONSTRAINT fk_veh_owner FOREIGN KEY (owner_id)\n        REFERENCES vehicle_owners(owner_id)\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 11
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Union Types and Categories:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Multiple Superclasses in EER
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Union Types (Categories with 'u' circles): modeling heterogeneous ownership where entities
            like Vehicles belong to a mathematical UNION of distinct superclasses (Person ∪ Company) with Surrogate Master relational mapping.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⭕ 'u' Circle (Union Category)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👥 Person ∪ Company Union
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Surrogate Master Pattern
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ COALESCE Unified Queries
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Category Architecture & Notation ─────────── */}
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
                Union Category ('u') vs Standard Specialization ('d'/'o')
              </h2>
              <p className="text-xs text-slate-400">
                Multiple disparate superclasses converging into a single shared category subclass
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                1. Disparate Superclasses
              </span>
              <p className="text-xs text-slate-300">
                <code>Person</code> (Aadhaar PK) and <code>Company</code> (GSTIN PK) have completely incompatible key structures.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                2. 'u' Union Circle
              </span>
              <p className="text-xs text-slate-300">
                Connects <code>Person</code> and <code>Company</code> into <code>Vehicle_Owner</code> (Owner = Person ∪ Company).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                3. Surrogate Master
              </span>
              <p className="text-xs text-slate-300">
                Creates <code>vehicle_owners(owner_id PK)</code>. Both <code>persons</code> and <code>companies</code> link via 1:1 foreign keys.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: EER Category Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: EER Union Category ('u') Diagram for Vehicle Ownership
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="EER Union Category Diagram"
            >
              {/* Superclass 1: PERSON */}
              <g transform="translate(40, 20)">
                <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="90" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">PERSON</text>
              </g>

              {/* Superclass 2: COMPANY */}
              <g transform="translate(40, 85)">
                <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="90" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">COMPANY</text>
              </g>

              {/* Converging Lines */}
              <line x1="220" y1="40" x2="340" y2="70" stroke="#64748b" strokeWidth="2" />
              <line x1="220" y1="105" x2="340" y2="75" stroke="#64748b" strokeWidth="2" />

              {/* Union Circle 'u' */}
              <circle cx="350" cy="72" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="350" y="77" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="12">u</text>

              {/* Connecting Line with Subset symbol */}
              <line x1="364" y1="72" x2="480" y2="72" stroke="#f59e0b" strokeWidth="2" />
              <text x="420" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold">⊂</text>

              {/* Category Subclass: OWNER */}
              <g transform="translate(480, 50)">
                <rect width="240" height="45" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="120" y="27" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  VEHICLE_OWNER (Category)
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Category Sandbox ────────────── */}
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
                Interactive Category Simulator (Surrogate Master Pattern)
              </h2>
              <p className="text-xs text-slate-400">
                Register persons or companies into the category master and link vehicles to heterogeneous owners
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Owner Registration */}
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  1. Register Category Owner (Person ∪ Company):
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOwnerType("person")}
                    className={clsx(
                      "flex-1 py-1.5 rounded text-xs font-bold transition-all border",
                      ownerType === "person"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Owner: Person
                  </button>
                  <button
                    onClick={() => setOwnerType("company")}
                    className={clsx(
                      "flex-1 py-1.5 rounded text-xs font-bold transition-all border",
                      ownerType === "company"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Owner: Company
                  </button>
                </div>

                {ownerType === "person" ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      value={aadhaarNo}
                      onChange={(e) => setAadhaarNo(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Aadhaar No"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="Company Name"
                    />
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="GSTIN"
                    />
                  </div>
                )}

                <button
                  onClick={handleRegisterOwner}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ➕ Register Category Master Owner
                </button>
              </div>

              {/* Vehicle Registration */}
              <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-indigo-400 block">
                  2. Link Vehicle to Category Owner:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={selectedOwnerId}
                    onChange={(e) => setSelectedOwnerId(Number(e.target.value))}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  >
                    {owners.map((o) => (
                      <option key={o.id} value={o.id}>
                        #{o.id} ({o.name.split(" ")[0]}, {o.type})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={vehicleReg}
                    onChange={(e) => setVehicleReg(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="Reg No"
                  />
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="Model"
                  />
                </div>
                <button
                  onClick={handleRegisterVehicle}
                  className="w-full py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold hover:bg-indigo-500/30 transition-all"
                >
                  🚗 Link Vehicle to Owner
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

            {/* DDL & Live Joined View */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational Category DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Vehicles Joined View */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Unified COALESCE View: vehicles ({vehicles.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Reg No (PK)</th>
                        <th className="p-1.5">Model</th>
                        <th className="p-1.5">Owner Name (COALESCE)</th>
                        <th className="p-1.5">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {vehicles.map((v) => {
                        const owner = owners.find((o) => o.id === v.ownerId);
                        return (
                          <tr key={v.regNo}>
                            <td className="p-1.5 text-cyan-300 font-bold">{v.regNo}</td>
                            <td className="p-1.5 text-slate-300">{v.model}</td>
                            <td className="p-1.5 text-emerald-300 font-bold">{owner?.name}</td>
                            <td className="p-1.5 text-slate-400">{owner?.type}</td>
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
                Vehicle registration and bank account holders from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Vehicle Registration Category
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore RTO</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Unified vehicle registry supporting individual persons (Aadhaar) and companies (GSTIN) seamlessly.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE VIEW vw_vehicle_registrations AS
SELECT v.vehicle_reg_no, v.vehicle_model, o.owner_type,
       COALESCE(p.full_name, c.company_name) AS registered_owner
FROM vehicles v
JOIN vehicle_owners o ON v.owner_id = o.owner_id
LEFT JOIN persons p ON o.owner_id = p.owner_id
LEFT JOIN companies c ON o.owner_id = c.owner_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Banking Account Holder Category
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Banking</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Bank accounts can be held by individual citizens, trusts, or registered corporate companies.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE account_holders (
    holder_id INT AUTO_INCREMENT PRIMARY KEY,
    holder_type ENUM('Individual', 'Trust', 'Corporate') NOT NULL
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
                Avoid confusing categories with multiple inheritance and missing foreign key enforcement
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
                  <strong className="text-white">1. Confusing Union with Intersection:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Categories are UNIONs ($A \cup B$); multiple inheritance is an INTERSECTION ($A \cap B$).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Raw Polymorphic Columns without FKs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>owner_id INT</code> without a category master table breaks database-level referential integrity.
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
                  <strong className="text-white">1. Surrogate Category Master Table:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always create a unified surrogate master table (e.g. <code>vehicle_owners</code>) with standard FKs.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unified Views with COALESCE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Provide pre-joined database views with <code>COALESCE</code> to simplify queries for application developers.
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
              <span>Categories (Union Types) model a mathematical UNION of heterogeneous superclasses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Represented by a circle with 'u' (for Union) connecting superclasses to category</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Total Category = Double Line (all instances belong); Partial Category = Single Line</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Map to relational schemas using the Surrogate Category Master Table pattern</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Superclasses maintain a 1:1 `UNIQUE` foreign key referencing the category master</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `LEFT JOIN` and `COALESCE` to query heterogeneous category owner details</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Union Types & Categories – FAQs"
            questions={questions}
            subtitle="Master EER Union categories ('u'), Surrogate Master tables, heterogeneous ownership, and COALESCE queries with 30 comprehensive Q&As"
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
            title="Union Types and Categories (Shared Subclasses with Multiple Superclasses)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic11_union_types_categories_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Categories solve one of the most stubborn modeling challenges in relational database design! " +
              "In my classes in Barrackpore, students often ask: 'How can a Vehicle point its foreign key to either a Person or a Company " +
              "when both tables have completely different ID structures?' The answer is the Surrogate Master Pattern. " +
              "Create a single `vehicle_owners` table with an `owner_id INT AUTO_INCREMENT`, and link `persons` and `companies` " +
              "to it with a 1:1 foreign key. Now your `vehicles` table has a rock-solid, single foreign key constraint, " +
              "and your schema stays 100% relational, normalized, and error-free."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 11 · Union Types & Categories · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;
