const questions = [
  {
    id: 1,
    question: "What is the chronological progression of transport layer security protocols from 1995 to the present?",
    shortAnswer: "SSL 2.0 (1995) ➔ SSL 3.0 (1996) ➔ TLS 1.0 (1999) ➔ TLS 1.1 (2006) ➔ TLS 1.2 (2008) ➔ TLS 1.3 (2018).",
    explanation: "Netscape initially developed Secure Sockets Layer (SSL 2.0/3.0). In 1999, the Internet Engineering Task Force (IETF) standardized the protocol as Transport Layer Security (TLS 1.0). Over two decades of cryptographic research, legacy flaws were progressively patched, culminating in TLS 1.3 (RFC 8446).",
    hint: "Two SSL versions followed by four TLS versions: 1.0, 1.1, 1.2, and 1.3.",
    level: "Basic",
    codeExample: `// Timeline of Transport Layer Security:
// 1995: SSL 2.0 ➔ 1996: SSL 3.0 ➔ 1999: TLS 1.0 ➔ 2006: TLS 1.1 ➔ 2008: TLS 1.2 ➔ 2018: TLS 1.3`
  },
  {
    id: 2,
    question: "Why was 'SSL 2.0' (1995) considered fatally flawed and deprecated by RFC 6176?",
    shortAnswer: "SSL 2.0 used weak MAC integrity checks, lacked handshake integrity protection (allowing Man-in-the-Middle cipher downgrades), used fixed IVs, supported weak 40-bit export ciphers, and was vulnerable to truncation attacks.",
    explanation: "In SSL 2.0, the handshake was unauthenticated, meaning an active attacker could modify cipher lists without detection. Additionally, SSL 2.0 used the same cryptographic key for both message authentication and encryption, violating fundamental cryptographic principles.",
    hint: "No handshake authentication, weak export keys, and vulnerable to active downgrade attacks.",
    level: "Basic",
    codeExample: `// SSL 2.0 Fatal Weaknesses:
// 1. Handshake has no MAC ➔ Vulnerable to MitM cipher downgrade
// 2. Export-grade ciphers ➔ 40-bit keys easily crackable in minutes
// 3. Vulnerable to DROWN cross-protocol attack (CVE-2016-0800)`
  },
  {
    id: 3,
    question: "What was the 'POODLE' attack (CVE-2014-3566) and why did it trigger the global prohibition of SSL 3.0?",
    shortAnswer: "POODLE (Padding Oracle On Downgraded Legacy Encryption) exploited SSL 3.0's non-deterministic CBC padding verification, allowing an attacker to decrypt private cookies (e.g., session tokens) byte-by-byte in ~256 requests per byte.",
    explanation: "Because SSL 3.0 did not strictly define the contents of CBC padding bytes, an attacker who could inject plaintext (via malicious JavaScript) could alter ciphertext blocks. By observing whether the server accepted or rejected the record, the attacker recovered cleartext bytes. This forced IETF to prohibit SSL 3.0 in RFC 7568.",
    hint: "A padding oracle attack that decrypted session cookies one letter at a time.",
    level: "Moderate",
    codeExample: `// POODLE Exploitation Logic:
// Attacker crafts request such that target cookie byte sits at the end of a block.
// Replaces padding block with cookie block ➔ If server accepts padding ➔ Cookie byte REVEALED!`
  },
  {
    id: 4,
    question: "Why were 'TLS 1.0' and 'TLS 1.1' officially deprecated by RFC 8996 and prohibited by PCI-DSS 4.0?",
    shortAnswer: "They rely on obsolete MD5 and SHA-1 hashes, lack native Authenticated Encryption (AEAD), and are vulnerable to BEAST, SWEET32, and Lucky 13 attacks.",
    explanation: "Both TLS 1.0 and 1.1 use legacy cipher suites (like 3DES-CBC and RC4) that fail modern compliance benchmarks. In 2021, IETF RFC 8996 formally deprecated both protocols, mandating that all internet clients and servers support TLS 1.2 or TLS 1.3 exclusively.",
    hint: "Old broken ciphers like 3DES, predictable CBC vectors, and lack of modern AEAD encryption.",
    level: "Basic",
    codeExample: `// PCI-DSS 4.0 Mandate:
// "33-bit and 64-bit ciphers (3DES, RC4) and protocols older than TLS 1.2 are PROHIBITED for payment processing."`
  },
  {
    id: 5,
    question: "What major cryptographic advances were introduced in 'TLS 1.2' (RFC 5246)?",
    shortAnswer: "1. Authenticated Encryption with Associated Data (AEAD / AES-GCM); 2. SHA-256 based Pseudorandom Function (PRF); 3. Configurable signature and hash algorithms during handshake; 4. Removal of hardcoded MD5/SHA-1 combinations.",
    explanation: "TLS 1.2 modernized transport security by introducing AES-GCM (which combines encryption and authentication in a single efficient step, eliminating padding oracle flaws). It also replaced the old MD5/SHA-1 PRF with SHA-256.",
    hint: "AES-GCM AEAD ciphers, SHA-256 PRF, and flexible signature algorithms.",
    level: "Moderate",
    codeExample: `// TLS 1.2 Cipher Suite Structure:
// TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
// [Key Exchange: ECDHE] + [Auth: RSA] + [Encryption: AES-256-GCM] + [MAC/PRF: SHA-384]`
  },
  {
    id: 6,
    question: "What is 'Radical Cryptographic Pruning' in TLS 1.3 (RFC 8446) and what algorithms were removed?",
    shortAnswer: "TLS 1.3 completely removed all obsolete and dangerous algorithms: static RSA key transport, static Diffie-Hellman, all CBC-mode ciphers, RC4, 3DES, MD5, SHA-1, arbitrary renegotiation, and TLS-level compression.",
    explanation: "Rather than allowing insecure algorithms for backward compatibility, the designers of TLS 1.3 removed every cipher and mechanism that had ever caused a major vulnerability. This reduced the attack surface drastically and simplified implementations.",
    hint: "Throwing out all the old, broken algorithms so attackers have nothing weak to exploit.",
    level: "Basic",
    codeExample: `// Algorithms REMOVED in TLS 1.3:
// ❌ Static RSA Key Exchange  ➔ (ROBOT vulnerability eliminated)
// ❌ CBC-Mode Ciphers (AES-CBC) ➔ (Lucky 13 / POODLE eliminated)
// ❌ RC4 & 3DES Stream Ciphers ➔ (SWEET32 eliminated)
// ❌ MD5 & SHA-1 Hashes        ➔ (Collision attacks eliminated)
// ❌ TLS Compression           ➔ (CRIME / BREACH eliminated)`
  },
  {
    id: 7,
    question: "What are the only five standard AEAD Cipher Suites permitted in TLS 1.3?",
    shortAnswer: "1. TLS_AES_256_GCM_SHA384; 2. TLS_CHACHA20_POLY1305_SHA256; 3. TLS_AES_128_GCM_SHA256; 4. TLS_AES_128_CCM_SHA256; 5. TLS_AES_128_CCM_8_SHA256.",
    explanation: "In TLS 1.3, the cipher suite syntax was simplified. Because key exchange (ECDHE) and authentication (certificates) are negotiated separately via extensions, the cipher suite name specifies only the symmetric AEAD algorithm and the PRF hash.",
    hint: "AES-256-GCM, ChaCha20-Poly1305, and AES-128-GCM are the three most common ones.",
    level: "Moderate",
    codeExample: `// TLS 1.3 Simplified Cipher Suite Names:
// TLS_AES_256_GCM_SHA384        (High-security AES hardware)
// TLS_CHACHA20_POLY1305_SHA256  (Mobile ARM devices without AES-NI)
// TLS_AES_128_GCM_SHA256        (Standard enterprise web browsing)`
  },
  {
    id: 8,
    question: "What is 'Perfect Forward Secrecy' (PFS) and why did TLS 1.3 make it mandatory?",
    shortAnswer: "PFS ensures that session encryption keys are temporary (ephemeral) and discarded after the session; if an adversary records encrypted traffic and steals the server's private key years later, they cannot decrypt past recorded sessions.",
    explanation: "In TLS 1.2 with static RSA key exchange, the client encrypted the pre-master secret using the server's public key. If the server's private key was ever leaked or subpoenaed, all historical traffic could be decrypted. TLS 1.3 mandates ephemeral Diffie-Hellman (ECDHE), generating unique keys for every single connection.",
    hint: "Every conversation uses a temporary key that is burned immediately after the call ends.",
    level: "Basic",
    codeExample: `// Perfect Forward Secrecy (PFS) Guarantee:
// TLS 1.2 (Static RSA): Private Key Leaked ➔ Attacker retroactively decrypts 5 years of past bank traffic!
// TLS 1.3 (ECDHE PFS) : Private Key Leaked ➔ Attacker can decrypt ZERO past sessions!`
  },
  {
    id: 9,
    question: "How does the '1-RTT Handshake' in TLS 1.3 reduce connection latency compared to the '2-RTT Handshake' in TLS 1.2?",
    shortAnswer: "TLS 1.2 required two round-trips (ClientHello ➔ ServerHello/Cert ➔ ClientKeyExchange ➔ Finished); TLS 1.3 includes the client's ECDHE public key share directly in the initial ClientHello, completing key exchange in one round-trip (1-RTT).",
    explanation: "In TLS 1.2, the client had to wait for the server to announce its preferred key exchange parameters before generating keys. TLS 1.3 uses Key Share extensions: the client guesses the most likely curve (X25519) and sends its public key share immediately in packet 1, cutting handshake delay by 50%.",
    hint: "TLS 1.2 needed two round-trip conversations; TLS 1.3 sends the key guess in the very first message.",
    level: "Moderate",
    codeExample: `// Handshake RTT Comparison:
// TLS 1.2 Handshake (2-RTT):
// Client ──[ClientHello]──> Server
// Client <──[ServerHello + Cert + ServerKeyExchange]── Server
// Client ──[ClientKeyExchange + Finished]──> Server
// Client <──[Finished]── Server
// ➔ 2-RTT (Total Time: ~180ms on 45ms link)

// TLS 1.3 Handshake (1-RTT):
// Client ──[ClientHello + KeyShare(X25519)]──> Server
// Client <──[ServerHello + KeyShare + EncryptedCert + Finished]── Server
// ➔ 1-RTT (Total Time: ~90ms on 45ms link)`
  },
  {
    id: 10,
    question: "What is '0-RTT Early Data' in TLS 1.3 and what security risk (Replay Attack) must developers handle?",
    shortAnswer: "0-RTT allows a returning client to transmit encrypted application data (like HTTP GET) in the very first packet using a cached session ticket; however, because the initial packet can be copied, it is vulnerable to Replay Attacks.",
    explanation: "0-RTT achieves instant connection resumption. However, an eavesdropper can capture that 0-RTT packet and replay it to the server. If the replayed request was a financial transfer (`POST /transfer?amount=5000`), the server might execute the transfer twice! Therefore, 0-RTT must only be used for idempotent requests (safe HTTP GET).",
    hint: "Instant reconnection with 0 wait time, but attackers could replay the first packet if you use it for money transfers.",
    level: "Expert",
    codeExample: `// 0-RTT Replay Mitigation Rule:
// ALLOW 0-RTT for: GET /index.html, GET /api/v1/user_profile (Idempotent / Safe)
// REJECT 0-RTT for: POST /api/v1/payment, POST /auth/login (Non-Idempotent / Dangerous)`
  },
  {
    id: 11,
    question: "How does TLS 1.3 protect user privacy by 'Encrypting Handshake Metadata'?",
    shortAnswer: "In TLS 1.3, the server's X.509 certificate and extension headers are encrypted using the ephemeral handshake keys; in TLS 1.2, the certificate was transmitted in cleartext, exposing the server's identity to network sniffers.",
    explanation: "Cleartext certificates in TLS 1.2 allowed passive network observers (ISPs, public Wi-Fi sniffers) to see exactly which organization or subdomain a user was connecting to. TLS 1.3 derives intermediate encryption keys immediately after `ServerHello`, encrypting the certificate payload completely.",
    hint: "In TLS 1.2 the server showed its ID badge openly; in TLS 1.3 it shows its ID badge inside an encrypted envelope.",
    level: "Moderate",
    codeExample: `// Certificate Privacy on the Wire:
// TLS 1.2: [TCP Header] + [TLS Plaintext: Server Certificate (Issued to: Susmita Finance Corp)] ➔ EXPOSED!
// TLS 1.3: [TCP Header] + [TLS Ciphertext: Encrypted Handshake Message] ➔ 100% OBFUSCATED!`
  },
  {
    id: 12,
    question: "What was the 'BEAST' attack (CVE-2011-3389) and how did TLS 1.1 resolve it?",
    shortAnswer: "BEAST (Browser Exploit Against SSL/TLS) exploited predictable chained Initialization Vectors (IVs) in TLS 1.0 CBC mode to recover encrypted session cookies; TLS 1.1 resolved it by enforcing explicit, randomized IVs for every record.",
    explanation: "In TLS 1.0 CBC mode, the IV for record $N$ was the last ciphertext block of record $N-1$. An attacker who controlled portions of the HTTP request could calculate XOR masks to guess cookie bytes. TLS 1.1 made IVs independent and randomized for every record.",
    hint: "Predictable starting values in CBC cipher chains let attackers guess cookie bytes; TLS 1.1 made IVs random every time.",
    level: "Moderate",
    codeExample: `// BEAST Vulnerability Fix:
// TLS 1.0: IV_Record[N] = Ciphertext_Block_Last[N-1]  (Predictable Chained IV - VULNERABLE)
// TLS 1.1: IV_Record[N] = Secure_Random_Bytes(16)      (Explicit Random IV - FIXED)`
  },
  {
    id: 13,
    question: "What was the 'SWEET32' attack (CVE-2016-2183) and why did it kill 3DES and Blowfish?",
    shortAnswer: "SWEET32 exploited the Birthday Paradox on 64-bit block ciphers (like 3DES), where encrypting $\\approx 32\\text{ GB}$ of data under the same key yields a block collision, enabling recovery of HTTP authorization tokens.",
    explanation: "By the birthday bound, a 64-bit block cipher has collisions after $2^{32}$ blocks (32 GB). In high-volume HTTPS or OpenVPN sessions, attackers observed ciphertext collisions to extract plaintext. Modern ciphers use 128-bit blocks (AES), where collisions require $2^{64}$ blocks (exabytes of data).",
    hint: "64-bit block ciphers start repeating patterns after 32 GB of data; AES uses 128-bit blocks so it never collides.",
    level: "Moderate",
    codeExample: `// SWEET32 Collision Threshold:
// 64-bit Block Cipher (3DES)  ➔ Collision at 2^32 blocks (~32 GB) ➔ VULNERABLE
// 128-bit Block Cipher (AES)  ➔ Collision at 2^64 blocks (~250 Exabytes) ➔ 100% SECURE`
  },
  {
    id: 14,
    question: "What was the 'ROBOT' attack (Return Of Bleichenbacher's Oracle Threat) on RSA key exchange?",
    shortAnswer: "An attack exploiting server error messages and timing differences when decrypting RSA PKCS#1 v1.5 padding, allowing an attacker to decrypt TLS traffic or forge digital signatures without knowing the private key.",
    explanation: "In 1998, Daniel Bleichenbacher showed that RSA PKCS#1 v1.5 padding leaks information if servers distinguish between valid and invalid padding. In 2017, researchers found that major web servers still acted as Bleichenbacher oracles. TLS 1.3 permanently fixed this by eliminating RSA key transport entirely.",
    hint: "Padding error timing differences in RSA key exchange let attackers guess secret keys; TLS 1.3 removed RSA key exchange completely.",
    level: "Expert",
    codeExample: `// ROBOT Fix in TLS 1.3:
// RSA Key Transport REMOVED completely!
// Only (EC)DHE ephemeral key exchange is permitted.`
  },
  {
    id: 15,
    question: "What was the 'DROWN' attack (CVE-2016-0800) and how did it exploit servers supporting legacy SSL 2.0?",
    shortAnswer: "A cross-protocol attack where an attacker leveraged a server supporting SSL 2.0 with the same RSA private key used for TLS 1.2, sending crafted SSL 2.0 probe requests to decrypt modern TLS 1.2 connections.",
    explanation: "Even if a bank web portal only allowed clients to connect via TLS 1.2, if an obsolete test server or mail server on the same domain used the same SSL certificate with SSL 2.0 enabled, attackers used SSL 2.0 mathematical weaknesses to factor the RSA key and decrypt TLS 1.2 traffic.",
    hint: "Having an old, forgotten SSL 2.0 server sharing the same certificate allowed attackers to crack modern TLS 1.2 traffic.",
    level: "Expert",
    codeExample: `// DROWN Attack Mechanism:
// 1. Bank Web Server ➔ Uses RSA Cert 'cert.pem' (Enforces TLS 1.2)
// 2. Legacy Mail Server ➔ Uses SAME 'cert.pem' (Has SSL 2.0 enabled)
// 3. Attacker sends 1,000 crafted SSL 2.0 probes to Mail Server ➔ Decrypts Bank TLS 1.2 traffic!`
  },
  {
    id: 16,
    question: "What were 'CRIME' and 'BREACH' attacks and why was TLS-level compression permanently banned?",
    shortAnswer: "Side-channel attacks that exploited data compression algorithms (DEFLATE); by measuring changes in compressed ciphertext size when injecting chosen plaintext, attackers extracted session cookies and CSRF tokens byte-by-byte.",
    explanation: "Compression algorithms replace repeated strings with short pointers. When an attacker's injected probe matched a secret cookie character, the combined payload compressed to a smaller size. Observing the ciphertext byte length leaked the secret. TLS 1.3 completely removed compression support.",
    hint: "Measuring how small a compressed file gets allowed attackers to guess secret passwords.",
    level: "Moderate",
    codeExample: `// CRIME Attack Principle:
// Injected Guess: "Cookie: session=A" ➔ Ciphertext Size: 84 Bytes (No match)
// Injected Guess: "Cookie: session=s" ➔ Ciphertext Size: 81 Bytes (Matched! 's' is the first letter)`
  },
  {
    id: 17,
    question: "What was 'Heartbleed' (CVE-2014-0160) and was it a flaw in the TLS protocol or in software implementation?",
    shortAnswer: "Heartbleed was an implementation bug in OpenSSL's TLS Heartbeat extension (missing bounds check buffer over-read) that allowed attackers to read 64 KB of server RAM per request; it was NOT a flaw in the TLS protocol specification itself.",
    explanation: "The TLS Heartbeat extension allows peers to keep connections alive by echoing back a payload. OpenSSL trusted the client's claimed payload length without checking the actual buffer size. Sending a 1-byte payload with length 65,535 caused OpenSSL to dump 64 KB of server RAM, exposing private keys and passwords.",
    hint: "A programming bug in OpenSSL that dumped server memory, not a math error in the TLS protocol.",
    level: "Basic",
    codeExample: `// Heartbleed Vulnerable Code (ssl/d1_both.c in OpenSSL 1.0.1):
// Missing bounds check:
// memcpy(bp, pl, payload); // 'payload' length was specified by attacker without validation!`
  },
  {
    id: 18,
    question: "Why was the 'RC4' stream cipher completely prohibited by RFC 7465 across all TLS versions?",
    shortAnswer: "RC4 contains statistical keystream biases (such as the Fluhrer-Mantin-Shamir and AlFardan biases) in the first few hundred bytes of keystream, allowing passive attackers to recover cookies after observing millions of encrypted connections.",
    explanation: "RC4 was initially thought to be immune to CBC padding oracle attacks. However, researchers discovered that certain bytes in RC4 keystreams appeared with non-random probabilities. By analyzing millions of sessions, attackers reconstructed plaintext cookies without breaking the key.",
    hint: "RC4's random number generator was slightly biased, creating mathematical patterns that leaked passwords.",
    level: "Moderate",
    codeExample: `// RFC 7465 Directive:
// "RC4 cipher suites MUST NOT be enabled for negotiation in any version of TLS."`
  },
  {
    id: 19,
    question: "How does the 'Downgrade Sentinel' in TLS 1.3 prevent Man-in-the-Middle attackers from forcing TLS 1.2 fallback?",
    shortAnswer: "If a TLS 1.3-capable server is forced to negotiate TLS 1.2 or TLS 1.1 due to a client probe, it embeds a hardcoded magic string (`DOWNGRD\x01`) into the last 8 bytes of the `ServerHello.random` field; TLS 1.3 clients recognize the sentinel and terminate the connection.",
    explanation: "In downgrade attacks, attackers alter `ClientHello` packets to make it appear that the client only supports TLS 1.0. The downgrade sentinel ensures that a capable client can detect that the server actually supports TLS 1.3, exposing the Man-in-the-Middle tampering immediately.",
    hint: "A secret distress signal hidden inside the server's random greeting that warns the client about tampering.",
    level: "Expert",
    codeExample: `// Downgrade Sentinel Bytes in ServerHello.random:
// TLS 1.2 Fallback Sentinel: 44 4F 57 4E 47 52 44 01 ("DOWNGRD\\x01")
// TLS 1.1 Fallback Sentinel: 44 4F 57 4E 47 52 44 00 ("DOWNGRD\\x00")`
  },
  {
    id: 20,
    question: "What are the supported Elliptic Curve Groups for Key Exchange in TLS 1.3?",
    shortAnswer: "1. X25519 (Curve25519 - RFC 7748 - Default & Fastest); 2. secp256r1 (NIST P-256); 3. secp384r1 (NIST P-384); 4. secp521r1 (NIST P-521); 5. X448 (RFC 7748).",
    explanation: "TLS 1.3 standardized high-performance, constant-time Montgomery curves (X25519/X448) alongside traditional NIST Weierstrass curves. X25519 provides 128-bit security with high resistance to side-channel timing attacks and ultra-fast computation.",
    hint: "X25519 is the modern fast standard, along with NIST P-256 and P-384.",
    level: "Moderate",
    codeExample: `// TLS 1.3 Supported Groups Extension:
// supported_groups:
//   - x25519 (0x001d)
//   - secp256r1 (0x0017)
//   - secp384r1 (0x0018)`
  },
  {
    id: 21,
    question: "Why did TLS 1.3 remove support for custom Diffie-Hellman parameters (ffdhe) in favor of standardized finite-field groups?",
    shortAnswer: "To prevent 'Logjam' attacks (CVE-2015-4000), where servers used weak or precomputed 512-bit/1024-bit DH primes that nation-state adversaries could precompute and break en masse.",
    explanation: "In TLS 1.2, servers could supply arbitrary custom DH prime numbers. Many servers shared the same 1024-bit prime, making precomputation attacks feasible. TLS 1.3 only allows standardized, cryptographically verified finite-field groups (RFC 7919) of at least 2048 bits.",
    hint: "Preventing weak custom prime numbers that allowed attackers to crack Diffie-Hellman math.",
    level: "Expert",
    codeExample: `// Logjam Prevention:
// TLS 1.2: Server sends custom 1024-bit prime ➔ VULNERABLE TO PRECOMPUTATION!
// TLS 1.3: Only RFC 7919 standardized 2048-bit / 4096-bit groups permitted.`
  },
  {
    id: 22,
    question: "How do you audit the supported SSL/TLS versions of a live web server using the OpenSSL CLI?",
    shortAnswer: "Run `openssl s_client -connect <host>:443 -tls1_2` or `-tls1_3` or `-tls1_1` to test if specific protocol versions are accepted or rejected by the server.",
    explanation: "Security auditors test each protocol flag individually. If a server successfully negotiates a connection with `-ssl3`, `-tls1`, or `-tls1_1`, it is flagged for non-compliance under PCI-DSS and RBI guidelines.",
    hint: "Using openssl with specific -tls1_2 or -tls1_3 flags to test server connections.",
    level: "Basic",
    codeExample: `// Testing for Deprecated Protocols:
$ openssl s_client -connect bank.barrackpore.gov.in:443 -tls1_1
// Expected Result on Hardened Server: "CONNECTED: no protocols available / handshake failure"`
  },
  {
    id: 23,
    question: "What is 'Session Resumption' in TLS and how does TLS 1.3 'PSK with Session Tickets' work?",
    shortAnswer: "A mechanism that allows a client and server to skip the heavy asymmetric key handshake on subsequent visits by using a pre-shared cryptographic key encapsulated in an encrypted Session Ticket issued during the first connection.",
    explanation: "During the first connection, the server sends a `NewSessionTicket` containing an encrypted state blob (session master secret, cipher, expiration). On subsequent connections, the client presents this ticket in the `ClientHello`, establishing an encrypted connection in 1-RTT (or 0-RTT) with zero RSA/ECDSA signature overhead.",
    hint: "A fast re-entry stamp on your hand so you do not have to buy a new ticket when returning to the event.",
    level: "Moderate",
    codeExample: `// TLS 1.3 Session Ticket Resumption:
// Connection 1: Full Handshake ➔ Server sends 'NewSessionTicket'
// Connection 2: ClientHello includes 'pre_shared_key' extension ➔ Resumed instantly!`
  },
  {
    id: 24,
    question: "How does 'ChaCha20-Poly1305' compare to 'AES-GCM' on mobile ARM processors without hardware crypto extensions?",
    shortAnswer: "ChaCha20-Poly1305 is an ARX (Add-Rotate-Xor) stream cipher designed to run in constant time entirely in general-purpose CPU registers, executing 3x to 4x faster than AES-GCM on mobile devices lacking AES-NI hardware instructions.",
    explanation: "AES requires specialized hardware instructions (AES-NI) to execute safely in constant time. On cheap IoT or older mobile ARM chips lacking AES-NI, software AES is slow and vulnerable to cache-timing attacks. ChaCha20-Poly1305 provides high security and speed without hardware acceleration.",
    hint: "ChaCha20 is designed for ultra-fast performance on mobile phones and smart meters without special hardware chips.",
    level: "Moderate",
    codeExample: `// Mobile Cipher Performance:
// Device: Budget Android Smartphone / IoT Sensor (No AES-NI)
// AES-256-GCM in software        ➔ 45 MB/s (High CPU & Battery Drain)
// ChaCha20-Poly1305 in software  ➔ 180 MB/s (Low CPU & 4x Battery Efficiency)`
  },
  {
    id: 25,
    question: "What are the requirements for configuring an NGINX web server to support only TLS 1.2 and TLS 1.3?",
    shortAnswer: "Set `ssl_protocols TLSv1.2 TLSv1.3;`, configure modern AEAD `ssl_ciphers`, enable `ssl_prefer_server_ciphers on;`, and configure `ssl_session_cache` and HSTS headers.",
    explanation: "This configuration ensures that all legacy SSL 2.0/3.0, TLS 1.0, and TLS 1.1 connections are immediately rejected at the TCP handshake stage, achieving an A+ rating on SSL Labs.",
    hint: "Setting ssl_protocols to only TLSv1.2 and TLSv1.3 in nginx.conf.",
    level: "Basic",
    codeExample: `// NGINX TLS Hardening (nginx.conf):
// ssl_protocols TLSv1.2 TLSv1.3;
// ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305';
// ssl_prefer_server_ciphers on;
// ssl_session_timeout 1d;
// ssl_session_cache shared:SSL:50m;`
  },
  {
    id: 26,
    question: "What is 'Hybrid Post-Quantum TLS 1.3' (X25519Kyber768) and why are cloud providers deploying it today?",
    shortAnswer: "A hybrid key exchange that combines classical Elliptic Curve Diffie-Hellman (X25519) with a post-quantum lattice-based key encapsulation mechanism (ML-KEM / Kyber-768) to protect against 'Harvest Now, Decrypt Later' (HNDL) nation-state attacks.",
    explanation: "Nation-state intelligence agencies are actively recording encrypted web traffic today. When quantum computers capable of running Shor's algorithm are built, they will decrypt classical ECDH sessions. Hybrid TLS ensures that even if classical ECDH is broken by quantum computers, the Kyber-768 lattice layer keeps data secure.",
    hint: "Combining classical math with quantum-resistant math so recorded data cannot be cracked in the future.",
    level: "Expert",
    codeExample: `// Hybrid Post-Quantum Key Share in TLS 1.3:
// ClientHello Supported Groups:
//   - X25519Kyber768Draft00 (Group ID: 0x6399)
// ➔ Combines 32-byte X25519 key + 1184-byte Kyber-768 lattice public key!`
  },
  {
    id: 27,
    question: "How does 'testssl.sh' perform an automated comprehensive vulnerability scan on an enterprise HTTPS portal?",
    shortAnswer: "It is an open-source command-line tool that tests for SSL/TLS protocol support, cipher suite rankings, certificate validity, and specific vulnerabilities (POODLE, BEAST, SWEET32, ROBOT, DROWN, Heartbleed, CRIME, FREAK, Logjam).",
    explanation: "Unlike web-based scanners that cannot reach internal enterprise networks, `testssl.sh` is executed directly by SOC teams inside the datacenter, testing internal banking servers and generating compliance audit reports.",
    hint: "A powerful command-line script used by penetration testers to scan servers for all known SSL/TLS vulnerabilities.",
    level: "Basic",
    codeExample: `// Running testssl.sh Comprehensive Audit:
$ ./testssl.sh --full --color 2 https://bank.barrackpore.gov.in
// Outputs detailed vulnerability scorecard: POODLE: OK | SWEET32: OK | Heartbleed: OK | Rating: A+`
  },
  {
    id: 28,
    question: "What is the role of the 'Finished' message in the TLS 1.2 vs TLS 1.3 handshake?",
    shortAnswer: "The Finished message contains an HMAC/hash of ALL previous handshake messages exchanged so far, verifying that neither the ClientHello, ServerHello, nor cipher proposals were tampered with in transit by a Man-in-the-Middle.",
    explanation: "If an adversary modified any packet during the handshake (such as stripping supported cipher extensions), the hash computed by the sender will not match the hash calculated by the receiver. In TLS 1.3, the Finished message is also encrypted, adding an extra layer of confidentiality.",
    hint: "A final cryptographic seal that proves every single message sent during the introduction was authentic and unmodified.",
    level: "Moderate",
    codeExample: `// Finished Message Verification Hash:
// verify_data = HMAC-SHA256(finished_key, Transcript_Hash(ClientHello ... ServerHello))`
  },
  {
    id: 29,
    question: "What is 'Insecure Renegotiation' (CVE-2009-3555) and how did RFC 5746 and TLS 1.3 fix it?",
    shortAnswer: "An attack where an adversary injected a plaintext HTTP request at the start of a TLS connection before renegotiation; RFC 5746 added a renegotiation_info extension, and TLS 1.3 completely removed renegotiation from the protocol.",
    explanation: "In TLS 1.2, renegotiation allowed changing encryption keys mid-stream. Attackers used this to prepend unauthenticated commands (like `POST /buy_stock`) to a victim's authenticated connection. TLS 1.3 eliminated renegotiation entirely, replacing it with lightweight `KeyUpdate` messages.",
    hint: "Mid-conversation renegotiation allowed attackers to sneak in fake commands; TLS 1.3 banned renegotiation completely.",
    level: "Expert",
    codeExample: `// TLS 1.3 Key Update Replacement:
// Instead of heavy renegotiation, TLS 1.3 sends a simple 1-byte 'KeyUpdate' record to roll keys forward!`
  },
  {
    id: 30,
    question: "What is the definitive production deployment checklist for enterprise SSL/TLS configuration?",
    shortAnswer: "1. Enable TLS 1.2 and TLS 1.3 ONLY; 2. Enforce modern AEAD cipher suites (AES-GCM / ChaCha20); 3. Mandate Perfect Forward Secrecy (ECDHE with X25519/P-256); 4. Enforce HSTS with preloading; 5. Deploy automated 60-day X.509 certificate renewals with OCSP stapling.",
    explanation: "This checklist embodies two decades of transport security evolution, ensuring maximum cryptographic resilience, zero legacy vulnerability exposure, and optimal 1-RTT connection latency.",
    hint: "TLS 1.2/1.3 only + AEAD ciphers + PFS + HSTS + Automated certificates.",
    level: "Basic",
    codeExample: `// Master Enterprise TLS Checklist:
// [✔] Protocols   : TLS 1.3 (Primary) + TLS 1.2 (Fallback) | SSL 2/3 & TLS 1.0/1.1 DISABLED
// [✔] Ciphers     : AES-256-GCM, AES-128-GCM, ChaCha20-Poly1305 ONLY
// [✔] KeyExchange : X25519, P-256 (PFS Mandatory)
// [✔] Headers     : Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
// [✔] Performance : TLS 1.3 0-RTT enabled for GET requests + OCSP Stapling`
  }
];

export default questions;
