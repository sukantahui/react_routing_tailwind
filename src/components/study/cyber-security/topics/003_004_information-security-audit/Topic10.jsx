import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: Active 7-Pillar Ethics Key
  const [selectedPillarKey, setSelectedPillarKey] = useState("independence");

  // Studio 2: Active 5 Threats Key
  const [selectedThreatKey, setSelectedThreatKey] = useState("self_review");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_intimidation_threat");

  // Studio 1: ISO 19011 7 Ethical Pillars Data
  const ethicalPillars = {
    integrity: {
      key: "integrity",
      name: "1. Integrity (The Foundation)",
      isoClause: "ISO 19011:2018 Clause 4(a)",
      definition: "Honesty, diligence, responsibility, and adherence to professional codes of conduct without compromise.",
      riskDilemma: "Auditor accepts gifts, hospitality, or undeclared financial incentives from the auditee.",
      mitigationSafeguard: "Formal annual Anti-Bribery covenant and mandatory disclosure of any gifts above ₹500.",
      credo: "Perform audit work with complete honesty and unbending moral rectitude.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    fair_presentation: {
      key: "fair_presentation",
      name: "2. Fair Presentation",
      isoClause: "ISO 19011:2018 Clause 4(b)",
      definition: "The obligation to report audit findings, conclusions, and non-conformities truthfully, objectively, and accurately.",
      riskDilemma: "Auditor is pressured by C-Suite to omit or soften a critical cloud vulnerability finding in the final report.",
      mitigationSafeguard: "Strict adherence to PLOR format; direct functional reporting to Board Audit Committee.",
      credo: "Report the unvarnished truth backed by objective evidence; never sugarcoat security flaws.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    due_care: {
      key: "due_care",
      name: "3. Due Professional Care",
      isoClause: "ISO 19011:2018 Clause 4(c)",
      definition: "Application of reasoned diligence, competence, and sound professional judgment commensurate with the audit's importance.",
      riskDilemma: "Auditor skips testing complex Kubernetes network policies due to lack of cloud domain knowledge.",
      mitigationSafeguard: "Mandatory lead auditor domain certification (e.g. CISA, CISSP, CISM) and technical expert peer review.",
      credo: "Exercise rigorous professional competence and critical skepticism in all evaluations.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    confidentiality: {
      key: "confidentiality",
      name: "4. Confidentiality",
      isoClause: "ISO 19011:2018 Clause 4(d)",
      definition: "Total security, discretion, and protection of auditee proprietary information and discovered vulnerabilities.",
      riskDilemma: "Auditor copies unencrypted database schema or zero-day vulnerability dumps to a personal USB drive.",
      mitigationSafeguard: "Mandatory Bilateral NDA, encrypted evidence vaults (AES-256), and IT Act 2000 Section 72A enforcement.",
      credo: "Safeguard client vulnerabilities and trade secrets with absolute discretion and cryptographic security.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    independence: {
      key: "independence",
      name: "5. Independence",
      isoClause: "ISO 19011:2018 Clause 4(e)",
      definition: "The structural basis for the impartiality of the audit and objectivity of the audit conclusions.",
      riskDilemma: "Auditor evaluates an AWS IAM architecture that they personally designed and deployed 6 months earlier.",
      mitigationSafeguard: "Mandatory 24-month cooling-off period; strict prohibition on consulting for certification clients (ISO 17021-1).",
      credo: "Maintain absolute impartiality; remain free from operational bias and conflicts of interest.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    evidence_based: {
      key: "evidence_based",
      name: "6. Evidence-Based Approach",
      isoClause: "ISO 19011:2018 Clause 4(f)",
      definition: "The rational method for reaching reliable and reproducible audit conclusions through verifiable factual evidence.",
      riskDilemma: "Auditor issues a Non-Conformity based on personal aesthetic dislike of a firewall vendor rather than standard criteria.",
      mitigationSafeguard: "All findings must link tangible artifacts to specific ISO 27001 clauses and policy requirements.",
      credo: "Ground every assertion in verifiable, reproducible, and mathematically provable evidence.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    risk_based: {
      key: "risk_based",
      name: "7. Risk-Based Approach",
      isoClause: "ISO 19011:2018 Clause 4(g)",
      definition: "An audit approach that systematically considers risks and opportunities to prioritize sampling and testing depth.",
      riskDilemma: "Auditor spends 80% of audit time checking printer visitor logs while spending only 10 minutes on the UPI payment switch.",
      mitigationSafeguard: "Pre-audit risk modeling allocating audit hours proportional to asset criticality and threat surface.",
      credo: "Direct audit energy and scrutiny where the organization faces the greatest catastrophic risk.",
      badgeClass: "bg-teal-950 text-teal-300 border-teal-800"
    }
  };

  const activePillar = ethicalPillars[selectedPillarKey];

  // Studio 2: 5 Threats to Auditor Independence Data
  const independenceThreats = {
    self_interest: {
      key: "self_interest",
      name: "1. Self-Interest Threat",
      category: "Financial / Commercial Conflict",
      scenario: "Auditing firm offers a bundled package: ₹20 Lakhs for ISMS implementation consulting + ₹5 Lakhs for ISO 27001 certification audit.",
      violation: "Direct violation of ISO/IEC 17021-1 Clause 5.2 and ISACA Code of Professional Ethics #2.",
      safeguard: "Strict legal separation of consulting and certification bodies; fixed auditing fee structures independent of pass/fail outcome.",
      determination: "STRICT CONFLICT OF INTEREST ➔ Certification invalid if conducted by implementation consultant.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    self_review: {
      key: "self_review",
      name: "2. Self-Review Threat",
      category: "Architectural / Operational Conflict",
      scenario: "Security architect Debangshu designed the SCADA RTU firewall rules in 2025 and is assigned to lead the 2026 ISO 27001 audit on that network.",
      violation: "Auditor cannot objectively evaluate their own engineering oversights, creating severe blind spots.",
      safeguard: "Mandatory 24-month (2-Year) cooling-off period; Lead Auditor recusal and assignment of an independent auditor (Mamata).",
      determination: "RECUSAL MANDATORY ➔ Debangshu must recuse himself until cooling-off period expires.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    familiarity: {
      key: "familiarity",
      name: "3. Familiarity Threat",
      category: "Personal Relationship / Tenure Bias",
      scenario: "Lead Auditor has audited the same Kolkata cloud datacenter for 7 consecutive years, developing close friendships with IT management.",
      violation: "Erosion of professional skepticism; auditor tends to accept verbal assurances without demanding raw cryptographic proof.",
      safeguard: "Mandatory Lead Auditor rotation every 3 to 5 years under ISO 19011 and corporate audit governance charters.",
      determination: "AUDITOR ROTATION TRIGGERED ➔ Rotate Lead Auditor to bring fresh, impartial skepticism.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    intimidation: {
      key: "intimidation",
      name: "4. Intimidation Threat",
      category: "Management Coercion / Retaliation",
      scenario: "Auditee Chief Technology Officer threatens to cancel multi-crore consulting contracts if the auditor records a Major NC on missing encryption.",
      violation: "Gross violation of ISO 19011 Fair Presentation and ISACA Ethical Principle #6.",
      safeguard: "Dual-reporting line directly to the Board of Directors Audit Committee; confidential escalation to Accreditation Body.",
      determination: "UNETHICAL COERCION ➔ Auditor logs Major NC with objective evidence and notifies Board Audit Chair.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    advocacy: {
      key: "advocacy",
      name: "5. Advocacy Threat",
      category: "Public Promotion / Legal Defense",
      scenario: "Auditor acts as an expert witness defending the auditee's cybersecurity measures in a high-stakes DPDP Act penalty tribunal.",
      violation: "Auditor compromises neutral assurance role by taking an active adversarial defense position for the client.",
      safeguard: "Strict prohibition on providing legal advocacy or expert witness defense for organizations while serving as their assurance auditor.",
      determination: "IMPARTIALITY COMPROMISED ➔ Auditor must recuse from all ongoing and future assurance audits.",
      badgeClass: "bg-teal-950 text-teal-300 border-teal-800"
    }
  };

  const activeThreat = independenceThreats[selectedThreatKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_intimidation_threat",
      lead: "Mamata",
      role: "Lead Audit Director",
      location: "Kolkata FinTech Operations Center",
      title: "Intimidation Threat on ₹120 Cr UPI Switch",
      budget: "₹15,00,000",
      challenge: "FinTech CIO Pressured Audit Team to Downgrade Major NC on HSM Key Rotation to an OFI",
      dilemma:
        "During a pre-certification audit of a payment switch processing ₹120 Crores daily, Mamata discovered un-rotated Hardware Security Module (HSM) master keys. The CIO threatened to blacklist her firm if she logged a Major NC.",
      resolution:
        "Mamata cited ISO 19011 Fair Presentation, stood firm, refused the downgrade, reported directly to the Board Audit Committee, and secured emergency HSM key rotation, averting RBI license suspension.",
      metrics: {
        switchVolume: "₹120 Cr Daily",
        findingClassification: "Major NC Maintained",
        boardIntervention: "< 24 Hours",
        compliance: "RBI Master Directions & ISO 19011 Cl 4"
      }
    },
    {
      id: "ichapur_confidentiality_assurance",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Confidentiality & DPDP Act Data Assurance",
      budget: "₹7,50,000",
      challenge: "Junior Auditor Attempted to Copy 500 Patient Biopsy DICOM Files to Unencrypted Personal USB",
      dilemma:
        "A trainee auditor extracted raw patient biopsy images containing PII to a private flash drive for off-site reporting, creating a severe potential breach under IT Act Section 72A and DPDP Act 2023.",
      resolution:
        "Mahima intervened immediately, forensically wiped the unauthorized drive, enforced hardware-encrypted audit vaults (AES-256), and conducted Section 72A IT Act ethical re-training, protecting 80,000 patient records.",
      metrics: {
        recordsProtected: "80,000 PACS Biopsies",
        vaultEncryption: "FIPS 140-3 Level 3",
        driveSanitization: "DoD 5220.22-M Wipe",
        compliance: "IT Act Sec 72A & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_self_review",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Self-Review Threat & 2-Year Cooling-Off",
      budget: "₹11,20,000",
      challenge: "Debangshu Assigned to Audit SCADA Substation RTU Firmware He Personally Designed in 2025",
      dilemma:
        "The power utility scheduled Debangshu to lead the 2026 ISO 27001 audit of the Barrackpore grid. Debangshu realized he had architected the primary RTU firewall configs the previous year.",
      resolution:
        "Debangshu formally declared a Conflict of Interest (COI), recused himself, enforced a mandatory 24-month cooling-off period, and appointed an independent external Lead Auditor (Mamata) to maintain assurance credibility.",
      metrics: {
        coolingOffPeriod: "24 Calendar Months",
        substationsAudited: "18 Substation Nodes",
        coiDeclaration: "Formally Registered",
        compliance: "ISO/IEC 17021-1 Cl 5.2"
      }
    },
    {
      id: "jadavpur_ethics_simulator",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Auditor Ethical Dilemma & COI Simulator",
      budget: "₹3,80,000",
      challenge: "Students Struggled to Identify Subtle Conflicts of Interest in Audit Consulting vs Assurance",
      dilemma:
        "Cybersecurity students frequently failed to recognize why offering implementation consulting alongside third-party certification is a fatal ethical and regulatory violation under ISO 17021-1.",
      resolution:
        "The team developed an interactive Auditor Ethical Dilemma & COI Resolution Simulator in React, training 215+ BCA cybersecurity students on ISO 19011 principles, ISACA code of ethics, and Board reporting.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        dilemmasProgrammed: "12 Interactive Case Studies",
        ethicsExamPassRate: "99.4% First Attempt",
        compliance: "ISACA Code & ISO 19011"
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 10 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Auditor Ethics and Professional Independence
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the 7 Principles of Auditing under ISO 19011:2018 Clause 4, neutralize the 5 Threats to Auditor Independence 
            (Self-Interest, Self-Review, Familiarity, Intimidation, Advocacy), and implement robust Conflict of Interest (COI) governance.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive ISO 19011 7-Pillar Ethics Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 1: Interactive ISO 19011 &amp; ISACA 7-Pillar Ethics Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an ethical pillar to inspect its statutory ISO 19011 definition, breach dilemma, technical safeguard, and auditor credo.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {Object.values(ethicalPillars).map((pillar) => {
              const isSelected = selectedPillarKey === pillar.key;
              return (
                <button
                  key={pillar.key}
                  onClick={() => setSelectedPillarKey(pillar.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs font-mono",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{pillar.name.split(" ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{pillar.isoClause.split(" ")[2]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Details Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePillar.badgeClass)}>
                  {activePillar.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Standard: {activePillar.isoClause}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Credo: <span className="text-emerald-400 font-bold">{activePillar.credo}</span>
              </div>
            </div>

            {/* Definition */}
            <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5 text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Formal Definition:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activePillar.definition}</p>
            </div>

            {/* Dilemma vs Safeguard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/40 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Breach Risk / Ethical Dilemma:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activePillar.riskDilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/40 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory Mitigation Safeguard:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold font-sans">{activePillar.mitigationSafeguard}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 5 Threats to Auditor Independence & COI Resolution Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡</span> Studio 2: 5 Threats to Auditor Independence &amp; COI Resolution Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a threat to auditor independence to inspect the operational conflict scenario, regulatory violation, mitigation safeguards, and professional determination.
            </p>
          </div>

          {/* Threat Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(independenceThreats).map((threat) => {
              const isSelected = selectedThreatKey === threat.key;
              return (
                <button
                  key={threat.key}
                  onClick={() => setSelectedThreatKey(threat.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{threat.name.split(" ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{threat.category}</div>
                </button>
              );
            })}
          </div>

          {/* Active Threat Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeThreat.badgeClass)}>
                  {activeThreat.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Category: {activeThreat.category}
                </h3>
              </div>
            </div>

            {/* Scenario & Violation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/40 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Audit Conflict Scenario:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeThreat.scenario}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/40 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Regulatory &amp; Ethical Violation:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeThreat.violation}</p>
              </div>
            </div>

            {/* Safeguard & Determination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/40 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Mandatory Mitigation Safeguard:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeThreat.safeguard}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/40 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Governance Determination:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold font-sans">{activeThreat.determination}</p>
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
              Visualizing the 7 Pillars of Auditor Professional Ethics and the 5 Threats to Independence Shield.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 7 Pillars of Ethics */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🏛</span> Diagram A: The 7 Pillars of Auditor Ethics (ISO 19011 Clause 4)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Pediment / Roof */}
                  <polygon points="250,20 480,80 20,80" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="250" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">
                    CREDIBLE AUDIT ASSURANCE &amp; LEGAL TRUST
                  </text>

                  {/* 7 Pillars */}
                  {/* 1. Integrity */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="90" width="55" height="170" rx="4" fill="#312e81" stroke="#818cf8" />
                    <text x="57" y="180" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="7" transform="rotate(-90 57,180)">1. INTEGRITY</text>
                  </g>

                  {/* 2. Fair Presentation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="95" y="90" width="55" height="170" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="122" y="180" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="6.5" transform="rotate(-90 122,180)">2. FAIR PRESENT</text>
                  </g>

                  {/* 3. Due Care */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="160" y="90" width="55" height="170" rx="4" fill="#581c87" stroke="#c084fc" />
                    <text x="187" y="180" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7" transform="rotate(-90 187,180)">3. DUE CARE</text>
                  </g>

                  {/* 4. Confidentiality */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="225" y="90" width="55" height="170" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="252" y="180" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="6.5" transform="rotate(-90 252,180)">4. CONFIDENTIAL</text>
                  </g>

                  {/* 5. Independence */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="290" y="90" width="55" height="170" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="317" y="180" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="6.5" transform="rotate(-90 317,180)">5. INDEPENDENCE</text>
                  </g>

                  {/* 6. Evidence-Based */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="355" y="90" width="55" height="170" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="382" y="180" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="6.5" transform="rotate(-90 382,180)">6. EVIDENCE-BASED</text>
                  </g>

                  {/* 7. Risk-Based */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="420" y="90" width="55" height="170" rx="4" fill="#134e4a" stroke="#2dd4bf" />
                    <text x="447" y="180" fill="#ccfbf1" fontWeight="bold" textAnchor="middle" fontSize="7" transform="rotate(-90 447,180)">7. RISK-BASED</text>
                  </g>

                  {/* Base Foundation */}
                  <rect x="15" y="265" width="470" height="35" rx="4" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                  <text x="250" y="287" fill="#e4e4e7" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8">
                    FOUNDATION: ISO/IEC 19011:2018 &amp; ISACA PROFESSIONAL CODE OF ETHICS
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: The 7 Pillars supporting credible information security audit conclusions.
              </p>
            </div>

            {/* Diagram 2: 5 Threats Shield */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>🛡</span> Diagram B: The 5 Independence Threats vs Mitigation Shield
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* 5 Threat Arrows pointing in */}
                  {/* Threat 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="130" height="35" rx="5" fill="#450a0a" stroke="#ef4444" />
                    <text x="85" y="52" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="7.5">1. SELF-INTEREST</text>
                  </g>
                  <line x1="150" y1="47" x2="210" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Threat 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="90" width="130" height="35" rx="5" fill="#78350f" stroke="#f59e0b" />
                    <text x="85" y="112" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7.5">2. SELF-REVIEW</text>
                  </g>
                  <line x1="150" y1="107" x2="210" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Threat 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="150" width="130" height="35" rx="5" fill="#083344" stroke="#06b6d4" />
                    <text x="85" y="172" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">3. FAMILIARITY</text>
                  </g>
                  <line x1="150" y1="167" x2="210" y2="167" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Threat 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="210" width="130" height="35" rx="5" fill="#581c87" stroke="#c084fc" />
                    <text x="85" y="232" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7.5">4. INTIMIDATION</text>
                  </g>
                  <line x1="150" y1="227" x2="210" y2="195" stroke="#c084fc" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Threat 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="265" width="130" height="35" rx="5" fill="#134e4a" stroke="#2dd4bf" />
                    <text x="85" y="287" fill="#ccfbf1" fontWeight="bold" textAnchor="middle" fontSize="7.5">5. ADVOCACY</text>
                  </g>
                  <line x1="150" y1="282" x2="210" y2="230" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Center Shield: Independence Safeguards */}
                  <polygon points="260,60 440,60 440,190 350,270 260,190" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                  <text x="350" y="110" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">INDEPENDENCE</text>
                  <text x="350" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">SAFEGUARD SHIELD</text>
                  <text x="350" y="150" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">• 2-Year Cooling-Off</text>
                  <text x="350" y="165" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">• 3-5 Yr Auditor Rotation</text>
                  <text x="350" y="180" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">• Board Dual-Reporting</text>
                  <text x="350" y="195" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">• Fixed Fees (ISO 17021)</text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: Governance safeguards neutralizing threats to auditor independence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Auditor Ethics Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security professionals handle intimidation threats in Kolkata, enforce confidentiality in Ichapur, manage self-review in Barrackpore, and train students in Jadavpur.
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
                  <span>🛡</span> Applied Ethical Resolution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Ethical Metrics &amp; Deliverables
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
              Essential ethical rules and operational habits for certified lead auditors and internal evaluators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Ethical Auditor Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>File Annual COI:</strong> Disclose stock ownership, family ties, and previous clients annually.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Dual-Reporting Line:</strong> Ensure direct functional reporting to the Board Audit Committee.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Encrypt Evidence:</strong> Store all audit findings in AES-256 encrypted hardware vaults.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>"Verify then Trust":</strong> Demand cryptographic logs for every verbal security assurance.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Severe Ethical Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Consulting on Same System:</strong> Offering to fix the vulnerabilities you just flagged.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Yielding to Coercion:</strong> Softening Major NCs into OFIs due to executive pressure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Leaking Vulnerabilities:</strong> Discussing client security flaws at public social meetups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Accepting Gifts:</strong> Taking expensive hospitality that erodes objectivity.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡</span> Assurance Excellence
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 2-Year Cooling-Off:</strong> Recuse auditors from reviewing their own past engineering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Rotate Lead Auditors:</strong> Change lead assurance personnel every 3 to 5 years.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with Sec 72A IT Act:</strong> Protect confidential records under criminal penalty statutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Fixed Auditing Fees:</strong> Never tie audit compensation to certification pass/fail outcomes.</span>
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
              Synthesize ISO 19011 Clause 4 principles, independence threat mitigations, and professional skepticism before reviewing practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Audit Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why ISO/IEC 17021-1 strictly forbids certification bodies from offering ISMS consulting: If an organization charges ₹20 Lakhs to implement security controls, they have an overwhelming financial self-interest in certifying their own work, destroying the judicial and regulatory credibility of the ISO 27001 certificate.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The distinction between administrative and functional reporting in internal audit charters: Administrative reporting to the CEO handles logistics and leave, while functional reporting directly to the Board Audit Committee protects the auditor from executive retaliation when reporting high-severity non-conformities.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  Whenever an auditee offers verbal reassurance (e.g. "Our Kubernetes cluster is fully isolated"), apply professional skepticism by requesting the actual YAML network policy and inspecting the active cluster state via live terminal verification.
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
                <span>7 Audit Principles: Integrity, Fair Presentation, Due Care, Confidentiality, Independence, Evidence, Risk.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>5 Threats to Independence: Self-Interest, Self-Review, Familiarity, Intimidation, Advocacy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Self-Review Threat requires a mandatory 2-year (24-month) cooling-off period.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Familiarity Threat requires mandatory Lead Auditor rotation every 3 to 5 years.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 17021-1 strictly prohibits Certification Bodies from consulting for certification clients.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 72A imposes up to 3 years imprisonment for leaking confidential auditee data.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Auditor Ethics and Professional Independence FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Problem-Solving Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Auditor Ethics and Professional Independence (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Auditor Ethics and Professional Independence are the sacred pillars of cybersecurity assurance. Without integrity, even the most sophisticated technical penetration testing report is legally worthless. Always remember: an auditor's loyalty is to the truth and the public trust, never to executive convenience or consulting fees. Uphold ISO 19011 principles, enforce cooling-off periods, and practice relentless professional skepticism in every audit engagement!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
