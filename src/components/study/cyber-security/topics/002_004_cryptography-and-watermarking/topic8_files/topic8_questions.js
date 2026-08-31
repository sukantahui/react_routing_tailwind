const questions = [
  {
    question: "What is a 'Digital Signature', and how does it combine Cryptographic Hash Functions and Asymmetric Cryptography to provide Integrity, Authentication, and Non-Repudiation?",
    shortAnswer: "A mathematical scheme where the sender hashes a message and encrypts the hash with their secret Private Key ($S = \\text{Sign}_{K_{priv}}(\\text{Hash}(M))$); anyone verifies it using the sender's Public Key.",
    explanation: "A digital signature guarantees three pillars: 1. Integrity: The recipient hashes the received document; if any bit was altered in transit, the calculated hash will not match the decrypted signature; 2. Authentication: Only the sender holding the unique private key could have generated the valid signature; 3. Non-Repudiation: Because the private key is held exclusively by the sender, they cannot deny authoring the transaction in court (IT Act 2000 Section 5).",
    hint: "Think of an unforgeable digital wax seal that shatters if a single letter in the document is altered.",
    level: "basic",
    codeExample: `// Digital Signature Workflow:
Sender (Alice):
  1. Digest = SHA256( Message )
  2. Signature = Sign( Digest, Alice_PrivateKey )
  3. Transmit: [ Message ] + [ Signature ]

Receiver (Bob):
  1. ComputedDigest = SHA256( Message )
  2. IsValid = Verify( ComputedDigest, Signature, Alice_PublicKey )`
  },
  {
    question: "Why do digital signatures always sign the 'Cryptographic Hash' of a document rather than the entire raw document directly?",
    shortAnswer: "1. Performance: Hashing reduces multi-gigabyte files to a tiny 256-bit digest, making slow asymmetric modular exponentiation fast; 2. Security: Directly signing raw data exposes asymmetric math to multiplicative homomorphism attacks.",
    explanation: "Asymmetric algorithms (RSA, ECC) are computationally expensive and cannot process multi-megabyte files directly. Hashing compresses any size file into a fixed 32-byte digest in milliseconds. Furthermore, signing a cryptographic hash (Hash-then-Sign paradigm) prevents mathematical attacks like existential forgery, where an attacker combines multiple raw RSA ciphertexts to forge valid signatures on arbitrary messages.",
    hint: "Think of stamping a summary barcode ticket on a heavy shipping container rather than stamping every individual brick inside.",
    level: "moderate",
    codeExample: `// Hash-then-Sign Paradigm:
Raw File: 4.5 GB Medical Dataset → SHA-256 Digest: 32 Bytes
Signature Operation: RSA_Sign( 32_Byte_Digest, PrivateKey ) → Takes 2.1 Milliseconds!`
  },
  {
    question: "What catastrophic vulnerability caused the famous 'Sony PlayStation 3' (PS3) ECDSA Private Key Recovery disaster in 2010?",
    shortAnswer: "Sony's engineers used a static, hardcoded constant for the random nonce $k$ in their ECDSA signature generator; signing two different games with the same nonce allowed hackers to deduce Sony's master private key instantly.",
    explanation: "In ECDSA, each signature $(r, s)$ requires a cryptographically random integer $k$: $s = k^{-1}(z + r \\cdot d) \\bmod n$. If two distinct messages $z_1$ and $z_2$ are signed with the same nonce $k$, the signature $r$ is identical. Subtracting the equations reveals $k = \\frac{z_1 - z_2}{s_1 - s_2} \\bmod n$. Hackers calculated $k$ in seconds, recovered Sony's root private key $d$, and gained the ability to sign custom homebrew firmware for all PS3 consoles globally.",
    hint: "Remember the golden rule in ECDSA: reusing the random nonce $k$ destroys the private key instantly.",
    level: "expert",
    codeExample: `// Sony PS3 ECDSA Nonce Reuse Key Extraction Formula:
Nonce Recovery:       k = (z1 - z2) / (s1 - s2) mod n
Private Key Recovery: d = (s1 * k - z1) / r mod n
// Master Root Signing Key Extracted in 0.001 Seconds!`
  },
  {
    question: "How does 'Ed25519' (RFC 8032) eliminate the ECDSA random nonce vulnerability permanently?",
    shortAnswer: "Ed25519 generates the nonce deterministically by hashing the private key and message together ($r = \\text{SHA-512}(K_{priv} || M)$); because the nonce is deterministic and unique per message, RNG failures are impossible.",
    explanation: "Unlike ECDSA which relies on external random number generators (vulnerable to low entropy or bad hardware PRNGs), Ed25519 derives its nonce using a cryptographic hash of the private key and the message itself. If the same message is signed twice, it produces the exact same signature safely; if a new message is signed, a completely unique nonce is generated automatically, guaranteeing 100% immunity to nonce reuse attacks.",
    hint: "Think of an automated internal recipe that guarantees a unique seasoning for every dish without relying on an external spice shaker.",
    level: "expert",
    codeExample: `// Ed25519 Deterministic Nonce Derivation:
Secret Key: K_priv
Message:    M
Deterministic Nonce: r = SHA-512( K_priv || M )
Signature:  (R, S) where R = r * B (100% Immune to Random Number Bias!)`
  },
  {
    question: "What is 'RSA-PSS' (Probabilistic Signature Scheme / PKCS#1 v2.2), and why does it replace legacy 'RSA-PKCS#1 v1.5' in modern security standards?",
    shortAnswer: "RSA-PSS incorporates randomized salt padding and mask generation functions (MGF1) to achieve provable cryptographic security, eliminating chosen-message existential forgery risks in PKCS#1 v1.5.",
    explanation: "Legacy RSA PKCS#1 v1.5 signature padding is deterministic and lacks formal mathematical security proofs, leading to Bleichenbacher-style signature forgery attacks against lax parser implementations. RSA-PSS (standardized in FIPS 186-5) introduces randomized salt padding and verifies signatures through a formal reduction to the RSA problem. Modern standards (TLS 1.3 and FIPS 186-5) mandate RSA-PSS as the gold standard for RSA signatures.",
    hint: "Think of wrapping a formal seal with randomized holographic confetti that proves the seal cannot be forged.",
    level: "expert",
    codeExample: `// RSA-PSS vs PKCS#1 v1.5:
Legacy PKCS#1 v1.5: [ 0x00 0x01 0xFF...0xFF 0x00 || ASN.1 || Hash ] (Deterministic, Vulnerable)
Modern RSA-PSS:     [ MaskedDB ⊕ MGF1(H) || H (SHA-256) || 0xBC ] (Provably Secure!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what is a 'Class-3 Digital Signature Certificate' (DSC), and what legal evidentiary weight does it carry under Section 5?",
    shortAnswer: "A Class-3 DSC is a high-assurance cryptographic certificate issued by CCA India-licensed CAs on FIPS 140-2 Level 2 hardware tokens; under Section 5, it carries identical legal validity and non-repudiation to handwritten ink signatures.",
    explanation: "The IT Act 2000 legally establishes asymmetric digital signatures across India. The Controller of Certifying Authorities (CCA India) regulates licensed Certifying Authorities (e.g. eMudhra, Capricorn, (n)Code) to issue Class-3 DSCs after strict biometric and video identity verification. Keys must be generated and stored inside cryptographic USB tokens (e.g. ProxKey, Watchdata). Under Section 5, any contract, tax filing, or court document signed with a Class-3 DSC has full non-repudiation in Indian courts.",
    hint: "Remember the Indian law that gives cryptographic USB signatures the exact same legal authority as physical pen signatures.",
    level: "basic",
    codeExample: `// Indian IT Act 2000 Statutory Admissibility:
IT Act Section 3: Authentication of electronic records via Asymmetric Public-Key Cryptography.
IT Act Section 5: Legal recognition of Digital Signatures (Equal to handwritten physical signatures).
Hardware Standard: 2048-bit RSA / ECC on FIPS 140-2 Level 2 Crypto USB Token.`
  },
  {
    question: "What is a 'Message Authentication Code' (MAC / HMAC), and why does a MAC provide Message Integrity and Authentication but FAIL to provide Non-Repudiation?",
    shortAnswer: "A MAC uses a single shared secret key ($K$) to calculate a tag; because BOTH sender and receiver possess key $K$, either party could have generated the tag, allowing the sender to repudiate authoring it.",
    explanation: "In symmetric HMAC: Tag = $\\text{HMAC}(K, M)$. If Alice sends Bob a payment order with a valid HMAC tag, Bob can verify that the message was not altered in transit. However, if Alice later denies sending the payment, Bob cannot prove Alice wrote it in a court of law, because Bob also possesses the secret key $K$ and could have forged the HMAC tag himself. True legal Non-Repudiation requires Asymmetric Digital Signatures where ONLY the sender holds the private key.",
    hint: "Think about why a shared metal key used by two business partners cannot prove which partner locked the door.",
    level: "moderate",
    codeExample: `// HMAC vs Digital Signature Non-Repudiation:
HMAC (Symmetric):   Shared Key K held by Alice & Bob → Bob could have forged Tag → REPUDIABLE!
Digital Signature:  Private Key held ONLY by Alice   → Bob CANNOT forge Signature → NON-REPUDIABLE!`
  },
  {
    question: "What is an 'X.509 Digital Certificate', and what are its core fields defined under the RFC 5280 standard?",
    shortAnswer: "A standardized digital document binding a Subject's identity and Public Key to a trusted Certificate Authority's signature; includes Serial Number, Subject Name, Issuer Name, Validity Period, Subject Public Key Info, and CA Signature.",
    explanation: "An X.509 v3 certificate acts as a digital passport on the internet. Defined in RFC 5280, its core fields are: 1. Version (`v3`), 2. Serial Number (Unique integer from CA), 3. Signature Algorithm (`sha256WithRSAEncryption` or `ecdsa-with-SHA256`), 4. Issuer (The CA who signed it), 5. Validity Dates (`Not Before` and `Not After`), 6. Subject (Domain name / Organization), 7. Subject Public Key Info (The actual public key), 8. Extensions (SAN - Subject Alternative Names, Key Usage).",
    hint: "Think of an international passport containing your photo, name, validity dates, and the government's official holographic seal.",
    level: "basic",
    codeExample: `// X.509 Certificate Structure:
Certificate:
  Data:
    Version: 3 (0x2)
    Serial Number: 4a:8b:9f:12:c7:d4...
    Signature Algorithm: sha256WithRSAEncryption
    Issuer: C=IN, O=CCA India, CN=eMudhra Class 3 CA
    Validity: Not Before: Jan 1 2026, Not After: Jan 1 2028
    Subject: C=IN, ST=West Bengal, L=Kolkata, O=Kolkata FinTech, CN=*.kolkatafintech.co.in
    Subject Public Key Info: RSA 2048 bit (e = 65537)
  Signature: 3f:9a:1b:e8:c7:40... (CA Signature)`
  },
  {
    question: "What is 'OCSP Stapling' (RFC 6066), and how does it solve the privacy and latency bottlenecks of traditional Certificate Revocation Lists (CRLs)?",
    shortAnswer: "The web server periodically queries the CA for a time-stamped, CA-signed OCSP response and 'staples' it directly to the TLS handshake, eliminating client CA lookup latency and preserving user privacy.",
    explanation: "In traditional revocation checking: 1. CRL (Certificate Revocation List): Client downloads multi-megabyte lists of revoked serial numbers; 2. Direct OCSP (Online Certificate Status Protocol): Client queries the CA in real time for every website visited, leaking user browsing history to the CA and adding ~200ms latency. In OCSP Stapling: The web server caches a signed OCSP validation token from the CA and sends it directly to the browser during the TLS handshake, achieving instant validation with zero privacy leaks.",
    hint: "Think of the store cashier providing a pre-printed, certified fresh bank receipt rather than calling the bank for every customer in line.",
    level: "expert",
    codeExample: `// OCSP Stapling Flow:
1. Web Server queries CA OCSP Responder every 1 hour → Receives Cached Signed Status: "GOOD"
2. User Mamata connects to Bank → Server sends [ X.509 Certificate ] + [ Stapled OCSP Response ]
3. Mamata's browser verifies CA Signature on OCSP token in 0.1ms (Zero CA Network Call needed!)`
  },
  {
    question: "What is a 'Blind Signature' (David Chaum, 1982), and how is it used in anonymous digital cash (eCash) and cryptographic electronic voting?",
    shortAnswer: "A digital signature protocol where the signer signs a message without seeing its actual contents; achieved by blinding the message with a random blinding factor ($m' = m \\cdot r^e \\bmod N$), signing $m'$, and unblinding the signature ($s = s' \\cdot r^{-1} \\bmod N$).",
    explanation: "In anonymous digital voting, Voter Mamata blinds her vote ballot $m$ by multiplying it with a random secret factor $r$ and sends blinded ballot $m'$ to Election Authority Susmita. Susmita verifies Mamata's eligibility and signs $m'$ using her private key without ever seeing Mamata's vote. Mamata receives the blinded signature and divides out $r$, obtaining a valid digital signature from Susmita over her unblinded vote $m$. Mamata casts her vote anonymously, fully verifiable by everyone.",
    hint: "Think of placing a carbon copy sheet inside an opaque envelope: the official signs the outside of the envelope, transferring their signature to the hidden paper inside.",
    level: "expert",
    codeExample: `// RSA Blind Signature Protocol:
1. Blinding:   m' = (m * r^e) mod N (Voter blinds message)
2. Signing:    s' = (m')^d = (m * r^e)^d = (m^d * r) mod N (Authority signs blinded message)
3. Unblinding: s = (s' * r^(-1)) mod N = m^d mod N (Voter extracts valid signature over original m!)`
  },
  {
    question: "What is 'Threshold Cryptography' (e.g. $(t, n)$ Threshold Signatures / Shamir's Secret Sharing), and how does it prevent a single compromised administrator from executing rogue transactions?",
    shortAnswer: "A scheme where a private signing key is split into $n$ shares, requiring at least $t$ out of $n$ authorized signers (e.g. 3 of 5 directors) to collaborate to generate a valid digital signature.",
    explanation: "In high-value financial systems (like RBI core settlement gateways or corporate treasury reserves), holding the private key on a single server creates a single point of compromise. In a $(t, n)$ Threshold Signature Scheme (such as FROST or Shamir's Secret Sharing), the master private key $K_{priv}$ is divided into $n$ mathematical polynomial shares. Any $t$ shares (e.g. 3 out of 5 executives) can combine partial signatures to produce a standard signature. Zero individual executive ever possesses the master private key.",
    hint: "Think of an atomic submarine launch system that requires three independent officers to turn three physical keys simultaneously.",
    level: "expert",
    codeExample: `// (3, 5) Threshold Signature Scheme:
Total Key Shares: 5 (Held by Mamata, Mahima, Debangshu, Abhronila, Susmita)
Threshold t = 3: Any 3 shares can mathematically reconstruct the valid ECDSA signature!
Compromised Nodes: Attacker steals 2 shares → ZERO ability to forge signatures!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how do Digital Signatures provide legally binding audit trails for 'Data Principal Consent Artifacts'?",
    shortAnswer: "Consent artifacts (specifying data categories, purpose, and retention period) are cryptographically signed with the user's asymmetric key; Consent Managers verify and log signatures to provide non-repudiable legal compliance.",
    explanation: "Section 6 of the DPDP Act 2023 requires Data Fiduciaries to prove that valid, informed consent was obtained from the Data Principal. By generating a JSON Consent Artifact and cryptographically signing it using the user's private key (or DigiLocker/Aadhaar eSign), the resulting digital signature is anchored to an immutable timestamp. In the event of a regulatory inquiry by the Data Protection Board of India, the signature provides non-repudiable proof of compliance.",
    hint: "Remember how digital signatures provide legally binding consent artifacts under Indian data privacy laws.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 Digital Consent Artifact:
{
  "consentId": "DPDP-KOLKATA-2026-9812",
  "principal": "Mamata",
  "fiduciary": "Kolkata FinTech Corp",
  "purpose": "Credit Underwriting",
  "timestamp": "2026-08-23T01:50:00Z",
  "signature": "3f9a1be8c740... (Signed via Aadhaar eSign / Class-3 DSC)"
}`
  },
  {
    question: "What is 'ECDSA Nonce Bias' (Lattice-based Hidden Number Problem attack), and why did even a 1-bit bias in random nonces compromise Bitcoin and SSH private keys?",
    shortAnswer: "If an RNG has even a tiny bias (e.g. the first bit of nonce $k$ is always 0), collecting ~100 to 200 signatures allows an attacker using lattice reduction (LLL / BKZ algorithms) to solve the Hidden Number Problem and extract the private key.",
    explanation: "In 2013, cryptanalysts discovered that ECDSA does not just fail if nonce $k$ is identical; it fails if $k$ is even slightly non-uniform. If an embedded crypto chip generates nonces where the top bit is always zero (bias $\\epsilon$), formulating the signatures as a lattice matrix and running the Lenstra-Lenstra-Lovász (LLL) lattice reduction algorithm solves the Hidden Number Problem (HNP), recovering the full 256-bit private key from a few hundred public signatures.",
    hint: "Think of an imperfect dice that lands on an even number 51% of the time, allowing a mathematician to predict the secret weight.",
    level: "expert",
    codeExample: `// Lattice Reduction Attack on Biased ECDSA (LLL Algorithm):
Input: 150 ECDSA Signatures with 1-bit Nonce Bias (k < 2^255)
Matrix Formulation: Build (n+2)-dimensional lattice matrix L
Action: Run LLL / BKZ Lattice Reduction → Shortest Vector yields Private Key d!`
  },
  {
    question: "What is 'Forward-Secure Digital Signatures', and how do evolving private keys protect past signatures even if the current private key is stolen?",
    shortAnswer: "The timeline is split into discrete time periods ($T_0, T_1\\dots$); the private key evolves via a one-way function ($K_{priv}^{(t+1)} = f(K_{priv}^{(t)})$), so stealing the current key cannot forge or invalidate past signatures.",
    explanation: "In standard digital signatures, if an attacker compromises Alice's private key today, all signatures Alice ever signed in the past become suspect in court. In a Forward-Secure Signature scheme (Bellare-Miner / XMSS), the private key is updated at every time step $t$ using a one-way cryptographic function, and the old private key is securely zeroized from RAM. An attacker who steals the key at time $T_{10}$ cannot forge signatures for times $T_0$ to $T_9$, preserving historical legal integrity.",
    hint: "Think of a secret diary where yesterday's page automatically turns into indestructible stone that can never be modified.",
    level: "expert",
    codeExample: `// Forward-Secure Signature Key Evolution:
Time T=0: K_priv_0 used to sign → Key evolves: K_priv_1 = SHA256( K_priv_0 ) → K_priv_0 is WIPED!
Time T=1: K_priv_1 used to sign → Key evolves: K_priv_2 = SHA256( K_priv_1 ) → K_priv_1 is WIPED!
// Attacker steals K_priv_2 → Cannot reverse SHA-256 to forge signatures for T=0 or T=1!`
  },
  {
    question: "What is the 'Post-Quantum Digital Signature' standard (NIST FIPS 204 / ML-DSA), and what lattice problem guarantees its security?",
    shortAnswer: "Module Learning with Errors (MLWE) and Module Short Integer Solution (MSIS) in polynomial rings over structured lattices; standardized as FIPS 204 (CRYSTALS-Dilithium) to replace RSA and ECDSA.",
    explanation: "Because Shor's quantum algorithm breaks both RSA and ECDSA, NIST standardized FIPS 204 (ML-DSA / CRYSTALS-Dilithium) in August 2024. ML-DSA is built on the hardness of finding short vectors in high-dimensional lattice grids (Module-SIS and Module-LWE). Unlike RSA which relies on prime factoring, there are zero known quantum or classical polynomial-time algorithms to solve shortest vector lattice problems, guaranteeing quantum-safe digital signatures for the next 50+ years.",
    hint: "Think of hiding a secret point inside a 1000-dimensional geometric crystal lattice.",
    level: "expert",
    codeExample: `// NIST Post-Quantum Signature Standard (FIPS 204 / ML-DSA):
Algorithm: ML-DSA-65 (CRYSTALS-Dilithium)
Public Key Size: 1,952 bytes
Signature Size:  3,309 bytes
Security: 128-bit Post-Quantum Security Margin (100% Resistant to Shor's Algorithm)`
  },
  {
    question: "What is the 'Certificate Transparency' (CT) framework (RFC 6962), and how does it prevent rogue Certificate Authorities from secretly issuing fake SSL certificates?",
    shortAnswer: "Public, append-only, cryptographically auditable Merkle Tree logs monitored by domain owners; web browsers reject any SSL certificate that does not contain cryptographic Signed Certificate Timestamps (SCTs) from public CT logs.",
    explanation: "Historically, if a rogue or coerced CA issued a secret fake certificate for `google.com` or `kolkatafintech.co.in`, nobody knew until an active MitM attack was detected. Certificate Transparency (RFC 6962) mandates that before any CA can issue an X.509 certificate, the certificate must be published to public, immutable, append-only Merkle tree logs. Web browsers (Chrome, Firefox) strictly reject certificates lacking Signed Certificate Timestamps (SCTs), allowing domain owners to detect fraudulent certificates within minutes.",
    hint: "Think of an open public municipal registry where every new building permit must be published on a public bulletin board before construction can begin.",
    level: "expert",
    codeExample: `// Certificate Transparency (CT) Validation:
CA issues Certificate → Publishes to Google / Cloudflare Public CT Merkle Log
Log returns: Signed Certificate Timestamp (SCT)
Browser connects → Checks for valid SCT proof → Connection ALLOWED only if logged in public Merkle Tree!`
  },
  {
    question: "Synthesizing Message Integrity and Digital Signatures: what is the master architecture for deploying digital signatures across enterprise banking and cloud infrastructure?",
    shortAnswer: "Enforce Ed25519 or RSA-PSS for application API signatures, store root signing keys in FIPS 140-3 HSMs, deploy Class-3 DSCs under CCA India for legal non-repudiation, and implement OCSP stapling with Certificate Transparency.",
    explanation: "Digital signatures are the bedrock of legal and technical trust in the modern world. Deploying an invincible signature architecture requires uniting four layers: 1. Provably secure algorithms (Ed25519 / RSA-PSS) that eliminate nonce reuse and padding flaws; 2. Hardware key isolation (FIPS 140-3 HSMs and crypto-tokens); 3. Robust PKI governance (X.509 trust chains, OCSP stapling, and Certificate Transparency); 4. Statutory compliance under the Indian IT Act 2000 and DPDP Act 2023.",
    hint: "Conclude by recognizing how combining robust signature algorithms with hardware isolation and statutory compliance creates an unbroken chain of trust.",
    level: "expert",
    codeExample: `// The Master Enterprise Digital Signature Blueprint:
(Ed25519_Deterministic + FIPS_140_3_HSM + Class3_DSC_IT_Act + OCSP_Stapling) = UNBREAKABLE_LEGAL_TRUST;`
  }
];

export default questions;
