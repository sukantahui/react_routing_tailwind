// topic7_questions.js
// 30 Comprehensive Questions on Case Study 7: SolarWinds Supply Chain Attack (2020) - SUNBURST Backdoor

const questions = [
  {
    id: 1,
    question: "What made the 2020 SolarWinds supply chain attack one of the most sophisticated cyber espionage campaigns in history?",
    shortAnswer: "Adversaries compromised the software vendor's internal CI/CD build system, injecting a stealthy backdoor (SUNBURST) directly into legitimate, digitally signed software updates distributed to 18,000 global organizations.",
    explanation: "Rather than attacking individual government agencies or Fortune 500 companies directly, Russian foreign intelligence compromised SolarWinds' software build environment. They injected a backdoor into `SolarWinds.Orion.Core.BusinessLayer.dll`. Because the malicious DLL was signed with SolarWinds' authentic digital certificate, it bypassed antivirus and firewall inspections on 18,000 customer networks worldwide.",
    hint: "Compromising the vendor's CI/CD build pipeline to inject backdoors into digitally signed updates.",
    level: "Moderate",
    codeExample: `// SolarWinds Attack Profile:
const solarWindsProfile = {
  threatActor: "APT29 / Cozy Bear / Nobelium (Russian Foreign Intelligence Service - SVR)",
  victimVendor: "SolarWinds Inc. (Austin, Texas)",
  compromisedProduct: "Orion IT Monitoring Platform",
  backdoorName: "SUNBURST (Solorigate)",
  trojanizedFile: "SolarWinds.Orion.Core.BusinessLayer.dll",
  organizationsReceivingBackdoor: 18000
};`
  },
  {
    id: 2,
    question: "Which threat actor was formally attributed with orchestrating the SolarWinds supply chain espionage campaign?",
    shortAnswer: "APT29 (also known as 'Cozy Bear', 'Nobelium', or 'Midnight Blizzard'), operating on behalf of Russia's Foreign Intelligence Service (SVR).",
    explanation: "In April 2021, the United States government and the UK National Cyber Security Centre (NCSC) formally attributed the SolarWinds campaign to the Russian SVR. The operation focused on high-level political and technological intelligence gathering, specifically targeting US government cabinet agencies (Treasury, Commerce, Homeland Security, State, Defense) and top technology vendors (Microsoft, FireEye).",
    hint: "APT29 / Cozy Bear (Russian Foreign Intelligence Service - SVR).",
    level: "Moderate",
    codeExample: `// Official Attribution Statement (April 15, 2021):
const attributionDetails = {
  sanctioningBodies: ["US White House", "UK Foreign Office", "NATO"],
  designatedActor: "Russian Foreign Intelligence Service (SVR)",
  unitNames: ["APT29", "Cozy Bear", "Nobelium", "Midnight Blizzard"]
};`
  },
  {
    id: 3,
    question: "How did cybersecurity firm FireEye initially discover the SolarWinds breach in December 2020?",
    shortAnswer: "FireEye detected that an attacker had registered an unauthorized secondary multi-factor authentication (MFA) device to an employee's account, followed by theft of FireEye's proprietary Red Team assessment tools.",
    explanation: "FireEye's security operations center noticed a suspicious login where an employee appeared to register a new phone for two-factor authentication. When the SOC contacted the employee, they confirmed they had not added a device. Investigating the anomalous session revealed deep SVR infiltration, leading FireEye to discover the trojanized SolarWinds DLL.",
    hint: "Detecting an unauthorized secondary MFA phone registration on an employee account.",
    level: "Moderate",
    codeExample: `// FireEye Initial Detection Trigger:
const detectionTrigger = {
  alertType: "ANOMALOUS_MFA_DEVICE_REGISTRATION",
  analystAction: "SOC contacted employee via out-of-band phone call",
  outcome: "Employee confirmed fraud → Triggered global forensic investigation led by Kevin Mandia"
};`
  },
  {
    id: 4,
    question: "What was 'SUNSPOT' and how did it covertly inject the SUNBURST backdoor during the compilation process?",
    shortAnswer: "A stealthy implant that monitored running compilation processes (`msbuild.exe`), dynamically swapped source code files in memory right before compilation, and restored original source files immediately after.",
    explanation: "SUNSPOT was the builder malware deployed inside SolarWinds' build network. It ran in the background watching for `msbuild.exe`. The millisecond compilation started, SUNSPOT replaced `InventoryManager.cs` with a modified malicious version, allowed the compiler to produce the signed DLL, and immediately restored the clean source code, ensuring developers never saw malicious code in their source repositories.",
    hint: "Malware watching for msbuild.exe to inject malicious code during compilation and swap it back.",
    level: "Expert",
    codeExample: `// Conceptual SUNSPOT Build Injection Loop:
void MonitorAndInjectBuild() {
    while (TRUE) {
        if (IsProcessRunning("msbuild.exe")) {
            // 1. Temporarily replace clean InventoryManager.cs with trojanized source
            ReplaceSourceFile("InventoryManager.cs", "SUNBURST_Payload.cs");
            // 2. Wait for msbuild.exe to compile and sign the DLL
            WaitForProcessExit("msbuild.exe");
            // 3. Immediately restore original clean InventoryManager.cs
            RestoreCleanSourceFile("InventoryManager.cs");
        }
        Sleep(100);
    }
}`
  },
  {
    id: 5,
    question: "How did the SUNBURST backdoor communicate stealthily with attacker Command & Control (C2) servers without triggering perimeter network alerts?",
    shortAnswer: "Through a Domain Generation Algorithm (DGA) that tunneled encoded victim system metadata inside standard DNS lookup requests to subdomains of `avsvmcloud.com`.",
    explanation: "SUNBURST stayed dormant for 12 to 14 days after installation to evade sandboxes. When it woke up, it did not open suspicious HTTP/HTTPS connections. Instead, it issued standard DNS queries (e.g. `[encoded-victim-hash].appsync-api.eu-west-1.avsvmcloud.com`). If the attackers chose to interact with that specific victim, the C2 server replied with a CNAME record directing the backdoor to a second-stage HTTPS server.",
    hint: "Encoding victim metadata inside DNS queries to subdomains of `avsvmcloud.com`.",
    level: "Expert",
    codeExample: `// SUNBURST DNS DGA Subdomain Tunneling Pattern:
// Query Format: <Encoded_Victim_GUID>.<Encoded_Domain_String>.appsync-api.<region>.avsvmcloud.com
// Example: 04a29fb4890c12.eu-west-1.avsvmcloud.com
// DNS Response: CNAME record pointing to second-stage C2 IP only for high-value targets (e.g. US Treasury)`
  },
  {
    id: 6,
    question: "What is 'Golden SAML' and how did APT29 abuse it to hijack enterprise cloud identity infrastructure?",
    shortAnswer: "Forging Security Assertion Markup Language (SAML) tokens using stolen private token-signing keys from Active Directory Federation Services (ADFS) to impersonate any user across Microsoft 365 and Azure cloud services.",
    explanation: "Once inside on-premises networks, attackers extracted the private X.509 token-signing certificate from the organization's ADFS server. With this private key, the attackers generated valid SAML response tokens offline, allowing them to authenticate as any user (including global administrators) into cloud services without needing passwords or triggering MFA prompts.",
    hint: "Forging SAML tokens using stolen ADFS private signing keys to access cloud accounts without MFA.",
    level: "Expert",
    codeExample: `// Golden SAML Token Generation (Mimikatz / AADInternals style):
// Command:
// New-AadSamlToken -PrivateKey $stolenAdfsPrivateKey -UserPrincipalName "admin@treasury.gov" -Role "GlobalAdmin"
// Result: Valid SAML assertion accepted by Microsoft Entra ID (Azure AD) with ZERO password/MFA prompt!`
  },
  {
    id: 7,
    question: "How many organizations downloaded the trojanized SolarWinds update, and how many high-value targets were actively exploited with second-stage payloads?",
    shortAnswer: "Approximately 18,000 customers downloaded the backdoor; attackers selectively chose only ~100 to 300 high-value government agencies and tech corporations for active second-stage exploitation.",
    explanation: "Unlike indiscriminate ransomware worms, the SVR exhibited extreme operational discipline. Even though 18,000 entities beaconed via DNS, the attackers ignored over 98% of them. They only sent second-stage malware (TEARDROP, Raindrop) to elite targets like the US Department of Defense, State Department, and major cybersecurity providers.",
    hint: "18,000 downloaded the update, but only 100-300 high-value targets received active payloads.",
    level: "Moderate",
    codeExample: `// Target Filtering Funnel:
const solarWindsFunnel = {
  trojanizedDownloads: 18000,
  dnsDgaBeaconsReceived: 18000,
  secondStageC2Activated: 300, // Extreme operational precision
  confirmedBreachedAgencies: ["US Treasury", "Homeland Security (DHS)", "Commerce (NTIA)", "State Dept", "Microsoft", "FireEye"]
};`
  },
  {
    id: 8,
    question: "What anti-analysis and sandbox-evasion techniques did the SUNBURST backdoor execute before initializing network beacons?",
    shortAnswer: "It maintained a mandatory 12 to 14-day sleep timer, verified it was not running in a virtual machine, and hashed running process/driver names against a hardcoded blacklist.",
    explanation: "Security sandboxes only analyze malware for a few minutes. SUNBURST calculated a randomized sleep timer between 288 and 336 hours (12-14 days). Furthermore, it checked for specific security software processes (Wireshark, Process Explorer, antivirus drivers) using one-way FNV-1a hashes to avoid leaving readable strings in memory.",
    hint: "A 12-14 day sleep delay and hashing running process names to evade sandboxes.",
    level: "Expert",
    codeExample: `// SUNBURST Anti-Analysis Sleep & Process Hashing (Decompiled C#):
if (DateTime.UtcNow - installTime < TimeSpan.FromDays(14)) {
    return; // Sleep for 14 days before attempting ANY network activity!
}
// Checks running process hashes against blacklist using FNV-1a:
foreach (Process p in Process.GetProcesses()) {
    uint hash = Fnv1aHash(p.ProcessName.ToLower());
    if (blacklistedHashes.Contains(hash)) {
        return; // Terminate if running under analysis or debuggers
    }
}`
  },
  {
    id: 9,
    question: "What is 'SLSA' (Supply-chain Levels for Software Artifacts) and how was it developed in response to the SolarWinds attack?",
    shortAnswer: "A security framework created by Google and the OpenSSF that establishes end-to-end provenance, cryptographic build verification, and isolated hermetic build environments.",
    explanation: "SolarWinds demonstrated that signing compiled code is insufficient if the build server itself is compromised. SLSA Level 3/4 requires hermetic (isolated) builds, two-party code reviews, and verifiable, tamper-evident cryptographic provenance (attestations) linking the final binary to the exact source commit in git.",
    hint: "A framework ensuring cryptographic build provenance and isolated hermetic build pipelines.",
    level: "Moderate",
    codeExample: `// SLSA Build Provenance Attestation (in-toto format):
{
  "_type": "https://in-toto.io/Statement/v0.1",
  "predicateType": "https://slsa.dev/provenance/v0.2",
  "subject": [{ "name": "SolarWinds.Orion.Core.BusinessLayer.dll", "digest": { "sha256": "322b43f...d89" } }],
  "predicate": {
    "builder": { "id": "https://github.com/slsa-framework/slsa-github-generator" },
    "buildType": "https://actions.github.io/buildtypes/workflow/v1",
    "invocation": { "configSource": { "uri": "git+https://github.com/solarwinds/orion", "digest": { "sha1": "commit_hash" } } }
  }
}`
  },
  {
    id: 10,
    question: "What is 'TEARDROP' and what role did it play in the post-exploitation phase?",
    shortAnswer: "A stealthy memory-only dropper that ran as a Windows service and directly loaded custom Cobalt Strike Beacon shellcode into process memory without touching disk.",
    explanation: "After SUNBURST verified a target was high-value, the C2 server sent TEARDROP. TEARDROP was an in-memory execution engine that extracted and decrypted Cobalt Strike payloads directly into allocated RAM buffers (`VirtualAlloc` with `PAGE_EXECUTE_READWRITE`), allowing operators to execute interactive hands-on-keyboard reconnaissance.",
    hint: "A memory-only dropper injecting customized Cobalt Strike beacons directly into RAM.",
    level: "Expert",
    codeExample: `// TEARDROP In-Memory Shellcode Injection:
LPVOID pBuffer = VirtualAlloc(NULL, payloadSize, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
RtlMoveMemory(pBuffer, decryptedCobaltStrikePayload, payloadSize);
HANDLE hThread = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)pBuffer, NULL, 0, NULL);
// Cobalt Strike Beacon runs entirely in RAM with zero disk artifacts!`
  },
  {
    id: 11,
    question: "Why did traditional endpoint detection and antivirus software fail to flag `SolarWinds.Orion.Core.BusinessLayer.dll` on client networks?",
    shortAnswer: "The file had a valid, untampered digital signature from Symantec/DigiCert issued to SolarWinds Worldwide, LLC, making security tools treat it as authentic vendor software.",
    explanation: "Security software uses digital certificates as a primary trust signal. Because SUNSPOT injected the malicious code prior to the code-signing step in SolarWinds' official build pipeline, the compiled trojan was signed with SolarWinds' authentic private cryptographic key. Antivirus engines whitelisted the file by default.",
    hint: "The file carried a valid cryptographic digital signature from SolarWinds Worldwide LLC.",
    level: "Moderate",
    codeExample: `// Windows Authenticode Signature Verification:
const dllSignature = {
  fileName: "SolarWinds.Orion.Core.BusinessLayer.dll",
  signedBy: "SolarWinds Worldwide, LLC",
  issuerCA: "Symantec Class 3 SHA256 Code Signing CA",
  signatureStatus: "VALID (Authenticode Verified)",
  avDecision: "TRUSTED_VENDOR_WHITELIST"
};`
  },
  {
    id: 12,
    question: "What is 'Reproducible Builds' and how does it verify that compiled binaries match their source code?",
    shortAnswer: "A software engineering practice where independent compilation of the same source code in separate isolated environments always produces bit-for-bit identical cryptographic checksums.",
    explanation: "If SolarWinds had employed reproducible builds on two separate isolated build clusters, Cluster A (infected with SUNSPOT) would have produced a different hash than Cluster B (clean). The hash discrepancy would have immediately alerted build engineers to binary tampering before the update was signed and released.",
    hint: "Independent build clusters producing bit-for-bit identical cryptographic hashes from source.",
    level: "Expert",
    codeExample: `// Reproducible Build Verification Workflow:
// Build Pipeline 1 (Cluster Alpha): Hashes output → SHA-256: 7f8a9...b10
// Build Pipeline 2 (Cluster Beta):  Hashes output → SHA-256: 7f8a9...b10
// If Hash(Alpha) !== Hash(Beta) → ABORT RELEASE AND ALERT DEVSECOPS!`
  },
  {
    id: 13,
    question: "How did the attackers avoid detection while pivoting across Microsoft 365 and Azure environments?",
    shortAnswer: "They routed cloud connections through residential proxy IP addresses geographically proximate to the victim organization and added their own credentials to existing Azure Service Principals.",
    explanation: "APT29 did not log into victim cloud tenants from foreign IP addresses. They leased residential IP addresses located in the same city or state as the victim organization. Once inside, they modified OAuth applications and Service Principal credentials to grant themselves persistent Graph API access to read email mailboxes.",
    hint: "Using geographically matching residential proxies and adding credentials to Azure Service Principals.",
    level: "Expert",
    codeExample: `// Malicious Azure Service Principal Credential Injection:
// Attackers added a custom public key to an existing enterprise app:
// az ad app credential reset --id "App-UUID" --cert $attackerPublicKey
// Allowed attackers to authenticate via MSAL and query Microsoft Graph API silently!`
  },
  {
    id: 14,
    question: "What is the 'Principle of Segregation of Build Environments' in modern DevSecOps?",
    shortAnswer: "Build servers must be ephemeral, completely air-gapped from developer workstations and the Internet, with zero persistent access and immutable step validation.",
    explanation: "SolarWinds' build servers were persistent virtual machines connected to corporate networks. Modern DevSecOps mandates ephemeral build workers (e.g. single-use containers) that are spawned on-demand for a single build, pull dependencies from verified internal caches, compile in an isolated sandbox, and are destroyed immediately.",
    hint: "Single-use ephemeral build workers isolated from corporate networks and the Internet.",
    level: "Moderate",
    codeExample: `// Ephemeral Build Worker Pipeline Configuration:
const secureCiCdPipeline = {
  buildRunner: "Ephemeral Single-Use Container (Destroyed post-build)",
  networkAccess: "AIR-GAPPED (No outbound WAN internet access)",
  sourceControlVerification: "Cryptographically Signed Git Commits (GPG)",
  attestationStandard: "SLSA Level 4 Provenance Generation"
};`
  },
  {
    id: 15,
    question: "What critical role does 'DNS Telemetry & Passive DNS Analysis' play in hunting for supply chain C2 beacons like SUNBURST?",
    shortAnswer: "Analyzing enterprise recursive DNS logs for abnormal high-entropy subdomains and newly registered external domain lookups (`avsvmcloud.com`).",
    explanation: "While individual endpoints thought they were making normal DNS queries, a centralized Passive DNS analysis tool would identify thousands of servers suddenly resolving strange, high-entropy subdomains under `avsvmcloud.com`. Correlating these DNS queries with the SolarWinds Orion process ID reveals the active C2 beacon.",
    hint: "Identifying high-entropy DNS subdomain lookups and correlating with process telemetry.",
    level: "Moderate",
    codeExample: `// Threat Hunting Sigma Rule for SUNBURST DNS DGA:
/*
title: SUNBURST DGA Domain Resolution
logsource:
  category: dns
detection:
  selection:
    QueryName|contains: '.avsvmcloud.com'
  condition: selection
# Flagged all corporate workstations querying the SolarWinds C2 infrastructure!
*/`
  },
  {
    id: 16,
    question: "How did the US Government respond legally and diplomatically to the SolarWinds campaign?",
    shortAnswer: "President Biden signed Executive Order 14028 to overhaul federal cybersecurity and imposed sweeping economic sanctions against Russian technology firms assisting the SVR.",
    explanation: "Executive Order 14028 (May 2021) mandated Zero Trust architectures for all federal agencies, universal Multi-Factor Authentication, Software Bill of Materials (SBOM) requirements for all federal software vendors, and strict incident disclosure timelines.",
    hint: "Executive Order 14028 mandating Zero Trust, SBOMs, and universal MFA across federal software.",
    level: "Moderate",
    codeExample: `// Executive Order 14028 Core Mandates:
const eo14028Directives = [
  "Mandatory Software Bill of Materials (SBOM) for all commercial software sold to government",
  "Migration to Zero Trust Architecture across all federal agencies",
  "Mandatory FIDO2 Hardware Multi-Factor Authentication and Data Encryption",
  "Strict 72-hour cyber incident reporting to CISA"
];`
  },
  {
    id: 17,
    question: "What is 'Code-Signing Key Protection' (FIPS 140-2 Level 3 HSM) and how does it prevent rogue binary signing?",
    shortAnswer: "Storing private code-signing keys inside tamper-resistant hardware security modules (HSMs) that require multi-party approval before signing any binary.",
    explanation: "If code-signing keys are stored on a general file server, any compromised developer account can sign malicious binaries. Hardware Security Modules (HSMs) enforce physical protection and require multi-person authorization (e.g. M-of-N quorum) to release a cryptographic signature.",
    hint: "Hardware Security Modules (HSMs) requiring multi-party quorum authorization to sign code.",
    level: "Moderate",
    codeExample: `// Hardware Code Signing Quorum (M-of-N):
// Signing a release binary requires 2 out of 3 senior security officers to approve:
// Officer 1 (YubiKey Touch) + Officer 2 (YubiKey Touch) → HSM Signs Binary`
  },
  {
    id: 18,
    question: "What is 'SUPERNOVA' and how did it differ from the primary SUNBURST backdoor?",
    shortAnswer: "A separate, completely distinct webshell (.NET web shell in `logoimagehandler.ashx`) planted on SolarWinds servers by a separate Chinese threat actor (Spirited Bamboo).",
    explanation: "During the forensic investigation of SolarWinds, analysts discovered a second, unrelated compromise: SUPERNOVA. Unlike the Russian SVR's build pipeline implant, SUPERNOVA was an in-memory .NET web shell injected directly into an internet-facing Orion server by a Chinese state-sponsored group, demonstrating that high-value vendors are frequently targeted by multiple independent adversaries simultaneously.",
    hint: "An unrelated .NET web shell planted on Orion servers by a Chinese state-sponsored actor.",
    level: "Expert",
    codeExample: `// SUPERNOVA In-Memory C# Compiler Web Shell:
// File: /Orion/Web/logoimagehandler.ashx
// Accepted dynamic C# source code in HTTP parameters, compiled it in memory via CodeDomProvider, and executed it without touching disk!`
  },
  {
    id: 19,
    question: "What is 'Out-of-Band Incident Communication' and why was it vital during the SolarWinds response?",
    shortAnswer: "Using completely separate, non-corporate communication channels (e.g. Signal, out-of-band email) because attackers had full access to corporate Microsoft 365 and Exchange mailboxes.",
    explanation: "Because APT29 had established backdoor access to executive mailboxes and Microsoft Teams chats at victim organizations, security teams discussing breach remediation over corporate email were tipping off the hackers in real-time. Incident response teams had to communicate exclusively via out-of-band encrypted mobile apps (Signal) and air-gapped laptops.",
    hint: "Using external encrypted channels like Signal because corporate email was monitored by hackers.",
    level: "Moderate",
    codeExample: `// Incident Response Operational Protocol:
const incidentCommRule = {
  corporateEmail: "COMPROMISED (Assume SVR is reading all Exchange / M365 messages)",
  corporateTeamsChat: "COMPROMISED",
  authorizedIncidentChannel: "End-to-End Encrypted Signal App on personal non-domain mobile devices"
};`
  },
  {
    id: 20,
    question: "How did Microsoft's source code repositories get accessed during the SolarWinds campaign?",
    shortAnswer: "Attackers used compromised internal service accounts to view (read-only) proprietary source code repositories for Azure, Exchange, and Windows components.",
    explanation: "In December 2020, Microsoft confirmed that SVR hackers accessed internal accounts with viewing rights to source code repositories. While Microsoft stated that no code was modified (build integrity remained intact), the adversary read code to search for new architectural vulnerabilities in cloud identity services.",
    hint: "Compromised internal service accounts accessed source code repositories in read-only mode.",
    level: "Moderate",
    codeExample: `// Microsoft MSRC Investigation Finding:
const microsoftFinding = {
  impact: "Attacker viewed source code for Azure, Exchange, and Windows components",
  modificationConfirmed: false, // Repositories were read-only
  remediation: "Revoked all compromised service credentials and hardened repository access with PIM"
};`
  },
  {
    id: 21,
    question: "What is 'Continuous CI/CD Pipeline Integrity Monitoring' and how does it detect SUNSPOT-like source code swaps?",
    shortAnswer: "Cryptographically hashing all source files immediately before compiler execution and comparing the hashes against the verified Git commit repository in real time.",
    explanation: "If a tool like SUNSPOT attempts to swap `InventoryManager.cs` in the split-second before `msbuild.exe` runs, an inline CI/CD integrity monitor detects that the disk file hash does not match the immutable Git commit SHA-256 hash, immediately terminating the build job.",
    hint: "Comparing disk source file hashes against verified Git commit hashes right before compilation.",
    level: "Expert",
    codeExample: `// CI/CD Pre-Build Integrity Hook:
function verifySourceIntegrityBeforeCompile() {
    const diskHash = calculateFileSha256("src/InventoryManager.cs");
    const gitCommitHash = getGitBlobHash("HEAD:src/InventoryManager.cs");
    if (diskHash !== gitCommitHash) {
        throw new SecurityError("BUILD TAMPERING DETECTED: Source code modified on disk during build!");
    }
}`
  },
  {
    id: 22,
    question: "What is 'Conditional Access' in cloud identity (Microsoft Entra ID / Okta) and how does it restrict Golden SAML abuse?",
    shortAnswer: "Enforcing policies that require logins to originate from compliant, Intune-managed corporate hardware devices with explicit IP location and FIDO2 authentication.",
    explanation: "Golden SAML allows an attacker to forge an authentication assertion. However, if Microsoft Entra ID enforces Conditional Access requiring the request to come from a cryptographically attested, Intune-compliant device certificate, the attacker's forged token is rejected because their machine lacks the requisite device hardware certificate.",
    hint: "Requiring Intune-managed compliant hardware device certificates to accept tokens.",
    level: "Expert",
    codeExample: `// Microsoft Entra ID Conditional Access Policy:
const conditionalAccessPolicy = {
  targetApps: ["All Cloud Apps (Office 365, Azure Portal)"],
  accessControls: {
    requireCompliantDevice: true, // Must possess valid Intune TPM Hardware Certificate
    requireMfa: "FIDO2_Hardware_Key",
    blockUntrustedLocations: true
  }
};`
  },
  {
    id: 23,
    question: "Why did SolarWinds' use of a simple plaintext password (`solarwinds123`) for an internal update server become a major public controversy?",
    shortAnswer: "A security researcher had discovered that a SolarWinds public GitHub repository exposed an internal FTP update server password (`solarwinds123`) in plaintext in 2019.",
    explanation: "In November 2019, security researcher Vinoth Kumar notified SolarWinds that an accessible GitHub repo contained hardcoded credentials (`solarwinds123`) providing write access to a SolarWinds update server. While investigators concluded this was distinct from the SVR build pipeline hack, it highlighted systemic internal security weaknesses.",
    hint: "An exposed GitHub repository containing hardcoded passwords for an internal update server.",
    level: "Moderate",
    codeExample: `// Exposed GitHub Leak (2019):
// Repository: github.com/solarwinds/.../credentials.txt
// Username: ftpuser
// Password: solarwinds123 (Extremely weak password for an enterprise software vendor)`
  },
  {
    id: 24,
    question: "What is 'Software Supply Chain Security' and what are the three primary attack vectors in modern software delivery?",
    shortAnswer: "1. Upstream Open-Source Dependency Poisoning; 2. Compromise of CI/CD Build Pipelines (SolarWinds); 3. Hijacking of Distribution / Update Gateways.",
    explanation: "Supply chain attacks target the software creation and delivery lifecycle. An attacker can inject malicious code into open-source npm/PyPI packages, compromise the automated build cluster (SUNSPOT), or hijack code-signing keys and CDN distribution servers to push malware to millions of end users.",
    hint: "Dependency poisoning, build pipeline compromise, and distribution channel hijacking.",
    level: "Moderate",
    codeExample: `// 3 Pillars of Supply Chain Threats:
const supplyChainVectors = [
  "Vector 1: Open-Source Dependency Poisoning (e.g. Typosquatting in npm / PyPI)",
  "Vector 2: Build Pipeline Manipulation (e.g. SolarWinds SUNSPOT compiler injection)",
  "Vector 3: Distribution & Update Server Hijacking (e.g. M.E.Doc NotPetya update server)"
];`
  },
  {
    id: 25,
    question: "How did the Russian SVR maintain operational security (OPSEC) regarding the source IP addresses used during the campaign?",
    shortAnswer: "They purchased VPN and VPS infrastructure using cryptocurrencies, registered fake identity domains, and dedicated separate unique IP addresses to each victim organization.",
    explanation: "The SVR never reused C2 IP addresses across different victims. If they breached the Department of Homeland Security, they assigned a unique IP address block dedicated exclusively to DHS. This prevented security researchers from correlating infections across different victim networks using shared IP indicators of compromise.",
    hint: "Dedication of unique, non-reused IP addresses and infrastructure for every victim organization.",
    level: "Expert",
    codeExample: `// SVR Per-Victim Infrastructure Segregation:
const svrOpsecMatrix = {
  victimA_Treasury: { c2Domain: "unique-c2-block-01.com", egressProxy: "US-Residential-IP-Range-1" },
  victimB_Microsoft: { c2Domain: "unique-c2-block-02.com", egressProxy: "US-Residential-IP-Range-2" },
  opsecRule: "ZERO shared infrastructure between target organizations to prevent cross-correlation"
};`
  },
  {
    id: 26,
    question: "What is 'CISA Cyber Safety Review Board' (CSRB) and how did SolarWinds inspire its formation?",
    shortAnswer: "An independent investigative board modeled after the National Transportation Safety Board (NTSB) to conduct comprehensive post-mortem reviews of major national cyber incidents.",
    explanation: "Recognizing that complex supply chain and nation-state breaches require transparent root-cause analysis without legal recrimination, President Biden established the CSRB to investigate major cyber events (e.g. Log4j, SolarWinds, Microsoft cloud breaches) and publish public remediation recommendations.",
    hint: "An NTSB-style investigative board conducting transparent national cyber incident post-mortems.",
    level: "Moderate",
    codeExample: `// CISA CSRB Charter:
const csrbCharter = {
  model: "National Transportation Safety Board (NTSB) for Aviation Disasters",
  mandate: "Conduct transparent, independent forensic reviews of landmark cyber events",
  objective: "Publish authoritative architectural lessons learned for public and private enterprise defense"
};`
  },
  {
    id: 27,
    question: "What is 'Air-Gapped Build Signing' and how does it isolate the code-signing process from the compilation environment?",
    shortAnswer: "The build server compiles the binary, hashes it, and sends ONLY the cryptographic hash to an isolated, air-gapped signing server that verifies build provenance before signing.",
    explanation: "In an air-gapped signing architecture, the build server never has access to the private signing key. The signing server independently inspects the build attestations, verifies SLSA provenance, and applies the signature only after multi-factor policy verification.",
    hint: "Sending only the hash to an air-gapped signing server that verifies provenance before signing.",
    level: "Expert",
    codeExample: `// Air-Gapped Code Signing Pipeline:
// 1. Ephemeral Build Runner compiles binary → SHA-256: e3b0c44...
// 2. Transmits SHA-256 hash + SLSA Attestation to Air-Gapped Signing HSM
// 3. Signing HSM verifies cryptographic provenance → Appends Authenticode signature`
  },
  {
    id: 28,
    question: "How does the Indian DPDP Act 2023 treat software vendors and managed service providers (MSPs) who distribute trojanized updates?",
    shortAnswer: "Vendors acting as third-party Data Processors face severe contract termination and statutory liability if supplier vulnerabilities lead to the compromise of enterprise citizen PII.",
    explanation: "Under the DPDP Act 2023, enterprises (Data Fiduciaries) are legally bound to ensure their software supply chain vendors (Data Processors) maintain robust security standards. A vendor in Kolkata or Barrackpore that distributes compromised software updates exposing consumer data can be held liable for statutory non-compliance.",
    hint: "Data Processors are held to strict statutory standards for supply chain software security.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Supply Chain Vendor Governance:
const dpdpVendorGovernance = {
  requirement: "Mandatory third-party software supply chain risk assessment",
  contractualObligation: "Vendors must provide verified SBOMs and SLSA build attestations",
  regulatoryPenalties: "Data Protection Board of India financial penalties up to ₹250 Crores"
};`
  },
  {
    id: 29,
    question: "What is 'Network Egress Whitelisting' for IT management servers and why should SolarWinds Orion servers never have unrestricted internet access?",
    shortAnswer: "IT management platforms monitoring internal servers require zero outbound Internet access, except to strictly whitelisted vendor licensing endpoints via an authenticating proxy.",
    explanation: "The SolarWinds Orion server sat at the core of enterprise networks with administrative credentials to thousands of internal servers. Permitting an internal IT management server to resolve arbitrary external DNS names or open outbound HTTPS sessions allowed SUNBURST to beacon to its C2 server unhindered.",
    hint: "Restricting IT management servers from accessing the public Internet except via strict whitelists.",
    level: "Moderate",
    codeExample: `// Egress Firewall Rule for Core IT Monitoring Servers:
/*
Rule: ISOLATE_CORE_NOC_MONITORING
Source: 10.10.1.50 (SolarWinds Orion Master)
Destination: INTERNET_ANY
Action: DROP
Allowed Exception:
  - Destination: updates.solarwinds.com:443 (Via Authenticated Forward Proxy Only)
*/`
  },
  {
    id: 30,
    question: "What ultimate architectural lesson must computer science and cybersecurity students in Barrackpore and Kolkata remember from the SolarWinds incident?",
    shortAnswer: "Never trust a binary simply because it is digitally signed; enforce Zero Trust across build pipelines, implement SLSA provenance, isolate IT management servers, and protect cloud identity from Golden SAML forgery.",
    explanation: "SolarWinds shattered the assumption that signed commercial software is safe. Modern cybersecurity requires verifying build provenance (SLSA), isolating CI/CD runners, locking down ADFS token-signing certificates against Golden SAML, and blocking outbound internet connectivity from core IT management infrastructure.",
    hint: "Signed software cannot be blindly trusted; enforce SLSA provenance, isolate CI/CD, and protect identity.",
    level: "Moderate",
    codeExample: `// The SolarWinds Supply Chain Defense Blueprint:
const supplyChainDefenseBlueprint = [
  "1. Implement SLSA Level 3/4 build provenance and ephemeral, hermetic build environments",
  "2. Cryptographic Code-Signing Keys secured in FIPS 140-2 Level 3 HSMs with multi-person quorum",
  "3. Zero outbound Internet access for internal IT management and monitoring infrastructure",
  "4. Protect Active Directory Federation Services (ADFS) and enforce Intune-managed Conditional Access",
  "5. Continuous Passive DNS and DGA anomaly detection across all enterprise recursive resolvers"
];`
  }
];

export default questions;
