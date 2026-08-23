// topic9_questions.js
// 30 Comprehensive Questions on Topic 9: Lessons Learned: Patch Management, Zero Trust, and Segmented Networks

const questions = [
  {
    id: 1,
    question: "What are the three fundamental architectural pillars synthesized from the landmark historical cyber attacks?",
    shortAnswer: "1. Automated Risk-Based Patch Management; 2. Zero Trust Architecture (NIST SP 800-207); 3. Strict Network Micro-segmentation (Purdue Model / SDP).",
    explanation: "Analyzing breaches from Stuxnet to Colonial Pipeline reveals that every major catastrophe resulted from failures in one of these three domains: unpatched vulnerabilities (Equifax, WannaCry), unsegmented networks allowing lateral movement (Target, Maersk, Ukraine), or implicit trust on perimeter access (Colonial, SolarWinds).",
    hint: "Patch Management, Zero Trust Architecture, and Network Micro-segmentation.",
    level: "Moderate",
    codeExample: `// The 3-Pillar Defensive Triad:
const enterpriseDefensiveTriad = {
  pillar1: "Automated Risk-Based Patch Management (SCA, SBOM, CISA KEV 24-hr SLAs)",
  pillar2: "Zero Trust Architecture (NIST SP 800-207 - Never Trust, Always Verify, FIDO2 MFA)",
  pillar3: "Network Micro-segmentation (Purdue Model, Host-based East-West packet filtering)"
};`
  },
  {
    id: 2,
    question: "How does modern 'Risk-Based Vulnerability Management' (RBVM) differ from traditional CVSS scoring?",
    shortAnswer: "RBVM prioritizes vulnerabilities based on real-world active exploitation (CISA KEV catalog, EPSS scores) and business asset criticality, rather than relying solely on theoretical CVSS base scores.",
    explanation: "Traditional vulnerability management relied on fixing all CVSS 9.0+ bugs, overwhelming IT teams with thousands of tickets. RBVM utilizes the Exploit Prediction Scoring System (EPSS) and CISA's Known Exploited Vulnerabilities (KEV) catalog, focusing remediation immediately on bugs that weaponized threat actors are actively using in the wild (e.g. MS17-010, CVE-2017-5638).",
    hint: "Prioritizing vulnerabilities actively exploited in the wild (CISA KEV and EPSS).",
    level: "Moderate",
    codeExample: `// RBVM Prioritization Logic:
function calculateRemediationPriority(cve) {
    if (cve.inCisaKevCatalog || cve.epssScore > 0.70) {
        return "EMERGENCY_PATCH_SLA_24_HOURS"; // Active weaponization
    }
    if (cve.cvssScore >= 9.0 && cve.isPublicFacing) {
        return "CRITICAL_PATCH_SLA_7_DAYS";
    }
    return "STANDARD_PATCH_SLA_30_DAYS";
}`
  },
  {
    id: 3,
    question: "What is the core philosophical tenet of 'Zero Trust Architecture' as defined by NIST Special Publication 800-207?",
    shortAnswer: "'Never Trust, Always Verify' — eliminating implicit trust based on physical network location and requiring continuous authentication, authorization, and cryptographic validation for every access request.",
    explanation: "Traditional security operated on a 'castle-and-moat' model (trusting everything inside the corporate LAN). Zero Trust assumes the internal network is already hostile. Every user, device, and application request must prove its identity, device health, and context dynamically before receiving least-privilege access.",
    hint: "Never Trust, Always Verify — eliminating implicit trust based on network location.",
    level: "Moderate",
    codeExample: `// NIST SP 800-207 Zero Trust Equation:
// Access Granted = (Verified Identity + Compliant Device + Valid Context + Least Privilege Scope)`
  },
  {
    id: 4,
    question: "What is 'Software-Defined Micro-segmentation' and how does it prevent the catastrophic lateral traversal seen in Target and Maersk?",
    shortAnswer: "Applying granular, host-based firewall policies at the individual workload/VM level, blocking East-West network traffic between systems in the same subnet.",
    explanation: "In a traditional flat network, an attacker compromising an HVAC server (Target) or an accounting PC (NotPetya) can immediately connect to point-of-sale systems or Domain Controllers on the same VLAN. Micro-segmentation enforces isolated security perimeters around each workload, ensuring that Workload A cannot talk to Workload B unless explicitly whitelisted.",
    hint: "Host-based policies blocking lateral East-West traffic between systems in the same subnet.",
    level: "Moderate",
    codeExample: `// Host-Based Micro-segmentation Policy (Illumio / Guardicore / IPTables):
/*
Workload: POS_Terminal_01 (10.0.5.20)
Allowed Inbound: ONLY POS_Gateway (Port 8443)
Blocked Inbound: ALL other POS terminals on 10.0.5.0/24 (East-West Port 445/3389/22)
Result: Patient Zero cannot infect adjacent cash registers!
*/`
  },
  {
    id: 5,
    question: "How does the 'Purdue Enterprise Reference Architecture' (PERA) structure industrial OT/SCADA network segmentation?",
    shortAnswer: "Divides industrial systems into hierarchical levels (Level 0 physical sensors to Level 4 enterprise IT), strictly separated by an Industrial Demilitarized Zone (IDMZ / Level 3.5).",
    explanation: "The Purdue Model prevents IT malware from reaching physical actuators: Level 0/1 are physical field devices and PLCs; Level 2 are HMIs and supervisory consoles; Level 3 is site operations; Level 3.5 is the IDMZ (data diodes, jump-hosts); Level 4/5 is enterprise corporate IT. No direct IP routing is ever permitted between Level 4 and Level 2.",
    hint: "Hierarchical levels (Level 0-5) separated by an Industrial DMZ (Level 3.5) with no direct routing.",
    level: "Expert",
    codeExample: `// Purdue Model Industrial Hierarchy:
// Level 4/5: Corporate IT & Enterprise ERP (Billing, Email)
// ===== LEVEL 3.5: INDUSTRIAL DMZ (Jump-Boxes, Data Diodes, Reverse Proxies) =====
// Level 3: Site Manufacturing & SCADA Operations
// Level 2: Substation HMIs & Control Room Consoles
// Level 1: Programmable Logic Controllers (PLCs) & Protective Relays
// Level 0: Physical Process (Pumps, Valves, Circuit Breakers, Centrifuges)`
  },
  {
    id: 6,
    question: "What is a 'Zero Trust Network Access' (ZTNA) gateway and why is it replacing legacy corporate VPNs?",
    shortAnswer: "ZTNA provides secure, identity-aware access to specific individual applications rather than granting broad Layer 3 network-level access to the entire corporate subnet.",
    explanation: "When an employee connects via a traditional VPN (as in Colonial Pipeline and Target), they receive an IP address on the internal network and can probe any internal server. ZTNA proxies only the authorized application (e.g. Jira web portal) after verifying device health and FIDO2 MFA, hiding the rest of the corporate network.",
    hint: "Grants access to specific applications only, rather than broad network-level subnet access.",
    level: "Moderate",
    codeExample: `// Legacy VPN vs Zero Trust Network Access (ZTNA):
const remoteAccessComparison = {
  legacyVPN: "Grants full Layer 3 IP connection to entire 10.0.0.0/8 internal subnet (Attacker scans all servers)",
  ztnaGateway: "Brokers encrypted application-level reverse proxy to ONLY app.company.com:443 (Internal network is 100% dark & invisible)"
};`
  },
  {
    id: 7,
    question: "What is a 'Software Bill of Materials' (SBOM) and what standard file formats represent it?",
    shortAnswer: "A nested ingredient list of all third-party and open-source libraries inside an application; standardized in CycloneDX (JSON/XML) and SPDX (Linux Foundation).",
    explanation: "Following Equifax and SolarWinds, organizations mandate SBOMs. An SBOM documents exact package names, version strings, and cryptographic hashes for all dependencies, enabling instant automated queries to identify if a new zero-day (e.g. Log4j, Struts) exists anywhere in enterprise software.",
    hint: "Standardized ingredient lists of software dependencies formatted in CycloneDX or SPDX.",
    level: "Moderate",
    codeExample: `// SPDX SBOM Excerpt (JSON format):
{
  "spdxVersion": "SPDX-2.3",
  "dataLicense": "CC0-1.0",
  "name": "Corporate-Dispute-Portal",
  "packages": [
    {
      "name": "log4j-core",
      "versionInfo": "2.14.1",
      "downloadLocation": "https://repo.maven.apache.org/...",
      "checksums": [{ "algorithm": "SHA256", "checksumValue": "e3b0c442..." }]
    }
  ]
}`
  },
  {
    id: 8,
    question: "What is 'Immutable Infrastructure' and how does it revolutionize patch management in cloud-native environments?",
    shortAnswer: "Servers and containers are never updated in-place; instead, updated golden images are built, tested, and deployed to replace old instances, which are then terminated.",
    explanation: "In traditional IT, administrators SSH into live servers to apply patches, leading to configuration drift and forgotten legacy systems. In immutable infrastructure (using Docker, Kubernetes, Terraform), patches are applied to the base container image in CI/CD, and the orchestration engine executes a rolling replacement of all production pods.",
    hint: "Replacing running instances with freshly patched golden container images rather than in-place patching.",
    level: "Expert",
    codeExample: `// Immutable Rolling Container Update (Kubernetes Deployment):
/*
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: payment-app
        image: registry.internal/payment-app:v2.4.1-patched  # New patched image
*/`
  },
  {
    id: 9,
    question: "What is 'Unidirectional Security Gateway' (Data Diode) and where is it mandatory in critical infrastructure?",
    shortAnswer: "A physical hardware appliance using an LED transmitter and photodiode receiver that physically allows data to travel in only one direction, preventing any inbound cyber attacks.",
    explanation: "Data diodes are deployed between Level 3 (SCADA) and Level 4 (IT). Industrial telemetry and meter logs can flow out to corporate databases via light pulses over fiber optic cables, but it is physically impossible for malware, commands, or hackers to transmit data back into the SCADA network.",
    hint: "A hardware device using light to enforce one-way physical data flow into corporate IT.",
    level: "Expert",
    codeExample: `// Physical Data Diode Architecture:
// SCADA Control Network [LED Transmitter] === Light Pulses (ONE WAY ONLY) ===> [Photodiode Receiver] Corporate IT Network
// (Physical impossibility of reverse packet transmission!)`
  },
  {
    id: 10,
    question: "How does the 'Principle of Least Privilege' (PoLP) apply to cloud IAM roles and service accounts?",
    shortAnswer: "Restricting cloud permissions to the minimum necessary actions, resources, and conditions required for a specific workload to execute its task.",
    explanation: "Adversaries exploit over-privileged service accounts (as in SolarWinds and Equifax). In AWS/Azure/GCP, IAM policies must avoid wildcards (`Action: *`, `Resource: *`) and enforce resource-level constraints, time-bound session tokens, and automated unused permission revocation.",
    hint: "Restricting IAM permissions strictly to the exact resources and actions needed without wildcards.",
    level: "Moderate",
    codeExample: `// Insecure IAM Policy vs Least-Privilege IAM Policy:
// INSECURE:
// { "Effect": "Allow", "Action": "*", "Resource": "*" }

// LEAST PRIVILEGE:
// { "Effect": "Allow", "Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::customer-invoices-2026/*", "Condition": { "Bool": { "aws:SecureTransport": "true" } } }`
  },
  {
    id: 11,
    question: "What is 'Continuous Diagnostic and Mitigation' (CDM) in enterprise vulnerability defense?",
    shortAnswer: "Automated, real-time scanning of all hardware and software assets to detect configuration drift, missing patches, and unauthorized devices continuously rather than monthly.",
    explanation: "Monthly vulnerability scans leave a 29-day threat window where weaponized exploits can detonate. CDM systems (e.g. Qualys, Tenable, Microsoft Defender for Endpoint) use lightweight local agents to report asset health, CVE status, and security compliance in real time.",
    hint: "Real-time, continuous scanning of endpoints and assets rather than periodic monthly scans.",
    level: "Moderate",
    codeExample: `// CDM Agent Telemetry Stream:
const cdmAgentTelemetry = {
  endpointId: "WKSTN-KOLKATA-084",
  osVersion: "Windows 11 Enterprise 23H2",
  missingPatches: ["KB5034123 (Critical RCE)"],
  cisaKevMatch: true,
  healthVerdict: "NON_COMPLIANT -> Network Quarantine Active via ZTNA"
};`
  },
  {
    id: 12,
    question: "How does 'Network Access Control' (802.1X NAC) enforce Zero Trust at the physical switch port level?",
    shortAnswer: "Demanding cryptographic device certificates (EAP-TLS) before an Ethernet switch port or Wi-Fi AP will assign an IP address or grant network access.",
    explanation: "NAC prevents rogue rogue laptops or malicious contractor devices from plugging into an office Ethernet jack (as in Stuxnet and Sony). If a machine lacks an authentic enterprise PKI device certificate, the switch drops the port or assigns it to an isolated guest VLAN.",
    hint: "Requiring cryptographic certificates (EAP-TLS) before physical switch ports open.",
    level: "Moderate",
    codeExample: `// 802.1X Port Authentication Flow:
// 1. Laptop plugs into Ethernet wall jack at Barrackpore office
// 2. Cisco Switch sends EAP-Request/Identity challenge
// 3. Laptop presents valid TPM-backed X.509 Device Certificate
// 4. RADIUS server validates cert -> Switch unblocks Port 12 and assigns VLAN 20`
  },
  {
    id: 13,
    question: "What is 'Virtual Patching' and when should security engineers deploy it?",
    shortAnswer: "Implementing a Web Application Firewall (WAF) rule or IPS signature to block exploit payloads at the network edge before the underlying source code can be updated.",
    explanation: "When a critical zero-day is disclosed (e.g. Equifax Struts, Log4j), development teams may require days to test and deploy software updates. Virtual patching intercepts and drops the attack traffic at the perimeter WAF within minutes, buying time for safe application patching.",
    hint: "Deploying perimeter WAF/IPS rules to block exploits immediately while software updates are tested.",
    level: "Moderate",
    codeExample: `// AWS WAF Virtual Patch Rule (Log4j / Struts):
/*
{
  "Name": "Block-OGNL-and-JNDI-Injections",
  "Priority": 1,
  "Statement": {
    "ByteMatchStatement": {
      "SearchString": "#_memberAccess",
      "FieldToMatch": { "SingleHeader": { "Name": "content-type" } },
      "PositionalConstraint": "CONTAINS"
    }
  },
  "Action": { "Block": {} }
}
*/`
  },
  {
    id: 14,
    question: "What is 'Deception Technology' (Honeypots and Honey-Tokens) in a micro-segmented Zero Trust network?",
    shortAnswer: "Placing decoy servers, fake credentials, and phantom database records across internal subnets that trigger immediate high-priority alerts the instant an attacker touches them.",
    explanation: "In a Zero Trust network, legitimate users and automated scripts have no reason to access decoy assets. If an adversary scans an internal subnet and attempts to connect to a decoy 'Domain Controller' or uses a fake 'AWS Honey-Key', the SOC receives an incontrovertible alert of an active intrusion.",
    hint: "Placing decoy servers and fake credentials that trigger alarms when touched.",
    level: "Moderate",
    codeExample: `// Canary / Honey-Token AWS Key:
// AccessKeyId: AKIA_HONEY_TRAP_9918
// SecretAccessKey: [Decoy]
// AWS CloudTrail Alert Rule: IF AKIA_HONEY_TRAP_9918 is used for ANY API call -> TRIGGER SEVERITY-1 ALARM!`
  },
  {
    id: 15,
    question: "How does the 'Just-In-Time' (JIT) Privileged Access Management (PAM) model eliminate standing administrator privileges?",
    shortAnswer: "Granting administrative privileges on-demand for a temporary, time-bound window (e.g. 2 hours) with mandatory approval and automatic revocation.",
    explanation: "Standing admin privileges create permanent targets for credential theft (Target, Colonial). With JIT PAM (e.g. CyberArk, Microsoft Entra PIM), engineers have standard user privileges by default. When maintenance is required, they request elevated access, complete MFA verification, perform the task, and privileges expire automatically.",
    hint: "Granting temporary, time-bound elevated privileges that expire automatically after maintenance.",
    level: "Moderate",
    codeExample: `// Microsoft Entra PIM Just-In-Time Activation:
const pimRoleActivation = {
  requestedRole: "Global Administrator",
  durationHours: 2,
  justification: "Emergency database schema migration (Ticket #JIRA-8912)",
  mfaChallenge: "FIDO2 Hardware Key Verified",
  approvalStatus: "Approved by CISO -> Access auto-revokes at 16:30 IST"
};`
  },
  {
    id: 16,
    question: "What is 'Egress Filtering' and why is it as critical as ingress firewalling?",
    shortAnswer: "Restricting outbound network connections from internal servers strictly to pre-approved IP addresses, domain names, and ports.",
    explanation: "Adversaries rely on outbound connections to establish C2 beacons (SolarWinds DNS DGA) or exfiltrate data (Equifax, Colonial). In a hardened Zero Trust architecture, database and application servers are blocked from making arbitrary outbound internet connections, choking C2 channels.",
    hint: "Restricting outbound traffic to approved destinations to block C2 channels and data leaks.",
    level: "Moderate",
    codeExample: `// Database Server Egress Whitelist Rule:
/*
Workload: Production_Oracle_DB (10.20.1.100)
Egress Allowed:
  - 10.30.1.50:514 (Internal Syslog Server)
  - 10.10.1.10:123 (Internal NTP Server)
Egress Denied:
  - 0.0.0.0/0 (ALL Internet WAN traffic blocked!)
*/`
  },
  {
    id: 17,
    question: "How does 'Mutual TLS' (mTLS) enforce Zero Trust in service-to-service microservices architectures?",
    shortAnswer: "Both the client microservice and the server microservice authenticate each other using X.509 digital certificates and encrypt all data in transit.",
    explanation: "In standard TLS, only the server proves its identity. In mTLS (e.g. Istio Service Mesh), Service A presents its cryptographic certificate to Service B, and Service B verifies Service A's identity against the internal Certificate Authority before accepting API calls, preventing rogue lateral communication.",
    hint: "Both client and server authenticate each other with digital certificates before connecting.",
    level: "Expert",
    codeExample: `// Istio Service Mesh mTLS Policy (YAML):
/*
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: payment-services
spec:
  mtls:
    mode: STRICT  # Rejects any cleartext or unauthenticated service requests!
*/`
  },
  {
    id: 18,
    question: "What is 'Software Composition Analysis' (SCA) and how does it integrate into automated DevSecOps pipelines?",
    shortAnswer: "Automated scanning of project dependency manifests (`package.json`, `pom.xml`, `requirements.txt`) during CI/CD builds to block vulnerable open-source packages.",
    explanation: "SCA tools (e.g. Snyk, OWASP Dependency-Check, Dependabot) parse the dependency tree of an application. If an open-source library contains a known CVE (like Apache Struts CVE-2017-5638), the CI/CD pipeline automatically fails the build, preventing vulnerable code from reaching production.",
    hint: "Automated scanning of software dependencies in CI/CD pipelines to block vulnerable builds.",
    level: "Moderate",
    codeExample: `// GitLab CI / GitHub Actions SCA Pipeline Step:
/*
stages:
  - security-audit
run-sca-scan:
  stage: security-audit
  script:
    - snyk test --severity-threshold=high --json-output-file=snyk_report.json
    # Build terminates immediately if Critical/High CVEs are discovered!
*/`
  },
  {
    id: 19,
    question: "What is 'Continuous Attack Surface Management' (ASM) and how does it prevent forgotten legacy web portals?",
    shortAnswer: "Automated external reconnaissance scanning that continuously discovers, maps, and tests all internet-facing domains, subdomains, IPs, and cloud assets owned by an organization.",
    explanation: "Attackers look for forgotten, uninventoried external servers (Equifax dispute portal, Colonial legacy VPN). ASM platforms (e.g. Censys, Palo Alto Cortex Xpanse) scan the global IPv4 space and certificate transparency logs to identify shadow IT and untracked endpoints before adversaries exploit them.",
    hint: "Continuous automated scanning discovering shadow IT and uninventoried public endpoints.",
    level: "Moderate",
    codeExample: `// Attack Surface Management Discovery Log:
const asmDiscovery = {
  rootDomain: "company.com",
  discoveredSubdomains: [
    "vpn-legacy.company.com (Single-Factor Auth Detected - CRITICAL RISK)",
    "dev-test-portal.company.com (Running Outdated Apache Tomcat - HIGH RISK)"
  ],
  action: "Automated alert sent to CISO; endpoints quarantined via DNS route removal"
};`
  },
  {
    id: 20,
    question: "How does the Indian DPDP Act 2023 enforce 'Privacy by Design' and technical safeguards on enterprise data fiduciaries?",
    shortAnswer: "Mandates technical safeguards including encryption at rest, access control, regular security audits, and data protection impact assessments, with penalties up to ₹250 Crores.",
    explanation: "Under Section 8(5) of the Digital Personal Data Protection Act 2023, data fiduciaries in Kolkata, Barrackpore, and across India must implement reasonable technical and organizational safeguards (Zero Trust, RBVM, micro-segmentation) to prevent personal data breaches.",
    hint: "Mandates reasonable technical safeguards and security audits under penalty of up to ₹250 Crores.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Technical Compliance Mandate:
const dpdpComplianceStack = [
  "1. Mandatory Data Tokenization and AES-256 Encryption at Rest",
  "2. Zero Trust Access Controls with Hardware Multi-Factor Authentication",
  "3. Continuous Vulnerability Management and Annual Independent Security Audits",
  "4. Formal Data Protection Impact Assessments (DPIA) for High-Risk Processing"
];`
  },
  {
    id: 21,
    question: "What is 'Behavioral Endpoint Detection and Response' (EDR) and how does it detect living-off-the-land techniques?",
    shortAnswer: "Monitoring process execution trees, parent-child relationships, and memory behavior in real time to detect malicious activity even when legitimate system binaries (`powershell.exe`, `wmic.exe`) are used.",
    explanation: "Modern adversaries (Sony, Ukraine, Colonial) abuse built-in administrative tools. EDR agents (CrowdStrike, Microsoft Defender, SentinelOne) analyze process telemetry. If Microsoft Word spawns `powershell.exe`, or `rundll32.exe` opens raw network connections, the EDR immediately terminates the process tree and isolates the host.",
    hint: "Analyzing process execution trees and memory behavior to catch living-off-the-land commands.",
    level: "Moderate",
    codeExample: `// EDR Behavioral Detection Rule:
// Alert Trigger: WINWORD.EXE -> spawns CMD.EXE -> spawns POWERSHELL.EXE
// Action: KILL_PROCESS_TREE & ISOLATE_ENDPOINT_FROM_NETWORK`
  },
  {
    id: 22,
    question: "What is 'Air-Gapping' and what are its inherent limitations against sophisticated physical supply chain threats?",
    shortAnswer: "Physically disconnecting a network from the Internet; limited by human insider threats, infected removable USB drives (Stuxnet), and supply chain hardware implants.",
    explanation: "Air-gapping provides strong perimeter isolation, but it is not impenetrable. As demonstrated by Stuxnet at Natanz and the Ukraine power grid, maintenance technicians carrying infected USB flash drives or laptops can easily bridge physical air gaps. Air-gapped networks still require internal Zero Trust and host-based controls.",
    hint: "Physical isolation from the internet, but still vulnerable to infected USB drives and insiders.",
    level: "Moderate",
    codeExample: `// Stuxnet Air-Gap Traversal Vector:
// Internet -x- AIR GAP -x- Centrifuge PLC Network
// Infiltration: Contractor USB Flash Drive (LNK Zero-Days) physically plugged into Natanz PC!`
  },
  {
    id: 23,
    question: "What is 'Zero Trust Device Posture Checking' and what metrics does it validate before granting network access?",
    shortAnswer: "Verifying that the client endpoint is company-managed (Intune/MDM), has full disk encryption enabled, possesses an active EDR sensor, and is running the latest OS patch level.",
    explanation: "In Zero Trust, having valid user credentials is not enough. The device posture agent checks: 1. BitLocker encryption active; 2. EDR running without tamper; 3. OS updated within 14 days; 4. Hardware TPM certificate present. If any check fails, access to corporate applications is denied.",
    hint: "Verifying disk encryption, EDR health, TPM certificate, and OS patch levels.",
    level: "Moderate",
    codeExample: `// Device Posture Evaluation Rule:
function evaluateDeviceHealth(device) {
    if (!device.tpmCertificateValid || !device.bitlockerEncrypted || !device.edrRunning) {
        return "ACCESS_DENIED_NON_COMPLIANT_DEVICE";
    }
    return "ACCESS_GRANTED_LEAST_PRIVILEGE";
}`
  },
  {
    id: 24,
    question: "What is 'Immutable Log Forwarding' and how does it prevent attackers from wiping forensic traces?",
    shortAnswer: "Streaming system logs in real time over TLS to an isolated, append-only SIEM / WORM storage repository where logs cannot be deleted or modified even by domain administrators.",
    explanation: "Attackers (Sony, Ukraine, Equifax) regularly delete local event logs (`wevtutil cl security`). With immutable log forwarding, the split-second an event occurs, it is transmitted to a centralized log aggregator (e.g. Splunk, Elastic, AWS CloudWatch) where write-once permissions preserve the forensic timeline.",
    hint: "Streaming logs in real time to an isolated append-only SIEM where they cannot be deleted.",
    level: "Moderate",
    codeExample: `// Syslog-NG Real-Time TLS Log Forwarder Configuration:
/*
destination d_immutable_siem {
    syslog("siem.internal.corp" transport("tls") port(6514)
           tls(ca-dir("/etc/ssl/certs") cert-file("/etc/syslog-ng/cert.pem")));
};
log { source(s_local); destination(d_immutable_siem); flags(flow-control); };
*/`
  },
  {
    id: 25,
    question: "What is 'Blast Radius Minimization' in modern cloud infrastructure engineering?",
    shortAnswer: "Partitioning cloud environments into isolated multi-account structures (e.g. AWS Control Tower / Azure Management Groups) with strict guardrails and no shared credentials.",
    explanation: "If an organization runs all production, development, and billing systems in a single cloud account, a compromised root credential destroys the entire enterprise. Partitioning into distinct accounts with dedicated IAM boundaries ensures that a breach in Account A cannot pivot into Account B.",
    hint: "Dividing cloud environments into isolated multi-account structures with independent IAM boundaries.",
    level: "Moderate",
    codeExample: `// Multi-Account AWS Cloud Organization Hierarchy:
// Root Management Organization
// ├── Core Security Account (SIEM, Immutable Backups)
// ├── Production Workloads Account (Strict Zero Trust IAM)
// └── Development Sandbox Account (Isolated from Production)`
  },
  {
    id: 26,
    question: "How does 'Continuous Automated Red Teaming' (CART / BAS) validate defensive controls against real-world attack techniques?",
    shortAnswer: "Running automated, non-destructive attack simulations (Breach and Attack Simulation) across production networks to verify that firewalls, EDR, and SIEM detect MITRE ATT&CK techniques.",
    explanation: "Rather than waiting for an annual penetration test, BAS tools (e.g. Cymulate, AttackIQ, SafeBreach) execute synthetic malware payloads and lateral movement tests daily, automatically alerting defenders if a firewall rule drift or unpatched vulnerability allows simulated exploitation.",
    hint: "Running automated attack simulations daily to verify defensive controls and detection rules.",
    level: "Moderate",
    codeExample: `// Automated BAS Simulation Schedule:
const basSchedule = {
  dailyTests: ["EternalBlue Port 445 Lateral Movement Simulation", "Mimikatz LSASS Memory Dump Detection"],
  weeklyTests: ["Apache Struts OGNL Injection WAF Validation", "Exfiltration over DNS Tunneling Simulation"]
};`
  },
  {
    id: 27,
    question: "What role does 'Hardware-Enforced Multi-Party Authorization' (M-of-N Quorum) play in critical operational commands?",
    shortAnswer: "Requiring two or more authorized senior engineers to physically authenticate with hardware keys before high-risk actions (code signing, substation breaker tripping) can execute.",
    explanation: "Single-person authorization creates severe insider threat and credential compromise risks. Enforcing dual-control / M-of-N quorum ensures that even if an attacker steals an administrator's credentials, they cannot deploy signed firmware or shut down power grids without physical approval from a second independent officer.",
    hint: "Requiring multiple independent officers to authenticate before critical actions can execute.",
    level: "Expert",
    codeExample: `// Multi-Party Quorum Policy:
const highRiskOperation = {
  action: "DESTRUCTIVE_SUBSTATION_GRID_TRIP",
  requiredApprovals: 2,
  signers: ["Operator_Susmita (YubiKey Verified)", "Supervisor_Sukanta (YubiKey Verified)"],
  status: "AUTHORIZED_AND_EXECUTED"
};`
  },
  {
    id: 28,
    question: "What is 'Software-Defined Perimeter' (SDP) and what is the 'Dark Cloud' concept?",
    shortAnswer: "SDP makes network infrastructure invisible by keeping all ports closed to the public Internet until a user authenticates via Single Packet Authorization (SPA).",
    explanation: "In standard networks, open ports (Port 443, Port 445, Port 22) can be scanned by Shodan or adversaries. Under SDP/SPA, an application server drops all incoming packets by default without responding. Only when a client sends a cryptographically signed Single Packet Authorization packet does the firewall dynamically open a temporary port for that authenticated IP.",
    hint: "Keeping all ports closed and invisible until an authenticated Single Packet Authorization packet is sent.",
    level: "Expert",
    codeExample: `// Single Packet Authorization (SPA) Flow (fwknop):
// 1. Attacker port scans IP -> All ports appear CLOSED / STEALTH (Dark Cloud)
// 2. Legitimate user sends encrypted SPA packet (HMAC-SHA256) to Port 62201/UDP
// 3. Firewall dynamically opens Port 22 ONLY for user's IP for 30 seconds`
  },
  {
    id: 29,
    question: "Why is 'Cyber Resilience' superior to the outdated paradigm of '100% Unbreakable Security'?",
    shortAnswer: "Cyber resilience accepts that breaches will inevitably occur and focuses on minimizing blast radius, maintaining core operational continuity, and rapid manual recovery.",
    explanation: "No organization can prevent 100% of zero-day exploits or nation-state attacks. A resilient organization designs systems that survive compromise: decoupled industrial control systems, immutable backups, manual mechanical overrides, and micro-segmented networks that limit damage to a single isolated node.",
    hint: "Focusing on operational survival, blast radius containment, and rapid recovery rather than impossible invulnerability.",
    level: "Moderate",
    codeExample: `// Cyber Resilience Metric Equation:
// Resilience Index = (Time to Detect + Time to Contain + Blast Radius Containment) * Rapid Recovery Capability`
  },
  {
    id: 30,
    question: "What is the ultimate synthesis of strategic enterprise defense for cybersecurity students in Barrackpore, Kolkata, and nationwide?",
    shortAnswer: "Modern defense is a continuous triad: 1. Continuous Risk-Based Patching & SBOM visibility; 2. Zero Trust Identity with Hardware FIDO2 MFA; 3. Workload Micro-segmentation with immutable, air-gapped recovery.",
    explanation: "The lessons from three decades of landmark cyber warfare are clear: organizations that automate patch management, eliminate implicit trust through Zero Trust, micro-segment workloads, and preserve offline/analog recovery lifelines survive the most sophisticated adversaries in the world.",
    hint: "Automated risk-based patching, Zero Trust hardware MFA, micro-segmentation, and immutable recovery.",
    level: "Moderate",
    codeExample: `// The Grand Enterprise Security Architecture Formula:
// Enterprise Defense = (Continuous SBOM & 24-hr KEV Patching) + (NIST Zero Trust & FIDO2 MFA) + (Host Micro-segmentation & Immutable Backups)`
  }
];

export default questions;
