import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgBuildId = useId();
  const svgGoldenSamlId = useId();

  // Studio 1: CI/CD Build Pipeline Injection vs SLSA State
  const [buildIntegrityMode, setBuildIntegrityMode] = useState("vulnerable_persistent"); // vulnerable_persistent, slsa_level3_hermetic, reproducible_dual_cluster
  const [codeSigningHsmActive, setCodeSigningHsmActive] = useState(false);
  const [isCompilingBuild, setIsCompilingBuild] = useState(false);
  const [buildLogs, setBuildLogs] = useState([]);

  // Studio 2: SUNBURST DNS DGA Subdomain Tunneling State
  const [targetOrganizationType, setTargetOrganizationType] = useState("high_value_gov"); // high_value_gov, standard_commercial
  const [simulatedVictimGuid, setSimulatedVictimGuid] = useState("04a29fb4890c12");
  const [dnsC2TrafficLog, setDnsC2TrafficLog] = useState([]);

  // Studio 3: Golden SAML Token Forgery Lab State
  const [adfsSigningKeyProtection, setAdfsSigningKeyProtection] = useState("unprotected_windows_store"); // unprotected_windows_store, tier0_hsm_isolated
  const [conditionalAccessActive, setConditionalAccessActive] = useState(false);

  // Studio 4: Regional MSP Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("msp_findings");

  // Studio 1: Simulate Build Execution
  const handleRunBuild = () => {
    setIsCompilingBuild(true);
    const timestamp = new Date().toLocaleTimeString();

    setTimeout(() => {
      let logEntry = {};
      if (buildIntegrityMode === "vulnerable_persistent") {
        logEntry = {
          id: Date.now(),
          time: timestamp,
          stage: "COMPILATION & CODE SIGNING",
          compilerStatus: "SUCCESS: msbuild.exe completed in 1.4s",
          sunspotStatus: "SUNSPOT INJECTED: Swapped `InventoryManager.cs` during build!",
          authenticodeSignature: codeSigningHsmActive ? "SIGNED (Valid HSM Signature)" : "SIGNED (Valid SolarWinds Authenticode Signature)",
          verdict: "TROJANIZED ARTIFACT PRODUCED: `SolarWinds.Orion.Core.BusinessLayer.dll` carries SUNBURST backdoor with valid digital signature!",
          verdictColor: "text-rose-400 font-extrabold"
        };
      } else if (buildIntegrityMode === "slsa_level3_hermetic") {
        logEntry = {
          id: Date.now(),
          time: timestamp,
          stage: "HERMETIC EPHEMERAL RUNNER",
          compilerStatus: "SUCCESS: Isolated container compiled verified source commit",
          sunspotStatus: "SUNSPOT BLOCKED: Ephemeral container had zero persistent malware hooks",
          authenticodeSignature: "SLSA LEVEL 3 PROVENANCE ATTESTATION GENERATED",
          verdict: "CLEAN ARTIFACT: Cryptographic provenance verified against immutable Git commit SHA-256.",
          verdictColor: "text-emerald-400 font-bold"
        };
      } else {
        logEntry = {
          id: Date.now(),
          time: timestamp,
          stage: "REPRODUCIBLE DUAL CLUSTER VERIFICATION",
          compilerStatus: "DUAL COMPILATION: Cluster Alpha & Cluster Beta matched bit-for-bit",
          sunspotStatus: "TAMPERING DETECTED: Hash mismatch would instantly trigger build abort",
          authenticodeSignature: "SIGNED: Multi-Party Quorum M-of-N Approved",
          verdict: "VERIFIED REPRODUCIBLE: Bit-for-bit identical output from independent isolated clusters.",
          verdictColor: "text-blue-400 font-bold"
        };
      }

      setBuildLogs((prev) => [logEntry, ...prev.slice(0, 3)]);
      setIsCompilingBuild(false);
    }, 700);
  };

  // Studio 2: Simulate DNS DGA Query
  const handleSimulateDnsBeacon = () => {
    const timestamp = new Date().toLocaleTimeString();
    const generatedSubdomain = `${simulatedVictimGuid}.appsync-api.eu-west-1.avsvmcloud.com`;

    let c2Response = "";
    let actionVerdict = "";
    let verdictColor = "";

    if (targetOrganizationType === "high_value_gov") {
      c2Response = "CNAME: c2-us-east.trafficmanager.net -> A: 13.59.xxx.xxx (Second-Stage Payload Ready)";
      actionVerdict = "SECOND-STAGE TEARDROP ACTIVATED: High-value target recognized (US Cabinet Agency). SVR sent memory loader for Cobalt Strike!";
      verdictColor = "text-rose-400 font-bold";
    } else {
      c2Response = "A: 10.0.0.1 (Inactive Sink / Null Route)";
      actionVerdict = "FILTERED OUT: Commercial target ignored by SVR operators to maintain extreme operational security (OPSEC).";
      verdictColor = "text-amber-400 font-semibold";
    }

    setDnsC2TrafficLog((prev) => [
      {
        id: Date.now(),
        time: timestamp,
        query: generatedSubdomain,
        response: c2Response,
        verdict: actionVerdict,
        verdictColor
      },
      ...prev.slice(0, 4)
    ]);
  };

  // Studio 3 Calculation: Golden SAML Vulnerability Outcome
  const goldenSamlOutcome = useMemo(() => {
    let cloudAccessStatus = "";
    let statusColor = "";
    let explanation = "";

    if (adfsSigningKeyProtection === "unprotected_windows_store") {
      if (!conditionalAccessActive) {
        cloudAccessStatus = "UNRESTRICTED CLOUD TAKEOVER (SolarWinds 2020 Disaster)";
        statusColor = "text-rose-400 font-extrabold";
        explanation = "Adversary extracted private ADFS signing key from Windows cert store, forged Golden SAML tokens offline, and authenticated as Global Admin to Microsoft 365 / Azure with ZERO password or MFA prompts!";
      } else {
        cloudAccessStatus = "CONTAINED: Conditional Access Blocked Forged Token";
        statusColor = "text-amber-400 font-bold";
        explanation = "Attacker possessed valid forged SAML assertion, but Microsoft Entra ID Conditional Access rejected login because request did not possess a valid Intune-managed TPM device certificate.";
      }
    } else {
      cloudAccessStatus = "BLOCKED AT ON-PREMISES ADFS (Tier 0 HSM Fortress)";
      statusColor = "text-emerald-400 font-bold";
      explanation = "ADFS token-signing keys were protected in a FIPS 140-2 Level 3 HSM. Attackers could not export the private key, completely preventing Golden SAML token generation.";
    }

    return {
      cloudAccessStatus,
      statusColor,
      explanation
    };
  }, [adfsSigningKeyProtection, conditionalAccessActive]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border border-blue-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 7</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Case Study 7: SolarWinds Supply Chain Attack (2020) — SUNBURST Backdoor
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic investigation into the landmark Russian SVR espionage campaign: How SUNSPOT injected backdoors into SolarWinds' CI/CD build pipeline, distributed signed trojanized updates to 18,000 global entities, and forged Golden SAML tokens to compromise US Cabinet agencies.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">APT29 / Cozy Bear (Russian SVR)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">SUNSPOT Build Injection & SUNBURST</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">DNS DGA C2 Tunneling (`avsvmcloud.com`)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Golden SAML & Cloud Identity Hijacking</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL CI/CD INJECTION & GOLDEN SAML INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">01.</span> Anatomy of the SolarWinds Supply Chain & Cloud Identity Kill Chain
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how SVR hackers moved from compiler injection to signed update distribution and Golden SAML cloud takeover.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-mono">
              SUNBURST Supply Chain
            </span>
          </div>

          {/* SVG INFOGRAPHIC: SolarWinds Attack Flow */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              End-to-End Campaign Progression: From CI/CD Infiltration to Microsoft 365 Cloud Domination
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgBuildId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Step 1: SUNSPOT Build Injection */}
                <rect x="20" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="100" y="50" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">1. CI/CD INJECTION</text>
                <text x="100" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">SUNSPOT Builder Malware</text>
                <text x="100" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Monitored msbuild.exe</text>
                <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Swapped source code</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">during compilation</text>
                <rect x="35" y="150" width="130" height="26" rx="6" fill="#1e3a8a" />
                <text x="100" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">Zero Trace in Git Repo</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="210" y2="110" stroke="#3b82f6" strokeWidth="3" />

                {/* Step 2: Code Signing & Distribution */}
                <rect x="210" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="290" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">2. VALID CODE SIGN</text>
                <text x="290" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Symantec / DigiCert CA</text>
                <text x="290" y="100" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Legitimate Signature!</text>
                <text x="290" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Signed by SolarWinds</text>
                <text x="290" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Whitelisted by Antivirus</text>
                <rect x="225" y="150" width="130" height="26" rx="6" fill="#065f46" />
                <text x="290" y="167" textAnchor="middle" fill="#d1fae5" fontSize="9" fontWeight="bold">Pushed to 18,000 Orgs</text>

                {/* Arrow 2 */}
                <line x1="370" y1="110" x2="400" y2="110" stroke="#10b981" strokeWidth="3" />

                {/* Step 3: DNS DGA C2 Tunneling */}
                <rect x="400" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="480" y="50" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">3. DNS DGA C2</text>
                <text x="480" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">`avsvmcloud.com`</text>
                <text x="480" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">14-Day Sleep Delay</text>
                <text x="480" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Encoded victim GUIDs</text>
                <text x="480" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">in standard DNS queries</text>
                <rect x="415" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="480" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Stealth Second-Stage C2</text>

                {/* Arrow 3 */}
                <line x1="560" y1="110" x2="590" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Step 4: Golden SAML Cloud Forgery */}
                <rect x="590" y="25" width="150" height="175" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="665" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="bold">4. GOLDEN SAML</text>
                <text x="665" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">ADFS Token-Signing Key</text>
                <text x="665" y="100" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Stolen Private Key</text>
                <text x="665" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Forged SAML assertions</text>
                <text x="665" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">offline without password</text>
                <rect x="600" y="150" width="130" height="26" rx="6" fill="#581c87" />
                <text x="665" y="167" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Bypassed MFA Prompts</text>

                {/* Arrow 4 */}
                <line x1="740" y1="110" x2="765" y2="110" stroke="#8b5cf6" strokeWidth="3" />

                {/* Step 5: M365 & Cloud Espionage */}
                <rect x="765" y="25" width="120" height="175" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
                <text x="825" y="50" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">5. ESPIONAGE</text>
                <text x="825" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Microsoft 365</text>
                <text x="825" y="100" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Graph API Read</text>
                <text x="825" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Exfiltrated emails of</text>
                <text x="825" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">US Treasury & DHS</text>
                <rect x="772" y="150" width="105" height="26" rx="6" fill="#831843" />
                <text x="825" y="167" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">EO 14028 Signed</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE CI/CD BUILD PIPELINE INJECTION VS SLSA PROVENANCE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">02.</span> Studio 1: CI/CD Build Pipeline Infiltration vs SLSA Provenance Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate how SUNSPOT swaps source code during compilation on persistent build servers versus isolated ephemeral runners with SLSA Level 3 provenance.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Build Pipeline Lab
            </span>
          </div>

          {/* Architecture Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setBuildIntegrityMode("vulnerable_persistent")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                buildIntegrityMode === "vulnerable_persistent"
                  ? "bg-rose-950/60 border-rose-600 text-rose-200 ring-2 ring-rose-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-rose-400 text-sm">1. Persistent Build Server (SolarWinds 2020)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Persistent VM build server. SUNSPOT malware monitors `msbuild.exe` and swaps `InventoryManager.cs` dynamically before signing!
              </p>
            </button>

            <button
              onClick={() => setBuildIntegrityMode("slsa_level3_hermetic")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                buildIntegrityMode === "slsa_level3_hermetic"
                  ? "bg-emerald-950/60 border-emerald-600 text-emerald-200 ring-2 ring-emerald-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-emerald-400 text-sm">2. SLSA Level 3 Hermetic Ephemeral Runner</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Air-gapped single-use container spawned on-demand. Generates cryptographic in-toto build provenance tied to Git commit hash.
              </p>
            </button>

            <button
              onClick={() => setBuildIntegrityMode("reproducible_dual_cluster")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                buildIntegrityMode === "reproducible_dual_cluster"
                  ? "bg-blue-950/60 border-blue-600 text-blue-200 ring-2 ring-blue-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-blue-400 text-sm">3. Reproducible Dual-Cluster Verification</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Two separate isolated build clusters compile source independently. Release aborted if hashes differ by even 1 bit!
              </p>
            </button>
          </div>

          {/* Trigger Compilation Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Execute Automated CI/CD Software Build</div>
              <div className="text-[11px] text-gray-400">
                Active Architecture: <span className="font-mono text-blue-400 uppercase font-semibold">{buildIntegrityMode.replace(/_/g, " ")}</span>
              </div>
            </div>
            <button
              onClick={handleRunBuild}
              disabled={isCompilingBuild}
              className={clsx(
                "px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2",
                isCompilingBuild
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-950/50"
              )}
            >
              {isCompilingBuild ? "Compiling & Verifying Provenance..." : "⚙️ Trigger Automated Release Build"}
            </button>
          </div>

          {/* Build Output Telemetry Stream */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              CI/CD Build Runner Log (`/var/log/pipeline/build_audit.log`):
            </h4>
            <div className="bg-black/70 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs max-h-60 overflow-y-auto">
              {buildLogs.length === 0 ? (
                <div className="text-gray-500 text-center py-6">
                  [Awaiting Build Trigger...] Click "Trigger Automated Release Build" above to test compiler integrity.
                </div>
              ) : (
                buildLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">[{log.time}] Phase: <span className="text-white font-bold">{log.stage}</span></span>
                      <span className={log.verdictColor}>{log.sunspotStatus}</span>
                    </div>
                    <div className="text-gray-300 text-[11px]">{log.compilerStatus}</div>
                    <div className="text-amber-300 text-[11px]">Signature: {log.authenticodeSignature}</div>
                    <div className={clsx("p-2 rounded bg-slate-900 border border-slate-800 text-[11px]", log.verdictColor)}>
                      {log.verdict}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* STUDIO 2: SUNBURST DNS DGA SUBDOMAIN TUNNELING & C2 SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">03.</span> Studio 2: SUNBURST DNS DGA Subdomain Tunneling Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Deconstruct how SUNBURST exfiltrated victim GUIDs inside standard DNS queries to `avsvmcloud.com` and how the SVR filtered high-value government targets.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              DNS C2 Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Simulated Victim Organization Profile
              </h3>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Target Organization Classification:</label>
                <select
                  value={targetOrganizationType}
                  onChange={(e) => setTargetOrganizationType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="high_value_gov">1. High-Value Intelligence Target (US Treasury / Homeland Security)</option>
                  <option value="standard_commercial">2. Standard Commercial Enterprise (Filtered / Ignored by SVR)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Simulated Victim Computer Hash (GUID):</label>
                <input
                  type="text"
                  value={simulatedVictimGuid}
                  onChange={(e) => setSimulatedVictimGuid(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleSimulateDnsBeacon}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs hover:from-amber-500 hover:to-rose-500 shadow-md flex items-center justify-center gap-2"
              >
                📡 Transmit DNS DGA Lookup to `avsvmcloud.com`
              </button>
            </div>

            {/* DNS Traffic Output Feed */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider font-sans mb-2">
                  Live Passive DNS Telemetry Monitor
                </h3>

                {dnsC2TrafficLog.length === 0 ? (
                  <div className="text-gray-500 text-center py-8 font-sans">
                    [Passive DNS Sensor Idle] Click "Transmit DNS DGA Lookup" to inspect C2 interaction.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {dnsC2TrafficLog.map((item) => (
                      <div key={item.id} className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-[10px] text-gray-400">[{item.time}] DNS Standard Query: <span className="text-white">{item.query}</span></div>
                        <div className="text-[11px] text-amber-300">{item.response}</div>
                        <div className={clsx("text-[11px] font-sans", item.verdictColor)}>{item.verdict}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-2.5 rounded bg-blue-950/40 border border-blue-800 text-[11px] text-blue-200 font-sans mt-2">
                <span className="font-bold text-blue-300">OPSEC Takeaway:</span> SVR never beaconed directly over HTTP; they weaponized standard DNS resolution to evade perimeter firewall blocking.
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 3: GOLDEN SAML FORGERY & CLOUD IDENTITY HIJACKING LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">04.</span> Studio 3: Golden SAML Token Forgery & Cloud Identity Hijacking Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Analyze how APT29 extracted ADFS token-signing certificates to forge SAML assertions offline, bypassing passwords and MFA to conquer Microsoft 365.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Identity Security Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Identity Federation & Cloud Governance
              </h3>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">ADFS Private Token-Signing Key Storage:</label>
                <select
                  value={adfsSigningKeyProtection}
                  onChange={(e) => setAdfsSigningKeyProtection(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="unprotected_windows_store">1. Standard Windows Certificate Store (SolarWinds 2020 Vulnerability)</option>
                  <option value="tier0_hsm_isolated">2. FIPS 140-2 Level 3 Hardware Security Module (HSM Tier 0)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Entra ID Intune-Compliant Device Conditional Access</div>
                  <div className="text-[11px] text-gray-400">Requires verified TPM hardware certificate on client device</div>
                </div>
                <button
                  onClick={() => setConditionalAccessActive(!conditionalAccessActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    conditionalAccessActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {conditionalAccessActive ? "ENFORCED (TPM Check)" : "DISABLED (Token Only)"}
                </button>
              </div>
            </div>

            {/* Assessment Result */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Cloud Identity Hijacking Assessment
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-gray-400 block">Cloud Access State (Microsoft 365 / Azure):</span>
                    <span className={goldenSamlOutcome.statusColor}>{goldenSamlOutcome.cloudAccessStatus}</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Identity Post-Mortem Analysis:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{goldenSamlOutcome.explanation}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-purple-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-purple-300">
                  Golden SAML Defensive Formula:
                </span>
                <p>
                  "Never store token-signing certificates in software keystores. Isolate ADFS in Tier 0 HSMs and enforce device-bound Conditional Access to prevent offline forged tokens from authenticating."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL MSP & SOFTWARE VENDOR TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">05.</span> Studio 4: Regional MSP & CI/CD Supply Chain Tabletop Drill
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative DevSecOps audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional software vendor and MSP in Kolkata and Barrackpore.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional MSP Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full font-medium">
                Lead DevSecOps Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (CI/CD Pipeline Security)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Identity & SAML Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (HSM & Code Signing Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("msp_findings")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "msp_findings"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Regional MSP Vulnerability Findings
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("slsa_remediation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "slsa_remediation"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed SLSA Provenance & HSM Signing
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "msp_findings" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Kolkata & Barrackpore MSP Hubs:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Persistent Build Servers:</span> The software release build server in Jadavpur was a persistent VM connected to the office LAN with full internet access.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unprotected Code-Signing Keys:</span> The corporate code-signing certificate was stored in a file share password-protected by a static developer password.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unrestricted NOC Egress:</span> The central IT monitoring server in Barrackpore had unrestricted outbound internet access to resolve arbitrary external DNS names.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Deployed by Susmita, Debangshu & Mamata:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">SLSA Level 3 Ephemeral Containers:</span> Migrated all build jobs to single-use, air-gapped container runners that generate in-toto cryptographic provenance attestations.
                    </li>
                    <li>
                      <span className="font-semibold text-white">FIPS 140-2 Level 3 HSM Code Signing:</span> Stored private code-signing keys inside hardware HSMs requiring M-of-N multi-party quorum approval.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Egress Whitelisting:</span> Blocked all outbound internet connectivity from core monitoring servers; permitted only authenticated proxy connections for critical patches.
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
                <span className="text-blue-400">06.</span> Academic Note & Printable Revision Guide
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
              fileName="Topic7_SolarWinds_Supply_Chain_Attack_Case_Study_Notes.txt"
            />
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">07.</span> Comprehensive Exam & Interview Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                30 in-depth conceptual, analytical, and forensic questions with code snippets, hints, and model answers on the SolarWinds attack, SUNBURST, and supply chain security.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
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

export default Topic7;
