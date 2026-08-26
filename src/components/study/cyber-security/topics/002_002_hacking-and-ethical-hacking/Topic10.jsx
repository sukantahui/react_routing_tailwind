import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: Bug Bounty Payout Matrix State
  const [selectedVulnKey, setSelectedVulnKey] = useState("p1_rce");
  const [selectedAssetTier, setSelectedAssetTier] = useState("tier_1_core");

  // Studio 2: RFC 9116 security.txt Generator State
  const [securityEmail, setSecurityEmail] = useState("security@kolkata-fintech.co.in");
  const [pgpKeyUrl, setPgpKeyUrl] = useState("https://kolkata-fintech.co.in/pgp-key.txt");
  const [policyUrl, setPolicyUrl] = useState("https://kolkata-fintech.co.in/vdp-policy");
  const [preferredLangs, setPreferredLangs] = useState("en, bn, hi");
  const [expiryDate, setExpiryDate] = useState("2027-12-31T23:59:59.000Z");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ssrf");

  // Vulnerability Archetypes for Studio 1
  const vulnerabilityArchetypes = {
    p1_rce: {
      key: "p1_rce",
      title: "Remote Code Execution (RCE)",
      vrtRating: "P1 - CRITICAL",
      cvssScore: 9.8,
      baseMultiplier: 1.0,
      icon: "💥",
      description: "Executing arbitrary system commands on the host server, granting complete interactive shell control.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    },
    p1_ssrf: {
      key: "p1_ssrf",
      title: "Cloud Metadata SSRF (IAM Root Key Leak)",
      vrtRating: "P1 - CRITICAL",
      cvssScore: 9.1,
      baseMultiplier: 0.9,
      icon: "☁️",
      description: "Forcing backend server to query http://169.254.169.254/ to extract temporary AWS IAM root credentials.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    },
    p2_idor: {
      key: "p2_idor",
      title: "Broken Object-Level Auth (BOLA / IDOR)",
      vrtRating: "P2 - HIGH",
      cvssScore: 7.5,
      baseMultiplier: 0.5,
      icon: "🔓",
      description: "Accessing sensitive PII or financial transaction records belonging to other users by changing ID parameters.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    p2_stored_xss: {
      key: "p2_stored_xss",
      title: "Stored XSS on Admin Management Console",
      vrtRating: "P2 - HIGH",
      cvssScore: 7.2,
      baseMultiplier: 0.45,
      icon: "💉",
      description: "Injecting persistent malicious JavaScript into database fields that executes inside the internal Admin session.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    p3_csrf: {
      key: "p3_csrf",
      title: "CSRF on Sensitive State Change (Email / Phone)",
      vrtRating: "P3 - MEDIUM",
      cvssScore: 5.4,
      baseMultiplier: 0.2,
      icon: "🔄",
      description: "Tricking an authenticated victim into submitting unauthorized state-changing requests without their knowledge.",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    },
    p4_open_redirect: {
      key: "p4_open_redirect",
      title: "Open URL Redirection on Login Endpoint",
      vrtRating: "P4 - LOW",
      cvssScore: 3.1,
      baseMultiplier: 0.05,
      icon: "↗️",
      description: "Redirecting users from a trusted enterprise domain to an untrusted external phishing destination.",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700"
    }
  };

  // Asset Tiers for Studio 1
  const assetTiers = {
    tier_1_core: {
      key: "tier_1_core",
      name: "Tier 1: Core Banking & UPI Payment Switch",
      multiplier: 1.0,
      maxPayoutINR: 500000, // Max ₹5 Lakhs
      triageSLA: "< 2 Hours"
    },
    tier_2_customer: {
      key: "tier_2_customer",
      name: "Tier 2: Customer Web Portal & Mobile APIs",
      multiplier: 0.6,
      maxPayoutINR: 300000, // Max ₹3 Lakhs
      triageSLA: "< 8 Hours"
    },
    tier_3_marketing: {
      key: "tier_3_marketing",
      name: "Tier 3: Marketing Blog & Static Subdomains",
      multiplier: 0.2,
      maxPayoutINR: 100000, // Max ₹1 Lakh
      triageSLA: "< 24 Hours"
    }
  };

  const activeVuln = vulnerabilityArchetypes[selectedVulnKey];
  const activeAsset = assetTiers[selectedAssetTier];

  // Calculated Payout in Indian Rupees
  const calculatedPayout = useMemo(() => {
    const rawPayout = activeAsset.maxPayoutINR * activeVuln.baseMultiplier;
    const roundedPayout = Math.round(rawPayout / 1000) * 1000;
    return `₹${roundedPayout.toLocaleString("en-IN")}`;
  }, [activeVuln, activeAsset]);

  // Generated security.txt output
  const generatedSecurityTxt = useMemo(() => {
    return `# RFC 9116 security.txt - Standard Vulnerability Disclosure Policy
Contact: mailto:${securityEmail}
Encryption: ${pgpKeyUrl}
Policy: ${policyUrl}
Preferred-Languages: ${preferredLangs}
Canonical: https://kolkata-fintech.co.in/.well-known/security.txt
Expires: ${expiryDate}
Acknowledgments: https://kolkata-fintech.co.in/hall-of-fame`;
  }, [securityEmail, pgpKeyUrl, policyUrl, preferredLangs, expiryDate]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ssrf",
      lead: "Mamata",
      role: "Lead Bug Bounty Program Manager",
      location: "Kolkata FinTech Operations Center",
      title: "Cloud Metadata SSRF P1 Critical Triage",
      budget: "₹12,50,000",
      payoutAwarded: "₹3,50,000 P1 Bounty",
      dilemma:
        "An ethical researcher discovered a Server-Side Request Forgery (SSRF) in the PDF invoice generator, querying `http://169.254.169.254/` to extract live AWS IAM root tokens.",
      resolution:
        "Mamata triaged the report within 45 minutes, deployed an emergency WAF link-local block, rotated IAM keys, and awarded the researcher a ₹3,50,000 bounty within 24 hours under Gold Safe Harbor.",
      metrics: {
        triageSpeed: "45 Minutes",
        patchDeployed: "3.2 Hours to Production",
        bountyPaid: "₹3,50,000 (Top P1 Tier)",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_vdp",
      lead: "Mahima",
      role: "Chief Healthcare Information Officer",
      location: "Ichapur General Hospital",
      title: "RFC 9116 Healthcare VDP & security.txt",
      budget: "₹4,20,000",
      payoutAwarded: "National Hall of Fame & ₹50,000 Reward",
      dilemma:
        "Hospital lacked a safe, legally protected channel for researchers to report vulnerabilities in medical device IoT telemetry endpoints without fearing prosecution under IT Act Section 66.",
      resolution:
        "Mahima deployed `/.well-known/security.txt` with PGP encryption keys and a Gold Standard Safe Harbor policy, creating an authorized disclosure pipeline for medical ethical hackers.",
      metrics: {
        vdpDeployment: "RFC 9116 Compliant security.txt",
        safeHarborStatus: "100% Legal Protection Clause",
        reportsTriaged: "14 Coordinated Medical Reports",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_vdp",
      lead: "Debangshu",
      role: "Industrial OT Security Architect",
      location: "Barrackpore Industrial Grid",
      title: "Private Smart Meter SCADA Bug Bounty Scope",
      budget: "₹8,50,000",
      payoutAwarded: "₹2,00,000 P2 High Bounty",
      dilemma:
        "Designing a private bug bounty program for 220kV substation IoT smart meters without risking physical grid outages or dangerous electrical disruptions.",
      resolution:
        "Debangshu formulated strict Rules of Engagement (RoE) restricting testing exclusively to isolated cloud API staging sandboxes, strictly prohibiting active testing against live physical substation relays.",
      metrics: {
        programType: "Private Invite-Only (30 Researchers)",
        gridOutages: "0.00 Seconds (Safe Sandbox Testing)",
        bountiesDistributed: "₹6,50,000 Total Rewards",
        compliance: "ISA/IEC 62443 & CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_nciipc",
      lead: "Abhronila & Susmita",
      role: "University Ethical Research Leads",
      location: "Jadavpur University Cyber Labs",
      title: "Government NCIIPC National RVDP Research",
      budget: "₹3,50,000",
      payoutAwarded: "Government of India National Hall of Fame",
      dilemma:
        "Discovered a critical Broken Object-Level Authorization (IDOR) in a state utility billing portal exposing the identity and electricity records of 45,000 citizens.",
      resolution:
        "The students submitted a non-destructive PGP-encrypted report to the NCIIPC Responsible Vulnerability Disclosure Program (RVDP), helping the government patch the portal and earning National Hall of Fame honors.",
      metrics: {
        recordsProtected: "45,000 Citizen Accounts",
        disclosureType: "Responsible Non-Destructive RVDP",
        nationalHonors: "NCIIPC Certificate of Appreciation",
        compliance: "Section 70A IT Act 2000"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_002 • Topic 10 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Vulnerability Disclosure Programs &amp; Bug Bounties
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Harness the power of global crowdsourced ethical defense: from establishing RFC 9116 <code className="text-indigo-300">security.txt</code> files 
            and Vulnerability Disclosure Programs (VDPs), to managing paid Bug Bounty reward matrices in Indian Rupees (₹), Legal Safe Harbors, 
            and Government of India NCIIPC RVDP disclosure channels.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Bug Bounty Payout & Severity Matrix Calculator in ₹ INR */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💰</span> Studio 1: Bug Bounty Severity &amp; Payout Calculator (₹ INR)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a vulnerability archetype and target asset criticality tier to calculate standard Indian enterprise bug bounty payouts and triage SLAs.
            </p>
          </div>

          {/* Vulnerability Archetypes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(vulnerabilityArchetypes).map((vuln) => {
              const isSelected = selectedVulnKey === vuln.key;
              return (
                <button
                  key={vuln.key}
                  onClick={() => setSelectedVulnKey(vuln.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{vuln.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{vuln.vrtRating.split(" - ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{vuln.title.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Asset Criticality Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(assetTiers).map((tier) => {
              const isSelected = selectedAssetTier === tier.key;
              return (
                <button
                  key={tier.key}
                  onClick={() => setSelectedAssetTier(tier.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition border text-xs",
                    isSelected
                      ? "bg-purple-950/80 text-white border-purple-500 shadow-md"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200">{tier.name.split(": ")[0]}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-0.5">{tier.name.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Calculation Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeVuln.badgeClass)}>
                  {activeVuln.vrtRating} • CVSS {activeVuln.cvssScore}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeVuln.title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Standard Bounty Reward</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{calculatedPayout}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Vulnerability Impact Description:</span>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activeVuln.description}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px]">Target Asset Classification</span>
                <span className="font-bold text-white text-xs sm:text-sm block">{activeAsset.name.split(": ")[0]}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px]">Triage SLA Response Time</span>
                <span className="font-bold text-amber-300 text-xs sm:text-sm block">{activeAsset.triageSLA}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px]">Legal Safe Harbor Status</span>
                <span className="font-bold text-emerald-300 text-xs sm:text-sm block">100% Protected (Gold Standard)</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: RFC 9116 security.txt Live Configuration Generator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📄</span> Studio 2: RFC 9116 <code className="text-indigo-300">security.txt</code> Live Configuration Generator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure parameters to generate a standardized, machine-readable <code className="text-indigo-300">/.well-known/security.txt</code> file for enterprise vulnerability disclosure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Form (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-3.5 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Directives Configuration
              </h3>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Security Contact Email:</label>
                <input
                  type="email"
                  value={securityEmail}
                  onChange={(e) => setSecurityEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500"
                /&gt;
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">PGP Public Key URL:</label>
                <input
                  type="text"
                  value={pgpKeyUrl}
                  onChange={(e) => setPgpKeyUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500"
                /&gt;
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Disclosure Policy URL:</label>
                <input
                  type="text"
                  value={policyUrl}
                  onChange={(e) => setPolicyUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500"
                /&gt;
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Preferred Languages:</label>
                <input
                  type="text"
                  value={preferredLangs}
                  onChange={(e) => setPreferredLangs(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500"
                /&gt;
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Expiration Timestamp (ISO-8601):</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500"
                /&gt;
              </div>
            </div>

            {/* Generated Plaintext Output (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Generated RFC 9116 Plaintext</h3>
                  <span className="text-xs text-gray-400">Deploy at: <code className="text-indigo-300">https://yourdomain.com/.well-known/security.txt</code></span>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                  VALID RFC 9116
                </span>
              </div>

              <pre className="p-4 bg-gray-900 rounded-xl border border-gray-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                {generatedSecurityTxt}
              </pre>

              <p className="text-[11px] text-gray-400">
                Deploying this file ensures external ethical hackers discovering flaws in your systems immediately reach your security triage team rather than public social media.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the End-to-End Bug Bounty Report Lifecycle and comparing VDP recognition models against Paid Bug Bounties.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: End-to-End Bug Bounty Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: End-to-End Bug Bounty Report Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Discovery &amp; PoC</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">Non-destructive test</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan6)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. Submission</text>
                    <text x="250" y="56" fill="#c7d2fe" textAnchor="middle" fontSize="8">CVSS &amp; cURL PoC</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan6)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. Triaging</text>
                    <text x="415" y="56" fill="#fde68a" textAnchor="middle" fontSize="8">First-to-Report check</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">4. Remediation</text>
                    <text x="415" y="146" fill="#fca5a5" textAnchor="middle" fontSize="8">DevSecOps Patch</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan6)" />

                  {/* Step 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">5. Bounty Paid (₹)</text>
                    <text x="250" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Bank / Wire Transfer</text>
                  </g>

                  <path d="M 185 135 L 155 135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCyan6)" />

                  {/* Step 6 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="130" height="50" rx="6" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
                    <text x="85" y="132" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="10">6. Disclosure</text>
                    <text x="85" y="146" fill="#e9d5ff" textAnchor="middle" fontSize="8">90-Day CVD Blog</text>
                  </g>

                  {/* Bottom Principle */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="195" width="460" height="90" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="220" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">GOLD STANDARD LEGAL SAFE HARBOR</text>
                    <text x="250" y="238" fill="#cbd5e1" textAnchor="middle" fontSize="9">Explicit authorization under IT Act 2000 Section 66 &amp; US CFAA</text>
                    <text x="250" y="255" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">"Testing strictly within policy scope waives all civil and criminal claims."</text>
                    <text x="250" y="272" fill="#fbbf24" textAnchor="middle" fontSize="8">First-to-Report timestamp wins 100% of the bounty reward.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan6" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: The complete 6-stage lifecycle of a vulnerability report from discovery to bounty payout.
              </p>
            </div>

            {/* Diagram 2: VDP vs Bug Bounty Comparison */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚖️</span> Diagram B: VDP (Recognition) vs Bug Bounty (Cash ₹)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Column: VDP */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="220" height="260" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="130" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="12">VDP (DISCLOSURE)</text>
                    <text x="130" y="65" fill="#a5b4fc" textAnchor="middle" fontSize="9">"See Something, Say Something"</text>

                    <rect x="35" y="85" width="190" height="35" rx="4" fill="#312e81" />
                    <text x="45" y="105" fill="#e0e7ff" fontSize="8.5">• RFC 9116 security.txt hosted</text>

                    <rect x="35" y="130" width="190" height="35" rx="4" fill="#312e81" />
                    <text x="45" y="150" fill="#e0e7ff" fontSize="8.5">• Reward: Hall of Fame &amp; Swag</text>

                    <rect x="35" y="175" width="190" height="35" rx="4" fill="#312e81" />
                    <text x="45" y="195" fill="#e0e7ff" fontSize="8.5">• Target: Every Web Entity</text>

                    <rect x="35" y="220" width="190" height="45" rx="4" fill="#312e81" />
                    <text x="45" y="238" fill="#34d399" fontWeight="bold" fontSize="8.5">NCIIPC National RVDP</text>
                    <text x="45" y="252" fill="#cbd5e1" fontSize="7.5">Govt of India Critical Infrastructure</text>
                  </g>

                  {/* Right Column: Bug Bounty */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="20" width="220" height="260" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="12">PAID BUG BOUNTY</text>
                    <text x="370" y="65" fill="#a7f3d0" textAnchor="middle" fontSize="9">Incentivized Crowdsourced Hacking</text>

                    <rect x="275" y="85" width="190" height="35" rx="4" fill="#065f46" />
                    <text x="285" y="105" fill="#ecfdf5" fontSize="8.5">• Managed on HackerOne/Bugcrowd</text>

                    <rect x="275" y="130" width="190" height="35" rx="4" fill="#065f46" />
                    <text x="285" y="150" fill="#ecfdf5" fontSize="8.5">• Cash Payouts: ₹5K - ₹10L+ (₹)</text>

                    <rect x="275" y="175" width="190" height="35" rx="4" fill="#065f46" />
                    <text x="285" y="195" fill="#ecfdf5" fontSize="8.5">• Target: Mature FinTech/Tech</text>

                    <rect x="275" y="220" width="190" height="45" rx="4" fill="#065f46" />
                    <text x="285" y="238" fill="#fbbf24" fontWeight="bold" fontSize="8.5">Top Indian Tech Programs</text>
                    <text x="285" y="252" fill="#cbd5e1" fontSize="7.5">Swiggy, Razorpay, CRED, Zomato</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: Side-by-side architectural comparison of Vulnerability Disclosure Programs vs Paid Bug Bounties.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Crowdsourced Security Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads manage crowdsourced vulnerability triage, RFC 9116 deployments, and national NCIIPC disclosures across Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bounty / Honors Awarded</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.payoutAwarded}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Vulnerability Report Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Crowdsourced Triage &amp; Remediation Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Crowdsourced Program Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for ethical researchers and enterprise program managers navigating crowdsourced security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Ethical Hunter Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Check Scope First:</strong> Never send a single packet to an unlisted subdomain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Provide Detailed cURL PoCs:</strong> Include sanitized requests and exact remediation code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Stop at Minimal PoC:</strong> Prove access with 1 record; dumping databases is illegal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Respect 90-Day CVD:</strong> Give engineering squads adequate time to patch before disclosure.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Hunter Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Automated Scanner Spam:</strong> Submitting unverified Acunetix reports guarantees instant banning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Extortion &amp; Blackmail:</strong> Threatening to leak bugs if bounties are not paid violates IPC 384.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Out-of-Scope Probing:</strong> Scanning partner payment portals forfeits legal Safe Harbor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Volumetric DDoS:</strong> Stress-testing target servers disrupts operations and triggers legal referral.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Program Management Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Publish RFC 9116 security.txt:</strong> Deploy standardized contact files on all enterprise domains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Gold Safe Harbor:</strong> Legally authorize good-faith testing under IT Act Sec 66.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Fast Triage SLAs:</strong> Respond to P1 Critical submissions within 2 hours to prevent duplicate angst.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Honor National RVDP:</strong> Coordinate critical infrastructure zero-days with NCIIPC.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize key bug bounty and disclosure concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Ethical Bug Hunters
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Broken Object-Level Authorization (IDOR) is the #1 bug on platforms: automated scanners cannot easily understand business logic relationships, making manual human analysis indispensable.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How RFC 9116 transforms disclosure: placing a simple plaintext file at <code className="text-amber-300">/.well-known/security.txt</code> gives researchers an immediate, PGP-encrypted, legally authorized reporting channel.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future bug hunting career, focus on building exploit chains: chaining an Open Redirect with a CORS leak and internal SSRF turns a ₹5,000 Low into a ₹3,50,000 P1 Critical bounty.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>VDP = Recognition (Hall of Fame); Bug Bounty = Cash (₹).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RFC 9116 standardizes /.well-known/security.txt files.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>VRT ranks severity from P1 (Critical) to P5 (Informational).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Coordinated Vulnerability Disclosure (CVD): 90-day window.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NCIIPC RVDP: National Government Critical Infrastructure Portal.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>First-to-Report rule: Earliest timestamp wins 100% of bounty.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Vulnerability Disclosure Programs & Bug Bounties FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Vulnerability Disclosure Programs & Bug Bounties (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Bug hunting is one of the most rewarding and impactful careers in modern cybersecurity. But remember: great power requires unyielding discipline. Always respect scope boundaries, verify Legal Safe Harbors, stop at non-destructive Proof-of-Concepts, and honor the 90-day coordinated disclosure timeline. When you hunt ethically, you protect millions of digital citizens across India and build a reputation of highest distinction."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
