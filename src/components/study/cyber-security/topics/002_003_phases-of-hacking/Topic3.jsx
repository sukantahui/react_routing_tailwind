import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: Port Scan Mechanics State
  const [selectedScanKey, setSelectedScanKey] = useState("syn_stealth");

  // Studio 2: Protocol Enumeration State
  const [selectedProtocolKey, setSelectedProtocolKey] = useState("smb_rpc");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_smb");

  // Scan Mechanics Data for Studio 1
  const scanMechanics = {
    syn_stealth: {
      key: "syn_stealth",
      name: "TCP SYN Stealth Scan (-sS / Half-Open)",
      icon: "⚡",
      color: "from-blue-600 to-indigo-700",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      handshakeSteps: [
        "1. Client sends TCP [ SYN ] to Target Port 443",
        "2. Target Server replies with TCP [ SYN-ACK ] (Port is OPEN)",
        "3. Client immediately sends TCP [ RST ] to terminate connection instantly"
      ],
      openState: "Receives [ SYN-ACK ] &rarr; Marked as OPEN",
      closedState: "Receives [ RST-ACK ] -&gt; Marked as CLOSED",
      filteredState: "No Response / Timeout -> Marked as FILTERED by Firewall",
      appLogging: "EVADED: Socket connection is never completed, avoiding application access logs.",
      nmapSyntax: "nmap -sS -T4 -p 1-1024 203.0.113.50"
    },
    full_connect: {
      key: "full_connect",
      name: "TCP Full Connect Scan (-sT)",
      icon: "🔌",
      color: "from-cyan-500 to-teal-600",
      badgeClass: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
      handshakeSteps: [
        "1. Client sends TCP [ SYN ]",
        "2. Target Server replies with TCP [ SYN-ACK ]",
        "3. Client operating system sends TCP [ ACK ] to complete full 3-way handshake",
        "4. Client sends [ RST / FIN ] to close connection"
      ],
      openState: "Full 3-Way Handshake Established -> Marked as OPEN",
      closedState: "Receives [ RST-ACK ] -> Marked as CLOSED",
      filteredState: "Timeout -> Marked as FILTERED",
      appLogging: "LOGGED: Application daemons record a complete incoming socket connection.",
      nmapSyntax: "nmap -sT -T4 -p 80,443 203.0.113.50"
    },
    udp_scan: {
      key: "udp_scan",
      name: "UDP Port Scan (-sU)",
      icon: "📦",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      handshakeSteps: [
        "1. Client sends UDP Probe Packet to Target Port 161 (SNMP)",
        "2. If Open: Target service sends UDP application response or remains silent",
        "3. If Closed: Target OS kernel returns ICMP Type 3 Code 3 (Port Unreachable)"
      ],
      openState: "Receives UDP payload or no response -> Marked as OPEN|FILTERED",
      closedState: "Receives ICMP Port Unreachable -> Marked as CLOSED",
      filteredState: "ICMP Unreachable (Type 3 Code 1, 2, 9, 10, 13) -> FILTERED",
      appLogging: "MINIMAL: UDP has no handshake; slow due to OS ICMP rate limiting (1 pkt/sec).",
      nmapSyntax: "nmap -sU -p 53,67,123,161 203.0.113.50"
    },
    ack_scan: {
      key: "ack_scan",
      name: "TCP ACK Firewall Mapping Scan (-sA)",
      icon: "🛡️",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      handshakeSteps: [
        "1. Client sends unsolicited TCP [ ACK ] packet without existing connection",
        "2. Stateful Firewall: Drops packet as invalid (FILTERED)",
        "3. Stateless Filter / No Firewall: Packet reaches OS kernel, which replies with [ RST ] (UNFILTERED)"
      ],
      openState: "Cannot determine Open vs Closed; maps firewall rulesets instead!",
      closedState: "Receives [ RST ] -> Marked as UNFILTERED (No firewall blocking port)",
      filteredState: "No Response / ICMP Error -> Marked as FILTERED (Stateful Firewall present)",
      appLogging: "MAPS FIREWALL: Distinguishes between stateful and stateless firewall rules.",
      nmapSyntax: "nmap -sA -p 80,443,8080 203.0.113.50"
    }
  };

  const activeScan = scanMechanics[selectedScanKey];

  // Protocol Enumeration Data for Studio 2
  const protocolEnumeration = {
    smb_rpc: {
      key: "smb_rpc",
      name: "SMB / RPC Enumeration (TCP 445 / 139)",
      icon: "📁",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      extractedData: "Active Directory domain usernames, RID cycling, password lockout policies, shared folder names, and user group memberships.",
      tools: "enum4linux, rpcclient, smbclient, crackmapexec",
      syntax: "enum4linux -U -S 192.168.1.50\nrpcclient -U '' -N 192.168.1.50 -c 'enumdomusers'",
      hardening: "Disable SMBv1, enforce SMB Signing, restrict null sessions (RestrictNullSessAccess), and block port 445 at the perimeter."
    },
    snmp_mib: {
      key: "snmp_mib",
      name: "SNMP MIB Enumeration (UDP 161)",
      icon: "📡",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      extractedData: "Management Information Base (MIB) trees, network interface IPs, device hardware models, system uptime, and running OS processes.",
      tools: "snmpwalk, snmp-check, onesixtyone",
      syntax: "snmpwalk -v2c -c public 203.0.113.1 1.3.6.1.2.1.25.4.2.1.2",
      hardening: "Disable SNMPv1/v2c default community strings ('public'/'private'); migrate to SNMPv3 with SHA-256 auth and AES-256 encryption."
    },
    ldap_ad: {
      key: "ldap_ad",
      name: "LDAP Active Directory Enumeration (TCP 389 / 636)",
      icon: "👥",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      extractedData: "Corporate organizational hierarchy, manager-employee relationships, employee emails, telephone numbers, and Security Groups.",
      tools: "ldapsearch, adalanche, BloodHound",
      syntax: "ldapsearch -x -H ldap://192.168.1.50 -b 'dc=kolkata,dc=fintech,dc=co,dc=in' '(objectClass=user)' sAMAccountName mail",
      hardening: "Enforce LDAP signing and LDAPS (channel binding over port 636); disable anonymous LDAP binds."
    },
    smtp_vrfy: {
      key: "smtp_vrfy",
      name: "SMTP User Enumeration (TCP 25)",
      icon: "📧",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      extractedData: "Validates whether internal corporate usernames exist using VRFY, EXPN, and RCPT TO mail daemon commands.",
      tools: "smtp-user-enum, nc, telnet",
      syntax: "smtp-user-enum -M VRFY -U /usr/share/wordlists/users.txt -t 203.0.113.50",
      hardening: "Disable VRFY and EXPN commands in Postfix/Sendmail config (`disable_vrfy_command = yes`)."
    },
    nfs_exports: {
      key: "nfs_exports",
      name: "NFS Shared Export Enumeration (TCP 2049)",
      icon: "💾",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      extractedData: "Lists all exported server directories and identifies shares configured with unrestricted (`*`) or `no_root_squash` mount permissions.",
      tools: "showmount, rpcinfo, mount",
      syntax: "showmount -e 203.0.113.50\nsudo mount -t nfs 203.0.113.50:/var/backups /mnt/share",
      hardening: "Restrict exports to specific client IP addresses in `/etc/exports` and enforce `root_squash`."
    }
  };

  const activeProtocol = protocolEnumeration[selectedProtocolKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_smb",
      lead: "Mamata",
      role: "Lead Security Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "SMB Active Directory Enumeration Audit",
      budget: "₹9,50,000",
      scanFocus: "SMB Null Session Audit (TCP 445)",
      dilemma:
        "Auditing internal banking VLANs to verify whether unauthenticated SMB null sessions were allowed to dump domain user accounts.",
      resolution:
        "Mamata executed `enum4linux` and `rpcclient`, uncovering an unrestricted SMB share leaking internal batch scripts, and hardened Windows Group Policy by enforcing SMB Signing and disabling Guest Null sessions.",
      metrics: {
        domainAccountsMapped: "240 Active Directory Users",
        unrestrictedSharesFound: "1 Exposed Backup Share",
        remediation: "Enforced SMB Signing & Disabled Null Sessions",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_iomt",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Gentle IoMT Port Scanning Defense",
      budget: "₹5,20,000",
      scanFocus: "Polite Rate-Limited Scanning (-T2)",
      dilemma:
        "Scanning 45 networked ICU patient monitors without triggering buffer overruns or device reboots during active clinical surgery.",
      resolution:
        "Mahima enforced `-T2` polite scanning with single-port verification (`nmap -sS -T2 -p 80,443,8080`), safely identifying unencrypted web interfaces and segmenting the clinical VLAN.",
      metrics: {
        medicalDevicesAudited: "45 ICU Patient Monitors",
        deviceUptime: "100.00% Zero Clinical Interruption",
        vlanIsolation: "Micro-segmented Clinical Subnet",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_snmp",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SNMP SCADA RTU Enumeration Defense",
      budget: "₹8,80,000",
      scanFocus: "SNMP MIB Enumeration (UDP 161)",
      dilemma:
        "Verifying whether substation network switches leaked hardware MIB tables via default SNMP strings to unauthorized internal users.",
      resolution:
        "Debangshu executed `snmpwalk -v2c -c public`, discovering 3 switches with default community strings, and upgraded all devices to SNMPv3 with SHA authentication and AES encryption.",
      metrics: {
        substationSwitchesSecured: "12 Industrial Ethernet Switches",
        defaultStringsRemoved: "100% 'public' Strings Eliminated",
        protocolUpgrade: "Migrated to SNMPv3 SHA/AES",
        compliance: "ISA/IEC 62443 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_handshake",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "TCP 3-Way Handshake Packet Lab",
      budget: "₹4,00,000",
      scanFocus: "Transport Layer Wireshark Analysis",
      dilemma:
        "Visualizing low-level TCP packet exchanges (SYN, SYN-ACK, RST) for university cybersecurity students during network defense practicals.",
      resolution:
        "The team built a Wireshark + Nmap lab comparing full-connect vs SYN stealth scan packet captures, training 140+ students on TCP flags (SYN, ACK, RST, FIN, PSH, URG).",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        scansDemonstrated: "SYN, Connect, Xmas, ACK, UDP",
        packetCapturesAnalyzed: "50+ PCAP Packet Files",
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
            Cyber Security Module 002_003 • Topic 3 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Phase 2: Scanning and Network Enumeration
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct Phase 2 of ethical hacking: master the transport layer mechanics of TCP SYN Stealth (`-sS`), 
            Full Connect (`-sT`), UDP (`-sU`), and ACK (`-sA`) scans, alongside deep protocol enumeration across SMB, SNMP, LDAP, and NFS.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Port Scanning Packet Handshake & Mechanics Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 1: Transport Layer Port Scanning Mechanics
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a port scan type to inspect its low-level TCP/UDP packet handshake sequence, port response states, application logging impact, and Nmap syntax.
            </p>
          </div>

          {/* Scan Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(scanMechanics).map((scan) => {
              const isSelected = selectedScanKey === scan.key;
              return (
                <button
                  key={scan.key}
                  onClick={() => setSelectedScanKey(scan.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{scan.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{scan.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{scan.name.split("(")[1]?.replace(")", "") || "Scan"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Scan Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeScan.badgeClass)}>
                  {activeScan.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Packet Handshake Sequence &amp; Logic
                </h3>
              </div>
            </div>

            {/* Handshake Sequence Steps */}
            <div className="space-y-2 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Packet Exchange Step-by-Step:</span>
              <div className="space-y-1.5 font-mono text-[11.5px]">
                {activeScan.handshakeSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-900 rounded-lg border border-gray-800 text-gray-200 flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">▶</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Port States Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Open Port State</span>
                <p className="text-gray-300 text-[11px]">{activeScan.openState}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Closed Port State</span>
                <p className="text-gray-300 text-[11px]">{activeScan.closedState}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Filtered Port State</span>
                <p className="text-gray-300 text-[11px]">{activeScan.filteredState}</p>
              </div>
            </div>

            {/* Logging & Nmap Syntax */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Application Logging Impact</span>
                <p className="text-gray-300">{activeScan.appLogging}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block">Nmap Command Syntax</span>
                <pre className="font-mono text-[11px] text-emerald-300 overflow-x-auto">{activeScan.nmapSyntax}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Deep Protocol Enumeration Toolkit & Protocol Selector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🗄️</span> Studio 2: Protocol-Specific Deep Enumeration Toolkit
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise protocol to inspect what detailed intelligence can be extracted, primary enumeration tooling, CLI syntax, and hardening controls.
            </p>
          </div>

          {/* Protocol Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(protocolEnumeration).map((proto) => {
              const isSelected = selectedProtocolKey === proto.key;
              return (
                <button
                  key={proto.key}
                  onClick={() => setSelectedProtocolKey(proto.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{proto.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{proto.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{proto.name.split("(")[1]?.replace(")", "") || "Service"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Protocol Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeProtocol.badgeClass)}>
                  {activeProtocol.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Information Leakage &amp; Enumeration Arsenal
                </h3>
              </div>
            </div>

            {/* Extracted Data */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Intelligence Extracted from Daemon:</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{activeProtocol.extractedData}</p>
            </div>

            {/* Syntax & Hardening */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Primary Enumeration Commands:</span>
                <pre className="font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">{activeProtocol.syntax}</pre>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Blue Team Hardening Configuration:</span>
                <p className="text-gray-300 leading-relaxed">{activeProtocol.hardening}</p>
              </div>
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
              Visualizing TCP 3-Way Handshake vs SYN Stealth Scan Packet Exchanges and the Scanning &amp; Enumeration Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Full Connect vs SYN Stealth Scan */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Full Connect vs SYN Stealth Scan Packets
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Side: Full Connect (-sT) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="210" height="280" rx="8" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="125" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="11">FULL CONNECT (-sT)</text>
                    <text x="125" y="60" fill="#94a3b8" textAnchor="middle" fontSize="8">Full 3-Way Handshake</text>

                    {/* Step 1 */}
                    <path d="M 50 90 L 190 90" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan11)" />
                    <text x="120" y="85" fill="#a5f3fc" textAnchor="middle" fontSize="8">1. [ SYN ]</text>

                    {/* Step 2 */}
                    <path d="M 190 130 L 50 130" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen11)" />
                    <text x="120" y="125" fill="#a7f3d0" textAnchor="middle" fontSize="8">2. [ SYN-ACK ]</text>

                    {/* Step 3 */}
                    <path d="M 50 170 L 190 170" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan11)" />
                    <text x="120" y="165" fill="#a5f3fc" textAnchor="middle" fontSize="8">3. [ ACK ] (Connected!)</text>

                    {/* Step 4 */}
                    <path d="M 50 210 L 190 210" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed11)" />
                    <text x="120" y="205" fill="#fca5a5" textAnchor="middle" fontSize="8">4. [ RST / FIN ] (Close)</text>

                    <rect x="35" y="240" width="180" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="125" y="263" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">APPLICATION LOGS CONNECTION!</text>
                  </g>

                  {/* Right Side: SYN Stealth (-sS) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="20" width="210" height="280" rx="8" fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="375" y="45" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="11">SYN STEALTH (-sS)</text>
                    <text x="375" y="60" fill="#94a3b8" textAnchor="middle" fontSize="8">Half-Open Teardown</text>

                    {/* Step 1 */}
                    <path d="M 300 90 L 440 90" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrowIndigo11)" />
                    <text x="370" y="85" fill="#c7d2fe" textAnchor="middle" fontSize="8">1. [ SYN ]</text>

                    {/* Step 2 */}
                    <path d="M 440 130 L 300 130" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen11)" />
                    <text x="370" y="125" fill="#a7f3d0" textAnchor="middle" fontSize="8">2. [ SYN-ACK ] (Port Open!)</text>

                    {/* Step 3 */}
                    <path d="M 300 170 L 440 170" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed11)" />
                    <text x="370" y="165" fill="#fca5a5" textAnchor="middle" fontSize="8">3. [ RST ] (Torn Down!)</text>

                    <rect x="285" y="240" width="180" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="375" y="263" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">NO APP LOG CREATED (STEALTH)</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan11" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen11" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                    <marker id="arrowRed11" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowIndigo11" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: Full Connect scan completes the handshake, while SYN Stealth tears it down with RST.
              </p>
            </div>

            {/* Diagram 2: Scanning & Enumeration Progression Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>📊</span> Diagram B: The Phase 2 Progression Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Host Discovery */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="55" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="44" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9.5">1. HOST DISCOVERY</text>
                    <text x="85" y="58" fill="#94a3b8" textAnchor="middle" fontSize="8">Ping / ARP Sweeps</text>
                  </g>

                  <path d="M 150 47 L 180 47" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan11)" />

                  {/* Step 2: Port Scanning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="55" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="44" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">2. PORT SCANNING</text>
                    <text x="250" y="58" fill="#a5f3fc" textAnchor="middle" fontSize="8">TCP SYN / UDP Scans</text>
                  </g>

                  <path d="M 315 47 L 345 47" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan11)" />

                  {/* Step 3: Enumeration */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="55" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="44" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="9.5">3. ENUMERATION</text>
                    <text x="415" y="58" fill="#fde68a" textAnchor="middle" fontSize="8">SMB / SNMP / LDAP</text>
                  </g>

                  {/* Arrow down to Phase 3 */}
                  <path d="M 415 75 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Summary Card */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="460" height="175" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="135" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="11.5">ENUMERATION DELIVERABLES FOR EXPLOITATION</text>
                    <text x="35" y="160" fill="#cbd5e1" font-family="monospace" fontSize="9">• Valid Active Directory Usernames: mamata, debangshu, admin</text>
                    <text x="35" y="178" fill="#cbd5e1" font-family="monospace" fontSize="9">• Exposed Daemon Versions: ProFTPD 1.3.5, Apache 2.4.49, SMBv1</text>
                    <text x="35" y="196" fill="#cbd5e1" font-family="monospace" fontSize="9">• Network Topology: 4 Subnets, 2 VLANs, Unrestricted NFS Export</text>
                    <text x="250" y="235" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9.5">Ready for Phase 3 (Gaining Access / Metasploit Exploitation!)</text>
                    <text x="250" y="255" fill="#94a3b8" textAnchor="middle" fontSize="8">IT Act 2000 Section 66: Active scanning without authorization carries up to 3 years prison.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: Progression from raw host ping sweeps to detailed service enumeration ready for exploitation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Scanning &amp; Enumeration Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads execute SMB Active Directory enumeration, polite IoMT hospital scanning, SNMP SCADA auditing, and transport-layer packet labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audit Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Technical Dilemma ({currentLocalScenario.scanFocus})
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
              Guidelines for ethical penetration testers executing transport-layer scanning and protocol enumeration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Scanning Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use SYN Stealth (-sS) by Default:</strong> It is fast, reliable, and avoids application connection logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Scan All 65,535 Ports:</strong> Attackers often hide backdoor shells on high non-standard ports (`-p-`).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce -T2 on SCADA/IoMT:</strong> Slow polite scans prevent buffer overruns on medical monitors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Target Top UDP Ports:</strong> Scan UDP ports selectively (`-p 53,67,123,161`) to avoid ICMP delays.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Scanning Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unsigned RoE Probing:</strong> Scanning without prior written authorization violates IT Act Section 66.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Filtered with Closed:</strong> Filtered means a firewall is actively dropping packets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Skipping UDP Enumeration:</strong> Missing open SNMP port 161 leaves routers exposed to MIB dumps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Flooding Live Networks:</strong> Firing `-T5` scans on low-bandwidth WAN circuits causes packet loss.</span>
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
                  <span><strong>Deploy Port Scan Drop Rules:</strong> Configure firewalls to auto-ban IPs scanning 50+ ports/sec.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Disable SMB Guest Sessions:</strong> Enforce SMB Signing and block null sessions in Group Policy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Upgrade to SNMPv3:</strong> Eliminate default 'public' community strings with SHA/AES encryption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Restrict NFS Exports:</strong> Specify exact IP addresses in `/etc/exports` with `root_squash`.</span>
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
              Synthesize key scanning and enumeration concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Network Penetration Testers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why SYN Stealth scans are faster and stealthier than Full Connect scans: because the client sends an immediate RST packet upon receiving SYN-ACK, the 3-way handshake is never completed, preventing application socket logging.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How enumeration builds on scanning: scanning merely discovers open port 445 (SMB), but enumeration connects to that port to dump every Active Directory username and shared folder.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  Whenever you scan clinical healthcare or industrial SCADA networks in the field, always enforce `-T2` polite timing templates to prevent buffer exhaustion on embedded microcontrollers.
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
                <span>Scanning finds open ports; Enumeration extracts usernames and shares.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TCP SYN Stealth (`-sS`) resets connection with RST before handshake completes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Filtered ports drop packets silently; Closed ports return RST-ACK.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SNMP enumeration queries MIB trees over UDP port 161.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SMB enumeration extracts Active Directory user lists over TCP port 445.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 66 criminalizes unauthorized network scanning and probing.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Phase 2: Scanning and Network Enumeration FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Phase 2: Scanning and Network Enumeration (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As you advance in Phase 2, remember that thorough enumeration is the bridge to flawless exploitation. Do not rush to fire automated exploits—take the time to inspect open SMB shares, query SNMP MIB trees, and analyze packet handshakes in Wireshark. When you understand the underlying protocol mechanics, you will design unbreakable network architectures."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
