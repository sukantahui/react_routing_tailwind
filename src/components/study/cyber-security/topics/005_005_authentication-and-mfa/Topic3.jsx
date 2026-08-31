import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import mfaEnginePy from "./topic3_files/mfa_orchestration_engine.py?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgFactorsId = useId();
  const svgFatigueId = useId();

  // =========================================================================
  // STUDIO 1: TRUE MFA VS MULTI-STEP 1FA & NIST AAL ASSESSOR
  // =========================================================================
  const availableFactors = [
    { id: "password", name: "Static Password", factor: "KNOWLEDGE", icon: "🔑", color: "text-cyan-400" },
    { id: "pin", name: "Numeric ATM PIN", factor: "KNOWLEDGE", icon: "🔢", color: "text-cyan-400" },
    { id: "security_q", name: "Security Question", factor: "KNOWLEDGE", icon: "❓", color: "text-cyan-400" },
    { id: "sms_otp", name: "SMS OTP Code", factor: "POSSESSION", icon: "💬", color: "text-amber-400" },
    { id: "totp_app", name: "Software TOTP (Google Auth)", factor: "POSSESSION", icon: "📱", color: "text-indigo-400" },
    { id: "fido2_key", name: "Hardware FIDO2 YubiKey", factor: "POSSESSION", icon: "🛡️", color: "text-emerald-400" },
    { id: "fingerprint", name: "Biometric Fingerprint", factor: "INHERENCE", icon: "👆", color: "text-purple-400" },
    { id: "face_id", name: "3D Face Geometry Scan", factor: "INHERENCE", icon: "👤", color: "text-purple-400" }
  ];

  const [selectedFactorIds, setSelectedFactorIds] = useState(["password", "totp_app"]);

  const toggleFactor = (id) => {
    if (selectedFactorIds.includes(id)) {
      if (selectedFactorIds.length > 1) {
        setSelectedFactorIds(selectedFactorIds.filter((item) => item !== id));
      }
    } else {
      setSelectedFactorIds([...selectedFactorIds, id]);
    }
  };

  const mfaAssessment = useMemo(() => {
    const selected = availableFactors.filter((f) => selectedFactorIds.includes(f.id));
    const categories = new Set(selected.map((f) => f.factor));
    const isTrueMfa = categories.size >= 2;
    const hasFido = selectedFactorIds.includes("fido2_key");

    let aal = "";
    let verdict = "";
    let badgeColor = "";

    if (hasFido && isTrueMfa) {
      aal = "NIST AAL3 (High Assurance - Phishing Resistant)";
      verdict = "TRUE MFA (Fortress Tier): Cryptographic hardware key immune to AitM reverse proxy phishing.";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else if (isTrueMfa) {
      aal = "NIST AAL2 (Moderate Assurance - Standard Enterprise)";
      verdict = "TRUE MFA (Verified): Independent factor categories defeat credential stuffing and password spraying.";
      badgeColor = "bg-cyan-950 text-cyan-300 border-cyan-700";
    } else {
      aal = "NIST AAL1 (Low Assurance - Multi-Step 1FA)";
      verdict = "FLAWED: All chosen credentials belong to the same factor domain! Single-point breach risk.";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    }

    return {
      selected,
      categories: Array.from(categories),
      isTrueMfa,
      aal,
      verdict,
      badgeColor
    };
  }, [selectedFactorIds]);

  // =========================================================================
  // STUDIO 2: MFA PROMPT BOMBING (FATIGUE) & NUMBER MATCHING SIMULATOR
  // =========================================================================
  const [pushCount, setPushCount] = useState(12);
  const [hasNumberMatching, setHasNumberMatching] = useState(false);

  const fatigueResult = useMemo(() => {
    if (hasNumberMatching) {
      return {
        status: "ATTACK NEUTRALIZED 🛡️",
        compromiseRisk: "0.0%",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        explanation: "Number Matching Enforced: The victim's phone prompts for a 2-digit code displayed on the browser. Because the remote attacker cannot see the user's screen, blind approvals are completely impossible."
      };
    } else {
      if (pushCount >= 15) {
        return {
          status: "CRITICAL RISK: USER FATIGUE COMPROMISE 🚨",
          compromiseRisk: "88.5%",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
          explanation: "Victim bombarded with 15+ notification buzzes late at night. Over 80% of users tap 'Approve' to silence continuous buzzing, handing the adversary instant access."
        };
      } else if (pushCount >= 5) {
        return {
          status: "MODERATE RISK: SUSPICIOUS PROMPTS ⚠️",
          compromiseRisk: "35.0%",
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
          explanation: "Repeated push prompts generate confusion. Some users tap 'Approve' assuming a background cloud sync glitch."
        };
      } else {
        return {
          status: "LOW RISK: ISOLATED NOTIFICATION",
          compromiseRisk: "5.0%",
          badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
          explanation: "Single prompt easily recognized and denied by vigilant users."
        };
      }
    }
  }, [pushCount, hasNumberMatching]);

  // =========================================================================
  // STUDIO 3: ADAPTIVE STEP-UP MFA RISK ENGINE
  // =========================================================================
  const [transferAmount, setTransferAmount] = useState(250000); // INR
  const [isUnrecognizedDevice, setIsUnrecognizedDevice] = useState(false);
  const [isLateNightAccess, setIsLateNightAccess] = useState(false);
  const [isTorExitNode, setIsTorExitNode] = useState(false);

  const adaptiveAssessment = useMemo(() => {
    let score = 0;
    const triggers = [];

    if (transferAmount > 1000000) {
      score += 45;
      triggers.push(`High Value Disbursement (₹${transferAmount.toLocaleString('en-IN')})`);
    } else if (transferAmount > 300000) {
      score += 25;
      triggers.push(`Significant Transaction (₹${transferAmount.toLocaleString('en-IN')})`);
    }

    if (isUnrecognizedDevice) {
      score += 30;
      triggers.push("Unrecognized Device Hardware Fingerprint");
    }

    if (isLateNightAccess) {
      score += 20;
      triggers.push("Off-Hours Access (01:00 - 05:00 IST)");
    }

    if (isTorExitNode) {
      score += 50;
      triggers.push("Tor Anonymizing Proxy / High-Risk ASN");
    }

    let policyAction = "";
    let badgeColor = "";

    if (score >= 60) {
      policyAction = "HIGH RISK STEP-UP: Enforce Hardware FIDO2 Touch + Biometric Verification";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else if (score >= 25) {
      policyAction = "MODERATE RISK STEP-UP: Software TOTP Challenge Required";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
    } else {
      policyAction = "LOW RISK: Seamless Single Sign-On (SSO) Approved";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    }

    return { score, triggers, policyAction, badgeColor };
  }, [transferAmount, isUnrecognizedDevice, isLateNightAccess, isTorExitNode]);

  // =========================================================================
  // STUDIO 4: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_treasury");

  const regionalDrills = {
    barrackpore_treasury: {
      id: "barrackpore_treasury",
      title: "Barrackpore Municipal Treasury: High-Assurance AAL3 Mandate",
      location: "Municipal financial core approving vendor disbursements exceeding ₹85,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Infrastructure Architect)",
      threatScenario:
        "Adversaries launched spear-phishing campaigns mimicking state bank portals to steal clerk credentials and intercept SMS OTP codes to authorize fraudulent contractor payment batches.",
      solution:
        "Deployed FIDO2 USB Security Keys with physical touch verification (NIST AAL3) and deactivated SMS OTP completely for transactions over ₹50,000.",
      outcome:
        "100% elimination of AitM reverse-proxy phishing attacks; all treasury disbursements cryptographically verified with zero fraud losses."
    },
    kolkata_fintech_number_matching: {
      id: "kolkata_fintech_number_matching",
      title: "Salt Lake Sector V FinTech: MFA Fatigue Mitigation",
      location: "Digital payments hub processing 250,000 merchant logins daily",
      engineers: "Mahima (Lead Identity Architect) & Mamata (SOC Lead)",
      threatScenario:
        "Following an external credential dump, an automated botnet targeted 120 employees with repeated overnight push approval prompts, causing 3 accidental approvals.",
      solution:
        "Rolled out mandatory Number Matching across Microsoft Authenticator and integrated geographic location displays on push prompts.",
      outcome:
        "Accidental approvals dropped to 0.0%; botnet attack paralyzed; corporate accounts secured."
    },
    ichapur_adaptive_iam: {
      id: "ichapur_adaptive_iam",
      title: "Ichapur Ordnance Manufacturing: Adaptive Contextual Step-Up",
      location: "Critical defense engineering systems and design repositories",
      engineers: "Abhronila (Chief InfoSec Officer) & Incident Response Team",
      threatScenario:
        "Contractor credentials accessed from remote VPN connections during off-hours attempting to download restricted technical schematics.",
      solution:
        "Implemented CARTA continuous adaptive risk policies demanding biometric re-authentication whenever anomalous file download thresholds are breached.",
      outcome:
        "Unauthorized remote exfiltration attempts automatically blocked; real-time SOC incident alarms triggered within 4 seconds."
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
                <span className="px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 3
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Multi-Factor Authentication (MFA / 2FA) Fundamentals
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">SOC Location:</span>
              <span className="text-xs font-bold text-indigo-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Multi-Factor Authentication (MFA) is the primary defensive barrier neutralizing over 99.9% of automated identity attacks.
            Master the mathematical separation of <strong>Knowledge, Possession, and Inherence</strong> factors, evaluate 
            <strong>NIST SP 800-63B Authenticator Assurance Levels (AAL1–AAL3)</strong>, simulate <strong>MFA Fatigue / Prompt Bombing attacks</strong>, 
            and design <strong>Adaptive Contextual Step-Up MFA</strong> systems for high-assurance financial operations.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: TRUE MFA VS MULTI-STEP 1FA EVALUATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 1: True MFA vs Multi-Step 1FA &amp; NIST AAL Assessor
              </h2>
              <p className="text-xs text-slate-400">
                Select factor credentials to verify whether the combination satisfies mathematical True MFA and NIST SP 800-63B standards.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", mfaAssessment.badgeColor)}>
              {mfaAssessment.isTrueMfa ? "TRUE MFA VERIFIED ✔" : "FLAWED 1FA ❌"}
            </div>
          </div>

          {/* Credential Factor Selector Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Toggle Authentication Factors:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableFactors.map((factor) => {
                const isSelected = selectedFactorIds.includes(factor.id);
                return (
                  <button
                    key={factor.id}
                    onClick={() => toggleFactor(factor.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all duration-200 space-y-1",
                      isSelected
                        ? "bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{factor.icon}</span>
                      <span className={clsx("text-[9px] px-1.5 py-0.5 rounded font-bold uppercase", factor.color)}>
                        {factor.factor}
                      </span>
                    </div>
                    <div className="font-semibold text-xs text-white">{factor.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluation Banner */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-white">NIST Assurance Rating:</span>
              <span className={clsx("text-xs px-2.5 py-1 rounded-full border font-mono font-bold", mfaAssessment.badgeColor)}>
                {mfaAssessment.aal}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {mfaAssessment.verdict}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Active Factor Categories: </span>
              {mfaAssessment.categories.map((cat, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-slate-900 text-indigo-300 rounded border border-slate-700 font-mono text-[10px]">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* SVG Diagram: Factors Venn & Assurance Stack */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>MFA Architectural Pillars &amp; Independent Factor Domains</span>
              <span className="text-[10px] text-indigo-400">Semantic SVG Map</span>
            </div>
            <svg
              className="w-full h-44 bg-slate-900/50 rounded-lg p-2 overflow-visible"
              viewBox="0 0 700 160"
              aria-label="MFA Factor Domains"
            >
              {/* Factor 1: Knowledge */}
              <g transform="translate(60, 20)">
                <rect x="0" y="0" width="160" height="110" rx="10" fill="#082f49" stroke="#0284c7" strokeWidth="1.5" />
                <text x="80" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Something You KNOW</text>
                <text x="80" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle">Knowledge Factor</text>
                <text x="80" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Passwords / PINs</text>
                <text x="80" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Diceware Passphrases</text>
              </g>

              {/* Plus Sign */}
              <text x="250" y="80" fill="#818cf8" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

              {/* Factor 2: Possession */}
              <g transform="translate(270, 20)">
                <rect x="0" y="0" width="160" height="110" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="80" y="30" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">2. Something You HAVE</text>
                <text x="80" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle">Possession Factor</text>
                <text x="80" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">• FIDO2 Hardware Key</text>
                <text x="80" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Software TOTP Token</text>
              </g>

              {/* Plus Sign */}
              <text x="460" y="80" fill="#818cf8" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

              {/* Factor 3: Inherence */}
              <g transform="translate(480, 20)">
                <rect x="0" y="0" width="160" height="110" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="80" y="30" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">3. Something You ARE</text>
                <text x="80" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle">Inherence Factor</text>
                <text x="80" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">• 3D Facial Geometry</text>
                <text x="80" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Optical Fingerprint</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: MFA FATIGUE & NUMBER MATCHING SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📱</span> Studio 2: MFA Prompt Bombing (Fatigue Attack) &amp; Number Matching Defense
              </h2>
              <p className="text-xs text-slate-400">
                Observe how adversaries exploit human psychological fatigue with repeated push notifications and how Number Matching neutralizes it.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", fatigueResult.badgeColor)}>
              {fatigueResult.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Adversary Push Prompt Frequency:</span>
                  <span className="font-mono text-cyan-400">{pushCount} Prompts / Hour</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={pushCount}
                  onChange={(e) => setPushCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1 Prompt (Normal)</span>
                  <span>15 Prompts (Heavy Bombing)</span>
                  <span>30 Prompts (Extreme Fatigue)</span>
                </div>
              </div>

              {/* Number Matching Toggle */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Enforce Number Matching</div>
                  <div className="text-[11px] text-slate-400">User must enter 2-digit number shown on PC screen</div>
                </div>
                <button
                  onClick={() => setHasNumberMatching(!hasNumberMatching)}
                  className={clsx(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-colors",
                    hasNumberMatching
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  {hasNumberMatching ? "ENABLED ✔" : "DISABLED ❌"}
                </button>
              </div>
            </div>

            {/* Attack Outcome Display */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compromise Probability</span>
                <span className="font-mono text-lg font-extrabold text-rose-400">{fatigueResult.compromiseRisk}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                {fatigueResult.explanation}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: ADAPTIVE STEP-UP MFA RISK ENGINE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚡</span> Studio 3: Adaptive Contextual Step-Up MFA Engine
              </h2>
              <p className="text-xs text-slate-400">
                Simulate risk-based authentication triggers for high-value banking and municipal disbursements in Indian Rupees (₹).
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", adaptiveAssessment.badgeColor)}>
              Risk Score: {adaptiveAssessment.score}/100
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Disbursement Amount:</span>
                  <span className="font-mono text-emerald-400">₹{transferAmount.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="5000000"
                  step="50000"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <span>Unrecognized New Device Hardware</span>
                  <input
                    type="checkbox"
                    checked={isUnrecognizedDevice}
                    onChange={(e) => setIsUnrecognizedDevice(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <span>Off-Hours Session (01:00 AM - 05:00 AM IST)</span>
                  <input
                    type="checkbox"
                    checked={isLateNightAccess}
                    onChange={(e) => setIsLateNightAccess(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <span>Tor Anonymizer / High-Risk IP Origin</span>
                  <input
                    type="checkbox"
                    checked={isTorExitNode}
                    onChange={(e) => setIsTorExitNode(e.target.checked)}
                    className="accent-rose-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Assessment Decision */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Adaptive Policy Enforcement Decision
                </span>
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 text-xs md:text-sm font-semibold text-white">
                  {adaptiveAssessment.policyAction}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Active Risk Triggers:</span>
                  {adaptiveAssessment.triggers.length > 0 ? (
                    <ul className="space-y-1 text-xs text-amber-300">
                      {adaptiveAssessment.triggers.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span>•</span> {t}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-slate-500">Zero anomalous risk indicators detected.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 4: Regional SOC Incident Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of high-assurance MFA deployments and incident mitigation across regional infrastructure.
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
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_treasury" ? "Barrackpore Treasury" : key === "kolkata_fintech_number_matching" ? "Kolkata FinTech" : "Ichapur Adaptive IAM"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-indigo-400 font-mono bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
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
                <span className="font-bold text-indigo-400 uppercase text-[10px] tracking-wider block">Architectural Defense</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Forensic Outcome</span>
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
              <span>⚠️</span> Common Pitfalls &amp; Misconceptions
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Conflating Multi-Step with Multi-Factor:</strong> Requiring Password + PIN is 1FA (both are Knowledge factors) and vulnerable to single-point phishing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Relying on SMS OTP for High-Value Operations:</strong> SMS is unencrypted and trivially intercepted via SIM swapping and SS7 routing flaws.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring MFA Fatigue Attacks:</strong> Using simple push notifications without Number Matching allows attackers to prompt-bomb victims until they tap Approve.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Best Practices &amp; NIST Guidelines
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mandate FIDO2 Hardware Keys (AAL3):</strong> Origin-bound public-key cryptography provides 100% immunity against AitM reverse-proxy phishing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Number Matching &amp; Context Prompts:</strong> Require users to enter on-screen numbers into authenticator apps along with location metadata.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Continuous Adaptive Risk (CARTA):</strong> Continuously re-evaluate session risk and trigger Step-Up MFA on anomalous behavior.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300">Think About:</span>
              <p className="leading-relaxed">
                Why does an Evilginx reverse proxy fail against FIDO2 WebAuthn keys? Because the browser cryptographically binds the authentication signature to the exact domain in the URL bar (`bank.com`), causing the phishing server (`evil-bank.net`) to produce an invalid signature!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>True MFA mathematically requires $\ge 2$ independent factor domains.</li>
                <li>NIST AAL1 = 1FA, AAL2 = Software MFA, AAL3 = Hardware Phishing-Resistant MFA.</li>
                <li>Number Matching eliminates MFA prompt-bombing fatigue attacks.</li>
                <li>Adaptive MFA calculates risk scores before triggering Step-Up challenges.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on MFA Orchestration &amp; Fatigue Engine Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating NIST AAL assessments, MFA prompt bombing, and adaptive step-up risk calculations
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={mfaEnginePy}
            title="mfa_orchestration_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Multi-Factor Authentication (MFA / 2FA) Fundamentals FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Clearly define the three independent authentication factor domains (Knowledge, Possession, Inherence). Highlight why Password + PIN is NOT True 2FA. Be ready to explain NIST SP 800-63B Authenticator Assurance Levels (AAL1, AAL2, AAL3) and why FIDO2 cryptographic origin binding provides phishing resistance against Adversary-in-the-Middle (AitM) reverse proxies."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Multi-Factor Authentication Fundamentals Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 3 Note"
            downloadFileName="topic3_mfa_fundamentals_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
