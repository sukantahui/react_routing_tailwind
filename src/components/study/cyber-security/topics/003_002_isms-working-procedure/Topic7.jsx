import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: BIA System Selector State
  const [selectedBiaSystemKey, setSelectedBiaSystemKey] = useState("upi_switch");

  // Studio 2: DR Site Strategy State
  const [selectedDrStrategyKey, setSelectedDrStrategyKey] = useState("hot_site_cloud");
  const [isDrSimulating, setIsDrSimulating] = useState(false);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_cloud_dr");

  // Studio 1: BIA Systems Data
  const biaSystems = {
    upi_switch: {
      key: "upi_switch",
      name: "1. Core UPI Payment Switch",
      tier: "Tier 1: Mission-Critical",
      rto: "15 Seconds (Automated Failover)",
      rpo: "0 Seconds (Synchronous DB Sync)",
      mtd: "1 Hour (Maximum Tolerable Downtime)",
      wrt: "10 Minutes (Queue Replay & Balance Verification)",
      lossPerHour: "₹50 Lakhs / Hour + Immediate RBI Regulatory Sanctions",
      idealStrategy: "Multi-Region Active-Active Cloud Cluster with Route 53 Health Checks",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    oncology_pacs: {
      key: "oncology_pacs",
      name: "2. Healthcare Oncology PACS Database",
      tier: "Tier 2: Clinical-Critical",
      rto: "2 Hours (Warm Standby Activation)",
      rpo: "15 Minutes (Near-Real-Time Replication)",
      mtd: "4 Hours (Maximum Tolerable Downtime)",
      wrt: "45 Minutes (DICOM Image Integrity & Sync Verification)",
      lossPerHour: "Severe Clinical Risk to Cancer Patients + ₹250 Cr DPDP Liability",
      idealStrategy: "Warm Site on AWS S3 Object Lock with Pilot Light Compute Instances",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    scada_grid: {
      key: "scada_grid",
      name: "3. 220kV SCADA Power Grid Telemetry",
      tier: "Tier 1: National Critical Infrastructure (CII)",
      rto: "60 Seconds (Automated Redundant RTU Switch)",
      rpo: "0 Seconds (Real-Time Synchronous Telemetry)",
      mtd: "15 Minutes (Maximum Tolerable Downtime)",
      wrt: "5 Minutes (Substation Breaker Status Verification)",
      lossPerHour: "State-wide Power Grid Blackout + 10-Year Imprisonment (IT Act Sec 70)",
      idealStrategy: "Dual Dedicated Fiber Hot Standby Control Room with Quorum Consensus",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    payroll_erp: {
      key: "payroll_erp",
      name: "4. Corporate HR & Payroll ERP",
      tier: "Tier 3: Important Administrative",
      rto: "24 Hours (Cold/Warm Rebuild)",
      rpo: "4 Hours (Periodic Hourly Snapshots)",
      mtd: "72 Hours (Maximum Tolerable Downtime)",
      wrt: "4 Hours (Batch Payroll Ledger Reconciliation)",
      lossPerHour: "₹2 Lakhs / Day + Employee Operational Inconvenience",
      idealStrategy: "Warm Standby Cloud Snapshot Rebuild with Automated Terraform Deployment",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    }
  };

  const activeBiaSystem = biaSystems[selectedBiaSystemKey];

  // Studio 2: DR Strategies Data
  const drStrategies = {
    hot_site_cloud: {
      key: "hot_site_cloud",
      title: "Hot Site / Multi-Region Active-Active Cloud",
      rtoMetric: "RTO: < 15 Seconds",
      rpoMetric: "RPO: 0 Seconds",
      dataSync: "Synchronous Multi-Region Replication (Kolkata ➔ Mumbai)",
      readinessState: "100% Operational 24/7/365 with Live Traffic Sharing",
      costProfile: "Very High (200% Infrastructure Cost)",
      ransomwareImmunity: "High (Requires Separate Cryptographic Cloud Vault)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    warm_site_pilot: {
      key: "warm_site_pilot",
      title: "Warm Site / Cloud Pilot Light",
      rtoMetric: "RTO: 1 - 4 Hours",
      rpoMetric: "RPO: 15 Minutes",
      dataSync: "Continuous Asynchronous Database Replication (Read Replica)",
      readinessState: "Storage Online; Compute Instances Scaled Down to 1 Node",
      costProfile: "Moderate (30-40% Infrastructure Cost)",
      ransomwareImmunity: "Moderate (Subject to Snapshot Infection without WORM)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    cold_site_facility: {
      key: "cold_site_facility",
      title: "Cold Site / Empty Warehouse Facility",
      rtoMetric: "RTO: Days to Weeks",
      rpoMetric: "RPO: 24 - 48 Hours",
      dataSync: "Physical Tape Shipment / Off-site Disk Courier",
      readinessState: "Empty Shell: Power & Cooling Available; No Hardware",
      costProfile: "Lowest (5-10% Infrastructure Cost)",
      ransomwareImmunity: "High for Physical Tapes; Catastrophic Downtime",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    immutable_vault: {
      key: "immutable_vault",
      title: "Immutable Air-Gapped Cloud Vault (WORM)",
      rtoMetric: "RTO: 2 Hours",
      rpoMetric: "RPO: 1 Hour",
      dataSync: "Continuous Encrypted Snapshots with S3 Object Lock Compliance",
      readinessState: "Immutable Storage Vault; Zero Deletion or Alteration Possible",
      costProfile: "Low-Moderate (Storage Only)",
      ransomwareImmunity: "100% Absolute Immunity (Root Account Cannot Delete)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeDrStrategy = drStrategies[selectedDrStrategyKey];

  const handleSimulateFailover = () => {
    setIsDrSimulating(true);
    setTimeout(() => {
      setIsDrSimulating(false);
    }, 1800);
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_cloud_dr",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Multi-Region Active-Active Cloud Failover",
      budget: "₹18,50,000",
      challenge: "Primary Data Center Power Fiber Cut During Peak Diwali Shopping",
      dilemma:
        "Primary Kolkata data center suffered a power fiber severance during peak Diwali shopping, threatening ₹120 Crores in daily UPI transactions and immediate RBI penalties.",
      resolution:
        "Automated Route 53 DNS failover switched 100% traffic to the secondary Mumbai cluster with RTO = 12 seconds and RPO = 0, processing transactions seamlessly without data loss.",
      metrics: {
        actualRto: "12 Seconds (SLA: 15s)",
        actualRpo: "0 Bytes Lost (RPO = 0s)",
        transactionsProcessed: "₹120 Crores Protected",
        compliance: "RBI Master Directions & ISO 22301"
      }
    },
    {
      id: "ichapur_pacs_warm_site",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Warm Site Healthcare PACS Disaster Recovery",
      budget: "₹8,20,000",
      challenge: "Ransomware Strain Attempted to Encrypt 80,000 Oncology Scans",
      dilemma:
        "A ransomware strain attempted to encrypt primary PACS storage for 80,000 oncology scans, threatening critical patient surgeries and clinical accreditation.",
      resolution:
        "Mahima failed over to an immutable Warm Site backup vault on AWS S3 Object Lock, restoring all diagnostic imaging within 1 hour 45 minutes (well within the 4-hour RTO).",
      metrics: {
        restoreTime: "1h 45m (SLA: 4h)",
        recordsRecovered: "80,000 Oncology Scans",
        ransomPaid: "₹0 (Zero Ransom Paid)",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_live_drill",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Live Failover Drill",
      budget: "₹14,80,000",
      challenge: "Validating Backup Control Room Readiness Across 18 Substations",
      dilemma:
        "Validating emergency backup control room readiness across 18 high-voltage 220kV transmission substations under mandatory Central Electricity Authority continuity rules.",
      resolution:
        "Debangshu executed an unannounced full interruption drill, transferring SCADA switching to the Barrackpore secondary control center with zero grid disruption under CEA regulations.",
      metrics: {
        substationsSwitched: "18 High-Voltage Sites",
        switchoverLatency: "48 Seconds (SLA: 60s)",
        powerGridUptime: "100.000% Continuous Power",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_bcp_sim_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "BIA Calculator & DR Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Confused by WRT Impact on MTD & Quorum Split-Brain",
      dilemma:
        "Cybersecurity students struggled to understand how Work Recovery Time (WRT) impacts Maximum Tolerable Downtime (MTD) and why Hot Sites prevent split-brain database corruption.",
      resolution:
        "The team developed an interactive BIA Calculator, RTO/RPO Simulator, and DR Site Comparison Engine in React, training 215+ BCA cyber security students on continuity engineering.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        drScenariosSimulated: "80+ Enterprise Drills",
        examMastery: "100% BCP/DR Architecture Mastery",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Course Module 3: Information Security Management • Module 003_002 • Topic 7 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Business Continuity Planning (BCP) and Disaster Recovery (DR)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Engineer enterprise survivability: master Business Impact Analysis (BIA), optimize Recovery Time Objective (RTO) and Recovery Point Objective (RPO) within Maximum Tolerable Downtime (MTD), 
            deploy Hot, Warm, and Immutable DR architectures (ISO 27001 Controls A.5.29, A.5.30, A.8.14), and satisfy RBI and DPDP continuity mandates.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive BIA Matrix & RTO / RPO Parameter Optimizer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 1: Business Impact Analysis (BIA) &amp; Continuity Optimizer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise business system to inspect its criticality tier, RTO/RPO metrics, Maximum Tolerable Downtime (MTD), Work Recovery Time (WRT), and financial loss curves.
            </p>
          </div>

          {/* System Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(biaSystems).map((sys) => {
              const isSelected = selectedBiaSystemKey === sys.key;
              return (
                <button
                  key={sys.key}
                  onClick={() => setSelectedBiaSystemKey(sys.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{sys.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{sys.tier.split(":")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active BIA System Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeBiaSystem.badgeClass)}>
                  {activeBiaSystem.tier}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  System: {activeBiaSystem.name}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Downtime Financial Impact</span>
                <span className="text-xs sm:text-sm font-extrabold text-rose-400 font-mono">{activeBiaSystem.lossPerHour}</span>
              </div>
            </div>

            {/* RTO vs RPO vs MTD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Recovery Time Objective (RTO):</span>
                <p className="text-white text-sm font-bold">{activeBiaSystem.rto}</p>
                <span className="text-[10px] text-gray-400 font-sans block">Maximum allowable technical downtime</span>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/40 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Recovery Point Objective (RPO):</span>
                <p className="text-white text-sm font-bold">{activeBiaSystem.rpo}</p>
                <span className="text-[10px] text-gray-400 font-sans block">Maximum allowable transaction data loss</span>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Max Tolerable Downtime (MTD):</span>
                <p className="text-emerald-300 text-sm font-bold">{activeBiaSystem.mtd}</p>
                <span className="text-[10px] text-gray-400 font-sans block">MTD &gt;= RTO ({activeBiaSystem.rto.split(" ")[0]}) + WRT ({activeBiaSystem.wrt.split(" ")[0]})</span>
              </div>
            </div>

            {/* Ideal DR Strategy */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-cyan-900/30 text-xs font-mono">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Recommended Disaster Recovery Strategy:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-sans font-semibold leading-relaxed mt-0.5">{activeBiaSystem.idealStrategy}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Disaster Recovery Site Comparison & Cloud Failover Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏗️</span> Studio 2: Disaster Recovery Site Comparison &amp; Failover Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare Hot, Warm, Cold, and Immutable DR architectures, and trigger a simulated failover drill to observe recovery speed, data loss, and cost profiles.
            </p>
          </div>

          {/* Strategy Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(drStrategies).map((strat) => {
              const isSelected = selectedDrStrategyKey === strat.key;
              return (
                <button
                  key={strat.key}
                  onClick={() => setSelectedDrStrategyKey(strat.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{strat.title.split(" / ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{strat.rtoMetric}</div>
                </button>
              );
            })}
          </div>

          {/* Active DR Strategy Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDrStrategy.badgeClass)}>
                  {activeDrStrategy.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeDrStrategy.rtoMetric} • {activeDrStrategy.rpoMetric}
                </h3>
              </div>
              <div>
                <button
                  onClick={handleSimulateFailover}
                  disabled={isDrSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-950/50 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isDrSimulating ? "⚡" : "🚨"}</span>
                  <span>{isDrSimulating ? "Executing Failover Cutover..." : "Simulate Disaster Failover"}</span>
                </button>
              </div>
            </div>

            {/* Operational Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Data Synchronization Mechanism:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeDrStrategy.dataSync}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Standby Readiness State:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeDrStrategy.readinessState}</p>
              </div>
            </div>

            {/* Cost Profile & Ransomware Immunity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Infrastructure Cost Profile:</span>
                <p className="text-gray-200 text-xs font-bold leading-relaxed">{activeDrStrategy.costProfile}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Ransomware Immunity Rating:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeDrStrategy.ransomwareImmunity}</p>
              </div>
            </div>

            {/* Live Drill Notification */}
            {isDrSimulating && (
              <div className="p-4 bg-emerald-950 border border-emerald-600 text-emerald-200 rounded-xl text-xs font-mono animate-pulse">
                ✔ Disaster Declared: Live traffic rerouted via Route 53 DNS to Secondary DR Cluster. Zero transaction data loss recorded!
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Continuity Timeline (RPO ➔ RTO ➔ WRT ➔ MTD) and the Hot Site vs Warm Site vs Cold Site Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Continuity Timeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The BCP Continuity Timeline Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Timeline Bar */}
                  <line x1="30" y1="160" x2="470" y2="160" stroke="#475569" strokeWidth="3" />

                  {/* Point 1: Last Known Good Backup (RPO) */}
                  <circle cx="100" cy="160" r="7" fill="#06b6d4" />
                  <text x="100" y="140" fill="#67e8f9" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8">LAST BACKUP</text>
                  <text x="100" y="190" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="7">RPO Interval</text>

                  {/* Point 2: DISASTER STRIKES */}
                  <circle cx="210" cy="160" r="9" fill="#ef4444" />
                  <text x="210" y="125" fill="#fca5a5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">💥 DISASTER</text>
                  <text x="210" y="195" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">02:00:00 IST</text>

                  {/* Arrow for RPO */}
                  <line x1="100" y1="160" x2="210" y2="160" stroke="#06b6d4" strokeWidth="4" />

                  {/* Point 3: IT Technical Recovery (RTO) */}
                  <circle cx="330" cy="160" r="7" fill="#6366f1" />
                  <text x="330" y="140" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8">SERVERS UP</text>
                  <text x="330" y="190" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7">RTO = 2 Hours</text>

                  {/* Arrow for RTO */}
                  <line x1="210" y1="160" x2="330" y2="160" stroke="#6366f1" strokeWidth="4" />

                  {/* Point 4: Operations Resumed (WRT) */}
                  <circle cx="410" cy="160" r="7" fill="#10b981" />
                  <text x="410" y="140" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8">VERIFIED</text>
                  <text x="410" y="190" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">WRT = 1 Hour</text>

                  {/* Arrow for WRT */}
                  <line x1="330" y1="160" x2="410" y2="160" stroke="#10b981" strokeWidth="4" />

                  {/* Maximum Tolerable Downtime (MTD) Bracket */}
                  <line x1="210" y1="80" x2="460" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="335" y="70" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                    MAXIMUM TOLERABLE DOWNTIME (MTD &gt;= RTO + WRT)
                  </text>

                  {/* Bottom Text */}
                  <text x="250" y="275" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Total downtime (RTO + WRT) must remain strictly within Maximum Tolerable Downtime.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: The chronological BCP continuity metrics timeline (RPO ➔ Disaster ➔ RTO ➔ WRT ➔ MTD).
              </p>
            </div>

            {/* Diagram 2: DR Site Comparison */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: DR Site Comparison Hierarchy
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Hot Site */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="130" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">HOT SITE (ACTIVE-ACTIVE)</text>
                    <text x="130" y="60" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">RTO: Seconds | RPO: 0s | Sync</text>
                  </g>

                  {/* Warm Site */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="370" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">WARM SITE (PILOT LIGHT)</text>
                    <text x="370" y="60" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7">RTO: 1-4h | RPO: 15m | Async</text>
                  </g>

                  {/* Cold Site */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="95" width="210" height="50" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="130" y="115" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">COLD SITE (FACILITY ONLY)</text>
                    <text x="130" y="130" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="7">RTO: Days/Weeks | RPO: Days</text>
                  </g>

                  {/* Immutable Cloud Vault */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="95" width="210" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="370" y="115" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">IMMUTABLE CLOUD VAULT</text>
                    <text x="370" y="130" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="7">Ransomware Proof | WORM Lock</text>
                  </g>

                  {/* Bottom Box: Quorum Consensus */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="170" width="450" height="55" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="192" fill="#c084fc" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      QUORUM CONSENSUS &amp; SPLIT-BRAIN PREVENTION
                    </text>
                    <text x="250" y="210" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      3-node witness architectures ensure only the majority partition accepts database write transactions.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Tiered architecture ensures mission-critical workloads receive instantaneous automated failover.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: The comparative disaster recovery site architectures and quorum consensus model.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: BCP &amp; DR Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads execute multi-region cloud failover in Kolkata, recover healthcare PACS in Ichapur, drill power grid continuity in Barrackpore, and build BIA calculators in Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Continuity Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied BCP/DR Solution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for Disaster Recovery Architects and CISOs building continuous business resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Continuity Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce MTD Formula:</strong> Verify that RTO + WRT is strictly less than MTD tolerance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Immutable Storage:</strong> Use S3 Object Lock Compliance Mode to defeat ransomware.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Run Live Semi-Annual Cutover Drills:</strong> Operate live production on DR sites twice a year.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Prevent Split-Brain:</strong> Deploy 3-node quorum witness consensus (Raft/Paxos).</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Continuity Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Un-Tested Plan:</strong> Writing a 200-page BCP binder but never testing live cutover.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Work Recovery Time:</strong> Assuming server spin-up means business is operational.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Co-located Backups:</strong> Keeping backups on the same VPC network that ransomware encrypts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Single Telecom Fiber:</strong> Losing both primary and DR connections in a single street dig cut.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Route 53 Health Checks:</strong> Fail over DNS traffic within 15 seconds of node loss.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Synchronous Multi-AZ DB:</strong> Guarantee RPO = 0 for all core transactional ledgers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Air-Gapped Cloud Vaults:</strong> Mirror daily backups to a separate AWS account with MFA Delete.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Run Chaos Mesh Drills:</strong> Inject automated server kills weekly to prove self-healing.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize BCP/DR metrics and disaster recovery site architectures before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Continuity Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Work Recovery Time (WRT) is just as critical as technical RTO: When a database is restored from a backup (RTO achieved), business operations cannot resume immediately. Staff must verify table integrity, replay uncommitted transactions, and reconcile pending customer balances. If RTO + WRT exceeds Maximum Tolerable Downtime (MTD), the enterprise suffers catastrophic collapse.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The strict statutory compliance mandates: The Reserve Bank of India (RBI) mandates RTO &lt;= 4 hours, RPO near zero, and semi-annual unannounced live DR switchovers for payment systems. Under Section 8(5) of the Indian DPDP Act 2023, failing to maintain technical availability safeguards that leads to permanent data loss triggers up to ₹250 Crore fines.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud architectures, combine multi-region active-active clusters with immutable WORM cloud vaults (AWS S3 Object Lock) to protect your systems against both catastrophic physical infrastructure failures and advanced ransomware attacks.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BCP covers holistic business survival; DR covers technical IT recovery.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RTO = Maximum allowable downtime; RPO = Maximum allowable data loss.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Continuity Equation: MTD &gt;= RTO + WRT (Work Recovery Time).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hot Site (Sync, RTO seconds); Warm Site (RTO 1-4h); Cold Site (RTO days).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Control A.5.30 in ISO 27001:2022 mandates ICT readiness for business continuity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RBI mandates RTO &lt;= 4h, RPO ~ 0, and semi-annual unannounced live DR drills.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Business Continuity Planning (BCP) and Disaster Recovery (DR) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Continuity Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Business Continuity Planning (BCP) and Disaster Recovery (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Business Continuity Planning (BCP) and Disaster Recovery (DR) represent the ultimate acid test of your Information Security Management System. Remember that a plan that has never been tested in production is not a plan—it is merely a wish. Master the critical continuity equation (MTD >= RTO + WRT), deploy Hot and Warm architectures with quorum consensus to eliminate split-brain corruption, and leverage immutable cloud vaults under ISO 27001 Controls A.5.30 and A.8.14 to guarantee complete enterprise survival and statutory compliance under RBI directions and the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
