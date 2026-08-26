import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: IR Lifecycle Phase State
  const [selectedIrStageKey, setSelectedIrStageKey] = useState("containment_stage");

  // Studio 2: Severity Matrix State
  const [selectedSeverityKey, setSelectedSeverityKey] = useState("p1_critical");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_cert_in_response");

  // Studio 1: 4 Incident Response Stages Data
  const irStages = {
    preparation_stage: {
      key: "preparation_stage",
      name: "1. Preparation Phase",
      focus: "Readiness, Playbooks & Tooling",
      actions:
        "Establish CSIRT roles; maintain pre-verified out-of-band Signal war rooms; deploy SIEM/SOAR automated telemetry rules; prepare write-blocked forensic jump boxes and live memory capture scripts (LiME/DumpIt).",
      deliverables: "Incident Response Playbooks, CSIRT Contact Tree, Out-of-Band War Room Channels, Pre-Authorized Isolation Powers.",
      criticalPitfall: "Relying on corporate email or Slack during an active breach, allowing attackers to monitor response countermeasures.",
      statuteAlignment: "ISO/IEC 27001 Control A.5.24 & CERT-In 24/7 Contact Point Mandate",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    detection_stage: {
      key: "detection_stage",
      name: "2. Detection & Analysis Phase",
      focus: "Triage, IOC Correlation & Severity Scoring",
      actions:
        "Correlate SIEM/UEBA telemetry; match Indicators of Compromise (IOCs) against threat intel feeds; distinguish benign events from genuine incidents; assign severity level (P1 to P4); establish technical MTTD.",
      deliverables: "Initial Incident Triage Report, Correlated IOC Manifest, Severity Level Classification (P1-P4).",
      criticalPitfall: "Alert fatigue causing Tier 1 analysts to ignore critical P1 ransomware IOCs.",
      statuteAlignment: "ISO 27001 Control A.5.25 & CERT-In Threat Advisory Ingestion",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    containment_stage: {
      key: "containment_stage",
      name: "3. Containment, Eradication & Recovery",
      focus: "Halting Bleeding, Evidence Preservation & Restores",
      actions:
        "Capture volatile RAM memory before power-down; disconnect network cables (soft isolation); revoke compromised user tokens; eradicate malware backdoors; restore clean immutable backups; verify system integrity.",
      deliverables: "Volatile Memory Image (.raw), SHA-256 Hash Manifest, System Re-commissioning Checklist, Restored Clean Nodes.",
      criticalPitfall: "Immediately rebooting or pulling the power plug, permanently destroying all volatile forensic RAM evidence!",
      statuteAlignment: "ISO 27001 Control A.5.26 & Section 65B Evidence Act Admissibility",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    post_incident_stage: {
      key: "post_incident_stage",
      name: "4. Post-Incident Activity & Lessons Learned",
      focus: "5-Whys RCA, CAPA Remediation & Evidence Retention",
      actions:
        "Conduct a blameless post-mortem; perform 5-Whys Root Cause Analysis; author Corrective and Preventive Action (CAPA) plans; update defense baselines and SOAR playbooks; issue signed Section 65B Certificates.",
      deliverables: "Comprehensive Root Cause Analysis (RCA) Report, Closed CAPA Remediation Tickets, Signed Section 65B Certificate.",
      criticalPitfall: "Punishing individual employees rather than fixing the systemic architectural flaws that allowed the incident.",
      statuteAlignment: "ISO 27001 Control A.5.27 & DPDP Act Section 8(6) Remediation Compliance",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeIrStage = irStages[selectedIrStageKey];

  // Studio 2: Severity Levels Data
  const severityLevels = {
    p1_critical: {
      key: "p1_critical",
      title: "P1 CRITICAL (Active Enterprise Breach / Outage)",
      examples: "Active ransomware outbreak, core UPI payment switch down, or customer PII database leaking online.",
      mttdTarget: "MTTD < 5 Minutes",
      mttrTarget: "MTTR < 45 Minutes",
      escalationPath: "War Room convened in 15 mins ➔ CISO & CEO alerted ➔ CERT-In notified in < 6h ➔ DPBI notified.",
      certInTimeline: "MANDATORY: Submit report to incident@cert-in.org.in within 6 HOURS of discovery!",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    p2_high: {
      key: "p2_high",
      title: "P2 HIGH (Critical Server Compromised - No Leak)",
      examples: "Single database server root compromise, privileged credential dump found online, or secondary API offline.",
      mttdTarget: "MTTD < 15 Minutes",
      mttrTarget: "MTTR < 2 Hours",
      escalationPath: "Tier 3 Forensic Specialist assigned ➔ CISO alerted ➔ Containment within 1 hour.",
      certInTimeline: "Reported to CERT-In within 6 hours if unauthorized access to IT systems occurred.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    p3_medium: {
      key: "p3_medium",
      title: "P3 MEDIUM (Isolated Phishing / Malware Blocked)",
      examples: "Employee reports spear-phishing email, single workstation EDR blocks commodity Trojan.",
      mttdTarget: "MTTD < 1 Hour",
      mttrTarget: "MTTR < 4 Hours",
      escalationPath: "Tier 2 SOC Analyst assigned ➔ Host quarantined ➔ Threat hunting across remaining nodes.",
      certInTimeline: "Internal logging and routine periodic CERT-In vulnerability summary report.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    p4_low: {
      key: "p4_low",
      title: "P4 LOW (Minor Policy Violation / Port Scan)",
      examples: "Failed screen locking incident, single external port scanning probe blocked by edge firewall.",
      mttdTarget: "MTTD < 4 Hours",
      mttrTarget: "MTTR < 24 Hours",
      escalationPath: "Tier 1 Analyst / Automated SOAR rule logs and closes ticket with educational user reminder.",
      certInTimeline: "No external CERT-In reporting required; internal audit log retained for 180 days.",
      badgeClass: "bg-gray-850 text-gray-300 border-gray-700"
    }
  };

  const activeSeverity = severityLevels[selectedSeverityKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_cert_in_response",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "6-Hour CERT-In Ransomware Containment",
      budget: "₹18,50,000",
      challenge: "Ransomware Strain Infected 2 Payment Nodes During Peak Diwali Traffic",
      dilemma:
        "Ransomware strain infected 2 payment worker nodes during peak Diwali UPI traffic, threatening to halt ₹120 Crores in daily transactions and incur ₹250 Cr statutory fines.",
      resolution:
        "Mamata executed automated SOAR quarantine (MTTR = 42s), notified CISO via out-of-band Signal, and submitted official incident report to CERT-In within 2 hours 15 minutes (under 6h SLA).",
      metrics: {
        certInReportTime: "2h 15m (SLA: 6h)",
        mttrSpeed: "42 Seconds Isolation",
        dataLoss: "0 Bytes Exfiltrated",
        compliance: "IT Act Section 70B & RBI Directives"
      }
    },
    {
      id: "ichapur_pacs_breach",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "PACS Healthcare Data Breach Containment",
      budget: "₹8,20,000",
      challenge: "Unauthorized External IP Attempted Database Exfiltration of 80,000 Scans",
      dilemma:
        "Unauthorized external IP attempted database exfiltration of 80,000 oncology patient scans, risking catastrophic patient privacy violations and NABH accreditation cancellation.",
      resolution:
        "Mahima isolated DICOM PACS servers, captured volatile memory, notified DPBI and affected cancer patients under DPDP Act Section 8(6), preventing ₹250 Crore statutory penalty exposure.",
      metrics: {
        recordsProtected: "80,000 Oncology Records",
        dpbiNotified: "Statutory SLA Met",
        patientAlertsSent: "100% Notices Dispatched",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_intrusion",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Intrusion Triage",
      budget: "₹14,80,000",
      challenge: "Rogue IP Detected Probing RTU Firmware Keys Across 18 Substations",
      dilemma:
        "Rogue IP detected probing RTU firmware keys across 18 high-voltage 220kV substations, threatening a state-wide power grid cyber blackout attack.",
      resolution:
        "Debangshu activated OT emergency isolation playbook, preserved SCADA network packet captures under Section 65B, and escalated to NCIIPC within 45 minutes under IT Act Section 70 directives.",
      metrics: {
        substationsSecured: "18 High-Voltage Sites",
        nciipcEscalation: "45 Minutes Elapsed",
        evidenceIntegrity: "100% Section 65B Certified",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_incident_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Incident Playbook & CERT-In Escalation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with Live RAM Capture & CERT-In Timelines",
      dilemma:
        "Cybersecurity students struggled with live RAM capture and understanding why rebooting an infected machine destroys critical forensic evidence under Section 65B.",
      resolution:
        "The team developed an interactive Incident Response Playbook and CERT-In 6-Hour SLA Escalation Simulator in React, training 215+ BCA cyber security students on live forensic incident handling.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        incidentDrillsRun: "95+ Attack Scenarios",
        examMastery: "100% Incident Management Mastery",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 6 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Incident Management Procedures and Escalation Paths
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Execute professional incident response: master the 4-phase lifecycle (NIST SP 800-61 / ISO 27035), 
            manage severity escalation hierarchies (P1 to P4), maintain unbroken digital evidence chains under Section 65B, and guarantee mandatory 6-hour CERT-In statutory compliance under Indian cyber law.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Stage Incident Response Lifecycle Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🚨</span> Studio 1: 4-Stage Incident Response Lifecycle Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an incident response lifecycle stage to inspect key operational actions, mandatory audit deliverables, critical rookie pitfalls, and statutory alignment.
            </p>
          </div>

          {/* IR Stage Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(irStages).map((stg) => {
              const isSelected = selectedIrStageKey === stg.key;
              return (
                <button
                  key={stg.key}
                  onClick={() => setSelectedIrStageKey(stg.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{stg.name.split(". ")[1]?.split(" Phase")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{stg.focus.split(", ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active IR Stage Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeIrStage.badgeClass)}>
                  {activeIrStage.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Operational Focus: {activeIrStage.focus}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Statutory Alignment</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeIrStage.statuteAlignment}</span>
              </div>
            </div>

            {/* Actions & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Key Operational Actions:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeIrStage.actions}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Mandatory Deliverables:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed">{activeIrStage.deliverables}</p>
              </div>
            </div>

            {/* Critical Pitfall */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/30 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Critical Rookie Pitfall:</span>
              <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed mt-0.5">{activeIrStage.criticalPitfall}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CERT-In 6-Hour Emergency Incident Escalation & Severity Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⏱️</span> Studio 2: CERT-In 6-Hour Emergency Incident Escalation Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an incident severity level (P1 to P4) to inspect MTTD/MTTR targets, escalation hierarchies, and statutory reporting obligations to CERT-In.
            </p>
          </div>

          {/* Severity Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(severityLevels).map((sev) => {
              const isSelected = selectedSeverityKey === sev.key;
              return (
                <button
                  key={sev.key}
                  onClick={() => setSelectedSeverityKey(sev.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{sev.title.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-1">{sev.mttdTarget}</div>
                </button>
              );
            })}
          </div>

          {/* Active Severity Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSeverity.badgeClass)}>
                  Severity: {activeSeverity.title}
                </span>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-mono">{activeSeverity.examples}</p>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Resolution Target</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeSeverity.mttrTarget}</span>
              </div>
            </div>

            {/* Escalation Path & CERT-In Mandate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Operational Escalation Path:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeSeverity.escalationPath}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">CERT-In Statutory Reporting SLA:</span>
                <p className="text-amber-300 text-xs sm:text-sm font-sans font-semibold leading-relaxed">{activeSeverity.certInTimeline}</p>
              </div>
            </div>

            {/* Hour-by-Hour Timeline Progress Bar (T+0h to T+6h) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-sans">
                CERT-In 6-Hour Emergency Timeline (T+0h to T+6h):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="bg-gray-900 p-3 rounded-xl border border-indigo-900/40">
                  <span className="text-indigo-400 font-bold block">T+0h to T+1h</span>
                  <span className="text-gray-300 text-[11px]">Detection, Triage &amp; Soft Isolation</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-xl border border-blue-900/40">
                  <span className="text-blue-400 font-bold block">T+1h to T+2h</span>
                  <span className="text-gray-300 text-[11px]">Live RAM Dump &amp; CISO Briefing</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-xl border border-amber-900/40">
                  <span className="text-amber-400 font-bold block">T+2h to T+4h</span>
                  <span className="text-gray-300 text-[11px]">Forensic Draft &amp; Legal Sign-Off</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-xl border border-emerald-900/40">
                  <span className="text-emerald-400 font-bold block">T+4h to T+5h30m</span>
                  <span className="text-emerald-300 text-[11px] font-bold">CERT-In Report Submitted!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the NIST SP 800-61 / ISO 27035 Incident Response Loop and the Hierarchical Escalation Matrix.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: IR Lifecycle Loop */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The NIST SP 800-61 / ISO 27035 IR Loop
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Preparation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="30" width="200" height="90" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="135" y="55" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">1. PREPARATION</text>
                    <text x="50" y="75" fill="#67e8f9" font-family="monospace" fontSize="7.5">• CSIRT Team &amp; Playbooks</text>
                    <text x="50" y="92" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Out-of-Band Signal War Room</text>
                    <text x="50" y="109" fill="#34d399" font-family="monospace" fontSize="7.5">• Forensic LiME / DumpIt Tools</text>
                  </g>

                  {/* Step 2: Detection */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="200" height="90" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="365" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">2. DETECTION &amp; ANALYSIS</text>
                    <text x="280" y="75" fill="#818cf8" font-family="monospace" fontSize="7.5">• SIEM Correlated IOC Alerts</text>
                    <text x="280" y="92" fill="#818cf8" font-family="monospace" fontSize="7.5">• Severity Scoring (P1-P4)</text>
                    <text x="280" y="109" fill="#34d399" font-family="monospace" fontSize="7.5">• MTTD &lt; 15 Seconds</text>
                  </g>

                  {/* Step 3: Containment */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="145" width="200" height="90" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="365" y="170" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">3. CONTAINMENT &amp; RESTORE</text>
                    <text x="280" y="190" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Live RAM Dump (Pre-Shutdown)</text>
                    <text x="280" y="207" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Network Soft Isolation</text>
                    <text x="280" y="224" fill="#34d399" font-family="monospace" fontSize="7.5">• Clean Immutable Restore</text>
                  </g>

                  {/* Step 4: Post-Incident */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="145" width="200" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="135" y="170" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">4. POST-INCIDENT (LEARN)</text>
                    <text x="50" y="190" fill="#34d399" font-family="monospace" fontSize="7.5">• Blameless Post-Mortem</text>
                    <text x="50" y="207" fill="#34d399" font-family="monospace" fontSize="7.5">• 5-Whys Root Cause Analysis</text>
                    <text x="50" y="224" fill="#a7f3d0" font-family="monospace" fontSize="7.5">• Section 65B Signed Evidence</text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous feedback ensures lessons learned from incidents harden future defense baselines.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: The 4-phase iterative Incident Response Lifecycle (NIST SP 800-61 / ISO 27035).
              </p>
            </div>

            {/* Diagram 2: Escalation Matrix */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Internal &amp; External Escalation Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="130" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="85" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">TIER 1 SOC ANALYST</text>
                    <text x="85" y="57" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Initial Alert Triage</text>
                  </g>

                  <line x1="150" y1="45" x2="185" y2="45" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan46)" />

                  {/* Tier 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">TIER 2 SPECIALIST</text>
                    <text x="250" y="57" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">IOC Deep Dive</text>
                  </g>

                  <line x1="315" y1="45" x2="350" y2="45" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo46)" />

                  {/* Tier 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="25" width="130" height="40" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="415" y="45" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">TIER 3 / CISO LEAD</text>
                    <text x="415" y="57" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">Forensic Commander</text>
                  </g>

                  <line x1="415" y1="65" x2="415" y2="105" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* CMC */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="372" y="125" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">CRISIS MANAGEMENT COMMITTEE</text>
                    <text x="372" y="138" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">CEO • CISO • Legal • PR</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed46)" />

                  {/* External Authorities */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="125" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">EXTERNAL NOTIFICATION</text>
                    <text x="125" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">CERT-In (&lt; 6h) • DPBI • Police</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% STATUTORY REPORTING COMPLIANCE
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Fulfills Section 70B(6) IT Act and Section 8(6) DPDP Act with zero penalty liability.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Clear escalation paths eliminate confusion during high-stress cyber security incidents.
                  </text>

                  <defs>
                    <marker id="arrowCyan46" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo46" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowRed46" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: The operational escalation path from SOC analyst to executive CMC and CERT-In.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Incident Response Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads contain ransomware in Kolkata, protect healthcare PACS in Ichapur, triage SCADA intrusions in Barrackpore, and simulate CERT-In escalation in Jadavpur.
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
                &gt;
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
                  <span>⚡</span> Incident Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Incident Response Solution
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
              Guidelines for Incident Commanders and Lead Forensic Specialists managing cyber attacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Incident Response Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Out-of-Band Channels:</strong> Run P1 war rooms on Signal, never on corporate email.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Dump Live RAM First:</strong> Capture volatile memory using LiME before soft isolation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Meet CERT-In 6h SLA:</strong> Submit reports to incident@cert-in.org.in on time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Conduct Blameless Post-Mortems:</strong> Focus on 5-Whys systemic root causes, not blame.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common IR Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Rebooting Infected Hosts:</strong> Immediately pulling power destroys volatile forensic evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>In-Band War Rooms:</strong> Discussing remediation on Slack allows the attacker to counter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Concealing Data Breaches:</strong> Violates DPDP Act Section 8(6) &rarr; ₹250 Cr statutory fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Breaking Chain of Custody:</strong> Un-hashed logs are legally inadmissible under Section 65B.</span>
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
                  <span><strong>Automate SOAR Playbooks:</strong> Isolate compromised endpoints and revoke tokens in &lt; 45s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs:</strong> Archive immutable SIEM telemetry under IT Act Section 70B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Issue Signed 65B Certificates:</strong> Certify digital log integrity for court readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Notify DPBI &amp; Citizens:</strong> Dispatch breach mitigation notices under DPDP Act Section 8(6).</span>
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
              Synthesize incident response lifecycle workflows and statutory reporting timelines before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Incident Response Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why preserving volatile memory (RAM) is the crucial first step before host shutdown: Live RAM holds active network sockets, injected malware payloads, and decrypted cryptographic keys. If an analyst reboots the server immediately, all volatile evidence is lost forever, crippling forensic investigation and preventing legal prosecution under the IT Act.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The strict statutory compliance timelines in India: Under Section 70B of the IT Act, reportable cyber incidents must be escalated to CERT-In within 6 hours. Under Section 8(6) of the DPDP Act 2023, personal data breaches must be notified to both the Data Protection Board of India and affected citizens to avoid ₹250 Crore fines.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security operations, establish pre-verified out-of-band communication channels (such as dedicated Signal groups) and automated SOAR containment playbooks to reduce Mean Time to Remediate (MTTR) to under 45 seconds while coordinating in total secrecy.
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
                <span>4 IR Phases: Preparation ➔ Detection ➔ Containment/Recovery ➔ Lessons Learned.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Controls A.5.24 to A.5.28 govern Information Security Incident Management.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions 2022 mandate reporting cyber incidents within 6 HOURS.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8(6) mandates notifying DPBI and affected citizens of breaches.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Live RAM must be dumped before disconnecting power or rebooting infected hosts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 65B Certificates prove digital evidence integrity for court admissibility.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Incident Management Procedures and Escalation Paths FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Incident Escalation Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Incident Management Procedures and Escalation Paths (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Incident management is where the theoretical rigor of your ISMS meets the reality of active cyber warfare. Master the 4 phases of NIST SP 800-61 and ISO 27035: prepare robust playbooks under Control A.5.24, triage severity rapidly to minimize MTTD, preserve volatile RAM before host shutdown to maintain Section 65B court evidence, and execute automated SOAR containment. Never forget your statutory obligations under Indian cyber law: report cyber attacks to CERT-In within 6 hours under Section 70B of the IT Act, and notify the Data Protection Board and affected citizens under Section 8(6) of the DPDP Act 2023 to avoid catastrophic ₹250 Crore fines!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
