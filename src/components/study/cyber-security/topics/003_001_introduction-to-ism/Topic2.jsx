import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: Balanced Scorecard Perspective State
  const [selectedBscKey, setSelectedBscKey] = useState("internal_process");

  // Studio 2: Risk Threshold State
  const [selectedRiskThresholdKey, setSelectedRiskThresholdKey] = useState("risk_appetite");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_strategic_roadmap");

  // Studio 1: Balanced Scorecard (BSC) Data
  const bscPerspectives = {
    financial: {
      key: "financial",
      name: "1. Financial Perspective",
      strategicGoal: "Cost Optimization & Measurable Value Delivery",
      primaryKpi: "Return on Security Investment (ROSI)",
      targetValue: "> +300% ROSI",
      actualValue: "+420% ROSI Delivered",
      insuranceImpact: "18% Cyber Insurance Premium Reduction",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      metrics: [
        { label: "Cost-to-Prevention Ratio", val: "1 : 12 Economic Margin" },
        { label: "Unmitigated ALE Prevented", val: "₹1.8 Crores / year" },
        { label: "Security Budget ROI", val: "+420% Net Return" },
        { label: "Insurance Premium Status", val: "₹4.5 Lakhs Annual Savings" }
      ],
      details:
        "Demonstrates financial accountability to executive leadership by linking security spending directly to reduced annual loss expectancy and lower insurance underwriting premiums."
    },
    customer_privacy: {
      key: "customer_privacy",
      name: "2. Customer & Privacy Perspective",
      strategicGoal: "Stakeholder Trust & DPDP Act Compliance",
      primaryKpi: "Data Protection & Consent Governance",
      targetValue: "100% DPDP Compliance",
      actualValue: "Zero Privacy Breaches / 99.99% Consent SLA",
      insuranceImpact: "Full Statutory DPDP Immunity",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      metrics: [
        { label: "DPDP Section 33 Penalties", val: "₹0 (Zero Violations)" },
        { label: "Consent Request SLA", val: "99.99% User Consent Honored" },
        { label: "Customer Trust Index", val: "94 / 100 Industry Benchmark" },
        { label: "Data Erasure SLA", val: "100% Automated Storage Purge" }
      ],
      details:
        "Aligns corporate data processing with Section 8 of the DPDP Act 2023 (Purpose Limitation, Data Minimization, and Storage Limitation) to build unshakeable brand reputation."
    },
    internal_process: {
      key: "internal_process",
      name: "3. Internal Process Perspective",
      strategicGoal: "Operational Velocity & Zero Trust Architecture",
      primaryKpi: "Mean Time to Detect (MTTD) & Remediate (MTTR)",
      targetValue: "MTTD < 15m | MTTR < 1h",
      actualValue: "MTTD = 11 mins | MTTR = 38 mins",
      insuranceImpact: "Rapid Containment Prevents Lateral Movement",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      metrics: [
        { label: "Mean Time to Detect (MTTD)", val: "11 Minutes (Target < 15m)" },
        { label: "Mean Time to Remediate", val: "38 Minutes (Target < 60m)" },
        { label: "Critical CVE Patch Velocity", val: "100% Patched in < 48h" },
        { label: "Zero-Trust mTLS Adoption", val: "100% East-West Microservices" }
      ],
      details:
        "Measures operational efficiency, vulnerability patching velocity, and automated SOC response times to minimize threat dwell time and eliminate lateral attack spread."
    },
    learning_growth: {
      key: "learning_growth",
      name: "4. Learning & Growth Perspective",
      strategicGoal: "Security Culture & Human Resilience",
      primaryKpi: "Employee Phishing Resilience & Talent Retention",
      targetValue: "> 95% Simulation Pass Rate",
      actualValue: "96.4% Simulation Pass Rate",
      insuranceImpact: "Human Firewall Eliminates Spear-Phishing",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      metrics: [
        { label: "Phishing Simulation Pass Rate", val: "96.4% (Industry Avg: 72%)" },
        { label: "Staff Training Completion", val: "100% (350/350 Employees)" },
        { label: "CISO Team Certifications", val: "100% CISSP / CISM Certified" },
        { label: "Security Talent Retention", val: "92% Annual Retention Rate" }
      ],
      details:
        "Fosters a proactive enterprise security culture through monthly unannounced phishing simulations, role-based developer training, and elite team certifications."
    }
  };

  const activeBsc = bscPerspectives[selectedBscKey];

  // Studio 2: Risk Hierarchy Thresholds Data
  const riskThresholds = {
    risk_capacity: {
      key: "risk_capacity",
      name: "1. Risk Capacity (Max Solvency Limit)",
      amount: "₹100,00,00,000 (₹100 Crores)",
      owner: "Executive Board & Shareholders",
      definition:
        "The absolute maximum catastrophic financial and operational loss the enterprise can endure before facing total insolvency, bankruptcy, or regulatory license revocation.",
      statusText: "HARD BOUNDARY (Exceeding causes enterprise collapse)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    risk_appetite: {
      key: "risk_appetite",
      name: "2. Risk Appetite (Board Approved)",
      amount: "₹5,00,00,000 (₹5 Crores)",
      owner: "Board of Directors & Risk Committee",
      definition:
        "The broad level and types of cyber risk the organization is willingly prepared to accept in pursuit of its business mission, innovation, and digital transformation goals.",
      statusText: "STRATEGIC GOVERNANCE TARGET (Approved by Board)",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    risk_tolerance: {
      key: "risk_tolerance",
      name: "3. Risk Tolerance (Operational Variance)",
      amount: "₹6,00,00,000 (₹6 Crores)",
      owner: "CISO & Business Unit Leaders",
      definition:
        "The acceptable tactical, temporary variance allowed around the target risk appetite (e.g. extending patch SLAs by 24 hours during peak sales seasons without board escalation).",
      statusText: "OPERATIONAL CEILING (Allowable tactical deviation)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    residual_risk: {
      key: "residual_risk",
      name: "4. Residual Risk (Measured Post-Controls)",
      amount: "₹3,20,00,000 (₹3.2 Crores)",
      owner: "CISO Office & SOC Operations",
      definition:
        "The actual measured risk remaining after technical, administrative, and physical controls are actively deployed ($Residual = Inherent - Controls$). Must stay strictly below appetite.",
      statusText: "GOVERNANCE VERDICT: STABLE (Residual < Tolerance < Appetite)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeThreshold = riskThresholds[selectedRiskThresholdKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_strategic_roadmap",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "3-Year Strategic Roadmap & Balanced Scorecard",
      budget: "₹18,50,000",
      challenge: "Payment Switch Expansion Delayed by Lack of Strategic Governance",
      dilemma:
        "Expansion of a 500-node payment processing switch was stalled due to uncoordinated security controls, slowing down B2B enterprise client acquisition.",
      resolution:
        "Mamata built a 3-Year Security Strategy Roadmap and Balanced Scorecard aligned with ISO 27001:2022, shortening enterprise client security vetting from 6 months to 10 days.",
      metrics: {
        vettingAccelerated: "10-Day Vendor Approval",
        bscMaturity: "All 4 Perspectives Green",
        enterpriseDealsWon: "₹35 Crores in B2B Contracts",
        compliance: "ISO/IEC 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_dpdp_minimization",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "DPDP Data Minimization & Consent Alignment",
      budget: "₹7,20,000",
      challenge: "Hospital Databases Hoarding 15 Years of Unmanaged Patient Scans",
      dilemma:
        "Hospital databases were hoarding 15 years of unmanaged patient diagnostic scans with no retention policy, creating massive ₹250 Crore liability exposure under the DPDP Act 2023.",
      resolution:
        "Mahima implemented automated storage limitation and consent governance under Section 8 of the DPDP Act 2023, purging obsolete records and immunizing the hospital against regulatory fines.",
      metrics: {
        dataPurged: "60% Storage Reduction",
        consentAutomated: "100% Patient Consent Traced",
        dpdpLiabilityAverted: "₹250 Crores Margin Protected",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_appetite",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Substation SCADA Risk Appetite Governance",
      budget: "₹11,80,000",
      challenge: "Defining Explicit Risk Appetites for 18 Substation RTUs",
      dilemma:
        "Defining acceptable risk tolerances for 18 high-voltage 220kV transmission substation RTUs to prevent remote unauthenticated grid disruption.",
      resolution:
        "Debangshu authored a formal Operational Risk Appetite Statement compliant with CEA and NCIIPC guidelines, mandating zero tolerance for remote unauthenticated firmware updates.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        riskTolerance: "Zero Tolerance for Remote Unauthenticated Code",
        gridUptime: "100.00% Uninterrupted Power",
        compliance: "CEA & NCIIPC Protected Systems"
      }
    },
    {
      id: "jadavpur_bsc_simulator",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Security Balanced Scorecard Simulator Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Connect Technical Vulnerabilities to Board Metrics",
      dilemma:
        "Computer science students struggled to connect technical vulnerabilities (CVEs) with executive governance scorecards, ROSI formulas, and risk appetite statements.",
      resolution:
        "The team authored an interactive Information Security Balanced Scorecard simulator, training 160+ students on calculating ROSI, tracking MTTD/MTTR metrics, and presenting to mock corporate boards.",
      metrics: {
        studentsTrained: "160+ Cyber BCA Students",
        scorecardsModeled: "Financial, Customer, Process, Growth",
        governanceMastery: "100% Exam & Lab Proficiency",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 2 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Strategic Goals of Information Security
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Align cybersecurity with long-term business vision: master the 4 perspectives of the Information Security Balanced Scorecard (BSC), 
            define board-level Risk Appetite vs. Risk Tolerance boundaries, and enforce DPDP Act 2023 Section 8 core data principles.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Information Security Balanced Scorecard (BSC) Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 1: Information Security Balanced Scorecard (BSC) Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 4 Balanced Scorecard perspectives to inspect strategic goals, key performance indicators (KPIs), operational metrics, and actual enterprise achievements.
            </p>
          </div>

          {/* BSC Perspective Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(bscPerspectives).map((bsc) => {
              const isSelected = selectedBscKey === bsc.key;
              return (
                <button
                  key={bsc.key}
                  onClick={() => setSelectedBscKey(bsc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{bsc.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{bsc.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active BSC Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeBsc.badgeClass)}>
                  Scorecard Dimension: {activeBsc.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeBsc.strategicGoal}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Primary Strategic KPI</span>
                <span className="text-base font-extrabold text-emerald-400">{activeBsc.actualValue}</span>
              </div>
            </div>

            {/* 4 Quantitative Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {activeBsc.metrics.map((met, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{met.label}</span>
                  <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{met.val}</span>
                </div>
              ))}
            </div>

            {/* Operational Impact & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Strategic Target vs Performance:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">Target: {activeBsc.targetValue} ➔ Performance: {activeBsc.actualValue}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Governance &amp; Executive Rationale:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{activeBsc.details}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Risk Appetite vs. Risk Tolerance Hierarchy Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Risk Capacity, Appetite &amp; Tolerance Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore the hierarchy of enterprise risk boundaries: Risk Capacity ➔ Risk Appetite ➔ Risk Tolerance ➔ Measured Residual Risk.
            </p>
          </div>

          {/* Threshold Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(riskThresholds).map((thresh) => {
              const isSelected = selectedRiskThresholdKey === thresh.key;
              return (
                <button
                  key={thresh.key}
                  onClick={() => setSelectedRiskThresholdKey(thresh.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{thresh.name.split(" (")[0].split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{thresh.amount}</div>
                </button>
              );
            })}
          </div>

          {/* Active Threshold Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeThreshold.badgeClass)}>
                  Risk Boundary: {activeThreshold.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Financial Threshold: {activeThreshold.amount}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Accountable Ownership</span>
                <span className="text-sm font-extrabold text-indigo-300">{activeThreshold.owner}</span>
              </div>
            </div>

            {/* Definition & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Governance Definition:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeThreshold.definition}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5 font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Governance Status &amp; Compliance Rule:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeThreshold.statusText}</p>
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
              Visualizing the 4 Perspectives of the Security Balanced Scorecard and the Hierarchy of Enterprise Risk Thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Balanced Scorecard 4 Quadrants */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Information Security Balanced Scorecard (BSC)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Left: Financial */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="110" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">1. FINANCIAL PERSPECTIVE</text>
                    <text x="40" y="70" fill="#c7d2fe" font-family="monospace" fontSize="8">• Return on Investment (ROSI &gt; 300%)</text>
                    <text x="40" y="90" fill="#c7d2fe" font-family="monospace" fontSize="8">• Insurance Premium Reductions</text>
                    <text x="40" y="110" fill="#34d399" font-family="monospace" fontSize="8">• Cost-to-Prevention Ratio: 1:12</text>
                  </g>

                  {/* Top Right: Customer & Privacy */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="110" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="9.5">2. CUSTOMER &amp; PRIVACY</text>
                    <text x="280" y="70" fill="#e0e7ff" font-family="monospace" fontSize="8">• DPDP Act Section 8 Compliance</text>
                    <text x="280" y="90" fill="#e0e7ff" font-family="monospace" fontSize="8">• 99.99% Consent SLA Delivery</text>
                    <text x="280" y="110" fill="#34d399" font-family="monospace" fontSize="8">• Customer Trust Benchmark 94/100</text>
                  </g>

                  {/* Bottom Left: Internal Process */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="155" width="210" height="110" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="130" y="177" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">3. INTERNAL PROCESS</text>
                    <text x="40" y="200" fill="#67e8f9" font-family="monospace" fontSize="8">• MTTD &lt; 15 mins | MTTR &lt; 1 hour</text>
                    <text x="40" y="220" fill="#67e8f9" font-family="monospace" fontSize="8">• 100% Patch Velocity in &lt; 48h</text>
                    <text x="40" y="240" fill="#34d399" font-family="monospace" fontSize="8">• Zero Trust mTLS Microsegments</text>
                  </g>

                  {/* Bottom Right: Learning & Growth */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="155" width="210" height="110" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="177" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">4. LEARNING &amp; GROWTH</text>
                    <text x="280" y="200" fill="#a7f3d0" font-family="monospace" fontSize="8">• 96%+ Phishing Drill Pass Rate</text>
                    <text x="280" y="220" fill="#a7f3d0" font-family="monospace" fontSize="8">• 100% Security Staff Certified</text>
                    <text x="280" y="240" fill="#34d399" font-family="monospace" fontSize="8">• High Talent Retention (&gt;90%)</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The 4 balanced perspectives ensuring holistic, sustainable enterprise security governance.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: The 4 strategic perspectives of the Information Security Balanced Scorecard (BSC).
              </p>
            </div>

            {/* Diagram 2: Hierarchy of Risk Thresholds */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Hierarchy of Enterprise Risk Thresholds
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: Risk Capacity */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="20" width="450" height="45" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="40" y="42" fill="#fca5a5" fontWeight="bold" fontSize="9">1. RISK CAPACITY (₹100 Crores)</text>
                    <text x="460" y="42" fill="#f87171" font-family="monospace" textAnchor="end" fontSize="8">Solvency Boundary</text>
                    <text x="40" y="56" fill="#fca5a5" font-family="monospace" fontSize="7">Exceeding this causes bankruptcy or regulatory license revocation.</text>
                  </g>

                  {/* Tier 2: Risk Appetite */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="45" y="75" width="410" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="60" y="97" fill="#c7d2fe" fontWeight="bold" fontSize="9">2. RISK APPETITE (₹5 Crores)</text>
                    <text x="440" y="97" fill="#818cf8" font-family="monospace" textAnchor="end" fontSize="8">Board Approved</text>
                    <text x="60" y="111" fill="#c7d2fe" font-family="monospace" fontSize="7">Broad level of risk the Board willingly accepts to pursue business mission.</text>
                  </g>

                  {/* Tier 3: Risk Tolerance */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="65" y="130" width="370" height="45" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="80" y="152" fill="#fbbf24" fontWeight="bold" fontSize="9">3. RISK TOLERANCE (₹6 Crores)</text>
                    <text x="420" y="152" fill="#fbbf24" font-family="monospace" textAnchor="end" fontSize="8">Operational Limit</text>
                    <text x="80" y="166" fill="#cbd5e1" font-family="monospace" fontSize="7">Allowable tactical variance around target risk appetite during peak operations.</text>
                  </g>

                  {/* Tier 4: Measured Residual Risk */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="85" y="185" width="330" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="100" y="207" fill="#34d399" fontWeight="bold" fontSize="9">4. RESIDUAL RISK (₹3.2 Crores - Controlled)</text>
                    <text x="400" y="207" fill="#d1fae5" font-family="monospace" textAnchor="end" fontSize="8">Active Controls</text>
                    <text x="100" y="224" fill="#a7f3d0" font-family="monospace" fontSize="7.5">
                      Residual Risk &le; Risk Tolerance &le; Risk Appetite &lt; Risk Capacity [COMPLIANT!]
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Governance rule: Residual risk must remain strictly below the approved risk appetite.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: The hierarchy of enterprise risk boundaries from Risk Capacity down to Residual Risk.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Strategic Security Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads build 3-year strategic roadmaps in Kolkata, align patient data with DPDP Section 8 in Ichapur, govern SCADA risk appetites in Barrackpore, and simulate balanced scorecards in Jadavpur.
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
                  <span>⚡</span> Strategic Governance Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Strategic Solution
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
              Guidelines for enterprise security officers establishing long-term strategic roadmaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Strategic Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Embed Security by Design:</strong> Build automated security guardrails into CI/CD pipelines (DevSecOps).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Formally Document Risk Appetite:</strong> Secure Board Risk Committee signoff to establish defensible limits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Balance the 4 BSC Perspectives:</strong> Track financial, customer, process, and human growth simultaneously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Section 8:</strong> Implement automated data minimization and storage limitation purges.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Strategic Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Aiming for "Zero Risk":</strong> Zero risk is economically impossible; aim for risk appetite alignment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Hoarding Customer Records:</strong> Infinite data storage violates DPDP rules and increases breach liability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Operating Without a Roadmap:</strong> Purchasing disjointed tools without a 3-year phased plan causes chaos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting NCIIPC CII Rules:</strong> Failing to isolate protected SCADA networks risks 10-year prison terms.</span>
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
                  <span><strong>Maintain Active Risk Registers:</strong> Review risk likelihood, impact, and treatment plans quarterly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Continuous Security Monitoring:</strong> Maintain real-time telemetry across multi-cloud and endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Executive Tabletop Drills:</strong> Practice board-level crisis communication and CERT-In reporting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Residual &le; Appetite:</strong> Never deploy new products whose residual risk exceeds board tolerance.</span>
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
              Synthesize strategic security goals and risk appetite mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Enterprise Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why security strategy must align with business strategy: Security controls that cripple employee productivity or delay customer feature releases will be bypassed. Effective strategic security provides pre-approved, automated guardrails (DevSecOps) that enable the business to move faster with confidence.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The strict mathematical hierarchy of risk thresholds: Residual Risk must always remain below Risk Tolerance, which is bounded by Risk Appetite, which is strictly below Risk Capacity ($Residual \le Tolerance \le Appetite &lt; Capacity$). If residual risk exceeds appetite, immediate mitigation is mandatory.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security governance designs, implement a 4-perspective Balanced Scorecard (Financial, Customer/Privacy, Process, Growth) to ensure your security program satisfies both technical auditors and executive board members.
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
                <span>Strategic security aligns with 3-5 year corporate plans; operational is tactical.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The 4 BSC Perspectives: Financial, Customer, Internal Process, Learning &amp; Growth.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Capacity &gt; Risk Appetite &ge; Risk Tolerance &ge; Residual Risk.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The 4 Risk Treatments: Mitigate, Transfer, Avoid, and Accept.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 enforces Purpose, Minimization, and Storage Limitation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70/70A establishes NCIIPC protection for Protected Systems.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Strategic Goals of Information Security FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Governance Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Strategic Goals of Information Security (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Defining clear strategic goals transforms Information Security from a reactive cost center into an indispensable corporate asset. Master the 4 perspectives of the Information Security Balanced Scorecard, establish formal Board-approved Risk Appetite Statements, enforce the risk hierarchy rule ($Residual \le Tolerance \le Appetite < Capacity$), and ensure your data architecture honors the core data principles under Section 8 of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
