// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic9.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 9: Cyber Terrorism

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedTerrorId, setSelectedTerrorId] = useState('water-treatment-scada');
  const [terrorSimLog, setTerrorSimLog] = useState(null);

  const terrorProfiles = [
    {
      id: 'water-treatment-scada',
      name: 'Municipal Water Treatment Chemical Contamination',
      threatMotivation: 'Mass Poisoning & Urban Biological Terror in Barrackpore',
      targetCNI: 'Municipal Water Reservoir SCADA & Chemical Dosing Inverters',
      attackModality: 'Breaching exposed SCADA RDP ports ➔ Overriding Sodium Hydroxide/Chlorine to 11,000 PPM',
      antiTerrorSafeguard: 'Physical Optical Chemical Telemetry + Automated Mechanical Dump Valve Interlocks',
      estBudget: '₹8,50,000 (Multi-Sensor Chemical Telemetry & Mechanical Interlock System)',
      desc: 'Adversaries manipulate water treatment chemical concentrations to poison city drinking water.',
      simResult: 'Rogue PLC command sets chlorine to 11,000 PPM -> Hardwired optical sensor detects threshold breach -> Mechanical dump valve trips in 0.4s -> 0 Liters Contaminated.',
    },
    {
      id: 'atc-radar-spoofing',
      name: 'Aviation Air Traffic Control Radar & ADS-B Spoofing',
      threatMotivation: 'Mid-Air Flight Collisions & Airport Runway Gridlock in Kolkata',
      targetCNI: 'Metropolitan Air Traffic Control (ATC) Radar & ADS-B Radio Enclaves',
      attackModality: 'Transmitting spoofed ADS-B RF packets to inject 5 fake "ghost aircraft" on approach vectors',
      antiTerrorSafeguard: 'Multi-Lateration Time-Difference-of-Arrival (TDoA) + Primary Skin Echo Cross-Verification',
      estBudget: '₹11,50,000 (ADS-B Cryptographic Validation Engine & Primary Radar Correlator)',
      desc: 'Injecting fake aircraft onto radar screens to induce catastrophic aviation crashes.',
      simResult: 'Radio spoofer broadcasts fake flight path -> Primary radar correlation flags missing skin echo -> Drops spoofed ghost targets in 12ms -> Runway operations 100% safe.',
    },
    {
      id: 'ebs-siren-hijack',
      name: 'Emergency Broadcast System (EBS) & Siren Mass Panic',
      threatMotivation: 'Civilian Evacuation Stampedes & Mass Cognitive Terror in Ichapur',
      targetCNI: 'City Civil Defense Sirens & Regional Emergency Alert Encoders',
      attackModality: 'Hacking siren radio transmitters to broadcast fake "Ballistic Missile Attack" sirens',
      antiTerrorSafeguard: 'Hardware-Bound FIPS 140-2 PKI Cryptographic Siren Activation Authentication',
      estBudget: '₹3,80,000 (Cryptographic Emergency Broadcast Gateway & Siren Authentication Hub)',
      desc: 'Broadcasting false disaster alerts to trigger fatal civilian stampedes and mass hysteria.',
      simResult: 'Unauthenticated siren broadcast packet received -> Cryptographic verification fails RSA-4096 check -> Drops rogue siren command in 2ms -> Civil calm preserved.',
    },
    {
      id: 'darknet-crypto-funding',
      name: 'Darknet Extremist Crowdfunding & Lone-Wolf Tracing',
      threatMotivation: 'Terrorist Cyber Financing & Weapons Procurement in Jadavpur',
      targetCNI: 'Digital Payment Gateways, Privacy Coins (Monero), and Extremist Darknet Forums',
      attackModality: 'Tumbling Bitcoin/Monero donations across darknet mixers to fund lone-wolf attacks',
      antiTerrorSafeguard: 'AI Blockchain Cluster Analytics + IT Act Section 66F Legal Seizure Pipeline',
      estBudget: '₹4,20,000 (Darknet Intelligence Scraping & Crypto Clustering Platform)',
      desc: 'Extremist cells using tumbled cryptocurrency to fund attacks and recruit operatives anonymously.',
      simResult: 'Terrorist mixer wallet flagged -> AI clustering maps output cash-out nodes -> National Investigation Agency (NIA) freezes wallet -> Operatives detained.',
    },
  ];

  const currentTerror = terrorProfiles.find((t) => t.id === selectedTerrorId) || terrorProfiles[0];

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
      title: '1. Municipal Water Treatment SCADA Chemical Interlock Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu engineered a multi-parameter chemical sensor and automated mechanical dump valve system in Barrackpore for ₹8,50,000. When simulated rogue commands attempted to increase chlorine dosing by 800%, the physical hardware interlock tripped in 0.4 seconds, isolating the reservoir and preventing poisoning.',
      lesson: 'Physics-based mechanical interlocks physically prevent municipal poisoning even if SCADA software is compromised.',
    },
    {
      title: '2. Diagnostic Clinic ICU Telemetry Isolation & Hardwired Buzzer Grid (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed an isolated biomedical network and hardwired bedside analog alarms for an Ichapur hospital ICU for ₹3,20,000. Physical bedside buzzers operate independently of the central ethernet network, guaranteeing life-support alerts even during catastrophic network DDoS floods.',
      lesson: 'Hardwired analog buzzers provide unjammable medical fail-safes during terrorist cyber attacks on hospital networks.',
    },
    {
      title: '3. Metropolitan Air Traffic ADS-B Radar Cross-Verification Grid (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata implemented an automated ADS-B cryptographic validation and primary radar correlation engine in Kolkata for ₹11,50,000. The system cross-verifies radio broadcasts against primary skin echoes, instantly dropping 3 spoofed "ghost aircraft" injected by simulated radio transmitters.',
      lesson: 'Cross-verifying broadcast radio telemetry against physical radar skin echoes eliminates ghost aircraft attacks.',
    },
    {
      title: '4. Cyber Security Lab Darknet Terrorist Crypto-Tracing Testbed (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a dark web threat intelligence and cryptocurrency analytics laboratory in Jadavpur for ₹4,20,000. Students trace multi-hop tumbled crypto-transactions across darknet extremist portals, unmasking virtual funding clusters for national security agencies under Section 66F of the IT Act.',
      lesson: 'AI blockchain clustering exposes darknet financial pipelines, dismantling cyber terrorist funding networks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes terrorPulse9 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-terror9 {
          animation: terrorPulse9 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 9
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Cyber Terrorism • CNI Targeting • IT Act Section 66F & NCIIPC in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cyber Terrorism
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Ideological Motivations, Critical Infrastructure Defense & Statutory Anti-Terrorism Law</span>: analyzing municipal water treatment contamination, air traffic radar spoofing, emergency alert mass panic generation, darknet crypto-financing, Indian IT Act Section 66F (mandatory Life Imprisonment), NCIIPC governance, and critical infrastructure defense budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'terror-foundations', label: '1. Terror Motivations' },
              { id: 'interactive-studio', label: '2. Anti-Terror Studio' },
              { id: 'cni-matrix', label: '3. NCIIPC CNI Matrix' },
              { id: 'svg-pipeline', label: '4. Anti-Terror Pipeline SVG' },
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

        {/* SECTION 1: Terror Motivations */}
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
                What is Cyber Terrorism and How Does it Target Modern Society?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cyber Terrorism is the premeditated, ideologically, politically, or religiously motivated deployment of cyber attacks against computing systems, networks, and critical national infrastructure (CNI) to generate mass civilian fear, physical destruction, or fatal casualties to coerce governments and societies. Governed under Section 66F of the Indian IT Act with mandatory Life Imprisonment, cyber terrorism aims to weaponize digital systems against human life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Water & Energy CNI</span>
                <p className="text-slate-300 text-xs">Attacking chemical dosing and power grids to disrupt basic human survival.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Mass Cognitive Panic</span>
                <p className="text-slate-300 text-xs">Hijacking emergency sirens and alert encoders to trigger city-wide stampedes.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Section 66F Life Term</span>
                <p className="text-slate-300 text-xs">Mandatory non-bailable Life Imprisonment under Indian Information Technology law.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Analog Interlocks (₹)</span>
                <p className="text-slate-300 text-xs">Mechanical dump valves and hardwired bedside alarms providing physical safety.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Anti-Terror Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-terror9">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Cyber Terrorism Mitigation & Critical Infrastructure Defense Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a critical cyber terrorism scenario to inspect ideological threat vectors, targeted CNI infrastructure, physical analog safeguards, and simulated crisis neutralization:
            </p>

            {/* Terror Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {terrorProfiles.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTerrorId(t.id);
                    setTerrorSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedTerrorId === t.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {t.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Terror Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentTerror.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Anti-Terror Budget: {currentTerror.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Ideological Terror Objective:</span>
                <span className="text-sky-300 font-bold">{currentTerror.threatMotivation}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Targeted Critical National Infrastructure:</span>
                <span className="text-slate-300">{currentTerror.targetCNI}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Terrorist Attack Modality:</span>
                  <span className="text-slate-300">{currentTerror.attackModality}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Mandatory Defensive Safeguard:</span>
                  <span className="text-slate-300">{currentTerror.antiTerrorSafeguard}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Anti-Cyber Terrorism Response & Neutralization:
                  </span>
                  <button
                    onClick={() => setTerrorSimLog(currentTerror.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Neutralize Cyber Terror ▶
                  </button>
                </div>

                {terrorSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🚨 <strong>Anti-Terrorism Defense Log:</strong> {terrorSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: NCIIPC CNI Matrix */}
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
                NCIIPC Five Critical Sectors & Terrorist Impact Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Critical Sector</th>
                    <th className="p-2.5 text-sky-400">Primary CNI Infrastructure</th>
                    <th className="p-2.5 text-rose-400">Terrorist Attack Scenario</th>
                    <th className="p-2.5 text-emerald-400">Mandatory Defense Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">1. Power & Energy</td>
                    <td className="p-2.5 text-sky-300">High-voltage electrical grid substations</td>
                    <td className="p-2.5 text-rose-300">Metropolitan winter blackout; hospital power cut</td>
                    <td className="p-2.5 text-emerald-300">SCADA Optical Data Diodes + Air-Gap</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">2. Water & Utilities</td>
                    <td className="p-2.5 text-sky-300">Municipal reservoir chemical dosing SCADA</td>
                    <td className="p-2.5 text-rose-300">Lethal chlorine / lye poisoning of drinking water</td>
                    <td className="p-2.5 text-emerald-300">Physical Mechanical Dump Valves</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">3. Transport & Air</td>
                    <td className="p-2.5 text-sky-300">ATC Primary Radar, ADS-B, Railway Signaling</td>
                    <td className="p-2.5 text-rose-300">Mid-air flight collisions, high-speed train derailment</td>
                    <td className="p-2.5 text-emerald-300">Primary Skin Echo Correlation + Relays</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">4. Telecom & Media</td>
                    <td className="p-2.5 text-sky-300">Emergency 112 dispatch, 5G towers, EBS sirens</td>
                    <td className="p-2.5 text-rose-300">Blinding first responders; broadcasting fake alerts</td>
                    <td className="p-2.5 text-emerald-300">FIPS 140-2 Cryptographic Alert Signing</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">5. Nuclear & Strategic</td>
                    <td className="p-2.5 text-sky-300">Reactor cooling pumps, missile telemetry</td>
                    <td className="p-2.5 text-rose-400 font-bold">Catastrophic core meltdown, weapon takeover</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Gravity-Drop Control Rods (Physics)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Anti-Terror Pipeline SVG */}
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
                The Anti-Cyber Terrorism Multi-Layered Defense Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1: Terrorist Attack Attempt */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. TERROR ATTEMPT</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Ideological Cyber Sabotage</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Targets Water / Power / ATC</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 2: Hardware Optical Isolation */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. HARDWARE DIODE</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Unidirectional Light Beam</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Zero Inbound Network Path</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 3: Mechanical Analog Interlock */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. MECHANICAL LOCK</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Analog Chemical Dump Valve</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Independent of Software Code</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 4: IT Act Section 66F */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. SECTION 66F</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Mandatory Life Imprisonment</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">NIA Sovereign Retaliation</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  COUNTERING CYBER TERRORISM: PROTECTING LIFE-CRITICAL CNI INFRASTRUCTURE & ENFORCING LIFE SENTENCES
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  NCIIPC Critical Infrastructure Guidelines • Optical Data Diodes • Mechanical Interlocks • Section 66F Enforcement
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Municipal SCADA Chemical Interlocks & Darknet Crypto-Tracing Platforms (₹8,50,000 Setup)
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
                Bengal Operations & Cyber Terrorism Defense Case Studies
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
                  trap: 'Confusing Cyber Terrorism (Ideological Fear & Life Hazard) with Commercial Cyber Crime (Financial Profit)',
                  fix: 'Cyber crime aims to extort money quietly; Cyber terrorism aims for mass civilian fear, physical destruction, and political coercion.',
                },
                {
                  trap: 'Relying Exclusively on Digital PLC Software Limits for Chemical Dosing and Industrial Safety',
                  fix: 'If PLC microcode is overwritten by malware, software limits fail. Implement mechanical analog dump valves that physically dump excess chemicals.',
                },
                {
                  trap: 'Underestimating the Legal Severity of Cyber Terrorism Under Indian Law',
                  fix: 'Unlike standard hacking (3 years jail), Section 66F of the IT Act mandates non-bailable LIFE IMPRISONMENT for cyber terror acts.',
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
                  Think of Cyber Terrorism like attacking a city's vital organs: by hacking water chlorine valves or hospital life-support alarms, terrorists strike directly at civilian survival!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Section 66F of the IT Act imposes mandatory Life Imprisonment, reflecting the existential severity of cyber attacks targeting national infrastructure!
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
                Student Revision Checklist (Topic 9)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Differentiated Cyber Terrorism (ideological fear) from Cyber Crime (money) and Cyber Warfare (states)',
                'Mastered Section 66F of the Indian IT Act 2000 and the mandatory Life Imprisonment penalty',
                'Evaluated the 5 critical infrastructure sectors protected by NCIIPC under Section 70A',
                'Analyzed attack modalities: Water contamination, ATC radar spoofing, EBS siren hijacks, and ICU attacks',
                'Investigated physical analog interlocks, mechanical governors, and crypto-tracing analytics',
                'Formulated realistic municipal critical infrastructure anti-terror budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Defending critical infrastructure against cyber terrorism is a noble civic duty that protects innocent lives. In our next topic (Topic 10), we will conclude this module with the Applications of Cyber Security in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Cyber Terrorism FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Cyber Terrorism in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
