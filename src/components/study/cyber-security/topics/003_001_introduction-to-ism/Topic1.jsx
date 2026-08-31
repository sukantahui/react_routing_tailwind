import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: ROSI Profile State
  const [selectedRosiKey, setSelectedRosiKey] = useState("fintech_db");

  // Studio 2: Threat Vector State
  const [selectedThreatKey, setSelectedThreatKey] = useState("ransomware_extortion");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_rosi_budget");

  // Studio 1: ROSI Profiles Data
  const rosiProfiles = {
    fintech_db: {
      key: "fintech_db",
      name: "1. Kolkata FinTech Payment Gateway",
      assetName: "Core Banking Transaction DB",
      assetValueRaw: 100000000, // ₹10 Crores
      assetValueText: "₹10,00,00,000 (₹10 Crores)",
      exposureFactor: 0.40, // 40%
      exposureText: "40% (Customer Data Leak & Downtime)",
      aro: 0.50, // Once every 2 years
      aroText: "0.50 (Once every 2 years)",
      controlCostRaw: 1500000, // ₹15 Lakhs/year
      controlCostText: "₹15,00,000 / year (EDR + 24/7 SOC)",
      mitigationRate: 0.85, // 85%
      mitigationText: "85% Threat Reduction",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    hospital_pacs: {
      key: "hospital_pacs",
      name: "2. Ichapur Health DICOM Imaging PACS",
      assetName: "Radiology Oncology PACS Servers",
      assetValueRaw: 40000000, // ₹4 Crores
      assetValueText: "₹4,00,00,000 (₹4 Crores)",
      exposureFactor: 0.50, // 50%
      exposureText: "50% (ICU Downtime & Tampering)",
      aro: 0.80, // 0.8 times/year
      aroText: "0.80 (Once every 15 months)",
      controlCostRaw: 800000, // ₹8 Lakhs/year
      controlCostText: "₹8,00,000 / year (Zero Trust + Backups)",
      mitigationRate: 0.90, // 90%
      mitigationText: "90% Threat Reduction",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    scada_grid: {
      key: "scada_grid",
      name: "3. Barrackpore 220kV SCADA RTUs",
      assetName: "Substation Switching RTU Network",
      assetValueRaw: 250000000, // ₹25 Crores
      assetValueText: "₹25,00,00,000 (₹25 Crores)",
      exposureFactor: 0.20, // 20%
      exposureText: "20% (Grid Tripping & Equipment Damage)",
      aro: 0.20, // Once every 5 years
      aroText: "0.20 (Once every 5 years)",
      controlCostRaw: 1200000, // ₹12 Lakhs/year
      controlCostText: "₹12,00,00,000 / year (OT Air-Gap + Hardware Tokens)",
      mitigationRate: 0.95, // 95%
      mitigationText: "95% Threat Reduction",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeRosi = rosiProfiles[selectedRosiKey];

  // Mathematical Calculations
  const calculatedMetrics = useMemo(() => {
    const sle = activeRosi.assetValueRaw * activeRosi.exposureFactor;
    const aleUnmitigated = sle * activeRosi.aro;
    const aleMitigated = aleUnmitigated * (1 - activeRosi.mitigationRate);
    const riskSavings = aleUnmitigated - aleMitigated;
    const netBenefit = riskSavings - activeRosi.controlCostRaw;
    const rosiPercent = ((netBenefit / activeRosi.controlCostRaw) * 100).toFixed(1);

    const formatInr = (val) => "₹" + Math.round(val).toLocaleString("en-IN");

    return {
      sleFormatted: formatInr(sle),
      aleUnmitigatedFormatted: formatInr(aleUnmitigated),
      aleMitigatedFormatted: formatInr(aleMitigated),
      riskSavingsFormatted: formatInr(riskSavings),
      netBenefitFormatted: formatInr(netBenefit),
      rosiPercent
    };
  }, [activeRosi]);

  // Studio 2: Threat Vectors Data
  const threatVectors = {
    ransomware_extortion: {
      key: "ransomware_extortion",
      name: "1. Double-Extortion Ransomware",
      threatActor: "Organized RaaS Syndicates (LockBit, BlackCat)",
      impactSeverity: "CRITICAL (Complete Operational Paralysis)",
      businessConsequence:
        "Encrypts critical production databases while exfiltrating proprietary records to darknet leak sites. Average downtime: 14 days with ransom demands exceeding ₹5-20 Crores.",
      safeguard: "Immutable air-gapped WORM backups, EDR behavioural heuristics, and Zero Trust network segmentation."
    },
    regulatory_penalties: {
      key: "regulatory_penalties",
      name: "2. Statutory DPDP Penalties",
      threatActor: "Data Protection Board of India / Regulators",
      impactSeverity: "LEGAL & FINANCIAL (Up to ₹250 Crores)",
      businessConsequence:
        "Section 33 of the DPDP Act 2023 imposes direct financial penalties up to ₹250 Crores for failure to prevent personal data breaches, alongside mandatory CERT-In 6-hour reporting liabilities.",
      safeguard: "Formal ISO 27001 ISMS, end-to-end AES-256 encryption, role-based IAM, and automated 6-hour incident playbooks."
    },
    supply_chain_api: {
      key: "supply_chain_api",
      name: "3. Supply Chain & Vendor Breaches",
      threatActor: "Nation-State APTs & Cyber Mercenaries",
      impactSeverity: "HIGH (Inherited Third-Party Compromise)",
      businessConsequence:
        "Attackers compromise smaller, less secure billing or analytics SaaS vendors to inherit trusted API tokens, bypassing enterprise edge firewalls and accessing core databases.",
      safeguard: "Third-Party Risk Management (TPRM), mandatory vendor SOC 2 audits, API token rotation, and least-privilege scoping."
    },
    shadow_it_ai: {
      key: "shadow_it_ai",
      name: "4. Shadow IT & Cloud Data Leaks",
      threatActor: "Untrained Employees & Insider Negligence",
      impactSeverity: "MODERATE TO HIGH (Unmonitored IP Loss)",
      businessConsequence:
        "Employees paste confidential source code, financial models, or customer PII into unapproved public AI tools and cloud drives, causing silent data leaks outside security logs.",
      safeguard: "Cloud Access Security Brokers (CASB), Acceptable Use Policies (AUP), DLP agents, and continuous security culture training."
    }
  };

  const activeThreat = threatVectors[selectedThreatKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_rosi_budget",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "₹25,00,000 ISM Budget Justification via ROSI",
      budget: "₹25,00,000",
      challenge: "Board Viewing Security as an Unproductive IT Expense",
      dilemma:
        "The corporate Board of Directors rejected a ₹25 Lakh cybersecurity request, viewing it as an unnecessary overhead with zero tangible business return.",
      resolution:
        "Mamata presented an econometric ROSI model proving that the ₹25 Lakh investment prevented ₹1.8 Crores in Annual Loss Expectancy, yielding a +620% ROSI and board approval.",
      metrics: {
        budgetApproved: "₹25,00,000 Investment",
        aleMitigated: "₹1,80,00,000 / Year Saved",
        rosiDelivered: "+620% Economic Return",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_icu_downtime",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "ICU Ransomware Downtime Cost Mitigation",
      budget: "₹8,20,000",
      challenge: "Hospital Systems at Risk of ₹85,000/hour ICU Downtime",
      dilemma:
        "Hospital clinical imaging servers were at risk of ransomware, with clinical downtime costing ₹85,000 per hour and directly endangering critical patient surgeries.",
      resolution:
        "Mahima deployed immutable air-gapped backups and zero-trust access controls under DPDP Section 33, guaranteeing sub-30 minute recovery and eliminating extortion vulnerabilities.",
      metrics: {
        recoverySla: "Sub-30 Minute Recovery",
        downtimeSaved: "₹85,000 / Hour Averted",
        patientSafety: "100.00% Surgical Continuity",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_grid_resilience",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Black-Sky Power Grid Cyber Risk Governance",
      budget: "₹12,80,000",
      challenge: "Preventing State-Wide Blackouts from Substation Malware",
      dilemma:
        "Preventing catastrophic state-wide blackouts caused by industrial malware targeting 220kV RTUs across industrial manufacturing hubs in West Bengal.",
      resolution:
        "Debangshu established a formal OT-specific ISMS aligned with CEA Cyber Security Regulations, ensuring 100.00% authenticated grid switching and zero unauthorized tripping.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        gridUptime: "100.00% Zero Disruption",
        blackoutRisk: "0% Unauthorized Tripping",
        compliance: "CEA & NCIIPC CII Charter"
      }
    },
    {
      id: "jadavpur_msme_rosi_lab",
      lead: "Abhronila & Susmita",
      role: "University Security Research Leads",
      location: "Jadavpur University AI Labs",
      title: "MSME Risk Assessment & ROSI Laboratory",
      budget: "₹4,50,000",
      challenge: "Small Businesses Unable to Quantify Cyber Loss Expectancy",
      dilemma:
        "Small businesses (MSMEs) in West Bengal struggled to quantify cyber risk, calculate ALE, and justify cybersecurity spending to investors.",
      resolution:
        "The team built an interactive open-source ALE/ROSI economic calculator, training 180+ business students and local entrepreneurs on cybersecurity financial modeling.",
      metrics: {
        msmesTrained: "180+ Business Entrepreneurs",
        modelsAuthored: "Open-Source ROSI Calculator",
        averageRosiModeled: "+340% Security ROI",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 1 of 10
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Need and Importance of ISM in Modern Enterprises
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Discover why Information Security Management is a vital business imperative: explore the economics of cybersecurity through 
            Single Loss Expectancy (SLE), Annual Loss Expectancy (ALE), Return on Security Investment (ROSI), and mitigate devastating ₹250 Crore penalties under the Indian DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Return on Security Investment (ROSI) & ALE Economic Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💰</span> Studio 1: Cyber Risk Economics &amp; ROSI Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise asset profile to calculate Single Loss Expectancy ($SLE$), Annual Loss Expectancy ($ALE$), and prove Return on Security Investment ($ROSI$).
            </p>
          </div>

          {/* Profile Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(rosiProfiles).map((prof) => {
              const isSelected = selectedRosiKey === prof.key;
              return (
                <button
                  key={prof.key}
                  onClick={() => setSelectedRosiKey(prof.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{prof.name.split(". ")[1]}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{prof.assetName}</div>
                </button>
              );
            })}
          </div>

          {/* Active Profile Calculation Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeRosi.badgeClass)}>
                  Asset Profile: {activeRosi.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeRosi.assetName}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Net ROSI Economic Return</span>
                <span className="text-xl font-extrabold text-emerald-400">+{calculatedMetrics.rosiPercent}% ROI</span>
              </div>
            </div>

            {/* Quantitative Input Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Asset Value (AV)</span>
                <span className="font-bold text-cyan-300 text-xs sm:text-sm mt-0.5 block">{activeRosi.assetValueText}</span>
              </div>
              <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Exposure Factor (EF)</span>
                <span className="font-bold text-amber-300 text-xs sm:text-sm mt-0.5 block">{activeRosi.exposureText}</span>
              </div>
              <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Annual Occurrence (ARO)</span>
                <span className="font-bold text-indigo-300 text-xs sm:text-sm mt-0.5 block">{activeRosi.aroText}</span>
              </div>
              <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Security Control Cost</span>
                <span className="font-bold text-rose-300 text-xs sm:text-sm mt-0.5 block">{activeRosi.controlCostText}</span>
              </div>
            </div>

            {/* Calculated Risk Output Tableau */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-gray-900/90 p-3.5 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Single Loss Expectancy (SLE):</span>
                <p className="text-white text-base font-extrabold">{calculatedMetrics.sleFormatted}</p>
                <p className="text-[10px] text-gray-400 font-sans">SLE = Asset Value &times; Exposure Factor</p>
              </div>

              <div className="bg-gray-900/90 p-3.5 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Unmitigated ALE / Year:</span>
                <p className="text-white text-base font-extrabold">{calculatedMetrics.aleUnmitigatedFormatted}</p>
                <p className="text-[10px] text-gray-400 font-sans">ALE = SLE &times; Annual Rate of Occurrence</p>
              </div>

              <div className="bg-gray-900/90 p-3.5 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Net Risk Loss Prevented:</span>
                <p className="text-emerald-400 text-base font-extrabold">{calculatedMetrics.riskSavingsFormatted} / yr</p>
                <p className="text-[10px] text-gray-400 font-sans">Risk reduction at {activeRosi.mitigationText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Enterprise Threat Impact & Business Risk Radar */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 2: Enterprise Threat Impact &amp; Business Risk Radar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a critical enterprise threat vector to inspect its threat actor profile, operational impact, and recommended ISM governance safeguard.
            </p>
          </div>

          {/* Threat Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(threatVectors).map((vec) => {
              const isSelected = selectedThreatKey === vec.key;
              return (
                <button
                  key={vec.key}
                  onClick={() => setSelectedThreatKey(vec.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{vec.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{vec.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Threat Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-rose-950 text-rose-300 border-rose-800">
                  Risk Category: {activeThreat.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeThreat.threatActor}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Impact Severity</span>
                <span className="text-sm font-extrabold text-rose-400">{activeThreat.impactSeverity}</span>
              </div>
            </div>

            {/* Business Consequence vs Safeguard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5 font-mono">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Business &amp; Financial Fallout:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeThreat.businessConsequence}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5 font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory ISM Governance Safeguard:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeThreat.safeguard}</p>
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
              Visualizing the Cost of Cyber Breach vs ISM Investment Curve and the Modern Expanded Enterprise Threat Surface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Cost of Breach vs ISM Investment */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Breach Loss vs. Proactive ISM Investment
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Unmitigated Breach Loss */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9.5">UNMANAGED RISK EXPOSURE</text>
                    <text x="40" y="75" fill="#cbd5e1" font-family="monospace" fontSize="8">• Average Breach: ₹17.5 Crores</text>
                    <text x="40" y="100" fill="#fca5a5" font-family="monospace" fontSize="8">• DPDP Fine: Up to ₹250 Crores</text>
                    <text x="40" y="125" fill="#cbd5e1" font-family="monospace" fontSize="8">• 14 Days ICU/Switch Downtime</text>
                    <text x="40" y="150" fill="#f87171" font-family="monospace" fontWeight="bold" fontSize="8">• Severe Brand Destruction</text>
                    <text x="130" y="235" fill="#ef4444" textAnchor="middle" fontSize="8">CATASTROPHIC INSOLVENCY</text>
                  </g>

                  {/* Proactive ISM Governance */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">PROACTIVE ENTERPRISE ISM</text>
                    <text x="280" y="75" fill="#cbd5e1" font-family="monospace" fontSize="8">• Investment: ₹15-25 Lakhs/yr</text>
                    <text x="280" y="100" fill="#6ee7b7" font-family="monospace" fontSize="8">• ISO 27001 ISMS &amp; 24/7 SOC</text>
                    <text x="280" y="125" fill="#cbd5e1" font-family="monospace" fontSize="8">• Sub-15 Min Threat Containment</text>
                    <text x="280" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" fontSize="8">• ROSI Return: +300% to +600%</text>
                    <text x="370" y="235" fill="#10b981" textAnchor="middle" fontSize="8">100% SUSTAINABLE RESILIENCE</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Proactive ISM converts unpredictable breach catastrophes into controlled, high-ROI investments.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: Cost of unmanaged cyber breach compared against proactive ISM investment.
              </p>
            </div>

            {/* Diagram 2: Expanded Threat Landscape */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The Modern Expanded Enterprise Threat Landscape
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Core Enterprise Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="120" width="200" height="70" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="145" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">ENTERPRISE CORE ASSETS</text>
                    <text x="250" y="162" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">Payment DB • PACS • SCADA RTUs</text>
                    <text x="250" y="176" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="7">Protected by Zero Trust ISM</text>
                  </g>

                  {/* 4 Threat Vectors around core */}
                  {/* Top: Multi-Cloud */}
                  <rect x="175" y="20" width="150" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                  <text x="250" y="44" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">Multi-Cloud (AWS/Azure)</text>
                  <line x1="250" y1="60" x2="250" y2="120" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan37)" />

                  {/* Bottom: Remote Work / BYOD */}
                  <rect x="175" y="240" width="150" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                  <text x="250" y="264" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">Remote Work &amp; BYOD</text>
                  <line x1="250" y1="240" x2="250" y2="190" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan37)" />

                  {/* Left: Supply Chain APIs */}
                  <rect x="15" y="135" width="105" height="40" rx="4" fill="#18181b" stroke="#f59e0b" />
                  <text x="67" y="158" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">Supply Chain APIs</text>
                  <line x1="120" y1="155" x2="150" y2="155" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold37)" />

                  {/* Right: Shadow IT & AI */}
                  <rect x="380" y="135" width="105" height="40" rx="4" fill="#18181b" stroke="#f59e0b" />
                  <text x="432" y="158" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">Shadow IT &amp; AI</text>
                  <line x1="380" y1="155" x2="350" y2="155" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold37)" />

                  <text x="250" y="305" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The modern perimeter is dissolved across Cloud, Remote Work, APIs, and Shadow IT.
                  </text>

                  <defs>
                    <marker id="arrowCyan37" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold37" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: The modern expanded attack surface connecting Cloud, Remote Users, Supply Chains, and Shadow IT.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Enterprise ISM Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads calculate ROSI to unlock ₹25 Lakh budgets in Kolkata, eliminate ICU downtime in Ichapur, protect 220kV power grids in Barrackpore, and build economic simulators in Jadavpur.
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
                  <span>⚡</span> Economic Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied ISM Strategy
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
              Guidelines for cybersecurity leaders and CISOs presenting risk economics to executive leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Strategic CISO Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Speak in Terms of Money &amp; Risk:</strong> Present all technical proposals with SLE, ALE, and ROSI metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Leverage DPDP Section 33:</strong> Highlight statutory fines up to ₹250 Crores to ensure executive buy-in.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Cyber Insurance Warranties:</strong> Ensure MFA and offline backups are active to prevent claim denials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt Zero Trust (NIST SP 800-207):</strong> Never assume internal corporate networks are trustworthy.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Economic Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Pitching Jargon to the Board:</strong> Presenting firewall specs instead of financial risk reduction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Third-Party APIs:</strong> Supply chain compromises bypass multi-crore perimeter firewalls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting Shadow IT:</strong> Staff uploading customer spreadsheets to unvetted cloud AI tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Treating ISM as a Cost Center:</strong> Failing to use ISO 27001 certification to accelerate B2B enterprise sales.</span>
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
                  <span><strong>Deploy Immutable WORM Backups:</strong> Eliminates ransom leverage during double-extortion attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Third-Party Risk (TPRM):</strong> Contractually mandate SOC 2 Type II audits for all vendors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate CERT-In 6-Hour Escalation:</strong> Maintain continuous 24/7 SOC detection pipelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Quantify Residual Risk Annually:</strong> Update Asset Registers (IAR) and recalculate ALE quarterly.</span>
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
              Synthesize key cyber risk economics and business justifications before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Security Economists
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  How quantitative risk formulas justify spending: If an asset is worth ₹10 Crores and has an annual loss expectancy of ₹1 Crore, spending ₹15 Lakhs on security controls that eliminate 85% of that risk delivers an enormous positive return on investment (+620% ROSI).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why perimeter security (Castle-and-Moat) is obsolete: In modern cloud and remote work environments, there is no single physical boundary. Modern security must follow the Zero Trust architecture: authenticate and encrypt every single user, microservice, and API transaction.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  When speaking to executive leadership, never pitch technical feature checklists; frame every security control as risk mitigation ($ALE$) that protects shareholder value and immunizes the company against ₹250 Crore statutory fines under the DPDP Act 2023.
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
                <span>Single Loss Expectancy (SLE) = Asset Value (AV) &times; Exposure Factor (EF).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Annual Loss Expectancy (ALE) = SLE &times; Annual Rate of Occurrence (ARO).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ROSI quantifies the economic return on cybersecurity budget spending.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Castle-and-Moat has failed; Zero Trust Architecture is mandatory.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 Section 33 penalizes unmanaged data breaches up to ₹250 Cr.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27001 is legally recognized as "Reasonable Security Practices" (IT Act).</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Need and Importance of ISM in Modern Enterprises FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Security Economics Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Need and Importance of ISM in Modern Enterprises (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Understanding the economic and business necessity of Information Security Management is what elevates an engineer into an executive leader. Always speak the language of financial risk: quantify Single Loss Expectancy (SLE) and Annual Loss Expectancy (ALE), compute Return on Security Investment (ROSI) to justify cybersecurity budgets, enforce Zero Trust across dissolved perimeters, and protect your organization against catastrophic ₹250 Crore penalties under the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
