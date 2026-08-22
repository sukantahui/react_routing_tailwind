// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic43.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 43: Networking in Cloud Computing

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic43_files/topic43_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic43_files/topic43_note.txt?raw';

const Topic43 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCloudId, setSelectedCloudId] = useState('vpc-multitier');
  const [cloudSimLog, setCloudSimLog] = useState(null);

  const cloudProfiles = [
    {
      id: 'vpc-multitier',
      name: 'Multi-Tier Web & Database Architecture inside Isolated VPC',
      workload: 'High-Concurrency E-Commerce Application in Kolkata Cloud Region',
      routingPath: 'User Browser ➔ Internet Gateway ➔ Public ALB Subnet ➔ Private App Subnet ➔ Private DB Subnet (NAT Egress)',
      overlayTech: 'VXLAN Overlay (VNI 1048576) over 100G Underlay Leaf-Spine Clos Fabric',
      securityControl: 'Stateful Security Groups (Virtual NIC) + Stateless Subnet NACLs + Private NAT Gateway',
      latencyThroughput: '10 Gbps Wire Speed Virtual NIC (ENA) • &lt; 0.6 ms Inter-Subnet Latency',
      estCloudBudget: '₹38,000 / month (Multi-AZ ALB + Managed NAT Gateway + Flow Logs)',
      desc: 'Production 3-tier VPC architecture keeping mission-critical database clusters completely isolated from direct public Internet ingress.',
      simResult: 'Client hits ALB (Public Subnet) -> ALB terminates TLS 1.3 -> Forwards to App EC2 (Private Subnet) -> App queries DB (Private Subnet) in 0.4ms.',
    },
    {
      id: 'direct-connect-hybrid',
      name: 'Hybrid Cloud 10G Direct Connect & Transit Gateway (TGW)',
      workload: 'Industrial Manufacturing ERP Sync between Barrackpore & AWS Mumbai',
      routingPath: 'On-Prem Core Switch ➔ Dedicated 10G Fiber Cross-Connect ➔ AWS Direct Connect PoP ➔ Transit Gateway ➔ Prod VPC',
      overlayTech: 'BGP Autonomous System Peering (ASN 65001 <-> ASN 7224) + Jumbo Frames (MTU 9001)',
      securityControl: 'Private Physical Optical Fiber (Zero Public Internet Exposure) + Backup IPsec VPN Tunnel',
      latencyThroughput: '3.2 ms RTT Round-Trip Latency • 10 Gbps Dedicated Non-Blocking Bandwidth',
      estCloudBudget: '₹1,85,000 / month (10G Dedicated Direct Connect Port & Data Center Meet-Me-Room Cross-Connect)',
      desc: 'Dedicated private physical fiber link connecting enterprise on-premises data centers to cloud VPCs with sub-4ms latency.',
      simResult: 'Direct Connect BGP sessions active -> 10G line-rate sync transfers 45GB ERP backup in 38 seconds -> Zero packet loss.',
    },
    {
      id: 'ebpf-cilium-mesh',
      name: 'Kubernetes Container Service Mesh with Cilium eBPF CNI',
      workload: 'Cloud-Native HealthTech Microservices in Ichapur (150 Pods)',
      routingPath: 'Pod A (10.244.1.15) ➔ Linux Kernel eBPF Socket Layer ➔ WireGuard Crypto ➔ Pod B (10.244.2.30)',
      overlayTech: 'GENEVE / VXLAN Overlay with Kernel-Level eBPF Fast-Path Forwarding',
      securityControl: 'Zero iptables overhead + Layer-7 DNS/HTTP Cilium Network Policies + WireGuard Encryption',
      latencyThroughput: '42% Higher Packet Forwarding Throughput • Sub-Microsecond Kernel Jitter',
      estCloudBudget: '₹65,000 / month (Managed Kubernetes EKS Cluster & Egress Filtering Firewall)',
      desc: 'Advanced container networking running sandboxed bytecode directly inside the Linux kernel for line-rate microservice security.',
      simResult: 'eBPF hook intercepts pod socket connection -> Applies L7 HTTP path policy -> Encrypts with WireGuard -> Delivers in 12 microseconds.',
    },
    {
      id: 'cspm-sg-audit',
      name: 'Cloud Security Posture Management (CSPM) Firewall Audit',
      workload: 'Automated Cloud Misconfiguration Detection in Jadavpur Lab',
      routingPath: 'Continuous CloudTrail & VPC Flow Log Stream ➔ CSPM AI Engine ➔ Automated Remediation Lambda',
      overlayTech: 'Virtual Elastic Network Interface (ENI) Telemetry Mirroring',
      securityControl: 'Automated Remediation: Closes accidental 0.0.0.0/0 ingress on Database & SSH ports within 5 seconds.',
      latencyThroughput: 'Real-Time Policy Compliance Audit • Zero Unauthorized Database Exposure',
      estCloudBudget: '₹45,000 / month (Enterprise Cloud Compliance & Automated Remediation Engine)',
      desc: 'Continuous cloud security monitoring engine automatically detecting and closing over-permissioned security group rules.',
      simResult: 'CSPM detects unauthorized 0.0.0.0/0 on Port 3306 -> Triggers Lambda -> Replaces with Restricted Subnet CIDR in 2.1s.',
    },
  ];

  const currentCloud = cloudProfiles.find((c) => c.id === selectedCloudId) || cloudProfiles[0];

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
      title: '1. Precision Foundry Hybrid Cloud 10G Direct Connect (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu established a dedicated 10G AWS Direct Connect cross-connect between an on-premises factory data center in Barrackpore and the AWS Mumbai cloud region for ₹1,85,000 / month. Shop-floor robotic telemetry syncs with cloud AI analytics with 3.2 ms latency and zero packet loss.',
      lesson: 'Dedicated cloud interconnects provide deterministic latency and private high-throughput hybrid connectivity.',
    },
    {
      title: '2. HealthTech Diagnostic Microservices Cilium eBPF Cluster (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed an enterprise Kubernetes cluster with Cilium eBPF CNI in Ichapur for ₹65,000 / month. eBPF-based kernel routing and WireGuard encryption accelerated patient microservice API calls by 42% while enforcing strict pod-to-pod identity network policies.',
      lesson: 'eBPF-powered container networking bypasses iptables overhead, delivering ultra-fast microservice communication.',
    },
    {
      title: '3. E-Commerce Cloud Transit Gateway & Multi-VPC Hub (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata architected a centralized AWS Transit Gateway hub connecting 14 production and analytics VPCs in Kolkata for ₹1,10,000 / month. Integrating an inspection VPC with Palo Alto VM-Series firewalls provided centralized SSL decryption and egress threat filtering during festive flash sales.',
      lesson: 'Transit Gateways with centralized inspection VPCs streamline multi-VPC routing and security enforcement.',
    },
    {
      title: '4. Cyber Security Lab Cloud Security Group CSPM Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila deployed an automated Cloud Security Posture Management (CSPM) engine in Jadavpur for ₹45,000 / month. The scanner automatically detected and closed three over-permissioned 0.0.0.0/0 security group rules on MySQL database ports, eliminating external exposure.',
      lesson: 'Continuous CSPM automation prevents catastrophic database breaches caused by accidental firewall misconfigurations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes cloudPulse43 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-cloud43 {
          animation: cloudPulse43 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 43
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Networking in Cloud Computing • VPC • Direct Connect • VXLAN & eBPF in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Networking in Cloud Computing
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Cloud & Software-Defined Networking (SDN)</span>: mastering Virtual Private Clouds (VPC), VXLAN/GENEVE overlay networks, dedicated Hybrid Cloud Direct Connect / ExpressRoute circuits, Cloud Transit Gateways, Kubernetes eBPF container meshes, and monthly cloud network budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'cloud-foundations', label: '1. Cloud Network Pillars' },
              { id: 'interactive-studio', label: '2. VPC & Hybrid Simulator' },
              { id: 'sg-vs-nacl', label: '3. Security Groups vs NACLs' },
              { id: 'svg-transit', label: '4. Transit Gateway & Direct Connect SVG' },
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

        {/* SECTION 1: Cloud Network Pillars */}
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
                How Does Software-Defined Networking Power the Cloud?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cloud networking abstracts physical data center hardware into programmable, software-defined virtual fabrics. Millions of tenant Virtual Private Clouds (VPCs) operate concurrently over high-speed Leaf-Spine IP fabrics using VXLAN encapsulation, stateful virtual firewalls (Security Groups), dedicated optical hybrid interconnects (Direct Connect), and kernel-level container networking (eBPF).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Virtual Private Cloud</span>
                <p className="text-slate-300 text-xs">Logically isolated software-defined subnets, route tables, and NAT gateways.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. VXLAN Overlay (16M)</span>
                <p className="text-slate-300 text-xs">Encapsulates Layer-2 frames inside UDP 4789 with 24-bit Virtual Network Identifiers.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Direct Connect Hybrid</span>
                <p className="text-slate-300 text-xs">Dedicated private optical cross-connects delivering deterministic sub-4ms cloud latency.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. eBPF / Cilium Mesh (₹)</span>
                <p className="text-slate-300 text-xs">Kernel-level container routing and WireGuard encryption for Kubernetes clusters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: VPC & Hybrid Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-cloud43">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Virtual Private Cloud (VPC) & Hybrid Cloud Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a cloud networking deployment to inspect virtual topologies, overlay encapsulation, firewall parameters, latency SLAs, and simulated routing audits:
            </p>

            {/* Cloud Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {cloudProfiles.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCloudId(c.id);
                    setCloudSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedCloudId === c.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {c.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Cloud Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentCloud.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Monthly Cloud Budget: {currentCloud.estCloudBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Cloud Workload Context:</span>
                <span className="text-sky-300 font-bold">{currentCloud.workload}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Cloud Path Routing:</span>
                <span className="text-slate-300">{currentCloud.routingPath}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">Overlay / Underlay:</span>
                  <span className="text-slate-300">{currentCloud.overlayTech}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Security Boundary:</span>
                  <span className="text-slate-300">{currentCloud.securityControl}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Latency & Speed:</span>
                  <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: currentCloud.latencyThroughput }} />
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Cloud Network Route & Security Audit:
                  </span>
                  <button
                    onClick={() => setCloudSimLog(currentCloud.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Cloud Simulation ▶
                  </button>
                </div>

                {cloudSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    ☁️ <strong>Cloud SDN Telemetry:</strong> {cloudSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Security Groups vs NACLs */}
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
                Security Groups vs Network Access Control Lists (NACLs)
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Feature Comparison</th>
                    <th className="p-2.5 text-sky-400">Security Group (SG)</th>
                    <th className="p-2.5 text-amber-400">Network ACL (NACL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Enforcement Layer</td>
                    <td className="p-2.5 text-sky-300">Virtual NIC (Instance Level)</td>
                    <td className="p-2.5 text-amber-300">Subnet Boundary</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Statefulness</td>
                    <td className="p-2.5 text-sky-300">Stateful (Return traffic automatically allowed)</td>
                    <td className="p-2.5 text-amber-300">Stateless (Inbound and outbound evaluated independently)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Rule Actions</td>
                    <td className="p-2.5 text-sky-300">ALLOW rules only (Implicit Deny All)</td>
                    <td className="p-2.5 text-amber-300">ALLOW and DENY rules supported</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Rule Processing Order</td>
                    <td className="p-2.5 text-sky-300">All rules evaluated collectively before decision</td>
                    <td className="p-2.5 text-amber-300">Numbered order (Rule 100, 200...) from lowest to highest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Transit Gateway & Direct Connect SVG */}
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
                Multi-VPC Cloud Transit Gateway & Hybrid Direct Connect Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* On-Premises Data Center */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. ON-PREMISES DC</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Factory Core Switches</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">BGP Peering (ASN 65001)</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* 10G Direct Connect */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. 10G DIRECT CONNECT</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Dedicated Optical PoP</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">3.2 ms RTT • Private Fiber</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Cloud Transit Gateway */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. TRANSIT GATEWAY</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Hub-and-Spoke Mesh</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Central Inspection VPC</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Production Spoke VPCs */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="640" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">4. PRODUCTION VPCS</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">EKS Cilium • RDS Clusters</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">VXLAN Overlay (VNI 1048576)</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CLOUD NETWORK ARCHITECTURE: HUB-AND-SPOKE TRANSIT GATEWAY ➔ EBPF CONTAINER MICROSEGMENTATION
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  VXLAN RFC 7348 (16 Million VNIs) • Stateful Security Groups • PrivateLink Endpoints • Anycast BGP CDNs
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  CSPM Automated Misconfiguration Audit • Hybrid 10G Direct Connect Circuits (₹1,85,000 / month)
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
                Bengal Operations & Cloud Networking Case Studies
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
                  trap: 'Configuring Inbound 0.0.0.0/0 on SSH, RDP, or Database Security Group Ports',
                  fix: 'Opening sensitive ports to 0.0.0.0/0 invites automated internet ransomware and brute force bots. Restrict ingress strictly to bastion IPs or VPN ranges.',
                },
                {
                  trap: 'Routing Internal PaaS/S3 Storage Traffic Through Expensive NAT Gateways',
                  fix: 'Standard NAT gateways incur steep per-gigabyte data processing fees for internal backups. Deploy free S3 Gateway Endpoints and PrivateLink.',
                },
                {
                  trap: 'Building Complex N*(N-1)/2 Point-to-Point VPC Peering Meshes Across Accounts',
                  fix: 'Mesh peering becomes unmanageable as organizations grow. Consolidate multi-VPC routing through a centralized Cloud Transit Gateway.',
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
                  Think of VXLAN like an express shipping box: it takes your local Layer-2 Ethernet frame, packs it inside a standard UDP packet, and ships it across the physical cloud router underlay to another virtual server!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Security Groups are stateful (inbound return traffic is automatically permitted) while Network ACLs are stateless and evaluate both directions independently!
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
                Student Revision Checklist (Topic 43)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped Virtual Private Cloud (VPC) public/private subnet architectures and NAT gateways',
                'Differentiated between stateful Security Groups and stateless Network ACLs (NACLs)',
                'Evaluated VXLAN (UDP 4789) and GENEVE overlay encapsulation with 24-bit VNIs',
                'Configured Hybrid Cloud Direct Connect / ExpressRoute with BGP dynamic routing',
                'Analyzed Kubernetes Container Network Interface (CNI) and eBPF/Cilium kernel networking',
                'Formulated realistic monthly cloud network and Transit Gateway budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Cloud networking powers the global internet economy through software-defined overlays. In our grand final topic of this module (Topic 44), we will explore the Future of Computer Networking in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Networking in Cloud Computing FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Networking in Cloud Computing in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic44_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic43;
