const questions = [
  {
    question: "What is a Bring Your Own Device (BYOD) Policy (ISO/IEC 27001:2022 Control A.8.1), and why is dual-persona containerization essential?",
    shortAnswer: "A BYOD policy defines rules for employees using personal smartphones/laptops for work; dual-persona containerization cryptographically isolates corporate apps and data from personal apps, preventing data leakage while respecting employee personal privacy.",
    explanation: "Allowing employees to access corporate email and databases from personal phones without controls creates severe security risks. Control A.8.1 mandates user endpoint device security. Mobile Application Management (MAM) creates an encrypted corporate sandbox (dual-persona) on the phone: copy-pasting data from corporate Outlook to personal WhatsApp is blocked, while personal photos and messages remain untouched and private.",
    hint: "Think of having two separate encrypted phones inside a single physical device.",
    level: "basic",
    codeExample: `// BYOD Dual-Persona Isolation Policy:
[ PERSONAL SANDBOX ]    ➔ WhatsApp, Personal Photos, Games, Personal Gmail (Unmonitored)
       || (Encrypted Boundary - No Clipboard / File Copy Allowed)
[ CORPORATE SANDBOX ]   ➔ Enterprise Outlook, Teams, Salesforce, Internal VPN (Encrypted & Managed)`
  },
  {
    question: "What is the difference between Mobile Device Management (MDM) and Mobile Application Management (MAM) in a BYOD deployment?",
    shortAnswer: "MDM manages and controls the entire physical hardware device (full device enrollment, OS settings, full factory wipe); MAM manages only specific corporate applications and data sandboxes (selective corporate wipe).",
    explanation: "Employees often resist MDM on personal devices because it gives employers the ability to track personal location and execute a full factory wipe (deleting personal family photos). In BYOD scenarios, MAM is preferred: it enforces encryption, DLP, and PIN locks exclusively on corporate apps, allowing the company to wipe corporate data upon employee resignation without affecting personal files.",
    hint: "MDM controls the whole phone; MAM controls only the company apps.",
    level: "moderate",
    codeExample: `// MDM vs MAM Architecture Comparison:
MDM (Full Device Control) ➔ Corporate-Owned Laptops (Can factory reset entire device)
MAM (App Containerization)➔ Employee Personal Phones (Can selectively wipe only corporate email)`
  },
  {
    question: "What is a 'Selective / Enterprise Wipe', and how does it protect corporate data when an employee leaves the company or loses their personal phone?",
    shortAnswer: "A selective wipe remotely deletes only the encrypted corporate sandbox, enterprise emails, tokens, and documents from a personal device, leaving all personal photos, messages, and personal apps completely intact.",
    explanation: "When an employee resigns or their personal phone is reported lost/stolen in transit, the SOC triggers an automated API call through the MAM platform (e.g. Microsoft Intune). The command deletes the corporate encryption key and purges all enterprise data within seconds, preventing data leakage under Control A.8.1 while avoiding legal liability for destroying employee personal data.",
    hint: "Erase the company files instantly without touching the user's personal photo album.",
    level: "basic",
    codeExample: `// Microsoft Intune Selective Wipe Trigger:
Target Device:  "Employee-Personal-iPhone14" (BYOD Enrollment)
Action:         Trigger Enterprise Selective Wipe
Result:         Corporate Sandbox Deleted (Outlook, Teams, VPN certs removed)
Personal State: Personal Photos, Contacts, and Personal Apps remain 100% UNTOUCHED!`
  },
  {
    question: "What minimum technical baseline requirements must a BYOD Policy enforce before granting mobile access to corporate assets?",
    shortAnswer: "1. Mandatory Biometric / PIN lock; 2. Full Storage Encryption (BitLocker / FileVault / iOS Data Protection); 3. Jailbreak / Root Detection; 4. Automated OS Patching (< 14 days); 5. Endpoint EDR / MAM agent active.",
    explanation: "Unmanaged devices represent critical vulnerabilities. A compliant BYOD policy establishes automated compliance checks: if a user roots their Android phone or jailbreaks their iPhone (which disables operating system kernel security sandboxes), the MAM client immediately revokes all authentication tokens and quarantines the device from the corporate network.",
    hint: "Remember: Encryption, PIN, anti-rooting, OS updates, and MAM enrollment.",
    level: "moderate",
    codeExample: `// Conditional Access Device Compliance Policy:
if device.is_jailbroken == true OR device.os_version < "17.4" OR device.is_encrypted == false {
    action: BLOCK_ACCESS
    notify: "Device non-compliant with corporate BYOD policy. Update OS and disable root."
}`
  },
  {
    question: "How does Zero Trust Network Access (ZTNA) replace legacy Full-Tunnel VPNs in modern Remote Work Policies (ISO 27001 Control A.6.7)?",
    shortAnswer: "Legacy VPNs grant broad Layer-3 network access to the entire corporate subnet upon login; ZTNA grants identity-verified, encrypted micro-tunnels to only the specific application authorized, preventing lateral movement.",
    explanation: "Under Control A.6.7 (Remote Working), connecting remote workers via traditional VPNs is dangerous: if an attacker compromises a remote laptop, they can pivot across the entire internal network. ZTNA implements the principle of 'Never Trust, Always Verify': every connection is authenticated per-application, isolating workloads and eliminating internal network visibility.",
    hint: "VPN opens the front door to the whole house; ZTNA gives you a key to only one specific room.",
    level: "moderate",
    codeExample: `// Legacy VPN vs Zero Trust Network Access (ZTNA):
Legacy Full VPN: Authenticate once ➔ Full access to entire 10.0.0.0/8 internal corporate subnet!
Modern ZTNA:     Authenticate per-app ➔ Direct micro-tunnel to ` + "`https://billing.internal.fintech.in`" + ` ONLY!`
  },
  {
    question: "What public Wi-Fi security mandates must be enforced in an enterprise Remote Work Policy?",
    shortAnswer: "Mandatory use of encrypted ZTNA/VPN tunnels, disabling Wi-Fi auto-connect and ad-hoc sharing, verifying HTTPS/TLS 1.3 certificates, and banning public Wi-Fi for critical administrative operations without corporate cellular hotspots.",
    explanation: "Public Wi-Fi networks in airports, cafes, and hotels are frequently targeted by adversaries deploying 'Evil Twin' rogue access points or ARP poisoning to sniff unencrypted traffic. A remote work policy prohibits connecting to open, unencrypted networks without an active encrypted corporate tunnel and mandates polarized display privacy filters to defeat visual eavesdropping.",
    hint: "Never trust free coffee shop Wi-Fi without an active corporate encrypted tunnel.",
    level: "basic",
    codeExample: `// Remote Work Public Wi-Fi Rule (POL-REMOTE-01):
Mandate: "When working remotely from public venues in Kolkata, employees MUST use corporate cellular eSIM hotspots or connect exclusively through corporate ZTNA micro-tunnels. Connecting to unencrypted open Wi-Fi is strictly prohibited."`
  },
  {
    question: "How does the Digital Personal Data Protection (DPDP) Act 2023 enforce mobile endpoint security under Section 8?",
    shortAnswer: "Section 8 mandates that Data Fiduciaries must prevent unauthorized disclosure or loss of personal data; failing to enforce encryption on remote employee laptops that result in a data breach triggers up to ₹250 Crore fines.",
    explanation: "If a remote employee leaves an unencrypted corporate laptop in a taxi and unauthorized third parties extract customer health records or financial KYC data, the Data Protection Board of India (DPBI) will treat the failure as organizational negligence under Section 8(5). Enforcing full disk encryption (BitLocker) and remote wipe capabilities provides an absolute defense.",
    hint: "An unencrypted lost laptop containing citizen data is a massive DPDP violation.",
    level: "basic",
    codeExample: `// DPDP Statutory Safeguard Defense:
Incident: Remote employee laptop stolen from a vehicle in Kolkata
Defense:  Full-disk AES-XTS-256 BitLocker encryption active + TPM 2.0 PIN enforced
DPBI Ruling: Ciphertext cannot be decrypted without TPM key -> Zero personal data breach occurred -> Immunized from fines!`
  },
  {
    question: "What is 'Shoulder Surfing' (Visual Eavesdropping), and what physical controls does a Remote Work Policy mandate to mitigate it?",
    shortAnswer: "Shoulder surfing is the unauthorized viewing of sensitive screen content or keystrokes by nearby individuals; mitigated by polarized privacy screen filters, positioning screens away from public view, and avoiding sensitive calls in public.",
    explanation: "High-resolution smartphone cameras and curious bystanders in crowded trains or cafes can easily read confidential financial records or customer passwords over an employee's shoulder. Under ISO 27001 Control A.7.7 and remote work policies, employees handling sensitive data must install 30-degree polarized privacy filters that black out side-angle visibility.",
    hint: "Use polarized privacy filters so only the person directly in front of the screen can see it.",
    level: "basic",
    codeExample: `// Physical Privacy Filter Standard:
Hardware Requirement: Micro-louver 30-degree polarized privacy screen attached to all laptops
Operational Rule:     Employees processing Tier 1 financial data must sit with back against a wall`
  },
  {
    question: "What is 'Jailbreak / Root Detection', and why must a Mobile Application Management (MAM) agent immediately quarantine modified devices?",
    shortAnswer: "Jailbreaking (iOS) or rooting (Android) removes operating system security sandboxes, granting root access to all apps; a compromised root allows malicious apps to read memory, steal encryption keys, and capture corporate data.",
    explanation: "Mobile OS security relies on application sandboxing (preventing App A from reading App B's memory). When a device is rooted, any malware installed by the user can bypass the sandbox and directly read corporate emails, tokens, and cached credentials. MAM solutions continuously check OS kernel integrity; detecting root triggers instant revocation of all enterprise sessions.",
    hint: "Rooting destroys the security walls between apps, allowing malware to steal corporate data.",
    level: "moderate",
    codeExample: `// Mobile Root Detection Trigger:
Check:       MAM detects ` + "`/system/xbin/su`" + ` or Cydia Substrate framework present on device
Response:    AUTOMATIC DEVICE QUARANTINE!
Action:      Corporate encryption key deleted -> Corporate sandbox rendered inaccessible within 1 second`
  },
  {
    question: "What mandatory incident reporting timeframe must a Remote Work Policy enforce for lost or stolen hardware assets?",
    shortAnswer: "Immediate notification to the 24/7 SOC within 60 minutes of discovering the loss, allowing the security team to trigger remote cryptographic wipe commands before thieves can attempt forensic extraction.",
    explanation: "Time is critical when a device is lost. Within hours, sophisticated thieves or adversaries may attempt to bypass PINs or clone solid-state storage chips. A remote work policy establishes a strict 60-minute reporting SLA, combined with CERT-In 6-hour statutory reporting obligations under Section 70B if sensitive critical infrastructure data was stored.",
    hint: "Report lost devices within 1 hour so the SOC can wipe them remotely.",
    level: "basic",
    codeExample: `// Lost Device Rapid Escalation SLA:
T+0m:   Employee discovers laptop left in Kolkata transit
T+30m:  Employee calls 24/7 SOC emergency hotline (+91-98300-XXXXX)
T+35m:  SOC analyst executes Microsoft Intune remote BitLocker crypto-wipe command`
  },
  {
    question: "How does a Remote Work Policy govern Home Network Security and IoT Device Isolation?",
    shortAnswer: "Employees must change default router administrator passwords, enable WPA2-AES / WPA3 encryption, update home router firmware, and isolate corporate laptops on a dedicated guest Wi-Fi VLAN away from vulnerable smart TVs and IoT gadgets.",
    explanation: "Smart home gadgets (IoT cameras, smart lightbulbs, smart TVs) frequently contain unpatched firmware vulnerabilities. If a hacker compromises a smart camera on an employee's home network, they can launch ARP spoofing or Man-in-the-Middle attacks against an un-isolated corporate laptop. Isolating work laptops on a separate guest network eliminates lateral network exposure.",
    hint: "Put corporate laptops on a separate guest Wi-Fi away from smart refrigerators and cameras.",
    level: "moderate",
    codeExample: `// Home Office Network Hardening Guide (GDL-REMOTE-02):
Rule 1: Router admin credentials changed from factory default ` + "`admin/admin`" + `
Rule 2: Corporate laptop connected exclusively to isolated Guest Wi-Fi SSID (VLAN 20)
Rule 3: Universal Plug and Play (UPnP) disabled on home router gateway`
  },
  {
    question: "Under the Indian Information Technology Act 2000, why is a Remote Work Policy essential to enforce Section 65B Electronic Evidence Admissibility?",
    shortAnswer: "By establishing documented chain-of-custody rules, centralized EDR log collection, and authorized remote forensic access, ensuring digital evidence from remote employee laptops is legally admissible in Indian courts.",
    explanation: "If a remote employee commits insider trading or steals intellectual property from their home in West Bengal, capturing digital evidence requires complying with Section 65B of the Indian Evidence Act. A remote work policy explicitly authorizes remote forensic imaging and continuous EDR log ingestion into a central cryptographically signed SIEM, guaranteeing judicial admissibility.",
    hint: "Documented logging rules ensure remote evidence can be used in Indian courtrooms.",
    level: "expert",
    codeExample: `// Section 65B Remote Forensics Compliance:
1. Telemetry Source: Remote CrowdStrike Falcon EDR streaming to Kolkata SOC
2. Integrity Proof:  SHA-256 hash generated automatically on memory capture
3. Legal Artifact:   Section 65B Certificate signed by Principal Forensic Architect (Mahima)`
  },
  {
    question: "Synthesizing BYOD and Remote Work Policies: what is the master equation of Decentralized Endpoint Resilience?",
    shortAnswer: "$$\\text{Remote Endpoint Resilience} = \\frac{\\text{MAM Container Isolation} \\times \\text{ZTNA Micro-Tunneling} \\times \\text{Selective Wipe Velocity}}{\\text{Unmanaged Devices} + \\text{Insecure Wi-Fi Lateral Exposure}}$$ with continuous ISO 27001 Control A.8.1 device posture verification.",
    explanation: "This master governance relationship proves that mobile and remote workforce security is the product of cryptographic containerization, application-level zero trust connectivity, and instantaneous remote wipe capabilities. Eliminating unmanaged devices and securing home network environments guarantees 100% data protection, zero lateral movement, and total statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how containerization, ZTNA, and selective wipe protect remote workforces.",
    level: "expert",
    codeExample: `// Master Equation of Remote Workforce Resilience:
Resilience = (MAM_Container * ZTNA_MicroTunnels * Selective_Wipe_Speed) / (Unmanaged_BYOD + Rogue_WiFi_Risk);
Outcome: 100% Mobile Data Isolation, Zero Lateral Attack Vectors & Total Statutory Safe Harbor!`
  }
];

export default questions;
