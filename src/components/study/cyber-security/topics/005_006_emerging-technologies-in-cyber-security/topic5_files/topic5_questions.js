const questions = [
  {
    id: 1,
    question: "What is a W3C Decentralized Identifier (DID) and what is its standard URI structure?",
    shortAnswer: "A DID is a globally unique, persistent, cryptographically verifiable URI conforming to the W3C standard with the syntax `did:method:method-specific-id` (e.g., `did:ion:EiD382...` or `did:indy:sovrin:99124`). It resolves to a DID Document without relying on a centralized registry or identity provider.",
    explanation: "DIDs enable self-sovereign identity where individuals control their own public/private key pairs.",
    hint: "W3C standard URI: did:method:method-specific-id that resolves to a DID Document.",
    level: "Basic",
    codeExample: `// DID URI Syntax:
// scheme : did
// method : ion (Bitcoin Layer-2) / indy (Hyperledger)
// id     : EiD8f92b4c10...`
  },
  {
    id: 2,
    question: "What are the core contents of a DID Document?",
    shortAnswer: "A DID Document is a JSON-LD object containing: 1. `id` (the DID URI); 2. `verificationMethod` (cryptographic public keys, e.g., Ed25519/Secp256k1); 3. `authentication` (authorized verification keys); 4. `assertionMethod` (keys used for signing Verifiable Credentials); 5. `service` (encrypted messaging endpoints).",
    explanation: "The DID Document contains public keys allowing verifiers to authenticate presentations without contacting an intermediary.",
    hint: "Contains public keys, authentication protocols, assertion methods, and service endpoints.",
    level: "Moderate",
    codeExample: `// DID Document:
// { "id": "did:ion:123", "verificationMethod": [{ "id": "did:ion:123#key-1", "type": "JsonWebKey2020", "publicKeyJwk": {...} }] }`
  },
  {
    id: 3,
    question: "Explain the roles of the three participants in the W3C Trust Triangle.",
    shortAnswer: "1. Issuer (e.g., Government / University): Issues and digitally signs the Verifiable Credential (VC); 2. Holder / Subject (Citizen / Employee): Stores VCs in a local edge mobile wallet and presents Verifiable Presentations (VPs); 3. Verifier / Relying Party (Bank / Employer): Verifies the Issuer's signature using public keys queried from the decentralized registry.",
    explanation: "The trust triangle decouples credential issuance from verification, eliminating phone-home tracking by issuers.",
    hint: "Issuer creates signed credential; Holder stores in mobile wallet; Verifier verifies cryptographic proof.",
    level: "Basic",
    codeExample: `// Trust Triangle:
// [Issuer (Gov)] ➔ Issues VC ➔ [Holder (Citizen Wallet)] ➔ Presents VP ➔ [Verifier (Bank)]
//                                     ▲                              │
//                                     └─── [Blockchain Registry] ────┘ (Queries public keys)`
  },
  {
    id: 4,
    question: "What is Selective Disclosure and Zero-Knowledge Proofs (ZKPs) in Verifiable Credentials?",
    shortAnswer: "Selective Disclosure allows a Holder to disclose only a minimal subset of attributes from a credential (e.g., showing only employee role while redacting salary and home address). Using ZKPs (BBS+ signatures), a user can prove 'Age >= 18' without revealing their actual date of birth.",
    explanation: "Selective disclosure enforces the principle of data minimization and privacy preservation under GDPR and DPDP Act.",
    hint: "Proving claims (e.g., age >= 18) without revealing underlying sensitive attributes or full identity documents.",
    level: "Moderate",
    codeExample: `// Selective Disclosure Presentation:
// Full VC: { Name: "Susmita", DOB: "1998-04-12", Salary: "₹1,25,000", Clearance: "TOP_SECRET" }
// VP Sent: { Clearance: "TOP_SECRET", Age_Over_18_ZKP: true } (DOB and Salary 100% hidden ✔)`
  },
  {
    id: 5,
    question: "How does BBS+ Signatures enable multi-claim selective disclosure and unlinkability?",
    shortAnswer: "BBS+ is a pairing-based signature scheme that signs multiple credential claims individually into a single mathematical commitment. The Holder can generate a zero-knowledge presentation proving knowledge of a valid signature over selected attributes while mathematically blinding the presentation so that different verifiers cannot correlate or track the user.",
    explanation: "BBS+ prevents verifier collusion from tracking user activities across different websites.",
    hint: "Pairing-based cryptographic signature allowing selective attribute disclosure and unlinkable presentations.",
    level: "Expert",
    codeExample: `// BBS+ Cryptographic Presentation:
// Signs [c1, c2, c3, c4] -> Holder presents proof of (c1, c4) without revealing signature or hidden claims.`
  },
  {
    id: 6,
    question: "What is the 'Phone-Home' privacy flaw in traditional OAuth 2.0 / SAML and how does DID eliminate it?",
    shortAnswer: "In OAuth/SAML (e.g., 'Login with Google'), the identity provider is contacted on EVERY login, allowing the IdP to track every website the user visits. In DID, the Verifier validates the credential's cryptographic signature locally against public keys on the blockchain WITHOUT ever contacting the Issuer.",
    explanation: "DIDs guarantee complete privacy from the issuing organization after the credential is issued.",
    hint: "In OAuth the IdP tracks every login; in DID the verifier checks signatures locally without contacting the issuer.",
    level: "Moderate",
    codeExample: `// Privacy Comparison:
// Google OAuth : Google knows every time you log into Bank, Hospital, and Shopping sites (Phone-Home ❌)
// W3C DID      : Bank verifies signature against blockchain; Government issuer knows NOTHING of the login ✔`
  },
  {
    id: 7,
    question: "How does Blockchain achieve Tamper-Proof Audit Logging for enterprise SIEM platforms?",
    shortAnswer: "Every 60 seconds, the SOC ingestion engine hashes a batch of SIEM logs into a SHA-256 binary Merkle Root and commits the root hash to an immutable blockchain smart contract. If an attacker gains root access and modifies historical logs, the recomputed Merkle root will not match the immutable on-chain record.",
    explanation: "This guarantees mathematical non-repudiation and evidence admissibility in court.",
    hint: "Periodically hashing log batches and committing Merkle roots to an immutable blockchain ledger.",
    level: "Basic",
    codeExample: `// Tamper-Proof Audit Flow:
// [1,000 SIEM Logs] ➔ Merkle Root: 0x8a92... ➔ Smart Contract Tx: recordLogBatch(0x8a92...)`
  },
  {
    id: 8,
    question: "What is a Credential Revocation Accumulator (e.g., Dynamic Cryptographic Accumulators / StatusList2021) in DID systems?",
    shortAnswer: "A space-efficient cryptographic data structure (or bitstring published on-chain) where each bit index represents a credential's active/revoked status ($0 = \\text{valid}, 1 = \\text{revoked}$). A verifier checks the revocation status list on the blockchain in $O(1)$ time without revealing which specific user is being verified.",
    explanation: "Accumulators allow instant credential revocation while preserving privacy.",
    hint: "On-chain bitstring where a single bit indicates if a specific credential ID has been revoked.",
    level: "Expert",
    codeExample: `// StatusList2021 Bitstring:
// "0000010000..." (Bit index 5 = 1 ➔ Credential #5 has been REVOKED by Issuer 🚨)`
  },
  {
    id: 9,
    question: "What is Key Rotation and Recovery in Self-Sovereign Identity (SSI) DID Documents?",
    shortAnswer: "The Holder can replace a compromised private key by signing a DID Document update transaction with an authorized 'Recovery Key' and publishing the new public key to the blockchain registry, invalidating the old key without changing the root DID URI.",
    explanation: "Key rotation ensures long-term identity persistence even if a mobile device is lost or stolen.",
    hint: "Updating the public keys in the on-chain DID Document using a recovery key without changing the DID URI.",
    level: "Moderate",
    codeExample: `// DID Document Key Update:
// POST did:ion update: { "action": "replace-key", "oldKey": "key-1", "newKey": "key-2", "signedBy": "recovery-key" }`
  },
  {
    id: 10,
    question: "What is Social Recovery in Decentralized Identity Wallets?",
    shortAnswer: "A threshold recovery mechanism (using Shamir's Secret Sharing) where the master recovery key is split into $N$ encrypted shares distributed to trusted friends, family, or institutions (Guardians). If the user loses their phone, $K$-of-$N$ guardians (e.g., 3 of 5) cooperate to reconstruct the recovery key.",
    explanation: "Social recovery eliminates single seed-phrase loss without relying on a centralized cloud backup.",
    hint: "Splits recovery keys among trusted guardians using Shamir's Secret Sharing (e.g., 3-of-5 threshold).",
    level: "Moderate",
    codeExample: `// Social Recovery:
// Guardians: [Susmita, Debangshu, Mamata, Mahima, Treasury_CA]
// Threshold: Any 3 signatures recover the lost wallet private key ✔`
  },
  {
    id: 11,
    question: "What is the difference between an On-Chain DID method (e.g., `did:ethr`) and an Off-Chain / Layer-2 DID method (e.g., `did:ion` / `did:key`)?",
    shortAnswer: "`did:ethr` writes every DID document update directly to the Ethereum blockchain (high gas fees, slow). `did:ion` (Sidetree protocol) anchors batches of 10,000 DID operations in a single Bitcoin transaction off-chain, achieving high throughput with minimal fees. `did:key` is a self-contained ephemeral DID derived directly from a public key with no blockchain needed.",
    explanation: "Layer-2 and off-chain DID methods scale to billions of identity operations globally.",
    hint: "On-chain writes every update to L1; Layer-2 anchors batches off-chain; did:key is purely cryptographic without a ledger.",
    level: "Expert",
    codeExample: `// DID Methods:
// did:ethr:0x1234...  ➔ Direct on-chain Ethereum smart contract state
// did:ion:EiD...      ➔ Layer-2 Sidetree protocol anchored on Bitcoin
// did:key:z6Mku...    ➔ Self-contained public key string (No blockchain lookup)`
  },
  {
    id: 12,
    question: "What is Verifiable Presentation (VP) Token Binding?",
    shortAnswer: "When presenting a credential to a verifier, the Holder cryptographically signs a fresh, random challenge (Nonce) and the Verifier's Domain name inside the VP wrapper using their private key, proving they hold the private key associated with the `credentialSubject.id`.",
    explanation: "Token binding prevents a Man-in-the-Middle from intercepting a VP and replaying it to another service.",
    hint: "Signing a fresh challenge and domain name inside the VP to prevent replay attacks.",
    level: "Moderate",
    codeExample: `// VP Token Binding:
// { "type": "VerifiablePresentation", "verifiableCredential": [...], "proof": { "challenge": "nonce_99182", "domain": "bank.in" } }`
  },
  {
    id: 13,
    question: "How does DID solve the 'Vendor Lock-in' problem of enterprise identity providers (Okta / Entra ID)?",
    shortAnswer: "In centralized IAM, all user identities, attributes, and federation links are owned by the vendor's proprietary database; migrating away requires massive re-platforming. With DIDs and open W3C standards, users own their credentials portably and can present them to any compliant system globally.",
    explanation: "Interoperable open standards prevent proprietary vendor lock-in.",
    hint: "Users own their credentials in open standard formats, allowing migration across any IAM system.",
    level: "Basic",
    codeExample: `// Interoperable VC:
// Same W3C Credential in citizen's mobile wallet is verified by Okta, PingIdentity, and custom node.js servers identically.`
  },
  {
    id: 14,
    question: "What is Merkle Mountain Range (MMR) in append-only cryptographic audit logs?",
    shortAnswer: "An MMR is an efficient append-only variation of a Merkle tree structured as a sequence of perfect binary subtrees. It allows new log entries to be appended in $O(1)$ amortized time while generating compact $O(\\log N)$ inclusion and consistency proofs without rebuilding the entire tree.",
    explanation: "MMRs are the industry standard for high-throughput append-only audit ledgers (e.g., Grin / Trillian).",
    hint: "Append-only variation of Merkle trees allowing fast O(1) log appends and compact inclusion proofs.",
    level: "Expert",
    codeExample: `// MMR Structure:
// Perfect binary subtrees: 8 leaves + 4 leaves + 1 leaf = MMR with 13 total nodes (Fast append)`
  },
  {
    id: 15,
    question: "What is Certificate Transparency (RFC 6962) and how does it use append-only Merkle Trees to secure the Web PKI?",
    shortAnswer: "Certificate Transparency requires all public TLS Certificate Authorities to publish every issued certificate to public, append-only, cryptographically verifiable Merkle Tree audit logs. Domain owners continuously monitor logs to detect unauthorized or forged certificates within minutes.",
    explanation: "CT logs make rogue CA certificate issuance globally visible and auditable.",
    hint: "Public append-only Merkle logs where all SSL/TLS certificates must be registered to be trusted by browsers.",
    level: "Moderate",
    codeExample: `// CT Log Verification:
// Browser checks SCT (Signed Certificate Timestamp) in TLS handshake -> Validates Merkle inclusion proof.`
  },
  {
    id: 16,
    question: "What is Decentralized Web Node (DWN) in Decentralized Identity architectures?",
    shortAnswer: "A decentralized, encrypted personal data storage and messaging mesh operated by the user (or hosted by a provider). DWNs store a user's private Verifiable Credentials, encrypted chat messages, and application data, accessible only via authenticated DID authorization.",
    explanation: "DWNs replace centralized cloud databases (like iCloud/Google Drive) for personal identity storage.",
    hint: "Encrypted personal data storage mesh where users store their private credentials and data.",
    level: "Moderate",
    codeExample: `// DWN Request:
// POST https://dwn.susmita.me/records/query -> Authenticates with DID Ed25519 signature -> Retrieves encrypted VC.`
  },
  {
    id: 17,
    question: "How does DID-based Authentication (DIDComm / DID-Auth) establish end-to-end encrypted peer-to-peer sessions?",
    shortAnswer: "Two parties resolve each other's DIDs to fetch their respective public encryption keys (e.g., X25519) from their DID Documents. They perform an authenticated Diffie-Hellman key exchange (ECDH) to derive a shared symmetric encryption key, establishing an encrypted P2P messaging tunnel.",
    explanation: "DIDComm enables end-to-end encrypted, metadata-private communication without centralized intermediaries.",
    hint: "Resolves DIDs to fetch X25519 public keys and performs ECDH to create an encrypted P2P tunnel.",
    level: "Expert",
    codeExample: `// DIDComm Handshake:
// Alice resolves Bob's DID -> ECDH(Alice_PrivKey, Bob_PubKey) -> Shared AES-256 GCM Session Key Derived!`
  },
  {
    id: 18,
    question: "What is the GDPR / DPDP Act 'Right to be Forgotten' paradox in blockchain audit logging and how is it resolved?",
    shortAnswer: "Paradox: Privacy laws mandate deleting personal data upon request, but blockchains are permanently immutable. Resolution: Never store raw PII on-chain! Store only salted SHA-256 hashes ($H = \\text{SHA256}(\\text{Data} || \\text{Salt})$). To 'delete' the data, the enterprise destroys the secret Salt/Key, rendering the on-chain hash cryptographically un-linkable to the individual (Crypto-Shredding).",
    explanation: "Crypto-shredding satisfies GDPR compliance while maintaining permanent blockchain audit integrity.",
    hint: "Never store raw PII on-chain; store salted hashes and delete the salt (Crypto-Shredding) upon erasure requests.",
    level: "Expert",
    codeExample: `// Crypto-Shredding:
// On-Chain: Hash = SHA256(Susmita_PII || SecretSalt_101)
// Erase Request: DELETE SecretSalt_101 ➔ On-chain hash is permanently scrambled and unrecoverable ✔`
  },
  {
    id: 19,
    question: "What is W3C Verifiable Credential Schema (JSON Schema / Schema.org)?",
    shortAnswer: "A standardized formal schema definition (hosted on a public URI or decentralized registry) that specifies the exact data types, required fields, and semantic definitions of claims inside a Verifiable Credential (e.g., ensuring `clearanceLevel` is an enumerated string).",
    explanation: "Schemas ensure machine-readable interoperability between different issuers and verifiers globally.",
    hint: "Formal schema specifying required fields and data formats for claims inside a credential.",
    level: "Basic",
    codeExample: `// Credential Schema Reference:
// "credentialSchema": { "id": "https://schema.wb.gov.in/treasury_officer_v1.json", "type": "JsonSchemaValidator2018" }`
  },
  {
    id: 20,
    question: "How does DID prevent Identity Theft via SIM Swapping?",
    shortAnswer: "Traditional accounts use SMS OTPs tied to telecom phone numbers. DID credentials and private keys are stored securely inside the physical hardware Secure Enclave of the user's mobile device (or hardware token). A SIM swap transfers only the phone number, leaving the attacker with zero access to the private signing keys.",
    explanation: "DIDs eliminate phone numbers as an authentication factor, rendering SIM swapping completely useless.",
    hint: "Private keys are bound to hardware secure enclaves, not mobile carrier phone numbers.",
    level: "Basic",
    codeExample: `// SIM Swap Immunity:
// Attacker clones SIM -> Attempts login -> Verifier demands Ed25519 signature from Secure Enclave -> Fails! 🛡️`
  },
  {
    id: 21,
    question: "What is Verifiable Data Registry in the W3C DID specification?",
    shortAnswer: "The decentralized infrastructure system (e.g., a blockchain ledger, distributed hash table, or peer-to-peer network) that mediates the creation, resolution, and verification of DIDs, DID Documents, credential schemas, and revocation lists.",
    explanation: "The registry guarantees high availability and censorship resistance for identity resolution.",
    hint: "The decentralized blockchain or P2P network used to publish and resolve DIDs and schemas.",
    level: "Moderate",
    codeExample: `// Registry Resolution:
// Universal Resolver: did:ion:123 ➔ Queries Bitcoin L2 Sidetree ➔ Returns JSON DID Document in 100ms.`
  },
  {
    id: 22,
    question: "What is JSON-LD and Linked Data Signatures in Verifiable Credentials?",
    shortAnswer: "JSON-LD (JavaScript Object Notation for Linked Data) provides semantic web context (`@context`) mapping human terms to unambiguous global URIs. Linked Data Signatures (LDS) canonize the JSON-LD structure (URDNA2015 algorithm) to produce a deterministic byte string before cryptographic signing.",
    explanation: "Canonicalization ensures JSON formatting differences (whitespace/key ordering) do not break digital signatures.",
    hint: "Provides semantic web context and canonicalizes JSON structures so formatting changes don't break signatures.",
    level: "Expert",
    codeExample: `// RDF Canonicalization:
// JSON-LD -> URDNA2015 Canonical Form -> SHA256 Hash -> Ed25519 Sign -> Valid Signature Proof`
  },
  {
    id: 23,
    question: "What is Hardware Key Binding in Decentralized Identity Wallets?",
    shortAnswer: "Generating DID private keys inside a FIPS 140-2 Level 3 Hardware Security Module (HSM) or smartphone Secure Enclave (Apple Secure Enclave / Android StrongBox). Private keys can never be exported or copied in software; cryptographic signatures require local biometric authorization.",
    explanation: "Hardware key binding prevents malware from exfiltrating identity keys from memory.",
    hint: "Storing DID private keys inside hardware Secure Enclaves requiring biometric authorization.",
    level: "Moderate",
    codeExample: `// Secure Enclave Signing:
// Key generated with kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly -> Signature generated in hardware chip.`
  },
  {
    id: 24,
    question: "How does Blockchain-Anchored Audit Logging assist in incident root-cause analysis during cyber forensics?",
    shortAnswer: "Forensic investigators compare the local timestamped logs with on-chain Merkle roots. If log entries are missing or altered between 02:00 AM and 03:00 AM, the exact block hash mismatch pinpoints the precise time window when the intruder tampered with logs, establishing the timeline of compromise.",
    explanation: "Pinpointing the exact point of divergence isolates when and where the attacker operated.",
    hint: "Comparing log hashes against on-chain roots pinpoints the exact time window when an intruder tampered with logs.",
    level: "Moderate",
    codeExample: `// Forensic Diagnostic:
// Hash check passes up to 02:14:00 AM -> Mismatch begins at 02:15:00 AM -> Incident window isolated to 02:15 AM!`
  },
  {
    id: 25,
    question: "What is Decentralized Access Control using DID and Capability Tokens (ZCAP-LD)?",
    shortAnswer: "ZCAP-LD (Authorization Capabilities for Linked Data) issues cryptographically signed capability tokens granting specific delegated permissions (e.g., 'Read /treasury/reports between 9AM and 5PM'). The token is signed by the resource owner and delegable to other DIDs with attenuation.",
    explanation: "ZCAPs replace centralized API keys with cryptographically delegable, verifiable authorization proofs.",
    hint: "Signed capability tokens granting specific delegated permissions to DIDs with cryptographic attenuation.",
    level: "Expert",
    codeExample: `// ZCAP-LD Token:
// { "invoker": "did:ion:susmita", "allowedAction": "read_ledger", "expires": "2026-08-23T18:00:00Z" }`
  },
  {
    id: 26,
    question: "What is Sybil Resistance in decentralized identity issuance?",
    shortAnswer: "Preventing a single malicious actor from generating thousands of valid DIDs with fake Verifiable Credentials (e.g., claiming multiple government welfare payouts). Enforced via Unique Proof-of-Personhood (biometric deduplication, social graph trust webs, or government-backed credential anchoring).",
    explanation: "Proof-of-personhood ensures 1-person-1-credential without exposing identity details.",
    hint: "Ensuring each physical human can obtain only one valid credential using biometric deduplication.",
    level: "Moderate",
    codeExample: `// Proof-of-Personhood:
// Iris Hash Deduplication -> Generates Zero-Knowledge Uniqueness Token -> Prevents duplicate welfare claims ✔`
  },
  {
    id: 27,
    question: "What is an Air-Gapped DID Verifier?",
    shortAnswer: "A physical verification kiosk (e.g., at a high-security defense facility gate) that has zero network or internet connection. It stores pre-downloaded cryptographic public keys and revocation lists in local secure memory, verifying visitor mobile Verifiable Presentations via offline QR codes or NFC.",
    explanation: "Air-gapped verification prevents cyber attacks and operates reliably during network blackouts.",
    hint: "Offline kiosk that verifies credential QR codes using pre-cached public keys with no internet connection.",
    level: "Basic",
    codeExample: `// Air-Gapped Verification:
// Visitor QR ➔ Kiosk Camera (Offline) ➔ Verifies Ed25519 signature against pre-cached Gov Public Key ➔ Gate Opens ✔`
  },
  {
    id: 28,
    question: "How do Decentralized Identifiers support Machine-to-Machine (M2M) and IoT device authentication?",
    shortAnswer: "Each IoT sensor, drone, or smart meter is provisioned with its own DID (`did:key:...` or `did:indy:...`) and hardware private key at manufacturing. Devices authenticate to cloud gateways by signing telemetry payloads with their DID private key, establishing mutual zero-trust identity.",
    explanation: "DIDs provide globally unique, cryptographically verifiable identities for billions of IoT nodes.",
    hint: "Every IoT device is provisioned with a DID and hardware private key to sign telemetry data.",
    level: "Moderate",
    codeExample: `// IoT Telemetry Payload:
// { "sensor_did": "did:key:z6Mk...", "temperature": 24.5, "proof": { "signature": "ed25519_sig..." } }`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury deployment, a rogue insider attempted to alter a property deed and delete the corresponding SIEM database audit logs. How did the combination of DID and Blockchain Audit Logging defeat this double-attack?",
    shortAnswer: "1. DID Enforcement: The insider could not forge the Treasury Director's authorization because the approval required a W3C Verifiable Presentation signed by the Director's hardware-bound DID private key. 2. Immutable Log Integrity: When the insider deleted the local MySQL audit log entries to conceal the attempt, the automated hourly Merkle root comparison against the blockchain flagged a critical hash mismatch, alerting the SecOps team.",
    explanation: "The layered DID-Blockchain architecture prevents unauthorized actions while preserving permanent, tamper-evident forensic records.",
    hint: "DID prevented forging authorization signatures, and blockchain log hashing exposed the deleted audit records.",
    level: "Expert",
    codeExample: `// Layered Defense Outcome:
// Step 1: Transfer blocked (Invalid DID signature on transaction authorization) 🛡️
// Step 2: Insider deletes logs -> Merkle Root on Blockchain: 0x7f... vs Local: 0x00... -> Tampering Alarm Triggered! 🚨`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical blueprint for an Enterprise W3C Decentralized Identity (DID) & Tamper-Proof Audit Architecture.",
    shortAnswer: "1. DID Registry: Deploy permissioned blockchain (Hyperledger Indy/Fabric) hosting public DID Documents, schemas, and StatusList2021 revocation accumulators. 2. Edge Wallets: Employees hold mobile wallets with hardware Secure Enclaves storing Ed25519/BBS+ private keys. 3. Trust Triangle: HR/Treasury issues VCs; enterprise portals verify VPs using zero-knowledge selective disclosure. 4. Tamper-Proof Logging: SIEM engine batches all access logs every 60s, computes binary Merkle roots, and commits hashes to the blockchain ledger. 5. Automated Verification: Continuous audit cron jobs guarantee 100% log integrity.",
    explanation: "This complete blueprint delivers self-sovereign, privacy-preserving zero-trust identity paired with cryptographically indisputable audit integrity.",
    hint: "Permissioned DID registry, mobile edge wallets with Secure Enclave, BBS+ selective disclosure, and 60s Merkle log anchoring.",
    level: "Expert",
    codeExample: `// Enterprise DID & Audit Blueprint:
// [Issuer: HR Portal] ➔ Signs W3C VC ➔ [Holder: Mobile Secure Enclave] ➔ ZKP Presentation ➔ [Verifier: Gateway]
//                                                                                                │
// [SIEM Logs (60s Batch)] ➔ [Merkle Root Engine] ➔ Anchored in [Blockchain Ledger] ◄────────────┘`
  }
];

export default questions;
