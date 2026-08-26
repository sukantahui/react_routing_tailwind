import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Active Audit Log Event Key
  const [selectedEventKey, setSelectedEventKey] = useState("event_iam_escalation");

  // Studio 2: Active Forensic Pillar Key
  const [selectedPillarKey, setSelectedPillarKey] = useState("pillar_worm_storage");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_worm_trail");

  // Studio 1: Audit Trail 5 Ws + 1 H Log Data
  const logEvents = {
    event_iam_escalation: {
      key: "event_iam_escalation",
      title: "Event 1: Unauthorized AWS IAM Admin Escalation",
      service: "AWS CloudTrail & IAM Audit Log",
      fiveWs: {
        who: "mamata.admin@payshield.in (IAM User Principal, MFA Verified)",
        what: "Attached IAM Policy 'AdministratorAccess' to Role 'prod-deploy-agent'",
        when: "2026-08-23T02:15:00.124Z (Stratum-1 NTP Synchronized)",
        where: "Source IP 103.120.45.18 (Kolkata VPN Endpoint, VPC Peering #vpc-9812)",
        why: "Change Request #CR-8812 (Emergency Hotfix Deployment Authorization)",
        how: "AWS Management Console via TLS 1.3 / FIDO2 Hardware WebAuthn"
      },
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      tamperStatus: "VERIFIED TAMPER-PROOF (Hash chain intact in AWS S3 Object Lock)",
      finding: "Conforms to ISO 27001 Control A.8.15 & CERT-In 180-day logging mandate. Complete attribution established.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    event_banking_transfer: {
      key: "event_banking_transfer",
      title: "Event 2: High-Value Core Banking Wire Transfer (₹45,00,000)",
      service: "Core Banking Transaction Engine & ISO 20022 Switch",
      fiveWs: {
        who: "debangshu.teller@finbank.co.in (Employee ID: WB-44910)",
        what: "RTGS Outward Credit of ₹45,00,000 to Beneficiary Acc #90812234",
        when: "2026-08-23T02:22:15.892Z (National Physical Laboratory NTP Sync)",
        where: "Branch Terminal #TRM-04 (Barrackpore High-Street Branch, Static MAC 00:1A:2B:3C:4D:5E)",
        why: "Commercial Invoice Settlement #INV-2026-0891 (Dual-Custodian Signed)",
        how: "Internal Core Banking API via Mutual TLS 1.3 + Dual Biometric Fingerprint Auth"
      },
      sha256Hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      tamperStatus: "VERIFIED TAMPER-PROOF (Immutable WORM Ledger with HSM Signing)",
      finding: "Meets RBI Master Directions & Section 63 BSA 2023 electronic evidence standards. Dual-authorization verified.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    event_scada_breaker_override: {
      key: "event_scada_breaker_override",
      title: "Event 3: SCADA Substation Breaker Remote Override",
      service: "Industrial OT SCADA Telemetry & Modbus/DNP3 Event Recorder",
      fiveWs: {
        who: "SCADA_AUTO_CONTROLLER (Service Account UID: 100)",
        what: "Modbus Function Code 05 (Force Single Coil): Trip 220kV Feeder Breaker #CB-14",
        when: "2026-08-23T02:28:44.015Z (GPS Clocks Sub-Millisecond Sync)",
        where: "Substation RTU 192.168.40.12 (Barrackpore 220kV Grid Substation)",
        why: "Automated Overcurrent Fault Protection Trigger (&gt;1200 Amperes Surge)",
        how: "Hardened Serial-over-IP Gateway via Encrypted IPsec Tunnel"
      },
      sha256Hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      tamperStatus: "VERIFIED TAMPER-PROOF (Digital Substation SER Sequence of Events)",
      finding: "Conforms to NCIIPC Critical Information Infrastructure guidelines. Forensic reconstruction fully validated.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeEvent = logEvents[selectedEventKey];

  // Studio 2: Forensic Readiness 6-Pillar Data
  const forensicPillars = {
    pillar_time_sync: {
      key: "pillar_time_sync",
      name: "Pillar 1: NTP Stratum-1 Time Synchronization",
      standard: "ISO/IEC 27043 Section 8.2 & RFC 5905",
      safeguard: "Stratum-1 GPS-synchronized NTP servers across all firewalls, cloud instances, and databases (<5ms drift).",
      statutoryMandate: "CERT-In Cyber Security Directions 2022 Mandate 2 (Mandatory NTP Time Server Alignment).",
      courtImpact: "Essential for correlating multi-stage attacks across disparate servers without chronological ambiguity.",
      readinessScore: "100% Chronological Defense",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    pillar_worm_storage: {
      key: "pillar_worm_storage",
      name: "Pillar 2: Immutable WORM Storage (180 Days)",
      standard: "ISO/IEC 27043 Section 9.1 & ISO 27001 A.8.15",
      safeguard: "AWS S3 Object Lock in Compliance Mode; prevents deletion or modification even by AWS root account.",
      statutoryMandate: "CERT-In Directions 2022 Mandate 1 (Rolling 180-Day ICT log retention within Indian jurisdiction).",
      courtImpact: "Prevents anti-forensics attacks and claims of retroactive log fabrication or evidence spoliation.",
      readinessScore: "100% Anti-Tamper Shield",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    pillar_crypto_hashing: {
      key: "pillar_crypto_hashing",
      name: "Pillar 3: Cryptographic Evidence Hashing (SHA-256)",
      standard: "ISO/IEC 27037 Section 6.4 & FIPS 180-4",
      safeguard: "Automated real-time SHA-256 HMAC Merkle hash chaining across all incoming syslog data streams.",
      statutoryMandate: "IT Act 2000 Section 65B & Bharatiya Sakshya Adhiniyam 2023 Section 63.",
      courtImpact: "Provides mathematical proof that not a single bit of the digital evidence was altered after collection.",
      readinessScore: "100% Cryptographic Integrity",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    pillar_chain_of_custody: {
      key: "pillar_chain_of_custody",
      name: "Pillar 4: Chain of Custody & Legal Hold Workflows",
      standard: "ISO/IEC 27037 Section 7.2 & ISO/IEC 27042",
      safeguard: "Automated legal hold freezes on S3 buckets and timestamped forensic evidence custody transfer ledgers.",
      statutoryMandate: "Code of Criminal Procedure (CrPC) & Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023.",
      courtImpact: "Eliminates legal challenges regarding who handled, transferred, or accessed the evidence drive.",
      readinessScore: "100% Judicial Admissibility",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    pillar_cirt_responders: {
      key: "pillar_cirt_responders",
      name: "Pillar 5: Certified Incident Response Responders (CIRT)",
      standard: "ISO/IEC 27035 Section 5.3 & NIST SP 800-61",
      safeguard: "24/7 dedicated Cyber Incident Response Team trained in live memory triage, volatility capture, and forensics.",
      statutoryMandate: "CERT-In 6-Hour Incident Notification Rule & DPDP Act 2023 Data Fiduciary Safeguards.",
      courtImpact: "Ensures evidence is captured using forensically sound tools without altering volatile RAM state.",
      readinessScore: "100% First Responder Triage",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    pillar_sec63_bsa_cert: {
      key: "pillar_sec63_bsa_cert",
      name: "Pillar 6: Section 63 BSA 2023 Legal Certification",
      standard: "Bharatiya Sakshya Adhiniyam 2023 Section 63 (formerly Sec 65B IEA 1872)",
      safeguard: "Automated generation of electronic record custody certificates signed by authorized Technical Officer.",
      statutoryMandate: "Mandatory statutory requirement for admitting computer logs as evidence in Indian courts.",
      courtImpact: "Direct judicial admissibility in high courts and specialized commercial cybersecurity tribunals.",
      readinessScore: "100% Legal Admissibility",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activePillar = forensicPillars[selectedPillarKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_worm_trail",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "180-Day WORM Audit Trail Across 500 Microservices",
      budget: "₹18,50,000",
      challenge: "UPI Payment Switch Processing ₹120 Crores Daily Faced CERT-In 180-Day Log Mandate",
      dilemma:
        "500 payment microservices generated 45 million logs daily, requiring immutable storage within Indian territory to comply with CERT-In 180-day directions while supporting rapid forensic queries.",
      resolution:
        "Mamata deployed AWS S3 Object Lock in Compliance Mode with SHA-256 HMAC chains across 500 payment pods, achieving 100% compliance with CERT-In directions and proving tamper-proof transaction forensics.",
      metrics: {
        dailyLogVolume: "45 Million Logs",
        wormRetention: "180-Day Compliance Mode",
        queryLatency: "< 850ms via Athena",
        compliance: "CERT-In Directions & PCI-DSS v4.0"
      }
    },
    {
      id: "ichapur_bsa_pacs_forensics",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Section 63 BSA Admissible PACS Biopsy Forensics",
      budget: "₹8,20,000",
      challenge: "80,000 Oncology Biopsy Scans Required Verifiable Audit Trails for Legal Trial Inquiries",
      dilemma:
        "Hospital network faced cross-border legal inquiry regarding clinical trial patient consent authenticity and needed court-admissible audit trails for 80,000 digital pathology biopsy DICOM records.",
      resolution:
        "Mahima implemented automated legal hold workflows, Stratum-1 NTP synchronization, and digital Section 63 BSA certificates, successfully defending clinical research data against US FDA and Indian regulatory scrutiny.",
      metrics: {
        pacsScansProtected: "80,000 DICOM Scans",
        legalAdmissibility: "100% Section 63 BSA Passed",
        timeDrift: "< 2.1ms via NPL Clock",
        compliance: "BSA 2023 Sec 63 & DPDP Act Sec 8"
      }
    },
    {
      id: "barrackpore_scada_breaker_audit",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA Modbus Breaker Incident Reconstruction",
      budget: "₹14,80,000",
      challenge: "High-Voltage Substation Experienced Unauthorized Remote Circuit Breaker Trip Command",
      dilemma:
        "Breaker #CB-14 tripped unexpectedly during peak load hours, with rogue Modbus commands suspected over internal microwave substation links.",
      resolution:
        "Debangshu reconstructed Modbus audit trails, matched NTP timestamps across 18 substations, identified rogue maintenance laptop, and presented court-admissible forensic docket to state law enforcement.",
      metrics: {
        substationsCorrelated: "18 High-Voltage Sites",
        timelineAccuracy: "1.2ms GPS Correlation",
        rogueDeviceAttributed: "100% Definite IP/MAC",
        compliance: "IT Act Sec 70 & NCIIPC Charter"
      }
    },
    {
      id: "jadavpur_forensic_readiness_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Audit Trail Log Reconstruction & Readiness Lab",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Correlate Multi-Source Logs and Understand Legal Hash Chain Validation",
      dilemma:
        "Cybersecurity students lacked hands-on experience correlating SIEM logs across disparate timezones and executing Merkle hash chain mathematical verification.",
      resolution:
        "The team developed an interactive Audit Trail Log Reconstruction & Forensic Readiness Simulator in React, training 215+ BCA cyber security students on forensic timeline analysis and Section 63 BSA compliance.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        logStreamsSimulated: "120,000 Synthetic Events",
        examMastery: "100% Forensic Readiness",
        compliance: "ISO/IEC 27043 & NCIIPC Charter"
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 8 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Audit Trail Analysis and Forensic Readiness
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the 5 Ws + 1 H of audit trail analysis, implement immutable WORM storage to meet CERT-In's mandatory 180-day retention mandate, 
            and build a 6-pillar forensic readiness framework compliant with Section 63 of the Bharatiya Sakshya Adhiniyam (BSA) 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Audit Trail 5 Ws + 1 H Log Reconstruction Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📜</span> Studio 1: Audit Trail 5 Ws + 1 H Log Reconstruction Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a critical enterprise log event to inspect its 5 Ws + 1 H parameters (Who, What, When, Where, Why, How), SHA-256 HMAC integrity hash, and forensic finding.
            </p>
          </div>

          {/* Event Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(logEvents).map((ev) => {
              const isSelected = selectedEventKey === ev.key;
              return (
                <button
                  key={ev.key}
                  onClick={() => setSelectedEventKey(ev.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{ev.title.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{ev.service}</div>
                </button>
              );
            })}
          </div>

          {/* Active Log Event Details Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeEvent.badgeClass)}>
                  {activeEvent.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Source: {activeEvent.service}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Integrity: <span className="text-emerald-400 font-bold">{activeEvent.tamperStatus.split(" ")[0]}</span>
              </div>
            </div>

            {/* 5 Ws + 1 H Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs font-mono">
              {/* WHO */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">[WHO] Authenticated Actor:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeEvent.fiveWs.who}</p>
              </div>

              {/* WHAT */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-cyan-900/40 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">[WHAT] System Action / Command:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-sans font-semibold">{activeEvent.fiveWs.what}</p>
              </div>

              {/* WHEN */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">[WHEN] NTP UTC Timestamp:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeEvent.fiveWs.when}</p>
              </div>

              {/* WHERE */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-purple-900/40 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">[WHERE] Source IP / Terminal:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeEvent.fiveWs.where}</p>
              </div>

              {/* WHY */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-amber-900/40 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">[WHY] Business Context / Ticket:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeEvent.fiveWs.why}</p>
              </div>

              {/* HOW */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">[HOW] Protocol &amp; Auth Method:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeEvent.fiveWs.how}</p>
              </div>
            </div>

            {/* SHA-256 Hash & Forensic Finding */}
            <div className="space-y-3">
              <div className="p-3.5 bg-gray-900 rounded-xl border border-gray-800 text-xs font-mono space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">
                  Cryptographic SHA-256 HMAC Hash (Merkle Chain Node):
                </span>
                <p className="text-emerald-400 text-[11px] break-all">{activeEvent.sha256Hash}</p>
              </div>

              <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">
                  Forensic Finding &amp; Statutory Compliance:
                </span>
                <p className="text-gray-300 text-xs sm:text-sm font-sans mt-0.5">{activeEvent.finding}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Forensic Readiness 6-Pillar Maturity Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛</span> Studio 2: Forensic Readiness 6-Pillar Maturity Engine (ISO/IEC 27043)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a forensic readiness pillar to inspect its international standard, technical safeguard implementation, Indian statutory mandate, and court admissibility impact.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.values(forensicPillars).map((fp) => {
              const isSelected = selectedPillarKey === fp.key;
              return (
                <button
                  key={fp.key}
                  onClick={() => setSelectedPillarKey(fp.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs font-mono",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{fp.name.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{fp.name.split(": ")[0]}</div>
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
                  Standard: {activePillar.standard}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Readiness: <span className="text-emerald-400 font-bold">{activePillar.readinessScore}</span>
              </div>
            </div>

            {/* Safeguard & Statutory Mandate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Technical Safeguard Implementation:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activePillar.safeguard}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Indian Statutory Mandate:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activePillar.statutoryMandate}</p>
              </div>
            </div>

            {/* Judicial & Court Admissibility Impact */}
            <div className="p-4 bg-gray-900 rounded-xl border border-purple-900/30 space-y-1.5 text-xs font-mono">
              <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">
                Judicial Court Admissibility &amp; Evidentiary Value:
              </span>
              <p className="text-gray-300 text-xs sm:text-sm font-sans">{activePillar.courtImpact}</p>
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
              Visualizing the 6-Pillar Forensic Readiness Architecture and Tamper-Evident Cryptographic Merkle Hash Chains.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 6 Pillars of Forensic Readiness */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 6 Pillars of Forensic Readiness (ISO/IEC 27043)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: NTP */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="135" height="42" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="92" y="44" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">1. NTP TIME SYNC</text>
                    <text x="92" y="56" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Stratum-1 &lt; 5ms</text>
                  </g>

                  {/* Top: WORM */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="25" width="135" height="42" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="247" y="44" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">2. WORM STORAGE</text>
                    <text x="247" y="56" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">180-Day S3 Lock</text>
                  </g>

                  {/* Top: Hashing */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="335" y="25" width="135" height="42" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="402" y="44" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">3. CRYPTO HASH</text>
                    <text x="402" y="56" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">SHA-256 Chains</text>
                  </g>

                  {/* Connecting Lines */}
                  <line x1="92" y1="67" x2="247" y2="135" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="247" y1="67" x2="247" y2="135" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="402" y1="67" x2="247" y2="135" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Central Hub */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="247" cy="160" r="38" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="247" y="156" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">FORENSIC</text>
                    <text x="247" y="169" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="7">READINESS</text>
                  </g>

                  {/* Bottom: Chain of Custody */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="240" width="135" height="42" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="92" y="259" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7.5">4. CUSTODY HOLD</text>
                    <text x="92" y="271" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">Legal Hold Lock</text>
                  </g>

                  {/* Bottom: CIRT */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="240" width="135" height="42" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="247" y="259" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7.5">5. CIRT TEAM</text>
                    <text x="247" y="271" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6">24/7 First Triage</text>
                  </g>

                  {/* Bottom: BSA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="335" y="240" width="135" height="42" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="402" y="259" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="7.5">6. SEC 63 BSA</text>
                    <text x="402" y="271" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6">Court Certificate</text>
                  </g>

                  <line x1="92" y1="240" x2="247" y2="198" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="247" y1="240" x2="247" y2="198" stroke="#a855f7" strokeWidth="1.5" />
                  <line x1="402" y1="240" x2="247" y2="198" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The 6-pillar forensic readiness architecture under ISO/IEC 27043.
              </p>
            </div>

            {/* Diagram 2: Merkle Hash Chains */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Tamper-Evident Merkle Hash Chain
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Block 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="130" height="75" rx="5" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="85" y="50" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">LOG ENTRY #1</text>
                    <text x="85" y="65" fill="#94a3b8" font-family="monospace" textAnchor="middle" fontSize="6">"User login ok"</text>
                    <text x="85" y="80" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">H1 = SHA256(E1)</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <line x1="150" y1="67" x2="185" y2="67" stroke="#10b981" strokeWidth="2" />

                  {/* Block 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="30" width="130" height="75" rx="5" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="50" fill="#cffafe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">LOG ENTRY #2</text>
                    <text x="250" y="65" fill="#94a3b8" font-family="monospace" textAnchor="middle" fontSize="6">"File downloaded"</text>
                    <text x="250" y="80" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">H2 = SHA256(E2 + H1)</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <line x1="315" y1="67" x2="350" y2="67" stroke="#06b6d4" strokeWidth="2" />

                  {/* Block 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="30" width="130" height="75" rx="5" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="415" y="50" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">LOG ENTRY #3</text>
                    <text x="415" y="65" fill="#94a3b8" font-family="monospace" textAnchor="middle" fontSize="6">"Admin escalation"</text>
                    <text x="415" y="80" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">H3 = SHA256(E3 + H2)</text>
                  </g>

                  {/* Tamper Warning Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="150" width="460" height="65" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="175" fill="#fee2e2" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      TAMPER DETECTION IN ACTION:
                    </text>
                    <text x="250" y="195" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Deleting or editing Entry #2 invalidates Hash H3 immediately, proving evidence tampering!
                    </text>
                  </g>

                  <text x="250" y="255" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Cryptographic chaining makes retroactive log deletion mathematically impossible.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: Tamper-evident cryptographic Merkle hash chain in audit logs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Forensic Readiness Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads implement WORM storage in Kolkata, govern clinical PACS in Ichapur, reconstruct SCADA breaker trips in Barrackpore, and simulate Merkle chains in Jadavpur.
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
                  <span>⚡</span> Forensics Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Forensic Analysts and Information Security Auditors managing audit trails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Forensic Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Lock to Stratum-1 NTP:</strong> Ensure all servers sync within 5ms to enable timeline forensics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enable S3 Object Lock:</strong> Enforce WORM storage in Compliance Mode for 180 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Mirror Logs Remotely:</strong> Stream logs off-host before attackers execute local cleanup scripts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate BSA Certificates:</strong> Generate Section 63 BSA certificates at evidence export.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Forensic Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Local-Only Logging:</strong> Leaving logs on servers where `wevtutil` can wipe them instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unsynchronized Clocks:</strong> Relying on un-synced clocks, destroying event correlation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>30-Day Log Purging:</strong> Violating CERT-In Directions 2022 180-day retention mandate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Broken Chain of Custody:</strong> Failing to record who transferred forensic disk images.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Alert on Event ID 1102:</strong> Trigger immediate Severity-1 alerts when logs are cleared.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Merkle Hash Chains:</strong> Cryptographically link logs to prove zero record omissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Legal Holds:</strong> Freeze S3 lifecycle deletions instantly upon regulatory notice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Claim DPDP Safe Harbor:</strong> Present forensic timelines to prove non-negligence to DPBI.</span>
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
              Synthesize audit trail parameters, WORM storage engineering, and forensic readiness pillars before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Forensic Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why forensic readiness must be engineered before an incident occurs: If an enterprise waits until a breach occurs to configure Stratum-1 NTP, enable S3 Object Lock, and train incident responders, the attacker will have already wiped local logs and modified timestamps, making judicial prosecution and DPDP statutory safe harbor impossible.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The relationship between CERT-In 180-day log mandates and Section 63 of the Bharatiya Sakshya Adhiniyam (BSA) 2023: CERT-In mandates that logs must be retained for 180 days within India. To admit those logs as legal evidence in Indian courts, an authorized technical officer must execute a Section 63 BSA certificate confirming system custody and hash integrity.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud architectures, configure AWS S3 Object Lock in Compliance Mode for 180 days and implement cryptographic SHA-256 Merkle hash chaining on all syslog streams to achieve instant forensic readiness.
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
                <span>Audit Trail 5 Ws + 1 H: Who, What, When, Where, Why, How.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions 2022 mandate 180-DAY rolling log retention within India.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 63 BSA 2023 governs electronic record admissibility in Indian courts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>WORM S3 Object Lock in Compliance Mode prevents log deletion even by root.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stratum-1 NTP synchronization ensures sub-millisecond timeline accuracy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Proactive forensic readiness under DPDP Act Section 8 shields from ₹250 Cr fines.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Audit Trail Analysis &amp; Forensic Readiness FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Forensic Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Audit Trail Analysis and Forensic Readiness (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Audit Trail Analysis and Forensic Readiness represent the ultimate bridge between Information Security Auditing, Digital Forensics, and Cyber Law. Always remember: in a court of law or regulatory investigation, if it wasn't logged with Stratum-1 NTP timestamps and preserved in immutable WORM storage, it never happened! Master the 5 Ws + 1 H, enforce CERT-In's mandatory 180-day retention rule, implement cryptographic Merkle hash chains, and automate Section 63 BSA 2023 evidence certification to guarantee complete judicial admissibility and regulatory safe harbor!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
