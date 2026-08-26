import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic12_files/topic12_note.txt?raw";

const Topic12 = () => {
  // Studio 1: STRIDE Active Category State
  const [activeStrideKey, setActiveStrideKey] = useState("spoofing");

  // Studio 2: DREAD Sliders State (1 to 10)
  const [damagePotential, setDamagePotential] = useState(9);
  const [reproducibility, setReproducibility] = useState(8);
  const [exploitability, setExploitability] = useState(7);
  const [affectedUsers, setAffectedUsers] = useState(10);
  const [discoverability, setDiscoverability] = useState(8);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_stride_payment");

  // Studio 1: STRIDE Threat Data
  const strideCategories = {
    spoofing: {
      key: "spoofing",
      letter: "S",
      title: "Spoofing (Faking Identity)",
      property: "Authenticity",
      attackVector: "Attacker intercepts API calls and forges JWT tokens to impersonate payment service accounts.",
      countermeasure: "Deploy Mutual TLS (mTLS) with X.509 client certificates + FIDO2 WebAuthn + JWT RS256 cryptographic signature validation.",
      annexA: "A.8.5 (Secure Authentication) & A.8.24 (Cryptography)",
      codeSnippet: `// Verify RSA-signed JWT token on all inbound microservice endpoints:
jwt.verify(token, rsaPublicKey, { algorithms: ['RS256'] });`,
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    tampering: {
      key: "tampering",
      letter: "T",
      title: "Tampering (Data Modification)",
      property: "Integrity",
      attackVector: "Attacker intercepts HTTP POST requests and modifies transaction amounts from ₹10,000 to ₹10.",
      countermeasure: "Enforce SHA-256 HMAC payload signatures on all financial payloads + Database Row-Level Encryption + TLS 1.3 in transit.",
      annexA: "A.8.24 (Use of Cryptography) & A.8.20 (Network Security)",
      codeSnippet: `// Compute and verify SHA-256 HMAC payload hash:
const calculatedHmac = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
if (!crypto.timingSafeEqual(Buffer.from(calculatedHmac), Buffer.from(receivedHmac))) throw new Error("Tampered!");`,
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    repudiation: {
      key: "repudiation",
      letter: "R",
      title: "Repudiation (Denying Actions)",
      property: "Non-Repudiation",
      attackVector: "Malicious administrator executes unauthorized wire transfer and denies initiating the transaction.",
      countermeasure: "Deploy immutable WORM audit logs with AWS S3 Object Lock + PKI digital signatures + Dual-custody approval workflows.",
      annexA: "A.8.15 (Logging) & A.8.17 (Clock Synchronization)",
      codeSnippet: `// Write immutable non-repudiation audit event to WORM ledger:
s3.putObject({ Bucket: 'audit-ledger', Key: eventId, Body: eventLog, ObjectLockMode: 'COMPLIANCE', ObjectLockRetainUntilDate: retentionDate });`,
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    info_disclosure: {
      key: "info_disclosure",
      letter: "I",
      title: "Information Disclosure (Data Leakage)",
      property: "Confidentiality",
      attackVector: "Unprotected REST API endpoint exposes 80,000 patient biopsy scans and Aadhaar numbers without auth.",
      countermeasure: "Implement AES-256-GCM encryption at rest + Automated Data Leakage Prevention (DLP) + Strict CI/CD secret scanning.",
      annexA: "A.8.11 (Data Masking) & A.8.24 (Cryptography)",
      codeSnippet: `// Dynamic Data Masking on Citizen PII before returning REST responses:
const maskedAadhaar = citizen.aadhaar.replace(/^\\d{8}/, 'XXXX-XXXX-');`,
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    dos: {
      key: "dos",
      letter: "D",
      title: "Denial of Service (Availability Collapse)",
      property: "Availability",
      attackVector: "Volumetric SYN flood and API endpoint resource exhaustion crash core banking switches during peak hours.",
      countermeasure: "Deploy Token-Bucket Rate Limiting + Cloudflare Magic Transit Anti-DDoS + Circuit Breakers on all downstream microservices.",
      annexA: "A.8.6 (Capacity Management) & A.8.20 (Network Security)",
      codeSnippet: `// Token-bucket rate limiting middleware (Redis-backed):
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: "Too many requests" });`,
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    elevation: {
      key: "elevation",
      letter: "E",
      title: "Elevation of Privilege (Admin Abuse)",
      property: "Authorization",
      attackVector: "Standard authenticated user modifies client JSON parameter `role=admin` to gain root access to payment database.",
      countermeasure: "Enforce strict Server-Side Role-Based Access Control (RBAC) + Principle of Least Privilege + Parameterized SQL Queries.",
      annexA: "A.8.2 (Privileged Access Rights) & A.8.4 (Access to Source Code)",
      codeSnippet: `// Server-side RBAC validation (Never trust client-supplied role parameters!):
if (req.session.user.role !== 'SUPER_ADMIN') return res.status(403).json({ error: "Access Denied" });`,
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activeStride = strideCategories[activeStrideKey];

  // Studio 2: DREAD Calculation
  const { dreadScore, dreadTier, dreadBadge, remediationUrgency } = useMemo(() => {
    const sum = damagePotential + reproducibility + exploitability + affectedUsers + discoverability;
    const avg = (sum / 5).toFixed(1);
    const numAvg = parseFloat(avg);

    let tier = "LOW RISK";
    let badge = "bg-emerald-950 text-emerald-300 border-emerald-800";
    let urgency = "Address during routine maintenance cycles (< 90 Days).";

    if (numAvg >= 8.0) {
      tier = "CRITICAL RISK";
      badge = "bg-rose-950 text-rose-300 border-rose-800";
      urgency = "EMERGENCY: Blocks production build; immediate hotfix required (< 24 Hours).";
    } else if (numAvg >= 6.0) {
      tier = "HIGH RISK";
      badge = "bg-amber-950 text-amber-300 border-amber-800";
      urgency = "HIGH PRIORITY: Scheduled for remediation in current sprint (< 14 Days).";
    } else if (numAvg >= 4.0) {
      tier = "MEDIUM RISK";
      badge = "bg-indigo-950 text-indigo-300 border-indigo-800";
      urgency = "STANDARD: Addressed in regular patch release (< 30 Days).";
    }

    return { dreadScore: avg, dreadTier: tier, dreadBadge: badge, remediationUrgency: urgency };
  }, [damagePotential, reproducibility, exploitability, affectedUsers, discoverability]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_stride_payment",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "STRIDE Threat Modeling on 500 Payment Services",
      budget: "₹18,50,000",
      challenge: "500 Payment Microservices Processing ₹120 Cr/Day Faced Tampering and Spoofing",
      dilemma:
        "A 500-node payment switch faced API spoofing and parameter tampering threats on high-value UPI payment endpoints processing ₹120 Crores daily.",
      resolution:
        "Mamata built a complete STRIDE threat model, deploying Mutual TLS (mTLS) between all pods and SHA-256 HMAC payload validation, eliminating payment manipulation risks and satisfying RBI banking rules.",
      metrics: {
        servicesModeled: "500 Microservices",
        strideFlawsRemediated: "34 Architectural Flaws",
        tamperingResistance: "100% SHA-256 HMAC Protected",
        compliance: "ISO 27001 A.8.25 & RBI Rules"
      }
    },
    {
      id: "ichapur_stride_pacs",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Patient Data STRIDE & DREAD Analysis",
      budget: "₹8,20,000",
      challenge: "PACS Imaging Server Faced Info Disclosure and Elevation Risks on 80,000 Scans",
      dilemma:
        "Hospital clinical care network PACS imaging servers faced Information Disclosure and Elevation of Privilege risks that could leak 80,000 cancer patient records under the DPDP Act 2023.",
      resolution:
        "Mahima threat modeled DICOM workflows, calculated a DREAD score of 8.8 (Critical), and deployed SQLCipher encryption and server-side RBAC, fully immunizing the hospital from ₹250 Cr DPDP statutory fines.",
      metrics: {
        patientScansProtected: "80,000 Biopsy Records",
        dreadScoreMitigated: "8.8 ➔ 1.4 (Low)",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "DPDP Act 2023 & NABH Charter"
      }
    },
    {
      id: "barrackpore_scada_stride",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT Protocol Threat Modeling",
      budget: "₹14,80,000",
      challenge: "18 Substations Ran Legacy Modbus Protocols Vulnerable to Tampering and DoS",
      dilemma:
        "18 high-voltage 220kV transmission substations ran legacy cleartext Modbus/DNP3 industrial protocols vulnerable to command tampering and physical denial-of-service tripping.",
      resolution:
        "Debangshu modeled OT trust boundaries, designed unidirectional physical data diode isolations, and achieved 100% compliance with NCIIPC Protected System mandates under Section 70 of the Indian IT Act.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        otTrustBoundaries: "24 DFD Trust Boundaries",
        modbusTamperingShielded: "100% Hardware Data Diodes",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_stride_dread_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Threat Modeling & DREAD Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Calculate DREAD Scores & Map STRIDE to Security Properties",
      dilemma:
        "Cybersecurity students struggled to calculate multi-variable DREAD mathematical averages, map STRIDE threats to security properties, and design DFD trust boundaries.",
      resolution:
        "The team developed an interactive STRIDE Threat Matrix & DREAD Quantitative Risk Calculator in React, training 215+ BCA cyber security students on software architecture security and DevSecOps.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        threatModelsConstructed: "110+ Architecture DFDs",
        examMastery: "100% Threat Modeling Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 12 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Threat Modeling Methodologies (STRIDE, DREAD)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Shift security left into architecture and design: master the 6 STRIDE threat categories, 
            deconstruct Data Flow Diagrams (DFDs) across trust boundaries under ISO/IEC 27001 Control A.8.25, 
            quantify risk with the 5-parameter DREAD scoring model, and enforce Privacy-by-Design under the Indian DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive STRIDE Threat Matrix & Countermeasure Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 1: Interactive STRIDE Threat Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any STRIDE category to inspect violated security properties, real-world attack vectors, Annex A controls, and code-level remediation patterns.
            </p>
          </div>

          {/* STRIDE Category Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.values(strideCategories).map((st) => {
              const isSelected = activeStrideKey === st.key;
              return (
                <button
                  key={st.key}
                  onClick={() => setActiveStrideKey(st.key)}
                  className={clsx(
                    "p-3 rounded-xl text-center transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-105"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base font-extrabold text-indigo-400 font-mono">[{st.letter}]</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{st.title.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active STRIDE Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeStride.badgeClass)}>
                  STRIDE CATEGORY [{activeStride.letter}]: {activeStride.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Violated Property: {activeStride.property}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Mapped ISO 27001 Controls</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeStride.annexA.split(" & ")[0]}</span>
              </div>
            </div>

            {/* Attack Vector & Countermeasure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Real-World Attack Vector:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeStride.attackVector}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Architectural Countermeasure:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeStride.countermeasure}</p>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="space-y-1.5">
              <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider block font-sans">
                Code-Level Defensive Implementation:
              </span>
              <pre className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-xs text-cyan-300 font-mono overflow-x-auto">
                <code>{activeStride.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive DREAD Quantitative Threat Scoring Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 2: Interactive DREAD Quantitative Scoring Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust the 5 DREAD parameters (1 to 10) to calculate quantitative risk scores, determine severity bands, and prioritize DevSecOps engineering backlogs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: 5 Sliders */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl lg:col-span-2 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                DREAD 5-Parameter Calibration (Scale: 1 to 10)
              </h3>

              {/* Damage Potential */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">1. [D] Damage Potential (Severity of Loss):</span>
                  <span className="text-rose-400 font-bold">{damagePotential} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={damagePotential}
                  onChange={(e) => setDamagePotential(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                /&gt;
              </div>

              {/* Reproducibility */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">2. [R] Reproducibility (Ease of Replication):</span>
                  <span className="text-amber-400 font-bold">{reproducibility} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={reproducibility}
                  onChange={(e) => setReproducibility(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                /&gt;
              </div>

              {/* Exploitability */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">3. [E] Exploitability (Effort / Skill Needed):</span>
                  <span className="text-purple-400 font-bold">{exploitability} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={exploitability}
                  onChange={(e) => setExploitability(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                /&gt;
              </div>

              {/* Affected Users */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">4. [A] Affected Users (% of Userbase Impacted):</span>
                  <span className="text-cyan-400 font-bold">{affectedUsers} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={affectedUsers}
                  onChange={(e) => setAffectedUsers(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                /&gt;
              </div>

              {/* Discoverability */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">5. [D] Discoverability (Ease of Finding Flaw):</span>
                  <span className="text-emerald-400 font-bold">{discoverability} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={discoverability}
                  onChange={(e) => setDiscoverability(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                /&gt;
              </div>
            </div>

            {/* Right Output: Score Dashboard */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Calculated DREAD Rating
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Average DREAD Score:</span>
                  <span className="text-3xl font-extrabold text-white block">{dreadScore} / 10.0</span>
                  <span className="text-[10px] text-gray-500 font-sans block">Formula: (D + R + E + A + D) / 5</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">DevSecOps Backlog Action:</span>
                  <span className="text-xs text-amber-300 font-bold font-sans block">{remediationUrgency}</span>
                </div>
              </div>

              {/* Status Outcome Banner */}
              <div className={clsx("p-3 rounded-xl border text-xs font-mono font-bold text-center", dreadBadge)}>
                SEVERITY BAND: {dreadTier}
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
              Visualizing the STRIDE to Security Property Mapping and the Data Flow Diagram (DFD) Trust Boundary Model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: STRIDE Mapping */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: STRIDE to Security Property Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* S: Spoofing &rarr; Authenticity */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="20" width="180" height="35" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="115" y="42" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">SPOOFING (S)</text>
                  </g>
                  <text x="250" y="42" fill="#94a3b8" fontWeight="bold" textAnchor="middle" fontSize="9">➔ VIOLATES ➔</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="20" width="180" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="385" y="42" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">AUTHENTICITY</text>
                  </g>

                  {/* T: Tampering &rarr; Integrity */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="65" width="180" height="35" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="115" y="87" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">TAMPERING (T)</text>
                  </g>
                  <text x="250" y="87" fill="#94a3b8" fontWeight="bold" textAnchor="middle" fontSize="9">➔ VIOLATES ➔</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="65" width="180" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="385" y="87" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">INTEGRITY</text>
                  </g>

                  {/* R: Repudiation &rarr; Non-Repudiation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="110" width="180" height="35" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="115" y="132" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">REPUDIATION (R)</text>
                  </g>
                  <text x="250" y="132" fill="#94a3b8" fontWeight="bold" textAnchor="middle" fontSize="9">➔ VIOLATES ➔</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="110" width="180" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="385" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">NON-REPUDIATION</text>
                  </g>

                  {/* I: Info Disclosure &rarr; Confidentiality */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="155" width="180" height="35" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="115" y="177" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">INFO DISCLOSURE (I)</text>
                  </g>
                  <text x="250" y="177" fill="#94a3b8" fontWeight="bold" textAnchor="middle" fontSize="9">➔ VIOLATES ➔</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="155" width="180" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="385" y="177" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">CONFIDENTIALITY</text>
                  </g>

                  {/* D: DoS &rarr; Availability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="200" width="180" height="35" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="115" y="222" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">DENIAL OF SERVICE (D)</text>
                  </g>
                  <text x="250" y="222" fill="#94a3b8" fontWeight="bold" textAnchor="middle" fontSize="9">➔ VIOLATES ➔</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="200" width="180" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="385" y="222" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">AVAILABILITY</text>
                  </g>

                  {/* E: Elevation &rarr; Authorization */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="245" width="180" height="35" rx="4" fill="#312e81" stroke="#818cf8" />
                    <text x="115" y="267" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="8">ELEVATION (E)</text>
                  </g>
                  <text x="250" y="267" fill="#94a3b8" fontWeight="bold" textAnchor="middle" fontSize="9">➔ VIOLATES ➔</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="245" width="180" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="385" y="267" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">AUTHORIZATION</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 12.1: The STRIDE threat taxonomy mapped to foundational security properties.
              </p>
            </div>

            {/* Diagram 2: DFD Trust Boundaries */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: DFD Trust Boundary Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* External Entity */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="100" height="45" rx="4" fill="#18181b" stroke="#06b6d4" />
                    <text x="70" y="52" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">WEB BROWSER</text>
                    <text x="70" y="65" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Untrusted User</text>
                  </g>

                  {/* Red Dashed Trust Boundary 1 */}
                  <line x1="145" y1="15" x2="145" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="145" y="295" fill="#ef4444" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7">
                    TRUST BOUNDARY 1 (Public / DMZ)
                  </text>

                  {/* DMZ Process: API Gateway */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="220" cy="52" r="30" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="220" y="50" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">API</text>
                    <text x="220" y="62" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">GATEWAY</text>
                  </g>

                  {/* Red Dashed Trust Boundary 2 */}
                  <line x1="290" y1="15" x2="290" y2="280" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="290" y="295" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7">
                    TRUST BOUNDARY 2 (Internal Core)
                  </text>

                  {/* Core Data Store: Database */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="30" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="407" y="52" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">POSTGRESQL DB</text>
                    <text x="407" y="65" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Encrypted PII Storage</text>
                  </g>

                  {/* Data Flow Arrows */}
                  <line x1="120" y1="52" x2="190" y2="52" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrowGray72)" />
                  <line x1="250" y1="52" x2="340" y2="52" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrowGray72)" />

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="135" width="455" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="160" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      TRUST BOUNDARY CROSSING AUDIT
                    </text>
                    <text x="250" y="177" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Every boundary transition enforces mTLS, HMAC payload signing, and strict RBAC authorization.
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowGray72" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 12.2: Data Flow Diagram (DFD) with trust boundary intersections.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Threat Modeling Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads model payment APIs in Kolkata, protect oncology records in Ichapur, shield SCADA protocols in Barrackpore, and simulate DREAD in Jadavpur.
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
                  <span>⚡</span> Architectural Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Threat Model Solution
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
              Guidelines for Application Security Architects and DevSecOps Leads conducting threat modeling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Modeling Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Model Trust Boundaries:</strong> Focus STRIDE on perimeters where untrusted input enters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Never Trust Client Roles:</strong> Validate RBAC authorization exclusively on the server.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Assume Discoverability is 10:</strong> Modern automated fuzzers find all unauthenticated URLs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Model in Sprint 0:</strong> Conduct threat modeling during design before writing code.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Modeling Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Security by Obscurity:</strong> Assuming hackers won't discover an unlisted endpoint.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Post-Production Modeling:</strong> Threat modeling after software is already live.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Software-Only Blindness:</strong> Ignoring network trust boundaries and cloud VPC flows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unprioritized Threat Lists:</strong> Logging 200 STRIDE bugs without DREAD prioritization.</span>
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
                  <span><strong>Enforce DPDP Privacy-by-Design:</strong> Threat model citizen personal data flows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate SHA-256 HMAC:</strong> Sign all financial transaction requests to block Tampering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Use Immutable S3 WORM:</strong> Guarantee Non-Repudiation for audit trail logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Re-validate on Refactoring:</strong> Update DFDs on every major architectural change.</span>
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
              Synthesize STRIDE threat categories and DREAD quantitative scoring before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Threat Modelers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why fixing architectural flaws during design is 100x cheaper than in production: Identifying a Tampering or Elevation flaw on a whiteboard Data Flow Diagram costs ₹10,000 to redraw. Fixing that same flaw after deployment following a real-world breach costs ₹250 Crores in DPDP Act statutory fines and customer litigation.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How STRIDE maps 1-to-1 to core security properties: Spoofing violates Authenticity; Tampering violates Integrity; Repudiation violates Non-Repudiation; Information Disclosure violates Confidentiality; Denial of Service violates Availability; Elevation of Privilege violates Authorization.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your system architectures, enforce Mutual TLS (mTLS) with cryptographically verified X.509 certificates across all inter-service trust boundaries to eliminate Spoofing and Information Disclosure risks.
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
                <span>Threat Modeling asks: What are we building? What can go wrong? How do we fix it?</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>STRIDE: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Spoofing ➔ Authenticity; Tampering ➔ Integrity; Repudiation ➔ Non-Repudiation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Info Disclosure ➔ Confidentiality; DoS ➔ Availability; Elevation ➔ Authorization.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DREAD Formula: (Damage + Reproducibility + Exploitability + Users + Discoverability) / 5.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 mandates Privacy-by-Design and Threat Modeling for personal data.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Threat Modeling Methodologies FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; STRIDE/DREAD Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Threat Modeling Methodologies (STRIDE, DREAD) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Threat Modeling is the crown jewel of Secure Software Engineering. Always remember: you cannot secure what you do not understand! Deconstruct your software architectures using Data Flow Diagrams, identify trust boundaries, apply the STRIDE taxonomy to find every Authenticity, Integrity, Non-Repudiation, Confidentiality, Availability, and Authorization defect, and prioritize your DevSecOps backlog using quantitative DREAD scores to guarantee 100% compliance under ISO/IEC 27001 Control A.8.25 and the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
