// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic31.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 31: Latency

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic31_files/topic31_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic31_files/topic31_note.txt?raw';

const Topic31 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedLatencyId, setSelectedLatencyId] = useState('kolkata-metro');
  const [latencyTraceLog, setLatencyTraceLog] = useState(null);

  const latencyProfiles = [
    {
      id: 'campus-lan',
      name: 'Intra-Campus Cat6 LAN (Barrackpore)',
      distance: 'under 100 meters (Copper Ethernet)',
      dProc: '0.005 ms (5 μs Switch ASIC lookup)',
      dQueue: '0.010 ms (Empty wire queue)',
      dTrans: '0.012 ms (1500 bytes @ 1 Gbps)',
      dProp: '0.0005 ms (Speed of electricity in copper)',
      totalOneWay: '0.027 ms (~27 microseconds)',
      rtt: 'under 0.1 ms (Real-time LAN speed)',
      uxRating: 'Instantaneous (Ideal for Industrial Robotics & SAN Storage)',
      simulation: 'Packet enters switch ASIC → 5μs hardware lookup → Instant wire delivery with zero queuing.',
    },
    {
      id: 'kolkata-metro',
      name: 'Kolkata Metro Fiber Peering Hub',
      distance: '25 km (Silica Optical Fiber)',
      dProc: '0.020 ms (Edge Router BGP lookup)',
      dQueue: '0.150 ms (ISP peering buffer)',
      dTrans: '0.001 ms (1500 bytes @ 10 Gbps)',
      dProp: '0.125 ms (25km / 200,000 km/s)',
      totalOneWay: '0.296 ms (~0.3 ms)',
      rtt: '2.5 – 4.0 ms (Metro Internet Exchange)',
      uxRating: 'Blazing Fast (Zero-lag Cloud gaming & 4K video conferencing)',
      simulation: 'Client query → Edge CDN terminates TLS locally in Kolkata → Cached response in 3.2ms RTT.',
    },
    {
      id: 'mumbai-cloud',
      name: 'Kolkata to Mumbai Cloud Region',
      distance: '2,050 km (Pan-India DWDM Fiber)',
      dProc: '0.100 ms (Multi-hop router processing)',
      dQueue: '1.200 ms (Intermediate transit buffers)',
      dTrans: '0.012 ms (1 Gbps leased interface)',
      dProp: '10.25 ms (2,050km in optical fiber)',
      totalOneWay: '11.56 ms',
      rtt: '28.0 – 35.0 ms (Pan-India RTT)',
      uxRating: 'Smooth (Seamless for Banking ERP & Database Queries)',
      simulation: 'Packet traverses 8 router hops across central India fiber backbones → Returns in 31ms RTT.',
    },
    {
      id: 'us-east',
      name: 'Kolkata to US East (N. Virginia)',
      distance: '13,500 km (Subsea Oceanic Cables)',
      dProc: '0.500 ms (Border gateway firewalls)',
      dQueue: '8.000 ms (Subsea landing buffer queues)',
      dTrans: '0.012 ms (1 Gbps international trunk)',
      dProp: '67.50 ms (13,500km @ 200,000 km/s)',
      totalOneWay: '76.01 ms',
      rtt: '185.0 – 210.0 ms',
      uxRating: 'Noticeable Delay (TCP 3-way handshake takes ~300ms without CDN)',
      simulation: 'Transatlantic subsea fiber transit → Multi-second page load if TLS terminates at US origin.',
    },
    {
      id: 'geo-satellite',
      name: 'Geostationary Satellite Link (GEO)',
      distance: '35,786 km (Earth to Geostationary Orbit)',
      dProc: '5.000 ms (Modem RF modulation)',
      dQueue: '25.000 ms (Satellite transponder queue)',
      dTrans: '0.400 ms (30 Mbps satellite carrier)',
      dProp: '238.57 ms (Speed of light in space/air)',
      totalOneWay: '268.97 ms',
      rtt: '560.0 – 650.0 ms',
      uxRating: 'High Latency (Unusable for gaming or interactive SSH terminals)',
      simulation: 'Signal travels 71,500 km up and down to space orbit → 600ms RTT delay is physically unavoidable.',
    },
  ];

  const currentProfile = latencyProfiles.find((l) => l.id === selectedLatencyId) || latencyProfiles[1];

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
      title: '1. Precision Foundry Edge IoT Latency Optimization (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu deployed on-premise edge computing controllers in Barrackpore for ₹85,000. Robotic arm telemetry processing latency dropped from 65ms (cloud round-trip) to 1.8ms (local edge), preventing industrial safety trip collisions.',
      lesson: 'Edge computing eliminates propagation delay for mission-critical industrial robotics.',
    },
    {
      title: '2. Multi-Speciality Clinic VoIP Bufferbloat Elimination (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima enabled FQ-CoDel Active Queue Management on enterprise routers in Ichapur for ₹28,000. VoIP jitter dropped from 85ms to 2.1ms during heavy 500MB MRI image uploads, eliminating choppy audio on telemedicine calls.',
      lesson: 'FQ-CoDel Active Queue Management stops bufferbloat during heavy bandwidth utilization.',
    },
    {
      title: '3. Financial Brokerage Dark Fiber Cross-Connect (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata provisioned a dedicated carrier-neutral dark fiber cross-connect in Kolkata for ₹12,000/month. Inter-rack latency between market data feed servers dropped to 0.12ms (120 microseconds), unlocking automated algorithmic trade executions.',
      lesson: 'Dark fiber cross-connects provide sub-millisecond, zero-jitter financial connectivity.',
    },
    {
      title: '4. Cyber Security Lab Timing Attack Defense (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila audited authentication microservices in Jadavpur for ₹45,000 in testing tools. Replaced standard string comparisons with constant-time cryptographic functions (`crypto.timingSafeEqual`), eliminating microsecond timing side-channel leaks.',
      lesson: 'Constant-time comparison algorithms neutralize latency side-channel timing attacks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes latPulse31 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-lat31 {
          animation: latPulse31 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 31
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Latency • Delay Physics • Bufferbloat • HFT & Dark Fiber in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Latency
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Latency & Propagation Physics</span>: mastering the 4-component delay formula (D_proc + D_queue + D_trans + D_prop), Round-Trip Time (RTT), Bufferbloat mitigation with FQ-CoDel, side-channel timing attacks, and dark fiber leasing in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'lat-foundations', label: '1. Latency Physics' },
              { id: 'interactive-studio', label: '2. 4-Component Studio' },
              { id: 'regional-benchmarks', label: '3. Regional Benchmarks' },
              { id: 'svg-breakdown', label: '4. Delay Decomposition SVG' },
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

        {/* SECTION 1: Latency Foundations */}
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
                What is Network Latency?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-sky-400">Latency</strong> is the total time delay taken for an individual data packet to travel from its source node to its destination node across a communication channel, measured in milliseconds (ms) or microseconds (μs). It is governed by the speed of light in physical transmission media and queuing algorithms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Processing Delay</span>
                <p className="text-slate-300 text-xs">Time router ASICs take to check packet headers, checksums, and ACL security rules.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Queuing Delay</span>
                <p className="text-slate-300 text-xs">Time packets spend waiting inside router memory buffers during line congestion.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Transmission Delay</span>
                <p className="text-slate-300 text-xs">D_trans = L / R (Time required to push all packet bits onto the wire).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Propagation Delay</span>
                <p className="text-slate-300 text-xs">D_prop = d / s (Physical travel time at ~200,000 km/s in optical glass fiber).</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-Component Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-lat31">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive 4-Component Latency Decomposition Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a geographic network pathway to view mathematical breakdown of D_proc, D_queue, D_trans, and D_prop, along with Round-Trip Time (RTT):
            </p>

            {/* Latency Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {latencyProfiles.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelectedLatencyId(l.id);
                    setLatencyTraceLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedLatencyId === l.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {l.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Latency Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentProfile.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-600">
                  Total RTT: {currentProfile.rtt}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Physical Medium & Distance:</span>
                  <span className="text-sky-300 font-bold">{currentProfile.distance}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Application UX Impact:</span>
                  <span className="text-emerald-300 font-bold">{currentProfile.uxRating}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans">1. D_proc:</span>
                  <span className="text-slate-200">{currentProfile.dProc}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans">2. D_queue:</span>
                  <span className="text-slate-200">{currentProfile.dQueue}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans">3. D_trans (L/R):</span>
                  <span className="text-slate-200">{currentProfile.dTrans}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans">4. D_prop (d/s):</span>
                  <span className="text-slate-200">{currentProfile.dProp}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Ping RTT Packet Trace:
                  </span>
                  <button
                    onClick={() => setLatencyTraceLog(currentProfile.simulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Dispatch Packet & Measure RTT ▶
                  </button>
                </div>

                {latencyTraceLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    ⏱️ <strong>Packet Transit Telemetry:</strong> {latencyTraceLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Regional Benchmarks */}
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
                Global & Regional Latency Benchmarks (from West Bengal)
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Destination Node</th>
                    <th className="p-2.5 text-sky-400">Physical Medium</th>
                    <th className="p-2.5 text-emerald-400">Typical RTT (ms)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Intra-Campus LAN (Barrackpore)</td>
                    <td className="p-2.5">Cat6 Copper (&lt;100m)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">&lt; 0.5 ms</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Kolkata Metro ISP Peering</td>
                    <td className="p-2.5">Metro Fiber Ring</td>
                    <td className="p-2.5 text-emerald-300 font-bold">2 – 5 ms</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Kolkata to Mumbai Cloud Region</td>
                    <td className="p-2.5">Pan-India DWDM (~2,000km)</td>
                    <td className="p-2.5 text-sky-300">28 – 35 ms</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Kolkata to Singapore Data Hub</td>
                    <td className="p-2.5">Subsea Optical Cable</td>
                    <td className="p-2.5 text-sky-300">45 – 55 ms</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Kolkata to US East (N. Virginia)</td>
                    <td className="p-2.5">Transatlantic Fiber (~13,500km)</td>
                    <td className="p-2.5 text-amber-300">180 – 210 ms</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Geostationary Satellite (GEO)</td>
                    <td className="p-2.5">Space Orbit (35,786 km)</td>
                    <td className="p-2.5 text-rose-300 font-bold">550 – 650 ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Delay Decomposition SVG */}
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
                4-Component Latency Decomposition & Optical Propagation Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* D_proc */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. D_proc (Processing)</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">ASIC Table Lookup & ACL</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Typically &lt; 10 μs</text>

                {/* D_queue */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. D_queue (Queuing)</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Buffer Waiting Time</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Mitigated by FQ-CoDel</text>

                {/* D_trans */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. D_trans (L / R)</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Packet Bits / Bitrate</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Serialization Delay</text>

                {/* D_prop */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
                <text x="640" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">4. D_prop (d / s)</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Physical Distance / 200,000</text>
                <text x="640" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Speed of Light in Fiber</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  TOTAL DELAY = D_PROC + D_QUEUE + D_TRANS + D_PROP
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Speed of light in silica fiber = 200,000 km/s (5ms delay per 1,000 km) • RTT cuts single-stream TCP throughput via Mathis' Formula
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Active Queue Management (FQ-CoDel) • Constant-Time Crypto Timing Attack Defenses • Dark Fiber Cross-Connects (₹12,000/mo)
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
                Bengal Operations & Latency Optimization Case Studies
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
                  trap: 'Confusing Transmission Delay (L/R) with Propagation Delay (d/s)',
                  fix: 'Transmission delay is the time to push bits onto the cable (faster line rate reduces it); Propagation delay is the physical travel time across geographic distance (only moving closer reduces it).',
                },
                {
                  trap: 'Assuming Adding More Bandwidth Will Automatically Fix High Latency',
                  fix: 'Bandwidth cannot alter the speed of light. A 10Gbps fiber link to the US East Coast still has ~190ms propagation delay. Use edge CDNs to bring content closer.',
                },
                {
                  trap: 'Using Variable-Time String Comparisons for Passwords and Tokens',
                  fix: 'Early-return string comparisons (`strcmp`) leak execution timing differences to attackers. Always use constant-time comparison functions (`crypto.timingSafeEqual`).',
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
                  Think of latency like a postal courier: Transmission Delay is how fast the clerk stamps and puts your letter in the van; Propagation Delay is how long the truck takes to drive 2,000 km from Kolkata to Mumbai!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how modern HTTP/3 combines connection setup and TLS encryption into a single 1-RTT round trip, slashing page load latency on mobile networks!
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
                Student Revision Checklist (Topic 31)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Decomposed total latency into D_proc, D_queue, D_trans, and D_prop',
                'Calculated Transmission Delay (L/R) and Propagation Delay (d/s) using light speed in fiber',
                'Understood Bufferbloat and the role of FQ-CoDel Active Queue Management',
                'Analyzed Mathis\' Formula showing why high RTT cuts single-stream TCP throughput',
                'Examined Latency Side-Channel Timing Attacks and constant-time algorithmic defenses',
                'Formulated realistic low-latency fiber cross-connect and edge CDN budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Latency is bounded by the speed of light in fiber. In our next topic (Topic 32), we will explore Throughput and real-world transfer efficiency in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Latency FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Latency in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic32_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic31;
