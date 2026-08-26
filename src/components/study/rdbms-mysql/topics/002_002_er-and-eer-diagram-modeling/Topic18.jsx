import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic18_files/topic18_questions";
import noteText from "./topic18_files/topic18_note.txt?raw";

/**
 * Topic18 – Real-World Comprehensive ER Case Study: Airline Reservation System
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Airline Reservation Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic18 = () => {
  const sectionRefs = useRef([]);

  // Interactive Airline Booking Simulator State
  const [selectedFlightNumber, setSelectedFlightNumber] = useState("AI-772");
  const [flightDate, setFlightDate] = useState("2026-08-24");
  const [seatNumber, setSeatNumber] = useState("12A");
  const [passengerName, setPassengerName] = useState("Mamata Hui");
  const [passengerPhone, setPassengerPhone] = useState("9830012345");
  const [farePaid, setFarePaid] = useState(4500);

  const [flightSchedule] = useState([
    { flightNumber: "AI-772", airline: "Air India", dep: "CCU (Kolkata)", arr: "DEL (Delhi)", depTime: "06:30", arrTime: "08:50" },
    { flightNumber: "6E-204", airline: "IndiGo", dep: "CCU (Kolkata)", arr: "IXB (Bagdogra)", depTime: "11:15", arrTime: "12:20" },
    { flightNumber: "SG-301", airline: "SpiceJet", dep: "CCU (Kolkata)", arr: "BOM (Mumbai)", depTime: "18:00", arrTime: "20:45" },
  ]);

  const [legInstances, setLegInstances] = useState([
    { flightNumber: "AI-772", date: "2026-08-24", totalSeats: 180, availableSeats: 178, plane: "Boeing 737-800 (#VT-AXA)" },
    { flightNumber: "6E-204", date: "2026-08-24", totalSeats: 186, availableSeats: 185, plane: "Airbus A320neo (#VT-IZB)" },
  ]);

  const [reservations, setReservations] = useState([
    { flightNumber: "AI-772", legNumber: 1, date: "2026-08-24", seat: "12A", name: "Mamata Hui", phone: "9830012345", fare: 4500 },
    { flightNumber: "AI-772", legNumber: 1, date: "2026-08-24", seat: "14C", name: "Abhronila Das", phone: "9830098765", fare: 4500 },
    { flightNumber: "6E-204", legNumber: 1, date: "2026-08-24", seat: "10F", name: "Debangshu Roy", phone: "9830055555", fare: 3200 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Airline Reservation Schema Active. Test booking seats or observe Error 1062 duplicate key protection on seat double-booking."
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

  const handleBookSeat = () => {
    // Check if seat is already booked on this flight instance
    const isBooked = reservations.some(
      (r) => r.flightNumber === selectedFlightNumber && r.date === flightDate && r.seat === seatNumber
    );

    if (isBooked) {
      const existing = reservations.find(
        (r) => r.flightNumber === selectedFlightNumber && r.date === flightDate && r.seat === seatNumber
      );
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${selectedFlightNumber}-1-${flightDate}-${seatNumber}' for key 'PRIMARY'!\nSeat '${seatNumber}' is ALREADY BOOKED by '${existing?.name}' on ${flightDate}. Double-booking rejected by MySQL InnoDB composite primary key.`
      );
      return;
    }

    const newRes = {
      flightNumber: selectedFlightNumber,
      legNumber: 1,
      date: flightDate,
      seat: seatNumber,
      name: passengerName,
      phone: passengerPhone,
      fare: Number(farePaid),
    };

    // Atomic transaction simulation
    setReservations([...reservations, newRes]);
    setLegInstances(
      legInstances.map((inst) =>
        inst.flightNumber === selectedFlightNumber && inst.date === flightDate
          ? { ...inst, availableSeats: inst.availableSeats - 1 }
          : inst
      )
    );

    setEngineLog(
      `✓ Transaction Committed:\n1) INSERT INTO seat_reservations (${selectedFlightNumber}, Leg: 1, Date: '${flightDate}', Seat: '${seatNumber}', Passenger: '${passengerName}', Fare: ₹${farePaid})\n2) UPDATE leg_instances SET available_seats = available_seats - 1 WHERE flight_number = '${selectedFlightNumber}' AND flight_date = '${flightDate}'\nSeat '${seatNumber}' locked successfully!`
    );
  };

  const handleCancelReservation = (flightNo, date, seat) => {
    setReservations(
      reservations.filter(
        (r) => !(r.flightNumber === flightNo && r.date === date && r.seat === seat)
      )
    );
    setLegInstances(
      legInstances.map((inst) =>
        inst.flightNumber === flightNo && inst.date === date
          ? { ...inst, availableSeats: inst.availableSeats + 1 }
          : inst
      )
    );
    setEngineLog(
      `✓ Cancellation Transaction Committed: Freed Seat '${seat}' on ${flightNo} (${date}). available_seats incremented by 1.`
    );
  };

  const handleReset = () => {
    setReservations([
      { flightNumber: "AI-772", legNumber: 1, date: "2026-08-24", seat: "12A", name: "Mamata Hui", phone: "9830012345", fare: 4500 },
      { flightNumber: "AI-772", legNumber: 1, date: "2026-08-24", seat: "14C", name: "Abhronila Das", phone: "9830098765", fare: 4500 },
      { flightNumber: "6E-204", legNumber: 1, date: "2026-08-24", seat: "10F", name: "Debangshu Roy", phone: "9830055555", fare: 3200 },
    ]);
    setLegInstances([
      { flightNumber: "AI-772", date: "2026-08-24", totalSeats: 180, availableSeats: 178, plane: "Boeing 737-800 (#VT-AXA)" },
      { flightNumber: "6E-204", date: "2026-08-24", totalSeats: 186, availableSeats: 185, plane: "Airbus A320neo (#VT-IZB)" },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Flight Leg Instance (Daily Flight Departure)\nCREATE TABLE leg_instances (\n    flight_number VARCHAR(10) NOT NULL,\n    leg_number INT NOT NULL,\n    flight_date DATE NOT NULL,\n    available_seats INT NOT NULL,\n    assigned_airplane_id INT NOT NULL,\n    PRIMARY KEY (flight_number, leg_number, flight_date),\n    CONSTRAINT fk_inst_leg FOREIGN KEY (flight_number, leg_number)\n        REFERENCES flight_legs(flight_number, leg_number) ON DELETE CASCADE,\n    CONSTRAINT fk_inst_plane FOREIGN KEY (assigned_airplane_id)\n        REFERENCES airplanes(airplane_id)\n) ENGINE=InnoDB;\n\n-- Seat Reservation (4-Way Composite Primary Key)\nCREATE TABLE seat_reservations (\n    flight_number VARCHAR(10) NOT NULL,\n    leg_number INT NOT NULL,\n    flight_date DATE NOT NULL,\n    seat_number VARCHAR(4) NOT NULL,\n    passenger_name VARCHAR(100) NOT NULL,\n    passenger_phone VARCHAR(15) NOT NULL,\n    fare_paid DECIMAL(10, 2) NOT NULL,\n    PRIMARY KEY (flight_number, leg_number, flight_date, seat_number),\n    CONSTRAINT fk_res_inst FOREIGN KEY (flight_number, leg_number, flight_date)\n        REFERENCES leg_instances(flight_number, leg_number, flight_date) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 18
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Comprehensive ER Case Study:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Airline Reservation System
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Design, normalize, and query a complete enterprise flight reservation system connecting Kolkata CCU to domestic
            and international routes: multi-level weak entities, 4-way composite primary keys, and atomic seat booking transactions.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✈️ Kolkata CCU ➔ DEL / IXB / BOM
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪑 4-Way Composite Primary Key (Zero Overbooking)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📅 Schedules vs Daily Departures
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Atomic Booking Transactions
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: System Architecture & ER Hierarchy ───────── */}
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
                Airline Enterprise ER Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Hierarchical breakdown from abstract flight routes to individual reserved seats
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Tier 1: Flight Route</span>
              <strong className="text-white text-xs block">Flight &amp; Legs</strong>
              <p className="text-[11px] text-slate-400">AI-772 (CCU ➔ DEL daily schedule).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Tier 2: Departure</span>
              <strong className="text-white text-xs block">Leg Instance</strong>
              <p className="text-[11px] text-slate-400">AI-772 flying on 2026-08-24 (180 seats).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Tier 3: Asset</span>
              <strong className="text-white text-xs block">Airplane &amp; Type</strong>
              <p className="text-[11px] text-slate-400">Boeing 737-800 (#VT-AXA).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Tier 4: Booking</span>
              <strong className="text-white text-xs block">Seat Reservation</strong>
              <p className="text-[11px] text-slate-400">Seat 12A reserved by Mamata Hui (₹4,500).</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Full Airline ER Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Airline Multi-Tier Identifying Hierarchy Diagram
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Airline ER Hierarchy Diagram"
            >
              {/* Flight */}
              <g transform="translate(20, 20)">
                <rect width="140" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">FLIGHT</text>
              </g>

              {/* Arrow 1 */}
              <line x1="160" y1="40" x2="210" y2="40" stroke="#64748b" strokeWidth="2" />

              {/* Flight_Leg (Weak) */}
              <g transform="translate(210, 15)">
                <rect width="150" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 1" />
                <text x="75" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold">FLIGHT_LEG</text>
                <text x="75" y="42" fill="#cbd5e1" textAnchor="middle" fontSize="9">(Weak to Flight)</text>
              </g>

              {/* Arrow 2 */}
              <line x1="360" y1="40" x2="410" y2="40" stroke="#64748b" strokeWidth="2" />

              {/* Leg_Instance (Weak) */}
              <g transform="translate(410, 15)">
                <rect width="150" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" />
                <text x="75" y="25" fill="#10b981" textAnchor="middle" fontWeight="bold">LEG_INSTANCE</text>
                <text x="75" y="42" fill="#cbd5e1" textAnchor="middle" fontSize="9">(Specific Date)</text>
              </g>

              {/* Arrow 3 */}
              <line x1="560" y1="40" x2="610" y2="40" stroke="#64748b" strokeWidth="2" />

              {/* Seat_Reservation (Leaf Weak) */}
              <g transform="translate(610, 15)">
                <rect width="150" height="50" rx="4" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 1" />
                <text x="75" y="25" fill="#f43f5e" textAnchor="middle" fontWeight="bold">SEAT_RESERVE</text>
                <text x="75" y="42" fill="#cbd5e1" textAnchor="middle" fontSize="9">4-Way PK</text>
              </g>

              {/* Airport & Airplane links */}
              <g transform="translate(180, 95)">
                <rect width="180" height="35" rx="4" fill="#0f172a" stroke="#818cf8" />
                <text x="90" y="22" fill="#818cf8" textAnchor="middle">AIRPORT (Dep &amp; Arr)</text>
                <line x1="90" y1="0" x2="90" y2="-30" stroke="#818cf8" strokeDasharray="2 2" />
              </g>

              <g transform="translate(410, 95)">
                <rect width="150" height="35" rx="4" fill="#0f172a" stroke="#fbbf24" />
                <text x="75" y="22" fill="#fbbf24" textAnchor="middle">AIRPLANE</text>
                <line x1="75" y1="0" x2="75" y2="-30" stroke="#fbbf24" strokeDasharray="2 2" />
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Airline Booking Sandbox ───────── */}
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
                Interactive Airline Reservation Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Book seats, observe 4-way composite key duplicate rejection, and test cascading cancellation transactions
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Booking Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Book a Flight Seat (Atomic Transaction):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={selectedFlightNumber}
                    onChange={(e) => setSelectedFlightNumber(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    {flightSchedule.map((f) => (
                      <option key={f.flightNumber} value={f.flightNumber}>
                        {f.flightNumber} ({f.arr.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={flightDate}
                    onChange={(e) => setFlightDate(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  /&gt;
                  <input
                    type="text"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Seat (e.g. 12A)"
                  /&gt;
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Passenger Name"
                  /&gt;
                  <input
                    type="text"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Phone"
                  /&gt;
                  <input
                    type="number"
                    value={farePaid}
                    onChange={(e) => setFarePaid(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Fare ₹"
                  /&gt;
                </div>

                <button
                  onClick={handleBookSeat}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ⚡ Execute Seat Reservation (Atomic Transaction)
                </button>
              </div>

              {/* Active Reservations Drop */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Cancel Reservation (Release Seat):
                </span>
                <div className="flex flex-wrap gap-2">
                  {reservations.map((r, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCancelReservation(r.flightNumber, r.date, r.seat)}
                      className="py-1 px-2.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                    &gt;
                      Drop [{r.flightNumber} {r.seat} - {r.name.split(" ")[0]}]
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

            {/* DDL & Live Flight Manifest */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Airline Schema DDL:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Manifest */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Live Flight Manifest: seat_reservations ({reservations.length} booked)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Flight</th>
                        <th className="p-1.5">Date</th>
                        <th className="p-1.5">Seat (PK)</th>
                        <th className="p-1.5">Passenger</th>
                        <th className="p-1.5">Fare</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {reservations.map((r, idx) => (
                        <tr key={idx}>
                          <td className="p-1.5 text-cyan-300 font-bold">{r.flightNumber}</td>
                          <td className="p-1.5 text-slate-400">{r.date}</td>
                          <td className="p-1.5 text-rose-400 font-bold">{r.seat}</td>
                          <td className="p-1.5 text-white">{r.name}</td>
                          <td className="p-1.5 text-emerald-300">₹{r.fare}</td>
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
                Kolkata CCU daily flight operations and gate manifest reporting
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Kolkata CCU Flight Gate Manifest View
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Airport</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Unified gate manifest query pre-joining seat reservations, flights, legs, and airports.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE VIEW vw_ccu_flight_manifest AS
SELECT r.flight_number, r.flight_date, r.seat_number, r.passenger_name,
       l.departure_airport, l.arrival_airport, r.fare_paid
FROM seat_reservations r
JOIN flight_legs l ON r.flight_number = l.flight_number AND r.leg_number = l.leg_number
WHERE l.departure_airport = 'CCU';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Daily Revenue Aggregation by Destination
                </h3>
                <span className="text-xs text-slate-500 font-mono">Air India Finance</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Calculating total daily revenue generated per destination airport departing from Kolkata.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT l.arrival_airport, COUNT(r.seat_number) AS total_booked, SUM(r.fare_paid) AS total_revenue
FROM flight_legs l
JOIN seat_reservations r ON l.flight_number = r.flight_number AND l.leg_number = r.leg_number
WHERE l.departure_airport = 'CCU' AND r.flight_date = '2026-08-24'
GROUP BY l.arrival_airport;`}
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
                Avoid overbooking seats and conflating static schedules with concrete daily departures
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
                  <strong className="text-white">1. Missing 4-Way Composite PK:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting <code>seat_number</code> in the PK allows double-booking the same seat on the same flight date.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Conflating Schedule &amp; Departures:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Merging <code>Flight</code> and <code>Leg_Instance</code> duplicates the entire weekly route schedule for every single date.
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
                  <strong className="text-white">1. 4-Way Composite Primary Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>(flight_number, leg_number, flight_date, seat_number)</code> eliminates overbooking at the database level.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Atomic Transactions for Booking:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always wrap seat reservation inserts and seat counter updates inside a single <code>START TRANSACTION ... COMMIT</code> block.
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
              <span>Separate abstract flight routes (`flights`) from daily departures (`leg_instances`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`Flight_Leg` is a weak entity identifying under `flight_number`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`seat_reservations` uses a 4-way composite PK to prevent double-booking</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `CHAR(3)` primary keys for standardized IATA airport codes (CCU, DEL, BOM)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use atomic transactions for booking to keep `available_seats` in sync</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Configure `ON DELETE CASCADE` down through the flight scheduling hierarchy</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Airline Reservation Case Study – FAQs"
            questions={questions}
            subtitle="Master enterprise airline database modeling, multi-level weak entities, composite seat keys, and booking transactions with 30 comprehensive Q&As"
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
            title="Real-World Comprehensive ER Case Study: Airline Reservation System"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic18_airline_reservation_case_study_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The Airline Reservation Case Study is the ultimate proving ground for database architects! " +
              "In my classes in Barrackpore, I teach students the 4-Tier Hierarchy Rule: " +
              "Never confuse the abstract route (Flight AI-772) with the concrete flight taking off today from Kolkata CCU (Leg Instance). " +
              "When you separate `flights`, `flight_legs`, `leg_instances`, and `seat_reservations`, your schema becomes mathematically pure. " +
              "By assigning `PRIMARY KEY (flight_number, leg_number, flight_date, seat_number)` on the reservations table, " +
              "MySQL InnoDB guarantees that no two passengers can ever be double-booked on seat 12A on the same date. " +
              "That is database integrity in action!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 18 · Airline Case Study · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic18;
