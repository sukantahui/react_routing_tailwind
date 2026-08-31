import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: CIA Trade-Off Sliders State
  const [confidentialityWeight, setConfidentialityWeight] = useState(4); // 1-5 scale
  const [integrityWeight, setIntegrityWeight] = useState(4);             // 1-5 scale
  const [availabilityWeight, setAvailabilityWeight] = useState(4);          // 1-5 scale

  // Studio 2: Domain Archetype Preset State
  const [selectedDomainKey, setSelectedDomainKey] = useState("fintech");

  // Studio 3: Local Real-World Scenario Tab State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech");

  // Industry Domain Presets Data
  const domainPresets = {
    fintech: {
      key: "fintech",
      name: "Core Banking & UPI Payment Switch",
      primaryFocus: "Integrity & Confidentiality (Fail-Closed)",
      sacrificedPillar: "Availability (Accepts Temporary Backoff)",
      recommendedWeights: { c: 5, i: 5, a: 3 },
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      description:
        "In financial ledger processing, double-spending or unauthorized account balance modification is catastrophic. The system must deliberately decline or queue a transaction (sacrificing momentary Availability) rather than process a corrupted ledger write.",
      architecturePattern: "ACID Transactions, Hardware Security Modules (HSMs), 2-Phase Commit & Tokenization.",
      fatalMisconfiguration: "Adopting an async BASE model that accidentally creates duplicate credits of ₹50 Lakhs during network desynchronization."
    },
    healthcare: {
      key: "healthcare",
      name: "Emergency ICU & Trauma Life Support",
      primaryFocus: "Availability & Patient Safety (Fail-Open)",
      sacrificedPillar: "Strict Instantaneous Confidentiality",
      recommendedWeights: { c: 2, i: 4, a: 5 },
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      description:
        "During cardiac resuscitations or critical respiratory drops, smart defibrillators and infusion pumps cannot block doctors with multi-factor authentication or network latency. Systems implement 'Break-Glass' emergency access protocols with retroactive immutable audit trails.",
      architecturePattern: "Fail-Open Emergency Bypass, Local Autonomous Firmware & S3 WORM Audit Logging.",
      fatalMisconfiguration: "Enforcing a 3-factor biometric login that locks out an attending physician during a 30-second window of cardiac arrest."
    },
    military: {
      key: "military",
      name: "Defense & Classified Intelligence",
      primaryFocus: "Confidentiality & National Sovereignty",
      sacrificedPillar: "Availability & Public Usability",
      recommendedWeights: { c: 5, i: 4, a: 2 },
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      description:
        "Classified state secrets strictly enforce the Bell-LaPadula model ('No Read Up, No Write Down'). Hardware cryptographic keys self-destruct upon physical casing tampering even if it renders the tactical data permanently unavailable to friendly forces.",
      architecturePattern: "Bell-LaPadula Formal Model, Physical Air-Gapping & Zero-Knowledge Enclaves.",
      fatalMisconfiguration: "Enabling remote cloud backups over public internet to improve field operative file access, leading to state-sponsored exfiltration."
    },
    streaming: {
      key: "streaming",
      name: "Global Video Streaming & Social Media",
      primaryFocus: "Availability & Ultra-Low Latency",
      sacrificedPillar: "Instantaneous Data Integrity",
      recommendedWeights: { c: 2, i: 2, a: 5 },
      color: "from-blue-500 to-cyan-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      description:
        "4K 60fps video playback on 50 million concurrent streams cannot stall for cryptographic integrity verification. Recommendation algorithms and view counts use the BASE eventual consistency model across global edge CDN nodes.",
      architecturePattern: "BASE Model, BGP Anycast Edge Caching, Asynchronous Queue Workers.",
      fatalMisconfiguration: "Placing pessimistic database row locks on view-counter increments, causing global video playback buffering crashes."
    },
    scada: {
      key: "scada",
      name: "Industrial 220kV SCADA Power Grid",
      primaryFocus: "Integrity & Sub-Cycle Real-Time Speed",
      sacrificedPillar: "Heavy Asymmetric Public-Key Crypto",
      recommendedWeights: { c: 2, i: 5, a: 5 },
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      description:
        "Protective electrical relays must trip high-voltage circuit breakers within 16 milliseconds of a short circuit. They cannot afford 100ms RSA-4096 signature calculation delays. Engineers utilize ultra-fast HMAC-SHA256 nonces and optical data diodes.",
      architecturePattern: "IEC 62351 Cryptographic Nonces, Optical Isolation Diodes & Micro-segmented OT LAN.",
      fatalMisconfiguration: "Injecting heavy 4096-bit RSA asymmetric handshakes that delay protective breaker tripping, causing physical transformer fires."
    }
  };

  const activeDomain = domainPresets[selectedDomainKey];

  // Dynamic calculations for Studio 1 Sliders
  const sliderMetrics = useMemo(() => {
    const totalScore = confidentialityWeight + integrityWeight + availabilityWeight;

    // Latency Calculation: High C + High I adds cryptographic & consensus latency
    const baseLatency = 5;
    const cryptoLatency = confidentialityWeight * 8.5; // Up to ~42ms
    const consensusLatency = integrityWeight * 12.0;    // Up to ~60ms
    const availOptimization = (5 - availabilityWeight) * 6.0; // Lower A means less aggressive caching
    const calculatedLatency = Math.round(baseLatency + cryptoLatency + consensusLatency + availOptimization);

    // Monthly Infrastructure & Security Cost in Indian Rupees (₹)
    const baseInfraINR = 45000;
    const hsmCryptoCost = Math.pow(confidentialityWeight, 2.3) * 12000;
    const multiRegionConsensusCost = Math.pow(integrityWeight, 2.2) * 16000;
    const multiRegionAnycastCost = Math.pow(availabilityWeight, 2.5) * 18000;
    const totalCostINR = Math.round(baseInfraINR + hsmCryptoCost + multiRegionConsensusCost + multiRegionAnycastCost);

    // Format into Lakhs or Crores
    const formatINR = (val) => {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Crores / mo`;
      } else if (val >= 100000) {
        return `₹${(val / 100000).toFixed(2)} Lakhs / mo`;
      } else {
        return `₹${val.toLocaleString("en-IN")} / mo`;
      }
    };

    // User Friction & Shadow IT Risk Index
    const frictionScore = Math.min(100, Math.round(confidentialityWeight * 14 + integrityWeight * 8 - availabilityWeight * 6));
    const shadowItRisk = frictionScore > 65 ? "High (Likely User Circumvention)" : frictionScore > 40 ? "Moderate" : "Low (Frictionless)";

    // Identify Archetype
    let archetype = "Balanced General Enterprise (Standard N-Tier)";
    if (confidentialityWeight >= 4 && integrityWeight >= 4 && availabilityWeight <= 3) {
      archetype = "Core FinTech & Banking (ACID / Fail-Closed)";
    } else if (availabilityWeight >= 4 && integrityWeight <= 3 && confidentialityWeight <= 3) {
      archetype = "High-Scale Edge Streaming / CDN (BASE / Eventual Consistency)";
    } else if (availabilityWeight === 5 && confidentialityWeight <= 2) {
      archetype = "Life-Critical Emergency Medical (Fail-Open / Break-Glass)";
    } else if (confidentialityWeight === 5 && availabilityWeight <= 2) {
      archetype = "Military / Air-Gapped Intelligence (Bell-LaPadula)";
    } else if (integrityWeight === 5 && availabilityWeight >= 4 && confidentialityWeight <= 3) {
      archetype = "Industrial SCADA & Substation Grid (IEC 62351 Real-Time)";
    }

    return {
      calculatedLatencyMs: `${calculatedLatency} ms`,
      totalCostFormatted: formatINR(totalCostINR),
      totalCostRaw: totalCostINR,
      frictionScore: `${frictionScore} / 100`,
      shadowItRisk,
      archetype,
      totalScore
    };
  }, [confidentialityWeight, integrityWeight, availabilityWeight]);

  // Real-World Local Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_fintech",
      lead: "Mamata",
      role: "Chief FinTech Cloud Architect",
      location: "Kolkata FinTech Valley",
      title: "Real-Time Core UPI Ledger Switch",
      budget: "₹8,50,000",
      pillarsFocus: "Integrity (100%) & Confidentiality (95%)",
      sacrificedPillar: "Instantaneous Burst Availability",
      dilemma:
        "During festive sales, merchant microservices generated 18,000 transactions per second. Enforcing synchronous 2-Phase Commit across all database shards caused a 400ms queue backlog, causing payment gateways to throw 503 Service Unavailable errors on 1.2% of burst requests.",
      badProposal:
        "Product managers requested converting financial account balance updates to asynchronous non-locking writes to reach 100% Availability.",
      architecturalRemedy:
        "Mamata strictly rejected non-locking financial writes (which would allow double-spending). Instead, she deployed Redis Enterprise memory-tier reservation locks with PCIe HSM hardware acceleration, ensuring that transactions either commit with 100% ACID integrity in under 28ms or fail cleanly without balance corruption.",
      metrics: {
        latency: "28 ms",
        doubleSpendIncidents: "0 Anomalies",
        ledgerIntegrity: "100% ACID Strict",
        compliance: "RBI Master Direction & PCI-DSS 4.0"
      }
    },
    {
      id: "ichapur_icu",
      lead: "Mahima",
      role: "Lead Medical IT Security Officer",
      location: "Ichapur General Hospital",
      title: "ICU Trauma Bay 'Break-Glass' Override",
      budget: "₹4,80,000",
      pillarsFocus: "Availability (100%) & Patient Safety",
      sacrificedPillar: "Strict Real-Time Authentication Barrier",
      dilemma:
        "During emergency cardiac arrest resuscitations ('Code Blue'), doctors had to spend 45 seconds authenticating with smart cards and biometric scanners to adjust dosage rates on smart defibrillators and epinephrine infusion pumps (fatal Availability bottleneck).",
      badProposal:
        "Junior IT proposed removing all authentication and passwords from ICU terminals permanently, exposing patient prescription records to visitors and hospital guests.",
      architecturalRemedy:
        "Mahima engineered a physical 'Break-Glass' emergency override button on medical terminals. Pressing the button instantly grants full drug administration access without credentials, while triggering an automated high-priority video audit tag and streaming cryptographic event logs to write-once (WORM) storage for post-incident medical review.",
      metrics: {
        overrideDelay: "0.0 Seconds",
        auditAccuracy: "100% Immutable WORM",
        tamperingDetected: "0 Incidents",
        compliance: "NABH & ISO 27799 Emergency Standard"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "Principal OT Grid Engineer",
      location: "Barrackpore 220kV Substation Grid",
      title: "Sub-Cycle Protective Relay Switchgear",
      budget: "₹6,20,000",
      pillarsFocus: "Integrity (100%) & Deterministic Real-Time Availability",
      sacrificedPillar: "Heavy Asymmetric Public-Key Crypto",
      dilemma:
        "High-voltage electrical transmission short circuits require protective relays to trip breakers in under 16 milliseconds to prevent physical transformer explosions. Running 4096-bit RSA asymmetric digital signatures on incoming commands took 70ms, exceeding the physical physics deadline.",
      badProposal:
        "Operations suggested removing cryptographic authentication entirely and relying on cleartext DNP3 serial commands.",
      architecturalRemedy:
        "Debangshu implemented IEC 62351-6 authentication using pre-shared symmetric HMAC-SHA256 cryptographic nonces taking only 0.4ms to compute. He placed optical data diodes between the SCADA LAN and corporate IT, ensuring sub-cycle trip speeds with 100% anti-replay integrity.",
      metrics: {
        tripCalculationTime: "0.4 ms (< 16ms limit)",
        replayResistance: "100% Cryptographic Nonce",
        gridUptime: "99.999% Availability",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_hpc",
      lead: "Abhronila & Susmita",
      role: "High-Performance Computing Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Oncology Genomic Dataset Anonymization",
      budget: "₹3,90,000",
      pillarsFocus: "Confidentiality & Mathematical Utility Balance",
      sacrificedPillar: "Raw Granular Micro-Data Integrity",
      dilemma:
        "Training an AI oncology model required sharing 10 TB of patient DNA cancer records across research universities. Applying extreme k-anonymity (k=50) scrubbed out rare genetic outlier mutations, dropping the AI diagnostic detection accuracy from 96% to 78%.",
      badProposal:
        "Sharing raw, un-anonymized genomic data over private SFTP links, violating India's DPDP Act 2023 with potential fines up to ₹250 Crores.",
      architecturalRemedy:
        "The team designed a Differential Privacy pipeline with calibrated Laplace noise (Epsilon = 1.2). The mathematical transformation mathematically guarantees individual patient non-identifiability while preserving global statistical regression patterns, achieving 94.8% AI diagnostic fidelity.",
      metrics: {
        aiDiagnosticAccuracy: "94.8%",
        reIdentificationRisk: "< 0.001%",
        datasetProcessingTime: "18 Minutes",
        compliance: "DPDP Act 2023 & ICMR Ethical Guidelines"
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
            Cyber Security Module 002_001 • Topic 10 of 11
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Evaluating CIA Trade-offs in Real-World Systems
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Security engineering is the art of strategic compromise. Discover why no system can achieve 100% Confidentiality, 
            Integrity, and Availability simultaneously, and master formal trade-off frameworks (CAP Theorem, PACELC, 
            Bell-LaPadula, Biba, and Break-Glass protocols) across FinTech, Healthcare, SCADA, and Military domains.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive CIA Trade-Off Matrix & Dynamic Spider Lab */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎛</span> Studio 1: Interactive CIA Trade-Off Sliders &amp; System Archetype Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust the weight of each CIA pillar to observe its direct architectural impact on System Latency, Monthly Infrastructure Cost in Indian Rupees (₹), User Friction, and Resulting Archetype.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sliders Configuration (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-5">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Pillar Priority Sliders (1 = Minimal, 5 = Extreme)
              </h3>

              {/* Confidentiality Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span> Confidentiality Weight:
                  </span>
                  <span className="font-mono text-purple-300 font-bold">Level {confidentialityWeight} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={confidentialityWeight}
                  onChange={(e) => setConfidentialityWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Standard HTTPS</span>
                  <span>HSM + Field-Level AES</span>
                  <span>Zero-Knowledge / Air-Gap</span>
                </div>
              </div>

              {/* Integrity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> Integrity Weight:
                  </span>
                  <span className="font-mono text-amber-300 font-bold">Level {integrityWeight} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={integrityWeight}
                  onChange={(e) => setIntegrityWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Eventual Sync (BASE)</span>
                  <span>ACID 2-Phase Commit</span>
                  <span>Immutable Raft WORM</span>
                </div>
              </div>

              {/* Availability Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Availability Weight:
                  </span>
                  <span className="font-mono text-emerald-300 font-bold">Level {availabilityWeight} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={availabilityWeight}
                  onChange={(e) => setAvailabilityWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Single VM (99.0%)</span>
                  <span>Multi-AZ Standby (99.9%)</span>
                  <span>Active-Active Multi-Region Anycast</span>
                </div>
              </div>

              {/* Quick Reset to Preset Buttons */}
              <div className="pt-2 border-t border-gray-800">
                <span className="text-[11px] text-gray-400 block mb-2 font-semibold">Load Standard Preset:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => { setConfidentialityWeight(5); setIntegrityWeight(5); setAvailabilityWeight(3); }}
                    className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-amber-300 rounded border border-gray-700 text-[10px] font-semibold"
                  >
                    FinTech (ACID)
                  </button>
                  <button
                    onClick={() => { setConfidentialityWeight(2); setIntegrityWeight(4); setAvailabilityWeight(5); }}
                    className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-rose-300 rounded border border-gray-700 text-[10px] font-semibold"
                  >
                    Hospital (Break-Glass)
                  </button>
                  <button
                    onClick={() => { setConfidentialityWeight(5); setIntegrityWeight(4); setAvailabilityWeight(2); }}
                    className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-purple-300 rounded border border-gray-700 text-[10px] font-semibold"
                  >
                    Military (Bell-LaPadula)
                  </button>
                  <button
                    onClick={() => { setConfidentialityWeight(2); setIntegrityWeight(2); setAvailabilityWeight(5); }}
                    className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-blue-300 rounded border border-gray-700 text-[10px] font-semibold"
                  >
                    Streaming (BASE)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Metrics & Resulting Archetype (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">System Architecture Profile</h3>
                  <span className="text-xs text-indigo-400 font-mono font-semibold">{sliderMetrics.archetype}</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 tracking-tight">
                  {sliderMetrics.totalCostFormatted}
                </div>
              </div>

              {/* Quick Metrics Display */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">System Response Latency</span>
                  <span className="text-lg font-bold text-amber-300">{sliderMetrics.calculatedLatencyMs}</span>
                  <span className="text-[10px] text-gray-500 block">Crypto + consensus overhead</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">User Friction Index</span>
                  <span className="text-lg font-bold text-purple-300">{sliderMetrics.frictionScore}</span>
                  <span className="text-[10px] text-gray-500 block">Auth barriers &amp; session strictness</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Shadow IT Circumvention Risk</span>
                  <span className={clsx("text-xs font-bold block mt-1", sliderMetrics.frictionScore > 65 ? "text-rose-400" : "text-emerald-400")}>
                    {sliderMetrics.shadowItRisk}
                  </span>
                  <span className="text-[10px] text-gray-500 block">Propensity to bypass controls</span>
                </div>
              </div>

              {/* The PACELC & CAP Theoretical Explanation */}
              <div className="bg-gray-900/90 p-5 rounded-xl border border-indigo-900/30 space-y-3 text-xs">
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📐</span> Theoretical Theorem Mapping: CAP &amp; PACELC
                </h4>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 font-mono text-gray-300 text-[11px] space-y-1">
                  <div className="text-emerald-400">// CAP Theorem (Eric Brewer):</div>
                  <div>During network partitions (P), choose: Consistency/Integrity (CP) OR Availability (AP).</div>
                  <div className="text-amber-400 pt-1">// PACELC Theorem (Daniel Abadi):</div>
                  <div>If Partition (P) -&gt; A or C; Else (E) -&gt; Latency (L) or Consistency (C).</div>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Notice how pushing Confidentiality and Integrity to Level 5 immediately drives latency up to ~{sliderMetrics.calculatedLatencyMs} and increases friction. 
                  In production, forcing unnecessary cryptographic locks onto non-financial systems squanders budget and frustrates users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Domain-Specific Trade-off Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛</span> Studio 2: Industry-Specific Trade-Off &amp; Failure Mode Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Analyze how differing business verticals make deliberate, documented sacrifices to protect mission-critical operations.
            </p>
          </div>

          {/* Domain Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(domainPresets).map((dom) => {
              const isSelected = selectedDomainKey === dom.key;
              return (
                <button
                  key={dom.key}
                  onClick={() => setSelectedDomainKey(dom.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left text-xs font-semibold transition-all duration-300 border",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold truncate">{dom.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{dom.name.split(" ").slice(1, 3).join(" ")}</div>
                  <div className={clsx("mt-1.5 text-[10px] px-1.5 py-0.5 rounded border inline-block", dom.badgeClass)}>
                    Preset
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Domain Analysis Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDomain.badgeClass)}>
                  {activeDomain.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Architectural Trade-Off Analysis
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wider">Primary Prioritized Focus</div>
                <div className="text-sm sm:text-base font-extrabold text-indigo-300">{activeDomain.primaryFocus}</div>
              </div>
            </div>

            {/* Core Dilemma & Sacrificed Pillar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/30 space-y-2">
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎯</span> Mission-Critical Rationale
                </h4>
                <p className="text-gray-300 leading-relaxed">{activeDomain.description}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚠️</span> Deliberately Sacrificed Pillar
                </h4>
                <div className="text-sm font-bold text-rose-300">{activeDomain.sacrificedPillar}</div>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Engineers deliberately tolerate backoff or temporary inconsistency to ensure core safety and zero catastrophic corruption.
                </p>
              </div>
            </div>

            {/* Pattern vs Fatal Misconfiguration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Standard Architectural Pattern
                </h4>
                <p className="text-gray-300 leading-relaxed font-mono">{activeDomain.architecturePattern}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Fatal Misconfiguration Anti-Pattern
                </h4>
                <p className="text-gray-300 leading-relaxed">{activeDomain.fatalMisconfiguration}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Architectural Flowcharts
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the CIA Trade-Off Spectrum Triangle and the Emergency "Break-Glass" Access Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The CIA Trade-Off Spectrum Triangle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔺</span> Diagram A: The CIA Trilemma &amp; Domain Alignment
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 340" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Triangle */}
                  <polygon points="250,30 40,300 460,300" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 3" />

                  {/* Top Vertex: Confidentiality */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="30" r="28" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                    <text x="250" y="34" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="11">C</text>
                    <text x="250" y="75" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">Confidentiality</text>
                    <text x="250" y="90" fill="#a5b4fc" textAnchor="middle" fontSize="9">Military / Defense / Air-Gap</text>
                  </g>

                  {/* Bottom-Left Vertex: Integrity */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="40" cy="300" r="28" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
                    <text x="40" y="304" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="11">I</text>
                    <text x="90" y="325" fill="#fde68a" fontWeight="bold" fontSize="11">Integrity</text>
                    <text x="90" y="338" fill="#fbbf24" fontSize="9">Banking ACID / SCADA</text>
                  </g>

                  {/* Bottom-Right Vertex: Availability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="460" cy="300" r="28" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                    <text x="460" y="304" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="11">A</text>
                    <text x="410" y="325" fill="#a7f3d0" fontWeight="bold" textAnchor="end" fontSize="11">Availability</text>
                    <text x="410" y="338" fill="#6ee7b7" textAnchor="end" fontSize="9">ICU Hospital / Streaming Edge</text>
                  </g>

                  {/* Center Triangle Label */}
                  <rect x="150" y="160" width="200" height="60" rx="8" fill="#18181b" stroke="#4f46e5" strokeWidth="1.5" />
                  <text x="250" y="185" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontSize="11">THE TRILEMMA</text>
                  <text x="250" y="202" fill="#94a3b8" textAnchor="middle" fontSize="9.5">You can heavily optimize TWO,</text>
                  <text x="250" y="214" fill="#f87171" textAnchor="middle" fontSize="8.5">but NEVER all three simultaneously.</text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: Systems map to edges of the triangle. FinTech sits on the C-I edge, Emergency Hospitals on the I-A edge, and Streaming on the A-C edge.
              </p>
            </div>

            {/* Diagram 2: The Break-Glass Emergency Access Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>🚨</span> Diagram B: Break-Glass Emergency Access Protocol Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 340" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Emergency Trigger */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="65" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="85" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10.5">1. Emergency Trigger</text>
                    <text x="85" y="60" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Code Blue / Cardiac Event</text>
                    <text x="85" y="72" fill="#f87171" textAnchor="middle" fontSize="8">(No time for 3FA MFA)</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <path d="M 150 52 L 185 52" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRose)" />

                  {/* Step 2: Instant Fail-Open Override */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="190" y="20" width="145" height="65" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="262" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10.5">2. Fail-Open Override</text>
                    <text x="262" y="60" fill="#6ee7b7" textAnchor="middle" fontSize="8.5">0.0s Instant Drug Access</text>
                    <text x="262" y="72" fill="#a7f3d0" textAnchor="middle" fontSize="8">Availability = 100% Guaranteed</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <path d="M 335 52 L 370 52" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowRose)" />

                  {/* Step 3: High Priority Alert Broadcast */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="375" y="20" width="105" height="65" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="427" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10.5">3. Alarm Broadcast</text>
                    <text x="427" y="60" fill="#fde68a" textAnchor="middle" fontSize="8.5">SMS / Pager to</text>
                    <text x="427" y="72" fill="#fde68a" textAnchor="middle" fontSize="8">Chief Medical Officer</text>
                  </g>

                  {/* Downward Connector */}
                  <path d="M 427 85 L 427 140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4: Immutable WORM Audit Logging */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="60" y="140" width="380" height="75" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="165" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">4. PARALLEL IMMUTABLE AUDIT LOGGING</text>
                    <text x="250" y="182" fill="#a5b4fc" textAnchor="middle" fontSize="9">Captures: Clinician ID, Millisecond Timestamp, Drug Dosage Altered &amp; Room Camera Feed</text>
                    <text x="250" y="198" fill="#34d399" textAnchor="middle" fontSize="8.5">Written directly to AWS S3 Object Lock (WORM Storage) -&gt; Integrity Protected Retroactively</text>
                  </g>

                  {/* Downward Arrow */}
                  <path d="M 250 215 L 250 250" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowRose)" />

                  {/* Step 5: Post-Incident Forensic Reconciliation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="40" y="250" width="420" height="70" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="275" fill="#bae6fd" fontWeight="bold" textAnchor="middle" fontSize="11">5. POST-INCIDENT LEGAL &amp; MEDICAL RECONCILIATION</text>
                    <text x="250" y="292" fill="#7dd3fc" textAnchor="middle" fontSize="9">Senior Medical Board verifies dosage justification within 24 hours.</text>
                    <text x="250" y="306" fill="#38bdf8" textAnchor="middle" fontSize="8.5">100% Compliance with NABH &amp; India DPDP Act Standards</text>
                  </g>

                  <defs>
                    <marker id="arrowRose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: Break-Glass delivers 0ms Availability during life emergencies, while preserving legal Integrity via asynchronous write-once audit streams.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Critical Infrastructure Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Examine how senior engineering leads resolve high-stakes trade-offs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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

          {/* Active Scenario Card */}
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Evaluated Security Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Bad Proposal vs Architectural Remedy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>⚡</span> The Real-World Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span>⚠️</span> The Flawed / Insecure Proposal
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.badProposal}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>🛡</span> Evaluated Architectural Remedy
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.architecturalRemedy}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Production Performance &amp; Compliance Metrics
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
              Strategic rules of thumb used by principal cybersecurity architects when making irreversible trade-off decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Professional Architectural Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Document the Compromise:</strong> Every architecture diagram must explicitly state which pillar was compromised and why.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Calculate Risk ROI in ₹:</strong> Never spend ₹10 Lakhs annually to safeguard an asset whose Annualized Loss Expectancy is ₹50,000.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Separate Life Safety from Auth:</strong> In hospital trauma units and nuclear plants, human safety always overrides digital login gates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Match Model to Domain:</strong> Apply ACID to bank ledgers, BASE to video CDNs, and IEC 62351 nonces to SCADA relays.</span>
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
                  <span><strong>The 100% Security Delusion:</strong> Believing a system can achieve maximum Confidentiality, Integrity, and Availability at zero cost.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Fail-Closed on Fire Doors:</strong> Electing Fail-Closed access on building emergency exits, risking human life during fires.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Excessive Friction:</strong> Enforcing 20-character rotating passwords that force employees to adopt personal WhatsApp Shadow IT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Heavy Crypto on Low Latency:</strong> Running 4096-bit RSA calculations on 10ms protective electrical power relays.</span>
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
                  <span><strong>Asynchronous Write-Once Auditing:</strong> When using Break-Glass access, stream immutable audit logs directly to S3 WORM storage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Graceful Degradation:</strong> Design user interfaces to degrade non-essential features while keeping core payment flows alive.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Zero Trust Micro-Segmentation:</strong> Contain lateral movement blast radiuses by enforcing mTLS at service mesh boundaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Continuous Chaos Testing:</strong> Inject synthetic network partitions to verify whether distributed nodes fail cleanly into CP or AP state.</span>
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
              Synthesize key architectural trade-offs before completing the final module assessment questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for System Designers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Netflix can afford to use the BASE eventual consistency model for video recommendations, but a Kolkata UPI payment switch must strictly enforce ACID two-phase commits.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Break-Glass emergency protocol solves the conflict between life-critical Availability and legal audit Integrity by logging immutable events asynchronously.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future API designs, replace heavy pessimistic table locks with optimistic concurrency and Redis token TTL holds to protect Availability during flash traffic surges.
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
                <span>FinTech = Integrity + Confidentiality (Fail-Closed, ACID).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hospital = Availability (Fail-Open, Break-Glass).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Military = Confidentiality (Bell-LaPadula 'No Read Up').</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Streaming = Availability + Low Latency (BASE Model).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SCADA Grid = Integrity &amp; Speed (HMAC over RSA).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Control Cost must never exceed Asset ALE in ₹ INR.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Evaluating CIA Trade-offs in Real-World Systems FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Evaluating CIA Trade-offs in Real-World Systems (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As you complete the foundational Security Triad (CIA) module, always carry this fundamental wisdom into your exams and engineering careers: Security is never about building an impenetrable fortress that nobody can use. Great security engineering is the art of strategic, deliberate trade-offs. Tailor your architecture to the human, operational, and financial reality of the system—whether protecting a ₹10,000 UPI transfer in Kolkata or resuscitating a patient in an Ichapur emergency ward."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
