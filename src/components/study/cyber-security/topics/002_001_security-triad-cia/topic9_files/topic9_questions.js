const questions = [
  {
    question: "What was the primary root cause vulnerability that led to the 2017 Equifax data breach, and which pillar of the CIA triad was most severely compromised?",
    shortAnswer: "An unpatched Apache Struts vulnerability (CVE-2017-5638) combined with expired internal SSL inspection certificates, compromising Confidentiality.",
    explanation: "The Equifax breach compromised the Personally Identifiable Information (PII) of over 147 million consumers. Attackers exploited an unpatched Jakarta Multipart parser flaw in Apache Struts (CVE-2017-5638) to execute remote code. Because Equifax's internal network traffic inspection appliance had an expired cryptographic SSL certificate for over 9 months, the attackers exfiltrated data undetected for 76 days, resulting in a monumental failure of Confidentiality.",
    hint: "Think about how missing web framework patches and lack of internal encrypted traffic visibility allow attackers to exfiltrate PII undetected.",
    level: "moderate",
    codeExample: `// CVE-2017-5638 Exploit Vector via Malicious Content-Type Header:
POST /struts2-showcase/upload.action HTTP/1.1
Host: vulnerable-target.com
Content-Type: %{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS)...
// Exploits OGNL expression evaluation in Apache Struts parser`
  },
  {
    question: "How did the Stuxnet worm specifically target the Integrity pillar of industrial SCADA systems without immediately triggering operational alarms?",
    shortAnswer: "By injecting a Man-in-the-Middle rootkit into Siemens Step7 PLCs that spoofed normal sensor telemetry while silently altering centrifuge rotor frequencies.",
    explanation: "Stuxnet was a sophisticated cyber weapon designed to sabotage uranium enrichment centrifuges in Natanz, Iran. Rather than causing an outright shutdown (Availability attack), it altered the rotational speed of frequency converter drives (overspinning and slowing them drastically) to physically disintegrate the rotor aluminium tubes. Simultaneously, it intercepted sensor feedback and replayed recorded 'normal operating data' to SCADA monitoring consoles, fooling human operators into believing the system was running normally—a textbook attack on Data and Operational Integrity.",
    hint: "Recall how intercepting sensor readings and replaying benign signals hides real-time physical sabotage.",
    level: "expert",
    codeExample: `// Stuxnet PLC Man-in-the-Middle logic simulation:
void Process_PLC_Cycle() {
  if (Target_Centrifuge_Connected()) {
    Send_Frequency_Command(1410.0); // Destructive 1,410 Hz (Normal: 1,064 Hz)
    Spoof_SCADA_Telemetry(1064.0);  // Replay recorded benign 1,064 Hz to operators
  }
}`
  },
  {
    question: "In the 2016 Dyn DNS cyber attack, which CIA triad pillar failed, and what technical mechanism did the Mirai botnet use to trigger this failure?",
    shortAnswer: "Availability failed due to a 1.2 Tbps volumetric DDoS assault utilizing compromised IoT devices executing TCP SYN, UDP, and DNS Water Torture floods.",
    explanation: "The 2016 Dyn attack crippled internet access to major services like GitHub, Twitter, Netflix, and Spotify across North America and Europe. The Mirai botnet commandeered hundreds of thousands of default-credential IoT cameras and DVRs to launch a multi-vector 1.2 Tbps DDoS flood against Dyn's authoritative DNS servers. By exhausting network bandwidth, state tables, and recursive resolver queues (including pseudo-random subdomain water torture attacks), authoritative resolution became impossible, leading to a catastrophic failure of Availability.",
    hint: "Focus on how overwhelming authoritative nameservers with recursive garbage queries knocks entire platforms offline.",
    level: "moderate",
    codeExample: `// Mirai DNS Water Torture pseudo-random query generation:
char *generate_random_subdomain() {
    char sub[16];
    generate_random_string(sub, 12);
    // e.g., "x8f2k9a1q4z7.targetdomain.com" -> forces recursive resolver to query auth server
    return format_dns_query(sub, "targetdomain.com");
}`
  },
  {
    question: "How did attackers in the 2013 Target Corporation breach traverse trust boundaries to reach the Point-of-Sale (POS) network, and what architectural failure enabled it?",
    shortAnswer: "Attackers stole credentials from a third-party HVAC contractor and exploited the absence of network segmentation between corporate vendor portals and POS systems.",
    explanation: "Attackers phished credentials from Fazio Mechanical Services (a refrigeration/HVAC vendor in Pennsylvania). The vendor's credentials granted access to Target's web billing and project management portal. Due to a critical lack of VLAN/micro-segmentation, attackers moved laterally from the billing portal into the sensitive Cardholder Data Environment (CDE), where they installed 'Kaptoxa' memory-scraping malware across POS registers, exfiltrating 40 million credit card numbers.",
    hint: "Consider how granting vendor access without zero-trust boundaries allows pivot into high-value zones.",
    level: "moderate",
    codeExample: `// Conceptual Lateral Movement Path:
Vendor Phishing (HVAC) 
  --> Target Billing Web Portal (Shared Corporate LAN) 
    --> No Firewalled Segment Separation 
      --> POS Terminal Network (CDE) 
        --> Kaptoxa Memory-Scraper Injected`
  },
  {
    question: "Why was the 2021 Colonial Pipeline ransomware incident fundamentally categorized as an Availability disruption caused by proactive business caution rather than direct OT compromise?",
    shortAnswer: "Colonial Pipeline shut down its Operational Technology (OT) pipeline flow because its IT billing and customer accounting systems were encrypted, making metering impossible.",
    explanation: "DarkSide ransomware operators penetrated Colonial Pipeline's corporate network via an inactive VPN account lacking Multi-Factor Authentication (MFA). Although the ransomware infected enterprise billing and accounting systems in the IT domain without jumping into the SCADA/OT network, pipeline operators could not bill customers or meter refined oil shipments accurately. Consequently, management proactively shut down 5,500 miles of physical pipeline for 6 days, creating widespread fuel shortages across the US East Coast—demonstrating how IT availability failures trigger physical OT shutdowns.",
    hint: "Think about the dependency of physical operational workflows on financial billing infrastructure.",
    level: "expert",
    codeExample: `// Risk Dependency Chain:
[ Compromised VPN (No MFA) ] 
  --> [ IT Billing Database Encrypted by DarkSide ] 
    --> [ Loss of Accounting & Metering Capability ] 
      --> [ Proactive Decision to Sever OT Pipeline Valves ]`
  },
  {
    question: "In financial UPI processing architectures in India (e.g., Kolkata FinTech hub), how do engineers balance Confidentiality and Availability during peak festival traffic surges?",
    shortAnswer: "By offloading payload encryption to Hardware Security Modules (HSMs) and implementing stateless tokenization with multi-region active-active clusters.",
    explanation: "During peak sales like Durga Puja or Diwali, UPI switches process over 15,000 transactions per second. To maintain Confidentiality, sensitive cardholder and MPIN data must be encrypted under PCI-DSS standards using HSMs. To prevent cryptographic latency from collapsing Availability, architectures deploy dedicated PCIe cryptographic offloaders, stateless format-preserving encryption (FPE), and active-active multi-region Kubernetes clusters with automated BGP Anycast routing.",
    hint: "Consider how hardware acceleration and distributed stateless services maintain cryptographic security without bottlenecking throughput.",
    level: "moderate",
    codeExample: `// Stateless Tokenization with HSM:
async function processUPITransaction(request) {
  const token = await hsmCluster.tokenize({
    pan: request.rawCardNumber,
    context: "UPI_SWITCH_KOLKATA_CLUSTER"
  });
  // Process transaction downstream using zero-knowledge ephemeral token
  return dispatchToCoreBanking(token, request.amount);
}`
  },
  {
    question: "How did the SolarWinds SUNBURST cyber attack (2020) violate the Integrity pillar within the software supply chain?",
    shortAnswer: "Attackers compromised the software build pipeline to inject malicious backdoor code directly into signed, legitimate Orion software updates.",
    explanation: "In the SolarWinds attack, threat actors compromised the internal build system (MSBuild) rather than the source code repository. During compilation, the SUNBURST malware injected backdoor source code into 'SolarWinds.Orion.Core.BusinessLayer.dll'. Because the artifact was compiled within the official pipeline, it was digitally signed with SolarWinds' valid cryptographic certificate, breaking the integrity verification of thousands of downstream enterprises and US government agencies.",
    hint: "Recall how injecting unauthorized code inside the automated build pipeline produces a validly signed malicious binary.",
    level: "expert",
    codeExample: `// SUNBURST Build-Time Injection Concept:
void OnBuildStart() {
    if (SourceFileExists("InventoryManager.cs")) {
        InjectBackdoorPayload("InventoryManager.cs"); // Injected before compiler runs
        TriggerCompiler();
        RemoveInjectedCode(); // Anti-forensic cleanup
    }
}`
  },
  {
    question: "What is the difference between Recovery Time Objective (RTO) and Recovery Point Objective (RPO) when designing systems for high Availability?",
    shortAnswer: "RTO is the maximum allowable downtime to restore operations; RPO is the maximum allowable age of data lost due to an incident.",
    explanation: "RTO (Recovery Time Objective) defines how quickly a business must restore its application after a failure (e.g., system must be online within 15 minutes). RPO (Recovery Point Objective) measures data loss tolerance in time units (e.g., transactional data loss must not exceed 0 seconds, requiring synchronous replication). Balancing RTO and RPO dictates architectural decisions like hot vs. cold standby, clustering, and backup frequencies.",
    hint: "Remember: RTO is about downtime duration; RPO is about data loss quantity/age.",
    level: "basic",
    codeExample: `// Architectural Formula:
Downtime_Cost = (Actual_Outage_Time - RTO) * Hourly_Loss_Rate (₹/hr)
Data_Loss_Cost = (Time_Since_Last_Sync - RPO) * Transaction_Volume * Loss_Per_Txn`
  },
  {
    question: "In hospital ICU monitoring systems (such as in Ichapur General Hospital), which CIA triad pillar is paramount during emergency resuscitations, and what design choice reflects this?",
    shortAnswer: "Availability is paramount to deliver continuous life-support telemetry; systems implement local offline caching and emergency override modes.",
    explanation: "While patient medical records must remain confidential under privacy regulations (such as HIPAA / DPDP Act), during a cardiac arrest or sudden drop in oxygen saturation, a doctor needs immediate, uninterrupted access to defibrillators and drug infusion pumps. If network connectivity fails or authentication servers hang, the ICU equipment must seamlessly switch to local autonomous mode (fail-open for patient care) rather than locking out medical staff.",
    hint: "When human life is on the line, immediate access to vital equipment overrides strict authentication barriers.",
    level: "moderate",
    codeExample: `// ICU Infusion Pump Access Logic:
if (emergency_code_blue_triggered || central_auth_unreachable) {
    grant_local_emergency_override(); // Upholds Availability over strict remote Auth
    log_tamper_evident_audit_trail(); // Preserves Integrity for post-incident review
}`
  },
  {
    question: "How does the 'Law of Unintended Consequences' manifest when organizations enforce overly aggressive Confidentiality policies?",
    shortAnswer: "Employees bypass cumbersome security controls, creating Shadow IT, insecure workarounds, and massive unmonitored vulnerability surfaces.",
    explanation: "When organizations enforce 20-character passwords rotated every 30 days, disabled copy-paste, and blocked USB ports without providing user-friendly workflows, employees inevitably circumvent the rules. Workers store unencrypted passwords on sticky notes, transfer sensitive data via personal WhatsApp or Gmail, and use personal 4G cellular dongles, causing a net decrease in organizational confidentiality and complete loss of visibility.",
    hint: "Consider how excessive friction motivates users to adopt unsanctioned external tools.",
    level: "moderate",
    codeExample: `// Security Friction vs. Shadow IT Curve:
Friction_Index > Usability_Threshold ==> Shadow_IT_Adoption = Exponential_Increase
Net_Security_Posture = Planned_Controls - Circumvention_Factor`
  },
  {
    question: "How did the 2017 NotPetya pseudo-ransomware outbreak disguise an Integrity and Availability destruction campaign as a financial extortion attack?",
    shortAnswer: "It mimicked ransomware payment screens but deliberately overwrote Master Boot Records (MBRs) with irreversible garbage data, making recovery impossible.",
    explanation: "NotPetya spread globally via a compromised Ukrainian accounting software update (M.E.Doc) using the EternalBlue exploit. While it presented a screen demanding ₹25,000 ($300) in Bitcoin for a decryption key, its payload deliberately calculated a completely random, non-recoverable installation key and wiped the disk's Master File Table (MFT) and MBR. It was not ransomware for profit, but a destructive wiper designed to permanently destroy data Integrity and system Availability.",
    hint: "Analyze how wipers pose as ransomware to conceal state-sponsored data destruction.",
    level: "expert",
    codeExample: `// NotPetya Destructive Disk Wipe Routine:
void Overwrite_MBR_Wiper() {
    HANDLE hDrive = CreateFile("\\\\.\\PhysicalDrive0", GENERIC_WRITE, ...);
    BYTE random_garbage[512];
    CryptGenRandom(hCryptProv, 512, random_garbage);
    WriteFile(hDrive, random_garbage, 512, &bytesWritten, NULL); // Irreversible loss
}`
  },
  {
    question: "In industrial SCADA power substations (like the 220kV grid in Barrackpore), why are firmware updates required to enforce cryptographic digital signatures before flashing?",
    shortAnswer: "To prevent attackers from uploading malicious logic (Integrity violation) that could cause transformer explosions or blackout cascades.",
    explanation: "Substation Remote Terminal Units (RTUs) and Programmable Logic Controllers (PLCs) control physical circuit breakers. If an adversary injects unsigned or altered firmware (as seen in the 2015 Ukraine BlackEnergy and Industroyer attacks), they can force high-voltage breakers to open and close rapidly out of phase, physically burning multimillion-rupee transformers. Asymmetric RSA/ECDSA digital signatures ensure the hardware only executes authenticated code verified against the vendor's root certificate.",
    hint: "Think about the physical dangers of modified control logic on high-voltage electrical grid hardware.",
    level: "moderate",
    codeExample: `// Cryptographic Signature Verification in Bootloader:
bool Verify_Firmware_Integrity(byte[] fw_image, byte[] signature, PublicKey vendor_pubkey) {
    byte[] hash = SHA256(fw_image);
    return RSA_Verify(hash, signature, vendor_pubkey); // Refuse flash if false
}`
  },
  {
    question: "What is the primary mechanism by which Content Delivery Networks (CDNs) and BGP Anycast protect modern web applications from Availability failures during volumetric DDoS attacks?",
    shortAnswer: "BGP Anycast announces the same IP address from hundreds of globally distributed edge locations, dispersing and absorbing massive traffic locally.",
    explanation: "In BGP Anycast routing, multiple geographically dispersed Point of Presence (PoP) edge servers advertise the exact same IP address prefix. When a botnet launches a 1 Tbps DDoS attack, routing tables direct packets to the topologically closest edge data center. This distributes the massive load across hundreds of global scrubbing nodes (e.g., Cloudflare, Akamai, Fastly), preventing the single origin backend server from being saturated.",
    hint: "Recall how routing traffic to the nearest geographic edge absorbs DDoS volume before reaching core servers.",
    level: "moderate",
    codeExample: `// BGP Anycast Routing Principle:
Client (Kolkata)    --> Hits Edge PoP (Kolkata Data Center)
Bot (Eastern Europe)--> Hits Edge PoP (Frankfurt Data Center)
Bot (North America) --> Hits Edge PoP (Ashburn Data Center)
// Origin Server receives only cleaned, reverse-proxied traffic`
  },
  {
    question: "How does the principle of 'Defense in Depth' prevent a single Confidentiality breach from compromising an entire enterprise database?",
    shortAnswer: "By implementing layered controls: web application firewall, network micro-segmentation, database encryption at rest, and column-level masking.",
    explanation: "Defense in Depth ensures that no single protective mechanism is a single point of failure. If an adversary bypasses the external firewall via an SQL injection flaw, column-level Field-Level Encryption (FLE) prevents them from reading plaintext Aadhaar or credit card numbers. If they obtain database administrative privileges, immutable audit logging alerts the SOC, and network egress filtering prevents large outbound exfiltration archives.",
    hint: "Think of security like medieval castle concentric walls: moat, gatehouse, outer wall, and keep.",
    level: "basic",
    codeExample: `// Layered Defense Stack:
Layer 1: Cloudflare WAF (Blocks SQLi attempts)
Layer 2: App Tier (Prepared Statements / Parameterized Queries)
Layer 3: Micro-segmented VPC (App subnet can only reach DB port 5432)
Layer 4: PostgreSQL TDE + AES-256 Field Level Column Encryption
Layer 5: Egress Gateway (Blocks outbound traffic to unknown IPs)`
  },
  {
    question: "In the 2014 Sony Pictures entertainment breach, what combination of CIA failures caused the complete disclosure of unreleased films, executive salaries, and internal emails?",
    shortAnswer: "Severe Confidentiality failure via lateral spear-phishing exfiltration, followed by wiper malware destroying internal IT Availability.",
    explanation: "The Guardians of Peace threat group penetrated Sony Pictures via spear-phishing emails sent to system administrators. Attackers discovered internal network shares containing plaintext passwords, unreleased feature films, executive email archives, and employee personal data (Confidentiality catastrophe). To cover their tracks and cause maximum operational disruption, the attackers deployed the 'Destover' wiper malware, bricking thousands of workstations and servers (Availability destruction).",
    hint: "Recognize how massive data theft is often followed by wiper malware to compound operational devastation.",
    level: "expert",
    codeExample: `// Dual-Pronged Attack Vector:
Phase 1: Lateral Reconnaissance -> Stole 100 TB of unencrypted data (Confidentiality)
Phase 2: Destover Wiper deployed via Active Directory GPO -> Bricked 70% of PCs (Availability)`
  },
  {
    question: "What is an Air Gap network, and why was it insufficient to protect the Natanz nuclear facility from Stuxnet?",
    shortAnswer: "An Air Gap physically isolates a network from the internet; Stuxnet bypassed it via infected USB flash drives carried by contractors.",
    explanation: "An air gap is a physical security measure where a secure network has no physical or wireless connections to external networks. Stuxnet bypassed this barrier using infected USB drives. When contractors plugged their personal laptops and thumb drives into maintenance terminals, the worm used Windows zero-day vulnerabilities (like the .LNK shortcut parsing flaw CVE-2010-2568) to automatically execute and spread across the isolated network via network shares and RPC.",
    hint: "Consider how physical removable media like USB thumb drives cross air-gapped physical boundaries.",
    level: "moderate",
    codeExample: `// Stuxnet LNK Shortcut Auto-Execution (CVE-2010-2568):
// Windows Explorer automatically loaded malformed .cpl binaries 
// while simply rendering custom icons in a folder, requiring zero user clicking.`
  },
  {
    question: "How does the Indian Digital Personal Data Protection (DPDP) Act 2023 penalize severe Confidentiality breaches, and what is the maximum financial penalty?",
    shortAnswer: "The DPDP Act imposes financial penalties up to ₹250 Crores for significant data fiduciaries failing to take reasonable security safeguards to prevent data breaches.",
    explanation: "Under Section 33 and the Schedule of the DPDP Act 2023, the Data Protection Board of India (DPBI) can levy financial penalties up to ₹250 Crores per instance on organizations (Data Fiduciaries) that fail to implement reasonable technical safeguards resulting in a personal data breach. This legal liability makes case study analysis and proactive CIA compliance an existential financial priority for enterprises.",
    hint: "Remember the statutory maximum penalty in Indian Rupees for failure to prevent personal data breaches.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 Compliance Metric:
Max_Statutory_Penalty = ₹2,50,00,00,000 (₹250 Crores)
Mandatory Action: Inform DPBI & affected data principals immediately upon breach discovery.`
  },
  {
    question: "Why is Message Authentication Code (HMAC) verification preferred over simple CRC32 checksums when safeguarding data Integrity against malicious tampering?",
    shortAnswer: "CRC32 is non-cryptographic and can be trivially recalculated by an attacker; HMAC requires a secret cryptographic key known only to authorized parties.",
    explanation: "Checksums like CRC32 or Adler32 are designed solely for detecting accidental network bit errors (noise). If an active Man-in-the-Middle attacker alters a transaction payload from 'Send ₹500' to 'Send ₹5,00,000', they can easily compute and replace the CRC32 checksum. In contrast, HMAC-SHA256 incorporates a secret symmetric key `HMAC = Hash(Key XOR opad || Hash(Key XOR ipad || Message))`. Without knowledge of the secret key, the attacker cannot forge a valid MAC.",
    hint: "Distinguish between detecting accidental transmission noise vs. detecting intentional adversarial tampering.",
    level: "moderate",
    codeExample: `// Insecure Checksum vs. Secure HMAC:
// INSECURE: Attacker modifies payload and recalculates CRC32
new_crc = crc32("Send ₹5,00,000 to Attacker"); // Passes verification!

// SECURE: Attacker cannot sign without secret_server_key
valid_mac = hmac_sha256("Send ₹5,00,000 to Attacker", secret_server_key); // Verification fails!`
  },
  {
    question: "In the 2017 Equifax breach, how did the lack of egress filtering contribute directly to the scale of the Confidentiality compromise?",
    shortAnswer: "Database servers were permitted to establish unrestricted outbound internet connections, allowing attackers to stream exfiltrated data to external command-and-control servers.",
    explanation: "Egress filtering restricts outbound traffic from internal subnets to only explicitly authorized destinations. In a secure architecture, database servers holding sensitive PII must never have direct outbound internet routing. At Equifax, compromised servers were able to initiate outbound HTTP/FTP connections to foreign IP addresses for over two months because firewall rules permitted unrestricted outbound traffic on common ports.",
    hint: "Think about why internal database servers should be blocked from initiating outbound connections to the public internet.",
    level: "expert",
    codeExample: `// Recommended Egress Firewall Rule for DB Subnet:
iptables -A OUTPUT -s 10.0.5.0/24 -d 10.0.0.0/16 -j ACCEPT # Allow internal VPC only
iptables -A OUTPUT -s 10.0.5.0/24 -j DROP                   # Block all public outbound internet`
  },
  {
    question: "What lesson regarding Availability did cloud engineers learn from the 2020 AWS US-East-1 Kinesis outage?",
    shortAnswer: "Tight internal microservice coupling causes cascade failures where core monitoring and management planes collapse along with application data planes.",
    explanation: "In November 2020, adding minor capacity to the Kinesis data streaming service in the `us-east-1` region exceeded the maximum operating thread limit in internal front-end servers. This caused Kinesis to fail. Because critical AWS internal management services (including CloudWatch alarms, Cognito authentication, and container autoscaling) depended internally on Kinesis, the entire region experienced a massive cascading failure. The lesson: decouple management/telemetry planes from runtime data planes.",
    hint: "Analyze how hidden circular dependencies between internal monitoring services and core infrastructure amplify outages.",
    level: "expert",
    codeExample: `// Cascade Dependency Anti-Pattern:
[ Capacity Change in Kinesis ] 
  --> [ Front-End OS Thread Exhaustion ] 
    --> [ CloudWatch Telemetry Fails ] 
      --> [ Autoscaling & Cognito Fail ] 
        --> [ Third-Party Websites Across North America Go Down ]`
  },
  {
    question: "How did the 2013 Yahoo data breaches (compromising 3 billion accounts) demonstrate the catastrophic risk of outdated cryptographic hashing algorithms?",
    shortAnswer: "Yahoo stored user passwords using outdated MD5 hashes without unique salts, allowing attackers to instantly crack them using precomputed rainbow tables.",
    explanation: "When attackers breached Yahoo's user databases in 2013-2014, they obtained account credentials hashed with MD5 and SHA-1. Because MD5 is computationally trivial to compute on modern GPUs and Yahoo lacked strong unique salts, attackers cracked billions of passwords in days using precomputed rainbow tables and dictionary attacks. Modern standards mandate memory-hard Key Derivation Functions (KDFs) like Argon2id or bcrypt with high work factors.",
    hint: "Recall why fast non-salted hashes like MD5 fail completely against modern GPU cracking.",
    level: "basic",
    codeExample: `// Vulnerable Legacy MD5 vs Modern Argon2id:
// INSECURE:
String hash = md5("studentPassword123"); // Cracked in < 1 millisecond on RTX 4090

// SECURE:
String secureHash = Argon2id.hash("studentPassword123", salt, timeCost=3, memoryCost=65536, parallelism=4);`
  },
  {
    question: "What is a 'Split-Brain' scenario in high-availability database clusters, and which CIA pillar is directly threatened if it occurs?",
    shortAnswer: "A network partition isolating cluster nodes where two replicas simultaneously elect themselves as primary writer, directly threatening data Integrity.",
    explanation: "In distributed database clusters (e.g., PostgreSQL or MySQL Multi-Master), high availability is achieved through node consensus (Raft or Paxos). If a network failure severs communication between two data centers, both halves may believe the other has crashed. If both nodes promote themselves to active master and accept writes, concurrent conflicting transactions are recorded. When the network heals, reconciling divergent data is nearly impossible, causing severe data Integrity corruption.",
    hint: "Think about what happens when two separated database nodes both accept contradictory writes at the same time.",
    level: "expert",
    codeExample: `// Quorum Consensus Formula (Prevents Split-Brain):
Quorum = floor(Total_Nodes / 2) + 1
// In a 3-node cluster, a partitioned node with only 1 vote cannot write:
// 1 < 2 -> Must step down to Read-Only mode to preserve Integrity.`
  },
  {
    question: "How did the Capital One cloud data breach (2019) exploit a Server-Side Request Forgery (SSRF) flaw to violate Confidentiality?",
    shortAnswer: "The attacker sent crafted requests through a misconfigured open-source WAF to query the AWS EC2 Instance Metadata Service (IMDSv1), stealing IAM administrative credentials.",
    explanation: "A former cloud engineer exploited an SSRF vulnerability in Capital One's ModSecurity WAF running on AWS EC2. By tricking the WAF into sending an HTTP GET request to `http://169.254.169.254/latest/meta-data/iam/security-credentials/`, the attacker retrieved temporary IAM role credentials assigned to the EC2 instance. The attacker used these over-privileged credentials to sync and download 700+ S3 buckets containing 106 million customer credit card applications (Confidentiality compromise).",
    hint: "Understand how querying the local link-local metadata address 169.254.169.254 retrieves instance IAM tokens.",
    level: "expert",
    codeExample: `// Exploitation of IMDSv1 via SSRF:
GET /proxy?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/WAF-Role
// Response returns temporary AccessKeyId, SecretAccessKey, and SessionToken.
// AWS remediated this by introducing IMDSv2 requiring PUT session tokens.`
  },
  {
    question: "Why is 'Zero Trust Architecture' (ZTA) inherently designed to mitigate the blast radius of lateral movement case studies like Target and Equifax?",
    shortAnswer: "ZTA eliminates implicit trust based on network location, enforcing continuous authentication, least privilege access, and strict micro-segmentation for every request.",
    explanation: "Traditional perimeter security operates on the 'castle-and-moat' model (once inside the corporate network or VPN, a user or device is implicitly trusted). ZTA enforces the core mantra: 'Never Trust, Always Verify'. Even if an attacker gains initial access through an HVAC portal or unpatched web app, micro-segmentation, mutual TLS (mTLS), and continuous context-aware authorization prevent them from accessing database or POS networks without explicit, evaluated credentials.",
    hint: "Focus on how assuming breach and eliminating internal implicit trust confines attackers to a single micro-segment.",
    level: "moderate",
    codeExample: `// Zero Trust Request Evaluation Rule:
if (Request.has_valid_mTLS_cert() && 
    User.is_authenticated_with_FIDO2() && 
    Device.is_compliant_and_healthy() && 
    RBAC.has_explicit_permission(User, Resource)) {
    Grant_Ephemeral_Access();
} else {
    Deny_And_Alert_SOC();
}`
  },
  {
    question: "What role does an 'Immutable Audit Log' play in maintaining and proving data Integrity after an enterprise security incident?",
    shortAnswer: "It writes log entries to Write-Once-Read-Many (WORM) storage with cryptographic hash chains, ensuring attackers cannot tamper with or delete forensic evidence.",
    explanation: "When sophisticated attackers compromise root privileges, one of their first actions during Phase 5 (Covering Tracks) is deleting `/var/log/auth.log` or clearing Windows Security Event logs. An immutable logging architecture forwards logs in real time to dedicated WORM storage (e.g., AWS S3 Object Lock in Compliance Mode or append-only SIEM). Each log entry contains a cryptographic hash of the previous record, making retrospective alteration detectable during forensic audits.",
    hint: "Think about how write-once storage and hash chains prevent attackers from rewriting system event history.",
    level: "moderate",
    codeExample: `// Cryptographic Hash-Chained Audit Record:
struct LogRecord {
    uint64_t timestamp;
    char event_data[256];
    char prev_record_hash[64]; // SHA-256 of preceding entry
    char current_hash[64];     // SHA-256(timestamp + event_data + prev_record_hash)
};`
  },
  {
    question: "In the 2016 Bangladesh Bank heist ($81 Million), how did attackers breach Integrity to manipulate SWIFT financial transactions?",
    shortAnswer: "They injected custom malware into the SWIFT Alliance Access server to intercept and modify payment confirmation PDF prints and database records.",
    explanation: "Attackers compromised Bangladesh Bank's internal network via unmanaged second-hand switches lacking VLANs. They acquired valid SWIFT credentials to dispatch 35 fraudulent transfer orders totaling $951 million to the Federal Reserve Bank of New York. To delay discovery, they deployed the 'Evotroll' malware into the SWIFT Alliance Access terminal, altering the local printer database and intercepting confirmation messages (Integrity sabotage) so bank officials didn't see the debit notifications until the next business week.",
    hint: "Analyze how altering confirmation receipts and printer spools concealed massive fraudulent wire transfers.",
    level: "expert",
    codeExample: `// Evotroll SWIFT Interception Logic:
void Intercept_SWIFT_PDF_Print() {
    if (Contains_Fraudulent_Transaction_ID(buffer)) {
        Suppress_Printing(); // Prevent physical printer from alerting accountants
        Alter_Database_Balance_Record(); // Spoof normal ledger balance
    }
}`
  },
  {
    question: "How does the implementation of 'Chaos Engineering' (e.g., Netflix Chaos Monkey) proactively validate Availability against real-world infrastructure failures?",
    shortAnswer: "By intentionally and randomly terminating production instances and simulating network partitions to verify automated self-healing and zero-downtime failover.",
    explanation: "Chaos Engineering moves resilience testing from theoretical disaster recovery plans to continuous active verification. Tools like Chaos Monkey or AWS Fault Injection Simulator randomly kill virtual machines, inject 500ms network latency, or sever database replicas in production during business hours. This forces engineering teams to build automated circuit breakers, graceful degradation, and stateless auto-scaling that guarantee high Availability under actual duress.",
    hint: "Think about building resilience by deliberately breaking production components under controlled supervision.",
    level: "moderate",
    codeExample: `// Chaos Engineering Resilience Test:
Scenario: Kill 30% of Kolkata Region Payment Microservices
Expected Result: Latency spikes by < 100ms; BGP Anycast routes 100% of new traffic to Mumbai Region; Zero dropped transactions.`
  },
  {
    question: "What is the security significance of the 'Principle of Least Privilege' (PoLP) in preventing massive Confidentiality exfiltrations?",
    shortAnswer: "It restricts every user, service, and application to only the minimum resources and permissions necessary to execute their specific job function.",
    explanation: "In many landmark breaches (including Capital One and Target), compromised service accounts or third-party vendors held sweeping read/write permissions across entire cloud environments. If a web application account only needs to read product catalog descriptions, it must not be granted SELECT privileges on customer payment tables. PoLP ensures that if an individual component is compromised, the attacker's blast radius is strictly confined.",
    hint: "Recall that giving applications more database permissions than strictly required amplifies breach damages.",
    level: "basic",
    codeExample: `// Over-Privileged vs Least-Privilege IAM Policy:
// DANGEROUS:
{ "Action": "s3:*", "Resource": "*" }

// SECURE (Least Privilege):
{ "Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::college-syllabus-public/*" }`
  },
  {
    question: "How do cryptographic Canary Tokens act as an early detection tripwire for unauthorized Confidentiality breaches in enterprise file systems?",
    shortAnswer: "Canary tokens are fake, highly enticing documents or credentials that immediately alert the SOC with IP and geolocation data whenever opened or accessed.",
    explanation: "Canary tokens operate on deception technology principles. Security teams plant a fake spreadsheet titled 'Q3_Executive_Salaries.xlsx' or AWS API keys in internal network shares. Legitimate employees have no reason to access them. If an external attacker compromises the network and opens the file or uses the key, the embedded web beacon triggers an instant high-priority alert to the Security Operations Center (SOC) along with the attacker's source IP and workstation details.",
    hint: "Think of an invisible dye-pack inside a decoy bank money bag that triggers an alarm upon movement.",
    level: "moderate",
    codeExample: `// Canary Token Web Beacon Concept:
// Embedded inside decoy Word Document:
<w:drawing>
  <wp:inline>
    <a:graphic>
      <a:graphicData>
        <img src="https://canary.tokens.org/generate/trace?id=KOLKATA_FINTECH_ALERT_01" />
      </a:graphicData>
    </a:graphic>
  </wp:inline>
</w:drawing>`
  },
  {
    question: "Synthesizing the lessons of Equifax, Stuxnet, Dyn, and Target: what is the fundamental golden rule for modern cyber security architects?",
    shortAnswer: "Security is a living, multi-layered discipline where assuming breach, continuous validation, automated patching, and least privilege must align with business usability.",
    explanation: "Case studies prove that no single technology or perimeter wall provides permanent security. Organizations fail when they neglect basic hygiene (patching, certificate renewals, MFA), treat security as a one-time checklist, isolate IT from physical operational realities, or build architectures so painful that users bypass them. Modern security architects design resilient systems that maintain Confidentiality, Integrity, and Availability by assuming compromise, enforcing zero trust, automating defenses, and empowering users with frictionless tools.",
    hint: "Conclude by recognizing that robust cyber security combines technical rigor, continuous auditing, and human-centric design.",
    level: "expert",
    codeExample: `// Golden Rule Matrix:
1. Assume Breach (Zero Trust & Micro-segmentation)
2. Verify Continuously (mTLS, Hash Chains & Immutable Logs)
3. Design for Failure (High Availability, Multi-Region & Chaos Engineering)
4. Empower Humans (Frictionless Passkeys & Clear Security Culture)`
  }
];

export default questions;
