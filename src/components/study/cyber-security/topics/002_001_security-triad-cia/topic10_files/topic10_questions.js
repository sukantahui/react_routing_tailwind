const questions = [
  {
    question: "Why is it mathematically and architecturally impossible to maximize Confidentiality, Integrity, and Availability to 100% simultaneously in a real-world computing system?",
    shortAnswer: "Maximizing one pillar inherently introduces computational overhead, network latency, access restrictions, or single-point locks that degrade the other two pillars.",
    explanation: "Security engineering is inherently a discipline of trade-offs. Enforcing absolute Confidentiality requires multi-layered asymmetric encryption, hardware air-gaps, and strict biometric authentication, which directly degrades Availability (introducing latency and lockout risks). Enforcing absolute Integrity requires synchronous two-phase commits, immutable multi-node consensus, and strict write locks, which bottleneck throughput. Architectures must prioritize pillars based on mission-critical business risk.",
    hint: "Think about how heavy encryption and multi-party quorum locks slow down throughput and create operational friction.",
    level: "moderate",
    codeExample: `// The Security Trilemma Equation:
Total_System_Friction = (Confidentiality_Weight * C_Overhead) + 
                        (Integrity_Weight * I_Consensus_Delay) + 
                        (1 / Availability_Budget)`
  },
  {
    question: "In core banking and financial transaction engines (e.g., Kolkata FinTech UPI switches), which two CIA pillars take precedence over Availability during system faults?",
    shortAnswer: "Integrity and Confidentiality take strict precedence over Availability (Fail-Secure / Fail-Closed design).",
    explanation: "If a database network partition occurs or a hardware cryptographic module desynchronizes, a banking system must never allow double-spending or corrupted account balances (Integrity violation), nor can it broadcast unencrypted ledger entries (Confidentiality violation). The system deliberately returns a temporary 503 error or transaction decline (sacrificing Availability) rather than processing erroneous financial ledger writes.",
    hint: "Consider whether a bank would rather decline a transaction temporarily or accidentally credit ₹1 Crore twice.",
    level: "basic",
    codeExample: `// Banking ACID Transaction Guard:
try {
  await db.beginTransaction({ isolationLevel: 'SERIALIZABLE' });
  await verifyHMACandBalance(account, amount);
  await db.commit();
} catch (error) {
  await db.rollback(); // Sacrifices immediate availability to preserve 100% Integrity
  throw new PaymentProcessingException("Transaction declined to preserve ledger integrity.");
}`
  },
  {
    question: "How do emergency healthcare systems (such as ICU defibrillators in Ichapur Hospital) prioritize the CIA triad, and what design pattern implements this?",
    shortAnswer: "Availability is prioritized above Confidentiality and strict Integrity using the 'Break-Glass' emergency access protocol and local autonomous operation.",
    explanation: "In medical trauma bays and ICUs, patient survival depends on immediate drug delivery and defibrillation. If network authentication servers are unreachable or a nurse lacks standard administrative credentials, the medical device must not lock out clinicians. It grants immediate 'Break-Glass' access (Availability first), while recording high-resolution immutable audit logs for post-incident medical accountability (Integrity preserved retroactively).",
    hint: "Recall that when human life is in immediate danger, access delays caused by multi-factor authentication are fatal.",
    level: "moderate",
    codeExample: `// Break-Glass Emergency Access Pattern:
function accessICUInfusionPump(user, emergencyState) {
  if (emergencyState === true) {
    emitHighPriorityAuditAlert("BREAK_GLASS_TRIGGERED", user.id, Date.now());
    return grantImmediateLocalOverride(); // Upholds Availability over strict remote Auth
  }
  return standardRoleBasedAccessCheck(user);
}`
  },
  {
    question: "How does the CAP theorem in distributed computing directly mirror CIA trade-offs in cloud cyber security?",
    shortAnswer: "Consistency aligns with Integrity, Availability aligns with Availability, and Partition Tolerance dictates the unavoidable real-world network failure boundary.",
    explanation: "Eric Brewer's CAP theorem states that a distributed data store can simultaneously guarantee at most two out of Consistency (C), Availability (A), and Partition Tolerance (P). In real-world networks where physical partitions (P) are inevitable, systems must choose between Consistency/Integrity (CP - rejecting writes during partitions to prevent split-brain) or Availability (AP - accepting writes across partitions at the risk of stale or conflicting data).",
    hint: "Map 'Consistency' directly to Data Integrity and 'Availability' to System Availability.",
    level: "expert",
    codeExample: `// CAP Theorem vs CIA Triad:
CP Architecture (Bank / FinTech)  ==> High Integrity + High Confidentiality (Lower Availability on Split)
AP Architecture (CDN / Social)    ==> High Availability + Low Latency (Eventual Consistency / Weaker Integrity)`
  },
  {
    question: "In military and classified intelligence networks, how does the Bell-LaPadula security model enforce Confidentiality trade-offs at the expense of Availability?",
    shortAnswer: "By enforcing 'No Read Up, No Write Down' rules, preventing higher-classified information from flowing to lower clearance levels even if urgent operational needs arise.",
    explanation: "The Bell-LaPadula state machine model enforces the Simple Security Property (a subject at clearance level X cannot read data at level > X) and the *-Property (a subject at level X cannot write data to level < X). If a field operative in a combat zone desperately requires tactical data (Availability need) but lacks the specific Top-Secret clearance token, the system strictly denies access, prioritizing state secret Confidentiality over operational field convenience.",
    hint: "Remember the formal military security rule: 'No Read Up, No Write Down'.",
    level: "expert",
    codeExample: `// Bell-LaPadula Access Logic:
bool CanAccessClassifiedDocument(Subject s, Document d, Operation op) {
  if (op == READ)  return s.clearanceLevel >= d.classificationLevel; // No Read Up
  if (op == WRITE) return s.clearanceLevel <= d.classificationLevel; // No Write Down
  return false;
}`
  },
  {
    question: "Why do global content streaming platforms (like Netflix or Hotstar) adopt the BASE model rather than ACID, and which CIA pillar is sacrificed?",
    shortAnswer: "They prioritize Availability and low latency by adopting Basically Available, Soft-state, Eventual consistency (BASE), sacrificing strict instantaneous Integrity.",
    explanation: "For video streaming or recommendation engines, if a user's viewing history or 'like' counter is desynchronized by 5 seconds across edge caching nodes, no catastrophic financial or physical harm occurs. Enforcing strict ACID distributed locks on 50 million concurrent video streams would cause buffer stalls and server crashes. Therefore, streaming platforms trade instantaneous Integrity for massive 99.999% global Availability.",
    hint: "Consider whether a 3-second delay in updating a video view counter justifies crashing the video playback stream.",
    level: "moderate",
    codeExample: `// BASE Eventual Consistency Model:
// Asynchronous background sync across edge CDN nodes
async function updateWatchHistory(userId, videoId, timestamp) {
  await localRedisEdge.set(\`user:\${userId}:pos\`, timestamp); // Instant response (< 2ms)
  messageQueue.publish('SYNC_GLOBAL_WATCH_HISTORY', { userId, videoId, timestamp }); // Eventual sync
}`
  },
  {
    question: "What trade-off is made when deploying End-to-End Encryption (E2EE) on corporate email or messaging applications regarding operational Availability and monitoring?",
    shortAnswer: "Confidentiality is maximized, but central security monitoring (DLP, malware scanning, compliance auditing) and server-side search Availability are lost.",
    explanation: "When messages or emails are encrypted end-to-end using client-side asymmetric keys (e.g., Signal Protocol), only the sender and receiver hold decryption keys. While this prevents rogue insiders or compromised servers from reading cleartext, enterprise Data Loss Prevention (DLP) engines, spam filters, and automated threat scanners become completely blinded. Furthermore, users cannot perform fast server-side searches across archived communications.",
    hint: "Think about why corporate IT cannot scan encrypted WhatsApp messages for outgoing company trade secrets.",
    level: "moderate",
    codeExample: `// E2EE Corporate Trade-Off:
E2EE_Benefits = 100% Protection against Wiretapping / Cloud DB Leaks;
E2EE_Drawbacks = Zero Gateway Antivirus Inspection + Zero DLP Keyword Alerts + Zero Automated Compliance Audits;`
  },
  {
    question: "In industrial SCADA environments (like the Barrackpore 220kV power grid), why is heavy public-key cryptography (e.g., 4096-bit RSA) avoided for sub-cycle protective relay switching?",
    shortAnswer: "Asymmetric RSA computation takes 50-200ms, which exceeds the mandatory 4-16ms fault-clearing deadline required to prevent physical transformer explosions.",
    explanation: "High-voltage transmission lines require protective relays to detect short circuits and trip circuit breakers within 1 to 2 electrical cycles (16 to 32 milliseconds). If a relay had to perform an intensive 4096-bit RSA signature calculation on incoming commands, the delay would allow massive fault currents to physically incinerate multimillion-rupee power transformers. SCADA engineers therefore utilize lightweight symmetric HMAC-SHA256 nonces or optical point-to-point fiber isolation.",
    hint: "Compare the 20ms physics timeline of an electrical arc with the 100ms calculation time of heavy public-key ciphers.",
    level: "expert",
    codeExample: `// SCADA Real-Time Budget Comparison:
Max_Trip_Time_Budget = 20 ms; // Physical circuit breaker protection limit
RSA_4096_Verify_Time = 65 ms; // VIOLATION: Transformer burns before calculation finishes!
HMAC_SHA256_Time     = 0.4 ms; // COMPLIANT: Ultra-fast cryptographic authentication`
  },
  {
    question: "What is the security trade-off between 'Fail-Open' and 'Fail-Closed' firewall and access control architectures?",
    shortAnswer: "Fail-Closed prioritizes Confidentiality and Integrity by blocking all traffic upon failure; Fail-Open prioritizes Availability by allowing all traffic to pass through.",
    explanation: "When a security appliance (firewall, biometric door lock, or IDS) experiences an internal crash or power loss: Fail-Closed blocks all packets and locks all doors (protecting data and restricted vaults, but stranding users and stopping business operations). Fail-Open allows network packets through and unlocks physical doors (ensuring hospital evacuation and network uptime, but exposing internal assets to unauthorized entry).",
    hint: "Think of a physical building fire: should emergency exit doors lock down (Fail-Closed) or unlock (Fail-Open)?",
    level: "basic",
    codeExample: `// Fail-Closed vs Fail-Open Architecture:
// Banking Database Gateway (Fail-Closed):
if (SecurityInspectionEngine.status() == CRASHED) {
  DropAllConnections(); // Preserves Confidentiality
}

// Hospital Emergency Exit Door (Fail-Open):
if (PowerSystem.status() == BLACKOUT) {
  ReleaseElectromagneticLocks(); // Preserves Human Life & Availability
}`
  },
  {
    question: "How do 'Rate-Limiting' and 'WAF Challenge Pages' (e.g., Cloudflare Captchas) represent an intentional trade-off between Availability and User Experience?",
    shortAnswer: "They protect backend Availability against botnet exhaustion attacks at the cost of adding friction and potential false-positive lockouts for legitimate users.",
    explanation: "During volumetric application-layer DDoS attacks, Web Application Firewalls deploy JavaScript challenges, Captchas, and aggressive IP rate-limits (e.g., max 20 requests/minute). While this defends backend database servers from crashing (preserving Availability for the broader audience), individual legitimate users with shared public IPs (like college dorms or corporate NATs) experience annoying Captcha prompts or accidental temporary 429 Too Many Requests blocks.",
    hint: "Consider how blocking bots also risks inconveniencing legitimate humans sharing the same IP address.",
    level: "moderate",
    codeExample: `// Adaptive WAF Rate Limiting:
if (ip_request_rate > 50_req_per_sec) {
  challengeWithManagedCaptcha(); // Sacrifices seamless UX to prevent server CPU exhaustion
}`
  },
  {
    question: "In distributed database design, how does PACELC theorem extend the CAP theorem regarding latency and consistency trade-offs during normal (non-partitioned) operations?",
    shortAnswer: "PACELC states: If there is a Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C).",
    explanation: "Developed by Daniel Abadi, PACELC recognizes that network partitions are rare, but trade-offs occur 100% of the time. Even when the network is completely healthy (Else), an architect must choose between Latency (L - returning fast responses before replicating to all nodes) and Consistency/Integrity (C - waiting for all distributed replicas to acknowledge write before responding).",
    hint: "Remember the mnemonic: If Partition -> A or C; Else -> Latency or Consistency.",
    level: "expert",
    codeExample: `// PACELC Classification Examples:
MongoDB   ==> PC/EC (Prioritizes Consistency during partition, Consistency in normal operation)
Cassandra ==> PA/EL (Prioritizes Availability during partition, Low Latency in normal operation)`
  },
  {
    question: "What CIA trade-off occurs when an enterprise implements automated 15-minute immutable database backup snapshots to write-once-read-many (WORM) storage?",
    shortAnswer: "Integrity and Availability are maximized for disaster recovery, but storage cost and continuous backup I/O load on database throughput are increased.",
    explanation: "Frequent immutable snapshots guarantee near-zero Recovery Point Objective (RPO) and complete immunity against ransomware tampering (Integrity & Availability). However, taking snapshots every 15 minutes consumes massive cloud storage budgets (e.g., ₹2,50,000+ monthly in AWS S3 Object Lock) and introduces continuous disk I/O freezes or replication overhead that can increase application query latency by 10-15%.",
    hint: "Think about the financial cost and hardware I/O penalty of constantly archiving gigabytes of database snapshots.",
    level: "moderate",
    codeExample: `// Snapshot Frequency Trade-Off:
RPO_Target = 15_Minutes; // Near-zero data loss
Monthly_Storage_Cost_INR = ₹3,20,000;
DB_Disk_IO_Overhead = "+12% query latency during snapshot freeze";`
  },
  {
    question: "Why does the implementation of Mutual TLS (mTLS) across internal microservices present a trade-off between Zero-Trust Confidentiality/Integrity and Operational Observability?",
    shortAnswer: "mTLS encrypts all inter-service traffic, preventing eavesdropping but breaking traditional packet sniffers and requiring complex distributed tracing proxies.",
    explanation: "In a microservice mesh, enforcing mTLS ensures every service verifies the X.509 certificate of calling services and encrypts payload data. However, network engineers can no longer use simple Wireshark or tcpdump packet captures on internal switches to debug HTTP errors or latency spikes. To regain visibility, organizations must deploy complex sidecar proxy tracing (e.g., Envoy, Istio, Jaeger) which adds memory overhead.",
    hint: "Recall that encrypting internal traffic stops both hackers and internal network debugging tools from inspecting packets.",
    level: "expert",
    codeExample: `// mTLS Trade-Off Matrix:
Security_Gain = "100% encryption between microservices + cryptographic identity";
Observability_Cost = "Standard Wireshark/SPAN ports blinded -> Requires Envoy Sidecar Proxy (+15MB RAM per pod)";`
  },
  {
    question: "In e-commerce flash sales (e.g., Flipkart Big Billion Days or Jadavpur hub logistics), what trade-off is made between inventory lock Integrity and checkout Availability?",
    shortAnswer: "Systems use optimistic concurrency or temporary reservation hold timers (10 minutes) rather than pessimistic table locks to prevent database checkout crashes.",
    explanation: "If 100,000 customers attempt to buy 500 discounted smartphones simultaneously, placing a hard pessimistic SQL row lock (`SELECT FOR UPDATE`) on the inventory database would queue up thousands of database threads, causing database CPU saturation and global checkout crashes (Availability collapse). Instead, systems use optimistic distributed locks with 10-minute cart reservation countdowns, gracefully managing trade-offs between inventory accuracy and server throughput.",
    hint: "Consider what happens when 100k users all try to lock the exact same database row at the exact same millisecond.",
    level: "moderate",
    codeExample: `// Optimistic Locking with Redis TTL Hold:
async function reserveInventoryItem(itemId, userId) {
  const acquired = await redis.set(\`item:\${itemId}:lock\`, userId, 'NX', 'EX', 600); // 10 min hold
  if (!acquired) {
    return { status: 'WAITLIST_OR_SOLD_OUT', retryAfter: 15 }; // Preserves system availability
  }
  return { status: 'PROCEED_TO_CHECKOUT', expiresAt: Date.now() + 600000 };
}`
  },
  {
    question: "How does the 'Biba Integrity Model' contrast with the 'Bell-LaPadula Confidentiality Model' in terms of security rules?",
    shortAnswer: "Biba enforces 'No Read Down, No Write Up' to preserve data integrity, whereas Bell-LaPadula enforces 'No Read Up, No Write Down' to preserve confidentiality.",
    explanation: "The Biba model protects data from unauthorized alteration by preventing subjects from reading data of lower integrity (which could contaminate their decisions) and preventing them from writing data to higher integrity levels. Bell-LaPadula does the exact opposite because its sole objective is preventing secret information from leaking downward to unauthorized eyes.",
    hint: "Remember: Bell-LaPadula = Confidentiality (No Read Up); Biba = Integrity (No Read Down).",
    level: "expert",
    codeExample: `// Biba Integrity Access Rules:
Simple Integrity Property: Subject cannot READ an object of LOWER integrity level (No Read Down).
*-Integrity Property:      Subject cannot WRITE to an object of HIGHER integrity level (No Write Up).`
  },
  {
    question: "What is the trade-off of utilizing Multi-Region Active-Active Database Replication compared to Active-Passive Standby?",
    shortAnswer: "Active-Active provides near-zero RTO and instant Availability failover, but introduces complex conflict resolution and high cross-region data transfer costs.",
    explanation: "In an Active-Active deployment across Kolkata and Mumbai, both regions process live reads and writes simultaneously. If one data center experiences a total power blackout, traffic switches instantly with 0ms downtime. However, synchronizing writes across 2,000 km requires handling asynchronous replication lag, resolving conflicting writes (Last-Write-Wins vs CRDTs), and paying massive monthly inter-region cloud egress bandwidth costs in ₹ INR.",
    hint: "Think about the network physics and cost of keeping two databases 2,000 kilometers apart in continuous live synchronization.",
    level: "moderate",
    codeExample: `// Active-Active vs Active-Passive Trade-Off:
Active_Active = { RTO: "0 seconds", DowntimeRisk: "Near Zero", MonthlyCostINR: "₹12,50,000", ConflictRisk: "Requires CRDTs" };
Active_Passive = { RTO: "15 minutes", DowntimeRisk: "Manual DNS Switch", MonthlyCostINR: "₹4,20,000", ConflictRisk: "Zero" };`
  },
  {
    question: "Why is 'Anonymization' of medical datasets for AI research a direct trade-off between Patient Confidentiality and Data Utility/Integrity?",
    shortAnswer: "Aggressive k-anonymity and differential privacy suppress outliers and granular metrics, protecting privacy but reducing AI diagnostic accuracy.",
    explanation: "To comply with data privacy laws (like DPDP Act and HIPAA), medical researchers in institutes like Jadavpur apply k-anonymity, l-diversity, and noise injection (differential privacy). While this guarantees that individual patients cannot be re-identified from health records (Confidentiality), stripping rare blood marker values or precise geographical coordinates degrades the statistical fidelity (Integrity) required to train life-saving oncology AI models.",
    hint: "Notice how scrubbing all identifying details from medical data also removes the fine anomalies doctors need for accurate research.",
    level: "moderate",
    codeExample: `// Differential Privacy Trade-Off:
Epsilon_Privacy_Budget = 0.1; // Extreme privacy (Adds heavy mathematical Laplace noise)
Result = "100% Patient Anonymity, but AI Tumor Detection Accuracy drops from 96% to 78%";`
  },
  {
    question: "In banking ATM cash dispensers, what architectural trade-off is made when the ATM network connection to the core banking switch drops mid-transaction?",
    shortAnswer: "The ATM enforces Fail-Safe Integrity by declining cash dispensing and reversing transaction ledgers, prioritizing financial balance accuracy over customer convenience.",
    explanation: "If an ATM physically dispenses ₹10,000 in cash without receiving an authenticated cryptographic commit acknowledgment from the central bank switch, an adversary could deliberately cut communication wires right after cash is dispensed, draining ATMs without debiting their bank accounts. The ATM firmware therefore operates on strict two-phase commit: cash is only physically released after mutual ledger confirmation.",
    hint: "Think about why an ATM will never dispense cash if it loses connection to the bank during processing.",
    level: "basic",
    codeExample: `// ATM Two-Phase Commit Dispense Logic:
await prepareCashDispenser(amount);
const commitAck = await secureCoreBankingChannel.confirmDebit(account, amount);
if (commitAck.success === true) {
  dispensePhysicalCash();
} else {
  cancelAndRetractNotes(); // Preserves financial integrity
}`
  },
  {
    question: "How does the 'Clark-Wilson Integrity Model' prevent internal financial fraud in enterprise software, and what operational friction does it introduce?",
    shortAnswer: "By enforcing Separation of Duties and Well-Formed Transactions, requiring multiple distinct authorized users to initiate, review, and approve actions.",
    explanation: "The Clark-Wilson model ensures data integrity by mandating that critical business actions (e.g., disbursing a ₹50 Lakh vendor payment) cannot be executed by a single individual. It requires a Separation of Duties: Mamata enters the invoice, Mahima verifies the tax calculations, and Debangshu digitally signs the bank release. While this eliminates insider fraud (Integrity), it introduces operational delays (Availability/Speed reduction).",
    hint: "Think of dual-key bank vaults: no single person has both keys.",
    level: "expert",
    codeExample: `// Clark-Wilson Separation of Duties:
function releaseVendorPayment(invoiceId, approver) {
  const invoice = getInvoice(invoiceId);
  if (invoice.creatorId === approver.id) {
    throw new SecurityException("Violation of Separation of Duties: Creator cannot approve own payment.");
  }
  if (!approver.hasRole("FINANCIAL_OFFICER")) {
    throw new SecurityException("Insufficient authority.");
  }
  executeSignedDisbursement(invoiceId);
}`
  },
  {
    question: "What is the trade-off of implementing 'Zero-Knowledge Proofs' (ZKPs) in privacy-preserving blockchain networks like Zcash or Ethereum Rollups?",
    shortAnswer: "ZKPs provide mathematically absolute Confidentiality and Integrity, but demand massive cryptographic CPU proving times and higher transaction generation latency.",
    explanation: "Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) allow a user to prove they possess sufficient funds to make a payment without revealing their wallet address, balance, or transaction amount. While this achieves flawless Confidentiality and cryptographic Integrity, generating a zk-SNARK proof requires heavy polynomial math taking 2-10 seconds on mobile devices and significant server memory.",
    hint: "Think about the high mathematical compute power needed to prove a secret is true without revealing what the secret is.",
    level: "expert",
    codeExample: `// ZKP Computation Trade-Off:
Proof_Generation_Time_Phone = "4.8 seconds (High CPU/Battery drain)";
Verification_Time_Verifier  = "3 milliseconds (Fast on-chain verification)";
Privacy_Level               = "Absolute Zero-Knowledge Confidentiality";`
  },
  {
    question: "Why do automotive Autonomous Driving systems (like Tesla FSD or smart connected vehicles) prioritize edge computation over cloud AI processing?",
    shortAnswer: "Ultra-low latency real-time Availability for collision avoidance (10ms) cannot depend on variable cellular 4G/5G cloud network connections.",
    explanation: "An autonomous vehicle moving at 100 km/h covers 27.7 meters every second. If an obstacle appears on the highway, braking decisions must execute within 10-20 milliseconds. If the vehicle sent camera feeds to a cloud AI datacenter over cellular networks, network jitter, latency spikes, or cellular dead zones would cause fatal collisions. Edge computation guarantees deterministic Availability and Integrity for life-critical controls.",
    hint: "Consider what happens if a self-driving car enters a tunnel with zero internet connectivity while approaching an obstacle.",
    level: "moderate",
    codeExample: `// Autonomous Vehicle Safety Decision:
if (emergency_braking_required) {
  executeLocalEdgeBrakes(); // Deterministic 8ms response time
}
// Do NOT wait for: await sendCameraFeedToCloudServer(); // 150-500ms network delay`
  },
  {
    question: "What trade-off is made when configuring 'Session Expiration Timeouts' in enterprise web banking applications?",
    shortAnswer: "Short timeouts (5 minutes) maximize Confidentiality against unattended workstation hijacking, but create frustrating session loss and re-login friction for users.",
    explanation: "If a customer in an internet cafe or office leaves their banking portal open on screen, an aggressive 5-minute inactivity timeout invalidates session cookies and tokens, preventing unauthorized bystanders from executing transfers. However, if a user is cross-referencing tax documents in another window for 6 minutes, returning to find their unsaved form wiped causes extreme usability frustration.",
    hint: "Balance the security of locking abandoned sessions against the frustration of losing filled form data.",
    level: "basic",
    codeExample: `// Banking Session Timeout Policy:
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
// Trade-off: Mitigates Session Hijacking vs Inconveniences legitimate multitasking users.`
  },
  {
    question: "How does the 'Parkerian Hexad' expand the traditional CIA triad to help architects evaluate trade-offs more granularly?",
    shortAnswer: "By splitting CIA into six distinct dimensions: Confidentiality, Possession/Control, Integrity, Authenticity, Availability, and Utility.",
    explanation: "Donn Parker created the Parkerian Hexad to address nuances that CIA models oversimplify. For example: If an attacker steals an encrypted backup tape containing private data without possessing the decryption key, Confidentiality is technically not breached (the data is encrypted), but Possession/Control is lost. If data is encrypted with a key that the owner permanently loses, Integrity is intact, but Utility is completely destroyed.",
    hint: "Recall the six pillars: Confidentiality, Possession, Integrity, Authenticity, Availability, and Utility.",
    level: "expert",
    codeExample: `// Parkerian Hexad Trade-Off Example:
// Scenario: Encrypted USB drive stolen from IT lab
Confidentiality = PRESERVED (AES-256 unbreakable without key);
Possession      = LOST (Physical device in attacker hands);
Availability    = LOST (Original data no longer accessible to owner);
Utility         = PRESERVED FOR NONE (Neither party can use cleartext);`
  },
  {
    question: "In distributed microservices, why does implementing 'Saga Pattern' instead of Two-Phase Commit (2PC) represent an intentional trade-off in data Integrity?",
    shortAnswer: "Sagas replace strict ACID database locking with asynchronous local transactions and compensating actions, accepting temporary inconsistency for massive scalability.",
    explanation: "Two-Phase Commit (2PC) holds database row locks across all participating microservices (Order, Payment, Inventory, Shipping) until everyone agrees to commit. If one microservice is slow, all database connections hang (Availability disaster). The Saga pattern executes independent local transactions; if Payment fails at Step 3, it fires automated 'Compensating Transactions' (e.g., refunding inventory). The system trades momentary Consistency for high Availability and scale.",
    hint: "Think about booking a flight and hotel: if hotel booking fails, the system automatically cancels the flight ticket retroactively.",
    level: "expert",
    codeExample: `// Saga Compensating Workflow:
1. Reserve_Flight()    --> SUCCESS
2. Charge_CreditCard() --> SUCCESS
3. Book_Hotel()        --> FAILED (No rooms)
// COMPENSATING ACTIONS:
4. Refund_CreditCard() --> RESTORES BALANCE
5. Cancel_Flight()     --> RESTORES SEAT`
  },
  {
    question: "What is the security trade-off of using 'Immutable Infrastructure' (destroying and recreating cloud VMs for every deployment) versus in-place patching?",
    shortAnswer: "Immutable infrastructure guarantees 100% configuration Integrity and eliminates malware persistence, but requires sophisticated CI/CD pipelines and increases deployment time.",
    explanation: "In an immutable architecture, servers are never modified or patched live via SSH. Instead, new golden virtual machine images (AMIs / container images) are built, tested, and deployed, while old instances are terminated. This ensures zero configuration drift and guarantees that any attacker rootkit installed on disk is wiped upon next deployment. However, spinning up entire new fleets increases deployment duration and cloud infrastructure costs.",
    hint: "Think of replacing disposable paper cups (immutable) versus constantly washing and repairing a cracked glass cup.",
    level: "moderate",
    codeExample: `// Immutable Infrastructure Pipeline:
// Instead of: ssh admin@production-server && sudo apt-get upgrade (Vulnerable to drift)
// Enforce: Packer build new AMI -> Automated Vulnerability Scan -> Terraform Blue/Green Rollout -> Terminate Old Fleet`
  },
  {
    question: "Why do Content Delivery Networks (CDNs) cache static web assets at the edge without querying the origin server's authorization database on every request?",
    shortAnswer: "To deliver sub-20ms Availability and absorb millions of concurrent requests, accepting that revoked user permissions may take a few minutes to propagate (TTL delay).",
    explanation: "If every single image, video file, and stylesheet requested from Cloudflare or Fastly had to make a 200ms round-trip to the origin server to verify user authentication, web page load times would skyrocket, defeating the entire purpose of a CDN. CDNs cache assets with a Time-To-Live (e.g., TTL = 10 minutes). The system deliberately trades instantaneous Confidentiality revocation for global Availability.",
    hint: "Notice how edge caches serve cached images immediately to keep web pages fast, rather than asking the home server every single time.",
    level: "basic",
    codeExample: `// Edge Cache Header Policy:
Cache-Control: public, max-age=600, s-maxage=600, stale-while-revalidate=30
// Benefit: 99% cache hit ratio, ultra-fast delivery; Trade-off: 10-minute cache invalidation lag.`
  },
  {
    question: "In military radar defense systems, how does 'Frequency Hopping Spread Spectrum' (FHSS) prioritize Availability and Integrity against Electronic Warfare jamming?",
    shortAnswer: "By rapidly switching transmission frequencies hundreds of times per second, preventing adversaries from continuously jamming (Availability attack) or spoofing signals.",
    explanation: "During wartime, enemy electronic warfare units broadcast high-power radio frequency noise across specific bands to blind military radar and communication links. FHSS rapidly pseudorandomly changes carrier frequencies across a wide radio spectrum based on a shared cryptographic seed. Even if the adversary jams 10 frequencies, the radar signals hopping across the remaining 90 frequencies maintain reliable Availability and anti-tamper Integrity.",
    hint: "Think of running across a room while constantly changing unpredictable zigzag steps so an opponent cannot aim a spotlight at you.",
    level: "expert",
    codeExample: `// Frequency Hopping Algorithm:
void HopFrequency(uint64_t shared_crypto_seed, uint32_t millisecond_tick) {
  uint32_t target_freq = PseudoRandomHash(shared_crypto_seed ^ millisecond_tick) % TOTAL_BANDWIDTH;
  RadioHardware::TuneTo(BASE_FREQ + target_freq); // Hops 1,000 times per second
}`
  },
  {
    question: "What CIA trade-off is introduced when implementing 'Content Security Policy' (CSP) headers with strict nonce verification on high-traffic web applications?",
    shortAnswer: "Integrity and Confidentiality are hardened against Cross-Site Scripting (XSS), but developer flexibility is reduced and legacy third-party marketing tags may break.",
    explanation: "A strict Content Security Policy (e.g., `script-src 'nonce-random123' 'strict-dynamic'`) stops inline JavaScript injection and stolen cookie exfiltration by requiring every script tag to contain a server-generated cryptographic nonce. However, marketing tracking pixels, Google Tag Manager scripts, and legacy inline scripts will be blocked by the browser, requiring engineering effort to refactor code and update build tools.",
    hint: "Consider how blocking unauthorized scripts can also accidentally block third-party analytics widgets if not properly configured.",
    level: "moderate",
    codeExample: `// Strict CSP Header:
Content-Security-Policy: script-src 'nonce-4bf7a92c' 'strict-dynamic'; object-src 'none'; base-uri 'none';
// Protects against 99% of XSS; Trade-off: Blocks all un-nonced inline scripts and legacy eval() functions.`
  },
  {
    question: "How does the 'Cost of Security Controls vs. Value of Asset' rule guide executive CISOs when deciding which CIA trade-offs to approve?",
    shortAnswer: "The total expenditure on security controls (annual cost of software + operational friction) must never exceed the Annualized Loss Expectancy (ALE) of the protected asset.",
    explanation: "If a company's internal cafeteria lunch menu website has an estimated breach risk value of ₹50,000 per year, spending ₹15,00,000 on an enterprise HSM, multi-region database cluster, and dedicated 24/7 SOC monitoring is economically irrational. CISOs calculate `Cost of Control < ALE_Before - ALE_After` to ensure security investments generate positive risk mitigation ROI without suffocating the enterprise budget.",
    hint: "Remember: Never spend a ₹1,000 lock to protect a ₹100 bicycle.",
    level: "basic",
    codeExample: `// Security ROI Decision Rule:
Net_Risk_Benefit_INR = (ALE_Without_Control - ALE_With_Control) - Annual_Cost_Of_Security_Control;
if (Net_Risk_Benefit_INR > 0) {
  Approve_Security_Architecture();
} else {
  Accept_Residual_Risk_Or_Use_Simpler_Control();
}`
  },
  {
    question: "What is the ultimate synthesized architectural takeaway regarding evaluating CIA trade-offs in modern computing environments?",
    shortAnswer: "Security is not a static binary state of 'secure vs insecure', but an active balance tailored to mission criticality, risk appetite, compliance, and user reality.",
    explanation: "No universal architecture fits every system. A banking switch requires rigid Integrity and Confidentiality (Fail-Closed, ACID); an ICU monitor requires relentless Availability (Fail-Open, Break-Glass); a media streaming service requires low latency and scalability (BASE, Eventual Consistency); and military networks demand absolute Confidentiality (Bell-LaPadula). Great security architects master trade-offs, making deliberate, documented, and resilient design choices that align technical controls with real-world human and business needs.",
    hint: "Conclude by recognizing that the best security architecture is the one precisely tailored to the system's unique operational purpose.",
    level: "expert",
    codeExample: `// Golden Rule of CIA Architectural Evaluation:
Architecture_Fitness = Function(
  Mission_Criticality,      // Is it Banking, Healthcare, Military, or Entertainment?
  Failure_Mode_Tolerance,   // Is Fail-Open or Fail-Closed acceptable?
  Regulatory_Mandates,      // DPDP Act 2023, RBI, HIPAA, ISO 27001
  Economic_Budget_INR       // Control Cost vs Asset Valuation
);`
  }
];

export default questions;
