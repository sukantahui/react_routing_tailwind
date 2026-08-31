import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgLifecycleId = useId();
  const svgTimelineId = useId();

  // Studio 1: NIST 6-Phase IR Lifecycle State
  const [activeIrPhaseIndex, setActiveIrPhaseIndex] = useState(0);

  // Studio 2: Forensic Super-Timeline & MACB Timestomp State
  const [selectedTimelineArtifact, setSelectedTimelineArtifact] = useState("all");
  const [showTimestompAnomaly, setShowTimestompAnomaly] = useState(false);

  // Studio 3: 5-Whys Root Cause Analysis State
  const [selectedIncidentRcaScenario, setSelectedIncidentRcaScenario] = useState("equifax_struts");

  // Studio 4: Regional CSIRT War Game Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("war_game_scenario");

  // 6 Phases Data for Studio 1
  const irPhases = [
    {
      title: "1. Preparation",
      badge: "PROACTIVE FOUNDATION",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      actions: [
        "Deploy EDR sensors & configure centralized immutable SIEM forwarding",
        "Establish pre-approved Incident Response Playbooks & Call Trees",
        "Set up secure Out-of-Band War Rooms (Encrypted Signal / non-domain phones)",
        "Conduct quarterly Red vs Blue table-top simulation exercises"
      ],
      deliverable: "Approved Incident Response Plan (IRP) & Pre-configured Forensic Toolkits"
    },
    {
      title: "2. Identification",
      badge: "DETECTION & TRIAGE",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      actions: [
        "Correlate EDR process trees and anomalous network NetFlow spikes",
        "Define breach scope: Identify patient zero and affected subnets",
        "Enrich Indicators of Compromise (IOCs) with threat intelligence",
        "Classify incident severity (P1-Critical to P4-Low) & start regulatory clocks"
      ],
      deliverable: "Initial Scope Assessment Document & Incident Severity Declaration"
    },
    {
      title: "3. Containment",
      badge: "BLAST RADIUS LIMIT",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      actions: [
        "Short-Term: Isolate infected hosts via EDR API; disable compromised user accounts",
        "Long-Term: Capture volatile RAM memory dumps (WinPmem) and disk images (FTK)",
        "Apply Kubernetes NetworkPolicies & drop lateral switch ports",
        "Redirect attacker C2 DNS lookups to sinkholes / honey-proxies"
      ],
      deliverable: "Preserved Forensic Bit-Stream Evidence & Host Isolation Confirmation"
    },
    {
      title: "4. Eradication",
      badge: "ROOT & PERSISTENCE PURGE",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      actions: [
        "Purge dropped malware binaries, malicious drivers, and JSP web shells",
        "Delete malicious Scheduled Tasks, Registry Run keys, and WMI Subscriptions",
        "Perform Active Directory KRBTGT master password double-reset",
        "Revoke and regenerate compromised SSL/TLS and ADFS signing certificates"
      ],
      deliverable: "Zero Adversary Footprint Verification & Clean Environment Audit"
    },
    {
      title: "5. Recovery",
      badge: "SAFE RESTORATION",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      actions: [
        "Restore golden OS images from clean offline immutable backups",
        "Stage workloads in isolated quarantine VLANs before production reconnection",
        "Apply all missing patches & enforce universal FIDO2 Hardware MFA",
        "Maintain 24/7 heightened SOC surveillance & aggressive EDR monitoring"
      ],
      deliverable: "Restored Business Operations with Clean Telemetry Sign-off"
    },
    {
      title: "6. Lessons Learned",
      badge: "POST-MORTEM EVOLUTION",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      actions: [
        "Conduct Blameless Post-Mortem review with engineering & executive leadership",
        "Perform 5-Whys Root Cause Analysis (RCA) and Fishbone diagrams",
        "Identify policy, training, and architecture blind spots",
        "Convert recommendations into tracked Jira engineering deliverables with SLAs"
      ],
      deliverable: "Published Blameless Post-Mortem Report & Tracked Jira Roadmap"
    }
  ];

  // Studio 2: Forensic Super-Timeline Sample Records
  const superTimelineRecords = [
    {
      id: 1,
      timestamp: "2026-08-23 02:14:10.104 UTC",
      source: "Web Application Log",
      type: "Ingress",
      description: "POST /acis/upload.action - Malformed Content-Type containing OGNL expression received from 118.193.x.x",
      macb: "....",
      isSuspicious: true
    },
    {
      id: 2,
      timestamp: "2026-08-23 02:14:11.892 UTC",
      source: "Windows Event ID 4688",
      type: "Execution",
      description: "tomcat.exe spawned cmd.exe → /c whoami (uid=1001 tomcat)",
      macb: "....",
      isSuspicious: true
    },
    {
      id: 3,
      timestamp: "2026-08-23 02:15:30.450 UTC",
      source: "NTFS $MFT ($STANDARD_INFO)",
      type: "Persistence",
      description: "File Created: C:\\webapps\\ROOT\\logo.jsp (Size: 68 bytes). Timestamp forged to 2018-05-10!",
      macb: "M.C.",
      isTimestomped: true,
      isSuspicious: true
    },
    {
      id: 4,
      timestamp: "2026-08-23 02:18:02.110 UTC",
      source: "PowerShell Script Block 4104",
      type: "Credential Dumping",
      description: "De-obfuscated Script: Invoke-Mimikatz -DumpCreds executed in memory",
      macb: "....",
      isSuspicious: true
    },
    {
      id: 5,
      timestamp: "2026-08-23 02:26:44.900 UTC",
      source: "DNS Resolver Telemetry",
      type: "C2 Beacon",
      description: "Query: 04a29fb4890c12.appsync-api.eu-west-1.avsvmcloud.com → CNAME returned",
      macb: "....",
      isSuspicious: true
    },
    {
      id: 6,
      timestamp: "2026-08-23 02:35:10.000 UTC",
      source: "EDR Network Sensor",
      type: "Containment Action",
      description: "SOC Analyst Mamata initiated Automated Host Network Isolation via EDR API",
      macb: "....",
      isSuspicious: false
    }
  ];

  // Studio 3: 5-Whys Scenarios
  const rcaScenarios = {
    equifax_struts: {
      title: "Equifax 2017 Apache Struts Breach",
      rootCause: "Lack of executive DevSecOps governance, automated SBOM visibility, and certificate management.",
      whys: [
        "1. Why was consumer PII stolen? → The online dispute web portal was compromised via RCE.",
        "2. Why was the server vulnerable? → Apache Struts CVE-2017-5638 was unpatched for 76 days.",
        "3. Why was the patch not applied? → The dispute application team was never notified of the vulnerability.",
        "4. Why was notice not received? → Equifax lacked a centralized Software Bill of Materials (SBOM) tracking nested libraries.",
        "5. Why was there no SBOM inventory? → ROOT CAUSE: Lack of executive DevSecOps governance, automated CI/CD dependency scanning, and certificate lifecycle tracking!"
      ]
    },
    colonial_pipeline: {
      title: "Colonial Pipeline 2021 Ransomware Crisis",
      rootCause: "Failure of identity lifecycle governance (orphaned VPN) and lack of operational IT/OT decoupling.",
      whys: [
        "1. Why was the physical pipeline halted? → Management could not operate without the corporate billing software.",
        "2. Why was billing software offline? → DarkSide ransomware encrypted the corporate IT network.",
        "3. How did DarkSide enter the network? → Single-factor authentication was breached on a legacy VPN gateway.",
        "4. Why was single-factor permitted? → The VPN profile belonged to a dormant account created without mandatory MFA.",
        "5. Why was the dormant account active? → ROOT CAUSE: Failure of identity lifecycle governance (no automated 30-day purge) and lack of autonomous SCADA islanding buffering!"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 10</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              Incident Response Timeline & Post-Mortem Analysis
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Mastering the 6-phase NIST SP 800-61 Incident Response lifecycle: How forensic super-timelines, volatile memory analysis, the 5 Whys Root Cause Analysis, and blameless post-mortems transform catastrophic breaches into enduring organizational resilience.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">NIST SP 800-61 Rev 2 Lifecycle</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Forensic Super-Timelines & MACB</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">5 Whys Root Cause Analysis</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">CERT-In 6-Hour Regulatory Clock</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL CIRCULAR IR LIFECYCLE & REGULATORY TIMELINE INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">01.</span> The Continuous Incident Response & Post-Mortem Cycle
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing the six circular phases of NIST SP 800-61 and critical regulatory notification countdown clocks.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950/60 border border-purple-800 text-purple-300 text-xs font-mono">
              NIST SP 800-61 Lifecycle
            </span>
          </div>

          {/* SVG INFOGRAPHIC: 6-Phase Circular Lifecycle */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              The 6-Phase Continuous Incident Response Lifecycle & Statutory Reporting Clocks
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgLifecycleId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4c1d95" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Phase 1: Preparation */}
                <rect x="20" y="25" width="130" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="85" y="50" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">1. PREPARATION</text>
                <text x="85" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Playbooks & EDR</text>
                <text x="85" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Out-of-band comms</text>
                <text x="85" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Call trees ready</text>
                <rect x="30" y="150" width="110" height="26" rx="6" fill="#1e3a8a" />
                <text x="85" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">Baseline Readiness</text>

                {/* Arrow 1 */}
                <line x1="150" y1="110" x2="165" y2="110" stroke="#3b82f6" strokeWidth="2" />

                {/* Phase 2: Identification */}
                <rect x="165" y="25" width="130" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="230" y="50" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">2. IDENTIFICATION</text>
                <text x="230" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Threat detection</text>
                <text x="230" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Severity triage</text>
                <text x="230" y="115" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">6-Hr CERT-In Clock!</text>
                <rect x="175" y="150" width="110" height="26" rx="6" fill="#78350f" />
                <text x="230" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Scope Declared</text>

                {/* Arrow 2 */}
                <line x1="295" y1="110" x2="310" y2="110" stroke="#f59e0b" strokeWidth="2" />

                {/* Phase 3: Containment */}
                <rect x="310" y="25" width="130" height="175" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="375" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="bold">3. CONTAINMENT</text>
                <text x="375" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• EDR Host Isolation</text>
                <text x="375" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• RAM Dump (WinPmem)</text>
                <text x="375" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• C2 Sinkholing</text>
                <rect x="320" y="150" width="110" height="26" rx="6" fill="#581c87" />
                <text x="375" y="167" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Blast Contained</text>

                {/* Arrow 3 */}
                <line x1="440" y1="110" x2="455" y2="110" stroke="#a855f7" strokeWidth="2" />

                {/* Phase 4: Eradication */}
                <rect x="455" y="25" width="130" height="175" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="520" y="50" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">4. ERADICATION</text>
                <text x="520" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Delete JSP shells</text>
                <text x="520" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Reset KRBTGT x2</text>
                <text x="520" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Purge persistence</text>
                <rect x="465" y="150" width="110" height="26" rx="6" fill="#7f1d1d" />
                <text x="520" y="167" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">Footholds Cleared</text>

                {/* Arrow 4 */}
                <line x1="585" y1="110" x2="600" y2="110" stroke="#ef4444" strokeWidth="2" />

                {/* Phase 5: Recovery */}
                <rect x="600" y="25" width="130" height="175" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="665" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">5. RECOVERY</text>
                <text x="665" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Staged VLAN rebuild</text>
                <text x="665" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Apply patches</text>
                <text x="665" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Enforce FIDO2 MFA</text>
                <rect x="610" y="150" width="110" height="26" rx="6" fill="#065f46" />
                <text x="665" y="167" textAnchor="middle" fill="#d1fae5" fontSize="9" fontWeight="bold">Clean Re-entry</text>

                {/* Arrow 5 */}
                <line x1="730" y1="110" x2="745" y2="110" stroke="#10b981" strokeWidth="2" />

                {/* Phase 6: Lessons Learned */}
                <rect x="745" y="25" width="135" height="175" rx="10" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                <text x="812" y="50" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">6. LESSONS LEARNED</text>
                <text x="812" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• 5 Whys Root Cause</text>
                <text x="812" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Blameless review</text>
                <text x="812" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Track Jira roadmap</text>
                <rect x="755" y="150" width="115" height="26" rx="6" fill="#312e81" />
                <text x="812" y="167" textAnchor="middle" fill="#e0e7ff" fontSize="9" fontWeight="bold">Feeds Phase 1</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE NIST 6-PHASE IR LIFECYCLE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">02.</span> Studio 1: Interactive NIST 6-Phase Incident Response Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Step through each operational phase of an active cyber investigation, inspecting mandatory technical actions and governance deliverables.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              IR Lifecycle Lab
            </span>
          </div>

          {/* Phase Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {irPhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIrPhaseIndex(idx)}
                className={clsx(
                  "p-2.5 rounded-xl border text-center transition-all text-xs font-bold",
                  activeIrPhaseIndex === idx
                    ? "bg-purple-950/70 border-purple-500 text-white ring-2 ring-purple-500 shadow-lg"
                    : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
                )}
              >
                {phase.title}
              </button>
            ))}
          </div>

          {/* Active Phase Deep-Dive Card */}
          {(() => {
            const activePhase = irPhases[activeIrPhaseIndex];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{activePhase.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Core Operational Phase Objectives & Technical Mandates</p>
                  </div>
                  <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", activePhase.badgeColor)}>
                    {activePhase.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="font-bold text-white uppercase tracking-wider block">
                      Mandatory Technical Actions:
                    </span>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                      {activePhase.actions.map((act, i) => (
                        <li key={i} className="leading-relaxed">{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-purple-300 uppercase tracking-wider block">
                        Phase Milestone & Deliverable:
                      </span>
                      <p className="text-gray-300 text-sm mt-1 font-semibold">{activePhase.deliverable}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setActiveIrPhaseIndex((prev) => (prev > 0 ? prev - 1 : 5))}
                        className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-bold"
                      >
                        ← Previous Phase
                      </button>
                      <button
                        onClick={() => setActiveIrPhaseIndex((prev) => (prev < 5 ? prev + 1 : 0))}
                        className="px-3 py-1.5 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                      >
                        Next Phase →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 2: FORENSIC SUPER-TIMELINE RECONSTRUCTION & MACB TIMESTOMPING LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">03.</span> Studio 2: Forensic Super-Timeline & MACB Timestomp Detector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Reconstruct attacker actions from Plaso / log2timeline super-timelines and inspect how MACB timestamps detect malicious timestomping evasion.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Super-Timeline Lab
            </span>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs">
            <span className="text-gray-400 font-semibold">
              Super-Timeline View: <span className="font-mono text-purple-300">Plaso Unified Case Log</span>
            </span>
            <button
              onClick={() => setShowTimestompAnomaly(!showTimestompAnomaly)}
              className={clsx(
                "px-3 py-1.5 rounded font-bold transition-all text-xs",
                showTimestompAnomaly ? "bg-amber-600 text-white" : "bg-slate-800 text-gray-300"
              )}
            >
              {showTimestompAnomaly ? "🕵️ Timestomp Anomaly Filter ACTIVE" : "Show All Events"}
            </button>
          </div>

          {/* Timeline Table */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-gray-400">
                  <th className="py-2 px-3">Timestamp (UTC)</th>
                  <th className="py-2 px-3">Artifact Source</th>
                  <th className="py-2 px-3">MACB</th>
                  <th className="py-2 px-3">Action Description</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {superTimelineRecords
                  .filter((rec) => (!showTimestompAnomaly ? true : rec.isTimestomped))
                  .map((rec) => (
                    <tr key={rec.id} className={clsx("hover:bg-slate-900/60 transition-all", rec.isTimestomped ? "bg-amber-950/30" : "")}>
                      <td className="py-2.5 px-3 text-gray-400 whitespace-nowrap">{rec.timestamp}</td>
                      <td className="py-2.5 px-3 text-purple-300 font-semibold">{rec.source}</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">{rec.macb}</td>
                      <td className="py-2.5 px-3 text-gray-200">{rec.description}</td>
                      <td className="py-2.5 px-3">
                        {rec.isTimestomped ? (
                          <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 text-[10px] font-bold">
                            TIMESTOMPED
                          </span>
                        ) : rec.isSuspicious ? (
                          <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 text-[10px] font-bold">
                            MALICIOUS
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-bold">
                            CONTAINED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* STUDIO 3: 5-WHYS ROOT CAUSE ANALYSIS & BLAMELESS POST-MORTEM LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">04.</span> Studio 3: 5-Whys Root Cause Analysis (RCA) Generator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore how the 5-Whys methodology drills past superficial symptoms to expose systemic architectural and governance root causes.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono self-start sm:self-auto">
              RCA Generator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario Selector */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Select Landmark Case Study Post-Mortem:
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedIncidentRcaScenario("equifax_struts")}
                  className={clsx(
                    "w-full p-3 rounded-lg border text-left font-bold transition-all text-xs flex justify-between items-center",
                    selectedIncidentRcaScenario === "equifax_struts"
                      ? "bg-purple-950/70 border-purple-500 text-purple-200 ring-2 ring-purple-500"
                      : "bg-slate-900 border-slate-800 text-gray-400"
                  )}
                >
                  <span>1. Equifax 2017 Apache Struts RCE Breach</span>
                  <span>🔍</span>
                </button>

                <button
                  onClick={() => setSelectedIncidentRcaScenario("colonial_pipeline")}
                  className={clsx(
                    "w-full p-3 rounded-lg border text-left font-bold transition-all text-xs flex justify-between items-center",
                    selectedIncidentRcaScenario === "colonial_pipeline"
                      ? "bg-purple-950/70 border-purple-500 text-purple-200 ring-2 ring-purple-500"
                      : "bg-slate-900 border-slate-800 text-gray-400"
                  )}
                >
                  <span>2. Colonial Pipeline 2021 Ransomware Crisis</span>
                  <span>🔍</span>
                </button>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Blameless Post-Mortem Rule:</span>
                <p className="text-gray-400 text-[11px] font-sans">
                  "Never blame human error. Investigate why technical systems allowed single-point human mistakes to cause catastrophic damage."
                </p>
              </div>
            </div>

            {/* Generated 5 Whys Output */}
            {(() => {
              const activeRca = rcaScenarios[selectedIncidentRcaScenario];
              return (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      5-Whys Iterative Breakdown: {activeRca.title}
                    </h3>

                    <div className="space-y-2 text-xs font-sans">
                      {activeRca.whys.map((why, i) => (
                        <div key={i} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-gray-300">
                          {why}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-purple-200 space-y-1">
                    <span className="font-bold uppercase tracking-wider block text-purple-300">
                      Systemic Root Cause Finding:
                    </span>
                    <p className="font-semibold text-white">{activeRca.rootCause}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* STUDIO 4: REGIONAL CSIRT WAR GAME TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">05.</span> Studio 4: Regional CSIRT Incident War Game Tabletop
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative incident execution: Mamata, Mahima, Abhronila, Susmita, and Debangshu execute a live ransomware containment drill across Kolkata, Barrackpore, Ichapur, and Jadavpur.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              CSIRT War Game
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full font-medium">
                Lead Incident Commander: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (Timeline & Forensic Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Network Containment Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter & Volatility)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Post-Mortem & Comms Lead)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Eradication & Identity Recovery)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("war_game_scenario")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "war_game_scenario"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Live CSIRT War Game Execution
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("cert_in_clock")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "cert_in_clock"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. CERT-In 6-Hour Statutory Compliance
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "war_game_scenario" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-purple-400">Real-Time CSIRT Actions in Barrackpore & Kolkata:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Detection in 14 Minutes (Abhronila):</span> Correlated Event ID 4104 script blocks and captured live RAM dump with WinPmem before machine shutdown.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Automated EDR Isolation (Mahima):</span> Blocked lateral SMBv1/v2 traffic, confining the infection strictly to a single staging VM in Ichapur.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Double KRBTGT Password Reset (Debangshu):</span> Invalidated all Kerberos tickets across domain controllers, killing adversary lateral persistence.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Statutory Regulatory Compliance (Susmita & Sukanta Hui):</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">CERT-In 6-Hour Mandate:</span> Incident report transmitted to CERT-In Incident Response Desk within 2 hours and 15 minutes of initial alert.
                    </li>
                    <li>
                      <span className="font-semibold text-white">DPDP Act 2023 Compliance:</span> Verified zero citizen PII was exfiltrated; logged forensic chain of custody in secure evidence vault.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Jira Remediation Tracking:</span> Generated 5 Jira engineering tickets to mandate FIDO2 hardware MFA and automated 24-hr KEV patching.
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
            title="Incident Response Timeline & Post-Mortem Analysis FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Incident Response Timeline & Post-Mortem Analysis (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
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

export default Topic10;
