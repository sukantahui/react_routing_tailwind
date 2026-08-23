import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgReplayId = useId();

  // Studio 1: Active Replay Vector Selection
  const [selectedReplayKey, setSelectedReplayKey] = useState("upi_financial_replay");

  // Studio 2: Live IPsec Sliding Window Simulator State
  const [inputSequence, setInputSequence] = useState(105);
  const [maxSeq, setMaxSeq] = useState(100);
  const [receivedBitmap, setReceivedBitmap] = useState([1, 1, 0, 1, 0, 0, 1, 1]); // 8-slot visual subset
  const [lastActionStatus, setLastActionStatus] = useState("INITIALIZED");

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi_replay_defense");

  // Studio 4: Anti-Replay Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("redis_nonce");

  // 8 Replay Threat Vector Profiles for Studio 1
  const replayDatabase = {
    upi_financial_replay: {
      key: "upi_financial_replay",
      name: "Financial Transaction Replay (UPI / Banking APIs)",
      category: "FINANCIAL APPLICATION REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (HTTPS REST / RPC)",
      threatMechanism:
        "Adversary intercepts an encrypted payment request packet (`Transfer ₹50,000 to Debangshu`) and re-transmits the ciphertext 10 times to the bank endpoint, draining the victim's balance.",
      vulnerabilityRoot: "Stateless payment endpoints lacking single-use nonces and HTTP Idempotency Keys.",
      productionDefense: "HTTP Idempotency Keys (RFC 9440) + Redis TTL Nonce Deduplication (300s cache window).",
      codeSnippet: `// Redis Idempotency Key Middleware:
const isProcessed = await redis.set(\`idemp:\${idempKey}\`, "SUCCESS", "NX", "EX", 86400);
if (!isProcessed) return res.json(await redis.get(\`receipt:\${idempKey}\`));`
    },
    automotive_rolljam: {
      key: "automotive_rolljam",
      name: "Automotive Rolljam Keyfob Replay",
      category: "PHYSICAL RF / IOT REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Physical RF (433 MHz / 315 MHz)",
      threatMechanism:
        "Dual-frequency SDR jammer blocks the vehicle receiver while recording the user's first rolling code. On the second click, it captures the second code and emits the first code to unlock the car, keeping the unused second code for theft.",
      vulnerabilityRoot: "Asynchronous rolling code windows and lack of two-way challenge-response in keyfobs.",
      productionDefense: "Multi-stage two-way cryptographically signed challenge-response transceivers.",
      codeSnippet: `// Two-Way Keyfob Challenge Response:
// Car -> Keyfob : Transmits 128-bit Nonce R
// Keyfob -> Car : Transmits AES_K( R || Counter || "UNLOCK" )`
    },
    kerberos_ticket_replay: {
      key: "kerberos_ticket_replay",
      name: "Kerberos Service Ticket Replay",
      category: "ENTERPRISE IDENTITY REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (Kerberos V5)",
      threatMechanism:
        "Attacker intercepts an authentic Service Ticket and replays it to application servers to gain unauthorized access to databases or file shares.",
      vulnerabilityRoot: "Failure of target server to maintain a Replay Cache of client Authenticator timestamps.",
      productionDefense: "Mandatory Kerberos Replay Cache with 5-minute maximum clock skew (Δt = 300s).",
      codeSnippet: `// Kerberos Replay Cache Logic:
if (abs(currentTime - authTimestamp) > 300) return KRB_AP_ERR_SKEW;
if (replayCache.has(clientName, authTimestamp)) return KRB_AP_ERR_REPEAT;`
    },
    scada_breaker_replay: {
      key: "scada_breaker_replay",
      name: "SCADA Power Grid Command Replay",
      category: "CRITICAL INDUSTRIAL OT REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (Modbus / DNP3)",
      threatMechanism:
        "Adversary replays a recorded 'Trip 220kV Circuit Breaker' packet to an electrical substation RTU in Barrackpore, triggering a regional blackout.",
      vulnerabilityRoot: "Unauthenticated legacy industrial protocols accepting raw replayed binary command strings.",
      productionDefense: "DNP3 Secure Authentication version 5 (IEC 62351-5) challenge nonces and sequence numbers.",
      codeSnippet: `// DNP3 SAv5 Sequence Nonce Check:
if (command.seqNum <= rtu.lastSeenSeqNum) {
    log_security_alert("Replayed SCADA Trip Command Dropped!");
    return DROP_PACKET;
}`
    },
    tls_0rtt_early_data: {
      key: "tls_0rtt_early_data",
      name: "TLS 1.3 0-RTT Early Data Replay",
      category: "TRANSPORT PROTOCOL REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 4 (TLS 1.3)",
      threatMechanism:
        "Attacker captures initial 0-RTT ClientHello early data flight and replays it to the server, causing non-idempotent HTTP actions to execute multiple times.",
      vulnerabilityRoot: "0-RTT early data transmitted before handshake completion without replay caching.",
      productionDefense: "Restricting 0-RTT to idempotent GET requests and enforcing single-use TLS session tickets.",
      codeSnippet: `// Nginx Anti-0-RTT Replay Configuration:
ssl_early_data on;
# Drop non-idempotent POST methods in early data flight:
if ($ssl_early_data = "1") { set $block_post 1; }`
    },
    ble_smartlock_replay: {
      key: "ble_smartlock_replay",
      name: "Bluetooth Smart Lock Replay",
      category: "SMART HOME / PHYSICAL IOT",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 2 (BLE Link Layer)",
      threatMechanism:
        "Attacker sniffs static BLE write commands transmitted by a smartphone app and replays the hex string to unlock physical facility doors.",
      vulnerabilityRoot: "Static hexadecimal unlock payloads lacking dynamic cryptographic rolling counters.",
      productionDefense: "AES-128-CCM authenticated encryption with ephemeral rolling nonces generated per session.",
      codeSnippet: `// Secure BLE Nonce Verification:
if (!verify_aes_ccm(ble_payload, ephemeral_session_nonce, lock_key)) {
    alert_buzzer("Replay Attempt Blocked!");
}`
    },
    saml_assertion_replay: {
      key: "saml_assertion_replay",
      name: "SAML 2.0 / OIDC Assertion Replay",
      category: "FEDERATED CLOUD IDENTITY REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (HTTP POST Binding)",
      threatMechanism:
        "Attacker intercepts an authentic XML SAML assertion in a browser redirect and replays it to multiple service providers to gain access.",
      vulnerabilityRoot: "Missing `NotOnOrAfter` validation and lack of Assertion ID caching by service providers.",
      productionDefense: "SAML Assertion ID caching, strict 120s `NotOnOrAfter` timestamps, and Recipient URL binding.",
      codeSnippet: `// SAML Assertion Validation:
if (Date.now() > parseISO(assertion.NotOnOrAfter)) throw new Error("Expired");
if (await cache.has(assertion.ID)) throw new Error("Duplicate Assertion Replayed");`
    },
    firmware_downgrade_rollback: {
      key: "firmware_downgrade_rollback",
      name: "Firmware Downgrade Rollback Attack",
      category: "HARDWARE & FIRMWARE REPLAY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Firmware / UEFI / Bootloader",
      threatMechanism:
        "Attacker flashes a legitimate but older, vulnerable signed version of firmware to resurrect previously patched vulnerabilities.",
      vulnerabilityRoot: "Bootloaders checking only cryptographic signature validity without verifying version numbers.",
      productionDefense: "Hardware Monotonic Non-Volatile Counters in TPM 2.0 and eFuses.",
      codeSnippet: `// TPM 2.0 Anti-Rollback Monotonic Counter Check:
if (new_firmware_version < tpm_nv_read(COUNTER_INDEX)) {
    halt_system("Downgrade Replay Attack Detected: Boot Aborted!");
}`
    }
  };

  const activeReplay = replayDatabase[selectedReplayKey];

  // Studio 2: Interactive IPsec Sliding Window Logic
  const handleProcessPacket = (seq) => {
    const windowSize = 8; // Visual 8-slot window representation
    let newMaxSeq = maxSeq;
    let newBitmap = [...receivedBitmap];
    let statusText = "";

    if (seq > maxSeq) {
      const shift = seq - maxSeq;
      newMaxSeq = seq;
      // Shift bitmap right
      for (let i = 0; i < shift; i++) {
        newBitmap.pop();
        newBitmap.unshift(0);
      }
      newBitmap[0] = 1; // Mark current packet as received
      statusText = `PACKET ${seq} ACCEPTED (New Maximum Sequence: ${newMaxSeq}. Window slid by ${shift} slots).`;
    } else if (seq <= maxSeq - windowSize) {
      statusText = `PACKET ${seq} DROPPED (Too old! Sequence fell behind window boundary: ${maxSeq - windowSize}).`;
    } else {
      const offset = maxSeq - seq;
      if (newBitmap[offset] === 1) {
        statusText = `REPLAY DETECTED! Packet ${seq} DROPPED (Duplicate sequence number already seen).`;
      } else {
        newBitmap[offset] = 1;
        statusText = `PACKET ${seq} ACCEPTED (Out-of-order packet within valid window. Slot ${offset} marked).`;
      }
    }

    setMaxSeq(newMaxSeq);
    setReceivedBitmap(newBitmap);
    setLastActionStatus(statusText);
  };

  // Studio 4: Anti-Replay Code Database
  const codeDatabase = {
    redis_nonce: {
      name: "Redis Nonce TTL Deduplication (Node.js)",
      code: `const crypto = require('crypto');
const Redis = require('ioredis');
const redis = new Redis();

async function verifyRequestFreshness(nonce, timestamp, signature, payload, secretKey) {
  const MAX_SKEW_MS = 300000; // 5 Minutes (CERT-In Window)
  const now = Date.now();
  
  // 1. Validate Timestamp Sliding Window:
  if (Math.abs(now - timestamp) > MAX_SKEW_MS) {
    throw new Error("Timestamp Expired: Outside acceptable 5-minute skew window.");
  }
  
  // 2. Atomic Nonce Check & Burn (Set-if-Not-Exists with 300s TTL):
  const isUnique = await redis.set(\`nonce:\${nonce}\`, "USED", "NX", "EX", 300);
  if (!isUnique) {
    throw new Error("Replay Attack Detected: Nonce has already been consumed!");
  }
  
  // 3. Verify Cryptographic Signature:
  const expectedSig = crypto.createHmac('sha256', secretKey)
    .update(\`\${nonce}:\${timestamp}:\${payload}\`)
    .digest('hex');
    
  if (!crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(signature))) {
    throw new Error("Signature Mismatch: In-flight payload tampered!");
  }
  
  return true;
}`,
      explanation: "Combines a 5-minute timestamp sliding window with an atomic Redis `SET NX EX` check to reject replayed requests in O(1) time."
    },
    ipsec_c_window: {
      name: "C-Based IPsec 64-Packet Sliding Window",
      code: `typedef struct {
    uint64_t bitmap;      // 64-bit sliding window bitmap
    uint32_t last_seq;    // Highest sequence number seen so far
} ipsec_replay_window_t;

int ipsec_check_replay(ipsec_replay_window_t *win, uint32_t seq) {
    if (seq > win->last_seq) {
        uint32_t diff = seq - win->last_seq;
        if (diff < 64) {
            win->bitmap = (win->bitmap << diff) | 1ULL;
        } else {
            win->bitmap = 1ULL; // Advanced beyond full window
        }
        win->last_seq = seq;
        return 1; // ACCEPT
    }
    if (seq <= win->last_seq - 64) {
        return 0; // REJECT: Packet too old
    }
    uint32_t bit_index = win->last_seq - seq;
    if (win->bitmap & (1ULL << bit_index)) {
        return 0; // REJECT: Duplicate packet replay
    }
    win->bitmap |= (1ULL << bit_index); // Mark as received
    return 1; // ACCEPT: Out-of-order in window
}`,
      explanation: "Standard RFC 4303 C implementation using bitwise operations to detect duplicate and out-of-order packets at line rate."
    },
    idempotency_handler: {
      name: "Express.js HTTP Idempotency Handler",
      code: `const express = require('express');
const app = express();

app.post('/api/v1/upi/transfer', async (req, res) => {
  const idempKey = req.headers['idempotency-key'];
  if (!idempKey) return res.status(400).json({ error: "Missing Idempotency-Key header" });
  
  // Check if transaction was already processed
  const cachedResponse = await redis.get(\`idemp:\${idempKey}\`);
  if (cachedResponse) {
    // Return cached response without double-charging!
    return res.status(200).json(JSON.parse(cachedResponse));
  }
  
  // Execute payment transaction
  const result = await executeBankDebit(req.body);
  await redis.set(\`idemp:\${idempKey}\`, JSON.stringify(result), 'EX', 86400);
  res.status(200).json(result);
});`,
      explanation: "Guarantees API idempotency (RFC 9440) by storing transaction receipts under client-generated UUID keys for 24 hours."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_upi_replay_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Hub",
      title: "Eliminating Payment Replay Fraud on Multi-Bank UPI Switch",
      threatType: "ACTIVE TRANSACTION REPLAY (Stateless Payment Duplicate)",
      budget: "₹29,00,000",
      incident:
        "During a network stress test, automated replay tools re-transmitted valid encrypted payment authorization packets, duplicating ₹50,000 debits because the legacy switch lacked Redis nonce caching.",
      defenseStrategy:
        "Mamata implemented a triple-shield anti-replay framework: mandatory HTTP `Idempotency-Key` (UUIDv4), atomic Redis TTL nonce caching (300s window), and NPL India IST NTP synchronization.",
      outcome: "100% of replayed transaction attempts rejected; payment duplication reduced to absolute zero.",
      metrics: {
        replayedDebitsBlocked: "8,500 Duplicate Packets",
        nonceLookupSpeed: "0.15 ms via Redis RAM",
        dailyTransactionsProtected: "₹210 Crores",
        compliance: "RBI Master Direction on Digital Payments Section 6"
      }
    },
    {
      id: "barrackpore_scada_dnp3",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "INDUSTRIAL COMMAND REPLAY (SCADA Breaker Trip)",
      title: "Hardening High-Voltage Substations with DNP3 SAv5 Nonces",
      budget: "₹17,00,000",
      incident:
        "A red team exercise demonstrated that an attacker who recorded a legitimate maintenance 'Trip Breaker' command on the substation microwave link could replay the packet during peak load to blackout the district.",
      defenseStrategy:
        "Debangshu configured DNP3 Secure Authentication version 5 (IEC 62351-5) on all substation RTUs, enforcing monotonic sequence numbers and HMAC-SHA256 challenge nonces on all control commands.",
      outcome: "Replayed trip commands rejected with sequence mismatch; power grid maintained uninterrupted transmission.",
      metrics: {
        breakerCommandsSecured: "18 Substation Relays",
        antiReplayLatency: "8 ms Challenge-Response",
        gridReliability: "99.999% Uptime",
        mandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_health_presc_replay",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "MEDICAL PRESCRIPTION REPLAY FRAUD",
      title: "Preventing Drug Dispensing Replay with Signed UUIDv4 Nonces",
      budget: "₹9,50,000",
      incident:
        "An internal audit revealed that oncology drug dispensing requests sent from doctor workstations to the automated pharmacy dispenser could be replayed to dispense restricted narcotics multiple times.",
      defenseStrategy:
        "Mahima integrated single-use UUIDv4 cryptographic nonces and Ed25519 digital signatures into all e-prescription tokens, verified and burned by the pharmacy dispensing database upon actuation.",
      outcome: "Duplicate prescription dispensing rendered impossible; full legal accountability preserved.",
      metrics: {
        prescriptionsProtected: "120,000 Annual Tokens",
        duplicateDispenseRate: "0.00%",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_rolljam_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Wireless & RF Research Lab",
      threatType: "RF WIRELESS ROLLING CODE REPLAY (Rolljam)",
      title: "Designing Cryptographic Two-Way Challenge RF Transceivers",
      budget: "₹11,00,000",
      incident:
        "Researchers built an experimental Software Defined Radio (HackRF) testbed demonstrating Rolljam dual-frequency jamming attacks on commercial 433 MHz rolling code keyfobs.",
      defenseStrategy:
        "Susmita and Abhronila engineered a two-way challenge-response transceiver protocol using AES-128-CCM and 128-bit dynamic nonces, completely neutralizing Rolljam jamming and capture attacks.",
      outcome: "Demonstrated 100% resilience against Rolljam SDR attacks in laboratory testing.",
      metrics: {
        rolljamVulnerability: "100% Neutralized",
        rfResponseTime: "14 ms",
        encryptionEngine: "AES-128-CCM",
        publication: "IEEE Transactions on Mobile Computing"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 06
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Active Attacks: Replay Attacks &amp; Timestamp Protection
            </h1>
            <p className="text-xs text-gray-400">
              Cryptographic nonces, sliding window bitmaps, IPsec RFC 4303, Rolljam SDR attacks, and CERT-In NTP sync.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & The Replay Paradox */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Message Freshness &amp; Replay Vulnerability
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Replay Paradox: Why 100% Encrypted Data Remains Vulnerable to Replay
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              An <strong>Active Replay Attack</strong> combines passive packet interception with active delayed re-transmission. 
              Because the adversary does not need to decrypt or modify the payload, valid ciphertext replayed to a stateless server 
              will execute a second time. Defense requires proving <strong>Message Freshness</strong> via Nonces, Timestamps, and Sequence Numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Replay Model Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Replay Attack Flow
              </span>
              <p className="text-gray-300 leading-relaxed">
                An attacker sniffs a valid payment authorization ciphertext packet: <code className="text-rose-300">C = E_K("Transfer ₹50,000")</code>. 
                Replaying C to the bank server triggers another ₹50,000 transfer unless the server verifies single-use freshness.
              </p>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60">
                P(Replay Success) &gt; 0 whenever Message Freshness is unverified!
              </div>
            </div>

            {/* Freshness Proof Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The 3-Tier Freshness Proof Formula
              </span>
              <p className="text-gray-300 leading-relaxed">
                Combining 128-bit CSPRNG Nonces, microsecond timestamps with 5-minute sliding windows (Δt = 300s), 
                and HMAC-SHA256 integrity seals reduces replay probability to mathematically zero:
              </p>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60">
                Freshness Proof: |t_recv - t_msg| ≤ 300s AND Redis.set(nonce, "USED", "NX") === TRUE
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - IPsec Sliding Window Anti-Replay Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              IPsec RFC 4303 Sliding Window
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing the IPsec 64-Packet Anti-Replay Sliding Window Algorithm
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how the IPsec sliding bitmap tracks sequence numbers at wire speed, accepting new higher sequences, 
              tolerating out-of-order packets within the window, and discarding old or duplicate replayed packets:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main Window Boundary Box */}
              <rect x="180" y="60" width="520" height="150" rx="12" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
              <text x="440" y="90" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                IPsec 64-Packet Anti-Replay Sliding Window (Current Max Seq = {maxSeq})
              </text>
              <text x="440" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Valid Acceptance Range: [{maxSeq - 7} to {maxSeq}]
              </text>

              {/* Window Slots (Visual 8-slot representation) */}
              <g transform="translate(200, 130)">
                {receivedBitmap.map((bit, idx) => {
                  const seqNum = maxSeq - idx;
                  const isReceived = bit === 1;
                  return (
                    <g key={idx} transform={`translate(${idx * 60}, 0)`}>
                      <rect
                        width="50"
                        height="55"
                        rx="6"
                        fill={isReceived ? "#064e3b" : "#1e293b"}
                        stroke={isReceived ? "#10b981" : "#475569"}
                        strokeWidth="1.5"
                      />
                      <text x="25" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                        #{seqNum}
                      </text>
                      <text
                        x="25"
                        y="44"
                        fill={isReceived ? "#34d399" : "#94a3b8"}
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {isReceived ? "SEEN" : "EMPTY"}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Left Zone: Too Old */}
              <rect x="40" y="120" width="120" height="70" rx="8" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="100" y="148" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                TOO OLD
              </text>
              <text x="100" y="168" fill="#fca5a5" fontSize="9" textAnchor="middle">
                Seq &lt; {maxSeq - 7} ➔ DROP
              </text>

              {/* Right Zone: Higher Sequence */}
              <rect x="720" y="120" width="120" height="70" rx="8" fill="#042f2e" stroke="#14b8a6" strokeWidth="1.5" />
              <text x="780" y="148" fill="#2dd4bf" fontSize="11" fontWeight="bold" textAnchor="middle">
                NEW MAX
              </text>
              <text x="780" y="168" fill="#99f6e4" fontSize="9" textAnchor="middle">
                Seq &gt; {maxSeq} ➔ SLIDE
              </text>

              {/* Bottom Instruction */}
              <text x="440" y="260" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                Status: <tspan fill="#38bdf8" fontWeight="bold">{lastActionStatus}</tspan>
              </text>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Replay Threat Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Replay Attack Threat Vector &amp; Protocol Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a replay threat vector below to examine its exploitation mechanism, underlying vulnerability, 
              live payload traces, and production mitigation code:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(replayDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedReplayKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedReplayKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  REPLAY
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeReplay.categoryBadge)}>
                    {activeReplay.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeReplay.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeReplay.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Mechanism &amp; Impact
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeReplay.threatMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Root Cause
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeReplay.vulnerabilityRoot}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Production Anti-Replay Defense
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeReplay.productionDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Implementation Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeReplay.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Interactive Sliding Window Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. IPsec Sliding Window Sequence Tester Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Inject packets with various sequence numbers to test how the sliding window detects out-of-order packets, 
              slides forward on new maximums, and drops expired or duplicate replayed packets:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Packet Sequence Injector</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Packet Sequence Number:</span>
                  <span className="text-cyan-400 font-bold font-mono">#{inputSequence}</span>
                </div>
                <input
                  type="range"
                  min={maxSeq - 15}
                  max={maxSeq + 15}
                  value={inputSequence}
                  onChange={(e) => setInputSequence(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleProcessPacket(inputSequence)}
                  className="p-2.5 rounded-lg border font-bold text-xs bg-cyan-950 border-cyan-500 text-cyan-300 hover:bg-cyan-900 transition-all duration-300 text-center"
                >
                  Send Packet #{inputSequence}
                </button>
                <button
                  onClick={() => handleProcessPacket(maxSeq - 2)}
                  className="p-2.5 rounded-lg border font-bold text-xs bg-rose-950 border-rose-500 text-rose-300 hover:bg-rose-900 transition-all duration-300 text-center"
                >
                  ⚡ Replay Packet #{maxSeq - 2}
                </button>
              </div>

              <div className="pt-2 text-[11px] text-gray-400">
                Current State: <strong className="text-white">MaxSeq = {maxSeq}</strong> | Window Range: [{maxSeq - 7} .. {maxSeq}]
              </div>
            </div>

            {/* Output Diagnostics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Receiver Decision Log</h3>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">Latest Packet Decision:</span>
                <p className="font-mono text-xs text-white bg-black/80 p-3 rounded border border-gray-800">
                  {lastActionStatus}
                </p>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1 text-[11px] text-gray-300">
                <p>• <strong>Seq &gt; MaxSeq:</strong> Window slides right, bit 0 set to 1.</p>
                <p>• <strong>Seq in Window:</strong> Checks bitmap bit. If 1 ➔ REPLAY DROP. If 0 ➔ ACCEPT &amp; MARK.</p>
                <p>• <strong>Seq &le; MaxSeq - 8:</strong> Packet dropped as too old.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-Replay Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Production Code &amp; Middleware
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Anti-Replay Code Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Inspect production implementations of Redis TTL Nonce verification, C-based IPsec sliding window algorithms, 
              and HTTP Idempotency Key middleware:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Code
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita defeat active replay attacks 
              across critical West Bengal infrastructure:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; Replay Threat
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. CERT-In Mandates &amp; Statutory Penalties for Replay Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian regulatory frameworks mandate strict clock synchronization and punish fraudulent packet replays:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                CERT-In Time Synchronization Mandate
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">NPL India NTP Sync:</strong> All Indian enterprises must synchronize system clocks with Indian Standard Time (IST) via <code className="text-purple-300">samay1.nic.in</code>.
                </li>
                <li>
                  <strong className="text-white">Anti-Replay Accuracy:</strong> Prevents clock drift from causing false rejects or allowing replayed expired transactions.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 66 &amp; 43(g)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking penalties (Up to 3 years prison + ₹5 Lakh fine) for executing automated transaction replays.
                </li>
                <li>
                  <strong className="text-white">Section 43(g):</strong> Civil compensation up to ₹1 Crore for denying access to authorized users via packet replay.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Section 8(5) &amp; 33
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Protection Against Reprocessing:</strong> Mandates technical safeguards (Nonces / Idempotency) on all citizen payment &amp; medical portals.
                </li>
                <li>
                  <strong className="text-white">Penalties:</strong> Statutory fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for systemic replay breach vulnerabilities.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Assuming Encryption Prevents Replay:</strong> Encryption hides meaning, not existence; replaying valid ciphertext executes commands again!
                </li>
                <li>
                  <strong>Using Short (32-bit) Nonces:</strong> 32-bit nonces suffer birthday collisions after ~65,000 requests; always use 128-bit nonces.
                </li>
                <li>
                  <strong>Ignoring Clock Drift in Timestamps:</strong> If servers do not sync with NTP (NPL India), valid timestamps get rejected.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Enforce HTTP Idempotency Keys:</strong> Return cached receipts for duplicate POST payment requests to stop double-charging.
                </li>
                <li>
                  <strong>Use Redis Atomic `SET NX EX`:</strong> Store nonces with a 300s TTL to achieve O(1) deduplication with zero memory leaks.
                </li>
                <li>
                  <strong>Enable IPsec 128-Packet Sliding Windows:</strong> Drop duplicate sequence numbers at wire speed without impacting CPU.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  If a bank teller receives a photocopied signed check, what prevents them from cashing it a second time?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does combining a 5-minute timestamp window with nonces mean you only need to store nonces for 5 minutes instead of forever?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the sliding window tester above, send packet #98 twice—see how the bitmap flags it as SEEN and drops the duplicate.
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Replay attacks succeed against encrypted streams because attackers do not need to decrypt them.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Cryptographic Nonces (128-bit) guarantee single-use freshness for every transaction.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Timestamps combined with sliding windows (Δt = 300s) eliminate permanent nonce storage.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IPsec uses a 64/128-packet sliding bitmap to drop duplicate sequence numbers at line rate.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HTTP Idempotency Keys (RFC 9440) prevent duplicate financial debit replays in REST APIs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates microsecond NTP synchronization with NPL India for all enterprise servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active Attacks: Replay & Timestamp Protection FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Freshness Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Active Attacks: Replay Attacks and Timestamp Protection (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Replay attacks reveal why encryption alone is never enough for security! An attacker doesn't need to know what an encrypted packet says—they just need to record it and play it back to duplicate your payment or open your garage door! Always prove Message Freshness using 128-bit Cryptographic Nonces, microsecond timestamps with 5-minute sliding windows (Δt = 300s), and HTTP Idempotency Keys. And remember: CERT-In mandates that all servers in India must synchronize their clocks with NPL India atomic servers (samay1.nic.in)!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
