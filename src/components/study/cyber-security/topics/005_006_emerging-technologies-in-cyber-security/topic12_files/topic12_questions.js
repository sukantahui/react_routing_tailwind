const questions = [
  {
    id: 1,
    question: "What is Autonomous Cyber Defense and why is human-speed SOC response obsolete against next-generation machine-speed attacks?",
    shortAnswer: "Autonomous Cyber Defense is a closed-loop system where AI agents discover vulnerabilities, synthesize patches, and execute defensive countermeasures in milliseconds without human intervention. Machine-speed AI attacks compromise systems in seconds, making traditional human SOC triage (averaging hours or days) incapable of preventing catastrophic breaches.",
    explanation: "Autonomous defense closes the velocity gap between automated machine attacks and defensive remediation.",
    hint: "AI systems discovering and hot-patching vulnerabilities in milliseconds without waiting for human intervention.",
    level: "Basic",
    codeExample: `// Velocity Comparison:
// Machine-Speed AI Attack  : 0.4 seconds to breach 🚨
// Human SOC Response       : 4.2 hours to triage (Breach already complete ❌)
// Autonomous AI Defense    : 0.28 seconds to hot-patch and isolate (Threat Neutralized ✔)`
  },
  {
    id: 2,
    question: "What was the DARPA Cyber Grand Challenge (CGC) and what three core technical milestones did it achieve?",
    shortAnswer: "The DARPA CGC (2016) was the world's first all-machine autonomous hacking tournament. Key milestones: 1. Autonomous Vulnerability Discovery (symbolic execution & fuzzing); 2. Autonomous Genetic Patch Synthesis (generating verified source/binary repairs); 3. Autonomous Hot-Patching (injecting fixes into running binaries with zero downtime and zero functional regression).",
    explanation: "DARPA CGC proved that fully autonomous cyber defense reasoning is technically viable.",
    hint: "World's first autonomous hacking tournament achieving automated discovery, patch synthesis, and zero-downtime hot-patching.",
    level: "Basic",
    codeExample: `// DARPA CGC Pipeline:
// Fuzzing/Concolic Execution ➔ Crash Identified ➔ AST Genetic Patch ➔ Hot Injection ➔ 0s Downtime ✔`
  },
  {
    id: 3,
    question: "What is a Cryptographic Bill of Materials (CBOM) in Quantum Resilience planning?",
    shortAnswer: "A standardized, machine-readable inventory (e.g., CycloneDX CBOM format) documenting every cryptographic asset across an enterprise: algorithms (RSA, ECC, AES), key lengths, elliptic curves, certificate expiry dates, cipher suites, and hardware security module dependencies.",
    explanation: "A CBOM is the mandatory first step for enterprise post-quantum migration to identify quantum-vulnerable cryptography.",
    hint: "Standardized inventory of all cryptographic algorithms, keys, and certificates across software and hardware.",
    level: "Basic",
    codeExample: `// CycloneDX CBOM JSON Snippet:
// { "type": "crypto-asset", "algorithm": "RSA-2048", "quantum-safe": false, "asset": "api.treasury.gov.in" }`
  },
  {
    id: 4,
    question: "Explain Mosca's Theorem of Quantum Risk ($X + Y > Z$) and how to calculate an enterprise's HNDL vulnerability window.",
    shortAnswer: "Mosca's Theorem states that if $X + Y > Z$, an organization is in immediate quantum peril: $X$ = Security Shelf Life (years data must stay secret), $Y$ = Migration Time (years to complete PQC deployment), $Z$ = CRQC Arrival Time (years until a quantum computer cracks classical RSA/ECC). The vulnerability window is $(X + Y) - Z$ years.",
    explanation: "If $X=20$ years, $Y=5$ years, and $Z=10$ years: $20 + 5 = 25 > 10$. Data harvested today is compromised 15 years before secrecy expires!",
    hint: "X (shelf life) + Y (migration time) > Z (CRQC arrival); reveals if data is already vulnerable to HNDL.",
    level: "Moderate",
    codeExample: `// Mosca's Inequality Calculator:
// X = 15 (Banking Data Shelf Life) | Y = 5 (Enterprise PQC Rollout) | Z = 10 (CRQC Arrival)
// Sum = 20 > 10 ➔ CRITICAL PERIL: 10-Year HNDL Vulnerability Window! 🚨`
  },
  {
    id: 5,
    question: "What is Moving Target Defense (MTD) in future-state cyber resilience?",
    shortAnswer: "A proactive defensive strategy that continuously and unpredictably mutates the system's attack surface over time: dynamically rotating IP addresses, shifting listening ports, randomizing internal software memory layouts (ASLR at runtime), and regenerating ephemeral containers every few minutes.",
    explanation: "MTD destroys the attacker's reconnaissance advantage, making automated exploits stale before they can execute.",
    hint: "Continuously changing IP addresses, ports, and memory layouts so attacker reconnaissance becomes instantly obsolete.",
    level: "Moderate",
    codeExample: `// Moving Target Defense:
// Every 60 seconds: Microservice IP shifts from 10.0.1.12 ➔ 10.0.4.88 (Scanners encounter broken paths)`
  },
  {
    id: 6,
    question: "What is eBPF (Extended Berkeley Packet Filter) live hot-patching in Autonomous Cyber Defense?",
    shortAnswer: "eBPF allows executing sandboxed bytecode programs directly inside the Linux kernel at runtime without recompiling the kernel or rebooting servers. In autonomous defense, an AI engine detects an unpatched network vulnerability and attaches an eBPF filter at the XDP (eXpress Data Path) network layer to drop malicious exploit packets at wire speed in sub-milliseconds.",
    explanation: "eBPF provides instant kernel-level patch injection with 0.00 seconds of server downtime.",
    hint: "Runs sandboxed bytecode in the Linux kernel to drop exploit packets at wire speed without restarting servers.",
    level: "Expert",
    codeExample: `// eBPF XDP Hot-Patch:
// SEC("xdp") int filter_zero_day(struct xdp_md *ctx) {
//   if (is_malicious_payload(ctx)) return XDP_DROP; // Exploit dropped at NIC in 50 microseconds!
//   return XDP_PASS; }`
  },
  {
    id: 7,
    question: "What is Multi-Agent AI Defensive Co-Evolution (AI Red Team vs AI Blue Team)?",
    shortAnswer: "Deploying two autonomous AI agent swarms in an isolated digital twin sandbox: the AI Red Team autonomously explores attack graphs to invent zero-day exploit paths, while the AI Blue Team observes telemetry in real time, automatically synthesizing defensive ACLs and patches. They continuously co-evolve, making defense resilient before real-world attacks occur.",
    explanation: "Adversarial co-evolution strengthens defenses through continuous self-play reinforcement learning.",
    hint: "AI Red Team invents exploits in a sandbox while AI Blue Team synthesizes hot-patches in real-time self-play.",
    level: "Moderate",
    codeExample: `// Multi-Agent Co-Evolution:
// [AI Red Agent] Discovers RCE via Parameter Tampering ➔ [AI Blue Agent] Auto-generates WAF RegEx & OPA Rule in 200ms`
  },
  {
    id: 8,
    question: "What is Quantum Random Number Generation (QRNG) in next-generation cryptographic hardware?",
    shortAnswer: "Hardware security chips that harvest true physical non-determinism from quantum mechanical phenomena (e.g., photon phase fluctuations, quantum tunneling, vacuum fluctuations) rather than mathematical pseudo-random number generators (PRNGs), ensuring mathematically unbreakable entropy for cryptographic keys.",
    explanation: "QRNG eliminates PRNG seeding vulnerabilities (like Dual_EC_DRBG backdoors).",
    hint: "Extracts true physical randomness from quantum physics rather than mathematical pseudo-random algorithms.",
    level: "Basic",
    codeExample: `// QRNG Hardware Entropy:
// Quantum Vacuum Noise ➔ High-Speed ADC ➔ 1 Gbps True Unpredictable Quantum Entropy Stream ✔`
  },
  {
    id: 9,
    question: "What is Self-Healing Infrastructure in cloud-native containerized architectures (Kubernetes)?",
    shortAnswer: "A resilience pattern where container pods are treated as ephemeral and disposable. If an anomaly detection engine detects compromised processes, file integrity modifications, or crypto-mining inside a pod, the orchestrator immediately isolates, destroys, and redeploys a fresh immutable pod from a cryptographic golden image within 2 seconds.",
    explanation: "Ephemeral pod lifecycles prevent malware from establishing long-term persistence on cloud servers.",
    hint: "Automatically destroying compromised container pods and launching fresh verified copies in seconds.",
    level: "Basic",
    codeExample: `// K8s Self-Healing Action:
// Pod 'payment-svc-78' anomaly score > 90 -> 'kubectl delete pod payment-svc-78 --now' -> Clean Pod spawned in 1.4s`
  },
  {
    id: 10,
    question: "What is Automated Exploit Generation (AEG) and how does it drive automated patch verification?",
    shortAnswer: "AEG uses concolic execution (symbolic + concrete execution) to automatically generate working proof-of-concept exploit payloads for discovered software bugs. Autonomous defense systems use the AEG exploit to verify that their synthesized patch genuinely neutralizes the vulnerability without breaking legitimate application logic.",
    explanation: "AEG provides automated ground-truth proof of both vulnerability severity and patch efficacy.",
    hint: "Automatically generating exploit payloads to test whether synthesized patches successfully fix bugs.",
    level: "Expert",
    codeExample: `// AEG Patch Verification:
// 1. AEG creates exploit.bin ➔ Triggers crash in unpatched binary.
// 2. Synthesize Patch v1 ➔ Re-run exploit.bin ➔ Crash neutralized? YES ✔ ➔ Deploy patch.`
  },
  {
    id: 11,
    question: "What is Quantum-Resilient Blockchain and Distributed Ledger Technology (DLT)?",
    shortAnswer: "Blockchain protocols that upgrade their cryptographic primitives: replacing ECDSA/Ed25519 transaction signatures with NIST FIPS 204 ML-DSA-65 (Dilithium) or Falcon, and replacing SHA-256 with SHA-384 / SHA-512 to resist Grover's quantum collision attacks, ensuring wallet assets cannot be stolen by quantum computers.",
    explanation: "Legacy Bitcoin and Ethereum addresses with exposed public keys are vulnerable to quantum private key derivation.",
    hint: "Upgrading blockchain wallets to post-quantum signatures (ML-DSA) and SHA-512 to prevent quantum theft.",
    level: "Moderate",
    codeExample: `// Quantum-Safe Transaction:
// TxHash = SHA3-512(Payload)
// Signature = ML_DSA_65_Sign(TxHash, QuantumPrivateKey)`
  },
  {
    id: 12,
    question: "What is Autonomous Deception (Dynamic Autonomous Honeypots)?",
    shortAnswer: "AI-driven deception frameworks that automatically deploy high-interaction honeypots, fake Active Directory credentials (honeytokens), and simulated databases across an enterprise network. When an attacker probes the network, the AI engages them in a realistic simulated sandbox, recording attacker TTPs while alerting SOC teams.",
    explanation: "Deception tech forces attackers to waste time in sandboxes while generating high-fidelity alerts with zero false positives.",
    hint: "Deploying fake servers, accounts, and databases that trap attackers and record their techniques.",
    level: "Basic",
    codeExample: `// Dynamic Honeytoken Trigger:
// Attacker queries 'SELECT * FROM honey_users' ➔ Instant High-Priority SOC Alert + IP Quarantined in 50ms!`
  },
  {
    id: 13,
    question: "What is Cryptographic Agility in CI/CD pipeline automation?",
    shortAnswer: "Building automated software deployment pipelines with abstraction layers (e.g., JCA providers in Java or OpenSSL providers in C/C++) and automated CBOM scanning so that if an algorithm is compromised, engineers can swap the cipher suite across all production microservices via a single configuration commit without refactoring code.",
    explanation: "Crypto-agility eliminates the multi-year engineering debt traditionally required to replace broken ciphers.",
    hint: "Modular code architecture allowing cipher algorithms to be changed via config files and automated pipelines.",
    level: "Moderate",
    codeExample: `// GitOps Crypto-Agility:
// commit: "security: update cipher_suite from ML-KEM-768 to ML-KEM-1024" -> ArgoCD updates 500 pods in 3 mins.`
  },
  {
    id: 14,
    question: "What is Zero-Knowledge Proofs (ZKP) in Autonomous Decentralized Identity and Verification?",
    shortAnswer: "Cryptographic protocols (e.g., zk-SNARKs / zk-STARKs) that allow a subject to prove the truth of a statement (e.g., 'User is over 18 years old' or 'Workstation passed EDR health check') to a verifier without revealing any underlying sensitive data (such as exact date of birth or full device telemetry).",
    explanation: "ZKPs enable maximum privacy and zero-trust verification without centralizing sensitive PII.",
    hint: "Proving a statement is true without revealing any underlying confidential data or private identity details.",
    level: "Moderate",
    codeExample: `// ZK Age Verification:
// Prover inputs: DOB = 2002-05-14
// Proof: zk-SNARK proof string -> Verifier output: "TRUE (Age >= 18)" (DOB never exposed ✔)`
  },
  {
    id: 15,
    question: "What is Autonomous SOAR (Security Orchestration, Automation, and Response) Tier-3 Escalation?",
    shortAnswer: "In autonomous SOC operations, Level-1 and Level-2 incident triage (phishing email quarantine, malware isolation, IP blocking) are executed automatically in sub-seconds. Tier-3 escalation involves the autonomous AI preparing complete interactive forensic battle cards, impact blast-radius graphs, and rollback plans for human CISO sign-off.",
    explanation: "Autonomous SOAR frees human analysts from repetitive alerts to focus exclusively on strategic decision-making.",
    hint: "Automating routine triage in milliseconds while generating comprehensive forensic summaries for human executives.",
    level: "Basic",
    codeExample: `// Tier-3 Autonomous Incident Packet:
// { "incident": "Ransomware_Contained", "time_to_isolate": "310ms", "ciso_decision": "Authorize_Offsite_Backup_Restore" }`
  },
  {
    id: 16,
    question: "What is Micro-Rollback / State Reversion in Self-Healing Resilient Databases?",
    shortAnswer: "Database architectures that continuously log cryptographic state checkpoints (via copy-on-write and immutable delta logs). If an unauthorized bulk update or ransomware encryption is detected, the database automatically rolls back corrupted tables to the exact millisecond before the breach, resuming normal operations with zero data loss.",
    explanation: "Micro-rollbacks neutralize the financial extortion leverage of ransomware attacks.",
    hint: "Automatically reverting corrupted database tables to the exact millisecond before a ransomware attack.",
    level: "Moderate",
    codeExample: `// Point-in-Time Micro-Rollback:
// Ransomware begins table encryption at 14:22:15.820 ➔ DB triggers state rollback to 14:22:15.819 in 400ms ✔`
  },
  {
    id: 17,
    question: "What is the role of Generative AI Large Language Models (LLMs) in automated patch synthesis?",
    shortAnswer: "Specialized code LLMs fine-tuned on vulnerability datasets analyze abstract syntax trees (ASTs) of vulnerable functions and generate syntactically valid, semantically equivalent memory-safe code replacements (e.g., rewriting insecure C pointer arithmetic into safe Rust or bounds-checked C).",
    explanation: "LLMs accelerate genetic code repair by proposing context-aware semantic patches in milliseconds.",
    hint: "AI models analyzing vulnerable code and automatically generating memory-safe replacement functions.",
    level: "Moderate",
    codeExample: `// LLM Patch Synthesis:
// Vulnerable: sprintf(url, "https://api?id=%s", id);
// AI Synthesized: snprintf(url, sizeof(url), "https://api?id=%s", urlencode(id));`
  },
  {
    id: 18,
    question: "What is Hardware-Enforced Quantum Resilience in TPM 2.0 / TPM 3.0 Chips?",
    shortAnswer: "Trusted Platform Module (TPM) security chips updated with hardware acceleration for lattice cryptography (ML-KEM and ML-DSA), storing post-quantum root keys inside tamper-resistant silicon to guarantee quantum-safe Measured Boot and hardware attestation for laptops and cloud servers.",
    explanation: "TPM 3.0 provides post-quantum cryptographic root of trust directly in hardware silicon.",
    hint: "Hardware security chips with built-in lattice crypto coprocessors for post-quantum secure boot.",
    level: "Expert",
    codeExample: `// TPM 3.0 Measured Boot:
// PCR[0] = SHA3_512(UEFI_Firmware) ➔ Signed via ML-DSA-65 hardware coprocessor.`
  },
  {
    id: 19,
    question: "What is Adversarial Machine Learning Robustness in Autonomous Cyber Defense Systems?",
    shortAnswer: "Defending AI detection models against adversarial evasion attacks (such as FGSM perturbation noise or prompt injection) by applying adversarial training, certified defense bounds (randomized smoothing), and multi-model ensemble consensus to ensure AI detectors cannot be blinded by attackers.",
    explanation: "Autonomous defense systems must be hardened against adversarial attacks targeting their own neural networks.",
    hint: "Hardening AI defensive models with adversarial training so attackers cannot bypass detection with noise.",
    level: "Expert",
    codeExample: `// Randomized Smoothing:
// Classifier output: MajorityVote(Model(x + GaussianNoise(0, sigma))) ➔ Mathematically certified robust against FGSM ✔`
  },
  {
    id: 20,
    question: "What is Dynamic Honeynet Deception at DNS / Network Layer (DNS Sinkholing)?",
    shortAnswer: "Autonomous DNS servers that detect malware C2 lookup queries and dynamically respond with the IP address of an internal high-interaction deception sinkhole. The malware connects to the sinkhole, believing it reached its command-and-control server, allowing defensive teams to capture second-stage payloads.",
    explanation: "DNS sinkholing neutralizes botnet communication while harvesting vital adversary intelligence.",
    hint: "Redirecting malware command-and-control DNS queries to safe deception sandboxes to analyze threats.",
    level: "Basic",
    codeExample: `// Autonomous Sinkhole Rule:
// Query: evil-botnet-c2.cc ➔ Resolved to 10.254.0.99 (Autonomous SOC Sandbox) ➔ Captures attacker commands.`
  },
  {
    id: 21,
    question: "What is Chaos Engineering in Cyber Resilience (e.g., Chaos Monkey for Security)?",
    shortAnswer: "The discipline of intentionally and continuously injecting random failures, simulated credential leaks, and network latency into production systems to proactively discover resilience weaknesses before real-world adversaries exploit them.",
    explanation: "Security chaos engineering transforms cybersecurity from reactive patching into proactive hardening.",
    hint: "Intentionally injecting simulated failures and attacks into production to verify self-healing systems.",
    level: "Moderate",
    codeExample: `// Security Chaos Experiment:
// Chaos Agent terminates random EDR process on Node 4 ➔ Tests if Autonomous Watchdog restarts it in < 1 second.`
  },
  {
    id: 22,
    question: "What is the Timeline for Commercial Quantum Advantage in Cryptanalysis (CRQC)?",
    shortAnswer: "Leading quantum research roadmaps (IBM, Google, IonQ) project achieving fault-tolerant quantum computing with logical qubits by 2029–2033. Government agencies (NIST, NSA, BSI) mandate completing full PQC migration before 2030 to mitigate the threat of CRQC cryptanalysis.",
    explanation: "The 2030 deadline reflects the convergence of quantum hardware progress with Mosca's inequality.",
    hint: "Fault-tolerant quantum computers are projected for 2029-2033; PQC migration must be complete by 2030.",
    level: "Basic",
    codeExample: `// Quantum Timeline:
// 2024: NIST FIPS Standards Released ✔
// 2026-2028: Enterprise PQC Migration
// 2030: NSA CNSA 2.0 Mandatory Deadline
// ~2032: CRQC Quantum Threat Window`
  },
  {
    id: 23,
    question: "What is Autonomous Micro-Segmentation Policy Synthesis using eBPF flow logs?",
    shortAnswer: "AI systems that continuously ingest eBPF network flow logs across thousands of microservices, observe baseline communication graphs for 7 days, and automatically generate least-privilege Kubernetes NetworkPolicies and Istio AuthorizationPolicies without breaking production traffic.",
    explanation: "Automated policy synthesis solves the primary challenge of micro-segmentation: manual policy creation.",
    hint: "AI analyzing network traffic logs to automatically generate least-privilege firewall rules for containers.",
    level: "Expert",
    codeExample: `// Synthesized K8s Policy:
// kind: NetworkPolicy ➔ spec: { podSelector: { matchLabels: { app: payment } }, ingress: [ { from: [ { podSelector: { matchLabels: { app: web } } } ] } ] }`
  },
  {
    id: 24,
    question: "What is Post-Quantum Cryptographic Hardware Acceleration (ASIC / FPGA Coprocessors)?",
    shortAnswer: "Dedicated silicon accelerators designed to compute Number Theoretic Transforms (NTT), Keccak/SHAKE sponge functions, and rejection sampling loops in hardware, achieving 1,000,000+ ML-KEM decapsulations and ML-DSA signature verifications per second with ultra-low power consumption.",
    explanation: "Hardware coprocessors enable mega-scale cloud data centers to process post-quantum TLS handshakes without CPU bottlenecks.",
    hint: "Dedicated silicon chips computing lattice NTT operations at over 1,000,000 operations per second.",
    level: "Moderate",
    codeExample: `// PCIe PQC Accelerator:
// Throughput: 1.2 Million Kyber-768 Decaps/sec | Latency: 0.8 microseconds per operation.`
  },
  {
    id: 25,
    question: "What is Quantum Key Distribution (QKD) Mesh Routing in Smart Grid Critical Infrastructure?",
    shortAnswer: "Deploying trusted-node optical QKD networks across high-voltage electrical substations, water treatment facilities, and nuclear plants, continuously feeding fresh One-Time Pad symmetric keys into SCADA telemetry links to ensure critical infrastructure is physically immune to cyber-physical sabotage.",
    explanation: "QKD mesh networks provide absolute information-theoretic physical security for national power grids.",
    hint: "Distributing quantum symmetric keys to power substations and water treatment plants for physical tamper immunity.",
    level: "Moderate",
    codeExample: `// Smart Grid SCADA Protection:
// Substation A <---(QKD OTP Encrypted Telemetry)---> Central Grid Control Center (Unbreakable secrecy ✔)`
  },
  {
    id: 26,
    question: "What is Autonomous Memory Safety Transformation (Automated C to Rust Migration)?",
    shortAnswer: "AI code translation engines (such as DARPA TRACTOR program) that automatically analyze legacy memory-unsafe C/C++ source code, infer ownership and lifetime semantics, and rewrite it into idiomatic, memory-safe Rust code with zero memory safety vulnerabilities (eliminating buffer overflows and use-after-free bugs).",
    explanation: "Automated C-to-Rust migration neutralizes the root cause of 70% of all critical software vulnerabilities.",
    hint: "Automatically converting legacy C/C++ code into memory-safe Rust to eliminate buffer overflows permanently.",
    level: "Expert",
    codeExample: `// DARPA TRACTOR C-to-Rust:
// C: char *buf = malloc(10); strcpy(buf, input);
// Rust: let buf: String = input.to_string(); (Memory-Safe by construction ✔)`
  },
  {
    id: 27,
    question: "What is Continuous Automated Red Teaming (CART) in modern enterprise security?",
    shortAnswer: "Deploying autonomous AI software bots that continuously and non-destructively simulate real-world cyber attacks against an enterprise's external perimeter and internal systems 24/7/365, verifying whether defensive controls, EDR agents, and SOAR playbooks are functioning correctly.",
    explanation: "CART provides continuous validation of security posture rather than relying on annual manual penetration tests.",
    hint: "Autonomous software testing enterprise defenses 24/7/365 to verify security controls are working.",
    level: "Basic",
    codeExample: `// CART Automated Drill:
// 03:00 AM: Bot launches simulated credential stuffing against login portal -> Confirms WAF auto-blocked in 800ms ✔`
  },
  {
    id: 28,
    question: "What is Cryptographic Bill of Materials (CBOM) Scanning in CI/CD DevSecOps Pipelines?",
    shortAnswer: "Static code analysis tools (like IBM CBOM scanner or CycloneDX CLI) integrated into GitHub Actions / GitLab CI that scan source code, dependencies, and container images on every git commit, failing the build if non-post-quantum algorithms (RSA/ECC) are introduced into production codebases.",
    explanation: "Automated CBOM gating prevents developers from inadvertently deploying legacy, quantum-vulnerable cryptography.",
    hint: "CI/CD pipeline scans that block builds if legacy RSA or ECC algorithms are introduced into code.",
    level: "Basic",
    codeExample: `// GitHub Actions CBOM Gate:
// - name: PQC Compliance Check
//   run: cbom-audit --enforce-pqc-fips-203
//   # Error: Detected 'RSA_generate_key_ex' in src/auth.c ➔ Build FAILED ❌`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury case study, an autonomous cyber defense engine detected a zero-day integer overflow exploit targeting the wire transfer API. How did the engine neutralize the threat in 280 milliseconds without downtime?",
    shortAnswer: "1. Symbolic Root Cause Analysis: The engine traced the crash to an unchecked addition in memory allocation; 2. Genetic Code Synthesis: It synthesized a bounds-checked replacement (`if (a > SIZE_MAX - b) return ERROR;`); 3. Regression Sandbox: It ran 500 regression test suites in 120ms; 4. eBPF Hot-Patch Injection: It hot-injected the patch into the running Linux kernel memory at the XDP network layer in 160ms, neutralizing the zero-day with 0.00s downtime.",
    explanation: "Autonomous patch synthesis and live kernel injection neutralized the zero-day before attackers could complete exploitation.",
    hint: "Analyzed root cause, synthesized bounds-check fix, verified in sandbox, and injected via eBPF in 280ms with zero downtime.",
    level: "Expert",
    codeExample: `// Incident Timeline:
// 00.000s : Zero-day exploit packet arrives
// 00.080s : Symbolic execution pinpoints integer overflow
// 00.180s : Genetic AST patch synthesized & regression passed
// 00.280s : eBPF hot-patch deployed -> Exploit neutralized, server stays online ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical vision for the Next-Generation 2030 Autonomous & Quantum-Resilient Cyber Defense Architecture.",
    shortAnswer: "1. Predictive Threat Engine: Multi-agent AI red/blue co-evolution and continuous automated red teaming (CART). 2. Autonomous Remediation: Sub-second eBPF hot-patch synthesis and self-healing ephemeral container reconstitution. 3. Zero Trust Control Plane: Continuous Access Evaluation (CAE) + Software-Defined Perimeter (SDP) with zero listening ports. 4. Quantum-Resilient Cryptography: Universal adoption of NIST FIPS 203 ML-KEM, FIPS 204 ML-DSA, and FIPS 205 SLH-DSA across all TLS 1.3 handshakes, PKI certificates, and CBOM DevSecOps pipelines. 5. Physical Security: QKD mesh key distribution for national crown-jewel infrastructure.",
    explanation: "This unified architecture represents the pinnacle of modern cybersecurity: machine-speed autonomy paired with mathematical and physical quantum resilience.",
    hint: "Autonomous AI remediation, Zero Trust CAE control plane, NIST FIPS PQC standards, CBOM CI/CD gating, and QKD mesh security.",
    level: "Expert",
    codeExample: `// 2030 Next-Gen Architecture:
// [Multi-Agent AI Defense] ➔ Sub-second Autonomous Hot-Patching (eBPF)
// [Zero Trust SDP Mesh]   ➔ Continuous Contextual CAE Authorization (Never Trust, Always Verify)
// [Quantum Foundation]    ➔ NIST FIPS 203/204/205 PQC + CBOM Governance + QKD Crown Jewel Protection`
  }
];

export default questions;
