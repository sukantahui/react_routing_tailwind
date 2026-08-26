import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio Interactive State
  const [activeTab, setActiveTab] = useState("sri");

  // TAB 1: SRI State
  const [sriScriptContent, setSriScriptContent] = useState("console.log('Valid analytics loaded');");
  const expectedSRIHash = "sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC";
  const [isTamperedScript, setIsTamperedScript] = useState(false);

  // TAB 2: SQL Injection State
  const [inputAccountId, setInputAccountId] = useState("101 OR 1=1; UPDATE accounts SET balance = 9999999");
  const [useParameterized, setUseParameterized] = useState(true);

  // TAB 3: Replay Attack State
  const [capturedNonce, setCapturedNonce] = useState("NONCE_KOLKATA_9821_XYZ");
  const [processedNonces, setProcessedNonces] = useState(["NONCE_KOLKATA_9821_XYZ"]);
  const [replayResult, setReplayResult] = useState(null);

  // TAB 4: Webhook HMAC State
  const [webhookPayload, setWebhookPayload] = useState('{"event":"PAYMENT_SUCCESS","orderId":"ORD-9801","amount":450000}');
  const [webhookSecret, setWebhookSecret] = useState("KolkataRazorpaySecretKey2026");
  const [isForgedWebhook, setIsForgedWebhook] = useState(false);

  // Quick Hash Helper
  const simpleHash = (str) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >&gt;> 0).toString(16).padStart(8, '0');
  };

  const handleTestReplay = () => {
    if (processedNonces.includes(capturedNonce)) {
      setReplayResult({
        status: "BLOCKED",
        msg: `REPLAY ATTACK INTERCEPTED! Nonce "${capturedNonce}" was already consumed and recorded in the cache. Transaction rejected to prevent duplicate debit/credit.`
      });
    } else {
      setProcessedNonces([...processedNonces, capturedNonce]);
      setReplayResult({
        status: "SUCCESS",
        msg: `TRANSACTION ACCEPTED: Nonce "${capturedNonce}" is fresh and unique. Storing nonce in server cache.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-rose-950/80 border border-rose-600/60 rounded-full text-xs font-semibold text-rose-300 uppercase tracking-widest">
              Course Module 002_001 • Topic 4
            </span>
            <span className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 rounded-full text-xs font-semibold text-amber-300">
              Integrity Threats &amp; Tamper Defense
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Threats to Integrity and Data Tampering
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Analyze critical threats targeting data authenticity and system execution: Man-in-the-Middle payload alterations,
            SQL Injection data corruption, Replay Attacks, CDN supply chain tampering (Magecart), and Ransomware file manipulation.
            Implement defense-in-depth safeguards using TLS 1.3 AEAD, Subresource Integrity (SRI), Parameterized Queries,
            WORM immutable storage, and Section 66 Indian IT Act compliance across West Bengal.
          </p>
        </div>

        {/* Section 1: Threat Landscape Grid */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-rose-400">
            1. Taxonomy of Data Tampering &amp; Integrity Threats
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Integrity threats compromise systems by modifying payloads, injecting unauthorized code, or manipulating database records:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📡</span>
                <h3 className="text-sm font-bold text-white">In-Transit Tampering</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Active MitM packet modification, DNS cache poisoning, and Replay attacks altering funds or transaction sequences.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Defense: TLS 1.3 AEAD &amp; Nonces</span>
            </div>

            {/* Box 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🗄️</span>
                <h3 className="text-sm font-bold text-white">Database Manipulation</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                SQL Injection (SQLi), unauthenticated mass assignment, and direct object tampering corrupting backend records.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Defense: Prepared Statements</span>
            </div>

            {/* Box 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📦</span>
                <h3 className="text-sm font-bold text-white">Supply Chain Injection</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compromised upstream NPM packages, CDN script tampering (Magecart), and backdoor insertions into build pipelines.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Defense: SRI &amp; SBOM Scanning</span>
            </div>

            {/* Box 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔒</span>
                <h3 className="text-sm font-bold text-white">Ransomware &amp; WORM</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adversaries encrypting master files and deleting shadow copies; mitigated by Write Once Read Many (WORM) storage.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Defense: Immutable S3 WORM</span>
            </div>
          </div>
        </div>

        {/* Section 2: Semantic SVG Diagram */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-rose-400">
            2. Integrity Threat Attack Vectors &amp; Multi-Layer Defensive Shield
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Architectural visualization contrasting adversary tamper vectors with modern cryptographic and architectural defenses:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex justify-center items-center overflow-x-auto">
            <svg viewBox="0 0 840 240" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Adversary Threat Column */}
              <rect x="20" y="20" width="220" height="200" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <text x="130" y="45" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">ADVERSARY THREATS</text>
              <text x="35" y="75" fill="#fecaca" fontSize="9">• MitM Packet Tampering</text>
              <text x="35" y="105" fill="#fecaca" fontSize="9">• Replay Fund Transfers</text>
              <text x="35" y="135" fill="#fecaca" fontSize="9">• SQL Injection (UPDATE/DROP)</text>
              <text x="35" y="165" fill="#fecaca" fontSize="9">• CDN Script Injection (Magecart)</text>
              <text x="35" y="195" fill="#fecaca" fontSize="9">• Ransomware File Corruption</text>

              {/* Arrow Indicator */}
              <path d="M 250 120 L 320 120" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />

              {/* Defensive Shield Column */}
              <rect x="330" y="20" width="220" height="200" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="440" y="45" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">INTEGRITY CONTROLS</text>
              <text x="345" y="75" fill="#a7f3d0" fontSize="9">• TLS 1.3 AEAD Auth Tags</text>
              <text x="345" y="105" fill="#a7f3d0" fontSize="9">• Nonces &amp; Millisecond Timestamps</text>
              <text x="345" y="135" fill="#a7f3d0" fontSize="9">• Parameterized SQL Queries</text>
              <text x="345" y="165" fill="#a7f3d0" fontSize="9">• Subresource Integrity (SRI)</text>
              <text x="345" y="195" fill="#a7f3d0" fontSize="9">• S3 Object Lock WORM Storage</text>

              {/* Arrow Indicator */}
              <path d="M 560 120 L 630 120" stroke="#10b981" strokeWidth="3" />

              {/* Business Outcome Column */}
              <rect x="640" y="20" width="180" height="200" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
              <text x="730" y="45" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">TRUST OUTCOME</text>
              <text x="650" y="80" fill="#e2e8f0" fontSize="9">✅ Untampered Records</text>
              <text x="650" y="115" fill="#e2e8f0" fontSize="9">✅ Non-Repudiation</text>
              <text x="650" y="150" fill="#e2e8f0" fontSize="9">✅ Section 66 IT Act</text>
              <text x="650" y="185" fill="#e2e8f0" fontSize="9">✅ Audit Compliance</text>
            </svg>
          </div>
        </div>

        {/* Section 3: Interactive Integrity Threat & Defense Studio */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-rose-400">
            3. Interactive Data Tampering Threat Simulator &amp; Defense Studio
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Simulate real-world data tampering attacks and test architectural defenses: Subresource Integrity (SRI) checking,
            SQL Injection sanitization, Replay Attack Nonce detection, and Payment Webhook HMAC validation:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-6">
            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab("sri")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "sri"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                1. Subresource Integrity (SRI)
              </button>
              <button
                onClick={() => setActiveTab("sqli")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "sqli"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                2. SQL Injection vs Prepared Query
              </button>
              <button
                onClick={() => setActiveTab("replay")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "replay"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                3. Replay Attack &amp; Nonce Defense
              </button>
              <button
                onClick={() => setActiveTab("webhook")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "webhook"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                4. Payment Webhook HMAC Verifier
              </button>
            </div>

            {/* TAB 1: Subresource Integrity (SRI) */}
            {activeTab === "sri" && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setIsTamperedScript(!isTamperedScript);
                      if (!isTamperedScript) {
                        setSriScriptContent("/* MALICIOUS INJECTION */ sendCreditCardsToAttackerServer();");
                      } else {
                        setSriScriptContent("console.log('Valid analytics loaded');");
                      }
                    }}
                    className={clsx(
                      "px-3 py-1.5 rounded text-xs font-bold transition-all",
                      isTamperedScript ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
                    )}
                  &gt;
                    {isTamperedScript ? "⚠️ Simulate Compromised CDN Script" : "🛡️ Revert to Authentic Script"}
                  </button>
                  <span className="text-xs text-slate-400">
                    Status: {isTamperedScript ? "CDN Script Injected with Skimmer" : "Authentic Vendor CDN Script"}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">CDN Hosted JavaScript Payload:</label>
                  <textarea
                    rows={2}
                    value={sriScriptContent}
                    readOnly
                    className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                  />
                </div>

                <div
                  className={clsx(
                    "p-4 rounded-lg border flex flex-col space-y-2",
                    isTamperedScript
                      ? "bg-rose-950/50 border-rose-700 text-rose-300"
                      : "bg-emerald-950/50 border-emerald-700 text-emerald-300"
                  )}
                >
                  <div className="flex items-center space-x-2 font-bold text-sm">
                    <span>{isTamperedScript ? "⛔ SCRIPT EXECUTION BLOCKED BY BROWSER" : "✅ SCRIPT HASH MATCHES SRI TAG"}</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {isTamperedScript
                      ? `Integrity Check Failed! The calculated hash of the tampered CDN script does not match the HTML integrity="${expectedSRIHash}". Browser aborts execution immediately.`
                      : `The browser verified the downloaded script against integrity="${expectedSRIHash}". Script is permitted to execute safely.`}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: SQL Injection vs Parameterized Queries */}
            {activeTab === "sqli" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    User Input Parameter (Simulate Malicious SQL Injection):
                  </label>
                  <input
                    type="text"
                    value={inputAccountId}
                    onChange={(e) => setInputAccountId(e.target.value)}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300"
                  /&gt;
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setUseParameterized(!useParameterized)}
                    className={clsx(
                      "px-3 py-1.5 rounded text-xs font-bold transition-all",
                      useParameterized ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                    )}
                  &gt;
                    {useParameterized ? "🛡️ Parameterized Query (SECURE)" : "⚠️ String Concatenation (VULNERABLE)"}
                  </button>
                  <span className="text-xs text-slate-400">
                    Engine: {useParameterized ? "Prepared Statement ($1 Parameter)" : "Raw String Template literal"}
                  </span>
                </div>

                <div
                  className={clsx(
                    "p-4 rounded-lg border flex flex-col space-y-2 font-mono text-xs",
                    useParameterized
                      ? "bg-emerald-950/40 border-emerald-700 text-emerald-300"
                      : "bg-rose-950/40 border-rose-700 text-rose-300"
                  )}
                >
                  <span className="font-bold">
                    {useParameterized ? "Prepared Query Execution:" : "Vulnerable Query Execution:"}
                  </span>
                  <pre className="p-2 bg-slate-900 rounded break-all whitespace-pre-wrap">
                    {useParameterized
                      ? `db.query("SELECT * FROM accounts WHERE id = $1", ["${inputAccountId}"]);\n// Result: Safely treated as literal string. No database tampering possible.`
                      : `db.query("SELECT * FROM accounts WHERE id = " + "${inputAccountId}");\n// Result: SQL syntax hijacked! Attacker alters account balance to ₹99,99,999!`}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 3: Replay Attack & Nonce Simulator */}
            {activeTab === "replay" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Captured Transaction Nonce Token:
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={capturedNonce}
                      onChange={(e) => setCapturedNonce(e.target.value)}
                      className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                    /&gt;
                    <button
                      onClick={handleTestReplay}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      🚀 Send / Replay Packet
                    </button>
                    <button
                      onClick={() => setCapturedNonce(`NONCE_KOLKATA_${Date.now().toString().slice(-6)}_NEW`)}
                      className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all"
                    &gt;
                      🔄 Generate Fresh Nonce
                    </button>
                  </div>
                </div>

                {replayResult && (
                  <div
                    className={clsx(
                      "p-4 rounded-lg border flex flex-col space-y-1",
                      replayResult.status === "BLOCKED"
                        ? "bg-rose-950/40 border-rose-700 text-rose-300"
                        : "bg-emerald-950/40 border-emerald-700 text-emerald-300"
                    )}
                  >
                    <span className="font-bold text-xs">{replayResult.status}</span>
                    <p className="text-xs leading-relaxed">{replayResult.msg}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Payment Webhook HMAC Verifier */}
            {activeTab === "webhook" && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setIsForgedWebhook(!isForgedWebhook);
                      if (!isForgedWebhook) {
                        setWebhookPayload('{"event":"PAYMENT_SUCCESS","orderId":"ORD-9801","amount":99999999}');
                      } else {
                        setWebhookPayload('{"event":"PAYMENT_SUCCESS","orderId":"ORD-9801","amount":450000}');
                      }
                    }}
                    className={clsx(
                      "px-3 py-1.5 rounded text-xs font-bold transition-all",
                      isForgedWebhook ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
                    )}
                  &gt;
                    {isForgedWebhook ? "⚠️ Tamper Webhook Payload (₹9,99,99,999)" : "🛡️ Restore Legitimate Payload (₹4,50,000)"}
                  </button>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Incoming Payment Webhook Body:</label>
                  <input
                    type="text"
                    value={webhookPayload}
                    onChange={(e) => setWebhookPayload(e.target.value)}
                    className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                  /&gt;
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">HMAC Signature Header Verification:</span>
                  <p className="font-mono text-xs text-amber-400 break-all">
                    Computed Sig: hmac-sha256:{simpleHash(webhookPayload + webhookSecret)}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    If an attacker tampers with the payment amount without knowing the merchant secret <code>{webhookSecret}</code>,
                    the webhook signature mismatch causes the server to reject the fraudulent order fulfillment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Four Bengal Case Studies */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-rose-400">
            4. Real-World Integrity Defense Implementations in West Bengal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  1. SCADA Telemetry Replay Defense &amp; Nonce Engine
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-700 font-semibold">
                  ₹3,80,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Debangshu &bull; <strong>Location:</strong> Barrackpore Steel Plant
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu defended a steel manufacturing telemetry network in Barrackpore against adversary replay
                attacks. Attackers attempted to capture and replay normal temperature packets while manipulating furnace
                heaters. Debangshu deployed HMAC-SHA256 authenticated packets with millisecond timestamps and nonces,
                rejecting all replayed signals with a ₹3,80,000 security hardening budget.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  2. E-Commerce CDN Magecart &amp; SRI Hardening
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-700 font-semibold">
                  ₹2,90,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Mahima &bull; <strong>Location:</strong> Ichapur Web Operations
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mahima discovered that a third-party analytics CDN script had been tampered with to skim credit card
                inputs in Ichapur. She immediately enforced Subresource Integrity (SRI) sha384 hashes across all web
                assets and implemented strict Content Security Policies (CSP), neutralizing client-side data tampering
                backed by a ₹2,90,000 web architecture budget.
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  3. FinTech Payment Webhook HMAC Verification
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-700 font-semibold">
                  ₹5,50,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Mamata &bull; <strong>Location:</strong> Kolkata Retail Gateway
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mamata engineered a secure payment gateway integration for a Kolkata retail exchange processing ₹50,00,000
                daily. Malicious actors attempted to send forged 'PAYMENT_SUCCESS' webhooks. Mamata enforced strict HMAC-SHA256
                signature verification with shared secrets and replay nonce caches, blocking all fraudulent orders with a
                ₹5,50,000 enterprise gateway budget.
              </p>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  4. Cyber Forensic WORM Immutable Logging Repository
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-700 font-semibold">
                  ₹4,10,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Abhronila &bull; <strong>Location:</strong> Jadavpur Research Campus
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abhronila deployed an immutable AWS S3 Object Lock (Compliance Mode) WORM logging repository for a cyber
                forensics laboratory in Jadavpur. When an insider attempted to purge audit logs to cover an unauthorized data
                access, the immutable storage policy blocked deletion, preserving digital evidence for court proceedings
                under a ₹4,10,000 research infrastructure grant.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Pitfalls */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-rose-400">
            5. Common Pitfalls &amp; Engineering Guidance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center space-x-2">
                <span>⚠️ Unauthenticated Webhook Processing</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Processing incoming payment or CRM webhooks without validating the HMAC-SHA256 signature header allows
                attackers to forge transaction receipts and fulfill orders without payment.
              </p>
            </div>
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>💡 WORM Storage &amp; Section 66 Compliance</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforce immutable WORM audit logs and parameterize all queries. Adhere to Section 66 of the Indian IT Act
                (up to 3 years imprisonment and ₹5,00,000 fine for data tampering).
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Student Revision Checklist */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Student Revision Checklist:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Define categories of Integrity Threats (Transit, Storage, Application, Supply Chain).</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Explain how TLS 1.3 AEAD prevents packet tampering on the wire.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Describe how Nonces and Timestamps defeat Replay Attacks.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Explain Subresource Integrity (SRI) for CDN script validation.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Detail WORM immutable storage policies for audit preservation.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>State Section 66 Indian IT Act penalties (3 years jail, ₹5,00,000 fine).</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Threats to Integrity and Data Tampering FAQs" questions={questions} />

        {/* Teacher's Note Section */}
        <Teacher
          note={
            "Data tampering destroys operational trust. Enforce TLS 1.3 AEAD, use Subresource Integrity (SRI) on all external web scripts, parameterize every SQL query, protect audit trails with immutable WORM storage, and budget enterprise integrity defenses in Indian Rupees (₹)!"
          }
        />

        {/* Printable Note Component */}
        <PlainTextPrint
          content={noteText}
          title="Threats to Integrity and Data Tampering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic5_note.txt"
        />
      </div>
    </div>
  );
};

export default Topic4;
