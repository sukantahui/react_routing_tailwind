import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgTamperId = useId();

  // Studio 1: Active Tampering Threat Vector Selection
  const [selectedTamperKey, setSelectedTamperKey] = useState("in_flight_tampering");

  // Studio 2: Live Bit-Flipping Simulator State
  const [cryptoMode, setCryptoMode] = useState("aes_gcm_aead");
  const [isBitFlipped, setIsBitFlipped] = useState(false);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi_tampering");

  // Studio 4: Scapy Code Lab Tab
  const [activeScapyTab, setActiveScapyTab] = useState("scapy_tamper");

  // 8 Data Tampering Threat Vector Profiles for Studio 1
  const tamperingDatabase = {
    in_flight_tampering: {
      key: "in_flight_tampering",
      name: "In-Flight Packet Payload Rewriting",
      category: "ACTIVE DATA TAMPERING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Integrity (Pillar I)",
      targetLayer: "Layer 4 (Transport) / Layer 7 (Application)",
      systemImpact: "Direct State Corruption — Altering financial beneficiaries, quantities, or database values.",
      detectabilityScore: 92,
      mechanism:
        "Adversary positions as an in-line proxy, intercepts in-flight TCP packets, rewrites critical payload strings in memory (e.g. changing account number or transaction amount), and recalculates TCP checksums before forwarding.",
      realWorldPayload: "Original: { amount: ₹500, to: 'Debangshu' } ➔ Tampered: { amount: ₹50,000, to: 'Attacker_Mule' }",
      mitigation: "Authenticated Encryption with Associated Data (AEAD - AES-256-GCM), HMAC-SHA256, and Digital Signatures.",
      codeSnippet: `// Scapy Payload Rewriting Script:
def tamper_pkt(pkt):
    if pkt.haslayer(Raw) and b"amount=500" in pkt[Raw].load:
        pkt[Raw].load = pkt[Raw].load.replace(b"amount=500", b"amount=50000")
        del pkt[IP].chksum; del pkt[TCP].chksum
        send(pkt)`
    },
    cbc_bit_flipping: {
      key: "cbc_bit_flipping",
      name: "Ciphertext Bit-Flipping Malleability Attack",
      category: "CRYPTOGRAPHIC INTEGRITY ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Integrity & Authenticity",
      targetLayer: "Cryptographic Presentation Layer",
      systemImpact: "Silent Plaintext Modification — Predictably altering decrypted plaintext without the key.",
      detectabilityScore: 35,
      mechanism:
        "In CBC and Stream ciphers without integrity tags, XORing a delta Δ into ciphertext block C_{i-1} predictably flips the corresponding bits in decrypted plaintext block P_i without triggering key errors.",
      realWorldPayload: "Ciphertext[0] ^= ('user' ^ 'admin') ➔ Decrypted Plaintext becomes: 'role=admin&id=99'",
      mitigation: "Enforce AEAD ciphers (AES-256-GCM / ChaCha20-Poly1305); complete deprecation of unauthenticated CBC/CTR.",
      codeSnippet: `// Bit-Flipping Exploit Equation:
// P'_i = D_K(C_i) ^ C'_{i-1}
// Delta = Plaintext_Original ^ Plaintext_Target
// Ciphertext_Prev ^= Delta &rarr; Decrypts cleanly to Target!`
    },
    padding_oracle: {
      key: "padding_oracle",
      name: "Padding Oracle Attack (POODLE / Vaudenay)",
      category: "SIDE-CHANNEL DECRYPTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Confidentiality via Active Integrity Tampering",
      targetLayer: "Layer 6 / Layer 7",
      systemImpact: "Complete Plaintext Recovery — Decrypting ciphertexts byte-by-byte in 256 queries.",
      detectabilityScore: 78,
      mechanism:
        "Adversary alters ciphertext bytes and submits them to the server, observing whether the server returns a 'Padding Error' or 'Application Error' to mathematically deduce plaintext bytes.",
      realWorldPayload: "Altering last byte of C[i-1] -&gt; Server returns 200 OK -> Plaintext byte calculated as (PadVal ^ Guess)",
      mitigation: "Encrypt-then-MAC (EtM) paradigm and constant-time error handling.",
      codeSnippet: `// Encrypt-then-MAC Defense Pipeline:
// 1. Verify HMAC_K2(Ciphertext) == AuthTag
// 2. IF INVALID -> Abort immediately! (Never call AES Decrypt)
// 3. IF VALID   -> Call AES_Decrypt_K1(Ciphertext)`
    },
    sql_parameter_injection: {
      key: "sql_parameter_injection",
      name: "In-Flight SQL & XML Parameter Tampering",
      category: "APPLICATION LAYER INJECTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Database Integrity",
      targetLayer: "Layer 7 (Application)",
      systemImpact: "Database Compromise — Executing arbitrary SQL commands, dumping tables, or dropping ledgers.",
      detectabilityScore: 85,
      mechanism:
        "Altering in-transit HTTP parameters to inject SQL meta-characters (`' OR '1'='1`) into unparameterized database queries, altering the backend execution syntax tree.",
      realWorldPayload: "POST /login -> user=admin' OR '1'='1' --&pass=x (Bypasses password verification)",
      mitigation: "Parameterized Prepared Statements, ORMs with strict type binding, and Web Application Firewalls (WAF).",
      codeSnippet: `// Secure Parameterized Query in Node.js / MySQL:
const sql = "SELECT * FROM accounts WHERE user_id = ? AND status = ?";
db.query(sql, [userId, 'ACTIVE'], (err, results) => { ... });`
    },
    tcp_seq_desync: {
      key: "tcp_seq_desync",
      name: "TCP Sequence Number Desynchronization",
      category: "TRANSPORT PROTOCOL TAMPERING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Session Integrity",
      targetLayer: "Layer 4 (Transport)",
      systemImpact: "Session Hijacking & Data Injection — Forging commands while keeping connection open.",
      detectabilityScore: 88,
      mechanism:
        "Adversary injects extra data bytes into an active TCP connection and continuously recalculates sequence/acknowledgment numbers for both client and server to prevent session reset.",
      realWorldPayload: "Injected: 'rm -rf /var/log/audit' [Seq: 10420] -> Re-synced client Seq: pkt.seq += 24",
      mitigation: "TLS 1.3 Record Layer authenticated sequence counters and IPsec ESP.",
      codeSnippet: `// TLS 1.3 Anti-Desync Record Counter:
// Record sequence numbers are monotonically incremented and sealed inside AEAD tag.
// Any out-of-order or injected TCP segment fails AEAD decryption immediately.`
    },
    binary_authenticode_hijack: {
      key: "binary_authenticode_hijack",
      name: "In-Flight Software Binary / DLL Tampering",
      category: "SUPPLY CHAIN TAMPERING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Software Integrity",
      targetLayer: "Application / Operating System",
      systemImpact: "Malware Insertion — Replacing legitimate software installers with backdoored executables.",
      detectabilityScore: 90,
      mechanism:
        "During an unencrypted HTTP software download, an in-line proxy injects malicious shellcode into the portable executable (PE) binary header before delivering it to the client.",
      realWorldPayload: "setup.exe [Original SHA-256: 9a8f...4e1b] ➔ Tampered setup.exe [Injected Cobalt Strike Beacon]",
      mitigation: "X.509 Digital Code Signing (Microsoft Authenticode / Apple CodeSign) and HTTPS-only software repositories.",
      codeSnippet: `// Microsoft Authenticode Code Signing Verification:
signtool verify /pa /v /all production_setup.exe
# Result: Verification fails if even a single byte was altered in transit!`
    },
    merkle_root_corruption: {
      key: "merkle_root_corruption",
      name: "Distributed Ledger Merkle Root Tampering",
      category: "LEDGER INTEGRITY ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Historical Record Integrity",
      targetLayer: "In-Rest Database / Blockchain",
      systemImpact: "Audit Fraud — Modifying historical transaction records in database ledgers.",
      detectabilityScore: 99,
      mechanism:
        "Attempting to modify a past transaction record in a Merkle tree ledger changes the leaf hash, invalidating the parent hash and corrupting the top-level Merkle Root.",
      realWorldPayload: "Altering Tx1 in block 402 invalidates Merkle Root 0x4f8e... ➔ Rejected by all peer nodes!",
      mitigation: "Cryptographic Merkle Trees, WORM Object Lock storage, and signed ledger commitments.",
      codeSnippet: `// Merkle Tree Verification Equation:
// Leaf_A = Hash(Tx1), Leaf_B = Hash(Tx2)
// Parent_AB = Hash(Leaf_A || Leaf_B)
// Root = Hash(Parent_AB || Parent_CD) -> Any tampering invalidates Root!`
    },
    disk_log_tampering: {
      key: "disk_log_tampering",
      name: "Local Audit Log Tampering & Wiping",
      category: "POST-EXPLOITATION TAMPERING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Accountability & Non-Repudiation",
      targetLayer: "In-Rest Storage / OS Audit Subsystem",
      systemImpact: "Forensic Erasure — Deleting evidence of unauthorized admin access.",
      detectabilityScore: 80,
      mechanism:
        "Attacker gaining root access executes `rm /var/log/auth.log` or overwrites database audit tables to erase intrusion traces.",
      realWorldPayload: "Command: 'truncate -s 0 /var/log/secure' or 'UPDATE audit_logs SET status = DELETED'",
      mitigation: "Write-Once-Read-Many (WORM) S3 Object Lock (Compliance Mode) and real-time remote syslog shipping.",
      codeSnippet: `// AWS S3 Object Lock (Compliance Mode WORM):
aws s3api put-object-retention \\
  --bucket kolkata-audit-logs \\
  --key 2026/auth-ledger.json \\
  --retention '{"Mode": "COMPLIANCE", "RetainUntilDate": "2026-12-31T23:59:59Z"}'`
    }
  };

  const activeTamper = tamperingDatabase[selectedTamperKey];

  // Studio 2: Live Bit-Flipping Simulator Logic
  const bitFlipSimulation = useMemo(() => {
    const originalPlaintext = "Transfer: ₹500 to Debangshu | Status: PENDING";
    
    if (cryptoMode === "raw_cbc_no_mac") {
      if (isBitFlipped) {
        return {
          decryptedText: "Transfer: ₹50000 to AttackerMule | Status: APPROVED",
          integrityStatus: "SILENT TAMPERING SUCCESSFUL (No Tag Verification!)",
          systemAction: "Vulnerable server decrypted modified ciphertext; processed ₹50,000 fraudulent transfer!",
          badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
          isBlocked: false
        };
      } else {
        return {
          decryptedText: originalPlaintext,
          integrityStatus: "NORMAL (Unmodified Ciphertext)",
          systemAction: "Server decrypted original plaintext cleanly.",
          badgeClass: "bg-gray-900 text-gray-300 border-gray-800",
          isBlocked: false
        };
      }
    } else {
      // AEAD (AES-256-GCM) Mode
      if (isBitFlipped) {
        return {
          decryptedText: "[DECRYPTION ABORTED: Ciphertext Corrupted]",
          integrityStatus: "CRYPTO TAMPERING DETECTED! (GHASH Tag Mismatch)",
          systemAction: "AES-256-GCM authentication tag verification failed. Socket closed; P1 SOC alarm dispatched!",
          badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
          isBlocked: true
        };
      } else {
        return {
          decryptedText: originalPlaintext,
          integrityStatus: "AUTHENTICATION TAG VERIFIED (100% Authentic)",
          systemAction: "AEAD 16-byte Galois tag verified; payload decrypted safely.",
          badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
          isBlocked: true
        };
      }
    }
  }, [cryptoMode, isBitFlipped]);

  // Studio 4: Scapy Code Lab Tabs
  const scapyDatabase = {
    scapy_tamper: {
      name: "In-Flight Packet Tampering Script",
      code: `from scapy.all import *
def modify_packet(pkt):
    if pkt.haslayer(Raw) and b"amount=500" in pkt[Raw].load:
        # Rewrite in-flight payload bytes
        pkt[Raw].load = pkt[Raw].load.replace(b"amount=500", b"amount=50000")
        # Invalidate cached checksums so Scapy recalculates valid sums
        del pkt[IP].chksum
        del pkt[TCP].chksum
        send(pkt)
sniff(filter="tcp port 8080", prn=modify_packet)`,
      explanation: "Uses Python Scapy to intercept cleartext TCP packets on port 8080, modify financial parameters in memory, recalculate IP/TCP checksums, and forward the tampered frame."
    },
    hmac_defense: {
      name: "HMAC-SHA256 Integrity Verification",
      code: `const crypto = require('crypto');
function verifyMessageIntegrity(payload, receivedTag, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(payload);
  const calculatedTag = hmac.digest('hex');
  
  // Constant-time comparison prevents timing side-channels
  if (!crypto.timingSafeEqual(Buffer.from(calculatedTag), Buffer.from(receivedTag))) {
    throw new Error("Security Alert: In-flight payload tampering detected!");
  }
  return JSON.parse(payload);
}`,
      explanation: "Enforces HMAC-SHA256 verification over received payloads before executing commands. Any single-bit tampering in transit causes constant-time tag comparison to fail."
    },
    aead_gcm_cipher: {
      name: "AES-256-GCM AEAD Encryption",
      code: `const crypto = require('crypto');
function encryptAEAD(plaintext, key, iv, associatedData) {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(associatedData));
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag(); // 16-byte cryptographic seal
  return { ciphertext: ciphertext.toString('hex'), authTag: authTag.toString('hex') };
}`,
      explanation: "Encrypts data while simultaneously generating a 16-byte Galois authentication tag over both the ciphertext and unencrypted associated headers."
    }
  };

  const activeScapy = scapyDatabase[activeScapyTab];

  // Studio 3: Regional West Bengal Pedagogical Scenarios
  const localScenarios = [
    {
      id: "kolkata_upi_tampering",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Preventing In-Flight Payment Tampering on UPI Switch",
      threatType: "ACTIVE DATA TAMPERING (In-Flight Transaction Rewriting)",
      budget: "₹34,00,000",
      incident:
        "During a penetration test on a legacy inter-bank clearing switch, security researchers demonstrated that an in-line proxy could rewrite transaction amounts from ₹5,000 to ₹5,00,000 because requests lacked cryptographic integrity tags.",
      defenseStrategy:
        "Mamata migrated all API microservices to AES-256-GCM AEAD encryption paired with HMAC-SHA256 payload signing and strict X.509 mutual certificate verification (mTLS).",
      outcome: "100% of tampered transaction packets rejected with authentication tag mismatches; zero fraudulent transfers executed.",
      metrics: {
        tamperedPacketsBlocked: "100% Verification Rate",
        verificationLatency: "0.9 ms per transaction",
        dailyVolumeSecured: "₹180 Crores",
        compliance: "RBI Cyber Security Framework Section 4.2"
      }
    },
    {
      id: "barrackpore_scada_bitflip",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "ACTIVE PROTOCOL TAMPERING (Modbus Command Bit-Flipping)",
      title: "Securing SCADA Breaker Commands against In-Flight Tampering",
      budget: "₹19,50,000",
      incident:
        "An adversary on the substation local area network attempted to flip command bits in cleartext Modbus TCP packets, attempting to force a false 'Emergency Trip' on a 220kV transformer breaker.",
      defenseStrategy:
        "Debangshu deployed DNP3 Secure Authentication version 5 (IEC 62351-5) across all substation RTUs. Every critical breaker trip command now requires an HMAC-SHA256 challenge-response verification before relays actuate.",
      outcome: "Unauthorized bit-flipped breaker commands rejected; power grid maintained uninterrupted 220kV transmission.",
      metrics: {
        unauthorizedTripsBlocked: "4 Attempted Injections",
        gridUptimeMaintained: "100.00%",
        rtuChallengeLatency: "12 ms",
        statutoryMandate: "NCIIPC Critical Infrastructure Guidelines"
      }
    },
    {
      id: "ichapur_biopsy_pdf_sign",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "DATA TAMPERING (Medical Report In-Flight Modification)",
      title: "Protecting Cancer Biopsy Pathological Reports with Ed25519",
      budget: "₹11,50,000",
      incident:
        "A laboratory audit revealed that diagnostic pathology PDF reports transferred between diagnostic imaging servers and oncology doctor workstations were unencrypted, allowing in-flight tampering with patient tumor staging codes.",
      defenseStrategy:
        "Mahima mandated Ed25519 digital signatures and SHA-512 cryptographic hashing on all diagnostic PDF reports generated by clinical pathologists, verified automatically by oncology workstations before display.",
      outcome: "Guaranteed absolute integrity and non-repudiation for all patient cancer diagnostic records.",
      metrics: {
        biopsyReportsSecured: "95,000 Patient Records",
        signatureVerificationSpeed: "0.2 ms per report",
        compliance: "DPDP Act 2023 Section 8(3) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_cbc_migration",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "CRYPTOGRAPHIC BIT-FLIPPING (CBC Malleability Exploit)",
      title: "Eliminating CBC Bit-Flipping Flaws in Academic SSO Tokens",
      budget: "₹8,00,000",
      incident:
        "Researchers demonstrated a practical CBC bit-flipping attack on legacy AES-CBC session cookies, flipping bits in the initialization vector (IV) to elevate student accounts (`role=student`) to administrator (`role=admin`).",
      defenseStrategy:
        "Susmita and Abhronila redesigned the single sign-on (SSO) token architecture, migrating all session cookies to JSON Web Signatures (JWS with ES256) and AES-256-GCM AEAD encryption.",
      outcome: "Bit-flipping attacks completely neutralized; token tampering triggers instant cryptographic rejection.",
      metrics: {
        malleabilityVulnerability: "100% Eliminated",
        ssoTokensProtected: "15,000 Academic Accounts",
        encryptionStandard: "AES-256-GCM + ES256 JWS",
        publication: "ACM Transactions on Information & System Security"
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
                Topic 04
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Active Attacks: Message Modification &amp; Data Tampering
            </h1>
            <p className="text-xs text-gray-400">
              Bit-flipping attacks, AEAD Galois hashing, HMAC-SHA256, Scapy packet injection, and Merkle tree ledgers.
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

        {/* SECTION 1: Executive Theory & Mathematical Malleability */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Active Data Integrity Violation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Mathematics of Message Modification &amp; Cryptographic Malleability
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Unlike passive attacks that merely observe, <strong>Active Message Modification</strong> alters data payloads in flight 
              or at rest, directly corrupting system state (<strong>D' ≠ D</strong>) and violating the <strong>Integrity</strong> pillar 
              of the CIA Triad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Malleability Formula Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Ciphertext Bit-Flipping Malleability Equation
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60">
                P'_i = D_K(C_i) ⊕ C'_{i-1} ===> P' = P ⊕ Δ
              </div>
              <p className="text-gray-300 leading-relaxed">
                In unauthenticated stream ciphers (AES-CTR) and CBC mode, XORing a difference vector Δ into the ciphertext 
                predictably flips the exact same bits in the decrypted plaintext without triggering key errors!
              </p>
            </div>

            {/* AEAD Galois Field Formula Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                AEAD Galois Field GHASH Integrity Seal
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60">
                Tag = GHASH_H( AAD, Ciphertext ) ⊕ AES_K(IV)
              </div>
              <p className="text-gray-300 leading-relaxed">
                AES-256-GCM evaluates polynomials over Galois Field GF(2^128). If an adversary alters even a single bit in 
                the ciphertext or associated headers, the authentication tag fails and decryption is instantly aborted.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - In-Flight Interception & Tampering Flow */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              In-Flight Packet Tampering Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing In-Flight Interception, Bit-Flipping &amp; Cryptographic Tag Verification
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how an active in-line adversary intercepts cleartext/malleable packets to rewrite transaction values, 
              and how an AEAD receiver instantly blocks corrupted packets:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* NODE 1: SENDER (Mamata) */}
              <g transform="translate(40, 120)">
                <rect width="180" height="100" rx="12" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <text x="90" y="32" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  SENDER (Mamata)
                </text>
                <text x="90" y="52" fill="#bfdbfe" fontSize="11" textAnchor="middle">
                  Kolkata UPI Switch
                </text>
                <rect x="15" y="65" width="150" height="24" rx="4" fill="#0f172a" />
                <text x="90" y="81" fill="#93c5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  amount: ₹500
                </text>
              </g>

              {/* PATH 1: Sender &rarr; Attacker */}
              <path d="M 220 170 L 360 170" stroke="#60a5fa" strokeWidth="3" fill="none" />
              <circle r="5" fill="#60a5fa">
                <animateMotion path="M 220 170 L 360 170" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* NODE 2: IN-LINE ATTACKER PROXY */}
              <g transform="translate(360, 90)">
                <rect width="200" height="160" rx="12" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="100" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  IN-LINE ATTACKER (Scapy)
                </text>
                <text x="100" y="48" fill="#fecdd3" fontSize="10" textAnchor="middle">
                  Bit-Flipping &amp; Payload Rewriting
                </text>

                <rect x="15" y="60" width="170" height="35" rx="6" fill="#4c0519" />
                <text x="100" y="78" fill="#fda4af" fontSize="9.5" textAnchor="middle">
                  Original: amount = ₹500
                </text>
                <text x="100" y="90" fill="#f43f5e" fontSize="8" textAnchor="middle">
                  ⬇ In-Memory Byte Substitution
                </text>

                <rect x="15" y="105" width="170" height="40" rx="6" fill="#450a0a" stroke="#f87171" />
                <text x="100" y="122" fill="#ffffff" fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Altered: amount = ₹50,000
                </text>
                <text x="100" y="138" fill="#fca5a5" fontSize="8.5" textAnchor="middle">
                  Recalculates TCP Checksums
                </text>
              </g>

              {/* PATH 2: Attacker &rarr; Receiver */}
              <path d="M 560 170 L 680 170" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <circle r="5" fill="#f43f5e">
                <animateMotion path="M 560 170 L 680 170" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* NODE 3: RECEIVER (Debangshu) */}
              <g transform="translate(680, 100)">
                <rect width="160" height="140" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="80" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  RECEIVER (Debangshu)
                </text>
                <text x="80" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle">
                  Barrackpore Node
                </text>

                <rect x="15" y="60" width="130" height="30" rx="4" fill="#022c22" />
                <text x="80" y="80" fill="#6ee7b7" fontSize="9.5" textAnchor="middle">
                  AEAD GHASH Check
                </text>

                <rect x="15" y="98" width="130" height="32" rx="4" fill="#450a0a" stroke="#f43f5e" />
                <text x="80" y="118" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">
                  TAG MISMATCH!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Tampering Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Data Tampering Vector &amp; Malleability Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a data tampering attack vector below to inspect its operational mechanics, system state impact, 
              live payload traces, and production mitigation code:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(tamperingDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedTamperKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedTamperKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  TAMPERING
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeTamper.categoryBadge)}>
                    {activeTamper.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeTamper.targetLayer}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-rose-400">
                    Target: {activeTamper.ciaTarget}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeTamper.name}</h3>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Detectability Score</span>
                <span
                  className={clsx(
                    "text-sm font-extrabold",
                    activeTamper.detectabilityScore > 80
                      ? "text-emerald-400"
                      : activeTamper.detectabilityScore &gt; 50
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {activeTamper.detectabilityScore}/100{" "}
                  <span className="text-xs font-normal text-gray-400">
                    ({activeTamper.detectabilityScore &gt; 75 ? "Loud / Alarming" : "Subtle Malleability"})
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Mechanics &amp; State Impact
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeTamper.systemImpact}</p>
                  <p className="text-gray-400 leading-relaxed mt-2">{activeTamper.mechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Payload Substitution / Attack Trace
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto whitespace-pre-wrap border border-amber-950/50">
                    {activeTamper.realWorldPayload}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Defensive Strategy &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTamper.mitigation}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Production Mitigation &amp; Script Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeTamper.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Bit-Flipping vs. AEAD Verification Lab */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Live Bit-Flipping vs. Authenticated Encryption (AEAD) Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Flip a bit in an in-transit financial transaction to see how legacy unauthenticated CBC mode silently accepts 
              tampered data, while modern AES-256-GCM AEAD instantly aborts with a tag mismatch:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Cryptographic Mode Controls</h3>

              <div className="space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">Select Encryption Mode:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCryptoMode("raw_cbc_no_mac")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      cryptoMode === "raw_cbc_no_mac"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    Raw AES-CBC (No Integrity Tag)
                  </button>
                  <button
                    onClick={() => setCryptoMode("aes_gcm_aead")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      cryptoMode === "aes_gcm_aead"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    AES-256-GCM (AEAD Tag)
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsBitFlipped(!isBitFlipped)}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 border",
                    isBitFlipped
                      ? "bg-rose-950 border-rose-500 text-rose-300"
                      : "bg-gray-900 border-gray-800 text-gray-300"
                  )}
                &gt;
                  {isBitFlipped ? "⚡ IN-FLIGHT BIT FLIPPED (amount=500 ➔ 50000)" : "✔ IN-TRANSIT CIPHERTEXT UNTOUCHED"}
                </button>
              </div>
            </div>

            {/* Decryption & Verification Feed */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Server Decryption &amp; Integrity Feed</h3>

              <div className="space-y-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Decrypted Payload Content</span>
                  <pre className="font-mono text-xs text-white bg-black/80 p-2.5 rounded border border-gray-800 whitespace-pre-wrap">
                    {bitFlipSimulation.decryptedText}
                  </pre>
                </div>

                <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", bitFlipSimulation.badgeClass)}>
                  <span className="font-bold block uppercase tracking-wider text-[10px]">Integrity Evaluation Result:</span>
                  <p className="mt-1 font-bold">{bitFlipSimulation.integrityStatus}</p>
                  <p className="text-[11px] text-gray-300 mt-1">{bitFlipSimulation.systemAction}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Scapy Injection & HMAC Defensive Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Code &amp; Scripting Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Scapy Packet Injection &amp; HMAC Verification Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Inspect production Python and JavaScript implementations for packet tampering and cryptographic HMAC/AEAD verification:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(scapyDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveScapyTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeScapyTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeScapy.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Code
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeScapy.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeScapy.code}
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita neutralize active message 
              tampering incidents across critical West Bengal infrastructure:
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
              &gt;
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
                  The Incident &amp; Tampering Threat
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
              7. Legal Penalties for Source Document &amp; Data Tampering in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence treats active tampering with digital source documents and database records 
              as a major criminal offense:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                IT Act 2000 Section 65
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Tampering with Source Documents:</strong> Knowingly concealing, destroying, or altering computer source code or configuration files carries <span className="text-rose-400 font-bold">up to 3 years imprisonment</span> and fines up to ₹2 Lakhs.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 66 &amp; 66C
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66:</strong> Fraudulent data alteration and active hacking (Up to 3 years prison + ₹5 Lakh fine).
                </li>
                <li>
                  <strong className="text-white">Section 66C:</strong> Identity theft, digital signature forgery, and password tampering (Up to 3 years prison + ₹1 Lakh fine).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Section 8(3) &amp; 33
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Mandatory Data Accuracy:</strong> Data Fiduciaries must guarantee the completeness and accuracy of personal records.
                </li>
                <li>
                  <strong className="text-white">Penalties:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement tamper-proof cryptographic safeguards.
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
                  <strong>Assuming Encryption Protects Integrity:</strong> Raw CBC and Stream ciphers are malleable; bit-flipping attacks alter plaintexts cleanly!
                </li>
                <li>
                  <strong>Using Raw Hash for Verification:</strong> Using `H(key || message)` is vulnerable to length-extension attacks; always use HMAC!
                </li>
                <li>
                  <strong>Relying on TCP Checksums for Security:</strong> Standard TCP checksums detect accidental noise, not intentional malicious alterations.
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
                  <strong>Always Use AEAD (AES-GCM):</strong> Automatically seals payloads with 16-byte Galois tags to block bit-flipping attacks.
                </li>
                <li>
                  <strong>Sign Immutable Ledgers with Ed25519:</strong> Ensure non-repudiation on financial transactions and diagnostic medical reports.
                </li>
                <li>
                  <strong>Enforce WORM Object Locks:</strong> Prevent attackers with root privileges from wiping or modifying archived audit logs.
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
                  If a check is written in pencil inside a locked safe, what happens if someone opens the safe, changes the number, and locks it again?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does HMAC use two different padding constants (0x5c and 0x36) rather than a single hash calculation?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the simulator above, toggle from CBC to AEAD and flip a bit—see how Galois field math aborts decryption immediately.
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
                <span>Active message modification violates the Integrity pillar of the CIA Triad (ΔS ≠ ∅).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Bit-flipping attacks exploit unauthenticated ciphers (P' = P ⊕ Δ).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AEAD (AES-GCM / ChaCha20-Poly1305) provides encryption + cryptographic integrity seals.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HMAC prevents length-extension attacks using dual-nested hash padding.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Ed25519 digital signatures guarantee non-repudiation and author authenticity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 65 of the IT Act penalizes source document and configuration tampering with 3 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active Attacks: Message Modification FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Integrity Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Active Attacks: Modification of Messages and Data Tampering (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: One of the most dangerous myths in computer security is that encryption automatically guarantees data integrity! Stream ciphers and CBC mode are completely malleable—an attacker who flips a single bit in the ciphertext will flip the exact same bit in the decrypted message without triggering a key error! Always enforce Authenticated Encryption with Associated Data (AEAD - AES-256-GCM) or HMAC-SHA256 request signatures. Remember: Section 65 of the Indian IT Act criminalizes intentional source code and data tampering with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
