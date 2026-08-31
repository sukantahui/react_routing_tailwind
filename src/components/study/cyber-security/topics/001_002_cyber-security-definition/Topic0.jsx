// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic0.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 0: Introduction to Cyber Security

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedSecurityId, setSelectedSecurityId] = useState('cia-triad');
  const [securitySimLog, setSecuritySimLog] = useState(null);

  const securityProfiles = [
    {
      id: 'cia-triad',
      name: 'CIA Triad Operational Security Framework',
      scope: 'Diagnostic Healthcare Patient EHR System in Ichapur',
      coreDefense: 'Confidentiality (AES-256) + Integrity (SHA-256 Hash Chains) + Availability (Multi-AZ 99.99%)',
      mechanism: 'Strict cryptographic safeguards ensuring data privacy, unalterable lab reports, and continuous doctor access.',
      slaLatency: '100% Data Integrity • Zero Unauthorized Disclosures • 99.999% Service Uptime',
      estBudget: '₹2,10,000 (Database Encryption Licenses & Multi-AZ Disaster Recovery)',
      desc: 'The foundational security triad balancing secrecy, accuracy, and accessibility across all information assets.',
      simResult: 'Simulated SQL injection attempt detected → SHA-256 hash mismatch alerts admin → WAF blocks query → CIA Triad upheld in 18ms.',
    },
    {
      id: 'defense-in-depth',
      name: 'Layered Defense-in-Depth (Multi-Barrier Protection)',
      scope: 'Precision Manufacturing SCADA Plant in Barrackpore',
      coreDefense: 'Perimeter NGFW ➔ VLAN Microsegmentation ➔ Endpoint EDR ➔ MFA Bastion ➔ Data Encryption',
      mechanism: 'Overlapping defensive controls ensuring that if an employee clicks phishing malware, internal EDR and VLAN isolation stop lateral spread.',
      slaLatency: 'Sub-15s Automated Threat Containment • Zero Production Disruption',
      estBudget: '₹3,50,000 (Next-Gen Firewall Cluster & 100 Endpoint EDR Agents)',
      desc: 'Eliminates single points of security failure by forcing attackers to breach multiple independent defensive layers.',
      simResult: 'Phishing macro attempts execution → Endpoint EDR isolates laptop process → Firewall drops outbound C2 beacon in 4.2 seconds.',
    },
    {
      id: 'zero-trust',
      name: 'Zero Trust Architecture (ZTA - NIST SP 800-207)',
      scope: 'E-Commerce Enterprise Remote Workforce in Kolkata (350 Endpoints)',
      coreDefense: 'Never Trust, Always Verify • Continuous Identity + Device Health + Contextual Risk Assessment',
      mechanism: 'Dynamic Just-In-Time (JIT) access granting micro-perimeters for every application session with FIDO2 hardware tokens.',
      slaLatency: 'Sub-100ms Dynamic Policy Evaluation • Zero Implicit Trust Zones',
      estBudget: '₹4,20,000 (Zero-Trust Network Access - ZTNA & Hardware Security Keys)',
      desc: 'Modern security paradigm eliminating the concept of a trusted internal LAN, verifying every single connection request.',
      simResult: 'Employee logs in from foreign IP → Zero Trust engine flags anomalous geolocation → Prompts for FIDO2 Hardware Key → Blocks breach.',
    },
    {
      id: 'kill-chain-defense',
      name: 'Cyber Kill Chain & Threat Hunting Defense',
      scope: 'Cybersecurity Threat Intelligence Lab in Jadavpur University',
      coreDefense: 'Lockheed Martin Kill Chain Disruption + MITRE ATT&CK TTP Behavioral Mapping',
      mechanism: 'Proactive threat hunting identifying stealth adversaries during weaponization and delivery before actions on objectives.',
      slaLatency: 'Early-Stage Kill Chain Neutralization • Zero Data Exfiltration',
      estBudget: '₹1,80,000 (Threat Intelligence SIEM Feeds & Sandboxing Appliance)',
      desc: 'Structured framework breaking down multi-stage adversary attacks to sever intrusions before harm occurs.',
      simResult: 'Reconnaissance port scan detected → SIEM correlates suspicious PowerShell execution → Quarantines host at Step 3 (Delivery).',
    },
  ];

  const currentSecurity = securityProfiles.find((s) => s.id === selectedSecurityId) || securityProfiles[0];

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
      title: '1. Precision Foundry Defense-in-Depth Architecture (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu implemented a 5-layer Defense-in-Depth architecture for a manufacturing plant in Barrackpore for ₹3,50,000. When an employee workstation was infected by phishing malware, endpoint EDR and internal VLAN microsegmentation contained the threat within 12 seconds, saving industrial CNC controllers.',
      lesson: 'Layered defense ensures that a single compromised endpoint cannot breach core operational industrial infrastructure.',
    },
    {
      title: '2. Diagnostic Clinic CIA Triad Implementation (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima designed an end-to-end CIA Triad security framework for an Ichapur diagnostic clinic for ₹2,10,000. Patient records are encrypted with AES-256 (Confidentiality), verified with SHA-256 hashes (Integrity), and mirrored across dual redundant cloud servers with 99.99% uptime (Availability).',
      lesson: 'Balancing all three pillars of the CIA Triad protects patient privacy while maintaining life-critical medical availability.',
    },
    {
      title: '3. E-Commerce Zero Trust & Multi-Factor Security (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a Zero Trust Architecture (ZTA) and FIDO2 hardware MFA tokens for a retail firm in Kolkata for ₹4,20,000. Enforcing continuous device health verification eliminated credential stuffing and session hijacking attacks across 350 remote employee laptops.',
      lesson: 'Zero Trust eliminates implicit trust and blocks stolen password attacks with hardware-bound multi-factor authentication.',
    },
    {
      title: '4. Cyber Security Lab Threat Hunting & Kill Chain Analysis (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a threat hunting laboratory in Jadavpur for ₹1,80,000. Using the MITRE ATT&CK framework, students simulate Lockheed Martin Cyber Kill Chain phases, mapping real-time EDR telemetry to detect advanced persistent threats (APTs) before data exfiltration occurs.',
      lesson: 'Proactive threat hunting and Kill Chain mapping sever sophisticated cyber intrusions before data loss occurs.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes secPulse0 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-sec0 {
          animation: secPulse0 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Introduction to Cyber Security • CIA Triad • Defense-in-Depth & Zero Trust in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Introduction to Cyber Security
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive foundation in <span className="text-sky-400 font-semibold">Cyber Security Principles & Defense Paradigms</span>: mastering the CIA Triad (Confidentiality, Integrity, Availability), Layered Defense-in-Depth, Zero Trust Architecture (ZTA), Attack Surface Reduction, the Cyber Kill Chain, and cybersecurity infrastructure budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'sec-foundations', label: '1. Core Foundations' },
              { id: 'interactive-studio', label: '2. Cyber Defense Studio' },
              { id: 'cia-matrix', label: '3. CIA Triad Matrix' },
              { id: 'svg-defense', label: '4. Layered Defense SVG' },
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

        {/* SECTION 1: Core Foundations */}
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
                What is Cyber Security and Why is It Vital in the Digital Era?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cyber Security is the art and science of protecting computing systems, digital networks, software applications, and sensitive information from unauthorized access, cyber espionage, theft, disruption, or destruction. In an interconnected global society, cybersecurity safeguards critical national infrastructure, financial wealth, intellectual property, and human privacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. CIA Triad</span>
                <p className="text-slate-300 text-xs">Upholding Confidentiality, Integrity, and Availability across all digital assets.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Defense-in-Depth</span>
                <p className="text-slate-300 text-xs">Multiple overlapping security layers preventing single points of failure.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Zero Trust (ZTA)</span>
                <p className="text-slate-300 text-xs">Never Trust, Always Verify; continuous authentication with FIDO2 MFA.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Threat Intelligence (₹)</span>
                <p className="text-slate-300 text-xs">Mapping adversary tactics via MITRE ATT&CK to neutralize cyber kill chains.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cyber Defense Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-sec0">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Cyber Security Threat & Defense-in-Depth Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a foundational cybersecurity framework to inspect defensive mechanisms, SLA metrics, threat containment protocols, and simulated attack responses:
            </p>

            {/* Security Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {securityProfiles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSecurityId(s.id);
                    setSecuritySimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedSecurityId === s.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {s.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Security Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentSecurity.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Infrastructure Budget: {currentSecurity.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Operational Deployment Scope:</span>
                <span className="text-sky-300 font-bold">{currentSecurity.scope}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Core Defensive Barrier:</span>
                <span className="text-slate-300">{currentSecurity.coreDefense}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">Security Mechanism:</span>
                  <span className="text-slate-300">{currentSecurity.mechanism}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">SLA & Protection Level:</span>
                  <span className="text-slate-300">{currentSecurity.slaLatency}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Live Cyber Attack & Defense Containment Audit:
                  </span>
                  <button
                    onClick={() => setSecuritySimLog(currentSecurity.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Defense Simulation ▶
                  </button>
                </div>

                {securitySimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛡️ <strong>Cyber Security Telemetry:</strong> {securitySimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CIA Triad Matrix */}
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
                The CIA Triad & Core Cyber Security Principles Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Security Pillar</th>
                    <th className="p-2.5 text-sky-400">Core Objective</th>
                    <th className="p-2.5 text-amber-400">Primary Cyber Threat</th>
                    <th className="p-2.5 text-emerald-400">Enforcement Technology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Confidentiality</td>
                    <td className="p-2.5 text-sky-300">Prevent unauthorized data disclosure</td>
                    <td className="p-2.5 text-rose-300">Eavesdropping, Data Theft, Espionage</td>
                    <td className="p-2.5 text-emerald-300">AES-256 Encryption, RBAC, ACLs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Integrity</td>
                    <td className="p-2.5 text-sky-300">Prevent unauthorized data alteration</td>
                    <td className="p-2.5 text-rose-300">Data Tampering, Man-in-the-Middle</td>
                    <td className="p-2.5 text-emerald-300">SHA-256 Hashes, Digital Signatures</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Availability</td>
                    <td className="p-2.5 text-sky-300">Ensure uninterrupted authorized access</td>
                    <td className="p-2.5 text-rose-300">DDoS Attacks, Ransomware, Outages</td>
                    <td className="p-2.5 text-emerald-300">Redundant Clusters, Anti-DDoS, Backups</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Non-Repudiation</td>
                    <td className="p-2.5 text-sky-300">Prevent denial of digital actions</td>
                    <td className="p-2.5 text-rose-300">Fraudulent Repudiation, Forgery</td>
                    <td className="p-2.5 text-emerald-300">X.509 PKI Digital Signatures + Logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Layered Defense SVG */}
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
                Multi-Layer Defense-in-Depth Cyber Security Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Layer 1: Perimeter Defense */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. PERIMETER LAYER</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Next-Gen Firewall • WAF</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Anti-DDoS Scrubbing</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Layer 2: Network Microsegmentation */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. NETWORK LAYER</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">VLAN Microsegmentation</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Zero Trust SD-WAN • IPS</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Layer 3: Endpoint EDR */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="460" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. ENDPOINT LAYER</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">CrowdStrike / Defender EDR</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">FIDO2 Hardware MFA</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Layer 4: Data & Cryptography */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. DATA LAYER</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">AES-256 • Hardware HSMs</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Air-Gapped Immutable Backups</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CORE CYBER SECURITY PARADIGM: LAYERED DEFENSE-IN-DEPTH ➔ ZERO TRUST "NEVER TRUST, ALWAYS VERIFY"
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  CIA Triad Foundations • MITRE ATT&CK Mapping • Lockheed Martin Cyber Kill Chain • SIEM Threat Correlation
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Attack Surface Reduction (ASR) • Enterprise Endpoint EDR & Firewall Stacks (₹3,50,000 Setup)
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
                Bengal Operations & Cyber Defense Case Studies
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
                  trap: 'Relying Exclusively on a Perimeter Firewall (The "Castle and Moat" Fallacy)',
                  fix: 'Once an attacker bypasses the perimeter via phishing, a flat internal network permits unrestricted lateral movement. Implement internal VLAN microsegmentation and Zero Trust.',
                },
                {
                  trap: 'Assuming Passwords Alone Provide Adequate Protection Against Modern Credential Theft',
                  fix: 'Passwords are routinely compromised via phishing, keyloggers, and data breaches. Mandate Multi-Factor Authentication (MFA) with hardware FIDO2 tokens.',
                },
                {
                  trap: 'Treating Backup Storage as an Online Network Share Without Air-Gapping',
                  fix: 'Ransomware actively hunts and encrypts connected network backups. Maintain offline, immutable air-gapped WORM backups to guarantee disaster recovery.',
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
                  Think of Defense-in-Depth like an ancient fortress: a moat (Perimeter Firewall), thick castle walls (Network Segmentation), armed guards at every door (Endpoint EDR), locked private vaults (Encryption), and biometric retina scanners (MFA)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the CIA Triad balances privacy (Confidentiality) and truth (Integrity) with accessibility (Availability)—increasing security without destroying business usability!
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
                Student Revision Checklist (Module 2 • Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the CIA Triad (Confidentiality, Integrity, Availability) and non-repudiation',
                'Differentiated between Vulnerabilities, Threats, Exploits, and Risk calculation',
                'Evaluated Layered Defense-in-Depth and Zero Trust Architecture (NIST SP 800-207)',
                'Understood the AAA Model (Authentication, Authorization, Accounting) and RBAC/ABAC',
                'Analyzed the Lockheed Martin Cyber Kill Chain and MITRE ATT&CK TTP mapping',
                'Formulated realistic enterprise cybersecurity and EDR budgets in Indian Rupees (₹)',
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
              "Welcome to Module 2 'Cyber Security Definition'! To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Cyber security is the ultimate shield of modern civilization. In our next topic (Topic 1), we will explore the Need of Cyber Security in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Introduction to Cyber Security FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Cyber Security in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
