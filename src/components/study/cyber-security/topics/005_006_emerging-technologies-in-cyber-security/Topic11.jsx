import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import ztEnginePy from "./topic11_files/zero_trust_pdp_pep_engine.py?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgPdpId = useId();
  const svgMicroSegId = useId();

  // =========================================================================
  // STUDIO 1: NIST SP 800-207 PDP / PEP DYNAMIC AUTHORIZATION SANDBOX
  // =========================================================================
  const [mfaType, setMfaType] = useState("FIDO2"); // "NONE", "SMS_OTP", "FIDO2"
  const [deviceEdrActive, setDeviceEdrActive] = useState(true);
  const [devicePatched, setDevicePatched] = useState(true);
  const [uebaRisk, setUebaRisk] = useState(15); // 0 to 100
  const [targetResource, setTargetResource] = useState("CROWN_JEWEL"); // "INTERNAL_WIKI", "CROWN_JEWEL"

  const pdpAssessment = useMemo(() => {
    let trustScore = 100;

    if (mfaType === "NONE") trustScore -= 50;
    else if (mfaType === "SMS_OTP") trustScore -= 15;

    if (!deviceEdrActive) trustScore -= 35;
    if (!devicePatched) trustScore -= 20;

    if (uebaRisk > 60) trustScore -= 40;
    else if (uebaRisk > 30) trustScore -= 15;

    trustScore = Math.max(trustScore, 0);

    const minRequired = targetResource === "CROWN_JEWEL" ? 85 : 40;
    const isGranted = trustScore >= minRequired;
    const isChallenge = !isGranted && trustScore >= (minRequired - 20);

    let decision = "";
    let badgeColor = "";
    let pepAction = "";

    if (isGranted) {
      decision = "ACCESS GRANTED ✔ (Dynamic mTLS Tunnel Provisioned)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      pepAction = "PEP Gateway establishes ephemeral encrypted mutual TLS tunnel directly to the requested resource.";
    } else if (isChallenge) {
      decision = "STEP-UP CHALLENGE REQUIRED ⚠️ (FIDO2 Hardware Verification)";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
      pepAction = "PEP Gateway holds request and triggers mandatory biometric hardware passkey re-authentication.";
    } else {
      decision = "ACCESS DENIED & QUARANTINED 🚨 (Zero Trust Violation)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      pepAction = "PEP Gateway terminates connection immediately and logs Level-1 security incident in SIEM.";
    }

    return { trustScore, minRequired, decision, badgeColor, pepAction };
  }, [mfaType, deviceEdrActive, devicePatched, uebaRisk, targetResource]);

  // =========================================================================
  // STUDIO 2: MICRO-SEGMENTATION LATERAL MOVEMENT SANDBOX
  // =========================================================================
  const [microSegEnabled, setMicroSegEnabled] = useState(true);
  const [infectionTriggered, setInfectionTriggered] = useState(false);

  const lateralSimulation = useMemo(() => {
    if (!infectionTriggered) {
      return {
        status: "IDLE (Network Healthy)",
        badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
        workstationA: "Clean",
        workstationB: "Clean",
        treasuryDb: "Clean & Isolated",
        desc: "Click 'Simulate Ransomware Infection on Workstation A' to test lateral movement containment."
      };
    }

    if (microSegEnabled) {
      return {
        status: "CONTAINED BY MICRO-SEGMENTATION ✔",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        workstationA: "Infected (Isolated 🚨)",
        workstationB: "Protected ✔ (East-West Port Scan Blocked)",
        treasuryDb: "Protected ✔ (Zero Inbound Listening Ports - Invisible)",
        desc: "Layer-7 micro-segmentation blocked all lateral SMB/RPC probing. Crown-jewel database remained completely invisible and unaffected!"
      };
    } else {
      return {
        status: "CATASTROPHIC LATERAL SPREAD 🚨 (Flat Network Breach)",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        workstationA: "Infected 🚨",
        workstationB: "Infected (Compromised over flat VLAN 🚨)",
        treasuryDb: "ENCRYPTED 🚨 (Ransomware Drained All Financial Records)",
        desc: "Legacy flat network perimeter failed! Ransomware traversed internal subnets freely and encrypted the unsegmented core database."
      };
    }
  }, [microSegEnabled, infectionTriggered]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_microseg");

  const regionalDrills = {
    barrackpore_microseg: {
      id: "barrackpore_microseg",
      title: "Barrackpore Municipal Treasury: Micro-Segmentation & Invisible DB",
      location: "Municipal financial infrastructure managing 40 department networks",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Ransomware dropper executed on an accounting terminal, attempting to scan and encrypt internal municipal databases.",
      solution:
        "Deployed Zero Trust micro-segmentation with Software-Defined Perimeter (SDP) hiding the database with zero open listening ports ($0.0.0.0:0$).",
      outcome:
        "100% containment to the single endpoint; zero lateral spread; zero municipal financial records compromised."
    },
    kolkata_fintech_cae_revocation: {
      id: "kolkata_fintech_cae_revocation",
      title: "Salt Lake Sector V FinTech: Continuous Access Evaluation (CAE)",
      location: "Cloud remittance switch processing ₹15,00,00,000 in daily interbank payments",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Adversaries stole an active OAuth session cookie and attempted to execute unauthorized fund transfers from an unmanaged laptop in Russia.",
      solution:
        "Integrated Microsoft Entra Continuous Access Evaluation (CAE) evaluating live geovelocity and EDR signals on every API request.",
      outcome:
        "Impossible travel triggered instant session revocation in 180 milliseconds; unauthorized transaction blocked."
    },
    ichapur_defense_spiffe_mesh: {
      id: "ichapur_defense_spiffe_mesh",
      title: "Ichapur Ordnance Manufacturing: SPIFFE/SPIRE Microservice Mesh",
      location: "Classified defense manufacturing CAD and CNC machine controller clusters",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries attempted to inject malicious container pods to spoof internal CAD rendering microservices.",
      solution:
        "Deployed Istio Service Mesh with SPIRE issuing ephemeral 1-hour X.509 SVID mutual TLS certificates to authorized container pods.",
      outcome:
        "Spoofed pods lacked valid cryptographic SVID certificates and were permanently rejected by the mesh gateway."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 11
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Zero Trust Architecture (NIST SP 800-207): Never Trust, Always Verify
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-blue-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Zero Trust Architecture (ZTA) abandons the broken castle-and-moat perimeter model in favor of continuous, 
            per-session verification under the foundational doctrine: <strong>"Never Trust, Always Verify; Assume Breach."</strong>
            Dissect the <strong>NIST SP 800-207 Policy Decision Point (PDP: Policy Engine + Administrator)</strong> and 
            <strong>Policy Enforcement Point (PEP)</strong>, master <strong>Micro-Segmentation and Software-Defined Perimeters (SDP)</strong>, 
            and analyze <strong>Continuous Access Evaluation (CAE)</strong> mid-session threat revocation.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: NIST SP 800-207 PDP / PEP DYNAMIC AUTHORIZATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 1: NIST SP 800-207 Policy Decision Point (PDP) Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Adjust identity factors, device posture, and behavioral risk to observe dynamic trust scoring and automated PEP enforcement actions.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", pdpAssessment.badgeColor)}>
              {pdpAssessment.decision}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Subject Telemetry &amp; Resource Context
              </span>

              {/* MFA Selection */}
              <div className="space-y-1.5">
                <span className="text-slate-300 font-semibold block">Authentication Factor Quality:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMfaType("NONE")}
                    className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", mfaType === "NONE" ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-slate-900 text-slate-400 border-slate-800")}
                  >
                    Password Only (No MFA)
                  </button>
                  <button
                    onClick={() => setMfaType("SMS_OTP")}
                    className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", mfaType === "SMS_OTP" ? "bg-amber-950 text-amber-300 border-amber-800" : "bg-slate-900 text-slate-400 border-slate-800")}
                  >
                    SMS OTP (Phishable)
                  </button>
                  <button
                    onClick={() => setMfaType("FIDO2")}
                    className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", mfaType === "FIDO2" ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-slate-900 text-slate-400 border-slate-800")}
                  >
                    FIDO2 Hardware Passkey
                  </button>
                </div>
              </div>

              {/* Device Posture */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <span className="text-[11px] text-white">EDR Agent Compliant</span>
                  <input
                    type="checkbox"
                    checked={deviceEdrActive}
                    onChange={(e) => setDeviceEdrActive(e.target.checked)}
                    className="accent-blue-500 w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <span className="text-[11px] text-white">OS Patched (0-30d)</span>
                  <input
                    type="checkbox"
                    checked={devicePatched}
                    onChange={(e) => setDevicePatched(e.target.checked)}
                    className="accent-blue-500 w-4 h-4"
                  />
                </label>
              </div>

              {/* Behavioral Risk & Target Resource */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>UEBA Anomaly Risk Score:</span>
                  <span className={clsx("font-mono font-bold", uebaRisk > 50 ? "text-rose-400" : "text-emerald-400")}>
                    {uebaRisk} / 100 ({uebaRisk > 50 ? "High Anomaly 🚨" : "Normal Baseline ✔"})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={uebaRisk}
                  onChange={(e) => setUebaRisk(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setTargetResource("INTERNAL_WIKI")}
                  className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", targetResource === "INTERNAL_WIKI" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 border-slate-800")}
                >
                  Resource: Internal Wiki (Score &ge; 40)
                </button>
                <button
                  onClick={() => setTargetResource("CROWN_JEWEL")}
                  className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", targetResource === "CROWN_JEWEL" ? "bg-rose-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 border-slate-800")}
                >
                  Resource: Treasury DB (Score &ge; 85)
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Policy Decision Point (PDP)</span>
                  <span className="font-mono text-xl font-extrabold text-blue-400">{pdpAssessment.trustScore} / 100</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-slate-300">
                  <div className="text-slate-400 font-semibold text-[11px]">Policy Administrator (PA) Instruction to PEP:</div>
                  <p className="text-[11px] leading-relaxed text-white">{pdpAssessment.pepAction}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>NIST SP 800-207 Rule: </strong> Access is never granted by IP address or location; every connection requires an ephemeral mutual TLS credential issued by the Policy Administrator.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: MICRO-SEGMENTATION LATERAL MOVEMENT SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🧱</span> Studio 2: Micro-Segmentation &amp; Software-Defined Perimeter (SDP) Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Compare ransomware lateral movement containment in a Zero Trust micro-segmented network versus an unsegmented flat network.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", lateralSimulation.badgeColor)}>
              {lateralSimulation.status}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="font-bold text-white block">Layer-7 Micro-Segmentation &amp; SDP Gateway</span>
                <span className="text-[11px] text-slate-400">Blocks East-West lateral scanning and hides databases behind 0 open listening ports.</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMicroSegEnabled(!microSegEnabled);
                    setInfectionTriggered(false);
                  }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    microSegEnabled ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                  )}
                >
                  {microSegEnabled ? "Micro-Segmentation: ACTIVE ✔" : "Flat Network: ACTIVE ⚠️"}
                </button>
                <button
                  onClick={() => setInfectionTriggered(true)}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-rose-950 transition-all duration-200"
                >
                  Infect Workstation A 🚨
                </button>
              </div>
            </div>

            {/* Visual Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className={clsx("p-4 rounded-xl border space-y-2", infectionTriggered ? "bg-rose-950/40 border-rose-700" : "bg-slate-950 border-slate-800")}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1 font-bold">
                  <span className={infectionTriggered ? "text-rose-400" : "text-slate-300"}>Workstation A (Accounting)</span>
                  <span className="text-[10px] text-slate-500">Zone 1</span>
                </div>
                <div className="text-[11px] text-slate-400">IP: 10.0.1.42</div>
                <div className={clsx("font-bold text-[11px]", infectionTriggered ? "text-rose-300" : "text-emerald-400")}>
                  Status: {lateralSimulation.workstationA}
                </div>
              </div>

              <div className={clsx("p-4 rounded-xl border space-y-2", infectionTriggered && !microSegEnabled ? "bg-rose-950/40 border-rose-700" : "bg-slate-950 border-emerald-800/60")}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1 font-bold">
                  <span className={infectionTriggered && !microSegEnabled ? "text-rose-400" : "text-emerald-400"}>Workstation B (Clerk)</span>
                  <span className="text-[10px] text-slate-500">Zone 2</span>
                </div>
                <div className="text-[11px] text-slate-400">IP: 10.0.1.43</div>
                <div className={clsx("font-bold text-[11px]", infectionTriggered && !microSegEnabled ? "text-rose-300" : "text-emerald-400")}>
                  Status: {lateralSimulation.workstationB}
                </div>
              </div>

              <div className={clsx("p-4 rounded-xl border space-y-2", infectionTriggered && !microSegEnabled ? "bg-rose-950/40 border-rose-700" : "bg-slate-950 border-emerald-800/60")}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1 font-bold">
                  <span className={infectionTriggered && !microSegEnabled ? "text-rose-400" : "text-emerald-400"}>Treasury DB (Crown Jewel)</span>
                  <span className="text-[10px] text-slate-500">Zone 3 (Isolated)</span>
                </div>
                <div className="text-[11px] text-slate-400">Port: 0.0.0.0:0 (SDP Invisible)</div>
                <div className={clsx("font-bold text-[11px]", infectionTriggered && !microSegEnabled ? "text-rose-300" : "text-emerald-400")}>
                  Status: {lateralSimulation.treasuryDb}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <strong className="text-white">Forensic Analysis: </strong>
              {lateralSimulation.desc}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 3: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of municipal micro-segmentation, continuous access evaluation (CAE), and SPIRE container meshes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(regionalDrills).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    activeDrillKey === key
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_microseg" ? "Barrackpore Micro-Seg" : key === "kolkata_fintech_cae_revocation" ? "Kolkata CAE Token Revocation" : "Ichapur SPIRE Mesh"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-blue-400 font-mono bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Vector</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-blue-400 uppercase text-[10px] tracking-wider block">Zero Trust Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Measurable Outcome</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Mistakes
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Assuming VPNs Equal Zero Trust:</strong> VPNs grant broad network-level access to internal subnets; Zero Trust grants access strictly to individual applications.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Authenticating Only at Initial Login:</strong> Issuing static 8-hour tokens leaves enterprise sessions vulnerable to mid-session token theft; deploy CAE.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Maintaining Standing Admin Privileges:</strong> Permanent 24/7 administrator roles allow attackers who steal credentials to execute full domain takeovers; use JIT.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Zero Trust Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Mutual TLS (mTLS) Everywhere:</strong> Encrypt all service-to-service microservice communications with SPIFFE/SPIRE cryptographic identities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Software-Defined Perimeter (SDP):</strong> Hide internal databases and crown jewels with zero public listening ports ($0.0.0.0:0$).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Just-In-Time (JIT) Elevation:</strong> Enforce temporary, time-bounded admin privileges that auto-expire upon ticket completion.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-blue-300">Think About:</span>
              <p className="leading-relaxed">
                Why does NIST SP 800-207 separate the Policy Decision Point (PDP) from the Policy Enforcement Point (PEP)? Because it centralizes complex ABAC mathematical risk scoring in one central brain while allowing hundreds of lightweight PEP gateway proxies to enforce decisions at line rate across the globe!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Zero Trust principles: "Never Trust, Always Verify; Assume Breach."</li>
                <li>NIST SP 800-207 defines PDP (Control Plane) and PEP (Data Plane).</li>
                <li>Micro-segmentation restricts ransomware lateral movement.</li>
                <li>Software-Defined Perimeter (SDP) hides databases with 0 open ports.</li>
                <li>Continuous Access Evaluation (CAE) revokes compromised tokens mid-session.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Zero Trust Architecture (PDP/PEP) Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating NIST SP 800-207 trust scoring, PEP gate enforcement, and micro-segmentation access decisions
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={ztEnginePy}
            title="zero_trust_pdp_pep_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Zero Trust Architecture (NIST SP 800-207) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the 7 tenets of Zero Trust Architecture (NIST SP 800-207) and explain the core doctrine: 'Never Trust, Always Verify; Assume Breach.' Detail the architectural components: Policy Decision Point (PDP: Policy Engine + Policy Administrator) and Policy Enforcement Point (PEP). Explain how micro-segmentation and Software-Defined Perimeters (SDP) prevent lateral movement. Describe Continuous Access Evaluation (CAE) and Just-In-Time (JIT) access."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 11: Zero Trust Architecture Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 11 Note"
            downloadFileName="topic11_zero_trust_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
