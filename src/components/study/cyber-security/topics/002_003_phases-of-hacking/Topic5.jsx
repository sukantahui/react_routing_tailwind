import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Exploitation Archetype State
  const [selectedExploitKey, setSelectedExploitKey] = useState("eternal_blue");

  // Studio 2: Shell Architecture State
  const [selectedShellType, setSelectedShellType] = useState("reverse_tcp");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_sqli");

  // Exploitation Archetypes Data for Studio 1
  const exploitArchetypes = {
    eternal_blue: {
      key: "eternal_blue",
      name: "EternalBlue SMB Exploit (MS17-010)",
      vector: "NETWORK REMOTE SERVICE EXPLOIT",
      targetPort: "TCP Port 445 (Microsoft-DS SMBv1)",
      vulnerabilityClass: "Kernel Buffer Overflow (srv.sys)",
      payloadType: "Staged Meterpreter (x64/meterpreter/reverse_tcp)",
      connectionType: "Reverse TCP Shell (Connects back to Attacker on Port 443)",
      icon: "💥",
      color: "from-rose-600 to-red-700",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      exploitCode:
        "[METASPLOIT MODULE: MS17-010 / ETERNALBLUE]\n" +
        "Target: Windows SMBv1\n" +
        "Action: [EXPLOIT EXECUTION OMITTED]\n" +
        "Educational goal: understand vulnerability identification and remediation.",
      defensiveRemedy: "Disable SMBv1 across all endpoints and apply Microsoft Security Bulletin MS17-010 patch."
    },
    sqli_web: {
      key: "sqli_web",
      name: "SQL Injection Authentication Bypass & Arbitrary File Export",
      vector: "WEB APPLICATION EXPLOITATION",
      targetPort: "TCP Port 80 / 443 (HTTP/HTTPS)",
      vulnerabilityClass:
        "CWE-89: Improper Neutralization of Special Elements in SQL",
      payloadType: "Arbitrary File Write / Server-Side Code Execution Concept",
      connectionType: "HTTP-based persistence concept — execution example intentionally omitted",
      icon: "💉",
      color: "from-amber-600 to-yellow-700",
      badgeClass:
        "bg-amber-950 text-amber-300 border-amber-800",

      exploitCode:
        "UNION SELECT [UNTRUSTED_CONTENT] INTO OUTFILE '[SERVER_PATH]/unauthorized_export.txt' --",

      defensiveRemedy:
        "Enforce parameterized SQL queries (Prepared Statements), input validation, least-privilege database accounts, secure file permissions, and server-side monitoring."
    },
    log4shell_rce: {
      key: "log4shell_rce",
      name: "Log4Shell JNDI Remote Code Execution (CVE-2021-44228)",
      vector: "WEB APPLICATION RUNTIME EXPLOIT",
      targetPort: "TCP Port 80 / 443 / 8080 (Any HTTP Header)",
      vulnerabilityClass: "CWE-502: Insecure Deserialization / JNDI Lookup Flaw",
      payloadType: "Serialized Java Object Class Payload",
      connectionType: "Reverse TCP Shell via malicious LDAP/RMI redirection",
      icon: "☕",
      color: "from-purple-600 to-indigo-700",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      exploitCode:
        "HTTP Header: User-Agent: [JNDI_LOOKUP_PAYLOAD_REDACTED]\n" +
        "// Educational representation only — no external callback is performed.",
      defensiveRemedy: "Upgrade Log4j to 2.17.1+ or set log4j2.formatMsgNoLookups=true system flag."
    },
    html_smuggling: {
      key: "html_smuggling",
      name: "Client-Side HTML Smuggling Phishing Vector",
      vector: "CLIENT-SIDE SOCIAL ENGINEERING EXPLOIT",
      targetPort: "Browser Inbound (HTTPS Web Navigation)",
      vulnerabilityClass: "Client-Side Binary Assembly via HTML5 JavaScript Blob API",
      payloadType: "Base64-encoded Portable Executable (.exe / .iso)",
      connectionType: "Reverse C2 HTTPS Beacon upon victim execution",
      icon: "📦",
      color: "from-cyan-600 to-blue-700",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      exploitCode:
        "// Educational simulation only:\n" +
        "// Binary payload generation/download intentionally omitted.\n" +
        "// Demonstrates the concept without creating an executable.",
      defensiveRemedy: "Deploy Endpoint Detection and Response (EDR) with script-block logging and browser isolation."
    }
  };

  const activeExploit = exploitArchetypes[selectedExploitKey];

  // Shell Architectures Data for Studio 2
  const shellArchitectures = {
    reverse_tcp: {
      key: "reverse_tcp",
      title: "Reverse TCP Shell Architecture",
      direction: "Compromised host initiates an outbound connection",
      targetPortUsed: "Outbound Port 443 (HTTPS) or 80 (HTTP)",
      natFirewallResult: "Conceptual: outbound traffic may be permitted by some network policies; controls should inspect and restrict unauthorized egress.",
      socketCommand:  "Attacker Listener: [LISTENER CONFIGURATION OMITTED]\nVictim: [OUTBOUND SHELL CONNECTION OMITTED FOR SAFETY]",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      flowSteps: [
        "1. Attacker sets up a listening socket on public IP:443",
        "2. Exploit triggers on Victim, executing Reverse Shell payload",
        "3. Victim initiates OUTBOUND TCP 3-way handshake to Attacker:443",
        "4. Network controls evaluate the outbound connection according to configured policy",
        "5. Security monitoring should detect and investigate unauthorized outbound sessions."
      ]
    },
    bind_tcp: {
      key: "bind_tcp",
      title: "Bind TCP Shell Architecture",
      direction: "Attacker connects INWARD to Victim Listening Port",
      targetPortUsed: "Inbound Port 4444 (Non-Standard Daemon)",
      natFirewallResult: "BLOCKED: Perimeter firewalls and NAT routers drop unsolicited inbound packets.",
      socketCommand:  "Victim: [LISTENING SHELL CONFIGURATION OMITTED]\nAttacker: [INBOUND CONNECTION CONFIGURATION OMITTED]",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      flowSteps: [
        "1. Exploit triggers on Victim and opens a listening socket on Port 4444",
        "2. Attacker attempts INBOUND TCP connection to Victim:4444",
        "3. Corporate Perimeter Firewall intercepts unsolicited packet to port 4444",
        "4. Firewall drops packet (Filtered) or NAT router fails to route to internal IP",
        "5. Connection fails: Attacker is locked out by inbound security policy!"
      ]
    }
  };

  const activeShell = shellArchitectures[selectedShellType];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_sqli",
      lead: "Mamata",
      role: "Lead Penetration Tester",
      location: "Kolkata FinTech Operations Center",
      title: "Payment Gateway SQL Injection PoC Triage",
      budget: "₹9,50,000",
      exploitVector: "Web Application SQL Injection (CWE-89)",
      dilemma:
        "Discovered a critical unauthenticated SQL Injection vulnerability in an internal merchant payment switch API.",
      resolution:
        "Mamata executed a non-destructive Proof-of-Concept query (`SELECT @@version`) without reading customer banking records, demonstrated risk to executive directors, and implemented parameterized PreparedStatements.",
      metrics: {
        financialDataExposed: "0 Records (Zero Data Alteration)",
        remediationMethod: "Enforced PreparedStatements",
        pocImpact: "Proved Critical Risk without Data Loss",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_smuggle",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Hospital Spear-Phishing HTML Smuggling Simulation",
      budget: "₹5,20,000",
      exploitVector: "Client-Side HTML Smuggling Phishing",
      dilemma:
        "Hospital administrative staff were targeted by novel client-side HTML smuggling attacks that bypassed perimeter email filters.",
      resolution:
        "Mahima conducted an authorized phishing simulation delivering a harmless JavaScript Blob test payload, deployed browser isolation policies, and trained 120 clinical workers on attachment security.",
      metrics: {
        staffSimulated: "120 Healthcare Administrative Staff",
        phishingClickRate: "Dropped from 32% to 1.5%",
        browserIsolation: "100% Policy Enforcement",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_diode",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Optical Diode Exploitation Severance",
      budget: "₹8,80,000",
      exploitVector: "Remote Network Modbus/DNP3 Exploitation",
      dilemma:
        "Demonstrating how unpatched industrial protocol exploits could bypass legacy software firewalls to trigger physical switchgear failure.",
      resolution:
        "Debangshu deployed hardware-enforced unidirectional optical data diodes between IT and SCADA networks, physically severing all inbound TCP connection paths and eliminating remote Phase 3 exploitation risk.",
      metrics: {
        inboundExploitPaths: "0% Physical Attack Surface",
        hardwareEnforcement: "Unidirectional LED/Photodiode Diode",
        gridReliability: "100.00% Zero Outage",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_metasploit",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Metasploit Payload & Shellcode Laboratory",
      budget: "₹4,00,000",
      exploitVector: "Staged vs Stageless Meterpreter Sandboxing",
      dilemma:
        "Teaching cybersecurity students the internal memory mechanics of Staged vs Stageless Meterpreter payloads during network defense practicals.",
      resolution:
        "The team built a virtualized sandbox lab analyzing Wireshark packet traces of reverse shell handshakes and authored memory inspection tutorials using GDB and x64dbg, training 140+ students.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        payloadsAnalyzed: "Staged, Stageless, Reverse, Bind",
        memoryInspection: "GDB & x64dbg Stack Breakpoints",
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
            Cyber Security Module 002_003 • Topic 5 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Phase 3: Gaining Access (Exploitation Techniques)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct Phase 3 of ethical hacking: master the mechanics of remote service exploits (EternalBlue),
            web application attacks (SQLi, RCE, Log4Shell), client-side HTML smuggling, and compare Reverse TCP vs Bind TCP shell architectures.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Exploit Anatomy & Payload Delivery Interactive Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💥</span> Studio 1: Exploit Anatomy &amp; Payload Delivery Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an exploitation archetype to inspect its vector classification, target port, vulnerability class, payload type, sample exploit syntax, and defensive remedy.
            </p>
          </div>

          {/* Archetype Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(exploitArchetypes).map((exp) => {
              const isSelected = selectedExploitKey === exp.key;
              return (
                <button
                  key={exp.key}
                  onClick={() => setSelectedExploitKey(exp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{exp.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{exp.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{exp.vector.split(" ")[0]} Attack</div>
                </button>
              );
            })}
          </div>

          {/* Active Exploit Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeExploit.badgeClass)}>
                  {activeExploit.vector} • {activeExploit.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Exploitation Mechanics &amp; Payload Delivery
                </h3>
              </div>
            </div>

            {/* Target Port & Flaw Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Target Service Port &amp; Protocol</span>
                <p className="text-gray-200 font-mono text-[11px]">{activeExploit.targetPort}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Vulnerability Flaw Classification</span>
                <p className="text-gray-200 font-semibold">{activeExploit.vulnerabilityClass}</p>
              </div>
            </div>

            {/* Payload Type & Connection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Payload / Shellcode Structure</span>
                <p className="text-gray-300 text-[11px]">{activeExploit.payloadType}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Transport Socket Behavior</span>
                <p className="text-gray-300 text-[11px]">{activeExploit.connectionType}</p>
              </div>
            </div>

            {/* Exploit Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Sample Exploit / Trigger Command:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeExploit.exploitCode}
              </pre>
            </div>

            {/* Defensive Countermeasure */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Defensive Countermeasure &amp; Patch:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeExploit.defensiveRemedy}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Reverse TCP vs Bind TCP Transport Layer Interactive Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔌</span> Studio 2: Reverse TCP vs Bind TCP Shell Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare why Reverse TCP shells bypass corporate firewalls and NAT routers while Bind TCP shells are blocked by inbound perimeter security rules.
            </p>
          </div>

          {/* Shell Architecture Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(shellArchitectures).map((sh) => {
              const isSelected = selectedShellType === sh.key;
              return (
                <button
                  key={sh.key}
                  onClick={() => setSelectedShellType(sh.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{sh.title}</div>
                  <div className="text-[11px] text-gray-400 mt-1 truncate">{sh.direction}</div>
                </button>
              );
            })}
          </div>

          {/* Active Shell Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeShell.badgeClass)}>
                  {activeShell.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Transport Socket Direction &amp; Firewall Traversal
                </h3>
              </div>
            </div>

            {/* Firewall Result Banner */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Firewall &amp; NAT Traversal Behavior:</span>
              <p className="text-gray-200 font-semibold text-xs sm:text-sm leading-relaxed">{activeShell.natFirewallResult}</p>
            </div>

            {/* Flow Steps */}
            <div className="space-y-2 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Packet Handshake Execution Flow:</span>
              <div className="space-y-1.5 font-mono text-[11.5px]">
                {activeShell.flowSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-900 rounded-lg border border-gray-800 text-gray-200 flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">▶</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socket Commands */}
            <div className="space-y-1.5 text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Raw Netcat Command Example:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeShell.socketCommand}
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
              Visualizing the 3 Components of Exploitation and the Transport Layer Packet Path of Reverse TCP Shells.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The 3 Components of Exploitation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3 Components of Exploitation
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Vulnerability Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="130" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. VULNERABILITY</text>
                    <text x="85" y="70" fill="#94a3b8" textAnchor="middle" fontSize="8">The Software Flaw (Bug)</text>
                  </g>

                  <path d="M 150 60 L 180 60" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan13)" />

                  {/* Exploit Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="30" width="130" height="60" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">2. EXPLOIT</text>
                    <text x="250" y="70" fill="#a5f3fc" textAnchor="middle" fontSize="8">Trigger Code &amp; Vector</text>
                  </g>

                  <path d="M 315 60 L 345 60" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan13)" />

                  {/* Payload Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="30" width="130" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="55" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">3. PAYLOAD</text>
                    <text x="415" y="70" fill="#fca5a5" textAnchor="middle" fontSize="8">Shellcode Executed</text>
                  </g>

                  {/* Operational Summary */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="155" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">ETHICAL EXPLOITATION BOUNDARY</text>
                    <text x="35" y="175" fill="#cbd5e1" font-family="monospace" fontSize="9">• Vulnerability: Unchecked buffer length or SQL injection parameter</text>
                    <text x="35" y="193" fill="#cbd5e1" font-family="monospace" fontSize="9">• Exploit: Metasploit module or custom Python delivery script</text>
                    <text x="35" y="211" fill="#34d399" font-family="monospace" fontSize="9">• Ethical Payload: Non-destructive PoC (whoami) proving initial foothold</text>
                    <text x="250" y="245" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9.5">Never deploy destructive ransomware or wipe live databases!</text>
                    <text x="250" y="263" fill="#94a3b8" textAnchor="middle" fontSize="8">IT Act 2000 Section 66: Unauthorized exploitation carries up to 3 years imprisonment.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan13" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The three interdependent components that define a cyber exploitation event.
              </p>
            </div>

            {/* Diagram 2: Reverse TCP vs Bind TCP Packet Paths */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> Diagram B: Reverse TCP Shell Firewall Bypass
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Attacker Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="80" width="110" height="150" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="75" y="145" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">ATTACKER</text>
                    <text x="75" y="160" fill="#a5b4fc" textAnchor="middle" fontSize="8">Listener (Port 443)</text>
                  </g>

                  {/* Top Path: Reverse TCP (Outbound from Victim) */}
                  <path d="M 370 110 L 250 110 L 130 110" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowGreen13)" />
                  <text x="250" y="100" fill="#34d399" textAnchor="middle" fontSize="8.5">REVERSE TCP: Outbound Connect to Port 443 (PERMITTED!)</text>

                  {/* Firewall in Center */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="210" y="60" width="80" height="190" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="145" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="10">PERIMETER</text>
                    <text x="250" y="160" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="10">FIREWALL</text>
                    <text x="250" y="178" fill="#94a3b8" textAnchor="middle" fontSize="7.5">&amp; NAT Gateway</text>
                  </g>

                  {/* Bottom Path: Bind TCP (Inbound from Attacker) */}
                  <path d="M 130 200 L 210 200" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="170" y="192" fill="#ef4444" textAnchor="middle" fontSize="8">BIND TCP</text>
                  <circle cx="210" cy="200" r="5" fill="#ef4444" />
                  <text x="250" y="225" fill="#ef4444" textAnchor="middle" fontSize="8.5">Inbound Port 4444: BLOCKED by Firewall!</text>

                  {/* Victim Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="370" y="80" width="110" height="150" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="425" y="145" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">VICTIM HOST</text>
                    <text x="425" y="160" fill="#fca5a5" textAnchor="middle" fontSize="8">Internal 192.168.1.50</text>
                  </g>

                  <defs>
                    <marker id="arrowGreen13" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: Reverse TCP shells traverse NAT firewalls because internal endpoints initiate the connection outward.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Exploitation Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads triage SQL injection flaws, model HTML smuggling phishing vectors, deploy SCADA optical diodes, and analyze Metasploit payloads across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Exploitation Dilemma ({currentLocalScenario.exploitVector})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Ethical Hacker Action &amp; Remediation
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
              Guidelines for ethical penetration testers executing exploitation and payload delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Exploitation Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Execute Non-Destructive PoCs:</strong> Run <code className="text-indigo-300">whoami</code> or <code className="text-indigo-300">hostname</code> rather than reading client database records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Favor Reverse TCP Shells:</strong> Outbound HTTPS connections bypass NAT and stateful firewall rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Inspect Public Exploit Code:</strong> Review GitHub Python/C scripts in a sandbox VM to avoid infostealers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Document Exact PoC Steps:</strong> Provide clients with detailed curl/python scripts to reproduce fixes.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Exploitation Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Exploiting Without Signed RoE:</strong> Unauthorized exploitation is a criminal offense under IT Act Section 66.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Crashing Fragile Services:</strong> Firing unstable kernel buffer overflows against live production servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Dropping Live Databases:</strong> Corrupting customer records during an authorized pentest.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Bind Shells Across Firewalls:</strong> Inbound connection attempts get silently dropped by firewalls.</span>
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
                  <span><strong>Deploy Web Application Firewalls:</strong> Filter SQLi and RCE signatures before reaching backends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enable ASLR &amp; DEP/NX:</strong> Protect runtime memory from buffer overflow shellcode execution.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Egress Filtering:</strong> Restrict servers from opening outbound connections to unknown IPs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Mandate FIDO2 MFA:</strong> Eliminate credential stuffing and stolen password access risks.</span>
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
              Synthesize key exploitation concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Penetration Testers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Reverse TCP shells are the industry standard for penetration testing: because the target endpoint initiates the connection outward (e.g. over port 443), stateful firewalls treat it as legitimate web traffic and permit the session.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The clean separation between Vulnerability (the flaw), Exploit (the trigger code), and Payload (the shellcode): an ethical hacker uses the exploit to deliver a non-destructive Proof-of-Concept rather than malicious software.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future assessments, whenever you discover a critical remote code execution or SQL injection flaw, capture the minimum non-destructive evidence (like a hostname screenshot) and notify the client immediately.
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
                <span>Vulnerability is the bug; Exploit triggers it; Payload is executed.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Reverse TCP shells connect outward, bypassing NAT and firewalls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Bind TCP shells listen on the victim and are blocked by firewalls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>EternalBlue (MS17-010) exploits Windows SMBv1 kernel buffer flaws.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ASLR randomizes memory addresses; DEP/NX enforces non-executable stack.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 66 punishes unauthorized hacking with 3 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Phase 3: Gaining Access (Exploitation Techniques) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Phase 3: Gaining Access (Exploitation Techniques) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Phase 3 is the proving ground of cybersecurity. When you demonstrate that an exploit lands, you provide the definitive proof that compels organizations to act. But always remember: the true power of an ethical hacker lies in restraint. Execute non-destructive Proof-of-Concepts, protect client confidentiality, and use your offensive mastery to build impregnable defensive architectures."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;