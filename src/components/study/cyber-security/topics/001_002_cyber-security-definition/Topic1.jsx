// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic1.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 1: Need of Cyber Security

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedNeedId, setSelectedNeedId] = useState('ransomware-interruption');
  const [needSimLog, setNeedSimLog] = useState(null);

  const needProfiles = [
    {
      id: 'ransomware-interruption',
      name: 'Ransomware Extortion & Business Continuity Protection',
      threatContext: 'Manufacturing Foundry in Barrackpore (200 Industrial PCs)',
      withoutSecurity: 'Catastrophic data encryption, 14 days factory shutdown, ₹1.2 Crore loss in downtime & ransom demands.',
      withSecurity: 'Immutable air-gapped backups + Endpoint EDR isolates malware in 12s, 0 downtime, ₹0 ransom paid.',
      legalFinancialBenefit: 'Saved ₹1.2 Crore in extortion & business interruption • 100% Data Restored',
      estBudget: '₹3,50,000 (EDR Platform & Immutable Cloud Backup Vault)',
      desc: 'Demonstrates why robust cyber security is vital to prevent catastrophic financial ruin from ransomware.',
      simResult: 'Ransomware dropped via malicious email &rarr; EDR detects behavioral mass file encryption -&gt; Kills process & rolls back snapshot in 12 seconds.',
    },
    {
      id: 'bec-wire-fraud',
      name: 'Business Email Compromise (BEC) & Financial Wire Defense',
      threatContext: 'Export Enterprise Headquarters in Kolkata',
      withoutSecurity: 'Accountant falls for spoofed CEO email, transfers ₹45,00,000 to fraudulent overseas offshore account.',
      withSecurity: 'Domain DMARC enforcement + Dual-authorization policy blocks unauthorized wire transfer instantly.',
      legalFinancialBenefit: 'Saved ₹45,00,000 direct financial theft • Zero Cash Flow Disruption',
      estBudget: '₹1,80,000 (Email Security Gateway & DMARC Enforcement Module)',
      desc: 'Shows how social engineering defenses prevent multi-lakh financial wire fraud without needing malware.',
      simResult: 'Spoofed vendor email requests bank account change -> Email Gateway flags DMARC failure -> Flags "SUSPICIOUS BEC" -> Transfer aborted.',
    },
    {
      id: 'dpdpa-data-compliance',
      name: 'DPDPA 2023 Statutory Compliance & Penalty Shield',
      threatContext: 'Diagnostic Clinic Patient Database in Ichapur (85,000 Records)',
      withoutSecurity: 'Unencrypted SQL database leaked online -> Data Protection Board imposes ₹50 Crore statutory penalty.',
      withSecurity: 'AES-256 database encryption at rest + Role-based access control prevents data leakage & passes CERT-In audit.',
      legalFinancialBenefit: 'Shields organization from up to ₹250 Crore statutory fines • Preserves Trust',
      estBudget: '₹2,40,000 (Database Encryption Licenses & Access Governance)',
      desc: 'Illustrates the legal necessity of cybersecurity to comply with India’s Digital Personal Data Protection Act.',
      simResult: 'Adversary attempts unauthenticated database dump -> AES-256 column encryption returns unreadable ciphertext -> Zero PII exposed.',
    },
    {
      id: 'cni-power-grid',
      name: 'Critical Infrastructure (CNI) SCADA Power Grid Defense',
      threatContext: 'State Electric Grid Substation Network in Jadavpur',
      withoutSecurity: 'Foreign APT malware opens high-voltage circuit breakers, plunging 450,000 citizens into a blackout.',
      withSecurity: 'Unidirectional optical data diode physically blocks inbound malicious commands while streaming live grid data.',
      legalFinancialBenefit: 'Guarantees 100% Grid Stability • Protects Public Safety & National Security',
      estBudget: '₹12,50,000 (Military-Grade Hardware Data Diodes & 24/7 MDR)',
      desc: 'Proves why cybersecurity is a national defense priority protecting life-critical public utilities.',
      simResult: 'Hostile actor attempts remote SCADA exploit injection -> Physical data diode blocks return light pulses -> Power grid operates flawlessly.',
    },
  ];

  const currentNeed = needProfiles.find((n) => n.id === selectedNeedId) || needProfiles[0];

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
      title: '1. Precision Foundry Supply Chain & BEC Wire Fraud Interception (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu implemented strict dual-authorization wire transfer protocols and domain DMARC authentication in Barrackpore for ₹1,80,000. The system intercepted a spoofed ₹35,00,000 fraudulent supplier invoice, saving the foundry from catastrophic cash flow loss.',
      lesson: 'Dual-authorization policies and DMARC prevent massive financial losses caused by executive impersonation.',
    },
    {
      title: '2. Diagnostic Clinic DPDPA Compliance & Encryption Rollout (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima led a comprehensive DPDPA 2023 data compliance overhaul for an Ichapur healthcare clinic for ₹2,40,000. Encrypting 85,000 patient diagnostic files with AES-256 and enforcing role-based access eliminated regulatory non-compliance exposure and protected patient privacy.',
      lesson: 'Data encryption at rest is mandatory under Indian law to avoid multi-crore statutory data breach penalties.',
    },
    {
      title: '3. Smart Power Grid SCADA Cyber Resilience Architecture (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a 24/7 Managed Detection and Response (MDR) and SCADA data diode solution for a Kolkata electric utility for ₹12,50,000. When a foreign botnet launched targeted credential stuffing against grid VPNs, automated AI defenses neutralized the attack in 8 seconds with zero power outages.',
      lesson: 'Critical infrastructure requires continuous 24/7 MDR and physical data diodes to guarantee uninterrupted public services.',
    },
    {
      title: '4. Cyber Security Lab Ransomware & Cyber Insurance Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila audited corporate cyber insurance prerequisites in Jadavpur for ₹95,000. Enforcing 100% FIDO2 hardware MFA, immutable air-gapped backups, and EDR enabled a regional software firm to secure a ₹10,00,00,000 cyber insurance policy at a 40% reduced annual premium.',
      lesson: 'Meeting rigorous cybersecurity baselines is a mandatory prerequisite for securing enterprise cyber insurance.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes needPulse1 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-need1 {
          animation: needPulse1 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Need of Cyber Security • Financial Risk • DPDPA 2023 & Critical Infrastructure in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Need of Cyber Security
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Why Cyber Security is Essential for Modern Survival</span>: analyzing the explosive expansion of digital attack surfaces, multi-crore ransomware extortion risks, statutory compliance under India's DPDPA 2023 (up to ₹250 Crore fines), Critical National Infrastructure (CNI) protection, and risk budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'need-foundations', label: '1. Primary Drivers' },
              { id: 'interactive-studio', label: '2. Impact Simulator' },
              { id: 'drivers-matrix', label: '3. Threat & Impact Matrix' },
              { id: 'svg-drivers', label: '4. Cyber Drivers SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Primary Drivers */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Why Can No Modern Organization Survive Without Cyber Security?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In the modern hyper-connected era, every business process, financial transaction, medical procedure, and government service operates on digital software and networks. Without robust cybersecurity safeguards, organizations face devastating ransomware shutdowns, intellectual property theft, legal bankruptcy under stringent privacy regulations (DPDPA 2023), and physical infrastructure sabotage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Financial Protection</span>
                <p className="text-slate-300 text-xs">Shielding organizations from multi-crore ransomware extortion and wire fraud.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Critical Infrastructure</span>
                <p className="text-slate-300 text-xs">Preventing cyber warfare sabotage of power grids, water, and transport.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. DPDPA 2023 Mandate</span>
                <p className="text-slate-300 text-xs">Statutory legal compliance avoiding fines up to ₹250 crore per data breach.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Human Life Safety (₹)</span>
                <p className="text-slate-300 text-xs">Safeguarding connected medical IoMT ventilators and smart vehicle drivetrains.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Impact Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-need1">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Need of Cyber Security & Threat Impact Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a critical operational risk scenario to compare the catastrophic consequences of operating WITHOUT cybersecurity versus the defensive resilience of operating WITH cybersecurity:
            </p>

            {/* Need Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {needProfiles.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelectedNeedId(n.id);
                    setNeedSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedNeedId === n.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {n.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Need Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentNeed.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Defensive Investment Budget: {currentNeed.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Operational Threat Context:</span>
                <span className="text-sky-300 font-bold">{currentNeed.threatContext}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-rose-950/40 rounded-xl border border-rose-800/60 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">❌ Impact WITHOUT Cyber Security:</span>
                  <span className="text-slate-300">{currentNeed.withoutSecurity}</span>
                </div>
                <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-800/60 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">✅ Outcome WITH Cyber Security:</span>
                  <span className="text-slate-300">{currentNeed.withSecurity}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Financial & Legal Benefit:</span>
                <span className="text-emerald-300 font-bold">{currentNeed.legalFinancialBenefit}</span>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Threat Attack & Resilience Simulation:
                  </span>
                  <button
                    onClick={() => setNeedSimLog(currentNeed.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Run Impact Simulation ▶
                  </button>
                </div>

                {needSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛡️ <strong>Threat Mitigation Log:</strong> {needSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Threat & Impact Matrix */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Key Drivers for Cyber Security & Impact Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Driver Category</th>
                    <th className="p-2.5 text-rose-400">Threat / Risk Vector</th>
                    <th className="p-2.5 text-sky-400">Potential Business Impact</th>
                    <th className="p-2.5 text-emerald-400">Mandatory Defense Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Financial Wealth</td>
                    <td className="p-2.5 text-rose-300">Ransomware & Wire Fraud (BEC)</td>
                    <td className="p-2.5">Direct multi-lakh fund theft, cash flow collapse</td>
                    <td className="p-2.5 text-emerald-300">Immutable Backups + Dual Auth</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Statutory Law</td>
                    <td className="p-2.5 text-rose-300">Unencrypted Data Leaks (PII)</td>
                    <td className="p-2.5">DPDPA fines up to ₹250 Crore per breach</td>
                    <td className="p-2.5 text-emerald-300">AES-256 Encryption + DLP</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Critical Infrastructure</td>
                    <td className="p-2.5 text-rose-300">SCADA/ICS Cyber Sabotage</td>
                    <td className="p-2.5">Widespread power blackouts & municipal disruption</td>
                    <td className="p-2.5 text-emerald-300">Optical Data Diodes + Air-Gap</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Human Life Safety</td>
                    <td className="p-2.5 text-rose-300">Medical IoMT & Smart Car Exploits</td>
                    <td className="p-2.5">Altered drug dosages, loss of vehicular control</td>
                    <td className="p-2.5 text-emerald-300">Biomedical VLAN Microsegmentation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Cyber Drivers SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Four Foundational Pillars Driving the Need for Cyber Security
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Pillar 1: Financial Continuity */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. FINANCIAL ASSETS</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Ransomware • BEC Fraud</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Prevents Multi-Crore Loss</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Pillar 2: Critical Infrastructure */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. CRITICAL CNI</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Power Grids • Water • Rail</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">National Sovereign Security</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Pillar 3: Legal Mandates */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. STATUTORY LAWS</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">DPDPA 2023 • IT Act</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Avoids ₹250 Crore Fines</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Pillar 4: Human Life Safety */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. HUMAN SAFETY</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Medical IoMT • Connected Cars</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Prevents Physical Harm</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE ESSENTIAL VALUE OF CYBER SECURITY: PRESERVING HUMAN LIFE, WEALTH & DIGITAL TRUST
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Mitigating Ransomware Extortion • Complying with India DPDPA 2023 • Securing Supply Chains & Critical Power
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Enterprise SIEM Threat Analytics • Managed Detection and Response (MDR) Budgets (₹4,50,000 Setup)
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations & Risk Mitigation Case Studies
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
                &gt;
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
        &gt;
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
                  trap: 'Viewing Cyber Security as an Optional IT Cost Rather Than a Core Business Enabler',
                  fix: 'A single ransomware breach can inflict multi-crore losses and bankrupt a business. View cybersecurity as non-negotiable risk governance.',
                },
                {
                  trap: 'Assuming Small Organizations Are Too Insignificant to Be Targeted by Hackers',
                  fix: 'Automated internet botnets scan all IP addresses indiscriminately, and attackers target small vendors as stepping stones to breach large clients.',
                },
                {
                  trap: 'Executing High-Value Financial Wire Transfers Based Solely on an Email Request',
                  fix: 'Adversaries routinely spoof executive email accounts via Business Email Compromise (BEC). Mandate verbal out-of-band confirmation for all wire transfers.',
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
        &gt;
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
                  Think of Cyber Security like the brakes and airbags on a high-speed sports car: they do not exist to slow you down—they exist so that you can drive at maximum speed with confidence and safety!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how India’s DPDPA 2023 mandates reasonable security safeguards under penalty of ₹250 Crore per breach, making data protection a legal imperative!
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the core drivers necessitating cybersecurity across modern digital ecosystems',
                'Evaluated financial risk, business interruption costs, and ransomware double extortion',
                'Analyzed the Digital Personal Data Protection Act (DPDPA 2023) and ₹250 crore penalty framework',
                'Understood Critical National Infrastructure (CNI) protection and human life safety',
                'Differentiated between traditional Cyber Security and Cyber Resilience',
                'Formulated realistic enterprise cybersecurity and SIEM budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Understanding why we need cybersecurity transforms technical tools into a mission of human and societal defense. In our next topic (Topic 2), we will explore the Importance of Cyber Security in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Need of Cyber Security FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Need of Cyber Security in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
