// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic21.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 21: Hybrid Topology

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic21_files/topic21_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic21_files/topic21_note.txt?raw';

const Topic21 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeHybridType, setActiveHybridType] = useState('star-bus');
  const [simulatedFailure, setSimulatedFailure] = useState(null);

  const hybridTypes = [
    {
      id: 'star-bus',
      name: 'Star-Bus Hybrid',
      combination: 'Star LANs + Linear Bus Backbone',
      desc: 'Multiple local Star clusters (e.g., department offices in Barrackpore) connect along a high-speed central linear trunk cable.',
      bestFor: 'Sprawling industrial machine shops and multi-room manufacturing complexes.',
      resilience: 'Medium (Backbone is single point of failure for inter-cluster traffic).',
      costEstimate: '₹2,50,000 – ₹4,00,000',
    },
    {
      id: 'star-ring',
      name: 'Star-Ring Hybrid',
      combination: 'Star Cabling + Token Ring Logic (MSAU)',
      desc: 'Cables radiate out in a physical Star to Multi-Station Access Units (MSAUs), which internally pass tokens in a deterministic circular ring.',
      bestFor: 'Legacy IBM mainframes, deterministic factory robotics, and predictable latency environments.',
      resilience: 'High (MSAUs isolate failed nodes while preserving ring continuity).',
      costEstimate: '₹3,50,000 – ₹6,00,000',
    },
    {
      id: 'star-mesh',
      name: 'Star-Mesh Hybrid',
      combination: 'Star Access Edge + Full/Partial Mesh Core',
      desc: 'Enterprise standard: end-user workstations connect via simple Star LANs to access switches, which route to a redundant Mesh Core of Layer-3 switches.',
      bestFor: 'Critical banking data centers in Kolkata, university campuses in Jadavpur, and hospital ICU grids.',
      resilience: 'Maximum (Zero-downtime failover with Spanning Tree / OSPF routing).',
      costEstimate: '₹6,00,000 – ₹15,00,000+',
    },
  ];

  const currentHybrid = hybridTypes.find((h) => h.id === activeHybridType) || hybridTypes[0];

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
      title: '1. Precision Foundry Campus Star-Bus Deployment (Debangshu)',
      lead: 'Debangshu (Lead Systems Architect - Barrackpore)',
      desc: 'Debangshu designed a Star-Bus hybrid network for a manufacturing unit in Barrackpore. Each machine shop operates a local Star switch, with shops interconnected along a 10Gbps fiber bus backbone. Total deployment cost was kept under ₹3,50,000 while enabling future shop expansion.',
      lesson: 'Star-Bus matches modular factory floor growth without rewiring existing bays.',
    },
    {
      title: '2. Multi-Speciality Hospital Patient Monitor Grid (Mahima)',
      lead: 'Mahima (Healthcare Network Director - Ichapur)',
      desc: 'Mahima deployed a Star-Mesh hybrid network connecting ICU monitoring systems to a central redundant hospital server mesh in Ichapur, while outpatient billing desks use basic star connections. Secured 99.999% uptime with an investment of ₹8,00,000, protecting patient lives.',
      lesson: 'Deploy expensive mesh where downtime is life-critical; use simple star at the edge.',
    },
    {
      title: '3. University Academic Campus Multi-Building Backbone (Mamata)',
      lead: 'Mamata (Campus Infrastructure Head - Kolkata)',
      desc: 'Mamata implemented a Star-Tree campus hybrid network connecting 12 academic departments across Kolkata. A centralized fiber core tree feeds departmental distribution switches, providing seamless gigabit connectivity for 5,000+ students and faculty.',
      lesson: 'Tiered Star-Tree architectures cleanly scale across multi-acre educational campuses.',
    },
    {
      title: '4. Educational High-Tech Lab R&D Hybrid Fabric (Abhronila)',
      lead: 'Abhronila (Research IT Coordinator - Jadavpur)',
      desc: 'Abhronila integrated a wired Star Gigabit network with a Wi-Fi 6 wireless mesh fabric in Jadavpur, giving researchers high-speed wired access for simulations alongside mobile laptop roaming throughout the innovation center.',
      lesson: 'Wired star backbones combined with wireless mesh deliver ultimate user agility.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes hybridPulse21 {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-hybrid21 {
          animation: hybridPulse21 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 1 • Module 001_001 • Topic 21
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Hybrid Topology • Star-Bus • Star-Ring • Star-Mesh
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Hybrid Topology
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-indigo-400 font-semibold">Hybrid Network Architectures</span>: combining Star, Bus, Ring, and Mesh topologies to achieve scalable, fault-tolerant enterprise infrastructure with investment budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'hybrid-foundations', label: '1. Hybrid Architecture' },
              { id: 'interactive-studio', label: '2. Topology Studio' },
              { id: 'comparison-matrix', label: '3. Hybrid Comparison' },
              { id: 'svg-architecture', label: '4. 3-Tier Enterprise SVG' },
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
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Hybrid Architecture Foundations */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                What is a Hybrid Topology?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-indigo-400">Hybrid Topology</strong> is a multi-tier network configuration formed by integrating two or more distinct basic physical topologies (such as Star, Bus, Ring, or Mesh). In real-world enterprise environments across Kolkata, Barrackpore, and Jadavpur, no single standard topology satisfies all departmental constraints simultaneously. Hybrid networks allow network architects to customize each section of the infrastructure to match local requirements for scale, cost, and resilience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Modular Expandability</span>
                <p className="text-slate-300 text-xs">Add new branches or building wings without altering the existing backbone.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">2. Localized Fault Isolation</span>
                <p className="text-slate-300 text-xs">A cable severed in one department does not cascade to disrupt other clusters.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">3. Tiered Cost Optimization</span>
                <p className="text-slate-300 text-xs">Spend capital on high-resilience mesh for core servers; deploy low-cost stars for desktop clients.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Topology Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-hybrid21">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Hybrid Topology Combination Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a hybrid combination to inspect its architecture, fault tolerance, deployment cost in <span className="text-emerald-400 font-bold">₹</span>, and failure behavior:
            </p>

            {/* Hybrid Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {hybridTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setActiveHybridType(type.id);
                    setSimulatedFailure(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    activeHybridType === type.id
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {type.name}
                </button>
              ))}
            </div>

            {/* Active Hybrid Details Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">
                  {currentHybrid.name} ({currentHybrid.combination})
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Budget: {currentHybrid.costEstimate}
                </span>
              </div>

              <p className="text-slate-300 text-sm">{currentHybrid.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">Optimal Use Case:</span>
                  <span className="text-slate-200">{currentHybrid.bestFor}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Resilience & Redundancy:</span>
                  <span className="text-slate-200">{currentHybrid.resilience}</span>
                </div>
              </div>

              {/* Failure Simulation Buttons */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  ⚡ Simulate Network Failure Event:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSimulatedFailure('local-link')}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                      simulatedFailure === 'local-link'
                        ? 'bg-rose-600 text-white border-rose-400'
                        : 'bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800'
                    )}
                  &gt;
                    Sever Single Workstation Cable
                  </button>
                  <button
                    onClick={() => setSimulatedFailure('backbone-link')}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                      simulatedFailure === 'backbone-link'
                        ? 'bg-rose-600 text-white border-rose-400'
                        : 'bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800'
                    )}
                  &gt;
                    Sever Core Backbone Trunk
                  </button>
                  <button
                    onClick={() => setSimulatedFailure(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700 hover:bg-emerald-800"
                  &gt;
                    Reset Link Normalcy
                  </button>
                </div>

                {simulatedFailure && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-rose-800/60 text-xs font-mono text-rose-300">
                    {simulatedFailure === 'local-link' ? (
                      <span>
                        🟢 <strong>Impact:</strong> Isolated node failure. Only the disconnected PC goes offline. The rest of the Star cluster and the entire enterprise hybrid backbone continue normal operation.
                      </span>
                    ) : (
                      <span>
                        ⚠️ <strong>Impact:</strong> Backbone Trunk Disruption. Inter-departmental traffic halts across clusters (network partitions into standalone islands), but workstations within each local Star switch can still communicate locally!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Comparison Matrix */}
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
                Hybrid Topology Technical Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Topology Type</th>
                    <th className="p-2.5 text-indigo-400">Backbone Medium</th>
                    <th className="p-2.5 text-amber-400">Fault Tolerance</th>
                    <th className="p-2.5 text-rose-400">Complexity</th>
                    <th className="p-2.5 text-emerald-400">Est. Capital Cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Star-Bus</td>
                    <td className="p-2.5">Coaxial / Fiber Trunk</td>
                    <td className="p-2.5 text-amber-300">Moderate</td>
                    <td className="p-2.5 text-slate-300">Low-Medium</td>
                    <td className="p-2.5 text-emerald-300">₹2,50,000 – ₹4,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Star-Ring</td>
                    <td className="p-2.5">MSAU Ring Loop</td>
                    <td className="p-2.5 text-sky-300">High</td>
                    <td className="p-2.5 text-amber-300">Medium-High</td>
                    <td className="p-2.5 text-emerald-300">₹3,50,000 – ₹6,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Star-Mesh (Enterprise)</td>
                    <td className="p-2.5">10G/40G Fiber Mesh</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Ultra-High (99.999%)</td>
                    <td className="p-2.5 text-rose-400 font-bold">High</td>
                    <td className="p-2.5 text-emerald-300">₹6,00,000 – ₹15,00,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: 3-Tier Enterprise SVG Architecture */}
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
                3-Tier Hybrid Enterprise Network Architecture (Core, Distribution & Access)
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 240"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Core Layer (Mesh) */}
                <rect x="240" y="15" width="260" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="370" y="36" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CORE LAYER (Redundant Mesh Core)
                </text>
                <text x="370" y="52" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                  Dual Layer-3 Switches • 10Gbps Optical Fiber • Sub-millisecond Routing
                </text>

                {/* Core to Distribution Interlinks */}
                <line x1="310" y1="65" x2="180" y2="105" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="310" y1="65" x2="560" y2="105" stroke="#64748b" strokeWidth="2" />
                <line x1="430" y1="65" x2="180" y2="105" stroke="#64748b" strokeWidth="2" />
                <line x1="430" y1="65" x2="560" y2="105" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                {/* Distribution Layer (Tree / Policy) */}
                <rect x="70" y="105" width="220" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="180" y="125" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Distribution Switch A (Block 1)
                </text>
                <text x="180" y="140" fill="#cbd5e1" fontSize="7" textAnchor="middle">
                  VLAN Routing • Access Control Lists (ACLs)
                </text>

                <rect x="450" y="105" width="220" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="560" y="125" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Distribution Switch B (Block 2)
                </text>
                <text x="560" y="140" fill="#cbd5e1" fontSize="7" textAnchor="middle">
                  VLAN Routing • Access Control Lists (ACLs)
                </text>

                {/* Distribution to Access Interlinks */}
                <line x1="180" y1="150" x2="180" y2="180" stroke="#64748b" strokeWidth="2" />
                <line x1="560" y1="150" x2="560" y2="180" stroke="#64748b" strokeWidth="2" />

                {/* Access Layer (Star Endpoints) */}
                <rect x="70" y="180" width="220" height="45" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="180" y="200" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ACCESS LAYER (Star Workstations)
                </text>
                <text x="180" y="215" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Cat6 Copper • PoE IP Phones • Desktop PCs
                </text>

                <rect x="450" y="180" width="220" height="45" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="560" y="200" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ACCESS LAYER (Wi-Fi 6 Mesh APs)
                </text>
                <text x="560" y="215" fill="#ffffff" fontSize="7" textAnchor="middle">
                  High-Density Wireless • Mobile Laptops
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
                Bengal Operations Research & Enterprise Hybrid Case Studies
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
                  <p className="text-indigo-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Forgetting to Configure Spanning Tree Protocol (STP) on Redundant Mesh Links',
                  fix: 'Without STP, redundant links in hybrid networks cause catastrophic Layer 2 broadcast storms and infinite packet loops.',
                },
                {
                  trap: 'Assuming Tree Topology and Hybrid Topology are Completely Different Concepts',
                  fix: 'Tree topology is a specific hierarchical subset of hybrid topology (hierarchical Bus + Star). All tree topologies are hybrid, but hybrid includes Star-Mesh, Star-Ring, etc.',
                },
                {
                  trap: 'Neglecting Structured Cabling Labeling and Port Documentation',
                  fix: 'Because hybrid networks mix different cable standards and switches, unmapped wiring closets lead to extended outages during link troubleshooting.',
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
                  Think of a hybrid topology like a transportation system: high-speed multi-lane highways (mesh core) connect major cities, while residential streets (star LANs) connect individual homes!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how physical Star cabling into an MSAU can still function as a logical token-passing Ring on the inside!
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
                Student Revision Checklist (Topic 21)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood the definition and rationale of Hybrid Topologies',
                'Differentiated between Star-Bus, Star-Ring, and Star-Mesh combinations',
                'Explained physical vs logical topology distinctions (e.g., MSAU Star-Ring)',
                'Identified the 3-tier enterprise model (Core, Distribution, Access)',
                'Understood Spanning Tree Protocol (STP) and Link Aggregation (LACP)',
                'Formulated all network upgrade and hardware budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Hybrid Topology is the undisputed standard of modern enterprise computer networking. In our next topic (Topic 22), we will explore Basic Networking Components!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Hybrid Topology FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Hybrid Topology in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic22_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic21;
