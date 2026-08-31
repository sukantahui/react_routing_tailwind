import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgGridId = useId();
  const svgAttackMatrixId = useId();

  // Studio 1: Substation Grid Blackout Simulator State
  const initialSubstations = [
    { id: 1, name: "Substation 01 (Ivano-Frankivsk North)", status: "ONLINE", breakerClosed: true, loadMW: 45, customers: 32000 },
    { id: 2, name: "Substation 02 (Kalush Chemical Industrial)", status: "ONLINE", breakerClosed: true, loadMW: 80, customers: 18000 },
    { id: 3, name: "Substation 03 (Kolomyia Central Residential)", status: "ONLINE", breakerClosed: true, loadMW: 35, customers: 41000 },
    { id: 4, name: "Substation 04 (Nadvirna Oil Refinery Feeder)", status: "ONLINE", breakerClosed: true, loadMW: 60, customers: 15000 },
    { id: 5, name: "Substation 05 (Yaremche Mountain Substation)", status: "ONLINE", breakerClosed: true, loadMW: 25, customers: 29000 },
    { id: 6, name: "Substation 06 (Dolyna District Hospital Feed)", status: "ONLINE", breakerClosed: true, loadMW: 30, customers: 34000 },
    { id: 7, name: "Substation 07 (Rohatyn Agricultural Grid)", status: "ONLINE", breakerClosed: true, loadMW: 20, customers: 28000 },
    { id: 8, name: "Substation 08 (Burshtyn Thermal Feeder)", status: "ONLINE", breakerClosed: true, loadMW: 90, customers: 33000 }
  ];

  const [substations, setSubstations] = useState(initialSubstations);
  const [killDiskDeployed, setKillDiskDeployed] = useState(false);
  const [serialConvertersBricked, setSerialConvertersBricked] = useState(false);
  const [manualCrewsDispatched, setManualCrewsDispatched] = useState(false);

  // Studio 2: 5-Phase Attack Step Selection
  const [activeAttackPhase, setActiveAttackPhase] = useState(1);

  // Studio 3: Protocol Firewall & IEC 60870-5-104 DPI State
  const [iec104DpiFirewallActive, setIec104DpiFirewallActive] = useState(true);
  const [vpnMfaEnforced, setVpnMfaEnforced] = useState(true);
  const [firmwareSignedOnly, setFirmwareSignedOnly] = useState(true);

  // Studio 4: Regional Grid Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("substation_audit");

  // Attack Phase Profiles for Studio 2
  const attackPhases = [
    {
      phase: 1,
      title: "Phase 1: Initial Infiltration via Spear-Phishing",
      duration: "May 2015 (6 Months Dwell)",
      vector: "Malicious Word documents with VBA macros sent to regional utility staff dropping BlackEnergy 3 trojan.",
      mitre: "T1566.001 (Spearphishing Attachment), T1059.005 (Visual Basic)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    },
    {
      phase: 2,
      title: "Phase 2: IT-to-OT VPN Boundary Traversal",
      duration: "Fall 2015",
      vector: "Keylogged domain credentials used to authenticate across the corporate IT/SCADA network VPN (No MFA enforced).",
      mitre: "T1078 (Valid Accounts), T1133 (External Remote Services)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800"
    },
    {
      phase: 3,
      title: "Phase 3: SCADA HMI Takeover & Breaker Disconnect",
      duration: "Dec 23, 2015 (3:30 PM)",
      vector: "Attackers hijacked operator screens via RDP and transmitted IEC 60870-5-104 TypeID 45 commands to open 30+ breakers.",
      mitre: "T0831 (Manipulation of Control), T0855 (Unauthorized Command Message)",
      badgeColor: "bg-red-950 text-red-300 border-red-800"
    },
    {
      phase: 4,
      title: "Phase 4: Serial Converter Firmware Bricking",
      duration: "Dec 23, 2015 (3:45 PM)",
      vector: "Uploaded corrupted, unrecoverable hex firmware to Moxa serial-to-Ethernet converters, permanently severing remote control.",
      mitre: "T0857 (System Firmware Compromise), T0814 (Denial of Control)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      phase: 5,
      title: "Phase 5: KillDisk Wiper, UPS Shutdown & Telephony DoS",
      duration: "Dec 23, 2015 (4:00 PM)",
      vector: "KillDisk wiped operator MBRs; UPS battery discharged; VoIP SIP botnet flooded call centers with thousands of fake calls.",
      mitre: "T0828 (Loss of Availability), T1499 (Endpoint Denial of Service)",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800"
    }
  ];

  // Studio 1: Trigger Cyber Attack (Disconnect All Substations)
  const handleTriggerSandwormAttack = () => {
    setSubstations((prev) =>
      prev.map((sub) => ({
        ...sub,
        status: "BLACKOUT: BREAKER OPENED BY ATTACKER",
        breakerClosed: false
      }))
    );
    setSerialConvertersBricked(true);
    setKillDiskDeployed(true);
    setManualCrewsDispatched(false);
  };

  // Studio 1: Trigger Manual Physical Recovery (Crews with hand-cranks)
  const handleManualCrewRecovery = () => {
    setManualCrewsDispatched(true);
    setTimeout(() => {
      setSubstations((prev) =>
        prev.map((sub) => ({
          ...sub,
          status: "MANUAL RECOVERY: Closed via Substation Mechanical Hand-Crank",
          breakerClosed: true
        }))
      );
    }, 800);
  };

  // Studio 1: Reset Simulator
  const handleResetSimulator = () => {
    setSubstations(initialSubstations);
    setKillDiskDeployed(false);
    setSerialConvertersBricked(false);
    setManualCrewsDispatched(false);
  };

  // Studio 1: Calculated Grid Metrics
  const gridMetrics = useMemo(() => {
    const totalCustomers = substations.reduce((acc, sub) => acc + sub.customers, 0);
    const affectedCustomers = substations.filter((s) => !s.breakerClosed).reduce((acc, sub) => acc + sub.customers, 0);
    const blackoutPct = ((affectedCustomers / totalCustomers) * 100).toFixed(1);
    const totalLoadDroppedMW = substations.filter((s) => !s.breakerClosed).reduce((acc, sub) => acc + sub.loadMW, 0);

    return {
      totalCustomers: totalCustomers.toLocaleString(),
      affectedCustomers: affectedCustomers.toLocaleString(),
      blackoutPct,
      totalLoadDroppedMW
    };
  }, [substations]);

  // Studio 3: Protocol Firewall Defense Score
  const gridDefenseScore = useMemo(() => {
    let score = 0;
    if (iec104DpiFirewallActive) score += 35;
    if (vpnMfaEnforced) score += 35;
    if (firmwareSignedOnly) score += 30;
    return score;
  }, [iec104DpiFirewallActive, vpnMfaEnforced, firmwareSignedOnly]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-400/30 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 4</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              Case Study 4: Ukraine Power Grid Attack (2015) — BlackEnergy & SCADA Disruption
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic investigation into the first cyber warfare blackout in human history: How the Sandworm Team breached regional electrical utilities via BlackEnergy 3, hijacked SCADA HMI consoles, corrupted serial converter firmware, and plunged 230,000 citizens into darkness.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Sandworm Team (GRU Unit 74455)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">IEC 60870-5-104 Protocol Abuse</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Serial Converter Firmware Bricking</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Manual Analog Recovery Resilience</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL SUBSTATION SINGLE-LINE DIAGRAM (SLD) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">01.</span> Substation Automation Architecture & Single-Line Attack Flow
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how remote commands traversed from central dispatch across serial converters to physical high-voltage circuit breakers.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
              IEC 60870-5-104 Topology
            </span>
          </div>

          {/* SVG INFOGRAPHIC: Substation Control Architecture */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Electrical Substation Automation & Telemetry Infiltration Path
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgGridId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Central Control Room */}
                <rect x="20" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="100" y="50" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">CENTRAL DISPATCH</text>
                <text x="100" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">SCADA Master HMI (ELPROS)</text>
                <text x="100" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Hijacked via RDP</text>
                <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Mouse moved by Sandworm</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">KillDisk wiped OS</text>
                <rect x="35" y="150" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="100" y="167" textAnchor="middle" fill="#fecaca" fontSize="9" fontWeight="bold">Operators Locked Out</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="210" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* IT/OT VPN Gateway */}
                <rect x="210" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="290" y="50" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">IT/OT VPN BASTION</text>
                <text x="290" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Boundary Gateway</text>
                <text x="290" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">NO MFA ENFORCED!</text>
                <text x="290" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Stolen password used</text>
                <text x="290" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">to pivot to OT subnet</text>
                <rect x="225" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="290" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Boundary Bypassed</text>

                {/* Arrow 2 */}
                <line x1="370" y1="110" x2="400" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Serial-to-Ethernet Converter */}
                <rect x="400" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="480" y="50" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">SERIAL CONVERTER</text>
                <text x="480" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Moxa Ethernet-to-Serial</text>
                <text x="480" y="100" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">IEC 60870-5-104 Bridge</text>
                <text x="480" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Flashed with corrupt hex</text>
                <text x="480" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">EEPROM memory wiped</text>
                <rect x="415" y="150" width="130" height="26" rx="6" fill="#4c1d95" />
                <text x="480" y="167" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontWeight="bold">Permanently Bricked</text>

                {/* Arrow 3 */}
                <line x1="560" y1="110" x2="590" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* Field Substation RTU & Relays */}
                <rect x="590" y="25" width="150" height="175" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="665" y="50" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">SUBSTATION RTU</text>
                <text x="665" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Protective Relays</text>
                <text x="665" y="100" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">TypeID 45 Command</text>
                <text x="665" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">"Single Command" parsed</text>
                <text x="665" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Breakers tripped open</text>
                <rect x="600" y="150" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="665" y="167" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">Physical Trip Sent</text>

                {/* Arrow 4 */}
                <line x1="740" y1="110" x2="765" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* High-Voltage Circuit Breaker */}
                <rect x="765" y="25" width="120" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="825" y="50" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">110kV BREAKER</text>
                <text x="825" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">High-Voltage Line</text>
                <text x="825" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">MANUAL LEVER</text>
                <text x="825" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Mechanical hand-crank</text>
                <text x="825" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">restored grid in 6 hrs</text>
                <rect x="772" y="150" width="105" height="26" rx="6" fill="#1e3a8a" />
                <text x="825" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">Analog Savior</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE SUBSTATION CIRCUIT BREAKER & BLACKOUT SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">02.</span> Studio 1: Electrical Substation Circuit Breaker & Blackout Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate Sandworm opening 8 major substations. Observe how serial converter bricking blinds remote telemetry, and test physical manual hand-crank restoration.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-red-950 border border-red-800 text-red-300 text-xs font-mono self-start sm:self-auto">
              Power Grid Simulator
            </span>
          </div>

          {/* Action Control Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Grid Command Operations Center</div>
              <div className="text-[11px] text-gray-400">
                SCADA Status:{" "}
                <span className={clsx("font-bold", serialConvertersBricked ? "text-rose-400" : "text-emerald-400")}>
                  {serialConvertersBricked ? "TELEMETRY BRICKED (Serial Firmware Overwritten)" : "ONLINE (IEC 60870-5-104 Telecontrol)"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleTriggerSandwormAttack}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-red-950/50 flex items-center gap-2"
              >
                ⚡ Execute Sandworm Cyber Assault
              </button>

              <button
                onClick={handleManualCrewRecovery}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center gap-2"
              >
                🔧 Dispatch Field Crews (Manual Hand-Crank)
              </button>

              <button
                onClick={handleResetSimulator}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Live Grid Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Total Regional Population</span>
              <div className="text-xl font-mono font-extrabold text-white">{gridMetrics.totalCustomers}</div>
              <span className="text-[10px] text-gray-500">Ivano-Frankivsk Province</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Citizens Plunged into Darkness</span>
              <div className={clsx("text-2xl font-mono font-extrabold", gridMetrics.blackoutPct > 0 ? "text-rose-400" : "text-emerald-400")}>
                {gridMetrics.affectedCustomers}
              </div>
              <span className="text-[10px] text-gray-500">{gridMetrics.blackoutPct}% of total population</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Total Electrical Load Dropped</span>
              <div className="text-2xl font-mono font-extrabold text-amber-400">
                {gridMetrics.totalLoadDroppedMW} <span className="text-xs text-gray-400 font-normal">MW</span>
              </div>
              <span className="text-[10px] text-gray-500">Megawatts dropped offline</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">KillDisk Wiper Status</span>
              <div className={clsx("text-base font-bold mt-1", killDiskDeployed ? "text-rose-400" : "text-emerald-400")}>
                {killDiskDeployed ? "OPERATOR MBR WIPED" : "HEALTHY"}
              </div>
              <span className="text-[10px] text-gray-500">{killDiskDeployed ? "SCADA workstations bricked" : "Normal telemetry"}</span>
            </div>
          </div>

          {/* 8 Substation Circuit Breaker Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {substations.map((sub) => (
              <div
                key={sub.id}
                className={clsx(
                  "p-4 rounded-xl border transition-all space-y-2",
                  sub.breakerClosed
                    ? "bg-slate-950/80 border-emerald-900/60 text-gray-200"
                    : "bg-red-950/40 border-red-800 text-red-200 ring-1 ring-red-500"
                )}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate">{sub.name}</span>
                  <span className={clsx("w-2.5 h-2.5 rounded-full", sub.breakerClosed ? "bg-emerald-500" : "bg-red-500 animate-ping")} />
                </div>

                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between text-gray-400">
                    <span>Power Load:</span>
                    <span className="font-mono text-white font-semibold">{sub.loadMW} MW</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Consumers:</span>
                    <span className="font-mono text-white font-semibold">{sub.customers.toLocaleString()}</span>
                  </div>
                </div>

                <div className={clsx("p-2 rounded text-[10px] font-mono text-center font-bold border", sub.breakerClosed ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-red-950 border-red-700 text-red-300")}>
                  {sub.breakerClosed ? "BREAKER: CLOSED (ENERGIZED)" : "BREAKER: TRIPPED OPEN (OFFLINE)"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDIO 2: 5-PHASE SYNCHRONIZED ATTACK MATRIX INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">03.</span> Studio 2: Sandworm 5-Phase Attack Sequence Deconstructor
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Step through the synchronized multi-vector cyber kill chain executed by Russian GRU Unit 74455 against Ukrainian power distribution utilities.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              5-Phase Kill Chain
            </span>
          </div>

          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {attackPhases.map((p) => (
              <button
                key={p.phase}
                onClick={() => setActiveAttackPhase(p.phase)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                  activeAttackPhase === p.phase
                    ? "bg-red-600/20 border-red-500 text-red-200 ring-1 ring-red-500 shadow-md"
                    : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
                )}
              >
                <span className="font-bold text-[11px] text-white">Phase {p.phase}</span>
                <span className="text-[10px] text-red-400 truncate mt-1">{p.title.split(": ")[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Deep Dive */}
          {(() => {
            const cur = attackPhases[activeAttackPhase - 1];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className={clsx("px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border", cur.badgeColor)}>
                      Timeline: {cur.duration}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{cur.title}</h3>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-[11px] font-mono text-purple-300">
                    MITRE ATT&CK: {cur.mitre}
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2 text-xs">
                  <span className="text-amber-400 font-semibold uppercase tracking-wider">
                    Technical Vector & Adversary Execution:
                  </span>
                  <p className="text-gray-300 leading-relaxed font-sans text-sm">{cur.vector}</p>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 3: PROTOCOL FIREWALL & IEC 60870-5-104 DEEP PACKET INSPECTION */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">04.</span> Studio 3: Industrial Protocol Firewall & Firmware Hardening Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Configure protocol-aware industrial firewalls to inspect IEC 60870-5-104 ASDU packets and block unauthorized breaker disconnect commands.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              IEC 104 DPI Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Defensive Toggles */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Electrical SCADA Hardening Controls
              </h3>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">IEC 60870-5-104 Deep Packet Inspection</div>
                  <div className="text-[11px] text-gray-400">Blocks unauthorized TypeID 45 "Single Command" breaker trips</div>
                </div>
                <button
                  onClick={() => setIec104DpiFirewallActive(!iec104DpiFirewallActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    iec104DpiFirewallActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {iec104DpiFirewallActive ? "DPI ACTIVE (+35 pts)" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">FIDO2 Hardware MFA on IT/OT VPN Bastion</div>
                  <div className="text-[11px] text-gray-400">Blocks harvested BlackEnergy passwords from crossing into SCADA</div>
                </div>
                <button
                  onClick={() => setVpnMfaEnforced(!vpnMfaEnforced)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    vpnMfaEnforced ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {vpnMfaEnforced ? "MFA ENFORCED (+35 pts)" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Cryptographically Signed Firmware & Local Flashing</div>
                  <div className="text-[11px] text-gray-400">Disables remote network firmware uploads on serial converters</div>
                </div>
                <button
                  onClick={() => setFirmwareSignedOnly(!firmwareSignedOnly)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    firmwareSignedOnly ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {firmwareSignedOnly ? "SIGNED ONLY (+30 pts)" : "OFF"}
                </button>
              </div>
            </div>

            {/* Defense Analysis Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Grid Resilience Posture Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Grid Defense Resilience Score:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{gridDefenseScore} / 100</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Blackout Prevention Finding:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">
                      {gridDefenseScore === 100
                        ? "OPTIMAL SECURITY: Multi-tier protection active. FIDO2 MFA stops the initial VPN pivot, IEC 104 DPI firewalls reject unauthorized breaker open commands, and signed firmware prevents converter bricking."
                        : gridDefenseScore >= 65
                        ? "MODERATE: Good protection at perimeter, but missing protocol-level inspection allows compromised accounts to issue raw IEC 104 disconnect commands."
                        : "HIGH DEFICIENCY: Vulnerable to remote SCADA takeover and blackout (identical to Ukraine 2015 posture)."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-xs text-red-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-red-300">
                  Golden Rule of Electrical Grid Resilience:
                </span>
                <p>
                  "Never eliminate physical analog mechanical hand-cranks. In the event of zero-day software destruction, physical manual operation by field crews is the ultimate survival lifeline."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL ELECTRICAL POWER UTILITY TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">05.</span> Studio 4: Regional Electrical Power Utility Tabletop Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative power sector audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional 132kV/33kV power grid across Barrackpore, Kolkata, Ichapur, and Jadavpur.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional Power Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-red-950 text-red-300 border border-red-800 px-3 py-1 rounded-full font-medium">
                Lead Power Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (SCADA Protocols Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (OT Network Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Firmware Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("substation_audit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "substation_audit"
                    ? "bg-red-500/20 text-red-300 border border-red-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Substation Findings (Barrackpore & Kolkata)
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("cea_compliance")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "cea_compliance"
                    ? "bg-red-500/20 text-red-300 border border-red-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed Defense & CEA Guidelines
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "substation_audit" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Regional 132kV Substations:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Single-Factor SCADA VPN:</span> Remote engineers in Jadavpur connected to the central load dispatch center via static passwords without MFA.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unrestricted Remote Firmware Uploads:</span> Moxa serial-to-Ethernet converters at the Ichapur substation accepted unauthenticated web firmware uploads over port 80.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unmonitored Telephony Trunks:</span> The emergency dispatch hotline lacked SIP rate limiting or anti-TDoS call filtering.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Deployed by Susmita, Mahima & Debangshu (CEA Standards):</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">FIDO2 Hardware MFA on All Jump-Boxes:</span> Mandated physical YubiKey hardware tokens for all IT/OT VPN access points.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Disabled Remote Firmware Updates:</span> Physically disabled remote firmware flashing on all RTUs; firmware must be updated via physical console cables with RSA signatures.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Routine Manual Failover Drills:</span> Conducted bi-monthly physical mechanical hand-crank drills at all 33kV substations to ensure manual operation readiness.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <FAQTemplate
            title="Ukraine Power Grid Attack (2015) — BlackEnergy & SCADA Disruption FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Ukraine Power Grid Attack (2015) — BlackEnergy & SCADA Disruption (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic4;
