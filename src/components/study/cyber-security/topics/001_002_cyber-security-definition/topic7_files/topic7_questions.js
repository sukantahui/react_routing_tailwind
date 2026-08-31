// topic7_questions.js
// 30 Moderate to Expert Questions on Cyber Crime, Classifications, IT Act 2000 Penalties, Digital Forensics, and 1930 Reporting

const questions = [
  {
    question: "What is Cyber Crime and what are the two fundamental classifications based on the computer's role?",
    shortAnswer: "Cyber crime is any unlawful or criminal activity where a computer, digital device, or network is either the TARGET of the crime (e.g. ransomware, hacking, DDoS) or the TOOL used to commit the crime (e.g. phishing, financial fraud, cyberstalking, identity theft).",
    explanation: "Governed in India primarily by the Information Technology Act 2000 and the Bharatiya Nyaya Sanhita (BNS / IPC).",
    hint: "Illegal acts where a computer is either the target (being hacked) or the weapon/tool (used to steal money).",
    level: "basic",
    codeExample: "CyberCrimeCategories = { ComputerAsTarget: ['Ransomware', 'DDoS', 'Malware'], ComputerAsTool: ['UPI Fraud', 'Phishing', 'Identity Theft'] };"
  },
  {
    question: "What is Section 66 of the Indian Information Technology Act 2000 and what is its prescribed punishment?",
    shortAnswer: "Section 66 criminalizes computer hacking and unauthorized system tampering; anyone who dishonestly or fraudulently commits any act referred to in Section 43 is punishable with imprisonment up to 3 years, or a fine up to ₹5,00,000, or both.",
    explanation: "Applied to hackers who delete database records or deploy malware in Barrackpore.",
    hint: "Indian law against computer hacking: up to 3 years in jail and ₹5 Lakh fine.",
    level: "basic",
    codeExample: "IT_Act_Sec66: Offence = 'Hacking & System Sabotage'; Penalty = 'Imprisonment up to 3 Years + Fine up to ₹5,00,000';"
  },
  {
    question: "What is Section 66C and Section 66D of the IT Act 2000 regarding Identity Theft and Cheating by Personation?",
    shortAnswer: "Section 66C penalizes Identity Theft (fraudulently using another person's password, digital signature, or biometric) with up to 3 years imprisonment + ₹1,00,000 fine; Section 66D penalizes Cheating by Personation using computer resources with up to 3 years imprisonment + ₹1,00,000 fine.",
    explanation: "Used to prosecute criminals creating fake Facebook profiles or spoofing bank managers in Kolkata.",
    hint: "Sec 66C covers identity theft/stolen passwords; Sec 66D covers pretending to be someone else online.",
    level: "moderate",
    codeExample: "IT_Act_Penalties = { Sec66C_IdentityTheft: '3 Years + ₹1 Lakh Fine', Sec66D_CheatingByPersonation: '3 Years + ₹1 Lakh Fine' };"
  },
  {
    question: "What is the National Cyber Crime Helpline '1930' and the CFCFRMS portal in India?",
    shortAnswer: "1930 is the national citizen helpline connected to the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS); calling 1930 immediately after a fraudulent bank/UPI transfer allows police and banks to freeze stolen money across mule bank accounts in real time.",
    explanation: "Reporting within the 'Golden Hour' (first 1 to 2 hours) yields over 80% fund recovery success rates in West Bengal.",
    hint: "Dial 1930 immediately to freeze stolen money in cyber fraud cases within the golden hour.",
    level: "basic",
    codeExample: "FinancialFraudResponse: Dial_1930() → CFCFRMS_Alert → FreezeMuleAccountsInUnder120Seconds();"
  },
  {
    question: "What is SIM Swapping Fraud and how do cyber criminals execute it?",
    shortAnswer: "Criminals use fake identity documents or social engineering against telecom store employees to convince the telecom provider to port the victim’s phone number to a new SIM card under the criminal’s control, intercepting all SMS OTPs and draining bank accounts.",
    explanation: "Renders standard SMS-based two-factor banking authentication completely compromised in Ichapur.",
    hint: "Tricking a telecom store into transferring your phone number to a criminal's SIM card to steal OTPs.",
    level: "moderate",
    codeExample: "SIM_Swap_Attack: Fake_KYC_At_Store → Number_Ported_To_Attacker_SIM → SMS_OTP_Intercepted → Bank_Drained"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Digital Forensics & Incident Response (DFIR) Retainer?",
    shortAnswer: "Approximately ₹3,50,000 to ₹9,00,000 per year (providing guaranteed 2-hour SLA forensic investigator deployment, malware reverse engineering, and court-admissible forensic reporting).",
    explanation: "DFIR retainers ensure forensic specialists preserve digital chain-of-custody evidence in Kolkata in ₹.",
    hint: "Enterprise DFIR forensic retainer costs ₹3,50,000 – ₹9,00,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "Annual_DFIR_Retainer = ₹5,50,000; // 24/7 Guaranteed 2-Hour SLA Forensic Response & Evidence Preservation"
  },
  {
    question: "What is Section 66F of the IT Act 2000 regarding Cyber Terrorism?",
    shortAnswer: "Section 66F penalizes acts committed with intent to threaten the unity, integrity, security, or sovereignty of India or strike terror in people by denying authorized access to critical computer networks or introducing contaminants; punishable with Life Imprisonment.",
    explanation: "The most severe cybercrime penalty in Indian law, applied to cyber warfare attacks on nuclear plants or power grids.",
    hint: "Cyber attacks threatening national security or critical infrastructure carry Life Imprisonment.",
    level: "expert",
    codeExample: "IT_Act_Sec66F: Offence = 'Cyber Terrorism'; Punishment = 'Life Imprisonment (Non-Bailable)';"
  },
  {
    question: "What is Digital Chain of Custody and why is it critical in cybercrime legal trials?",
    shortAnswer: "The rigorous, chronological documentation and tracking of digital evidence from initial collection at the crime scene to courtroom presentation, using cryptographic hashes (SHA-256) to prove the evidence was never altered or contaminated.",
    explanation: "If the cryptographic hash of a seized hard drive in Jadavpur changes during analysis, the entire evidence is rendered inadmissible in court.",
    hint: "Documenting every person who touched digital evidence and using hashes to prove it was never modified.",
    level: "expert",
    codeExample: "ChainOfCustody: ForensicImage(HDD) → SHA256_Hash('8F3A...11') → LoggedInEvidenceLocker → VerifiedInCourt"
  },
  {
    question: "What is UPI QR Code Swapping / Reverse QR Code Fraud?",
    shortAnswer: "Criminals paste fraudulent printed QR codes over legitimate merchant QR codes at retail stores, or send fake payment links claiming 'Scan this QR code to RECEIVE money', tricking victims into entering their UPI PIN and authorizing a debit transfer.",
    explanation: "Victims must remember that entering a UPI PIN is ALWAYS required for SENDING money, NEVER for receiving money.",
    hint: "Entering your UPI PIN ALWAYS transfers money OUT of your account; you never enter a PIN to receive money.",
    level: "basic",
    codeExample: "UPI_Rule: EnterPIN = 'MONEY DEDUCTED FROM YOUR ACCOUNT'; You NEVER enter a PIN to receive funds."
  },
  {
    question: "What is Digital Arrest Fraud and how does social engineering intimidate victims?",
    shortAnswer: "Criminals impersonate police, CBI, or ED officers on video calls using fake police uniforms and court setups, claiming the victim’s Aadhaar or SIM was used in money laundering/drugs, isolating the victim under 'digital arrest' for hours until they transfer savings.",
    explanation: "Law enforcement agencies across India never conduct court hearings or arrests over Skype or WhatsApp video calls.",
    hint: "Scammers wearing fake police uniforms on Skype threatening arrest to extort bank transfers.",
    level: "basic",
    codeExample: "DigitalArrest_Fact: Police and CBI NEVER conduct arrests or demand money transfers over video calls."
  },
  {
    question: "What is Loan App Extortion (Predatory Fintech Apps)?",
    shortAnswer: "Illicit mobile lending apps that grant instant small loans while demanding invasive smartphone permissions (access to contacts, photos, camera); when the borrower delays repayment, criminals harass contacts and circulate morphed photos to extort money.",
    explanation: "Enforced by Google Play bans and police cyber cells blocking unauthorized lending APKs in Kolkata.",
    hint: "Fake loan apps that steal your contact list and photos to blackmail you with morphed pictures.",
    level: "basic",
    codeExample: "PredatoryAppRisk: App requests 'READ_CONTACTS' & 'READ_MEDIA' → Used for Blackmail Extortion"
  },
  {
    question: "What is Ransomware Double Extortion vs Triple Extortion in corporate cybercrime?",
    shortAnswer: "Double Extortion: Adversaries exfiltrate sensitive files before encrypting them, threatening public release on leak sites if ransom is not paid; Triple Extortion adds DDoS attacks against company servers and direct harassment of the victim’s customers and employees.",
    explanation: "Forces corporate victims in Barrackpore to pay even if they possess clean offline backups.",
    hint: "Double extortion threatens to leak stolen data; Triple extortion adds DDoS attacks and customer harassment.",
    level: "moderate",
    codeExample: "ExtortionModel: EncryptLocalDisks() → ExfiltrateData() → ThreatenLeakSite() → LaunchDDoS()"
  },
  {
    question: "What is Cyberstalking and Online Harassment under Indian Law?",
    shortAnswer: "The persistent use of electronic communications (social media, email, SMS) to stalk, monitor, intimidate, or threaten an individual; penalized under Section 66E of the IT Act (privacy violation) and Section 78 of the Bharatiya Nyaya Sanhita (BNS / Section 354D IPC).",
    explanation: "Empowers victims in Ichapur to file immediate FIRs with police cyber cells for online stalking.",
    hint: "Repeatedly harassing or stalking someone online carries criminal jail time under Indian law.",
    level: "basic",
    codeExample: "Cyberstalking_Laws = ['IT Act Section 66E', 'Bharatiya Nyaya Sanhita Section 78 (Stalking)'];"
  },
  {
    question: "What is Volatile Memory Analysis (RAM Forensics) in live cybercrime investigations?",
    shortAnswer: "Capturing live computer RAM before powering down the machine to extract running processes, active network connections, decrypted encryption keys, and uncompiled fileless malware payloads that vanish upon reboot.",
    explanation: "Using tools like Volatility and LiME in Jadavpur to extract in-memory Cobalt Strike beacons.",
    hint: "Copying live computer RAM before shutting down to find running malware and hidden passwords.",
    level: "expert",
    codeExample: "RAM_Forensics: DumpRAM(LiveHost) → Volatility.analyze('windows.pslist', 'windows.malfind') → ExtractsPayload"
  },
  {
    question: "What is Money Muling and Mule Account Networks in cyber financial fraud?",
    shortAnswer: "A criminal network where unwitting individuals or paid accomplices (mules) allow criminals to route stolen funds through their bank accounts or UPI IDs for a small commission, laundering the stolen money through multiple layers before cash withdrawal.",
    explanation: "Police cyber crime units in Kolkata track and freeze entire multi-hop mule account chains using CFCFRMS.",
    hint: "Using innocent or paid people's bank accounts to pass and hide stolen money through multiple banks.",
    level: "moderate",
    codeExample: "MuleNetwork: VictimAccount → MuleBank_1 (Kolkata) → MuleBank_2 (Mumbai) → ATM_CashOut"
  },
  {
    question: "What is Romance Scamming / Matrimonial Cyber Fraud?",
    shortAnswer: "Adversaries create fake attractive online profiles on dating and matrimonial portals to cultivate romantic relationships with victims over weeks, eventually fabricating financial emergencies or customs clearance fees to extort lakhs of rupees.",
    explanation: "Targets emotional vulnerability; accounts for tens of crores in fraudulent losses annually across India.",
    hint: "Fake romantic profiles on matrimonial apps creating emergencies to trick victims into wiring money.",
    level: "basic",
    codeExample: "RomanceScam: FakeProfile → BuildsRomanticTrust → 'Customs parcel stuck at airport' → Demands ₹2,50,000"
  },
  {
    question: "What is Crypto-Jacking (Malicious Cryptocurrency Mining)?",
    shortAnswer: "The unauthorized hijacking of a victim’s computer, server, or cloud CPU/GPU resources to mine cryptocurrency (e.g. Monero) via embedded browser JavaScript or injected server malware, causing high electricity bills and hardware degradation.",
    explanation: "Detected by security monitoring platforms in Barrackpore flagging sustained 100% CPU spikes.",
    hint: "Hackers secretly using your computer or cloud server's CPU power to mine cryptocurrency for free.",
    level: "basic",
    codeExample: "CryptoJacking: WebScript invokes WebAssembly Monero Miner → CPU usage spikes to 100% → Device overheats"
  },
  {
    question: "What is Card Skimming (Physical POS Skimming vs Web Magecart)?",
    shortAnswer: "Physical Skimming uses covert hardware overlays on ATMs/POS terminals to copy magnetic stripe data; Web Magecart injects malicious JavaScript into checkout pages of e-commerce websites to harvest credit card numbers during typing.",
    explanation: "Defended using EMV chip-and-PIN cards and Content Security Policy (CSP) headers in Kolkata.",
    hint: "Physical skimmers steal ATM cards; Magecart web scripts steal credit card details on shopping checkouts.",
    level: "moderate",
    codeExample: "Magecart_Defense: Enforce CSP (Content Security Policy) + Subresource Integrity (SRI) on checkout forms."
  },
  {
    question: "What is Sextortion and Video Call Honey-Trapping in cybercrime?",
    shortAnswer: "Adversaries lure victims into compromising video calls on WhatsApp or Instagram, record the screen secretly, and immediately threaten to send the video to the victim's family, employer, and social contacts unless money is paid within 30 minutes.",
    explanation: "Police cyber cells advise victims never to pay extortion money, block numbers, and report immediately on cybercrime.gov.in.",
    hint: "Recording compromising video calls and threatening to send them to family unless money is paid.",
    level: "basic",
    codeExample: "Sextortion_Protocol: Never pay ransom → Block blackmailer → Save screenshots → Report on cybercrime.gov.in"
  },
  {
    question: "What is Live Forensic Triage vs Dead Box Forensic Acquisition?",
    shortAnswer: "Live Triage collects volatile evidence (RAM, network sockets, open files, logged-in sessions) while the system is powered on; Dead Box Forensics removes the storage drive from a powered-down computer and creates bit-by-bit raw disk clones via write blockers.",
    explanation: "Ensures evidence preservation without modifying timestamps on suspect systems in Jadavpur.",
    hint: "Live triage captures RAM while running; Dead box clones the hard drive with write blockers when turned off.",
    level: "expert",
    codeExample: "DeadBoxForensics: ConnectHardDriveViaHardwareWriteBlocker() → dd if=/dev/sdb of=suspect_disk.raw"
  },
  {
    question: "What is Section 67 and Section 67A of the IT Act 2000 regarding Obscene and Explicit Content?",
    shortAnswer: "Section 67 penalizes publishing or transmitting obscene material in electronic form with up to 3 years imprisonment (1st conviction) / 5 years (2nd); Section 67A penalizes sexually explicit content with up to 5 years imprisonment and ₹10,00,000 fine.",
    explanation: "Strictly enforced across West Bengal for non-consensual image transmission and digital harassment.",
    hint: "Transmitting obscene or sexually explicit content carries up to 5 years in jail and ₹10 Lakh fine.",
    level: "basic",
    codeExample: "IT_Act_Sec67A: Penalty = 'Up to 5 Years Imprisonment + Fine up to ₹10,00,000 (Non-Bailable)';"
  },
  {
    question: "What is Smishing (SMS Phishing) and Vishing (Voice Phishing)?",
    shortAnswer: "Smishing sends deceptive SMS texts with malicious links (e.g. 'Your electricity bill is unpaid, power cut tonight'); Vishing uses phone calls impersonating bank managers or police to manipulate victims into revealing card details or OTPs.",
    explanation: "Electricity bill smishing scams target thousands of residential consumers across Kolkata daily.",
    hint: "Smishing is fake SMS messages with links; Vishing is fake phone calls pretending to be your bank.",
    level: "basic",
    codeExample: "SmishingExample = 'Dear Customer, your CESC electric power will be disconnected at 9:30 PM. Call 98XXXX to update KYC.';"
  },
  {
    question: "What is the role of Write-Blockers in digital evidence imaging?",
    shortAnswer: "A physical hardware bridge or software filter that permits read commands from a storage drive while physically blocking all write commands, guaranteeing that plugging a suspect drive into a forensic PC modifies 0 bytes of original evidence.",
    explanation: "Mandatory for digital forensic reports to be legally admissible in Calcutta High Court.",
    hint: "Hardware device that prevents the police computer from accidentally writing or changing anything on a suspect drive.",
    level: "expert",
    codeExample: "HardwareWriteBlocker: ReadCommands = ALLOWED; WriteCommands = BLOCKED_AT_HARDWARE_LEVEL"
  },
  {
    question: "What is Fake Job Offer / Work-From-Home Task Scamming?",
    shortAnswer: "Criminals contact victims via Telegram/WhatsApp offering ₹3,000/day for 'liking YouTube videos' or 'rating hotels'; after small payouts to build trust, victims are tricked into investing lakhs in fraudulent cryptocurrency or trading platforms.",
    explanation: "Accounts for hundreds of crores in financial losses among students and job seekers across West Bengal.",
    hint: "Scams offering easy money for liking videos, which turn into fake investment schemes stealing lakhs.",
    level: "basic",
    codeExample: "TaskScamFlow: Like 3 Videos → Earn ₹150 → 'Upgrade to VIP Task' → Invest ₹50,000 → Funds Stolen"
  },
  {
    question: "What is Automated Anti-Phishing Domain Takedown Service?",
    shortAnswer: "A commercial service that continuously scans newly registered domain names and certificate transparency logs for brand typosquatting (e.g. `sbi-kyc-update.com`), submitting automated legal abuse complaints to domain registrars for takedown within 2 hours.",
    explanation: "Protects diagnostic clinic and banking brands in Ichapur from active phishing campaigns.",
    hint: "Services that find and shut down fake copycat websites within 2 hours of registration.",
    level: "moderate",
    codeExample: "Annual_BrandProtection_Cost = ₹3,20,000; // 24/7 Automated Typosquatting Scanning & Registrar Takedown"
  },
  {
    question: "What is Section 65 of the IT Act 2000 regarding Tampering with Computer Source Documents?",
    shortAnswer: "Section 65 criminalizes intentionally concealing, destroying, or altering any computer source code required to be maintained by law; punishable with imprisonment up to 3 years, or fine up to ₹2,00,000, or both.",
    explanation: "Applied when a rogue software developer in Barrackpore deletes proprietary software source code repositories.",
    hint: "Deleting or altering computer source code carries up to 3 years imprisonment and ₹2 Lakh fine.",
    level: "moderate",
    codeExample: "IT_Act_Sec65: Offence = 'Tampering with Source Code'; Penalty = 'Up to 3 Years Jail + ₹2 Lakh Fine';"
  },
  {
    question: "What is Synthetic Identity Theft in modern financial cybercrime?",
    shortAnswer: "Criminals combine real stolen demographic data (e.g. a child’s legitimate Aadhaar number) with fake names and fabricated utility bills to create completely new synthetic identities, building fake credit scores over years to max out massive fraudulent loans.",
    explanation: "Difficult to detect because traditional fraud filters see valid Aadhaar numbers paired with clean credit histories.",
    hint: "Combining real Aadhaar numbers with fake names to create hybrid fake people for bank loan fraud.",
    level: "expert",
    codeExample: "SyntheticIdentity = Real_Aadhaar_ID + Fake_Name + Fabricated_Address → Creates_Fraudulent_Bank_Account"
  },
  {
    question: "What is Deepfake Video Call Fraud in executive cybercrime?",
    shortAnswer: "Adversaries use real-time generative AI face-swapping and voice cloning software during live video conferences, impersonating company CEOs or CFOs to order urgent multimillion-rupee financial transfers.",
    explanation: "Defended by establishing out-of-band verification challenge phrases and multi-person authorization in Kolkata.",
    hint: "Using AI to change your face and voice live on a video call to impersonate a company CEO.",
    level: "expert",
    codeExample: "DeepfakeDefense: OutOfBandCall() + SharedSecretChallengePhrase() → Prevents_AI_Impersonation_Fraud"
  },
  {
    question: "How do Police Cyber Cells track stolen financial fraud funds across multiple bank layers?",
    shortAnswer: "Through the Indian Cyber Crime Coordination Centre (I4C) CFCFRMS API, police trace transaction reference numbers across Layer 1 (immediate receiver) to Layer 5 (final mule accounts) within minutes, automatically freezing debit accounts via integrated bank APIs.",
    explanation: "Helps recover stolen funds for victims in Barrackpore before criminals can withdraw cash at ATMs.",
    hint: "Police software tracking stolen money across multiple bank hops to freeze all accounts within minutes.",
    level: "moderate",
    codeExample: "I4C_Tracking: Trace_TXN(Ref_ID) → MapHops(Bank_A → Bank_B → Bank_C) → IssueAPI_DebitFreeze();"
  },
  {
    question: "What is the ultimate golden rule for combating, investigating, and reporting Cyber Crime?",
    shortAnswer: "'Report financial fraud to Helpline 1930 within the Golden Hour; maintain cryptographic chain of custody for all digital evidence; prosecute under IT Act 2000 Sections 66, 66C, 66D, 66F; and budget enterprise anti-fraud and DFIR retainers in Indian Rupees (₹)!'",
    explanation: "This complete rule captures emergency victim response, rigorous forensic evidence preservation, statutory legal prosecution, and financial budgeting.",
    hint: "Dial 1930 in Golden Hour + Preserve hash chain of custody + Prosecute under IT Act + Budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Report1930GoldenHour() → PreserveHashChainOfCustody() → ProsecuteUnderITAct() → BudgetInRupees(₹);"
  }
];

export default questions;
