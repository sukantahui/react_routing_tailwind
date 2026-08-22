import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: OSINT Category State
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("people_social");

  // Studio 2: Maltego Link Graph State
  const [selectedRootEntityKey, setSelectedRootEntityKey] = useState("domain_root");
  const [isTransformExecuted, setIsTransformExecuted] = useState(true);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_trufflehog");

  // OSINT Categories Data for Studio 1
  const osintCategories = {
    people_social: {
      key: "people_social",
      name: "People & Social Media OSINT",
      icon: "👥",
      color: "from-blue-600 to-indigo-700",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      coreTools: "Maltego, Sherlock, theHarvester, Hunter.io, Social Engineering Framework",
      targetData: "Employee rosters, personal email aliases, social media usernames across 300+ platforms, executive profiles",
      sampleSyntax: "sherlock debangshu_dev --timeout 5 --print-found",
      legalBoundary: "Collecting public professional contacts for authorized threat modeling is lawful; intrusive personal profiling violates DPDP Act 2023."
    },
    corp_attack_surface: {
      key: "corp_attack_surface",
      name: "Corporate Attack Surface & Infrastructure",
      icon: "🏢",
      color: "from-cyan-500 to-teal-600",
      badgeClass: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
      coreTools: "OWASP Amass, Shodan, Censys, SecurityTrails, Spiderfoot, DNSDumpster",
      targetData: "Subdomains, Autonomous System Numbers (ASN), historical DNS records, open ports, cloud IP ranges",
      sampleSyntax: "amass enum -passive -d kolkata-fintech.co.in -src",
      legalBoundary: "Passive infrastructure querying is 100% legal; direct port probing without written RoE violates IT Act Section 66."
    },
    code_cloud_leaks: {
      key: "code_cloud_leaks",
      name: "Code Repository & Cloud Storage Leaks",
      icon: "📦",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      coreTools: "Trufflehog, Gitleaks, Gitrob, S3Scanner, Cloudlist",
      targetData: "Hardcoded AWS IAM access keys, Stripe tokens, private RSA keys, unsecured public AWS S3 buckets",
      sampleSyntax: "trufflehog git https://github.com/kolkata-org/core-api.git",
      legalBoundary: "Discovering public leaks is lawful under CVD; downloading or exploiting exposed customer databases is criminal theft."
    },
    doc_metadata_geoint: {
      key: "doc_metadata_geoint",
      name: "Document Metadata & Geolocation (GEOINT)",
      icon: "📍",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      coreTools: "ExifTool, FOCA, GHunt, Google Lens, Yandex Visual Search",
      targetData: "Internal Windows usernames, file paths, camera models, GPS latitude/longitude, physical landmark coordinates",
      sampleSyntax: "exiftool -GPSLatitude -GPSLongitude -Author building_photo.jpg",
      legalBoundary: "Extracting metadata from publicly published files is lawful; hacking private storage is strictly illegal."
    },
    darkweb_threat_intel: {
      key: "darkweb_threat_intel",
      name: "Dark Web & Breached Credential Intel",
      icon: "🕵️",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      coreTools: "HaveIBeenPwned API, DeHashed, AlienVault OTX, Pastebin Scrapers, VirusTotal",
      targetData: "Historical password hashes, corporate email exposures, dark web credential dumps, threat actor IOCs",
      sampleSyntax: "curl -H 'hibp-api-key: XXX' https://haveibeenpwned.com/api/v3/breachedaccount/user@domain.in",
      legalBoundary: "Verifying corporate exposure to enforce password resets is standard defensive best practice."
    }
  };

  const activeCategory = osintCategories[selectedCategoryKey];

  // Maltego Link Graph Entities for Studio 2
  const rootEntities = {
    domain_root: {
      key: "domain_root",
      title: "Domain Entity: kolkata-fintech.co.in",
      icon: "🌐",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      linkedNodes: [
        { type: "DNS Nameserver", val: "ns1.cloudflare.com", icon: "📡", color: "text-cyan-300" },
        { type: "IP Address", val: "203.0.113.50 (Data Center in Kolkata)", icon: "💻", color: "text-emerald-300" },
        { type: "Discovered Subdomain", val: "api.kolkata-fintech.co.in", icon: "🔗", color: "text-indigo-300" },
        { type: "Discovered Subdomain", val: "dev-payment.kolkata-fintech.co.in", icon: "⚠️", color: "text-rose-300" },
        { type: "Exposed Cloud Bucket", val: "s3://kolkata-fintech-assets", icon: "☁️", color: "text-amber-300" }
      ]
    },
    person_root: {
      key: "person_root",
      title: "Person Entity: Mamata Sen (Lead Architect)",
      icon: "👤",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      linkedNodes: [
        { type: "Corporate Email", val: "mamata.sen@kolkata-fintech.co.in", icon: "📧", color: "text-indigo-300" },
        { type: "GitHub Profile", val: "https://github.com/msen_dev", icon: "🐙", color: "text-cyan-300" },
        { type: "PGP Key Fingerprint", val: "4A8B 9F21 C340 77E2 1109...", icon: "🔑", color: "text-emerald-300" },
        { type: "Social Media Alias", val: "@mamata_cyber_kolkata", icon: "💬", color: "text-amber-300" },
        { type: "Leaked Credential Alert", val: "Exposed in 2019 Canva Breach (HIBP)", icon: "🚨", color: "text-rose-300" }
      ]
    },
    ip_root: {
      key: "ip_root",
      title: "IP Netblock Entity: 203.0.113.0/24 (ASN 13335)",
      icon: "🗺️",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      linkedNodes: [
        { type: "Autonomous System", val: "AS13335 (Kolkata Regional Gateway)", icon: "🌐", color: "text-blue-300" },
        { type: "Open Port / Banner", val: "Port 443 HTTPS (nginx/1.18.0)", icon: "🔒", color: "text-emerald-300" },
        { type: "Open Port / Banner", val: "Port 22 SSH (OpenSSH 8.2p1)", icon: "🔑", color: "text-cyan-300" },
        { type: "Historical Domain", val: "kolkata-legacy-portal.co.in", icon: "📜", color: "text-amber-300" },
        { type: "Shared Co-Tenant", val: "kolkata-marketing-events.com", icon: "🏢", color: "text-indigo-300" }
      ]
    }
  };

  const activeRoot = rootEntities[selectedRootEntityKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_trufflehog",
      lead: "Mamata",
      role: "Lead DevSecOps Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "GitHub AWS Root Key Leak Triage",
      budget: "₹8,50,000",
      osintTool: "Trufflehog & Gitleaks OSINT",
      dilemma:
        "A junior developer accidentally committed an AWS root API key to a public GitHub repository, exposing core cloud payment infrastructure.",
      resolution:
        "Mamata used Trufflehog to detect the commit within 4 minutes of release, immediately revoked the IAM credential in the AWS console, and deployed pre-commit Git hooks to permanently prevent future leaks.",
      metrics: {
        detectionTime: "4.2 Minutes from Commit",
        credentialsRevoked: "1 Root AWS Access Key",
        financialLossAvoided: "₹50+ Lakhs Cloud Bill Risk",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_maltego",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Credential Stuffing Dark Web Investigation",
      budget: "₹5,20,000",
      osintTool: "HaveIBeenPwned & DeHashed API OSINT",
      dilemma:
        "Hospital staff accounts were being targeted by automated credential stuffing bots using passwords leaked from external consumer websites.",
      resolution:
        "Mahima queried HaveIBeenPwned and DeHashed APIs across `@ichapurhealth.in`, identifying 24 doctor emails exposed in historical third-party leaks and enforcing mandatory password resets + FIDO2 MFA.",
      metrics: {
        breachedAccountsIdentified: "24 Staff Email Accounts",
        passwordResetsEnforced: "100% Mandatory Rotation",
        mfaEnforcement: "FIDO2 Hardware Passkeys",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_amass",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Supply Chain Attack Surface OSINT Audit",
      budget: "₹7,80,000",
      osintTool: "OWASP Amass & Spiderfoot OSINT",
      dilemma:
        "Auditing the external digital attack surface of third-party vendors supplying 220kV substation RTUs to prevent supply chain pivot breaches.",
      resolution:
        "Debangshu ran OWASP Amass and Spiderfoot to map vendor cloud infrastructure, uncovering an exposed testing portal that leaked firmware documentation, and demanding contractual vendor remediation.",
      metrics: {
        vendorDomainsMapped: "14 Third-Party Suppliers",
        shadowItFound: "1 Unprotected Firmware Server",
        remediationSpeed: "< 48 Hours SLA",
        compliance: "ISA/IEC 62443 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_python_osint",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Automated Python OSINT Aggregator Lab",
      budget: "₹3,50,000",
      osintTool: "Custom Python OSINT Framework",
      dilemma:
        "Building an educational Python tool to aggregate subdomain and credential leak data from multiple APIs into a single report for university students.",
      resolution:
        "The team authored an open-source tool integrating crt.sh, Shodan, and HIBP APIs into an automated HTML report generator, publishing the tool on GitHub and training 140+ university students.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        apisIntegrated: "Shodan, crt.sh, HIBP, Censys",
        openSourceStars: "950+ GitHub Community Stars",
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
            Cyber Security Module 002_003 • Topic 2 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            OSINT (Open-Source Intelligence) Tools and Techniques
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the art and science of Open-Source Intelligence: from visual link analysis in Maltego and username hunting with Sherlock, 
            to automated Git secret scanning with Trufflehog, OWASP Amass attack surface mapping, and dark web credential monitoring.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: OSINT Tool Matrix & Capability Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧰</span> Studio 1: OSINT Tool Matrix &amp; Domain Capability Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an OSINT domain to inspect its core toolsets, target data, sample command syntax, and Indian legal privacy boundaries.
            </p>
          </div>

          {/* OSINT Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(osintCategories).map((cat) => {
              const isSelected = selectedCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategoryKey(cat.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{cat.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{cat.name.split(" &")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{cat.name.split(" ")[0]} Domain</div>
                </button>
              );
            })}
          </div>

          {/* Active Category Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCategory.badgeClass)}>
                  {activeCategory.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Intelligence Gathering Methodology
                </h3>
              </div>
            </div>

            {/* Core Tools & Target Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Core Toolsets &amp; Frameworks</span>
                <p className="text-gray-200 font-mono text-[11px] leading-relaxed">{activeCategory.coreTools}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Primary Intelligence Extracted</span>
                <p className="text-gray-300 leading-relaxed">{activeCategory.targetData}</p>
              </div>
            </div>

            {/* Sample CLI Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Sample Execution Command:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                {activeCategory.sampleSyntax}
              </pre>
            </div>

            {/* Legal Boundary */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Legal &amp; Privacy Boundary (DPDP Act 2023):</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeCategory.legalBoundary}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Maltego-Style Interactive Entity Link Graph Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🕸️</span> Studio 2: Maltego-Style Entity Link Graph Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a seed root entity and execute visual OSINT transforms to dynamically uncover interconnected subdomains, employee emails, DNS records, and cloud storage buckets.
            </p>
          </div>

          {/* Root Entity Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(rootEntities).map((root) => {
              const isSelected = selectedRootEntityKey === root.key;
              return (
                <button
                  key={root.key}
                  onClick={() => setSelectedRootEntityKey(root.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{root.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{root.title.split(": ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{root.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Graph Visualization Container */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            {/* Root Node Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-950 rounded-xl border border-indigo-800 text-2xl">{activeRoot.icon}</div>
                <div>
                  <span className={clsx("text-xs font-bold px-2 py-0.5 rounded border", activeRoot.badgeClass)}>
                    SEED ROOT ENTITY
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{activeRoot.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setIsTransformExecuted(!isTransformExecuted)}
                className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-850 text-purple-200 font-bold text-xs border border-purple-600 transition"
              >
                {isTransformExecuted ? "✓ Transforms Active" : "⚡ Execute Transforms"}
              </button>
            </div>

            {/* Linked Nodes Grid */}
            {isTransformExecuted && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  Discovered Linked Entities ({activeRoot.linkedNodes.length} Nodes Mapped via Transforms):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeRoot.linkedNodes.map((node, idx) => (
                    <div key={idx} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1 hover:border-indigo-500 transition duration-200">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-base">{node.icon}</span>
                        <span className="text-gray-400 text-[10.5px] uppercase font-bold">{node.type}</span>
                      </div>
                      <div className={clsx("font-mono text-xs font-bold truncate", node.color)}>{node.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 5-Stage OSINT Intelligence Cycle and Maltego-Style Multilayer Entity Relationship Link Graphs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 5-Stage OSINT Intelligence Cycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 5-Stage OSINT Intelligence Cycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Stage 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Planning</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">Scope &amp; Directives</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan10)" />

                  {/* Stage 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">2. Collection</text>
                    <text x="250" y="56" fill="#a5f3fc" textAnchor="middle" fontSize="8">Shodan / crt.sh / APIs</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan10)" />

                  {/* Stage 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. Processing</text>
                    <text x="415" y="56" fill="#fde68a" textAnchor="middle" fontSize="8">Normalize JSON/CSV</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Stage 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">4. Analysis</text>
                    <text x="415" y="146" fill="#fca5a5" textAnchor="middle" fontSize="8">Maltego Link Graph</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan10)" />

                  {/* Stage 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">5. Disseminate</text>
                    <text x="250" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Actionable Intel Report</text>
                  </g>

                  {/* Operational Footer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="190" width="460" height="95" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="215" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">LEGAL &amp; ETHICAL OSINT DISCIPLINE</text>
                    <text x="250" y="235" fill="#cbd5e1" textAnchor="middle" fontSize="9">"Raw data is not intelligence; analysis creates actionable defensive insight."</text>
                    <text x="250" y="252" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Conduct research in isolated VMs (Tails/Whonix) with multi-hop VPNs for OPSEC.</text>
                    <text x="250" y="270" fill="#fbbf24" textAnchor="middle" fontSize="8">DPDP Act 2023: Forbids intrusive non-consensual personal citizen profiling.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: The 5-stage OSINT intelligence lifecycle from planning to executive dissemination.
              </p>
            </div>

            {/* Diagram 2: Maltego Link Graph */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                <span>🕸️</span> Diagram B: Maltego Entity Relationship Graph
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Domain Node */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="140" r="45" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="250" y="138" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">DOMAIN</text>
                    <text x="250" y="150" fill="#a5b4fc" textAnchor="middle" fontSize="7.5">kolkata-fintech</text>
                  </g>

                  {/* Node 1: DNS NS */}
                  <line x1="250" y1="95" x2="140" y2="45" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="25" width="130" height="40" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="135" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">DNS: ns1.cloudflare</text>
                    <text x="135" y="56" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">Nameserver Node</text>
                  </g>

                  {/* Node 2: Subdomain */}
                  <line x1="250" y1="95" x2="360" y2="45" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="300" y="25" width="130" height="40" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                    <text x="365" y="45" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="9">SUBDOMAIN: api.kolkata</text>
                    <text x="365" y="56" fill="#c7d2fe" textAnchor="middle" fontSize="7.5">REST API Gateway</text>
                  </g>

                  {/* Node 3: Person Email */}
                  <line x1="205" y1="140" x2="95" y2="180" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="160" width="130" height="40" rx="6" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="95" y="180" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="9">PERSON: Mamata Sen</text>
                    <text x="95" y="191" fill="#e9d5ff" textAnchor="middle" fontSize="7.5">Lead Architect Email</text>
                  </g>

                  {/* Node 4: S3 Bucket */}
                  <line x1="295" y1="140" x2="405" y2="180" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="160" width="130" height="40" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <text x="405" y="180" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="9">S3: kolkata-assets</text>
                    <text x="405" y="191" fill="#fde68a" textAnchor="middle" fontSize="7.5">AWS Cloud Bucket</text>
                  </g>

                  {/* Node 5: IP */}
                  <line x1="250" y1="185" x2="250" y2="245" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="245" width="130" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="250" y="265" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">IP: 203.0.113.50</text>
                    <text x="250" y="276" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">Kolkata Data Center</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: Maltego-style entity link graph showing visual correlation of technical and human intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: OSINT Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads triage GitHub secret leaks, investigate dark web credential stuffing, and map supply chain attack surfaces across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                >
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">OSINT Audit Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Threat Dilemma ({currentLocalScenario.osintTool})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> OSINT Triage &amp; Defense Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
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
              Guidelines for ethical investigators and red teamers conducting OSINT operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> OSINT Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Git Commit Histories:</strong> Use Trufflehog to find secrets buried deep in commit logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Check SecurityTrails Historical DNS:</strong> Uncover original direct IP addresses behind Cloudflare.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Multi-Hop VPNs for OPSEC:</strong> Protect your investigator IP from target web logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Scrape Pastebin Keywords:</strong> Set up 24/7 monitors for leaked corporate private keys.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common OSINT Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Investigating from Personal Accounts:</strong> Target receives LinkedIn notifications revealing your identity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Assuming Deleted Git Commits are Gone:</strong> Historical commits remain accessible on GitHub.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Non-Consensual Profiling:</strong> Compiling invasive dossiers on citizens violates DPDP Act 2023.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Single-Source Fallacy:</strong> Relying on one tool rather than cross-validating with Amass and Shodan.</span>
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
                  <span><strong>Deploy Pre-Commit Git Hooks:</strong> Run Gitleaks locally to block developers from committing keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Lock S3 Bucket Permissions:</strong> Enforce AWS Block Public Access on all corporate buckets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Monitor Domain on HIBP:</strong> Automate credential stuffing alerts for all corporate email addresses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Publish RFC 9116 security.txt:</strong> Create transparent reporting channels for external researchers.</span>
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
              Synthesize key OSINT concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for OSINT Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Git secret scanning is a critical OSINT discipline: developers often push code containing live database passwords, and even if they delete the file in a later commit, the secret lives forever in the git historical log.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Maltego transforms raw data into visual intelligence: mapping discrete entities (domains, emails, DNS, IP addresses) allows investigators to spot unexpected architectural relationships instantly.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future threat intelligence pipelines, automate the correlation of Shodan, crt.sh, and HaveIBeenPwned APIs into a single dashboard to maintain continuous 24/7 visibility over your organization's attack surface.
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
                <span>OSINT collects public information legally without bypassing auth.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Maltego maps visual entity relationship graphs via Transforms.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Trufflehog &amp; Gitleaks search Git commit logs for leaked secrets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>OWASP Amass aggregates 55+ APIs for domain attack surface mapping.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Sherlock probes 300+ social media platforms for target usernames.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 enforces citizen privacy with penalties up to ₹250 Cr.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="OSINT Tools and Techniques FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="OSINT (Open-Source Intelligence) Tools and Techniques (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Open-Source Intelligence is one of the most powerful capabilities in modern cybersecurity. But remember: with great visibility comes great ethical responsibility. Always conduct OSINT with strict operational security (OPSEC), respect citizen privacy under the DPDP Act 2023, and use your intelligence capabilities to eliminate digital exposure and defend our nation's critical infrastructure."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
