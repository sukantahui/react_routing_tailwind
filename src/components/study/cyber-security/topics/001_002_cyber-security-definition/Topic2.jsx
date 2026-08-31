// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic2.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 2: Importance of Cyber Security

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedImportanceId, setSelectedImportanceId] = useState('fintech-trust');
  const [importanceSimLog, setImportanceSimLog] = useState(null);

  const importanceProfiles = [
    {
      id: 'fintech-trust',
      name: 'FinTech & UPI Digital Economy Trust Anchor',
      dimension: 'Economic Prosperity & High-Velocity Digital Payments in Kolkata',
      strategicValue: 'Enables 10+ Billion monthly UPI transactions worth ₹18 Lakh Crore with sub-0.001% fraud rate.',
      riskMitigated: 'Prevents wholesale collapse of digital public banking confidence and mass panic cash withdrawals.',
      lossPrevented: 'Preserved ₹1.8 Crore in prevented card fraud • Guaranteed Economic Velocity',
      estInvestment: '₹6,50,000 (AI Real-Time Fraud Scoring & Payment HSM Cluster)',
      desc: 'Illustrates how cybersecurity serves as the essential bedrock enabling modern cashless economic growth.',
      simResult: 'Fraud detection engine analyzes transaction velocity → Flags suspicious ₹1,50,000 overseas card swipe → Blocks fraud in 35ms → Funds protected.',
    },
    {
      id: 'sovereign-defense',
      name: 'National Sovereignty & Fifth Domain Warfare Defense',
      dimension: 'National Defense & Military Command Integrity in West Bengal',
      strategicValue: 'Secures sovereign radar networks, air defense grids, and classified communications from foreign state espionage.',
      riskMitigated: 'Prevents foreign cyber warfare units from remotely blinding defense radars or disrupting troop logistics.',
      lossPrevented: 'Protects Territorial Integrity • Zero Foreign Cyber Espionage Incursions',
      estInvestment: '₹18,50,000 (Sovereign Hardware Cryptographic Vault & Air-Gapped Network)',
      desc: 'Demonstrates why cybersecurity is a core pillar of national military strength and geopolitical autonomy.',
      simResult: 'Foreign APT attempts port scan on defense satellite uplink → Hardware encryption rejects unauthenticated signal → Defense radar stays 100% online.',
    },
    {
      id: 'privacy-shield',
      name: 'Fundamental Human Privacy & Identity Protection',
      dimension: 'Constitutional Right to Privacy & Identity Theft Defense in Ichapur',
      strategicValue: 'Guarantees that 85,000 citizens’ biometrics, medical histories, and personal finances remain strictly confidential.',
      riskMitigated: 'Stops criminal syndicates from exploiting leaked Aadhaar/PAN records for fraudulent loans and extortion.',
      lossPrevented: 'Zero Identity Thefts • 100% Compliance with DPDPA 2023 & Article 21',
      estInvestment: '₹3,20,000 (Database Column Encryption & Privacy Access Governance)',
      desc: 'Proves how cybersecurity defends personal human dignity, individual freedom, and citizen privacy in a digital world.',
      simResult: 'Unauthorized query for patient HIV/cardiology diagnosis submitted → Column-level AES-256 blocks cleartext view → Logs audit alert.',
    },
    {
      id: 'r-and-d-vault',
      name: 'Intellectual Property (IP) & R&D Innovation Vault',
      dimension: 'Corporate Competitiveness & Engineering R&D in Barrackpore',
      strategicValue: 'Shields proprietary aerospace casting formulas and automated CNC robotics source code from rival corporate theft.',
      riskMitigated: 'Prevents foreign industrial competitors from stealing 5 years of R&D worth ₹25 Crore.',
      lossPrevented: 'Protected ₹25 Crore in R&D Patents • Secured Market Leadership',
      estInvestment: '₹4,80,000 (Privileged Access Management - PAM & Code Watermarking Vault)',
      desc: 'Shows how cybersecurity gives corporations and research scientists the confidence to innovate and create new technologies.',
      simResult: 'Compromised insider tries to copy proprietary blueprint to USB → DLP blocks USB transfer & PAM revokes session in 1.8 seconds.',
    },
  ];

  const currentImportance = importanceProfiles.find((i) => i.id === selectedImportanceId) || importanceProfiles[0];

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
      title: '1. Precision Foundry Intellectual Property & PAM Vaulting (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu implemented an enterprise Privileged Access Management (PAM) solution in Barrackpore for ₹4,80,000. Vaulting all root credentials and recording administrative sessions secured proprietary CNC robotic casting blueprints from insider corporate espionage.',
      lesson: 'Privileged Access Management protects irreplaceable corporate intellectual property and engineering trade secrets.',
    },
    {
      title: '2. Diagnostic Clinic Patient Privacy & Ledger Immutability (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed cryptographic Merkle-tree database logging and AES-256 encryption in Ichapur for ₹3,20,000. Patient lab reports and billing ledgers are cryptographically sealed against silent tampering, preserving medical diagnostic integrity and patient confidentiality.',
      lesson: 'Cryptographic ledger sealing defends patient privacy and prevents fraudulent alteration of clinical medical records.',
    },
    {
      title: '3. FinTech Gateway UPI Anti-Fraud Scoring System (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata architected a high-throughput AI Fraud Management System (FMS) in Kolkata for ₹6,50,000. Evaluating transaction velocity and geolocation within 35 milliseconds, the system blocked ₹1.8 Crore in fraudulent unauthorized card swipes during festive peak shopping weeks.',
      lesson: 'Real-time AI fraud detection maintains public trust and enables high-velocity national digital commerce.',
    },
    {
      title: '4. Cyber Security Lab SASE Zero Trust & Penetration Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila led a comprehensive SASE Zero Trust penetration testing audit in Jadavpur for ₹1,50,000. Closing four critical cloud misconfiguration vectors enabled a local tech startup to achieve SOC-2 Type II compliance and secure ₹15 Crore in international venture capital funding.',
      lesson: 'Robust cybersecurity posture unlocks institutional investor trust, accelerating tech startup growth and valuation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes impPulse2 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-imp2 {
          animation: impPulse2 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Importance of Cyber Security • Economic Value • National Sovereignty & Privacy in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Importance of Cyber Security
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The Strategic, Economic & Societal Importance of Cyber Security</span>: analyzing its vital role in upholding public trust in FinTech/UPI, defending national sovereignty in the 5th domain of warfare, safeguarding constitutional privacy rights, preserving intellectual property, and cybersecurity investment budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'imp-foundations', label: '1. Strategic Dimensions' },
              { id: 'interactive-studio', label: '2. Strategic Value Studio' },
              { id: 'dimensions-matrix', label: '3. Value Comparison Matrix' },
              { id: 'svg-dimensions', label: '4. Importance Pillars SVG' },
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

        {/* SECTION 1: Strategic Dimensions */}
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
                Why is Cyber Security the Bedrock of Modern Civilization?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cyber Security is the invisible shield protecting every facet of 21st-century human progress. Beyond preventing technical hacks, cybersecurity creates the foundational trust required for digital commerce to flourish, defends national sovereignty against geopolitical adversaries, guarantees constitutional privacy rights for citizens, and safeguards groundbreaking research and innovation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Digital Economy</span>
                <p className="text-slate-300 text-xs">Underpins trillions in cashless UPI banking and e-commerce consumer trust.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. 5th Warfare Domain</span>
                <p className="text-slate-300 text-xs">Defends military command, radar, and sovereign borders from cyber warfare.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Privacy & Human Rights</span>
                <p className="text-slate-300 text-xs">Protects personal data and dignity from mass corporate surveillance and extortion.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. R&D Innovation (₹)</span>
                <p className="text-slate-300 text-xs">Safeguards multi-crore intellectual property patents and AI models from theft.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Strategic Value Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-imp2">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Importance of Cyber Security & Strategic Value Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a strategic dimension to inspect the immense economic, societal, and geopolitical value generated by robust cybersecurity investments:
            </p>

            {/* Importance Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {importanceProfiles.map((i) => (
                <button
                  key={i.id}
                  onClick={() => {
                    setSelectedImportanceId(i.id);
                    setImportanceSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedImportanceId === i.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {i.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Importance Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentImportance.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Strategic Investment Budget: {currentImportance.estInvestment}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Strategic Dimension & Scale:</span>
                <span className="text-sky-300 font-bold">{currentImportance.dimension}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Value Creation & Growth Driver:</span>
                <span className="text-slate-300">{currentImportance.strategicValue}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Catastrophic Risk Prevented:</span>
                  <span className="text-slate-300">{currentImportance.riskMitigated}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Quantified Business / Sovereign Benefit:</span>
                  <span className="text-emerald-300 font-bold">{currentImportance.lossPrevented}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Strategic Value & Threat Interception Simulation:
                  </span>
                  <button
                    onClick={() => setImportanceSimLog(currentImportance.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Run Value Simulation ▶
                  </button>
                </div>

                {importanceSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    💎 <strong>Strategic Value Audit:</strong> {importanceSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Value Comparison Matrix */}
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
                Multi-Dimensional Importance of Cyber Security Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Domain</th>
                    <th className="p-2.5 text-sky-400">Strategic Importance</th>
                    <th className="p-2.5 text-rose-400">Impact of Security Failure</th>
                    <th className="p-2.5 text-emerald-400">Enabling Security Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">National Economy</td>
                    <td className="p-2.5 text-sky-300">Guarantees trust in digital payments (UPI/IMPS)</td>
                    <td className="p-2.5 text-rose-300">Mass financial fraud, economic collapse</td>
                    <td className="p-2.5 text-emerald-300">AI Fraud Management & Payment HSMs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Sovereign Defense</td>
                    <td className="p-2.5 text-sky-300">Protects 5th domain military command & radar</td>
                    <td className="p-2.5 text-rose-300">Hostile electronic sabotage, lost airspace control</td>
                    <td className="p-2.5 text-emerald-300">Air-Gapped Sovereign Hardware Cryptography</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Human Privacy</td>
                    <td className="p-2.5 text-sky-300">Protects constitutional fundamental privacy rights</td>
                    <td className="p-2.5 text-rose-300">Mass citizen surveillance, identity blackmail</td>
                    <td className="p-2.5 text-emerald-300">AES-256 Encryption & DPDPA Governance</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">R&D Innovation</td>
                    <td className="p-2.5 text-sky-300">Safeguards patents, source code & AI models</td>
                    <td className="p-2.5 text-rose-300">Corporate espionage, lost competitive edge</td>
                    <td className="p-2.5 text-emerald-300">Privileged Access Management (PAM) & DLP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Importance Pillars SVG */}
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
                The Four Pillars of Cyber Security's Societal & Strategic Importance
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Pillar 1: Economic Trust */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. ECONOMIC TRUST</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">₹18 Lakh Crore UPI/Month</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Underpins Modern Commerce</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Pillar 2: National Sovereignty */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. SOVEREIGN DEFENSE</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">5th Domain of Warfare</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Protects Military Command</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Pillar 3: Human Privacy */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. HUMAN PRIVACY</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Constitutional Right (Art 21)</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Prevents Mass Surveillance</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Pillar 4: IP & Innovation */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="640" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">4. IP INNOVATION</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Protects Multi-Crore R&D</text>
                <text x="640" y="73" fill="#fda4af" fontSize="7" textAnchor="middle">Enables Tech Breakthroughs</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STRATEGIC VALUE PROPOSITION: CYBER SECURITY ENABLES CONFIDENT INNOVATION AND PROGRESS
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Protecting Shareholder Value & Brand Equity • SASE Cloud Access • Privileged Access Management (PAM)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Proactive Risk-Driven Security Posture • Enterprise PAM & Penetration Testing Retainers (₹4,80,000 Setup)
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
                Bengal Operations & Strategic Value Case Studies
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
                  trap: 'Treating Cyber Security Purely as a Technical IT Job Rather than an Enterprise Business Priority',
                  fix: 'Cybersecurity failure affects corporate reputation, legal compliance, and customer trust. Senior leadership and boards must actively govern cyber risk.',
                },
                {
                  trap: 'Relying Exclusively on Compliance Checklists to Guarantee Security',
                  fix: 'Checkbox compliance satisfies legal minimums but leaves gaps for emerging attacks. Adopt a proactive, threat-informed risk-driven security model.',
                },
                {
                  trap: 'Ignoring Privileged Account Access and Allowing Shared Root Passwords',
                  fix: 'Shared administrative credentials prevent non-repudiation and enable insider theft. Enforce Privileged Access Management (PAM) with temporary session vaulting.',
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
                  Think of Cyber Security like the vault walls and armored trucks of the digital age: without them, no one would dare store their wealth or build an empire in the digital realm!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how cybersecurity acts as an economic accelerator—investing ₹4,80,000 in PAM and zero-trust security protects ₹25 Crore in proprietary R&D patents!
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood the strategic economic importance of cybersecurity in modern FinTech and commerce',
                'Analyzed cyberspace as the 5th domain of warfare and national sovereign defense',
                'Evaluated the protection of fundamental human privacy, intellectual property, and R&D',
                'Differentiated between Compliance-Driven Security and Risk-Driven Security',
                'Investigated Secure Access Service Edge (SASE) and Privileged Access Management (PAM)',
                'Formulated realistic enterprise PAM and penetration testing budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Recognizing the profound strategic importance of cyber security empowers you to protect not just code, but the future of society. In our next topic (Topic 3), we will explore the Goals of Cyber Security in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Importance of Cyber Security FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Importance of Cyber Security in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
