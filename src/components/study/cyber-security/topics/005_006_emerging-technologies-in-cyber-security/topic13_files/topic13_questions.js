const questions = [
  {
    id: 1,
    question: "What are the Five Foundational Pillars of Next-Generation Cybersecurity Architecture Synthesis?",
    shortAnswer: "1. Autonomous AI & Machine-Speed SOAR (Pillar 1); 2. Blockchain & Decentralized Identity (W3C DID / ZKP - Pillar 2); 3. Quantum Key Distribution (QKD Photonic Layer - Pillar 3); 4. NIST Post-Quantum Cryptography (FIPS 203 ML-KEM & FIPS 204 ML-DSA - Pillar 4); 5. Zero Trust Architecture (NIST SP 800-207 PDP/PEP & Continuous Access Evaluation - Pillar 5).",
    explanation: "Synthesizing all 5 pillars creates a multi-layered defense-in-depth framework that is immune to single points of failure.",
    hint: "Autonomous AI, Blockchain DID, QKD Photonics, NIST PQC, and Zero Trust Architecture.",
    level: "Basic",
    codeExample: `// 5-Pillar Architecture:
// [AI SOAR] + [Blockchain DID] + [QKD Photonics] + [NIST PQC] + [Zero Trust SDP]`
  },
  {
    id: 2,
    question: "How does the integration of Zero Trust Architecture and Post-Quantum Cryptography (PQC) neutralize 'Harvest Now, Decrypt Later' (HNDL) attacks?",
    shortAnswer: "Zero Trust enforces Software-Defined Perimeter (SDP) micro-tunnels where internal data sources have zero listening ports, preventing adversaries from easily intercepting internal traffic. Furthermore, all external and internal TLS 1.3 transit is encrypted using NIST FIPS 203 ML-KEM-768, ensuring that even if an adversary archives encrypted packets, quantum computers can never decrypt them.",
    explanation: "Zero Trust limits network visibility while PQC guarantees mathematical unbreakability.",
    hint: "Zero Trust hides network traffic behind SDP tunnels while ML-KEM-768 prevents quantum decryption of archived packets.",
    level: "Basic",
    codeExample: `// Anti-HNDL Defense:
// [External TLS] ➔ NIST FIPS 203 ML-KEM-768
// [Internal Mesh]➔ Istio mTLS with SPIRE + Zero Listening Ports (Invisible)`
  },
  {
    id: 3,
    question: "How do Decentralized Identity (DID) and Zero-Knowledge Proofs (ZKP) enhance Zero Trust Policy Decision Points (PDP)?",
    shortAnswer: "Instead of storing centralized user databases that can be breached, users present W3C Verifiable Credentials signed by trusted issuers. Zero-Knowledge Proofs allow the Policy Decision Point (PDP) to cryptographically verify claims (e.g., clearance level or citizenship) without ever learning or storing the user's underlying personal data.",
    explanation: "ZKP + DID eliminates centralized identity honey pots and prevents identity theft.",
    hint: "Allows the PDP to verify user claims using cryptographic proofs without storing sensitive personal data.",
    level: "Moderate",
    codeExample: `// ZKP Zero Trust Check:
// PDP evaluates: ZK_Proof(Clearance == 'SECRET') ➔ TRUE (Access Granted; zero PII stored ✔)`
  },
  {
    id: 4,
    question: "Why is physical Quantum Key Distribution (QKD) paired with software Post-Quantum Cryptography (PQC) rather than replacing it?",
    shortAnswer: "QKD requires dedicated dark fiber optical cables and single-photon detectors, limited to point-to-point links (~150 km) and only generating symmetric keys. PQC runs as software on existing internet infrastructure across billions of devices, providing digital signatures and global key exchange. Co-deploying them provides physical Heisenberg unbreakability on crown-jewel links and global PQC coverage everywhere else.",
    explanation: "QKD and PQC are complementary technologies that maximize defense-in-depth.",
    hint: "QKD provides physical photonic security for local crown-jewel links; PQC provides software security globally.",
    level: "Basic",
    codeExample: `// Complementary Deployment:
// Crown-Jewel Inter-Bank Link : QKD + One-Time Pad (Physics)
// Global Web & Mobile Transit  : NIST FIPS 203 ML-KEM-768 (Software)`
  },
  {
    id: 5,
    question: "How does Autonomous AI Threat Remediation (eBPF hot-patching) interact with Immutable Blockchain Audit Ledgers?",
    shortAnswer: "When the autonomous AI detects a zero-day exploit and synthesizes an eBPF hot-patch in 250ms, it writes the cryptographic hash of the patch, the telemetry trigger, and the formal verification proof onto an immutable blockchain audit ledger (WORM storage). This ensures complete auditability and non-repudiation while preventing rogue tampering.",
    explanation: "Blockchain provides immutable proof of autonomous AI actions for regulatory compliance.",
    hint: "The AI hot-patches vulnerabilities in 250ms and writes a tamper-proof audit hash to the blockchain.",
    level: "Expert",
    codeExample: `// Autonomous Audit Trail:
// AI synthesizes patch -> Injects via eBPF in 220ms -> Anchors transaction hash 0x9f8a... to Blockchain Ledger.`
  },
  {
    id: 6,
    question: "What is the Next-Gen Cyber Resilience Maturity Model (from Tier-1 Legacy to Tier-5 Transcendent)?",
    shortAnswer: "Tier-1 (Legacy Perimeter): Castle-and-moat, VPNs, RSA/ECC, manual human SOC. Tier-2 (Consolidated): SIEM + static EDR. Tier-3 (Hybrid Modern): Cloud ZTNA, basic SOAR playbooks, hybrid PQC testing. Tier-4 (Proactive Resilient): Micro-segmentation, continuous CAE, full NIST FIPS 203/204, CBOM DevSecOps. Tier-5 (Transcendent Next-Gen): Autonomous AI self-healing, QKD crown-jewel photonics, W3C DID + ZKP.",
    explanation: "Organizations use the maturity model to benchmark their migration roadmap toward 2030 standards.",
    hint: "Progression from Tier-1 castle-and-moat up to Tier-5 autonomous self-healing and quantum-safe mesh.",
    level: "Moderate",
    codeExample: `// Maturity Progression:
// Tier-1 (Legacy 2015) ➔ Tier-3 (Transitional 2025) ➔ Tier-5 (Transcendent 2030 ✔)`
  },
  {
    id: 7,
    question: "What is the role of Cryptographic Agility in maintaining long-term next-generation resilience?",
    shortAnswer: "Cryptographic agility abstracts cipher implementations behind modular interfaces (OpenSSL 3.0 providers, Java JCA) and integrates automated CBOM scanning into CI/CD pipelines. If a future mathematical breakthrough compromises an algorithm (as occurred with SIKE or Rainbow), engineers can swap algorithms globally in minutes via configuration.",
    explanation: "Agility ensures that an organization never faces emergency architectural refactoring when ciphers age.",
    hint: "Pluggable cryptographic architecture allowing algorithms to be swapped via configuration in minutes.",
    level: "Basic",
    codeExample: `// Crypto-Agility Swap:
// Config change: default_kem = "ML-KEM-1024" -> Deployed across 1,000 Kubernetes pods in 120 seconds.`
  },
  {
    id: 8,
    question: "How does Continuous Access Evaluation (CAE) prevent Session Hijacking in cloud-native Zero Trust environments?",
    shortAnswer: "CAE breaks the paradigm of static 8-hour OAuth/OIDC bearer tokens. Instead of trusting an active token, the Policy Enforcement Point (PEP) checks real-time identity signals on every transaction. If impossible travel, EDR disabling, or IP reputation anomalies occur, the session is revoked everywhere in under 200 milliseconds.",
    explanation: "CAE ensures stolen session cookies or tokens become useless immediately upon anomalous usage.",
    hint: "Evaluates risk continuously on every transaction, instantly revoking tokens upon suspicious behavior.",
    level: "Moderate",
    codeExample: `// CAE Instant Revocation:
// Stolen token used from unknown ASN -> PEP triggers CAE webhook -> Token revoked across all microservices in 150ms ✔`
  },
  {
    id: 9,
    question: "What is the Checks-Effects-Interactions (CEI) pattern and Reentrancy Guard in smart contract resilience?",
    shortAnswer: "The CEI pattern dictates that a smart contract must: 1. Check conditions (require statements); 2. Update internal state variables/balances (Effects); 3. Only then make external calls or transfers (Interactions). This prevents recursive reentrancy attacks (such as The DAO hack) from draining contract funds.",
    explanation: "CEI is the foundational coding standard for decentralized finance and smart contract auditing.",
    hint: "Updating internal balances BEFORE transferring funds externally to prevent recursive reentrancy draining.",
    level: "Basic",
    codeExample: `// Safe CEI Pattern:
// 1. require(balance >= amount);
// 2. balance -= amount; // Effect FIRST ✔
// 3. (bool s, ) = msg.sender.call{value: amount}(""); // Interaction LAST`
  },
  {
    id: 10,
    question: "How does Moving Target Defense (MTD) disorient automated adversarial AI vulnerability scanners?",
    shortAnswer: "By continuously mutating internal IP addresses, port assignments, and container runtime memory layouts (ASLR at microsecond intervals), MTD ensures that the reconnaissance data harvested by an automated attacker bot becomes stale and invalid before the exploit payload can be delivered.",
    explanation: "MTD eliminates the static attack surface that automated scanning bots rely upon.",
    hint: "Continuously changing IP addresses and memory layouts so attacker exploit payloads miss their targets.",
    level: "Moderate",
    codeExample: `// MTD Attack Invalidation:
// Bot crafts exploit for IP 10.0.1.5:8080 -> At T+60s, container migrates to 10.0.9.12:9443 -> Exploit packets dropped!`
  },
  {
    id: 11,
    question: "What is the role of Extended Berkeley Packet Filter (eBPF) in next-generation cloud runtime defense?",
    shortAnswer: "eBPF attaches sandboxed programs directly to Linux kernel tracepoints, system calls, and network drivers (XDP). It enables deep packet inspection, automated kernel-level hot-patching, and instantaneous dropped connections at line rate without modifying user-space applications or restarting services.",
    explanation: "eBPF provides unparalleled observability and real-time defensive execution in Kubernetes environments.",
    hint: "Runs sandboxed code inside the Linux kernel for line-rate packet inspection and instant threat blocking.",
    level: "Expert",
    codeExample: `// eBPF Observability:
// Hooks sys_enter_execve -> Detects unauthorized reverse shell spawning -> Kills process in 30 microseconds.`
  },
  {
    id: 12,
    question: "What is Decoy State QKD and why is it essential for practical laser diode implementations?",
    shortAnswer: "Practical laser sources emit faint pulses where ~1-2% contain multiple identical photons. In a Photon Number Splitting (PNS) attack, Eve steals one photon without error. Decoy State QKD intersperses pulses of randomly varying intensities; Eve's selective splitting distorts the statistical transmittance ratio between signal and decoy pulses, exposing her immediately.",
    explanation: "Decoy states enable provably secure QKD over 100+ km using commercial telecom lasers.",
    hint: "Randomly varying laser pulse intensities to detect selective multi-photon beam splitting by eavesdroppers.",
    level: "Expert",
    codeExample: `// Decoy State Verification:
// If Eve intercepts: Transmittance(Decoy) / Transmittance(Signal) deviates from Poisson model -> EAVESDROPPER DETECTED 🚨`
  },
  {
    id: 13,
    question: "How does the Fujisaki-Okamoto (FO) transform convert IND-CPA lattice encryption into IND-CCA2 security?",
    shortAnswer: "Raw lattice encryption is vulnerable to decryption failure probing. The FO transform re-encrypts the decrypted plaintext using a deterministic random oracle and checks whether the resulting ciphertext is identical to the received ciphertext. If they differ, it aborts or returns a pseudo-random value, eliminating chosen-ciphertext attack vectors.",
    explanation: "The FO transform is the mandatory mathematical engine inside NIST FIPS 203 (ML-KEM / Kyber).",
    hint: "Re-encrypts the plaintext and verifies ciphertext match to prevent chosen-ciphertext probing attacks.",
    level: "Expert",
    codeExample: `// FO Re-Encryption Check:
// m' = Decrypt(c, sk); c' = Encrypt(m', Hash(m')); if c != c' return REJECT;`
  },
  {
    id: 14,
    question: "What is the difference between Stateful (XMSS) and Stateless (SPHINCS+ / SLH-DSA) Hash-Based Digital Signatures?",
    shortAnswer: "Stateful schemes (XMSS/LMS) must maintain a sequential leaf counter to prevent reusing one-time OTS keys (reusing a key leaks private strings). Stateless schemes (SPHINCS+ / SLH-DSA - NIST FIPS 205) use massive hypertrees and Few-Time Signatures (FORS) where signing randomly samples tree paths, eliminating state tracking and preventing VM rollback failures.",
    explanation: "Stateless SPHINCS+ is the gold standard for firmware and cold archive signing.",
    hint: "Stateful requires tracking used keys (fragile in cloud VMs); Stateless needs zero state tracking.",
    level: "Moderate",
    codeExample: `// Hash Signature Choice:
// Firmware / CI-CD Build Pipelines ➔ NIST FIPS 205 SLH-DSA (Stateless, VM-Rollback Immune ✔)`
  },
  {
    id: 15,
    question: "What is Continuous Automated Red Teaming (CART) in unified defense architectures?",
    shortAnswer: "Automated AI agent swarms that continuously execute simulated, non-destructive penetration testing attacks against an enterprise's external perimeter, API endpoints, and internal microservices 24/7/365, verifying that Zero Trust policies, WAFs, and EDR rules are functioning correctly.",
    explanation: "CART replaces annual point-in-time penetration tests with continuous, automated security validation.",
    hint: "Autonomous software testing enterprise defenses 24/7/365 to verify controls and playbooks.",
    level: "Basic",
    codeExample: `// CART Validation:
// Automated test: Attempts lateral SMB scan -> Validates micro-segmentation dropped packets in 50ms ✔`
  },
  {
    id: 16,
    question: "What is Adversarial Machine Learning Robustness (Defenses against FGSM and Model Poisoning)?",
    shortAnswer: "Protecting AI security models by: 1. Adversarial Training (training neural networks on FGSM-perturbed inputs); 2. Randomized Smoothing (adding Gaussian noise during inference to establish mathematically certified robust radii); 3. Clean-seeding and anomaly filtering on training datasets to prevent BadNets backdoor poisoning.",
    explanation: "Adversarial robustness ensures AI security systems cannot be blinded by attacker perturbations.",
    hint: "Adversarial training, randomized smoothing, and clean dataset validation to prevent AI blindness.",
    level: "Expert",
    codeExample: `// Adversarial Training:
// Loss = alpha * Loss(x, y) + (1 - alpha) * Loss(x + FGSM_Noise, y)`
  },
  {
    id: 17,
    question: "What is the Shor-Preskill Bound (11.0% QBER) in Quantum Key Distribution?",
    shortAnswer: "The theoretical maximum error threshold in single-photon BB84 QKD. If $\\text{QBER} \\le 11.0\\%$, error correction and privacy amplification can extract a perfectly secret key. If $\\text{QBER} > 11.0\\%$, the mutual information between Eve and the key exceeds the mutual information between Alice and Bob, requiring the exchange to be aborted.",
    explanation: "11.0% is the universal mathematical cut-off for security in single-photon QKD.",
    hint: "11.0% is the maximum tolerable error rate in BB84 before key exchange must be aborted.",
    level: "Moderate",
    codeExample: `// Shor-Preskill Limit:
// QBER <= 11.0% ➔ Error Correction + Privacy Amplification ➔ KEY ESTABLISHED ✔
// QBER > 11.0%  ➔ ABORT KEY EXCHANGE (Eve detected or line noisy) 🚨`
  },
  {
    id: 18,
    question: "What is Policy As Code (PaC) using Open Policy Agent (OPA) in Zero Trust governance?",
    shortAnswer: "Expressing enterprise security and authorization policies in declarative code (Rego language). OPA evaluates JSON context (user role, device EDR health, geovelocity) against Rego rules in microsecond queries, decoupling authorization logic from application codebases.",
    explanation: "Policy-as-Code enables automated, version-controlled compliance across all cloud microservices.",
    hint: "Writing authorization policies in declarative code (Rego) evaluated by Open Policy Agent.",
    level: "Moderate",
    codeExample: `// Rego Policy:
// default allow = false
// allow { input.user.fido2 == true; input.device.edr_status == "HEALTHY"; input.time.hour < 18 }`
  },
  {
    id: 19,
    question: "What is the Number Theoretic Transform (NTT) and how does it accelerate lattice cryptography?",
    shortAnswer: "A specialized discrete Fourier transform over a finite field $\\mathbb{Z}_q$. It reduces the complexity of multiplying two degree-$n$ ring polynomials from $O(n^2)$ schoolbook multiplication down to $O(n\\log n)$ quasi-linear time, enabling microsecond key generation and verification in CRYSTALS-Kyber and Dilithium.",
    explanation: "NTT allows post-quantum lattice cryptography to run seamlessly on low-power CPUs.",
    hint: "Reduces polynomial multiplication from O(n^2) to O(n log n), accelerating lattice operations by over 30x.",
    level: "Expert",
    codeExample: `// NTT Polynomial Multiplication:
// c(x) = invNTT( NTT(a(x)) .* NTT(b(x)) ) (Takes ~2,048 ops instead of 65,536 for n=256)`
  },
  {
    id: 20,
    question: "What is Immutable Administrative Audit Logging in Zero Trust governance?",
    shortAnswer: "Every policy modification in the Policy Decision Point (PDP), access grant, denial, and administrator action is digitally signed and written to write-once-read-many (WORM) storage or anchored onto an immutable blockchain ledger, guaranteeing tamper-proof non-repudiation for regulatory audits.",
    explanation: "Immutable audit logging ensures compromised administrators cannot erase evidence of unauthorized policy tampering.",
    hint: "Digitally signing and storing all policy changes and access logs on write-once or blockchain storage.",
    level: "Basic",
    codeExample: `// Audit Log Hash:
// SHA256(Timestamp + Action + AdminID + PrevHash) ➔ Anchored to immutable distributed ledger.`
  },
  {
    id: 21,
    question: "What is the role of OpenSSL 3.0 `oqsprovider` in post-quantum web infrastructure?",
    shortAnswer: "An open-source C plugin developed by the Open Quantum Safe project that integrates `liboqs` into standard OpenSSL 3.0 installations, providing drop-in support for NIST FIPS 203/204/205 algorithms across NGINX, Apache, curl, and OpenSSH without modifying application source code.",
    explanation: "oqsprovider is the industry-standard software tool for testing and deploying PQC across Linux servers.",
    hint: "OpenSSL 3.0 plugin providing drop-in support for all NIST post-quantum algorithms across web servers.",
    level: "Basic",
    codeExample: `// NGINX OpenSSL 3.0 Config:
// ssl_ecdh_curve x25519_kyber768:mlkem768; (Serves hybrid post-quantum TLS 1.3)`
  },
  {
    id: 22,
    question: "What is TCP Initial Congestion Window (`initcwnd`) tuning for post-quantum TLS handshakes?",
    shortAnswer: "Because PQC public keys and ML-DSA certificates ($> 3\\text{ KB}$) exceed the standard 1,460-byte TCP Maximum Segment Size (MSS), increasing the Linux kernel's initial congestion window (`initcwnd 30`) allows the server to send the larger certificate chain in a single burst, preventing packet fragmentation and connection latency spikes.",
    explanation: "initcwnd tuning combined with RFC 8879 certificate compression preserves sub-100ms TLS handshakes.",
    hint: "Increasing TCP initial congestion window to 30 packets to send large PQC certificates without packet drops.",
    level: "Moderate",
    codeExample: `// Kernel Tuning:
// $ sudo ip route change default via 192.168.1.1 dev eth0 initcwnd 30 initrwnd 30`
  },
  {
    id: 23,
    question: "What is the NSA Commercial National Security Algorithm (CNSA 2.0) timeline for post-quantum adoption?",
    shortAnswer: "1. 2025–2026: Software and web browsers must support ML-KEM-1024 and ML-DSA-87; 2. 2030: Mandatory PQC deployment for all national security systems; 3. 2033: Complete prohibition and deprecation of all legacy classical public-key cryptography (RSA and ECC).",
    explanation: "CNSA 2.0 provides the global benchmark timeline for national and enterprise cryptographic migration.",
    hint: "Mandates Level 5 PQC adoption by 2026-2030 and complete ban on RSA/ECC by 2033.",
    level: "Basic",
    codeExample: `// CNSA 2.0 Timeline:
// 2024: NIST Standards Finalized ✔ -> 2026: Deployment Begins -> 2030: Mandatory -> 2033: Legacy Banned`
  },
  {
    id: 24,
    question: "What is the difference between Discrete-Variable (DV-QKD) and Continuous-Variable (CV-QKD)?",
    shortAnswer: "DV-QKD (BB84) encodes key bits onto discrete quantum properties (photon polarization or time-bins) using costly single-photon detectors. CV-QKD encodes key bits onto continuous quadratures ($X$ and $P$) of coherent optical fields, measured using standard telecom homodyne/heterodyne receivers, co-existing with standard telecom fiber infrastructure.",
    explanation: "CV-QKD offers lower deployment costs by utilizing standard telecommunication optical transceivers.",
    hint: "DV-QKD uses single-photon polarization; CV-QKD uses continuous wave quadratures with homodyne detectors.",
    level: "Moderate",
    codeExample: `// QKD Variants:
// DV-QKD : Single-photon APD detectors (Requires dark fiber, high cost)
// CV-QKD : Standard coherent telecommunication transceivers (Runs on existing fiber infrastructure)`
  },
  {
    id: 25,
    question: "What is Rejection Sampling (Fiat-Shamir with Aborts) in Dilithium (ML-DSA)?",
    shortAnswer: "When computing $\\mathbf{z} = \\mathbf{y} + c\\mathbf{s}_1$, if the signature vector exceeds norm bounds ($||\\mathbf{z}||_\\infty \\ge \\gamma_1 - \\beta$), it leaks statistical information about private key $\\mathbf{s}_1$. Rejection sampling aborts and restarts with a fresh $\\mathbf{y}$, ensuring accepted signature distributions are completely independent of the private key.",
    explanation: "Rejection sampling eliminates complex Gaussian sampling trapdoors, simplifying secure implementation.",
    hint: "Aborts signatures where z exceeds norm bounds to prevent statistical leakage of the secret key.",
    level: "Expert",
    codeExample: `// Fiat-Shamir Rejection:
// if max(abs(val) for val in z) >= (gamma1 - beta) ➔ ABORT & RESTART (Zero private key leakage ✔)`
  },
  {
    id: 26,
    question: "What is the role of Quantum Random Number Generators (QRNG) in enterprise key management?",
    shortAnswer: "QRNG hardware harvests true physical randomness from non-deterministic quantum processes (e.g., photon phase noise or vacuum fluctuations) to generate cryptographic entropy. This prevents pseudo-random generator seeding flaws and backdoors from undermining symmetric and post-quantum keys.",
    explanation: "QRNG provides the highest quality entropy source for enterprise Hardware Security Modules.",
    hint: "Extracts true physical randomness from quantum physics rather than mathematical pseudo-random algorithms.",
    level: "Basic",
    codeExample: `// QRNG Hardware Entropy:
// Quantum Vacuum Noise ➔ High-Speed ADC ➔ 1 Gbps True Unpredictable Quantum Entropy Stream ✔`
  },
  {
    id: 27,
    question: "What is Ephemeral Pod Re-creation in self-healing Kubernetes clusters?",
    shortAnswer: "A resilience practice where cloud containers are intentionally destroyed and rebuilt from verified cryptographic golden images every 15 to 30 minutes. This wipes out any in-memory rootkits, backdoors, or memory-resident malware without impacting service availability.",
    explanation: "Ephemeral lifecycles eliminate adversary persistence on cloud workloads.",
    hint: "Destroying and recreating container pods every 15 minutes to wipe out in-memory malware.",
    level: "Basic",
    codeExample: `// Ephemeral Lifecycle:
// Pod age > 15m ➔ Orchestrator spawns new pod ➔ Drains old pod ➔ Malware persistence eliminated ✔`
  },
  {
    id: 28,
    question: "What is W3C Decentralized Identifier (DID) Resolution?",
    shortAnswer: "The process of querying a decentralized ledger or peer-to-peer network using a DID string (`did:ion:EiA...`) to fetch its associated DID Document containing the entity's public cryptographic keys, authentication endpoints, and service definitions without relying on any centralized DNS or certificate authority.",
    explanation: "DID resolution provides tamper-proof, sovereign public key discovery.",
    hint: "Fetching an entity's public keys and endpoints directly from a decentralized ledger without DNS.",
    level: "Moderate",
    codeExample: `// DID Resolution:
// resolve("did:ion:12345") ➔ Returns JSON-LD DID Document with verificationMethod public keys.`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury comprehensive synthesis deployment, describe how all 5 pillars operated in concert during a live coordinated nation-state cyber attack.",
    shortAnswer: "1. Pillar 5 (Zero Trust): Blocked external phishing with FIDO2 passkeys and dropped lateral SMB scans via SDP micro-segmentation. 2. Pillar 1 (Autonomous AI): Detected a zero-day memory corruption probe and hot-injected an eBPF patch in 280ms. 3. Pillar 2 (Blockchain): Verified employee DID credentials via ZKP and anchored the immutable incident hash. 4. Pillar 4 (NIST PQC): Protected all web and VPN transit with ML-KEM-768 hybrid TLS 1.3. 5. Pillar 3 (QKD): Continuously generated One-Time Pad keys across the 28 km dark fiber to Salt Lake, ensuring 100% data confidentiality.",
    explanation: "The unified architecture repelled all attack vectors with zero data loss, zero financial theft, and zero downtime.",
    hint: "Zero Trust blocked phishing/lateral scans, AI hot-patched in 280ms, Blockchain anchored logs, PQC protected transit, and QKD secured core links.",
    level: "Expert",
    codeExample: `// Live Incident Timeline:
// 02:14:00 - Phishing attempt blocked by FIDO2 & Zero Trust PDP
// 02:14:02 - Zero-day exploit hot-patched via eBPF in 280ms
// 02:14:03 - Incident hash anchored to Blockchain DID ledger
// 02:14:04 - Treasury data transferred over QKD OTP link with ML-KEM transit: 100% SECURE ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive architectural thesis for the 2030 Transcendent Next-Gen Cyber Defense Paradigm.",
    shortAnswer: "The 2030 Transcendent Cyber Defense paradigm replaces static, reactive, perimeter-based security with a continuous, autonomous, quantum-resilient ecosystem. It unifies: 1. Autonomous AI for sub-second vulnerability discovery, genetic patch synthesis, and self-healing eBPF runtime repair; 2. Zero Trust Architecture (NIST SP 800-207) for continuous contextual authorization, invisible SDP boundaries ($0.0.0.0:0$), and ephemeral mTLS service meshes; 3. Decentralized Identity (W3C DID) and Zero-Knowledge Proofs for sovereign, privacy-preserving authentication; 4. Universal Post-Quantum Cryptography (NIST FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) across all software and CBOM pipelines; 5. Physical Photonic Security (QKD + One-Time Pad) for mission-critical crown-jewel infrastructure.",
    explanation: "This complete thesis represents the definitive state-of-the-art in cybersecurity engineering for the next era.",
    hint: "Autonomous AI self-healing, Zero Trust continuous authorization, Decentralized Identity ZKP, NIST Post-Quantum Cryptography, and QKD crown-jewel photonics.",
    level: "Expert",
    codeExample: `// 2030 Transcendent Paradigm:
// [Autonomous Machine-Speed AI Defense] ➔ Sub-second hot-patching & self-healing
// [Zero Trust & Sovereign Identity]     ➔ NIST SP 800-207 CAE + W3C DID + ZKP
// [Quantum-Resilient Foundation]       ➔ NIST FIPS 203/204/205 PQC + CBOM + QKD OTP`
  }
];

export default questions;
