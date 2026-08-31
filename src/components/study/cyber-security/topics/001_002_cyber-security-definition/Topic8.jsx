// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic8.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 8: Cyber Warfare

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedWarfareId, setSelectedWarfareId] = useState('stuxnet-plc-sabotage');
  const [warfareSimLog, setWarfareSimLog] = useState(null);

  const warfareProfiles = [
    {
      id: 'stuxnet-plc-sabotage',
      name: 'Stuxnet Industrial PLC Centrifuge Sabotage',
      campaignType: 'Physical Kinetic Destruction via Zero-Day Firmware Manipulation',
      targetSector: 'Uranium Enrichment Centrifuges & Industrial Blast Furnaces in Barrackpore',
      attackVector: '4 Zero-Day Exploits + LNK USB Air-Gap Bridge ➔ Siemens S7-300 PLC Microcode Alteration',
      defensiveControl: 'Unidirectional Optical Hardware Data Diodes + Analog Mechanical Speed Governors',
      estBudget: '₹12,50,000 (Military-Grade Hardware Optical Data Diode & PLC Code Verification)',
      desc: 'The historic milestone proving software code can cause severe physical kinetic destruction to industrial machinery.',
      simResult: 'State-sponsored LNK worm attempts PLC frequency alteration (1410 Hz) → Optical data diode blocks return command → Mechanical governor locks speed → Zero damage.',
    },
    {
      id: 'ukraine-power-grid',
      name: 'Ukraine SCADA Substation Blackout Campaign',
      campaignType: 'Critical National Infrastructure (CNI) Blackout Cyber Warfare',
      targetSector: 'High-Voltage Electrical Transmission Substations in Kolkata Grid',
      attackVector: 'Stolen VPN Credentials ➔ Industroyer IEC-104 / IEC-61850 Breaker Open Commands + KillDisk',
      defensiveControl: 'SCADA Air-Gapped Microsegmentation + Out-of-Band Manual Breaker Interlocks',
      estBudget: '₹16,50,000 (24/7 Sovereign SCADA Managed Detection & Response - MDR)',
      desc: 'Demonstrates how adversaries weaponize industrial protocols to cause widespread civilian power blackouts.',
      simResult: 'Adversary injects unauthorized IEC-60870-5-104 breaker open packet → SCADA intrusion engine drops packet in 18ms → Power grid maintains 100% stability.',
    },
    {
      id: 'satellite-jamming-wiper',
      name: 'Satellite Ground Station Jamming & AcidRain Wiper',
      campaignType: 'Space Domain Disruption & Flash Memory Destruction',
      targetSector: 'Military Tactical SATCOM & Disaster Management Uplinks in Ichapur',
      attackVector: 'High-Power RF Waveform Spoofing + AcidRain Overwriting Terminal SPI Flash Memory',
      defensiveControl: 'Direct Sequence Spread Spectrum (DSSS) + Cryptographic Secure Boot Hardware Checks',
      estBudget: '₹8,50,000 (Jam-Resistant Military Satellite Transceiver & SPI Firmware Lock)',
      desc: 'Attacks targeting space communication networks that blind tactical military command centers.',
      simResult: 'Malicious firmware update broadcast to satellite modem → Hardware secure boot validates RSA-4096 signature → Rejects unsigned wiper in 45ms.',
    },
    {
      id: 'tallinn-manual-audit',
      name: 'Tallinn Manual Cyber Rules of Engagement (ROE)',
      campaignType: 'International Law of Armed Conflict (LOAC) & Sovereign Defense Audit',
      targetSector: 'State Defence Cyber Agency (DCyA) Operational Enclave in Jadavpur',
      attackVector: 'Cross-Border Cyber Act of War Crossing the Threshold of Physical Harm',
      defensiveControl: 'Article 51 Sovereign Self-Defense Posture + All-Source Attribution Intelligence',
      estBudget: '₹4,80,000 (SCADA Cyber Range Warfare Simulator & Legal Compliance Engine)',
      desc: 'Governs the legal justification for military retaliation following catastrophic state-sponsored cyber attacks.',
      simResult: 'Adversary cyber attack triggers physical transformer fire → All-Source SIGINT/HUMINT confirms state actor → Triggers Article 51 legal response.',
    },
  ];

  const currentWarfare = warfareProfiles.find((w) => w.id === selectedWarfareId) || warfareProfiles[0];

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
      title: '1. Precision Foundry Industrial SCADA Optical Data Diode Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu deployed a military-grade hardware optical data diode for industrial blast furnaces in Barrackpore for ₹12,50,000. Physical unidirectional light isolation ensures furnace temperature telemetry is transmitted to the corporate cloud while making inbound PLC hacking physically impossible.',
      lesson: 'Optical data diodes enforce physics-based one-way isolation, protecting critical SCADA machinery from cyber warfare.',
    },
    {
      title: '2. Diagnostic Clinic Critical Life-Support Microsegmentation (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima engineered an isolated biomedical VLAN and analog mechanical fail-safe grid for hospital ventilators in Ichapur for ₹3,40,000. Physical mechanical pressure governors guarantee life-support oxygen flow even during state-sponsored destructive cyber warfare wiper campaigns.',
      lesson: 'Mechanical analog governors operate purely on physics, providing un-hackable fallbacks during destructive cyber warfare.',
    },
    {
      title: '3. State Electric Power Grid Substation Blackout Defense (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata architected an automated SCADA intrusion detection and BGP satellite fallback system for a Kolkata electric utility for ₹16,50,000. When foreign APT malware attempted unauthorized IEC-104 breaker open commands, automated hardware interlocks blocked the transmission within 18 milliseconds.',
      lesson: 'Automated protocol inspection on IEC-104 SCADA networks intercepts malicious substation commands in milliseconds.',
    },
    {
      title: '4. Cyber Security Lab Tallinn Manual & Cyber Warfare Range (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a military-grade SCADA cyber warfare range in Jadavpur for ₹4,80,000. Students simulate state-sponsored Stuxnet PLC exploit attacks against hardware-in-the-loop centrifuge turbines, evaluating military rules of engagement (ROE) and international LOAC compliance.',
      lesson: 'Cyber range simulations allow engineers to test kinetic resilience against military cyber weapons in a controlled sandbox.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes warPulse8 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-war8 {
          animation: warPulse8 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 8
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Cyber Warfare • 5th Warfare Domain • Stuxnet & Tallinn Manual in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Cyber Warfare
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The 5th Domain of Warfare, State-Sponsored Sabotage & Sovereign Defense</span>: analyzing historical milestones (Stuxnet, Ukraine power grid blackouts, NotPetya), the Tallinn Manual on International Cyber Law, unidirectional optical data diodes, SCADA PLC physical interlocks, and sovereign defense budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'war-foundations', label: '1. Warfare Domain' },
              { id: 'interactive-studio', label: '2. Cyber Warfare Studio' },
              { id: 'campaigns-matrix', label: '3. Historic Milestones' },
              { id: 'svg-scada', label: '4. SCADA Optical Diode SVG' },
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

        {/* SECTION 1: Warfare Domain */}
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
                What is Cyber Warfare and How Does it Operate in the 5th Domain?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cyber Warfare encompasses state-sponsored military operations conducted across cyberspace to disrupt, degrade, or destroy an adversary nation's critical infrastructure, energy grid, military command systems, or financial institutions. Recognized globally as the 5th Domain of Warfare, cyber operations operate at the speed of light, project strategic military power across sovereign borders without firing physical missiles, and are governed by the international Tallinn Manual.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Stuxnet (2010)</span>
                <p className="text-slate-300 text-xs">First true cyber weapon destroying uranium enrichment centrifuges via PLCs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Grid Sabotage</span>
                <p className="text-slate-300 text-xs">Ukraine power grid blackouts via remote SCADA circuit breaker manipulation.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Tallinn Manual</span>
                <p className="text-slate-300 text-xs">Applying Geneva Conventions, distinction, and proportionality to cyber warfare.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Optical Diodes (₹)</span>
                <p className="text-slate-300 text-xs">Physics-based unidirectional hardware light isolation for SCADA networks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cyber Warfare Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-war8">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Cyber Warfare Campaign & Sovereign Defense Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a cyber warfare scenario to inspect state-sponsored offensive tactics, affected critical sectors, hardware isolation defenses, and simulated sovereign neutralization:
            </p>

            {/* Warfare Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {warfareProfiles.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    setSelectedWarfareId(w.id);
                    setWarfareSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedWarfareId === w.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {w.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Warfare Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentWarfare.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Sovereign Defense Budget: {currentWarfare.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Campaign Category & Character:</span>
                <span className="text-sky-300 font-bold">{currentWarfare.campaignType}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Targeted Critical Infrastructure:</span>
                <span className="text-slate-300">{currentWarfare.targetSector}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Military Attack Vector:</span>
                  <span className="text-slate-300">{currentWarfare.attackVector}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Sovereign Defense Safeguard:</span>
                  <span className="text-slate-300">{currentWarfare.defensiveControl}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Cyber Warfare Incident & Sovereign Interception:
                  </span>
                  <button
                    onClick={() => setWarfareSimLog(currentWarfare.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Simulate Warfare Defense ▶
                  </button>
                </div>

                {warfareSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛡️ <strong>Sovereign Defense Telemetry:</strong> {warfareSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Historic Milestones */}
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
                Historical Milestone Cyber Warfare Operations Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Cyber Weapon</th>
                    <th className="p-2.5 text-sky-400">Year & Target</th>
                    <th className="p-2.5 text-rose-400">Primary Impact</th>
                    <th className="p-2.5 text-emerald-400">Core Strategic Lesson</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Estonia DDoS</td>
                    <td className="p-2.5 text-sky-300">2007 (Estonia)</td>
                    <td className="p-2.5 text-rose-300">Paralyzed banking, media, and government portals</td>
                    <td className="p-2.5 text-emerald-300">Spurred creation of NATO CCDCOE</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Stuxnet</td>
                    <td className="p-2.5 text-sky-300">2010 (Iran Natanz)</td>
                    <td className="p-2.5 text-rose-300">Physically destroyed 1,000 uranium centrifuges</td>
                    <td className="p-2.5 text-emerald-300">Software code can cause kinetic destruction</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Industroyer</td>
                    <td className="p-2.5 text-sky-300">2015-16 (Ukraine)</td>
                    <td className="p-2.5 text-rose-300">Substation breaker open, 230,000 in blackout</td>
                    <td className="p-2.5 text-emerald-300">SCADA protocols require out-of-band interlocks</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">NotPetya</td>
                    <td className="p-2.5 text-sky-300">2017 (Global)</td>
                    <td className="p-2.5 text-rose-300">$10+ Billion global shipping & healthcare damage</td>
                    <td className="p-2.5 text-emerald-300">Military wipers inflict severe collateral damage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: SCADA Optical Diode SVG */}
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
                Critical Infrastructure SCADA Protection via Hardware Optical Data Diodes
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1: State Adversary */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. STATE ADVERSARY</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Military APT Zero-Days</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Attempts Cyber Warfare Attack</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 2: Corporate IT Network */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. CORPORATE LAN</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Cloud Analytics • Office</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Next-Gen Perimeter Firewall</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 3: Hardware Data Diode */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. OPTICAL DATA DIODE</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Unidirectional Light Beam</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Zero Inbound Physical Path</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Stage 4: Critical SCADA Turbine */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. SCADA TURBINES</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Power Generation • Nuclear</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Mechanical Analog Governors</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  SOVEREIGN CYBER DEFENSE: PHYSICS-BASED UNIDIRECTIONAL ISOLATION & TALLINN MANUAL COMPLIANCE
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Stuxnet PLC Mitigations • Ukraine Grid Blackout Defenses • Mechanical Interlocks • Defence Cyber Agency (DCyA)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Military-Grade Hardware Optical Data Diodes & Critical Infrastructure MDR Retainers (₹12,50,000 Setup)
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
                Bengal Operations & Sovereign Cyber Warfare Defense Case Studies
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
                  trap: 'Relying Exclusively on Software Firewalls for Critical Power Plant SCADA Networks',
                  fix: 'Software firewalls possess zero-day vulnerabilities. Deploy physical, unidirectional hardware optical data diodes that physically permit light in only one direction.',
                },
                {
                  trap: 'Assuming Air-Gapped Networks Are Completely Immune to Cyber Warfare Incursions',
                  fix: 'As demonstrated by Stuxnet, adversaries bridge air-gaps via infected vendor USB drives and supply chains. Enforce hardware port locks and strict USB screening.',
                },
                {
                  trap: 'Failing to Implement Physical Analog Governors and Mechanical Interlocks on Industrial Machinery',
                  fix: 'If an adversary overwrites PLC microcode, only physical spring-loaded mechanical valves can physically stop turbine over-speed explosions.',
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
                  Think of an Optical Data Diode like a one-way turnstile or a mirror: light can shoot through the glass in one direction, but no physical beam of light can travel backwards, making hacking mathematically impossible!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Stuxnet did not merely steal data—it spun uranium enrichment centrifuges at 1,410 Hz until the metal tore itself apart, proving software is a physical weapon!
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
                Student Revision Checklist (Topic 8)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 5th Domain of Warfare and the strategic nature of state-sponsored cyber conflict',
                'Evaluated the technical architecture of Stuxnet (2010) and physical PLC centrifuge destruction',
                'Analyzed the Tallinn Manual, Geneva Conventions, Jus ad Bellum, and Jus in Bello in cyberspace',
                'Understood Unidirectional Hardware Optical Data Diodes and physical mechanical interlocks',
                'Investigated Ukraine power grid blackouts, NotPetya, and Cyber Pre-Positioning (Volt Typhoon)',
                'Formulated realistic sovereign SCADA isolation budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Cyber Warfare demonstrates that lines of code can defend a nation's sovereignty or cause physical kinetic destruction. In our next topic (Topic 9), we will explore Cyber Terrorism in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Cyber Warfare FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Cyber Warfare in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
