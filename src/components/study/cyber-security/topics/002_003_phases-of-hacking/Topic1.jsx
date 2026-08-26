import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: Reconnaissance Arsenal State
  const [selectedReconKey, setSelectedReconKey] = useState("cert_transparency");

  // Studio 2: Google Dork Builder State
  const [targetDomain, setTargetDomain] = useState("kolkata-fintech.co.in");
  const [selectedDorkCategory, setSelectedDorkCategory] = useState("env_secrets");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_crtsh");

  // Reconnaissance Techniques Data for Studio 1
  const reconTechniques = {
    cert_transparency: {
      key: "cert_transparency",
      name: "Certificate Transparency Logs (crt.sh)",
      category: "PASSIVE FOOTPRINTING",
      packetsToTarget: "0 Packets (Queries public Certificate Authority ledgers)",
      detectionProb: "0% (Completely Invisible to Target SOC)",
      icon: "📜",
      color: "from-blue-600 to-indigo-700",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      sampleQuery: "curl -s 'https://crt.sh/?q=%.kolkata-fintech.co.in&output=json' | jq '.[].name_value'",
      intelGained: "Discovers hidden staging, VPN, and development subdomains created years ago.",
      defensiveCountermeasure: "Decommission forgotten staging subdomains and revoke wildcard testing certificates."
    },
    google_dorking: {
      key: "google_dorking",
      name: "Search Engine Footprinting (Google Dorks)",
      category: "PASSIVE FOOTPRINTING",
      packetsToTarget: "0 Packets (Queries Google's pre-crawled search index)",
      detectionProb: "0% (Completely Invisible to Target SOC)",
      icon: "🔎",
      color: "from-indigo-500 to-purple-600",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      sampleQuery: "site:kolkata-fintech.co.in filetype:env 'DB_PASSWORD'",
      intelGained: "Exposes accidentally published cloud API keys, database backups, and unauthenticated portals.",
      defensiveCountermeasure: "Deploy strict robots.txt disallow rules, strip public indexes, and sanitize web roots."
    },
    shodan_recon: {
      key: "shodan_recon",
      name: "Internet Device & Banner Search (Shodan)",
      category: "PASSIVE FOOTPRINTING",
      packetsToTarget: "0 Packets (Queries Shodan's continuous IPv4 database)",
      detectionProb: "0% (Completely Invisible to Target SOC)",
      icon: "🌐",
      color: "from-cyan-500 to-teal-600",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      sampleQuery: "net:203.0.113.0/24 port:502 'Schneider Electric'",
      intelGained: "Discovers exposed SCADA PLCs, unpatched web servers, and open remote desktop ports.",
      defensiveCountermeasure: "Block public inbound access on administrative and industrial ports via firewall drop rules."
    },
    dns_zone_transfer: {
      key: "dns_zone_transfer",
      name: "DNS Zone Transfer Interrogation (AXFR)",
      category: "ACTIVE FOOTPRINTING",
      packetsToTarget: "Direct TCP Port 53 query to target DNS nameservers",
      detectionProb: "85% (Logged as AXFR transaction in DNS & SIEM logs)",
      icon: "📡",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      sampleQuery: "dig @ns1.kolkata-fintech.co.in kolkata-fintech.co.in AXFR",
      intelGained: "Dumps the entire internal and external DNS database (subdomains, mail exchangers, internal IPs).",
      defensiveCountermeasure: "Restrict AXFR zone transfers strictly to authorized secondary nameserver IPs in BIND/Windows DNS."
    },
    email_harvesting: {
      key: "email_harvesting",
      name: "Email & Employee Harvesting (theHarvester)",
      category: "PASSIVE / HYBRID",
      packetsToTarget: "0 Packets (Scrapes public search engines & PGP servers)",
      detectionProb: "0% (Undetectable public OSINT)",
      icon: "📧",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      sampleQuery: "theHarvester -d kolkata-fintech.co.in -b google,linkedin,bing",
      intelGained: "Harvests corporate email formats (e.g. first.last@domain.in) and employee names for spear-phishing.",
      defensiveCountermeasure: "Conduct employee security awareness training and enforce FIDO2 hardware MFA."
    },
    tcp_traceroute: {
      key: "tcp_traceroute",
      name: "Network Route & Firewall Mapping (TCP Traceroute)",
      category: "ACTIVE FOOTPRINTING",
      packetsToTarget: "Direct TCP SYN packets with incrementing TTL values",
      detectionProb: "75% (Logged as port probe by perimeter firewalls)",
      icon: "🗺️",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      sampleQuery: "tcptraceroute -n kolkata-fintech.co.in 443",
      intelGained: "Maps intermediate gateway hops, ISP routing paths, and identifies where firewalls filter traffic.",
      defensiveCountermeasure: "Deploy stateful packet inspection and suppress ICMP Time Exceeded responses."
    }
  };

  const activeRecon = reconTechniques[selectedReconKey];

  // Google Dork Categories for Studio 2
  const dorkCategories = {
    env_secrets: {
      key: "env_secrets",
      title: "Environment Secrets & API Keys",
      syntax: `site:${targetDomain} filetype:env "DB_PASSWORD" OR "AWS_SECRET_ACCESS_KEY"`,
      impact: "Exposes master database passwords, AWS credentials, and payment gateway tokens."
    },
    db_backups: {
      key: "db_backups",
      title: "Exposed Database Backups & SQL Dumps",
      syntax: `site:${targetDomain} (ext:sql OR ext:bak OR ext:tar.gz) "dump" OR "backup"`,
      impact: "Allows downloading unencrypted SQL dumps containing full customer databases."
    },
    admin_portals: {
      key: "admin_portals",
      title: "Administrative Gateways & Login Portals",
      syntax: `site:${targetDomain} inurl:admin OR inurl:login OR inurl:dashboard intitle:"Login"`,
      impact: "Locates unadvertised employee management and database administration portals."
    },
    git_repositories: {
      key: "git_repositories",
      title: "Exposed Git Version Control Repositories",
      syntax: `site:${targetDomain} inurl:".git" intitle:"Index of /.git"`,
      impact: "Permits dumping the entire source code history, commit logs, and hardcoded secrets."
    },
    sensitive_docs: {
      key: "sensitive_docs",
      title: "Confidential Financial & HR Documents",
      syntax: `site:${targetDomain} filetype:pdf OR filetype:xlsx "CONFIDENTIAL" OR "SALARY"`,
      impact: "Reveals corporate financial statements, payroll records, and executive contracts."
    }
  };

  const activeDork = dorkCategories[selectedDorkCategory];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_crtsh",
      lead: "Mamata",
      role: "Lead Threat Intelligence Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "Certificate Transparency Subdomain Discovery",
      budget: "₹8,50,000",
      footprintType: "Passive Footprinting (crt.sh Logs)",
      dilemma:
        "A regional core banking switch had dozens of unmonitored test subdomains created by developers over three years without central security logging.",
      resolution:
        "Mamata queried public Certificate Transparency logs (crt.sh), discovering an unpatched staging server (`dev-payment.kolkata-fintech.co.in`) with an outdated PHP runtime and shutting it down.",
      metrics: {
        packetsSentToTarget: "0 Packets (100% Passive)",
        subdomainsDiscovered: "38 Active Subdomains",
        shadowItRemediated: "3 Deprecated Staging Servers",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_harvesting",
      lead: "Mahima",
      role: "Hospital Information Security Lead",
      location: "Ichapur General Hospital",
      title: "Medical Staff Email Harvesting Defense",
      budget: "₹4,50,000",
      footprintType: "Passive OSINT Email Harvesting",
      dilemma:
        "Hospital staff were receiving targeted spear-phishing emails containing malicious invoice attachments designed to deploy ransomware on clinical networks.",
      resolution:
        "Mahima ran `theHarvester` and `Hunter.io` to catalog all publicly exposed doctor and nurse email addresses, conducting an authorized security awareness drill and enforcing FIDO2 hardware passkeys.",
      metrics: {
        emailsHarvested: "45 Clinical Staff Emails",
        phishingSusceptibility: "Dropped from 28% to 2%",
        mfaEnforcement: "100% FIDO2 Passkeys Deployed",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_shodan",
      lead: "Debangshu",
      role: "Industrial OT Security Architect",
      location: "Barrackpore Industrial Grid",
      title: "Shodan SCADA Attack Surface Defense",
      budget: "₹7,80,000",
      footprintType: "Passive Shodan & Censys Device Recon",
      dilemma:
        "Verifying whether any 220kV substation SCADA RTUs or Modbus port 502 controllers were accidentally exposed to public internet scanners.",
      resolution:
        "Debangshu executed passive Shodan and Censys queries across grid IP netblocks, finding an exposed contractor diagnostic router and immediately isolating it behind an air-gapped optical data diode.",
      metrics: {
        scadaExposure: "0 Exposed Modbus Ports",
        netblocksAudited: "4 Class-C Subnets (1,024 IPs)",
        gridIsolation: "Unidirectional Optical Diode",
        compliance: "ISA/IEC 62443 & CEA Regulations"
      }
    },
    {
      id: "jadavpur_dns_axfr",
      lead: "Abhronila & Susmita",
      role: "Cyber Research Lab Directors",
      location: "Jadavpur University AI Labs",
      title: "DNS Zone Transfer (AXFR) Hardening Lab",
      budget: "₹3,50,000",
      footprintType: "Active DNS Zone Transfer Simulation",
      dilemma:
        "Demonstrating to university students how misconfigured DNS servers allow adversaries to download an organization's entire internal network topology in seconds.",
      resolution:
        "The team built a student lab demonstrating `dig AXFR` exploitation on misconfigured nameservers and authored `named.conf` configuration rules enforcing strict `allow-transfer` access controls.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        axfrVulnerabilityEliminated: "100% Zone Transfer Block",
        labFramework: "BIND 9 DNS Hardening Guide",
        compliance: "NCIIPC Educational Security Charter"
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
            Cyber Security Module 002_003 • Topic 1 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Phase 1: Reconnaissance (Passive vs Active Footprinting)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the foundational phase of ethical hacking: master the technical and legal distinction between 
            Passive Footprinting (Certificate Transparency logs, Google Dorks, Shodan, WHOIS) and Active Footprinting 
            (DNS Zone Transfers, TCP Traceroute, Banner Grabbing).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Passive vs Active Footprinting Interactive Arsenal & Detection Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 1: Reconnaissance Arsenal &amp; Detection Risk Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a reconnaissance technique to inspect its traffic profile, SOC detection probability, sample command syntax, and defensive countermeasures.
            </p>
          </div>

          {/* Recon Techniques Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(reconTechniques).map((tech) => {
              const isSelected = selectedReconKey === tech.key;
              return (
                <button
                  key={tech.key}
                  onClick={() => setSelectedReconKey(tech.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{tech.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{tech.name.split(" (")[0]}</div>
                  <div className={clsx("mt-1 text-[9.5px] px-1.5 py-0.5 rounded border inline-block", tech.badgeClass)}>
                    {tech.category.split(" ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Recon Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeRecon.badgeClass)}>
                  {activeRecon.category} • {activeRecon.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Technical Execution &amp; Intelligence Value
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">SOC Detection Probability</span>
                <span className={clsx("text-sm sm:text-base font-extrabold", activeRecon.detectionProb.includes("0%") ? "text-emerald-400" : "text-rose-400")}>
                  {activeRecon.detectionProb}
                </span>
              </div>
            </div>

            {/* Traffic Profile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block">Network Traffic Profile</span>
                <p className="text-gray-300">{activeRecon.packetsToTarget}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Tactical Threat Intelligence Gained</span>
                <p className="text-gray-300">{activeRecon.intelGained}</p>
              </div>
            </div>

            {/* Sample Query */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Sample Command / Query Syntax:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-gray-200 overflow-x-auto">
                {activeRecon.sampleQuery}
              </pre>
            </div>

            {/* Countermeasure */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Blue Team Hardening Countermeasure:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeRecon.defensiveCountermeasure}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Google Dork Query Builder & Recon Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔎</span> Studio 2: Google Dork Query Builder &amp; Recon Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a target leak category and input a domain name to generate advanced Google search operator queries for passive vulnerability discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Form (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Dork Configuration Parameters
              </h3>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Target Domain Name:</label>
                <input
                  type="text"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 font-mono"
                /&gt;
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Select Target Artifact Category:</label>
                <div className="space-y-1.5">
                  {Object.values(dorkCategories).map((dork) => {
                    const isSelected = selectedDorkCategory === dork.key;
                    return (
                      <button
                        key={dork.key}
                        onClick={() => setSelectedDorkCategory(dork.key)}
                        className={clsx(
                          "w-full p-2.5 rounded-lg text-left transition border text-xs",
                          isSelected
                            ? "bg-indigo-950/80 text-white border-indigo-500 shadow-md"
                            : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850 hover:text-white"
                        )}
                      &gt;
                        <div className="font-semibold text-gray-200">{dork.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generated Dork Output (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Generated Google Dork Syntax</h3>
                  <span className="text-xs text-gray-400">{activeDork.title}</span>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono font-bold">
                  PASSIVE OSINT
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Google Search Input:</span>
                <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                  {activeDork.syntax}
                </pre>
              </div>

              <div className="p-3.5 bg-gray-900 rounded-xl border border-gray-800 text-xs space-y-1">
                <span className="text-indigo-300 font-bold uppercase tracking-wider block">Potential Security Impact:</span>
                <p className="text-gray-300 text-xs leading-relaxed">{activeDork.impact}</p>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                Google Dorking queries Google's public cache without sending a single packet to the target's servers. Organizations prevent indexing by adding sensitive directories to <code className="text-indigo-300">robots.txt</code> and setting <code className="text-indigo-300">X-Robots-Tag: noindex</code> headers.
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
              Visualizing the technical traffic path of Passive vs Active Reconnaissance and the DNS Zone Transfer (AXFR) leakage mechanism.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Passive vs Active Traffic Path */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Passive vs Active Reconnaissance Traffic
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Hacker Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="80" width="100" height="150" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="70" y="150" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">ETHICAL</text>
                    <text x="70" y="165" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">HACKER</text>
                  </g>

                  {/* Top Path: Passive */}
                  <path d="M 120 120 L 220 50 L 320 50" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="200" y="25" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="265" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">PUBLIC OSINT</text>
                    <text x="265" y="60" fill="#a7f3d0" textAnchor="middle" fontSize="8">crt.sh / Google / Shodan</text>
                  </g>
                  <text x="265" y="90" fill="#34d399" textAnchor="middle" fontSize="8.5">PASSIVE: ZERO Packets to Target</text>

                  {/* Bottom Path: Active */}
                  <path d="M 120 190 L 220 250 L 360 250" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan9)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="200" y="225" width="130" height="50" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="265" y="247" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">ACTIVE PROBE</text>
                    <text x="265" y="260" fill="#fca5a5" textAnchor="middle" fontSize="8">Nmap / AXFR / Banner</text>
                  </g>
                  <text x="265" y="295" fill="#ef4444" textAnchor="middle" fontSize="8.5">ACTIVE: Direct TCP Probes (Logged!)</text>

                  {/* Target Firewall & Server */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="370" y="80" width="110" height="150" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="425" y="145" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11">TARGET</text>
                    <text x="425" y="160" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11">FIREWALL</text>
                    <text x="425" y="180" fill="#94a3b8" textAnchor="middle" fontSize="8">&amp; Server Logs</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan9" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: Passive recon queries 3rd-party repositories invisibly, while active recon directly touches target firewalls.
              </p>
            </div>

            {/* Diagram 2: DNS Zone Transfer Leakage */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>📡</span> Diagram B: DNS Zone Transfer (AXFR) Leakage
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Attacker */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="47" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">ATTACKER / TESTER</text>
                    <text x="85" y="62" fill="#94a3b8" textAnchor="middle" fontSize="8">Sends: dig AXFR</text>
                  </g>

                  {/* Arrow to DNS */}
                  <path d="M 150 50 L 340 50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan9)" />
                  <text x="245" y="42" fill="#ef4444" textAnchor="middle" fontSize="8.5">TCP Port 53 AXFR Request</text>

                  {/* Primary DNS Server */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">PRIMARY DNS</text>
                    <text x="415" y="60" fill="#fca5a5" textAnchor="middle" fontSize="8">Misconfigured AXFR</text>
                  </g>

                  {/* Leak Dump Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="460" height="175" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="135" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="11">FULL DNS DATABASE EXFILTRATED (AXFR DUMP)</text>
                    <text x="35" y="160" fill="#cbd5e1" font-family="monospace" fontSize="9">kolkata-fintech.co.in.     IN  SOA   ns1.kolkata-fintech.co.in.</text>
                    <text x="35" y="178" fill="#cbd5e1" font-family="monospace" fontSize="9">vpn-gateway.kolkata...     IN  A     192.168.10.5 (Internal VPN Gateway)</text>
                    <text x="35" y="196" fill="#cbd5e1" font-family="monospace" fontSize="9">dc01-ad.kolkata...         IN  A     10.0.0.1 (Active Directory Controller)</text>
                    <text x="35" y="214" fill="#cbd5e1" font-family="monospace" fontSize="9">dev-db.kolkata...          IN  A     10.0.4.20 (Unpatched Staging MySQL)</text>
                    <text x="250" y="245" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">Remedy: Add "allow-transfer &#123; none; &#125;;" to named.conf</text>
                    <text x="250" y="262" fill="#94a3b8" textAnchor="middle" fontSize="8">Restricting AXFR prevents full internal topology disclosure to unauthorized clients.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: A misconfigured DNS server fulfills unrestricted AXFR queries, leaking the entire internal network map.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Reconnaissance Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads execute passive subdomain harvesting, email OSINT defense, Shodan SCADA audits, and DNS AXFR hardening across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Recon Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Reconnaissance Dilemma ({currentLocalScenario.footprintType})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Ethical Hacker Footprinting Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Reconnaissance Metrics &amp; Deliverables
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
              Guidelines to maximize the intelligence yield of Phase 1 Reconnaissance while respecting legal boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Reconnaissance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Start with Certificate Transparency:</strong> <code className="text-indigo-300">crt.sh</code> uncovers 90%+ of forgotten subdomains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Check Job Advertisements:</strong> LinkedIn job descriptions reveal exact internal database and SIEM stacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Leverage Wayback Historical URLs:</strong> Query archive.org to find deprecated but live API parameters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Inspect Document EXIF Metadata:</strong> Public PDFs leak internal usernames and file paths.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Recon Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Premature Active Probing:</strong> Sending Nmap scans before signing an RoE violates IT Act Section 66.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Cloud Buckets:</strong> Failing to test permutations of target names against AWS S3 endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Overlooking Third-Party CDNs:</strong> Scanning Cloudflare edge IPs rather than uncovering the origin IP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Social Engineering Overreach:</strong> Threatening employees violates ethical assessment standards.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Restrict DNS AXFR Transfers:</strong> Allow zone transfers only to trusted secondary nameservers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Suppress Server Banners:</strong> Disable <code className="text-emerald-300">server_tokens</code> in Nginx/Apache.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Strip PDF/DOCX Metadata:</strong> Sanitize public corporate documents before publishing to the web.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Publish RFC 9116 security.txt:</strong> Provide authorized reporting channels for security researchers.</span>
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
              Synthesize key footprinting techniques before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Reconnaissance Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Certificate Transparency logs (crt.sh) are an ethical hacker's best friend: whenever developers create staging subdomains, the SSL certificate is publicly and permanently recorded in public CT logs.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How passive recon leaves zero forensic evidence: querying Google caches or Shodan queries external databases, sending exactly 0 packets to the target's firewall.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future assessments, always complete a full Passive OSINT workbook before running active network scans. Thorough reconnaissance turns hours of blind scanning into minutes of targeted exploitation.
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
                <span>Passive Recon: 0 packets sent; Active Recon: Direct probe packets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>crt.sh uncovers subdomains from Certificate Transparency logs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Google Dorks: site:, filetype:, inurl:, intitle: operators.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DNS AXFR zone transfer dumps the entire DNS database if open.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Shodan indexes internet-connected hardware and service banners.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 66 criminalizes active probing without a signed RoE.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Phase 1: Reconnaissance (Passive vs Active Footprinting) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Phase 1: Reconnaissance (Passive vs Active Footprinting) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As future cybersecurity professionals graduating from West Bengal institutions, always remember that an ethical hacker wins their battle in Phase 1. Master passive intelligence gathering—uncover forgotten subdomains with Certificate Transparency, inspect document metadata with ExifTool, and leverage advanced Google Dorks. When you know your target inside and out before firing a single packet, you achieve maximum defensive impact with minimal risk."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
