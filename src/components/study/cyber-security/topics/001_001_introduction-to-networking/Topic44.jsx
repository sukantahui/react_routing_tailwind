// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic44.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 44: Future of Computer Networking

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic44_files/topic44_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic44_files/topic44_note.txt?raw';

const Topic44 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedFutureId, setSelectedFutureId] = useState('qkd-quantum');
  const [futureSimLog, setFutureSimLog] = useState(null);

  const futureProfiles = [
    {
      id: 'qkd-quantum',
      name: 'Quantum Key Distribution (BB84 Protocol) over Dark Fiber',
      frontier: 'Unconditionally Secure Quantum Cryptography in Jadavpur University Lab',
      quantumPath: 'Alice Single-Photon Transmitter ➔ 25 km Dark Fiber ➔ Polarization Rotator ➔ Bob Single-Photon APD Detector',
      mathPhysics: 'Heisenberg Uncertainty Principle + No-Cloning Theorem (QBER &lt; 11% Threshold)',
      securityGuarantee: 'Information-theoretically uncrackable; any eavesdropper collapses superposition and triggers abort.',
      throughputLatency: '2.5 kbps Quantum Key Generation Rate • &lt; 0.2 ms Optical Propagation',
      estResearchBudget: '₹48,00,000 (Single-Photon QKD Optical Terminal Pair & Dark Fiber Transceivers)',
      desc: 'Transmits cryptographic encryption keys via polarized single photons, guaranteeing mathematical proof against eavesdropping.',
      simResult: 'Alice sends 10,000 polarized photons &rarr; Bob measures in rectilinear/diagonal bases -&gt; QBER measured at 2.4% (< 11%) -> 256-bit AES Master Key Distilled.',
    },
    {
      id: 'pqc-hybrid-tls',
      name: 'NIST Post-Quantum Cryptography Hybrid TLS 1.3 (ML-KEM / Kyber)',
      frontier: 'Quantum-Resistant Patient EHR Microservice Mesh in Ichapur',
      quantumPath: 'Client Browser ➔ X25519 + ML-KEM-768 Hybrid Key Exchange ➔ Web Server ➔ Cloud KMS',
      mathPhysics: 'Module Learning With Errors (MLWE) Lattice Cryptography + Classical ECDH',
      securityGuarantee: 'Immune to future quantum computers running Shor’s algorithm; defeats "Harvest Now, Decrypt Later".',
      throughputLatency: '1.2 KB Public Key Size • 1-RTT Handshake Duration (3.8 ms) • Zero Latency Penalty',
      estResearchBudget: '₹3,80,000 (PQC HSM Firmware Upgrade & Cryptographic Gateway Cluster)',
      desc: 'Combines classical elliptic curves with post-quantum lattice mathematics to protect sensitive healthcare data permanently.',
      simResult: 'TLS 1.3 ClientHello offers [X25519, ML-KEM-768] &rarr; Server encapsulates shared secret -&gt; Derives AES-256-GCM session key in 3.8ms.',
    },
    {
      id: '6g-leo-laser',
      name: '6G Sub-Terahertz (300 GHz) & LEO Satellite Optical Laser Mesh',
      frontier: 'Next-Gen Ultra-High-Speed Wireless & Space Routing in Kolkata',
      quantumPath: 'Ground 6G Mobile ➔ Terahertz RIS Metamaterial ➔ LEO Satellite ➔ 100G Laser ISL in Space Vacuum ➔ Remote Station',
      mathPhysics: '300 GHz Sub-THz Spectrum + Reconfigurable Intelligent Surfaces (RIS) + Free-Space Optics',
      securityGuarantee: 'Phased array pencil beamforming (1.5° beam) with physical directional anti-jamming.',
      throughputLatency: '120 Gbps Wireless Throughput • 47% Faster Light Propagation in Space Vacuum',
      estResearchBudget: '₹14,50,000 (Prototype 6G THz Transceiver & LEO Satellite Ground Terminal)',
      desc: 'Ultra-broadband space-air-ground network delivering multi-gigabit speeds directly to mobile devices worldwide.',
      simResult: '6G terminal transmits 3D holographic point cloud at 120 Gbps -> RIS steers beam around skyscraper -> Space laser routes to London in 32ms.',
    },
    {
      id: 'ai-intent-p4',
      name: 'AI-Native Intent-Based Network & P4 Programmable Data Plane',
      frontier: 'Autonomous Self-Healing Smart Factory Network in Barrackpore',
      quantumPath: 'Natural Language Business Goal ➔ LLM Network Agent ➔ Digital Twin Simulation ➔ P4 ASIC Pipeline',
      mathPhysics: 'Declarative Intent Synthesis + In-Band Network Telemetry (INT) on Intel Tofino ASIC',
      securityGuarantee: 'Continuous automated policy verification; self-heals route flapping and buffer congestion in 14ms.',
      throughputLatency: '25.6 Terabits/sec ASIC Wire-Speed Switching • Nanosecond INT Observability',
      estResearchBudget: '₹18,50,000 (P4 Programmable 25.6 Tbps Switch & AI Intent Controller Stack)',
      desc: 'Self-driving network where AI translates business intents into programmable switch hardware pipelines autonomously.',
      simResult: 'Jitter anomaly detected on Primary Trunk -> AI Digital Twin validates alternate route -> P4 switch updates flow table in 14ms -> 0 Drops.',
    },
  ];

  const currentFuture = futureProfiles.find((f) => f.id === selectedFutureId) || futureProfiles[0];

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
      title: '1. Precision Foundry AI-Native Intent Network Controller (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu deployed an AI Intent-Based Network Controller with real-time digital twin verification in Barrackpore for ₹8,50,000. When an optical fiber link experienced high jitter, the AI agent autonomously rerouted CNC robotic telemetry across a secondary path in 14 milliseconds.',
      lesson: 'AI-native intent networks with digital twin simulations eliminate manual downtime through autonomous self-healing.',
    },
    {
      title: '2. HealthTech Diagnostic Post-Quantum Hybrid TLS 1.3 Mesh (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima implemented NIST ML-KEM (Kyber768) hybrid TLS 1.3 across hospital EHR microservices in Ichapur for ₹3,80,000. All electronic health records and genetic sequencing data are mathematically immune to future quantum decryption attacks.',
      lesson: 'Post-Quantum Cryptography (PQC) prevents "Harvest Now, Decrypt Later" quantum cyber espionage on confidential records.',
    },
    {
      title: '3. Smart City 6G Terahertz & LEO Laser Satellite Gateway (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata engineered a prototype 6G sub-terahertz (300 GHz) wireless link and LEO laser satellite gateway in Kolkata for ₹14,50,000. The system achieved 120 Gbps wireless throughput, streaming real-time 3D volumetric point clouds for remote telemedicine consultations.',
      lesson: '6G sub-terahertz spectrum and optical laser space meshes enable high-bandwidth holographic telepresence.',
    },
    {
      title: '4. Cyber Security Lab Dark Fiber Quantum QKD Testbed (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila deployed an operational BB84 Quantum Key Distribution (QKD) single-photon optical link over 25 km of dedicated dark fiber in Jadavpur for ₹48,00,000 (research grant). The system generates unconditionally secure symmetric encryption keys with real-time QBER eavesdropping detection.',
      lesson: 'Quantum Key Distribution leverages quantum physics to provide provably uncrackable encryption key exchange.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes futurePulse44 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-future44 {
          animation: futurePulse44 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 44 (Grand Finale)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Future of Computer Networking • QKD • PQC • 6G THz • P4 & AI Intent in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Future of Computer Networking
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand horizon of <span className="text-sky-400 font-semibold">Next-Generation Computer Networking & Quantum Frontiers</span>: exploring Quantum Key Distribution (BB84 QKD), NIST Post-Quantum Cryptography (ML-KEM/Kyber & ML-DSA/Dilithium), 6G Terahertz wireless, LEO satellite optical laser space meshes, P4 programmable switch silicon, AI-native intent-based self-healing networks, and cutting-edge research budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'future-foundations', label: '1. Next-Gen Pillars' },
              { id: 'interactive-studio', label: '2. Quantum & 6G Simulator' },
              { id: 'horizon-matrix', label: '3. Future Tech Matrix' },
              { id: 'svg-quantum', label: '4. Future Architecture SVG' },
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

        {/* SECTION 1: Next-Gen Pillars */}
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
                Where is Computer Networking Heading in the Next Decade?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We stand at the threshold of the greatest technological transformation in networking history. Classical electronic and optical packet networks are evolving into quantum-secured, space-integrated, AI-driven, and fully programmable digital fabrics. Mastering these breakthrough paradigms is essential for the next generation of cybersecurity architects and network scientists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Quantum QKD & PQC</span>
                <p className="text-slate-300 text-xs">Uncrackable single-photon key exchange and lattice-based post-quantum cryptography.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. 6G Terahertz & LEO</span>
                <p className="text-slate-300 text-xs">1 Tbps wireless speeds, RIS smart surfaces, and space optical laser mesh routing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. P4 Programmable Silicon</span>
                <p className="text-slate-300 text-xs">Custom packet pipelines and In-Band Network Telemetry on 25.6 Tbps ASICs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. AI Intent Networks (₹)</span>
                <p className="text-slate-300 text-xs">Autonomous self-healing networks with digital twin simulations and zero manual CLI.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Quantum & 6G Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-future44">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Next-Generation Network & Quantum Horizon Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a future networking paradigm to inspect physical pathways, underlying quantum/mathematical principles, security guarantees, and simulated experimental execution:
            </p>

            {/* Future Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {futureProfiles.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFutureId(f.id);
                    setFutureSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedFutureId === f.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {f.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Future Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentFuture.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Research Testbed Budget: {currentFuture.estResearchBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Research Horizon & Context:</span>
                <span className="text-sky-300 font-bold">{currentFuture.frontier}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Physical / Quantum Pathway:</span>
                <span className="text-slate-300">{currentFuture.quantumPath}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">Physics & Mathematics:</span>
                  <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: currentFuture.mathPhysics }} />
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Security Guarantee:</span>
                  <span className="text-slate-300">{currentFuture.securityGuarantee}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Throughput & Latency:</span>
                  <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: currentFuture.throughputLatency }} />
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Future Protocol Experiment & Telemetry Audit:
                  </span>
                  <button
                    onClick={() => setFutureSimLog(currentFuture.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Execute Frontier Simulation ▶
                  </button>
                </div>

                {futureSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    ⚛️ <strong>Frontier Networking Telemetry:</strong> {futureSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Future Tech Matrix */}
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
                Next-Generation Networking Technology Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Paradigm</th>
                    <th className="p-2.5 text-sky-400">Core Breakthrough</th>
                    <th className="p-2.5 text-amber-400">Key Advantage</th>
                    <th className="p-2.5 text-emerald-400">Primary Deployment Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">QKD (BB84/E91)</td>
                    <td className="p-2.5 text-sky-300">Single-photon quantum state physics</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Unconditional eavesdropping detection</td>
                    <td className="p-2.5">Banking, Defense & Sovereign Intelligence</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Post-Quantum (ML-KEM)</td>
                    <td className="p-2.5 text-sky-300">Lattice-based hard math problems</td>
                    <td className="p-2.5 text-emerald-300">Runs on existing classical hardware</td>
                    <td className="p-2.5">Universal Internet TLS 1.3 & Cloud KMS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">6G Terahertz (THz)</td>
                    <td className="p-2.5 text-sky-300">100 GHz – 3 THz + RIS metamaterials</td>
                    <td className="p-2.5 text-emerald-300">1 Tbps throughput & &lt; 0.1 ms latency</td>
                    <td className="p-2.5">Holographic Telepresence, AR/VR, ISAC</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">P4 & AI Intent</td>
                    <td className="p-2.5 text-sky-300">Domain-specific silicon + LLM agents</td>
                    <td className="p-2.5 text-emerald-300">25.6 Tbps custom packet ASICs & self-healing</td>
                    <td className="p-2.5">Hyperscale AI Clusters & Autonomous WANs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Future Architecture SVG */}
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
                Future Horizon Architecture (Quantum QKD ➔ LEO Space Mesh ➔ P4 Silicon ➔ AI Intent)
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Tier 1: Quantum QKD Layer */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. QUANTUM LAYER</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">BB84 QKD • Single Photons</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">ML-KEM Post-Quantum Crypto</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 2: Space LEO Optical Mesh */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. LEO SPACE MESH</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">100G Optical Lasers in Space</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Direct-to-Cell 6G Smartphones</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 3: P4 Programmable ASIC */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. P4 SILICON LAYER</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">25.6 Tbps Intel Tofino ASICs</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">In-Band Network Telemetry (INT)</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 4: AI Intent Controller */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="640" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">4. AI INTENT BRAIN</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Declarative Self-Healing</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Real-Time Digital Twin Clones</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE FUTURE OF NETWORKING: QUANTUM PHYSICS SECURITY ➔ AUTONOMOUS AI-NATIVE FABRICS
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  BB84 Quantum Key Distribution • 6G Sub-Terahertz & RIS • LEO Space Laser Meshes • P4 In-Network Compute
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Zero Trust Architecture (ZTA) • Module Complete: 45 Topics Mastered in Segment 1 (₹ Research Budgets)
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
                Bengal Research & Frontier Networking Case Studies
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
                  trap: 'Assuming Post-Quantum Cryptography is Decades Away and Unnecessary Today',
                  fix: 'Adversaries harvest encrypted traffic today to decrypt it later on quantum computers. Migrate to NIST ML-KEM/Kyber hybrid TLS 1.3 immediately.',
                },
                {
                  trap: 'Ignoring Path Loss and Atmospheric Absorption in 6G Terahertz Wireless Deployments',
                  fix: 'Terahertz frequencies suffer extreme attenuation from oxygen and water vapor. Deploy narrow beamforming arrays and Reconfigurable Intelligent Surfaces.',
                },
                {
                  trap: 'Relying Exclusively on Manual CLI Scripts to Manage Hyperscale Multi-Cloud Networks',
                  fix: 'Human configuration errors cause over 70% of network outages. Adopt AI-Native Intent-Based Networking with automated Digital Twin pre-validation.',
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
                  Think of Quantum Key Distribution like a fragile soap bubble envelope: the moment an eavesdropper touches it, the bubble pops and the secret is destroyed, instantly alerting you to the attack!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how P4 switches allow you to write custom packet parsing logic in software that compiles directly onto 25.6 Tbps hardware ASIC silicon!
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
                Student Revision Checklist (Topic 44 • Module 1 Complete!)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped Quantum Key Distribution (BB84 QKD) and No-Cloning Theorem physics',
                'Evaluated NIST Post-Quantum Cryptography (ML-KEM/Kyber & ML-DSA/Dilithium)',
                'Analyzed 6G Terahertz wireless, RIS smart metamaterials, and ISAC sensing',
                'Investigated LEO satellite constellations with optical laser inter-satellite links (ISLs)',
                'Configured AI-Native Intent-Based Networking (IBN) and P4 programmable data planes',
                'Formulated realistic next-generation network research budgets in Indian Rupees (₹)',
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
              "Congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 45 topics (Topics 0 to 44) of Module 001_001 'Introduction to Networking'. You are now fully equipped to conquer advanced network protocols, packet analysis, and enterprise cyber defense!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Future of Computer Networking FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Future of Computer Networking in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic45_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic44;
