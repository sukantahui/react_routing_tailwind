import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: Endpoint Posture State
  const [selectedEndpointKey, setSelectedEndpointKey] = useState("byod_mam_container");

  // Studio 2: Incident Simulator State
  const [selectedIncidentKey, setSelectedIncidentKey] = useState("lost_metro_phone");
  const [isWipeSimulating, setIsWipeSimulating] = useState(false);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_mam_ztna");

  // Studio 1: Endpoint Posture Modes Data
  const endpointModes = {
    cope_managed: {
      key: "cope_managed",
      title: "1. Corporate-Owned Personally-Enabled (COPE)",
      posture: "Full MDM Enrollment with Hardware Lockdown & Supervised Mode",
      containerStatus: "Fully Managed OS with Unified Encryption & Centralized Policy",
      wipeCapability: "Full Remote Factory Reset + Hardware Lock",
      dlpStatus: "Maximum Protection (USB, Bluetooth, and Screenshotting Blocked)",
      complianceRating: "100% High-Assurance Compliance (ISO 27001 Control A.8.1)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    byod_mam_container: {
      key: "byod_mam_container",
      title: "2. BYOD Containerized Dual-Persona (MAM)",
      posture: "Application-Level Sandbox Management (Microsoft Intune / Jamf)",
      containerStatus: "Encrypted Corporate Workspace Isolated from Personal Apps",
      wipeCapability: "Selective Enterprise Wipe (Deletes only corporate data)",
      dlpStatus: "High Protection (Clipboard blocking between Corporate & Personal)",
      complianceRating: "100% Compliant with Employee Personal Privacy Preserved",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    ztna_remote_workstation: {
      key: "ztna_remote_workstation",
      title: "3. Zero Trust Remote Workstation (ZTNA)",
      posture: "Micro-Segmented Encrypted Tunnels with Continuous Device Health Checks",
      containerStatus: "Per-Application Dynamic Tunnels (Zero Layer-3 Network Visibility)",
      wipeCapability: "Instantaneous Session Invalidation + BitLocker Remote Wipe",
      dlpStatus: "Continuous EDR Telemetry Streaming to 24/7 Security Operations Center",
      complianceRating: "100% Zero Trust Architecture Aligned (NIST SP 800-207)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    unmanaged_device: {
      key: "unmanaged_device",
      title: "4. Unmanaged Personal Device (Blocked)",
      posture: "No MDM/MAM Agent; Unknown OS Patch State; Potential Jailbreak/Root",
      containerStatus: "None (Unencrypted co-mingling of corporate and personal data)",
      wipeCapability: "Zero Remote Wipe Capability (Data Hoarded Indefinitely)",
      dlpStatus: "Zero DLP Protection (High Data Exfiltration & Malware Exposure)",
      complianceRating: "0% Non-Compliant (Access Blocked by Conditional Access)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeEndpoint = endpointModes[selectedEndpointKey];

  // Studio 2: Incident Simulator Data
  const incidentScenarios = {
    lost_metro_phone: {
      key: "lost_metro_phone",
      title: "Scenario 1: Remote Employee Loses Smartphone in Kolkata Metro",
      triggerTime: "T+0m (Loss Discovered)",
      mdmAction: "Employee reports to SOC via emergency hotline; MAM triggers Selective Enterprise Wipe in < 15 seconds.",
      dataOutcome: "Corporate Outlook, Slack, and encryption keys permanently erased; personal photos remain 100% safe.",
      statutoryShield: "Zero personal data exposure under Section 8 of DPDP Act 2023 → Immunized from ₹250 Cr fines!",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    evil_twin_wifi: {
      key: "evil_twin_wifi",
      title: "Scenario 2: Laptop Connects to Rogue 'Evil Twin' Wi-Fi in Cafe",
      triggerTime: "T+0m (Network Association)",
      mdmAction: "ZTNA client detects untrusted gateway ARP anomalies and blocks unencrypted traffic; forces mTLS tunnel.",
      dataOutcome: "Adversary packet sniffing captures only opaque TLS 1.3 ciphertext; zero credentials stolen.",
      statutoryShield: "Fulfills ISO 27001 Control A.6.7 (Remote Working) public network hardening mandate.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    rooted_android_phone: {
      key: "rooted_android_phone",
      title: "Scenario 3: User Roots Personal Android Phone to Install Custom ROM",
      triggerTime: "T+0m (Root Detection)",
      mdmAction: "MAM agent detects `/system/xbin/su` binary; instantly revokes all OAuth corporate tokens.",
      dataOutcome: "Corporate sandbox locked; user notified: 'Device non-compliant with BYOD policy.'",
      statutoryShield: "Prevents malicious apps from breaking OS sandboxes to access corporate banking APIs.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    employee_resignation: {
      key: "employee_resignation",
      title: "Scenario 4: Developer Resigns to Join Competitor (JML Offboarding)",
      triggerTime: "T+0m (HR Resignation Trigger)",
      mdmAction: "Automated Workday webhook triggers Intune Selective Wipe across all enrolled BYOD devices.",
      dataOutcome: "Corporate GitHub tokens, AWS keys, and internal documents purged within 120 seconds.",
      statutoryShield: "Eliminates orphaned accounts and insider data exfiltration risks under Control A.5.18.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeIncident = incidentScenarios[selectedIncidentKey];

  const handleSimulateWipe = () => {
    setIsWipeSimulating(true);
    setTimeout(() => {
      setIsWipeSimulating(false);
    }, 1600);
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_mam_ztna",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "MAM Containerization & ZTNA Deployment",
      budget: "₹18,50,000",
      challenge: "350 Remote Developers Accessing 500 Payment Microservices from Personal Laptops",
      dilemma:
        "350 remote developers accessed 500 payment microservices from personal laptops and phones, creating massive data co-mingling and unauthorized clipboard copy-paste risks.",
      resolution:
        "Mamata deployed Microsoft Intune MAM containerization with ZTNA micro-tunnels, blocking clipboard copy-pasting between corporate Slack and personal WhatsApp while maintaining 100% developer privacy.",
      metrics: {
        devicesGoverned: "350 BYOD Endpoints",
        ztnaLatency: "8ms Micro-Tunnels",
        dlpBlocksEnforced: "100% Clipboard Blocked",
        compliance: "ISO 27001 Controls A.6.7, A.8.1 & RBI"
      }
    },
    {
      id: "ichapur_tablet_wipe",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Tablet Encryption & Selective Wipe",
      budget: "₹8,20,000",
      challenge: "Doctor Lost Personal iPad Containing 80,000 Cached Oncology Patient Scans",
      dilemma:
        "A visiting oncologist lost their personal iPad containing cached oncology diagnostic scans on the Kolkata local train, risking massive personal health data exposure under the DPDP Act 2023.",
      resolution:
        "Mahima triggered an automated MAM selective wipe within 8 minutes, destroying the corporate medical container while leaving personal family photos intact, averting DPDP Act reporting violations.",
      metrics: {
        wipeExecutionSpeed: "8 Minutes (SLA: 60m)",
        scansSafeguarded: "80,000 Patient Scans",
        personalDataSaved: "100% Family Photos Intact",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_zero_byod",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Air-Gapped Zero-BYOD Enforcement",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Strict Zero-BYOD to Prevent OT Malware Ingress",
      dilemma:
        "18 high-voltage 220kV transmission substations required strict zero-BYOD policies to prevent Stuxnet-style malware ingress via personal smartphones and USB cables.",
      resolution:
        "Debangshu enforced zero personal device connectivity to SCADA consoles, deployed physical Faraday pouches, and mandated dedicated corporate-hardened field laptops under NCIIPC guidelines (IT Act Section 70).",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        byodPermitted: "0 Personal Devices",
        powerGridUptime: "100.000% Continuous Power",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_byod_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "BYOD Containerization & Remote Work Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand ZTNA Micro-Tunnels vs Legacy Full VPNs",
      dilemma:
        "Cybersecurity students struggled to understand how ZTNA differs from full-tunnel VPNs and how MAM dual-persona sandboxes protect employee privacy during remote wipe drills.",
      resolution:
        "The team developed an interactive BYOD Containerization Simulator and Remote Work Policy Checker in React, training 215+ BCA cyber security students on mobile endpoint security architecture.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        byodSimulationsRun: "90+ Containerization Drills",
        examMastery: "100% Endpoint Governance Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 3 of 14
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            BYOD (Bring Your Own Device) and Remote Work Policies
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Secure decentralized workforces and mobile endpoints: master BYOD dual-persona containerization (ISO/IEC 27001 Controls A.6.7 &amp; A.8.1), 
            deploy Zero Trust Network Access (ZTNA), execute selective enterprise wipes, and ensure statutory Safe Harbor under Section 43A of the Indian IT Act and the DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive BYOD Dual-Persona Containerization & MDM Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📱</span> Studio 1: BYOD Dual-Persona Containerization &amp; MDM Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a mobile endpoint posture to inspect management scope, corporate container isolation, remote wipe capabilities, and compliance ratings.
            </p>
          </div>

          {/* Endpoint Mode Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(endpointModes).map((m) => {
              const isSelected = selectedEndpointKey === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setSelectedEndpointKey(m.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{m.title.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{m.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Endpoint Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeEndpoint.badgeClass)}>
                  {activeEndpoint.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Posture: {activeEndpoint.posture.split(" (")[0]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Remote Wipe Mode</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeEndpoint.wipeCapability.split(" (")[0]}</span>
              </div>
            </div>

            {/* Container Status & DLP Protection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Corporate Container Isolation:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeEndpoint.containerStatus}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Data Leakage Protection (DLP):</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeEndpoint.dlpStatus}</p>
              </div>
            </div>

            {/* Compliance Rating */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Compliance &amp; Privacy Rating:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeEndpoint.complianceRating}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Remote Work Endpoint Breach & Selective Wipe Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🚨</span> Studio 2: Remote Endpoint Incident &amp; Selective Wipe Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an incident scenario to observe automated MDM responses, selective remote wipe executions, and statutory DPDP compliance outcomes.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(incidentScenarios).map((inc) => {
              const isSelected = selectedIncidentKey === inc.key;
              return (
                <button
                  key={inc.key}
                  onClick={() => setSelectedIncidentKey(inc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{inc.title.split(": ")[1]?.split(" ")[0]} {inc.title.split(": ")[1]?.split(" ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{inc.title.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Incident Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeIncident.badgeClass)}>
                  {activeIncident.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Timeline: {activeIncident.triggerTime}
                </h3>
              </div>
              <div>
                <button
                  onClick={handleSimulateWipe}
                  disabled={isWipeSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-950/50 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isWipeSimulating ? "⚡" : "🔥"}</span>
                  <span>{isWipeSimulating ? "Executing Selective Wipe..." : "Trigger Selective Wipe Drill"}</span>
                </button>
              </div>
            </div>

            {/* MDM Action & Data Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/30 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Automated MDM / ZTNA Response:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeIncident.mdmAction}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Endpoint Data Outcome:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeIncident.dataOutcome}</p>
              </div>
            </div>

            {/* Statutory Shield */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-purple-900/30 text-xs font-mono">
              <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Statutory Legal Safe Harbor:</span>
              <p className="text-purple-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeIncident.statutoryShield}</p>
            </div>

            {/* Drill Output Notification */}
            {isWipeSimulating && (
              <div className="p-4 bg-emerald-950 border border-emerald-600 text-emerald-200 rounded-xl text-xs font-mono animate-pulse">
                ✔ Selective Enterprise Wipe Executed: Corporate sandbox deleted from target endpoint in 6.4s; personal photos, contacts, and personal WhatsApp remain 100% UNTOUCHED!
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
              Visualizing the BYOD Dual-Persona Containerization Architecture and the Remote Work Zero Trust Network Access (ZTNA) Security Flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Dual Persona Container */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: BYOD Dual-Persona Containerization
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Physical Smartphone Outer Shell */}
                  <rect x="25" y="20" width="450" height="230" rx="10" fill="#18181b" stroke="#6366f1" strokeWidth="2" />
                  <text x="250" y="42" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                    EMPLOYEE PERSONAL SMARTPHONE (BYOD ENROLLMENT)
                  </text>

                  {/* Left Side: Personal Sandbox */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="45" y="60" width="190" height="130" rx="6" fill="#083344" stroke="#06b6d4" />
                    <text x="140" y="80" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">PERSONAL SANDBOX</text>
                    <text x="140" y="100" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Personal Photos &amp; Videos</text>
                    <text x="140" y="120" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">WhatsApp &amp; Social Apps</text>
                    <text x="140" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Personal Gmail &amp; Banking</text>
                    <text x="140" y="165" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">100% UNMONITORED PRIVACY</text>
                  </g>

                  {/* Middle Barrier */}
                  <line x1="250" y1="60" x2="250" y2="190" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="250" y="130" fill="#f87171" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="6.5">
                    ENCRYPTED DLP BOUNDARY
                  </text>

                  {/* Right Side: Corporate Sandbox */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="60" width="190" height="130" rx="6" fill="#581c87" stroke="#a855f7" />
                    <text x="360" y="80" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">CORPORATE SANDBOX (MAM)</text>
                    <text x="360" y="100" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7">Enterprise Outlook Email</text>
                    <text x="360" y="120" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7">Corporate Teams / Slack</text>
                    <text x="360" y="140" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7">Internal VPN / CRM</text>
                    <text x="360" y="165" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">SELECTIVE WIPE CAPABLE</text>
                  </g>

                  {/* Bottom Text */}
                  <text x="250" y="275" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Dual-persona containerization isolates corporate data while preserving employee privacy.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: The BYOD dual-persona containerization model (Personal vs Corporate Sandboxes).
              </p>
            </div>

            {/* Diagram 2: ZTNA Flow */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Zero Trust Network Access (ZTNA) Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Remote Device */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="135" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="50" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. REMOTE ENDPOINT</text>
                    <text x="87" y="65" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">EDR + Health Check</text>
                  </g>

                  <line x1="155" y1="55" x2="185" y2="55" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan64)" />

                  {/* Step 2: ZTNA Identity Controller */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="30" width="130" height="50" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="250" y="50" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">2. ZTNA CONTROLLER</text>
                    <text x="250" y="65" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Verify Identity + Posture</text>
                  </g>

                  <line x1="315" y1="55" x2="340" y2="55" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple64)" />

                  {/* Step 3: Application Micro-tunnel */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="30" width="140" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="410" y="50" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">3. AUTHORIZED APP</text>
                    <text x="410" y="65" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Direct Micro-Tunnel Only</text>
                  </g>

                  {/* Bottom Box: No Lateral Movement */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="147" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      ZERO LATERAL MOVEMENT / NO NETWORK-LEVEL VISIBILITY
                    </text>
                    <text x="250" y="165" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Remote laptop connects exclusively to authorized application; entire internal subnet remains invisible.
                    </text>
                  </g>

                  <text x="250" y="225" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    ZTNA isolates applications and eliminates the lateral movement risks of legacy VPNs.
                  </text>

                  <defs>
                    <marker id="arrowCyan64" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowPurple64" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: The Zero Trust Network Access (ZTNA) micro-tunneling architecture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: BYOD &amp; Remote Work Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads deploy MAM in Kolkata, execute remote wipes in Ichapur, enforce zero-BYOD in Barrackpore, and simulate mobile posture in Jadavpur.
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
                  <span>⚡</span> Remote Work Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Solution
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
              Guidelines for Mobile Endpoint Architects and CISOs securing remote work environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Endpoint Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use MAM for BYOD:</strong> Protect employee privacy by managing only the corporate container.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy ZTNA over VPN:</strong> Eliminate lateral movement by creating micro-segmented per-app connections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 60-Minute Lost Device SLA:</strong> Wipe corporate tokens remotely within 1 hour of reported loss.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Mandate Polarized Privacy Filters:</strong> Defeat shoulder surfing visual eavesdropping in public places.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Mobile Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Full MDM Wipe on BYOD:</strong> Triggers employee lawsuits over erased personal family photos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Permitting Rooted Devices:</strong> Allows malware to break OS sandboxes and steal credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Full-Tunnel VPNs:</strong> Allows malware on home PCs to spread across entire corporate networks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Home Wi-Fi:</strong> Leaving default router passwords active on employee home gateways.</span>
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
                  <span><strong>Block Rooted Devices:</strong> Auto-quarantine any phone with modified kernel binaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Lock Screens at 3 Minutes:</strong> Enforce automated screensaver lock via Microsoft Intune.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day SIEM Logs:</strong> Preserve remote EDR telemetry under IT Act Section 70B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Full Disk BitLocker:</strong> Protect lost laptop storage under Section 8 of DPDP Act 2023.</span>
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
              Synthesize BYOD containerization mechanics and ZTNA remote access before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Endpoint Security Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Zero Trust Network Access (ZTNA) is vastly superior to legacy full-tunnel VPNs for remote work: A traditional VPN grants broad Layer-3 access to the entire internal subnet upon login. If a remote worker's laptop is infected with ransomware, the malware can scan and encrypt every server on the corporate network. ZTNA grants access exclusively to the specific application authorized, completely preventing lateral movement.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Selective Enterprise Wipe preserves employee privacy while ensuring compliance under the Indian DPDP Act 2023: Executing a full factory reset on a BYOD device destroys personal family photos, exposing the company to employee civil lawsuits. A selective wipe deletes only the encrypted corporate sandbox, neutralizing business data exposure without touching personal files.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise BYOD architectures, combine automated MAM dual-persona sandboxes with strict anti-root detection and full disk encryption (BitLocker / FileVault) to ensure complete endpoint compliance under ISO/IEC 27001 Controls A.6.7 and A.8.1.
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
                <span>ISO 27001 Control A.6.7 governs Remote Work; Control A.8.1 governs Endpoints.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MAM (Mobile App Management) isolates corporate data in an encrypted sandbox.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Selective Wipe remotely deletes only corporate data, preserving personal files.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Zero Trust Network Access (ZTNA) grants per-app access, replacing broad VPN subnets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Jailbroken or rooted devices must be automatically blocked and quarantined.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 enforces mobile encryption to prevent ₹250 Crore fines.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="BYOD and Remote Work Policies FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Endpoint Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="BYOD and Remote Work Policies (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Remote Work and BYOD have permanently reshaped the modern cybersecurity landscape. Always remember: you cannot secure what you cannot isolate. Enforce Mobile Application Management (MAM) dual-persona containerization to protect enterprise data while respecting employee personal privacy, replace legacy full-tunnel VPNs with Zero Trust Network Access (ZTNA) to eliminate lateral movement, and deploy automated selective remote wipe capabilities to ensure complete statutory compliance under Section 8 of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
