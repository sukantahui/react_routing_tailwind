const questions = [
  {
    id: 1,
    question: "What are the three core cryptographic security services provided by modern Virtual Private Networks?",
    shortAnswer: "1. Confidentiality (symmetric encryption ensures data cannot be read by unauthorized eavesdroppers); 2. Data Integrity (cryptographic hashes/AEAD ensure data cannot be altered in transit); 3. Authentication (verifies the identity of communicating endpoints/users before tunnel creation).",
    explanation: "These three services embody the CIA triad in network security. VPNs combine symmetric encryption (AES), cryptographic hashing (HMAC/SHA), and asymmetric public-key cryptography (RSA/ECDSA) to deliver all three simultaneously.",
    hint: "Confidentiality (privacy), Integrity (no tampering), and Authentication (identity verification).",
    level: "Basic",
    codeExample: `// The Cryptographic Triad:
// Confidentiality : AES-256-GCM / ChaCha20-Poly1305
// Data Integrity  : HMAC-SHA-256 / AEAD 128-bit Tag
// Authentication  : X.509 PKI Certificates + SAML MFA`
  },
  {
    id: 2,
    question: "What is 'AEAD' (Authenticated Encryption with Associated Data) and why is it superior to legacy 'Encrypt-then-MAC' or 'MAC-then-Encrypt'?",
    shortAnswer: "AEAD (such as AES-GCM and ChaCha20-Poly1305) performs both encryption and cryptographic authentication in a single integrated mathematical pass, completely eliminating padding-oracle attacks (like POODLE and Lucky Thirteen) and accelerating performance.",
    explanation: "Legacy modes used two separate algorithms (e.g. AES-CBC for encryption + HMAC-SHA1 for hashing), which introduced software implementation vulnerabilities. AEAD computes the authentication tag directly in hardware.",
    hint: "A modern cipher that encrypts and authenticates simultaneously in one fast, secure step.",
    level: "Moderate",
    codeExample: `// AEAD Cipher Execution:
// (Ciphertext, Auth_Tag) = AES_256_GCM_Encrypt(Plaintext, Key, Nonce, Associated_Data)`
  },
  {
    id: 3,
    question: "What is 'Perfect Forward Secrecy' (PFS) in VPN key exchange and why is it critical?",
    shortAnswer: "A cryptographic property where ephemeral, single-use Diffie-Hellman keys (ECDHE / Curve25519) are generated for every session; if the server's long-term master private key is stolen in the future, past recorded VPN sessions CANNOT be retroactively decrypted.",
    explanation: "Without PFS, an adversary who records terabytes of encrypted traffic today could decrypt everything years later if they eventually steal the server's private certificate. PFS ensures every session has an independent key that is destroyed after disconnect.",
    hint: "Throwaway session keys that protect old recorded traffic even if a hacker steals the master key later.",
    level: "Basic",
    codeExample: `// PFS Key Agreement:
// Handshake: ECDHE_X25519 (Ephemeral key negotiated ➔ Session ends ➔ Key permanently erased from RAM)`
  },
  {
    id: 4,
    question: "How does 'Anti-Replay Protection' operate in IPsec ESP and WireGuard tunnels?",
    shortAnswer: "By embedding a strictly increasing sequence number into each packet header and maintaining a sliding window bitmask on the receiver; duplicate sequence numbers or packets arriving outside the window are immediately discarded.",
    explanation: "If an adversary intercepts an encrypted payment packet and attempts to re-transmit it to duplicate the transaction, the receiver's anti-replay check detects that the sequence number was already processed and drops the packet.",
    hint: "Numbering every packet so a hacker cannot replay an old recorded packet to trick the system.",
    level: "Moderate",
    codeExample: `// Anti-Replay Sliding Window Check:
// IF (Packet_Seq <= Max_Seq_Processed AND Packet_Seq IN Processed_Bitmask):
//     Action: DROP_PACKET("Replay Attack Detected")`
  },
  {
    id: 5,
    question: "What are the operational differences between 'AES-256-GCM' and 'ChaCha20-Poly1305' in VPN deployments?",
    shortAnswer: "AES-256-GCM relies on hardware CPU instructions (Intel AES-NI) for line-rate multi-gigabit speeds on servers; ChaCha20-Poly1305 is a high-speed stream cipher that delivers superior performance on mobile phones and IoT devices lacking hardware AES acceleration.",
    explanation: "On modern enterprise servers with AES-NI, AES-GCM is faster. On mobile phones, ARM processors without crypto extensions run ChaCha20 up to 3x faster than AES while consuming significantly less battery power.",
    hint: "AES-GCM is fastest on servers with hardware chips; ChaCha20 is fastest on mobile phones.",
    level: "Moderate",
    codeExample: `// Cipher Selection Benchmark:
// Server with AES-NI : AES-256-GCM ➔ 4.8 Gbps / core (Hardware Accelerated)
// Mobile Phone (ARM) : ChaCha20-Poly1305 ➔ 1.4 Gbps / core (3x faster than software AES)`
  },
  {
    id: 6,
    question: "What is the mathematical security margin of a 256-bit symmetric encryption key compared to a 128-bit key?",
    shortAnswer: "A 256-bit key provides $2^{128}$ times more combinations than a 128-bit key (not double, but $2^{128}$ exponentially larger: $\approx 3.4 \\times 10^{38}$ times harder to brute-force), providing robust security against future quantum attacks (Grover's Algorithm).",
    explanation: "Grover's quantum algorithm halves symmetric key strength ($2^{256} \\rightarrow 2^{128}$). Therefore, AES-256 provides a 128-bit post-quantum security level, which remains mathematically unbreakable by any foreseeable computer.",
    hint: "Every added bit doubles the difficulty; a 256-bit key is exponentially impossible to crack.",
    level: "Moderate",
    codeExample: `// Brute-Force Key Space:
// AES-128: 2^128 = 3.4 x 10^38 possible keys
// AES-256: 2^256 = 1.15 x 10^77 possible keys (Quantum-Resistant against Grover's Search)`
  },
  {
    id: 7,
    question: "What is 'HMAC' (Keyed-Hash Message Authentication Code) and how does it prevent length-extension attacks?",
    shortAnswer: "HMAC hashes data using a secret key applied in a two-pass nested structure: $\\text{HMAC}(K, m) = H((K \\oplus \\text{opad}) \\parallel H((K \\oplus \\text{ipad}) \\parallel m))$, preventing attackers from appending malicious data to raw hash outputs.",
    explanation: "Simple hashing ($H(key \\parallel message)$) is vulnerable to length-extension attacks in Merkle-Damgård hashes (SHA-1/SHA-256). The nested outer and inner padding in HMAC completely immunizes it against this attack.",
    hint: "A double-nested secret hashing method that stops hackers from adding fake data to the end of a message.",
    level: "Expert",
    codeExample: `// HMAC-SHA-256 Construction:
// ipad = 0x36 repeated, opad = 0x5C repeated
// Auth_Tag = SHA256( (Key XOR opad) + SHA256((Key XOR ipad) + Message) )`
  },
  {
    id: 8,
    question: "What is 'X.509 PKI Certificate-Based Authentication' in enterprise VPNs?",
    shortAnswer: "Authenticating VPN endpoints using asymmetric digital certificates signed by a trusted internal Certificate Authority (CA), verifying device identities via cryptographic signatures without exchanging shared secret passwords.",
    explanation: "Each branch router or laptop has a unique private key stored in a secure hardware TPM. During the IKEv2 or TLS handshake, the device cryptographically signs a challenge to prove its identity.",
    hint: "Using digital identity certificates issued by a company authority instead of typing passwords.",
    level: "Basic",
    codeExample: `// Mutual TLS / IKEv2 Certificate Verification:
// Client presents Cert(Issued by Corp-CA) ➔ Gateway verifies signature against Root CA ➔ Validated!`
  },
  {
    id: 9,
    question: "What is 'Diffie-Hellman Group Selection' (DH Groups) in IPsec IKE negotiation?",
    shortAnswer: "The mathematical strength of the modular exponential (MODP) or elliptic curve (ECP) group used during the key exchange handshake (e.g. Group 14 = 2048-bit MODP, Group 19 = 256-bit Elliptic Curve / NIST P-256, Group 21 = 521-bit ECP).",
    explanation: "Legacy DH Group 1 (768-bit) and Group 2 (1024-bit) are cryptographically broken (Logjam attack) and must be disabled. Modern enterprise standards mandate DH Group 14 minimum, with Group 19/20/21 or Curve25519 strongly recommended.",
    hint: "The mathematical strength of the key exchange; modern networks use Group 14 or Elliptic Curve Group 19+.",
    level: "Moderate",
    codeExample: `// Cisco IKEv2 DH Group Configuration:
// crypto ikev2 proposal HIGH_SECURITY
//  group 19 20 21 14 (Elliptic Curve 256/384/521-bit and MODP 2048-bit)`
  },
  {
    id: 10,
    question: "What is 'EAP-TLS' (Extensible Authentication Protocol - Transport Layer Security) in Remote Access VPNs?",
    shortAnswer: "The most secure enterprise authentication framework for remote workers, requiring mutual certificate authentication where both the VPN client and the RADIUS server present verified X.509 certificates.",
    explanation: "EAP-TLS eliminates password-based vulnerabilities. Because authentication relies entirely on cryptographic certificates stored in hardware TPM chips, it is completely immune to phishing and credential stuffing.",
    hint: "The most secure login system where both the user's laptop and the company server verify certificates.",
    level: "Moderate",
    codeExample: `// EAP-TLS Authentication Flow:
// Client ──(Client Certificate)──> VPN Gateway ──(RADIUS EAP-TLS)──> Microsoft NPS / FreeRADIUS Server`
  },
  {
    id: 11,
    question: "What is 'Non-Repudiation' in VPN transaction auditing?",
    shortAnswer: "The cryptographic assurance that a specific user or device cannot deny having initiated a connection or performed a transaction, established via digital signatures linked to uniquely issued PKI user certificates.",
    explanation: "Because an employee's private key is securely stored in their hardware smartcard or TPM and never leaves the chip, any session authenticated with that key provides legally binding proof of origin.",
    hint: "Digital proof of who performed an action that cannot be denied or disputed in court.",
    level: "Basic",
    codeExample: `// Legal Non-Repudiation (Indian Evidence Act):
// Transaction signed with user private key ➔ Cryptographically links action to verified employee ID.`
  },
  {
    id: 12,
    question: "What is 'Padding-Oracle Attack' (POODLE / CBC Padding Attack) and how do modern VPNs prevent it?",
    shortAnswer: "An attack exploiting subtle server timing or error message differences when decrypting malformed CBC ciphertext padding to recover plaintext byte-by-byte; prevented by replacing CBC mode with AEAD ciphers (AES-GCM).",
    explanation: "In CBC mode, if an attacker flips ciphertext bits, the server returns different errors depending on whether padding was valid. AES-GCM does not use padding at all, rendering padding-oracle attacks mathematically impossible.",
    hint: "A timing trick that cracks CBC encryption by studying error messages; stopped by using AES-GCM.",
    level: "Expert",
    codeExample: `// CBC vs GCM Padding Immunity:
// AES-CBC: Requires 16-byte block padding ➔ Vulnerable to padding-oracle timing leaks!
// AES-GCM: Stream cipher counter mode ➔ ZERO PADDING NEEDED (100% Immune)`
  },
  {
    id: 13,
    question: "What is 'Post-Quantum Cryptography' (PQC / Kyber / ML-KEM) in next-generation VPN key exchange?",
    shortAnswer: "Integrating lattice-based mathematical algorithms (like ML-KEM / Kyber-768) alongside classical ECDH in a hybrid key exchange to protect VPN tunnels against future decryption by quantum supercomputers.",
    explanation: "Adversaries are currently executing 'Harvest Now, Decrypt Later' attacks. Hybrid PQC key exchange ensures that even if RSA and Elliptic Curves are broken by quantum computers in 10 years, the lattice layer keeps traffic confidential.",
    hint: "Adding new quantum-proof math equations so powerful quantum computers cannot crack old recorded VPN data.",
    level: "Expert",
    codeExample: `// Hybrid Post-Quantum Key Agreement:
// Combined Key = ECDHE_X25519(Key1) XOR ML_KEM_768(Key2) ➔ Unbreakable by both Classical & Quantum Attackers!`
  },
  {
    id: 14,
    question: "What is 'Key Rekeying / Security Association (SA) Lifetime' in IPsec and OpenVPN?",
    shortAnswer: "A security policy that automatically renegotiates fresh symmetric encryption keys after a specified time duration (e.g. every 8 hours) or data volume (e.g. every 4 gigabytes) to limit the exposure of any single key.",
    explanation: "If an adversary manages to crack a single temporary session key, periodic rekeying ensures they can only view a small window of traffic before a new key takes effect.",
    hint: "Changing encryption keys automatically every few hours so old keys expire quickly.",
    level: "Basic",
    codeExample: `// IPsec SA Lifetime Configuration:
// crypto ipsec security-association lifetime seconds 28800 (8 Hours)
// crypto ipsec security-association lifetime kilobytes 4194304 (4 GB)`
  },
  {
    id: 15,
    question: "What is 'Zero-Knowledge Proofs' (ZKP) in advanced VPN identity verification?",
    shortAnswer: "A cryptographic method allowing a connecting client to prove to the VPN gateway that they possess valid credentials or meet security compliance without revealing the actual password or underlying private data.",
    explanation: "ZKP enables authentication without transmitting sensitive secrets across the wire, ensuring that even if the gateway's authentication database is compromised, user credentials cannot be stolen.",
    hint: "Proving you know the secret password without ever typing or showing the password itself.",
    level: "Expert",
    codeExample: `// Zero-Knowledge Authentication:
// Client computes ZKP mathematical proof ➔ Gateway verifies proof ➔ Access granted with zero secret exposure!`
  },
  {
    id: 16,
    question: "What is 'Initial Vector' (IV) / Nonce reuse vulnerability in GCM mode and how is it prevented?",
    shortAnswer: "If the same 96-bit Nonce is ever used twice with the same AES-GCM key, the XOR of two ciphertexts reveals the XOR of their plaintexts and allows the GHASH authentication key to be recovered; prevented by strictly incrementing a 64-bit monotonic packet counter.",
    explanation: "In IPsec ESP and WireGuard, the 64-bit sequence number is embedded directly into the Nonce. Because sequence numbers never repeat within an SA, Nonce reuse is mathematically impossible.",
    hint: "Never reusing the starting random number with the same key, ensuring encryption stays unbreakable.",
    level: "Expert",
    codeExample: `// GCM Nonce Construction:
// Nonce (96 bits) = Salt (32 bits from IKE) + Packet Sequence Number (64 bits, strictly monotonic)`
  },
  {
    id: 17,
    question: "What is 'FIPS 140-3 Validation' in enterprise and government VPN cryptographic modules?",
    shortAnswer: "A federal and international benchmark standard testing that cryptographic algorithms (AES, SHA, RSA), random number generators (DRBG), and hardware key storage meet strict security, tamper-resistance, and zero-leakage standards.",
    explanation: "Deploying FIPS-validated cryptographic modules ensures that algorithms have no weak implementation bugs, poor entropy sources, or side-channel memory leaks.",
    hint: "An official government testing certificate proving that the encryption software has no mathematical flaws.",
    level: "Moderate",
    codeExample: `// FIPS Mode Activation on Linux:
// fips=1 boot parameter in GRUB ➔ Enforces strict NIST-approved cryptographic cipher suites only.`
  },
  {
    id: 18,
    question: "What is 'Side-Channel Timing Attack' on cryptographic implementations and how is constant-time execution used?",
    shortAnswer: "An attack where an adversary measures microsecond variations in how long a CPU takes to compare authentication tags or decrypt data to deduce secret keys; prevented by writing constant-time comparison algorithms.",
    explanation: "Standard string comparisons (`if a == b`) exit early on the first non-matching byte, leaking timing clues. Constant-time algorithms (`CRYPTO_memcmp`) inspect every byte regardless of match, taking identical CPU cycles.",
    hint: "Measuring how many milliseconds a computer takes to check a password; stopped by constant-time code.",
    level: "Expert",
    codeExample: `// Constant-Time Byte Comparison (Python hmac.compare_digest):
// def constant_time_compare(a, b):
//     result = 0
//     for x, y in zip(a, b): result |= (x ^ y)
//     return result == 0 (Always runs in fixed CPU time!)`
  },
  {
    id: 19,
    question: "What is 'Hardware Security Module' (HSM) integration for Enterprise VPN Root CAs?",
    shortAnswer: "Storing the master private keys of the corporate VPN Certificate Authority inside a tamper-proof physical cryptographic appliance (HSM) that destroys its memory if physically drilled, probed, or x-rayed.",
    explanation: "If a software Root CA server is compromised, attackers can issue rogue VPN certificates. Storing the root private key in an HSM guarantees that the key cannot be extracted or exported.",
    hint: "A physical bulletproof vault box that holds the company's master encryption keys safely.",
    level: "Moderate",
    codeExample: `// PKCS#11 HSM Engine Integration:
// openssl ca -engine pkcs11 -keyform engine -key "pkcs11:token=VPN_Root_CA;object=MasterKey"`
  },
  {
    id: 20,
    question: "What is 'Symmetric Pre-Shared Key (PresharedKey)' enhancement in WireGuard?",
    shortAnswer: "An optional 256-bit symmetric pre-shared key added to WireGuard's 1-RTT Noise handshake, providing a secondary layer of post-quantum protection on top of Curve25519 public key cryptography.",
    explanation: "If quantum computers break Curve25519 in the future, the additional symmetric preshared key ensures the tunnel remains 100% secure, requiring zero complex protocol redesign.",
    hint: "An extra password added to modern WireGuard to make it completely safe against future quantum computers.",
    level: "Moderate",
    codeExample: `// WireGuard Config with Quantum PSK:
// [Peer]
// PublicKey = UHVibGljS2V5...
// PresharedKey = MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0... (Post-Quantum Protection Layer)`
  },
  {
    id: 21,
    question: "What is 'Entropy Starvation' on high-volume VPN concentrators and how do hardware TRNGs solve it?",
    shortAnswer: "When a VPN gateway negotiates thousands of concurrent handshakes per second, `/dev/random` runs out of cryptographic randomness (entropy), stalling connections; True Random Number Generators (TRNGs / RDRAND) supply hardware entropy from thermal noise.",
    explanation: "Cryptographic keys require high-quality random numbers. Hardware TRNG chips sample physical thermal electron noise, supplying gigabits of cryptographically secure random bits per second.",
    hint: "Running out of random numbers on busy servers; solved by hardware chips that measure physical heat noise.",
    level: "Expert",
    codeExample: `// Checking Hardware Entropy Source:
// cat /sys/devices/virtual/misc/hw_random/rng_current ➔ "rdrand" (Hardware CPU TRNG Active)`
  },
  {
    id: 22,
    question: "What is 'Certificate Transparency' (CT) in Enterprise Public SSL-VPN Gateways?",
    shortAnswer: "An open public framework of append-only cryptographic Merkle tree logs that record every issued SSL/TLS certificate, allowing organizations to monitor for unauthorized rogue certificates issued for their domain.",
    explanation: "If a rogue Certificate Authority issues a fake certificate for `vpn.barrackpore.gov.in`, CT logs alert the security team in real time, preventing Man-in-the-Middle impersonation attacks.",
    hint: "A public ledger that records all issued web certificates so fake certificates get spotted immediately.",
    level: "Moderate",
    codeExample: `// Monitoring CT Logs:
// Querying crt.sh for domain "barrackpore.gov.in" ➔ Alerts if an unknown CA issues a certificate.`
  },
  {
    id: 23,
    question: "What is 'Cipher Suite Deprecation' and why must 3DES, RC4, MD5, and SHA-1 be strictly disabled?",
    shortAnswer: "3DES is vulnerable to 64-bit block collision attacks (Sweet32); RC4 has statistical bias flaws; MD5 and SHA-1 have practical hash collision attacks. All four are cryptographically broken and violate compliance standards.",
    explanation: "Using deprecated ciphers allows attackers to decrypt traffic or forge certificates. Enterprise standards require disabling all legacy ciphers in favor of AES-GCM and SHA-256/384.",
    hint: "Old encryption methods from 20 years ago that are broken and must be turned off completely.",
    level: "Basic",
    codeExample: `// Strong Cipher Suite Enforcement:
// PERMITTED: TLS_AES_256_GCM_SHA384, ECDHE-RSA-AES256-GCM-SHA384
// FORBIDDEN: 3DES-CBC, RC4-MD5, DES-CBC, SHA1`
  },
  {
    id: 24,
    question: "What is 'Micro-Segmentation via Cryptographic Security Associations' (SAs)?",
    shortAnswer: "Establishing separate, distinct IPsec Security Associations with unique encryption keys for different departments (e.g. Finance SA vs SCADA SA vs HR SA) across the same physical network link.",
    explanation: "Even if an attacker compromises the HR department's IPsec SA, they cannot decrypt the SCADA or Finance traffic sharing the same physical fiber cable because each department uses distinct cryptographic keys.",
    hint: "Using different encryption keys for different departments across the same network cable.",
    level: "Moderate",
    codeExample: `// Departmental SAs:
// SA_Finance (SPI: 0x10A, Key_A) ➔ Encrypts 10.10.10.0/24
// SA_SCADA   (SPI: 0x20B, Key_B) ➔ Encrypts 10.10.20.0/24 (Completely Cryptographically Isolated)`
  },
  {
    id: 25,
    question: "What is the statutory CERT-In requirement regarding 'Cryptographic Algorithm Governance and Audit Logs' in India?",
    shortAnswer: "Organizations operating VPN gateways in India must maintain immutable audit logs of all cryptographic handshakes, negotiated cipher suites, certificate serial numbers, and session durations for 180 days, using approved NIST/ISO ciphers.",
    explanation: "Under Indian cybersecurity guidelines and the DPDP Act 2023, using unapproved or deprecated algorithms exposes the organization to severe statutory non-compliance penalties.",
    hint: "180-day retention of all cryptographic handshake logs and using only approved modern ciphers under Indian law.",
    level: "Basic",
    codeExample: `// Structured CERT-In Cryptographic Audit Record:
const certInCryptoLog = {
  timestamp: "2026-08-23T14:20:00.220Z",
  gatewayNode: "Salt Lake Core Datacenter VPN-01",
  negotiatedCipher: "AES-256-GCM-AEAD",
  keyExchange: "ECDHE-Curve25519-PFS",
  certFingerprint: "SHA256:77192A88BC...",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'Encrypted SNI / Encrypted Client Hello (ECH)' in TLS-based VPN handshakes?",
    shortAnswer: "Encrypting the Server Name Indication (SNI) domain name during the initial TLS 1.3 handshake, preventing eavesdropping ISPs and network sniffers from seeing what internal corporate server the client is connecting to.",
    explanation: "In legacy TLS, the SNI was sent in cleartext, allowing eavesdroppers to see that a user was visiting `https://secret-internal-portal.corp.in`. ECH encrypts the SNI with the server's public key.",
    hint: "Hiding the destination server name during the initial connection so ISPs cannot see where you are going.",
    level: "Expert",
    codeExample: `// TLS 1.3 Encrypted Client Hello (ECH):
// ClientHello [Outer: dummy.corp.com] ➔ [Inner Encrypted SNI: confidential-portal.gov.in]`
  },
  {
    id: 27,
    question: "What is 'OCSP Stapling' in High-Performance VPN Gateway Authentication?",
    shortAnswer: "The VPN gateway periodically obtains a cryptographically signed revocation status from the CA and 'staples' it to its TLS handshake, eliminating the need for client devices to make slow external OCSP lookups.",
    explanation: "Without OCSP stapling, 1,000 connecting clients all query the CA simultaneously, causing latency and exposing the user's connection history to the CA. Stapling speeds up handshake times by 80%.",
    hint: "The server pre-attaches its own proof of validity to the handshake to make connections 5x faster.",
    level: "Moderate",
    codeExample: `// Nginx / Gateway OCSP Stapling:
// ssl_stapling on;
// ssl_stapling_verify on;
// ssl_trusted_certificate /etc/ssl/certs/ca-bundle.crt;`
  },
  {
    id: 28,
    question: "What is 'Dynamic Key Ratcheting' in Advanced Stream VPNs (Noise Protocol)?",
    shortAnswer: "Automatically advancing and deriving a new symmetric encryption key after every single packet or micro-burst (used in Signal and Noise Protocol), providing continuous forward secrecy within a single active session.",
    explanation: "Even if a state-sponsored attacker captures a client's memory at a specific moment, they can only decrypt the single current packet; all previous and future packets are protected by different derived keys.",
    hint: "Advancing to a new encryption key after every single packet sent, like a turnstile clicker.",
    level: "Expert",
    codeExample: `// Double Ratchet Formula:
// (New_Key, New_ChainState) = KDF_Ratchet(Previous_ChainState, DH_Output)`
  },
  {
    id: 29,
    question: "What is 'Mutual TLS (mTLS)' vs 'Standard TLS' in Remote Access Security?",
    shortAnswer: "Standard TLS only requires the server to present a certificate to the client; Mutual TLS (mTLS) requires BOTH the server AND the client to present and cryptographically verify digital certificates before establishing the tunnel.",
    explanation: "mTLS ensures that an unauthorized user without a valid corporate-signed client certificate cannot even reach the login page, completely stopping anonymous internet bots and scanners.",
    hint: "Both the user's computer and the server must prove their identities to each other with certificates.",
    level: "Basic",
    codeExample: `// mTLS Handshake:
// 1. Server sends Certificate ➔ Client verifies Server
// 2. Client sends Certificate ➔ Server verifies Client ➔ Mutual Cryptographic Trust Established!`
  },
  {
    id: 30,
    question: "Synthesize the complete cryptographic architecture of modern enterprise VPNs.",
    shortAnswer: "Modern enterprise VPNs achieve impenetrable security by unifying Authenticated Symmetric Encryption (AES-256-GCM / ChaCha20-Poly1305), Ephemeral Elliptic Curve Key Exchange with Perfect Forward Secrecy (Curve25519 / ECDHE), Hardware-Tethered Mutual PKI & MFA Authentication, and Monotonic Anti-Replay Sliding Windows—operating continuously in full compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "Every layer addresses a specific threat: AES-GCM prevents eavesdropping and tampering; ECDHE prevents retrospective decryption; PKI certificates stop impersonation; Anti-replay stops duplicate attacks. Together, they create an unbreakable cryptographic tunnel across the untrusted public Internet.",
    hint: "A complete cryptographic shield combining fast hardware encryption, throwaway session keys, digital identity badges, and anti-replay counters.",
    level: "Moderate",
    codeExample: `// The Master Cryptographic Formula:
// Unbreakable VPN Security = [AES-256-GCM / ChaCha20 AEAD] + [ECDHE-Curve25519 PFS] + [Mutual X.509 PKI & FIDO2 MFA] + [Anti-Replay Sliding Window] + [180-Day CERT-In / NPL India Compliance]`
  }
];

export default questions;
