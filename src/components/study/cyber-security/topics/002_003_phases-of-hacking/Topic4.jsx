import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: Banner Grabbing State
  const [selectedServiceKey, setSelectedServiceKey] = useState("apache_http");

  // Studio 2: Vulnerability Scanner State
  const [selectedScannerKey, setSelectedScannerKey] = useState("tenable_nessus");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_cve_audit");

  // Banner Grabbing Data for Studio 1
  const serviceBanners = {
    apache_http: {
      key: "apache_http",
      name: "Apache HTTP Server (Port 80 / 443)",
      icon: "🪶",
      color: "from-rose-600 to-red-700",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      rawBanner: "HTTP/1.1 200 OK\nServer: Apache/2.4.49 (Unix) OpenSSL/1.1.1\nX-Powered-By: PHP/7.4.3",
      extractedVersion: "Apache HTTP Server 2.4.49 • OpenSSL 1.1.1 • PHP 7.4.3",
      knownCves: "CVE-2021-41773 (Path Traversal & Remote Code Execution) • CVSS 9.8 Critical",
      suppressionCode: "# In /etc/apache2/conf-enabled/security.conf\nServerTokens Prod\nServerSignature Off",
      mitigation: "Set ServerTokens Prod to return only 'Server: Apache' and upgrade package to 2.4.51+."
    },
    nginx_web: {
      key: "nginx_web",
      name: "Nginx Web Server (Port 80 / 443)",
      icon: "🌐",
      color: "from-emerald-600 to-teal-700",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      rawBanner: "HTTP/1.1 200 OK\nServer: nginx/1.18.0 (Ubuntu)\nDate: Sat, 23 Aug 2026 12:00:00 GMT",
      extractedVersion: "Nginx 1.18.0 on Ubuntu Linux",
      knownCves: "CVE-2021-23017 (1-byte memory overwrite in resolver) • CVSS 7.5 High",
      suppressionCode: "# In /etc/nginx/nginx.conf inside http block\nhttp {\n    server_tokens off;\n}",
      mitigation: "Set server_tokens off; inside the http configuration block to hide the minor version string."
    },
    proftpd_ftp: {
      key: "proftpd_ftp",
      name: "ProFTPD FTP Server (Port 21)",
      icon: "📁",
      color: "from-amber-600 to-yellow-700",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      rawBanner: "220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [203.0.113.50]",
      extractedVersion: "ProFTPD 1.3.5",
      knownCves: "CVE-2015-3306 (mod_copy Unauthenticated Remote Code Execution) • CVSS 9.8 Critical",
      suppressionCode: "# In /etc/proftpd/proftpd.conf\nServerIdent off\nServerAdmin admin@kolkata-fintech.co.in",
      mitigation: "Disable mod_copy or upgrade to ProFTPD 1.3.6+; set ServerIdent off."
    },
    openssh_server: {
      key: "openssh_server",
      name: "OpenSSH Daemon (Port 22)",
      icon: "🔑",
      color: "from-cyan-600 to-blue-700",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      rawBanner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5",
      extractedVersion: "OpenSSH 8.2p1 (Ubuntu package build 4ubuntu0.5)",
      knownCves: "CVE-2023-38408 (PKCS#11 Provider Remote Code Execution) • CVSS 9.8 Critical",
      suppressionCode: "# In /etc/ssh/sshd_config\nDebianBanner no\nBanner none",
      mitigation: "Set DebianBanner no to suppress Linux distribution version numbers and enforce key-only authentication."
    }
  };

  const activeService = serviceBanners[selectedServiceKey];

  // Vulnerability Scanners Data for Studio 2
  const vulnerabilityScanners = {
    tenable_nessus: {
      key: "tenable_nessus",
      name: "Tenable Nessus Professional",
      icon: "🛡️",
      category: "Enterprise Network & Compliance Scanner",
      pluginBase: "180,000+ NASL Plugins (Daily Feed)",
      cvssSupport: "Native CVSS v2 & v3.1 Scoring Matrix",
      falsePositiveRate: "Low (Very accurate in authenticated credentialed scans)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      syntax: "nessuscli scan --id 12 --target 203.0.113.0/24 --format pdf",
      overview: "The industry-standard commercial vulnerability assessment platform used by global enterprises and audit firms."
    },
    openvas_gvm: {
      key: "openvas_gvm",
      name: "OpenVAS / Greenbone (GVM)",
      icon: "🌱",
      category: "Open-Source Network Vulnerability Scanner",
      pluginBase: "80,000+ Network Vulnerability Tests (NVTs)",
      cvssSupport: "CVSS v3.1 Severity Categorization",
      falsePositiveRate: "Low to Moderate (Highly configurable via policies)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      syntax: "gvm-cli socket --xml '<create_task><name>Audit</name></create_task>'",
      overview: "The premier full-featured, zero-licensing open-source network scanner maintained by Greenbone Networks."
    },
    nikto_scanner: {
      key: "nikto_scanner",
      name: "Nikto Web Misconfiguration Scanner",
      icon: "🔍",
      category: "Command-Line Web Application Scanner",
      pluginBase: "6,700+ Dangerous File & CGI Signatures",
      cvssSupport: "Basic Informational / Warning Alerts",
      falsePositiveRate: "Moderate (Fast signature matching across web roots)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      syntax: "nikto -h https://kolkata-fintech.co.in -ssl -C all",
      overview: "A lightweight CLI scanner that rapidly identifies dangerous files, outdated web servers, and missing HTTP headers."
    },
    owasp_zap: {
      key: "owasp_zap",
      name: "OWASP ZAP (Zed Attack Proxy)",
      icon: "⚡",
      category: "Dynamic Application Security Testing (DAST)",
      pluginBase: "Active & Passive Web Injection Rulesets",
      cvssSupport: "Risk & Confidence Matrix (High, Med, Low)",
      falsePositiveRate: "Low (Verifies flaws via active payload injection)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      syntax: "zap-cli quick-scan --self-contained https://kolkata-fintech.co.in",
      overview: "The flagship free, open-source web application security testing tool maintained by OWASP for DevSecOps pipelines."
    },
    nmap_nse: {
      key: "nmap_nse",
      name: "Nmap Scripting Engine (NSE --script vuln)",
      icon: "📡",
      category: "Transport-Layer Vulnerability Scripting",
      pluginBase: "600+ Modular Lua Scripts",
      cvssSupport: "CVE Identifier & Severity Tagging",
      falsePositiveRate: "Very Low (Direct protocol-level flaw verification)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      syntax: "nmap --script vuln -p 80,443,445 203.0.113.50",
      overview: "Nmap's built-in Lua engine that verifies specific known zero-days (EternalBlue, Heartbleed, Log4j) in seconds."
    }
  };

  const activeScanner = vulnerabilityScanners[selectedScannerKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_cve_audit",
      lead: "Mamata",
      role: "Lead Security Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "Payment Gateway CVE Triage & Remediation",
      budget: "₹9,50,000",
      scannerTool: "Tenable Nessus & Nmap NSE",
      dilemma:
        "Auditing high-throughput banking payment gateways to verify whether unpatched Apache HTTP servers were vulnerable to Path Traversal zero-days.",
      resolution:
        "Mamata ran Nessus and Nmap NSE (`--script vuln`), uncovering an unpatched Apache 2.4.49 server vulnerable to CVE-2021-41773, and deployed immediate Docker container patch upgrades within a 2-hour window.",
      metrics: {
        criticalCvesRemediated: "1 Critical (CVSS 9.8) + 3 Highs",
        downtimeIncurred: "0.00 Seconds (Rolling Container Update)",
        complianceVerified: "RBI Cyber Security Framework",
        auditVerification: "100% Clean Nessus Rescan"
      }
    },
    {
      id: "ichapur_dast",
      lead: "Mahima",
      role: "Hospital Information Security Lead",
      location: "Ichapur General Hospital",
      title: "Patient Portal DAST Vulnerability Scan",
      budget: "₹5,20,000",
      scannerTool: "OWASP ZAP & Nikto DAST",
      dilemma:
        "Scanning hospital public patient appointment portals for SQL injection, XSS, and missing browser security headers without altering patient records.",
      resolution:
        "Mahima executed Nikto and OWASP ZAP DAST scans in safe passive/active modes, identifying missing HSTS and X-Frame-Options headers, and configured Nginx security headers to prevent patient portal Clickjacking.",
      metrics: {
        webEndpointsAudited: "34 Public Portal Routes",
        clickjackingRemediated: "Enforced X-Frame-Options: DENY",
        hstsEnforced: "max-age=31536000 (1 Year Preload)",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_banner",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Service Banner Hardening",
      budget: "₹8,80,000",
      scannerTool: "Custom Python Banner Probe & GVM",
      dilemma:
        "Substation Ethernet switches and Modbus RTUs returned verbose hardware banners to internal probes, leaking exact firmware build numbers.",
      resolution:
        "Debangshu hardened OT gateway configs, suppressing all service banners, and enforced IP whitelisting to prevent automated scanners from fingerprinting underlying RTU firmware versions.",
      metrics: {
        substationGatewaysHardened: "16 Industrial Routers",
        bannerLeakageEliminated: "100% Version Strings Suppressed",
        scadaIsolation: "ISA/IEC 62443 Level 3.5 IDMZ",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_nse_lab",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Custom Nmap NSE Lua Vulnerability Lab",
      budget: "₹4,00,000",
      scannerTool: "Custom Nmap Scripting Engine (NSE)",
      dilemma:
        "Teaching university students how automated vulnerability scanners match service banners with CVE databases using custom Lua scripts.",
      resolution:
        "The team developed a custom Nmap NSE Lua script that extracts service banners, queries the NVD API in real time, and outputs an automated Markdown vulnerability report, training 140+ students.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        customScriptsAuthored: "4 NSE Lua Scanning Modules",
        apiIntegration: "Live NIST NVD CVE Feed",
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
            Cyber Security Module 002_003 • Topic 4 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Port Scanning, Banner Grabbing, and Vulnerability Scanning
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the scanning triad of ethical hacking: master raw TCP/HTTP service banner grabbing, 
            automated vulnerability engines (Nessus, OpenVAS, Nikto, OWASP ZAP, Nmap NSE), and the 5-stage CVSS remediation lifecycle.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Banner Grabbing & Service Fingerprinting Live Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🪶</span> Studio 1: Service Banner Grabbing &amp; Hardening Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a service daemon to inspect its raw greeting banner, extracted version string, associated CVE zero-days, and server banner suppression directives.
            </p>
          </div>

          {/* Service Switcher Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(serviceBanners).map((srv) => {
              const isSelected = selectedServiceKey === srv.key;
              return (
                <button
                  key={srv.key}
                  onClick={() => setSelectedServiceKey(srv.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{srv.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{srv.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{srv.name.split("(")[1]?.replace(")", "") || "Daemon"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Banner Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeService.badgeClass)}>
                  {activeService.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Daemon Response Banner &amp; Version Fingerprint
                </h3>
              </div>
            </div>

            {/* Raw Banner Box */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Raw Network Daemon Response Banner:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeService.rawBanner}
              </pre>
            </div>

            {/* Extracted Version & Known CVEs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Extracted Software &amp; OS Version</span>
                <p className="text-gray-200 font-semibold">{activeService.extractedVersion}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Matched Critical CVE Vulnerability</span>
                <p className="text-rose-300 font-mono text-[11px]">{activeService.knownCves}</p>
              </div>
            </div>

            {/* Banner Suppression Directive */}
            <div className="space-y-1.5 text-xs">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Server Banner Suppression Directive (Hardening):</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-indigo-300 overflow-x-auto">
                {activeService.suppressionCode}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: Automated Vulnerability Scanner Architecture & Workflow Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 2: Vulnerability Scanner Architecture &amp; Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an industry-standard scanner to inspect its category, plugin base, CVSS scoring capabilities, false positive profile, and CLI execution syntax.
            </p>
          </div>

          {/* Scanner Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(vulnerabilityScanners).map((scan) => {
              const isSelected = selectedScannerKey === scan.key;
              return (
                <button
                  key={scan.key}
                  onClick={() => setSelectedScannerKey(scan.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{scan.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{scan.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{scan.category.split(" ")[0]} Engine</div>
                </button>
              );
            })}
          </div>

          {/* Active Scanner Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeScanner.badgeClass)}>
                  {activeScanner.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Scanner Engine Architecture &amp; Methodology
                </h3>
              </div>
            </div>

            {/* Overview */}
            <p className="p-4 bg-gray-900 rounded-xl border border-gray-800 text-xs sm:text-sm text-gray-300 leading-relaxed">
              {activeScanner.overview}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Plugin / Script Base</span>
                <p className="text-gray-300 font-mono text-[11px]">{activeScanner.pluginBase}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">CVSS Scoring Support</span>
                <p className="text-gray-300 text-[11px]">{activeScanner.cvssSupport}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">False Positive Profile</span>
                <p className="text-gray-300 text-[11px]">{activeScanner.falsePositiveRate}</p>
              </div>
            </div>

            {/* Sample CLI Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Execution Command / API Syntax:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                {activeScanner.syntax}
              </pre>
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
              Visualizing the 3-Stage Scanning Triad and the 5-Phase Vulnerability Management &amp; CVSS Remediation Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The 3-Stage Scanning Triad */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3-Stage Scanning Triad
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="130" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. PORT SCAN</text>
                    <text x="85" y="70" fill="#94a3b8" textAnchor="middle" fontSize="8">Finds: Port 80 Open</text>
                  </g>

                  <path d="M 150 60 L 180 60" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan12)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="30" width="130" height="60" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">2. BANNER GRAB</text>
                    <text x="250" y="70" fill="#a5f3fc" textAnchor="middle" fontSize="8">Extracts: Apache 2.4.49</text>
                  </g>

                  <path d="M 315 60 L 345 60" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan12)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="30" width="130" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="55" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">3. VULN SCAN</text>
                    <text x="415" y="70" fill="#fca5a5" textAnchor="middle" fontSize="8">Flags: CVE-2021-41773</text>
                  </g>

                  {/* Summary Deliverable */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="155" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">INTEGRATED SCANNING ASSESSMENT OUTPUT</text>
                    <text x="35" y="175" fill="#cbd5e1" font-family="monospace" fontSize="9">• Target Host: 203.0.113.50 (Kolkata FinTech Production Web)</text>
                    <text x="35" y="193" fill="#cbd5e1" font-family="monospace" fontSize="9">• Discovered Daemon: Apache/2.4.49 (Unix) PHP/7.4.3</text>
                    <text x="35" y="211" fill="#f87171" font-family="monospace" fontSize="9">• Critical Vulnerability: CVE-2021-41773 Path Traversal (CVSS 9.8)</text>
                    <text x="250" y="245" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">Ready for Surgical Metasploit Exploitation in Phase 3!</text>
                    <text x="250" y="263" fill="#94a3b8" textAnchor="middle" fontSize="8">Banner suppression (ServerTokens Prod) prevents automatic CVE identification.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan12" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: The progression from port discovery to version extraction and CVE matching.
              </p>
            </div>

            {/* Diagram 2: Vulnerability Management Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>🔄</span> Diagram B: 5-Stage Vulnerability Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Stage 1: Discover */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="130" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="85" y="47" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">1. DISCOVER (Scan)</text>
                    <text x="85" y="58" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Nessus / OpenVAS</text>
                  </g>

                  <path d="M 150 47 L 180 47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowCyan12)" />

                  {/* Stage 2: Prioritize */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="250" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">2. PRIORITIZE</text>
                    <text x="250" y="58" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">CVSS v3.1 Scoring</text>
                  </g>

                  <path d="M 315 47 L 345 47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan12)" />

                  {/* Stage 3: Assess */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="25" width="130" height="45" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <text x="415" y="47" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="9">3. ASSESS (Triage)</text>
                    <text x="415" y="58" fill="#fde68a" textAnchor="middle" fontSize="7.5">Filter False Positives</text>
                  </g>

                  <path d="M 415 70 L 415 105" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Stage 4: Remediate */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="105" width="130" height="45" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="415" y="127" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="9">4. REMEDIATE</text>
                    <text x="415" y="138" fill="#fca5a5" textAnchor="middle" fontSize="7.5">Patching &amp; WAF Rules</text>
                  </g>

                  <path d="M 350 127 L 320 127" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowCyan12)" />

                  {/* Stage 5: Verify */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="105" width="130" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="250" y="127" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">5. VERIFY (Rescan)</text>
                    <text x="250" y="138" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">Confirm 100% Fixed</text>
                  </g>

                  {/* Regulatory & Enterprise Footer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="180" width="460" height="95" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="205" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="11">CONTINUOUS VULNERABILITY GOVERNANCE</text>
                    <text x="250" y="225" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">"Vulnerability management is not an annual event; it is a 24/7 continuous engineering cycle."</text>
                    <text x="250" y="242" fill="#34d399" textAnchor="middle" fontSize="8">Authenticated credentialed scans reduce false positives by up to 95%.</text>
                    <text x="250" y="258" fill="#f87171" textAnchor="middle" fontSize="8">CERT-In 2022 Mandate: Report critical zero-day vulnerabilities within 6 hours.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: The continuous 5-stage vulnerability management and remediation lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Vulnerability Assessment Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads execute payment gateway CVE triages, hospital DAST scans, SCADA banner suppression, and custom Lua script authoring across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Assessment Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Vulnerability Dilemma ({currentLocalScenario.scannerTool})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Assessment Action &amp; Remediation
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
              Guidelines for vulnerability engineers and ethical auditors executing banner extraction and automated assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Assessment Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Authenticated Scans:</strong> Inspecting local packages via SSH/SMB eliminates 95% of false positives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Rate-Limit Scanner Probes:</strong> Restrict probe speeds to avoid exhausting web connection pools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Suppress Server Banners:</strong> Configure <code className="text-indigo-300">ServerTokens Prod</code> and <code className="text-indigo-300">server_tokens off</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Validate CVSS Base vs Temporal:</strong> Account for whether active exploit PoCs exist in the wild.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Assessment Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on Banner Strings Alone:</strong> Backported OS security patches cause false positives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring False Negatives:</strong> Missing internal unauthenticated flaws due to restrictive scanning scope.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unthrottled Production Scans:</strong> Firing automated DAST scanners against live production databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Delaying Zero-Day Reports:</strong> Violating CERT-In's mandatory 6-hour incident reporting window.</span>
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
                  <span><strong>Deploy HTTP Security Headers:</strong> Enforce CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Continuous Scans:</strong> Integrate Qualys or OpenVAS scans into CI/CD build pipelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Patch Critical CVEs within 72h:</strong> Prioritize CVSS 9.0+ vulnerabilities with known RCE exploits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Isolate Legacy Subsystems:</strong> Place unpatchable medical or SCADA devices behind strict IDMZs.</span>
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
              Synthesize key vulnerability assessment concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Vulnerability Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why authenticated credentialed scans are superior to unauthenticated scans: by logging in via SSH or SMB, the scanner directly queries installed package managers, eliminating banner spoofing and false positives.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the scanning triad connects: Port Scanning finds listening ports; Banner Grabbing extracts version strings; Vulnerability Scanning correlates those versions with CVE databases to identify exploitable bugs.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise hardening projects, always configure <code className="text-indigo-300">ServerTokens Prod</code> on Apache and <code className="text-indigo-300">server_tokens off</code> on Nginx to prevent automated scanners from immediately identifying unpatched versions.
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
                <span>Banner grabbing extracts daemon versions from listening ports.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Nmap `-sV` queries `nmap-service-probes` for signature matching.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Nmap `--script vuln` runs Lua scripts to detect known CVEs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Nessus uses 180,000+ NASL plugins for enterprise assessments.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CVSS v3.1 Critical severities range from 9.0 to 10.0.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In directions require reporting critical cyber incidents within 6 hours.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Port Scanning, Banner Grabbing &amp; Vulnerability Scanning FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Port Scanning, Banner Grabbing &amp; Vulnerability Scanning (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As future cybersecurity leaders, always remember that vulnerability assessment is the cornerstone of proactive defense. Master the tools of the trade—Nessus, OpenVAS, Nikto, and Nmap NSE—but never rely blindly on automated output. Cross-validate findings, understand CVSS score metrics, and build continuous vulnerability remediation pipelines that safeguard our nation's digital ecosystem."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
