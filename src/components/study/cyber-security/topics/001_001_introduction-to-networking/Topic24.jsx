// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic24.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 24: Client

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic24_files/topic24_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic24_files/topic24_note.txt?raw';

const Topic24 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeClientType, setActiveClientType] = useState('thick');
  const [requestLifecycleStep, setRequestLifecycleStep] = useState(null);

  const clientArchitectures = [
    {
      id: 'thick',
      name: 'Thick (Fat) Client',
      hardware: 'Core i7/Ryzen 7 CPU, 16–32GB RAM, 1TB NVMe SSD, GPU',
      processing: '100% Local Execution (Local OS & Software)',
      serverRole: 'Storage and central database sync only',
      bestFor: 'Engineering 3D CAD in Barrackpore, video editing, local software compilation.',
      costPerSeat: '₹65,000 – ₹1,50,000 per seat',
      securityProfile: 'Broad attack surface; requires local EDR, full-disk BitLocker encryption, and USB lockdown.',
      simulation: 'Local CPU computes complex 3D vector model → Saves final 2MB CAD project to remote server.',
    },
    {
      id: 'thin',
      name: 'Thin Client (VDI Terminal)',
      hardware: 'Dual-core embedded CPU, 4–8GB RAM, 16GB Flash (No Hard Drive)',
      processing: 'Minimal local rendering; 95% execution on remote VDI server',
      serverRole: 'Hosts complete Virtual Desktop session (VMware Horizon/Citrix)',
      bestFor: 'Bank branch teller counters in Ichapur, hospital admission desks, call centers.',
      costPerSeat: '₹15,000 – ₹25,000 per seat (Saves up to 65%)',
      securityProfile: 'High security; zero local data storage, malware cannot persist across reboot, USB blocking.',
      simulation: 'Boots in 8s → Opens encrypted TLS session to VDI cluster → Displays remote Windows desktop.',
    },
    {
      id: 'zero',
      name: 'Zero Client',
      hardware: 'Dedicated Hardware ASIC Decoder (Teradici PCoIP), No OS, No Storage',
      processing: '0% Local Compute (Hardware video decoding only)',
      serverRole: 'Hypervisor streams encrypted display pixels directly to ASIC',
      bestFor: 'University examination digital labs in Kolkata, high-security defense labs.',
      costPerSeat: '₹18,000 – ₹30,000 per seat',
      securityProfile: 'Maximum security; no local OS to infect, no local storage to exfiltrate, zero patch maintenance.',
      simulation: 'Instant power-on (3s) → Hardware PCoIP decoder streams 4K display pixels at 60fps.',
    },
    {
      id: 'web',
      name: 'Web & PWA Client (Browser)',
      hardware: 'Any desktop, laptop, or smartphone running Chrome/Firefox',
      processing: 'Sandboxed V8 JavaScript + Service Workers + Local DOM rendering',
      serverRole: 'Delivers HTML/JS bundles and REST/GraphQL API endpoints',
      bestFor: 'Cloud ERP portals, e-commerce, student examination scorecards.',
      costPerSeat: '₹0 (Runs inside existing browser software)',
      securityProfile: 'Protected by Same-Origin Policy (SOP), Content Security Policy (CSP), and HTTPS encryption.',
      simulation: 'Parses HTML/CSS → Builds DOM Tree → V8 executes React 19 UI in browser sandbox.',
    },
  ];

  const currentArch = clientArchitectures.find((c) => c.id === activeClientType) || clientArchitectures[0];

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
      title: '1. Precision Foundry Engineering Workstations (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu deployed 12 high-performance Thick Clients with Core i7 processors, 32GB RAM, and dedicated graphics in Barrackpore for ₹11,40,000 (₹95,000/seat). Engineers perform 3D CAD stress simulations locally without server network rendering lag.',
      lesson: 'Heavy engineering workflows demand thick client compute power for zero latency.',
    },
    {
      title: '2. Cooperative Bank Branch VDI Thin Client Rollout (Mahima)',
      lead: 'Mahima (Banking Systems Coordinator - Ichapur)',
      desc: 'Mahima equipped a 15-teller cooperative banking branch in Ichapur with Thin Clients connected to a central VDI server. Capital cost was reduced from ₹9,75,000 to ₹3,50,000, while USB mass storage blocking completely eliminated customer data theft risks.',
      lesson: 'Thin clients eliminate endpoint theft risks while cutting IT infrastructure budgets in ₹.',
    },
    {
      title: '3. University Multi-Disciplinary Digital Library Grid (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata configured 60 Zero Clients connected to centralized VMware Horizon hosts in Kolkata for ₹18,00,000. Students log in to personalized Linux desktop sessions with instant boot times and zero local malware infection risks across semester exams.',
      lesson: 'Zero clients deliver unbeatable reliability and zero maintenance overhead for student labs.',
    },
    {
      title: '4. Educational High-Tech Lab Secure Mobile Laptops (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila deployed BitLocker full-disk encryption with TPM 2.0 and Endpoint Detection and Response (EDR) agents across 25 faculty research laptops in Jadavpur for ₹1,25,000 in security software licensing, protecting university patent drafts from physical loss.',
      lesson: 'Hardware TPM chips and full-disk encryption neutralize laptop theft risks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes clientPulse24 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-client24 {
          animation: clientPulse24 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 24
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Client Architecture • Thick vs Thin vs Zero • Endpoint Security in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Client
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Client Systems & Endpoint Architecture</span>: mastering Thick, Thin, Zero, and Web Clients, ephemeral port allocation, request lifecycles, and Zero Trust endpoint security with budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'client-foundations', label: '1. Client Architecture' },
              { id: 'interactive-studio', label: '2. Endpoint Studio' },
              { id: 'request-lifecycle', label: '3. Request-Response Pipeline' },
              { id: 'svg-pipeline', label: '4. Client Request SVG' },
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

        {/* SECTION 1: Client Architecture Foundations */}
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
                What is a Client in Computer Networking?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Client</strong> is an endpoint hardware device (desktop PC, laptop, tablet, smartphone, IoT sensor) or software application (web browser, email client, database GUI, terminal) that initiates communication by dispatching requests to servers across a network, subsequently receiving, validating, and presenting responses to the end user.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Request Initiator</span>
                <p className="text-slate-300 text-xs">Drives the client-server paradigm by opening sockets to well-known server ports.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Ephemeral Ports</span>
                <p className="text-slate-300 text-xs">Allocates dynamic high ports (49152–65535) to uniquely track simultaneous connections.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. UI / DOM Rendering</span>
                <p className="text-slate-300 text-xs">Parses HTML/CSS, executes client-side scripts, and handles user interactions.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Zero Trust Perimeter</span>
                <p className="text-slate-300 text-xs">Enforces hardware TPM encryption, EDR behavioral monitoring, and MFA posture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Endpoint Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-client24">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Client Architecture Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a client architecture to compare local hardware requirements, server dependency, cost per seat in <span className="text-emerald-400 font-bold">₹</span>, and security posture:
            </p>

            {/* Architecture Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {clientArchitectures.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => {
                    setActiveClientType(arch.id);
                    setRequestLifecycleStep(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    activeClientType === arch.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {arch.name}
                </button>
              ))}
            </div>

            {/* Active Architecture Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentArch.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Seat Budget: {currentArch.costPerSeat}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">Local Hardware Profile:</span>
                  <span className="text-slate-200">{currentArch.hardware}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Computational Processing:</span>
                  <span className="text-slate-200">{currentArch.processing}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs">
                <span className="text-purple-300 font-bold">Optimal Enterprise Use Case:</span>
                <p className="text-slate-300">{currentArch.bestFor}</p>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Simulate Client Execution Workflow:
                  </span>
                  <button
                    onClick={() => setRequestLifecycleStep(currentArch.simulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Trigger Client Execution ▶
                  </button>
                </div>

                {requestLifecycleStep && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    💻 <strong>Client Execution Trace:</strong> {requestLifecycleStep}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Request-Response Pipeline */}
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
                The 5-Stage Client Request-Response Lifecycle
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. DNS Lookup</span>
                <p className="text-slate-300 text-[11px]">Resolves domain name to IP in local cache or via Port 53.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. TCP Handshake</span>
                <p className="text-slate-300 text-[11px]">SYN ➔ SYN-ACK ➔ ACK establishes reliable transport socket.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. TLS 1.3 Keys</span>
                <p className="text-slate-300 text-[11px]">Exchanges Diffie-Hellman keys for AES-256 session encryption.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">4. HTTP Request</span>
                <p className="text-slate-300 text-[11px]">Dispatches GET/POST headers & JWT authorization tokens.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">5. DOM Render</span>
                <p className="text-slate-300 text-[11px]">Parses response HTML/CSS & executes V8 JavaScript engine.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Client Request SVG */}
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
                Client-to-Server Request Pipeline Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Client Device */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Client Endpoint</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">IP: 192.168.1.50</text>
                <text x="100" y="80" fill="#fde68a" fontSize="7" textAnchor="middle">Ephemeral Port: 54123</text>

                <line x1="180" y1="55" x2="260" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Network & Internet */}
                <rect x="260" y="20" width="220" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="370" y="45" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Network / Internet Path</text>
                <text x="370" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">DNS Resolution • TCP SYN/ACK</text>
                <text x="370" y="80" fill="#a7f3d0" fontSize="7" textAnchor="middle">TLS 1.3 Encrypted Tunnel</text>

                <line x1="480" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Server */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Server Cluster</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">IP: 103.25.10.4</text>
                <text x="640" y="80" fill="#fde68a" fontSize="7" textAnchor="middle">Well-Known Port: 443 (HTTPS)</text>

                {/* Bottom Security Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CLIENT-SIDE ZERO TRUST SECURITY CONTROLS & COMPLIANCE
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  TPM 2.0 Hardware Encryption (BitLocker) • EDR Behavioral Agents • Mobile Device Management (MDM)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Content Security Policy (CSP) • Same-Origin Policy (SOP) • Multi-Factor Authentication (MFA)
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
                Bengal Enterprise Client & Endpoint Case Studies
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
                  trap: 'Assuming Clients Always Have Fixed Port Numbers Like Servers',
                  fix: 'Servers listen on well-known fixed ports (e.g. 443, 80); clients allocate dynamic temporary ephemeral ports (49152–65535) for each outgoing connection.',
                },
                {
                  trap: 'Deploying Costly Thick PCs for High-Security Bank Teller and Healthcare Desks',
                  fix: 'Thick PCs allow local USB copying and file leaks. Thin and Zero clients with VDI centralize data in the data center and reduce seat costs by 65%.',
                },
                {
                  trap: 'Neglecting Full-Disk Encryption on Corporate Laptops',
                  fix: 'Without TPM 2.0 BitLocker/FileVault encryption, any lost or stolen laptop can be read directly by removing the NVMe SSD.',
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
                  Think of a client like a customer ordering at a restaurant counter: you state what you need (request), wait for the kitchen (server) to prepare it, and enjoy the meal (response) at your table!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how opening 10 browser tabs to the same website creates 10 distinct ephemeral ports on your laptop, ensuring each tab gets its own correct response!
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
                Student Revision Checklist (Topic 24)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined client-server architecture from the client perspective',
                'Differentiated between Thick, Thin, Zero, and Web/PWA clients',
                'Traced the 5-stage web request lifecycle (DNS, TCP, TLS, HTTP, DOM Render)',
                'Understood ephemeral dynamic high ports (49152–65535)',
                'Mastered client-side cybersecurity controls (TPM 2.0, BitLocker, EDR, Zero Trust)',
                'Formulated realistic client endpoint budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Clients represent the primary human interface and the front line of cyber security defense. In our next topic (Topic 25), we will explore Network Interface Cards (NICs) in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Client FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Clients in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic25_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic24;
