import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: Active Modality State
  const [selectedModalityKey, setSelectedModalityKey] = useState("modality_audit");

  // Studio 2: Active Assurance Scenario State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("fintech_upi_release");
  const [activePipelineStep, setActivePipelineStep] = useState(1);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_va_vs_audit");

  // Studio 1: Modality Data
  const evaluationModalities = {
    modality_va: {
      key: "modality_va",
      name: "1. Vulnerability Assessment (VA)",
      objective: "Discover, catalogue, and score known technical software vulnerabilities and unpatched CVEs.",
      methodology: "Automated network sweeps, credentialed host scans, and static software composition analysis.",
      tools: "Nessus, Qualys, OpenVAS, Snyk, AWS Inspector, SonarQube",
      relationship: "Automated machine-to-target scan; zero human consultative interaction.",
      deliverable: "Raw CVE list prioritized by CVSS v3.1 base score + patch recommendations.",
      cadence: "Continuous / Weekly in DevSecOps CI/CD pipelines",
      regulatoryRole: "Baseline technical hygiene required under RBI and CERT-In directions.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    modality_assessment: {
      key: "modality_assessment",
      name: "2. Security Risk Assessment",
      objective: "Evaluate overall organizational security posture, threat exposure, and control maturity.",
      methodology: "Collaborative interviews, threat modeling (STRIDE), and quantitative financial loss modeling (FAIR).",
      tools: "NIST CSF Maturity Models, FAIR ALE Calculators, STRIDE DFD diagrams, GRC Platforms",
      relationship: "Collaborative & consultative; the assessor acts as a trusted advisory coach.",
      deliverable: "Executive risk heatmaps, CMMI maturity level (1–5), and 18-month engineering roadmap.",
      cadence: "Bi-annually (Every 6 months) or following major architecture migrations",
      regulatoryRole: "Mandated for Data Protection Impact Assessments (DPIAs) under DPDP Act Section 8.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    modality_audit: {
      key: "modality_audit",
      name: "3. Information Security Audit",
      objective: "Verify formal compliance against rigid pass/fail criteria and issue official assurance reports.",
      methodology: "Systematic, independent evidence sampling, policy review, log inspection, and working paper formulation.",
      tools: "ISO 19011 Checklists, WORM Log Verification, Statement of Applicability (SoA) matrices",
      relationship: "Arms-length, formal, and strictly independent; the auditor acts as an objective judge.",
      deliverable: "Formal Audit Report, Major/Minor Non-Conformity Notices, CAPA Action Requests, ISO Certificate.",
      cadence: "Annually (Mandatory under ISO/IEC 27001:2022 Clause 9.2 and RBI guidelines)",
      regulatoryRole: "Mandatory statutory requirement under DPDP Act Section 10 and RBI Master Directions.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    modality_pt: {
      key: "modality_pt",
      name: "4. Penetration Testing (PT)",
      objective: "Actively exploit vulnerabilities to simulate real-world attacks and measure business breach impact.",
      methodology: "Goal-oriented ethical hacking, payload crafting, lateral movement, and privilege escalation.",
      tools: "Metasploit, Burp Suite Professional, Cobalt Strike, BloodHound, Custom Python Exploits",
      relationship: "Adversarial testing; ethical red team simulates external criminal attackers.",
      deliverable: "Proof-of-Concept (PoC) exploit chains, business impact analysis, and technical fix guides.",
      cadence: "Quarterly or following major production feature releases",
      regulatoryRole: "Mandatory technical validation for PCI-DSS v4.0 and RBI banking switch authorization.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeModality = evaluationModalities[selectedModalityKey];

  // Studio 2: Pipeline Scenarios Data
  const pipelineScenarios = {
    fintech_upi_release: {
      key: "fintech_upi_release",
      title: "FinTech UPI Payment Switch v2.4 Release",
      scope: "500 Payment Microservices processing ₹120 Crores/day",
      steps: [
        {
          step: 1,
          name: "Automated VA Scan",
          tool: "Snyk & Nessus",
          finding: "Detected outdated OpenSSL library (CVE-2026-1182 - High Severity).",
          action: "DevOps team updates base Docker container to latest Alpine image.",
          status: "PASSED"
        },
        {
          step: 2,
          name: "Red Team Penetration Test",
          tool: "Burp Suite Pro",
          finding: "Attempted SQLi and IDOR on payment endpoint; WAF rate-limiting blocked attack.",
          action: "Verified zero bypass paths; transaction tampering prevented.",
          status: "PASSED"
        },
        {
          step: 3,
          name: "Architecture Risk Assessment",
          tool: "STRIDE & FAIR Model",
          finding: "Calculated unmitigated ALE of ₹3.0 Cr; confirmed WAF reduces residual risk to 1.4.",
          action: "Secured CISO and CFO financial approval for production release.",
          status: "PASSED"
        },
        {
          step: 4,
          name: "Independent IS Audit",
          tool: "CERT-In Empaneled Team",
          finding: "Verified access review logs, cryptographic mTLS keys, and SoA control A.8.24.",
          action: "Formal Clean Audit Certificate issued; production UPI traffic enabled!",
          status: "CERTIFIED"
        }
      ]
    },
    healthcare_pacs_portal: {
      key: "healthcare_pacs_portal",
      title: "Clinical Healthcare Oncology Portal Launch",
      scope: "80,000 Cancer Biopsy Scans under DPDP Act 2023",
      steps: [
        {
          step: 1,
          name: "Automated VA Scan",
          tool: "Qualys Cloud Agent",
          finding: "Scanned EC2 instance; 0 open vulnerable ports detected.",
          action: "Technical infrastructure baseline verified clean.",
          status: "PASSED"
        },
        {
          step: 2,
          name: "Red Team Penetration Test",
          tool: "Custom Python Fuzzers",
          finding: "Tested DICOM imaging API for unauthenticated access; blocked by JWT auth.",
          action: "Confirmed RBAC authorization enforcement.",
          status: "PASSED"
        },
        {
          step: 3,
          name: "DPIA Privacy Risk Assessment",
          tool: "OneTrust DPIA Module",
          finding: "Identified need for automated crypto-shredding for expired patient records.",
          action: "Configured AWS S3 Object Lock retention policy.",
          status: "PASSED"
        },
        {
          step: 4,
          name: "Statutory DPDP Data Audit",
          tool: "Independent Data Auditor",
          finding: "Audited consent ledgers, vendor DPAs, and patient access logs under Section 10.",
          action: "Full statutory Safe Harbor verified against ₹250 Cr penalties!",
          status: "CERTIFIED"
        }
      ]
    }
  };

  const activeScenario = pipelineScenarios[selectedScenarioKey] || pipelineScenarios.fintech_upi_release;
  const currentPipelineStep = activeScenario.steps[activePipelineStep - 1];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_va_vs_audit",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "VA Scans vs ISO Audit Dockets",
      budget: "₹18,50,000",
      challenge: "Junior Engineers Assumed Green Nessus Scans Meant 500 Services Were Audit-Ready",
      dilemma:
        "Junior sysadmins believed passing a weekly Nessus port scan guaranteed passing an ISO 27001 audit, overlooking missing access reviews, lack of WORM logs, and un-audited vendor contracts.",
      resolution:
        "Mamata demonstrated that missing ISO 27001 access reviews and lack of WORM audit logs would trigger Major NCs, implementing complete Clause 9.2 governance and securing 100% RBI audit pass.",
      metrics: {
        servicesGoverned: "500 Payment Pods",
        vaToolsIntegrated: "Snyk + Nessus + Qualys",
        auditConformity: "100% Clean Pass",
        compliance: "ISO 27001 Clause 9.2 & RBI"
      }
    },
    {
      id: "ichapur_pacs_dpia_audit",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare PACS VA vs Statutory Data Audit",
      budget: "₹8,20,000",
      challenge: "PACS Vendor Claimed Security Based Solely on OpenVAS Port Scan Results",
      dilemma:
        "A medical imaging vendor claimed their server was secure because it passed an OpenVAS port scan, despite storing unencrypted cancer biopsy metadata in violation of the DPDP Act 2023.",
      resolution:
        "Mahima conducted a statutory DPIA privacy assessment, discovering unencrypted DICOM patient metadata and enforcing AES-256 S3 encryption, shielding the hospital from ₹250 Cr DPDP statutory fines.",
      metrics: {
        recordsAudited: "80,000 Biopsy Records",
        vaScanCompleted: "Weekly OpenVAS Sweeps",
        dpdpDataAuditPass: "100% Statutory Conformity",
        compliance: "DPDP Act 2023 Sec 10 & NABH"
      }
    },
    {
      id: "barrackpore_scada_passive_va",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT Passive VA vs NCIIPC Audit",
      budget: "₹14,80,000",
      challenge: "Active Port Scans Could Crash Delicate Legacy RTU Controllers in 18 Substations",
      dilemma:
        "Running standard active vulnerability port scanners on legacy 220kV SCADA RTUs could trigger electrical substation relay trips and regional power blackouts.",
      resolution:
        "Debangshu deployed passive network traffic monitoring for technical VA, complemented by formal NCIIPC physical security audits, satisfying Section 70 Protected System rules under the Indian IT Act.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        scanningMethodology: "100% Passive OT Sniffing",
        nciipcAuditResult: "Zero Non-Conformities",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_comparator_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Assurance Comparator Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Differentiate the Objectives of VA, PT, and Audits",
      dilemma:
        "Cybersecurity students struggled to understand why an enterprise needs both technical automated vulnerability scans and independent human-led governance audits.",
      resolution:
        "The team developed an interactive Tri-Dimensional Evaluation Comparator in React, training 215+ BCA cyber security students on structuring enterprise defense-in-depth assurance pipelines.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        comparisonsSimulated: "70+ Assurance Cases",
        examMastery: "100% Assurance Concepts Mastery",
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 1 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Differences between Audit, Assessment, and Vulnerability Assessment
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Dismantle the common confusion in security evaluations: compare automated Vulnerability Assessment (VA) tool scans against consultative Risk Assessments, 
            ethical Penetration Testing (PT), and formal independent Information Security Audits under ISO 19011 and Indian cyber regulations.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Tri-Dimensional Evaluation Comparator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 1: Interactive Evaluation Modality Comparator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an evaluation modality to inspect its primary objective, methodology, tools, cadence, deliverable artifacts, and regulatory role.
            </p>
          </div>

          {/* Modality Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(evaluationModalities).map((mod) => {
              const isSelected = selectedModalityKey === mod.key;
              return (
                <button
                  key={mod.key}
                  onClick={() => setSelectedModalityKey(mod.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{mod.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{mod.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Modality Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeModality.badgeClass)}>
                  {activeModality.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Evaluation Focus: {activeModality.name.split(". ")[1]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Cadence</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeModality.cadence.split(" (")[0]}</span>
              </div>
            </div>

            {/* Objective & Methodology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Primary Strategic Objective:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeModality.objective}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Execution Methodology:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeModality.methodology}</p>
              </div>
            </div>

            {/* Tools, Deliverables & Evaluator Relationship */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase font-sans">Industry Tools:</span>
                <p className="text-white text-xs mt-1 font-sans">{activeModality.tools}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase font-sans">Output Deliverable:</span>
                <p className="text-amber-300 text-xs mt-1 font-sans font-semibold">{activeModality.deliverable}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase font-sans">Evaluator Role:</span>
                <p className="text-purple-300 text-xs mt-1 font-sans font-semibold">{activeModality.relationship}</p>
              </div>
            </div>

            {/* Regulatory Significance */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/30 text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Indian Statutory &amp; Regulatory Role:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeModality.regulatoryRole}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Real-World Enterprise Assurance Pipeline Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 2: Real-World Assurance Pipeline Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise scenario and step sequentially through the 4-phase assurance sequence: Automated VA Scan ➔ Red Team Pen Test ➔ Risk Assessment ➔ Independent IS Audit.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(pipelineScenarios).map((sc) => {
              const isSelected = selectedScenarioKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => {
                    setSelectedScenarioKey(sc.key);
                    setActivePipelineStep(1);
                  }}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{sc.title}</div>
                  <div className="text-[11px] text-gray-400 font-mono mt-0.5">{sc.scope}</div>
                </button>
              );
            })}
          </div>

          {/* Pipeline Step Navigator */}
          <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeScenario.steps.map((st) => (
                <button
                  key={st.step}
                  onClick={() => setActivePipelineStep(st.step)}
                  className={clsx(
                    "p-3 rounded-xl text-center border transition-all text-xs font-mono",
                    activePipelineStep === st.step
                      ? "bg-indigo-600 text-white border-indigo-400 font-bold shadow-md"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] opacity-80 uppercase">STEP 0{st.step}</div>
                  <div className="font-sans font-bold mt-0.5 truncate">{st.name}</div>
                </button>
              ))}
            </div>

            {/* Active Step Details */}
            <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider block">
                    Assurance Phase 0{currentPipelineStep.step}
                  </span>
                  <h4 className="text-base font-bold text-white font-sans mt-0.5">
                    {currentPipelineStep.name} (Executed via {currentPipelineStep.tool})
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {currentPipelineStep.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Observed Test Finding:</span>
                  <p className="text-rose-300 font-sans leading-relaxed">{currentPipelineStep.finding}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Engineering &amp; Governance Action:</span>
                  <p className="text-emerald-300 font-sans leading-relaxed">{currentPipelineStep.action}</p>
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
              Visualizing the Tripartite Comparison Taxonomy and the Integrated Defense Assurance Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Tripartite Taxonomy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Tier Security Evaluation Taxonomy
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Quadrant 1: VA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="110" rx="6" fill="#083344" stroke="#06b6d4" />
                    <text x="130" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">VULNERABILITY SCAN (VA)</text>
                    <text x="130" y="62" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Focus: Automated CVEs &amp; Ports</text>
                    <text x="130" y="75" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="6">Tool: Nessus • Snyk • Qualys</text>
                    <text x="130" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Role: Weekly Technical Hygiene</text>
                  </g>

                  {/* Quadrant 2: PT */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="110" rx="6" fill="#450a0a" stroke="#ef4444" />
                    <text x="370" y="47" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">PENETRATION TESTING (PT)</text>
                    <text x="370" y="62" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6.5">Focus: Active Exploit Simulation</text>
                    <text x="370" y="75" fill="#fecaca" font-family="monospace" textAnchor="middle" fontSize="6">Tool: Burp Suite • Metasploit</text>
                    <text x="370" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Role: Quarterly Exploit Proof</text>
                  </g>

                  {/* Quadrant 3: Assessment */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="155" width="210" height="110" rx="6" fill="#78350f" stroke="#f59e0b" />
                    <text x="130" y="177" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8.5">SECURITY ASSESSMENT</text>
                    <text x="130" y="192" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">Focus: Posture &amp; CMMI Maturity</text>
                    <text x="130" y="205" fill="#fef08a" font-family="monospace" textAnchor="middle" fontSize="6">Tool: NIST CSF • FAIR Model</text>
                    <text x="130" y="218" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Role: Bi-Annual Risk Roadmap</text>
                  </g>

                  {/* Quadrant 4: Audit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="155" width="210" height="110" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="370" y="177" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">SECURITY AUDIT (ISMS)</text>
                    <text x="370" y="192" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Focus: Formal Pass/Fail Criteria</text>
                    <text x="370" y="205" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="6">Tool: ISO 19011 • DPDP Sec 10</text>
                    <text x="370" y="218" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Role: Annual Formal Assurance</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Each discipline answers a distinct assurance question for the enterprise.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: The 4-tier security evaluation taxonomy and operational boundaries.
              </p>
            </div>

            {/* Diagram 2: Assurance Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The Integrated Assurance Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1: VA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="95" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="67" y="50" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">1. VA SCAN</text>
                    <text x="67" y="63" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">Weekly Scans</text>
                  </g>

                  <line x1="115" y1="52" x2="135" y2="52" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Phase 2: PT */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="135" y="30" width="100" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="185" y="50" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="7.5">2. PEN TEST</text>
                    <text x="185" y="63" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6">Quarterly Hack</text>
                  </g>

                  <line x1="235" y1="52" x2="255" y2="52" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Phase 3: Assessment */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="30" width="105" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="307" y="50" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7.5">3. ASSESSMENT</text>
                    <text x="307" y="63" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">Bi-Annual Risk</text>
                  </g>

                  <line x1="360" y1="52" x2="380" y2="52" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Phase 4: Audit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="380" y="30" width="100" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="430" y="50" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">4. IS AUDIT</text>
                    <text x="430" y="63" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Annual Cert</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      UNBROKEN ENTERPRISE ASSURANCE ENGINE
                    </text>
                    <text x="250" y="167" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Combines continuous technical hygiene with periodic adversarial tests and formal audit certification.
                    </text>
                  </g>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous VA ➔ Quarterly PT ➔ Bi-annual Assessment ➔ Annual ISO 27001 Audit.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: The integrated enterprise defense assurance pipeline workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Evaluation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads distinguish scans from audits in Kolkata, govern healthcare data in Ichapur, manage SCADA in Barrackpore, and simulate pipelines in Jadavpur.
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
                  <span>⚡</span> Evaluation Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Security Officers structuring enterprise assurance pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Assurance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Layer Your Assurance:</strong> Run weekly VA scans, quarterly PT, and annual audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Collaborate with Assessors:</strong> Treat risk assessors as advisory coaches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Passive VA on SCADA:</strong> Prevent industrial controller crashes with passive sniffing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Feed CVEs to GRC:</strong> Ingest automated scan data directly into risk registers.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Evaluation Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Scan-Only Fallacy:</strong> Assuming a green Nessus report equals audit compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Expecting Fixes from Auditors:</strong> Auditors judge pass/fail; they don't code patches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Business Logic Flaws:</strong> Scanners miss IDOR and authorization defects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Static Annual Audits:</strong> Conducting an audit once a year while ignoring weekly scans.</span>
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
                  <span><strong>Enforce DPDP Data Audits:</strong> Audit personal data under Section 10 for safe harbor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate SCA Gates:</strong> Block vulnerable open-source dependencies in CI/CD.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain Working Papers:</strong> Document evidence files for 3+ years for audit defense.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with RBI Cadence:</strong> Execute quarterly red team tests on payment switches.</span>
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
              Synthesize the fundamental distinctions between VA, PT, Assessment, and Audits before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Assurance Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why you cannot use an automated vulnerability scanner report as proof of audit compliance: Automated scanners only check whether software versions have known CVEs. They cannot verify whether your organization conducts employee background checks, maintains access review logs, executes disaster recovery drills, or signs Data Processing Agreements under the Indian DPDP Act 2023.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The differing evaluator relationships across disciplines: In a Security Assessment, the assessor is a collaborative coach helping you design improvements and measure maturity. In an Information Security Audit, the auditor is an independent judge who evaluates objective evidence against rigid criteria without designing your technical solutions.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security operations, establish a synchronized 4-tier assurance schedule: Continuous daily VA in CI/CD ➔ Quarterly external penetration testing ➔ Bi-annual risk assessments ➔ Annual ISO 27001 certification audits.
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
                <span>Vulnerability Assessment (VA): Automated tool scan discovering technical CVEs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Security Assessment: Consultative evaluation of risk posture and CMMI maturity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Security Audit: Formal independent pass/fail verification against defined criteria.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Penetration Testing (PT): Ethical exploit test validating real-world attack impact.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clean VA scans do NOT equal audit pass (audits evaluate total socio-technical governance).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 10 requires independent Data Audits for statutory safe harbor.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Differences between Audit, Assessment, and VA FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Security Evaluation Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Differences between Audit, Assessment, and Vulnerability Assessment (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Mastering the distinctions between Vulnerability Assessment, Security Assessment, Penetration Testing, and Information Security Audits is vital for your cybersecurity career. Always remember: automated VA tools find technical bugs daily, ethical penetration testers prove exploitability quarterly, consultative assessments calibrate organizational maturity bi-annually, and independent IS audits provide formal executive and statutory certification annually under ISO 19011 and Indian DPDP Act Section 10!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
