// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic30.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 30: Bandwidth

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic30_files/topic30_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic30_files/topic30_note.txt?raw';

const Topic30 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedBandwidthId, setSelectedBandwidthId] = useState('ill-100');
  const [trafficFloodLog, setTrafficFloodLog] = useState(null);

  const bandwidthProfiles = [
    {
      id: 'ill-100',
      name: '100 Mbps 1:1 Symmetric Leased Line (ILL)',
      rawBandwidth: '100 Mbps (100,000,000 bps)',
      maxDownloadSpeed: '12.5 MB/s (Bytes per second)',
      rtt: '30 ms',
      bdpBytes: '375 KB (Optimal TCP Window: 375 KB)',
      goodputEstimate: '92 Mbps (~11.5 MB/s Payload)',
      contentionRatio: '1:1 (100% Dedicated Unshared)',
      estCost: '₹15,000 – ₹25,000 / month',
      desc: 'Dedicated enterprise internet for mid-sized corporate offices and factories in Barrackpore.',
      floodSimulation: 'Normal load = 45 Mbps (45% capacity). 250 Mbps Volumetric UDP Flood → Pipe saturates at 100%, dropping legitimate packets.',
    },
    {
      id: 'ftth-300',
      name: '300 Mbps Asymmetric FTTH Broadband',
      rawBandwidth: '300 Mbps Down / 30 Mbps Up',
      maxDownloadSpeed: '37.5 MB/s Down / 3.75 MB/s Up',
      rtt: '45 ms',
      bdpBytes: '1.68 MB (Download Window)',
      goodputEstimate: '260 Mbps Down / 24 Mbps Up',
      contentionRatio: '1:8 (Shared Neighborhood Fiber)',
      estCost: '₹999 – ₹1,499 / month',
      desc: 'Consumer and small business fiber connection; high download but asymmetric and shared during evening peak hours.',
      floodSimulation: 'Peak-hour neighborhood contention → Throughput drops to 140 Mbps; Fair Usage Policy (FUP) limits upload bursts.',
    },
    {
      id: 'ill-1000',
      name: '1 Gbps 1:1 Enterprise Fiber Trunk',
      rawBandwidth: '1,000 Mbps (1 Gbps Symmetric)',
      maxDownloadSpeed: '125.0 MB/s',
      rtt: '20 ms',
      bdpBytes: '2.5 MB (Optimal TCP Window)',
      goodputEstimate: '940 Mbps (~117.5 MB/s Payload)',
      contentionRatio: '1:1 (Dedicated Dark Fiber / Metro Ethernet)',
      estCost: '₹65,000 – ₹1,20,000 / month',
      desc: 'High-capacity academic campus backbone in Jadavpur and hospital data centers in Ichapur.',
      floodSimulation: 'Handles 45,000 simultaneous student result queries at 820 Mbps throughput with sub-millisecond switch queuing.',
    },
    {
      id: 'backbone-10g',
      name: '10 Gbps Data Center Core Mesh',
      rawBandwidth: '10,000 Mbps (10 Gbps Line Rate)',
      maxDownloadSpeed: '1,250 MB/s (1.25 GB/s)',
      rtt: '5 ms (Intra-City DC)',
      bdpBytes: '6.25 MB (Optimal TCP Window)',
      goodputEstimate: '9,450 Mbps (~1.18 GB/s Payload with Jumbo Frames)',
      contentionRatio: '1:1 (Private Optical DWDM)',
      estCost: '₹2,50,000+ / month (Enterprise Infrastructure)',
      desc: 'High-performance computing cluster in Kolkata connecting SAN storage and AI model training nodes.',
      floodSimulation: '9KB Jumbo Frames reduce CPU interrupt overhead by 80%, transferring 50GB database backups in 42 seconds.',
    },
  ];

  const currentProfile = bandwidthProfiles.find((b) => b.id === selectedBandwidthId) || bandwidthProfiles[0];

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
      title: '1. Precision Foundry ILL Leased Line Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu commissioned a 100 Mbps 1:1 symmetric Internet Leased Line in Barrackpore for ₹18,500/month. The dedicated unshared pipe eliminated evening ERP lag, supporting 200 telemetry streams and dual site-to-site IPsec VPN tunnels with 99.95% measured uptime.',
      lesson: 'Symmetric 1:1 leased lines guarantee predictable latency for factory ERP telemetry.',
    },
    {
      title: '2. Multi-Speciality Clinic QoS Video Telemedicine (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima implemented Quality of Service (QoS) bandwidth reservation on a 200 Mbps link in Ichapur. Reserving 40 Mbps guaranteed bandwidth for doctor HD video consultations (DSCP EF) ensured zero video stuttering even during heavy staff file backups.',
      lesson: 'QoS bandwidth reservation guarantees voice/video quality during peak data congestion.',
    },
    {
      title: '3. University Examination Result CDN Edge Absorption (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a Cloudflare Enterprise CDN in Kolkata for ₹60,000 during semester result announcements. The CDN edge absorbed 94% of the 450 Mbps traffic spike, preventing the university\'s central 100 Mbps leased line from saturating and crashing.',
      lesson: 'Edge CDNs absorb massive bandwidth spikes, protecting origin leased lines.',
    },
    {
      title: '4. High-Tech Cyber Lab BDP Window Tuning & iPerf (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila tuned Linux kernel TCP socket buffers (`sysctl net.ipv4.tcp_rmem = 4096 87380 16777216`) across 10G optical fiber links in Jadavpur for ₹35,000 in testing equipment. Benchmarked via `iperf3`, single-stream file transfer throughput jumped from 420 Mbps to 9.4 Gbps.',
      lesson: 'Tuning TCP window buffers to match the Bandwidth-Delay Product unlocks full wire speed.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes bwPulse30 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-bw30 {
          animation: bwPulse30 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 30
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Bandwidth • Shannon Capacity • BDP • QoS & Leased Lines in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Bandwidth
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Bandwidth & Capacity Engineering</span>: mastering Shannon and Nyquist capacity theorems, Bandwidth-Delay Product (BDP) buffer tuning, Goodput vs Throughput, QoS traffic shaping, and Internet Leased Line (ILL) tariffs in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'bw-foundations', label: '1. Bandwidth Foundations' },
              { id: 'interactive-studio', label: '2. Capacity & BDP Studio' },
              { id: 'ill-vs-broadband', label: '3. ILL vs Broadband' },
              { id: 'svg-funnel', label: '4. Bandwidth Funnel SVG' },
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

        {/* SECTION 1: Bandwidth Foundations */}
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
                What is Network Bandwidth?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In digital computer networking, <strong className="text-sky-400">Bandwidth</strong> is the theoretical maximum data transfer capacity of a communication channel, representing the maximum volume of bits that can be transmitted per second (measured in bps, Mbps, Gbps, or Tbps). In analog physics, it represents the frequency width (B = f_max - f_min) in Hertz (Hz).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Shannon Capacity</span>
                <p className="text-slate-300 text-xs">C = B * log2(1 + SNR) calculates the maximum error-free bits per second.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. BDP Product</span>
                <p className="text-slate-300 text-xs">Bandwidth * RTT determines optimal TCP receive window (RWIN) sizing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Goodput vs Overhead</span>
                <p className="text-slate-300 text-xs">Measures actual payload data received after subtracting protocol headers.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. 1:1 Leased Lines (₹)</span>
                <p className="text-slate-300 text-xs">Symmetric, unshared bandwidth with 99.9% uptime SLAs for enterprise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Capacity & BDP Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-bw30">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Bandwidth Capacity & BDP Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a network pipeline profile to inspect maximum download speed (MB/s), Bandwidth-Delay Product (BDP), Goodput ratio, and simulated volumetric load saturation:
            </p>

            {/* Bandwidth Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {bandwidthProfiles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBandwidthId(b.id);
                    setTrafficFloodLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedBandwidthId === b.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {b.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Bandwidth Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentProfile.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Tariffs: {currentProfile.estCost}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Raw Pipe Bandwidth:</span>
                  <span className="text-sky-300 font-bold">{currentProfile.rawBandwidth}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Max Byte Download Speed:</span>
                  <span className="text-amber-300 font-bold">{currentProfile.maxDownloadSpeed}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Bandwidth-Delay Product (BDP):</span>
                  <span className="text-emerald-300 font-bold">{currentProfile.bdpBytes}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-300 font-sans font-bold">Estimated Useful Goodput:</span>
                  <span className="text-slate-200">{currentProfile.goodputEstimate}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Contention & Sharing Ratio:</span>
                  <span className="text-slate-200">{currentProfile.contentionRatio}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Simulate Volumetric Load & Traffic Congestion:
                  </span>
                  <button
                    onClick={() => setTrafficFloodLog(currentProfile.floodSimulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Simulate Pipe Saturation ▶
                  </button>
                </div>

                {trafficFloodLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🌊 <strong>Traffic Load Event Log:</strong> {trafficFloodLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ILL vs Broadband */}
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
                Internet Leased Line (ILL) vs Shared Broadband Comparison
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Parameter</th>
                    <th className="p-2.5 text-sky-400">1:1 Dedicated Leased Line (ILL)</th>
                    <th className="p-2.5 text-amber-400">Shared FTTH Broadband</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Symmetry</td>
                    <td className="p-2.5 text-emerald-300 font-bold">1:1 Symmetric (Upload = Download)</td>
                    <td className="p-2.5 text-rose-300">Asymmetric (High Down, Low Up)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Contention Ratio</td>
                    <td className="p-2.5 text-emerald-300 font-bold">1:1 (100% Dedicated Unshared)</td>
                    <td className="p-2.5 text-amber-300">1:8 or 1:10 (Shared with Neighbors)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">SLA Guarantee</td>
                    <td className="p-2.5 text-sky-300">99.9% Uptime with 4-hr MTTR</td>
                    <td className="p-2.5 text-slate-400">Best-Effort (No Uptime SLA)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Static Public IPs</td>
                    <td className="p-2.5 text-emerald-300">Subnet Block (/29 or /28 Included)</td>
                    <td className="p-2.5 text-slate-400">Dynamic IP or Carrier-Grade NAT (CGNAT)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Est. Monthly Cost (₹)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">₹15,000 – ₹25,000 / month (100M)</td>
                    <td className="p-2.5 text-emerald-300">₹800 – ₹1,500 / month (300M)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bandwidth Funnel SVG */}
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
                Bandwidth vs Throughput vs Goodput Funnel & BDP Pipe Dynamics
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Bandwidth Layer */}
                <rect x="20" y="20" width="220" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="130" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">1. BANDWIDTH (1000 Mbps)</text>
                <text x="130" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Theoretical Maximum Pipe Width</text>
                <text x="130" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Governed by Shannon & Nyquist</text>

                {/* Throughput Layer */}
                <rect x="260" y="20" width="220" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="42" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">2. THROUGHPUT (850 Mbps)</text>
                <text x="370" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Actual Measured Bits on Wire</text>
                <text x="370" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Accounts for Congestion & BDP</text>

                {/* Goodput Layer */}
                <rect x="500" y="20" width="220" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. GOODPUT (780 Mbps)</text>
                <text x="610" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Useful Application File Payload</text>
                <text x="610" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Minus IP/TCP Headers & Retries</text>

                {/* Bottom BDP Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  BDP (BANDWIDTH-DELAY PRODUCT) = BANDWIDTH (BPS) × RTT (SECONDS)
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Sizes TCP Receive Windows (RWIN) to prevent line stalling • Divide Mbps by 8 for Byte Download Speed (MB/s)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  QoS Bandwidth Prioritization (DSCP EF) • Anycast DDoS Scrubbing Centers (100+ Tbps) • BGP Blackholing
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
                Bengal Operations & Bandwidth Engineering Case Studies
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
                  trap: 'Confusing Bits per second (Mbps) with Bytes per second (MB/s)',
                  fix: 'Internet bandwidth is sold in bits per second (Mbps); actual download file speed is in bytes per second (MB/s). Divide Mbps by 8 (100 Mbps = 12.5 MB/s maximum).',
                },
                {
                  trap: 'Assuming a 1Gbps Link Will Automatically Deliver 1Gbps Without TCP Buffer Tuning',
                  fix: 'If the TCP receive window (RWIN) is smaller than the Bandwidth-Delay Product (BDP), transmission stalls and throughput drops drastically. Always tune TCP window buffers.',
                },
                {
                  trap: 'Deploying Shared Broadband Connections for Production Enterprise Servers',
                  fix: 'Shared FTTH broadband has high contention ratios (1:8) and asymmetric upload speeds. Enterprise servers mandate 1:1 dedicated symmetric leased lines with SLAs.',
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
                  Think of bandwidth like the diameter of a highway: a 4-lane highway (1 Gbps) carries more total vehicles simultaneously than a 1-lane road (100 Mbps), but both have the same speed limit (speed of light in fiber)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how running `iperf3 -P 8` opens 8 parallel TCP streams, overcoming single-stream window limitations and fully saturating a 10Gbps fiber link!
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
                Student Revision Checklist (Topic 30)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Differentiated between Bandwidth, Throughput, Goodput, and Latency',
                'Applied Shannon\'s Channel Capacity formula and Nyquist Bit Rate formula',
                'Calculated the Bandwidth-Delay Product (BDP) to size TCP receive window buffers',
                'Compared 1:1 Symmetric Leased Lines with Asymmetric Shared Broadband',
                'Understood Volumetric DDoS bandwidth saturation and BGP Blackholing',
                'Formulated realistic enterprise Internet Leased Line (ILL) budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Bandwidth defines the raw capacity of our digital highways. In our next topic (Topic 31), we will explore Latency and delay physics in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Bandwidth FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Bandwidth in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic31_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic30;
