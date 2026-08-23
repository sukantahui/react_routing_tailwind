import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import tlsRecordProcessorPy from "./topic3_files/tls_record_processor.py?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgRecordDissectorId = useId();
  const svgNonceXorId = useId();

  // Studio 1: Record Dissector State
  const [selectedRecordVersion, setSelectedRecordVersion] = useState("tls_1_3"); // "tls_1_2", "tls_1_3"
  const [selectedSubProtocol, setSelectedSubProtocol] = useState("alert_protocol"); // "app_data", "alert_protocol", "handshake_protocol"
  const [paddingZeroBytes, setPaddingZeroBytes] = useState(32); // 0 to 128 bytes

  // Studio 2: Live Nonce & Counter State
  const [currentSequenceNumber, setCurrentSequenceNumber] = useState(5); // 0 to 50
  const [baseIvHex, setBaseIvHex] = useState("112233445566778899aabbcc"); // 96-bit hex

  // Studio 3: Dynamic Record Sizing & Performance State
  const [configuredRecordSizeBytes, setConfiguredRecordSizeBytes] = useState(1400); // 1400 to 16384 bytes
  const [mobileRttMs, setMobileRttMs] = useState(65); // 20 to 180 ms

  // Studio 4: Regional SOC Case Studies State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_traffic_padding");

  // Studio 1: Sub-Protocol Database
  const subProtocols = {
    app_data: {
      name: "Application Data Protocol",
      typeCode: 23,
      typeHex: "0x17",
      samplePayload: "GET /api/v1/pension_records HTTP/2.0\r\nHost: treasury.barrackpore.gov.in",
      role: "Transmits end-user HTTP payloads, API requests, and application data streams."
    },
    alert_protocol: {
      name: "Alert Protocol (CloseNotify)",
      typeCode: 21,
      typeHex: "0x15",
      samplePayload: "CloseNotify Alert (Level: 1 [Warning], Description: 0 [close_notify])",
      role: "Gracefully terminates connections or signals fatal cryptographic decryption errors."
    },
    handshake_protocol: {
      name: "Handshake Protocol (KeyUpdate)",
      typeCode: 22,
      typeHex: "0x16",
      samplePayload: "KeyUpdate Message (request_update: 0 [update_not_requested])",
      role: "Transmits handshake negotiation and mid-session ephemeral key updates."
    }
  };

  const currentSubProto = subProtocols[selectedSubProtocol];

  // Studio 2: Nonce Derivation Computation (Base IV XOR Seq)
  const nonceDerivation = useMemo(() => {
    // Convert base IV hex to byte array
    const cleanIv = (baseIvHex + "000000000000000000000000").slice(0, 24);
    const ivBytes = [];
    for (let i = 0; i < 24; i += 2) {
      ivBytes.push(parseInt(cleanIv.substr(i, 2), 16) || 0);
    }

    // Convert sequence number to 12-byte padded array
    const seqBytes = new Array(12).fill(0);
    let tempSeq = currentSequenceNumber;
    for (let i = 11; i >= 4; i--) {
      seqBytes[i] = tempSeq & 0xff;
      tempSeq = tempSeq >> 8;
    }

    // XOR byte by byte
    const derivedNonceBytes = ivBytes.map((b, idx) => b ^ seqBytes[idx]);
    const derivedNonceHex = derivedNonceBytes
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return {
      ivHexFormatted: cleanIv,
      seqHexFormatted: seqBytes.map((b) => b.toString(16).padStart(2, "0")).join(""),
      derivedNonceHex
    };
  }, [baseIvHex, currentSequenceNumber]);

  // Studio 3: Performance & TTFB Computation
  const performanceMetrics = useMemo(() => {
    const ethernetMss = 1400; // Typical MTU 1500 - 40B IP/TCP - 60B VPN
    const packetsPerRecord = Math.ceil(configuredRecordSizeBytes / ethernetMss);

    // Initial packet rendering delay (Time to first usable plaintext)
    const ttfbDelayMs = packetsPerRecord === 1 ? mobileRttMs : mobileRttMs * (1 + (packetsPerRecord - 1) * 0.3);
    const ttfbSavingsMs = Math.max(0, Math.round(mobileRttMs * 2.2 - ttfbDelayMs));

    return {
      packetsPerRecord,
      ttfbDelayMs: Math.round(ttfbDelayMs),
      ttfbSavingsMs,
      overheadPercent: ((22 / (configuredRecordSizeBytes + 22)) * 100).toFixed(1)
    };
  }, [configuredRecordSizeBytes, mobileRttMs]);

  // Studio 4: Regional SOC Case Studies Data
  const regionalDrills = {
    barrackpore_traffic_padding: {
      id: "barrackpore_traffic_padding",
      title: "Barrackpore Treasury Core: Traffic Analysis Defense via Zero-Padding",
      location: "Barrackpore Central Treasury Disbursal Gateway serving ₹45 Crore monthly pensions",
      threatScenario:
        "Susmita and Mamata observed that passive network eavesdroppers on ISP transit links could deduce whether transactions were approved or flagged for fraud by observing 80-byte vs 1,200-byte ciphertext lengths.",
      solution:
        "Sukanta Hui implemented TLS 1.3 Record Zero-Padding (RFC 8446 Section 5.4), padding all outgoing JSON responses to uniform 2,048-byte blocks.",
      outcome:
        "100% of outgoing records now have identical 2,048-byte lengths; passive traffic analysis attacks completely neutralized; zero metadata leakage."
    },
    kolkata_fintech_dynamic_records: {
      id: "kolkata_fintech_dynamic_records",
      title: "Salt Lake Sector V FinTech Hub: Dynamic Record Sizing (DRS) Optimization",
      location: "Sector V FinTech Payment Gateway processing 5,000 mobile checkouts/min",
      threatScenario:
        "Debangshu and Mahima diagnosed high Time-To-First-Byte (TTFB) latencies (320ms) for mobile shoppers in Kolkata on 4G cellular links due to fixed 16 KB TLS records.",
      solution:
        "Deployed NGINX dynamic record sizing ('ssl_dyn_rec_size_lo 1360B'), delivering the first HTML chunks inside a single TCP packet before scaling up to 16 KB.",
      outcome:
        "Initial page rendering time slashed by 85ms (a 38% speedup); mobile checkout drop-off rate reduced by 11%; server CPU utilization stayed below 15%."
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
            <span>🛡️ Module 005_004 • Topic 3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            TLS Record Protocol &amp; Symmetric Data Encryption
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the data-carrying engine of TLS: Authenticated Encryption (AEAD AES-GCM / ChaCha20-Poly1305),
            Content Type Hiding, Nonce derivation ($IV \oplus \text{Seq}$), and Dynamic Record Sizing.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              TLS 1.3 Record Framing
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Content Type Hiding &amp; Padding
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              AEAD AES-GCM &amp; Nonce Derivation
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Dynamic Record Sizing (TTFB)
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
          @keyframes pulseGlowCyan {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              📦
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The TLS Record Layer: The Workhorse of Transport Security
              </h2>
              <p className="text-sm text-slate-400">
                How every HTTP request, database query, alert message, and key update is packaged, encrypted, and authenticated
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              While the TLS Handshake establishes encryption keys, the <strong className="text-white">TLS Record Protocol</strong> does
              the heavy lifting of encrypting every byte of production traffic across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>. In TLS 1.3, the record framing was completely overhauled to eliminate
              metadata leakage, enforce <strong className="text-emerald-400">Authenticated Encryption with Associated Data (AEAD)</strong>,
              and hide sub-protocol types from network eavesdroppers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 1. AEAD Authenticated Encryption
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Eliminated legacy MAC-then-Encrypt flaws. Encrypts payload and calculates a 128-bit authentication tag
                  in a single atomic step using AES-GCM or ChaCha20-Poly1305.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🎭</span> 2. Content Type Hiding &amp; Padding
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Outer header is always masked as generic Application Data (`0x17`). The real type (Alert / KeyUpdate)
                  is sealed inside the ciphertext along with variable zero-padding.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🔢</span> 3. Implicit Nonce Derivation
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Derives unique 96-bit Nonces via $\text{Base IV} \oplus \text{Sequence Number}$ without transmitting
                  explicit IVs on the wire, saving 8–16 bytes per packet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE RECORD PROTOCOL PACKET DISSECTOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔬
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive Record Protocol Packet Dissector
                </h2>
                <p className="text-sm text-slate-400">
                  Compare TLS 1.2 vs TLS 1.3 record framing and observe how Content Type Hiding masks internal messages
                </p>
              </div>
            </div>

            {/* Version & Sub-Protocol Switchers */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRecordVersion("tls_1_2")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  selectedRecordVersion === "tls_1_2"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Legacy TLS 1.2 Record
              </button>
              <button
                onClick={() => setSelectedRecordVersion("tls_1_3")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  selectedRecordVersion === "tls_1_3"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Modern TLS 1.3 Record (AEAD)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            {/* Sub-Protocol Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Sub-Protocol Payload to Encapsulate:
                </label>
                <select
                  value={selectedSubProtocol}
                  onChange={(e) => setSelectedSubProtocol(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="app_data">Application Data (HTTP/2 Payload - Type 23)</option>
                  <option value="alert_protocol">Alert Message (CloseNotify - Type 21)</option>
                  <option value="handshake_protocol">Handshake Message (KeyUpdate - Type 22)</option>
                </select>
              </div>

              {/* Slider for Padding in TLS 1.3 */}
              {selectedRecordVersion === "tls_1_3" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-300">Traffic Analysis Zero-Padding:</span>
                    <span className="text-cyan-400 font-mono">{paddingZeroBytes} Bytes</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="128"
                    step="8"
                    value={paddingZeroBytes}
                    onChange={(e) => setPaddingZeroBytes(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Visual Record Packet Diagram SVG */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgRecordDissectorId}
                viewBox="0 0 880 200"
                className="w-full min-w-[700px] h-auto"
                aria-label="TLS Record Framing Dissection Diagram"
              >
                {selectedRecordVersion === "tls_1_3" ? (
                  /* TLS 1.3 Visual Blocks */
                  <g transform="translate(20, 30)">
                    {/* Outer Header */}
                    <rect x="0" y="0" width="160" height="90" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
                    <text x="80" y="30" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle">Outer Header (5B)</text>
                    <text x="80" y="50" fill="#ffffff" fontSize="10 font-mono" textAnchor="middle">Type: 0x17 (App Data)</text>
                    <text x="80" y="70" fill="#94a3b8" fontSize="9 font-mono" textAnchor="middle">Ver: 0x0303 | Len: N</text>

                    {/* Encrypted Inner Payload */}
                    <rect x="170" y="0" width="340" height="90" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="340" y="30" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Encrypted Ciphertext ({currentSubProto.name.split(" (")[0]})
                    </text>
                    <text x="340" y="50" fill="#ffffff" fontSize="10 font-mono" textAnchor="middle">
                      Plaintext Payload: &quot;{currentSubProto.samplePayload.slice(0, 24)}...&quot;
                    </text>
                    <text x="340" y="70" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">
                      Real Inner Type: {currentSubProto.typeHex} ({currentSubProto.typeCode}) + {paddingZeroBytes}B Zero-Padding
                    </text>

                    {/* AEAD Tag */}
                    <rect x="520" y="0" width="160" height="90" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                    <text x="600" y="35" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">AEAD Tag (16B)</text>
                    <text x="600" y="60" fill="#f43f5e" fontSize="9 font-mono" textAnchor="middle">128-bit GHASH / Poly1305</text>
                  </g>
                ) : (
                  /* TLS 1.2 Legacy Blocks */
                  <g transform="translate(20, 30)">
                    {/* Cleartext Outer Header */}
                    <rect x="0" y="0" width="150" height="90" rx="8" fill="#422006" stroke="#eab308" strokeWidth="2" />
                    <text x="75" y="30" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">Outer Header (5B)</text>
                    <text x="75" y="50" fill="#fde047" fontSize="10 font-mono" textAnchor="middle">
                      Type: {currentSubProto.typeHex} (LEAKED!)
                    </text>
                    <text x="75" y="70" fill="#94a3b8" fontSize="9 font-mono" textAnchor="middle">Ver: 0x0303 | Len: N</text>

                    {/* Explicit IV */}
                    <rect x="160" y="0" width="120" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="220" y="35" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Explicit IV (16B)</text>
                    <text x="220" y="60" fill="#94a3b8" fontSize="9 font-mono" textAnchor="middle">Wire Overhead Tax</text>

                    {/* Encrypted Data + HMAC + CBC Padding */}
                    <rect x="290" y="0" width="390" height="90" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                    <text x="485" y="30" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Encrypted Data + HMAC-SHA256 (20B) + CBC Padding
                    </text>
                    <text x="485" y="55" fill="#f43f5e" fontSize="10 font-mono" textAnchor="middle">
                      Vulnerable to Lucky 13 &amp; POODLE Padding Oracles
                    </text>
                  </g>
                )}

                {/* Annotation Summary Line */}
                <g transform="translate(20, 140)">
                  <text x="0" y="20" fill="#94a3b8" fontSize="11 font-mono">
                    {selectedRecordVersion === "tls_1_3"
                      ? "✔ TLS 1.3 Metadata Privacy: Sniffers see ONLY 0x17 (Application Data). Alerts & KeyUpdates are 100% hidden!"
                      : "⚠️ TLS 1.2 Metadata Leak: Outer header reveals message type to passive network sniffers in cleartext."}
                  </text>
                </g>
              </svg>
            </div>

            {/* Diagnostic Alert Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-emerald-400">Sub-Protocol Role:</strong> {currentSubProto.role}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE AEAD NONCE & GALOIS COUNTER MODE SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xl">
              🔢
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: Live AEAD Nonce Derivation &amp; Anti-Replay Counter
              </h2>
              <p className="text-sm text-slate-400">
                Observe the bitwise XOR formula ($\text{Base IV} \oplus \text{Seq}$) that derives unique per-record Nonces in TLS 1.3
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider: Sequence Counter */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Implicit 64-bit Sequence Counter:</span>
                <span className="text-cyan-400 font-mono text-sm">Seq #{currentSequenceNumber}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={currentSequenceNumber}
                onChange={(e) => setCurrentSequenceNumber(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Ticks up by 1 with every record. Never transmitted on the wire!
              </p>
            </div>

            {/* Base IV Input */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Base 96-bit Static IV (From Handshake HKDF):
              </label>
              <input
                type="text"
                value={baseIvHex}
                onChange={(e) => setBaseIvHex(e.target.value.toLowerCase().replace(/[^0-9a-f]/g, ""))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
                maxLength={24}
              />
              <p className="text-[11px] text-slate-400">
                12-byte static vector derived during the HKDF key expansion.
              </p>
            </div>
          </div>

          {/* Mathematical Nonce Derivation Display */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Bitwise Nonce Calculation Trace (RFC 8446 Section 5.3):
            </div>
            <div className="space-y-1.5 font-mono text-xs text-slate-300 bg-slate-900 p-4 rounded-lg border border-slate-800 overflow-x-auto">
              <div>Base IV (12B)       : <span className="text-cyan-300">{nonceDerivation.ivHexFormatted}</span></div>
              <div>Padded Seq (12B)    : <span className="text-amber-300">{nonceDerivation.seqHexFormatted}</span></div>
              <div className="border-t border-slate-800 pt-1 font-bold">
                Derived Nonce (XOR) : <span className="text-emerald-400">{nonceDerivation.derivedNonceHex}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Because the sequence counter strictly increases, every record receives an entirely unique 96-bit Nonce,
              making AES-GCM IV reuse mathematically impossible.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: DYNAMIC RECORD SIZING & TTFB LATENCY ENGINE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              ⚡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 3: Dynamic Record Sizing (DRS) &amp; TTFB Latency Engine
              </h2>
              <p className="text-sm text-slate-400">
                Observe how tuning TLS record sizes from 1,400B to 16KB eliminates head-of-line blocking on mobile networks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Record Buffer Size */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Configured TLS Record Size:</span>
                <span className="text-cyan-400 font-mono text-sm">{configuredRecordSizeBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="1400"
                max="16384"
                step="512"
                value={configuredRecordSizeBytes}
                onChange={(e) => setConfiguredRecordSizeBytes(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Small initial records (1,400B) fit in 1 TCP packet; bulk records (16 KB) span ~11 packets.
              </p>
            </div>

            {/* Slider 2: Mobile Network RTT */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Mobile Network RTT:</span>
                <span className="text-emerald-400 font-mono text-sm">{mobileRttMs} ms</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={mobileRttMs}
                onChange={(e) => setMobileRttMs(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Latency across 4G cellular links in Kolkata and suburban West Bengal.
              </p>
            </div>
          </div>

          {/* Performance Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">TCP Packets / Record</div>
              <div className="text-2xl font-extrabold text-white font-mono">
                {performanceMetrics.packetsPerRecord} <span className="text-sm font-normal text-cyan-300">Packets</span>
              </div>
              <div className="text-[11px] text-slate-400">Ethernet Frames Required</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Time-To-First-Byte (TTFB)</div>
              <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                {performanceMetrics.ttfbDelayMs} <span className="text-sm font-normal text-white">ms</span>
              </div>
              <div className="text-[11px] text-slate-400">Initial HTML Decrypt Delay</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Rendering Latency Saved</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                -{performanceMetrics.ttfbSavingsMs} <span className="text-sm font-normal text-white">ms</span>
              </div>
              <div className="text-[11px] text-slate-400">Speedup vs 16 KB Record</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Fixed Header Overhead</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                {performanceMetrics.overheadPercent}%
              </div>
              <div className="text-[11px] text-slate-400">22B Tag/Header Ratio</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* REAL-WORLD USAGE EXAMPLES (4 DETAILED SCENARIOS) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🏢
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Real-World Record Layer Engineering Scenarios
              </h2>
              <p className="text-sm text-slate-400">
                How production systems optimize record framing, privacy, and encryption throughput
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🎭</span> Scenario 1: Treasury Traffic Analysis Masking
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Zero Padding
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita and Mamata protected pension approval APIs in Barrackpore from packet-size analysis.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Fix: Applied TLS 1.3 Record Padding to pad all JSON response records to 2048 bytes.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Attackers cannot deduce transaction contents from packet size patterns.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>⚡</span> Scenario 2: Dynamic Record Sizing on Mobile
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  DRS 1360B
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu and Mahima optimized mobile checkout for 5,000 shoppers/min in Salt Lake.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Fix: Configured NGINX dynamic record sizing to deliver initial HTML in 1-packet records.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Page render delay dropped by 85ms; mobile checkout conversion increased 11%.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🚀</span> Scenario 3: Linux kTLS Zero-Copy Offload
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  kTLS sendfile
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila optimized static media streaming servers in Jadavpur under high traffic load.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Fix: Enabled Kernel TLS (kTLS) with &apos;sendfile()&apos; zero-copy encryption directly in the Linux kernel.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Web server throughput doubled from 18 Gbps to 36 Gbps with 40% lower CPU usage.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🛡️</span> Scenario 4: Mitigating Forbidden Nonce Reuse
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Implicit Nonce
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Custom IoT firmware in Ichapur accidentally reused static IVs in custom AES-GCM code.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Fix: Upgraded firmware to standard TLS 1.3 Record Layer with implicit 64-bit sequence counters.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 100% elimination of nonce reuse vulnerabilities; secure against Galois key recovery.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC INCIDENT DRILLS (WEST BENGAL CASE STUDIES) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 text-xl">
                🚨
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional West Bengal SOC Case Studies &amp; Record Drills
                </h2>
                <p className="text-sm text-slate-400">
                  Real-world record layer optimization and traffic analysis defense in Barrackpore &amp; Kolkata
                </p>
              </div>
            </div>

            {/* Drill Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_traffic_padding")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_traffic_padding"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore Padding Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_fintech_dynamic_records")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_fintech_dynamic_records"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V Record Tuning Drill
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentDrill.title}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-700 font-mono">
                📍 {currentDrill.location}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚠️</span> Threat Scenario:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛠️</span> Technical Solution:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏆</span> Operational Outcome:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EDUCATIONAL PYTHON SCRIPT LOADER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🐍
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Programmatic TLS 1.3 Record Layer Processor (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Execute per-record Nonce derivation, Content Type Hiding, and AEAD encryption in Python
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={tlsRecordProcessorPy}
            title="tls_record_processor.py"
            highlightLines={[32, 52, 74, 92]}
          />
        </section>

        {/* ========================================================================= */}
        {/* TIPS & TRICKS, PITFALLS, BEST PRACTICES & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Professional Wisdom, Common Pitfalls &amp; Student Checklist
              </h2>
              <p className="text-sm text-slate-400">
                Essential record layer tuning habits, common beginner misconceptions, and revision points
              </p>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🚀</span> Professional Tips &amp; Tricks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">1. Enable Dynamic Record Sizing (DRS):</strong>
                <p className="text-slate-400">
                  Configure web servers to send initial records at 1360–1400 bytes so mobile browsers render HTML
                  instantly from single packets, scaling to 16 KB for bulk streaming.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Enable Record Padding on Sensitive APIs:</strong>
                <p className="text-slate-400">
                  Append zero-padding to sensitive financial and authentication JSON responses to round lengths to
                  uniform 1024-byte blocks, blinding traffic analysis heuristics.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Leverage Linux Kernel TLS (kTLS):</strong>
                <p className="text-slate-400">
                  Enable kTLS on high-volume reverse proxies. It allows &apos;sendfile()&apos; zero-copy streaming,
                  doubling web server throughput and cutting CPU usage in half.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Never Reuse Nonces in AES-GCM:</strong>
                <p className="text-slate-400">
                  Always rely on monotonically incrementing sequence numbers for nonce derivation. Reusing a nonce
                  completely breaks Galois polynomial authentication.
                </p>
              </div>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Beginner Misconceptions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 1: "Large 16 KB records are always best for performance."</strong>
                <p className="text-slate-400">
                  Large records cause head-of-line blocking on mobile networks. The client cannot decrypt any data
                  until the entire 16 KB record arrives, introducing 100ms+ delays.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "Sequence numbers are sent over the network."</strong>
                <p className="text-slate-400">
                  Sequence numbers are purely implicit. Both client and server maintain internal counters (0, 1, 2, ...),
                  saving wire bandwidth and preventing counter spoofing.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Enabling TLS-Level Compression:</strong>
                <p className="text-slate-400">
                  TLS compression was permanently banned in RFC 8446 because it enabled the CRIME attack to extract
                  session cookies by analyzing ciphertext length changes.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Ignoring CloseNotify Alerts:</strong>
                <p className="text-slate-400">
                  Closing a TCP socket without sending close_notify leaves connections vulnerable to truncation attacks
                  where attackers inject TCP FIN/RST packets prematurely.
                </p>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="bg-cyan-950/40 border border-cyan-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>💭</span> Pedagogical Hints for System Analysts
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-cyan-200">Think about:</strong> Why does TLS 1.3 place the real message type (Alert/Handshake) inside the ciphertext rather than in the outer header?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How the bitwise XOR formula in Studio 2 creates a fresh 96-bit Nonce for every single sequence counter increment.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Adjust the record buffer size in Studio 3 to observe how smaller initial records slash mobile Time-To-First-Byte (TTFB).</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span>✅</span> Student Revision Mini-Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain the five core functions of the TLS Record Protocol</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe Content Type Hiding and Zero-Padding in TLS 1.3</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Calculate the 96-bit Nonce using Base IV XOR Sequence Number</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain why Dynamic Record Sizing optimizes mobile web browsing</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="TLS Record Protocol & Symmetric Encryption FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="TLS Record Protocol Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic3_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="The TLS Record Protocol is the unsung hero of internet security. While the Handshake protocol receives most of the academic spotlight, the Record Layer handles every single gigabyte of data that flows across our enterprise networks. In TLS 1.3, the Record Layer achieved true architectural perfection: eliminating explicit IV wire waste, enforcing Authenticated Encryption (AEAD) to kill padding oracles permanently, and introducing Content Type Hiding so that eavesdroppers see only generic, padded application data. Remember Sukanta Hui's core optimization principle: To build lightning-fast, secure web services, tune your TLS record sizes dynamically—send small 1,400-byte records during the initial connection burst for instant mobile rendering, then ramp up to 16 KB for high-throughput bulk streaming!"
        />

      </div>
    </div>
  );
};

export default Topic3;
