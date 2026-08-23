import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgAdTierId = useId();
  const svgWiperFlowId = useId();

  // Studio 1: Destructive Wiper vs Immutable Backup State
  const [wiperDetonated, setWiperDetonated] = useState(false);
  const [backupArchitecture, setBackupArchitecture] = useState("immutable_worm"); // standard_online_share, immutable_worm, airgapped_tape
  const [credentialGuardEnabled, setCredentialGuardEnabled] = useState(true);

  // Studio 2: Active Directory Administrative Tiering State
  const [activeAdModel, setActiveAdModel] = useState("tier_model"); // flat_domain, tier_model
  const [pamVaultActive, setPamVaultActive] = useState(true);

  // Studio 3: Exfiltration Telemetry & Egress Monitoring State
  const [egressDlpPolicyActive, setEgressDlpPolicyActive] = useState(true);
  const [simulatedExfiltrationVolumeTB, setSimulatedExfiltrationVolumeTB] = useState(45); // 1 to 100 TB
  const [egressBandwidthMbps, setEgressBandwidthMbps] = useState(850); // 50 to 1000 Mbps

  // Studio 4: Regional Media Production Studio Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("media_findings");

  // Studio 1: Handle Simulated Wiper Detonation
  const handleTriggerWiper = () => {
    setWiperDetonated(true);
  };

  const handleResetWiperLab = () => {
    setWiperDetonated(false);
  };

  // Studio 1: Calculated Wiper Recovery Outcome
  const wiperOutcome = useMemo(() => {
    if (!wiperDetonated) {
      return {
        systemStatus: "ONLINE & HEALTHY",
        systemStatusColor: "text-emerald-400 font-bold",
        mbrStatus: "INTACT (NTFS / GPT Healthy)",
        shadowCopies: "ACTIVE (32 Restore Points)",
        recoveryDuration: "0 Hours",
        dataLossStatus: "0% (All data intact)"
      };
    }

    if (backupArchitecture === "standard_online_share") {
      return {
        systemStatus: "BRICKED: UNRECOVERABLE SYSTEM CRASH (Sony 2014 Disaster)",
        systemStatusColor: "text-rose-400 font-extrabold",
        mbrStatus: "WIPED: Overwritten with 0x00 by elrawdsk.sys",
        shadowCopies: "DELETED: Purged via `vssadmin delete shadows`",
        recoveryDuration: "4 to 8 Weeks (Manual Bare-Metal Rebuild)",
        dataLossStatus: "100% of unbacked data permanently destroyed"
      };
    } else if (backupArchitecture === "immutable_worm") {
      return {
        systemStatus: "RESTORED: Automated Bare-Metal Image from Immutable WORM Vault",
        systemStatusColor: "text-emerald-400 font-bold",
        mbrStatus: "RE-IMAGED from Gold Template",
        shadowCopies: "RESTORED from AWS S3 Object Lock (WORM)",
        recoveryDuration: "2.5 Hours",
        dataLossStatus: "< 0.01% (Protected by Cloud Compliance Lock)"
      };
    } else {
      return {
        systemStatus: "RESTORED: Physical Air-Gapped Tape Restore",
        systemStatusColor: "text-blue-400 font-bold",
        mbrStatus: "RE-IMAGED via Offline Boot Media",
        shadowCopies: "RESTORED from Vault Tape Cartridge",
        recoveryDuration: "12 Hours",
        dataLossStatus: "< 1% (Last 24hr tape delta)"
      };
    }
  }, [wiperDetonated, backupArchitecture]);

  // Studio 3: Exfiltration Telemetry Output
  const exfiltrationMetrics = useMemo(() => {
    let detectionTimeHours = 0;
    let dataExfiltratedTB = 0;
    let incidentVerdict = "";
    let verdictColor = "";

    if (egressDlpPolicyActive) {
      detectionTimeHours = 0.25; // 15 mins
      dataExfiltratedTB = 0.4;
      incidentVerdict = "AUTOMATED CONTAINMENT: Network Detection & Response (NDR) sensor flagged abnormal sustained multi-gigabit upload; firewall severed connection after 400 MB!";
      verdictColor = "text-emerald-400 font-bold";
    } else {
      detectionTimeHours = Math.round((simulatedExfiltrationVolumeTB * 1024 * 1024 * 8) / (egressBandwidthMbps * 3600));
      dataExfiltratedTB = simulatedExfiltrationVolumeTB;
      incidentVerdict = `CATASTROPHIC DATA DUMP: ${simulatedExfiltrationVolumeTB} TB of unreleased 4K films and executive mailboxes exfiltrated to darknet over ${detectionTimeHours} hours unhindered!`;
      verdictColor = "text-rose-400 font-bold";
    }

    return {
      detectionTimeHours,
      dataExfiltratedTB,
      incidentVerdict,
      verdictColor
    };
  }, [egressDlpPolicyActive, simulatedExfiltrationVolumeTB, egressBandwidthMbps]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 border border-purple-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 3</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Case Study 3: Sony Pictures Hack (2014) — Nation-State Cyber Warfare & Extortion
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic deconstruction of the devastating Lazarus Group assault: How weaponized WIPALL wiper malware bricked thousands of servers, exposed 100+ TB of unreleased films and executive emails, and triggered unprecedented geopolitical cyber extortion.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">WIPALL / Destover MBR Wiper</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Abuse of EldoS elrawdsk.sys</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Active Directory Tiering & PAM</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Immutable WORM Backup Defense</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL MICROSOFT AD 3-TIER MODEL VS FLAT DOMAIN */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">01.</span> Active Directory Architecture: Flat Domain Collapse vs 3-Tier Security
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Why logging into user workstations with Domain Admin credentials led to total corporate destruction in 2014.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950/60 border border-purple-800 text-purple-300 text-xs font-mono">
              Active Directory Tiering
            </span>
          </div>

          {/* SVG INFOGRAPHIC: AD Tiering Model */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Microsoft Active Directory Administrative Tiering Model vs Sony's Flat Vulnerability
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 220" className="w-full min-w-[700px] h-52">
                <defs>
                  <linearGradient id={`${svgAdTierId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4c1d95" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Tier 0: Control Plane */}
                <rect x="30" y="25" width="250" height="170" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="155" y="50" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">TIER 0: CONTROL PLANE</text>
                <text x="155" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Active Directory Domain Controllers</text>
                <text x="155" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">PKI, ADFS, Enterprise Admins</text>
                <rect x="45" y="115" width="220" height="60" rx="6" fill="#7f1d1d" />
                <text x="155" y="135" textAnchor="middle" fill="#fecaca" fontSize="10" fontWeight="bold">GOLDEN RULE OF TIER 0:</text>
                <text x="155" y="152" textAnchor="middle" fill="#fecaca" fontSize="9">Domain Admin accounts MUST NEVER</text>
                <text x="155" y="167" textAnchor="middle" fill="#fecaca" fontSize="9">log into Tier 1 or Tier 2 machines!</text>

                {/* Isolation Barrier 1 */}
                <line x1="290" y1="110" x2="330" y2="110" stroke="#a855f7" strokeWidth="3" strokeDasharray="4 3" />

                {/* Tier 1: Server Plane */}
                <rect x="330" y="25" width="250" height="170" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="455" y="50" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">TIER 1: SERVER PLANE</text>
                <text x="455" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Enterprise Application Servers</text>
                <text x="455" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">Databases, SAN Storage, File Shares</text>
                <rect x="345" y="115" width="220" height="60" rx="6" fill="#78350f" />
                <text x="455" y="135" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">TIER 1 ADMIN ISOLATION:</text>
                <text x="455" y="152" textAnchor="middle" fill="#fef3c7" fontSize="9">Server admins manage servers only.</text>
                <text x="455" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9">No control plane privileges.</text>

                {/* Isolation Barrier 2 */}
                <line x1="590" y1="110" x2="630" y2="110" stroke="#a855f7" strokeWidth="3" strokeDasharray="4 3" />

                {/* Tier 2: Workstation Plane */}
                <rect x="630" y="25" width="240" height="170" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="750" y="50" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">TIER 2: WORKSTATION</text>
                <text x="750" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Employee Laptops, Desktops</text>
                <text x="750" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">Printers, Mobile Devices</text>
                <rect x="645" y="115" width="210" height="60" rx="6" fill="#1e3a8a" />
                <text x="750" y="135" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">CREDENTIAL GUARD (VBS):</text>
                <text x="750" y="152" textAnchor="middle" fill="#bfdbfe" fontSize="9">LSASS isolated in hypervisor.</text>
                <text x="750" y="167" textAnchor="middle" fill="#bfdbfe" fontSize="9">LAPS rotates local admin passwords.</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE WIPALL DESTRUCTIVE WIPER VS IMMUTABLE WORM BACKUP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">02.</span> Studio 1: Destructive Wiper (WIPALL) vs Immutable WORM Backup Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate WIPALL overwriting Master Boot Records and deleting volume shadow copies. Compare recovery resilience between online network shares versus immutable cloud WORM vaults.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono self-start sm:self-auto">
              Wiper Attack Simulator
            </span>
          </div>

          {/* Backup Strategy Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setBackupArchitecture("standard_online_share")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                backupArchitecture === "standard_online_share"
                  ? "bg-rose-950/60 border-rose-600 text-rose-200 ring-2 ring-rose-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-rose-400 text-sm">1. Standard Online Network Share (Sony 2014)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Backup NAS share mounted with domain admin write rights. Wiper purges all shadow copies and wipes backup disks simultaneously!
              </p>
            </button>

            <button
              onClick={() => setBackupArchitecture("immutable_worm")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                backupArchitecture === "immutable_worm"
                  ? "bg-emerald-950/60 border-emerald-600 text-emerald-200 ring-2 ring-emerald-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-emerald-400 text-sm">2. Immutable Cloud WORM Vault (AWS Object Lock)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Write-Once-Read-Many storage in Compliance Mode. Domain admins and wiper payloads CANNOT overwrite or delete snapshots.
              </p>
            </button>

            <button
              onClick={() => setBackupArchitecture("airgapped_tape")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                backupArchitecture === "airgapped_tape"
                  ? "bg-blue-950/60 border-blue-600 text-blue-200 ring-2 ring-blue-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-blue-400 text-sm">3. Offline Air-Gapped Tape Cartridges</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Physical tape drives ejected and stored in an offsite fireproof safe. Physically immune to software wiper attacks.
              </p>
            </button>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Detonate WIPALL / Destover Payload on Datacenter</div>
              <div className="text-[11px] text-gray-400">
                Active Defense Strategy: <span className="font-mono text-purple-400 uppercase font-semibold">{backupArchitecture.replace(/_/g, " ")}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTriggerWiper}
                disabled={wiperDetonated}
                className={clsx(
                  "px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2",
                  wiperDetonated
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-rose-600 to-purple-600 text-white hover:from-rose-500 hover:to-purple-500 shadow-lg shadow-rose-950/50"
                )}
              >
                {wiperDetonated ? "⚡ WIPER EXECUTED" : "💀 Detonate Wiper (WIPALL)"}
              </button>

              {wiperDetonated && (
                <button
                  onClick={handleResetWiperLab}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs"
                >
                  🔄 Reset Lab
                </button>
              )}
            </div>
          </div>

          {/* Wiper Destruction & Post-Detonation Forensic Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System State */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-gray-300 uppercase tracking-wider">Host Storage & Kernel Health</span>
                <span className={wiperOutcome.systemStatusColor}>{wiperOutcome.systemStatus.split(":")[0]}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Master Boot Record (MBR):</span>
                  <span className="font-mono font-bold text-white">{wiperOutcome.mbrStatus}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Windows Volume Shadow Copies:</span>
                  <span className="font-mono font-bold text-white">{wiperOutcome.shadowCopies}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Raw Disk Driver State:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {wiperDetonated ? "EldoS elrawdsk.sys injected (#EldoS#RawDisk#)" : "Clean Kernel"}
                  </span>
                </div>
              </div>
            </div>

            {/* Disaster Recovery & Business Continuity */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-gray-300 uppercase tracking-wider">Disaster Recovery & Data Survival</span>
                  <span className="font-mono text-emerald-400 font-bold">{wiperOutcome.dataLossStatus}</span>
                </div>

                <div className="space-y-2 mt-3">
                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Mean Time to Restore Operations (MTTR):</span>
                    <span className="font-mono font-bold text-white">{wiperOutcome.recoveryDuration}</span>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Post-Mortem Analysis:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      {backupArchitecture === "standard_online_share"
                        ? "Disaster! Attackers with Domain Admin privileges formatted online backup volumes. Without immutable or offline copies, Sony engineers had to manually re-image 3,000+ endpoints from scratch over 6 weeks."
                        : "Resilience verified! Even though local drives were wiped, the immutable snapshots could not be deleted by the wiper. Bare-metal recovery scripts restored operational servers in hours."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: ACTIVE DIRECTORY 3-TIER MODEL & PRIVILEGE ACCESS MANAGEMENT (PAM) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">03.</span> Studio 2: Active Directory Privilege Management & Credential Guard Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Eliminate unencrypted password files (`passwords.xlsx`) using Privileged Access Management (PAM) vaults and Windows Defender Credential Guard.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Identity Security Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security Controls Toggle */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Enterprise Identity Controls
              </h3>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Active Directory Architecture:</label>
                <select
                  value={activeAdModel}
                  onChange={(e) => setActiveAdModel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="flat_domain">1. Flat Single-Tier Domain (Sony 2014 — Domain Admin on Workstations)</option>
                  <option value="tier_model">2. Microsoft 3-Tier Model (Strict Tier 0 / Tier 1 / Tier 2 Isolation)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Privileged Access Management (PAM) Vault</div>
                  <div className="text-[11px] text-gray-400">Eliminates `passwords.xlsx` with Just-In-Time rotating tokens</div>
                </div>
                <button
                  onClick={() => setPamVaultActive(!pamVaultActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    pamVaultActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {pamVaultActive ? "PAM VAULTED" : "PLAINTEXT FILES"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Windows Defender Credential Guard</div>
                  <div className="text-[11px] text-gray-400">Isolates LSASS secrets in Virtualization-Based Security (VBS)</div>
                </div>
                <button
                  onClick={() => setCredentialGuardEnabled(!credentialGuardEnabled)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    credentialGuardEnabled ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {credentialGuardEnabled ? "VBS ISOLATED" : "LSASS EXPOSED"}
                </button>
              </div>
            </div>

            {/* Attack Emulation Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Adversary Credential Harvesting Simulation
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-gray-400 block">Mimikatz LSASS Dump Attack Status:</span>
                    <span className={clsx("font-mono font-bold", credentialGuardEnabled ? "text-emerald-400" : "text-rose-400")}>
                      {credentialGuardEnabled
                        ? "BLOCKED: Virtualization-Based Security (LSAIso) prevented memory reading!"
                        : "EXPLOITED: Plaintext NTLM hashes and Kerberos tickets dumped from LSASS memory!"}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-gray-400 block">Shared Folder Discovery Status:</span>
                    <span className={clsx("font-mono font-bold", pamVaultActive ? "text-emerald-400" : "text-rose-400")}>
                      {pamVaultActive
                        ? "CLEAN: Zero plaintext password files found. All administrative credentials vaulted."
                        : "CATASTROPHIC: Discovered `passwords.xlsx` on file share containing 500+ root credentials!"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={clsx("p-3 rounded-xl border text-xs text-center font-bold", activeAdModel === "tier_model" && pamVaultActive && credentialGuardEnabled ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-rose-950/40 border-rose-800 text-rose-300")}>
                DOMAIN RESILIENCE: {activeAdModel === "tier_model" && pamVaultActive && credentialGuardEnabled ? "SECURE TIERED FORTRESS" : "VULNERABLE TO TOTAL DOMAIN HIJACK"}
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 3: 100+ TB MASS EXFILTRATION & NETWORK EGRESS MONITORING */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">04.</span> Studio 3: 100+ TB Mass Exfiltration & Egress Anomaly Detection
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Analyze how adversaries exfiltrated over 100 Terabytes of unreleased films and executive mailboxes without triggering legacy perimeter firewalls.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              NDR Egress Monitor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exfiltration Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Exfiltration Parameters & Egress Defense
              </h3>

              {/* Data Loss Prevention Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Network Detection & Response (NDR / DLP)</div>
                  <div className="text-[11px] text-gray-400">Monitors abnormal multi-gigabyte outbound bandwidth surges</div>
                </div>
                <button
                  onClick={() => setEgressDlpPolicyActive(!egressDlpPolicyActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    egressDlpPolicyActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {egressDlpPolicyActive ? "NDR ACTIVE (Auto-Quarantine)" : "DISABLED (Unmonitored Egress)"}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Exfiltration Payload Size:</span>
                  <span className="font-mono text-purple-400 font-bold">{simulatedExfiltrationVolumeTB} Terabytes</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={simulatedExfiltrationVolumeTB}
                  onChange={(e) => setSimulatedExfiltrationVolumeTB(parseInt(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              {/* Bandwidth Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sustained Outbound Pipe Bandwidth:</span>
                  <span className="font-mono text-amber-400 font-bold">{egressBandwidthMbps} Mbps</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={egressBandwidthMbps}
                  onChange={(e) => setEgressBandwidthMbps(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Exfiltration Outcome Analysis */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Network Egress Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Data Leaked to Darknet:</span>
                    <span className="font-mono font-bold text-rose-400">{exfiltrationMetrics.dataExfiltratedTB} TB</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Detection & Containment Time:</span>
                    <span className="font-mono font-bold text-emerald-400">{exfiltrationMetrics.detectionTimeHours} Hours</span>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Forensic Investigation Result:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{exfiltrationMetrics.incidentVerdict}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-purple-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-purple-300">
                  Key Takeaway on Data Exfiltration:
                </span>
                <p>
                  "Exfiltrating 100 Terabytes of data cannot happen instantly. It takes weeks of sustained high-volume bandwidth. Inbound perimeter firewalls are meaningless without robust outbound egress telemetry and anomaly detection."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL MEDIA & ENTERTAINMENT STUDIO TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">05.</span> Studio 4: Regional Media Production Studio Security Tabletop
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative studio audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional Bengali digital film production studio against Wiper malware and content leakage.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional Media Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full font-medium">
                Lead Media Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (Active Directory Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (SAN Storage Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (PAM Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("media_findings")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "media_findings"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Media Vulnerabilities in Kolkata Hub
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("deployed_defense")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "deployed_defense"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Hardened Architecture & Immutable Backups
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "media_findings" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Kolkata & Barrackpore Studios:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Unencrypted Master SAN Storage:</span> Unreleased 4K film master footage was stored on an unencrypted network share accessible to any user in the building.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Plaintext Password Spreadsheets:</span> IT technicians in Jadavpur maintained an Excel sheet named `studio_passwords.xlsx` on a shared drive.
                    </li>
                    <li>
                      <span className="font-semibold text-white">No Egress Filtering:</span> Video editing workstations had unrestricted gigabit internet access, allowing direct external uploads to cloud storage and Tor nodes.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Executed by Susmita, Debangshu & Mahima:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Isolated Video Production VLAN:</span> Segmented the 4K SAN storage into an isolated VLAN 60 with Zero Trust access policies and DRM watermarking.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Privileged Access Management (PAM):</span> Deployed an enterprise password vault with automatic password rotation, permanently eliminating plaintext spreadsheets.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Immutable WORM Cloud Backups:</span> Configured automated nightly replication to an AWS S3 Object Lock bucket in Compliance Mode, rendering all snapshots immune to wiper destruction.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">06.</span> Academic Note & Printable Revision Guide
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Print or export clean ASCII academic notes prepared by Sukanta Hui for BCA semester revision.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ASCII Revision Guide
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <PlainTextPrint
              text={noteText}
              fileName="Topic3_Sony_Pictures_Hack_Case_Study_Notes.txt"
            />
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">07.</span> Comprehensive Exam & Interview Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                30 in-depth conceptual, analytical, and forensic questions with code snippets, hints, and model answers on the Sony hack, WIPALL wiper, and AD tiering.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              30 Topic Questions
            </span>
          </div>

          <FAQTemplate questions={questions} />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic3;
