import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: Operating Model State
  const [selectedModelKey, setSelectedModelKey] = useState("holistic_ism");

  // Studio 2: CMMI Maturity Level State
  const [selectedCmmiLevel, setSelectedCmmiLevel] = useState(3);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_iso27001_ism");

  // Studio 1: Operating Models Data
  const operatingModels = {
    adhoc_it: {
      key: "adhoc_it",
      name: "Mode A: Reactive Ad-hoc IT Security",
      governanceScope: "Siloed & Uncoordinated",
      incidentResponseTime: "Days to Weeks (Delayed Detection)",
      boardVisibility: "Zero (Treated as an IT expense line item)",
      regulatoryCompliance: "Non-Compliant (High DPDP ₹250 Cr Fine Exposure)",
      businessAlignment: "Friction & Productivity Bottleneck",
      riskScore: "HIGH (88/100 Breach Probability)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      pillars: [
        { title: "People", desc: "No formal security awareness; staff frequently fall for spear-phishing." },
        { title: "Process", desc: "No documented policies, change control, or incident escalation playbooks." },
        { title: "Technology", desc: "Mismatched point tools (antivirus + basic firewall) without central telemetry." },
        { title: "Audit & Risk", desc: "No Information Asset Register; risks discovered only after data breaches." }
      ]
    },
    holistic_ism: {
      key: "holistic_ism",
      name: "Mode B: Proactive Holistic ISM Governance",
      governanceScope: "Enterprise-wide ISMS (ISO/IEC 27001:2022 Aligned)",
      incidentResponseTime: "Sub-15 Min Detection (24/7 SOC Telemetry)",
      boardVisibility: "Executive CISO reporting to CEO & Risk Committee",
      regulatoryCompliance: "100% Compliant (DPDP Act 2023 & CERT-In 6-Hour Rule)",
      businessAlignment: "Strategic Business Enabler & Brand Asset",
      riskScore: "LOW (12/100 Controlled Residual Risk)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pillars: [
        { title: "People", desc: "Continuous phishing simulations, role-based training, and executive sponsorship." },
        { title: "Process", desc: "Formal ISO 27001 policies, change management, and documented incident playbooks." },
        { title: "Technology", desc: "Zero Trust mTLS, EDR, SIEM, Next-Gen Firewalls, and automated SOAR response." },
        { title: "Audit & Risk", desc: "Comprehensive Information Asset Register (IAR) and regular 3LoD audits." }
      ]
    }
  };

  const activeModel = operatingModels[selectedModelKey];

  // Studio 2: CMMI Maturity Levels Data
  const cmmiLevels = [
    {
      level: 1,
      name: "Level 1: Initial / Ad-hoc",
      posture: "Chaotic & Reactive",
      breachRisk: "EXTREME (85%+)",
      auditReadiness: "0% (No Documentation)",
      investment: "Unplanned Emergency Spending",
      details:
        "Processes are unpredictable, undocumented, and poorly controlled. Security is reactive firefighting with zero executive governance or asset visibility.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    },
    {
      level: 2,
      name: "Level 2: Repeatable",
      posture: "Project-Level Discipline",
      breachRisk: "HIGH (60%)",
      auditReadiness: "30% (Isolated Records)",
      investment: "Tactical Tool Purchases",
      details:
        "Basic security practices exist for individual projects or departments, but lack centralized enterprise standards and formal cross-functional oversight.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    {
      level: 3,
      name: "Level 3: Defined",
      posture: "Standardized Enterprise ISMS",
      breachRisk: "MODERATE (25%)",
      auditReadiness: "85% (ISO 27001 Ready)",
      investment: "Strategic Governance & Training",
      details:
        "Organization-wide Information Security Management System (ISMS) established. Policies, standards, and incident response procedures are formally documented and enforced.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      level: 4,
      name: "Level 4: Managed",
      posture: "Quantitatively Measured",
      breachRisk: "LOW (10%)",
      auditReadiness: "95% (Continuous Metric Verification)",
      investment: "24/7 SOC & Automated Telemetry",
      details:
        "Security performance is quantitatively measured using KPIs and KRIs (MTTD, MTTR, patch velocity). Automated telemetry and risk registers guide management decisions.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      level: 5,
      name: "Level 5: Optimizing",
      posture: "Continuous Adaptive Resilience",
      breachRisk: "MINIMAL (<2%)",
      auditReadiness: "100% (World-Class Audit Trail)",
      investment: "AI Threat Hunting & SOAR",
      details:
        "Continuous process improvement driven by AI threat intelligence, automated adversary emulation (red teaming), and proactive zero-trust architectural evolution.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  ];

  const activeCmmi = cmmiLevels[selectedCmmiLevel - 1];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_iso27001_ism",
      lead: "Mamata",
      role: "Lead Information Security Architect",
      location: "Kolkata FinTech Innovation Hub",
      title: "ISO 27001 / DPDP Compliance Governance Transformation",
      budget: "₹14,50,000",
      challenge: "500-Node Infrastructure Operating on Ad-hoc IT Security",
      dilemma:
        "A 500-node payment processing infrastructure operated on ad-hoc IT security without documented policies, creating severe ₹250 Crore penalty exposure under Section 33 of the DPDP Act 2023.",
      resolution:
        "Mamata established a formal ISMS aligned with ISO 27001:2022, built an Information Asset Register, and formed a 24/7 SOC with automated CERT-In 6-hour incident escalation paths.",
      metrics: {
        nodesGoverned: "500+ Payment Gateways",
        complianceAttained: "ISO/IEC 27001:2022 Certified",
        certInEscalation: "Automated < 6-Hour SLA",
        regulatorySafeguard: "₹250 Cr DPDP Liability Mitigated"
      }
    },
    {
      id: "ichapur_healthcare_ism",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur Clinical Care Network",
      title: "Hospital Patient Health Record ISM Framework",
      budget: "₹8,20,000",
      challenge: "45 Oncology Imaging Servers Storing Unencrypted Data",
      dilemma:
        "45 oncology PACS imaging servers were storing unencrypted patient records with zero access governance and unmonitored administrative credentials.",
      resolution:
        "Mahima authored healthcare data classification standards, deployed mTLS and role-based access control, and trained 350+ medical staff on anti-phishing hygiene under NABH and DPDP guidelines.",
      metrics: {
        clinicalServersSecured: "45 DICOM PACS Hosts",
        staffTrained: "350+ Healthcare Workers",
        accessGovernance: "100% Role-Based IAM Enforced",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_ism",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA ISM Governance",
      budget: "₹12,80,000",
      challenge: "OT Engineers Bypassing Cyber Controls to Maintain Grid Uptime",
      dilemma:
        "Operational Technology (OT) engineers were bypassing cybersecurity controls to maintain 220kV transmission grid uptime, leaving industrial RTUs exposed to network probing.",
      resolution:
        "Debangshu implemented a hybrid IT-OT ISM framework compliant with CEA Cyber Security Regulations, enforcing air-gapped jump hosts, hardware tokens, and periodic third-party penetration testing.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        otGovernance: "100% CEA Regulations Compliant",
        unauthorizedTripping: "0.00% Zero Disruption",
        compliance: "CEA & NCIIPC CII Charter"
      }
    },
    {
      id: "jadavpur_cmmi_lab",
      lead: "Abhronila & Susmita",
      role: "University Security Governance Leads",
      location: "Jadavpur University AI Labs",
      title: "University ISM Maturity Assessment Testbed",
      budget: "₹4,50,000",
      challenge: "Academic Departments Operating at CMMI Level 1 (Ad-hoc)",
      dilemma:
        "Academic departments operated at CMMI Level 1 (Ad-hoc) with frequent credential stuffing and phishing compromises on departmental research servers.",
      resolution:
        "The team developed an interactive CMMI Level 1-to-5 ISM maturity benchmarking tool, training 200+ BCA cyber security students on conducting gap analyses and authoring Statement of Applicability (SoA) matrices.",
      metrics: {
        studentsTrained: "200+ BCA Cyber Students",
        departmentsAudited: "12 Academic Units",
        maturityElevation: "Elevated to CMMI Level 3 (Defined)",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 0 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Introduction to Information Security Management (ISM)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Transition from reactive ad-hoc IT security to strategic enterprise governance: discover the 5 pillars of ISM, 
            the People-Process-Technology golden triangle, ISO/IEC 27001 ISMS principles, and mandatory compliance under the Indian DPDP Act 2023 and CERT-In directions.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Ad-hoc IT Security vs Holistic Enterprise ISM Architecture Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 1: Ad-hoc IT Security vs. Holistic Enterprise ISM Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between reactive Ad-hoc IT Security and proactive Holistic Enterprise ISM Governance to compare board visibility, response velocity, regulatory compliance, and residual risk.
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(operatingModels).map((model) => {
              const isSelected = selectedModelKey === model.key;
              return (
                <button
                  key={model.key}
                  onClick={() => setSelectedModelKey(model.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{model.name}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{model.governanceScope} • {model.riskScore.split(" ")[0]} Risk</div>
                </button>
              );
            })}
          </div>

          {/* Active Model Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeModel.badgeClass)}>
                  Governance Posture: {activeModel.name.split(": ")[1]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeModel.governanceScope}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Residual Risk Assessment</span>
                <span className="text-base font-extrabold text-emerald-400">{activeModel.riskScore}</span>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {activeModel.pillars.map((pil, idx) => (
                <div key={idx} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold block font-sans">{pil.title}</span>
                  <p className="text-gray-300 text-[11px] font-sans leading-relaxed">{pil.desc}</p>
                </div>
              ))}
            </div>

            {/* Governance Details Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Incident Response Velocity &amp; Telemetry:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed">{activeModel.incidentResponseTime}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1 font-mono">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Board Oversight &amp; Regulatory Status:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeModel.regulatoryCompliance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ISM Capability Maturity Model Explorer (CMMI Levels 1 to 5) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📈</span> Studio 2: ISM Capability Maturity Model Explorer (CMMI Levels 1-5)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise maturity level to explore how security evolves from chaotic ad-hoc firefighting to quantitatively managed and self-optimizing adaptive resilience.
            </p>
          </div>

          {/* CMMI Level Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {cmmiLevels.map((lvl) => {
              const isSelected = selectedCmmiLevel === lvl.level;
              return (
                <button
                  key={lvl.level}
                  onClick={() => setSelectedCmmiLevel(lvl.level)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">Level {lvl.level}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{lvl.name.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active CMMI Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCmmi.badgeClass)}>
                  Maturity Rating: {activeCmmi.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeCmmi.posture}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Audit Readiness</span>
                <span className="text-sm font-extrabold text-emerald-400">{activeCmmi.auditReadiness}</span>
              </div>
            </div>

            {/* Description & Investment Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Organizational Characteristics:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeCmmi.details}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5 font-mono">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Strategic Investment &amp; Focus:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeCmmi.investment}</p>
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
              Visualizing the Holistic ISM Governance Ecosystem and the People-Process-Technology Interlocking Framework.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Holistic ISM Governance Ecosystem */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Enterprise ISM Governance Hierarchy
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Executive Tier */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="20" width="400" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">BOARD OF DIRECTORS &amp; RISK COMMITTEE</text>
                    <text x="250" y="58" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">Strategic Governance • DPDP Compliance • Risk Appetite</text>
                  </g>

                  {/* Split down */}
                  <line x1="250" y1="70" x2="250" y2="105" stroke="#6366f1" strokeWidth="1.5" />

                  {/* 2nd Line / CISO */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="105" width="200" height="60" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="130" y="127" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">CISO OFFICE (2nd Line)</text>
                    <text x="130" y="143" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">ISO 27001 Policies &amp; SoA</text>
                    <text x="130" y="157" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="7">Risk Assessments &amp; SIEM</text>
                  </g>

                  {/* 3rd Line / Audit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="105" width="200" height="60" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="370" y="127" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">INTERNAL AUDIT (3rd Line)</text>
                    <text x="370" y="143" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">Independent Verification</text>
                    <text x="370" y="157" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">Direct Reporting to Board</text>
                  </g>

                  {/* Operational Tier (1st Line) */}
                  <line x1="130" y1="165" x2="250" y2="200" stroke="#06b6d4" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="200" width="400" height="55" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="222" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      1st LINE OPERATIONS (DevOps, SysAdmins, DBAs, Employees)
                    </text>
                    <text x="250" y="238" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Direct Control Implementation • Patching • MFA • Anti-Phishing Hygiene
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The Three Lines of Defense (3LoD) governance architecture in modern enterprise ISM.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The Three Lines of Defense (3LoD) enterprise information security governance structure.
              </p>
            </div>

            {/* Diagram 2: PPT Golden Triangle Interlock */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The ISM Golden Triangle (People, Process, Technology)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Triangle Vertex 1: People */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">1. PEOPLE (Culture &amp; Hygiene)</text>
                    <text x="250" y="56" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">Phishing Drills • Awareness • Leadership</text>
                  </g>

                  {/* Connectors */}
                  <line x1="200" y1="65" x2="90" y2="120" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="300" y1="65" x2="410" y2="120" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="90" y1="165" x2="410" y2="165" stroke="#10b981" strokeWidth="1.5" />

                  {/* Triangle Vertex 2: Process */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="120" width="180" height="55" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="110" y="142" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. PROCESS (ISO 27001)</text>
                    <text x="110" y="157" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Access Control • Playbooks • SoA</text>
                  </g>

                  {/* Triangle Vertex 3: Technology */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="300" y="120" width="180" height="55" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="390" y="142" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. TECHNOLOGY (Tooling)</text>
                    <text x="390" y="157" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">EDR • SIEM • mTLS • AES-256</text>
                  </g>

                  {/* Core Intersection: Sustainable Resilience */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="100" y="210" width="300" height="45" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="232" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      SUSTAINABLE ENTERPRISE RESILIENCE
                    </text>
                    <text x="250" y="246" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Equilibrium across People, Process, and Technology safeguards business value.
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The PPT Golden Triangle: failure in any single dimension compromises the entire organization.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: The People, Process, and Technology (PPT) golden triangle interlocking framework.
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
              Explore how security leads establish ISO 27001 ISMS governance for Kolkata FinTechs, protect hospital imaging records under DPDP Act Section 33, govern 220kV substation SCADA systems, and train university students on CMMI maturity models.
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
                  <span>⚡</span> Governance Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied ISM Framework
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
              Guidelines for Chief Information Security Officers and security leaders architecting enterprise governance programs.
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
                  <span><strong>Treat Security as an Enabler:</strong> Frame security compliance as a competitive advantage that unlocks B2B sales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Asset Registers (IAR):</strong> Update asset inventories before every major product release.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate CERT-In 6-Hour Reporting:</strong> Build automated SIEM alert pipelines for rapid incident notification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce CISO Independence:</strong> Have the CISO report directly to the CEO or Board Risk Committee.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common ISM Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Buying Tools Without Process:</strong> High-end firewalls fail if employees click phishing links.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Creating Shelfware Policies:</strong> 200-page policy manuals that staff ignore cause audit failures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting DPDP Section 33:</strong> Failure to implement reasonable safeguards risks ₹250 Cr fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Untested Incident Playbooks:</strong> Leads to complete operational paralysis during live ransomware attacks.</span>
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
                  <span><strong>Deploy Three Lines of Defense:</strong> Segregate operations, policy setting, and independent audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Track KPIs and KRIs:</strong> Maintain dashboards for MTTD, MTTR, and unpatched critical CVEs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Unannounced Red Teaming:</strong> Validate employee phishing resistance and SOC alert speed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Target CMMI Level 4+:</strong> Elevate governance from qualitative checklists to quantitative metrics.</span>
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
              Synthesize foundational Information Security Management concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Governance Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why cybersecurity is an executive governance issue: If a data breach occurs, IT staff do not go to court—the CEO and Board of Directors face statutory penalties up to ₹250 Crores under the Indian DPDP Act 2023. Therefore, ISM must be governed at the highest executive level.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the People-Process-Technology golden triangle works in equilibrium: You can buy the most expensive SIEM tool (Technology), but without documented alert playbooks (Process) and trained SOC analysts (People), the alerts will sit unread while an attacker exfiltrates data.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security strategies, eliminate ad-hoc firefighting; establish a centralized Information Asset Register (IAR), map risks using ISO 27001 Annex A controls, and automate your incident reporting pipeline to comply with CERT-In's mandatory 6-hour window.
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
                <span>ISM is a continuous governance framework, not an ad-hoc IT product.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The 5 Pillars: Business Alignment, Risk Management, Resources, Value, Metrics.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The PPT Golden Triangle: People, Process, and Technology.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO/IEC 27001:2022 specifies requirements for an enterprise ISMS.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 Section 33 penalizes security failures up to ₹250 Crores.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70B mandates reporting incidents to CERT-In within 6 hours.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Introduction to Information Security Management (ISM) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Governance Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Information Security Management (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Course Module 3 on Information Security Management! Always remember that cybersecurity is fundamentally a business governance discipline. Technology alone cannot protect an organization if people and processes are ignored. Master the People-Process-Technology golden triangle, align your security controls with ISO/IEC 27001:2022, maintain an accurate Information Asset Register, and ensure your enterprise complies with Section 33 of the Indian DPDP Act 2023 and CERT-In's mandatory 6-hour breach reporting window!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
