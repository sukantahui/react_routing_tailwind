import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: Forensic Post-Mortem Explorer State
  const [selectedCaseId, setSelectedCaseId] = useState("equifax");

  // Studio 2: CIA Impact & Resilience Calculator State
  const [downtimeHours, setDowntimeHours] = useState(4);
  const [dataLossMinutes, setDataLossMinutes] = useState(15);
  const [affectedRecords, setAffectedRecords] = useState(500000);
  const [selectedThreatType, setSelectedThreatType] = useState("ransomware_billing");

  // Studio 3: Localized Real-World Scenario Tab State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi");

  // Global Landmark Case Studies Data
  const caseStudies = {
    equifax: {
      id: "equifax",
      name: "Equifax PII Data Breach",
      year: "2017",
      primaryPillar: "Confidentiality",
      pillarColor: "from-rose-500 to-red-600",
      pillarBadge: "Confidentiality Catastrophe",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      cveCode: "CVE-2017-5638",
      financialDamageINR: "₹11,500 Crores ($1.4B)",
      recordsExfiltrated: "147 Million Consumer Records",
      dwellTime: "76 Days Undetected",
      vector: "Unpatched Apache Struts Jakarta Multipart Parser & Expired SSL Inspection Certificate",
      rootCauseSummary:
        "Attackers executed remote code via malformed Content-Type headers. Internal intrusion detection appliances had an expired cryptographic SSL certificate for over 9 months, blinding SOC analysts while 9,000+ SQL exfiltration queries executed across core databases.",
      timeline: [
        { phase: "March 7, 2017", desc: "US-CERT releases critical security bulletin for CVE-2017-5638 (Apache Struts)." },
        { phase: "March 9, 2017", desc: "Equifax IT sends email mandate to patch vulnerable systems within 48 hours; disputed portal missed." },
        { phase: "May 13, 2017", desc: "Attackers gain initial shell access; begin lateral exploration of internal network shares." },
        { phase: "July 29, 2017", desc: "Security team updates expired SSL certificate on network traffic inspection appliance; instantly flags massive exfiltration." },
        { phase: "September 7, 2017", desc: "Public disclosure; CEO, CIO, and CISO forced to resign; stock plummets by 35%." }
      ],
      architecturalLessons: [
        "Automated Certificate Lifecycle Management (ACME Protocol) with 30-day pre-expiry alerts.",
        "Strict Egress Filtering: Core PII database subnets must have zero public outbound internet routing.",
        "Automated continuous software bill of materials (SBOM) scanning and vulnerability patching pipelines."
      ]
    },
    stuxnet: {
      id: "stuxnet",
      name: "Stuxnet Worm (Natanz Sabotage)",
      year: "2010",
      primaryPillar: "Integrity",
      pillarColor: "from-amber-500 to-orange-600",
      pillarBadge: "Operational Integrity Sabotage",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      cveCode: "4x Zero-Day Exploits (incl. CVE-2010-2568)",
      financialDamageINR: "Physical Destruction of 1,000+ Centrifuges",
      recordsExfiltrated: "Zero (Pure Kinetic Sabotage)",
      dwellTime: "18+ Months Undetected",
      vector: "Air-Gap USB Propagation, Stolen Realtek Digital Certificates & Siemens Step7 PLC Rootkit",
      rootCauseSummary:
        "Stuxnet bypassed physical air gaps via contractor USB flash drives. Once inside the Siemens Step7 SCADA environment, it injected custom PLC logic that altered centrifuge rotor frequencies (1,410 Hz overspin and 2 Hz brake) while spoofing 21-second pre-recorded normal sensor telemetry back to operator display consoles.",
      timeline: [
        { phase: "Mid 2009", desc: "Initial versions deployed targeting Iranian nuclear facilities via infected supplier laptops." },
        { phase: "Early 2010", desc: "Exploits Windows LNK shortcut auto-execution zero-day to cross air-gapped networks effortlessly." },
        { phase: "Mid 2010", desc: "Centrifuges at Natanz fail mechanically at alarming rates; Iranian engineers suspect defective parts." },
        { phase: "June 2010", desc: "VirusBlokAda discovers malware crashing systems in Belarus; global security labs unpack binary." },
        { phase: "Late 2010", desc: "Definitive forensic analysis reveals world's first cyber-kinetic weapon designed for SCADA sabotage." }
      ],
      architecturalLessons: [
        "Cryptographic firmware and code signing enforced directly in hardware microcontroller bootloaders.",
        "Out-of-band physical sensor telemetry (independent analog vibration, pressure, and thermal gauges).",
        "Air-gap USB sanitization kiosks with unidirectional optical data diodes."
      ]
    },
    dyn_dns: {
      id: "dyn_dns",
      name: "Dyn Managed DNS DDoS Attack",
      year: "2016",
      primaryPillar: "Availability",
      pillarColor: "from-blue-500 to-cyan-600",
      pillarBadge: "Availability Collapse",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      cveCode: "IoT Telnet Default Password Exploit",
      financialDamageINR: "₹2,400 Crores Global E-Commerce Loss",
      recordsExfiltrated: "Zero (Service Disruption)",
      dwellTime: "3 Waves over 14 Hours",
      vector: "Mirai Botnet (100k+ IoT Cameras/DVRs) executing 1.2 Tbps SYN, UDP & DNS Water Torture Floods",
      rootCauseSummary:
        "The Mirai botnet weaponized default-credential IoT devices worldwide to launch a massive 1.2 Tbps multi-vector assault. By flooding Dyn's authoritative nameservers with random non-existent subdomain queries, it forced recursive resolvers to overwhelm Dyn's backend, rendering Twitter, GitHub, Netflix, and PayPal inaccessible.",
      timeline: [
        { phase: "07:10 AM EST", desc: "First wave strikes Dyn's US-East authoritative DNS servers; latency spikes from 15ms to 8,000ms." },
        { phase: "09:20 AM EST", desc: "Dyn engineers mitigate initial flood; services begin recovering across North America." },
        { phase: "11:52 AM EST", desc: "Second wave launches with DNS Water Torture attack targeting global Anycast edge nodes." },
        { phase: "04:30 PM EST", desc: "Third wave strikes; major internet platforms coordinate traffic routing to secondary DNS providers." },
        { phase: "06:17 PM EST", desc: "Dyn fully restores routing; publishes post-mortem identifying IoT botnet traffic." }
      ],
      architecturalLessons: [
        "Multi-Provider DNS Architecture (Dual authoritative DNS providers preventing single points of failure).",
        "BGP Anycast routing with automated edge traffic scrubbing and rate-limiting.",
        "Mandatory hardware firmware hardening: eliminate default administrative Telnet/SSH passwords."
      ]
    },
    target_pos: {
      id: "target_pos",
      name: "Target Corporation POS Breach",
      year: "2013",
      primaryPillar: "Confidentiality & Trust Boundary",
      pillarColor: "from-purple-500 to-violet-600",
      pillarBadge: "Lateral Trust Collapse",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      cveCode: "Vendor Credential Phishing",
      financialDamageINR: "₹1,650 Crores Settlement & Upgrades",
      recordsExfiltrated: "40M Payment Cards + 70M Customer PII",
      dwellTime: "24 Days Active Scraping",
      vector: "Phished 3rd-Party HVAC Vendor Credentials + Lack of Internal Network Micro-Segmentation",
      rootCauseSummary:
        "Attackers phished login credentials from Fazio Mechanical Services (a refrigeration vendor). Because Target's billing and vendor portal shared a flat network architecture with the Point-of-Sale (POS) environment, attackers traversed unimpeded into checkout terminals, installing 'Kaptoxa' memory-scraping malware across thousands of registers.",
      timeline: [
        { phase: "September 2013", desc: "Phishing email sent to third-party HVAC contractor; Citadel banking trojan captures credentials." },
        { phase: "November 15, 2013", desc: "Attackers use vendor portal credentials to access Target internal staging servers." },
        { phase: "November 27, 2013", desc: "Kaptoxa memory-scraper deployed to over 1,800 POS cash registers across US retail stores." },
        { phase: "December 12, 2013", desc: "US Department of Justice alerts Target; security team severs exfiltration servers." },
        { phase: "January 2014", desc: "Target CEO and CIO resign; massive industry shift towards EMV Chip-and-PIN cards initiated." }
      ],
      architecturalLessons: [
        "Zero Trust Micro-Segmentation: Vendor portals must be strictly quarantined from Cardholder Data Environments (CDE).",
        "Point-to-Point Encryption (P2PE): Card data must be encrypted at the hardware reader before touching terminal memory.",
        "Mandatory Multi-Factor Authentication (MFA) on all third-party vendor and remote administrative accounts."
      ]
    },
    colonial_pipeline: {
      id: "colonial_pipeline",
      name: "Colonial Pipeline Ransomware Incident",
      year: "2021",
      primaryPillar: "Availability (Operational Dependency)",
      pillarColor: "from-emerald-500 to-teal-600",
      pillarBadge: "IT/OT Dependency Shutdown",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      cveCode: "Compromised Legacy VPN Account",
      financialDamageINR: "₹36 Crores ($4.4M) Ransom + Fuel Panic",
      recordsExfiltrated: "100 GB Corporate Financial Data",
      dwellTime: "6 Days Pipeline Halt",
      vector: "Single Compromised Inactive VPN Password without Multi-Factor Authentication (MFA)",
      rootCauseSummary:
        "DarkSide ransomware operators obtained a single leaked corporate VPN password from the dark web. While the ransomware encrypted enterprise billing and accounting systems in the IT domain, operators could not meter fuel shipments accurately. Consequently, management proactively shut down 5,500 miles of physical pipeline, causing widespread panic buying across the US East Coast.",
      timeline: [
        { phase: "April 29, 2021", desc: "Attackers access corporate network via legacy inactive VPN profile lacking MFA." },
        { phase: "May 6, 2021", desc: "Exfiltrates 100 GB of sensitive business data; deploys DarkSide ransomware on IT billing servers." },
        { phase: "May 7, 2021", desc: "Colonial Pipeline leadership takes the operational pipeline offline to contain infection." },
        { phase: "May 8, 2021", desc: "Colonial pays 75 Bitcoin (~₹36 Crores) ransom in exchange for a slow decryptor tool." },
        { phase: "May 12, 2021", desc: "Pipeline restarts operations after 6-day shutdown; US DOJ later recovers portion of the ransom." }
      ],
      architecturalLessons: [
        "Mandatory hardware-backed MFA across every single external access endpoint without exception.",
        "Decouple operational technology (OT) physical continuity from enterprise IT billing software.",
        "Automated stale account auditing: deactivate dormant credentials within 30 days of inactivity."
      ]
    }
  };

  const selectedCase = caseStudies[selectedCaseId];

  // Threat scenarios for Studio 2 Calculator
  const threatScenarios = {
    ransomware_billing: {
      name: "Enterprise Ransomware on Financial Billing Server",
      baseHourlyLossRateINR: 1250000, // ₹12.5 Lakhs/hour
      recordFineRateINR: 200,         // ₹200 per compromised record
      primaryRisk: "Availability & Financial Accounting Breakdown",
      mitigationStrategy: "Air-gapped immutable backup snapshots (WORM), rapid VM failover, and segregated disaster recovery VPC."
    },
    sqli_exfiltration: {
      name: "SQL Injection Exfiltrating Customer PII Database",
      baseHourlyLossRateINR: 450000,  // ₹4.5 Lakhs/hour forensic investigation
      recordFineRateINR: 1500,        // ₹1,500 per exposed record under DPDP Act
      primaryRisk: "Confidentiality Violation & Massive Regulatory Fines",
      mitigationStrategy: "Prepared statements, Column-level AES-256 Field Level Encryption, and automated egress gateway locks."
    },
    mitm_firmware: {
      name: "Man-in-the-Middle SCADA Firmware Tampering",
      baseHourlyLossRateINR: 3500000, // ₹35 Lakhs/hour equipment damage & downtime
      recordFineRateINR: 50,          // Low record theft, high kinetic damage
      primaryRisk: "Integrity Sabotage & Physical Hardware Destruction",
      mitigationStrategy: "Hardware Root of Trust (TPM), cryptographically signed firmware binaries, and analog sensor verification."
    },
    dns_ddos: {
      name: "Volumetric Anycast DDoS on Core API Gateway",
      baseHourlyLossRateINR: 2200000, // ₹22 Lakhs/hour lost sales & SLA penalties
      recordFineRateINR: 10,          // Zero data leak
      primaryRisk: "Availability Outage & Severe Reputation Damage",
      mitigationStrategy: "BGP Anycast routing, Cloudflare Magic Transit scrubbing, and adaptive edge rate-limiting."
    }
  };

  const activeThreat = threatScenarios[selectedThreatType];

  // Calculations for Studio 2
  const calculations = useMemo(() => {
    const hourlyRate = activeThreat.baseHourlyLossRateINR;
    const downtimeCost = downtimeHours * hourlyRate;
    const dataLossTxCost = (dataLossMinutes / 60) * (hourlyRate * 0.4);
    const regulatoryFineEst = Math.min(2500000000, affectedRecords * activeThreat.recordFineRateINR); // Capped at ₹250 Crores per DPDP Act
    const totalIncidentCost = downtimeCost + dataLossTxCost + regulatoryFineEst;

    // Format into Lakhs or Crores for Indian currency notation
    const formatINR = (val) => {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Crores`;
      } else if (val >= 100000) {
        return `₹${(val / 100000).toFixed(2)} Lakhs`;
      } else {
        return `₹${val.toLocaleString("en-IN")}`;
      }
    };

    return {
      downtimeCostFormatted: formatINR(downtimeCost),
      dataLossTxCostFormatted: formatINR(dataLossTxCost),
      regulatoryFineFormatted: formatINR(regulatoryFineEst),
      totalIncidentCostFormatted: formatINR(totalIncidentCost),
      totalCostRaw: totalIncidentCost
    };
  }, [downtimeHours, dataLossMinutes, affectedRecords, activeThreat]);

  // Localized Real-World Case Studies Data
  const localScenarios = [
    {
      id: "kolkata_upi",
      lead: "Mamata",
      role: "Lead FinTech Cloud Architect",
      location: "Kolkata FinTech Valley",
      title: "Core UPI Real-Time Payment Switch",
      budget: "₹8,50,000",
      pillarFocus: "Confidentiality + Availability Balance",
      dilemma:
        "During Durga Puja festive flash sales, UPI transaction volume surged to 18,000 transactions per second (TPS). Running synchronous 4096-bit RSA asymmetric encryption on each transaction payload caused 900ms processing latencies, triggering mass timeout cancellations across merchant payment gateways (severe Availability crisis).",
      badProposal:
        "Junior engineers suggested temporarily disabling payload encryption during peak traffic hours to keep response latency below 50ms.",
      architecturalRemedy:
        "Mamata deployed dedicated PCIe Hardware Security Modules (HSMs) performing hardware-accelerated AES-256-GCM symmetric encryption alongside stateless tokenization in Redis Enterprise clusters. Additionally, she implemented active-active Kubernetes clusters across Kolkata and Mumbai data centers with BGP Anycast routing.",
      metrics: {
        throughput: "18,500 TPS",
        latency: "28 ms",
        downtimeYear: "0 Seconds",
        compliance: "100% PCI-DSS & RBI Mandate"
      }
    },
    {
      id: "ichapur_icu",
      lead: "Mahima",
      role: "Chief Hospital Security Officer",
      location: "Ichapur General Hospital",
      title: "Smart ICU Infusion Pump Telemetry",
      budget: "₹4,80,000",
      pillarFocus: "Integrity & Patient Safety",
      dilemma:
        "120 smart drug infusion pumps delivering insulin and epinephrine communicated over unencrypted MQTT (port 1883) to a central nursing station. A network security assessment discovered that any student on the hospital guest Wi-Fi could forge MQTT JSON payloads to alter drug dosage rates (catastrophic Integrity attack).",
      badProposal:
        "IT proposed locking each pump behind a 3-factor biometric login that required doctors to re-authenticate before any dosage adjustment, creating fatal delays during cardiac arrest resuscitations.",
      architecturalRemedy:
        "Mahima isolated all medical devices into a dedicated 802.1Q VLAN with Mutual TLS (mTLS) client certificates embedded in hardware TPM chips. Firmware over-the-air (FOTA) updates required ECDSA cryptographic signatures. In case of network partition, pumps safely defaulted to local manual dosage controls (fail-safe Availability).",
      metrics: {
        telemetrySecurity: "100% Encrypted mTLS",
        tamperingIncidents: "0 Detected",
        emergencyResponseTime: "< 1.5 Seconds",
        compliance: "NABH & ISO 27799 Compliant"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "Industrial OT Protection Engineer",
      location: "Barrackpore 220kV Grid Substation",
      title: "High-Voltage Circuit Breaker Telemetry",
      budget: "₹6,20,000",
      pillarFocus: "Operational Integrity & Physical Continuity",
      dilemma:
        "Legacy DNP3 and IEC 60870-5-104 serial-to-IP gateways transmitted cleartext grid switching commands without message authentication. Adversaries conducting penetration testing replayed previous 'Trip Transformer Breaker' commands, successfully tripping high-voltage switchgears and threatening regional grid collapse.",
      badProposal:
        "Management considered air-gapping the entire substation and disabling all remote monitoring, forcing operators to manually drive to substations to inspect meter gauges.",
      architecturalRemedy:
        "Debangshu implemented IEC 62351 cryptographic security with HMAC-SHA256 message authentication nonces on every switching command, preventing replay attacks. He installed physical unidirectional optical data diodes allowing telemetry to flow out to the control center while physically preventing incoming cyber attack packets from entering the substation LAN.",
      metrics: {
        replayResistance: "100% Cryptographic Nonce Proof",
        gridUptime: "99.999% Reliability",
        switchVerificationTime: "< 12 ms",
        compliance: "CEA Cyber Security Guidelines"
      }
    },
    {
      id: "jadavpur_logistics",
      lead: "Abhronila & Susmita",
      role: "Cyber Threat Research Leads",
      location: "Jadavpur University Logistics Hub",
      title: "Automated E-Commerce Order Ledger",
      budget: "₹3,90,000",
      pillarFocus: "Data Integrity & Split-Brain Resiliency",
      dilemma:
        "During high-volume flash discount sales, network micro-partitions between sorting hubs caused database split-brain conditions. Two separate database replica nodes simultaneously accepted write operations, leading to duplicate product dispatches, conflicting invoice totals, and inventory balance corruption.",
      badProposal:
        "Developers proposed turning off database transaction ACID locks and running a batch script at midnight to manually average out discrepancies.",
      architecturalRemedy:
        "The research team re-architected the order dispatch pipeline using Raft distributed consensus quorum clustering. They enforced idempotent API endpoints with UUIDv4 cryptographic deduplication keys and recorded all financial state changes to an append-only immutable ledger (WORM storage).",
      metrics: {
        duplicateDispatches: "0 Records",
        ledgerIntegrity: "100% Cryptographically Chained",
        failoverTime: "< 350 ms",
        compliance: "Audited & Verified"
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
            Cyber Security Module 002_001 • Topic 9 of 11
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            CIA Triad Implementation Case Studies
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Theoretical security models come alive during post-mortem forensic analysis of real-world disasters. 
            Explore landmark global cyber breaches (Equifax, Stuxnet, Dyn DNS, Target, Colonial Pipeline) and investigate 
            how catastrophic breakdowns across Confidentiality, Integrity, and Availability transform modern defense-in-depth architecture.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Forensic Post-Mortem Interactive Lab */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 1: Landmark Case Study Forensic Investigator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a historic cyber security incident to dissect its root cause vulnerability, attack vector, blast radius, and architectural remediation.
            </p>
          </div>

          {/* Case Study Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(caseStudies).map((cs) => {
              const isSelected = selectedCaseId === cs.id;
              return (
                <button
                  key={cs.id}
                  onClick={() => setSelectedCaseId(cs.id)}
                  className={clsx(
                    "p-3 rounded-xl text-left text-xs font-semibold transition-all duration-300 border",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-800/80 text-gray-300 border-gray-700 hover:bg-gray-750 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{cs.year}</div>
                  <div className="font-bold truncate mt-0.5">{cs.name.split(" ")[0]}</div>
                  <div className={clsx("mt-1.5 text-[10px] px-1.5 py-0.5 rounded border inline-block", cs.badgeClass)}>
                    {cs.primaryPillar.split(" ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", selectedCase.badgeClass)}>
                    {selectedCase.pillarBadge}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">CVE Reference: {selectedCase.cveCode}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {selectedCase.name} ({selectedCase.year})
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wider">Estimated Financial Damage</div>
                <div className="text-base sm:text-lg font-extrabold text-amber-400">{selectedCase.financialDamageINR}</div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[11px]">Primary CIA Impact</span>
                <span className="font-bold text-indigo-300 text-sm">{selectedCase.primaryPillar}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[11px]">Attack Vector / Exploit</span>
                <span className="font-bold text-rose-300 text-sm truncate block">{selectedCase.vector}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[11px]">Dwell Time / Records</span>
                <span className="font-bold text-emerald-300 text-sm">{selectedCase.dwellTime}</span>
              </div>
            </div>

            {/* Root Cause Analysis */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔍</span> Root Cause &amp; Technical Breakdown
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-gray-900/90 p-4 rounded-xl border border-gray-800">
                {selectedCase.rootCauseSummary}
              </p>
            </div>

            {/* Forensic Incident Timeline */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⏱</span> Forensic Timeline &amp; Escalation Path
              </h4>
              <div className="space-y-2">
                {selectedCase.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs bg-gray-900/60 p-3 rounded-lg border border-gray-800/80">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono font-semibold shrink-0">
                      {step.phase}
                    </span>
                    <span className="text-gray-300 leading-relaxed">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Defensive Architecture Lessons */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>🛡</span> Architectural Remediation Blueprint (Modern Zero Trust Standard)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {selectedCase.architecturalLessons.map((lesson, idx) => (
                  <div key={idx} className="bg-gray-900/90 p-3.5 rounded-xl border border-emerald-900/30 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="text-gray-300 leading-relaxed">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CIA Failure Impact & Resilience Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 2: Real-World CIA Failure Impact &amp; Fine Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Simulate enterprise disaster scenarios, evaluate financial losses in Indian Rupees (₹), and determine regulatory penalties under the DPDP Act 2023.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Control Parameters (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-5">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Incident Threat Configuration
              </h3>

              {/* Threat Selector */}
              <div className="space-y-2">
                <label className="text-xs text-gray-300 font-semibold block">Incident Profile</label>
                <select
                  value={selectedThreatType}
                  onChange={(e) => setSelectedThreatType(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                >
                  {Object.entries(threatScenarios).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Downtime Hours Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">Outage Duration (RTO Impact):</span>
                  <span className="font-mono text-indigo-300 font-bold">{downtimeHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="48"
                  step="1"
                  value={downtimeHours}
                  onChange={(e) => setDowntimeHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>1 Hour (Quick Recovery)</span>
                  <span>24 Hours (Severe Outage)</span>
                  <span>48 Hours (Catastrophic)</span>
                </div>
              </div>

              {/* Data Loss Window (RPO) Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">Data Loss Window (RPO Impact):</span>
                  <span className="font-mono text-amber-300 font-bold">{dataLossMinutes} Minutes</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="5"
                  value={dataLossMinutes}
                  onChange={(e) => setDataLossMinutes(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>0 Min (Sync Replication)</span>
                  <span>60 Min (Hourly Snapshot)</span>
                  <span>120 Min (Stale Backup)</span>
                </div>
              </div>

              {/* Affected Consumer Records */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">Exposed PII Records:</span>
                  <span className="font-mono text-rose-300 font-bold">{affectedRecords.toLocaleString("en-IN")} Records</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="5000000"
                  step="50000"
                  value={affectedRecords}
                  onChange={(e) => setAffectedRecords(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>10K (SMB Breach)</span>
                  <span>1M (Mid-Tier Platform)</span>
                  <span>5M (Major National Portal)</span>
                </div>
              </div>

              {/* Active Mitigation Strategy Advice */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/40 text-xs text-gray-300 space-y-1">
                <span className="text-indigo-400 font-bold block">Recommended Resilience Control:</span>
                <p className="text-gray-400 leading-relaxed">{activeThreat.mitigationStrategy}</p>
              </div>
            </div>

            {/* Calculated Financial & Legal Impact Breakdown (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Estimated Cumulative Breach Cost</h3>
                  <span className="text-xs text-gray-400">{activeThreat.name}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 tracking-tight">
                  {calculations.totalIncidentCostFormatted}
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">System Downtime Cost</span>
                  <span className="text-base font-bold text-white">{calculations.downtimeCostFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">Lost revenue &amp; SLA penalties</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Unrecovered Tx Loss</span>
                  <span className="text-base font-bold text-amber-300">{calculations.dataLossTxCostFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">RPO transaction reconstruction</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Statutory DPDP Fine</span>
                  <span className="text-base font-bold text-rose-300">{calculations.regulatoryFineFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">Section 33 DPDP Act cap ₹250 Cr</span>
                </div>
              </div>

              {/* RTO / RPO Architectural Balance Formula Card */}
              <div className="bg-gray-900/90 p-5 rounded-xl border border-indigo-900/30 space-y-3 text-xs">
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📐</span> High-Availability Mathematics: MTBF, MTTR &amp; System Uptime
                </h4>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 font-mono text-gray-300 text-[11px] space-y-1">
                  <div>Availability (%) = [ MTBF / (MTBF + MTTR) ] × 100</div>
                  <div className="text-gray-500">// Example: MTBF = 720 hrs, MTTR = 0.25 hrs (15 mins) =&gt; 99.965% Uptime (~3.06 hrs downtime/year)</div>
                  <div>Annual Loss Expectancy (ALE) = Single Loss Expectancy (SLE) × Annualized Rate of Occurrence (ARO)</div>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Notice how increasing recovery capabilities (lowering RTO and RPO) drastically compresses financial blast radius. 
                  Investing ₹50 Lakhs in multi-region active-active clusters prevents tens of Crores in statutory liabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architecture Flowcharts */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Architectural Flowcharts
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Anatomy of a Multi-Stage CIA Breach vs. Layered Zero-Trust Defense Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Anatomy of a Multi-Stage CIA Breach */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Diagram A: Anatomy of a Multi-Stage CIA Breach (Target &amp; Equifax Pattern)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 520 340" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Initial Entry */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="140" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="90" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">1. Initial Foothold</text>
                    <text x="90" y="62" fill="#94a3b8" textAnchor="middle" fontSize="9">Phished Vendor / Web Exploit</text>
                    <text x="90" y="75" fill="#f43f5e" textAnchor="middle" fontSize="8">(e.g., CVE-2017-5638)</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <path d="M 160 55 L 200 55" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrowRed)" />

                  {/* Step 2: Flat Network Lateral Move */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="205" y="20" width="145" height="70" rx="8" fill="#311025" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="277" y="45" fill="#fecdd3" fontWeight="bold" textAnchor="middle" fontSize="11">2. Lateral Movement</text>
                    <text x="277" y="62" fill="#fda4af" textAnchor="middle" fontSize="9">Unsegmented Flat VLAN</text>
                    <text x="277" y="75" fill="#f87171" textAnchor="middle" fontSize="8">Trust Boundary Failure</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <path d="M 350 55 L 390 55" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrowRed)" />

                  {/* Step 3: Privilege Escalation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="395" y="20" width="105" height="70" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="447" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">3. Privilege Gain</text>
                    <text x="447" y="62" fill="#fca5a5" textAnchor="middle" fontSize="9">Domain Admin /</text>
                    <text x="447" y="75" fill="#fca5a5" textAnchor="middle" fontSize="8">IAM Credential Thefts</text>
                  </g>

                  {/* Vertical Connection Arrow */}
                  <path d="M 447 90 L 447 135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Middle Box: The Inspection Blind Spot */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="80" y="135" width="420" height="75" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                    <text x="290" y="160" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="11">CRITICAL BLIND SPOT: Expired Certificate / Unmonitored Egress</text>
                    <text x="290" y="178" fill="#a1a1aa" textAnchor="middle" fontSize="9">IPS Appliances Blinded • Database Subnet Permitted Direct Outbound HTTP/FTP</text>
                    <text x="290" y="195" fill="#ef4444" textAnchor="middle" fontSize="9">Dwell Time: 76 Days Undetected Data Harvesting</text>
                  </g>

                  {/* Downward Arrow */}
                  <path d="M 290 210 L 290 245" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />

                  {/* Bottom Impact Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="40" y="245" width="440" height="75" rx="8" fill="#3f0e1d" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="260" y="270" fill="#ffe4e6" fontWeight="bold" textAnchor="middle" fontSize="12">CATASTROPHIC IMPACT: 147M Records Exfiltrated</text>
                    <text x="260" y="288" fill="#fda4af" textAnchor="middle" fontSize="9.5">Confidentiality Lost • ₹11,500 Crores Financial Recovery Cost</text>
                    <text x="260" y="304" fill="#fecdd3" textAnchor="middle" fontSize="8.5">Executive Resignations (CEO / CIO / CISO) • Mandatory Class Action Settlement</text>
                  </g>

                  {/* Marker Defs */}
                  <defs>
                    <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: Attackers leverage single entry points, traverse flat subnets, and exfiltrate data when inspection certificates expire.
              </p>
            </div>

            {/* Diagram 2: Layered Defense-in-Depth Zero Trust Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡</span> Diagram B: Layered Defense-in-Depth &amp; Zero Trust Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 520 340" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Layer 1: Edge */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="480" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="40" y="45" fill="#a7f3d0" fontWeight="bold" fontSize="11">LAYER 1: Edge &amp; DNS Protection</text>
                    <text x="40" y="60" fill="#6ee7b7" fontSize="9">BGP Anycast Routing • DDoS Scrubbing Centers • Dual DNS Provider Redundancy</text>
                    <circle cx="475" cy="47" r="10" fill="#047857" />
                    <text x="475" y="51" fill="#ecfdf5" fontWeight="bold" textAnchor="middle" fontSize="10">A</text>
                  </g>

                  {/* Layer 2: Perimeter & WAF */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="85" width="480" height="55" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="40" y="110" fill="#cbd5e1" fontWeight="bold" fontSize="11">LAYER 2: Web Application Firewall &amp; Identity</text>
                    <text x="40" y="125" fill="#94a3b8" fontSize="9">FIDO2 Passkeys / MFA • OWASP Top 10 Rules • TLS 1.3 Strict Cipher Suites</text>
                    <circle cx="475" cy="112" r="10" fill="#334155" />
                    <text x="475" y="116" fill="#f8fafc" fontWeight="bold" textAnchor="middle" fontSize="10">C</text>
                  </g>

                  {/* Layer 3: Micro-Segmentation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="150" width="480" height="55" rx="8" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="40" y="175" fill="#e0e7ff" fontWeight="bold" fontSize="11">LAYER 3: Zero Trust Micro-Segmentation (mTLS)</text>
                    <text x="40" y="190" fill="#a5b4fc" fontSize="9">Mutual TLS Service Mesh • Ephemeral JIT Access • Block Unauthenticated Egress</text>
                    <circle cx="475" cy="177" r="10" fill="#4338ca" />
                    <text x="475" y="181" fill="#eef2ff" fontWeight="bold" textAnchor="middle" fontSize="10">I</text>
                  </g>

                  {/* Layer 4: Storage & HSM */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="215" width="480" height="55" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
                    <text x="40" y="240" fill="#bbf7d0" fontWeight="bold" fontSize="11">LAYER 4: Hardware Security Modules &amp; Column Encryption</text>
                    <text x="40" y="255" fill="#86efac" fontSize="9">PCI-DSS HSM Tokenization • AES-256-GCM Field Level Encryption • Immutable WORM Logs</text>
                    <circle cx="475" cy="242" r="10" fill="#15803d" />
                    <text x="475" y="246" fill="#f0fdf4" fontWeight="bold" textAnchor="middle" fontSize="10">C+I</text>
                  </g>

                  {/* Layer 5: Disaster Recovery */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="280" width="480" height="45" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="40" y="302" fill="#bae6fd" fontWeight="bold" fontSize="11">LAYER 5: Active-Active Multi-Region Resiliency (RTO &lt; 5m / RPO = 0)</text>
                    <text x="40" y="316" fill="#7dd3fc" fontSize="8.5">Synchronous Cross-Region Database Clustering • Chaos Engineering Validation</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: Modern multi-layer defense ensures that breaching any single ring does not compromise data confidentiality or service availability.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Critical Infrastructure Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Analyze how senior lead architects balance C-I-A trade-offs across Kolkata, Ichapur, Barrackpore, and Jadavpur systems.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Security Budget</span>
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
                  <span>🛡</span> Robust Architectural Remedy
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.architecturalRemedy}</p>
              </div>
            </div>

            {/* Metrics Achieved */}
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
              Industry habits used by seasoned architects to prevent multi-crore breach failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Professional Tips &amp; Tricks
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate SSL Expiry Alerts:</strong> Integrate Prometheus certificate expiry metrics alerting 30 days before deadline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Egress Lockdown:</strong> Block all outbound internet traffic from SQL subnets to eliminate data exfiltration routes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Canary Tokens:</strong> Plant fake database credentials in internal code repositories as instant tripwires.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Decouple OT from IT:</strong> Ensure physical water/electricity valves operate during complete corporate IT outages.</span>
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
                  <span><strong>Air-Gap Complacency:</strong> Assuming physical disconnect prevents malware (Stuxnet used contractor USBs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confidentiality Tunnel Vision:</strong> Neglecting Integrity and Availability until physical assets are destroyed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Flat Network Architecture:</strong> Permitting vendor portals to communicate directly with Cardholder Data subnets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Non-Cryptographic Checksums:</strong> Relying on CRC32 instead of HMAC-SHA256 for tampering detection.</span>
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
                  <span><strong>Assume Breach (Zero Trust):</strong> Design micro-segments assuming external firewalls will fail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Immutable WORM Logging:</strong> Store audit logs on write-once storage to prevent retrospective evidence wiping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Continuous Chaos Testing:</strong> Regularly simulate regional data center outages to test automated failovers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Hardware Root of Trust:</strong> Bind device client certificates to TPM chips for cryptographic identity proof.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize your understanding of case studies before tackling the comprehensive practice questions.
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
                  Why Equifax's 9-month expired SSL certificate completely neutralized their multimillion-rupee Intrusion Detection System (IDS), turning an encrypted pipe into a black hole.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Stuxnet's genius lay not in breaking centrifuges immediately, but in spoofing 21 seconds of normal telemetry, exploiting human trust in digital dashboards.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future API designs, replace simple CRC32 checksums with HMAC-SHA256 nonces and enforce strict egress firewall filters on all database containers.
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
                <span>Equifax: CVE-2017-5638 + Expired SSL cert.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stuxnet: PLC MitM + Telemetry Spoofing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Mirai Dyn: 1.2 Tbps DNS Water Torture flood.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Target: HVAC vendor + Flat unsegmented LAN.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Colonial: Inactive VPN without MFA.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act: Up to ₹250 Crores statutory cap.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="CIA Triad Implementation Case Studies FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="CIA Triad Implementation Case Studies (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: When studying cyber security case studies, never treat them as mere historical trivia. Every major breach in history—whether Equifax, Stuxnet, or Colonial Pipeline—happened because an engineering team ignored basic fundamentals: unpatched web libraries, unmonitored egress traffic, expired inspection certificates, or flat networks lacking micro-segmentation. In your BCA exams and professional careers, remember: sophisticated attackers don't always use zero-day exploits; they simply exploit the mundane administrative blind spots we leave behind."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
