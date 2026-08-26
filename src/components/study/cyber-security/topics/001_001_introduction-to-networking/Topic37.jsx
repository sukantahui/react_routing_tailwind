// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic37.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 37: Extranet

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic37_files/topic37_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic37_files/topic37_note.txt?raw';

const Topic37 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedExtranetId, setSelectedExtranetId] = useState('ipsec-supplier');
  const [extranetSimLog, setExtranetSimLog] = useState(null);

  const extranetProfiles = [
    {
      id: 'ipsec-supplier',
      name: 'Supplier ERP Site-to-Site IPsec VPN Tunnel (IKEv2)',
      partnerType: 'Upstream Raw Material Supplier (Durgapur Steel)',
      interconnect: 'Site-to-Site IPsec Tunnel (AES-256 GCM, Diffie-Hellman Group 19)',
      identityAuth: 'Pre-Shared Key / X.509 Device Certificate + Twice NAT',
      accessScope: 'Micro-scoped to ERP Inventory Database (Port 1433) Only',
      securityProtection: 'Twice NAT resolves overlapping 192.168.1.0/24 private subnets.',
      estApplianceCost: '₹1,45,000 (Multi-Gigabit IPsec VPN Gateway)',
      desc: 'Encrypted site-to-site VPN enabling automated nightly raw material inventory feeds into Barrackpore foundry.',
      simResult: 'Tunnel Negotiated (IKEv2 SA Up) &rarr; Twice NAT Maps Subnets -&gt; Syncs 25,000 Purchase Orders securely.',
    },
    {
      id: 'saml-portal',
      name: 'B2B Vendor Web Portal with SAML 2.0 Federated SSO',
      partnerType: 'Authorized Dealership Network & Maintenance Contractors',
      interconnect: 'HTTPS (TLS 1.3) via Reverse Proxy in Screened Extranet DMZ',
      identityAuth: 'SAML 2.0 / OIDC Token with Multi-Factor Authentication (MFA)',
      accessScope: 'Web-based Parts Catalog & Repair Ticketing System Only',
      securityProtection: 'Zero client software installation; session cookie bound to partner IP.',
      estApplianceCost: '₹85,000 (WAF & Identity Federation Module)',
      desc: 'Seamless browser-based extranet portal allowing external mechanics in Kolkata to submit warranty claims.',
      simResult: 'Vendor logs in with Partner Azure AD -> SAML assertion verified by WAF -> Grants scoped portal session.',
    },
    {
      id: 'mtls-api-gateway',
      name: 'Banking & Financial Settlement API via Mutual TLS (mTLS)',
      partnerType: 'Payment Clearing Gateway & Institutional Bank',
      interconnect: 'REST API over HTTPS with Strict Bidirectional mTLS',
      identityAuth: 'Client and Server X.509 Certificates signed by Approved CA',
      accessScope: 'Direct Financial Ledger Clearing API (/api/v2/settlement)',
      securityProtection: 'Rate limiting (500 req/min) + IP whitelisting + Cryptographic non-repudiation.',
      estApplianceCost: '₹1,20,000 (Hardware Security Module & API Gateway)',
      desc: 'Mission-critical automated financial transaction clearance between Ichapur hospital and banking partner.',
      simResult: 'mTLS Handshake: Server & Client verify X.509 certs -> 200 OK -> ₹4,50,000 settlement batch processed.',
    },
    {
      id: 'ztna-supply-chain',
      name: 'Third-Party Contractor ZTNA Isolation (Supply-Chain Defense)',
      partnerType: 'External HVAC & Electrical Maintenance Contractor',
      interconnect: 'Zero Trust Network Access (ZTNA) Cloud Broker',
      identityAuth: 'Continuous Identity & Endpoint Health Posture Assessment',
      accessScope: 'Single Web App: "Turbine HVAC Telemetry" (Port 443)',
      securityProtection: 'Zero network-level Layer-3 subnet access; lateral port scanning blocked 100%.',
      estApplianceCost: '₹65,000 (ZTNA Contractor Access Subscription)',
      desc: 'Prevents Target-style supply-chain pivot attacks by granting contractors least-privilege application access.',
      simResult: 'Contractor connects via ZTNA -> Attempts to port scan 10.0.1.0/24 subnet -> ZTNA broker drops packet & alerts SOC.',
    },
  ];

  const currentExtranet = extranetProfiles.find((e) => e.id === selectedExtranetId) || extranetProfiles[0];

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
      title: '1. Precision Foundry Supplier IPsec VPN & Twice NAT (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu established an IKEv2 IPsec site-to-site VPN for auto-replenishment with a major raw pig-iron supplier for ₹48,000. Resolving overlapping 192.168.1.0/24 IP subnets using Twice NAT enabled automated nightly ERP inventory synchronization between Barrackpore and Durgapur.',
      lesson: 'Twice NAT solves overlapping private IP conflicts in B2B site-to-site VPN tunnels seamlessly.',
    },
    {
      title: '2. Diagnostic Clinic B2B Diagnostic Portal with mTLS (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima implemented Mutual TLS (mTLS) and SAML federated login on diagnostic extranet portals in Ichapur for ₹85,000. Contracted pathology labs securely transmit blood analysis JSON records with client certificate verification, preventing medical record tampering.',
      lesson: 'Mutual TLS (mTLS) provides ironclad cryptographic client authentication for sensitive healthcare B2B APIs.',
    },
    {
      title: '3. University Research Consortium ZTNA Extranet (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed Zero Trust Network Access (ZTNA) for external visiting researchers in Kolkata for ₹1,15,000. Visiting professors access specific supercomputer simulation clusters without gaining visibility or access to the internal campus administrative and payroll subnets.',
      lesson: 'ZTNA grants external partners least-privilege application access, eliminating lateral movement risks.',
    },
    {
      title: '4. Cyber Security Lab Supply-Chain Penetration Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila conducted penetration testing on third-party vendor extranet portals in Jadavpur for ₹65,000. Discovering an unsegmented contractor portal, she enforced strict Extranet DMZ isolation and API rate limiting, blocking potential lateral movement into core laboratory databases.',
      lesson: 'Isolating partner endpoints inside dedicated Extranet DMZs prevents supply-chain breach vectors.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes extraPulse37 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-extra37 {
          animation: extraPulse37 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 37
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Extranet • B2B Integration • IPsec Tunnels • mTLS & ZTNA in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Extranet
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Enterprise Extranet Architectures & B2B Partner Integrations</span>: mastering the 3-tier network spectrum (Internet vs Extranet vs Intranet), site-to-site IPsec tunnels with Twice NAT, Mutual TLS (mTLS) API security, SAML federated SSO, supply-chain pivot defense via ZTNA, and gateway budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'extra-foundations', label: '1. Extranet Foundations' },
              { id: 'interactive-studio', label: '2. B2B Partner Studio' },
              { id: 'spectrum-matrix', label: '3. 3-Tier Spectrum Matrix' },
              { id: 'svg-b2b', label: '4. B2B Extranet DMZ SVG' },
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

        {/* SECTION 1: Extranet Foundations */}
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
                What is an Enterprise Extranet?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              An <strong className="text-sky-400">Extranet</strong> is a controlled, private extension of an enterprise Intranet that securely connects authorized external entities (business partners, suppliers, vendors, distributors, and institutional customers) over the public Internet or dedicated carrier interconnects. It enables automated B2B workflows, EDI order processing, and real-time inventory feeds while strictly isolating core corporate intranets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. IPsec VPN Tunnels</span>
                <p className="text-slate-300 text-xs">Site-to-site IKEv2 tunnels with Twice NAT resolving overlapping IP ranges.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Mutual TLS (mTLS)</span>
                <p className="text-slate-300 text-xs">Bidirectional X.509 certificate authentication securing automated B2B APIs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Federated SAML 2.0</span>
                <p className="text-slate-300 text-xs">Single Sign-On allowing partners to log in using their own corporate credentials.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. ZTNA Defense (₹)</span>
                <p className="text-slate-300 text-xs">Replaces flat VPNs with least-privilege access, stopping supply-chain pivot attacks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: B2B Partner Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-extra37">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive B2B Extranet Tunnel & Partner Access Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an Extranet integration architecture to inspect partner identity models, encryption tunnels, RBAC scoping, and simulated transaction audits:
            </p>

            {/* Extranet Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {extranetProfiles.map((e) => (
                <button
                  key={e.id}
                  onClick={() => {
                    setSelectedExtranetId(e.id);
                    setExtranetSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExtranetId === e.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {e.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Extranet Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentExtranet.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Gateway / Module Cost: {currentExtranet.estApplianceCost}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Target Partner Classification:</span>
                <span className="text-sky-300 font-bold">{currentExtranet.partnerType}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">Interconnection Mechanism:</span>
                  <span className="text-slate-300">{currentExtranet.interconnect}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">Identity & Authentication:</span>
                  <span className="text-slate-300">{currentExtranet.identityAuth}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Scoped Access Boundary:</span>
                  <span className="text-slate-300">{currentExtranet.accessScope}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Security Protection Model:</span>
                  <span className="text-slate-300">{currentExtranet.securityProtection}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute B2B Partner Exchange & Gateway Policy Audit:
                  </span>
                  <button
                    onClick={() => setExtranetSimLog(currentExtranet.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Execute B2B Gateway Audit ▶
                  </button>
                </div>

                {extranetSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🤝 <strong>B2B Extranet Gateway Telemetry:</strong> {extranetSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 3-Tier Spectrum Matrix */}
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
                The 3-Tier Network Hierarchy: Internet vs Extranet vs Intranet
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Dimension</th>
                    <th className="p-2.5 text-sky-400">Public Internet</th>
                    <th className="p-2.5 text-purple-400">B2B Extranet</th>
                    <th className="p-2.5 text-emerald-400">Private Intranet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Target Audience</td>
                    <td className="p-2.5 text-sky-300">General Public (Global)</td>
                    <td className="p-2.5 text-purple-300 font-bold">Trusted B2B Partners & Vendors</td>
                    <td className="p-2.5 text-emerald-300">Internal Employees Only</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Access Control</td>
                    <td className="p-2.5 text-sky-300">Open / Anonymous</td>
                    <td className="p-2.5 text-purple-300 font-bold">SAML 2.0 / mTLS / ZTNA Scoping</td>
                    <td className="p-2.5 text-emerald-300">Active Directory / Kerberos / 802.1X</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Network Boundary</td>
                    <td className="p-2.5 text-rose-400">Untrusted Public WAN</td>
                    <td className="p-2.5 text-purple-300 font-bold">Screened Extranet DMZ / VPN</td>
                    <td className="p-2.5 text-emerald-300">Protected Internal LAN Fabric</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Data Sensitivity</td>
                    <td className="p-2.5 text-sky-300">Public Marketing Data</td>
                    <td className="p-2.5 text-purple-300 font-bold">B2B Invoices, Orders, SLAs</td>
                    <td className="p-2.5 text-emerald-300">Proprietary IP, HR, Payroll</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Primary Threat</td>
                    <td className="p-2.5 text-sky-300">DDoS, Web Scrapers</td>
                    <td className="p-2.5 text-purple-300 font-bold">Supply-Chain Lateral Pivots</td>
                    <td className="p-2.5 text-emerald-300">Insider Threats, Ransomware</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: B2B Extranet DMZ SVG */}
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
                B2B Extranet Interconnection & Screened Partner DMZ Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Partner Enterprise */}
                <rect x="20" y="20" width="170" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="105" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">PARTNER ENTERPRISE</text>
                <text x="105" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Supplier ERP / Vendor Portal</text>
                <text x="105" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">SAML IdP / X.509 Certs</text>

                <line x1="190" y1="55" x2="220" y2="55" stroke="#a855f7" strokeWidth="3" strokeDasharray="4 2" />

                {/* Encrypted Extranet Tunnel */}
                <rect x="220" y="32" width="70" height="46" rx="6" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
                <text x="255" y="52" fill="#f3e8ff" fontSize="8" fontWeight="bold" textAnchor="middle">IPSEC VPN</text>
                <text x="255" y="66" fill="#e9d5ff" fontSize="6" textAnchor="middle">mTLS / ZTNA</text>

                <line x1="290" y1="55" x2="320" y2="55" stroke="#a855f7" strokeWidth="3" strokeDasharray="4 2" />

                {/* Extranet Partner DMZ */}
                <rect x="320" y="20" width="180" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="410" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">EXTRANET PARTNER DMZ</text>
                <text x="410" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">B2B API Gateway & Portals</text>
                <text x="410" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Twice NAT & Rate Limiting</text>

                <line x1="500" y1="55" x2="540" y2="55" stroke="#34d399" strokeWidth="3" />

                {/* Host Intranet Core */}
                <rect x="540" y="20" width="180" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="630" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">HOST INTRANET CORE</text>
                <text x="630" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Internal ERP / SAP Database</text>
                <text x="630" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Strictly Isolated from Partners</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  EXTRANET PRINCIPLE: PARTNERS GET LEAST-PRIVILEGE APPLICATION ACCESS ➔ ZERO DIRECT SUBNET ROUTING
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Site-to-Site IKEv2 IPsec • Twice NAT Overlap Resolution • Mutual TLS (mTLS) API Verification • SAML 2.0 SSO
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Zero Trust Network Access (ZTNA) • Supply-Chain Pivot Defense • B2B Gateway Appliances (₹1,45,000)
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
                Bengal Operations & B2B Extranet Case Studies
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
                  trap: 'Granting Third-Party Vendors Full Layer-3 Network Access via Legacy VPNs',
                  fix: 'Traditional VPNs allow compromised contractor laptops to scan internal subnets. Enforce Zero Trust Network Access (ZTNA) to grant access strictly to single applications.',
                },
                {
                  trap: 'Using Plain API Keys Without Mutual TLS (mTLS) for Automated B2B Integrations',
                  fix: 'Leaked API keys can be used by anyone on the Internet. Mandate Mutual TLS (mTLS) so API requests are rejected unless accompanied by a valid X.509 client certificate.',
                },
                {
                  trap: 'Failing to Automatically Revoke Partner Access When Vendor Contracts End',
                  fix: 'Orphaned vendor credentials create massive security vulnerabilities. Implement automated SCIM/SAML offboarding to revoke certificates instantly upon contract termination.',
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
                  Think of an Extranet like an exclusive VIP loading dock: suppliers are allowed to deliver goods to designated bays with special badges, but they are not allowed to wander freely inside the corporate executive offices!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Twice NAT on extranet firewalls solves overlapping 192.168.1.0/24 subnets by translating both sides into unique non-conflicting virtual IP pools!
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
                Student Revision Checklist (Topic 37)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the 3-tier network spectrum: Internet vs Extranet vs Intranet',
                'Analyzed Site-to-Site IPsec VPN tunnels (IKEv2 / AES-256 GCM) and Twice NAT',
                'Evaluated Mutual TLS (mTLS) client certificate verification for B2B APIs',
                'Implemented SAML 2.0 and OIDC federated Single Sign-On (SSO) for partner portals',
                'Defended against Supply Chain pivot attacks using Zero Trust Network Access (ZTNA)',
                'Formulated realistic enterprise Extranet Gateway budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Extranets empower modern global commerce while requiring vigilant B2B security. In our next topic (Topic 38), we will explore Real-life Networking Examples in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Extranet FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Extranet in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic38_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic37;
