import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import ssoEnginePy from "./topic10_files/sso_identity_protocols.py?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgPkceId = useId();
  const svgJwtId = useId();

  // =========================================================================
  // STUDIO 1: OAUTH 2.0 / OIDC PKCE FLOW SIMULATOR (RFC 7636)
  // =========================================================================
  const [pkceStep, setPkceStep] = useState(1); // Steps 1 to 4

  const pkceSteps = [
    {
      step: 1,
      title: "1. Client Generates PKCE Parameters",
      actor: "Client SPA / Mobile App",
      action: "Generates high-entropy code_verifier ('d8f9a2b4...') and computes SHA-256 code_challenge ('7xK9mP...').",
      paramDesc: "code_challenge = BASE64URL(SHA-256(code_verifier)) with method S256."
    },
    {
      step: 2,
      title: "2. Authorization Request with Code Challenge",
      actor: "Browser ➔ IdP /authorize",
      action: "Redirects user to Identity Provider with client_id, response_type=code, scope=openid, and code_challenge.",
      paramDesc: "The raw code_verifier stays secret in client memory!"
    },
    {
      step: 3,
      title: "3. IdP Returns Ephemeral Authorization Code",
      actor: "IdP ➔ Browser Redirect",
      action: "User authenticates; IdP issues short-lived authorization_code ('auth_code_99182') bound to the stored challenge.",
      paramDesc: "Even if an attacker intercepts this code, they cannot redeem it without the secret verifier."
    },
    {
      step: 4,
      title: "4. Token Redemption & Cryptographic Proof",
      actor: "Client ➔ IdP /token",
      action: "Client sends authorization_code + code_verifier. IdP hashes the verifier and verifies match before issuing ID Token & Access Token.",
      paramDesc: "100% immune to authorization code injection and interception!"
    }
  ];

  const currentPkce = pkceSteps[pkceStep - 1] || pkceSteps[0];

  // =========================================================================
  // STUDIO 2: JWT STRUCTURE & SIGNATURE TAMPERING SANDBOX
  // =========================================================================
  const [isTampered, setIsTampered] = useState(false);
  const [selectedAlg, setSelectedAlg] = useState("RS256"); // "RS256", "none"

  const jwtInspection = useMemo(() => {
    let role = isTampered ? "GLOBAL_SUPER_ADMIN" : "TREASURY_OFFICER";
    let status = "";
    let badgeColor = "";
    let reason = "";

    if (selectedAlg === "none") {
      status = "CRITICAL VULNERABILITY: UNPROTECTED 'alg: none' TOKEN 🚨";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      reason = "Attacker stripped the signature and set alg to 'none'. Strict servers must reject unsigned tokens unconditionally.";
    } else if (isTampered) {
      status = "SIGNATURE VERIFICATION FAILED 🚨 (Tampering Detected)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      reason = "Payload claims were modified from 'TREASURY_OFFICER' to 'GLOBAL_SUPER_ADMIN'. The cryptographic signature mismatch causes immediate rejection.";
    } else {
      status = "JWT INTEGRITY & CLAIMS VERIFIED ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      reason = "Cryptographic signature matches header and payload bytes perfectly. Claims are authentic.";
    }

    return { role, status, badgeColor, reason };
  }, [isTampered, selectedAlg]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_saml_xsw");

  const regionalDrills = {
    barrackpore_saml_xsw: {
      id: "barrackpore_saml_xsw",
      title: "Barrackpore Municipal Treasury: SAML XML Signature Wrapping (XSW)",
      location: "Municipal vendor portal managing vendor invoices of ₹1,20,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Forensic Analyst)",
      threatScenario:
        "Penetration testing identified an XML Signature Wrapping (XSW) flaw where an attacker could duplicate the signed Assertion and inject a rogue admin Assertion to approve unauthorized invoices.",
      solution:
        "Replaced vulnerable XML DOM parser with strict XML Schema validator enforcing reference ID anchoring, and migrated modern vendor apps to OIDC PKCE.",
      outcome:
        "100% mitigation of XML signature manipulation; zero unauthorized invoice approvals."
    },
    kolkata_fintech_pkce: {
      id: "kolkata_fintech_pkce",
      title: "Salt Lake Sector V FinTech: OAuth 2.0 PKCE Hardening",
      location: "Mobile payment microservices processing 250,000 daily consumer transactions",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Malicious mobile apps on Android devices registered custom URI schemes to intercept OAuth authorization codes.",
      solution:
        "Mandated RFC 7636 PKCE S256 method across all mobile clients and deprecated the legacy Implicit Grant (`response_type=token`).",
      outcome:
        "Interception of authorization codes became completely useless to adversaries; achieved PCI-DSS 4.0 requirement 8 compliance."
    },
    ichapur_defense_caep: {
      id: "ichapur_defense_caep",
      title: "Ichapur Ordnance Manufacturing: CAEP Real-Time Session Revocation",
      location: "Critical defense engineering terminals and manufacturing controllers",
      engineers: "Abhronila (CISO) & Incident Response Team",
      threatScenario:
        "When an engineer's device was flagged as infected with malware, active OAuth access tokens remained valid until natural expiration (60 minutes).",
      solution:
        "Deployed Continuous Access Evaluation Protocol (CAEP / Shared Signals), broadcasting instant session revocation events to all microservices within 200ms of threat detection.",
      outcome:
        "Eliminated the token expiration vulnerability window; immediate lockdown of compromised sessions across all defense microservices."
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
                <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 10
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Single Sign-On (SSO) &amp; Identity Protocols: SAML, OAuth 2.0 &amp; OpenID Connect
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Federated identity protocols form the backbone of modern enterprise Single Sign-On and cloud security.
            Dissect the architectural distinctions between <strong>SAML 2.0</strong>, <strong>OAuth 2.0 (Authorization)</strong>, and 
            <strong>OpenID Connect 1.0 (Identity/Authentication)</strong>. Master the <strong>Authorization Code Flow with PKCE (RFC 7636)</strong>, 
            inspect <strong>JSON Web Token (JWT) claims</strong>, and analyze vulnerabilities including <strong>XML Signature Wrapping (XSW)</strong> 
            and <strong>JWT algorithm confusion</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: OAUTH 2.0 / OIDC PKCE FLOW SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔄</span> Studio 1: OAuth 2.0 / OIDC Authorization Code Flow with PKCE (RFC 7636)
              </h2>
              <p className="text-xs text-slate-400">
                Step through how Proof Key for Code Exchange (PKCE) prevents authorization code interception on mobile and single-page apps.
              </p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((stepNum) => (
                <button
                  key={stepNum}
                  onClick={() => setPkceStep(stepNum)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    pkceStep === stepNum
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  Step {stepNum}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white">{currentPkce.title}</span>
              <span className="text-xs font-mono text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                Actor: {currentPkce.actor}
              </span>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-200 font-semibold leading-relaxed">
                {currentPkce.action}
              </div>
              <div className="text-[11px] text-cyan-300 font-mono">
                {currentPkce.paramDesc}
              </div>
            </div>

            {/* Semantic SVG Representation for PKCE */}
            <div className="pt-2">
              <svg
                className="w-full h-32 bg-slate-900/60 rounded-xl p-2"
                viewBox="0 0 700 100"
                aria-label="PKCE Flow Diagram"
              >
                {/* Node 1: Client SPA */}
                <rect x="30" y="20" width="160" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="110" y="45" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Client App (SPA / Mobile)</text>
                <text x="110" y="62" fill="#94a3b8" fontSize="8" textAnchor="middle">Holds secret code_verifier</text>

                {/* Arrow 1 */}
                <path d="M 195 50 L 295 50" stroke={pkceStep >= 2 ? "#f59e0b" : "#475569"} strokeWidth="2" />
                <polygon points="295,47 305,50 295,53" fill={pkceStep >= 2 ? "#f59e0b" : "#475569"} />

                {/* Node 2: Identity Provider (IdP) */}
                <rect x="310" y="20" width="170" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="395" y="45" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">IdP Auth Server</text>
                <text x="395" y="62" fill="#94a3b8" fontSize="8" textAnchor="middle">Stores code_challenge</text>

                {/* Arrow 2 */}
                <path d="M 485 50 L 585 50" stroke={pkceStep >= 4 ? "#10b981" : "#475569"} strokeWidth="2" />
                <polygon points="585,47 595,50 585,53" fill={pkceStep >= 4 ? "#10b981" : "#475569"} />

                {/* Node 3: Resource API */}
                <rect x="600" y="20" width="80" height="60" rx="8" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                <text x="640" y="45" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">API Server</text>
                <text x="640" y="62" fill="#94a3b8" fontSize="8" textAnchor="middle">Accepts JWT</text>
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: JWT STRUCTURE & SIGNATURE TAMPERING SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 2: JSON Web Token (JWT) Structure &amp; Tampering Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Inspect JWT Header, Payload, and Signature. Toggle payload claims tampering and algorithm switching to observe verification results.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", jwtInspection.badgeColor)}>
              {jwtInspection.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Adversary Simulation Toggles
              </span>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Tamper Role Claim in Payload</div>
                  <div className="text-[10px] text-slate-400">Escalate role from 'TREASURY_OFFICER' to 'GLOBAL_SUPER_ADMIN'</div>
                </div>
                <input
                  type="checkbox"
                  checked={isTampered}
                  onChange={(e) => setIsTampered(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <span className="font-semibold text-white block">Signing Algorithm (alg Header):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAlg("RS256")}
                    className={clsx(
                      "px-3 py-1 rounded text-xs font-bold transition-all",
                      selectedAlg === "RS256"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    RS256 (RSA Signature ✔)
                  </button>
                  <button
                    onClick={() => setSelectedAlg("none")}
                    className={clsx(
                      "px-3 py-1 rounded text-xs font-bold transition-all",
                      selectedAlg === "none"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    alg: none (Exploit Attack 🚨)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2 font-mono">
                <div className="p-2 bg-slate-900 rounded border border-indigo-800/40 text-indigo-300">
                  <span className="text-slate-500 font-bold block text-[10px]">1. Header (Red/Purple):</span>
                  {`{"alg": "${selectedAlg}", "typ": "JWT"}`}
                </div>
                <div className="p-2 bg-slate-900 rounded border border-cyan-800/40 text-cyan-300">
                  <span className="text-slate-500 font-bold block text-[10px]">2. Payload (Cyan):</span>
                  {`{"sub": "usr_10482", "role": "${jwtInspection.role}", "iss": "barrackpore.gov.in"}`}
                </div>
                <div className="p-2 bg-slate-900 rounded border border-emerald-800/40 text-emerald-300">
                  <span className="text-slate-500 font-bold block text-[10px]">3. Signature (Green):</span>
                  {selectedAlg === "none" ? "[STRIPPED / EMPTY]" : "RSA_SHA256_DIGEST_SIGNATURE"}
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                <strong className="text-white">Validation Verdict: </strong>
                {jwtInspection.reason}
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
                Case studies of SAML XSW attacks, OAuth PKCE implementations, and real-time CAEP session revocations.
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
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_saml_xsw" ? "Barrackpore SAML XSW" : key === "kolkata_fintech_pkce" ? "Kolkata OAuth PKCE" : "Ichapur CAEP Revocation"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-amber-400 font-mono bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
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
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Protocol Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Operational Outcome</span>
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
              <span>⚠️</span> Common Pitfalls &amp; Flaws
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Using Raw OAuth 2.0 for Authentication:</strong> Access tokens grant API permissions; they do not assert authenticated user identity without OIDC.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Calling `jwt.decode()` without `jwt.verify()`:</strong> Deserializing claims without validating signatures allows attackers to spoof arbitrary admin tokens.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Storing Tokens in `localStorage`:</strong> Accessible to malicious JavaScript via Cross-Site Scripting (XSS); use HttpOnly cookies.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Identity Protocol Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mandate PKCE (S256) for All Clients:</strong> Eliminate Authorization Code interception across mobile, SPA, and confidential apps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Hardcode Permitted JWT Algorithms:</strong> Explicitly whitelist `['RS256', 'ES256']` and reject `alg: none` and `HS256` key confusion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Continuous Access Evaluation (CAEP):</strong> Broadcast real-time security events to revoke sessions immediately upon threat detection.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300">Think About:</span>
              <p className="leading-relaxed">
                Why was the OAuth 2.0 Implicit Grant deprecated in OAuth 2.1? Because returning access tokens in URL fragments exposed them in browser history and proxy server logs! Always use Authorization Code Flow with PKCE!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>SAML = XML-based Enterprise Web SSO.</li>
                <li>OAuth 2.0 = Delegated API Authorization (Scopes &amp; Access Tokens).</li>
                <li>OpenID Connect (OIDC) = Identity layer on top of OAuth issuing ID Tokens.</li>
                <li>PKCE (RFC 7636) binds code_verifier to code_challenge via SHA-256.</li>
                <li>JWTs consist of Base64URL(Header) . Base64URL(Payload) . Base64URL(Signature).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on SSO &amp; Identity Protocols Lab Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating SAML XSW validation, PKCE parameter generation, and OIDC JWT signature verification
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={ssoEnginePy}
            title="sso_identity_protocols.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Single Sign-On (SSO) &amp; Identity Protocols FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Clearly distinguish between SAML 2.0 (XML enterprise federation), OAuth 2.0 (API delegated authorization), and OpenID Connect 1.0 (JWT identity authentication layer). Draw the complete Authorization Code Flow with PKCE (RFC 7636) showing code_verifier and code_challenge hashing. Detail the 3-part structure of JSON Web Tokens (JWT) and explain how XML Signature Wrapping (XSW) and JWT algorithm confusion attacks are executed and defended."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 10: SSO & Identity Protocols Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 10 Note"
            downloadFileName="topic10_sso_protocols_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
