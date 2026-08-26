// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic10.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 10: Applications of Cyber Security

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic10_files/topic10_note.txt?raw';

const Topic10 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedSectorId, setSelectedSectorId] = useState('fintech-banking');
  const [sectorSimLog, setSectorSimLog] = useState(null);

  const sectorProfiles = [
    {
      id: 'fintech-banking',
      name: 'Banking, FinTech & UPI Digital Payments',
      domainContext: 'Real-Time High-Volume Payment Processing across Kolkata & India',
      securityStack: 'FIPS 140-2 Level 3 Hardware Security Modules (HSMs) + AI Fraud Velocity Engine',
      complianceSLA: 'Sub-35ms Transaction Velocity Scoring • 100% Zero Cleartext PIN/CVV Exposure',
      estBudget: '₹14,50,000 (PCI-DSS HSM Appliance & AI Real-Time Fraud Gateway)',
      desc: 'Secures high-throughput digital financial ledgers, preventing fraudulent transactions in milliseconds.',
      simResult: 'Adversary attempts credential-stuffing payments (50 txns/sec) -> AI engine flags velocity anomaly -> Blocks card handoff in 28ms -> ₹18,00,000 Saved.',
    },
    {
      id: 'healthcare-iomt',
      name: 'Healthcare, EHR & Biomedical IoMT Isolation',
      domainContext: 'Diagnostic Hospital Networks & Patient EHR Databases in Ichapur',
      securityStack: 'AES-256 Column Encryption + Microsegmented Biomedical VLANs + X.509 Lab Signatures',
      complianceSLA: 'DPDPA 2023 & HIPAA Compliance • 100% Non-Repudiable Pathologist Signatures',
      estBudget: '₹5,50,000 (Healthcare EHR Cryptographic Vault & Microsegmented IoMT Switches)',
      desc: 'Protects electronic health records from data theft and isolates connected ICU medical devices.',
      simResult: 'Billing PC infected with trojan -> Attempts lateral scan to infusion pumps -> Microsegmentation drops all unauthorized biomedical packets.',
    },
    {
      id: 'ecommerce-retail',
      name: 'E-Commerce, Web Retail & Anti-Magecart Shield',
      domainContext: 'High-Traffic Festive Online Shopping Portals in Barrackpore',
      securityStack: 'Cloud Web Application Firewall (WAF) + Content Security Policy (CSP) + Anti-Bot Engine',
      complianceSLA: 'Real-Time OWASP Top 10 Blocking • Zero Client-Side Form Sniffing (Anti-Magecart)',
      estBudget: '₹4,80,000 (Cloud WAF & Client-Side Script Integrity Gateway)',
      desc: 'Protects online shoppers from credit card skimming and automated scalping bots during flash sales.',
      simResult: 'Malicious third-party ad script attempts to read credit card input fields -> Strict CSP header blocks unauthorized script execution in 4ms.',
    },
    {
      id: 'smartgrid-transport',
      name: 'Smart Grid Energy & Autonomous Transportation',
      domainContext: 'Metropolitan Electrical Grid Substations & Metro Rail in Jadavpur',
      securityStack: 'Unidirectional Optical Data Diodes + Mutual TLS (mTLS) + CAN Bus SecOC Authentication',
      complianceSLA: 'Five Nines (99.999%) Operational Reliability • Sub-18ms Failsafe Interlock Trigger',
      estBudget: '₹12,50,000 (SCADA Optical Data Diode & Smart Grid mTLS Head-End Hub)',
      desc: 'Guarantees uninterrupted electrical power distribution and tamper-proof autonomous train control.',
      simResult: 'Rogue substation packet attempts to open 220kV circuit breaker -> SCADA optical diode blocks transmission -> Grid frequency remains 50.0 Hz.',
    },
  ];

  const currentSector = sectorProfiles.find((s) => s.id === selectedSectorId) || sectorProfiles[0];

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
      title: '1. Precision Foundry Industrial DevSecOps & Cloud CSPM Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu integrated automated SAST scanning and cloud CSPM monitoring in Barrackpore for ₹4,80,000. The system automatically detected an unencrypted cloud storage backup containing proprietary casting blueprints, applying automated AES-256 encryption within 4 seconds of creation.',
      lesson: 'Automated DevSecOps pipelines and CSPM scanners detect misconfigurations before software reaches production.',
    },
    {
      title: '2. Diagnostic Clinic Microsegmented Biomedical IoMT Network (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima architected an isolated biomedical VLAN and cryptographic EHR access portal in Ichapur for ₹5,50,000. When a workstation in the billing department was infected with ransomware, the strict microsegmentation prevented malware from traversing to life-critical hospital infusion pumps.',
      lesson: 'Biomedical IoMT microsegmentation isolates life-critical hospital devices from general enterprise IT infections.',
    },
    {
      title: '3. FinTech Payment Gateway Real-Time AI Fraud Scoring (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a high-throughput AI fraud detection engine and PCI-DSS HSM cluster in Kolkata for ₹14,50,000. Analyzing transaction velocity in 28 milliseconds, the system intercepted ₹18,00,000 in fraudulent credential-stuffing payments during festive midnight flash sales.',
      lesson: 'Sub-35ms AI transaction fraud scoring protects millions in digital payments without causing user friction.',
    },
    {
      title: '4. Cyber Security Lab SASE & Smart City SCADA Testbed (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a Smart City SASE and SCADA testing laboratory in Jadavpur for ₹6,20,000. Students test Zero Trust SASE policies, configuring mTLS authentication between 5,000 simulated smart electricity meters and central utility head-end servers.',
      lesson: 'Zero Trust SASE architectures unify cloud security and industrial IoT telemetry into a single manageable plane.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes appPulse10 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-app10 {
          animation: appPulse10 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 10
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Applications of Cyber Security • Cross-Industry Deployments & Zero Trust in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Applications of Cyber Security
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Cross-Industry Cyber Security Architectures & Real-World Deployments</span>: analyzing Banking & FinTech UPI architectures, Healthcare EHR/IoMT microsegmentation, E-Commerce WAF & anti-Magecart protections, Smart Cities & Autonomous Transport, Zero Trust (NIST SP 800-207), DevSecOps CI/CD pipelines, and multi-sector security budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'app-foundations', label: '1. Industry Applications' },
              { id: 'interactive-studio', label: '2. Domain Studio' },
              { id: 'sector-matrix', label: '3. Sector Security Matrix' },
              { id: 'svg-spectrum', label: '4. Applications Spectrum SVG' },
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

        {/* SECTION 1: Industry Applications */}
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
                Where and How is Cyber Security Applied Across Modern Industries?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cybersecurity is an indispensable foundational discipline tailored to the unique operational and regulatory needs of diverse industries. From sub-35 millisecond fraud detection in FinTech banking and biomedical IoMT isolation in hospitals to client-side Magecart protection in e-commerce and optical data diode defense in smart power grids, cybersecurity guarantees business continuity, human privacy, and sovereign infrastructure resilience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Banking & FinTech</span>
                <p className="text-slate-300 text-xs">Payment HSMs, sub-35ms AI transaction fraud scoring, and PCI-DSS 4.0.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Healthcare & IoMT</span>
                <p className="text-slate-300 text-xs">AES-256 EHR encryption, biomedical VLAN isolation, and DPDPA compliance.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. E-Commerce & Retail</span>
                <p className="text-slate-300 text-xs">Cloud WAFs, CSP headers stopping Magecart skimmers, and OAuth tokenization.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Smart Grid & SASE (₹)</span>
                <p className="text-slate-300 text-xs">Optical data diodes, Zero Trust SASE, and DevSecOps CI/CD guardrails.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Domain Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-app10">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Applications of Cyber Security & Domain Architecture Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an industry application domain to inspect tailored defensive technologies, compliance SLAs, operational latency constraints, and simulated security enforcement:
            </p>

            {/* Sector Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {sectorProfiles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSectorId(s.id);
                    setSectorSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedSectorId === s.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {s.name.split(',')[0]}
                </button>
              ))}
            </div>

            {/* Active Sector Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentSector.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Domain Budget: {currentSector.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Operational Deployment Scope:</span>
                <span className="text-sky-300 font-bold">{currentSector.domainContext}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Tailored Security Architecture Stack:</span>
                <span className="text-slate-300">{currentSector.securityStack}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Compliance & Latency SLA:</span>
                  <span className="text-slate-300">{currentSector.complianceSLA}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">Strategic Application Objective:</span>
                  <span className="text-slate-300">{currentSector.desc}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Industry Application Threat Defense Simulation:
                  </span>
                  <button
                    onClick={() => setSectorSimLog(currentSector.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Simulate Industry Defense ▶
                  </button>
                </div>

                {sectorSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛡️ <strong>Application Defense Telemetry:</strong> {sectorSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Sector Security Matrix */}
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
                Cross-Industry Cybersecurity Applications Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Industry Sector</th>
                    <th className="p-2.5 text-sky-400">Primary Digital Asset</th>
                    <th className="p-2.5 text-rose-400">Critical Threat Vector</th>
                    <th className="p-2.5 text-emerald-400">Tailored Security Technology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">1. Banking & FinTech</td>
                    <td className="p-2.5 text-sky-300">UPI Transactions, PINs, Ledgers</td>
                    <td className="p-2.5 text-rose-300">Credential stuffing, wire fraud</td>
                    <td className="p-2.5 text-emerald-300">Hardware HSMs + Sub-35ms AI Fraud Scoring</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">2. Healthcare</td>
                    <td className="p-2.5 text-sky-300">EHR Patient Records, Infusion Pumps</td>
                    <td className="p-2.5 text-rose-300">Ransomware, medical telemetry tampering</td>
                    <td className="p-2.5 text-emerald-300">AES-256 EHR Vault + IoMT Biomedical VLANs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">3. E-Commerce</td>
                    <td className="p-2.5 text-sky-300">Payment Checkouts, Customer Databases</td>
                    <td className="p-2.5 text-rose-300">Magecart card skimmers, scalping bots</td>
                    <td className="p-2.5 text-emerald-300">Cloud WAF + Content Security Policy (CSP)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">4. Smart Energy & SCADA</td>
                    <td className="p-2.5 text-sky-300">Power Grid Substation Breakers</td>
                    <td className="p-2.5 text-rose-300">State-sponsored blackout malware</td>
                    <td className="p-2.5 text-emerald-300">Optical Data Diodes + Mutual TLS (mTLS)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">5. Cloud & DevSecOps</td>
                    <td className="p-2.5 text-sky-300">CI/CD Pipelines, Microservices</td>
                    <td className="p-2.5 text-rose-300">Exposed secrets, supply chain zero-days</td>
                    <td className="p-2.5 text-emerald-300">CSPM + SAST/DAST Automated CI/CD Scanners</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Applications Spectrum SVG */}
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
                Multi-Industry Cyber Security Applications Spectrum
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Sector 1: FinTech */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. FINTECH & BANKING</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">UPI • Hardware HSMs</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Sub-35ms AI Fraud Scoring</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Sector 2: Healthcare */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. HEALTHCARE & EHR</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">AES-256 EMR Tables</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">IoMT Biomedical VLANs</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Sector 3: E-Commerce */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. E-COMMERCE & WAF</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Anti-Magecart CSP</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">OWASP Top 10 Blocking</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Sector 4: Smart Grid & Cloud */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="640" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">4. SMART GRID & CLOUD</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Optical Data Diodes</text>
                <text x="640" y="73" fill="#fda4af" fontSize="7" textAnchor="middle">Zero Trust SASE & CSPM</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  APPLICATIONS OF CYBER SECURITY: SECURING EVERY SECTOR WITH ZERO TRUST & DEFENSE-IN-DEPTH
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  FinTech Payment HSMs • Healthcare Biomedical VLANs • Cloud WAFs • Smart Grid SCADA Protection • DevSecOps
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Enterprise Cloud WAF & Healthcare Cryptographic Gateway Deployments (₹4,80,000 Setup)
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
                Bengal Operations & Cross-Industry Case Studies
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
                  trap: 'Applying Generic Corporate IT Security Rules to Industrial SCADA and Healthcare Networks',
                  fix: 'SCADA and biomedical devices have strict real-time latency and safety requirements. Deploy specialized optical diodes and microsegmented biomedical VLANs.',
                },
                {
                  trap: 'Treating Security as an Afterthought at the End of the Software Development Cycle',
                  fix: 'Fixing bugs post-launch is 30x more expensive. Integrate automated SAST, DAST, and SCA scanning directly into CI/CD pipelines (DevSecOps).',
                },
                {
                  trap: 'Assuming Cloud Service Providers (AWS/Azure) Are 100% Responsible for Your Application Security',
                  fix: 'Under the Shared Responsibility Model, the customer is strictly responsible for securing data, IAM policies, and application configurations. Deploy CSPM.',
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
                  Think of Zero Trust like passport control at an international airport: even if you enter the duty-free lounge, you must show your boarding pass and biometric scan again before boarding the gate!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how DevSecOps shifts security left, scanning every line of code on `git push` and eliminating vulnerabilities before they ever reach public production!
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
                Student Revision Checklist (Topic 10)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped cross-industry cybersecurity applications (FinTech, Healthcare, E-Commerce, Smart Cities, Defense)',
                'Evaluated Banking UPI security (HSMs, sub-35ms AI fraud scoring, PCI-DSS compliance)',
                'Analyzed Healthcare EHR protection, IoMT microsegmentation, and diagnostic report non-repudiation',
                'Investigated E-Commerce WAFs, Content Security Policy (CSP), and anti-Magecart protections',
                'Mastered Zero Trust Architecture (NIST SP 800-207), SASE, and CI/CD DevSecOps pipelines',
                'Formulated realistic multi-industry enterprise security budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Congratulations on completing Module 001_002 (Cyber Security Definition)! You now possess a comprehensive, expert-level understanding of cybersecurity goals, threat landscapes, crimes, warfare, and cross-industry applications. Keep building and defending!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Applications of Cyber Security FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Applications of Cyber Security in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
