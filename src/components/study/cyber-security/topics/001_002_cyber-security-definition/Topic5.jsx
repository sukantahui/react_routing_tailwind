// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic5.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 5: Digital Assets

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedAssetId, setSelectedAssetId] = useState('pii-tokenization');
  const [assetSimLog, setAssetSimLog] = useState(null);

  const assetProfiles = [
    {
      id: 'pii-tokenization',
      name: 'Customer PII & Credit Card Data Tokenization',
      classification: 'Restricted / Secret (Crown Jewel Data Asset) in Kolkata',
      assetType: '85,000 Patient Aadhaar & Payment Card Records',
      vulnerability: 'SQL Injection / Database Exfiltration dumping plain text records.',
      protectionControl: 'Format-Preserving Tokenization Vault + Dynamic Data Masking',
      estBudget: '₹4,80,000 (Database Tokenization Gateway & PCI-DSS HSM Vault)',
      desc: 'Replaces sensitive payment cards and Aadhaar IDs with non-exploitable random tokens.',
      simResult: 'Attacker executes unauthenticated SQL dump -> Tokenization engine returns random surrogate strings (TKN-8839-X) -> Zero PII breached.',
    },
    {
      id: 'source-code-dlp',
      name: 'Proprietary Source Code & IP Watermarking Shield',
      classification: 'Confidential / Intellectual Property Asset in Barrackpore',
      assetType: 'Automated CNC Robotics Casting Algorithms & CAD Blueprints',
      vulnerability: 'Insider data exfiltration via unauthorized USB drives or personal cloud sync.',
      protectionControl: 'Endpoint Data Loss Prevention (DLP) + Steganographic Document Watermarking',
      estBudget: '₹3,50,000 (200-Seat Endpoint DLP Licenses & Watermarking Engine)',
      desc: 'Monitors endpoints and network channels to block unauthorized intellectual property leaks.',
      simResult: 'Employee copies proprietary CAD blueprint to USB -> Endpoint DLP agent intercepts write request -> Blocks file transfer in 1.4s.',
    },
    {
      id: 'hsm-master-keys',
      name: 'Cryptographic Root Keys & Master Secret Vaulting',
      classification: 'Top Secret / Master Identity & Cryptographic Asset in Ichapur',
      assetType: 'FIPS 140-2 Level 3 Hardware Root-of-Trust Signing Keys',
      vulnerability: 'RAM memory dumping (Mimikatz) extracting plaintext encryption keys.',
      protectionControl: 'Hardware Security Module (HSM) On-Chip Cryptographic Execution',
      estBudget: '₹8,20,000 (FIPS 140-2 Level 3 Physical HSM Appliance Cluster)',
      desc: 'Ensures cryptographic keys live and execute strictly inside physical tamper-proof hardware.',
      simResult: 'Adversary gains root admin shell on application server -> Attempts memory dump -> Master keys reside inside HSM silicon -> Zero key leakage.',
    },
    {
      id: 'crypto-shredding',
      name: 'Media Sanitization & NIST SP 800-88 Crypto-Shredding',
      classification: 'Decommissioned Storage & Multi-Cloud Asset Sanitization in Jadavpur',
      assetType: '50 Terabytes of Historical Medical Diagnostic Imaging Archives',
      vulnerability: 'Dump-diving and forensic disk recovery from decommissioned storage arrays.',
      protectionControl: 'Instant Master Key Crypto-Shredding + NIST SP 800-88 Degaussing Verification',
      estBudget: '₹1,60,000 (Automated KMS Key Crypto-Shredding & Storage Erasure Tool)',
      desc: 'Permanently renders massive encrypted datasets unreadable in milliseconds by destroying master keys.',
      simResult: 'Storage array decommissioning triggered -> KMS purges master encryption key -> 50 TB of ciphertext rendered permanently undecodable in 0.2s.',
    },
  ];

  const currentAsset = assetProfiles.find((a) => a.id === selectedAssetId) || assetProfiles[0];

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
      title: '1. Precision Foundry Intellectual Property & Source Code DLP Vault (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu implemented an enterprise Data Loss Prevention (DLP) and code watermarking platform in Barrackpore for ₹4,50,000. When an engineer attempted to copy proprietary casting algorithms to an unauthorized USB drive, the endpoint DLP agent blocked the transfer and alerted the security team in 1.4s.',
      lesson: 'DLP content inspection prevents insider theft and protects irreplaceable intellectual property assets.',
    },
    {
      title: '2. Diagnostic Clinic Patient Database Tokenization (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed database tokenization and dynamic data masking in Ichapur for ₹3,80,000. Patient Aadhaar numbers and credit cards are replaced with surrogate tokens in production databases, ensuring that even if the web database is breached, zero usable patient credentials can be harvested.',
      lesson: 'Tokenization eliminates sensitive plaintext records from production databases, neutralizing breach impact.',
    },
    {
      title: '3. FinTech Gateway Hardware HSM & Master Key Governance (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a FIPS 140-2 Level 3 Hardware Security Module (HSM) cluster in Kolkata for ₹8,20,000. Master payment encryption keys are generated and executed strictly inside physical tamper-proof silicon, preventing root administrators from exporting cleartext keys.',
      lesson: 'Hardware Security Modules isolate root cryptographic assets completely from host OS vulnerabilities.',
    },
    {
      title: '4. Cyber Security Lab NIST SP 800-88 Crypto-Shredding Testbed (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a storage sanitization and crypto-shredding testbed in Jadavpur for ₹1,60,000. Students test instant crypto-shredding workflows, deleting master KMS keys to permanently render 50 TB of simulated sensitive financial records unrecoverable across multi-cloud storage instances.',
      lesson: 'Crypto-shredding guarantees irreversible asset destruction at the end of the data lifecycle.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes assetPulse5 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-asset5 {
          animation: assetPulse5 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Digital Assets • Crown Jewels • Tokenization & Crypto-Shredding in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Digital Assets
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The Classification, Lifecycle & Protection of Digital Assets</span>: mastering Hardware, Software, Information "Crown Jewels", and Cryptographic Secrets, four-tier data classification, tokenization, Hardware Security Modules (HSMs), NIST SP 800-88 crypto-shredding, and asset governance budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'asset-foundations', label: '1. Asset Categories' },
              { id: 'interactive-studio', label: '2. Crown Jewels Studio' },
              { id: 'classification-matrix', label: '3. Classification Matrix' },
              { id: 'svg-lifecycle', label: '4. Asset Lifecycle SVG' },
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

        {/* SECTION 1: Asset Categories */}
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
                What Constitutes a Digital Asset and Why Must it Be Governed?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A Digital Asset is any hardware component, software program, database record, intellectual property, or cryptographic secret owned or managed by an organization that possesses strategic, operational, financial, or legal value. Protecting digital assets requires full visibility across the entire asset lifecycle, ensuring the organization's "Crown Jewels" receive top-tier cryptographic defense.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Hardware Assets</span>
                <p className="text-slate-300 text-xs">Servers, SAN arrays, core routers, switches, and physical HSM appliances.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Software & Code</span>
                <p className="text-slate-300 text-xs">Proprietary source repositories, CI/CD pipelines, ERP, and AI model weights.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Crown Jewels Data</span>
                <p className="text-slate-300 text-xs">Customer PII, Aadhaar registries, banking ledgers, and patient EHR records.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Cryptographic Secrets (₹)</span>
                <p className="text-slate-300 text-xs">Master encryption keys, SSL private certificates, and API authentication tokens.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Crown Jewels Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-asset5">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Digital Asset Classification & Crown Jewels Protection Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a critical digital asset category to inspect its sensitivity tier, vulnerability vectors, cryptographic controls, and simulated threat mitigation:
            </p>

            {/* Asset Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {assetProfiles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedAssetId(a.id);
                    setAssetSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedAssetId === a.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {a.name.split('&')[0]}
                </button>
              ))}
            </div>

            {/* Active Asset Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentAsset.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Protection Budget: {currentAsset.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Sensitivity Tier & Context:</span>
                <span className="text-sky-300 font-bold">{currentAsset.classification}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Asset Type & Scope:</span>
                <span className="text-slate-300">{currentAsset.assetType}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Primary Threat / Leak Vector:</span>
                  <span className="text-slate-300">{currentAsset.vulnerability}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Mandatory Defensive Control:</span>
                  <span className="text-slate-300">{currentAsset.protectionControl}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Digital Asset Protection & Audit Simulation:
                  </span>
                  <button
                    onClick={() => setAssetSimLog(currentAsset.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Run Asset Audit ▶
                  </button>
                </div>

                {assetSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛡️ <strong>Asset Protection Telemetry:</strong> {assetSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Classification Matrix */}
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
                The Four-Tier Data Classification & Crown Jewels Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Tier Level</th>
                    <th className="p-2.5 text-sky-400">Classification Label</th>
                    <th className="p-2.5 text-rose-400">Impact if Breached</th>
                    <th className="p-2.5 text-emerald-400">Required Safeguard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Tier 1</td>
                    <td className="p-2.5 text-sky-300">Public</td>
                    <td className="p-2.5 text-slate-400">Zero impact; public data</td>
                    <td className="p-2.5 text-emerald-300">Integrity verification (Anti-Defacement)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Tier 2</td>
                    <td className="p-2.5 text-sky-300">Internal</td>
                    <td className="p-2.5 text-amber-300">Low to moderate operational disruption</td>
                    <td className="p-2.5 text-emerald-300">Standard user authentication + Firewalls</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Tier 3</td>
                    <td className="p-2.5 text-sky-300">Confidential</td>
                    <td className="p-2.5 text-rose-300">High financial & competitive loss</td>
                    <td className="p-2.5 text-emerald-300">AES-256 Encryption + DLP + RBAC</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Tier 4</td>
                    <td className="p-2.5 text-sky-300">Restricted / Crown Jewels</td>
                    <td className="p-2.5 text-rose-400 font-bold">Catastrophic bankruptcy, legal fines</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Tokenization + Hardware HSM + FIDO2 MFA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Asset Lifecycle SVG */}
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
                The Six Stages of the Digital Asset Security Lifecycle
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1: Creation & Classify */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. CREATE & CLASSIFY</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Data Ingestion • Tagging</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Crown Jewels Identification</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 2: Store & Encrypt */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. STORE & ENCRYPT</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">AES-256 • Tokenization</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Hardware HSM Vaulting</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 3: Use & Archive */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. USE & ARCHIVE</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">RBAC • Dynamic Masking</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Immutable WORM Backups</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 4: Crypto-Shred */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. SANITIZATION</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">NIST SP 800-88 Degaussing</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Instant Crypto-Shredding</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  DIGITAL ASSET GOVERNANCE: SAFEGUARDING CROWN JEWELS FROM CREATION TO CRYPTO-SHREDDING
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Hardware ITAM Inventory • Software SBOM Scanning • Data Tokenization • Hardware Security Modules (HSMs)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Enterprise Data Loss Prevention (DLP) & Tokenization Gateway Stacks (₹4,80,000 Setup)
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
                Bengal Operations & Digital Asset Protection Case Studies
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
                  trap: 'Hardcoding Plaintext API Keys, Database Passwords, or Private Certificates in Source Code',
                  fix: 'Adversaries scan public Git repositories continuously. Use dynamic secrets managers (HashiCorp Vault / AWS Secrets Manager) with automatic rotation.',
                },
                {
                  trap: 'Treating All Enterprise Data Equally Instead of Classifying Crown Jewels for Targeted Defense',
                  fix: 'Applying uniform controls either under-protects crown jewels or creates unworkable friction for public files. Implement four-tier data classification.',
                },
                {
                  trap: 'Disposing of Old Storage Drives Without Verifiable Media Sanitization or Crypto-Shredding',
                  fix: 'Simple OS file deletion leaves underlying data recoverable by forensic software. Enforce NIST SP 800-88 degaussing or KMS crypto-shredding.',
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
                  Think of Data Tokenization like a coat-check ticket at an upscale hotel: you hand over your expensive coat (credit card) and get a plastic ticket (token); if a pickpocket steals your ticket, they have a piece of plastic with zero intrinsic value!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Crypto-Shredding deletes the master KMS key, instantly rendering 50 Terabytes of encrypted disk blocks mathematically indistinguishable from random noise!
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the four core categories of digital assets (Hardware, Software, Data, Secrets)',
                'Evaluated the four-tier Data Classification model and identified organizational Crown Jewels',
                'Analyzed the 6 stages of the Digital Asset Lifecycle from creation to crypto-shredding',
                'Understood Data Tokenization vs Dynamic Data Masking and RBI compliance mandates',
                'Investigated IT Asset Management (ITAM), CMDB discovery, and Software Bill of Materials (SBOM)',
                'Formulated realistic enterprise DLP and asset protection budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Knowing and classifying your digital assets is step zero in cyber security. You cannot protect what you do not know you own. In our next topic (Topic 6), we will explore the dynamic Cyber Threat Landscape in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Digital Assets FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Digital Assets in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
