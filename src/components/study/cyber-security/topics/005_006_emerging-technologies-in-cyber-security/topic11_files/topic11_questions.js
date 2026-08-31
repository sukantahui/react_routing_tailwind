const questions = [
  {
    id: 1,
    question: "What is Zero Trust Architecture (NIST SP 800-207) and what are its two foundational guiding principles?",
    shortAnswer: "Zero Trust is an enterprise cybersecurity architecture that eliminates implicit trust based on network location. Its two foundational principles are: 1. 'Never Trust, Always Verify' (Every request, user, and device must be dynamically authenticated and authorized on a per-session basis); 2. 'Assume Breach' (Operate under the assumption that adversaries already possess internal network access).",
    explanation: "Zero Trust abandons the obsolete castle-and-moat model in favor of continuous, micro-segmented verification.",
    hint: "Never Trust, Always Verify, and Assume Breach; eliminates implicit trust based on network location.",
    level: "Basic",
    codeExample: `// Zero Trust Philosophy:
// Legacy Perimeter : Inside Office LAN = Fully Trusted ❌
// Zero Trust       : Inside Office LAN = As Hostile as Public Starbucks Wi-Fi ✔`
  },
  {
    id: 2,
    question: "Explain the roles of the Policy Decision Point (PDP) and Policy Enforcement Point (PEP) in NIST SP 800-207.",
    shortAnswer: "1. Policy Decision Point (PDP): The control plane brain comprising the Policy Engine (PE - evaluates risk algorithms and decides access) and Policy Administrator (PA - generates ephemeral tokens and commands PEPs). 2. Policy Enforcement Point (PEP): The data plane proxy/gateway that sits in the communication path between Subject and Resource, intercepting traffic and enforcing the PDP's access instructions.",
    explanation: "Decoupling the control plane (PDP) from the data plane (PEP) enables centralized policy governance across global infrastructure.",
    hint: "PDP makes the access decision (Control Plane); PEP enforces the decision by opening/closing the gate (Data Plane).",
    level: "Basic",
    codeExample: `// NIST SP 800-207 Data Flow:
// [Subject] ➔ Requests Access ➔ [PEP (Proxy)] ◄- Commands ◄- [PDP (PE + PA)]
//                                     │
//                                     └─── Granted ➔ [Resource]`
  },
  {
    id: 3,
    question: "What are the Seven Tenets of Zero Trust defined in NIST SP 800-207 Section 2.1?",
    shortAnswer: "1. All data and computing services are resources; 2. All communications are secured regardless of network location; 3. Access is granted on a per-session basis; 4. Access is determined by dynamic contextual policy; 5. Enterprise continuously monitors asset health; 6. Authentication and authorization are dynamic before access; 7. Enterprise collects continuous telemetry to improve security posture.",
    explanation: "These 7 tenets form the mandatory compliance criteria for federal and enterprise Zero Trust deployments.",
    hint: "7 tenets covering resources, location-agnostic security, per-session access, dynamic policy, asset monitoring, and telemetry.",
    level: "Moderate",
    codeExample: `// Tenet Summary:
// Per-session access + Dynamic Policy + Continuous Device Telemetry + Encrypted mTLS everywhere.`
  },
  {
    id: 4,
    question: "What is Micro-Segmentation and how does it prevent Lateral Movement during a ransomware attack?",
    shortAnswer: "Micro-segmentation divides networks into granular, isolated zones down to individual workloads, microservices, and containers. Traffic between zones must pass through layer-7 security gateways enforcing strict mutual TLS and least-privilege ACLs. If an attacker compromises one workstation, they cannot scan, probe, or spread laterally to adjacent database servers.",
    explanation: "Micro-segmentation restricts the blast radius of a security breach to a single isolated endpoint.",
    hint: "Isolating network workloads into granular micro-zones so an attacker cannot spread to other servers.",
    level: "Basic",
    codeExample: `// Micro-Segmentation Rule:
// Workstation_A can ONLY talk to Port 443 on Web_Server_1. All East-West traffic to Accounting_DB is DROPPED 🛡️`
  },
  {
    id: 5,
    question: "What is a Software-Defined Perimeter (SDP) / 'Dark Cloud' architecture?",
    shortAnswer: "SDP renders enterprise applications and internal databases invisible to the public internet ('Dark Cloud') by dropping all inbound ICMP and port scans ($0.0.0.0:0$). Applications have zero listening ports and become accessible only after a client completes pre-authentication against an SDP controller, which establishes an ephemeral, encrypted outbound tunnel.",
    explanation: "SDP eliminates automated port scanning and zero-day probing of internal servers.",
    hint: "Hiding internal servers so they have no open listening ports, accessible only via authenticated outbound tunnels.",
    level: "Moderate",
    codeExample: `// SDP Architecture:
// Internet Scan: Nmap reports "0 Open Ports" (Invisible)
// Authenticated Client ➔ Controller verifies FIDO2 + EDR ➔ Dynamically punches ephemeral mTLS tunnel.`
  },
  {
    id: 6,
    question: "What is Continuous Adaptive Trust (Continuous Access Evaluation - CAE) and how does it differ from static login checks?",
    shortAnswer: "Static IAM authenticates a user once at 9:00 AM and issues an 8-hour token, remaining blind to subsequent compromises. Continuous Adaptive Trust recalculates risk dynamically on every API request based on live telemetry (EDR health, geovelocity, behavior). If a user disables EDR or impossible travel occurs at 11:30 AM, access is revoked INSTANTLY mid-session.",
    explanation: "Continuous evaluation closes the vulnerability gap where valid sessions are hijacked.",
    hint: "Evaluates risk continuously on every request, revoking sessions mid-flight if risk spikes.",
    level: "Moderate",
    codeExample: `// CAE Revocation Event:
// 11:15 AM: User initiates ransomware encryption → CrowdStrike EDR triggers alert → PDP revokes token in 250ms!`
  },
  {
    id: 7,
    question: "What is Device Posture Assessment in Zero Trust dynamic authorization?",
    shortAnswer: "Validating that the client endpoint meets strict health requirements before granting access: checking that OS security patches are current, disk encryption (BitLocker/FileVault) is active, EDR agent is running with latest signatures, firewall is enabled, and no jailbreak/root indicators exist.",
    explanation: "A valid user logging in from an infected, unpatched personal device is automatically blocked.",
    hint: "Checking that OS is patched, BitLocker is active, and EDR agent is running before granting access.",
    level: "Basic",
    codeExample: `// Device Posture Check:
// IF (os_patch_age < 30_days && edr_running == True && disk_encrypted == True) ➔ PERMIT, ELSE ➔ DENY`
  },
  {
    id: 8,
    question: "What is the Principle of Least Privilege (PoLP) and Just-In-Time (JIT) access in Zero Trust?",
    shortAnswer: "PoLP restricts user and service permissions strictly to the minimal set of resources required for their job role. Just-In-Time (JIT) access eliminates permanent standing administrative privileges; engineers request temporary elevation (e.g., 60 minutes) for a specific maintenance ticket, which expires automatically.",
    explanation: "JIT access prevents compromised administrator credentials from granting 24/7 unlimited access.",
    hint: "Granting minimal permissions strictly when needed for a limited time, eliminating permanent admin rights.",
    level: "Basic",
    codeExample: `// JIT Elevation:
// Engineer requests access to DB-Core ➔ Manager approves ➔ 60-Minute Ephemeral Role Granted ➔ Auto-Revoked at 15:00`
  },
  {
    id: 9,
    question: "How does Mutual TLS (mTLS) provide Cryptographic Identity for Service-to-Service Zero Trust communication (e.g., in Istio / Service Mesh)?",
    shortAnswer: "In mTLS, BOTH the client microservice and the server microservice present X.509 cryptographic certificates issued by a trusted internal CA (e.g., SPIFFE/SPIRE). They mutually authenticate each other's cryptographic identity and establish an encrypted session, preventing spoofing and eavesdropping on internal networks.",
    explanation: "mTLS provides strong, verifiable identity for ephemeral cloud microservices and containers.",
    hint: "Both client and server present X.509 certificates to authenticate each other and encrypt traffic.",
    level: "Moderate",
    codeExample: `// Istio mTLS Handshake:
// Frontend-Pod [Cert: spiffe://cluster/ns/prod/sa/frontend] <---(mTLS)---> Backend-Pod [Cert: spiffe://cluster/ns/prod/sa/backend]`
  },
  {
    id: 10,
    question: "What is SPIFFE (Secure Production Identity Framework for Everyone) and SPIRE in cloud Zero Trust?",
    shortAnswer: "SPIFFE is an open standard that defines a uniform cryptographic identity format (SPIFFE ID: `spiffe://domain/ns/prod/sa/app`) and Verifiable Identity Documents (SVIDs) for workloads. SPIRE is the open-source production software that automatically issues, rotates, and manages ephemeral X.509 SVID certificates for containers.",
    explanation: "SPIFFE/SPIRE provides cryptographically verifiable zero-trust workload identity without hardcoded API keys.",
    hint: "Open standard (SPIFFE) and software (SPIRE) for issuing ephemeral X.509 cryptographic identities to containers.",
    level: "Expert",
    codeExample: `// SPIFFE ID URI:
// spiffe://barrackpore.gov.in/ns/treasury/sa/disbursement-service`
  },
  {
    id: 11,
    question: "What is the difference between ZTNA 1.0 (Coarse-Grained) and ZTNA 2.0 (Continuous Fine-Grained)?",
    shortAnswer: "ZTNA 1.0 checks user identity and device posture ONLY at the initial connection, granting broad IP/port access. ZTNA 2.0 provides continuous deep packet inspection at Layer 7 across the entire session, enforcing per-transaction authorization, data loss prevention (DLP), and sub-second automated threat revocation.",
    explanation: "ZTNA 2.0 unifies continuous trust evaluation with inline threat prevention.",
    hint: "ZTNA 1.0 checks once at login; ZTNA 2.0 inspects every transaction continuously at Layer 7.",
    level: "Moderate",
    codeExample: `// ZTNA Comparison:
// ZTNA 1.0 : Authenticates at 9:00 AM → Allows all TCP traffic on port 443
// ZTNA 2.0 : Inspects every HTTP POST, runs DLP on file uploads, revokes session instantly if malicious.`
  },
  {
    id: 12,
    question: "What is Identity-Centric Segmentation vs Network-Centric Segmentation?",
    shortAnswer: "Network-centric segmentation uses static IP addresses, subnets, and VLANs, which break down in dynamic cloud and multi-cloud environments. Identity-centric segmentation writes access rules based on cryptographically verified identities, user roles, device tags, and application attributes regardless of underlying IP addresses.",
    explanation: "Identity segmentation persists seamlessly when workloads migrate between on-premises and AWS/Azure.",
    hint: "Rules based on cryptographic user and workload identities rather than brittle, changing IP subnets.",
    level: "Moderate",
    codeExample: `// Identity-Centric Rule:
// ALLOW: App:PaymentGateway WHERE Role='FINANCE_LEAD' AND Device.Health='COMPLIANT' (IP-Agnostic ✔)`
  },
  {
    id: 13,
    question: "How does Zero Trust integrate with SASE (Secure Access Service Edge)?",
    shortAnswer: "SASE converges software-defined wide area networking (SD-WAN) and comprehensive cloud security services (ZTNA, Cloud Access Security Broker - CASB, Secure Web Gateway - SWG, Firewall-as-a-Service - FWaaS) into a unified, globally distributed cloud edge, enforcing Zero Trust at every point of presence.",
    explanation: "SASE brings the Policy Enforcement Point (PEP) closer to remote workers globally.",
    hint: "Converges SD-WAN networking with cloud security (ZTNA, CASB, SWG) into a single cloud edge platform.",
    level: "Basic",
    codeExample: `// SASE Architecture:
// [Remote Worker] ➔ Connects to Nearest SASE Cloud POP ➔ Evaluates ZTNA Policy ➔ Connects to SaaS / Data Center`
  },
  {
    id: 14,
    question: "What is Data-Centric Security in the Zero Trust Data Pillar?",
    shortAnswer: "Protecting sensitive information directly at the data layer through automated data discovery, classification (Confidential/Secret), dynamic field-level encryption, role-based masking, and Digital Rights Management (DRM) so that even if a database file is exfiltrated, the raw contents remain unreadable ciphertext.",
    explanation: "Data security ensures stolen files are useless without authorized cryptographic keys.",
    hint: "Encrypting, classifying, and masking data directly so stolen database files remain unreadable.",
    level: "Moderate",
    codeExample: `// Dynamic Field Masking:
// Treasury Clerk sees: "Aadhaar: XXXX-XXXX-4912"
// Database Admin sees: "Aadhaar: 8942-1082-4912"`
  },
  {
    id: 15,
    question: "What is Risk-Adaptive Step-Up Authentication in Zero Trust gateways?",
    shortAnswer: "A dynamic policy where users performing low-risk routine tasks (viewing public memos) authenticate with standard credentials, but attempting high-risk actions (modifying bank routing numbers or downloading ₹50,00,000 disbursement contracts) triggers an immediate step-up prompt for a physical FIDO2 hardware passkey.",
    explanation: "Step-up authentication minimizes user friction while maximizing security on sensitive transactions.",
    hint: "Triggering a hardware key biometric prompt only when attempting high-risk sensitive transactions.",
    level: "Basic",
    codeExample: `// Step-Up Policy:
// Action: Download Tax Receipts ➔ Granted
// Action: Wire Transfer > ₹1,00,000 ➔ Prompts: "Tap physical YubiKey to confirm high-value disbursement"`
  },
  {
    id: 16,
    question: "What is the role of Threat Intelligence Feeds in NIST SP 800-207 Policy Engines?",
    shortAnswer: "Threat intelligence feeds continuously supply the Policy Engine (PE) with real-time blacklists of known malicious IP addresses, tor exit nodes, bulletproof hosting ASNs, and active botnet C2 domains, allowing the PDP to reject access requests originating from compromised infrastructure immediately.",
    explanation: "Threat intelligence ensures policy decisions adapt dynamically to active global adversary campaigns.",
    hint: "Supplies real-time malicious IP and botnet feeds to help the PDP block dangerous connections instantly.",
    level: "Moderate",
    codeExample: `// Threat Feed Integration:
// Request from IP 198.51.100.22 → Threat Feed Match: "Cobalt Strike C2" → PDP Decision: REJECT & LOG ALERT 🚨`
  },
  {
    id: 17,
    question: "What is Context-Aware Access Control in Google BeyondCorp (Zero Trust pioneer)?",
    shortAnswer: "Google's BeyondCorp architecture evaluates five contextual dimensions for every single HTTP request: 1. User Identity (Google Account + Titan Key); 2. Device Identity (Device Certificate + TPM); 3. Device Posture (OS version, disk encryption); 4. Network Context (Geo-location, IP reputation); 5. Resource Sensitivity.",
    explanation: "BeyondCorp demonstrated that removing internal VPNs and enforcing Zero Trust at scale is fully achievable.",
    hint: "Evaluating user identity, device certs, device posture, location, and resource sensitivity for every request.",
    level: "Moderate",
    codeExample: `// BeyondCorp Context Evaluation:
// Access(User=Susmita, Device=ManagedMacBook, Loc=Barrackpore, Resource=TreasuryCore) ➔ GRANTED ✔`
  },
  {
    id: 18,
    question: "What is Shadow IT Discovery and Cloud Access Security Broker (CASB) in Zero Trust governance?",
    shortAnswer: "CASB sits between cloud users and cloud applications, monitoring network traffic to discover unauthorized cloud SaaS services used by employees (Shadow IT), enforcing data loss prevention (DLP) rules, blocking malware uploads, and revoking unapproved file shares.",
    explanation: "CASB extends Zero Trust visibility into third-party cloud SaaS environments (Dropbox, ChatGPT, Office 365).",
    hint: "Monitors and secures cloud SaaS usage, discovering Shadow IT and enforcing data loss prevention rules.",
    level: "Basic",
    codeExample: `// CASB Rule:
// Employee uploads confidential PDF to personal Google Drive ➔ CASB intercepts, blocks upload, logs violation.`
  },
  {
    id: 19,
    question: "What is Policy As Code (PaC) using Open Policy Agent (OPA / Rego) in Zero Trust automation?",
    shortAnswer: "Expressing security and authorization rules in declarative code (Rego language). OPA decouples policy logic from application code; when an API request arrives, the application queries OPA (`POST /v1/data/authz`), which evaluates the Rego rules and JSON context in under 1 millisecond.",
    explanation: "Policy-as-Code enables version-controlled, automated, and auditable security governance across microservices.",
    hint: "Writing declarative authorization rules in code (Rego) that are evaluated in under 1ms by Open Policy Agent.",
    level: "Expert",
    codeExample: `// OPA Rego Rule:
// default allow = false
// allow { input.user.role == "TREASURY_OFFICER"; input.device.edr_active == true; input.request.method == "GET" }`
  },
  {
    id: 20,
    question: "How does Zero Trust mitigate Supply Chain and Third-Party Vendor Risks?",
    shortAnswer: "Instead of granting external contractors full network-level VPN access to the corporate intranet, Zero Trust provisions ephemeral, isolated ZTNA tunnels that grant access strictly to a single specific internal web application or database with session recording and mandatory FIDO2 authentication.",
    explanation: "Contractors can never access or probe adjacent internal subnets, neutralizing third-party breach paths.",
    hint: "Grants vendors access strictly to a single specific application rather than full corporate network VPNs.",
    level: "Basic",
    codeExample: `// Vendor Access Scope:
// Legacy VPN : Contractor laptop on corporate VLAN (Can ping all 500 internal servers ❌)
// Zero Trust : Contractor can access ONLY https://vendor.treasury.gov.in (All other servers hidden ✔)`
  },
  {
    id: 21,
    question: "What is Break-Glass Access / Emergency Access Procedure in Zero Trust IAM?",
    shortAnswer: "A hardened, highly audited emergency account (held in an offline physical vault with dual-custody approval) used to regain control of enterprise systems during a catastrophic failure (e.g., identity provider outage or network split). Activating break-glass access triggers immediate high-priority alerts to the entire executive leadership team.",
    explanation: "Break-glass accounts guarantee business continuity without compromising day-to-day zero-trust controls.",
    hint: "Emergency accounts stored in physical vaults used during catastrophic outages, triggering executive alerts upon use.",
    level: "Moderate",
    codeExample: `// Break-Glass Trigger:
// Emergency Login: 'admin_breakglass_01' ➔ Sends emergency SMS/Email to CISO + Starts video session recording.`
  },
  {
    id: 22,
    question: "What is Network Access Control (NAC / 802.1X) in campus Zero Trust LANs?",
    shortAnswer: "An authentication protocol that requires any physical device plugging an Ethernet cable into an office wall jack (or connecting to corporate Wi-Fi) to authenticate using an X.509 certificate via RADIUS/EAP before the switch port assigns an IP address or grants network connectivity.",
    explanation: "NAC prevents rogue laptops or drop-boxes from gaining access to physical office network ports.",
    hint: "Requires devices plugging into office wall jacks or Wi-Fi to authenticate via certificates before getting an IP.",
    level: "Moderate",
    codeExample: `// 802.1X Switch Port:
// Rogue laptop plugs in → No X.509 cert → Switch port stays disabled (Status: UNMANAGED / BLOCKED 🛡️)`
  },
  {
    id: 23,
    question: "What is Attribute-Based Access Control (ABAC) and how does it advance beyond Role-Based Access Control (RBAC) in Zero Trust Policy Engines?",
    shortAnswer: "RBAC makes static decisions based solely on user roles (e.g., 'Manager'). ABAC evaluates dynamic Boolean logic across four attribute categories: Subject attributes (role, department), Resource attributes (sensitivity, owner), Action attributes (read, transfer), and Environment attributes (time, IP, geovelocity, device health).",
    explanation: "ABAC allows fine-grained rules like 'Managers can approve wires > ₹10,00,000 only during office hours from managed laptops in India'.",
    hint: "Evaluates subject, resource, action, and environment attributes dynamically rather than relying on static roles.",
    level: "Moderate",
    codeExample: `// ABAC Decision Rule:
// Permit IF (Subject.Role == 'Officer' AND Resource.Clearance == 'Secret' AND Env.Time in [09:00, 18:00] AND Device.EDR == True)`
  },
  {
    id: 24,
    question: "What is Session Invalidation Propagation across federated cloud SaaS applications (OpenID Shared Signals and Events - SSE / CAEP)?",
    shortAnswer: "When an on-premises EDR detects malware on a laptop, the Identity Provider sends an OpenID Shared Signals and Events (SSE) webhook to all connected cloud applications (Salesforce, Slack, Google Workspace, GitHub), terminating active session tokens across all cloud apps in under 1 second.",
    explanation: "CAEP ensures compromised sessions are killed everywhere simultaneously across multi-cloud environments.",
    hint: "Webhooks that propagate instant session revocation across all connected cloud SaaS apps simultaneously.",
    level: "Expert",
    codeExample: `// OpenID CAEP Event:
// POST https://api.slack.com/caep/events → { "event_type": "session-revoked", "subject": "susmita@bank.in" }`
  },
  {
    id: 25,
    question: "What is Immutable Administrative Audit Logging in Zero Trust Governance?",
    shortAnswer: "Every policy change in the Policy Decision Point (PDP), access grant, denial, and administrator action is digitally signed and written to write-once-read-many (WORM) storage or an immutable blockchain ledger, guaranteeing tamper-proof non-repudiation for regulatory audits.",
    explanation: "Immutable audit logging ensures compromised administrators cannot erase evidence of unauthorized policy tampering.",
    hint: "Digitally signing and storing all policy changes and access logs on write-once or blockchain storage.",
    level: "Basic",
    codeExample: `// Audit Log Entry:
// { "timestamp": "2026-08-23T14:00:00Z", "action": "POLICY_UPDATE", "admin": "debangshu", "hash": "0x7f8a..." }`
  },
  {
    id: 26,
    question: "What is the 'Assume Breach' mindset in designing Zero Trust Network Topologies?",
    shortAnswer: "Designing every server, database, and API under the premise that the perimeter has already been penetrated and malicious actors or compromised hosts exist on the local network. Consequently, all communications are encrypted, all ports default-denied, and every request requires full authentication.",
    explanation: "Assume breach forces architects to implement defense-in-depth at every layer rather than trusting perimeter firewalls.",
    hint: "Assuming attackers are already inside the network, requiring full encryption and authentication for all internal traffic.",
    level: "Basic",
    codeExample: `// Assume Breach Rule:
// Web Server and Database sit in the same rack → Still communicate ONLY over encrypted mutual TLS with strict token auth!`
  },
  {
    id: 27,
    question: "What is Zero Trust Network Access (ZTNA) vs Legacy Corporate Virtual Private Networks (VPNs)?",
    shortAnswer: "Legacy VPNs grant wide network-level access to entire internal subnets upon authentication (allowing lateral probing). ZTNA grants application-specific access through an encrypted micro-tunnel to ONLY the single requested application, keeping the rest of the corporate network completely invisible.",
    explanation: "ZTNA replaces brittle perimeter VPNs with granular, identity-verified application proxy tunnels.",
    hint: "VPN gives access to entire subnets; ZTNA gives access strictly to a single specific application.",
    level: "Basic",
    codeExample: `// VPN vs ZTNA:
// Legacy VPN : Connected → Can ping 10.0.0.0/8 (16 Million internal IPs exposed ❌)
// ZTNA       : Connected → Can access ONLY https://treasury.internal:8443 (Zero lateral access ✔)`
  },
  {
    id: 28,
    question: "What is Data Loss Prevention (DLP) inline inspection in Cloud PEP gateways?",
    shortAnswer: "Inline security proxies that perform real-time optical character recognition (OCR) and pattern matching on outbound HTTP/S traffic, detecting and blocking credit card numbers (PCI-DSS), PAN cards, Aadhaar IDs, or confidential source code from leaving the enterprise perimeter.",
    explanation: "Inline DLP prevents rogue insiders or malware from exfiltrating sensitive customer records.",
    hint: "Real-time inspection of outbound traffic to detect and block leaking of Aadhaar, credit cards, or confidential data.",
    level: "Moderate",
    codeExample: `// Inline DLP Match:
// Outbound Payload contains regex '[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}' (Aadhaar) → PEP BLOCKS PACKET & ALERTS 🚨`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury case study, an accounting workstation was infected by a zero-day ransomware dropper. How did the NIST SP 800-207 Zero Trust Architecture contain the outbreak to that single machine?",
    shortAnswer: "1. Micro-Segmentation: The infected workstation's East-West network traffic was blocked by default-deny firewall rules; 2. Invisible Core: The municipal treasury database had no listening ports and was invisible on the subnet; 3. Device Posture Revocation: As soon as the ransomware began rapid file renaming, the EDR agent reported an unhealthy posture to the Policy Engine, which instantly revoked the workstation's access tokens.",
    explanation: "Micro-segmentation and dynamic posture evaluation prevented lateral movement and neutralized the ransomware outbreak instantly.",
    hint: "Micro-segmentation blocked lateral traffic, the database was invisible without ports, and EDR revoked access tokens instantly.",
    level: "Expert",
    codeExample: `// Incident Containment Flow:
// Workstation infected ➔ Attempts SMB scan of 192.168.1.0/24 (DROPPED by micro-segmentation) ➔ EDR alerts PDP ➔ Token REVOKED in 150ms ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical blueprint for an Enterprise NIST SP 800-207 Zero Trust Architecture.",
    shortAnswer: "1. Identity Pillar: Phishing-resistant FIDO2 passkeys + Continuous Access Evaluation (CAE). 2. Device Pillar: Unified Endpoint Management (UEM) + EDR posture health validation. 3. Network Pillar: Micro-segmentation + Software-Defined Perimeter (SDP) with zero public listening ports. 4. Workload Pillar: SPIFFE/SPIRE mutual TLS (mTLS) service mesh for microservices. 5. Control Plane: Centralized Policy Decision Point (PDP) evaluating ABAC rules in under 1ms. 6. Data Pillar: Automated classification, field-level encryption, and inline DLP. 7. Visibility: Continuous SIEM/SOAR telemetry streaming.",
    explanation: "This complete blueprint satisfies all 7 tenets of NIST SP 800-207 and delivers resilient enterprise security across multi-cloud and on-premises infrastructure.",
    hint: "FIDO2 passkeys, EDR posture checks, SDP micro-segmentation, SPIFFE mTLS mesh, centralized PDP, field-level data encryption, and SIEM telemetry.",
    level: "Expert",
    codeExample: `// Enterprise Zero Trust Blueprint:
// [User (FIDO2) + Device (EDR)] ➔ [PEP Gateway (SDP)] ◄- Evaluated by [PDP (ABAC Policy Engine)]
//                                      │
//                                      └─── Granted ➔ [Micro-Segmented Workload (mTLS) ➔ Encrypted Data]`
  }
];

export default questions;
