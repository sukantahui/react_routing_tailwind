const questions = [
  {
    question: "What is Tailgating (Piggybacking) in Physical Social Engineering, and what psychological norm does it exploit?",
    shortAnswer: "Following closely behind an authorized employee through an access-controlled door without badging in; exploits the human polite instinct to hold doors open for others.",
    explanation: "Tailgating (or piggybacking) targets physical access barriers. An unauthorized attacker carries props (heavy cardboard boxes, a tray of coffees, or a fake delivery uniform) and rushes toward a closing security door behind an authorized employee in Kolkata. The employee's social conditioning dictates that letting the door slam is rude, prompting them to hold the door open, allowing the attacker to bypass electronic access gates.",
    hint: "Holding the lobby elevator door for someone who doesn't have an access key card.",
    level: "basic",
    codeExample: `// Tailgating Attack Vector:
// [Authorized Employee badges into building]
// ➔ [Attacker carrying heavy package rushes behind: "Thanks for holding that!"]
// ➔ [Employee holds door open] ➔ Physical Perimeter Breached without badge scan!`
  },
  {
    question: "What is Shoulder Surfing, and how do attackers harvest sensitive credentials in public spaces?",
    shortAnswer: "Directly observing a target's computer screen, smartphone, or PIN keypad (in person or via long-range telephoto lenses / mirrors) to capture passwords, PINs, or confidential files.",
    explanation: "Shoulder surfing occurs in coffee shops, airports, and open office environments in Salt Lake Sector V. Attackers observe keystrokes or screen displays directly over the victim's shoulder, use reflection in windows/mirrors, or record keyboard input using high-definition smartphone cameras from several meters away to capture unlock PINs and passwords.",
    hint: "Looking over someone's shoulder while they type their secret ATM code.",
    level: "basic",
    codeExample: `// Shoulder Surfing Telemetry:
// Target Location : Salt Lake Metro Station / Coffee Shop
// Observation     : Visual recording of laptop screen entering admin credentials
// Mitigation      : Polarized 30-degree privacy filter + FIDO2 biometric passkeys!`
  },
  {
    question: "What is Dumpster Diving (Trashing), and what categories of high-value intelligence do attackers recover from corporate waste?",
    shortAnswer: "Searching through corporate garbage and un-shredded waste bins to recover customer financial records, employee directories, network topology diagrams, and password sticky notes.",
    explanation: "Organizations frequently dispose of sensitive papers without shredding. Attackers inspect waste bins outside corporate offices in Kolkata, discovering printed customer PAN cards, internal phone directories, IT server naming conventions, discarded hardware with intact hard drives, and sticky notes containing passwords. This intelligence is then weaponized in spear phishing or physical infiltration.",
    hint: "Rummaging through a company's recycling dumpsters to find discarded secret paperwork.",
    level: "basic",
    codeExample: `// Dumpster Diving Intelligence Artifacts:
// 1. Employee Roster PDF printout (Names, Extensions, Direct Emails)
// 2. Discarded IT Configuration printout (Subnet IPs & Firewall Rules)
// 3. Customer Banking Forms (Aadhaar & PAN copies without shredding)`
  },
  {
    question: "How do 125kHz RFID Proximity Cards differ from 13.56MHz Cryptographic Smart Cards (MIFARE DESFire EV3) in Badge Cloning?",
    shortAnswer: "Legacy 125kHz cards transmit unencrypted fixed facility and card numbers that can be cloned in seconds using handheld devices (Proxmark3/Flipper Zero); DESFire EV3 uses AES-128 mutual cryptographic handshakes immune to cloning.",
    explanation: "Legacy 125kHz proximity cards (e.g. HID Prox, EM4100) broadcast their static identifier in plaintext to any nearby reader. An attacker standing in a Kolkata elevator with a Flipper Zero can clone an employee's badge in under 2 seconds. In contrast, 13.56MHz MIFARE DESFire EV3 cards perform a mutual cryptographic authentication challenge using AES-128, preventing replay and unauthorized badge replication.",
    hint: "A paper photocopy of a key (125kHz) vs a cryptographic smart chip with an encrypted handshake (DESFire EV3).",
    level: "expert",
    codeExample: `# Flipper Zero 125kHz RFID Badge Clone (Proxmark3):
lf search -> Found EM4100 / HID Prox Tag [Card ID: 2006A48F]
lf clone 2006A48F -> Written to blank T5577 card in 1.8 seconds (PERIMETER BREACHED!)`
  },
  {
    question: "What is an Anti-Tailgating Mantrap Portal (Security Airlock / Interlocking Portal)?",
    shortAnswer: "A physical entry enclosure with two interlocking doors equipped with optical beam sensors and weight scales, ensuring only one verified person can pass at a time.",
    explanation: "Mantraps eliminate tailgating through physical engineering. The user badges into Door 1, enters the small enclosure, and Door 1 locks behind them. Optical infrared ceiling sensors, 3D time-of-flight cameras, and floor weight scales verify that exactly one individual is inside. Only after successful biometric or badge verification does Door 2 unlock to allow entry into the secure facility.",
    hint: "A space airlock where the outer door must close and seal before the inner door can open.",
    level: "moderate",
    codeExample: `// Mantrap Interlocking State Machine:
// State 1: Door 1 Unlocks upon Badge Scan ➔ User enters enclosure ➔ Door 1 Locks
// State 2: Optical Sensor verifies count == 1 && Weight Scale == Valid
// State 3: Door 2 Unlocks ➔ User exits into data center ➔ Door 2 Locks`
  },
  {
    question: "Under the Indian Penal Code Section 441 and Section 447, what constitutes Criminal Trespass via Physical Social Engineering?",
    shortAnswer: "Entering into or upon property in the possession of another with intent to commit an offense or intimidate, insult, or annoy, punishable with imprisonment up to 3 months and fines.",
    explanation: "Section 441 IPC defines Criminal Trespass: 'Whoever enters into or upon property in the possession of another with intent to commit an offense... is said to commit criminal trespass.' Physical social engineers who tailgate or infiltrate corporate office buildings or power substations in West Bengal are prosecuted under Section 447 IPC alongside cyber law statutes.",
    hint: "IPC Section 447 covers Criminal Trespass for unauthorized physical entry.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 447):
// Offense: Infiltrating restricted SCADA substation control rooms via tailgating
// Penalty: Imprisonment for a term up to 3 Months, or with Fine up to ₹500, or with both`
  },
  {
    question: "How do Polarized Micro-Louver Privacy Screens prevent Shoulder Surfing in Public Workspaces?",
    shortAnswer: "By embedding microscopic vertical louvers that restrict the display's viewing angle to a narrow 30-degree cone directly in front of the screen, rendering the screen completely black from the sides.",
    explanation: "Micro-louver technology functions like tiny window blinds. Light emitted by the LCD is directed perpendicular to the display. When viewed directly from 0 to 30 degrees (the user's position), the screen is clear and bright. Anyone standing at an angle greater than 30 degrees sees only an opaque black screen, preventing visual eavesdropping in cafes, airports, and open offices.",
    hint: "Looking through vertical window blinds from the side where you only see the closed slats.",
    level: "basic",
    codeExample: `// Optical Privacy Screen Mechanics:
// Viewing Angle: 0° to 30° (Direct Front) ➔ 100% Visual Clarity (Authorized User)
// Viewing Angle: > 30° (Side Angles)      ➔ 0% Light Transmission / Black Display (Shoulder Surfer Blocked!)`
  },
  {
    question: "What is DIN 66399 Level P-4 / P-5 Cross-Cut Micro-Shredding, and why are Ribbon Strip Shredders Inadequate against Dumpster Diving?",
    shortAnswer: "Ribbon shredders cut paper into long strips that can be reassembled by computer vision; DIN 66399 Level P-4/P-5 micro-shreds paper into particles $\\le 30\\text{ mm}^2$, rendering reconstruction mathematically impossible.",
    explanation: "Ribbon-cut shredders slice documents into vertical strips. Automated reconstruction software (like Unshredder) scans strip edges and reassembles sensitive pages in minutes. DIN 66399 Level P-4 / P-5 cross-cut shredders destroy documents into cross-cut particles smaller than $30\\text{ mm}^2$ (cross-cut confetti), making physical or digital reconstruction impossible.",
    hint: "Cutting a photograph into 5 long strips (easy to tape back together) vs running it through a blender into tiny dust particles.",
    level: "moderate",
    codeExample: `// Document Shredding Standards Comparison:
// Strip-Cut (Level P-1) : Strips 12mm wide ➔ Reassembled via Computer Vision in 10 mins!
// Cross-Cut (Level P-4) : Particles <= 160 mm² (Confetti) ➔ Irrecoverable
// Micro-Cut (Level P-5) : Particles <= 30 mm² (Micro-dust) ➔ Maximum Security for Sensitive Data`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities for failing to enforce physical document shredding and access security?",
    shortAnswer: "Failure to implement physical security safeguards (document shredding and access control) resulting in personal data leaks triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable physical and technical security safeguards. If a hospital in Ichapur disposes of unshredded oncology records into general waste bins or permits tailgaters to walk into patient file rooms, the Data Protection Board of India (DPBI) can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to physically shred documents containing citizen data triggers maximum national penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent physical data disposal & security`
  },
  {
    question: "What is a 'Clean Desk & Clear Screen Policy' in Physical Enterprise Security?",
    shortAnswer: "A corporate mandate requiring all sensitive physical documents to be locked in drawers when unattended and all workstation screens to be locked immediately upon stepping away.",
    explanation: "A Clean Desk Policy mandates that employees must never leave printed reports, USB drives, access badges, or password sticky notes on desks. A Clear Screen Policy requires screens to lock automatically after 2-3 minutes of inactivity (via `Win+L` or screensaver timeout), ensuring that unauthorized physical visitors or cleaners cannot read sensitive data or access open sessions.",
    hint: "Locking your diary in a drawer and locking the front door whenever you leave the room.",
    level: "basic",
    codeExample: `# Group Policy Object (GPO) for Clear Screen Enforcement:
# Path: Computer Configuration -> Administrative Templates -> Control Panel -> Personalization
# Policy: Screen saver timeout = 180 seconds (3 Minutes)
# Policy: Password protect the screen saver = Enabled`
  },
  {
    question: "How do Long-Range Optical & Laser Microphones execute Acoustic Eavesdropping on Physical Meeting Rooms?",
    shortAnswer: "By aiming an invisible infrared laser beam at meeting room window glass, measuring microscopic vibrations caused by human vocal sound waves, and demodulating them into clear audio.",
    explanation: "Sound waves from spoken conversations inside a conference room in Kolkata strike window glass, causing microscopic vibrations. A laser microphone positioned across the street bounces an infrared laser off the window. The receiver measures the Doppler phase shift in the reflected beam, converting window vibrations back into crystal-clear speech audio.",
    hint: "A flashlight beam that can hear what people are whispering behind a closed glass window.",
    level: "expert",
    codeExample: `// Laser Microphone Audio Demodulation:
// [Internal Speech Sound Waves] ➔ [Microscopic Window Glass Vibrations (nm)]
// ➔ [Infrared Laser Reflection] ➔ [Photodiode Interferometer] ➔ [Demodulated Audio Stream]`
  },
  {
    question: "What is 'Badge Cloning via NFC Smartphone Apps' on Unhardened MIFARE Classic 1K Cards?",
    shortAnswer: "Using Android NFC tools (Mifare Classic Tool) to exploit the broken Crypto-1 cipher on MIFARE Classic cards, cracking secret sector keys in seconds to clone access badges.",
    explanation: "MIFARE Classic 1K RFID cards use the proprietary Crypto-1 cipher, which has been mathematically broken since 2008. An attacker holding an ordinary Android smartphone with NFC can execute nested and darkside attacks via `Mifare Classic Tool`, cracking the sector keys in under 5 seconds and cloning the badge onto a blank card or smartphone emulator.",
    hint: "Using a free smartphone app that can read and copy an old hotel room key in 2 seconds.",
    level: "expert",
    codeExample: `# Android NFC MIFARE Classic Key Recovery:
mfcuk -C -R 0:A -v 3 -> Recovering Key A for Sector 0...
Found valid Key: FFFFFFFFFFFF (Default Key) or Cracked Key: A0B1C2D3E4F5
Cloned to blank UID changeable card in 3.2 seconds!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for physical security breaches compromising critical infrastructure systems?",
    shortAnswer: "All organizations in India must report physical perimeter breaches and unauthorized physical server room access to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized physical access to critical infrastructure) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of unauthorized physical access to critical systems within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Physical Escort Protocol' / Visitor Escort Security Policy?",
    shortAnswer: "A mandatory policy requiring all external visitors, contractors, and maintenance personnel to be accompanied by an authorized employee at all times while inside the physical facility.",
    explanation: "Allowing unescorted visitors inside corporate facilities creates massive vulnerability to tailgating, rogue USB drops, and shoulder surfing. A strict Visitor Escort Policy mandates that external guests must badge in at reception, wear high-visibility visitor badges, and remain physically escorted by their corporate host until they exit the building.",
    hint: "Having a tour guide walk with you through every room in the museum so you don't wander off into the private archives.",
    level: "basic",
    codeExample: `// Physical Visitor Escort Policy Rule:
// 1. Visitor signs in at Reception ➔ Receives Red "VISITOR - MUST BE ESCORTED" Badge
// 2. Corporate Host (Mamata) escorts visitor from lobby to conference room
// 3. Visitor NEVER left unattended in office floors, server rooms, or hallways`
  },
  {
    question: "How do Optical Turnstiles with Overhead 3D Depth Sensors prevent Tailgating without Slowing Foot Traffic?",
    shortAnswer: "By using stereo vision and infrared Time-of-Flight (ToF) depth mapping to track human body volumetric shapes, sounding an instant alarm if two bodies pass on a single badge scan.",
    explanation: "Optical speed gates integrate overhead 3D depth sensors. When a user badges in, the system creates a 3D point cloud of the passing volume. If an unauthorized person follows within 30cm, the depth sensor detects two distinct human head/shoulder profiles, immediately closing the barrier flaps, flashing red LED warnings, and alerting security guards.",
    hint: "An invisible laser beam grid on the ceiling that counts human heads passing through the doorway.",
    level: "moderate",
    codeExample: `// Overhead 3D Depth Sensor Anti-Tailgating Algorithm:
let pointCloud = DepthCamera.GetPointCloud();
let humanCount = DetectHumanVolumeProfiles(pointCloud);
if (humanCount > 1 && BadgeScans == 1) {
    TriggerAlarm("TAILGATING DETECTED: Barrier Closed! Guard Alerted!");
    LockBarrierFlaps();
}`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized physical access to server rooms to extract data?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for physically accessing computer resources without permission.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer, computer system or computer network... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Physically infiltrating SCADA server rooms to copy telemetry data
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'USB Drop Attack' (Baiting via Physical Placement), and how does Curiosity override Security Training?",
    shortAnswer: "Leaving infected USB flash drives in corporate parking lots, cafeterias, or lobbies labeled 'Executive Salaries 2026'; employees plug them in out of curiosity, executing hidden malware.",
    explanation: "Physical baiting combines physical placement with human curiosity and greed. Attackers scatter branded USB flash drives in parking lots or lobbies in Kolkata labeled 'Q4_Confidential_Salaries.xlsx.lnk'. Studies prove that over 45% of employees pick up found USB drives and plug them into corporate workstations, executing hidden PowerShell stagers.",
    hint: "Dropping a shiny wrapped gift on the hallway floor that contains a spring-loaded trap.",
    level: "basic",
    codeExample: `// Physical USB Baiting Architecture:
// Storage Device : USB Flash Drive labeled "Kolkata_Staff_Bonus_2026.xlsx.lnk"
// Execution      : LNK file executes hidden PowerShell stager upon double-click!`
  },
  {
    question: "Synthesize an enterprise-scale Physical Social Engineering & Perimeter Defense Architecture.",
    shortAnswer: "A multi-layered system combining Optical Anti-Tailgating Mantraps, MIFARE DESFire EV3 AES-128 Smart Cards, DIN 66399 Level P-5 Micro-Shredding, Polarized Privacy Screens, and Clean Desk Group Policies.",
    explanation: "To achieve complete immunity against physical social engineering: 1. Perimeter Tier: Optical anti-tailgating turnstiles and mantraps with 3D depth sensors. 2. Identity Tier: 13.56MHz MIFARE DESFire EV3 smart badges with AES-128 cryptographic mutual authentication (cloning immune). 3. Document Tier: DIN 66399 Level P-5 micro-cross-cut shredding for all discarded paperwork. 4. Visual Tier: 30-degree polarized micro-louver privacy screens on all laptops. 5. Policy Tier: Enforce 3-minute screen lockouts and 100% visitor escort protocols.",
    hint: "Combine optical mantraps, DESFire EV3 smart cards, DIN P-5 micro-shredding, privacy filters, and clean desk policies.",
    level: "expert",
    codeExample: `// Master Physical Security Defense Architecture Blueprint:
// 1. Perimeter Access  : Optical Turnstiles with 3D Overhead Depth Sensors (Zero Tailgating)
// 2. Badge Technology  : MIFARE DESFire EV3 Smart Cards with AES-128 Mutual Authentication
// 3. Document Disposal : DIN 66399 Level P-5 Cross-Cut Micro-Shredders in all departments
// 4. Screen Protection : Polarized 30-degree micro-louver privacy filters + 180s screen timeout GPO
// 5. Visitor Policy    : 100% Escort Mandate with High-Visibility Red Visitor Badges`
  },
  {
    question: "What is Lock Bypassing (Shimming, Raking, and Under-Door Tools) in Physical Social Engineering Assessments?",
    shortAnswer: "Using physical lock bypass tools (latch shims, bump keys, under-door lever tools) to manipulate physical door latches without picking the key pins directly.",
    explanation: "Physical penetration testers exploit mechanical door flaws. An under-door tool slides a wire beneath a closed door to pull the interior emergency exit lever, opening the locked door in 3 seconds. Latch shims slide between the door and frame to depress un-deadlocked spring latches, bypassing key locks without leaving forensic traces.",
    hint: "Sliding a plastic credit card between the door and frame to pop open a spring lock.",
    level: "expert",
    codeExample: `// Physical Lock Bypass Countermeasures:
// 1. Install Latch Guards / Astragals on exterior doors (blocks credit card / shimming tools)
// 2. Install Under-Door Draft Blocks / Threshold Plates (blocks under-door lever tools)
// 3. Use Deadlocking Spring Latches (prevents credit card retraction)`
  },
  {
    question: "How do Faraday Bags & RFID Blocking Badge Holders protect Smart Cards from Wireless Skimming?",
    shortAnswer: "By encasing RFID/NFC cards in a flexible metallic mesh (Faraday cage) that absorbs and blocks electromagnetic radio frequency signals, preventing contactless skimming while in pockets.",
    explanation: "Attackers with high-gain RFID readers can skim credentials from employees' pockets from up to 1 meter away in crowded metros or elevators. A Faraday sleeve or RFID-blocking wallet contains conductive copper or aluminum mesh that attenuates incoming 125kHz and 13.56MHz radio waves, preventing the card's antenna from energizing and transmitting data.",
    hint: "Putting your radio in a metal box so it cannot receive any broadcast signals.",
    level: "basic",
    codeExample: `// Faraday Mesh Attenuation Principle:
// External RF Signal (13.56 MHz) ➔ [Conductive Metallic Mesh Absorbs EM Waves] ➔ 0% Signal reaches Card Antenna!`
  },
  {
    question: "Under the Indian Penal Code Section 378 and Section 379, what constitutes Theft of Physical Corporate Documents via Dumpster Diving?",
    shortAnswer: "Intending to take dishonestly any movable property out of the possession of any person without consent, punishable with imprisonment up to 3 years and fines.",
    explanation: "Section 378 IPC defines Theft. Even if documents are placed in garbage bins on private corporate property, they remain the legal property of the enterprise. Unauthorized removal of discarded documents, customer files, or discarded IT hardware from corporate premises constitutes theft under Section 379 IPC alongside cyber law violations.",
    hint: "IPC Section 379 covers Theft for stealing physical corporate documents from garbage bins.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 379):
// Offense: Removing confidential financial paperwork from corporate waste bins
// Penalty: Imprisonment for a term up to 3 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Uniform & Clipboard Impersonation' in Physical Social Engineering?",
    shortAnswer: "Wearing a high-visibility vest, carrying a clipboard, or posing as a courier/technician to create an authoritative visual appearance that discourages security guards from challenging the intruder.",
    explanation: "People subconsciously associate uniforms (fire inspectors, air conditioning technicians, courier delivery) with authority and legitimate purpose. An attacker wearing a high-visibility vest, hardhat, and carrying a clipboard walks confidently past the reception desk in Barrackpore, giving a friendly wave. Security guards assume the technician was pre-approved, failing to verify badges.",
    hint: "Putting on a chef's hat and walking into the restaurant kitchen where nobody questions you.",
    level: "moderate",
    codeExample: `// Visual Disguise Pretext:
// Attacker Attire : High-Visibility Yellow Vest + Hardhat + Clipboard + Tool Bag
// Verbal Script   : "HVAC maintenance team for the 4th floor cooling towers."
// Result          : Security waves intruder through without badge inspection!`
  },
  {
    question: "How do Optical Beam Interruption Sensors in Elevator Lobbies prevent Unauthorized Floor Access?",
    shortAnswer: "By requiring every elevator passenger to scan their badge individually before pressing floor buttons, disabling elevator dispatch if an unauthenticated passenger steps inside.",
    explanation: "In destination-dispatch elevator systems, turnstiles at the lobby scan badges and assign an elevator cab. Optical ceiling sensors inside the elevator cab verify the passenger count. If two individuals enter but only one badge was scanned, the elevator sounds an audible alert and refuses to move until the unauthenticated individual steps out.",
    hint: "An elevator that counts passengers and refuses to go up if there is an uninvited guest inside.",
    level: "moderate",
    codeExample: `// Destination Dispatch Elevator Telemetry:
// Lobby Badge Scan : Mamata (Floor 7 Authorized) ➔ Cab B Assigned
// Cab B Sensor     : Detects 2 Passengers (Mamata + Unauthenticated Tailgater)
// Action           : Cab B holds doors open ➔ Plays alert: "Please badge all passengers before travel"`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Physical Access Badges?",
    shortAnswer: "Deceiving security guards or reception staff by pretending to be an authorized employee to dishonestly obtain physical visitor badges or access keys, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating. Impersonating an authorized contractor or executive to deceive reception staff into handing over electronic access badges, master keys, or visitor passes is prosecuted under Section 420 alongside criminal trespass statutes.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for physical badge deception.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving building reception staff to obtain electronic master access badges
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Keypad Scrambling' / Randomized PIN Pad Displays in Access Control Systems?",
    shortAnswer: "A digital touchscreen PIN pad that randomizes the position of digits (0-9) on every transaction, preventing shoulder surfers from memorizing PINs by watching hand movements.",
    explanation: "Traditional mechanical PIN pads have fixed numbers, allowing observers to deduce PINs from finger positions or thermal heat signatures on keys. A scrambling PIN display randomizes the numeric layout on every screen refresh (e.g. '1' is top-left on try 1, but bottom-right on try 2). Observers watching hand movements cannot deduce the entered digits, completely defeating shoulder surfing.",
    hint: "A telephone dial where the numbers shuffle like a deck of cards every time you make a call.",
    level: "moderate",
    codeExample: `// Randomized PIN Pad Layout (Try 1 vs Try 2):
// Try 1 Display: [7] [2] [9] | [4] [0] [1] | [8] [3] [5] [6]
// Try 2 Display: [1] [5] [3] | [9] [8] [2] | [0] [7] [4] [6]
// Result: Hand movements reveal zero information to shoulder surfers!`
  },
  {
    question: "How do Secure Document Shredding Consoles (Locked Waste Bins) eliminate Dumpster Diving Risks within Office Floors?",
    shortAnswer: "By replacing open wastebaskets with locked wooden/metal consoles with narrow one-way drop slots, ensuring paper cannot be retrieved until emptied by certified shredding staff.",
    explanation: "Dumpster diving often begins inside office cubicles where discarded printouts sit in open wastebaskets. Locked shredding consoles provide a secure one-way slot. Once an employee drops a document inside, internal baffle teeth prevent paper retrieval. Only licensed, bonded shredding contractors with physical keys can open the console to perform on-site cross-cut destruction.",
    hint: "A locked postal mailbox where letters can be dropped in through the slot, but only the mail carrier has the key to open the door.",
    level: "basic",
    codeExample: `// Secure Shredding Console Specifications:
// Construction : Tamper-proof locked wooden console with 15mm one-way anti-fish slot
// Service SLA  : Certified on-site mobile DIN 66399 Level P-5 micro-shredding truck every 14 days`
  },
  {
    question: "What is 'Piggybacking vs Tailgating' in Formal Physical Security Terminology?",
    shortAnswer: "Tailgating is entering without the authorized person's consent (sneaking behind); Piggybacking is entering WITH the authorized person's explicit consent (e.g. holding the door open).",
    explanation: "While often used interchangeably in casual discussion, formal security taxonomy distinguishes the two: Tailgating occurs when an unauthorized person slips through a door behind an authorized user without their knowledge. Piggybacking occurs when an authorized employee knowingly holds the door open for an unbadged person (e.g. out of politeness or believing they are a colleague).",
    hint: "Sneaking through the gate behind someone's back (Tailgating) vs asking someone to hold the gate open for you (Piggybacking).",
    level: "basic",
    codeExample: `// Formal Terminology:
// Tailgating  : Unauthorized entry WITHOUT user consent (slipping in behind)
// Piggybacking: Unauthorized entry WITH user consent (holding door out of politeness)`
  },
  {
    question: "How do Thermal Imaging Cameras execute Post-Entry Shoulder Surfing on Physical Keypads?",
    shortAnswer: "By pointing a thermal infrared camera at a physical PIN keypad immediately after a user leaves, detecting residual body heat on pressed buttons to deduce the PIN digits and sequence.",
    explanation: "When a user presses plastic or silicone keypad buttons, body heat transfers to the keys. An attacker pointing a thermal infrared camera (FLIR) at the keypad within 60 seconds sees heat signatures: the warmest button was pressed last, and the coolest pressed button was pressed first. This allows attackers to determine both the digits and the exact sequence of the PIN.",
    hint: "Looking at hot footprints in the snow to see which path someone took.",
    level: "expert",
    codeExample: `// Thermal PIN Recovery Principle:
// Button A: 31.5°C (Warmest ➔ Pressed 4th) | Button B: 30.8°C (Pressed 3rd)
// Button C: 29.9°C (Pressed 2nd)           | Button D: 28.5°C (Pressed 1st)
// Deduced PIN: D - C - B - A (Thermal Sequence Recovery!)`
  },
  {
    question: "Synthesize the mathematical relationship between Physical Proximity Probability (P_proximity), Opportunity Factor (O_opportunity), Physical Armor Strength (R_mantrap), and Physical Social Engineering Breach Probability (P_physical).",
    shortAnswer: "Physical breach probability is modeled as P_physical = 1 - e^(- (P_proximity * O_opportunity) / R_mantrap); deploying optical anti-tailgating mantraps and DESFire EV3 cards (R_mantrap = 1000) reduces physical breach probability below 1.5%.",
    explanation: "Let $P_{\\text{proximity}} \\ge 1.0$ represent the physical proximity score (high foot traffic in open lobbies = 4.0), $O_{\\text{opportunity}} \\ge 1.0$ represent the social opportunity factor (carrying heavy boxes, un-shredded bins), and $R_{\\text{mantrap}}$ represent the physical armor strength (optical mantraps with 3D depth sensors, DESFire EV3 AES-128 smart cards, DIN P-5 micro-shredding). The physical breach probability is: $P_{\\text{physical}} = 1 - e^{-\\frac{P_{\\text{proximity}} \\times O_{\\text{opportunity}}}{R_{\\text{mantrap}}}}$. When organizations deploy optical mantraps and cryptographic smart cards ($R_{\\text{mantrap}} \\to \\infty$), physical breach probability collapses to zero.",
    hint: "Mathematical formula proving that optical mantraps and cryptographic smart cards (R_mantrap -> infinity) reduce physical breach probability to zero.",
    level: "expert",
    codeExample: `// Physical Breach Mathematical Proof:
// P_proximity = 4.0 (Busy Metro Station Lobby) | O_opportunity = 3.5 (Tailgating with Heavy Boxes)
// Without Mantrap Armor (R_mantrap = 1.0) ➔ P_physical = 1 - e^(-14.0) = 99.99% (PERIMETER BREACHED!)
// With Optical Mantrap Armor (R_mantrap = 1000) ➔ P_physical = 1 - e^(-0.014) = 1.39% (SECURED!)`
  }
];

export default questions;
