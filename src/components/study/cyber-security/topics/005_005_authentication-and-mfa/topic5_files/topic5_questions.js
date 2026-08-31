const questions = [
  {
    id: 1,
    question: "Why does NIST SP 800-63B explicitly deprecate SMS OTP as a restricted authentication method?",
    shortAnswer: "Because SMS messages travel in cleartext across cellular networks and are fundamentally vulnerable to SIM Swapping attacks, SS7 cellular signaling redirection, IMSI catchers (false base stations), and mobile malware interceptors.",
    explanation: "Unlike hardware keys or app-based cryptographic authenticators, SMS delivery relies on an unauthenticated telecommunication infrastructure outside the enterprise's control.",
    hint: "Vulnerable to SIM swapping, SS7 interception, and cellular eavesdropping.",
    level: "Basic",
    codeExample: `// NIST SP 800-63B Status:
// SMS OTP   : RESTRICTED (Phishable, Deprecated for high assurance)
// FIDO2 Key : PERMITTED (AAL3 Phishing-Resistant Standard)`
  },
  {
    id: 2,
    question: "What is the step-by-step mechanism of a SIM Swapping attack?",
    shortAnswer: "1. Attacker harvests victim's personal identity details. 2. Attacker social engineers or bribes a telecom retail clerk to issue a replacement SIM. 3. Carrier HLR binds the victim's phone number (MSISDN) to the attacker's SIM (IMSI). 4. Victim's phone loses service. 5. Attacker intercepts all SMS OTPs to drain banking accounts.",
    explanation: "Because the telecommunication network now routes all cellular calls and SMS messages to the attacker's physical SIM card, any service using SMS for password resets is immediately compromised.",
    hint: "Tricking the telecom provider into transferring a phone number to an attacker's SIM card.",
    level: "Basic",
    codeExample: `// SIM Swap Timeline:
// 14:00 - Attacker presents fake ID at telecom store in Ichapur.
// 14:05 - Carrier activates new SIM card (IMSI: 404450...).
// 14:06 - Susmita's phone shows "No Service" 🚫.
// 14:08 - Attacker resets net banking password using intercepted SMS OTP.`
  },
  {
    id: 3,
    question: "What is SS7 (Signaling System No. 7) and what fundamental architectural flaw enables SMS interception?",
    shortAnswer: "SS7 is the global telecommunication signaling protocol suite developed in 1975 to route calls, SMS, and roaming between international carriers. Its fundamental flaw is that it has zero cryptographic authentication, trusting all messages sent between carrier gateways.",
    explanation: "Because any entity with SS7 network access can issue commands to any telecom carrier worldwide without cryptographic identity verification, attackers can easily forge location update commands.",
    hint: "Legacy 1975 telecom protocol lacking mutual cryptographic authentication between carrier nodes.",
    level: "Moderate",
    codeExample: `// SS7 Architectural Flaw:
// Zero Cryptographic Signatures → Any carrier node trusts messages from any other connected node globally.`
  },
  {
    id: 4,
    question: "Explain the role of the SS7 MAP command `SEND_ROUTING_INFO_FOR_SM` (SRI_SM) in SMS interception.",
    shortAnswer: "SRI_SM is sent by an attacker to the victim's Home Location Register (HLR) querying for the routing details needed to deliver an SMS. The HLR responds by leaking the subscriber's IMSI and the address of their currently serving MSC (Mobile Switching Center).",
    explanation: "With the victim's IMSI and serving MSC in hand, the attacker can proceed to hijack the subscriber's roaming profile using a spoofed `UpdateLocation` request.",
    hint: "Queries the HLR to leak the victim's IMSI and serving MSC address.",
    level: "Expert",
    codeExample: `// SS7 SRI_SM Flow:
// Attacker → [SRI_SM: MSISDN=+919830012345] → Victim HLR
// Victim HLR → Returns: [IMSI: 404450123456789, Serving MSC: 103.220.14.88]`
  },
  {
    id: 5,
    question: "How does an attacker use the SS7 `MAP_UPDATE_LOCATION` command to redirect SMS OTP messages to their own rogue equipment?",
    shortAnswer: "The attacker sends a forged `MAP_UPDATE_LOCATION` message to the victim's HLR, falsely asserting that the subscriber has roamed to a rogue MSC operated by the attacker. The HLR updates its database and routes all subsequent incoming SMS OTPs to the attacker's switch.",
    explanation: "The victim's real phone remains oblivious to the redirection while banking SMS messages are delivered straight to the adversary's terminal.",
    hint: "Falsely updates the HLR that the subscriber has roamed to an attacker-controlled mobile switching center.",
    level: "Expert",
    codeExample: `// Spoofed Location Update:
// Attacker MSC → [MAP_UPDATE_LOCATION: IMSI=404450..., New_VLR=Attacker_VLR] → Home HLR
// Bank sends OTP → HLR routes SMS to Attacker_VLR in cleartext!`
  },
  {
    id: 6,
    question: "What is an IMSI Catcher (Stingray) and how does it intercept SMS OTPs over the air?",
    shortAnswer: "An IMSI Catcher is a rogue, portable base station (cell tower) that transmits stronger cellular beacon signals than legitimate towers, forcing nearby phones to connect to it. It then forces the connection to downgrade to 2G GSM to intercept cleartext SMS traffic.",
    explanation: "Because 2G GSM uses weak A5/1 or unencrypted A5/0 ciphers and lacks mutual base station authentication, the rogue tower easily decrypts and captures SMS OTPs sent over radio frequencies.",
    hint: "Rogue cell tower forcing mobile devices to connect and downgrade to unencrypted 2G GSM.",
    level: "Moderate",
    codeExample: `// IMSI Catcher Attack:
// Rogue Base Station → Transmits maximum power GSM signal → Phone connects → Forces A5/0 (No Encryption) → Intercepts SMS OTP.`
  },
  {
    id: 7,
    question: "How does the Carrier-Grade SIM-Swap Timestamp API protect banking portals before dispatching SMS OTPs?",
    shortAnswer: "Before sending an SMS OTP for a transaction, the bank's backend queries the telecom carrier's API (e.g., Airtel / Jio API) to verify when the SIM card associated with the phone number was last replaced. If the SIM was swapped within the last 24–48 hours, the OTP is blocked.",
    explanation: "This real-time check detects that a SIM swap occurred recently, automatically freezing high-value fund transfers until the customer verifies identity in person.",
    hint: "Bank queries telecom carrier to check if SIM was changed in the last 24-48 hours before sending OTP.",
    level: "Moderate",
    codeExample: `// Bank Verification API Call:
const simStatus = await telecomApi.checkSimAge("+919830012345");
if (simStatus.hoursSinceSwap < 48) {
    blockTransactionAndAlertFraudTeam("RECENT_SIM_SWAP_DETECTED");
}`
  },
  {
    id: 8,
    question: "Why is Email-based OTP fundamentally insecure for high-value financial authentications?",
    shortAnswer: "Email accounts are frequently compromised via phishing, infostealer malware, unencrypted IMAP/POP3 connections, credential reuse, and weak email provider session security, turning the email inbox into a single point of failure.",
    explanation: "If an adversary compromises a user's Gmail or corporate Outlook account, they can reset all third-party account passwords and intercept email OTP codes simultaneously.",
    hint: "Email inboxes are vulnerable to phishing, session theft, and unencrypted mail protocols.",
    level: "Basic",
    codeExample: `// Single Point of Failure:
// Compromised Email Inbox = Password Reset Links + Email OTP Codes → Total Digital Identity Takeover ❌`
  },
  {
    id: 9,
    question: "What is the difference between an MSISDN, IMSI, and IMEI in cellular network architecture?",
    shortAnswer: "MSISDN is the public phone number dialed by users (+91 98300 12345). IMSI is the unique 15-digit internal subscriber identity embedded in the SIM card chip. IMEI is the unique 15-digit physical hardware serial number of the phone handset.",
    explanation: "In a SIM swap attack, the MSISDN remains identical while the IMSI is changed to the attacker's SIM chip.",
    hint: "MSISDN = Phone Number; IMSI = SIM Card Chip ID; IMEI = Phone Handset Hardware Serial.",
    level: "Basic",
    codeExample: `// Cellular Identifiers:
// MSISDN : "+91 98300 12345" (Dialable number)
// IMSI   : "404 45 0123456789" (SIM Card Chip ID)
// IMEI   : "860123045678901" (Physical Handset Serial Number)`
  },
  {
    id: 10,
    question: "What is an SMS Forwarding / Call Forwarding abuse vector in OTP theft?",
    shortAnswer: "Adversaries trick users into dialing MMI codes (like `*21*<attacker_number>#`) via social engineering or use compromised carrier web portals to enable unconditional SMS/call forwarding, redirecting OTP messages to the attacker's phone.",
    explanation: "Telecom operators in India have restricted MMI-based SMS forwarding to counter this widespread social engineering vector.",
    hint: "Using telecom forwarding codes (e.g. *21*) to redirect incoming SMS messages to another phone.",
    level: "Moderate",
    codeExample: `// Malicious MMI Code:
// Attacker instructs victim: "Dial *21*9830099999# to update 5G SIM" → Unconditionally forwards all SMS OTPs to attacker!`
  },
  {
    id: 11,
    question: "How do Mobile Infostealer Trojans (e.g., FluBot, SharkBot, TeaBot) intercept SMS OTPs on Android devices?",
    shortAnswer: "Malware tricks users into granting Android Accessibility Services or SMS Reading permissions (`READ_SMS`, `RECEIVE_SMS`), allowing the background malware to silently intercept, read, and exfiltrate incoming banking OTPs to a C2 server while hiding notifications from the user.",
    explanation: "Once granted Accessibility Services, malware can also perform automated on-screen taps to authorize fraudulent banking transactions.",
    hint: "Abuses Android Accessibility and SMS permissions to silently read and exfiltrate OTPs.",
    level: "Moderate",
    codeExample: `// Malicious Android Permissions:
// <uses-permission android:name="android.permission.RECEIVE_SMS" />
// <uses-permission android:name="android.permission.BIND_ACCESSIBILITY_SERVICE" />`
  },
  {
    id: 12,
    question: "What is an SS7 Signaling Firewall and how does it protect cellular carriers from rogue location queries?",
    shortAnswer: "An SS7 firewall sits at the international interconnect gateway of a telecom carrier, inspecting incoming MAP/CAP messages and filtering out unauthorized `SRI_SM`, `ProvideSubscriberInfo`, or `UpdateLocation` requests originating from suspicious global titles or unverified foreign networks.",
    explanation: "Signaling firewalls enforce strict access control policies, ensuring foreign operators cannot query subscriber location data without an active roaming agreement.",
    hint: "Filters unauthorized MAP signaling packets like SRI_SM at international telecom gateway boundaries.",
    level: "Expert",
    codeExample: `// SS7 Firewall Rule:
// IF packet == MAP_SEND_ROUTING_INFO_FOR_SM AND Origin_Global_Title != Authorized_Roaming_Partner
// THEN DROP PACKET AND LOG ALERT`
  },
  {
    id: 13,
    question: "Why does 5G Standalone (5G SA) provide superior resistance to cellular signaling eavesdropping compared to legacy 2G/3G/4G?",
    shortAnswer: "5G SA replaces the unauthenticated SS7 protocol with the Service-Based Architecture (SBA) using HTTP/2 over TLS 1.3, JSON payloads, and mutual certificate authentication (mTLS) with SEPP (Security Edge Protection Proxy) between roaming carrier networks.",
    explanation: "Additionally, 5G SA encrypts the subscriber identity over the radio interface using Subscription Concealed Identifier (SUCI) with elliptic curve cryptography (ECIES), neutralizing IMSI Catchers.",
    hint: "Uses HTTP/2 over TLS 1.3 and ECIES-encrypted SUCI to defeat IMSI catchers and SS7 attacks.",
    level: "Expert",
    codeExample: `// 5G SA Security:
// Plaintext IMSI (Vulnerable 4G/3G) → Encrypted SUCI (5G ECIES Curve25519) → Rogue towers cannot read subscriber ID!`
  },
  {
    id: 14,
    question: "What is the economic cost of an international SS7 exploitation lease on the dark web compared to the potential financial gain in a banking heist?",
    shortAnswer: "SS7 global title access can be leased on underground cybercrime forums for ₹1,50,000 to ₹4,00,000 per month. Adversaries use this access to execute multi-million rupee targeted banking heists across dozens of compromised corporate accounts.",
    explanation: "The high financial return makes SS7 signaling attacks a preferred vector for organized transnational cybercrime syndicates.",
    hint: "Leased for a few thousand dollars on the dark web to execute multi-million rupee banking account takeovers.",
    level: "Moderate",
    codeExample: `// Attack ROI:
// SS7 Access Cost : ₹2,50,000 / month
// Target Breaches  : 5 High-Net-Worth Accounts (₹2,50,00,000 stolen)
// Attacker Profit  : 100x return on investment`
  },
  {
    id: 15,
    question: "How does WhatsApp OTP / Telegram OTP delivery compare in security to traditional SMS OTP?",
    shortAnswer: "WhatsApp/Telegram delivery uses end-to-end TLS encryption over IP networks, completely bypassing the vulnerable SS7 cellular signaling and IMSI catchers. However, it remains vulnerable to account takeover of the messaging app itself via SIM swapping or phishing.",
    explanation: "While immune to radio frequency sniffing, messaging app OTPs still rely on phone numbers as identity anchors, inheriting SIM swap risks.",
    hint: "Immune to SS7 and radio eavesdropping, but still vulnerable if the messaging account is SIM-swapped.",
    level: "Moderate",
    codeExample: `// WhatsApp OTP Delivery:
// Bank Server → [Encrypted HTTPS / TLS 1.3] → Meta WhatsApp API → Encrypted Push to User Device (No SS7 involved ✔)`
  },
  {
    id: 16,
    question: "What immediate symptom indicates to a victim that their smartphone is actively undergoing a SIM Swap attack?",
    shortAnswer: "The smartphone abruptly loses all cellular network connectivity, displaying 'No Service', 'Emergency Calls Only', or 'SIM Failure', while colleagues and family in the same room have normal cellular reception.",
    explanation: "Because a cellular network allows only one active SIM per IMSI/MSISDN pairing, the activation of the attacker's SIM automatically disconnects the legitimate SIM card.",
    hint: "Sudden and permanent loss of cellular signal ('No Service') while in an area with good coverage.",
    level: "Basic",
    codeExample: `// Victim Symptom:
// Status Bar: [ 🚫 No Service / Emergency Calls Only ] → Incoming calls/SMS instantly fail.`
  },
  {
    id: 17,
    question: "What is an e-SIM (Embedded SIM) profile transfer vulnerability and how is it exploited in modern SIM swap fraud?",
    shortAnswer: "Attackers compromise a victim's email or self-service telecom web account and initiate an online 'Convert to e-SIM' request. The carrier emails a QR code to the victim's compromised email, which the attacker scans on their own device, activating the e-SIM within minutes without physical store visits.",
    explanation: "Digital e-SIM provisioning eliminates the need for physical store visits, enabling automated remote SIM swaps across international borders.",
    hint: "Exploiting online e-SIM QR code generation sent to a compromised email address.",
    level: "Moderate",
    codeExample: `// e-SIM Attack Vector:
// Compromised Email → Attacker requests "Convert to e-SIM" on Airtel/Jio portal → Scans QR code from email → Number transferred!`
  },
  {
    id: 18,
    question: "Why does multi-factor authentication using App-based TOTP (Google Authenticator) remain 100% functional even after a successful SIM swap attack?",
    shortAnswer: "Because TOTP secrets are stored in the local storage of the authenticator application and generate codes using internal hardware clocks. The app does not rely on the cellular phone number or incoming SMS messages, making SIM swaps completely irrelevant.",
    explanation: "Even if the attacker controls the victim's phone number, they cannot generate TOTP codes without physical possession of the victim's local device storage.",
    hint: "App-based TOTP relies on local device storage and clocks, not cellular SIM cards.",
    level: "Basic",
    codeExample: `// SIM Swapped: Attacker gets phone number (+91 98300...)
// User App   : Google Authenticator still holds local Base32 secret on physical phone → Attacker CANNOT generate valid TOTP codes! ✔`
  },
  {
    id: 19,
    question: "What is the Diameter protocol and what security improvements does it provide over SS7 in 4G LTE networks?",
    shortAnswer: "Diameter is the next-generation AAA signaling protocol used in 4G LTE and IMS networks. Unlike SS7 (which lacked native encryption), Diameter supports IPsec and TLS encapsulation between roaming partners.",
    explanation: "However, misconfigured Diameter networks without strict interconnect filtering are still vulnerable to location tracking and subscriber spoofing.",
    hint: "4G LTE successor to SS7 supporting IPsec and TLS transport encryption.",
    level: "Moderate",
    codeExample: `// SS7 vs Diameter:
// SS7      : Unencrypted MAP signaling over legacy TDM/SIGTRAN (Vulnerable to cleartext sniffing ❌)
// Diameter : Encrypted AAA signaling over TCP/SCTP with TLS 1.3 encapsulation ✔`
  },
  {
    id: 20,
    question: "How do Fraud Detection Systems at major Indian banks flag SIM-Swap attempts using Aadhaar-linked verification or behavioral biometric analysis?",
    shortAnswer: "Banks monitor device hardware fingerprints (IMEI), IP geolocations, typing cadence, and carrier SIM-age APIs. If a login originates from a new device IMEI immediately following a carrier-reported SIM change, the bank requires biometric face verification via Aadhaar / DigiLocker before processing transfers.",
    explanation: "Correlating device hardware changes with telecom network events exposes fraudulent takeover attempts in real time.",
    hint: "Correlates new device IMEI with recent telecom SIM swap events to trigger step-up biometric checks.",
    level: "Moderate",
    codeExample: `// Correlated Fraud Rule:
// IF (New_IMEI == True AND Carrier_SIM_Age < 24_Hours AND Transaction_Amount > ₹50,000)
// THEN Force_Aadhaar_Biometric_Step_Up();`
  },
  {
    id: 21,
    question: "What is a Silent SMS (Type 0 SMS / Ping SMS) and how is it used in SS7 reconnaissance?",
    shortAnswer: "A Type 0 SMS is a special signaling message delivered to a phone without triggering any sound, vibration, or notification on the screen. The mobile device automatically acknowledges receipt to the cellular tower, leaking its exact serving cell tower ID and geographic location to the sender.",
    explanation: "Law enforcement and threat actors use Silent SMS to track targets' real-time physical movements without alerting them.",
    hint: "An invisible SMS that triggers no notification but forces the phone to acknowledge receipt, leaking location.",
    level: "Expert",
    codeExample: `// Silent SMS Protocol:
// TP-PID byte set to 0x40 (Type 0) → Phone returns delivery report ACK → Exposes Cell Tower BSSID/Location.`
  },
  {
    id: 22,
    question: "How does strict in-person KYC (Know Your Customer) biometric verification at telecom stores prevent retail-level SIM swap fraud?",
    shortAnswer: "Mandating that any replacement SIM card request requires the customer to present physical fingerprints or iris scans verified in real time against the national identity database (Aadhaar UIDAI) prevents store clerks from issuing duplicate SIMs based on fake photocopies.",
    explanation: "Biometric live verification eliminates human bribery of retail store clerks by making duplicate SIM issuance impossible without the legitimate owner's biological presence.",
    hint: "Requires live biological fingerprint/iris verification against UIDAI to issue replacement SIMs.",
    level: "Basic",
    codeExample: `// In-Person Biometric KYC:
// Customer touches fingerprint sensor → Matched with UIDAI central database → Store system unlocks replacement SIM.`
  },
  {
    id: 23,
    question: "What is an SMS Sniffing attack over unencrypted Wi-Fi using Wireshark, and why is standard SMS unaffected by local Wi-Fi sniffing?",
    shortAnswer: "Standard SMS messages travel across cellular radio frequencies (GSM/LTE channels) between the phone and cell tower, not over local Wi-Fi. However, if the user receives SMS via 'Wi-Fi Calling' (VoWiFi / IMS) without IPsec encapsulation, or receives email OTPs over unencrypted HTTP/IMAP, an attacker on the same Wi-Fi can sniff them.",
    explanation: "Cellular SMS is isolated from local Wi-Fi; Wi-Fi Calling routes voice and SMS through IPsec tunnels (IKEv2 / ePDG) to protect against local Wi-Fi eavesdropping.",
    hint: "Cellular SMS travels over mobile radio bands; Wi-Fi Calling uses encrypted IPsec tunnels across local Wi-Fi.",
    level: "Moderate",
    codeExample: `// VoWiFi Architecture:
// Smartphone → [Encrypted IPsec Tunnel over local Wi-Fi] → Carrier ePDG Gateway → Cellular Core.`
  },
  {
    id: 24,
    question: "Why are Transaction Monitoring Systems configured to enforce a 24-hour cooling-off period after a mobile number change on a bank account?",
    shortAnswer: "If an attacker compromises an account and changes the registered mobile phone number, enforcing a mandatory 24-hour delay (with alerts dispatched to the old phone and email) gives the legitimate owner time to contact the bank and freeze the account before transfers can occur.",
    explanation: "Cooling-off windows neutralize automated attack velocity, transforming instant cyber thefts into detectable incidents.",
    hint: "Enforces a 24-hour delay on fund transfers after phone number updates to allow dispute intervention.",
    level: "Basic",
    codeExample: `// Cooling-Off Rule:
// Mobile updated at 10:00 → Maximum transfer limit capped at ₹0 for 24 hours → Security alert sent to old registered channels.`
  },
  {
    id: 25,
    question: "What is an Over-the-Air (OTA) SIM Toolkit update and what security risks does legacy DES encryption in SIM cards introduce?",
    shortAnswer: "Telecom carriers send OTA binary SMS messages to update SIM applets. Older SIM cards used 56-bit Single-DES encryption; in attacks like 'Simjacker', adversaries crack the 56-bit key, craft malicious OTA messages, and execute arbitrary commands on the SIM card to track location or snoop on SMS.",
    explanation: "Modern SIM cards use AES-128 or 3DES to secure OTA updates and prevent applet exploitation.",
    hint: "Legacy 56-bit DES in older SIM cards can be cracked to execute unauthorized SIM Toolkit applet commands.",
    level: "Expert",
    codeExample: `// Simjacker Exploitation:
// Binary SMS → Exploits S@T Browser applet on SIM → Executes 'SEND_SHORT_MESSAGE' command without user knowledge.`
  },
  {
    id: 26,
    question: "How does the TRAI (Telecom Regulatory Authority of India) SMS scrubbing regulation (DLT - Distributed Ledger Technology) affect OTP deliverability and security?",
    shortAnswer: "DLT mandates that all commercial SMS senders (banks, portals) pre-register their sender IDs (headers) and SMS templates on a blockchain ledger. Telecom operators scrub every SMS against registered templates before transmission, preventing spammers from spoofing official bank sender IDs (e.g., 'HDFCBK').",
    explanation: "Header registration stops SMS sender ID spoofing on domestic cellular networks, preventing fake phishing SMS containing malicious links.",
    hint: "DLT blockchain ledger verifies sender IDs and templates to stop SMS header spoofing.",
    level: "Moderate",
    codeExample: `// DLT Template Verification:
// Sender Header: "AX-SBINB" | Template ID: "10078921"
// Telecom node verifies blockchain registry → Message approved for cellular dispatch ✔`
  },
  {
    id: 27,
    question: "What is the difference between In-App Push Authentication and SMS OTP in terms of cryptographic origin binding?",
    shortAnswer: "SMS OTP has ZERO cryptographic binding (it is a cleartext 6-digit number that can be entered on any phishing website). In-App Push with FIDO2/WebAuthn cryptographically binds the authentication assertion to the exact domain origin and TLS channel.",
    explanation: "This mathematical binding ensures that even if a victim is fooled by a phishing proxy, the authenticator signature cannot be accepted by the legitimate banking server.",
    hint: "SMS has no origin binding (easily relayed to phishing proxies); FIDO2 binds directly to the domain origin.",
    level: "Basic",
    codeExample: `// Comparison:
// SMS OTP   : User types '489201' into phishing site 'fake-bank.in' → Phishing proxy steals it! ❌
// FIDO2 Push: Cryptographically validates 'https://realbank.com' origin in browser → Phishing proxy fails! ✔`
  },
  {
    id: 28,
    question: "Explain the threat of SIM Swap attacks on Cryptocurrency Hardware Wallets and Exchanges.",
    shortAnswer: "Many cryptocurrency exchanges use SMS OTP for account recovery and withdrawal approvals. Attackers execute a SIM swap, trigger password resets on the exchange, intercept the SMS OTP, and immediately transfer all digital assets to irreversible external blockchain addresses.",
    explanation: "Because cryptocurrency transactions are irreversible and lack chargeback mechanisms, SMS-based MFA has caused billions in permanent crypto asset losses.",
    hint: "Irreversible crypto withdrawals executed immediately after intercepting password reset SMS OTPs.",
    level: "Moderate",
    codeExample: `// Crypto SIM Swap Attack:
// 1. SIM Swap executed on victim's phone.
// 2. Attacker resets exchange password via SMS.
// 3. 15 Bitcoin transferred to attacker wallet → Irreversible blockchain transfer (Permanent loss).`
  },
  {
    id: 29,
    question: "In a forensic analysis of a corporate executive in Barrackpore, an adversary intercepted a bank SMS OTP without performing a SIM swap and without physically approaching the executive. What was the exact technical attack vector?",
    shortAnswer: "The attacker executed an SS7 Signaling Interception attack via a leased Global Title, querying the executive's HLR via `MAP_SEND_ROUTING_INFO_FOR_SM` and injecting a spoofed `MAP_UPDATE_LOCATION` packet to redirect SMS traffic to a foreign rogue MSC.",
    explanation: "Unlike SIM swapping (which causes physical loss of service on the phone), SS7 routing redirection intercepts SMS silently without disabling the victim's physical SIM card.",
    hint: "SS7 signaling interception via rogue Global Title; intercepted SMS silently without disabling the victim's SIM.",
    level: "Expert",
    codeExample: `// SS7 Silent Interception:
// Victim's phone shows full 5G signal ✔
// SMS OTP routed overseas over SS7 MAP network → Attacker reads code in terminal → Account breached.`
  },
  {
    id: 30,
    question: "What comprehensive architectural roadmap must an enterprise follow to eliminate all vulnerabilities associated with SMS/Email OTP?",
    shortAnswer: "1. Migrate user authentication to FIDO2 / WebAuthn passwordless passkeys (NIST AAL3). 2. For legacy systems, mandate app-based TOTP (RFC 6238) with Number Matching. 3. Integrate carrier SIM-swap timestamp checking APIs for emergency SMS fallback. 4. Prohibit all password resets via cleartext email links. 5. Deploy conditional access policies evaluating device health and impossible traveler velocity.",
    explanation: "Eliminating reliance on unencrypted, telecom-controlled channels and adopting origin-bound cryptography guarantees resilience against both SIM swaps and advanced SS7 signaling attacks.",
    hint: "Adopt FIDO2 passkeys, enforce app-based TOTP with number matching, and query carrier SIM swap APIs.",
    level: "Expert",
    codeExample: `// Enterprise Hardening Roadmap:
// Step 1: Deprecate SMS/Email OTP for all administrative and financial actions.
// Step 2: Enforce YubiKey FIDO2 hardware keys (AAL3).
// Step 3: Implement real-time Carrier SIM-Swap API checks on legacy flows.`
  }
];

export default questions;
