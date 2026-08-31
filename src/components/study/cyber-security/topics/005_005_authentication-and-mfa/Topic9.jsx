import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import passkeyEnginePy from "./topic9_files/passkey_sync_authenticator.py?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgCableId = useId();
  const svgSyncId = useId();

  // =========================================================================
  // STUDIO 1: PASSKEY CREATION & BACKUP FLAGS ASSESSOR
  // =========================================================================
  const [passkeyType, setPasskeyType] = useState("synced"); // "synced", "device_bound"

  const passkeySpecs = useMemo(() => {
    if (passkeyType === "synced") {
      return {
        name: "Multi-Device Passkey (Synced Passkey)",
        storage: "Apple iCloud Keychain / Google Password Manager (E2EE)",
        beFlag: "BE = 1 (Backup Eligible)",
        bsFlag: "BS = 1 (Backed Up to Cloud)",
        exportability: "Synced across user's trusted personal devices",
        targetUse: "Consumer web portals, banking apps, municipal public portals",
        recovery: "Seamless recovery on new phone via master cloud account",
        badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
      };
    } else {
      return {
        name: "Single-Device Passkey (Device-Bound Passkey)",
        storage: "Hardware Security Chip (YubiKey 5 NFC / Platform TPM)",
        beFlag: "BE = 0 (Non-Exportable)",
        bsFlag: "BS = 0 (Never Cloud Synced)",
        exportability: "Private key permanently locked inside physical chip",
        targetUse: "High-security banking treasury, national defense, root infrastructure",
        recovery: "Requires pre-enrolled backup physical hardware key or admin recovery",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    }
  }, [passkeyType]);

  // =========================================================================
  // STUDIO 2: FIDO HYBRID CROSS-DEVICE (caBLE) SANDBOX
  // =========================================================================
  const [bleProximity, setBleProximity] = useState(true);
  const [isQrScanned, setIsQrScanned] = useState(true);

  const hybridResult = useMemo(() => {
    if (!isQrScanned) {
      return {
        status: "WAITING FOR SCAN ⏳",
        badgeColor: "bg-slate-800 text-slate-400 border-slate-700",
        desc: "Desktop browser displays ephemeral WebAuthn QR code. Waiting for user's smartphone camera scan."
      };
    }
    if (!bleProximity) {
      return {
        status: "PROXIMITY CHECK FAILED 🚨 (Relay Attack Blocked)",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        desc: "Bluetooth Low Energy (BLE) beacon was not detected between PC and phone. Remote adversary phishing relay thwarted!"
      };
    }
    return {
      status: "CROSS-DEVICE SESSION VERIFIED ✔ (NIST AAL3)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      desc: "BLE proximity confirmed (< 10m). Encrypted AES-256-GCM tunnel established. Biometric unlock on smartphone authorizes desktop login."
    };
  }, [bleProximity, isQrScanned]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_grievance");

  const regionalDrills = {
    barrackpore_grievance: {
      id: "barrackpore_grievance",
      title: "Barrackpore Municipal Grievance Portal: Citizen Passkey Rollout",
      location: "Public municipal grievance and water tax utility portal serving 150,000 citizens",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Citizens frequently forgot complex passwords, overwhelming municipal support counters with password reset requests and falling victim to phone-call social engineering.",
      solution:
        "Integrated W3C WebAuthn synced passkeys supporting Touch ID, Face ID, and Android biometrics with Conditional UI autofill.",
      outcome:
        "Password reset helpdesk tickets dropped by 92%; average citizen login time reduced from 28 seconds to 400 milliseconds; zero account takeovers."
    },
    kolkata_fintech_devcloud: {
      id: "kolkata_fintech_devcloud",
      title: "Salt Lake Sector V FinTech: Passwordless Cloud Infrastructure",
      location: "High-volume payment gateway developer console and Kubernetes clusters",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Adversaries attempted credential stuffing against engineer SSH and cloud consoles using leaked dark web databases.",
      solution:
        "Enforced Device-Bound passkeys on hardware YubiKeys (NIST AAL3) for all cloud console logins and FIDO-backed SSH keys (`ed25519-sk`).",
      outcome:
        "Zero credential-stuffing vulnerability; 100% compliance with Zero Trust Architecture (NIST SP 800-207) and PCI-DSS 4.0."
    },
    ichapur_defense_device_bound: {
      id: "ichapur_defense_device_bound",
      title: "Ichapur Defense Facility: Air-Gapped Device-Bound Passkey Mandate",
      location: "Air-gapped defense manufacturing CAD repositories and machinery controllers",
      engineers: "Abhronila (CISO) & Incident Response Team",
      threatScenario:
        "Contractors attempted to use consumer cloud-synced passkeys on personal phones, creating potential cloud credential exfiltration pathways.",
      solution:
        "Configured relying party policies inspecting CTAP2 `BE` and `BS` flags, rejecting any credential with `BE=1` and permitting only FIPS 140-2 certified hardware keys.",
      outcome:
        "Guaranteed 100% air-gapped non-exportable cryptographic execution; zero cloud key leakage."
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
                <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 9
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Passwordless Authentication &amp; Passkeys
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Passkeys represent the definitive future of digital identity, replacing fragile shared secrets with consumer-friendly public-key cryptography.
            Master the difference between <strong>Multi-Device (Synced) Passkeys</strong> and <strong>Single-Device (Device-Bound) Passkeys</strong>, 
            inspect CTAP2 <strong>Backup Eligibility (BE) and Backup State (BS) flags</strong>, explore <strong>FIDO Hybrid Transport (caBLE / QR codes)</strong> 
            with Bluetooth Low Energy proximity proofs, and evaluate enterprise Zero Trust migrations.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: PASSKEY CREATION & BACKUP FLAGS ASSESSOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔐</span> Studio 1: Passkey Architecture &amp; CTAP2 Backup Flags (BE &amp; BS)
              </h2>
              <p className="text-xs text-slate-400">
                Compare Synced Consumer Passkeys vs Hardware Device-Bound Passkeys and observe how relying parties enforce compliance.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPasskeyType("synced")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  passkeyType === "synced"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                1. Synced Passkey (Consumer)
              </button>
              <button
                onClick={() => setPasskeyType("device_bound")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  passkeyType === "device_bound"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                2. Device-Bound (Enterprise)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white">{passkeySpecs.name}</span>
              <span className={clsx("px-2.5 py-1 rounded-full border font-bold text-xs", passkeySpecs.badgeColor)}>
                {passkeyType === "synced" ? "Multi-Device E2EE Sync" : "Non-Exportable Hardware"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Storage Medium</span>
                <span className="text-slate-200">{passkeySpecs.storage}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">CTAP2 Flags</span>
                <span className="font-mono text-cyan-300 font-bold">{passkeySpecs.beFlag} | {passkeySpecs.bsFlag}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Key Exportability</span>
                <span className="text-slate-200">{passkeySpecs.exportability}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Lost Device Recovery</span>
                <span className="text-emerald-300">{passkeySpecs.recovery}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
              <strong className="text-white">Target Operational Use Case: </strong>
              {passkeySpecs.targetUse}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: FIDO HYBRID CROSS-DEVICE (caBLE) SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📱</span> Studio 2: FIDO Cross-Device Authentication (caBLE / QR Code)
              </h2>
              <p className="text-xs text-slate-400">
                Simulate logging into an untrusted desktop computer using your smartphone's biometric passkey over Bluetooth Low Energy.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", hybridResult.badgeColor)}>
              {hybridResult.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Cross-Device Physical &amp; Radio Controls
              </span>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Smartphone Scanned Desktop QR Code</div>
                  <div className="text-[10px] text-slate-400">Transfers ephemeral tunnel public key and session routing ID</div>
                </div>
                <input
                  type="checkbox"
                  checked={isQrScanned}
                  onChange={(e) => setIsQrScanned(e.target.checked)}
                  className="accent-cyan-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Bluetooth Low Energy (BLE) Proximity Verified</div>
                  <div className="text-[10px] text-slate-400">Guarantees phone and PC are physically in the same room (&lt; 10m)</div>
                </div>
                <input
                  type="checkbox"
                  checked={bleProximity}
                  onChange={(e) => setBleProximity(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Cross-Device Tunnel Verification
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {hybridResult.desc}
                </p>
                <div className="text-[11px] text-slate-400">
                  <strong>Security Guarantee: </strong> BLE radio signals cannot penetrate over long distances, making remote QR code forwarding phishing attacks mathematically impossible.
                </div>
              </div>
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
                Case studies of passwordless passkey migrations across municipal and defense infrastructure.
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
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_grievance" ? "Barrackpore Grievance" : key === "kolkata_fintech_devcloud" ? "Kolkata FinTech Cloud" : "Ichapur Defense Passkeys"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Operational Threat</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Passkey Architecture</span>
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
                <span><strong>Allowing Password Fallback after Passkey Enrollment:</strong> Leaving a "Sign in with password" button preserves 100% of credential stuffing vulnerability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Permitting Synced Passkeys in Air-Gapped Environments:</strong> Failing to check `BE=0` allows employees to sync corporate keys to personal consumer clouds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Omitting User Verification (UV):</strong> Setting `userVerification: 'discouraged'` allows an unlocked phone to authenticate without a biometric scan.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Passkey Deployment Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Passkey-Only Authentication:</strong> Disable password and SMS OTP channels completely once a user enrolls a passkey.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Conditional UI Autofill:</strong> Add `autocomplete='username webauthn'` to login inputs for seamless single-tap authentication.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Mandatory User Verification:</strong> Set `userVerification: 'required'` to demand biometrics on every authentication.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why are passkeys considered Multi-Factor within a single tap? Because tapping your phone provides Possession (hardware chip) and Inherence (Face ID biometric) simultaneously in under 400 milliseconds!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Passkeys are discoverable FIDO2/WebAuthn public-key credentials.</li>
                <li>Synced Passkeys replicate across iCloud/Google using End-to-End Encryption.</li>
                <li>Device-Bound Passkeys (`BE=0`, `BS=0`) remain locked to hardware chips.</li>
                <li>FIDO caBLE Hybrid transport uses BLE to verify physical proximity (under 10m).</li>
                <li>Conditional UI enables single-tap login from username input fields.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Passkey Sync &amp; caBLE Hybrid Authenticator Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating Synced vs Device-Bound passkeys, CTAP2 BE/BS flags, and caBLE BLE proximity checks
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={passkeyEnginePy}
            title="passkey_sync_authenticator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Passwordless Authentication &amp; Passkeys FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the technical definition of a Passkey (discoverable FIDO2 WebAuthn credential). Contrast Multi-Device Synced Passkeys (E2EE cloud backup) with Single-Device Device-Bound Passkeys (hardware YubiKeys) using CTAP2 Backup Eligibility (BE) and Backup State (BS) flags. Explain how FIDO Cross-Device Authentication (caBLE) uses Bluetooth Low Energy (BLE) proximity to thwart remote QR code phishing attacks."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 9: Passwordless Authentication & Passkeys Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 9 Note"
            downloadFileName="topic9_passwordless_passkeys_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
