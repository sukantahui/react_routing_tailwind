import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Tripartite Control Pillar State
  const [selectedPillarKey, setSelectedPillarKey] = useState("technical_pillar");

  // Studio 2: Breach Simulator State
  const [selectedThreatVector, setSelectedThreatVector] = useState("phishing_vector");
  const [activeLayers, setActiveLayers] = useState({
    technical: true,
    administrative: true,
    physical: true
  });

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_tripartite_switch");

  // Studio 1: Tripartite Control Pillars Data
  const controlPillars = {
    technical_pillar: {
      key: "technical_pillar",
      name: "1. Technical (Logical) Controls",
      domain: "Automated Software & Hardware Algorithms",
      functions: "#Preventive, #Detective, #Corrective",
      mechanisms:
        "AES-256-GCM encryption at rest, RSA-4096 / ECC keys in Cloud HSMs, FIDO2 WebAuthn Hardware MFA, PostgreSQL Dynamic Data Masking (A.8.11), Next-Gen Web Application Firewalls (WAF), Endpoint DLP filters (A.8.12), and Zero Trust micro-segmentation.",
      breachIfMissing:
        "Direct SQL injection data exfiltration, ransomware spreading laterally across unsegmented VPCs, and unencrypted database backups leaking online.",
      statuteSafeHarbor: "Satisfies DPDP Act 2023 Section 8(5) Technical Safeguards (₹250 Cr Fine Shield) & IT Act Section 43A",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    administrative_pillar: {
      key: "administrative_pillar",
      name: "2. Administrative (Managerial) Controls",
      domain: "Human Behavior, Policies & Governance Workflow",
      functions: "#Preventive, #Deterrent, #Corrective",
      mechanisms:
        "Board-signed Information Security Policies (A.5.1), Joiner-Mover-Leaver (JML) automated account de-provisioning (< 15 mins), monthly unannounced simulated phishing campaigns (A.6.3), Pre-employment background screening (A.6.1), Maker-Checker dual authorization (A.5.3), and Vendor Risk Management (A.5.19).",
      breachIfMissing:
        "Employees falling for executive spear-phishing (BEC), departed staff retaining VPN and AWS root access, and rogue engineers pushing unreviewed code to production.",
      statuteSafeHarbor: "Satisfies IT Act 2000 Section 85 Executive Due Diligence & DPDP Act DPO Governance Mandates",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    physical_pillar: {
      key: "physical_pillar",
      name: "3. Physical (Environmental) Controls",
      domain: "Tangible Facilities, Hardware & Media Sanitization",
      functions: "#Preventive, #Detective, #Deterrent",
      mechanisms:
        "Biometric fingerprint + RFID badge mantrap airlocks for server rooms (A.7.1-A.7.3), 24/7 AI-monitored CCTV with 90-day DVR archives (A.7.4), Clean Desk and Clean Screen policies (A.7.7), FM-200 gas fire suppression, dual redundant UPS generators, and NIST SP 800-88 physical hard drive shredding (< 2mm fragments).",
      breachIfMissing:
        "Physical theft of unencrypted database hard drives, unauthorized visitors plugging malicious Rubber Ducky USBs into unlocked laptops, and server room fire destruction.",
      statuteSafeHarbor: "Satisfies NCIIPC Protected Systems Physical Charter under IT Act Section 70",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  const activePillar = controlPillars[selectedPillarKey];

  // Studio 2: Threat Vectors Data
  const threatVectors = {
    phishing_vector: {
      key: "phishing_vector",
      title: "1. Executive Spear-Phishing & Credential Theft",
      description: "Adversary targets finance staff with an AI-generated invoice phishing email to harvest Office 365 credentials.",
      techRole: "FIDO2 Hardware MFA blocks login even if password is stolen; DLP blocks financial data export.",
      adminRole: "Monthly phishing awareness training trains user to spot spoofed domain; Maker-Checker blocks unauthorized transfer.",
      physRole: "Physical smartcard token required to sign high-value wire transfers."
    },
    physical_theft_vector: {
      key: "physical_theft_vector",
      title: "2. Server Room Break-in & Hard Drive Theft",
      description: "Rogue contractor attempts to physically enter the secondary data center to steal backup hard drives.",
      techRole: "AES-256-GCM full disk encryption renders stolen magnetic drive completely unreadable without HSM key.",
      adminRole: "Pre-employment screening (A.6.1) and visitor escort policy prevents unmonitored contractor entry.",
      physRole: "Biometric mantrap airlock and 24/7 AI CCTV alarms detect unauthorized physical entry immediately."
    },
    sqli_vector: {
      key: "sqli_vector",
      title: "3. Zero-Day SQL Injection on Payment Portal",
      description: "Cybercrime syndicate exploits an unauthenticated SQLi vulnerability on the public web payment gateway.",
      techRole: "WAF blocks SQLi payload; PostgreSQL Dynamic Data Masking (DDM) obscures Aadhaar/PAN fields.",
      adminRole: "Secure coding policy (A.8.28) and mandatory pre-merge SAST scans prevent vulnerable code deployment.",
      physRole: "Air-gapped database subnet prevents direct lateral bridge from web DMZ."
    }
  };

  const activeThreat = threatVectors[selectedThreatVector];

  // Studio 2: Breach Efficacy Calculation
  const breachSimulation = useMemo(() => {
    let score = 0;
    if (activeLayers.technical) score += 40;
    if (activeLayers.administrative) score += 35;
    if (activeLayers.physical) score += 25;

    let fineExposure = "₹0 (100% Statutory Safe Harbor)";
    let verdict = "BREACH TOTALLY PREVENTED";
    let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";

    if (score < 100) {
      if (score >= 60) {
        fineExposure = "₹25 Crores (Partial Negligence Liability)";
        verdict = "PARTIAL DEFENSE (High Incident Risk)";
        badgeClass = "bg-amber-950 text-amber-300 border-amber-800";
      } else {
        fineExposure = "₹250 Crores (Maximum DPDP Section 33 Fine)";
        verdict = "CATASTROPHIC BREACH OCCURRED";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
      }
    }

    return { score, fineExposure, verdict, badgeClass };
  }, [activeLayers]);

  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_tripartite_switch",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Tripartite Defense for 500 Payment Microservices",
      budget: "₹18,50,000",
      challenge: "UPI Payment Switch Vulnerable to Phishing and Misconfigurations",
      dilemma:
        "A 500-node payment switch handling ₹120 Crores daily was vulnerable to insider credential leaks and cloud misconfigurations without a unified defense.",
      resolution:
        "Mamata deployed layered Technical controls (AES-256, WAF, DLP, FIDO2) and Administrative policies (Maker-Checker deployment rules), achieving 100% ISO 27001 compliance and securing ₹45 Cr contracts.",
      metrics: {
        defenseEfficacy: "100% Defense-in-Depth",
        dpdpLiabilityAverted: "₹250 Crores Protected",
        mfaAdoption: "100% FIDO2 Hardware Tokens",
        compliance: "ISO 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_healthcare_tripartite",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Tripartite Oncology Safeguards",
      budget: "₹8,20,000",
      challenge: "Clinical Network Risked Diagnostic Scan Leaks during Emergencies",
      dilemma:
        "Hospital clinical care network risked cancer patient diagnostic scan leakage during emergency admissions due to unencrypted PACS viewing stations.",
      resolution:
        "Mahima deployed Physical smartcard locks, Administrative consent workflows, and Technical PostgreSQL Dynamic Data Masking (A.8.11) across 80,000 oncology records under NABH and DPDP Act guidelines.",
      metrics: {
        recordsGoverned: "80,000 Oncology Records",
        tripartiteLayers: "3/3 Layers Active",
        pacsMasking: "100% Field-Level Masking",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_tripartite",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Tripartite Hardening",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Physical Perimeters & Legacy SCADA Isolation",
      dilemma:
        "18 high-voltage 220kV transmission substations required physical perimeter security and legacy SCADA isolation to prevent state-wide power grid cyber blackout attacks.",
      resolution:
        "Debangshu hardened substations with Physical mantrap perimeters (A.7.1), Administrative Maker-Checker switching protocols (A.5.3), and Technical SCADA micro-segmentation under IT Act Section 70.",
      metrics: {
        substationsHardened: "18 High-Voltage Sites",
        physicalMantraps: "100% Biometric Secured",
        compensatingControls: "Active Air-Gap & Bastion Recording",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_tripartite_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Tripartite Control Simulator & Breach Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand Compensating Controls in OT",
      dilemma:
        "Cybersecurity students struggled to understand how compensating controls protect legacy industrial hardware and how Defense-in-Depth prevents catastrophic single-point failures.",
      resolution:
        "The team developed an interactive Tripartite Control Simulator and Defense-in-Depth Breach Simulator in React, training 215+ BCA cyber security students on designing layered enterprise architectures.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        breachSimulationsRun: "120+ Attack Scenarios",
        examMastery: "100% Tripartite Control Mastery",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 5 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Implementing Technical, Administrative, and Physical Controls
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Construct an impenetrable Defense-in-Depth architecture: master the tripartite security control pillars (Technical, Administrative, Physical), 
            deploy functional control mechanisms (Preventive, Detective, Corrective, Compensating), and secure statutory Safe Harbor under Section 43A of the Indian IT Act and the DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Tripartite Control Matrix & Defense-in-Depth Layer Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 1: Tripartite Control Matrix &amp; Pillar Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a control pillar to inspect its operational domain, primary functional types, technical mechanisms, catastrophic breach impact if missing, and statutory safe harbor value.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(controlPillars).map((pillar) => {
              const isSelected = selectedPillarKey === pillar.key;
              return (
                <button
                  key={pillar.key}
                  onClick={() => setSelectedPillarKey(pillar.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{pillar.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{pillar.domain}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePillar.badgeClass)}>
                  {activePillar.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Domain: {activePillar.domain}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Functional Types</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activePillar.functions}</span>
              </div>
            </div>

            {/* Mechanisms & Breach Risk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core Operational Mechanisms:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activePillar.mechanisms}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Catastrophic Breach Impact if Missing:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed">{activePillar.breachIfMissing}</p>
              </div>
            </div>

            {/* Statutory Safe Harbor */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Statutory Indian Safe Harbor Alignment:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activePillar.statuteSafeHarbor}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Layered Breach Simulation & Defense-in-Depth Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 2: Multi-Layered Breach Simulation &amp; Defense-in-Depth Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an adversary threat vector and toggle the 3 tripartite defensive layers to evaluate Defense Efficacy %, breach prevention outcome, and statutory fine exposure under the DPDP Act 2023.
            </p>
          </div>

          {/* Threat Vector Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(threatVectors).map((tv) => {
              const isSelected = selectedThreatVector === tv.key;
              return (
                <button
                  key={tv.key}
                  onClick={() => setSelectedThreatVector(tv.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tv.title}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-1">{tv.description}</div>
                </button>
              );
            })}
          </div>

          {/* Breach Simulator Dashboard */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            {/* Efficacy & Fine Exposure Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", breachSimulation.badgeClass)}>
                  {breachSimulation.verdict}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Defense Efficacy: {breachSimulation.score}% (Layered Resilience)
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">DPDP Statutory Fine Exposure</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-400 font-mono">{breachSimulation.fineExposure}</span>
              </div>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-mono">
                Toggle Active Tripartite Control Layers:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label
                  onClick={() => toggleLayer("technical")}
                  className={clsx(
                    "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                    activeLayers.technical ? "bg-gray-900 border-indigo-500" : "bg-gray-950 border-gray-800 opacity-60"
                  )}
                >
                  <input type="checkbox" checked={activeLayers.technical} readOnly className="w-4 h-4 accent-indigo-500 rounded" />
                  <div>
                    <span className="font-bold text-gray-200 block">1. Technical Layer (40%)</span>
                    <span className="text-[11px] text-gray-400">{activeThreat.techRole}</span>
                  </div>
                </label>

                <label
                  onClick={() => toggleLayer("administrative")}
                  className={clsx(
                    "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                    activeLayers.administrative ? "bg-gray-900 border-blue-500" : "bg-gray-950 border-gray-800 opacity-60"
                  )}
                >
                  <input type="checkbox" checked={activeLayers.administrative} readOnly className="w-4 h-4 accent-blue-500 rounded" />
                  <div>
                    <span className="font-bold text-gray-200 block">2. Administrative Layer (35%)</span>
                    <span className="text-[11px] text-gray-400">{activeThreat.adminRole}</span>
                  </div>
                </label>

                <label
                  onClick={() => toggleLayer("physical")}
                  className={clsx(
                    "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors",
                    activeLayers.physical ? "bg-gray-900 border-amber-500" : "bg-gray-950 border-gray-800 opacity-60"
                  )}
                >
                  <input type="checkbox" checked={activeLayers.physical} readOnly className="w-4 h-4 accent-amber-500 rounded" />
                  <div>
                    <span className="font-bold text-gray-200 block">3. Physical Layer (25%)</span>
                    <span className="text-[11px] text-gray-400">{activeThreat.physRole}</span>
                  </div>
                </label>
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
              Visualizing the Onion Ring Defense-in-Depth Architecture and the Functional Control Classification Taxonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Onion Ring Defense-in-Depth */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Onion Ring Defense-in-Depth Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Layer 1: Physical (Outer) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="160" r="140" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="250" y="38" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">LAYER 1: PHYSICAL (Mantraps, AI CCTV, Perimeter)</text>
                  </g>

                  {/* Layer 2: Administrative (Middle) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="160" r="100" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="80" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">LAYER 2: ADMINISTRATIVE (Policies, JML, Training)</text>
                  </g>

                  {/* Layer 3: Technical (Inner) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="160" r="60" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="125" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">LAYER 3: TECHNICAL</text>
                  </g>

                  {/* Central Core: Data Vault */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="160" r="28" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="250" y="157" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">DATA</text>
                    <text x="250" y="169" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6.5">AES-256</text>
                  </g>

                  <text x="250" y="305" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Layered concentric defenses eliminate single points of failure across all vectors.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The concentric Onion Ring Defense-in-Depth model protecting data assets.
              </p>
            </div>

            {/* Diagram 2: Functional Classification */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Functional Control Classification Taxonomy
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Category 1: Preventive */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="130" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">PREVENTIVE CONTROLS</text>
                    <text x="130" y="60" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">MFA • Encryption • Locked Doors</text>
                  </g>

                  {/* Category 2: Detective */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="50" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="370" y="45" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">DETECTIVE CONTROLS</text>
                    <text x="370" y="60" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="7">SIEM Logs • AI CCTV • IDS/IPS</text>
                  </g>

                  {/* Category 3: Corrective */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="95" width="210" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="130" y="115" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">CORRECTIVE CONTROLS</text>
                    <text x="130" y="130" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7">DR Failover • 5-Whys CAPA • Patch</text>
                  </g>

                  {/* Category 4: Compensating */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="95" width="210" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="370" y="115" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">COMPENSATING CONTROLS</text>
                    <text x="370" y="130" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="7">SCADA Air-Gaps • Bastion Jump Hosts</text>
                  </g>

                  {/* Bottom Box: Deterrent */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="170" width="450" height="55" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="192" fill="#c084fc" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      DETERRENT SAFEGUARDS &amp; STATUTORY PENALTY WARNINGS
                    </text>
                    <text x="250" y="210" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      IT Act Section 43/70 statutory login banners and visible security guards discourage attacks.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Comprehensive classification ensures every lifecycle phase of a threat is countered.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: The functional timing and operational purpose taxonomy of security controls.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Tripartite Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads harden payment switches in Kolkata, deploy healthcare safeguards in Ichapur, secure power substations in Barrackpore, and simulate breach defense in Jadavpur.
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
                  <span>⚡</span> Tripartite Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Tripartite Solution
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
              Guidelines for CISOs and Lead Implementers balancing Technical, Administrative, and Physical controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Tripartite Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Layer All 3 Pillars:</strong> Never deploy software firewalls without human training and physical locks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Maker-Checker (A.5.3):</strong> Require dual authorization for all production code and payments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Compensating Controls for OT:</strong> Air-gap and record Bastion sessions for older SCADA devices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>NIST SP 800-88 Media Shredding:</strong> Physically shred decommissioned hard drives to &lt; 2mm.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Control Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Software-Only Fallacy:</strong> Spending millions on software while leaving physical server doors unlocked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Paper Policy Syndrome:</strong> Writing elaborate security binders that employees never execute.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Single Point of Failure:</strong> Assuming one defensive layer can stop an advanced persistent threat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Improper Media Disposal:</strong> Simply formatting hard drives instead of cryptographic/physical destruction.</span>
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
                  <span><strong>Deploy Dynamic Data Masking:</strong> Obscure customer Aadhaar/PAN fields in PostgreSQL for support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Hardware FIDO2 MFA:</strong> Require physical security keys for all cloud console logins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate JML Offboarding:</strong> Revoke departing staff access across all SSO/VPN in &lt; 15 mins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Clean Desk (A.7.7):</strong> Mandate Win+L workstation locking and lock paper files in drawers.</span>
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
              Synthesize tripartite control mechanics and Defense-in-Depth layers before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Defense-in-Depth Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Defense-in-Depth requires all three control pillars: Even if you implement military-grade AES-256 encryption, an attacker who steals an employee's password via phishing (Administrative gap) or steals an unattended backup drive from an unlocked office (Physical gap) can compromise your systems with zero cryptographic effort.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How compensating controls bridge the legacy gap: Older industrial devices (like substation SCADA RTUs or legacy medical MRI scanners) cannot support modern MFA or software agents. Documenting compensating controls (like network air-gapping, session recording, and Bastion jump hosts) in the Statement of Applicability maintains full ISO 27001 audit compliance without risking hardware crashes.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise designs, combine Administrative Maker-Checker policies with Technical Dynamic Data Masking (A.8.11) and Physical biometric mantraps to create an unassailable Safe Harbor defense under Section 43A of the Indian Information Technology Act 2000.
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
                <span>Tripartite Model: Technical (Logical), Administrative, and Physical controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Technical Controls: AES-256 Encryption, FIDO2 MFA, Masking, DLP, WAF.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Administrative Controls: Security Policies, JML Offboarding, SETA Drills.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Physical Controls: Biometric Mantraps, AI CCTV, Clean Desk, NIST Media Shredding.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Functional Types: Preventive, Detective, Corrective, Compensating, Deterrent.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Tripartite controls establish Reasonable Security Practices under IT Act Sec 43A.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Implementing Technical, Administrative, and Physical Controls FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Tripartite Control Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Implementing Technical, Administrative, and Physical Controls (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Defense-in-Depth requires the harmonious implementation of all three control pillars: Technical, Administrative, and Physical. Remember that the strongest technical encryption is useless if an untrained employee falls for a phishing email, and the most rigorous policy binder is useless if physical server rooms are left unlocked. Master the functional categories (Preventive, Detective, Corrective, Compensating, Deterrent) and deploy balanced controls to guarantee both unbroken cyber resilience and statutory Safe Harbor under Section 43A of the Indian Information Technology Act 2000!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
