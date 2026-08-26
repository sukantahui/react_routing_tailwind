import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: PPT Sliders State
  const [peopleScore, setPeopleScore] = useState(85);
  const [processScore, setProcessScore] = useState(85);
  const [techScore, setTechScore] = useState(85);

  // Studio 2: Dimension Dissector State
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("people");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ppt_diagnosis");

  // Mathematical Harmonic Mean Calculation
  const simulationResults = useMemo(() => {
    const p = Math.max(1, peopleScore);
    const pr = Math.max(1, processScore);
    const t = Math.max(1, techScore);

    const harmonicResilience = (3 / (1 / p + 1 / pr + 1 / t)).toFixed(1);
    const arithmeticMean = ((p + pr + t) / 3).toFixed(1);

    let status = "GOLDEN TRIANGLE EQUILIBRIUM";
    let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";
    let diagnosis =
      "Harmonic equilibrium achieved across People, Process, and Technology. Enterprise resilience is robust against advanced threats and compliant with the DPDP Act 2023.";

    const minScore = Math.min(p, pr, t);
    const maxScore = Math.max(p, pr, t);

    if (maxScore - minScore &ge; 35) {
      if (minScore === p) {
        status = "THE TECH-HEAVY PHISHING TRAP";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
        diagnosis =
          "High technology and process investment rendered ineffective because employees lack security awareness and fall for spear-phishing and credential harvesting.";
      } else if (minScore === pr) {
        status = "THE PROCESS SHELFWARE TRAP";
        badgeClass = "bg-amber-950 text-amber-300 border-amber-800";
        diagnosis =
          "Complex policy documentation exists on paper, but lack of operational process workflows and change control leads to ignored alerts and unmonitored bypasses.";
      } else {
        status = "THE OVERWHELMED BARE-HANDS TRAP";
        badgeClass = "bg-purple-950 text-purple-300 border-purple-800";
        diagnosis =
          "Vigilant employees and structured policies are overwhelmed by modern automated zero-day malware due to lack of automated EDR, SIEM, and microsegmentation.";
      }
    }

    return {
      harmonicResilience,
      arithmeticMean,
      status,
      badgeClass,
      diagnosis
    };
  }, [peopleScore, processScore, techScore]);

  // Presets Handler
  const applyPreset = (p, pr, t) => {
    setPeopleScore(p);
    setProcessScore(pr);
    setTechScore(t);
  };

  // Studio 2: Dimension Dissector Data
  const dimensionsData = {
    people: {
      key: "people",
      name: "1. The People Dimension (Human Element)",
      subtitle: "Culture, Awareness, Executive Leadership & Cyber Hygiene",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      threats: "Spear-phishing, social engineering, authority/urgency bias, insider threats, credential sharing.",
      controls: "Monthly simulated phishing drills, role-based developer training, background vetting, User & Entity Behavior Analytics (UEBA).",
      compliance: "DPDP Act 2023 Section 8(5) (Organizational Measures) & IT Act 2000 Section 43A (Operational Hygiene).",
      pillars: [
        { title: "Security Culture", desc: "Instilling instinctual cyber hygiene across 100% of staff." },
        { title: "Role-Based Training", desc: "Specialized secure coding for devs; privacy training for HR/Finance." },
        { title: "Executive Sponsorship", desc: "Board-level buy-in ensuring security is never bypassed for speed." },
        { title: "Human Firewall", desc: "Employees acting as proactive sensor nodes reporting threats in < 60s." }
      ]
    },
    process: {
      key: "process",
      name: "2. The Process Dimension (Operational Governance)",
      subtitle: "Policies, Standards, Change Control, JML & Incident Playbooks",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      threats: "Uncontrolled system changes, privilege creep, delayed incident reporting, lack of escalation playbooks.",
      controls: "ISO/IEC 27001 ISMS, Change Advisory Board (CAB), Joiner-Mover-Leaver (JML), Maker-Checker dual authorization, CERT-In 6-hour playbooks.",
      compliance: "ISO/IEC 27001:2022 Clauses 4-10, RBI Master Direction, CERT-In Section 70B.",
      pillars: [
        { title: "4-Tier Hierarchy", desc: "Policies (Why) ➔ Standards (Spec) ➔ Guidelines (Tips) ➔ Procedures (How)." },
        { title: "Change Management", desc: "Every patch tested in staging with documented 5-minute rollback plan." },
        { title: "JML Lifecycle", desc: "Automated de-provisioning of departing employee access in < 15 mins." },
        { title: "Maker-Checker", desc: "Dual authorization required for critical financial and firewall changes." }
      ]
    },
    technology: {
      key: "technology",
      name: "3. The Technology Dimension (Technical Safeguards)",
      subtitle: "Zero Trust mTLS, EDR/XDR, Next-Gen Firewalls, AES-256 & SIEM",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      threats: "Automated ransomware binaries, zero-day exploits, man-in-the-middle attacks, unencrypted database storage.",
      controls: "Zero Trust Network Access (ZTNA), EDR behavioral heuristics, FIPS 140-3 HSMs, AES-256-GCM encryption, SIEM/SOAR automated telemetry.",
      compliance: "DPDP Act Section 8(5) (Technical Safeguards) & NCIIPC Protected Systems Guidelines.",
      pillars: [
        { title: "Zero Trust mTLS", desc: "Never trust, always verify every single microservice and API call." },
        { title: "EDR/XDR Telemetry", desc: "Real-time kernel behavioral monitoring to block ransomware in memory." },
        { title: "FIPS 140-3 HSMs", desc: "Master cryptographic keys generated and stored in tamper-proof silicon." },
        { title: "Automated SOAR", desc: "Sub-15 minute threat isolation triggered without waiting for manual human review." }
      ]
    }
  };

  const activeDimension = dimensionsData[selectedDimensionKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ppt_diagnosis",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Diagnosing a Tech-Heavy / Process-Weak Incident",
      budget: "₹14,50,000",
      challenge: "AWS S3 Data Leak Occurred Despite ₹60 Lakh Next-Gen Firewall",
      dilemma:
        "A ₹45 Lakh AWS S3 customer data leak occurred despite deploying a top-tier firewall, because developers bypassed change management to test a feature on a public bucket.",
      resolution:
        "Mamata enforced automated CI/CD change management guardrails and Maker-Checker dual authorization, restoring PPT equilibrium and securing 500+ payment nodes.",
      metrics: {
        changeGatewaysAutomated: "100% CI/CD Enforced",
        dualAuthAdopted: "100% Maker-Checker Verification",
        leakExposurePurged: "Zero S3 Configuration Drifts",
        compliance: "ISO/IEC 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_radiology_ppt",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Balanced PPT Clinical Radiology Defense",
      budget: "₹8,20,000",
      challenge: "Doctor Workstations Exposing Radiology PACS to Ransomware",
      dilemma:
        "Hospital clinical imaging servers faced ransomware threats from unmonitored doctor workstations where staff opened external email attachments.",
      resolution:
        "Mahima deployed a balanced PPT triangle: AES-256 DICOM encryption (Tech), role-based JML SOPs (Process), and bi-weekly doctor anti-phishing hygiene training (People) under NABH and DPDP rules.",
      metrics: {
        doctorsTrained: "350+ Clinical Personnel",
        phishingFailRate: "Reduced from 28% to 1.8%",
        pacsEncrypted: "100% AES-256 DICOM Storage",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_ppt",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation OT PPT Equilibrium",
      budget: "₹12,80,000",
      challenge: "Engineers Sharing Administrative Passwords for Maintenance",
      dilemma:
        "Substation engineers were sharing administrative passwords to expedite 220kV transmission line maintenance, violating CEA cyber regulations.",
      resolution:
        "Debangshu deployed FIPS 140-3 hardware tokens (Tech), authored CEA-compliant switching SOPs (Process), and conducted mandatory high-voltage safety and cyber training (People).",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        credentialSharing: "0% (Eliminated via Hardware Tokens)",
        switchingAccuracy: "100.00% Error-Free Operations",
        compliance: "CEA & NCIIPC Protected Systems"
      }
    },
    {
      id: "jadavpur_harmonic_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "PPT Harmonic Balance Simulator Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Assuming Cybersecurity is 100% Technical Tooling",
      dilemma:
        "Students believed cybersecurity was solely about technical exploit coding, ignoring policies, change management, and human psychology.",
      resolution:
        "The team built an interactive PPT Triangle Harmonic Balance simulator, demonstrating how a low People score collapses enterprise resilience, training 180+ BCA cyber security students.",
      metrics: {
        studentsTrained: "180+ Cyber BCA Students",
        simulationsModeled: "100+ Failure Scenarios",
        harmonicMastery: "100% Lab & Exam Proficiency",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 5 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Three Dimensions of ISM: People, Process, and Technology
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the PPT Golden Triangle of enterprise cybersecurity: explore why technology alone fails without trained people and documented processes, 
            diagnose asymmetric failure modes, and calculate the Harmonic Mean of enterprise cyber resilience.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive PPT Triangle Harmonic Balance & Failure Mode Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📐</span> Studio 1: PPT Triangle Harmonic Balance &amp; Failure Mode Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust the 3 dimensions (People, Process, Technology) to calculate the enterprise Harmonic Resilience score and diagnose systemic failure modes.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-gray-400 self-center text-xs font-mono font-bold uppercase mr-1">Quick Presets:</span>
            <button
              onClick={() => applyPreset(20, 40, 95)}
              className="px-3 py-1.5 rounded-lg bg-gray-850 hover:bg-gray-800 text-rose-300 border border-rose-900/50 transition-colors"
            &gt;
              1. The Tech-Heavy Trap (P:20, Pr:40, T:95)
            </button>
            <button
              onClick={() => applyPreset(35, 95, 25)}
              className="px-3 py-1.5 rounded-lg bg-gray-850 hover:bg-gray-800 text-amber-300 border border-amber-900/50 transition-colors"
            &gt;
              2. The Process Shelfware Trap (P:35, Pr:95, T:25)
            </button>
            <button
              onClick={() => applyPreset(85, 85, 85)}
              className="px-3 py-1.5 rounded-lg bg-gray-850 hover:bg-gray-800 text-emerald-300 border border-emerald-900/50 transition-colors font-bold"
            &gt;
              3. Golden Equilibrium (P:85, Pr:85, T:85)
            </button>
          </div>

          {/* Interactive Sliders & Live Results Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", simulationResults.badgeClass)}>
                  Diagnostic State: {simulationResults.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Harmonic Enterprise Resilience: {simulationResults.harmonicResilience}%
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Arithmetic Average vs Harmonic</span>
                <span className="text-xs font-mono text-gray-300">Avg: {simulationResults.arithmeticMean}% ➔ Harmonic: <strong className="text-emerald-400">{simulationResults.harmonicResilience}%</strong></span>
              </div>
            </div>

            {/* 3 Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-indigo-400">1. People Dimension Score:</span>
                  <span className="text-white font-mono">{peopleScore} / 100</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={peopleScore}
                  onChange={(e) => setPeopleScore(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                /&gt;
                <p className="text-[10px] text-gray-400 font-sans">Culture, anti-phishing hygiene &amp; leadership buy-in.</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/40 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-cyan-400">2. Process Dimension Score:</span>
                  <span className="text-white font-mono">{processScore} / 100</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={processScore}
                  onChange={(e) => setProcessScore(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                /&gt;
                <p className="text-[10px] text-gray-400 font-sans">ISO 27001 policies, change control &amp; JML lifecycles.</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/40 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-400">3. Technology Dimension Score:</span>
                  <span className="text-white font-mono">{techScore} / 100</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={techScore}
                  onChange={(e) => setTechScore(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                /&gt;
                <p className="text-[10px] text-gray-400 font-sans">Zero Trust mTLS, EDR, SIEM &amp; AES-256 HSMs.</p>
              </div>
            </div>

            {/* Diagnostic Narrative Box */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">
                Architectural Failure Analysis &amp; Diagnostic Verdict:
              </span>
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{simulationResults.diagnosis}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Deep-Dive Dimension Dissector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔍</span> Studio 2: Deep-Dive Dimension Dissector
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 3 dimensions to dissect its core elements, key vulnerability vectors, essential controls, and Indian regulatory compliance mapping.
            </p>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(dimensionsData).map((dim) => {
              const isSelected = selectedDimensionKey === dim.key;
              return (
                <button
                  key={dim.key}
                  onClick={() => setSelectedDimensionKey(dim.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200">{dim.name.split(" (")[0]}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{dim.name.split(" (")[1]?.replace(")", "")}</div>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDimension.badgeClass)}>
                  Pillar: {activeDimension.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeDimension.subtitle}
                </h3>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {activeDimension.pillars.map((pil, idx) => (
                <div key={idx} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold block font-sans">{pil.title}</span>
                  <p className="text-gray-300 text-[11px] font-sans leading-relaxed">{pil.desc}</p>
                </div>
              ))}
            </div>

            {/* Threats vs Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Primary Threat Vectors:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeDimension.threats}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory Enterprise Controls:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeDimension.controls}</p>
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
              Visualizing the PPT Golden Triangle Equilibrium and the 4-Tier Governance Process Hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: PPT Equilibrium */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The PPT Golden Triangle Equilibrium
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Vertex 1: People */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">1. PEOPLE (Culture &amp; Skills)</text>
                    <text x="250" y="56" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">Anti-Phishing • Hygiene • Training</text>
                  </g>

                  {/* Connectors */}
                  <line x1="200" y1="65" x2="90" y2="120" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="300" y1="65" x2="410" y2="120" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="90" y1="165" x2="410" y2="165" stroke="#10b981" strokeWidth="1.5" />

                  {/* Vertex 2: Process */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="120" width="180" height="55" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="110" y="142" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. PROCESS (Governance)</text>
                    <text x="110" y="157" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">ISO 27001 • Change Control • JML</text>
                  </g>

                  {/* Vertex 3: Technology */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="300" y="120" width="180" height="55" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="390" y="142" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. TECHNOLOGY (Tooling)</text>
                    <text x="390" y="157" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">EDR • Zero Trust • AES-256 HSM</text>
                  </g>

                  {/* Central Harmonic Mean */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="90" y="210" width="320" height="50" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="232" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      HARMONIC MEAN RESILIENCE
                    </text>
                    <text x="250" y="248" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Resilience = 3 / (1/People + 1/Process + 1/Technology)
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Equilibrium across all 3 dimensions creates an unshakeable corporate defense.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The People, Process, and Technology harmonic equilibrium triangle.
              </p>
            </div>

            {/* Diagram 2: 4-Tier Governance Hierarchy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The 4-Tier Governance Process Hierarchy
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: Policies */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9">1. POLICIES (High-Level "WHY &amp; WHAT")</text>
                    <text x="250" y="54" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7">Board Approved • Mandatory Mandates</text>
                  </g>

                  <line x1="250" y1="60" x2="250" y2="80" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Tier 2: Standards */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="110" y="80" width="280" height="40" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="102" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">2. STANDARDS (Mandatory Technical Baselines)</text>
                    <text x="250" y="114" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">AES-256 • Passwords &ge; 16 chars • FIPS 140-3</text>
                  </g>

                  <line x1="250" y1="120" x2="250" y2="140" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Tier 3: Guidelines */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="140" width="360" height="40" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="162" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">3. GUIDELINES (Recommended Operational Best Practices)</text>
                    <text x="250" y="174" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Recommended FIDO2 Hardware Tokens &amp; Password Managers</text>
                  </g>

                  <line x1="250" y1="180" x2="250" y2="200" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Tier 4: Procedures / SOPs */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="200" width="440" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="222" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      4. PROCEDURES / SOPs (Step-by-Step Technical Execution)
                    </text>
                    <text x="250" y="238" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Detailed step-by-step Standard Operating Procedures for daily operational tasks.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Hierarchy flows from executive board policies down to operational technical procedures.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: The 4-Tier security governance documentation hierarchy (Policies, Standards, Guidelines, Procedures).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: PPT Governance Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads diagnose tech-heavy leaks in Kolkata, balance hospital radiology PPT in Ichapur, govern substation OT in Barrackpore, and simulate harmonic resilience in Jadavpur.
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
                  <span>⚡</span> Asymmetric PPT Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Harmonic PPT Solution
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
              Guidelines for enterprise security leads ensuring harmonic equilibrium across People, Process, and Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> PPT Equilibrium Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Measure Harmonic Resilience:</strong> Always identify and invest in your weakest dimension.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate Change Management:</strong> Integrate automated security guardrails into CI/CD pipelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Maker-Checker Dual Auth:</strong> Require two independent signoffs for wire transfers and firewall edits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate JML Identity Lifecycle:</strong> De-provision departing employee credentials in &lt; 15 mins.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common PPT Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Tool-Centric Illusion:</strong> Believing that buying a ₹1 Crore firewall makes you safe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Shelfware Policy Trap:</strong> 300-page policy manuals that staff ignore and bypass.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting DPDP Section 8(5):</strong> Failure to implement both technical and organizational controls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Alert Fatigue in SOC:</strong> Deploying SIEM without documented triage playbooks causes missed breaches.</span>
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
                  <span><strong>Deploy Zero Trust Architecture:</strong> Enforce mutual TLS (mTLS) across all east-west microservices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Run Monthly Phishing Drills:</strong> Train employees to recognize psychological urgency and authority bias.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy UEBA Anomaly Telemetry:</strong> Detect compromised credentials via baseline behavioral deviations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Sync with Indian NTP Servers:</strong> Comply with CERT-In mandatory log synchronization rules.</span>
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
              Synthesize the PPT Golden Triangle and governance hierarchy before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Security Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the Harmonic Mean is the true measure of cybersecurity: If an enterprise spends ₹50 Lakhs on top-tier Technology (95/100) and writes detailed Processes (90/100), but ignores People (10/100), a single spear-phishing email can trick an employee into entering an OTP on a fake website, collapsing the entire multi-crore defense in seconds ($H \approx 26\%$).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The difference between Policies and Procedures in the 4-Tier Governance hierarchy: Policies define the mandatory executive directives ("WHAT &amp; WHY", e.g. Passwords must be secure), whereas Standard Operating Procedures (SOPs) provide the exact, repeatable step-by-step instructions ("HOW", e.g. Steps 1-6 to configure Okta MFA).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your cybersecurity program designs, ensure you balance your budget equally across human awareness training (People), documented change control playbooks (Process), and automated Zero Trust tooling (Technology) to satisfy Section 8(5) of the Indian DPDP Act 2023.
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
                <span>PPT Golden Triangle: People (Culture), Process (Governance), Technology (Tooling).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Enterprise resilience is mathematically constrained by the weakest dimension.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4-Tier Hierarchy: Policies (Why) ➔ Standards (Spec) ➔ Guidelines ➔ Procedures (How).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8(5) mandates both Technical AND Organizational measures.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>JML (Joiner-Mover-Leaver) and Maker-Checker are vital process safeguards.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 43A defines reasonable security across managerial &amp; technical domains.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="The Three Dimensions of ISM: People, Process, and Technology FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; PPT Triangle Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="The Three Dimensions of ISM: People, Process, and Technology (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Always remember that cybersecurity is a three-legged stool: People, Process, and Technology (PPT). If any one leg is weak, the entire defense collapses! Never fall into the trap of believing that buying expensive software solves all security problems. Train your people against psychological social engineering, document your change management and incident response processes, deploy Zero Trust encryption and EDR technology, and ensure full compliance with Section 8(5) of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
