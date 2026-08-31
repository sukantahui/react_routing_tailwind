import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import threeFactorsPy from "./topic1_files/three_factors_evaluator.py?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgFactorId = useId();
  const svgTravelerId = useId();

  // =========================================================================
  // STUDIO 1 STATE: INTERACTIVE 3-FACTOR COMBINATOR & VALIDATOR
  // =========================================================================
  const availableCredentials = [
    { id: "password", name: "Static Password", factor: "KNOWLEDGE", icon: "🔑", color: "text-cyan-400" },
    { id: "pin", name: "Numeric ATM PIN", factor: "KNOWLEDGE", icon: "🔢", color: "text-cyan-400" },
    { id: "yubikey", name: "FIDO2 Hardware Key", factor: "POSSESSION", icon: "🛡️", color: "text-indigo-400" },
    { id: "totp_app", name: "Google Authenticator TOTP", factor: "POSSESSION", icon: "📱", color: "text-indigo-400" },
    { id: "fingerprint", name: "Optical Fingerprint Scan", factor: "INHERENCE", icon: "👆", color: "text-emerald-400" },
    { id: "facial_mesh", name: "3D Infrared Facial Scan", factor: "INHERENCE", icon: "👤", color: "text-emerald-400" },
    { id: "gps_location", name: "GPS Geofence Subnet", factor: "LOCATION", icon: "📍", color: "text-amber-400" }
  ];

  const [selectedCredIds, setSelectedCredIds] = useState(["password", "yubikey"]);

  const toggleCredential = (id) => {
    if (selectedCredIds.includes(id)) {
      if (selectedCredIds.length > 1) {
        setSelectedCredIds(selectedCredIds.filter((item) => item !== id));
      }
    } else {
      setSelectedCredIds([...selectedCredIds, id]);
    }
  };

  const mfaAnalysis = useMemo(() => {
    const selectedCreds = availableCredentials.filter((c) => selectedCredIds.includes(c.id));
    const factorCategories = new Set(selectedCreds.map((c) => c.factor));
    const distinctCount = factorCategories.size;

    let verdict = "";
    let grade = "";
    let color = "";

    if (distinctCount >= 3) {
      verdict = "TRUE 3FA (High-Assurance Triple Factor Authentication)";
      grade = "A+ (NIST AAL3 Compliant)";
      color = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else if (distinctCount === 2) {
      verdict = "TRUE 2FA (Dual-Factor Authentication Verified)";
      grade = "A (NIST AAL2 Compliant)";
      color = "bg-cyan-950 text-cyan-300 border-cyan-700";
    } else {
      verdict = "FLAWED: Multi-Step 1FA Only! Credentials share the same category.";
      grade = "F (Vulnerable to Single-Point Breach)";
      color = "bg-rose-950 text-rose-300 border-rose-700";
    }

    return { selectedCreds, factorCategories: Array.from(factorCategories), distinctCount, verdict, grade, color };
  }, [selectedCredIds]);

  // =========================================================================
  // STUDIO 2 STATE: IMPOSSIBLE TRAVELER FRAUD SIMULATOR
  // =========================================================================
  const [travelScenario, setTravelScenario] = useState("impossible_flight"); // "impossible_flight", "local_commute"

  const travelScenarios = {
    impossible_flight: {
      title: "1. Impossible Traveler Anomaly (Barrackpore to London in 20 min)",
      login1: "Barrackpore (West Bengal) - 14:00 UTC",
      login2: "London (United Kingdom) - 14:20 UTC",
      distance: "7,960 km",
      elapsedTime: "20 minutes (0.33 hours)",
      velocity: "23,880 km/h (> 900 km/h Commercial Jet Limit)",
      action: "ACCOUNT LOCKED 🚨: Geographically impossible velocity. Credential stuffing botnet detected.",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    },
    local_commute: {
      title: "2. Plausible Local Commute (Barrackpore to Salt Lake Sector V)",
      login1: "Barrackpore Municipal Office - 09:00 UTC",
      login2: "Salt Lake Sector V FinTech Core - 10:30 UTC",
      distance: "26 km",
      elapsedTime: "90 minutes (1.5 hours)",
      velocity: "17.3 km/h (Normal Metro/Bus Transit)",
      action: "LOGIN PERMITTED ✔: Physical transit velocity plausible.",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    }
  };

  const currentTravel = travelScenarios[travelScenario];

  // =========================================================================
  // STUDIO 3 STATE: ADAPTIVE RISK-BASED AUTHENTICATION SIMULATOR
  // =========================================================================
  const [isKnownDevice, setIsKnownDevice] = useState(true);
  const [isNormalHours, setIsNormalHours] = useState(true);
  const [isCorporateSubnet, setIsCorporateSubnet] = useState(true);
  const [isEndpointHealthy, setIsEndpointHealthy] = useState(true);

  const adaptiveResult = useMemo(() => {
    let riskScore = 0;
    if (!isKnownDevice) riskScore += 30;
    if (!isNormalHours) riskScore += 20;
    if (!isCorporateSubnet) riskScore += 25;
    if (!isEndpointHealthy) riskScore += 35;

    let action = "";
    let color = "";
    let grade = "";

    if (riskScore <= 20) {
      action = "LOW RISK (Score: " + riskScore + "/100) ➔ Single Sign-On (SSO Pass)";
      grade = "Permit without friction";
      color = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else if (riskScore <= 50) {
      action = "MEDIUM RISK (Score: " + riskScore + "/100) ➔ Step-Up TOTP / Push Notification Required";
      grade = "Standard 2FA Challenge";
      color = "bg-cyan-950 text-cyan-300 border-cyan-700";
    } else if (riskScore <= 75) {
      action = "HIGH RISK (Score: " + riskScore + "/100) ➔ Mandatory Hardware FIDO2 + Biometric Step-Up";
      grade = "High-Assurance Challenge";
      color = "bg-amber-950 text-amber-300 border-amber-700";
    } else {
      action = "CRITICAL RISK (Score: " + riskScore + "/100) ➔ ACCESS BLOCKED & SOC ALERT GENERATED";
      grade = "Outright Denial";
      color = "bg-rose-950 text-rose-300 border-rose-700";
    }

    return { riskScore, action, grade, color };
  }, [isKnownDevice, isNormalHours, isCorporateSubnet, isEndpointHealthy]);

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_3fa");

  const regionalDrills = {
    barrackpore_3fa: {
      id: "barrackpore_3fa",
      title: "Barrackpore Municipal Treasury: High-Assurance 3FA Enforcement",
      location: "Municipal budget disburser processing ₹85,00,000 across regional banks",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Phishing emails targeting treasury officers sought to steal passwords to trigger unauthorized payment batches.",
      solution:
        "Enforced True 3FA combining Password (Knowledge) + Hardware FIDO2 YubiKey (Possession) + Capacitive Fingerprint (Inherence) for all fund disbursements exceeding ₹10,00,000.",
      outcome:
        "Zero fraudulent disbursements; phishing rendered 100% ineffective; full compliance under CAG financial audit standards."
    },
    ichapur_defense_biometrics: {
      id: "ichapur_defense_biometrics",
      title: "Ichapur Defense Facility: Physical Smartcard + Iris Convergence",
      location: "Restricted command bunkers and cryptographic telemetry servers",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Shoulder-surfing of keypad PINs and lost physical badges allowed unauthorized entry attempts into defense server rooms.",
      solution:
        "Integrated dual-factor physical gates requiring Smartcard (Possession) + 3D Iris Scan (Inherence) with infrared liveness detection.",
      outcome:
        "Tailgating and badge-sharing completely eliminated; FAR reduced to < 0.0001%; automated access logging."
    },
    kolkata_fintech_velocity: {
      id: "kolkata_fintech_velocity",
      title: "Salt Lake Sector V FinTech: Impossible Traveler Velocity Engine",
      location: "Real-time mobile banking gateway processing 250,000 daily active sessions",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Credential stuffing botnets using leaked passwords attempted account takeovers from cloud proxies in Europe and North America.",
      solution:
        "Implemented real-time Haversine velocity calculations tracking GPS and IP coordinates. Logins requiring > 900 km/h travel velocity trigger instant account locks.",
      outcome:
        "Over 650 automated account takeovers blocked in the first month; zero false-positive complaints from legitimate domestic commuters."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_005 • Topic 1</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            The Three Factors of Authentication
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the mathematics of identity verification: Something you KNOW (Knowledge), Something you HAVE (Possession),
            Something you ARE (Inherence), True MFA vs Multi-Step 1FA, and Impossible Traveler anomaly detection.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Knowledge (Passwords/PINs)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Possession (FIDO2/Tokens)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Inherence (Biometrics/Gait)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              True MFA vs Multi-Step 1FA
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Adaptive Risk &amp; Impossible Traveler
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SCOPED INLINE KEYFRAME ANIMATIONS */}
        {/* ========================================================================= */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🧩
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Three Classical Authentication Factor Domains
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how independent mathematical factor categories establish resilient multi-layered identity assurance
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In enterprise systems across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, single-factor authentication (passwords alone) accounts for over 80% of all data breaches.
              To achieve high assurance (<strong className="text-white">NIST SP 800-63B AAL2 / AAL3</strong>), systems combine credentials across
              mathematically distinct factor categories.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🧠</span> 1. Something You KNOW (Knowledge)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Information memorized in human memory: Passwords, passphrases, ATM PINs.
                  Vulnerable to phishing, keyloggers, and dictionary brute-force attacks.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>📱</span> 2. Something You HAVE (Possession)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Physical cryptographic tokens: FIDO2 YubiKeys, smartcards, TOTP authenticator apps.
                  Vulnerable to physical theft, device cloning, and SIM swapping.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🧬</span> 3. Something You ARE (Inherence)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Biological and behavioral traits: Fingerprints, 3D facial geometry, iris scans, typing cadence.
                  Vulnerable to deepfakes and silicone spoofing; permanently non-revocable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE 3-FACTOR COMBINATOR & VALIDATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive 3-Factor Classification &amp; True MFA Combinator
                </h2>
                <p className="text-sm text-slate-400">
                  Select credentials and observe real-time mathematical factor category resolution and MFA assurance scoring
                </p>
              </div>
            </div>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", mfaAnalysis.color)}>
              {mfaAnalysis.grade}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* Credential Grid Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              {availableCredentials.map((cred) => {
                const isSelected = selectedCredIds.includes(cred.id);
                return (
                  <button
                    key={cred.id}
                    onClick={() => toggleCredential(cred.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2",
                      isSelected
                        ? "bg-cyan-950/70 border-cyan-500 text-white shadow-md shadow-cyan-950/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{cred.icon}</span>
                      <span className={clsx("text-[10px] px-2 py-0.5 rounded font-mono border", isSelected ? "bg-cyan-900/80 border-cyan-700 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400")}>
                        {cred.factor}
                      </span>
                    </div>
                    <span className="font-bold">{cred.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Verdict Display Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-2 font-mono", mfaAnalysis.color)}>
              <div className="font-bold flex items-center justify-between font-sans">
                <span>⚡ MFA Assurance Result:</span>
                <span>Distinct Factors: {mfaAnalysis.distinctCount} / 3</span>
              </div>
              <div className="text-[11px] font-sans">
                <strong>Verdict:</strong> {mfaAnalysis.verdict}
              </div>
              <div className="text-[10px] text-slate-400 pt-1 font-sans">
                Active Categories: {mfaAnalysis.factorCategories.join(" + ")}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: IMPOSSIBLE TRAVELER FRAUD DETECTION SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ✈️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Impossible Traveler Fraud Detection &amp; Velocity Simulator
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate geographic login velocity calculations using the Haversine Great-Circle distance formula
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTravelScenario("impossible_flight")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  travelScenario === "impossible_flight"
                    ? "bg-rose-950 border-rose-600 text-rose-300 shadow-md shadow-rose-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                Impossible Anomaly (Fraud)
              </button>
              <button
                onClick={() => setTravelScenario("local_commute")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  travelScenario === "local_commute"
                    ? "bg-emerald-950 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                Plausible Commute (Legitimate)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400 font-sans">1. Initial Login:</div>
                <div className="text-white">{currentTravel.login1}</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400 font-sans">2. Subsequent Login:</div>
                <div className="text-white">{currentTravel.login2}</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 font-sans">Calculated Velocity:</div>
                <div className="text-emerald-300 font-bold">{currentTravel.velocity}</div>
              </div>
            </div>

            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", currentTravel.badgeColor)}>
              <div className="font-bold font-sans flex items-center gap-2">
                <span>{travelScenario === "impossible_flight" ? "🚨" : "✔"}</span>
                <span>Security Action:</span>
              </div>
              <p className="font-sans text-[11px] opacity-90">
                {currentTravel.action}
              </p>
              <div className="text-[10px] opacity-75 pt-1">
                Great-Circle Distance: {currentTravel.distance} in {currentTravel.elapsedTime}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: ADAPTIVE RISK-BASED AUTHENTICATION SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                📊
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Adaptive Risk-Based Authentication Engine
                </h2>
                <p className="text-sm text-slate-400">
                  Toggle contextual risk signals and observe dynamic step-up challenge requirements
                </p>
              </div>
            </div>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", adaptiveResult.color)}>
              Score: {adaptiveResult.riskScore}/100 • {adaptiveResult.grade}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={isKnownDevice}
                  onChange={(e) => setIsKnownDevice(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Managed Corporate Laptop (Known Device Cookie)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={isNormalHours}
                  onChange={(e) => setIsNormalHours(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Normal Working Hours (09:00 - 18:00 hrs)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={isCorporateSubnet}
                  onChange={(e) => setIsCorporateSubnet(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Internal Barrackpore SOC Subnet (10.14.0.0/16)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={isEndpointHealthy}
                  onChange={(e) => setIsEndpointHealthy(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Zero-Trust EDR Health &amp; BitLocker Compliant</span>
              </label>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", adaptiveResult.color)}>
              <div className="font-bold flex items-center gap-2">
                <span>⚡ Dynamic Step-Up Policy Decision:</span>
              </div>
              <p className="font-sans text-[11px] font-bold">
                {adaptiveResult.action}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & YUBIKEY CLI LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; Hardware Key Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world multi-factor authentication deployments in West Bengal and inspect live `ykman` hardware audits
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Forensic Lab
            </span>
          </div>

          {/* Drill Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(regionalDrills).map(([key, drill]) => {
              const isActive = activeDrillKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-2",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{drill.title}</span>
                  <span className="text-[10px] text-cyan-400">{drill.engineers}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">{currentDrill.title}</h3>
                <p className="text-xs text-slate-400">Location: {currentDrill.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono">
                Engineers: {currentDrill.engineers}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>🚨</span> Account Takeover Vector:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Multi-Factor Architecture Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux ykman Terminal Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-treasury: ~ (Auditing FIDO2 Hardware Key)</span>
                <span className="text-cyan-400">ykman fido info</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">$ ykman fido info</span></div>
                <div>FIDO2 version: 2.1</div>
                <div>PIN set: <span className="text-emerald-300 font-bold">True</span> (Knowledge Factor Protected)</div>
                <div>PIN attempts remaining: 8</div>
                <div>Resident credentials supported: True</div>
                <div>User verification: Supported (Bio / Touch PIN)</div>
                <div><span className="text-cyan-300">Device: YubiKey 5 NFC (Hardware AAL3 Compliant ✔)</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>⚠️</span> Common Pitfalls &amp; Traps
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span><strong>Confusing Multi-Step with Multi-Factor:</strong> Password + Security Question is NOT 2FA; it is two Knowledge factors. A keylogger or data breach compromises both.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Relying on SMS OTP for Critical Systems:</strong> SMS is vulnerable to SS7 cellular interception and carrier SIM swapping. Use hardware FIDO2 or TOTP apps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>MFA Fatigue Push Bombing:</strong> Users fatigued by repeated push notifications tap 'Approve'. Mitigate by enforcing Number Matching.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Assuming Biometrics are Secret:</strong> Biometrics are public identity traits and permanently non-revocable. Never store raw biometric templates on central cloud servers.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>🛡️</span> Production Best Practices
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span><strong>Enforce True 2FA (Knowledge + Possession):</strong> Mandate FIDO2 hardware keys or TOTP authenticator apps for all corporate logins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Deploy Impossible Traveler Anomaly Checks:</strong> Automatically flag and lock accounts when login distance exceeds physical flight limits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Implement Adaptive Step-Up MFA:</strong> Challenge users with high-assurance biometric or hardware prompts only on high-risk operations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Mandate Number Matching for Push 2FA:</strong> Stops MFA fatigue attacks by requiring users to type the displayed 2-digit number into their phone.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST SECTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why is a password plus an SMS OTP considered 2FA, while a password plus a secret answer is only 1FA?
                Because the SMS OTP requires physical POSSESSION of the registered SIM card, creating two distinct factor categories!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Knowledge = Something you know; Possession = Something you have; Inherence = Something you are.</li>
                <li>True MFA requires at least 2 mathematically distinct factor categories.</li>
                <li>Biometric traits are permanently non-revocable; protect with liveness detection.</li>
                <li>Impossible Traveler detects geographically impossible travel velocity (v &gt; 900 km/h).</li>
                <li>Adaptive Authentication evaluates real-time risk score before demanding step-up MFA.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Authentication Factors &amp; Velocity Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating 3-factor validation logic, true MFA analysis, and Haversine velocity anomaly calculation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={threeFactorsPy}
            title="three_factors_evaluator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="The Three Factors of Authentication FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the three classical factor categories (Knowledge, Possession, Inherence) and explain why Password + PIN is flawed 1FA (same category) while Password + YubiKey is True 2FA. Understand the difference between physical and behavioral biometrics. Be prepared to explain the Impossible Traveler anomaly detection formula and contrast static MFA with Adaptive / Risk-Based Authentication for full marks!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Three Factors of Authentication Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 1 Note"
            downloadFileName="topic1_three_factors_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
