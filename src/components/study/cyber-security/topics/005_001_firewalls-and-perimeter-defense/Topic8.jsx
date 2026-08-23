import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic8_files/bastion_audit.py?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgDmzPinholeId = useId();
  const svgPvlanId = useId();

  // Studio 1: Active Hardening Check Selection
  const [selectedCheckKey, setSelectedCheckKey] = useState("ssh_mfa_auth");

  // Studio 2: Live DMZ Pinhole & PVLAN Simulator State
  const [selectedDmzScenario, setSelectedDmzScenario] = useState("compromised_web_lateral");
  const [pvlanIsolationActive, setPvlanIsolationActive] = useState(true);
  const [dbPinholeMtlsActive, setDbPinholeMtlsActive] = useState(true);

  // Studio 3: Sizing & Sizing Calculations
  const [dmzServerCount, setDmzServerCount] = useState(15); // 5 to 50 servers
  const [pamUserSeats, setPamUserSeats] = useState(25); // 5 to 100 admin seats
  const [redundantDmzSwitches, setRedundantDmzSwitches] = useState(true); // Dual PVLAN Switches

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_egov_dmz");

  // Bastion Hardening Database for Studio 1
  const hardeningChecks = {
    ssh_mfa_auth: {
      key: "ssh_mfa_auth",
      title: "1. SSH Hardening & Cryptographic MFA",
      category: "Authentication Security",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      directive: "`PasswordAuthentication no` & `PermitRootLogin no` in `/etc/ssh/sshd_config`.",
      mechanism: "Mandates Ed25519 cryptographic keys or FIDO2 hardware tokens (YubiKey) for all logins; disables root login entirely.",
      threatMitigated: "Eliminates automated credential stuffing, dictionary attacks, and root brute-force attempts from the Internet."
    },
    compiler_removal: {
      key: "compiler_removal",
      title: "2. Build Compiler & Tool Stripping",
      category: "Filesystem & Tooling Lockdown",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      directive: "`apt-get remove gcc g++ make clang gdb`",
      mechanism: "Removes all developer compilers and debuggers from the operating system image.",
      threatMitigated: "Prevents an attacker who achieves an unprivileged shell from compiling local C privilege escalation exploits (Dirty COW, PwnKit)."
    },
    tmp_noexec_mount: {
      key: "tmp_noexec_mount",
      title: "3. Non-Executable Partition Mounts",
      category: "Kernel Filesystem Hardening",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      directive: "Mount `/tmp`, `/var/tmp`, and `/dev/shm` with `noexec,nosuid,nodev` in `/etc/fstab`.",
      mechanism: "Kernel blocks execution of any binary file located in world-writable temporary directories.",
      threatMitigated: "Neutralizes downloaded malware droppers and temporary exploit scripts executed by malicious web containers."
    },
    immutable_logging: {
      key: "immutable_logging",
      title: "4. Immutable Remote SIEM Streaming",
      category: "Audit & Forensic Compliance",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      directive: "`rsyslog-tls` forwarding to write-only SIEM / WORM storage.",
      mechanism: "Streams all `auditd` and authentication events over TLS in real-time to a central collector.",
      threatMitigated: "Prevents attackers from wiping local `/var/log` files to conceal intrusion trails; ensures CERT-In compliance."
    }
  };

  // Studio 2: Live DMZ Scenario Database
  const dmzScenarios = {
    compromised_web_lateral: {
      id: "compromised_web_lateral",
      label: "Compromised DMZ Web Server ➔ Lateral Scan to DMZ Mail Server",
      src: "172.16.1.10 (Compromised Web)",
      dst: "172.16.1.20:25 (DMZ Mail MTA)",
      protocol: "TCP (SYN Scan)",
      verdict: pvlanIsolationActive ? "🛡️ DROPPED AT LAYER 2 (PVLAN Isolated)" : "⚠️ COMPROMISED (Flat Subnet Pivoting!)",
      badgeColor: pvlanIsolationActive ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700",
      explanation: pvlanIsolationActive
        ? "Private VLAN (PVLAN) isolated ports blocked switch-level frame forwarding; web container cannot talk directly to adjacent mail server!"
        : "Flat DMZ subnet allowed attacker to discover and exploit unpatched mail server on the same Ethernet switch!"
    },
    unsolicited_lan_smb_scan: {
      id: "unsolicited_lan_smb_scan",
      label: "Compromised DMZ Web Server ➔ Internal LAN SMB Scan (Port 445)",
      src: "172.16.1.10 (Compromised Web)",
      dst: "10.10.1.50:445 (Internal HR PC)",
      protocol: "TCP (SYN)",
      verdict: "🛡️ DROPPED (Internal Screening Firewall Rule #50)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      explanation: "Internal screening firewall enforces strict Default-Deny on DMZ-to-LAN flows, preventing ransomware propagation."
    },
    legitimate_db_pinhole: {
      id: "legitimate_db_pinhole",
      label: "Legitimate Web Application ➔ Internal Database Pinhole",
      src: "172.16.1.10:48100",
      dst: "10.10.4.50:5432 (PostgreSQL DB)",
      protocol: "TCP (mTLS)",
      verdict: dbPinholeMtlsActive ? "✔ PERMITTED (mTLS Verified Rule #40)" : "⚠️ INSECURE PINHOLE (Cleartext Risk)",
      badgeColor: dbPinholeMtlsActive ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-amber-950 text-amber-300 border-amber-700",
      explanation: dbPinholeMtlsActive
        ? "Explicit database pinhole allows query over mutual TLS client certificate on port 5432 exclusively."
        : "Pinhole open without mTLS certificate verification, leaving database vulnerable to intercepted credentials."
    }
  };

  // Studio 3: Sizing Calculations
  const calculatedDmzSizing = useMemo(() => {
    // Switch port allocation (Servers + Bastions + Gateway Trunks)
    const requiredSwitchPorts = dmzServerCount + 4 + (redundantDmzSwitches ? 8 : 4);

    // Hardware Switch & PAM Appliance TCO (INR ₹ Lakhs)
    const switchCostLakhs = redundantDmzSwitches ? 4.5 : 2.0;
    const pamLicenseLakhs = (pamUserSeats * 0.12).toFixed(2); // ~₹12,000 per admin seat/year
    const annualMaintenanceLakhs = 1.8;
    const fiveYearTcoLakhs = (switchCostLakhs + Number(pamLicenseLakhs) * 5 + annualMaintenanceLakhs * 5).toFixed(2);

    return {
      requiredSwitchPorts,
      switchCostLakhs: switchCostLakhs.toFixed(2),
      pamLicenseLakhs,
      fiveYearTcoLakhs
    };
  }, [dmzServerCount, pamUserSeats, redundantDmzSwitches]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_egov_dmz: {
      id: "barrackpore_egov_dmz",
      title: "Barrackpore Municipal E-Governance Citizen Portal DMZ",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      hardeningState: "CIS Benchmark Hardened Bastion with PVLAN Layer 2 Isolation",
      threatScenario: "Adversary exploited an unpatched web form to gain a web shell, attempting to compile Dirty COW privilege escalation and scan adjacent servers.",
      solution: "Sukanta Hui and Mamata stripped all compilers (`gcc`) from the image and mounted `/tmp` with `noexec`. When the attacker tried running a compiled binary, the kernel threw 'Permission Denied'. Mahima's PVLAN rules blocked all lateral scans to the adjacent municipal mail server.",
      outcome: "Attack completely defanged at the container level; zero database exposure; full 180-day forensic log generated for CERT-In."
    },
    saltlake_fintech_pam: {
      id: "saltlake_fintech_pam",
      title: "Salt Lake Sector V Commercial Banking PAM Bastion Gateway",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      hardeningState: "Privileged Access Management (PAM) Jump Box with FIDO2 MFA & Session Recording",
      threatScenario: "Compromised third-party contractor laptop attempted to initiate direct unauthorized RDP/SSH sessions to internal core transaction databases.",
      solution: "Abhronila and Debangshu enforced mandatory PAW (Privileged Access Workstation) jump boxes. All direct access was blocked; connections required FIDO2 hardware tokens and were recorded with full keystroke auditing.",
      outcome: "Unauthorized connection attempt blocked instantly; full forensic video evidence provided to compliance auditors."
    }
  };

  const currentCheck = hardeningChecks[selectedCheckKey];
  const currentScenario = dmzScenarios[selectedDmzScenario];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_001 • Topic 8</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Demilitarized Zone (DMZ) Design &amp; Bastion Hosts
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the architecture of buffer zone containment. Understand <strong className="text-sky-400">Bastion Host OS Hardening</strong>, <strong className="text-emerald-400">Private VLAN (PVLAN) Layer 2 Isolation</strong>, database pinhole access controls, and Privileged Access Management (PAM).
          </p>
        </header>

        {/* SECTION 1: DMZ PINHOLE & BUFFER PIPELINE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> DMZ Buffer Subnet Architecture &amp; Pinhole Control Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              How the DMZ isolates public services and strictly enforces one-way database pinholes to protect the internal data vault.
            </p>
          </div>

          {/* SVG 1: DMZ ARCHITECTURE & PINHOLE FLOW */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                DMZ Buffer Subnet &amp; Database Pinhole Control Pipeline
              </span>
              <span className="text-[11px] text-gray-400 font-mono">One-Way Policy Enforced</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgDmzPinholeId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="DMZ Architecture and Pinhole Diagram"
              >
                {/* PUBLIC INTERNET */}
                <rect x="20" y="50" width="140" height="180" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <text x="90" y="75" fill="#a1a1aa" fontSize="11" fontWeight="bold" textAnchor="middle">PUBLIC INTERNET</text>
                <text x="90" y="95" fill="#ef4444" fontSize="8" textAnchor="middle">Untrusted Users</text>
                <circle cx="90" cy="140" r="24" fill="#27272a" stroke="#ef4444" />
                <text x="90" y="144" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">WAN</text>

                {/* ARROW 1 */}
                <path d="M 160 140 L 210 140" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="185" y="130" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">HTTPS 443</text>

                {/* EXTERNAL FIREWALL */}
                <rect x="210" y="70" width="90" height="140" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
                <text x="255" y="95" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">EXTERNAL FW</text>
                <text x="255" y="125" fill="#ffffff" fontSize="7.5" textAnchor="middle">Permit Port 443</text>
                <text x="255" y="145" fill="#ffffff" fontSize="7.5" textAnchor="middle">Permit Port 53</text>
                <text x="255" y="165" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">Bogon Drop</text>

                {/* ARROW 2 */}
                <path d="M 300 140 L 350 140" stroke="#38bdf8" strokeWidth="2.5" />

                {/* DMZ BUFFER SUBNET */}
                <rect x="350" y="30" width="220" height="220" rx="10" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="460" y="55" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                  DMZ BUFFER SUBNET (172.16.1.0/24)
                </text>

                <rect x="365" y="75" width="190" height="40" rx="5" fill="#312e81" stroke="#f59e0b" />
                <text x="460" y="93" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Web Reverse Proxy (172.16.1.10)
                </text>
                <text x="460" y="106" fill="#fde68a" fontSize="7" textAnchor="middle">
                  PVLAN Isolated Port #1
                </text>

                <rect x="365" y="125" width="190" height="40" rx="5" fill="#312e81" stroke="#f59e0b" />
                <text x="460" y="143" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Public DNS Server (172.16.1.20)
                </text>
                <text x="460" y="156" fill="#fde68a" fontSize="7" textAnchor="middle">
                  PVLAN Isolated Port #2
                </text>

                <rect x="365" y="175" width="190" height="40" rx="5" fill="#312e81" stroke="#38bdf8" />
                <text x="460" y="193" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Hardened Bastion Jump Host (172.16.1.99)
                </text>
                <text x="460" y="206" fill="#bae6fd" fontSize="7" textAnchor="middle">
                  MFA + No Compilers + WORM Logs
                </text>

                {/* ARROW 3: PINHOLE ONLY */}
                <path d="M 570 95 L 620 95" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="595" y="85" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">Pinhole 5432</text>

                {/* INTERNAL SCREENING FIREWALL */}
                <rect x="620" y="70" width="90" height="140" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="665" y="95" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">INTERNAL FW</text>
                <text x="665" y="125" fill="#ffffff" fontSize="7" textAnchor="middle">Allow DB Pinhole</text>
                <text x="665" y="145" fill="#f87171" fontSize="7" textAnchor="middle">DROP SMB 445</text>
                <text x="665" y="165" fill="#f87171" fontSize="7" textAnchor="middle">DROP All Lateral</text>

                {/* ARROW 4 */}
                <path d="M 710 95 L 750 95" stroke="#10b981" strokeWidth="2.5" />

                {/* INTERNAL PROTECTED LAN */}
                <rect x="750" y="50" width="80" height="180" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="790" y="75" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">INTERNAL LAN</text>
                <rect x="758" y="90" width="64" height="40" rx="4" fill="#064e3b" />
                <text x="790" y="108" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Core DB</text>
                <text x="790" y="120" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">10.10.4.50</text>
                <text x="790" y="165" fill="#fde68a" fontSize="7" textAnchor="middle">100% Isolated</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: BASTION HARDENING INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Bastion Host OS Hardening &amp; CIS Benchmark Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the mandatory hardening directives, configuration commands, and threat mitigations for DMZ bastion servers.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentCheck.badgeColor)}>
              {currentCheck.category}
            </span>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(hardeningChecks).map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCheckKey(c.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedCheckKey === c.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Active Hardening Check Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentCheck.title}
                </h3>
                <span className="text-gray-400 font-sans">Hardening Category: {currentCheck.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentCheck.badgeColor)}>
                CIS Benchmark Level 2
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚙️ Technical Mechanism:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentCheck.mechanism}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  🔧 Hardening Directive &amp; Configuration:
                </span>
                <p className="text-gray-200 font-mono text-xs break-all">{currentCheck.directive}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                🛡️ Threat Vector Mitigated:
              </span>
              <p className="text-emerald-200 leading-relaxed">{currentCheck.threatMitigated}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE DMZ PINHOLE & PVLAN SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live DMZ Pinhole &amp; Private VLAN (PVLAN) Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate lateral attack propagation inside the DMZ with and without Private VLAN (PVLAN) Layer 2 switch isolation.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              PVLAN Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Simulated DMZ Flow:</label>
              <select
                value={selectedDmzScenario}
                onChange={(e) => setSelectedDmzScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(dmzScenarios).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Private VLAN (PVLAN) Layer 2 Isolation:</label>
              <button
                onClick={() => setPvlanIsolationActive(!pvlanIsolationActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  pvlanIsolationActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              >
                {pvlanIsolationActive ? "✔ PVLAN Isolated Ports Active" : "❌ Flat DMZ Subnet (No PVLAN)"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Database Pinhole mTLS Encryption:</label>
              <button
                onClick={() => setDbPinholeMtlsActive(!dbPinholeMtlsActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  dbPinholeMtlsActive
                    ? "bg-indigo-950/80 text-indigo-300 border-indigo-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              >
                {dbPinholeMtlsActive ? "✔ Strict mTLS Pinhole Active" : "⚠️ Insecure Pinhole (Cleartext)"}
              </button>
            </div>
          </div>

          {/* Scenario Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Flow Traversal:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentScenario.src} ➔ {currentScenario.dst} ({currentScenario.protocol})
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentScenario.badgeColor
              )}>
                {currentScenario.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Security Engineering Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentScenario.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: BASTION AUDITOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Bastion Host Security Auditor
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python script auditing Bastion host configurations against CIS Linux Benchmark standards.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              bastion_audit.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="bastion_audit.py"
            highlightLines={[25, 38, 52, 65]}
          />
        </section>

        {/* STUDIO 3: SIZING & PAM CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: DMZ Network Sizing, PVLAN Switches &amp; PAM Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate required switch port density, Privileged Access Management (PAM) user licensing, and 5-year Total Cost of Ownership in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              DMZ Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>DMZ Server Count:</span>
                <span className="text-sky-400 font-bold">{dmzServerCount} Servers</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={dmzServerCount}
                onChange={(e) => setDmzServerCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>PAM Admin Seats:</span>
                <span className="text-purple-400 font-bold">{pamUserSeats} Admins</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={pamUserSeats}
                onChange={(e) => setPamUserSeats(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Redundant PVLAN Switches:</span>
                <span className="text-emerald-400 font-bold">{redundantDmzSwitches ? "Dual HA Switches" : "Single Switch"}</span>
              </div>
              <button
                onClick={() => setRedundantDmzSwitches(!redundantDmzSwitches)}
                className={clsx(
                  "w-full p-1.5 rounded text-xs font-semibold border transition-all",
                  redundantDmzSwitches
                    ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {redundantDmzSwitches ? "✔ Dual Redundant Switches Active" : "Single Switch (No Redundancy)"}
              </button>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Required PVLAN Switch Ports</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedDmzSizing.requiredSwitchPorts} Ports</div>
              <span className="text-[10px] text-gray-500 block">Switch Cost: ₹{calculatedDmzSizing.switchCostLakhs} Lakhs</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Annual PAM License Cost</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedDmzSizing.pamLicenseLakhs} Lakhs/Yr</div>
              <span className="text-[10px] text-gray-500 block">Includes Video Session Recording</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Hardened DMZ TCO</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedDmzSizing.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Switches + PAM + Maintenance</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response scenarios authored by Sukanta Hui and the student cyber engineering team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Defense Lab
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalDrills).map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeDrillId === d.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Security Posture: {currentDrill.hardeningState}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                PVLAN Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ DMZ &amp; Bastion Defense Execution:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>DMZ isolates public-facing servers from trusted internal databases and corporate workstations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Production databases and Domain Controllers must NEVER reside inside the DMZ.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Bastion hosts must be hardened: remove compilers, disable unneeded daemons, enforce SSH MFA keys.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Mount `/tmp` and `/var/tmp` with `noexec,nosuid,nodev` to block downloaded exploit binary execution.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Private VLANs (PVLANs) prevent lateral Layer 2 East-West pivoting between compromised DMZ servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Database pinholes must restrict traffic to specific `/32` IPs and single ports using encrypted mTLS.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Demilitarized Zone (DMZ) Design & Bastion Hosts FAQs"
            subtitle="30 In-depth Practice Questions & DMZ Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Demilitarized Zone (DMZ) Design & Bastion Hosts (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 8 of Module 005_001! In this lesson, we mastered Demilitarized Zone (DMZ) design and the rigorous operating system hardening required for Bastion Hosts. Remember the golden axiom: the DMZ is a quarantine buffer zone! Never place internal production databases or Active Directory domain controllers inside the DMZ. Harden your bastion hosts by removing build compilers (`gcc`), mounting `/tmp` with `noexec` to prevent malware binary execution, disabling password logins in favor of FIDO2/Ed25519 cryptographic keys, and streaming immutable audit logs over TLS to a remote SIEM. Furthermore, implement Private VLANs (PVLANs) within the DMZ to prevent lateral Layer 2 pivoting between adjacent DMZ servers. In Topic 9, we will dive deep into Firewall Rule-Base Design: Default-Deny vs Default-Allow Policies!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic8;
