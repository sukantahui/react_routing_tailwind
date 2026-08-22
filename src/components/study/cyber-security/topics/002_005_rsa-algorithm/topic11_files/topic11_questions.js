const questions = [
  {
    question: "Why was static RSA Key Exchange strictly deprecated and removed in TLS 1.3 (RFC 8446)?",
    shortAnswer: "Static RSA key exchange lacks Perfect Forward Secrecy (PFS); if the server's private RSA key is compromised in the future, adversaries can retroactively decrypt all recorded historical network traffic.",
    explanation: "In TLS 1.2 static RSA key exchange, the client encrypts the pre-master secret using the server's static public RSA key. If a government intelligence agency or hacker records the encrypted traffic today (Harvest Now, Decrypt Later) and steals the server's private RSA key 5 years later, they can decrypt every historical session recorded. Furthermore, it is vulnerable to Bleichenbacher ROBOT attacks. TLS 1.3 strictly mandates Ephemeral Diffie-Hellman (ECDHE / X25519) for key exchange, restricting RSA solely to digital signature authentication (RSA-PSS), guaranteeing Perfect Forward Secrecy.",
    hint: "Think of an old master key that opens all historical sealed letters if it is ever stolen.",
    level: "basic",
    codeExample: `// TLS 1.2 (Static RSA) vs TLS 1.3 (PFS):
TLS 1.2 Static RSA: Client encrypts pre-master secret with Server RSA PubKey -> NO FORWARD SECRECY!
TLS 1.3 Modern:     Ephemeral X25519 Key Exchange + RSA-PSS Signature Authentication -> 100% FORWARD SECRECY!`
  },
  {
    question: "How does Perfect Forward Secrecy (PFS) protect enterprise network communications even after a private RSA key is compromised?",
    shortAnswer: "PFS uses ephemeral Diffie-Hellman keys generated uniquely per session and erased from RAM immediately; compromising the server's long-term RSA signing key only allows active impersonation, not retrospective decryption of past sessions.",
    explanation: "With Perfect Forward Secrecy (PFS), the actual symmetric session keys are derived via ephemeral key agreement (ECDHE / X25519). The ephemeral private keys exist only in volatile CPU registers during the handshake and are erased immediately via `OPENSSL_cleanse()`. The server's RSA key is used *only* to digitally sign the ephemeral parameters during the handshake. If the server's private RSA key is stolen later, an attacker cannot recover the erased ephemeral keys, ensuring that all past recorded traffic remains mathematically encrypted forever.",
    hint: "Think of burning the physical conversation tape immediately after listening to it.",
    level: "moderate",
    codeExample: `// Perfect Forward Secrecy (PFS) in Action:
Session #101: Ephemeral Key Pair A1, B1 -> Derived AES Key K1 -> Erased from RAM after handshake!
Session #102: Ephemeral Key Pair A2, B2 -> Derived AES Key K2 -> Erased from RAM after handshake!
Attacker Steals Server RSA Key in 2030:
Outcome: K1 and K2 cannot be calculated -> ALL PAST SESSIONS REMAIN 100% SECURE!`
  },
  {
    question: "What is the difference between `rsa-sha2-256` / `rsa-sha2-512` (RFC 8332) and legacy `ssh-rsa` in modern OpenSSH?",
    shortAnswer: "Legacy `ssh-rsa` uses the broken SHA-1 hash algorithm and is disabled by default in OpenSSH 8.8+; `rsa-sha2-256` and `rsa-sha2-512` use cryptographically secure SHA-256 and SHA-512 digests for RSA signature authentication.",
    explanation: "In 2020, SHA-1 was proven vulnerable to practical chosen-prefix collision attacks (SHAttered attack). In response, OpenSSH 8.8 (2021) disabled the legacy `ssh-rsa` signature algorithm by default. Modern SSH deployments use RFC 8332 signature algorithms: `rsa-sha2-256` and `rsa-sha2-512`, which retain existing 2048/3072-bit RSA keys while replacing the vulnerable SHA-1 digest with secure SHA-2 hashing.",
    hint: "Recall how SHA-1 hash collisions forced SSH to upgrade to SHA-2 digests for RSA signatures.",
    level: "moderate",
    codeExample: `// OpenSSH Signature Algorithm Modernization:
Legacy (Insecure):  ssh-rsa (Uses SHA-1 digest) -> DISABLED by default in OpenSSH 8.8+!
Modern (Secure):    rsa-sha2-256 (Uses SHA-256 digest) / rsa-sha2-512 (Uses SHA-512 digest)
Modern Alternative: ssh-ed25519 (Elliptic Curve Ed25519 - Gold Standard)`
  },
  {
    question: "Step through the 4-step SSH Public Key Challenge-Response Authentication protocol executed when logging into a Linux server (`ssh user@server`).",
    shortAnswer: "1. Client sends public key ID; 2. Server verifies key exists in `~/.ssh/authorized_keys` and issues random challenge nonce $R$; 3. Client signs $R$ with private key $d$; 4. Server verifies signature with public key and grants shell access without transmitting passwords.",
    explanation: "1. The SSH client initiates authentication by sending its public key identifier to the server; 2. The server checks if the public key is present in the target user's `~/.ssh/authorized_keys` file; 3. The server generates a cryptographically random challenge nonce $R$ and session hash $H$; 4. The client signs $H$ using its local private RSA key (`~/.ssh/id_rsa`) and sends signature $S$; 5. The server verifies $S$ using the public key from `authorized_keys`. If valid, login is granted with zero password exposure.",
    hint: "Follow the public key match, the server challenge nonce, the client signature, and the cryptographic verification.",
    level: "moderate",
    codeExample: `// SSH Challenge-Response Authentication Protocol:
1. Client ➔ Server: "I want to log in as 'ubuntu' with Public Key (e, N)"
2. Server:          Checks /home/ubuntu/.ssh/authorized_keys (Key Found!)
3. Server ➔ Client: Sends Random Challenge Nonce R + Session ID H
4. Client:          Computes Signature S = RSA_Sign( H, id_rsa_privkey )
5. Client ➔ Server: Transmits Signature S
6. Server:          RSA_Verify( S, H, id_rsa_pubkey ) == TRUE ➔ ACCESS GRANTED!`
  },
  {
    question: "What is the standard OpenSSL 3.0 command to generate a password-encrypted 3072-bit RSA private key using PKCS#8 and AES-256-CBC?",
    shortAnswer: "`openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -aes-256-cbc -out privkey.pem`",
    explanation: "In OpenSSL 3.0, the modern `genpkey` command replaces legacy `genrsa`. By specifying `-algorithm RSA -pkeyopt rsa_keygen_bits:3072`, it generates a 3072-bit key. Adding `-aes-256-cbc` prompts for a passphrase and wraps the private key in a secure PKCS#8 `EncryptedPrivateKeyInfo` envelope with PBKDF2 key derivation.",
    hint: "Remember the modern OpenSSL genpkey command with AES encryption.",
    level: "basic",
    codeExample: `// Modern OpenSSL 3.0 Key Generation:
$ openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -aes-256-cbc -out privkey.pem
Enter PEM pass phrase: **********
Verifying - Enter PEM pass phrase: **********`
  },
  {
    question: "How do security engineers test live TLS 1.3 handshakes and inspect OCSP stapling on a web server using the `openssl s_client` CLI tool?",
    shortAnswer: "`openssl s_client -connect api.bank.in:443 -servername api.bank.in -tls1_3 -status`",
    explanation: "The command `openssl s_client` connects to the HTTPS port 443; `-servername api.bank.in` transmits the Server Name Indication (SNI) extension in `ClientHello`; `-tls1_3` enforces TLS 1.3 protocol negotiation; and `-status` instructs the server to return its cached OCSP Staple in the `CertificateStatus` message, allowing instant diagnostic validation of TLS handshakes.",
    hint: "Remember the classic OpenSSL s_client command with SNI and status flags.",
    level: "basic",
    codeExample: `// Diagnostic OpenSSL s_client TLS 1.3 Testing:
$ openssl s_client -connect api.bank.in:443 -servername api.bank.in -tls1_3 -status

// Output Highlights:
New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384
Server certificate: CN = api.bank.in
OCSP Response Status: successful (0x0)
Cert Status: Good`
  },
  {
    question: "What is the 'ROBOT Attack' (Return of Bleichenbacher's Oracle Threat, 2017) on TLS 1.2, and how did it exploit RSA decryption?",
    shortAnswer: "ROBOT revived Bleichenbacher's 1998 padding oracle attack against TLS servers supporting RSA encryption; attackers sent crafted TLS ClientKeyExchange packets and analyzed server error responses to decrypt pre-master secrets.",
    explanation: "In 2017, Hanno Böck, Juraj Somorovsky, and Craig Young discovered that nearly a third of top million HTTPS websites were still vulnerable to Bleichenbacher's chosen-ciphertext padding oracle attack during TLS 1.2 static RSA key exchange. By sending modified TLS handshakes and measuring error codes or subtle response timing differences, an attacker could recover the TLS session key and forge signatures. The definitive solution was upgrading to TLS 1.3, which completely eliminates RSA encryption key exchange.",
    hint: "Think of an old vulnerability from 1998 returning to haunt web servers in 2017.",
    level: "expert",
    codeExample: `// ROBOT Attack (CVE-2017-13099):
Attacker sends: Adapted TLS 1.2 ClientKeyExchange messages with modified RSA ciphertext
Server returns: Different TLS Alert timing for invalid PKCS#1 v1.5 padding
Attacker:      Recovers Pre-Master Secret in ~100,000 requests -> Decrypts HTTPS Session!
Permanent Fix: Upgrade to TLS 1.3 (Strictly bans RSA key exchange!)`
  },
  {
    question: "Under the Information Technology Act 2000 Section 43A and CERT-In Security Guidelines, why is disabling SSLv3, TLS 1.0, and TLS 1.1 mandatory for all Indian banking payment gateways?",
    shortAnswer: "Legacy SSL/TLS protocols use deprecated RSA key exchanges, MD5/SHA-1 hashes, and are vulnerable to POODLE, BEAST, and ROBOT attacks; disabling them and enforcing TLS 1.3/1.2 satisfies statutory 'reasonable security practices' under Section 43A.",
    explanation: "Under Section 43A of the Indian IT Act 2000 and the Reserve Bank of India (RBI) Cyber Security Framework, commercial payment gateways and banks are legally prohibited from supporting SSLv3, TLS 1.0, and TLS 1.1. These legacy protocols lack Perfect Forward Secrecy, support broken cipher suites (DES, RC4), and allow MITM downgrade attacks. Indian financial infrastructure must enforce TLS 1.2/1.3 with strong AEAD ciphers (AES-GCM / ChaCha20-Poly1305).",
    hint: "Remember how Indian cyber laws mandate disabling deprecated TLS versions across payment infrastructure.",
    level: "basic",
    codeExample: `// Indian Banking TLS Hardening Baseline (Nginx Config):
ssl_protocols TLSv1.2 TLSv1.3;  # Strictly Disables SSLv3, TLS 1.0, TLS 1.1!
ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers on;
ssl_stapling on;  # Enables OCSP Stapling (RFC 6066)`
  },
  {
    question: "What is an 'SSH Jump Host / Bastion Server', and how does it use RSA/Ed25519 SSH keys to protect internal cloud servers from the public internet?",
    shortAnswer: "An SSH Jump Host is a single hardened gateway server exposed to the internet; administrators authenticate to the jump host using SSH keys, which then securely proxies authenticated SSH connections to internal private subnet servers (`ssh -J jump.corp.in private-node`).",
    explanation: "In production cloud environments (AWS VPC / Azure VNet), internal database and application servers must never have public IP addresses. An SSH Bastion Host (Jump Host) sits in the public DMZ subnet. System administrators authenticate to the bastion host using their passphrase-encrypted private RSA/Ed25519 keys. The bastion securely tunnels the authenticated session to internal private nodes without exposing internal SSH ports to public internet scanners.",
    hint: "Think of an armed security checkpoint at the front gate of a gated community.",
    level: "moderate",
    codeExample: `// SSH Jump Host Command Syntax:
$ ssh -J admin@bastion.kolkata.bank.in:22 internal-db-01.private

// ~/.ssh/config Automated Jump Host Mapping:
Host internal-db-*
    ProxyJump admin@bastion.kolkata.bank.in
    User ubuntu
    IdentityFile ~/.ssh/id_rsa_prod`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is SSH Key Auditing and Key Deprecation mandatory for Data Fiduciaries?",
    shortAnswer: "Orphaned or forgotten SSH public keys left in `~/.ssh/authorized_keys` provide backdoor root access to customer databases; Section 33 requires regular SSH key audits to prevent data breaches and up to ₹250 Crores in statutory penalties.",
    explanation: "When employees or contractors leave an organization, their SSH public keys frequently linger forgotten in production server `authorized_keys` files. If an ex-employee uses their retained private key to access databases, or if their laptop is compromised, the enterprise suffers a major data breach. Under Section 33 of the DPDP Act 2023, Data Fiduciaries must implement automated SSH key management (e.g. Teleport, HashiCorp Vault SSH secrets) to enforce short-lived certificate-based SSH access.",
    hint: "Remember the danger of orphaned SSH keys providing permanent backdoor root access.",
    level: "basic",
    codeExample: `// DPDP Act 2023 SSH Key Hygiene Policy:
Risk: Orphaned Public Keys in ~/.ssh/authorized_keys -> Permanent Unauthorized Root Access!
Remediation: Deploy Short-Lived SSH Certificates (Vault / Teleport) with 8-Hour Lifespans.
Penalty for Data Breach: Up to ₹250 Crores under DPDP Act Section 33!`
  },
  {
    question: "How does the '1-RTT' Handshake in TLS 1.3 reduce connection latency compared to the '2-RTT' Handshake in TLS 1.2?",
    shortAnswer: "In TLS 1.3, the client sends its ephemeral Diffie-Hellman key share directly in the initial `ClientHello` packet; the server responds with its key share and certificate in `ServerHello`, establishing encrypted communications in a single round trip (1-RTT).",
    explanation: "In TLS 1.2, establishing a connection required two full round-trip times (2-RTT): 1. ClientHello $\\to$ ServerHello; 2. ServerKeyExchange $\\to$ ClientKeyExchange; 3. ChangeCipherSpec $\\to$ Finished. This introduced ~100-200ms of latency before encrypted data could be sent. In TLS 1.3: The client guesses the server's preferred key exchange group (e.g. X25519) and sends `ClientHello + key_share` immediately. The server responds with `ServerHello + key_share + Certificate + Finished`. Encrypted application data flows after just 1-RTT.",
    hint: "Think of including your proposed meeting time in your first letter instead of asking when the other party is free.",
    level: "moderate",
    codeExample: `// TLS 1.2 (2-RTT) vs TLS 1.3 (1-RTT) Handshake Timeline:
TLS 1.2: ClientHello (1) ➔ ServerHello (2) ➔ ClientKeyExchange (3) ➔ Finished (4) [2 Full RTTs]
TLS 1.3: ClientHello + KeyShare (1) ➔ ServerHello + KeyShare + Finished (2) [1 Single RTT!]`
  },
  {
    question: "What is '0-RTT Early Data' in TLS 1.3, and what is its primary security trade-off (Replay Attacks)?",
    shortAnswer: "0-RTT allows returning clients to send encrypted application data in the very first `ClientHello` packet; however, 0-RTT data is vulnerable to network replay attacks and must only be used for idempotent HTTP GET requests.",
    explanation: "In TLS 1.3, clients reconnecting to a previously visited server can use pre-shared resumption keys to encrypt HTTP requests in the first `ClientHello` packet (0-RTT), achieving zero round-trip latency. However, because the server has not yet established fresh ephemeral session entropy, an attacker intercepting the 0-RTT packet can replay it across the network. If the 0-RTT request was a payment transfer (`POST /transfer ₹5000`), replaying it would transfer the money multiple times. Therefore, RFC 8446 mandates that 0-RTT must ONLY be enabled for safe, idempotent HTTP GET requests.",
    hint: "Think of mailing an express package that arrives instantly, but an eavesdropper can duplicate the mail carrier's route.",
    level: "expert",
    codeExample: `// 0-RTT Replay Vulnerability:
Safe for 0-RTT:   GET /profile.json (Idempotent: Replaying only reads profile data again)
DANGEROUS for 0-RTT: POST /pay_upi?amount=5000 (Non-Idempotent: Replaying transfers ₹5000 AGAIN!)`
  },
  {
    question: "Synthesizing Practical Implementations of RSA in SSL/TLS and SSH: what is the master cryptographic operational rule for RSA in production protocols?",
    shortAnswer: "Never use RSA for encryption or key exchange; use RSA strictly for Digital Signature Authentication (RSA-PSS in TLS 1.3 and `rsa-sha2-256` in SSH) paired with ephemeral Elliptic Curve key agreement (X25519/ECDHE).",
    explanation: "This master principle synthesizes all modern cryptographic engineering: Static RSA encryption is obsolete, lacks forward secrecy, and is vulnerable to padding oracle attacks (Bleichenbacher / ROBOT). Modern production standards (TLS 1.3 and SSH-2) restrict RSA exclusively to authentication via robust probabilistic digital signatures (RSA-PSS with SHA-256), while delegating all key exchange to ephemeral Elliptic Curves (X25519) to guarantee Perfect Forward Secrecy.",
    hint: "Conclude by reviewing the universal rule restricting RSA to digital signatures while using ECDHE for key exchange.",
    level: "expert",
    codeExample: `// The Master Protocol Rule for RSA:
Rule: RSA_FOR_AUTHENTICATION_ONLY + ECDHE_FOR_KEY_EXCHANGE = 100% SECURE_MODERN_INFRASTRUCTURE;`
  }
];

export default questions;
