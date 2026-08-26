// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic7.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 7: Cyber Crime

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCrimeId, setSelectedCrimeId] = useState('upi-financial-fraud');
  const [crimeSimLog, setCrimeSimLog] = useState(null);

  const crimeProfiles = [
    {
      id: 'upi-financial-fraud',
      name: 'UPI & SIM-Swap Financial Cyber Fraud',
      targetContext: 'Citizen UPI Banking & Telecom Porting Fraud in Barrackpore',
      legalSection: 'IT Act 2000 Section 66D (Cheating by Personation) + BNS Sec 318(4) Fraud',
      penaltyScope: 'Up to 3 Years Imprisonment + ₹1,00,000 Statutory Fine',
      forensicIntervention: 'National Helpline 1930 / CFCFRMS Automated Debit Freeze Across Mule Accounts',
      estBudget: '₹2,80,000 (Real-Time Transaction Fraud Monitoring & Helpline 1930 Integration)',
      desc: 'Criminals use fake KYC calls or SIM swapping to steal banking credentials and drain accounts.',
      simResult: 'Victim reports fraudulent ₹1,50,000 UPI debit to 1930 -> CFCFRMS triggers API freeze on Layer 1-3 mule accounts in 84 seconds -> 100% Funds recovered.',
    },
    {
      id: 'ransomware-extortion',
      name: 'Ransomware Double Extortion & System Sabotage',
      targetContext: 'Diagnostic Pathology Clinic Server Network in Ichapur',
      legalSection: 'IT Act 2000 Section 66 (Hacking & Damage) + Section 384 Extortion',
      penaltyScope: 'Up to 3 Years Imprisonment + ₹5,00,000 Fine + Civil Damages under Sec 43',
      forensicIntervention: 'Dead-Box Write-Blocker Disk Imaging + In-Memory RAM Volatility Triage',
      estBudget: '₹4,50,000 (DFIR Forensic Retainer & Ransomware Behavioral Containment)',
      desc: 'Malicious actors encrypt patient diagnostic records and demand cryptocurrency ransom.',
      simResult: 'Ransomware attempts shadow copy deletion -> Endpoint EDR isolates infected PC -> Forensic image extracted via write-blocker -> Zero ransom paid.',
    },
    {
      id: 'identity-theft-kyc',
      name: 'Synthetic Identity Theft & Aadhaar Forgery',
      targetContext: 'FinTech Credit Underwriting & Personal Loan Portal in Kolkata',
      legalSection: 'IT Act 2000 Section 66C (Identity Theft) + Section 468 Forgery',
      penaltyScope: 'Up to 3 Years Imprisonment + ₹1,00,000 Fine (Compoundable per Identity)',
      forensicIntervention: 'Biometric Liveness Verification + Format-Preserving Aadhaar Tokenization',
      estBudget: '₹3,20,000 (AI Facial Liveness Detection & Aadhaar Vault Tokenizer Gateway)',
      desc: 'Forging demographic and biometric records to take out fraudulent corporate loans.',
      simResult: 'Adversary submits spoofed Aadhaar document -> AI liveness detection detects printed photo artifact -> Flags "FORGED KYC" in 320ms.',
    },
    {
      id: 'phishing-brand-takedown',
      name: 'Spear-Phishing & Brand Typosquatting Portal',
      targetContext: 'State University Student Examination & Admission Portal in Jadavpur',
      legalSection: 'IT Act 2000 Section 66D + Section 69A (Emergency Domain Takedown)',
      penaltyScope: 'Immediate DNS Registrar Takedown + Criminal Prosecution of Domain Registrant',
      forensicIntervention: 'Certificate Transparency Log Monitoring + Automated Registrar Abuse Filing',
      estBudget: '₹1,90,000 (Automated Phishing Domain Detection & Registrar Takedown Service)',
      desc: 'Spoofed websites mimicking official university portals to harvest student login passwords.',
      simResult: 'Fake clone domain `jadavpur-exam-login.com` detected -> Automated abuse API submits proof -> Registrar revokes DNS delegation in 90 minutes.',
    },
  ];

  const currentCrime = crimeProfiles.find((c) => c.id === selectedCrimeId) || crimeProfiles[0];

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
      title: '1. Precision Foundry BEC Invoice Fraud Interception & FIR Filing (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu discovered a spoofed vendor email attempting to divert a ₹28,00,000 casting supplier payment in Barrackpore. Dialing 1930 and providing email header metadata enabled cyber police to freeze the fraudulent mule account within 45 minutes, prosecuting the criminal under IT Act Section 66D.',
      lesson: 'Rapid response via Helpline 1930 freezes stolen money across banking layers before cash is withdrawn.',
    },
    {
      title: '2. Diagnostic Clinic SIM-Swap & OTP Bypass Investigation (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima investigated a SIM-swap credential theft targeting an Ichapur clinic\'s corporate account for ₹1,80,000. Forensic logs proved telecom store negligence, enabling the clinic to recover ₹4,50,000 in diverted funds and mandate FIDO2 hardware tokens, eliminating SMS OTP dependencies.',
      lesson: 'SIM-swapping attacks bypass SMS authentication, requiring hardware-bound FIDO2 tokens for corporate security.',
    },
    {
      title: '3. State Research University Web Magecart Skimmer Removal (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata led the digital forensic investigation of a malicious Magecart payment skimmer in Kolkata for ₹3,20,000. Identifying injected JavaScript on the university merchandise portal, the forensic team purged the backdoor, rotated payment API keys, and filed an evidentiary cybercrime report with Kolkata Cyber Police.',
      lesson: 'Content Security Policy (CSP) headers and subresource integrity prevent malicious payment card skimming scripts.',
    },
    {
      title: '4. Cyber Security Lab Digital Evidence Chain-of-Custody Testbed (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a court-admissible digital forensics laboratory in Jadavpur for ₹2,10,000. Students perform dead-box hardware write-blocker imaging and Volatility RAM analysis, generating cryptographically verified SHA-256 forensic reports compliant with Section 65B of the Indian Evidence Act.',
      lesson: 'Digital evidence is legally admissible in court only when protected by cryptographic SHA-256 hash chains of custody.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes crimePulse7 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-crime7 {
          animation: crimePulse7 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 7
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Cyber Crime • IT Act 2000 • Digital Forensics & Helpline 1930 in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cyber Crime
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The Anatomy, Legal Penalties & Investigation of Cyber Crimes</span>: analyzing Computer-as-a-Target vs Computer-as-a-Tool, financial UPI/SIM-swap fraud, National Helpline 1930 fund-freezing protocols, Indian IT Act 2000 penalties (Sections 66, 66C, 66D, 66F), digital chain of custody, and anti-fraud budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'crime-foundations', label: '1. Crime Nature' },
              { id: 'interactive-studio', label: '2. Forensic Simulator' },
              { id: 'penalties-matrix', label: '3. IT Act Penalties' },
              { id: 'svg-pipeline', label: '4. Forensics Pipeline SVG' },
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

        {/* SECTION 1: Crime Nature */}
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
                What is Cyber Crime and How is it Classified Under Law?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cyber Crime encompasses all unlawful, criminal activities wherein computing devices, smartphones, or network infrastructure are either the primary target of malicious attack (e.g. ransomware, hacking, DDoS) or the instrument used to commit traditional offences at scale (e.g. UPI fraud, identity theft, predatory extortion, cyberstalking). Combating cybercrime requires rigorous digital forensic preservation and statutory prosecution under the Indian IT Act 2000.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Target vs Tool</span>
                <p className="text-slate-300 text-xs">Computers as targets (malware/hacking) vs computers as tools (fraud/phishing).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Helpline 1930</span>
                <p className="text-slate-300 text-xs">National portal & helpline freezing stolen funds in under 120s across mule banks.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. IT Act Penalties</span>
                <p className="text-slate-300 text-xs">Strict imprisonment under Sections 66, 66C, 66D, and Section 66F (Life Imprisonment).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Digital Forensics (₹)</span>
                <p className="text-slate-300 text-xs">Hardware write-blockers, SHA-256 hash chains of custody, and RAM triage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Forensic Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-crime7">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Cyber Crime Investigation & Fraud Interception Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a cybercrime scenario to inspect criminal modus operandi, applicable IT Act sections, forensic evidence preservation methods, and simulated law enforcement interception:
            </p>

            {/* Crime Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {crimeProfiles.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCrimeId(c.id);
                    setCrimeSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedCrimeId === c.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {c.name.split('&')[0]}
                </button>
              ))}
            </div>

            {/* Active Crime Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentCrime.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Anti-Fraud Budget: {currentCrime.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Crime Context & Modus Operandi:</span>
                <span className="text-sky-300 font-bold">{currentCrime.targetContext}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Applicable Legal Charges:</span>
                <span className="text-slate-300">{currentCrime.legalSection}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Prescribed Penal Sanctions:</span>
                  <span className="text-slate-300">{currentCrime.penaltyScope}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Forensic / Interception Protocol:</span>
                  <span className="text-slate-300">{currentCrime.forensicIntervention}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Live Fraud Interception & Forensic Pipeline:
                  </span>
                  <button
                    onClick={() => setCrimeSimLog(currentCrime.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Simulate Crime Interception ▶
                  </button>
                </div>

                {crimeSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    ⚖️ <strong>Forensic Investigation Log:</strong> {crimeSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: IT Act Penalties */}
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
                Key Penal Provisions of the Indian Information Technology Act 2000 Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">IT Act Section</th>
                    <th className="p-2.5 text-sky-400">Offence Description</th>
                    <th className="p-2.5 text-rose-400">Prescribed Jail Term</th>
                    <th className="p-2.5 text-emerald-400">Maximum Statutory Fine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 65</td>
                    <td className="p-2.5 text-sky-300">Tampering with computer source documents</td>
                    <td className="p-2.5 text-amber-300">Up to 3 Years</td>
                    <td className="p-2.5 text-emerald-300">₹2,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 66</td>
                    <td className="p-2.5 text-sky-300">Computer hacking, system damage, virus release</td>
                    <td className="p-2.5 text-amber-300">Up to 3 Years</td>
                    <td className="p-2.5 text-emerald-300">₹5,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 66C</td>
                    <td className="p-2.5 text-sky-300">Identity theft / using stolen passwords/biometrics</td>
                    <td className="p-2.5 text-amber-300">Up to 3 Years</td>
                    <td className="p-2.5 text-emerald-300">₹1,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 66D</td>
                    <td className="p-2.5 text-sky-300">Cheating by personation using computer resources</td>
                    <td className="p-2.5 text-amber-300">Up to 3 Years</td>
                    <td className="p-2.5 text-emerald-300">₹1,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 66E</td>
                    <td className="p-2.5 text-sky-300">Privacy violation / capturing private body parts</td>
                    <td className="p-2.5 text-amber-300">Up to 3 Years</td>
                    <td className="p-2.5 text-emerald-300">₹2,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 66F</td>
                    <td className="p-2.5 text-sky-300">Cyber Terrorism against critical national infrastructure</td>
                    <td className="p-2.5 text-rose-400 font-bold">LIFE IMPRISONMENT</td>
                    <td className="p-2.5 text-emerald-300">Non-Bailable</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Section 67A</td>
                    <td className="p-2.5 text-sky-300">Transmitting sexually explicit content in electronic form</td>
                    <td className="p-2.5 text-rose-300">Up to 5 Years</td>
                    <td className="p-2.5 text-emerald-300">₹10,00,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Forensics Pipeline SVG */}
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
                The Cyber Crime Investigation & Digital Forensics Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Step 1: Crime & 1930 Dial */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. CRIME & REPORTING</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Fraud Dial 1930 / cybercrime.gov.in</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Golden Hour Fund Freeze</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Step 2: Evidence Seizure */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. EVIDENCE SEIZURE</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Hardware Write-Blockers</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Live RAM Volatility Capture</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Step 3: Hash Chain of Custody */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. HASH INTEGRITY</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">SHA-256 Cryptographic Hash</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Section 65B Evidence Certificate</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Step 4: Prosecution */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. COURT PROSECUTION</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">IT Act 2000 Penalties</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Life Imprisonment (Sec 66F)</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  COMBATING CYBER CRIME: REAL-TIME FUND FREEZING ➔ RIGOROUS DIGITAL FORENSICS ➔ LEGAL PROSECUTION
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Helpline 1930 (CFCFRMS) • Hardware Write-Blockers • Volatile RAM Forensics • Indian Evidence Act Compliance
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Enterprise Anti-Fraud Platforms & DFIR Retainer Services (₹3,50,000 Setup)
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
                Bengal Operations & Cyber Crime Investigation Case Studies
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
                  trap: 'Entering a UPI PIN to "Receive" Money During Online Marketplace Transactions',
                  fix: 'Entering a UPI PIN ALWAYS debits money from your account. You NEVER enter a PIN to receive funds.',
                },
                {
                  trap: 'Powering Down a Hacked Server Immediately and Destroying Volatile RAM Forensic Evidence',
                  fix: 'Rebooting wipes all in-memory malware payloads and active network sockets. Capture RAM triage first using forensic dump tools.',
                },
                {
                  trap: 'Delaying Financial Cyber Fraud Reporting Past the First 2 Hours (The Golden Hour)',
                  fix: 'Criminals transfer stolen money through multiple mule bank accounts within hours. Dial Helpline 1930 immediately to freeze transactions.',
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
                  Think of Digital Forensics like physical crime scene fingerprinting: the moment an investigator touches a physical murder weapon without gloves, or a hard drive without a hardware write-blocker, the evidence is contaminated!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how dialing 1930 within the Golden Hour triggers automated API debit freezes across Layer 1 to Layer 5 mule accounts, recovering stolen funds in minutes!
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
                Student Revision Checklist (Topic 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the fundamental classification of Cyber Crime (computer as target vs computer as tool)',
                'Evaluated key penal provisions of the Indian IT Act 2000 (Sections 66, 66C, 66D, 66E, 66F)',
                'Understood National Cyber Crime Helpline \'1930\' and the CFCFRMS real-time fund freeze pipeline',
                'Analyzed SIM swapping, predatory loan apps, UPI QR code fraud, and digital arrest scams',
                'Mastered Digital Chain of Custody, SHA-256 hash verification, and hardware write-blockers',
                'Formulated realistic enterprise anti-fraud and DFIR budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Understanding cybercrime law and digital forensics empowers you to hold criminals legally accountable in court. In our next topic (Topic 8), we will explore Cyber Warfare in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Cyber Crime FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Cyber Crime in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
