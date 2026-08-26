// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic39.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 39: Networking in Banking

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic39_files/topic39_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic39_files/topic39_note.txt?raw';

const Topic39 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedBankingId, setSelectedBankingId] = useState('upi-instant');
  const [bankingSimLog, setBankingSimLog] = useState(null);

  const bankingProfiles = [
    {
      id: 'upi-instant',
      name: 'UPI Instant Mobile Payment Transaction (NPCI Switch)',
      txnType: 'Mobile App VPA Transfer (e.g. ₹2,500 Grocery Payment)',
      networkRoute: 'Payer App ➔ Remitter Bank Switch ➔ NPCI UPI Switch (mTLS) ➔ Beneficiary Bank CBS',
      protocolFormat: 'JSON / ISO 20022 Financial XML with mTLS & Digital HMAC',
      cryptoHsm: 'Device Tokenization + 6-Digit MPIN Encrypted inside App Sandbox',
      latencySla: '1.2 Seconds Total End-to-End Latency • 99.99% Availability',
      estApplianceCost: '₹22,00,000 (High-Throughput NPCI UPI Financial Switch Gateway)',
      desc: 'Instant 24/7 retail fund transfer across Indian banks in Barrackpore with real-time settlement.',
      simResult: 'Payer App -> NPCI Hub -> Remitter Debit CBS (₹2,500) -> Beneficiary Credit CBS -> SMS OTP & 200 OK.',
    },
    {
      id: 'atm-withdrawal',
      name: 'Interbank ATM Cash Withdrawal with HSM PIN Verification',
      txnType: 'ATM Physical Cash Dispense (₹10,000 Withdrawal)',
      networkRoute: 'ATM Terminal ➔ Acquiring Bank Switch ➔ NPCI NFS Switch ➔ Issuing Bank Payment HSM',
      protocolFormat: 'ISO 8583 Bitmapped Financial Message (MTI 0200 Request / 0210 Reply)',
      cryptoHsm: 'Thales payShield HSM Translates Terminal PIN (TPK) to Zone Key (ZPK)',
      latencySla: '2.4 Seconds RTT • Zero PIN Memory Exposure (FIPS 140-2 Level 3)',
      estApplianceCost: '₹16,50,000 (Dual Payment Hardware Security Module Pair)',
      desc: 'Interbank card transaction verifying user PIN in tamper-proof hardware before dispensing physical cash.',
      simResult: 'ATM Card Swiped -> ISO 8583 MTI 0200 -> Payment HSM verifies PIN Block -> CBS debits account -> Cash Dispensed.',
    },
    {
      id: 'swift-wire',
      name: 'SWIFT Cross-Border Commercial Wire Transfer (ISO 20022)',
      txnType: 'High-Value International Trade Settlement ($50,000 Machinery Import)',
      networkRoute: 'Kolkata Bank SAG ➔ SWIFTNet Optical PKI Backbone ➔ London Correspondent Bank',
      protocolFormat: 'ISO 20022 XML (pacs.008.001.08) / SWIFT MT103 Financial Message',
      cryptoHsm: 'SWIFT PKI Digital Signatures + HSM Token Authorization (SWIFT CSP Compliant)',
      latencySla: '45 Seconds Settlement • Sanctions & AML Screening Engine Verified',
      estApplianceCost: '₹35,00,000 (SWIFT Alliance Gateway & High-Security HSM Node)',
      desc: 'Secure cross-border interbank messaging settling international manufacturing trade payments.',
      simResult: 'SWIFT Terminal -> SAG Gateway (MT103) -> SWIFTNet PKI -> London Bank accepts pacs.008 -> Account Settled.',
    },
    {
      id: 'jackpotting-defense',
      name: 'ATM Black-Box Jackpotting Attack Defended by Encrypted Bus',
      txnType: 'Criminal Hardware Attack Attempt on Physical Cash Dispenser',
      networkRoute: 'Physical Top-Hat Tampering ➔ Rogue Microcontroller attached to Dispenser Cable',
      protocolFormat: 'Raw Malicious RS-232 Dispense Command Injection',
      cryptoHsm: 'End-to-End Cryptographic Dispenser Bus Encryption + Chassis Intrusion Alarm',
      latencySla: 'Zero Cash Dispensed • Instant Switch Port Shutdown & Police Dispatch',
      estApplianceCost: '₹45,000 per ATM (Hardware Dispenser Encryption Board & Sensor)',
      desc: 'Defeats physical ATM jackpotting by ensuring cash dispensers reject unsigned command pulses.',
      simResult: 'Intrusion sensor triggered -> Dispenser detects missing cryptographic signature -> Rejects command -> Alarms SOC.',
    },
  ];

  const currentBanking = bankingProfiles.find((b) => b.id === selectedBankingId) || bankingProfiles[0];

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
      title: '1. Precision Regional Bank CBS Branch WAN & 4G Failover (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu upgraded 18 bank branch WAN routers in Barrackpore with Cisco SD-WAN and encrypted 4G cellular failover for ₹1,85,000. When primary fiber lines were severed during road construction, branch teller Finacle sessions failed over to cellular in 1.2 seconds with zero ledger corruption.',
      lesson: 'Dual-path SD-WAN with automatic 4G cellular failover guarantees 100% Core Banking uptime for teller counters.',
    },
    {
      title: '2. Cooperative Credit Society Payment HSM Deployment (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima installed a redundant Thales payShield Payment HSM pair for an Ichapur cooperative bank for ₹16,50,000. The HSM processes 1,200 ATM and Micro-ATM PIN verifications per second under FIPS 140-2 Level 3 tamper-zeroization compliance, enabling full RuPay and AePS card integration.',
      lesson: 'Payment HSMs protect cardholder PINs and cryptographic keys inside hardware tamper-proof silicon.',
    },
    {
      title: '3. Commercial Bank NPCI UPI Switch & mTLS Gateway (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed a high-capacity NPCI UPI payment switch gateway in Kolkata for ₹22,00,000. Handling 8,500 transactions per second (TPS) over dedicated mTLS MPLS links, the gateway settles instant mobile remittances between Kolkata retail merchants and national banks.',
      lesson: 'Mutual TLS and dedicated financial switches deliver sub-1.5s real-time settlements for national UPI transactions.',
    },
    {
      title: '4. Cyber Security Lab SWIFT CSP & ATM Dispenser Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila conducted security auditing on SWIFT Alliance terminals and ATM cash dispensers in Jadavpur for ₹95,000. Enforcing isolated management VLANs and dispenser bus encryption neutralized potential black-box hardware attacks and unauthorized cross-border wire injections.',
      lesson: 'SWIFT CSP compliance and dispenser bus encryption stop unauthorized financial transfers and physical jackpotting.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes bankPulse39 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-bank39 {
          animation: bankPulse39 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 39
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Networking in Banking • CBS • UPI/NPCI • Payment HSMs & PCI-DSS in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Networking in Banking
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Core Banking (CBS) & Financial Payment Networking</span>: mastering high-speed NPCI/UPI switches, ATM ISO 8583 messaging, tamper-proof Payment Hardware Security Modules (HSMs), SWIFT international transfers, PCI-DSS CDE segmentation, and banking hardware budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'bank-foundations', label: '1. Banking Networking Pillars' },
              { id: 'interactive-studio', label: '2. Payment Simulator' },
              { id: 'protocols-matrix', label: '3. Financial Protocol Matrix' },
              { id: 'svg-cbs', label: '4. Core Banking & Payment SVG' },
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

        {/* SECTION 1: Banking Networking Pillars */}
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
                How Does Computer Networking Power Global Banking?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Financial networking is the lifeblood of the global economy. Every second, millions of retail card swipes, UPI mobile transfers, ATM withdrawals, and high-value interbank RTGS settlements traverse highly specialized, encrypted private network fabrics designed for zero data loss, sub-second latency, tamper-proof hardware cryptography, and 99.999% high availability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Core Banking (CBS)</span>
                <p className="text-slate-300 text-xs">Centralized real-time ledger synchronization across thousands of branches over MPLS.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Payment HSMs</span>
                <p className="text-slate-300 text-xs">Hardware security modules protecting ATM PINs and card CVVs inside tamper-proof silicon.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. NPCI / UPI Switches</span>
                <p className="text-slate-300 text-xs">National financial routing hubs executing instant mobile payments in under 1.5 seconds.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. PCI-DSS Isolation (₹)</span>
                <p className="text-slate-300 text-xs">Cardholder Data Environment (CDE) firewall microsegmentation and AES-256 encryption.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Payment Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-bank39">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Core Banking (CBS) & UPI Transaction Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a financial banking transaction to inspect the network hop journey, ISO message formats, HSM cryptographic status, and simulated ledger execution:
            </p>

            {/* Banking Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {bankingProfiles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBankingId(b.id);
                    setBankingSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedBankingId === b.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {b.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Banking Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentBanking.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Infrastructure Appliance Budget: {currentBanking.estApplianceCost}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Transaction Scenario:</span>
                <span className="text-sky-300 font-bold">{currentBanking.txnType}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Financial Network Route:</span>
                <span className="text-slate-300">{currentBanking.networkRoute}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Protocol Format:</span>
                  <span className="text-purple-300 font-bold">{currentBanking.protocolFormat}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Hardware Cryptography:</span>
                  <span className="text-emerald-300 font-bold">{currentBanking.cryptoHsm}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Latency & SLA:</span>
                  <span className="text-rose-300 font-bold">{currentBanking.latencySla}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Financial Transaction & Ledger Commit:
                  </span>
                  <button
                    onClick={() => setBankingSimLog(currentBanking.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Banking Transaction ▶
                  </button>
                </div>

                {bankingSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    💳 <strong>Core Banking Transaction Log:</strong> {bankingSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Financial Protocol Matrix */}
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
                Financial Messaging Protocols & Interbank Standards
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Protocol Standard</th>
                    <th className="p-2.5 text-sky-400">Message Structure</th>
                    <th className="p-2.5 text-amber-400">Primary Banking Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">ISO 8583</td>
                    <td className="p-2.5 text-sky-300">Bitmapped binary fields (MTI 0200 / 0210)</td>
                    <td className="p-2.5">ATM cash withdrawals, POS card swipes, NFS interbank routing</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">ISO 20022 (pacs / camt)</td>
                    <td className="p-2.5 text-sky-300">Structured XML / JSON rich data format</td>
                    <td className="p-2.5">Modern RTGS, cross-border SWIFT wire transfers, UPI payments</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">SWIFT MT / MX</td>
                    <td className="p-2.5 text-sky-300">Standardized tagged text (MT103, MT202)</td>
                    <td className="p-2.5">Cross-border interbank financial instructions & foreign exchange</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">NPCI UPI API (mTLS)</td>
                    <td className="p-2.5 text-sky-300">RESTful JSON over HTTPS with X.509 certs</td>
                    <td className="p-2.5">Instant retail mobile payments (IMPS, UPI, AePS biometric)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Core Banking & Payment SVG */}
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
                Multi-Tier Core Banking Solution (CBS) & Payment Switch Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Branch / ATM / Mobile */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. DELIVERY CHANNELS</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">ATMs • Branch Tellers</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Mobile UPI • NetBanking</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Perimeter Switch & WAF */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. PAYMENT SWITCH</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">NPCI / NFS / UPI Gateway</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Mutual TLS + Fraud Engine</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Hardware Security Module */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">3. PAYMENT HSM</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Thales payShield Hardware</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">FIPS 140-2 Level 3 PINs</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Core Banking Ledger DC */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. CORE BANKING DC</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Finacle / BaNCS Cluster</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Active-Active Synchronous DWDM</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  BANKING NETWORK SECURITY: ZERO UNENCRYPTED PINS ➔ STRICT PCI-DSS CDE MICROSEGMENTATION
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  ISO 8583 / ISO 20022 Financial Standards • Mutual TLS Payment APIs • DUKPT Key Management • SWIFTNet PKI
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  ATM Dispenser Bus Encryption • Dual Payment Hardware Security Modules (₹16,50,000 HSM Pair)
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
                Bengal Operations & Banking Infrastructure Case Studies
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
                  trap: 'Allowing Software-Based PIN or CVV Decryption in General Application Server Memory',
                  fix: 'Never process cleartext PINs in software. Always process PIN blocks and CVVs inside tamper-proof Hardware Security Modules (HSMs).',
                },
                {
                  trap: 'Neglecting PCI-DSS Network Segmentation for the Cardholder Data Environment (CDE)',
                  fix: 'A flat banking network allows malware on standard office PCs to sniff card numbers. Enforce strict firewall microsegmentation around the CDE.',
                },
                {
                  trap: 'Relying on a Single MPLS WAN Link Without Cellular 4G/5G Backup for Bank Branches',
                  fix: 'A single fiber cut halts customer counter transactions. Deploy SD-WAN routers with automated, encrypted 4G/5G IPsec failover.',
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
                  Think of a Payment HSM like an armored bank vault with robotic hands: the encryption keys NEVER leave the vault, and all mathematical PIN verifications happen strictly inside the armored box!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the NPCI UPI switch uses Mutual TLS (mTLS) and digital HMACs to settle interbank fund transfers across India in under 1.5 seconds!
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
                Student Revision Checklist (Topic 39)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped Core Banking Solution (CBS) network topology connecting branches and data centers',
                'Evaluated Payment Hardware Security Modules (HSMs) and ISO 9564 PIN translation',
                'Analyzed NPCI/UPI instant payment architectures and ISO 8583 / ISO 20022 messaging',
                'Understood PCI-DSS Cardholder Data Environment (CDE) firewall microsegmentation',
                'Investigated ATM Jackpotting defense, DUKPT key management, and tokenization',
                'Formulated realistic Payment HSM and UPI payment switch budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Secure financial networks protect the wealth of nations through hardware cryptography. In our next topic (Topic 40), we will explore Networking in Education in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Networking in Banking FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Networking in Banking in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic40_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic39;
