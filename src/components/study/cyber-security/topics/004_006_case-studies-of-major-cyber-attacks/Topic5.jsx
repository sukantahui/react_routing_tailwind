import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgEternalBlueId = useId();
  const svgDualEngineId = useId();

  // Studio 1: EternalBlue Worm Propagation & Kill-Switch State
  const [killSwitchRegistered, setKillSwitchRegistered] = useState(false);
  const [ms17010Patched, setMs17010Patched] = useState(false);
  const [smb1ProtocolActive, setSmb1ProtocolActive] = useState(true);
  const [totalSubnetEndpoints, setTotalSubnetEndpoints] = useState(1500); // 100 to 5000 endpoints

  // Studio 2: Comparative Malware Analysis State
  const [selectedMalwareFamily, setSelectedMalwareFamily] = useState("wannacry"); // wannacry, notpetya

  // Studio 3: SMB Hardening & Micro-segmentation State
  const [perimeterPort445Blocked, setPerimeterPort445Blocked] = useState(true);
  const [eastWestMicrosegmentation, setEastWestMicrosegmentation] = useState(true);
  const [immutableWormBackups, setImmutableWormBackups] = useState(true);

  // Studio 4: Regional Healthcare & Port Logistics Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("hospital_vulnerabilities");

  // Malware Comparison Database for Studio 2
  const malwareProfiles = {
    wannacry: {
      name: "WannaCry (WanaCrypt0r 2.0)",
      releaseDate: "May 12, 2017",
      actor: "Lazarus Group (North Korea)",
      category: "True Crypto-Ransomware",
      initialIngress: "Automated public IPv4 Port 445 Scanning over Internet",
      propagation: "EternalBlue (MS17-010 / SMBv1) with DoublePulsar Ring-0 implant",
      encryptionScheme: "AES-128-CBC with RSA-2048 Public Key wrapping",
      recoveryPossibility: "FEASIBLE: Valid decryption tool (@WanaDecryptor@.exe) provided upon $300 BTC payment; keys saved in memory",
      killSwitch: "Hardcoded sinkhole domain: `www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com`",
      majorVictim: "United Kingdom National Health Service (NHS) — 80 Hospital Trusts paralyzed",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    },
    notpetya: {
      name: "NotPetya (ExPetr / EternalPetya)",
      releaseDate: "June 27, 2017 (Ukrainian Constitution Eve)",
      actor: "Sandworm Team / GRU Unit 74455 (Russia)",
      category: "Destructive Wiper Masquerading as Ransomware",
      initialIngress: "Supply Chain backdoor in M.E.Doc Ukrainian Tax Software (`ezvit.exe`)",
      propagation: "Dual-Engine: EternalBlue (Port 445) + Mimikatz credential dumping + PsExec / WMI",
      encryptionScheme: "Overwrites NTFS Master File Table (MFT) & Master Boot Record (MBR) with bogus random key",
      recoveryPossibility: "MATHEMATICALLY IMPOSSIBLE: Raw AES decryption key is generated and immediately discarded from memory without saving",
      killSwitch: "NO KILL-SWITCH: Execution cannot be stopped once injected",
      majorVictim: "A.P. Møller-Maersk ($300M loss), Merck ($1B loss), FedEx/TNT ($850M loss)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  // Studio 1 Calculation: Live Worm Propagation & Blast Radius
  const propagationMetrics = useMemo(() => {
    let infectedCount = 0;
    let propagationStatus = "";
    let statusColor = "";

    if (killSwitchRegistered) {
      infectedCount = 1; // Only Patient Zero before kill-switch check
      propagationStatus = "HALTED GLOBALLY: Marcus Hutchins Sinkhole Domain Resolved. WannaCry exited cleanly before spreading!";
      statusColor = "text-emerald-400 font-bold";
    } else if (!smb1ProtocolActive) {
      infectedCount = 0;
      propagationStatus = "IMMUNE: SMBv1 permanently uninstalled across all endpoints. Port 445 packet rejected!";
      statusColor = "text-emerald-400 font-bold";
    } else if (ms17010Patched) {
      infectedCount = 0;
      propagationStatus = "DEFENDED: Microsoft MS17-010 security update active. Srv!SmbTransaction buffer overflow failed!";
      statusColor = "text-blue-400 font-bold";
    } else {
      infectedCount = totalSubnetEndpoints;
      propagationStatus = `CATASTROPHIC OUTBREAK: 100% of unpatched SMBv1 endpoints (${totalSubnetEndpoints} machines) encrypted with .WNCRY in under 90 seconds!`;
      statusColor = "text-rose-400 font-extrabold";
    }

    const containmentPct = (((totalSubnetEndpoints - infectedCount) / totalSubnetEndpoints) * 100).toFixed(1);

    return {
      infectedCount,
      containmentPct,
      propagationStatus,
      statusColor
    };
  }, [killSwitchRegistered, smb1ProtocolActive, ms17010Patched, totalSubnetEndpoints]);

  // Studio 3 Calculation: Security Resilience Index
  const hardeningScore = useMemo(() => {
    let score = 0;
    if (perimeterPort445Blocked) score += 35;
    if (eastWestMicrosegmentation) score += 35;
    if (immutableWormBackups) score += 30;
    return score;
  }, [perimeterPort445Blocked, eastWestMicrosegmentation, immutableWormBackups]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border border-amber-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 5</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              Case Study 5: WannaCry & NotPetya (2017) — EternalBlue Outbreaks
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic investigation into the twin 2017 global cyber catastrophes: How the leaked NSA exploit EternalBlue (MS17-010) weaponized Port 445 SMBv1, crippled the UK NHS, caused $10+ Billion in global commercial damage, and was halted by Marcus Hutchins' sinkhole domain.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">MS17-010 EternalBlue / DoublePulsar</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">WannaCry Kill-Switch Sinkhole</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">NotPetya Supply Chain MFT Wiper</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Maersk & The Port Harcourt Miracle</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL ETERNALBLUE BUFFER OVERFLOW & DUAL-ENGINE PROPAGATION */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">01.</span> Technical Mechanics: EternalBlue (MS17-010) & Dual-Engine Lateral Spread
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Deconstructing the kernel-mode SMBv1 buffer overflow and NotPetya's lateral traversal across patched systems.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-mono">
              CVE-2017-0144 Architecture
            </span>
          </div>

          {/* SVG INFOGRAPHIC: EternalBlue & NotPetya Lateral Engine */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Infiltration & Lateral Traversal Engine: From Unauthenticated Port 445 to Domain Dominance
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgEternalBlueId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Step 1: SMBv1 Port 445 Probe */}
                <rect x="20" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="100" y="50" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">1. SMBv1 PROBE</text>
                <text x="100" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Target: TCP Port 445</text>
                <text x="100" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">CVE-2017-0144</text>
                <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Malformed SMB_COM_</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">TRANSACTION2 packet</text>
                <rect x="35" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="100" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Buffer Overflow Trigger</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="210" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Step 2: DoublePulsar Kernel Implant */}
                <rect x="210" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="290" y="50" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">2. DOUBLEPULSAR</text>
                <text x="290" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Ring-0 Kernel Memory</text>
                <text x="290" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Stealth Backdoor</text>
                <text x="290" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Executes in memory</text>
                <text x="290" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">without writing to disk</text>
                <rect x="225" y="150" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="290" y="167" textAnchor="middle" fill="#fecaca" fontSize="9" fontWeight="bold">Kernel Code Execution</text>

                {/* Arrow 2 */}
                <line x1="370" y1="110" x2="400" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* Step 3: Payload Fork (WannaCry vs NotPetya) */}
                <rect x="400" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="480" y="50" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">3. PAYLOAD INJECT</text>
                <text x="480" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Userland Process Shell</text>
                <text x="480" y="100" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">WannaCry / NotPetya</text>
                <text x="480" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">WannaCry: Checks sinkhole</text>
                <text x="480" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">NotPetya: Mimikatz dump</text>
                <rect x="415" y="150" width="130" height="26" rx="6" fill="#4c1d95" />
                <text x="480" y="167" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontWeight="bold">Dual Payload Vector</text>

                {/* Arrow 3 */}
                <line x1="560" y1="110" x2="590" y2="110" stroke="#8b5cf6" strokeWidth="3" />

                {/* Step 4: Lateral Domination (PsExec/WMI) */}
                <rect x="590" y="25" width="150" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="665" y="50" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">4. LATERAL PIVOT</text>
                <text x="665" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Even on Patched Hosts!</text>
                <text x="665" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">WMI / PsExec Traversal</text>
                <text x="665" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Harvests Domain Admin</text>
                <text x="665" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">credentials via LSASS</text>
                <rect x="600" y="150" width="130" height="26" rx="6" fill="#1e3a8a" />
                <text x="665" y="167" textAnchor="middle" fill="#bfdbfe" fontSize="9" fontWeight="bold">Domain-Wide Infection</text>

                {/* Arrow 4 */}
                <line x1="740" y1="110" x2="765" y2="110" stroke="#3b82f6" strokeWidth="3" />

                {/* Step 5: Encryption / Wiper */}
                <rect x="765" y="25" width="120" height="175" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
                <text x="825" y="50" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">5. DETONATION</text>
                <text x="825" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Local File / MFT Wipe</text>
                <text x="825" y="100" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">.WNCRY / MBR Wipe</text>
                <text x="825" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">WannaCry: Extortion</text>
                <text x="825" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">NotPetya: Total Wiper</text>
                <rect x="772" y="150" width="105" height="26" rx="6" fill="#831843" />
                <text x="825" y="167" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">Global Chaos</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE ETERNALBLUE PROPAGATION & KILL-SWITCH SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">02.</span> Studio 1: EternalBlue SMBv1 Worm Propagation & Sinkhole Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate how unpatched SMBv1 spreads an automated worm across an enterprise network, and test how Marcus Hutchins' sinkhole domain halted global execution.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              Worm Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Network & Vulnerability Configuration
              </h3>

              {/* Kill-Switch Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Sinkhole Kill-Switch Domain Active</div>
                  <div className="text-[11px] text-gray-400">`www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com`</div>
                </div>
                <button
                  onClick={() => setKillSwitchRegistered(!killSwitchRegistered)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    killSwitchRegistered ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {killSwitchRegistered ? "REGISTERED (Sinkholed)" : "UNREGISTERED (Attacks)"}
                </button>
              </div>

              {/* MS17-010 Patch Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Microsoft Security Update (MS17-010)</div>
                  <div className="text-[11px] text-gray-400">Patches buffer overflow in Srv!SmbTransaction</div>
                </div>
                <button
                  onClick={() => setMs17010Patched(!ms17010Patched)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    ms17010Patched ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-400"
                  )}
                >
                  {ms17010Patched ? "PATCHED" : "UNPATCHED (Vulnerable)"}
                </button>
              </div>

              {/* SMBv1 Protocol Deprecation Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Legacy SMBv1 Protocol Status</div>
                  <div className="text-[11px] text-gray-400">Unconditionally uninstall SMB1Protocol across endpoints</div>
                </div>
                <button
                  onClick={() => setSmb1ProtocolActive(!smb1ProtocolActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    !smb1ProtocolActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {!smb1ProtocolActive ? "UNINSTALLED / DISABLED" : "ENABLED (1980s Legacy)"}
                </button>
              </div>

              {/* Endpoint Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Connected Subnet Endpoints:</span>
                  <span className="font-mono text-amber-400 font-bold">{totalSubnetEndpoints} Endpoints</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={5000}
                  step={100}
                  value={totalSubnetEndpoints}
                  onChange={(e) => setTotalSubnetEndpoints(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Worm Propagation Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Outbreak Propagation & Blast Radius Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Encrypted / Compromised Workstations:</span>
                    <span className="font-mono font-extrabold text-rose-400 text-base">
                      {propagationMetrics.infectedCount} <span className="text-xs text-gray-400 font-normal">/ {totalSubnetEndpoints}</span>
                    </span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Containment Security Posture:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{propagationMetrics.containmentPct}% Contained</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Worm Spread Trajectory:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{propagationMetrics.propagationStatus}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-amber-300">
                  Sinkhole Takeaway:
                </span>
                <p>
                  "Marcus Hutchins' sinkhole registration stopped WannaCry's automated propagation for $10.69, saving global infrastructure billions of dollars. However, NotPetya contained zero kill-switches."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: SIDE-BY-SIDE COMPARATIVE DECOMPILER LAB (WANNACRY VS NOTPETYA) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">03.</span> Studio 2: Side-by-Side Decompiler Lab — WannaCry vs NotPetya
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Contrast the technical architecture, encryption schemes, and recovery feasibility between true crypto-ransomware versus a destructive nation-state wiper.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Binary Decompiler
            </span>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedMalwareFamily("wannacry")}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                selectedMalwareFamily === "wannacry"
                  ? "bg-amber-600/20 border-amber-500 text-amber-200 ring-2 ring-amber-500 shadow-md"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-amber-400 text-sm">WannaCry (May 2017)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Lazarus Group • Real Crypto-Ransomware • Kill-Switch Enabled • NHS UK Crisis
              </p>
            </button>

            <button
              onClick={() => setSelectedMalwareFamily("notpetya")}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                selectedMalwareFamily === "notpetya"
                  ? "bg-rose-600/20 border-rose-500 text-rose-200 ring-2 ring-rose-500 shadow-md"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-rose-400 text-sm">NotPetya (June 2017)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Sandworm GRU • Destructive Wiper • M.E.Doc Supply Chain • Maersk & Merck Fallout
              </p>
            </button>
          </div>

          {/* Active Malware Detailed Breakdown */}
          {(() => {
            const mal = malwareProfiles[selectedMalwareFamily];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className={clsx("px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border", mal.badgeColor)}>
                      Classification: {mal.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{mal.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <span className="font-semibold text-gray-300">Attributed Threat Actor:</span> {mal.actor} ({mal.releaseDate})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-amber-400 font-semibold uppercase tracking-wider">
                      Initial Ingress & Propagation Mechanics
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">{mal.initialIngress}</p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-gray-300">
                      <span className="font-semibold text-white">Lateral Traversal:</span> {mal.propagation}
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-rose-400 font-semibold uppercase tracking-wider">
                      Payload & Recovery Feasibility
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">{mal.encryptionScheme}</p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-gray-300">
                      <span className="font-semibold text-white">Can Data Be Recovered?</span> {mal.recoveryPossibility}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-950/30 border border-blue-800/60 rounded-xl p-4 space-y-1 text-xs">
                  <span className="text-blue-300 font-bold uppercase tracking-wider block">
                    Major Landmark Enterprise Impact & Fallout:
                  </span>
                  <p className="text-blue-100 font-sans">{mal.majorVictim}</p>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 3: SMB HARDENING & EAST-WEST MICRO-SEGMENTATION LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">04.</span> Studio 3: SMB Hardening, Host Firewalls & Micro-segmentation Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Configure layered defense controls to stop worm-like lateral spread between internal enterprise workstations.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              SMB Hardening Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Defensive Toggles */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Layered Defensive Controls Configuration
              </h3>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">1. Edge Perimeter TCP Port 445 Drop</div>
                  <div className="text-[11px] text-gray-400">Blocks external WAN internet scans from reaching internal SMB</div>
                </div>
                <button
                  onClick={() => setPerimeterPort445Blocked(!perimeterPort445Blocked)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    perimeterPort445Blocked ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {perimeterPort445Blocked ? "BLOCKED (+35 pts)" : "OPEN (Exposed)"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">2. Host-based East-West Micro-segmentation</div>
                  <div className="text-[11px] text-gray-400">Blocks client-to-client Port 445 traffic inside the same LAN</div>
                </div>
                <button
                  onClick={() => setEastWestMicrosegmentation(!eastWestMicrosegmentation)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    eastWestMicrosegmentation ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {eastWestMicrosegmentation ? "ENFORCED (+35 pts)" : "FLAT VLAN"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">3. Immutable WORM & Air-Gapped Backups</div>
                  <div className="text-[11px] text-gray-400">Write-Once-Read-Many cloud storage (Survives wiper deletion)</div>
                </div>
                <button
                  onClick={() => setImmutableWormBackups(!immutableWormBackups)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    immutableWormBackups ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {immutableWormBackups ? "WORM LOCKED (+30 pts)" : "STANDARD NAS"}
                </button>
              </div>
            </div>

            {/* Live Resilience Analysis */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Worm & Wiper Resilience Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Defense Resilience Index:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{hardeningScore} / 100</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Lateral Spread Assessment:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">
                      {hardeningScore === 100
                        ? "PERFECT: Multi-tier anti-worm posture active. Inbound Port 445 scans are dropped at the edge, host firewalls prevent Patient Zero from infecting neighboring workstations, and immutable WORM backups guarantee bare-metal recovery."
                        : hardeningScore >= 65
                        ? "MODERATE: Perimeter is secure, but a single infected laptop on internal Wi-Fi can spread laterally across internal subnets."
                        : "CRITICAL: Flat unsegmented network vulnerable to catastrophic domain-wide infection in minutes (identical to Maersk/NHS 2017 posture)."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-xs text-blue-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-blue-300">
                  Golden Rule of Anti-Worm Defense:
                </span>
                <p>
                  "End-user client workstations should NEVER communicate with each other over Port 445. Enforcing East-West host firewall rules eliminates 99% of worm lateral traversal."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL HOSPITAL & CONTAINER PORT TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">05.</span> Studio 4: Regional Healthcare & Port Logistics Tabletop Drill
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative infrastructure audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional hospital network in Barrackpore and a logistics container port in Kolkata.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional Infrastructure Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-medium">
                Lead Infrastructure Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (SMB Protocol Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Healthcare Network Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Storage & WORM Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("hospital_vulnerabilities")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "hospital_vulnerabilities"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Hospital Vulnerability Findings (Barrackpore & Kolkata)
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("remediated_resilience")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "remediated_resilience"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed Defense & Immutable WORM Backups
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "hospital_vulnerabilities" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Regional Hospitals & Port Terminals:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Unpatched Medical MRI/CT Scanners:</span> Hospital radiology scanners ran legacy Windows 7 Embedded with SMBv1 enabled and were connected to the main hospital Wi-Fi.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Logistics Port Flat Network:</span> Kolkata container gate check-in PCs were on the same subnet as the core container terminal booking database.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Persistent Backup NAS Shares:</span> The hospital backup server was mounted as network drive `B:\` with full write permissions granted to the domain admin account.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Executed by Susmita, Mahima & Debangshu:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Permanent SMBv1 Uninstallation:</span> Deployed PowerShell scripts across all 1,200 hospital endpoints to remove the `SMB1Protocol` feature.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Medical Device Micro-segmentation:</span> Isolated MRI, CT, and X-ray scanners into an isolated VLAN (VLAN 40) with zero inbound SMB access from general hospital workstations.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Immutable WORM Cloud Backups:</span> Migrated patient medical records to AWS S3 Object Lock in Compliance Mode, rendering snapshots immune to ransomware encryption.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <FAQTemplate
            title="WannaCry & NotPetya (2017) — EternalBlue Outbreaks FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="WannaCry & NotPetya (2017) — EternalBlue Outbreaks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic5;
