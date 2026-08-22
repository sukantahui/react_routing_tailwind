import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: Risk Register Filter State
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedRiskId, setSelectedRiskId] = useState("RSK-PAY-01");

  // Studio 2: Inherent vs Residual Sliders State
  const [simInherentScore, setSimInherentScore] = useState(20); // 1 to 25
  const [simControlStrength, setSimControlStrength] = useState(85); // 0% to 95%
  const boardRiskAppetite = 4.0; // Board Appetite Threshold

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_grc_register");

  // Studio 1: Mock Enterprise Risk Register Entries Data
  const riskRegisterData = [
    {
      id: "RSK-PAY-01",
      asset: "UPI Core Payment Gateway",
      tier: "CRITICAL",
      owner: "VP of Digital Banking",
      remediationOwner: "Lead Architect Mamata",
      threatVuln: "LockBit Ransomware & Pre-Auth API Exploit (CVE-2026-8812)",
      inherentScore: 20,
      treatment: "MITIGATE",
      annexA: "A.8.20 (Network Security) & A.8.5 (Auth)",
      sla: "2026-09-30",
      residualScore: 2.5,
      status: "IN_PROGRESS",
      justification: "AWS WAF rules deployed; final FIDO2 hardware rollout underway in current sprint."
    },
    {
      id: "RSK-MED-04",
      asset: "Oncology PACS Diagnostic DB",
      tier: "CRITICAL",
      owner: "Chief Medical Officer",
      remediationOwner: "Forensic Lead Mahima",
      threatVuln: "Unencrypted Biopsy Scan Exfiltration under DPDP Act Sec 8",
      inherentScore: 25,
      treatment: "MITIGATE",
      annexA: "A.8.24 (Cryptography) & A.8.10 (Deletion)",
      sla: "2026-08-15",
      residualScore: 1.5,
      status: "MITIGATED",
      justification: "AES-256 S3 Object Lock crypto-shredding active; verified by quarterly penetration test."
    },
    {
      id: "RSK-GRID-02",
      asset: "220kV Substation SCADA RTU",
      tier: "CRITICAL",
      owner: "Director of Power Transmission",
      remediationOwner: "OT Architect Debangshu",
      threatVuln: "Nation-State OT Protocol Command Injection (MITRE T0885)",
      inherentScore: 24,
      treatment: "MITIGATE",
      annexA: "A.8.20 (Network Segregation) & A.7.2 (Physical)",
      sla: "2026-07-31",
      residualScore: 1.2,
      status: "MITIGATED",
      justification: "Unidirectional hardware data diodes installed; all remote access routes permanently severed."
    },
    {
      id: "RSK-DEV-08",
      asset: "Internal Legacy Staging Server",
      tier: "MEDIUM",
      owner: "Head of QA Testing",
      remediationOwner: "DevOps Lead Susmita",
      threatVuln: "Outdated PHP 7.4 Runtime with Local Buffer Overflow Flaw",
      inherentScore: 12,
      treatment: "ACCEPT",
      annexA: "A.8.31 (Separation of Environments)",
      sla: "2027-08-23",
      residualScore: 2.4,
      status: "ACCEPTED",
      justification: "Isolated in non-routable sandbox VLAN 99; formal CISO 12-month Risk Acceptance signed."
    }
  ];

  // Studio 1 Filtered List
  const filteredRisks = useMemo(() => {
    return riskRegisterData.filter((r) => {
      if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
      return true;
    });
  }, [statusFilter]);

  const activeRiskEntry = riskRegisterData.find((r) => r.id === selectedRiskId) || riskRegisterData[0];

  // Studio 2 Calculations
  const calculatedResidual = useMemo(() => {
    const res = (simInherentScore * (1 - simControlStrength / 100)).toFixed(1);
    const numRes = parseFloat(res);
    const isCompliant = numRes <= boardRiskAppetite;

    return {
      residualScore: res,
      isCompliant: isCompliant,
      gap: (numRes - boardRiskAppetite).toFixed(1)
    };
  }, [simInherentScore, simControlStrength]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_grc_register",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Dynamic GRC Risk Register Automation",
      budget: "₹18,50,000",
      challenge: "500 Payment Microservices Processing ₹120 Cr/Day Had 45 Stale Spreadsheet Entries",
      dilemma:
        "The FinTech operations center tracked 45 inherent critical cyber risks across 500 payment microservices using static spreadsheets, causing missed remediation SLAs and audit warnings.",
      resolution:
        "Mamata deployed ServiceNow GRC connected to AWS Inspector, automatically ingesting CVEs, tracking patch SLAs, driving all 45 inherent critical risks below the 3.0 appetite threshold, and satisfying RBI audits.",
      metrics: {
        risksTracked: "45 Enterprise Inherent Risks",
        automatedIngestion: "Daily AWS Scanner Sync",
        residualAppetiteScore: "2.5 / 25 (Low Safe)",
        compliance: "ISO 27001 Clause 6.1.2 & RBI"
      }
    },
    {
      id: "ichapur_patient_risk_register",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Patient Data Risk Register",
      budget: "₹8,20,000",
      challenge: "80,000 Patient Biopsy Scans Lacked Auditable Tracking under DPDP Act Rules",
      dilemma:
        "Hospital clinical network stored 80,000 cancer biopsy records without an auditable Information Asset Risk Register, leaving the board exposed to ₹250 Crore DPDP statutory penalties.",
      resolution:
        "Mahima built an ISO 27001-compliant Information Asset Risk Register, logging S3 encryption controls, verifying a residual score of 1.5, and completely immunizing the hospital from ₹250 Crore statutory fines.",
      metrics: {
        recordsGoverned: "80,000 Biopsy Records",
        inherentToResidual: "Score 25 ➔ 1.5 (Mitigated)",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "DPDP Act 2023 & NABH Charter"
      }
    },
    {
      id: "barrackpore_scada_ot_register",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA OT Risk Register",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Nation-State OT Vectors Requiring Formal NCIIPC Tracking",
      dilemma:
        "18 high-voltage 220kV transmission substations faced targeted nation-state OT threat vectors requiring formalized risk registers for national security audit compliance under IT Act Section 70.",
      resolution:
        "Debangshu formulated the OT SCADA Risk Register across 18 substations, tracking unidirectional data diode controls, achieving 100% compliance with Section 70 Protected System rules under the Indian IT Act.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        otRisksDocumented: "16 Critical OT Entries",
        residualScore: "1.2 / 25 (Safe)",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_register_simulation_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Enterprise Risk Register Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand How Control Strength Reduces Inherent Risk",
      dilemma:
        "Cybersecurity students struggled to distinguish between inherent and residual risk scores, evaluate board risk appetite breaches, and maintain ISO 27001-compliant Risk Registers.",
      resolution:
        "The team developed an interactive Enterprise Risk Register & Residual Risk Tracker in React, training 215+ BCA cyber security students on managing corporate risk registers and GRC workflows.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        riskEntriesSimulated: "120+ Register Rows",
        examMastery: "100% Risk Governance Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 10 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Risk Registers and Residual Risk Management
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Construct and maintain the living ledger of enterprise risk: master the 10 mandatory attributes of an ISO/IEC 27001:2022 Risk Register (Clause 6.1.2/6.1.3), 
            evaluate Inherent vs Residual Risk, benchmark against Board Risk Appetite thresholds, and automate GRC workflows under Indian DPDP Act and RBI regulations.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Enterprise Risk Register Data Grid */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>📋</span> Studio 1: Interactive Enterprise Risk Register (IAR-RR)
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Filter by status, inspect inherent vs residual risk scores, and click any row to inspect full ISO 27001 Clause 6.1.3 profile details.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="inline-flex rounded-xl bg-gray-950 p-1 border border-gray-800 text-xs">
              {["ALL", "IN_PROGRESS", "MITIGATED", "ACCEPTED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg font-bold transition-all uppercase text-[11px]",
                    statusFilter === st
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {st.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Table */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                  <tr>
                    <th className="p-3.5">Risk ID</th>
                    <th className="p-3.5">Asset &amp; Tier</th>
                    <th className="p-3.5">Threat &amp; Vulnerability</th>
                    <th className="p-3.5 text-center">Inherent</th>
                    <th className="p-3.5">Treatment &amp; Control</th>
                    <th className="p-3.5">Owner</th>
                    <th className="p-3.5 text-center">Residual</th>
                    <th className="p-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {filteredRisks.map((risk) => {
                    const isSelected = selectedRiskId === risk.id;
                    return (
                      <tr
                        key={risk.id}
                        onClick={() => setSelectedRiskId(risk.id)}
                        className={clsx(
                          "cursor-pointer transition-colors",
                          isSelected ? "bg-indigo-950/60 text-white font-bold" : "hover:bg-gray-900/50"
                        )}
                      >
                        <td className="p-3.5 font-bold text-cyan-400">{risk.id}</td>
                        <td className="p-3.5">
                          <div className="text-white font-sans">{risk.asset}</div>
                          <span className="text-[10px] text-gray-500 font-mono">{risk.tier}</span>
                        </td>
                        <td className="p-3.5 max-w-[220px] truncate text-gray-300 font-sans">{risk.threatVuln}</td>
                        <td className="p-3.5 text-center text-rose-400 font-extrabold">{risk.inherentScore}</td>
                        <td className="p-3.5">
                          <span className="text-emerald-400 font-bold block">{risk.treatment}</span>
                          <span className="text-[10px] text-gray-400">{risk.annexA.split(" & ")[0]}</span>
                        </td>
                        <td className="p-3.5 text-gray-400 font-sans">{risk.remediationOwner.split(" ")[0]}</td>
                        <td className="p-3.5 text-center text-emerald-300 font-extrabold">{risk.residualScore}</td>
                        <td className="p-3.5 text-center">
                          <span
                            className={clsx(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                              risk.status === "MITIGATED"
                                ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                                : risk.status === "IN_PROGRESS"
                                ? "bg-amber-950 text-amber-300 border-amber-800"
                                : "bg-purple-950 text-purple-300 border-purple-800"
                            )}
                          >
                            {risk.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Selected Risk Detailed Inspector */}
            <div className="bg-gray-900 p-5 border-t border-gray-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider block">
                    ISO/IEC 27001 Clause 6.1.3 Risk Profile Inspector
                  </span>
                  <h4 className="text-base font-bold text-white font-sans mt-0.5">
                    {activeRiskEntry.id}: {activeRiskEntry.asset}
                  </h4>
                </div>
                <div className="text-xs font-mono text-gray-400">
                  Target Remediation SLA: <span className="text-amber-400 font-bold">{activeRiskEntry.sla}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Accountable Asset Owner:</span>
                  <p className="text-white font-sans">{activeRiskEntry.owner}</p>
                  <span className="text-gray-400 block text-[10px] uppercase font-sans mt-2">Remediation Engineer:</span>
                  <p className="text-cyan-300 font-sans">{activeRiskEntry.remediationOwner}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Mapped Annex A Controls:</span>
                  <p className="text-emerald-300 font-mono">{activeRiskEntry.annexA}</p>
                  <span className="text-gray-400 block text-[10px] uppercase font-sans mt-2">Engineering &amp; Audit Justification:</span>
                  <p className="text-gray-300 font-sans leading-relaxed">{activeRiskEntry.justification}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Inherent vs Residual Gap Analyzer & Appetite Benchmark */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎚️</span> Studio 2: Inherent vs Residual Risk Gap Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust gross Inherent Risk and Control Mitigation Strength to simulate real-time residual risk reduction and benchmark against Board Risk Appetite thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: Sliders */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5 shadow-2xl lg:col-span-2 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Risk Calibration Sliders
              </h3>

              {/* Inherent Risk Score Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">1. Gross Inherent Risk Score (Likelihood x Impact):</span>
                  <span className="text-rose-400 font-bold">{simInherentScore} / 25</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={simInherentScore}
                  onChange={(e) => setSimInherentScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Control Mitigation Strength Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">2. Security Control Mitigation Strength:</span>
                  <span className="text-emerald-400 font-bold">{simControlStrength}% Reduction</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="95"
                  step="5"
                  value={simControlStrength}
                  onChange={(e) => setSimControlStrength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Explanation Note */}
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[11px] text-gray-400 font-sans leading-relaxed">
                <strong>Formula:</strong> $$Residual Risk = Inherent Risk \times (1 - Control Strength)$$. The Board of Directors has established a strict Risk Appetite threshold of <span className="text-white font-bold font-mono">4.0 / 25</span>. Any residual score above 4.0 blocks production release until secondary compensatory controls are deployed.
              </div>
            </div>

            {/* Right Output: Appetite Dashboard */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Residual Risk &amp; Appetite Status
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Calculated Residual Risk Score:</span>
                  <span className="text-3xl font-extrabold text-white block">{calculatedResidual.residualScore} / 25</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Board Risk Appetite Threshold:</span>
                  <span className="text-xs font-bold text-cyan-300 block">&le; {boardRiskAppetite.toFixed(1)} (LOW RISK)</span>
                </div>
              </div>

              {/* Status Outcome Banner */}
              <div
                className={clsx(
                  "p-3 rounded-xl border text-xs font-mono font-bold text-center",
                  calculatedResidual.isCompliant
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-rose-950 text-rose-300 border-rose-700"
                )}
              >
                {calculatedResidual.isCompliant
                  ? "✔ COMPLIANT: Residual Risk Within Board Appetite"
                  : `❌ VIOLATION: Exceeds Appetite by +${calculatedResidual.gap} (Secondary Action Required!)`}
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
              Visualizing the Inherent to Residual Risk Reduction Pipeline and the Dynamic Risk Register Governance Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Inherent to Residual */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Inherent to Residual Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Inherent Risk Block */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="130" height="50" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="90" y="47" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">INHERENT RISK</text>
                    <text x="90" y="60" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6.5">Score: 20 (Critical)</text>
                  </g>

                  <line x1="155" y1="50" x2="185" y2="50" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed70)" />

                  {/* Security Controls Filter */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8">
                      CONTROLS (85%)
                    </text>
                    <text x="250" y="55" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      WAF • EDR • FIDO2
                    </text>
                    <text x="250" y="68" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="6">
                      (Annex A Controls)
                    </text>
                  </g>

                  <line x1="315" y1="50" x2="345" y2="50" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen70)" />

                  {/* Residual Risk Block */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="130" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="410" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">RESIDUAL RISK</text>
                    <text x="410" y="60" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Score: 2.5 (Low)</text>
                  </g>

                  {/* Bottom Comparison with Appetite */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="125" width="450" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      BOARD RISK APPETITE BENCHMARK (&le; 4.0)
                    </text>
                    <text x="250" y="167" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Residual Risk (2.5) &le; Risk Appetite (4.0) ➔ 100% COMPLIANT &amp; DEFENDED!
                    </text>
                  </g>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Controls transform unacceptable gross threats into safe, tolerable residual boundaries.
                  </text>

                  <defs>
                    <marker id="arrowRed70" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGreen70" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: The Inherent to Residual Risk reduction pipeline under ISO/IEC 27005.
              </p>
            </div>

            {/* Diagram 2: Governance Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Risk Register Governance Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Node: Identify & Log */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="160" y="20" width="180" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. IDENTIFY &amp; LOG</text>
                    <text x="250" y="55" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Catalog Inherent Risk in IAR</text>
                  </g>

                  {/* Right Node: Treat & Mitigate */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="300" y="105" width="175" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="387" y="127" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. ASSIGN &amp; TREAT</text>
                    <text x="387" y="140" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Owner • SLA • Annex A</text>
                  </g>

                  {/* Left Node: Audit & Re-test */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="105" width="175" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="112" y="127" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. AUDIT &amp; REPORT</text>
                    <text x="112" y="140" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">BRMC &amp; Clause 9.3 Review</text>
                  </g>

                  {/* Bottom Node: Monitor Residual */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="160" y="195" width="180" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="250" y="217" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. VERIFY RESIDUAL</text>
                    <text x="250" y="230" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Ensure Residual &le; Appetite</text>
                  </g>

                  {/* Connecting Lines */}
                  <line x1="340" y1="42" x2="387" y2="105" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="387" y1="150" x2="340" y2="217" stroke="#10b981" strokeWidth="1.5" />
                  <line x1="160" y1="217" x2="112" y2="150" stroke="#a855f7" strokeWidth="1.5" />
                  <line x1="112" y1="105" x2="160" y2="42" stroke="#06b6d4" strokeWidth="1.5" />

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous automated GRC synchronization maintains unshakeable audit integrity.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: The dynamic Enterprise Risk Register governance lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Risk Register Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads automate GRC registers in Kolkata, govern patient records in Ichapur, manage SCADA risks in Barrackpore, and simulate registers in Jadavpur.
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
                  <span>⚡</span> Governance Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Risk Officers and ISMS Managers maintaining enterprise risk registers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Register Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Assign Named Owners:</strong> Specify an engineer and calendar deadline for every entry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Control Decay:</strong> Continuously re-test controls to verify mitigation strength.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate GRC Sync:</strong> Ingest vulnerability scanner feeds directly into the register.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Track Accepted Expirations:</strong> Enforce an automated 12-month review timer on accepted risks.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Register Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Static Spreadsheet Trap:</strong> Creating an Excel file for an audit and never updating it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unowned Orphan Risks:</strong> Logging risks without an assigned business owner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Subjective Score Inflation:</strong> Lowering residual risk without verified controls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Appetite Thresholds:</strong> Allowing High residual risks to linger in production.</span>
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
                  <span><strong>Link Jira Tickets:</strong> Auto-generate Jira remediation tasks from the risk register.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Report to BRMC Quarterly:</strong> Present residual risk dashboards to Board Committees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Audits:</strong> Catalog all personal data flows under Section 8.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Verify Residual Scores:</strong> Re-calculate residual risk after verified patch deployments.</span>
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
              Synthesize Risk Register schemas and residual risk benchmarks before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for GRC Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why static spreadsheets fail at enterprise risk management: Spreadsheets lack cryptographic audit trails, role-based access control, automated SLA countdown timers, and real-time integration with vulnerability scanners. As an enterprise grows, automated GRC databases (ServiceNow / OneTrust) become essential to prevent unpatched Critical CVEs from slipping through the cracks.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Risk Register serves as your primary legal defense under the Indian DPDP Act 2023: During a data breach investigation by the Data Protection Board of India, producing an actively managed Risk Register proves that your organization exercised reasonable due diligence under Section 8, protecting the firm from maximum ₹250 Crore statutory penalties under Section 33.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your risk register systems, configure automated alerts that notify the Chief Information Security Officer (CISO) whenever an assigned remediation SLA is within 7 days of expiration.
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
                <span>Risk Register is the centralized ISMS database (ISO 27001 Clause 6.1.2/6.1.3).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Inherent Risk is gross risk before controls; Residual Risk is net risk after controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Formula: Residual Risk = Inherent Risk x (1 - Control Effectiveness).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Appetite is the board's maximum acceptable residual risk threshold.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3 Review Triggers: Scheduled reviews, Cyber breaches, Major IT changes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 uses Risk Registers as proof of statutory due diligence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Risk Registers and Residual Risk FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Risk Governance Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Risk Registers and Residual Risk Management (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The Risk Register is the definitive heartbeat of an Information Security Management System. Always remember: an unrecorded risk is an unmanaged risk! Maintain a dynamic, automated Risk Register under ISO/IEC 27001 Clause 6.1.2 and 6.1.3, continuously calculate Inherent vs Residual Risk, enforce strict remediation SLAs on assigned owners, and guarantee that residual scores remain permanently below your Board's Risk Appetite to achieve total statutory Safe Harbor under Indian DPDP Act and RBI regulations!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
