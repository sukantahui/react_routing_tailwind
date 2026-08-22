import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: Rules of Engagement (RoE) Configurator State
  const [targetScopeType, setTargetScopeType] = useState("web_api"); // web_api, full_network, external_only
  const [testingTimeWindow, setTestingTimeWindow] = useState("off_peak"); // off_peak (01-05 AM IST), business_hours, continuous_24_7
  const [allowDosTesting, setAllowDosTesting] = useState(false);
  const [allowSocialEngineering, setAllowSocialEngineering] = useState(false);
  const [clientAuthorizationLevel, setClientAuthorizationLevel] = useState("ciso"); // ciso, it_manager, junior_admin

  // Studio 2: Cyber Law Offense Selector State
  const [selectedLawKey, setSelectedLawKey] = useState("india_it_act");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_banking");

  // Cyber Law Data for Studio 2
  const cyberLaws = {
    india_it_act: {
      key: "india_it_act",
      name: "India: Information Technology Act, 2000 & Amendments",
      statute: "IT Act 2000 (Sections 43, 66, 66C, 66D, 66F)",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      primaryProvisions: [
        { sec: "Section 43", penalty: "Civil Compensation", desc: "Damages for unauthorized access, data downloading, or introducing contaminants." },
        { sec: "Section 66", penalty: "Up to 3 Yrs Jail + ₹5L Fine", desc: "Criminal hacking committed dishonestly or fraudulently without owner permission." },
        { sec: "Section 66C/D", penalty: "Up to 3 Yrs Jail + ₹1L Fine", desc: "Identity theft (stolen passwords) and cheating by personation (phishing)." },
        { sec: "Section 66F", penalty: "LIFE IMPRISONMENT", desc: "Cyber terrorism threatening national sovereignty or critical infrastructure." }
      ],
      dpdpActNote: "Under DPDP Act 2023, failure to implement reasonable safeguards causing data breach risks fines up to ₹250 Crores."
    },
    us_cfaa: {
      key: "us_cfaa",
      name: "United States: Computer Fraud & Abuse Act (CFAA)",
      statute: "18 U.S.C. § 1030",
      color: "from-blue-500 to-indigo-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      primaryProvisions: [
        { sec: "18 U.S.C. § 1030(a)(2)", penalty: "Up to 5 Yrs Imprisonment", desc: "Intentionally accessing a protected computer without authorization to obtain financial or government records." },
        { sec: "18 U.S.C. § 1030(a)(5)", penalty: "Up to 10-20 Yrs Imprisonment", desc: "Knowingly causing transmission of malware or code that causes damage to protected computers." },
        { sec: "Van Buren Precedent (2021)", penalty: "Supreme Court Clarification", desc: "Narrows law to technical access barrier bypasses, not mere workplace policy misuse." }
      ],
      dpdpActNote: "US State laws (e.g. CCPA/CPRA) impose statutory civil damages up to $750 per consumer per incident for negligent data breaches."
    },
    uk_cma: {
      key: "uk_cma",
      name: "United Kingdom: Computer Misuse Act (CMA) 1990",
      statute: "CMA 1990 & GDPR Article 32/33",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      primaryProvisions: [
        { sec: "Section 1", penalty: "Up to 2 Yrs Imprisonment", desc: "Unauthorized access to computer material (Basic digital trespass)." },
        { sec: "Section 2", penalty: "Up to 5 Yrs Imprisonment", desc: "Unauthorized access with intent to commit or facilitate further serious crimes." },
        { sec: "Section 3", penalty: "Up to 10 Yrs / Life Imprisonment", desc: "Unauthorized acts with intent to impair computer operation; Life if national defense is threatened." }
      ],
      dpdpActNote: "UK/EU GDPR mandates 72-hour breach reporting to the ICO with fines up to €20 Million or 4% of global annual turnover."
    }
  };

  const activeLaw = cyberLaws[selectedLawKey];

  // Dynamic Contract & Risk Assessment for Studio 1
  const contractEvaluation = useMemo(() => {
    let legalStatus = "VALID & COMPLIANT";
    let statusColor = "text-emerald-400";
    let riskFlags = [];

    if (clientAuthorizationLevel !== "ciso") {
      legalStatus = "INVALID (Unauthorized Signer)";
      statusColor = "text-rose-400";
      riskFlags.push("Junior / Mid-level IT staff cannot legally authorize penetration testing. Signature must be CISO, CEO, or VP of Security.");
    }

    if (allowDosTesting) {
      riskFlags.push("WARNING: Denial of Service testing permitted on live environment. High risk of production downtime and commercial SLA breach.");
    }

    if (testingTimeWindow === "business_hours" && allowDosTesting) {
      legalStatus = "HIGH OPERATIONAL HAZARD";
      statusColor = "text-rose-400";
      riskFlags.push("CRITICAL: Executing DoS attacks during active daytime business hours violates standard duty-of-care obligations.");
    }

    if (allowSocialEngineering) {
      riskFlags.push("NOTE: Human social engineering included. Must strictly exclude executive personal family numbers and emergency dispatch centers.");
    }

    return {
      legalStatus,
      statusColor,
      riskFlags,
      scopeSummary: targetScopeType === "web_api" ? "Target Web Domains & REST API Gateways" : targetScopeType === "full_network" ? "Full Internal Active Directory & Subnets" : "External Perimeter IP Ranges Only",
      timeWindowSummary: testingTimeWindow === "off_peak" ? "Off-Peak Window: 01:00 AM - 05:00 AM IST (Safest)" : testingTimeWindow === "business_hours" ? "Standard Business Hours: 09:00 AM - 06:00 PM IST" : "24/7 Continuous Red Team Window"
    };
  }, [targetScopeType, testingTimeWindow, allowDosTesting, allowSocialEngineering, clientAuthorizationLevel]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_banking",
      lead: "Mamata",
      role: "Lead Penetration Testing Consultant",
      location: "Kolkata FinTech Hub",
      title: "Core UPI Banking Audit Scope Contract",
      budget: "₹8,50,000",
      legalDilemma:
        "While conducting an authorized audit on a commercial bank's internet banking portal, Mamata discovered a path that could pivot directly into the live UPI transaction settlement database.",
      ethicalResolution:
        "The signed Rules of Engagement (RoE) explicitly designated the core settlement database as OUT-OF-SCOPE during business hours. Mamata halted testing, took cryptographic screenshots of the routing table, and delivered an immediate interim vulnerability alert to the Bank CISO without querying live customer balances.",
      metrics: {
        scopeCompliance: "100% RoE Strict Adherence",
        financialAssetProtected: "₹500+ Crores Daily Settlements",
        vulnerabilitySeverity: "Critical (Pivoting Path)",
        compliance: "RBI Master Direction & IT Act Section 43/66"
      }
    },
    {
      id: "ichapur_hospital",
      lead: "Mahima",
      role: "Chief Hospital Information Security Officer",
      location: "Ichapur General Hospital",
      title: "Patient Medical Record Confidentiality",
      budget: "₹4,80,000",
      legalDilemma:
        "A third-party security firm testing ward IoT infusion pumps accidentally downloaded an unencrypted SQL database backup containing 15,000 patient diagnosis files and Aadhaar numbers.",
      ethicalResolution:
        "Mahima enforced the Non-Disclosure Agreement (NDA) and India's DPDP Act 2023 provisions. The testing firm signed an affidavit of secure cryptographic data destruction (DoD 5220.22-M wipe) and delivered remediation blueprints without retaining external copies of patient PII.",
      metrics: {
        recordsSecured: "15,000 Patient Files",
        legalLiabilityAvoided: "₹250 Crores (DPDP Act Cap)",
        dataWipeVerification: "100% Cryptographic Erase",
        compliance: "NABH & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "Industrial OT Protection Engineer",
      location: "Barrackpore 220kV Substation Grid",
      title: "Substation Emergency Abort Protocol",
      budget: "₹6,20,000",
      legalDilemma:
        "During vulnerability scanning on substation Remote Terminal Units (RTUs), an automated vulnerability probe caused an unhandled exception in an older protective relay, spiking CPU load to 95% and threatening an accidental high-voltage circuit breaker trip.",
      ethicalResolution:
        "Debangshu immediately invoked the RoE 'EMERGENCY ABORT PROTOCOL', terminating all scanning traffic within 2 seconds. The team switched to manual diagnostic logging, preventing a power blackout across North 24 Parganas.",
      metrics: {
        abortResponseTime: "1.8 Seconds",
        gridContinuity: "100% Uptime Maintained",
        protocolSecured: "IEC 60870-5-104 Gateway",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_consultancy",
      lead: "Abhronila & Susmita",
      role: "Cyber Threat Research Consultants",
      location: "Jadavpur University Cyber Consultancy",
      title: "Third-Party Vendor Credential Leak",
      budget: "₹3,90,000",
      legalDilemma:
        "While auditing an authorized corporate client domain, the team discovered exposed AWS root administrative credentials belonging to a third-party cloud analytics partner that was NOT listed in the signed scope.",
      ethicalResolution:
        "Resisted the temptation to scan or log into the third-party AWS account (which would constitute illegal unauthorized access under IT Act Section 66). Executed a formal coordinated vulnerability disclosure to the client CISO, who legally notified the vendor with Safe Harbor protections.",
      metrics: {
        legalBoundaryKept: "100% Within Client Scope",
        thirdPartyRiskMitigated: "Exposed AWS Root Account",
        reportingSpeed: "< 1 Hour",
        compliance: "IT Act 2000 Section 66 & CERT-In Directives"
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
            Cyber Security Module 002_002 • Topic 2 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ethical Hacking: Principles &amp; Legal Frameworks
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            The difference between a criminal cyber hacker and a professional ethical penetration tester is not technical skill, 
            but explicit legal authorization and unwavering moral discipline. Master the 5 Golden Rules, Rules of Engagement (RoE) 
            contracts, and comparative cyber laws (IT Act 2000, DPDP Act 2023, US CFAA, UK CMA).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Rules of Engagement (RoE) Contract Builder */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📝</span> Studio 1: Rules of Engagement (RoE) Legal Contract Builder
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure target parameters, testing windows, and authorization levels to evaluate the legal validity and operational safety of a penetration testing contract.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Contract Parameter Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Contract Scope &amp; Safety Parameters
              </h3>

              {/* Target Scope Type */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Designated Target Scope:</label>
                <select
                  value={targetScopeType}
                  onChange={(e) => setTargetScopeType(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="web_api">Designated Web Applications &amp; REST APIs</option>
                  <option value="external_only">External Perimeter IP Subnets Only</option>
                  <option value="full_network">Full Enterprise Internal Active Directory &amp; LAN</option>
                </select>
              </div>

              {/* Testing Time Window */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Permitted Testing Time Window:</label>
                <select
                  value={testingTimeWindow}
                  onChange={(e) => setTestingTimeWindow(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="off_peak">Off-Peak Night Window: 01:00 AM - 05:00 AM IST (Safest)</option>
                  <option value="business_hours">Business Hours: 09:00 AM - 06:00 PM IST (Monitored)</option>
                  <option value="continuous_24_7">Continuous 24/7 Red Team Window (High Realism)</option>
                </select>
              </div>

              {/* Client Signer Authorization Level */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Client Authorizing Signer:</label>
                <select
                  value={clientAuthorizationLevel}
                  onChange={(e) => setClientAuthorizationLevel(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="ciso">CISO / Chief Information Security Officer (Valid Safe Harbor)</option>
                  <option value="it_manager">Department IT Manager (Insufficient Legal Authority)</option>
                  <option value="junior_admin">Junior Systems Administrator (Completely Invalid)</option>
                </select>
              </div>

              {/* High Risk Toggles */}
              <div className="space-y-2 pt-2 border-t border-gray-800">
                <span className="text-[11px] font-semibold text-gray-400 block">High-Risk Testing Inclusions:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowDosTesting}
                    onChange={(e) => setAllowDosTesting(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-gray-300">Permit Denial of Service (DoS) Stress Testing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowSocialEngineering}
                    onChange={(e) => setAllowSocialEngineering(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-gray-300">Permit Human Social Engineering / Phishing</span>
                </label>
              </div>
            </div>

            {/* Generated Contract Summary & Legal Evaluation (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">RoE Legal Contract Evaluation</h3>
                  <span className="text-xs text-gray-400">Formal Penetration Testing Safe Harbor Charter</span>
                </div>
                <div className={clsx("text-base sm:text-lg font-extrabold tracking-tight uppercase", contractEvaluation.statusColor)}>
                  {contractEvaluation.legalStatus}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Approved Scope Domain</span>
                  <span className="font-bold text-indigo-300">{contractEvaluation.scopeSummary}</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Operational Schedule</span>
                  <span className="font-bold text-amber-300">{contractEvaluation.timeWindowSummary}</span>
                </div>
              </div>

              {/* Risk Flags & Advisory Notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Legal Compliance &amp; Operational Risk Advisory
                </h4>
                {contractEvaluation.riskFlags.length > 0 ? (
                  <div className="space-y-1.5">
                    {contractEvaluation.riskFlags.map((flag, idx) => (
                      <div key={idx} className="p-3 bg-gray-900/90 rounded-lg border border-rose-900/40 text-xs text-rose-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">⚠️</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 bg-gray-900/90 rounded-lg border border-emerald-900/40 text-xs text-emerald-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>All parameters comply with standard professional SANS and EC-Council penetration testing codes of ethics.</span>
                  </div>
                )}
              </div>

              {/* The "Get Out of Jail Free" Letter Note */}
              <div className="bg-gray-900/90 p-4 rounded-xl border border-indigo-900/30 text-xs text-gray-300 space-y-1">
                <strong className="text-indigo-300 block">The "Get Out of Jail Free" Authorization Letter:</strong>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  During red team operations or physical security testing, testers must carry a signed physical copy of the Authorization Letter on client corporate letterhead containing 24/7 executive contact numbers to prevent false arrests by law enforcement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: International Cyber Law & Statutory Penalties Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖</span> Studio 2: International Cyber Law &amp; Statutory Penalties Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare statutory provisions and criminal penalties for unauthorized access across Indian, United States, and European cyber legislation.
            </p>
          </div>

          {/* Law Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(cyberLaws).map((law) => {
              const isSelected = selectedLawKey === law.key;
              return (
                <button
                  key={law.key}
                  onClick={() => setSelectedLawKey(law.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{law.name.split(":")[0]}</div>
                  <div className="text-[11px] text-gray-400 mt-1 truncate">{law.statute}</div>
                </button>
              );
            })}
          </div>

          {/* Active Law Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeLaw.badgeClass)}>
                  {activeLaw.name.split(":")[0]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeLaw.statute}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Jurisdiction Standard</span>
                <span className="text-sm font-bold text-indigo-300">{activeLaw.name.split(":")[1]?.trim()}</span>
              </div>
            </div>

            {/* Provisions Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {activeLaw.primaryProvisions.map((prov, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-300 text-sm">{prov.sec}</span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-semibold border border-rose-800/60">
                      {prov.penalty}
                    </span>
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed pt-1">{prov.desc}</p>
                </div>
              ))}
            </div>

            {/* Privacy & Breach Regulation Note */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-amber-900/30 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Data Privacy &amp; Statutory Liability Rule:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeLaw.dpdpActNote}</p>
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
              Visualizing the 5 Golden Pillars of Ethical Hacking and the Legal Authorization Chain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The 5 Golden Pillars of Ethical Hacking */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🏛</span> Diagram A: The 5 Golden Pillars of Ethical Hacking
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Pillar 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="85" height="260" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="62" y="50" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">1. WRITTEN</text>
                    <text x="62" y="66" fill="#a5b4fc" fontWeight="bold" textAnchor="middle" fontSize="10">AUTH</text>
                    <line x1="30" y1="80" x2="95" y2="80" stroke="#4338ca" />
                    <text x="62" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Signed RoE</text>
                    <text x="62" y="130" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Contract</text>
                    <text x="62" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">from CISO</text>
                    <text x="62" y="180" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">Safe Harbor</text>
                  </g>

                  {/* Pillar 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="115" y="20" width="85" height="260" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="157" y="50" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="11">2. STRICT</text>
                    <text x="157" y="66" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">SCOPE</text>
                    <line x1="125" y1="80" x2="190" y2="80" stroke="#4f46e5" />
                    <text x="157" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">In-Scope</text>
                    <text x="157" y="130" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">IP Subnets</text>
                    <text x="157" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Zero Scope</text>
                    <text x="157" y="170" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="8.5">Creep</text>
                  </g>

                  {/* Pillar 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="210" y="20" width="85" height="260" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="252" y="50" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="11">3. PRIVACY</text>
                    <text x="252" y="66" fill="#fde68a" fontWeight="bold" textAnchor="middle" fontSize="10">&amp; NDA</text>
                    <line x1="220" y1="80" x2="285" y2="80" stroke="#b45309" />
                    <text x="252" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">100% PII</text>
                    <text x="252" y="130" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Confidential</text>
                    <text x="252" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">AES Wipe</text>
                    <text x="252" y="170" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">DPDP Compliant</text>
                  </g>

                  {/* Pillar 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="305" y="20" width="85" height="260" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="347" y="50" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">4. DO NO</text>
                    <text x="347" y="66" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="10">HARM</text>
                    <line x1="315" y1="80" x2="380" y2="80" stroke="#b91c1c" />
                    <text x="347" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">No DoS /</text>
                    <text x="347" y="130" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">DDoS Floods</text>
                    <text x="347" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">No Data</text>
                    <text x="347" y="170" fill="#ef4444" fontWeight="bold" textAnchor="middle" fontSize="8.5">Destruction</text>
                  </g>

                  {/* Pillar 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="400" y="20" width="85" height="260" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="442" y="50" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="11">5. ACTION</text>
                    <text x="442" y="66" fill="#a7f3d0" fontWeight="bold" textAnchor="middle" fontSize="10">REPORT</text>
                    <line x1="410" y1="80" x2="475" y2="80" stroke="#047857" />
                    <text x="442" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Detailed</text>
                    <text x="442" y="130" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">CVSS Scores</text>
                    <text x="442" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Remediation</text>
                    <text x="442" y="170" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">Blueprints</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: The 5 foundational pillars that separate professional penetration testing from illegal computer crime.
              </p>
            </div>

            {/* Diagram 2: Legal Authorization Chain Decision Tree */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🌳</span> Diagram B: Legal vs Illegal Decision Tree
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Node */}
                  <rect x="150" y="15" width="200" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="250" y="35" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10.5">Do you hold a signed RoE?</text>
                  <text x="250" y="48" fill="#a5b4fc" textAnchor="middle" fontSize="8.5">(Authorized by CISO/Owner)</text>

                  {/* Branches */}
                  <path d="M 200 60 L 100 100" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrowRose2)" />
                  <path d="M 300 60 L 400 100" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowEmerald2)" />

                  <text x="135" y="75" fill="#f43f5e" fontWeight="bold" fontSize="10">NO</text>
                  <text x="355" y="75" fill="#10b981" fontWeight="bold" fontSize="10">YES</text>

                  {/* Left Node: Illegal */}
                  <rect x="20" y="100" width="180" height="85" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="110" y="125" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">ILLEGAL HACKING</text>
                  <text x="110" y="142" fill="#fca5a5" textAnchor="middle" fontSize="8.5">IT Act 2000 Section 66 Violation</text>
                  <text x="110" y="158" fill="#f87171" textAnchor="middle" fontSize="8.5">Up to 3 Yrs Jail + ₹5L Fine</text>
                  <text x="110" y="172" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">STOP TESTING IMMEDIATELY</text>

                  {/* Right Node: Scope Check */}
                  <rect x="300" y="100" width="180" height="85" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="390" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10.5">Is Target in Scope List?</text>
                  <text x="390" y="142" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Check IP against RoE Appendix</text>
                  <text x="390" y="158" fill="#6ee7b7" textAnchor="middle" fontSize="8.5">No unapproved third parties</text>
                  <text x="390" y="172" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">PROCEED WITH AUDIT</text>

                  {/* Bottom Safety Guard Box */}
                  <rect x="50" y="220" width="400" height="70" rx="8" fill="#18181b" stroke="#4f46e5" strokeWidth="1.5" />
                  <text x="250" y="245" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontSize="11">THE GOLDEN SAFETY RULE</text>
                  <text x="250" y="262" fill="#cbd5e1" textAnchor="middle" fontSize="9">"Good intentions do not grant legal immunity under cyber law."</text>
                  <text x="250" y="278" fill="#fbbf24" textAnchor="middle" fontSize="8.5">Always verify signatures, in-scope IP subnets, and emergency abort contacts.</text>

                  <defs>
                    <marker id="arrowRose2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                    </marker>
                    <marker id="arrowEmerald2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: Systematic legal validation prevents ethical researchers from inadvertently violating cyber criminal statutes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Ethical Engineering Case Studies (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Examine how cybersecurity leads enforce strict legal and ethical compliance across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audit Contract Value</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Ethical Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> The Legal &amp; Ethical Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.legalDilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Professional Ethical Resolution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.ethicalResolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Auditing &amp; Legal Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
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
              Guidelines to maintain professional integrity and protect yourself legally in cybersecurity consulting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Professional Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Verify Signer Authority:</strong> Ensure the client authorization signer has legal power to approve audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Keep Clean Time Logs:</strong> Log every scan start/stop time and originating source IP address for legal defense.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Harmless Proof-of-Concepts:</strong> Demonstrate command execution using `whoami` or `hostname`, never `rm -rf`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Post-Test Artifact Cleanup:</strong> Delete all created test user accounts, webshells, and temporary test files.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Scope Creep Pivots:</strong> Scanning third-party partner servers not explicitly listed in the RoE document.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unintended DoS Crashes:</strong> Running aggressive high-thread fuzzers on fragile production database ports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Public Bug Leaks:</strong> Sharing client vulnerabilities on social media or Discord before patches are released.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Retaining Client PII:</strong> Storing unencrypted client customer databases on personal laptops.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Best Practices
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 24/7 Abort Lines:</strong> Test emergency stop phone lines before initiating active penetration tests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt (ISC)² Ethics Precedence:</strong> Remember that public and societal safety always overrides corporate loyalty.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>180-Day Log Retention:</strong> Comply with CERT-In 2022 guidelines by securely archiving audit activity logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Include Clear Fix Blueprints:</strong> Provide exact code snippets and config directives to help developers remediate flaws.</span>
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
              Synthesize core legal and ethical principles before tackling the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Aspiring Security Professionals
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why good intentions offer zero legal defense in a court of law: if you probe an IP address without signed authorization, you have violated Section 66 of India's IT Act 2000.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Canon 1 of the (ISC)² Code of Ethics places the protection of society and infrastructure above loyalty to an employer who demands covering up a critical vulnerability.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future security consulting contracts, always insert an explicit Emergency Abort Codeword clause and define the exact IP subnets in a legally binding appendix.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Interview Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Signed RoE is mandatory before testing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Sec 66: Up to 3 yrs imprisonment.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Sec 66F: Life jail for cyber terrorism.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023: Penalties up to ₹250 Crores.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>(ISC)² Canon 1: Protect society first.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Do No Harm: No DoS attacks in production.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Ethical Hacking: Principles & Legal Frameworks FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Ethical Hacking: Principles & Legal Frameworks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As future cybersecurity professionals graduating with BCA degrees in West Bengal, always remember: technical prowess without legal authorization and personal integrity is a crime. The power to discover flaws in banking switches, medical devices, or electrical grids carries a profound fiduciary responsibility. Uphold the 5 Golden Rules, honor your signed Rules of Engagement, and let your ethical character stand as tall as your technical mastery."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
