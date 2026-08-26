// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic4.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 4: Cyber Space

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedLayerId, setSelectedLayerId] = useState('physical-layer');
  const [cyberspaceSimLog, setCyberspaceSimLog] = useState(null);

  const layerProfiles = [
    {
      id: 'physical-layer',
      name: 'Physical Layer: Undersea Cables & Data Centers',
      focus: 'Submarine Optical Fiber & Landing Stations in Mumbai/Chennai/Bay of Bengal',
      structure: 'Armored Subsea Fiber Cables (carrying 99% of global data) + Terrestrial Microwave + Core Server Silicon',
      vulnerability: 'Physical kinetic sabotage, anchor dragging, and direct submarine cable tap interception.',
      defenseMechanism: 'Multi-Path Global Meshing + Encrypted Optical Line Cards (OTN Layer 1 Encryption)',
      estBudget: '₹14,50,000 (Encrypted High-Capacity Dark Fiber Optical Transceiver Cluster)',
      desc: 'The concrete physical geography anchoring cyberspace, comprising real glass cables, servers, and satellites.',
      simResult: 'Undersea cable cut detected in Bay of Bengal -> Optical protection switch autonomously reroutes 100 Gbps traffic via Western Indian Ocean in 18ms.',
    },
    {
      id: 'logical-layer',
      name: 'Logical Layer: BGP Routing & DNS Architecture',
      focus: 'Global Autonomous Systems (AS) & DNS Root Servers in Kolkata',
      structure: 'BGP4 Dynamic Routing Tables + DNS Hierarchical Namespaces + TCP/IP Protocol Stack + Operating Systems',
      vulnerability: 'BGP Route Hijacking, DNS Cache Poisoning, and unpatched kernel vulnerabilities.',
      defenseMechanism: 'BGP RPKI (Resource Public Key Infrastructure) + DNSSEC Cryptographic Zone Signing',
      estBudget: '₹4,50,000 (RPKI Validator Appliance & DNSSEC Signing Gateway)',
      desc: 'The software protocol abstraction that routes packets globally across sovereign boundaries.',
      simResult: 'Rogue foreign AS advertises malicious BGP route -> RPKI validator flags ROA Mismatch (Invalid) -> Drops bogus route in 4.2ms.',
    },
    {
      id: 'persona-cognitive-layer',
      name: 'Cyber-Persona & Cognitive Layer: Identity & Humans',
      focus: 'Digital Personas, Email Accounts & Human Decision-Making in Barrackpore',
      structure: 'IAM User Accounts + Email/Social Personas + Biometric Hashes + Human Psychological Cognition',
      vulnerability: 'Phishing, Deepfake executive voice impersonation, Disinformation, and Cognitive Warfare.',
      defenseMechanism: 'FIDO2 Hardware-Bound MFA + Continuous Phishing Simulation & Security Culture Training',
      estBudget: '₹2,80,000 (FIDO2 Hardware Security Keys & Cognitive Awareness Platform)',
      desc: 'The human users and digital accounts that interact with computer systems, forming the ultimate target.',
      simResult: 'Attacker launches targeted spear-phishing with deepfake audio -> FIDO2 token refuses credential handoff -> Attack severed instantly.',
    },
    {
      id: 'sovereign-governance',
      name: 'Cyberspace Sovereignty & Legal Jurisdiction (IT Act)',
      focus: 'National Cyber Boundaries, CERT-In & NCIIPC Compliance in Ichapur',
      structure: 'Indian Information Technology Act 2000 (Sec 43/66/69A) + DPDPA 2023 + National CERT-In Directives',
      vulnerability: 'Cross-border jurisdictional deadlocks and bulletproof offshore hosting safe harbors.',
      defenseMechanism: 'Mandatory 6-Hour Incident Reporting + Sovereign Data Localization + MLAT Cooperation',
      estBudget: '₹3,50,000 (CERT-In Regulatory Compliance & Log Vault Archiving System)',
      desc: 'The legal and regulatory framework governing digital behavior and asserting sovereign jurisdiction.',
      simResult: 'Cross-border database intrusion detected -> Incident logged with forensic chain-of-custody -> CERT-In notified within 6 hours.',
    },
  ];

  const currentLayer = layerProfiles.find((l) => l.id === selectedLayerId) || layerProfiles[0];

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
      title: '1. Precision Foundry External Attack Surface Management (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu deployed an External Attack Surface Management (EASM) platform in Barrackpore for ₹3,80,000. The system discovered an unpatched legacy VPN gateway exposed to public cyberspace, closing the vector before automated foreign ransomware scanners could exploit it.',
      lesson: 'Continuous attack surface mapping identifies exposed cyberspace entry points before adversaries discover them.',
    },
    {
      title: '2. Diagnostic Clinic DNSSEC Cryptographic Zone Protection (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima implemented DNSSEC across hospital domain registrars in Ichapur for ₹1,20,000. Cryptographically signing all DNS resource records eliminated DNS cache poisoning risks, ensuring 85,000 patients are never diverted to rogue phishing portals.',
      lesson: 'Securing the logical DNS layer prevents malicious redirection and preserves digital patient trust.',
    },
    {
      title: '3. State Research University BGP RPKI Route Hijack Defense (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed Resource Public Key Infrastructure (RPKI) and Route Origin Authorizations (ROAs) for university BGP routers in Kolkata for ₹4,50,000. When a rogue foreign autonomous system attempted to hijack the university’s IP prefix, invalid BGP routes were autonomously dropped.',
      lesson: 'BGP RPKI eliminates logical IP route hijacking, ensuring internet traffic traverses legitimate authorized autonomous systems.',
    },
    {
      title: '4. Cyber Security Lab LEO Satellite & Cyber Range Sandbox (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a simulated cyberspace warfare cyber range in Jadavpur for ₹2,80,000. Students simulate multi-layer cyberspace attacks, defending simulated physical satellite downlinks, logical BGP routers, and cognitive social engineering vectors against live red-team adversaries.',
      lesson: 'Holistic cyber defense requires mastering physical hardware, logical software, and human cognitive layers together.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes spacePulse4 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-space4 {
          animation: spacePulse4 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Cyber Space • Three Structural Layers • BGP/DNSSEC & IT Act 2000 in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cyber Space
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The Architecture, Multi-Layer Nature & Governance of Cyberspace</span>: analyzing the Physical Layer (submarine cables & satellites), Logical Layer (BGP & DNS protocols), Cyber-Persona/Cognitive Layer, asymmetric warfare dynamics, Indian IT Act 2000 governance, and attack surface budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'space-foundations', label: '1. Cyberspace Nature' },
              { id: 'interactive-studio', label: '2. Layered Simulator' },
              { id: 'layers-matrix', label: '3. Three Layers Matrix' },
              { id: 'svg-space', label: '4. Cyberspace Layers SVG' },
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

        {/* SECTION 1: Cyberspace Nature */}
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
                What is Cyberspace and How Does it Differ from Natural Physical Domains?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cyberspace is a global, human-created domain within the information environment consisting of the interdependent network of information technology infrastructures, including the Internet, telecommunications networks, computer systems, and embedded processors. Unlike natural physical domains (land, sea, air, space), cyberspace is purely artificial, operates at the speed of light, and is continuously transformed by software code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Physical Layer</span>
                <p className="text-slate-300 text-xs">Submarine fiber cables, satellite constellations, and data center servers.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Logical Layer</span>
                <p className="text-slate-300 text-xs">TCP/IP protocols, BGP routing tables, DNS resolution, and operating systems.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Cognitive Layer</span>
                <p className="text-slate-300 text-xs">Human personas, digital accounts, and cognitive decision-making minds.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Governance (₹)</span>
                <p className="text-slate-300 text-xs">Indian IT Act 2000, CERT-In directives, and attack surface management.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Layered Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-space4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Architecture of Cyberspace & Layered Dynamics Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a structural layer of cyberspace to inspect physical/logical pathways, vulnerability vectors, defensive solutions, and simulated cyber conflict responses:
            </p>

            {/* Layer Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {layerProfiles.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelectedLayerId(l.id);
                    setCyberspaceSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedLayerId === l.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {l.name.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Active Layer Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentLayer.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Infrastructure Budget: {currentLayer.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Geographic / Operational Scope:</span>
                <span className="text-sky-300 font-bold">{currentLayer.focus}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Structural Architecture:</span>
                <span className="text-slate-300">{currentLayer.structure}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Primary Threat Vector:</span>
                  <span className="text-slate-300">{currentLayer.vulnerability}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Mandatory Defensive Control:</span>
                  <span className="text-slate-300">{currentLayer.defenseMechanism}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Cyberspace Layer Incident & Rerouting Telemetry:
                  </span>
                  <button
                    onClick={() => setCyberspaceSimLog(currentLayer.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Simulate Cyberspace Layer ▶
                  </button>
                </div>

                {cyberspaceSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🌐 <strong>Cyberspace Telemetry Log:</strong> {cyberspaceSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Three Layers Matrix */}
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
                The Three Structural Layers of Cyberspace Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Cyberspace Layer</th>
                    <th className="p-2.5 text-sky-400">Core Components</th>
                    <th className="p-2.5 text-rose-400">Primary Attack Vector</th>
                    <th className="p-2.5 text-emerald-400">Key Defensive Technology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">1. Physical Layer</td>
                    <td className="p-2.5 text-sky-300">Subsea fiber cables, satellites, data centers</td>
                    <td className="p-2.5 text-rose-300">Kinetic cable cuts, EMP, physical tap</td>
                    <td className="p-2.5 text-emerald-300">Multi-Path Mesh + Layer 1 Optical Encryption</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">2. Logical Layer</td>
                    <td className="p-2.5 text-sky-300">BGP routing, DNS, TCP/IP, operating systems</td>
                    <td className="p-2.5 text-rose-300">BGP Hijacking, DNS Cache Poisoning</td>
                    <td className="p-2.5 text-emerald-300">BGP RPKI Validation + DNSSEC Signing</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">3. Cyber-Persona</td>
                    <td className="p-2.5 text-sky-300">User accounts, email identities, social profiles</td>
                    <td className="p-2.5 text-rose-300">Phishing, Credential Stuffing, Deepfakes</td>
                    <td className="p-2.5 text-emerald-300">FIDO2 Hardware MFA + Security Hygiene</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">4. Legal Governance</td>
                    <td className="p-2.5 text-sky-300">IT Act 2000, CERT-In, NCIIPC directives</td>
                    <td className="p-2.5 text-rose-300">Cross-border jurisdiction safe harbors</td>
                    <td className="p-2.5 text-emerald-300">Mandatory CERT-In 6-Hour Reporting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Cyberspace Layers SVG */}
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
                The Three Structural Layers of Cyberspace Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Layer 1: Physical Layer */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. PHYSICAL LAYER</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Submarine Cables • Satellites</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Data Centers & Switch ASICs</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Layer 2: Logical Layer */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. LOGICAL LAYER</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">BGP Routing • DNSSEC • IPs</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Operating Systems & Software</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Layer 3: Persona / Cognitive */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="460" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. PERSONA / COGNITIVE</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">User Accounts • Digital IDs</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Human Minds & Decisions</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Layer 4: Cyber Governance */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="640" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">4. LEGAL GOVERNANCE</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">IT Act 2000 • CERT-In</text>
                <text x="640" y="73" fill="#fda4af" fontSize="7" textAnchor="middle">Sovereignty & NCIIPC</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE MULTI-LAYER FABRIC OF CYBERSPACE: BRIDGING PHYSICAL HARDWARE TO HUMAN COGNITION
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Submarine Cables • BGP RPKI Validation • DNSSEC Zone Signing • FIDO2 Hardware MFA Verification
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  External Attack Surface Management (EASM) & CERT-In 6-Hour Reporting Compliance (₹3,80,000 Setup)
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
                Bengal Operations & Cyberspace Case Studies
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
                  trap: 'Thinking of Cyberspace as an Abstract "Cloud" Without Physical Infrastructure Vulnerabilities',
                  fix: 'Cyberspace relies on physical undersea glass cables and electrical data centers. Physical cable cuts or facility power failures take down digital networks.',
                },
                {
                  trap: 'Assuming BGP Routing is Inherently Secure Without Deploying RPKI Validation',
                  fix: 'Standard BGP accepts route advertisements on trust. Implement RPKI Route Origin Authorization (ROA) to reject malicious BGP route hijacks.',
                },
                {
                  trap: 'Ignoring the Human Cognitive Persona Layer and Focusing Exclusively on Software Firewalls',
                  fix: 'Over 80% of successful breaches target human cognitive weaknesses via phishing. Deploy FIDO2 hardware MFA and continuous awareness training.',
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
                  Think of Cyberspace like an international transportation grid: the Physical Layer is the highways and bridges; the Logical Layer is the traffic rules and GPS routing; and the Cognitive Layer is the drivers making decisions!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how BGP RPKI and DNSSEC add cryptographic verification to the logical layer, turning insecure legacy protocols into tamper-proof cyberspace routing!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the fundamental definition and characteristics of Cyberspace vs physical domains',
                'Evaluated the Three Structural Layers: Physical, Logical, and Cyber-Persona/Cognitive',
                'Analyzed Asymmetric Warfare, Attribution Challenges, and False Flag operations',
                'Investigated BGP Route Hijacking, RPKI, and DNSSEC Cache Poisoning defenses',
                'Understood the Indian IT Act 2000 (Section 43, 66, 69A), CERT-In, and NCIIPC governance',
                'Formulated realistic enterprise attack surface management budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Mastering the multi-layer fabric of cyberspace connects physical undersea cables to logical BGP routers and human psychology. In our next topic (Topic 5), we will explore Digital Assets in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Cyber Space FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Cyber Space in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
