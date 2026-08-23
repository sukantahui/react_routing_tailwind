import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgPipelineId = useId();
  const svgBitcoinId = useId();

  // Studio 1: IT vs OT Interdependency & Pipeline Operations State
  const [itBillingNetworkState, setItBillingNetworkState] = useState("encrypted"); // healthy, encrypted
  const [otPumpingArchitecture, setOtPumpingArchitecture] = useState("tightly_coupled"); // tightly_coupled, autonomous_islanding
  const [pipelinePhysicalValveOpen, setPipelinePhysicalValveOpen] = useState(false);

  // Studio 2: DarkSide Ransomware & FBI Blockchain Seizure State
  const [ransomPaidBTC, setRansomPaidBTC] = useState(75.0);
  const [fbiSeizureExecuted, setFbiSeizureExecuted] = useState(false);

  // Studio 3: Identity Lifecycle & MFA Configuration State
  const [vpnMfaStatus, setVpnMfaStatus] = useState("single_factor"); // single_factor, fido2_hardware
  const [dormantAccountPolicy, setDormantAccountPolicy] = useState("manual_audit"); // manual_audit, automated_30day_purge

  // Studio 4: Regional Oil Pipeline Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("refinery_findings");

  // Studio 1: Handle Pipeline Valve Toggle
  const handleTogglePipelineValve = () => {
    setPipelinePhysicalValveOpen(!pipelinePhysicalValveOpen);
  };

  // Studio 1: Calculated Operational Pipeline Outcome
  const pipelineOperationalOutcome = useMemo(() => {
    if (itBillingNetworkState === "healthy") {
      return {
        operationalStatus: "NORMAL PUMPING OPERATIONS",
        statusColor: "text-emerald-400 font-bold",
        fuelDeliveredBPD: "2,500,000 Barrels / Day",
        eastCoastFuelSupplyPct: "100% (Normal Flow)",
        billingStatus: "ONLINE: Real-time ERP customer invoicing active",
        explanation: "All systems healthy. Fuel is flowing smoothly from Texas refineries through the 5,500-mile pipeline to New York harbor."
      };
    }

    if (otPumpingArchitecture === "tightly_coupled") {
      return {
        operationalStatus: "PHYSICAL PIPELINE HALTED (Colonial 2021 Catastrophe)",
        statusColor: "text-rose-400 font-extrabold",
        fuelDeliveredBPD: "0 Barrels / Day",
        eastCoastFuelSupplyPct: "0% (Severe National Shortage)",
        billingStatus: "ENCRYPTED: Cannot track deliveries or invoice customers",
        explanation: "Disaster! Tight coupling between billing and physical operations forced a total shutdown. 45% of East Coast fuel supply vanished, triggering panic buying across 4 states."
      };
    } else {
      return {
        operationalStatus: "AUTONOMOUS ISLANDING MODE (Resilient Design)",
        statusColor: "text-emerald-400 font-bold",
        fuelDeliveredBPD: "2,500,000 Barrels / Day (Continuous Flow)",
        eastCoastFuelSupplyPct: "100% (Pumping Uninterrupted)",
        billingStatus: "BUFFERED: Flow computers recording dispatch tickets locally to NVRAM",
        explanation: "Resilience verified! Even though corporate IT billing is encrypted, autonomous SCADA islanding buffers 50,000 truck delivery tickets locally for 30 days. Fuel flows safely!"
      };
    }
  }, [itBillingNetworkState, otPumpingArchitecture]);

  // Studio 2: Calculated Ransom Seizure Metrics
  const seizureMetrics = useMemo(() => {
    const totalPaidUSD = 4400000;
    const totalPaidINR = 365000000;
    const recoveredBTC = fbiSeizureExecuted ? 63.7 : 0;
    const recoveredUSD = fbiSeizureExecuted ? 2300000 : 0;
    const recoveredINR = fbiSeizureExecuted ? 191000000 : 0;
    const netAttackerProfitBTC = ransomPaidBTC - recoveredBTC;

    return {
      totalPaidUSD: totalPaidUSD.toLocaleString(),
      totalPaidINR: (totalPaidINR / 10000000).toFixed(2), // In Crores
      recoveredBTC: recoveredBTC.toFixed(1),
      recoveredUSD: recoveredUSD.toLocaleString(),
      recoveredINR: (recoveredINR / 10000000).toFixed(2),
      netAttackerProfitBTC: netAttackerProfitBTC.toFixed(1)
    };
  }, [ransomPaidBTC, fbiSeizureExecuted]);

  // Studio 3: Calculated Identity Risk Score
  const identitySecurityScore = useMemo(() => {
    let score = 0;
    if (vpnMfaStatus === "fido2_hardware") score += 60;
    if (dormantAccountPolicy === "automated_30day_purge") score += 40;
    return score;
  }, [vpnMfaStatus, dormantAccountPolicy]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border border-amber-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 8</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Case Study 8: Colonial Pipeline (2021) — Critical Infrastructure Shutdown
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic deconstruction of the watershed energy cyber crisis: How a single orphaned VPN account without MFA triggered the shutdown of a 5,500-mile petroleum lifeline carrying 45% of East Coast fuel, paid a ₹36.5 Crore ransom, and prompted the FBI's historic Bitcoin seizure.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">DarkSide Ransomware-as-a-Service</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">IT/OT Interdependency Decoupling</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">FBI Blockchain Wallet Seizure (63.7 BTC)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">TSA Pipeline Security Directives</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL IT/OT DECOUPLING & DOUBLE-EXTORTION INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">01.</span> IT vs OT Architecture & The Decoupling Failsafe
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how single-factor VPN access compromised corporate billing and forced the shutdown of physically functional pumping systems.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-mono">
              Pipeline Architecture
            </span>
          </div>

          {/* SVG INFOGRAPHIC: Colonial Pipeline Kill Chain & Decoupling */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              End-to-End Incident Progression: From Leaked VPN Password to FBI Bitcoin Recovery
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgPipelineId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Step 1: Orphaned VPN Access */}
                <rect x="20" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="100" y="50" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">1. ORPHANED VPN</text>
                <text x="100" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Legacy VPN Gateway</text>
                <text x="100" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">NO MFA ENFORCED!</text>
                <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Reused dark web password</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Dormant employee account</text>
                <rect x="35" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="100" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Single-Factor Ingress</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="210" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Step 2: DarkSide Double Extortion */}
                <rect x="210" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="290" y="50" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">2. DARKSIDE RaaS</text>
                <text x="290" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Corporate IT Subnet</text>
                <text x="290" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">100 GB Exfiltrated</text>
                <text x="290" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Accounting data stolen</text>
                <text x="290" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Salsa20 file encryption</text>
                <rect x="225" y="150" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="290" y="167" textAnchor="middle" fill="#fecaca" fontSize="9" fontWeight="bold">Billing Systems Locked</text>

                {/* Arrow 2 */}
                <line x1="370" y1="110" x2="400" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* Step 3: Physical Shutdown Dilemma */}
                <rect x="400" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="480" y="50" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">3. SHUTDOWN</text>
                <text x="480" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">5,500-Mile Pipeline</text>
                <text x="480" y="100" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">45% Fuel Flow Halted</text>
                <text x="480" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">SCADA was uninfected</text>
                <text x="480" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">but IT billing was dead</text>
                <rect x="415" y="150" width="130" height="26" rx="6" fill="#4c1d95" />
                <text x="480" y="167" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontWeight="bold">National Crisis</text>

                {/* Arrow 3 */}
                <line x1="560" y1="110" x2="590" y2="110" stroke="#8b5cf6" strokeWidth="3" />

                {/* Step 4: Ransom Payment */}
                <rect x="590" y="25" width="150" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="665" y="50" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">4. RANSOM PAID</text>
                <text x="665" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">75 Bitcoin ($4.4M)</text>
                <text x="665" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">~₹36.5 Crores</text>
                <text x="665" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Decryptor tool was slow</text>
                <text x="665" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Restored from backups</text>
                <rect x="600" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="665" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">75 BTC Transferred</text>

                {/* Arrow 4 */}
                <line x1="740" y1="110" x2="765" y2="110" stroke="#10b981" strokeWidth="3" />

                {/* Step 5: FBI Seizure & TSA Mandates */}
                <rect x="765" y="25" width="120" height="175" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="825" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">5. RECOVERY</text>
                <text x="825" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">FBI Seized 63.7 BTC</text>
                <text x="825" y="100" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Private Key Seizure</text>
                <text x="825" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">TSA issued binding</text>
                <text x="825" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">pipeline directives</text>
                <rect x="772" y="150" width="105" height="26" rx="6" fill="#065f46" />
                <text x="825" y="167" textAnchor="middle" fill="#d1fae5" fontSize="9" fontWeight="bold">63.7 BTC Seized</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE IT/OT INTERDEPENDENCY & SHUTDOWN SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">02.</span> Studio 1: Pipeline IT/OT Interdependency & Shutdown Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate how IT billing encryption impacts physical pipeline operations. Compare tightly coupled architecture versus autonomous SCADA islanding with volumetric buffering.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              Pipeline Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Industrial Architecture Configuration
              </h3>

              {/* IT Billing State */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Corporate IT Billing & Accounting State:</label>
                <select
                  value={itBillingNetworkState}
                  onChange={(e) => setItBillingNetworkState(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="encrypted">1. Encrypted by DarkSide Ransomware (Colonial 2021 Breach)</option>
                  <option value="healthy">2. Normal & Healthy (Full ERP / Invoicing Operational)</option>
                </select>
              </div>

              {/* OT Pumping Architecture */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">SCADA Pumping System Coupling Architecture:</label>
                <select
                  value={otPumpingArchitecture}
                  onChange={(e) => setOtPumpingArchitecture(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="tightly_coupled">1. Tightly Coupled (SCADA pumps halt if IT billing is offline)</option>
                  <option value="autonomous_islanding">2. Autonomous Islanding (Local NVRAM flow computer buffering)</option>
                </select>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Main Pipeline Valve State:</span>
                  <span className={pipelinePhysicalValveOpen ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {pipelinePhysicalValveOpen ? "OPEN (Flowing)" : "CLOSED (Halted)"}
                  </span>
                </div>
                <button
                  onClick={handleTogglePipelineValve}
                  className={clsx(
                    "w-full py-2 rounded font-bold transition-all text-xs",
                    pipelinePhysicalValveOpen ? "bg-rose-900 text-rose-200" : "bg-emerald-600 text-white"
                  )}
                >
                  {pipelinePhysicalValveOpen ? "⏹️ Emergency Close Physical Valve" : "▶️ Open Physical Pumping Valve"}
                </button>
              </div>
            </div>

            {/* Calculated Operational Impact Dashboard */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Operational Fuel Flow Telemetry
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Physical Pipeline Operational State:</span>
                    <span className={pipelineOperationalOutcome.statusColor}>{pipelineOperationalOutcome.operationalStatus.split(" (")[0]}</span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Daily Fuel Throughput Delivered:</span>
                    <span className="font-mono font-bold text-amber-400">{pipelineOperationalOutcome.fuelDeliveredBPD}</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Operational Analysis:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{pipelineOperationalOutcome.explanation}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-amber-300">
                  Critical Architectural Rule:
                </span>
                <p>
                  "Never design industrial infrastructure where the loss of corporate billing software forces the shutdown of a physical energy plant. Decouple OT operations with local volumetric buffering."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: DARKSIDE RANSOM & FBI BITCOIN BLOCKCHAIN RECOVERY TRACKER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">03.</span> Studio 2: DarkSide Ransomware & FBI Blockchain Seizure Tracker
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Analyze the cryptocurrency transaction trail of the $4.4M (75 BTC) ransom payment and simulate the FBI's cryptographic private key seizure.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              Crypto Forensics Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blockchain Seizure Action */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Blockchain Transaction Ledger (Bitcoin Public Chain)
                </h3>

                <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div className="text-gray-400">TX ID: <span className="text-white">7a8b9f...d41e (May 8, 2021)</span></div>
                  <div className="text-gray-400">From: <span className="text-white">Colonial Pipeline Escrow</span></div>
                  <div className="text-gray-400">To: <span className="text-amber-300">1Mt8nv... (DarkSide Affiliate Custodial Wallet)</span></div>
                  <div className="text-gray-400">Amount: <span className="text-rose-400 font-bold">75.00000000 BTC ($4.4M / ~₹36.5 Crores)</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setFbiSeizureExecuted(!fbiSeizureExecuted)}
                  className={clsx(
                    "w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2",
                    fbiSeizureExecuted
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                      : "bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-950/50"
                  )}
                >
                  {fbiSeizureExecuted ? "⚖️ 63.7 BTC SEIZED BY FBI" : "🔍 Execute FBI Private Key Search Warrant"}
                </button>
              </div>
            </div>

            {/* Financial & Law Enforcement Telemetry */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Cryptocurrency Recovery Outcome
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Ransom Extorted by DarkSide:</span>
                    <span className="font-mono font-bold text-rose-400">75.0 BTC (₹{seizureMetrics.totalPaidINR} Crores)</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Cryptocurrency Seized by FBI Task Force:</span>
                    <span className="font-mono font-bold text-emerald-400">{seizureMetrics.recoveredBTC} BTC (₹{seizureMetrics.recoveredINR} Crores)</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Net Profit Retained by Attacker:</span>
                    <span className="font-mono font-bold text-amber-400">{seizureMetrics.netAttackerProfitBTC} BTC</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-xs text-blue-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-blue-300">
                  Blockchain Forensics Takeaway:
                </span>
                <p>
                  "Bitcoin transactions are public and permanent. Rapid reporting to law enforcement enabled the FBI to track the transaction hops and seize the affiliate's wallet private key."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 3: IDENTITY GOVERNANCE & UNIVERSAL MFA AUDIT LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">04.</span> Studio 3: Identity Lifecycle Governance & FIDO2 Hardware MFA Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Configure identity governance rules to eliminate orphaned VPN accounts and prevent dark web password reuse attacks.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Identity Audit Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Remote Access & Account Lifecycle Policy
              </h3>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Remote Access VPN Authentication Standard:</label>
                <select
                  value={vpnMfaStatus}
                  onChange={(e) => setVpnMfaStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="single_factor">1. Single-Factor Password Only (Colonial 2021 Vulnerability)</option>
                  <option value="fido2_hardware">2. FIDO2 Hardware Security Key (YubiKey Touch Required)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Dormant Account Lifecycle Management:</label>
                <select
                  value={dormantAccountPolicy}
                  onChange={(e) => setDormantAccountPolicy(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="manual_audit">1. Manual / Infrequent Audits (Orphaned Accounts Remain Active)</option>
                  <option value="automated_30day_purge">2. Automated 30-Day Inactivity Revocation Policy</option>
                </select>
              </div>
            </div>

            {/* Assessment Score */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Identity Fortress Resilience Score
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Identity Resilience Index:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{identitySecurityScore} / 100</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Credential Stuffing Attack Assessment:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">
                      {identitySecurityScore === 100
                        ? "INVULNERABLE TO PASSWORD THEFT: FIDO2 hardware keys require physical touch, rendering dark web leaked passwords completely useless. Automated IGA revokes dormant profiles."
                        : identitySecurityScore >= 60
                        ? "MODERATE: Strong hardware MFA active, but lack of automated account de-provisioning leaves dormant profiles in Active Directory."
                        : "CRITICAL VULNERABILITY: Single-factor password on orphaned account allows attackers on the dark web to breach internal LAN in seconds."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-amber-300">
                  Golden Rule of Identity Security:
                </span>
                <p>
                  "A password alone is no longer an authentication credential on the public Internet. Universal FIDO2 hardware MFA is the single most effective defense against ransomware ingress."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL PETROLEUM PIPELINE & REFINERY TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">05.</span> Studio 4: Regional Fuel Pipeline & Refinery Terminal Tabletop
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative critical infrastructure audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional aviation turbine fuel and gasoline distribution pipeline in Kolkata and Barrackpore.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional Energy Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-medium">
                Lead Infrastructure Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (Identity Governance Specialist)
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
                Debangshu (Flow Computer Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("refinery_findings")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "refinery_findings"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Refinery Terminal Findings (Kolkata & Barrackpore)
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("tsa_remediation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "tsa_remediation"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed Defense & NCIIPC Compliance
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "refinery_findings" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Regional Pipeline Infrastructure:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Dormant Contractor Remote Access:</span> An external contractor VPN account in Jadavpur remained active 6 months after the contract concluded.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Coupled Truck Loading SCADA:</span> Tanker truck loading flow computers in Ichapur were directly wired to the corporate SAP billing server with no offline caching.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unmonitored Outbound Bandwidth:</span> Corporate file servers lacked egress data loss prevention rules, allowing multi-gigabyte uploads to public cloud storage.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Deployed by Susmita, Debangshu & Mahima:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Universal FIDO2 Hardware MFA:</span> Enforced YubiKey hardware tokens across all VPN and administrative endpoints with automated 30-day dormant account purging.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Autonomous Flow Computer Buffering:</span> Configured terminal flow computers with local tamper-evident NVRAM buffers capable of operating independently for 30 days during an IT outage.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Industrial DMZ Segmentation:</span> Implemented Purdue Model Level 3.5 firewalls with unidirectional data diodes isolating SCADA pumping systems from corporate IT.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">06.</span> Academic Note & Printable Revision Guide
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Print or export clean ASCII academic notes prepared by Sukanta Hui for BCA semester revision.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ASCII Revision Guide
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <PlainTextPrint
              text={noteText}
              fileName="Topic8_Colonial_Pipeline_Ransomware_Case_Study_Notes.txt"
            />
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">07.</span> Comprehensive Exam & Interview Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                30 in-depth conceptual, analytical, and forensic questions with code snippets, hints, and model answers on the Colonial Pipeline incident, DarkSide, and IT/OT decoupling.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              30 Topic Questions
            </span>
          </div>

          <FAQTemplate questions={questions} />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic8;
