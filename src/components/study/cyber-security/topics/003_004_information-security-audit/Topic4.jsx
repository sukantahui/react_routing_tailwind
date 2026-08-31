import React, { useState, useId } from "react";
import { Link } from "react-router-dom";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

const Topic4 = () => {
  // Unique IDs for SVG filters/gradients
  const svgId1 = useId();
  const svgId2 = useId();

  // State for Interactive Studio 1: Audit Evidence Triangulation Studio
  const [selectedAssertionKey, setSelectedAssertionKey] = useState("mfa_enforcement");
  const [evidenceStates, setEvidenceStates] = useState({
    testimonial: true,
    documentary: true,
    electronic: true,
    physical: false,
  });
  const [tamperSimActive, setTamperSimActive] = useState(false);

  // State for Interactive Studio 2: Chain of Custody & Hash Ledger Simulator
  const [evidenceTampered, setEvidenceTampered] = useState(false);
  const [activeCustodyStep, setActiveCustodyStep] = useState(2);
  const [showCertModal, setShowCertModal] = useState(false);

  // Assertion dataset for Studio 1
  const auditAssertions = {
    mfa_enforcement: {
      title: "MFA Enforcement on Production Database Servers",
      criteria: "ISO 27001 Control A.8.5 & PCI-DSS v4.0 Req 8.3.1",
      description: "All administrative access to core production relational databases must mandate multi-factor authentication without exception.",
      evidenceDetails: {
        testimonial: {
          name: "SysAdmin Interview (Debangshu)",
          type: "Testimonial",
          summary: "Debangshu states: 'We enabled Google Authenticator MFA for all SSH sessions to prod database cluster in Jan 2026.'",
          baseScore: 20,
          reliability: "Low (Self-attestation)",
          tamperRisk: "N/A (Subjective)",
        },
        documentary: {
          name: "Approved Access Control Policy (ISMS-POL-04)",
          type: "Documentary",
          summary: "PDF signed by CISO in Barrackpore office specifying mandatory hardware/software OTP for all root access.",
          baseScore: 25,
          reliability: "Moderate (Shows intent, not implementation)",
          tamperRisk: "Low (Version controlled Git commit)",
        },
        electronic: {
          name: "Direct OpenSSH & PAM Auth Config Logs",
          type: "Electronic / Digital",
          summary: "Auditor-witnessed live terminal extraction of `/etc/pam.d/sshd` containing `auth required pam_google_authenticator.so` + 100 sample login auth logs.",
          baseScore: 45,
          reliability: "Very High (Direct automated artifact)",
          tamperRisk: "Low (Witnessed live query & SHA-256 hashed)",
        },
        physical: {
          name: "Physical YubiKey Hardware Token Serial Registry",
          type: "Physical / Hardware",
          summary: "Asset custody ledger showing 8 YubiKey 5C NFC hardware keys physically handed over and signed by database engineers.",
          baseScore: 10,
          reliability: "High (Physical verification)",
          tamperRisk: "Low (Dual signature ledger)",
        },
      },
    },
    firewall_review: {
      title: "Bi-Annual Firewall Rule Review & Change Audit",
      criteria: "ISO 27001 Control A.8.20 & RBI Master Direction Sec 4.2",
      description: "Network security team must review all ingress/egress firewall rules bi-annually and deprecate unused ports.",
      evidenceDetails: {
        testimonial: {
          name: "Network Lead Interview (Mahima)",
          type: "Testimonial",
          summary: "Mahima affirms: 'We reviewed all Palo Alto firewall rules during Durga Puja break and deleted 14 deprecated port rules.'",
          baseScore: 15,
          reliability: "Low (Verbal statement)",
          tamperRisk: "N/A",
        },
        documentary: {
          name: "Jira Change Request Ticket with Manager Approval",
          type: "Documentary",
          summary: "Ticket CR-9042 approved by InfoSec Head detailing the deletion of Port 8080 and 3389 rules with business justification.",
          baseScore: 30,
          reliability: "Moderate-High (Auditable change ticket)",
          tamperRisk: "Low (Jira audit trail)",
        },
        electronic: {
          name: "Firewall Configuration Git History & XML Diff",
          type: "Electronic / Digital",
          summary: "Automated daily config export diff showing the exact commit timestamp removing 14 rules with SHA-256 digest `9a8f...4e1b`.",
          baseScore: 45,
          reliability: "Very High (Automated timestamped diff)",
          tamperRisk: "Very Low (Immutable repository)",
        },
        physical: {
          name: "Data Center Console Physical Access Sign-in",
          type: "Physical / Hardware",
          summary: "Security guard register at Salt Lake Sector V data center recording network engineer terminal access.",
          baseScore: 10,
          reliability: "Moderate (Physical register)",
          tamperRisk: "Moderate (Paper logbook)",
        },
      },
    },
    employee_offboarding: {
      title: "Immediate Revocation of Offboarded Employee Access",
      criteria: "ISO 27001 Control A.5.18 & DPDP Act 2023 Data Safeguards",
      description: "User access rights to all corporate systems, email, and cloud consoles must be revoked within 24 hours of employee resignation/termination.",
      evidenceDetails: {
        testimonial: {
          name: "HR Operations Lead Interview (Susmita)",
          type: "Testimonial",
          summary: "Susmita reports: 'HR sends a termination notice to IT Helpdesk on employee last working day without fail.'",
          baseScore: 15,
          reliability: "Low (Operational claim)",
          tamperRisk: "N/A",
        },
        documentary: {
          name: "Signed Employee Exit Clearance Form",
          type: "Documentary",
          summary: "Physical clearance document with IT, Finance, and HR stamps confirming asset return and account revocation checklist.",
          baseScore: 25,
          reliability: "Moderate (Documentary sign-off)",
          tamperRisk: "Moderate (Paper scan)",
        },
        electronic: {
          name: "Okta / Azure AD IdP Deprovisioning Event Logs",
          type: "Electronic / Digital",
          summary: "Immutable JSON log dump from Identity Provider showing `account_disabled` timestamp vs HR official last working day for 50 sampled staff.",
          baseScore: 50,
          reliability: "Highest (Automated IdP timestamped event)",
          tamperRisk: "Low (SIEM central sync)",
        },
        physical: {
          name: "Smart Card Access Badge Surrender Register",
          type: "Physical / Hardware",
          summary: "Physical smart card collected, deactivated, and RFID serial logged in security reception inventory in Park Street office.",
          baseScore: 10,
          reliability: "High (Physical artifact)",
          tamperRisk: "Low (Physical check)",
        },
      },
    },
  };

  const currentAssertion = auditAssertions[selectedAssertionKey];

  // Calculate Evidentiary Assurance Score
  const calculateScore = () => {
    let score = 0;
    let count = 0;
    if (evidenceStates.testimonial) { score += currentAssertion.evidenceDetails.testimonial.baseScore; count++; }
    if (evidenceStates.documentary) { score += currentAssertion.evidenceDetails.documentary.baseScore; count++; }
    if (evidenceStates.electronic) { score += currentAssertion.evidenceDetails.electronic.baseScore; count++; }
    if (evidenceStates.physical) { score += currentAssertion.evidenceDetails.physical.baseScore; count++; }

    if (tamperSimActive) {
      score = Math.max(10, score - 50);
    }
    return { score: Math.min(100, score), count };
  };

  const { score: assuranceScore, count: evidenceCount } = calculateScore();

  // Determine Triangulation Quality and Verdict
  const getAuditVerdict = () => {
    if (tamperSimActive) {
      return {
        rating: "CRITICAL COMPROMISE",
        color: "text-rose-400",
        bgColor: "bg-rose-950/60 border-rose-600",
        status: "Evidence Integrity Breached",
        recommendation: "Major Non-Conformity (Major NC) - Cryptographic hash mismatch or unverified data source. Immediate forensic escalation required.",
      };
    }
    if (assuranceScore >= 80 && evidenceStates.electronic && evidenceCount >= 3) {
      return {
        rating: "FULLY CONFORMING (TRIANGULATED)",
        color: "text-emerald-400",
        bgColor: "bg-emerald-950/60 border-emerald-600",
        status: "Defensible Audit Evidence",
        recommendation: "Full Conformity. Evidence is sufficient, appropriate, and corroborated across documentary, electronic, and testimonial channels.",
      };
    } else if (assuranceScore >= 50 && (evidenceStates.electronic || evidenceStates.documentary)) {
      return {
        rating: "PARTIALLY CONFORMING / MINOR GAP",
        color: "text-amber-400",
        bgColor: "bg-amber-950/60 border-amber-600",
        status: "Moderate Reliability",
        recommendation: "Minor Non-Conformity or Opportunity for Improvement (OFI). Evidence lacks complete triangulation or independent electronic validation.",
      };
    } else {
      return {
        rating: "INSUFFICIENT EVIDENCE",
        color: "text-red-400",
        bgColor: "bg-red-950/60 border-red-600",
        status: "High Audit Risk",
        recommendation: "Major Non-Conformity (Major NC). Reliance solely on verbal statements or unverified documents without objective electronic corroboration.",
      };
    }
  };

  const verdict = getAuditVerdict();

  // Studio 2: Custody Ledger Steps
  const custodySteps = [
    {
      id: 0,
      title: "Step 1: Evidence Seizure & Imaging",
      actor: "Debangshu (Lead Auditor)",
      location: "Barrackpore Data Lab",
      timestamp: "2026-08-20 09:30:15 IST",
      action: "Bit-stream raw disk image acquisition (`core_db_audit.raw`, 128.4 GB) via hardware write-blocker (Tableau T8u).",
      hash: "8f7a2b91c4e6783d01f95a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f801",
    },
    {
      id: 1,
      title: "Step 2: Custody Transfer & Courier",
      actor: "Susmita (Forensic Courier)",
      location: "En Route to Salt Lake Sector V",
      timestamp: "2026-08-20 13:45:00 IST",
      action: "Sealed in tamper-evident anti-static bag (Seal #WB-SEC-9841). Signed custody handover register with Debangshu.",
      hash: "8f7a2b91c4e6783d01f95a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f801",
    },
    {
      id: 2,
      title: "Step 3: Receipt & Verification at Lab",
      actor: "Abhronila (Forensic Analyst)",
      location: "Kolkata Forensics Suite",
      timestamp: "2026-08-20 16:10:22 IST",
      action: "Tamper seal inspected. Image ingested into isolated WORM forensic server. SHA-256 verification executed.",
      hash: evidenceTampered
        ? "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 [HASH MISMATCH!]"
        : "8f7a2b91c4e6783d01f95a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f801 [VERIFIED MATCH]",
    },
    {
      id: 3,
      title: "Step 4: Non-Destructive Forensic Audit",
      actor: "Mamata (Principal Auditor)",
      location: "Kolkata Assurance Room",
      timestamp: "2026-08-21 11:00:00 IST",
      action: "Mounted read-only clone in sandbox. Extracted PostgreSQL auth logs and SQL commit timestamps for ₹4,50,000 transaction.",
      hash: evidenceTampered
        ? "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 [CORRUPTED]"
        : "8f7a2b91c4e6783d01f95a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f801 [INTEGRITY MAINTAINED]",
    },
    {
      id: 4,
      title: "Step 5: Sec 65B (BSA Sec 63) Legal Certificate",
      actor: "Sukanta Hui (Chief Auditor / Custodian)",
      location: "Barrackpore & Kolkata HQ",
      timestamp: "2026-08-22 10:00:00 IST",
      action: "Electronic Evidence Certificate drafted and cryptographically signed under Section 65B of Indian Evidence Act / Section 63 BSA 2023.",
      hash: evidenceTampered
        ? "INVALID / INADMISSIBLE DUE TO HASH TAMPERING"
        : "8f7a2b91c4e6783d01f95a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f801 [LEGALLY ADMISSIBLE]",
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 font-sans antialiased min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <nav className="bg-gray-800/80 border-b border-gray-700/60 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-6 py-3 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cyber-security" className="hover:text-cyan-400 transition-colors">Cyber Security</Link>
          <span>/</span>
          <span className="text-gray-300">ISMS & Compliance</span>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Topic 04: Audit Evidence & Chain of Custody</span>
        </div>
      </nav>

      {/* Main Header Banner */}
      <header className="bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            ISO 19011:2018 Clause 6.4.7 • ISO/IEC 27007 • Sec 65B Indian Evidence Act / BSA 2023 Sec 63
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Audit Evidence Collection & Chain of Custody
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-4xl leading-relaxed">
            Master the principles of <strong className="text-cyan-300">Evidentiary Sufficiency & Appropriateness</strong>, the <strong className="text-cyan-300">4-Tier Audit Evidence Hierarchy</strong>, systematic <strong className="text-cyan-300">Triangulation (Corroboration)</strong>, and tamper-proof <strong className="text-cyan-300">Cryptographic Chain of Custody</strong> for defensible audit reporting and Indian legal admissibility.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-xs text-gray-300 max-w-3xl">
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/60 flex items-center gap-2.5">
              <span className="text-cyan-400 text-base">⏱</span>
              <div>
                <div className="text-gray-400">Duration</div>
                <div className="font-semibold text-gray-200">35 Minutes</div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/60 flex items-center gap-2.5">
              <span className="text-emerald-400 text-base">📊</span>
              <div>
                <div className="text-gray-400">Level</div>
                <div className="font-semibold text-gray-200">Intermediate / Practitioner</div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/60 flex items-center gap-2.5">
              <span className="text-purple-400 text-base">⚖</span>
              <div>
                <div className="text-gray-400">Legal Standard</div>
                <div className="font-semibold text-gray-200">IEA Sec 65B / BSA Sec 63</div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/60 flex items-center gap-2.5">
              <span className="text-amber-400 text-base">🔐</span>
              <div>
                <div className="text-gray-400">Integrity</div>
                <div className="font-semibold text-gray-200">SHA-256 WORM Hashing</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Section 1: Executive Theory & Core Principles */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
          <div className="border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-900/60 text-cyan-300 font-mono text-sm border border-cyan-600/40">
                01
              </span>
              The Golden Rules of Information Security Audit Evidence
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Why an audit finding without verifiable, competent evidence is legally and professionally worthless.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-300 leading-relaxed">
            <div className="space-y-4">
              <p>
                In Information Security Auditing under <strong className="text-cyan-300">ISO 19011:2018 (Clause 3.3)</strong>, audit evidence is formally defined as <em className="text-gray-200">"records, statements of fact or other information, which are relevant to the audit criteria and verifiable."</em> An auditor does not express subjective feelings or speculative assumptions; every single non-conformity or assertion must stand on an unshakeable factual foundation.
              </p>
              <div className="p-4 bg-gray-900/80 rounded-xl border border-gray-700 space-y-2">
                <h3 className="font-semibold text-cyan-300 flex items-center gap-2">
                  <span>🏛</span> The Two Cardinal Evidentiary Pillars (ISO 19011 & ISACA ITAF)
                </h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">1. Sufficiency (Quantity):</span>
                    <span>The measure of the <em>amount</em> of evidence. An auditor must gather enough representative artifacts so that another competent auditor examining the exact same working papers would reach the identical audit conclusion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">2. Appropriateness / Competence (Quality):</span>
                    <span>The measure of the <em>relevance, objectivity, authenticity, and reliability</em> of the evidence. A thousand unverified screenshots carry less weight than a single cryptographically stamped system log query witnessed live.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                When conducting compliance assessments in India (e.g., for <strong className="text-cyan-300">RBI Master Directions</strong>, <strong className="text-cyan-300">DPDP Act 2023</strong>, or <strong className="text-cyan-300">SEBI Cyber Security Framework</strong>), audit findings frequently cross the threshold from internal assurance into judicial litigation or regulatory fines. Therefore, audit evidence must strictly comply with the evidentiary requirements of the <strong className="text-amber-300">Indian Evidence Act Section 65B</strong> (now modernized under <strong className="text-amber-300">Section 63 of Bharatiya Sakshya Adhiniyam, BSA 2023</strong>).
              </p>
              <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 space-y-2">
                <h3 className="font-semibold text-amber-300 flex items-center gap-2 text-xs uppercase tracking-wide">
                  <span>⚖</span> Section 65B (IEA) / Section 63 (BSA 2023) Mandatory Criteria
                </h3>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  For computer printouts, server logs, or database dumps to be legally admissible, the evidence custodian must sign a certificate confirming: (1) Lawful custody during ordinary business operations, (2) Regular feeds into the computer, (3) Normal, error-free computer operation, and (4) Accurate electronic reproduction without tampering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG Diagram 1: The 4-Tier Audit Evidence Hierarchy */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
          <div className="border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-900/60 text-cyan-300 font-mono text-sm border border-cyan-600/40">
                02
              </span>
              The 4-Tier Audit Evidence Hierarchy & Reliability Pyramid
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Categorizing evidence from direct electronic observation down to verbal testimony.
            </p>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg
              viewBox="0 0 960 480"
              className="w-full max-w-4xl mx-auto h-auto select-none font-sans"
              aria-label="4-Tier Audit Evidence Hierarchy Diagram"
            >
              <defs>
                <linearGradient id={`${svgId1}-tier1`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#065f46" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id={`${svgId1}-tier2`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0e7490" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id={`${svgId1}-tier3`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id={`${svgId1}-tier4`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#991b1b" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <filter id={`${svgId1}-glow`} x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* Background Canvas */}
              <rect width="960" height="480" fill="#0f172a" rx="16" stroke="#334155" strokeWidth="1.5" />

              {/* Title & Subtitle */}
              <text x="480" y="36" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="bold" letterSpacing="0.5">
                AUDIT EVIDENCE RELIABILITY SPECTRUM (ISO/IEC 27007 & ITAF)
              </text>
              <text x="480" y="58" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Higher Tiers Provide Greater Objectivity, Independent Verifiability, and Defense Against Audit Risk
              </text>

              {/* TIER 1 - Direct Electronic & Physical Observation */}
              <g filter={`url(#${svgId1}-glow)`}>
                <polygon points="480,85 280,170 680,170" fill={`url(#${svgId1}-tier1)`} stroke="#34d399" strokeWidth="1.5" />
                <text x="480" y="120" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                  TIER 1: DIRECT ELECTRONIC &amp; PHYSICAL
                </text>
                <text x="480" y="140" textAnchor="middle" fill="#a7f3d0" fontSize="10.5">
                  Live witnessed CLI queries • SHA-256 Immutable SIEM logs • Physical biometric room checks
                </text>
                <text x="480" y="156" textAnchor="middle" fill="#d1fae5" fontSize="9.5" fontStyle="italic">
                  Reliability: 95% - 100% | Tamper Resistance: Highest
                </text>
              </g>

              {/* TIER 2 - Independent Third-Party & Regulatory Evidence */}
              <g filter={`url(#${svgId1}-glow)`}>
                <polygon points="275,178 200,260 760,260 685,178" fill={`url(#${svgId1}-tier2)`} stroke="#38bdf8" strokeWidth="1.5" />
                <text x="480" y="206" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                  TIER 2: EXTERNAL &amp; THIRD-PARTY ARTIFACTS
                </text>
                <text x="480" y="226" textAnchor="middle" fill="#bae6fd" fontSize="10.5">
                  Independent SOC 2 Type II reports • NPCI/Bank settlement logs • Certified External Pen Test audits
                </text>
                <text x="480" y="244" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontStyle="italic">
                  Reliability: 80% - 94% | Tamper Resistance: High (Independent Custody)
                </text>
              </g>

              {/* TIER 3 - Internal Documentary Records & Change Tickets */}
              <g filter={`url(#${svgId1}-glow)`}>
                <polygon points="195,268 120,350 840,350 765,268" fill={`url(#${svgId1}-tier3)`} stroke="#fbbf24" strokeWidth="1.5" />
                <text x="480" y="296" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                  TIER 3: INTERNAL DOCUMENTARY EVIDENCE
                </text>
                <text x="480" y="316" textAnchor="middle" fill="#fef08a" fontSize="10.5">
                  Approved Jira change tickets • Signed policies/NDAs • SysAdmin CSV log exports (Requires Corroboration)
                </text>
                <text x="480" y="334" textAnchor="middle" fill="#fef9c3" fontSize="9.5" fontStyle="italic">
                  Reliability: 50% - 79% | Tamper Resistance: Moderate (Can be edited if unsealed)
                </text>
              </g>

              {/* TIER 4 - Testimonial & Verbal Attestations */}
              <g filter={`url(#${svgId1}-glow)`}>
                <polygon points="115,358 40,440 920,440 845,358" fill={`url(#${svgId1}-tier4)`} stroke="#f87171" strokeWidth="1.5" />
                <text x="480" y="386" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                  TIER 4: TESTIMONIAL &amp; VERBAL ATTESTATIONS
                </text>
                <text x="480" y="406" textAnchor="middle" fill="#fecaca" fontSize="10.5">
                  Informal staff interviews • Self-assessment questionnaires • Verbal explanations without artifacts
                </text>
                <text x="480" y="424" textAnchor="middle" fill="#fee2e2" fontSize="9.5" fontStyle="italic">
                  Reliability: &lt; 40% | Inadmissible alone | Must be corroborated by Tiers 1-3
                </text>
              </g>

              {/* Left Side Hierarchy Indicator Arrow */}
              <line x1="75" y1="430" x2="260" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="260,92 252,105 268,103" fill="#38bdf8" />
              <text x="90" y="240" fill="#38bdf8" fontSize="11" fontWeight="bold" transform="rotate(-62 90 240)">
                INCREASING OBJECTIVITY &amp; ASSURANCE ➔
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-gray-300">
            <div className="p-3.5 bg-gray-900/70 rounded-xl border border-gray-800">
              <div className="font-bold text-emerald-400 mb-1">Direct Verification Rule</div>
              <p className="text-gray-400">
                Never accept an exported CSV or Excel sheet from a SysAdmin without personally witnessing the database query execution or verifying the file's hash against the production syslog server.
              </p>
            </div>
            <div className="p-3.5 bg-gray-900/70 rounded-xl border border-gray-800">
              <div className="font-bold text-cyan-400 mb-1">Third-Party Trust Boundary</div>
              <p className="text-gray-400">
                External SOC 2 Type II reports must be verified for the auditor's CPA accreditation, scope boundaries, and the specific Complementary User Entity Controls (CUECs).
              </p>
            </div>
            <div className="p-3.5 bg-gray-900/70 rounded-xl border border-gray-800">
              <div className="font-bold text-amber-400 mb-1">The Testimonial Trap</div>
              <p className="text-gray-400">
                A verbal statement like <em>"We perform offsite backups every Friday"</em> is only a hypothesis. It remains an unsubstantiated claim until the backup storage bucket and test restore logs are verified.
              </p>
            </div>
          </div>
        </section>

        {/* SVG Diagram 2: Chain of Custody & Triangulation Architecture */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
          <div className="border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-900/60 text-cyan-300 font-mono text-sm border border-cyan-600/40">
                03
              </span>
              The Cryptographic Chain of Custody (CoC) &amp; Triangulation Pipeline
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              End-to-end evidence lifecycle from initial extraction to Indian Evidence Act Section 65B certification.
            </p>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg
              viewBox="0 0 960 380"
              className="w-full max-w-4xl mx-auto h-auto select-none font-sans"
              aria-label="Chain of Custody and Evidence Pipeline Architecture"
            >
              <defs>
                <linearGradient id={`${svgId2}-box1`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id={`${svgId2}-accent`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Background */}
              <rect width="960" height="380" fill="#0b1329" rx="16" stroke="#1e293b" strokeWidth="1.5" />

              {/* Top Banner */}
              <text x="480" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold" letterSpacing="0.5">
                UNBROKEN CHAIN OF CUSTODY &amp; LEGAL ADMISSIBILITY LIFECYCLE
              </text>

              {/* Phase 1: Acquisition */}
              <g transform="translate(30, 60)">
                <rect width="160" height="240" rx="10" fill={`url(${svgId2}-box1)`} stroke="#06b6d4" strokeWidth="1.5" />
                <rect width="160" height="32" rx="10" fill="#0891b2" />
                <text x="80" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1. SECURE SEIZURE</text>
                <text x="15" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">Actions:</text>
                <text x="15" y="78" fill="#e2e8f0" fontSize="9.5">• Hardware Write-Blocker</text>
                <text x="15" y="94" fill="#e2e8f0" fontSize="9.5">• Bit-stream image (.raw)</text>
                <text x="15" y="110" fill="#e2e8f0" fontSize="9.5">• RAM live memory dump</text>
                <text x="15" y="135" fill="#94a3b8" fontSize="10" fontWeight="bold">Custody Log:</text>
                <text x="15" y="153" fill="#cbd5e1" fontSize="9">Debangshu (Barrackpore)</text>
                <text x="15" y="169" fill="#06b6d4" fontSize="8.5">Time: 09:30:15 IST</text>
                <rect x="10" y="195" width="140" height="32" rx="6" fill="#164e63" stroke="#0891b2" strokeWidth="1" />
                <text x="80" y="215" textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="bold">Raw Data Imaged</text>
              </g>

              {/* Connector 1 */}
              <path d="M 195 180 L 220 180" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <polygon points="220,180 212,175 212,185" fill="#06b6d4" />

              {/* Phase 2: Cryptographic Hashing */}
              <g transform="translate(225, 60)">
                <rect width="160" height="240" rx="10" fill={`url(${svgId2}-box1)`} stroke="#10b981" strokeWidth="1.5" />
                <rect width="160" height="32" rx="10" fill="#059669" />
                <text x="80" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2. HASH TIMESTAMP</text>
                <text x="15" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">Algorithm:</text>
                <text x="15" y="78" fill="#34d399" fontSize="9.5" fontWeight="bold">SHA-256 Fingerprint</text>
                <text x="15" y="94" fill="#a7f3d0" fontSize="8.5" fontMono="true">`8f7a2b...e7f801`</text>
                <text x="15" y="120" fill="#94a3b8" fontSize="10" fontWeight="bold">Integrity Seal:</text>
                <text x="15" y="138" fill="#e2e8f0" fontSize="9.5">• Tamper bag #WB-9841</text>
                <text x="15" y="154" fill="#e2e8f0" fontSize="9.5">• Anti-static Faraday seal</text>
                <rect x="10" y="195" width="140" height="32" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="1" />
                <text x="80" y="215" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">Hash Computed (t0)</text>
              </g>

              {/* Connector 2 */}
              <polygon points="415,180 407,175 407,185" fill="#10b981" />

              {/* Phase 3: Custody Transfer */}
              <g transform="translate(420, 60)">
                <rect width="160" height="240" rx="10" fill={`url(${svgId2}-box1)`} stroke="#f59e0b" strokeWidth="1.5" />
                <rect width="160" height="32" rx="10" fill="#d97706" />
                <text x="80" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3. CUSTODY HANDOVER</text>
                <text x="15" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">Transfer Log:</text>
                <text x="15" y="78" fill="#e2e8f0" fontSize="9.5">• Debangshu ➔ Susmita</text>
                <text x="15" y="94" fill="#e2e8f0" fontSize="9.5">• Susmita ➔ Abhronila</text>
                <text x="15" y="120" fill="#94a3b8" fontSize="10" fontWeight="bold">Transit Route:</text>
                <text x="15" y="138" fill="#fde68a" fontSize="9">Barrackpore ➔ Salt Lake</text>
                <text x="15" y="154" fill="#f59e0b" fontSize="8.5">Dual-Signature Ledger</text>
                <rect x="10" y="195" width="140" height="32" rx="6" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                <text x="80" y="215" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Logbook Signed</text>
              </g>

              {/* Connector 3 */}
              <polygon points="610,180 602,175 602,185" fill="#f59e0b" />

              {/* Phase 4: Forensic Sandbox */}
              <g transform="translate(615, 60)">
                <rect width="160" height="240" rx="10" fill={`url(${svgId2}-box1)`} stroke="#8b5cf6" strokeWidth="1.5" />
                <rect width="160" height="32" rx="10" fill="#7c3aed" />
                <text x="80" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">4. LAB ANALYSIS</text>
                <text x="15" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">Safety Protocol:</text>
                <text x="15" y="78" fill="#e2e8f0" fontSize="9.5">• Master Image LOCKED</text>
                <text x="15" y="94" fill="#e2e8f0" fontSize="9.5">• Work on Clone only</text>
                <text x="15" y="120" fill="#94a3b8" fontSize="10" fontWeight="bold">Verification:</text>
                <text x="15" y="138" fill="#ddd6fe" fontSize="9">Re-compute SHA-256</text>
                <text x="15" y="154" fill="#c4b5fd" fontSize="8.5">Clone Hash === Master Hash</text>
                <rect x="10" y="195" width="140" height="32" rx="6" fill="#4c1d95" stroke="#7c3aed" strokeWidth="1" />
                <text x="80" y="215" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontWeight="bold">WORM Storage Ingest</text>
              </g>

              {/* Connector 4 */}
              <polygon points="805,180 797,175 797,185" fill="#8b5cf6" />

              {/* Phase 5: Legal Certificate */}
              <g transform="translate(810, 60)">
                <rect width="125" height="240" rx="10" fill={`url(${svgId2}-box1)`} stroke="#ec4899" strokeWidth="1.5" />
                <rect width="125" height="32" rx="10" fill="#db2777" />
                <text x="62" y="21" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">5. SEC 65B CERT</text>
                <text x="10" y="60" fill="#94a3b8" fontSize="9.5" fontWeight="bold">Legal Output:</text>
                <text x="10" y="78" fill="#fbcfe8" fontSize="8.5">• BSA 2023 Sec 63</text>
                <text x="10" y="94" fill="#fbcfe8" fontSize="8.5">• Signed by Custodian</text>
                <text x="10" y="120" fill="#94a3b8" fontSize="9.5" fontWeight="bold">Admissibility:</text>
                <text x="10" y="138" fill="#ffffff" fontSize="9" fontWeight="bold">100% Court Ready</text>
                <text x="10" y="154" fill="#f472b6" fontSize="8">RBI / Court Certified</text>
                <rect x="8" y="195" width="109" height="32" rx="6" fill="#831843" stroke="#db2777" strokeWidth="1" />
                <text x="62" y="215" textAnchor="middle" fill="#fbcfe8" fontSize="8.5" fontWeight="bold">Admissible Proof</text>
              </g>

              {/* Bottom Assurance Note */}
              <rect x="30" y="320" width="905" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="480" y="345" textAnchor="middle" fill="#cbd5e1" fontSize="11">
                🔒 Any single bit flip or hash discrepancy at any point along this pipeline immediately renders the entire evidence chain <tspan fill="#f87171" fontWeight="bold">INADMISSIBLE</tspan> under Indian Law and ISACA ITAF.
              </text>
            </svg>
          </div>
        </section>

        {/* Section 4: Interactive Studio 1 - Audit Evidence Triangulation Evaluator */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
          <div className="border-b border-gray-700 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700 text-cyan-300 text-xs font-semibold uppercase mb-1">
                Interactive Lab 1
              </div>
              <h2 className="text-2xl font-bold text-white">
                Audit Evidence Triangulation &amp; Admissibility Studio
              </h2>
              <p className="text-sm text-gray-400">
                Select an audit control assertion, toggle collected evidence types, and observe how triangulation impacts the final audit finding.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTamperSimActive(!tamperSimActive)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  tamperSimActive
                    ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/50 animate-pulse"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                }`}
              >
                {tamperSimActive ? "⚠️ Tamper Simulation Active (Corrupted)" : "Simulate Evidence Tampering"}
              </button>
            </div>
          </div>

          {/* Assertion Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.entries(auditAssertions).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedAssertionKey(key)}
                className={`p-3 rounded-xl text-left border transition-all text-xs ${
                  selectedAssertionKey === key
                    ? "bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950"
                    : "bg-gray-900/60 border-gray-700/60 text-gray-400 hover:bg-gray-800/80 hover:text-gray-200"
                }`}
              >
                <div className="font-bold text-sm text-white mb-1 truncate">{item.title}</div>
                <div className="text-cyan-400 font-mono text-[11px] truncate">{item.criteria}</div>
              </button>
            ))}
          </div>

          {/* Active Assertion Context */}
          <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-700/70 text-xs text-gray-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-cyan-300 font-bold uppercase tracking-wider text-[11px]">Audit Objective:</span>
              <span className="text-gray-400 font-mono">{currentAssertion.criteria}</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">{currentAssertion.description}</p>
          </div>

          {/* Evidence Checklist Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Testimonial Evidence Item */}
            <div
              onClick={() => setEvidenceStates({ ...evidenceStates, testimonial: !evidenceStates.testimonial })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                evidenceStates.testimonial
                  ? "bg-gray-900/90 border-cyan-600/80 shadow-md"
                  : "bg-gray-900/30 border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={evidenceStates.testimonial}
                    onChange={() => {}}
                    className="rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-0"
                  />
                  <span className="font-bold text-sm text-cyan-300">
                    Tier 4: {currentAssertion.evidenceDetails.testimonial.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-300 border border-red-800">
                  {currentAssertion.evidenceDetails.testimonial.type}
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-2 italic">
                "{currentAssertion.evidenceDetails.testimonial.summary}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800 pt-2">
                <span>Reliability: <strong className="text-amber-400">{currentAssertion.evidenceDetails.testimonial.reliability}</strong></span>
                <span>Evidentiary Weight: <strong className="text-cyan-300">+{currentAssertion.evidenceDetails.testimonial.baseScore}%</strong></span>
              </div>
            </div>

            {/* Documentary Evidence Item */}
            <div
              onClick={() => setEvidenceStates({ ...evidenceStates, documentary: !evidenceStates.documentary })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                evidenceStates.documentary
                  ? "bg-gray-900/90 border-cyan-600/80 shadow-md"
                  : "bg-gray-900/30 border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={evidenceStates.documentary}
                    onChange={() => {}}
                    className="rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-0"
                  />
                  <span className="font-bold text-sm text-cyan-300">
                    Tier 3: {currentAssertion.evidenceDetails.documentary.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
                  {currentAssertion.evidenceDetails.documentary.type}
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-2">
                {currentAssertion.evidenceDetails.documentary.summary}
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800 pt-2">
                <span>Reliability: <strong className="text-amber-300">{currentAssertion.evidenceDetails.documentary.reliability}</strong></span>
                <span>Evidentiary Weight: <strong className="text-cyan-300">+{currentAssertion.evidenceDetails.documentary.baseScore}%</strong></span>
              </div>
            </div>

            {/* Electronic / Digital Evidence Item */}
            <div
              onClick={() => setEvidenceStates({ ...evidenceStates, electronic: !evidenceStates.electronic })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                evidenceStates.electronic
                  ? "bg-gray-900/90 border-emerald-600/80 shadow-md"
                  : "bg-gray-900/30 border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={evidenceStates.electronic}
                    onChange={() => {}}
                    className="rounded bg-gray-800 border-gray-700 text-emerald-500 focus:ring-0"
                  />
                  <span className="font-bold text-sm text-emerald-300">
                    Tier 1: {currentAssertion.evidenceDetails.electronic.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  {currentAssertion.evidenceDetails.electronic.type}
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-2">
                {currentAssertion.evidenceDetails.electronic.summary}
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800 pt-2">
                <span>Reliability: <strong className="text-emerald-400">{currentAssertion.evidenceDetails.electronic.reliability}</strong></span>
                <span>Evidentiary Weight: <strong className="text-emerald-300">+{currentAssertion.evidenceDetails.electronic.baseScore}%</strong></span>
              </div>
            </div>

            {/* Physical / Hardware Evidence Item */}
            <div
              onClick={() => setEvidenceStates({ ...evidenceStates, physical: !evidenceStates.physical })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                evidenceStates.physical
                  ? "bg-gray-900/90 border-cyan-600/80 shadow-md"
                  : "bg-gray-900/30 border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={evidenceStates.physical}
                    onChange={() => {}}
                    className="rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-0"
                  />
                  <span className="font-bold text-sm text-cyan-300">
                    Tier 1 (Physical): {currentAssertion.evidenceDetails.physical.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {currentAssertion.evidenceDetails.physical.type}
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-2">
                {currentAssertion.evidenceDetails.physical.summary}
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800 pt-2">
                <span>Reliability: <strong className="text-cyan-400">{currentAssertion.evidenceDetails.physical.reliability}</strong></span>
                <span>Evidentiary Weight: <strong className="text-cyan-300">+{currentAssertion.evidenceDetails.physical.baseScore}%</strong></span>
              </div>
            </div>
          </div>

          {/* Real-time Assurance Score & Verdict Output */}
          <div className={`p-6 rounded-2xl border ${verdict.bgColor} transition-all space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-700/60 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-gray-400">Assurance Evaluation:</span>
                <div className={`text-xl font-extrabold ${verdict.color} tracking-tight`}>
                  {verdict.rating}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[11px] text-gray-400 uppercase">Triangulation Strength</div>
                  <div className="text-2xl font-black font-mono text-white">{assuranceScore}%</div>
                </div>
                <div className="w-24 bg-gray-900 rounded-full h-3.5 border border-gray-700 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      tamperSimActive ? "bg-rose-500" : assuranceScore >= 80 ? "bg-emerald-500" : assuranceScore >= 50 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${assuranceScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-200 leading-relaxed">
              <strong className="text-white">Auditor's Formal Determination: </strong>
              {verdict.recommendation}
            </div>

            {/* Pedagogical Hint Callout */}
            <div className="p-3 bg-gray-950/70 rounded-xl border border-gray-800 text-xs text-gray-400 flex items-start gap-2.5">
              <span className="text-cyan-400 text-sm">💡</span>
              <div>
                <strong className="text-cyan-300">Pedagogical Observation: </strong>
                Notice that if you uncheck <span className="text-emerald-300 font-semibold">Tier 1 (Electronic Evidence)</span>, the assurance score plummets below 50% even if you have policies and interviews. In modern cloud and cyber audits, <em>intent without automated electronic proof is not auditable</em>.
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Studio 2 - Forensic Chain of Custody & Hash Ledger Simulator */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
          <div className="border-b border-gray-700 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-700 text-purple-300 text-xs font-semibold uppercase mb-1">
                Interactive Lab 2
              </div>
              <h2 className="text-2xl font-bold text-white">
                Cryptographic Chain of Custody &amp; Forensic Ledger Simulator
              </h2>
              <p className="text-sm text-gray-400">
                Track a 128 GB database disk image across 5 chronological custody transfer events and witness how cryptographic hash validation ensures legal admissibility.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEvidenceTampered(!evidenceTampered)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  evidenceTampered
                    ? "bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-500"
                    : "bg-rose-900/80 hover:bg-rose-800 text-rose-200 border-rose-600"
                }`}
              >
                {evidenceTampered ? "🔄 Restore Original Evidence (Clear Tamper)" : "💥 Corrupt 1 Byte in Transit (Tamper Test)"}
              </button>
              <button
                onClick={() => setShowCertModal(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500 transition-all shadow-md"
              >
                📜 View Sec 65B / BSA Sec 63 Certificate
              </button>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {custodySteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveCustodyStep(step.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeCustodyStep === step.id
                    ? "bg-purple-950/80 border-purple-500 text-purple-200 shadow-md"
                    : "bg-gray-900/60 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                }`}
              >
                <div className="text-[10px] font-mono text-purple-400 font-bold uppercase">Phase {step.id + 1}</div>
                <div className="text-xs font-bold text-white truncate">{step.title.split(":")[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Custody Step Detail Card */}
          <div className="p-5 bg-gray-900/90 rounded-xl border border-gray-700 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">📦</span>
                  {custodySteps[activeCustodyStep].title}
                </h3>
                <div className="text-xs text-gray-400 mt-0.5 flex flex-wrap items-center gap-3">
                  <span>Custodian: <strong className="text-cyan-300">{custodySteps[activeCustodyStep].actor}</strong></span>
                  <span>•</span>
                  <span>Location: <strong className="text-amber-300">{custodySteps[activeCustodyStep].location}</strong></span>
                  <span>•</span>
                  <span>Timestamp: <strong className="text-gray-300">{custodySteps[activeCustodyStep].timestamp}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono border ${
                  evidenceTampered && activeCustodyStep >= 2
                    ? "bg-rose-950 text-rose-300 border-rose-700 animate-pulse"
                    : "bg-emerald-950 text-emerald-300 border-emerald-700"
                }`}>
                  {evidenceTampered && activeCustodyStep >= 2 ? "🚨 INTEGRITY BREACH" : "✔ HASH VERIFIED"}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-gray-200">Forensic Action Performed: </strong>
              {custodySteps[activeCustodyStep].action}
            </div>

            {/* Cryptographic SHA-256 Ledger Box */}
            <div className="p-3.5 bg-gray-950 rounded-lg border border-gray-800 font-mono text-xs space-y-1.5">
              <div className="text-gray-400 flex items-center justify-between text-[11px]">
                <span>Evidence File: <span className="text-cyan-400">core_db_audit.raw (128.4 GB)</span></span>
                <span className="text-gray-400">Algorithm: SHA-256 (256-bit digest)</span>
              </div>
              <div className="p-2 bg-gray-900 rounded border border-gray-800 text-xs break-all">
                <span className="text-gray-400">Recorded Digest: </span>
                <span className={evidenceTampered && activeCustodyStep >= 2 ? "text-rose-400 font-bold" : "text-emerald-400"}>
                  {custodySteps[activeCustodyStep].hash}
                </span>
              </div>
              {evidenceTampered && activeCustodyStep >= 2 ? (
                <div className="text-rose-400 text-[11px] pt-1 flex items-center gap-1.5">
                  <span>❌</span>
                  <span>Alert: The computed hash differs from the baseline acquisition hash. The evidence has been tampered with or corrupted during courier transfer. Inadmissible under Section 65B!</span>
                </div>
              ) : (
                <div className="text-emerald-400 text-[11px] pt-1 flex items-center gap-1.5">
                  <span>✔</span>
                  <span>Integrity Confirmed: Bit-level parity matches baseline timestamp t0. Unbroken Chain of Custody maintained.</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Modal for Section 65B Certificate Preview */}
          {showCertModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                    <span>⚖</span> Section 65B (IEA) / Section 63 (BSA 2023) Legal Certificate
                  </h3>
                  <button
                    onClick={() => setShowCertModal(false)}
                    className="text-gray-400 hover:text-white text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto">
                  <div className="text-center font-bold text-white border-b border-gray-800 pb-2">
                    CERTIFICATE UNDER SECTION 65B OF INDIAN EVIDENCE ACT, 1872<br />
                    (READ WITH SECTION 63 OF BHARATIYA SAKSHYA ADHINIYAM, 2023)
                  </div>
                  <p>
                    I, <strong>Sukanta Hui</strong>, in my capacity as Chief Information Security Officer &amp; Principal Audit Lead at Barrackpore Cyber Lab, do hereby certify as follows:
                  </p>
                  <p>
                    1. That the computer device and PostgreSQL database cluster associated with evidence file <code>core_db_audit.raw</code> was under regular lawful management throughout the audit period.
                  </p>
                  <p>
                    2. That during the said period, information of the kind contained in the electronic record was regularly recorded into the system in the ordinary course of business activities.
                  </p>
                  <p>
                    3. That the SHA-256 checksum of the seized forensic image at t0 was recorded as:
                    <br />
                    <code className="text-emerald-400">8f7a2b91c4e6783d01f95a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f801</code>
                  </p>
                  <p>
                    4. Current Status: {evidenceTampered ? (
                      <span className="text-rose-400 font-bold">CERTIFICATION REVOKED - HASH MISMATCH DETECTED</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">CERTIFICATION VALID &amp; LEGALLY ADMISSIBLE</span>
                    )}
                  </p>
                  <div className="pt-3 border-t border-gray-800 flex justify-between items-end text-[10px] text-gray-400">
                    <div>
                      Place: Barrackpore / Kolkata, West Bengal<br />
                      Date: 22nd August 2026
                    </div>
                    <div className="text-right text-cyan-400">
                      Digitally Signed: Sukanta Hui [CISO/Lead Auditor]<br />
                      Cert ID: IN-WB-AUD-2026-65B-902
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowCertModal(false)}
                    className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 border border-gray-700"
                  >
                    Close Certificate Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 6: Real-World Case Studies with Indian Context */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
          <div className="border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-900/60 text-cyan-300 font-mono text-sm border border-cyan-600/40">
                04
              </span>
              Industrial Case Studies &amp; Field Audit Practice (West Bengal Context)
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Analyzing real-world evidence collection and chain of custody challenges in banking, fintech, healthcare, and enterprise physical perimeters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            {/* Case Study 1: Barrackpore Bank */}
            <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Case 1: Banking &amp; UPI Gateway
                </span>
                <span className="text-xs text-gray-400">Barrackpore Co-op Bank</span>
              </div>
              <h3 className="font-bold text-white text-base">
                ₹4,50,000 Disputed UPI Settlement &amp; Section 65B Admissibility
              </h3>
              <p className="text-xs leading-relaxed text-gray-300">
                <strong>Scenario:</strong> Susmita and Debangshu were assigned to audit an alleged reconciliation shortfall of ₹4,50,000 across 30 UPI transactions. The internal IT team presented a manually formatted Excel spreadsheet claiming NPCI switch timeouts.
              </p>
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs space-y-1">
                <div className="text-cyan-300 font-semibold">Auditor Action &amp; Triangulation:</div>
                <p className="text-gray-400">
                  Debangshu rejected the Excel spreadsheet as Tier 3 uncorroborated evidence. He directly extracted raw NPCI ISO 8583 switch packet capture logs, cross-referenced them with Core Banking PostgreSQL commit timestamps, computed SHA-256 hashes, and drafted an Indian Evidence Act Section 65B certificate for CERT-In submission.
                </p>
              </div>
            </div>

            {/* Case Study 2: Salt Lake Sector V FinTech */}
            <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Case 2: Cloud Infrastructure
                </span>
                <span className="text-xs text-gray-400">Kolkata Sector V AWS Lab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                PCI-DSS v4.0 Requirement 10 Automated AWS CloudTrail Lock
              </h3>
              <p className="text-xs leading-relaxed text-gray-300">
                <strong>Scenario:</strong> Abhronila conducted a compliance audit for a payment gateway startup. Under PCI-DSS Req 10, audit trails must be protected against tampering and preserved for at least one year.
              </p>
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs space-y-1">
                <div className="text-emerald-300 font-semibold">Auditor Action &amp; Triangulation:</div>
                <p className="text-gray-400">
                  Abhronila validated that AWS CloudTrail log file validation was enabled (`ValidateLogs: true`) and that logs were delivered to an S3 bucket configured with S3 Object Lock in Compliance Mode (WORM - Write Once Read Many), preventing even the AWS root account from modifying audit logs.
                </p>
              </div>
            </div>

            {/* Case Study 3: New Town HealthTech DPDP Act */}
            <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                  Case 3: Healthcare Privacy
                </span>
                <span className="text-xs text-gray-400">New Town Kolkata Hospital</span>
              </div>
              <h3 className="font-bold text-white text-base">
                DPDP Act 2023 Patient Electronic Health Record (EHR) Consent Audit
              </h3>
              <p className="text-xs leading-relaxed text-gray-300">
                <strong>Scenario:</strong> Mamata audited digital consent management for 1,20,000 patient records under India's Digital Personal Data Protection (DPDP) Act 2023. The hospital's Data Protection Officer (DPO) provided verbal assurance that patient consent is stored securely.
              </p>
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs space-y-1">
                <div className="text-purple-300 font-semibold">Auditor Action &amp; Triangulation:</div>
                <p className="text-gray-400">
                  Mamata executed statistical attribute sampling on 120 random patient registration records, inspecting the cryptographic consent artifacts (digital signature timestamp, Aadhaar OTP token, purpose limitation flags) to prove that consent records could not be retroactively fabricated.
                </p>
              </div>
            </div>

            {/* Case Study 4: Park Street Physical Perimeter */}
            <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  Case 4: Physical Security
                </span>
                <span className="text-xs text-gray-400">Park Street Financial HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Server Room Biometric Access vs Guard Register Discrepancy
              </h3>
              <p className="text-xs leading-relaxed text-gray-300">
                <strong>Scenario:</strong> Mahima conducted a physical security audit of the on-premise disaster recovery datacenter. The security guard manual paper register showed 4 visitor entries, while the biometric turnstile recorded 11 entries on the same afternoon.
              </p>
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs space-y-1">
                <div className="text-amber-300 font-semibold">Auditor Action &amp; Triangulation:</div>
                <p className="text-gray-400">
                  Mahima triangulated physical evidence: she seized the 90-day DVR CCTV recording, corroborated smart card RFID badge logs with timestamps, and raised a Major Non-Conformity (Major NC) for tailgating and unauthorized contractor access into the server room.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Tips, Pitfalls, and Best Practices */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>💡</span> Pro Tips &amp; Field Tricks
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Always Witness Extractions:</strong> When an admin runs a command, watch over their shoulder or record a screen session with terminal prompt timestamps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Compute Dual Hashes:</strong> Calculate both SHA-256 and SHA-3 or MD5/SHA-256 combinations to provide redundant mathematical proof against collision attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Pre-Flight Checklist:</strong> Ensure write-blocker hardware is certified and write-block status is verified before connecting seized storage media.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Audit Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Accepting Screenshots in Isolation:</strong> Screenshots in Microsoft Word or email bodies are easily faked using browser Developer Tools.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Analyzing Live Original Evidence:</strong> Never perform forensic queries directly on original evidence drives; always work on bit-stream forensic clones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Gaps in Custody Handover:</strong> Failing to log the exact minute an evidence drive was transferred to a courier destroys legal admissibility in Indian courts.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-3">
            <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
              <span>🛡</span> Best Practices (ISO 27007 &amp; ITAF)
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Strict Triangulation:</strong> Mandate at least 2 independent evidence types (Documentary + Electronic) for every high-risk finding.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Statistical Sampling:</strong> Use ISO 2859-1 or AICPA attribute sampling tables with clear documentation of confidence level (95%) and tolerable error (5%).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Standardized Evidence Naming:</strong> Use standardized identifiers (e.g., `AUD-2026-EVD-004-SYS-01`) cross-referenced in working paper indexes.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 8: Student Mini Self-Audit Checklist */}
        <section className="bg-gray-800/50 border border-gray-700/70 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📋</span> Student Mastery Checklist: Audit Evidence &amp; Chain of Custody
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
              <span className="text-emerald-400">✔</span>
              <span>I can explain Sufficiency vs Appropriateness of evidence.</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
              <span className="text-emerald-400">✔</span>
              <span>I know the 4 tiers of the audit evidence reliability hierarchy.</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
              <span className="text-emerald-400">✔</span>
              <span>I can triangulate Policy, Configuration, and Interview claims.</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
              <span className="text-emerald-400">✔</span>
              <span>I know how SHA-256 prevents evidence tampering disputes.</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
              <span className="text-emerald-400">✔</span>
              <span>I understand Section 65B (IEA) / BSA 2023 Section 63 certification.</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
              <span className="text-emerald-400">✔</span>
              <span>I can maintain a legally defensible Chain of Custody logbook.</span>
            </div>
          </div>
        </section>

        {/* Section 9: FAQ Template Integration */}
        <FAQTemplate
          title="Audit Evidence Collection & Chain of Custody FAQs"
          subtitle="Comprehensive answers to the most critical evidentiary, procedural, and legal questions in Information Security Auditing."
          questions={questions}
        />

        {/* Section 10: Plain Text Print & Download Component */}
        <PlainTextPrint
          content={noteText}
          title="Audit Evidence Collection and Chain of Custody Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic5_note.txt"
        />

        {/* Section 11: Teacher Sukanta Hui Dedicated Component */}
        <Teacher
          note="Remember this cardinal rule of auditing: 'If it wasn't recorded, timestamped, and cryptographically verified, it NEVER happened.' As future cyber auditors and security leaders in Kolkata and across India, your professional reputation hinges on the unshakeable integrity of your evidence. Always triangulate, always hash at acquisition, and never rely on verbal promises alone."
        />

      </main>
    </div>
  );
};

export default Topic4;
