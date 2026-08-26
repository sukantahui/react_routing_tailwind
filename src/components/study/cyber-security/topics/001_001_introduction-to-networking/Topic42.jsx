// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic42.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 42: Networking in Government

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic42_files/topic42_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic42_files/topic42_note.txt?raw';

const Topic42 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedGovId, setSelectedGovId] = useState('aadhaar-auth');
  const [govSimLog, setGovSimLog] = useState(null);

  const govProfiles = [
    {
      id: 'aadhaar-auth',
      name: 'UIDAI Aadhaar Biometric Citizen Identity Verification',
      publicService: 'Ration PDS & Banking KYC Verification in Barrackpore',
      networkRoute: 'STQC Biometric Sensor ➔ Micro-ATM ➔ Cellular/BharatNet ➔ UIDAI CIDR Gateway (mTLS)',
      cryptoStandard: 'Sensor-Level PKCS#7 2048-bit Public Key Encryption + Mutual TLS (mTLS)',
      latencySla: 'Sub-1.2s Authentication Response • Zero Cleartext Biometric Exposure',
      estHardwareBudget: '₹1,85,000 (Certified Biometric Scanner Cluster & Micro-ATM Nodes)',
      desc: 'Encrypted citizen identity verification authenticating fingerprints against national biometric repositories.',
      simResult: 'Sensor captures fingerprint &rarr; Encrypts with UIDAI 2048-bit key -&gt; Transmits over mTLS -> CIDR confirms "Auth: MATCH (0x00)" in 850ms.',
    },
    {
      id: 'swan-hierarchy',
      name: 'State Wide Area Network (SWAN) E-District Query',
      publicService: 'Land Mutation Record & Caste Certificate Processing in Ichapur BDO',
      networkRoute: 'Gram Panchayat ➔ BharatNet OLT ➔ Block HQ (BHQ) ➔ District HQ (DHQ) ➔ Nabanna State DC (SHQ)',
      cryptoStandard: 'Dedicated Closed User Group (CUG) MPLS IPsec Tunnel + Class-3 USB Token DSC',
      latencySla: '4 Mbps Dedicated Bandwidth per Block • 99.9% High Availability SLA',
      estHardwareBudget: '₹2,75,000 (District Collectorate Dual-WAN Router & UTM Firewall Stack)',
      desc: 'Vertical government intranet routing civil administration files from village panchayats to the State Secretariat.',
      simResult: 'BDO officer digitally signs mutation note -> SWAN routes packet across DHQ to Nabanna SDC -> Ledger updated in 1.4s.',
    },
    {
      id: 'digilocker-api',
      name: 'DigiLocker RESTful Document Fetch & Verification',
      publicService: 'Digital Driving License & Vehicle RC Verification in Kolkata',
      networkRoute: 'Traffic Police Terminal ➔ State Police Gateway ➔ DigiLocker OAuth 2.0 API ➔ National MoRTH DB',
      cryptoStandard: 'OAuth 2.0 Bearer Token + JSON Web Signature (JWS) + SHA-256 Checksum',
      latencySla: '&lt; 800 ms Document Fetch • Instant Legal Digital Authenticity Verification',
      estHardwareBudget: '₹3,50,000 (State Department OAuth API Gateway & Key Vault Cluster)',
      desc: 'API-driven citizen document sharing eliminating physical paperwork and counterfeit certificates.',
      simResult: 'Police scans citizen QR code -> Calls DigiLocker API with OAuth 2.0 -> Fetches digitally signed RC PDF in 620ms.',
    },
    {
      id: 'apt-defense',
      name: 'Critical Defense & Power Grid SCADA Data Diode Defense',
      publicService: 'State Electric Grid Telemetry & Espionage Defense in Jadavpur',
      networkRoute: 'Substation SCADA RTU ➔ Unidirectional Optical Data Diode (Tx Only) ➔ Government SOC Server',
      cryptoStandard: 'Physical Optical Data Diode (Zero Physical Inbound Return Path) + IEC 60870-5-104',
      latencySla: 'Zero Inbound Cyber Attack Surface • Continuous One-Way Telemetry Stream',
      estHardwareBudget: '₹18,50,000 (Military-Grade Hardware Optical Data Diode & Perimeter NGFW)',
      desc: 'Physically guarantees that power grid telemetry flows out without allowing any inbound cyber warfare intrusion.',
      simResult: 'Adversary launches reverse shell attack from external network -> Data diode physically blocks inbound light pulses -> Power grid stays safe.',
    },
  ];

  const currentGov = govProfiles.find((g) => g.id === selectedGovId) || govProfiles[0];

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
      title: '1. District Collectorate SWAN & E-Office Router Upgrade (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu upgraded district collectorate network infrastructure in Barrackpore with dual-homed SWAN routers and 4G failover for ₹2,75,000. 120 administrative officers process digitally signed e-Office files and citizen land mutation records with zero network downtime.',
      lesson: 'Dual-homed SWAN routing with 4G cellular backup guarantees uninterrupted e-Governance file processing.',
    },
    {
      title: '2. Gram Panchayat BharatNet Access Node Deployment (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima installed GPON optical network terminals and Wi-Fi access nodes across 12 Gram Panchayats in Ichapur for ₹3,20,000 under BharatNet. Rural villagers now access online pension applications and digital ration card services without travelling to district headquarters.',
      lesson: 'BharatNet GPON optical broadband bridges the digital divide for rural citizen service delivery.',
    },
    {
      title: '3. State Data Center Perimeter DDoS & Geo-Fencing (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a Next-Gen Firewall perimeter with Geo-IP whitelisting and DDoS scrubbing for the Kolkata State Data Center for ₹18,50,000. The architecture blocked 450 million malicious foreign botnet hits during state board examination result and municipal tax filing weeks.',
      lesson: 'Geo-IP fencing and cloud DDoS scrubbing protect sovereign government portals from foreign cyber attacks.',
    },
    {
      title: '4. Cyber Security Lab Critical SCADA Data Diode Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila audited industrial power grid telemetry in Jadavpur for ₹1,35,000, deploying physical optical data diodes on the SCADA substation network. Telemetry exports safely to government monitors while physically guaranteeing zero inbound cyber attack paths.',
      lesson: 'Physical optical data diodes provide unbreachable physical isolation for critical national infrastructure.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes govPulse42 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-gov42 {
          animation: govPulse42 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 42
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Networking in Government • NICNET • SWAN • BharatNet & NCIIPC in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Networking in Government
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">E-Governance & Public Sector Information Networking</span>: mastering nationwide NICNET and State Wide Area Networks (SWAN), BharatNet rural optical broadband, UIDAI Aadhaar biometric authentication gateways, NCIIPC Critical Information Infrastructure protection, physical SCADA data diodes, and government IT budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'gov-foundations', label: '1. Government Network Pillars' },
              { id: 'interactive-studio', label: '2. E-Governance Simulator' },
              { id: 'gov-architecture', label: '3. National Infrastructure Matrix' },
              { id: 'svg-swan', label: '4. SWAN & SDC Architecture SVG' },
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

        {/* SECTION 1: Government Network Pillars */}
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
                How Does Computer Networking Power Digital Sovereign Governance?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Government networks form the backbone of national sovereignty, democracy, and citizen welfare. Connecting over 1.4 billion citizens, government networks transport biometric identity authentications (UIDAI Aadhaar), e-Office cabinet approvals, digital land records, electronic tender bidding (GeM), emergency response dispatch (Dial 112), and air-gapped defense communications under strict NCIIPC and CERT-In cybersecurity frameworks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. NICNET & SWAN</span>
                <p className="text-slate-300 text-xs">Vertical hierarchical intranet linking State HQ (SHQ) to District & Block offices.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. BharatNet Broadband</span>
                <p className="text-slate-300 text-xs">Rural optical GPON network connecting 250,000+ Gram Panchayats across India.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Aadhaar & DigiLocker</span>
                <p className="text-slate-300 text-xs">PKCS#7 sensor encryption and OAuth 2.0 APIs delivering tamper-proof citizen identity.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. NCIIPC & CII (₹)</span>
                <p className="text-slate-300 text-xs">Critical Information Infrastructure protection with physical SCADA optical data diodes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: E-Governance Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-gov42">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive National E-Governance & SWAN Citizen Delivery Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an e-governance or sovereign defense network operation to inspect routing paths, cryptographic safeguards, latency SLAs, and simulated transaction audits:
            </p>

            {/* Gov Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {govProfiles.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGovId(g.id);
                    setGovSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedGovId === g.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {g.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Gov Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentGov.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Infrastructure Budget: {currentGov.estHardwareBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Citizen Delivery Service:</span>
                <span className="text-sky-300 font-bold">{currentGov.publicService}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Hierarchical Network Route:</span>
                <span className="text-slate-300">{currentGov.networkRoute}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">Cryptographic Safeguard:</span>
                  <span className="text-slate-300">{currentGov.cryptoStandard}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Latency & High Availability SLA:</span>
                  <span className="text-slate-300">{currentGov.latencySla}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Public Service Network Verification & Audit:
                  </span>
                  <button
                    onClick={() => setGovSimLog(currentGov.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Execute Sovereign Network Audit ▶
                  </button>
                </div>

                {govSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🏛️ <strong>E-Governance Telemetry:</strong> {govSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: National Infrastructure Matrix */}
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
                National E-Governance Network Architecture Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Network Layer</th>
                    <th className="p-2.5 text-sky-400">Coverage & Scope</th>
                    <th className="p-2.5 text-amber-400">Underlying Technology</th>
                    <th className="p-2.5 text-emerald-400">Primary Public Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">NICNET</td>
                    <td className="p-2.5 text-sky-300">Central Ministries & 700+ District Collectorates</td>
                    <td className="p-2.5">Terrestrial Fiber + Ku-band VSAT</td>
                    <td className="p-2.5">e-Office, PFMS, National Electoral Rolls</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">SWAN (WBSWAN)</td>
                    <td className="p-2.5 text-sky-300">State HQ ➔ District HQ ➔ Block HQ</td>
                    <td className="p-2.5">CUG MPLS VPNs + Dual 4G/5G Failover</td>
                    <td className="p-2.5">e-District, Land Mutation, Revenue Systems</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">BharatNet</td>
                    <td className="p-2.5 text-sky-300">250,000+ Rural Gram Panchayats</td>
                    <td className="p-2.5">GPON Optical Splitters (100 Mbps)</td>
                    <td className="p-2.5">Common Service Centres (CSC), Digital Rationing</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">State Data Center (SDC)</td>
                    <td className="p-2.5 text-sky-300">Tier-III Sovereign State Cloud</td>
                    <td className="p-2.5">High-Speed Leaf-Spine + DDoS WAF</td>
                    <td className="p-2.5">Tax Portals, Police CCTNS, Municipal Portals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: SWAN & SDC Architecture SVG */}
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
                Multi-Tier State Wide Area Network (SWAN) & National Data Center (NDC) Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Gram Panchayat / Village */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. GRAM PANCHAYAT</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">BharatNet GPON • CSC Kiosks</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Aadhaar Biometric Sensors</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Block & District HQ */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. SWAN DHQ & BHQ</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">District Collectorate Routers</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">MPLS CUG + Class-3 DSC Tokens</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* State Data Center */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. STATE DATA CENTER</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Tier-III Nabanna SDC</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">DDoS WAF + Geo-IP Whitelisting</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* National CIDR & Critical CII */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. NATIONAL REPOSITORY</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">UIDAI CIDR • DigiLocker</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">NCIIPC Protected SCADA Diodes</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  SOVEREIGN GOVERNANCE SECURITY: SWAN CUG HIERARCHY ➔ NCIIPC CRITICAL DATA DIODE ISOLATION
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  UIDAI PKCS#7 Biometric Encryption • DigiLocker OAuth 2.0 • CERT-In 6-Hour Reporting • Cyber Swachhta Kendra
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  GPO USB Device Blocking • District Collectorate Dual-WAN SWAN Routers (₹2,75,000 Setup)
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
                Bengal Operations & Government Infrastructure Case Studies
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
                  trap: 'Connecting Government Secretariats or Power Grid SCADA to the Open Public Internet',
                  fix: 'Critical infrastructure must never touch the open web directly. Isolate power grids behind physical optical data diodes and secretariats on private SWAN CUGs.',
                },
                {
                  trap: 'Allowing Unrestricted USB Mass Storage on Civil Administrative Workstations',
                  fix: 'Unrestricted USB ports enable data theft and malware infections. Enforce strict USB mass storage blocking via Active Directory Group Policy (GPO).',
                },
                {
                  trap: 'Failing to Report Cybersecurity Breaches to CERT-In Within the Mandatory 6-Hour Window',
                  fix: 'Delayed reporting violates national cyber directives and hampers threat containment. Maintain incident response playbooks to notify CERT-In within 6 hours.',
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
                  Think of a physical Optical Data Diode like a one-way mirror in physics: light (data) can shine OUT to government monitoring screens, but no hacker laser (attack command) can physically travel IN!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how SWAN connects State HQ in Kolkata to District Collectorates in Barrackpore and Block Offices in Ichapur over an encrypted Closed User Group (CUG) intranet!
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
                Student Revision Checklist (Topic 42)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped NICNET, SWAN (SHQ-DHQ-BHQ), and BharatNet rural optical fiber hierarchy',
                'Evaluated UIDAI Aadhaar biometric mTLS authentication and PKCS#7 encryption envelopes',
                'Understood DigiLocker OAuth 2.0 integration and Class-3 DSC digital signatures',
                'Analyzed NCIIPC Critical Information Infrastructure protection and SCADA data diodes',
                'Investigated CERT-In 6-hour reporting compliance and Cyber Swachhta Kendra botnet defense',
                'Formulated realistic District SWAN and State Data Center budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Government networks protect democratic institutions and sovereign citizen data. In our next topic (Topic 43), we will explore Networking in Cloud Computing in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Networking in Government FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Networking in Government in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic43_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic42;
