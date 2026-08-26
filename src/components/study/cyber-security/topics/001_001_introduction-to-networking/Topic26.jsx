// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic26.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 26: Transmission Media Overview

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic26_files/topic26_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic26_files/topic26_note.txt?raw';

const Topic26 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeMediumId, setActiveMediumId] = useState('cat6');
  const [simulatedAttenuation, setSimulatedAttenuation] = useState(null);

  const mediaList = [
    {
      id: 'cat6',
      name: 'Category 6 UTP Copper Cable',
      category: 'Guided (Twisted Pair)',
      maxBandwidth: '10 Gbps (up to 55m) / 1 Gbps (100m)',
      maxDistance: '100 meters per channel (90m solid + 10m patch)',
      emiImmunity: 'Moderate (Pair twisting cancels external noise)',
      costPerMeter: '₹35 – ₹55 / meter (Pure 23AWG Bare Copper)',
      bestFor: 'Horizontal workstation cabling in Barrackpore offices and campus computer labs.',
      attenuationModel: 'At 100m @ 250MHz: Attenuation ≈ 19.8 dB (Signal remains readable; beyond 100m packets drop).',
    },
    {
      id: 'smf',
      name: 'Single-Mode Optical Fiber (OS2)',
      category: 'Guided (Optical Glass)',
      maxBandwidth: '100 Gbps – 800 Gbps+ per Wavelength',
      maxDistance: '40 – 80+ kilometers without amplification',
      emiImmunity: '100% Total Immunity (Zero electrical conductivity)',
      costPerMeter: '₹150 – ₹350 / meter (including armored outdoor ducting)',
      bestFor: 'Metropolitan inter-city backhauls across Kolkata, ISP fiber-to-the-home, and long-range WANs.',
      attenuationModel: 'At 10 km @ 1550nm: Attenuation ≈ 2.0 dB (Ultra-low loss; sub-millisecond propagation).',
    },
    {
      id: 'mmf',
      name: 'Multi-Mode Optical Fiber (OM4)',
      category: 'Guided (Optical Glass)',
      maxBandwidth: '10 Gbps / 40 Gbps / 100 Gbps',
      maxDistance: '300 – 550 meters (VCSEL 850nm source)',
      emiImmunity: '100% Total Immunity (Light pulses through dielectric silica)',
      costPerMeter: '₹120 – ₹220 / meter',
      bestFor: 'Data center Top-of-Rack switch backbones in Jadavpur and intra-building vertical risers.',
      attenuationModel: 'At 500m @ 850nm: Attenuation ≈ 1.5 dB (Modal dispersion limits max distance to 550m).',
    },
    {
      id: 'wifi6',
      name: 'Wi-Fi 6E / 7 Wireless RF (Unguided)',
      category: 'Unguided (Electromagnetic Radio Waves)',
      maxBandwidth: 'Up to 2.4 Gbps – 9.6 Gbps aggregate',
      maxDistance: '15 – 30 meters indoor radius per Access Point',
      emiImmunity: 'Vulnerable to microwave ovens, thick concrete walls, and RF interference',
      costPerMeter: '₹0 (Airwaves; AP hardware: ₹15,000 – ₹45,000)',
      bestFor: 'High-density classroom mobility in Kolkata, smartphone and tablet roaming.',
      attenuationModel: 'Free Space Path Loss (FSPL): Signal drops by ~60 dB through double brick walls.',
    },
  ];

  const currentMedium = mediaList.find((m) => m.id === activeMediumId) || mediaList[0];

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
      title: '1. Precision Foundry Inter-Building Fiber Run (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu installed a 6-core Single-Mode OS2 armored optical fiber link (650m) between two manufacturing buildings in Barrackpore for ₹85,000. It provides 10Gbps line rate, complete immunity to industrial arc-furnace EMI, and zero lightning surge risks.',
      lesson: 'Optical fiber isolates building grounds and guarantees zero electromagnetic interference.',
    },
    {
      title: '2. Diagnostic Clinic Cat6a Shielded Cabling (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima installed certified Cat6a S/FTP pure copper cabling in an MRI diagnostic wing in Ichapur for ₹1,40,000. The metallic shielding prevents high-magnetic-field interference from corrupting patient monitoring data packets.',
      lesson: 'Shielded Cat6a cables prevent high-power medical equipment from corrupting data streams.',
    },
    {
      title: '3. University Multi-Department Backbone Modernization (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed OM4 multi-mode fiber backbones across 8 academic departments in Kolkata for ₹4,50,000, connecting departmental distribution switches to the central server farm with 40Gbps link aggregation and sub-millisecond latency.',
      lesson: 'OM4 fiber backbones future-proof university campuses for 40G/100G aggregations.',
    },
    {
      title: '4. High-Tech Cyber Lab Optical Intrusion Monitoring (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila implemented an Optical Fiber Intrusion Detection System (OFIDS) in Jadavpur for ₹75,000, detecting micro-bending light leakage and physical cable tampering to protect classified research networks from physical wiretapping.',
      lesson: 'OFIDS systems detect physical wiretapping by measuring light power drops in decibels.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes mediaPulse26 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-media26 {
          animation: mediaPulse26 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 26
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Transmission Media • Guided vs Unguided • Fiber & Copper in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transmission Media Overview
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Transmission Media Physics & Standards</span>: comparing Twisted-Pair Copper (UTP/STP), Coaxial, Single-Mode and Multi-Mode Optical Fiber, and Wireless RF with attenuation models and structured cabling budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'media-foundations', label: '1. Media Taxonomy' },
              { id: 'interactive-studio', label: '2. Media & Attenuation Studio' },
              { id: 'media-comparison', label: '3. Technical Comparison' },
              { id: 'svg-anatomy', label: '4. Physical Cable Anatomy SVG' },
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

        {/* SECTION 1: Media Foundations */}
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
                What is Transmission Media?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-sky-400">Transmission Media</strong> is the physical pathway (guided/bounded) or free-space electromagnetic channel (unguided/unbounded) that carries digital data as physical signals (voltage levels, light pulses, or RF radio waves) across <strong className="text-indigo-400">OSI Layer 1 (Physical Layer)</strong>. The medium governs the theoretical channel capacity (Shannon's Theorem), propagation speed, distance limitations, and vulnerability to noise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Twisted-Pair Copper</span>
                <p className="text-slate-300 text-xs">Differential signaling and pair twisting cancel EMI and NEXT interference.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Optical Fiber (TIR)</span>
                <p className="text-slate-300 text-xs">Total Internal Reflection guides light through dielectric silica with zero EMI.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Coaxial Cabling</span>
                <p className="text-slate-300 text-xs">Continuous metallic braided shield provides grounded noise protection.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Wireless RF Channels</span>
                <p className="text-slate-300 text-xs">2.4GHz, 5GHz, and 6GHz radio frequency bands delivering mobile agility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Media & Attenuation Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-media26">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Transmission Media & Signal Attenuation Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a transmission medium to compare maximum certified distance, bandwidth capacity, noise immunity, pricing in <span className="text-emerald-400 font-bold">₹</span>, and physics attenuation models:
            </p>

            {/* Media Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {mediaList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMediumId(m.id);
                    setSimulatedAttenuation(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    activeMediumId === m.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {m.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Medium Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentMedium.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Cost: {currentMedium.costPerMeter}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Max Bandwidth:</span>
                  <span className="text-sky-300 font-bold">{currentMedium.maxBandwidth}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Max Distance Limit:</span>
                  <span className="text-amber-300 font-bold">{currentMedium.maxDistance}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">EMI Noise Immunity:</span>
                  <span className="text-emerald-300 font-bold">{currentMedium.emiImmunity}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs">
                <span className="text-purple-300 font-bold">Optimal Enterprise Deployment:</span>
                <p className="text-slate-300">{currentMedium.bestFor}</p>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Calculate Signal Attenuation & Loss Curve:
                  </span>
                  <button
                    onClick={() => setSimulatedAttenuation(currentMedium.attenuationModel)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Simulate Signal Attenuation ▶
                  </button>
                </div>

                {simulatedAttenuation && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    📉 <strong>Attenuation Calculation (dB):</strong> {simulatedAttenuation}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Technical Comparison */}
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
                Transmission Media Technical Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Media Type</th>
                    <th className="p-2.5 text-sky-400">Max Bandwidth</th>
                    <th className="p-2.5 text-amber-400">Max Distance</th>
                    <th className="p-2.5 text-rose-400">EMI Susceptibility</th>
                    <th className="p-2.5 text-emerald-400">Cost per Meter (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Cat5e UTP Copper</td>
                    <td className="p-2.5">1 Gbps</td>
                    <td className="p-2.5">100 meters</td>
                    <td className="p-2.5 text-amber-300">Moderate</td>
                    <td className="p-2.5 text-emerald-300">₹25 – ₹35</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Cat6 / Cat6a Copper</td>
                    <td className="p-2.5">10 Gbps</td>
                    <td className="p-2.5">100 meters</td>
                    <td className="p-2.5 text-sky-300">Low (Spline / Shield)</td>
                    <td className="p-2.5 text-emerald-300">₹35 – ₹80</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Multi-Mode Fiber (OM4)</td>
                    <td className="p-2.5">10G / 40G / 100G</td>
                    <td className="p-2.5">300 – 550 meters</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Zero (100% Immune)</td>
                    <td className="p-2.5 text-emerald-300">₹120 – ₹220</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Single-Mode Fiber (OS2)</td>
                    <td className="p-2.5">100G – 800Gbps+</td>
                    <td className="p-2.5 text-emerald-400 font-bold">40 – 80+ km</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Zero (100% Immune)</td>
                    <td className="p-2.5 text-emerald-300">₹150 – ₹350</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Physical Cable Anatomy SVG */}
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
                Physical Cable Construction & Internal Layer Anatomy
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* UTP Cable */}
                <rect x="20" y="20" width="220" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="130" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. UTP Twisted Pair</text>
                <text x="130" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">4 Twisted Pairs (8 Conductors)</text>
                <text x="130" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Internal Plastic Spline • RJ-45</text>

                {/* Coaxial Cable */}
                <rect x="260" y="20" width="220" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="42" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">2. Coaxial Cable</text>
                <text x="370" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Center Copper • Dielectric Layer</text>
                <text x="370" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Braided Metallic Shield • BNC</text>

                {/* Optical Fiber */}
                <rect x="500" y="20" width="220" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. Optical Fiber</text>
                <text x="610" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Silica Glass Core (9/50µm)</text>
                <text x="610" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Total Internal Reflection • LC/SC</text>

                {/* Bottom Physics Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  MEDIA PHYSICS: DIFFERENTIAL SIGNALING • TOTAL INTERNAL REFLECTION (TIR)
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Copper: Twist rates cancel NEXT noise • Fiber: Core (n1 &gt; n2) traps laser pulses with 0dB electromagnetic coupling
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  TIA/EIA-568B Standard Termination • Plenum (CMP) Fire Jacketing • Optical Power Decibel (dB) Budgets
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
                Bengal Operations & Transmission Media Case Studies
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
                  trap: 'Exceeding the 100-Meter Distance Limit for Copper Twisted-Pair Cables',
                  fix: 'Copper cables experience severe insertion loss beyond 100 meters. Use optical fiber for distances exceeding 100m.',
                },
                {
                  trap: 'Using Copper-Clad Aluminum (CCA) Cables for High-Power PoE++ Deployments',
                  fix: 'Aluminum conductors have high resistance, creating severe fire hazards and dropped frames under PoE loads. Always mandate 100% solid copper (23AWG).',
                },
                {
                  trap: 'Mixing Single-Mode and Multi-Mode Fiber Cables and Transceivers',
                  fix: 'SMF (9µm core) and MMF (50µm core) use different optical physics and transceivers; connecting them results in 99% optical insertion power loss.',
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
                  Think of transmission media like roads: copper is a paved suburban street (great for short local runs), optical fiber is a multi-lane express highway (massive capacity over long distances), and wireless is an airplane route (flexible but subject to weather)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how optical fiber cables can be bent up to their minimum bend radius without losing light, but tight kinks cause light to escape through macro-bending leakage!
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
                Student Revision Checklist (Topic 26)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Differentiated between Guided (wired) and Unguided (wireless) transmission media',
                'Explained the physics of differential signaling and pair twisting in UTP cables',
                'Mastered Total Internal Reflection (TIR) and Single-Mode vs Multi-Mode fiber differences',
                'Memorized the TIA/EIA-568B pinout color codes for RJ-45 termination',
                'Understood signal attenuation (dB), dispersion, Near-End Crosstalk (NEXT), and Shannon capacity',
                'Formulated realistic structured cabling and fiber optic budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Transmission media form the physical lifelines of the global internet. In our next topic (Topic 27), we will explore Network Addresses in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Transmission Media FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Transmission Media Overview in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic27_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic26;
