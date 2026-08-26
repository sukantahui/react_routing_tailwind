import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: DevSecOps Pipeline Simulator State
  const [activePipelineStageIndex, setActivePipelineStageIndex] = useState(0);
  const [sastEnabled, setSastEnabled] = useState(true);
  const [scaEnabled, setScaEnabled] = useState(true);
  const [dastEnabled, setDastEnabled] = useState(true);

  // Studio 2: ROSI Financial Calculator State
  const [singleLossExpectancyINR, setSingleLossExpectancyINR] = useState(50000000); // ₹5 Crores
  const [annualRateOfOccurrence, setAnnualRateOfOccurrence] = useState(1.0);        // 1 breach attempt / yr
  const [mitigationEfficacy, setMitigationEfficacy] = useState(85);                 // 85% risk mitigated
  const [annualDefenseCostINR, setAnnualDefenseCostINR] = useState(5000000);        // ₹50 Lakhs / yr

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_devsecops");

  // DevSecOps Pipeline Stages Data for Studio 1
  const pipelineStages = [
    {
      stepNum: "01",
      name: "Code Commit & IDE Shift-Left",
      tool: "SAST (Semgrep / SonarQube) + Pre-commit Hooks",
      icon: "💻",
      action:
        "Scans raw source code for hardcoded API keys, unparameterized SQL strings, and dangerous deserialization calls before code is pushed to Git.",
      defectFound: "Hardcoded AWS Root Key detected in config.json",
      buildVerdict: sastEnabled ? "BLOCKED AT COMMIT (Zero Risk in Git)" : "LEAKED (Vulnerability pushed to remote repo)",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700"
    },
    {
      stepNum: "02",
      name: "Build & Software Composition Analysis",
      tool: "SCA (Snyk / OWASP Dependency-Check) + Trivy Container Scan",
      icon: "📦",
      action:
        "Generates a Software Bill of Materials (SBOM in CycloneDX) and scans 3rd-party npm/pip/maven libraries for known CVEs (e.g. Log4Shell / Struts).",
      defectFound: "Critical CVE-2021-44228 in log4j-core 2.14.1",
      buildVerdict: scaEnabled ? "BUILD FAILED (Upgraded to 2.17.1 automatically)" : "PASSED (Vulnerable container image deployed to registry)",
      badgeClass: "bg-indigo-900/50 text-indigo-300 border-indigo-700"
    },
    {
      stepNum: "03",
      name: "Staging Test & Dynamic Application Security",
      tool: "DAST (OWASP ZAP / Burp Enterprise) + IAST Runtime Agent",
      icon: "🧪",
      action:
        "Executes automated black-box HTTP/REST API attacks against the running staging application URL to test authentication bypasses and IDORs.",
      defectFound: "Broken Object-Level Authorization (IDOR) on /api/v1/invoices",
      buildVerdict: dastEnabled ? "DEPLOYMENT HALTED (Ticket assigned to squad)" : "RELEASED (Insecure API deployed to production)",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    },
    {
      stepNum: "04",
      name: "Production Deployment & Zero Trust Runtime",
      tool: "Kubernetes NetworkPolicy Micro-segmentation + FIDO2 mTLS",
      icon: "🚀",
      action:
        "Deploys immutable container workloads with least privilege service accounts, enforcing read-only root filesystems and Layer 7 egress filtering.",
      defectFound: "Unauthorized egress connection to foreign mining pool",
      buildVerdict: "BLOCKED (NetworkPolicy denied unlisted outbound destination)",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700"
    },
    {
      stepNum: "05",
      name: "Continuous Threat Exposure & SOC Monitoring",
      tool: "CrowdStrike EDR + Splunk SIEM + Continuous Attack Surface Management (ASM)",
      icon: "🛡️",
      action:
        "24/7 behavioral telemetry correlation, threat hunting with MITRE ATT&CK TTPs, automated honeytoken alerts, and 6-hour CERT-In escalation readiness.",
      defectFound: "Honeytoken Active Directory SPN queried by attacker",
      buildVerdict: "ISOLATED (Host quarantined in 42s via SOAR Playbook)",
      badgeClass: "bg-cyan-900/50 text-cyan-300 border-cyan-700"
    }
  ];

  const currentPipelineStage = pipelineStages[activePipelineStageIndex];

  // Calculations for Studio 2: ROSI & ALE in Indian Rupees
  const rosiMetrics = useMemo(() => {
    // ALE = SLE * ARO
    const aleINR = singleLossExpectancyINR * annualRateOfOccurrence;
    // Loss Mitigated = ALE * (Mitigation Efficacy / 100)
    const lossMitigatedINR = aleINR * (mitigationEfficacy / 100);
    // Net Annual Savings = Loss Mitigated - Annual Defense Cost
    const netSavingsINR = lossMitigatedINR - annualDefenseCostINR;
    // ROSI % = (Net Savings / Annual Defense Cost) * 100
    const rosiPercentage = annualDefenseCostINR > 0 ? (netSavingsINR / annualDefenseCostINR) * 100 : 0;

    const formatINR = (val) => {
      if (val &ge; 10000000) return `₹${(val / 10000000).toFixed(2)} Crores`;
      if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
      return `₹${val.toLocaleString("en-IN")}`;
    };

    return {
      aleFormatted: formatINR(aleINR),
      lossMitigatedFormatted: formatINR(lossMitigatedINR),
      netSavingsFormatted: formatINR(netSavingsINR),
      defenseCostFormatted: formatINR(annualDefenseCostINR),
      rosiFormatted: `${rosiPercentage.toFixed(1)}%`,
      rosiColor: rosiPercentage > 0 ? "text-emerald-400" : "text-rose-400",
      verdict: rosiPercentage > 300 ? "OUTSTANDING DEFENSE INVESTMENT (8x+ Return)" : rosiPercentage > 0 ? "JUSTIFIED BUSINESS INVESTMENT" : "NEGATIVE RETURN (Rebalance Defense Costs)"
    };
  }, [singleLossExpectancyINR, annualRateOfOccurrence, mitigationEfficacy, annualDefenseCostINR]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_devsecops",
      lead: "Mamata",
      role: "Lead DevSecOps Architect",
      location: "Kolkata FinTech Operations",
      title: "Automated Core Banking DevSecOps CI/CD",
      budget: "₹8,50,000",
      defenseDomain: "Secure SDLC & Automated Quality Gates",
      dilemma:
        "Developers were releasing new UPI transaction microservices every 48 hours without security audits, leading to unauthenticated IDOR bugs slipping into production.",
      resolution:
        "Mamata embedded automated Semgrep SAST, Snyk SCA, and OWASP ZAP DAST scans into GitLab CI/CD pipelines with automated build-breaking rules, cutting pre-production flaws by 84%.",
      metrics: {
        flawsBlockedInCiCd: "84% Reduction in Prod CVEs",
        pipelineScanTime: "3.2 Minutes per Build",
        microservicesProtected: "65 Core UPI Services",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_nist",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "NIST CSF 2.0 Electronic Health Records Audit",
      budget: "₹5,20,000",
      defenseDomain: "Enterprise Governance & DPDP Act Compliance",
      dilemma:
        "Hospital needed to elevate its cybersecurity maturity across all six NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) to comply with India's DPDP Act 2023.",
      resolution:
        "Mahima deployed immutable AWS S3 WORM storage for medical records, enforced FIDO2 hardware passkeys on 40 ICU terminals, and trained 15 nurses as localized Security Champions.",
      metrics: {
        csfMaturityScore: "Tier 3 (Repeatable & Adaptive)",
        ransomwareResilience: "100% Immutable WORM Protection",
        statutoryFineExposure: "₹0 (Full DPDP Compliance)",
        compliance: "NIST CSF 2.0 & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_idmz",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Purdue Model Level 3.5 Industrial DMZ",
      budget: "₹6,80,000",
      defenseDomain: "SCADA Architecture & Hardware Data Diodes",
      dilemma:
        "Corporate billing IT networks were directly routed to 220kV substation protective relays, creating severe lateral breach risk from phishing emails.",
      resolution:
        "Debangshu designed an Industrial Demilitarized Zone (IDMZ Level 3.5) with unidirectional optical data diodes and jump hosts, ensuring that no corporate IT traffic can reach physical switchgears.",
      metrics: {
        airGapEnforcement: "100% Unidirectional Optical Diode",
        scadaDowntime: "0.00 Seconds",
        substationsSecured: "4 Regional 220kV Grids",
        compliance: "ISA/IEC 62443 & CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_rosi",
      lead: "Abhronila & Susmita",
      role: "Enterprise Cyber Economists",
      location: "Jadavpur University Enterprise Consultancy",
      title: "ROSI Boardroom Defense Budget Justification",
      budget: "₹3,80,000",
      defenseDomain: "Financial Risk Modeling & Board Governance",
      dilemma:
        "Corporate Board of Directors was reluctant to approve a ₹45 Lakh DevSecOps defense budget, viewing security purely as an unneeded expense center.",
      resolution:
        "The team calculated Return on Security Investment (ROSI in ₹ INR), proving an 800% net financial return by demonstrating how the defense prevents ₹4.5 Crores in potential annual ransomware losses and DPDP statutory fines.",
      metrics: {
        budgetApproved: "₹45,00,000 DevSecOps Capital",
        modeledLossAvoided: "₹4.5 Crores Annualized (ALE)",
        rosiProjected: "800% Net Return on Investment",
        compliance: "Corporate Governance Risk Charter"
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
            Cyber Security Module 002_002 • Topic 9 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Role of Ethical Hackers in Enterprise Defense
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Discover how ethical hackers drive proactive enterprise resilience: from shifting security left in DevSecOps CI/CD pipelines 
            (SAST, DAST, SCA) and implementing Zero Trust architectures (NIST SP 800-207), to calculating Return on Security Investment 
            (ROSI) in Indian Rupees (₹) for Boardroom governance.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: DevSecOps CI/CD Pipeline & Automated Security Quality Gates Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 1: DevSecOps CI/CD Pipeline &amp; Automated Security Gates
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 5 stages of a modern DevSecOps pipeline to observe how automated quality gates (SAST, SCA, DAST) block vulnerabilities before production deployment.
            </p>
          </div>

          {/* Pipeline Stage Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {pipelineStages.map((stage, idx) => {
              const isSelected = activePipelineStageIndex === idx;
              return (
                <button
                  key={stage.stepNum}
                  onClick={() => setActivePipelineStageIndex(idx)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{stage.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">Stage {stage.stepNum}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{stage.name.split(" &")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pipeline Stage Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentPipelineStage.badgeClass)}>
                  Stage {currentPipelineStage.stepNum} of 05 • {currentPipelineStage.tool.split(" (")[0]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentPipelineStage.name}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Security Quality Gate Verdict</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400">{currentPipelineStage.buildVerdict.split(" (")[0]}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Automated Security Execution</span>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{currentPipelineStage.action}</p>
            </div>

            {/* Tool & Defect Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-300 font-bold uppercase tracking-wider block">Integrated Tooling Arsenal</span>
                <p className="text-gray-200 font-mono text-[11px]">{currentPipelineStage.tool}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-300 font-bold uppercase tracking-wider block">Simulated Defect Caught</span>
                <p className="text-gray-200 font-mono text-[11px]">{currentPipelineStage.defectFound}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Return on Security Investment (ROSI) & ALE Financial Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📈</span> Studio 2: Return on Security Investment (ROSI) in Indian Rupees (₹)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Model Single Loss Expectancy (SLE), Annualized Rate of Occurrence (ARO), and defense costs to calculate the exact financial ROSI (%) for presentation to corporate executive boards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Financial Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Financial Risk Parameters (₹ INR)
              </h3>

              {/* SLE Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Single Loss Expectancy (SLE):</span>
                  <span className="font-mono text-amber-300 font-bold">₹{(singleLossExpectancyINR / 10000000).toFixed(1)} Crores</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="200000000"
                  step="5000000"
                  value={singleLossExpectancyINR}
                  onChange={(e) => setSingleLossExpectancyINR(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                /&gt;
              </div>

              {/* ARO Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Annual Rate of Occurrence (ARO):</span>
                  <span className="font-mono text-indigo-300 font-bold">{annualRateOfOccurrence}x / year</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.2"
                  value={annualRateOfOccurrence}
                  onChange={(e) => setAnnualRateOfOccurrence(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                /&gt;
              </div>

              {/* Mitigation Efficacy */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Risk Mitigation Efficacy (%):</span>
                  <span className="font-mono text-emerald-300 font-bold">{mitigationEfficacy}% Prevented</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="98"
                  step="1"
                  value={mitigationEfficacy}
                  onChange={(e) => setMitigationEfficacy(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                /&gt;
              </div>

              {/* Annual Defense Cost */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Annual Defense Tooling Cost:</span>
                  <span className="font-mono text-purple-300 font-bold">₹{(annualDefenseCostINR / 100000).toFixed(0)} Lakhs / yr</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={annualDefenseCostINR}
                  onChange={(e) => setAnnualDefenseCostINR(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                /&gt;
              </div>
            </div>

            {/* Calculated ROSI Metrics (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Financial Return &amp; Loss Prevention</h3>
                  <span className="text-xs text-gray-400">Boardroom Capital Investment Justification</span>
                </div>
                <div className={clsx("text-2xl font-extrabold tracking-tight", rosiMetrics.rosiColor)}>
                  {rosiMetrics.rosiFormatted} ROSI
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Potential Annual Loss (ALE)</span>
                  <span className="text-sm font-bold text-rose-300">{rosiMetrics.aleFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">SLE * ARO Exposure</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Loss Prevented by Defense</span>
                  <span className="text-sm font-bold text-emerald-300">{rosiMetrics.lossMitigatedFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">{mitigationEfficacy}% of Annual Risk</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Net Annual Financial Savings</span>
                  <span className="text-sm font-bold text-amber-300">{rosiMetrics.netSavingsFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">After deducting tool cost</span>
                </div>
              </div>

              {/* Boardroom Investment Verdict */}
              <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Boardroom Investment Verdict:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{rosiMetrics.verdict}</p>
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
              Visualizing the 6 Pillars of Enterprise Ethical Hacking Integration and DevSecOps Security Quality Gates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 6 Pillars of Enterprise Defense */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🏛️</span> Diagram A: The 6 Pillars of Enterprise Defense Integration
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Row 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="220" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="35" y="45" fill="#c7d2fe" fontWeight="bold" fontSize="10.5">1. Threat Modeling (STRIDE)</text>
                    <text x="35" y="62" fill="#94a3b8" fontSize="8.5">Architectural review before writing code</text>
                    <text x="35" y="78" fill="#a5b4fc" fontWeight="bold" fontSize="8">Design-Phase Defense</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="20" width="220" height="75" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="275" y="45" fill="#e0e7ff" fontWeight="bold" fontSize="10.5">2. DevSecOps CI/CD Shift-Left</text>
                    <text x="275" y="62" fill="#c7d2fe" fontSize="8.5">Automated SAST / SCA / DAST gates</text>
                    <text x="275" y="78" fill="#818cf8" fontWeight="bold" fontSize="8">Build-Phase Defense</text>
                  </g>

                  {/* Row 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="220" height="75" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="35" y="135" fill="#fef3c7" fontWeight="bold" fontSize="10.5">3. Continuous Exposure (CTEM)</text>
                    <text x="35" y="152" fill="#fde68a" fontSize="8.5">Year-round attack surface management</text>
                    <text x="35" y="168" fill="#f59e0b" fontWeight="bold" fontSize="8">Runtime Exposure Defense</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="110" width="220" height="75" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="275" y="135" fill="#fee2e2" fontWeight="bold" fontSize="10.5">4. Purple Teaming &amp; EDR</text>
                    <text x="275" y="152" fill="#fca5a5" fontSize="8.5">Atomic tests tuning Sigma SIEM rules</text>
                    <text x="275" y="168" fill="#ef4444" fontWeight="bold" fontSize="8">Detection Optimization</text>
                  </g>

                  {/* Row 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="220" height="75" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="225" fill="#d1fae5" fontWeight="bold" fontSize="10.5">5. Zero Trust &amp; Micro-seg</text>
                    <text x="35" y="242" fill="#a7f3d0" fontSize="8.5">Verify explicitly, Least privilege, Assume breach</text>
                    <text x="35" y="258" fill="#34d399" fontWeight="bold" fontSize="8">Blast Radius Isolation</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="200" width="220" height="75" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="275" y="225" fill="#cffafe" fontWeight="bold" fontSize="10.5">6. Boardroom Risk &amp; ROSI (₹)</text>
                    <text x="275" y="242" fill="#a5f3fc" fontSize="8.5">Translating CVEs to Financial Metrics</text>
                    <text x="275" y="258" fill="#06b6d4" fontWeight="bold" fontSize="8">Executive Governance</text>
                  </g>

                  {/* Summary */}
                  <text x="250" y="300" fill="#94a3b8" textAnchor="middle" fontSize="9">
                    Ethical Hackers connect engineering pipelines to C-suite boardroom governance.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: The comprehensive 6-pillar framework for integrating ethical hacking across modern enterprises.
              </p>
            </div>

            {/* Diagram 2: DevSecOps CI/CD Quality Gates */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🔄</span> Diagram B: DevSecOps CI/CD Security Quality Gates
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="85" height="150" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="62" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. CODE</text>
                    <text x="62" y="65" fill="#94a3b8" textAnchor="middle" fontSize="8">SAST Scan</text>
                    <text x="62" y="80" fill="#a5b4fc" textAnchor="middle" fontSize="8">Semgrep</text>
                    <text x="62" y="110" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">Gate 1</text>
                  </g>

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="115" y="20" width="85" height="150" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="157" y="45" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. BUILD</text>
                    <text x="157" y="65" fill="#c7d2fe" textAnchor="middle" fontSize="8">SCA Scan</text>
                    <text x="157" y="80" fill="#a5b4fc" textAnchor="middle" fontSize="8">Snyk/SBOM</text>
                    <text x="157" y="110" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">Gate 2</text>
                  </g>

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="210" y="20" width="85" height="150" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="252" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. TEST</text>
                    <text x="252" y="65" fill="#fde68a" textAnchor="middle" fontSize="8">DAST/IAST</text>
                    <text x="252" y="80" fill="#f59e0b" textAnchor="middle" fontSize="8">OWASP ZAP</text>
                    <text x="252" y="110" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">Gate 3</text>
                  </g>

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="305" y="20" width="85" height="150" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="347" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">4. DEPLOY</text>
                    <text x="347" y="65" fill="#a7f3d0" textAnchor="middle" fontSize="8">Zero Trust</text>
                    <text x="347" y="80" fill="#34d399" textAnchor="middle" fontSize="8">K8s NetPol</text>
                    <text x="347" y="110" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">Gate 4</text>
                  </g>

                  {/* Step 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="400" y="20" width="85" height="150" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="442" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">5. SOC</text>
                    <text x="442" y="65" fill="#a5f3fc" textAnchor="middle" fontSize="8">EDR/SIEM</text>
                    <text x="442" y="80" fill="#06b6d4" textAnchor="middle" fontSize="8">CrowdStrike</text>
                    <text x="442" y="110" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">Gate 5</text>
                  </g>

                  {/* Continuous Feedback Arrow */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="195" width="465" height="85" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="220" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">CONTINUOUS RESILIENCE &amp; SECURITY CHAMPIONS</text>
                    <text x="250" y="238" fill="#cbd5e1" textAnchor="middle" fontSize="9">Shifting Security Left eliminates 80%+ of vulnerabilities before code reaches production</text>
                    <text x="250" y="255" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Immutable S3 WORM Backups guarantee 100% recovery against Ransomware cartels</text>
                    <text x="250" y="272" fill="#fbbf24" textAnchor="middle" fontSize="8">ROSI Calculation justifies multi-lakh defense budgets to executive leadership</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: Automated DevSecOps quality gates prevent vulnerabilities from ever reaching production clusters.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Enterprise Defense Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how cybersecurity leaders integrate DevSecOps, NIST CSF 2.0, SCADA air-gaps, and financial ROSI modeling across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Enterprise Defense Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Enterprise Defense Dilemma ({currentLocalScenario.defenseDomain})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Ethical Hacker Defense Engineering Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Enterprise Metrics &amp; Deliverables
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
              Guidelines to maximize the strategic value of ethical hackers in corporate defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Strategic Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Calculate Financial ROSI (₹):</strong> Show the Board how security prevents multi-crore losses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Shift Left in DevSecOps:</strong> Run SAST and SCA in CI/CD pipelines before code is merged.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Build Security Champions:</strong> Train embedded developers inside product squads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Immutable WORM:</strong> Lock backup snapshots with S3 Object Lock to survive ransomware.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Enterprise Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Point-in-Time Pentesting:</strong> Relying on once-a-year tests instead of continuous exposure (CTEM).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Overly Strict Build Breakers:</strong> Halting software releases on low-risk informational bugs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Flat IT/OT Networks:</strong> Directly routing corporate office PCs to high-voltage SCADA relays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Third-Party TPRM:</strong> Failing to audit external SaaS vendors (Supply chain risk).</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Governance Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt NIST CSF 2.0:</strong> Align security governance with the 6 core management functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Zero Trust (NIST 800-207):</strong> Verify explicitly, enforce least privilege, assume breach.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Generate CycloneDX SBOM:</strong> Maintain complete machine-readable software component catalogs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Tabletop Drills (TTX):</strong> Regularly test executive crisis teams on 6-hour CERT-In rules.</span>
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
              Synthesize key enterprise defense principles before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Enterprise Security Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why shifting security left saves millions of rupees: fixing a vulnerability during the design or code commit phase costs 10x to 100x less than fixing it after a breach in production.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the ROSI formula translates technical security into business ROI: demonstrating that a ₹50 Lakh tooling investment prevents ₹4.5 Crores in annual breach loss wins instant Boardroom approval.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise architectures, replace annual point-in-time penetration tests with a Continuous Threat Exposure Management (CTEM) program and automated DevSecOps CI/CD gates.
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
                <span>DevSecOps shifts security left (SAST, SCA, DAST in CI/CD).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ROSI Formula: [ (ALE * Mitigation) - Cost ] / Cost * 100%.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Zero Trust tenets: Verify explicitly, Least privilege, Assume breach.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Purdue Level 3.5 IDMZ isolates IT from SCADA OT networks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Immutable S3 WORM storage physically defeats ransomware wiping.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Role of Ethical Hackers in Enterprise Defense FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Role of Ethical Hackers in Enterprise Defense (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As cybersecurity leaders stepping into top enterprise roles in Kolkata and across India, your ultimate contribution is building organizational resilience. Master the financial language of the Boardroom (ROSI in ₹ INR), embed security directly into developer pipelines with DevSecOps, enforce Zero Trust architectures, and champion the ethical protection of our digital economy."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
