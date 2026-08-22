import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: 3-Year Audit Milestone State
  const [selectedMilestoneKey, setSelectedMilestoneKey] = useState("year1_surveillance");

  // Studio 2: Security KPI State
  const [kpiMetrics, setKpiMetrics] = useState({
    patchVelocitySla: true, // 100% Critical Patched < 48h
    phishProneLow: true,    // Phish-prone < 2%
    quarterlyAccessCertified: true, // 100% Access Reviewed
    capaClosedOnTime: true  // 100% CAPA closed in 30d
  });

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_surveillance_audit");

  // Studio 1: 3-Year Audit Milestones Data
  const auditMilestones = {
    year0_initial: {
      key: "year0_initial",
      title: "Year 0: Initial Certification Audit",
      stage: "Stage 1 (Documentation) + Stage 2 (Technical Operations)",
      focus: "Comprehensive review of Clauses 4-10, Statement of Applicability (SoA), and all 93 Annex A controls in production.",
      artifacts: "Documented ISMS Scope, Board-Signed Security Policy, Enterprise Risk Register, Approved SoA Matrix.",
      failureRisk: "Scope slicing, un-justified excluded controls, or lack of documented risk assessment methodology.",
      certStatus: "ISO/IEC 27001 Certificate Issued (Valid for 3 Years)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    year1_surveillance: {
      key: "year1_surveillance",
      title: "Year 1: First Surveillance Audit",
      stage: "Mandatory Clauses (4-10) + Sample Annex A Controls",
      focus: "Verifying that the ISMS is actively operating; reviewing closed CAPA findings from Year 0; sampling high-risk controls (Cloud A.5.23, IAM A.8.5).",
      artifacts: "Closed CAPA Remediation Logs, Year 1 Internal Audit Reports, Board Management Review Minutes.",
      failureRisk: "Treating the ISMS as static; failing to close Year 0 minor non-conformities within the 90-day SLA.",
      certStatus: "ISO 27001 Certificate Re-Endorsed for Year 2",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    year2_surveillance: {
      key: "year2_surveillance",
      title: "Year 2: Second Surveillance Audit",
      stage: "Remaining Annex A Controls + Continual Improvement",
      focus: "Auditing remaining Annex A controls not tested in Year 1; evaluating security KPI trends; verifying threat intel ingestion (A.5.7).",
      artifacts: "180-Day SIEM Log Evidence, Phishing Simulation Metrics, Quarterly Access Certification Logs (A.8.2).",
      failureRisk: "Architectural drift; unmonitored cloud workloads spun up without security review.",
      certStatus: "ISO 27001 Certificate Re-Endorsed for Year 3",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    year3_recertification: {
      key: "year3_recertification",
      title: "Year 3: Full Recertification Audit",
      stage: "Comprehensive Re-Assessment across 100% of ISMS Scope",
      focus: "Complete re-audit of all clauses and all 93 controls; evaluating 3-year continual improvement maturity and risk register updates.",
      artifacts: "Revised 3-Year Risk Assessment, Updated SoA Matrix, Multi-Year Management Review Records.",
      failureRisk: "Major changes in cloud architecture or legal regulations (DPDP Act) not incorporated into the ISMS.",
      certStatus: "New 3-Year ISO/IEC 27001 Certificate Issued",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeMilestone = auditMilestones[selectedMilestoneKey];

  // Studio 2: ISMS Health Score Calculation
  const ismsHealth = useMemo(() => {
    let score = 0;
    if (kpiMetrics.patchVelocitySla) score += 25;
    if (kpiMetrics.phishProneLow) score += 25;
    if (kpiMetrics.quarterlyAccessCertified) score += 25;
    if (kpiMetrics.capaClosedOnTime) score += 25;

    let verdict = "100% OPTIMAL ISMS HEALTH (Surveillance Audit Ready)";
    let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";
    let safeHarbor = "100% Protected (IT Act Sec 85 Due Diligence & DPDP Shield)";

    if (score < 100) {
      if (score >= 75) {
        verdict = "MODERATE DRIFT (Minor Non-Conformity Risk)";
        badgeClass = "bg-amber-950 text-amber-300 border-amber-800";
        safeHarbor = "Partial Protection (Auditor remediation required)";
      } else {
        verdict = "CRITICAL ISMS DECAY (Major NC / Certificate Suspension Risk)";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
        safeHarbor = "Severe ₹250 Cr Fine Exposure under DPDP Section 33!";
      }
    }

    return { score, verdict, badgeClass, safeHarbor };
  }, [kpiMetrics]);

  const toggleKpi = (key) => {
    setKpiMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_surveillance_audit",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Year 1 Surveillance Audit & CAPA Maintenance",
      budget: "₹18,50,000",
      challenge: "Payment Switch Added 50 New Microservices, Creating Architectural Drift",
      dilemma:
        "The multi-cloud payment switch added 50 new microservices over 12 months, risking severe architectural drift and audit failure during the Year 1 Surveillance Audit.",
      resolution:
        "Mamata automated Terraform drift detection, reviewed all 93 controls in the SoA, and closed 12 internal audit findings in 21 days, passing the Year 1 Surveillance Audit with zero non-conformities.",
      metrics: {
        surveillancePassed: "100% Zero NCs Recorded",
        capaClosureSpeed: "21 Days (SLA: 90 Days)",
        driftRemediated: "100% IaC Baselines Aligned",
        compliance: "ISO 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_access_reviews",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Access Review & Privacy Maintenance",
      budget: "₹8,20,000",
      challenge: "Doctor Rotations Led to 14 Orphaned Accounts Across 80,000 Scans",
      dilemma:
        "Frequent medical staff rotations led to 14 orphaned privileged accounts possessing unmonitored access to 80,000 oncology patient scans, violating DPDP Act storage limits.",
      resolution:
        "Mahima enforced mandatory quarterly user access reviews (A.8.2), automated de-provisioning of departed staff within 15 minutes, and maintained 100% DPDP Act Section 8 compliance.",
      metrics: {
        accessReviewsCompleted: "100% Quarterly Certified",
        orphanedAccountsRevoked: "14 Accounts Suspended",
        patientPrivacyScore: "100% NABH Audit Rating",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_maintenance",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Config Drift & Patch SLA",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Ongoing Firmware Vulnerability Patch Tracking",
      dilemma:
        "18 high-voltage 220kV transmission substations required ongoing firmware vulnerability patch tracking across 120 legacy RTUs without causing power grid downtime.",
      resolution:
        "Debangshu established an emergency 48-hour patch deployment SLA for SCADA RTUs and automated CIS hardening baseline scans across all high-voltage sites under CEA cyber regulations.",
      metrics: {
        patchVelocity: "100% CVSS >= 9.0 < 48 Hours",
        scadaUptime: "100.000% Continuous Power",
        ciiCompliance: "10-Year Criminal Risk Immunized",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_kpi_dashboard_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "3-Year Audit Cycle & KPI Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with 3-Year Surveillance vs Recertification Scope",
      dilemma:
        "Cybersecurity students struggled to understand how Year 1 and Year 2 surveillance audits differ from full Year 3 recertification audits and how KPI telemetry drives Management Reviews.",
      resolution:
        "The team developed an interactive 3-Year Surveillance Cycle Simulator and Security KPI Dashboard in React, training 215+ BCA cyber security students on managing multi-year ISO 27001 programs.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        auditCyclesSimulated: "90+ Multi-Year Scenarios",
        examMastery: "100% ISMS Maintenance Mastery",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 8 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Continuous Improvement and ISMS Maintenance
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Sustain long-term cybersecurity maturity: navigate the 3-year ISO/IEC 27001 surveillance and recertification cycle, 
            optimize security KPIs (Clause 9.1), conduct independent internal audits (Clause 9.2), drive Executive Management Reviews (Clause 9.3), and maintain statutory Safe Harbor under Section 85 of the Indian IT Act.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 3-Year ISO 27001 Certification & Surveillance Cycle Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🗓️</span> Studio 1: 3-Year ISO 27001 Certification &amp; Surveillance Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an audit milestone to inspect auditor scrutiny focus, key governance deliverables, primary failure risks, and certification status.
            </p>
          </div>

          {/* Milestone Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(auditMilestones).map((ms) => {
              const isSelected = selectedMilestoneKey === ms.key;
              return (
                <button
                  key={ms.key}
                  onClick={() => setSelectedMilestoneKey(ms.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{ms.title.split(": ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{ms.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeMilestone.badgeClass)}>
                  {activeMilestone.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Stage: {activeMilestone.stage}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Certification Status</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeMilestone.certStatus}</span>
              </div>
            </div>

            {/* Focus & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Auditor Scrutiny Focus:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeMilestone.focus}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Key Governance Deliverables:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed">{activeMilestone.artifacts}</p>
              </div>
            </div>

            {/* Primary Failure Risk */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/30 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Primary Audit Failure Risk:</span>
              <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed mt-0.5">{activeMilestone.failureRisk}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Enterprise Security KPI Dashboard & ISMS Health Optimizer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📈</span> Studio 2: Enterprise Security KPI Dashboard &amp; Health Optimizer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle the 4 core maintenance KPIs (Clause 9.1) to observe their impact on overall ISMS Health %, surveillance audit pass likelihood, and statutory safe harbor status.
            </p>
          </div>

          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            {/* Health Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", ismsHealth.badgeClass)}>
                  {ismsHealth.verdict}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  ISMS Health Score: {ismsHealth.score}% (Operational Maturity)
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Statutory Safe Harbor Status</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{ismsHealth.safeHarbor}</span>
              </div>
            </div>

            {/* KPI Toggles */}
            <div className="space-y-2.5 text-xs">
              <label
                onClick={() => toggleKpi("patchVelocitySla")}
                className={clsx(
                  "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                  kpiMetrics.patchVelocitySla ? "bg-gray-900 border-indigo-500" : "bg-gray-950 border-gray-800 opacity-60"
                )}
              >
                <input type="checkbox" checked={kpiMetrics.patchVelocitySla} readOnly className="w-4 h-4 accent-indigo-500 rounded" />
                <div className="flex-1">
                  <span className="font-bold text-gray-200 block">1. Vulnerability Patch Velocity (CVSS &gt;= 9.0 SLA):</span>
                  <span className="text-[11px] text-gray-400">100% of Critical vulnerabilities patched across all production servers within 48 Hours.</span>
                </div>
              </label>

              <label
                onClick={() => toggleKpi("phishProneLow")}
                className={clsx(
                  "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                  kpiMetrics.phishProneLow ? "bg-gray-900 border-blue-500" : "bg-gray-950 border-gray-800 opacity-60"
                )}
              >
                <input type="checkbox" checked={kpiMetrics.phishProneLow} readOnly className="w-4 h-4 accent-blue-500 rounded" />
                <div className="flex-1">
                  <span className="font-bold text-gray-200 block">2. Phish-Prone Human Failure Rate (&lt; 2.0%):</span>
                  <span className="text-[11px] text-gray-400">Monthly unannounced simulated phishing campaigns achieve &lt; 2% failure rate across all 250 employees.</span>
                </div>
              </label>

              <label
                onClick={() => toggleKpi("quarterlyAccessCertified")}
                className={clsx(
                  "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                  kpiMetrics.quarterlyAccessCertified ? "bg-gray-900 border-amber-500" : "bg-gray-950 border-gray-800 opacity-60"
                )}
              >
                <input type="checkbox" checked={kpiMetrics.quarterlyAccessCertified} readOnly className="w-4 h-4 accent-amber-500 rounded" />
                <div className="flex-1">
                  <span className="font-bold text-gray-200 block">3. Quarterly Privileged Access Review Compliance (100% Certified):</span>
                  <span className="text-[11px] text-gray-400">Department heads certify 100% of privileged cloud and database credentials quarterly (zero orphaned accounts).</span>
                </div>
              </label>

              <label
                onClick={() => toggleKpi("capaClosedOnTime")}
                className={clsx(
                  "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                  kpiMetrics.capaClosedOnTime ? "bg-gray-900 border-emerald-500" : "bg-gray-950 border-gray-800 opacity-60"
                )}
              >
                <input type="checkbox" checked={kpiMetrics.capaClosedOnTime} readOnly className="w-4 h-4 accent-emerald-500 rounded" />
                <div className="flex-1">
                  <span className="font-bold text-gray-200 block">4. CAPA Non-Conformity Closure Rate (100% in &lt; 30 Days):</span>
                  <span className="text-[11px] text-gray-400">All internal audit findings and penetration test vulnerabilities closed with verified 5-Whys RCA within SLA.</span>
                </div>
              </label>
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
              Visualizing the 3-Year ISO 27001 Surveillance Roadmap and the Closed-Loop Continuous Improvement Engine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 3-Year Roadmap */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3-Year ISO 27001 Surveillance Roadmap
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Year 0 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="210" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="125" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">YEAR 0: INITIAL CERTIFICATION</text>
                    <text x="125" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Stage 1 (Docs) + Stage 2 (Technical)</text>
                  </g>

                  <line x1="230" y1="47" x2="265" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan47)" />

                  {/* Year 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="215" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="372" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">YEAR 1: SURVEILLANCE AUDIT 1</text>
                    <text x="372" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Clauses 4-10 + Closed CAPAs</text>
                  </g>

                  <line x1="372" y1="70" x2="372" y2="105" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Year 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">YEAR 2: SURVEILLANCE AUDIT 2</text>
                    <text x="372" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Remaining Controls + Continual Imp</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold47)" />

                  {/* Year 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="125" y="125" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">YEAR 3: RECERTIFICATION</text>
                    <text x="125" y="138" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">Full 100% Re-Audit across Scope</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      UNBROKEN 3-YEAR COMPLIANCE CONTINUITY
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Proves ongoing executive due diligence under Section 85 of the Indian Information Technology Act.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous maintenance prevents certificate revocation and guarantees permanent resilience.
                  </text>

                  <defs>
                    <marker id="arrowCyan47" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold47" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The 3-year ISO/IEC 27001 certification and surveillance audit cycle.
              </p>
            </div>

            {/* Diagram 2: Maintenance Engine */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Closed-Loop ISMS Maintenance Engine
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: KPI Telemetry */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. SECURITY KPIs</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Clause 9.1 Metrics</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan48)" />

                  {/* Step 2: Internal Audit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. INTERNAL AUDIT</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Clause 9.2 Independent</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo48)" />

                  {/* Step 3: Management Review */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="412" y="45" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. BOARD REVIEW</text>
                    <text x="412" y="58" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Clause 9.3 Budget</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 4: CAPA Closure */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="372" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. 5-WHYS CAPA REMEDIATION</text>
                    <text x="372" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Clause 10.1 Root Cause Closure</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen48)" />

                  {/* Step 5: Upgraded Defense Baseline */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="125" y="125" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. UPGRADED BASELINE</text>
                    <text x="125" y="138" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">Zero Entropy / Self-Healing</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% CONTINUOUS IMPROVEMENT LOOP
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Ensures enterprise defenses automatically evolve faster than external adversary techniques.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous feedback translates audit findings into permanent architectural hardening.
                  </text>

                  <defs>
                    <marker id="arrowCyan48" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo48" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen48" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: The closed-loop ISMS maintenance and continual improvement engine.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: ISMS Maintenance Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads pass surveillance audits in Kolkata, audit healthcare access in Ichapur, manage SCADA drift in Barrackpore, and build KPI simulators in Jadavpur.
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
                  <span>⚡</span> Maintenance Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Maintenance Solution
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
              Guidelines for ISMS Lead Auditors and CISOs maintaining multi-year certification programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> ISMS Maintenance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate IaC Drift Detection:</strong> Use AWS Config to catch manual unapproved changes in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Auditor Independence:</strong> Never allow engineers to audit their own operational domains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Perform Quarterly Access Reviews:</strong> Certify privileged accounts quarterly to eliminate orphan logins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 48h Patch SLA:</strong> Rapidly patch any critical vulnerability with CVSS &gt;= 9.0.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Maintenance Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Certificate on the Wall Syndrome:</strong> Ignoring the ISMS after initial certification until the next audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Self-Auditing Non-Conformity:</strong> Allowing DevOps leads to audit their own Kubernetes clusters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Correction with CAPA:</strong> Fixing the immediate symptom without eliminating root causes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Stale Statement of Applicability:</strong> Failing to update the SoA when cloud architecture evolves.</span>
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
                  <span><strong>Convene Board Reviews (Cl 9.3):</strong> Present audit telemetry to secure executive security budgets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Ingest Threat Intel (A.5.7):</strong> Automatically update WAF rules from CERT-In advisory feeds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Track Phish-Prone Rates:</strong> Conduct monthly simulated spear-phishing drills across all staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs:</strong> Archive immutable SIEM telemetry under IT Act Section 70B.</span>
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
              Synthesize 3-year audit cycles and ISMS maintenance workflows before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for ISMS Maintenance Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why ISO 27001 certificates require annual surveillance audits: Achieving certification proves that an organization was compliant on a single day. Over the subsequent 12 months, software updates, new employees, and cloud architecture changes introduce entropy. Annual surveillance audits verify that the organization has actively operated its internal audits, CAPA workflows, and management reviews.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How continuous maintenance establishes legal Safe Harbor under Indian cyber law: Under Section 85 of the Information Technology Act 2000, corporate Directors and CISOs are shielded from personal criminal liability if they prove they exercised ongoing due diligence. Documented internal audits and signed Management Review minutes serve as conclusive evidence in court.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise compliance designs, integrate automated Cloud Security Posture Management (CSPM) and quarterly access review webhooks to eliminate architectural drift and maintain 100% ISMS health continuously between external audits.
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
                <span>ISO 27001 certificates are valid for 3 years, subject to annual surveillance.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Year 0: Initial Certification; Year 1 &amp; 2: Surveillance; Year 3: Recertification.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clause 9.1 mandates tracking KPIs (MTTD/MTTR, patch velocity, phish-prone rate).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clause 9.2 mandates independent internal audits across all 93 controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clause 9.3 mandates executive Management Reviews with board budget allocation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Ongoing maintenance proves executive due diligence under IT Act Section 85.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Continuous Improvement and ISMS Maintenance FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Surveillance Audit Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Continuous Improvement and ISMS Maintenance (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Continuous improvement under Clause 10 is what separates a world-class cybersecurity posture from a stale, vulnerable checklist. Remember that an ISMS is a living organism: track objective security KPIs under Clause 9.1, execute independent internal audits under Clause 9.2, present honest telemetry to the Board of Directors under Clause 9.3, and close root causes with 5-Whys CAPA plans under Clause 10.1. This continuous maintenance guarantees unbroken 3-year recertification success and complete statutory Safe Harbor under Section 85 of the Indian Information Technology Act 2000!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
