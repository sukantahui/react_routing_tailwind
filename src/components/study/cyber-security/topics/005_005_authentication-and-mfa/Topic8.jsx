import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import fido2EnginePy from "./topic8_files/fido2_webauthn_verifier.py?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgFidoId = useId();
  const svgOriginId = useId();

  // =========================================================================
  // STUDIO 1: WEBAUTHN & CTAP2 INTERACTIVE HANDSHAKE SIMULATOR
  // =========================================================================
  const [authStep, setAuthStep] = useState("auth"); // "registration", "auth"
  const [hasTouchedKey, setHasTouchedKey] = useState(true);
  const [hasEnteredPin, setHasEnteredPin] = useState(true);

  const handshakeDetails = useMemo(() => {
    if (authStep === "registration") {
      return {
        title: "WebAuthn Registration Phase (navigator.credentials.create)",
        apiCall: "navigator.credentials.create({ publicKey: creationOptions })",
        challenge: "a9f3b7c2e810d456...",
        rpId: "bank.barrackpore.gov.in",
        authenticatorAction: "Generates unique ECDSA P-256 keypair bound strictly to rp.id.",
        result: "Public Key & Attestation stored on server. Private Key remains locked in hardware chip.",
        badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
      };
    } else {
      let status = "";
      let color = "";
      if (!hasTouchedKey) {
        status = "USER PRESENCE FAILED ❌: Key was not physically touched.";
        color = "bg-rose-950 text-rose-300 border-rose-700";
      } else if (!hasEnteredPin) {
        status = "USER VERIFICATION FAILED ❌: Hardware PIN / Biometric was not provided.";
        color = "bg-amber-950 text-amber-300 border-amber-700";
      } else {
        status = "AUTHENTICATION SUCCESS ✔: Phishing-resistant cryptographic signature verified (NIST AAL3).";
        color = "bg-emerald-950 text-emerald-300 border-emerald-700";
      }

      return {
        title: "WebAuthn Authentication Phase (navigator.credentials.get)",
        apiCall: "navigator.credentials.get({ publicKey: requestOptions })",
        challenge: "7c18b4e09f3a2d11...",
        rpId: "bank.barrackpore.gov.in",
        authenticatorAction: "Signs (authenticatorData || clientDataHash) using hardware private key.",
        result: status,
        badgeColor: color
      };
    }
  }, [authStep, hasTouchedKey, hasEnteredPin]);

  // =========================================================================
  // STUDIO 2: EVILGINX PHISHING PROXY NEUTRALIZATION SIMULATOR
  // =========================================================================
  const [activeDomain, setActiveDomain] = useState("legitimate"); // "legitimate", "phishing"

  const phishingScenario = useMemo(() => {
    if (activeDomain === "legitimate") {
      return {
        url: "https://bank.barrackpore.gov.in",
        originCalculated: "https://bank.barrackpore.gov.in",
        expectedOrigin: "https://bank.barrackpore.gov.in",
        isMatch: true,
        verdict: "SIGNATURE VERIFIED ✔ (Access Granted)",
        explanation: "Browser origin matches Relying Party ID. Cryptographic public-key assertion passes seamlessly.",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    } else {
      return {
        url: "https://bank.barrackpore-fake.net",
        originCalculated: "https://bank.barrackpore-fake.net",
        expectedOrigin: "https://bank.barrackpore.gov.in",
        isMatch: false,
        verdict: "PHISHING ATTACK THWARTED 🚨 (Signature Rejected)",
        explanation: "Hardware key signed the fake proxy origin. When relayed to the real bank, the origin hash mismatch causes cryptographic verification to fail completely!",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
      };
    }
  }, [activeDomain]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_yubikey");

  const regionalDrills = {
    barrackpore_yubikey: {
      id: "barrackpore_yubikey",
      title: "Barrackpore Municipal Treasury: Enterprise FIDO2 Mandate",
      location: "Financial disbursement core approving monthly disbursements of ₹85,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Spear-phishing emails mimicked the state treasury portal with reverse proxies, attempting to bypass password and SMS OTP authentication.",
      solution:
        "Mandated YubiKey 5 NFC hardware security keys for all 350 treasury employees; enforced WebAuthn with mandatory User Verification (FIDO PIN).",
      outcome:
        "100% elimination of phishing compromise; achieved NIST SP 800-63B AAL3 certification across all municipal operations."
    },
    kolkata_fintech_pci: {
      id: "kolkata_fintech_pci",
      title: "Salt Lake Sector V FinTech: Passwordless WebAuthn Migration",
      location: "Core payment gateway microservices managing 120,000 daily transactions",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Adversaries attempted credential stuffing against employee SSH and cloud administrative consoles using leaked breach databases.",
      solution:
        "Deactivated static passwords and SMS OTPs entirely; integrated FIDO2 WebAuthn for browser SSO and FIDO-backed SSH keys (`ed25519-sk`).",
      outcome:
        "Zero credential-stuffing vulnerability; certified PCI-DSS 4.0 requirement 8.3 compliance."
    },
    ichapur_defense_fips: {
      id: "ichapur_defense_fips",
      title: "Ichapur Ordnance Manufacturing: FIPS 140-2 Hardware Token Enforcement",
      location: "High-security defense manufacturing CAD repositories and machine controllers",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Contractor USB devices tested uncertified software emulators to forge authentication assertions on engineering networks.",
      solution:
        "Configured WebAuthn Enterprise Attestation, restricting registration strictly to verified YubiKey 5 FIPS AAGUID hardware serials.",
      outcome:
        "Rogue software authenticators completely blocked at enrollment; guaranteed tamper-resistant hardware key execution."
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
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 8
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Hardware Security Keys: FIDO2, WebAuthn &amp; U2F Standards
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            FIDO2 and W3C WebAuthn represent the gold standard in modern identity security, providing 100% mathematical immunity against phishing and credential theft.
            Master the cryptographic mechanics of <strong>Public Key Attestation and Assertion</strong>, analyze 
            <strong>CTAP2 User Presence (UP) and User Verification (UV) flags</strong>, explore <strong>Cryptographic Origin Binding</strong> 
            that stops Evilginx reverse proxies, and examine enterprise hardware key rollouts.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: WEBAUTHN & CTAP2 HANDSHAKE SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔑</span> Studio 1: W3C WebAuthn &amp; CTAP2 Protocol Handshake Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between Registration and Authentication flows and observe how CTAP2 hardware tokens verify physical touch and PIN.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAuthStep("registration")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  authStep === "registration"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                1. Registration Phase
              </button>
              <button
                onClick={() => setAuthStep("auth")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  authStep === "auth"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                2. Authentication Phase
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Hardware Token Card */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Hardware Security Token</span>
                <div className="text-sm font-bold text-white">Yubico YubiKey 5 NFC</div>
              </div>

              {/* Visual Key Graphic */}
              <div className="w-28 h-40 bg-slate-900 rounded-2xl border-2 border-emerald-500/50 p-3 flex flex-col justify-between items-center shadow-lg shadow-emerald-950/40">
                <div className="w-6 h-6 rounded-full border border-slate-700 bg-slate-800" />
                <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 bg-amber-950/40 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <div className="text-[9px] font-mono text-emerald-400 font-bold">FIDO2 AAL3</div>
              </div>

              {authStep === "auth" && (
                <div className="space-y-2 w-full text-xs">
                  <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                    <span>Physical Contact Touch (UP)</span>
                    <input
                      type="checkbox"
                      checked={hasTouchedKey}
                      onChange={(e) => setHasTouchedKey(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                    <span>Hardware FIDO PIN (UV)</span>
                    <input
                      type="checkbox"
                      checked={hasEnteredPin}
                      onChange={(e) => setHasEnteredPin(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Protocol Data Breakdown */}
            <div className="md:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{handshakeDetails.title}</span>
                <span className={clsx("px-2.5 py-0.5 rounded-full border font-mono font-bold text-[10px]", handshakeDetails.badgeColor)}>
                  NIST AAL3
                </span>
              </div>

              <div className="space-y-2.5 text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Browser JavaScript API Call:</span>
                  <span className="font-mono text-cyan-300 text-[11px] block mt-0.5">{handshakeDetails.apiCall}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 font-semibold block">Relying Party ID (RP ID):</span>
                    <span className="font-mono text-white text-[11px]">{handshakeDetails.rpId}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 font-semibold block">Cryptographic Challenge:</span>
                    <span className="font-mono text-white text-[11px]">{handshakeDetails.challenge}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">CTAP2 Authenticator Operation:</span>
                  <span className="text-slate-200">{handshakeDetails.authenticatorAction}</span>
                </div>

                <div className={clsx("p-3 rounded-lg border font-semibold text-xs", handshakeDetails.badgeColor)}>
                  {handshakeDetails.result}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: EVILGINX PHISHING PROXY NEUTRALIZATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 2: Cryptographic Origin Binding vs Evilginx AitM Phishing
              </h2>
              <p className="text-xs text-slate-400">
                Observe how the browser's cryptographic origin binding defeats reverse-proxy phishing attacks automatically.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDomain("legitimate")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  activeDomain === "legitimate"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                1. Legitimate Bank Portal
              </button>
              <button
                onClick={() => setActiveDomain("phishing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  activeDomain === "phishing"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                2. Evilginx Phishing Proxy ⚠️
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">Browser URL Bar: <span className="font-mono text-cyan-300">{phishingScenario.url}</span></span>
              <span className={clsx("px-2.5 py-1 rounded-full border font-bold text-xs", phishingScenario.badgeColor)}>
                {phishingScenario.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">ClientDataJSON Origin Signed by Key:</span>
                <div className="font-mono text-white text-xs">{phishingScenario.originCalculated}</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Real Bank Server Expected Origin:</span>
                <div className="font-mono text-white text-xs">{phishingScenario.expectedOrigin}</div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-xs md:text-sm">
              {phishingScenario.explanation}
            </p>
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
                Case studies of hardware security key deployments across critical state infrastructure.
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_yubikey" ? "Barrackpore YubiKey" : key === "kolkata_fintech_pci" ? "Kolkata FinTech WebAuthn" : "Ichapur FIPS Keys"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
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
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">FIDO2 Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Measurable Outcome</span>
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
              <span>⚠️</span> Common Pitfalls &amp; Deployment Errors
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Maintaining Legacy Password/SMS Fallback:</strong> If a user can click "Try SMS OTP instead", the entire phishing resistance of FIDO2 is defeated!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Signature Counter Regression:</strong> Failing to verify that `signCount` increases monotonically allows cloned software keys to operate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Enrolling Only a Single Key per User:</strong> When an employee misplaces their single key, emergency recovery becomes an administrative nightmare.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> FIDO2 Engineering Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mandate Dual Hardware Key Enrollment:</strong> Require employees to register a Primary key and a Backup key stored in a safe.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce User Verification (PIN/Biometric):</strong> Set `userVerification: 'required'` to ensure stolen physical keys cannot be used without a local PIN.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Check Attestation AAGUID for Enterprise Fleets:</strong> Restrict registration strictly to certified FIPS 140-2 hardware models.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Think About:</span>
              <p className="leading-relaxed">
                Why does FIDO2 eliminate credential database breaches? Because the server only stores Public Keys! Even if an SQL injection dumps the entire user table, the stolen public keys cannot sign login challenges!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>FIDO2 = W3C WebAuthn (Browser API) + FIDO CTAP2 (Hardware Protocol).</li>
                <li>Cryptographic Origin Binding makes reverse-proxy phishing mathematically impossible.</li>
                <li>CTAP2 Flag UP = User Presence (Touch), UV = User Verification (PIN/Biometric).</li>
                <li>Signature Counter (`signCount`) detects cloned hardware authenticators.</li>
                <li>NIST SP 800-63B rates FIDO2 hardware keys at the highest AAL3 level.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on FIDO2 WebAuthn Cryptographic Verifier Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating WebAuthn registration, public key attestation, UP/UV flags, and origin-bound phishing defense
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={fido2EnginePy}
            title="fido2_webauthn_verifier.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Hardware Security Keys (FIDO2 &amp; WebAuthn) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the two foundational pillars of FIDO2 (W3C WebAuthn browser API and FIDO CTAP2 protocol). Explain how Cryptographic Origin Binding completely defeats Adversary-in-the-Middle (AitM) reverse proxies like Evilginx. Detail the role of CTAP2 User Presence (UP - touch) and User Verification (UV - PIN/Biometric) flags and why the server stores only Public Keys."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 8: FIDO2 & WebAuthn Security Standards Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 8 Note"
            downloadFileName="topic8_fido2_webauthn_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
