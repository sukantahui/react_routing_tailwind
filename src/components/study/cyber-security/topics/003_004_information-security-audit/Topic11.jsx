import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  // Studio 1 State: Enterprise Banking & FinTech Audit Architecture Simulator
  const [selectedSubsystem, setSelectedSubsystem] = useState("cbs");
  const [activeAuditTest, setActiveAuditTest] = useState("dba_access");
  const [testExecuted, setTestExecuted] = useState(false);
  const [auditVerdict, setAuditVerdict] = useState(null);

  // Studio 2 State: Real-World Banking Case Studies & CAPA Engine
  const [selectedCase, setSelectedCase] = useState("kolkata_cbs");
  const [activeStage, setActiveStage] = useState("fieldwork");
  const [capaActionTaken, setCapaActionTaken] = useState(false);

  // Subsystem definitions for Studio 1
  const subsystems = {
    cbs: {
      title: "Core Banking Solution (CBS)",
      lead: "Mamata (Lead Auditor, Kolkata)",
      framework: "RBI Cyber Security Framework & Master Directions",
      desc: "Central ledger engine (Finacle / BaNCS) processing ₹50,000+ Crores in deposit, loan, and clearing transactions.",
      tests: {
        dba_access: {
          name: "Direct Database Access (DDA) Test",
          procedure: "Attempt direct SQL UPDATE query on customer ledger balance table using DBA administrative credentials.",
          expectedControl: "Direct DDA disabled in production. Access strictly gated through Privileged Access Management (PAM) with dual authorization and immutable recording.",
          simulatedFinding: "DBA executed UPDATE accounts SET balance = balance + 1000000 WHERE acc_no = '1004829' without maker-checker approval or PAM session logging.",
          classification: "Major Non-Conformity",
          clause: "RBI Cyber Security Framework Clause 4.2 & ISO 27001:2022 Control A.8.2"
        },
        maker_checker: {
          name: "Maker-Checker Segregation of Duties Test",
          procedure: "Attempt transaction initiation and approval from the same branch teller user account.",
          expectedControl: "System enforces programmatic four-eyes principle; Maker ID cannot approve transactions under any circumstance.",
          simulatedFinding: "System successfully rejected self-approval with HTTP 403 Forbidden: 'Maker and Checker user IDs cannot match.'",
          classification: "Conformity (Effective Control)",
          clause: "RBI IT Governance Guidelines Section 6.1"
        },
        eod_batch: {
          name: "End-of-Day (EOD) Batch Integrity Check",
          procedure: "Verify cryptographic SHA-256 signatures of automated interest calculation scripts before nightly batch execution.",
          expectedControl: "All batch script files must have digital signatures validated against the change management baseline.",
          simulatedFinding: "Nightly batch cron job runs an unhashed bash script modified 4 days ago by a third-party vendor without change ticket.",
          classification: "Minor Non-Conformity",
          clause: "RBI Master Directions IT Controls 8.4"
        }
      }
    },
    upi: {
      title: "NPCI UPI & IMPS Real-Time Switch",
      lead: "Mahima (Payment Security Lead, Sector V)",
      framework: "NPCI UPI Procedural Guidelines & RBI PSO Mandates",
      desc: "Microsecond transaction switch routing inter-bank instant payments with hardware cryptographic validation.",
      tests: {
        hsm_ceremony: {
          name: "Payment HSM Key Ceremony & Dual Custody Audit",
          procedure: "Inspect physical key custodian smartcards, tamper-evident envelopes, and Zone Master Key (ZMK) rotation records.",
          expectedControl: "Split knowledge and dual control with 2 distinct key custodians storing smartcard components in separate dual-combination safes.",
          simulatedFinding: "Both HSM smartcard component PIN envelopes were found inside the same unlocked drawer in the primary datacenter NOC.",
          classification: "Major Non-Conformity",
          clause: "PCI HSM v3.0 & NPCI Security Guidelines Rule 12.3"
        },
        tls_pinning: {
          name: "Mobile UPI TLS & Certificate Pinning Test",
          procedure: "Intercept UPI MPIN authentication request from mobile app using Burp Suite proxy with installed user CA certificate.",
          expectedControl: "Mobile app enforces public key pinning and immediately terminates TLS handshake upon detecting rogue proxy certificate.",
          simulatedFinding: "Mobile application successfully threw SSLHandshakeException: 'Public key hash mismatch' and aborted connection.",
          classification: "Conformity (Effective Control)",
          clause: "NPCI Mobile Banking Security Standard 4.1"
        },
        rate_limiting: {
          name: "UPI API High-Velocity Flood & Anomaly Test",
          procedure: "Simulate 5,000 automated MPIN verification attempts per minute against the mobile banking REST API endpoint.",
          expectedControl: "API Gateway triggers IP/device rate limiting and account lockout after 5 consecutive failed attempts.",
          simulatedFinding: "API allowed 4,200 requests within 60 seconds without triggering CAPTCHA or IP throttling.",
          classification: "Major Non-Conformity",
          clause: "OWASP API4:2023 & RBI IT Governance 7.2"
        }
      }
    },
    pci_cde: {
      title: "Cardholder Data Environment (PCI-DSS v4.0)",
      lead: "Debangshu (Senior Assessor, Barrackpore)",
      framework: "PCI-DSS v4.0 Core Requirements 3, 7, 8, and 10",
      desc: "Tokenization vault and credit/debit card processing cluster handling 16-digit PANs and CVV authentication.",
      tests: {
        sad_storage: {
          name: "Sensitive Authentication Data (SAD) Storage Audit",
          procedure: "Perform automated string and regex scans for full track data, CVV/CVC codes, and PIN blocks across all application logs and database dumps.",
          expectedControl: "SAD must NEVER be stored post-authorization under any condition, even if encrypted.",
          simulatedFinding: "Elasticsearch application debug logs contained full 3-digit CVV codes logged during payment gateway timeout errors.",
          classification: "Major Non-Conformity",
          clause: "PCI-DSS v4.0 Requirement 3.2.1"
        },
        pan_tokenization: {
          name: "Card-on-File (CoF) Tokenization Engine Review",
          procedure: "Verify that stored merchant customer cards use cryptographically generated surrogate tokens with AES-256 encryption at rest.",
          expectedControl: "Tokens are surrogate hashes; underlying PAN is securely vaulted in a separate isolated HSM-backed zone.",
          simulatedFinding: "Merchant database stores only surrogate tokens and masked card numbers (first 6 and last 4 digits).",
          classification: "Conformity (Effective Control)",
          clause: "RBI Card-on-File Mandates & PCI-DSS Req 3.4"
        }
      }
    },
    open_banking: {
      title: "Open Banking & Micro-Lending APIs",
      lead: "Abhronila & Susmita (Researchers, Jadavpur)",
      framework: "OWASP API Security Top 10 & DPDP Act 2023",
      desc: "Public-facing REST API gateways connecting third-party FinTech lenders, credit bureaus, and account aggregators.",
      tests: {
        bola_test: {
          name: "Broken Object Level Authorization (BOLA) Tamper Test",
          procedure: "Authenticate as Customer A and modify request parameter /api/v1/credit-report?customer_id=10492 to access Customer B's report.",
          expectedControl: "API Gateway and microservice layer must cryptographically validate JWT session token against the requested customer_id.",
          simulatedFinding: "Server returned Customer B's full unmasked Aadhaar number, PAN, credit score, and bank statement.",
          classification: "Major Non-Conformity",
          clause: "OWASP API1:2023 & DPDP Act 2023 Section 8(5) (Max ₹250 Cr Penalty)"
        },
        error_leak: {
          name: "Verbose Stack Trace & Information Disclosure Test",
          procedure: "Send malformed JSON payload containing SQL escape sequences to trigger server 500 error.",
          expectedControl: "Application returns generic error message with unique reference ID; debug stack traces suppressed.",
          simulatedFinding: "API returned generic JSON: {'error': 'Internal server error', 'incident_ref': 'ERR-98402'} with zero stack traces.",
          classification: "Conformity (Effective Control)",
          clause: "OWASP API8:2023 & ISO 27001:2022 Control A.8.8"
        }
      }
    }
  };

  // Case Studies for Studio 2
  const caseStudies = {
    kolkata_cbs: {
      title: "Kolkata Scheduled Commercial Bank (₹50,000 Cr Assets)",
      lead: "Mamata (Lead Banking Audit Partner)",
      scope: "Core Banking Solution (Finacle 11e), SWIFT Gateway, and Tier-4 Datacenter in New Town, Kolkata.",
      findings: [
        {
          id: "F-01",
          title: "Direct Database Access by Production DBAs",
          type: "Major Non-Conformity",
          desc: "Two production DBAs possessed unmonitored SQL*Plus access with UPDATE rights on ledger tables.",
          rootCause: "Legacy maintenance procedure created during CBS upgrade 3 years ago was never formally revoked or reviewed.",
          capaPlan: "Deploy CyberArk PAM vault with dual-custody checkout, enforce Database Activity Monitoring (DAM) with instant Telegram/SMS alerts on balance modification queries, and revoke all direct DBA console logins.",
          evidence: "PAM checkout logs, DAM alerting rule configs, and revised DBA Access Control Policy v4.2."
        },
        {
          id: "F-02",
          title: "Unencrypted Log Backups on Secondary Storage",
          type: "Minor Non-Conformity",
          desc: "Audit logs containing masked account numbers stored on secondary NAS array without AES-256 volume encryption.",
          rootCause: "NAS storage tier was exempted from encryption policy during SAN migration.",
          capaPlan: "Enable BitLocker/LUKS volume encryption on NAS tier and rotate AWS KMS encryption keys.",
          evidence: "Storage encryption status report signed by Infrastructure Head."
        }
      ]
    },
    sectorv_neobank: {
      title: "Salt Lake Sector V FinTech Neobank & Payment Gateway",
      lead: "Mahima (Payment Assurance Director)",
      scope: "Cloud-native Kubernetes microservices cluster, Card-on-File Tokenization Vault, and UPI Merchant Switch.",
      findings: [
        {
          id: "F-03",
          title: "CVV Codes Inadvertently Logged in Exception Traces",
          type: "Major Non-Conformity",
          desc: "Payment routing microservice serialized raw request payloads containing 3-digit CVVs during gateway timeouts.",
          rootCause: "Exception logging middleware lacked regex sanitization filter for JSON cardholder objects.",
          capaPlan: "Deploy global Spring Boot interceptor masking sensitive regex patterns (CVV, PAN, MPIN) before logger output; execute certified DOD 5220.22-M cryptographic purge of historical Elasticsearch indices.",
          evidence: "Code review pull request #418, unit test suite verifying CVV redaction, and certified Elasticsearch wipe log."
        },
        {
          id: "F-04",
          title: "Lack of Device Fingerprint Rate Limiting",
          type: "Opportunity for Improvement (OFI)",
          desc: "API rate limiting was configured per IP address rather than per unique mobile hardware fingerprint.",
          rootCause: "Legacy WAF rule configured before introduction of mobile banking app.",
          capaPlan: "Implement Redis-backed sliding window rate limiter tracking combined (Device_UUID + User_ID) hashes.",
          evidence: "Kong API Gateway rate-limiting plugin configuration."
        }
      ]
    },
    barrackpore_coop: {
      title: "Barrackpore Rural Cooperative Bank",
      lead: "Debangshu (Senior Infrastructure Assessor)",
      scope: "48 branch networks across North 24 Parganas, ATM Switch WAN, and RBI Annex II Baseline Cyber Security Controls.",
      findings: [
        {
          id: "F-05",
          title: "Unencrypted ATM Switch MPLS Network Traffic",
          type: "Major Non-Conformity",
          desc: "Branch ATM PIN pads communicated with the central ATM switch across MPLS links without IPsec or MACsec encryption.",
          rootCause: "Telecom service provider assured MPLS was 'private', leading bank IT to bypass link encryption.",
          capaPlan: "Deploy hardware IPsec VPN routers at all 48 branch ATM kiosks with AES-256 tunnel encryption, dynamic key exchange, and 802.1X port authentication.",
          evidence: "IPsec tunnel status reports from Cisco ASA firewalls across all 48 branch endpoints."
        },
        {
          id: "F-06",
          title: "Branch Manager Workstations Lacking USB Lockdown",
          type: "Minor Non-Conformity",
          desc: "USB mass storage devices were enabled on branch manager PCs, risking data exfiltration.",
          rootCause: "Active Directory GPO failed to propagate to newly added branch computer accounts.",
          capaPlan: "Reconfigure Active Directory GPO enforcing USB storage block across all organizational units (OUs); deploy Trend Micro EDR endpoint agent with device control.",
          evidence: "Active Directory GPO policy report and EDR agent compliance dashboard showing 100% endpoint compliance."
        }
      ]
    },
    jadavpur_lab: {
      title: "Jadavpur University FinTech Assurance Lab",
      lead: "Abhronila & Susmita (FinTech Security Researchers)",
      scope: "Automated Banking IS Audit Simulation and Compliance Verification Engine for 215+ BCA / MCA students.",
      findings: [
        {
          id: "F-07",
          title: "BOLA Vulnerability in Account Aggregator Sandbox",
          type: "Major Non-Conformity",
          desc: "Student test API allowed querying arbitrary customer bank statements by modifying customer_id parameter.",
          rootCause: "Controller method failed to cross-reference JWT claims with database tenant ID.",
          capaPlan: "Implement Aspect-Oriented Programming (AOP) security interceptor verifying caller identity against resource owner ID before database query execution.",
          evidence: "GitHub commit with automated Postman Newman test suite testing 50 cross-tenant authorization permutations."
        }
      ]
    }
  };

  const handleRunTest = () => {
    setTestExecuted(true);
    const testData = subsystems[selectedSubsystem].tests[activeAuditTest];
    setAuditVerdict(testData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            Cyber Security Module 003_004 • Topic 11 of 12 (Capstone Module)
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Information Security Audit Case Study in Banking and FinTech
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed mt-1">
            Capstone enterprise assurance lab: master RBI Master Directions, NPCI UPI security baselines, 
            PCI-DSS v4.0 CDE controls, Core Banking Solution (CBS) audits, and automated CAPA remediation engines.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Section 1: Executive Theory & Architectural Overview */}
        <section className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
            <span className="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-400 font-bold text-xl">
              🏦
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Enterprise Banking & FinTech Audit Architecture
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Regulatory alignment, payment switches, core banking ledgers, and critical assurance controls
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-emerald-400">The 4-Pillar Banking Audit Mandate</h3>
              <p className="leading-relaxed">
                Scheduled Commercial Banks, Payment Aggregators, and FinTech Neobanks process over 
                <strong className="text-white"> ₹10 Lakh Crores daily</strong> across UPI, IMPS, NEFT, and card rails. 
                Auditors must independently evaluate controls across four interconnected regulatory pillars:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-300 text-xs sm:text-sm">
                <li><strong className="text-white">RBI Master Directions & Annexes:</strong> Board IT governance, 6-hour incident reporting to CERT-In/RBI CSITE, and baseline controls.</li>
                <li><strong className="text-white">NPCI UPI Procedural Guidelines:</strong> FIPS 140-2/3 Level 3 Hardware Security Modules (Payment HSMs) for MPIN encryption and device binding.</li>
                <li><strong className="text-white">PCI-DSS v4.0:</strong> Absolute prohibition of post-authorization Sensitive Authentication Data (SAD/CVV) storage and mandatory CoF tokenization.</li>
                <li><strong className="text-white">DPDP Act 2023:</strong> Strict fiduciary duties for customer financial PII with statutory penalties up to <span className="text-amber-400 font-bold">₹250 Crores</span> per breach.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-indigo-400">Core Banking & Cryptographic Risks</h3>
              <p className="leading-relaxed">
                Unlike generic enterprise IT systems, financial audits carry zero margin for control failure. 
                A single unauthorized Direct Database Access (DDA) or compromised Zone Master Key (ZMK) can allow 
                adversaries to manipulate core ledger balances or forge transaction approvals:
              </p>
              <div className="p-4 bg-gray-900/80 border border-gray-700/80 rounded-xl space-y-2 font-mono text-xs">
                <div className="text-amber-300 font-bold">⚠️ Critical Banking Audit Red Flags:</div>
                <div className="text-red-300">1. Production DBAs with direct SQL UPDATE privileges on ledger balance tables.</div>
                <div className="text-red-300">2. Shared root/generic service accounts bypassing Maker-Checker controls.</div>
                <div className="text-red-300">3. Raw CVV/PIN blocks logged in application debug or error logs.</div>
                <div className="text-red-300">4. Unencrypted ATM WAN traffic allowing man-in-the-middle ISO 8583 payload injection.</div>
              </div>
            </div>
          </div>

          {/* Interactive Flow Architecture Diagram */}
          <div className="mt-6 p-5 bg-gray-950/80 border border-gray-700 rounded-xl">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              High-Assurance Banking Transaction & Audit Trail Flow
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-gray-900 border border-emerald-500/40 rounded-lg">
                <div className="text-emerald-400 font-bold mb-1">1. Channel Layer</div>
                <div className="text-gray-300">Mobile App / ATM / Net Banking</div>
                <div className="text-[10px] text-gray-400 mt-1">Cert Pinning • RASP • Biometrics</div>
              </div>
              <div className="p-3 bg-gray-900 border border-indigo-500/40 rounded-lg">
                <div className="text-indigo-400 font-bold mb-1">2. API Gateway & Switch</div>
                <div className="text-gray-300">NPCI UPI / IMPS Switch</div>
                <div className="text-[10px] text-gray-400 mt-1">mTLS • Rate Limiting • WAF</div>
              </div>
              <div className="p-3 bg-gray-900 border border-purple-500/40 rounded-lg">
                <div className="text-purple-400 font-bold mb-1">3. Cryptographic HSM</div>
                <div className="text-gray-300">Payment HSM Cluster</div>
                <div className="text-[10px] text-gray-400 mt-1">LMK/ZMK • Dual Custody • FIPS 140-3</div>
              </div>
              <div className="p-3 bg-gray-900 border border-amber-500/40 rounded-lg">
                <div className="text-amber-400 font-bold mb-1">4. Core Banking (CBS)</div>
                <div className="text-gray-300">Finacle / BaNCS Ledger</div>
                <div className="text-[10px] text-gray-400 mt-1">Maker-Checker • PAM • WORM Logs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio 1: Interactive Banking Architecture & Audit Test Simulator */}
        <section className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-indigo-400 font-bold text-xl">
                ⚙️
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Enterprise Banking & FinTech Audit Simulator
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Select a banking subsystem and execute live audit test procedures to evaluate control effectiveness
                </p>
              </div>
            </div>
          </div>

          {/* Subsystem Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(subsystems).map((key) => {
              const sub = subsystems[key];
              const isSelected = selectedSubsystem === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedSubsystem(key);
                    setActiveAuditTest(Object.keys(subsystems[key].tests)[0]);
                    setTestExecuted(false);
                    setAuditVerdict(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-indigo-950/80 border-indigo-500 text-white shadow-lg shadow-indigo-950/50"
                      : "bg-gray-900/60 border-gray-700/80 text-gray-400 hover:text-gray-200 hover:bg-gray-900"
                  }`}
                >
                  <div className="text-xs font-bold truncate">{sub.title}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{sub.lead}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Subsystem Details */}
          <div className="bg-gray-950/70 border border-gray-700/80 rounded-xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{subsystems[selectedSubsystem].title}</h3>
                <p className="text-xs text-gray-400">{subsystems[selectedSubsystem].desc}</p>
              </div>
              <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-500/40 rounded-full text-xs font-mono">
                {subsystems[selectedSubsystem].framework}
              </span>
            </div>

            {/* Test Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400">Select Audit Test Procedure:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.keys(subsystems[selectedSubsystem].tests).map((testKey) => {
                  const test = subsystems[selectedSubsystem].tests[testKey];
                  const isTestSelected = activeAuditTest === testKey;
                  return (
                    <button
                      key={testKey}
                      onClick={() => {
                        setActiveAuditTest(testKey);
                        setTestExecuted(false);
                        setAuditVerdict(null);
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        isTestSelected
                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                      }`}
                    >
                      {test.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Test Procedure Details */}
            <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg space-y-3 text-xs">
              <div>
                <span className="text-gray-400 font-semibold">Audit Test Procedure: </span>
                <span className="text-gray-200">{subsystems[selectedSubsystem].tests[activeAuditTest].procedure}</span>
              </div>
              <div>
                <span className="text-emerald-400 font-semibold">Expected Control Standard: </span>
                <span className="text-gray-300">{subsystems[selectedSubsystem].tests[activeAuditTest].expectedControl}</span>
              </div>
            </div>

            {/* Run Test Button */}
            <div className="flex justify-end">
              <button
                onClick={handleRunTest}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>🔍 Execute Fieldwork Test</span>
              </button>
            </div>

            {/* Test Result / Finding Verdict */}
            {testExecuted && auditVerdict && (
              <div className="mt-4 p-4 rounded-xl border bg-gray-900/90 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Fieldwork Test Result & Audit Finding
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      auditVerdict.classification === "Major Non-Conformity"
                        ? "bg-red-950/80 text-red-300 border border-red-500"
                        : auditVerdict.classification === "Minor Non-Conformity"
                        ? "bg-amber-950/80 text-amber-300 border border-amber-500"
                        : "bg-emerald-950/80 text-emerald-300 border border-emerald-500"
                    }`}
                  >
                    {auditVerdict.classification}
                  </span>
                </div>

                <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs space-y-1">
                  <div className="text-gray-400 font-semibold">Observed Evidence / Audit Finding:</div>
                  <div className="text-gray-200 font-mono">{auditVerdict.simulatedFinding}</div>
                </div>

                <div className="text-xs text-indigo-300 font-mono">
                  <strong>Regulatory / Standard Reference:</strong> {auditVerdict.clause}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Studio 2: Real-World Case Studies & CAPA Remediation Engine */}
        <section className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-purple-950/80 border border-purple-500/40 rounded-xl text-purple-400 font-bold text-xl">
                📋
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Real-World Banking Case Studies & CAPA Engine
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Examine Kolkata, Salt Lake, Barrackpore, and Jadavpur audit engagements and verify corrective actions
                </p>
              </div>
            </div>
          </div>

          {/* Case Study Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {Object.keys(caseStudies).map((caseKey) => {
              const c = caseStudies[caseKey];
              const isSelected = selectedCase === caseKey;
              return (
                <button
                  key={caseKey}
                  onClick={() => {
                    setSelectedCase(caseKey);
                    setActiveStage("fieldwork");
                    setCapaActionTaken(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-purple-950/80 border-purple-500 text-white shadow-lg shadow-purple-950/50"
                      : "bg-gray-900/60 border-gray-700/80 text-gray-400 hover:text-gray-200 hover:bg-gray-900"
                  }`}
                >
                  <div className="text-xs font-bold truncate">{c.title}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{c.lead}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Case Study Container */}
          <div className="bg-gray-950/70 border border-gray-700/80 rounded-xl p-4 sm:p-6 space-y-6">
            <div className="border-b border-gray-800 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white">{caseStudies[selectedCase].title}</h3>
                <span className="text-xs text-purple-300 font-semibold">
                  Lead: {caseStudies[selectedCase].lead}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                <strong>Engagement Scope:</strong> {caseStudies[selectedCase].scope}
              </p>
            </div>

            {/* Stage Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "fieldwork", label: "1. Audit Findings & Non-Conformities" },
                { id: "rca", label: "2. 5-Whys Root Cause Analysis" },
                { id: "capa", label: "3. Corrective & Preventive Action (CAPA)" },
                { id: "closure", label: "4. Follow-up & Verification Evidence" }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    activeStage === st.id
                      ? "bg-purple-900/80 border-purple-400 text-purple-100"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Stage Content */}
            <div className="space-y-4">
              {caseStudies[selectedCase].findings.map((f) => (
                <div key={f.id} className="p-4 bg-gray-900 border border-gray-800 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-purple-400 font-bold">{f.id}</span>
                      <span className="font-bold text-white text-sm">{f.title}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        f.type === "Major Non-Conformity"
                          ? "bg-red-950 text-red-300 border border-red-500/50"
                          : f.type === "Minor Non-Conformity"
                          ? "bg-amber-950 text-amber-300 border border-amber-500/50"
                          : "bg-blue-950 text-blue-300 border border-blue-500/50"
                      }`}
                    >
                      {f.type}
                    </span>
                  </div>

                  {activeStage === "fieldwork" && (
                    <div className="space-y-2 text-gray-300">
                      <p><strong className="text-gray-400">Observed Non-Conformity:</strong> {f.desc}</p>
                      <div className="p-2.5 bg-gray-950 rounded border border-gray-800 text-amber-300 font-mono">
                        Audit Finding Verified: Violates RBI IT Governance & baseline control requirements.
                      </div>
                    </div>
                  )}

                  {activeStage === "rca" && (
                    <div className="space-y-2 text-gray-300">
                      <p><strong className="text-purple-400">Root Cause Identified (RCA):</strong> {f.rootCause}</p>
                      <p className="text-gray-400">
                        Auditor Assessment: The system failure occurred due to lack of periodic privilege re-certification 
                        and missing automated control gates in the deployment pipeline.
                      </p>
                    </div>
                  )}

                  {activeStage === "capa" && (
                    <div className="space-y-2 text-gray-300">
                      <p><strong className="text-emerald-400">Proposed CAPA Remediation Plan:</strong> {f.capaPlan}</p>
                      {!capaActionTaken ? (
                        <button
                          onClick={() => setCapaActionTaken(true)}
                          className="mt-2 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-semibold text-[11px] transition-all"
                        >
                          Implement CAPA Remediation
                        </button>
                      ) : (
                        <div className="p-2 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded font-semibold flex items-center gap-2">
                          <span>✅</span> CAPA Successfully Executed and Submitted to Lead Auditor.
                        </div>
                      )}
                    </div>
                  )}

                  {activeStage === "closure" && (
                    <div className="space-y-2 text-gray-300">
                      <p><strong className="text-indigo-400">Verified Objective Evidence for Closure:</strong></p>
                      <div className="p-3 bg-gray-950 border border-indigo-500/40 rounded text-indigo-200 font-mono">
                        {f.evidence}
                      </div>
                      <div className="text-emerald-400 font-semibold mt-1">
                        Status: Finding formally CLOSED by Lead Auditor following verified follow-up fieldwork.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: 4 Deep Real-World Case Studies */}
        <section className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
            <span className="p-2.5 bg-amber-950/80 border border-amber-500/40 rounded-xl text-amber-400 font-bold text-xl">
              📖
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Detailed Real-World Assurance Case Studies
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Four comprehensive enterprise assurance scenarios from West Bengal financial centers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Case 1 */}
            <div className="bg-gray-900/80 border border-gray-700/80 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">1. Kolkata Scheduled Commercial Bank</h3>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-xs">₹50,000 Cr Assets</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-emerald-400">Mamata</strong> conducted an exhaustive assurance engagement on 
                the bank&apos;s Core Banking Solution (Finacle 11e) and UPI Switch. The audit uncovered production DBAs with 
                unrestricted SQL*Plus direct database write access, bypassing the four-eyes maker-checker principle.
              </p>
              <div className="p-3 bg-gray-950 rounded border border-gray-800 text-gray-400">
                <strong className="text-white">Remediation:</strong> Revocation of all direct DBA logins, deployment of 
                CyberArk PAM with dual authorization, and real-time Database Activity Monitoring (DAM) alerting.
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-gray-900/80 border border-gray-700/80 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">2. Salt Lake Sector V Neobank</h3>
                <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded text-xs">PCI-DSS v4.0 CDE</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-indigo-400">Mahima</strong> audited a high-growth FinTech payment gateway. 
                Fieldwork revealed that microservice exception logs inadvertently stored 3-digit CVV codes in raw 
                text during third-party gateway timeouts, violating PCI-DSS Requirement 3.2.
              </p>
              <div className="p-3 bg-gray-950 rounded border border-gray-800 text-gray-400">
                <strong className="text-white">Remediation:</strong> Deployment of global regex sanitization middleware 
                and certified cryptographic data purge across historical Elasticsearch log clusters.
              </div>
            </div>

            {/* Case 3 */}
            <div className="bg-gray-900/80 border border-gray-700/80 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">3. Barrackpore Rural Cooperative Bank</h3>
                <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded text-xs">RBI Baseline Controls</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-amber-400">Debangshu</strong> audited 48 branch networks across North 24 Parganas. 
                He discovered ATM kiosks communicating over unencrypted MPLS WAN links, exposing ISO 8583 transaction 
                payloads to man-in-the-middle interception.
              </p>
              <div className="p-3 bg-gray-950 rounded border border-gray-800 text-gray-400">
                <strong className="text-white">Remediation:</strong> Deployed hardware IPsec VPN routers at all 48 branch 
                ATM terminals with AES-256 encryption and 802.1X network port authentication.
              </div>
            </div>

            {/* Case 4 */}
            <div className="bg-gray-900/80 border border-gray-700/80 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">4. Jadavpur University FinTech Lab</h3>
                <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded text-xs">215+ Student Lab</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-purple-400">Abhronila and Susmita</strong> designed an automated Banking IS Audit 
                Simulation and Compliance Verification Engine. Students identified Broken Object Level Authorization 
                (BOLA) in sandbox APIs that exposed customer financial statements under DPDP Act 2023 testing.
              </p>
              <div className="p-3 bg-gray-950 rounded border border-gray-800 text-gray-400">
                <strong className="text-white">Remediation:</strong> Implemented AOP authorization interceptors 
                validating JWT session tokens against database resource tenant IDs before execution.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tips, Pitfalls, Pedagogical Hints & Student Checklist */}
        <section className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
            <span className="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-400 font-bold text-xl">
              💡
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Auditor Best Practices, Pitfalls & Capstone Checklist
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Essential guidelines for conducting high-assurance financial audits and certifying compliance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-gray-900/90 border border-emerald-500/30 rounded-xl space-y-2">
              <h3 className="font-bold text-emerald-400 uppercase tracking-wider">🎯 Pro Tips</h3>
              <ul className="space-y-1.5 list-disc list-inside text-gray-300">
                <li>Always corroborate Database Activity Monitoring (DAM) logs against syslog to detect DBA tampering.</li>
                <li>In payment HSM audits, physically inspect tamper-evident seals and custody logbooks in person.</li>
                <li>Ensure mobile banking APKs are tested on both non-rooted and rooted test harnesses to verify RASP.</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-900/90 border border-red-500/30 rounded-xl space-y-2">
              <h3 className="font-bold text-red-400 uppercase tracking-wider">⚠️ Common Pitfalls</h3>
              <ul className="space-y-1.5 list-disc list-inside text-gray-300">
                <li>Assuming TLS 1.3 encryption prevents BOLA, IDOR, or SQL injection attacks at the API layer.</li>
                <li>Allowing generic administrative service accounts without individual human attribution.</li>
                <li>Closing an audit finding based on management promises without verifying working implementation evidence.</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-900/90 border border-indigo-500/30 rounded-xl space-y-2">
              <h3 className="font-bold text-indigo-400 uppercase tracking-wider">🧠 Pedagogical Hints</h3>
              <ul className="space-y-1.5 list-disc list-inside text-gray-300">
                <li><strong>Think about:</strong> Why direct database writes in a Core Banking database represent an existential audit risk.</li>
                <li><strong>Observe carefully:</strong> How PCI-DSS v4.0 Requirement 3.2 prohibits CVV storage post-authorization.</li>
                <li><strong>Try changing this:</strong> Select different subsystems in Studio 1 to compare audit findings across CBS and UPI.</li>
              </ul>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="p-4 bg-gray-950 border border-gray-700 rounded-xl">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">
              Capstone Student Mini Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-900 border-gray-700 text-emerald-500" />
                <span>Understand RBI Master Directions and 6-hour CERT-In incident reporting mandate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-900 border-gray-700 text-emerald-500" />
                <span>Master Core Banking Solution (CBS) audit risks and Maker-Checker enforcement</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-900 border-gray-700 text-emerald-500" />
                <span>Identify PCI-DSS v4.0 Sensitive Authentication Data (SAD) storage prohibitions</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-900 border-gray-700 text-emerald-500" />
                <span>Formulate verifiable Corrective and Preventive Action (CAPA) plans with objective evidence</span>
              </label>
            </div>
          </div>
        </section>

        {/* Standard End Components */}
        <section className="space-y-8">
          <FAQTemplate
            title="Information Security Audit Case Study in Banking and FinTech FAQs"
            subtitle="Master real-world banking assurance, regulatory examinations, and FinTech security controls."
            questions={questions}
          />

          <PlainTextPrint
            content={noteText}
            title="Topic 11: Information Security Audit Case Study in Banking and FinTech Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />

          <Teacher note="Congratulations on completing the Information Security Audit Master Series! You now possess comprehensive, industry-grade knowledge spanning audit planning, fieldwork evidence gathering, compliance frameworks (ISO 27001, RBI, DPDP Act 2023, PCI-DSS), forensic log analysis, and rigorous banking case study execution." />
        </section>
      </div>
    </div>
  );
}
