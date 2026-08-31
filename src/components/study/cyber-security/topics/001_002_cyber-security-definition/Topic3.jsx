// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic3.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 3: Goals of Cyber Security

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedGoalId, setSelectedGoalId] = useState('confidentiality-shield');
  const [goalSimLog, setGoalSimLog] = useState(null);

  const goalProfiles = [
    {
      id: 'confidentiality-shield',
      name: 'Confidentiality & Privacy Protection Goal',
      scope: 'State Banking Ledger & Customer Deposits in Kolkata',
      coreMechanism: 'AES-256-GCM Field-Level Encryption + Strict Role-Based Access Control (RBAC)',
      failureImpact: 'Unauthorized disclosure of customer account balances and personal income details.',
      enforcementSLA: '100% Zero Cleartext Exposure • Granular Need-to-Know Access Controls',
      estBudget: '₹4,50,000 (Database Cryptographic Gateway & KMS Encryption Licenses)',
      desc: 'Guarantees that sensitive data remains hidden from unauthorized eyes across storage and transmission.',
      simResult: 'Adversary executes unauthorized SQL dump → AES-256-GCM field encryption returns high-entropy ciphertext → Zero PII leaked.',
    },
    {
      id: 'integrity-seal',
      name: 'Integrity & Authenticity Goal (PKI & Hashes)',
      scope: 'Diagnostic Pathology Lab Reports in Ichapur',
      coreMechanism: 'SHA-256 Cryptographic Hashes + X.509 PKI Pathologist Digital Signatures',
      failureImpact: 'Silent tampering of medical blood glucose/biopsy values leading to medical misdiagnosis.',
      enforcementSLA: '100% Tamper Detection • Non-Repudiable Digital Signatures on All Lab PDFs',
      estBudget: '₹1,80,000 (PKI Digital Signature Appliance & Timestamping Server)',
      desc: 'Guarantees that information has never been modified, fabricated, or forged during its entire lifecycle.',
      simResult: 'Adversary alters patient lab report value → SHA-256 hash mismatch alerts verification portal → Flags "DOCUMENT TAMPERED" in 14ms.',
    },
    {
      id: 'availability-five-nines',
      name: 'Availability & Fault Tolerance Goal (99.999%)',
      scope: 'State Emergency 112 Dispatch & Ambulance Dispatch in Jadavpur',
      coreMechanism: 'Active-Active Multi-AZ Server Clustering + BGP Anycast Anti-DDoS Scrubbing',
      failureImpact: 'Emergency dispatch phones go dead during an active disaster, endangering citizen lives.',
      enforcementSLA: 'Five Nines (99.999%) Uptime • Sub-15s Automated Disaster Recovery Failover',
      estBudget: '₹8,50,000 (Redundant Dual-Uplink Server Cluster & Anti-DDoS Scrubbing)',
      desc: 'Guarantees that authorized users have uninterrupted, instant access to vital emergency services.',
      simResult: 'DDoS botnet floods 40 Gbps traffic → Cloud scrubber filters malicious packets → Dispatch servers maintain 99.999% uptime with 0 drops.',
    },
    {
      id: 'parkerian-utility-possession',
      name: 'Parkerian Hexad: Possession & Utility Goal',
      scope: 'Precision Foundry Industrial CAD/CAM Programs in Barrackpore',
      coreMechanism: 'FIPS 140-2 Level 3 Hardware Security Module (HSM) + Immutable WORM Backups',
      failureImpact: 'Losing physical custody of backup drives or losing encryption keys, rendering files useless.',
      enforcementSLA: 'Strict Physical Key Possession • Guaranteed Decodable Data Utility (RTO < 15 min)',
      estBudget: '₹6,50,000 (Hardware HSM Master Key Appliance & Immutable Storage)',
      desc: 'Extends the CIA Triad by ensuring data media custody (Possession) and usable file readability (Utility).',
      simResult: 'Storage ransomware encrypts files → Immutable WORM snapshot rolls back in 8 minutes → Key verified in HSM → 100% File Utility restored.',
    },
  ];

  const currentGoal = goalProfiles.find((g) => g.id === selectedGoalId) || goalProfiles[0];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry Parkerian Utility & Disaster Recovery Vault (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu implemented an immutable WORM backup vault and automated daily disaster recovery testing in Barrackpore for ₹3,50,000. When a faulty software update corrupted file systems, automated snapshots restored all industrial CNC machine programs in 11 minutes (RTO = 11 min, RPO = 0).',
      lesson: 'The Parkerian goal of Utility ensures data is not just present, but decodable and instantly operational.',
    },
    {
      title: '2. Diagnostic Clinic Parkerian Authenticity & PKI Digital Signatures (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed an X.509 PKI digital certificate infrastructure in Ichapur for ₹1,80,000. Every laboratory diagnostic report is cryptographically signed by the consulting pathologist, guaranteeing authenticity, integrity, and non-repudiation across state medical registries.',
      lesson: 'Authenticity guarantees data originates from a genuine certified source with legal non-repudiation.',
    },
    {
      title: '3. FinTech Gateway Hardware HSM & Possession Key Governance (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a FIPS 140-2 Level 3 Hardware Security Module (HSM) in Kolkata for ₹6,50,000. Master payment keys are securely generated, stored, and executed inside physical tamper-proof hardware, ensuring strict cryptographic possession and zero plaintext key leakage.',
      lesson: 'Possession ensures master cryptographic keys cannot be physically stolen or cloned out of secure hardware.',
    },
    {
      title: '4. Cyber Security Lab SOAR Automated Playbook Incident Response (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila engineered automated SOAR incident response playbooks in Jadavpur for ₹2,10,000. When an endpoint was infected with simulated ransomware, automated SOAR scripts isolated the workstation and blocked malicious command-and-control IPs on perimeter firewalls within 4.2 seconds (MTTR < 5s).',
      lesson: 'Rapid threat containment is an operational security goal that prevents ransomware from spreading across subnets.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes goalPulse3 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-goal3 {
          animation: goalPulse3 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Goals of Cyber Security • CIA Triad • Parkerian Hexad & SOAR in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Goals of Cyber Security
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The Fundamental & Operational Goals of Cyber Security</span>: mastering the classic CIA Triad (Confidentiality, Integrity, Availability), Donn B. Parker's expanded Parkerian Hexad (Authenticity, Possession, Utility), Non-Repudiation, Accountability, and security goal budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'goal-foundations', label: '1. Goal Spectrum' },
              { id: 'interactive-studio', label: '2. Parkerian Simulator' },
              { id: 'hexad-matrix', label: '3. Hexad Goals Matrix' },
              { id: 'svg-goals', label: '4. Goals Spectrum SVG' },
              { id: 'case-studies', label: '5. Bengal Case Studies' },
              { id: 'pitfalls', label: '6. Common Pitfalls' },
              { id: 'hints', label: '7. Guided Hints' },
              { id: 'checklist', label: '8. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Goal Spectrum */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                What are the Core & Operational Goals of Cyber Security?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cybersecurity goals define the exact measurable outcomes an organization strives to achieve when designing and operating defensive systems. While the classic CIA Triad (Confidentiality, Integrity, Availability) forms the bedrock, modern cybersecurity embraces the Parkerian Hexad—adding Authenticity, Possession/Control, and Utility—alongside operational goals like Non-Repudiation and Accountability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Confidentiality</span>
                <p className="text-slate-300 text-xs">Preventing unauthorized data disclosure via AES-256 encryption and RBAC.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Integrity & Authenticity</span>
                <p className="text-slate-300 text-xs">Unalterable data accuracy via SHA-256 hashes and X.509 digital signatures.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Availability (99.999%)</span>
                <p className="text-slate-300 text-xs">Uninterrupted access with sub-15s failover and anti-DDoS scrubbing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Possession & Utility (₹)</span>
                <p className="text-slate-300 text-xs">Physical key custody in HSMs and guaranteed usable file restoration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Parkerian Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-goal3">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Goals of Cyber Security & Parkerian Hexad Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a core cybersecurity goal to inspect enforcement mechanisms, failure risks, operational SLAs, and simulated defensive execution:
            </p>

            {/* Goal Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {goalProfiles.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGoalId(g.id);
                    setGoalSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedGoalId === g.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {g.name.split('&')[0]}
                </button>
              ))}
            </div>

            {/* Active Goal Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentGoal.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Enforcement Budget: {currentGoal.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Operational Deployment Scope:</span>
                <span className="text-sky-300 font-bold">{currentGoal.scope}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Core Technical Mechanism:</span>
                <span className="text-slate-300">{currentGoal.coreMechanism}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Failure Impact if Violated:</span>
                  <span className="text-slate-300">{currentGoal.failureImpact}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Enforcement SLA & Standard:</span>
                  <span className="text-slate-300">{currentGoal.enforcementSLA}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Security Goal Verification & Audit:
                  </span>
                  <button
                    onClick={() => setGoalSimLog(currentGoal.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Run Goal Audit ▶
                  </button>
                </div>

                {goalSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🎯 <strong>Goal Enforcement Telemetry:</strong> {goalSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Hexad Goals Matrix */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Parkerian Hexad: Six Core Cyber Security Goals Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Security Goal</th>
                    <th className="p-2.5 text-sky-400">Core Definition</th>
                    <th className="p-2.5 text-rose-400">Breach Example</th>
                    <th className="p-2.5 text-emerald-400">Enforcement Technique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">1. Confidentiality</td>
                    <td className="p-2.5 text-sky-300">Secrecy and privacy of data</td>
                    <td className="p-2.5 text-rose-300">Cleartext database dump leaked online</td>
                    <td className="p-2.5 text-emerald-300">AES-256-GCM + RBAC ACLs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">2. Integrity</td>
                    <td className="p-2.5 text-sky-300">Unaltered and accurate state of data</td>
                    <td className="p-2.5 text-rose-300">Doctor's medical prescription modified in transit</td>
                    <td className="p-2.5 text-emerald-300">SHA-256 Hashing + HMACs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">3. Availability</td>
                    <td className="p-2.5 text-sky-300">Timely and dependable access for users</td>
                    <td className="p-2.5 text-rose-300">DDoS attack brings down banking portal</td>
                    <td className="p-2.5 text-emerald-300">Anti-DDoS + Multi-AZ Clustering</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">4. Authenticity</td>
                    <td className="p-2.5 text-sky-300">Genuine identity and valid origin proof</td>
                    <td className="p-2.5 text-rose-300">Spoofed sender forged executive email</td>
                    <td className="p-2.5 text-emerald-300">X.509 PKI + FIDO2 MFA</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">5. Possession</td>
                    <td className="p-2.5 text-sky-300">Physical and logical custody of media/keys</td>
                    <td className="p-2.5 text-rose-300">Encrypted backup drive stolen from server room</td>
                    <td className="p-2.5 text-emerald-300">Hardware Security Modules (HSMs)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">6. Utility</td>
                    <td className="p-2.5 text-sky-300">Usefulness and readable format of data</td>
                    <td className="p-2.5 text-rose-300">Data encrypted with permanently lost private key</td>
                    <td className="p-2.5 text-emerald-300">Immutable WORM Backups + Key Escrow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Goals Spectrum SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Cyber Security Goals Spectrum (CIA Triad + Parkerian Hexad ➔ Operational Goals)
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Block 1: Confidentiality & Possession */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. PRIVACY & POSSESSION</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Confidentiality • Possession</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">AES-256 & Hardware HSMs</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Block 2: Integrity & Authenticity */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. TRUTH & ORIGIN</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Integrity • Authenticity</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">SHA-256 & X.509 PKI</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Block 3: Availability & Utility */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. ACCESS & UTILITY</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Availability • Utility</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Five Nines & WORM Backups</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Block 4: Operational Governance */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="640" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">4. GOVERNANCE</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Non-Repudiation • SOAR</text>
                <text x="640" y="73" fill="#fda4af" fontSize="7" textAnchor="middle">Sub-5s Incident Containment</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE PARKERIAN HEXAD: EXPANDING SECURITY GOALS BEYOND THE CLASSIC CIA TRIAD
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Authenticity • Possession/Control • Data Utility • Non-Repudiation • SOAR Threat Containment (MTTR &lt; 15 min)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Enterprise Hardware Security Modules (HSMs) & Immutable WORM Vaults (₹6,50,000 Setup)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations & Security Goals Case Studies
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExample(idx)}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExample === idx
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  )}
                >
                  {cs.title.split('(')[0]}
                </button>
              ))}
            </div>

            {(() => {
              const cs = caseStudies[selectedExample];
              return (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white text-base">{cs.title}</h3>
                    <span className="text-amber-400 font-mono">{cs.lead}</span>
                  </div>
                  <p className="text-slate-300">{cs.desc}</p>
                  <p className="text-sky-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Assuming Backups Guarantee Availability Without Testing Data Utility and Restore Readiness',
                  fix: 'Backups can suffer silent corruption or lost decryption keys. Regularly execute automated disaster recovery restore drills to verify data utility.',
                },
                {
                  trap: 'Allowing Shared Administrator Accounts that Destroy Accountability and Non-Repudiation',
                  fix: 'When multiple staff share a root password, no action can be uniquely attributed to an individual. Enforce unique named accounts and PAM session recording.',
                },
                {
                  trap: 'Focusing Exclusively on Confidentiality While Ignoring System Availability SLAs',
                  fix: 'A system that is 100% encrypted and completely locked down but suffers 4 days of downtime violates core business requirements. Balance all CIA pillars.',
                },
              ].map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                  <span className="text-rose-400 font-semibold text-xs sm:text-sm">⚠️ {p.trap}</span>
                  <p className="text-xs text-slate-300"><strong>Correction:</strong> {p.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think of the Parkerian Hexad attribute of "Utility" like having a chest of gold at the bottom of the ocean: it is confidential (no one can see it) and intact (no one stole it), but if you cannot retrieve it, it has zero utility!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how automated SOAR playbooks reduce Mean Time to Respond (MTTR) from 45 minutes down to 4.2 seconds, achieving the operational goal of instant containment!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the primary CIA Triad (Confidentiality, Integrity, Availability) goals',
                'Evaluated the expanded Parkerian Hexad (Authenticity, Possession/Control, Utility)',
                'Understood Non-Repudiation, Accountability, and the AAA Identity Model',
                'Analyzed High Availability (Five Nines 99.999%), Fault Tolerance, RPO, and RTO',
                'Investigated SOAR automated incident playbooks and MTTD/MTTR reduction',
                'Formulated realistic enterprise HSM and disaster recovery budgets in Indian Rupees (₹)',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Parkerian Hexad gives you the complete blueprint to assess every vulnerability. In our next topic (Topic 4), we will explore the vast domain of Cyber Space in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Goals of Cyber Security FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Goals of Cyber Security in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
