const questions = [
  {
    question: "What is the fundamental distinction between Envelope From (`Return-Path` / `MAIL FROM`) and Header From (`From:`) in Email Phishing?",
    shortAnswer: "Envelope From is used by mail transfer agents for routing and bounce delivery; Header From is the visible display address shown to the user in their email client, which attackers easily spoof.",
    explanation: "Under RFC 5321 (SMTP), the sending mail server specifies `MAIL FROM: attacker@evil.in` (Envelope From) for bounce handling. Under RFC 5322 (Message Format), the email content defines `From: CEO <ceo@company.in>` (Header From). Because standard email clients display only the Header From, an attacker can send an email routed through their own mail server while making the email client display the CEO's legitimate internal address.",
    hint: "The return address on the postal envelope (Envelope From) vs the signature at the bottom of the letter inside (Header From).",
    level: "expert",
    codeExample: `// SMTP Transaction vs Visible Header:
// SMTP Envelope (RFC 5321) : MAIL FROM:<attacker@foreign-server.xyz>
// Email Content (RFC 5322) : From: "Mamata - FinTech Lead" <mamata@kolkata-fintech.in>
// Result: Email client displays Mamata's address, concealing the foreign server!`
  },
  {
    question: "What are the 7 Core Structural Components of a Modern Phishing Email?",
    shortAnswer: "1. Display Name / From Header; 2. Subject Line; 3. Body Copy & Branding; 4. Hyperlink / Anchor Text; 5. Weaponized Attachment; 6. Return-Path / Routing Headers; 7. Call-to-Action.",
    explanation: "A phishing email combines 7 structural layers: 1. Display Name spoofing a trusted entity; 2. Subject Line conveying urgency or reward; 3. Visual Branding mimicking authentic corporate logos; 4. Deceptive Hyperlinks with mismatched anchor text; 5. Weaponized Attachments (ISO, HTML smuggling, DOCX); 6. SMTP headers indicating unauthorized origins; 7. Compelling Call-to-Action forcing immediate credential submission.",
    hint: "Header ➔ Subject ➔ Visuals ➔ Links ➔ Attachments ➔ Routing ➔ Call to Action.",
    level: "basic",
    codeExample: `// Anatomy of a Phishing Email:
// 1. Display Name : "ICICI Bank Security Alert" <alerts@update-banking-2026.in>
// 2. Subject Line  : "URGENT: Your NetBanking account will be locked in 15 mins!"
// 3. Anchor Link   : <a href="http://evil-portal.in">https://icicibank.com/verify</a>
// 4. Attachment    : "Account_Verification_Form.html" (HTML Smuggling)`
  },
  {
    question: "How does Hyperlink Anchor Text Deception trick users into visiting Malicious Phishing Portals?",
    shortAnswer: "The visible HTML anchor text displays a legitimate trusted URL (e.g. `https://bank.in`), while the underlying `href` attribute points to the attacker's credential harvesting domain.",
    explanation: "HTML allows arbitrary text inside hyperlink tags: `<a href='https://attacker-credential-harvester.in/login'>https://www.kolkata-fintech.in/login</a>`. The user reads the trusted company URL in the email body, assumes it is safe, and clicks. The browser resolves the `href` target, navigating the victim to the attacker's spoofed portal.",
    hint: "A road sign pointing to 'Kolkata City Center' that actually leads down a dark dead-end alley.",
    level: "basic",
    codeExample: `<!-- Anchor Text Phishing Mismatch -->
<a href="https://attacker-c2.net/auth/login.php">
  https://www.kolkata-fintech.in/secure/login
</a>`
  },
  {
    question: "How do Threat Actors abuse Subdomains to make Phishing URLs appear Legitimate?",
    shortAnswer: "By creating subdomains containing the trusted brand name on their own registered domain (e.g. `https://login.microsoft.com.attacker-domain.in/auth`).",
    explanation: "Domain names are read from right to left (TLD ➔ Root Domain ➔ Subdomains). Attackers register `attacker-domain.in` and create subdomains: `login.microsoft.com.attacker-domain.in`. Unsuspecting users see `login.microsoft.com` at the start of the URL and believe it belongs to Microsoft, failing to realize the authoritative root domain is `attacker-domain.in`.",
    hint: "Putting a 'Mercedes-Benz' sticker on a bicycle and claiming it was built in Stuttgart.",
    level: "moderate",
    codeExample: `// Domain Structure Breakdown:
// [Subdomain Prefix: login.microsoft.com].[Attacker Root: evil-host].[TLD: in]
// The browser connects to: attacker-host.net (Attacker Server!)`
  },
  {
    question: "What is an Open Redirect Vulnerability, and how do Phishing Attackers exploit Trusted Enterprise Websites?",
    shortAnswer: "Legitimate websites with unvalidated redirect parameters (`https://google.com/url?q=http://evil.in`) are used in phishing links to bypass email reputation scanners.",
    explanation: "Secure Email Gateways whitelist major domains (like Google, Microsoft, LinkedIn). An open redirect vulnerability allows an attacker to construct: `https://www.google.com/url?q=https://attacker-c2.net/login`. The email gateway scans the link, sees `google.com`, and allows the email. When the victim clicks, Google's server automatically forwards the user to the attacker's phishing portal.",
    hint: "Taking a legitimate bus from the city center whose driver immediately transfers you to a pirate boat.",
    level: "expert",
    codeExample: `// Open Redirect Phishing URL:
// https://legitimate-university.edu/redirect.php?url=https://attacker-c2.net/harvest
// Email scanner trusts 'legitimate-university.edu' ➔ Victim redirected to C2!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes criminal liability for sending deceptive phishing emails?",
    shortAnswer: "Cheating by personating an authorized bank, corporate officer, or government entity over computer resources carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly covers phishing impersonation: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D penalizes Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Distributing phishing emails spoofing state power grid portals to steal credentials
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "How do Email Headers (`Received: from`) reveal the True Origin and Routing Hops of a Phishing Email?",
    shortAnswer: "Every intermediate Mail Transfer Agent (MTA) prepends a `Received:` header containing the sender IP address and timestamp; reading from bottom to top traces the message from the originating source IP.",
    explanation: "Attackers can spoof the `From:` header, but they cannot forge the `Received:` headers added by legitimate intermediate mail servers. Analyzing `Received:` headers from bottom to top reveals the original sending IP address (`103.25.10.50`), the reverse DNS lookup, and the exact timestamps of every routing hop.",
    hint: "Reading the postal stamps on an envelope to see which post office processed the letter first.",
    level: "expert",
    codeExample: `// Email Header Routing Analysis (Read Bottom-to-Top):
Received: from mail.kolkata-fintech.in (10.0.0.1) by mx.internal.in; Sun, 23 Aug 2026 04:15:10
Received: from foreign-vps.xyz (103.25.10.50) by mail.kolkata-fintech.in; Sun, 23 Aug 2026 04:15:02
// True Origin IP: 103.25.10.50 (Unmasks Attacker's VPS Host!)`
  },
  {
    question: "What is Display Name Spoofing vs Exact Domain Spoofing in Phishing Attacks?",
    shortAnswer: "Display Name Spoofing changes only the friendly name (e.g. 'CEO Name' <random@gmail.com>); Exact Domain Spoofing sends from the exact corporate domain (e.g. `ceo@company.in`) by exploiting missing DMARC policies.",
    explanation: "Display Name Spoofing registers a free external email account (Gmail, Outlook) and sets the visible name to 'Mamata - Lead Architect'. Exact Domain Spoofing configures an SMTP server to inject the actual corporate domain `mamata@kolkata-fintech.in` into the `From:` header. Exact domain spoofing succeeds only if the organization lacks strict DMARC (`p=reject`) enforcement.",
    hint: "Writing someone else's name on a nametag (Display Spoofing) vs forging their actual government passport (Exact Domain Spoofing).",
    level: "moderate",
    codeExample: `// Display Name Spoofing vs Exact Domain Spoofing:
// Display Name Spoof : "Mamata (FinTech Lead)" <attacker492@free-mailer.xyz>
// Exact Domain Spoof : "Mamata (FinTech Lead)" <mamata@kolkata-fintech.in> (Requires DMARC p=reject to block!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if an employee falls for an email phishing attack leaking customer health data?",
    shortAnswer: "Failure to enforce email perimeter authentication safeguards (DMARC, SEG) and employee training triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational security safeguards. If a healthcare network in West Bengal fails to enforce email authentication (DMARC) and employee anti-phishing training, allowing an infostealer phishing email to exfiltrate 500,000 oncology patient records, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to deploy email authentication safeguards triggers maximum penalties under national data privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent email perimeter protection`
  },
  {
    question: "What is HTML Smuggling in Phishing Attachments, and how does it bypass Secure Email Gateways (SEGs)?",
    shortAnswer: "The email attaches a benign-looking `.html` file; when opened in a browser, embedded JavaScript constructs malicious executable files locally in RAM using `Blob` objects and triggers a download.",
    explanation: "Perimeter email scanners inspect attachments for `.exe` or `.iso` binaries. In HTML Smuggling, the attachment is an ordinary HTML document containing Base64-encoded binary chunks. When opened, browser JavaScript executes: `const blob = new Blob([bytes], {type: 'application/octet-stream'}); const url = URL.createObjectURL(blob); a.click();`. The file is assembled entirely in browser memory, leaving zero binary signatures on the email gateway.",
    hint: "Smuggling a bicycle into a building as separate metal tubes and assembling it inside the office.",
    level: "expert",
    codeExample: `// HTML Smuggling Attachment Snippet:
const b64Data = "TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAA...";
const bytes = Uint8Array.from(atob(b64Data), c => c.charCodeAt(0));
const blob = new Blob([bytes], { type: "application/octet-stream" });
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "Salary_Slip.iso";
a.click(); // Assembled locally in browser RAM!`
  },
  {
    question: "How does Computer Vision (OCR & Logo Detection) in Modern Email Gateways detect Brand Impersonation in Phishing Emails?",
    shortAnswer: "By rendering incoming emails in headless browsers, using neural networks to detect brand logos (e.g. Microsoft, ICICI Bank), and comparing detected brands against the sender's authenticated domain.",
    explanation: "Attackers often embed images of text to evade keyword scanners. Modern Secure Email Gateways (SEGs) render the email in a headless browser and run Optical Character Recognition (OCR) and Convolutional Neural Networks (CNNs). If the CNN detects the Microsoft 365 logo with 99% confidence, but the sender domain is `billing-support-2026.xyz` (and lacks SPF/DKIM alignment with Microsoft), the email is quarantined instantly.",
    hint: "A security guard who checks if the logo on the delivery uniform matches the company registered on the delivery truck.",
    level: "expert",
    codeExample: `// AI Computer Vision Email Gatekeeper (Pseudo-Code):
let detectedLogos = CNN_Detect_Logos(RenderedEmailScreenshot);
if (detectedLogos.contains("Microsoft_365_Logo")) {
    if (!EmailHeaders.DKIM_Domain.endsWith("microsoft.com")) {
        QuarantineEmail("BRAND IMPERSONATION: Microsoft logo used from unauthenticated domain!");
    }
}`
  },
  {
    question: "What is Quishing (QR Code Phishing), and how do attackers bypass Text-Based Email URL Filters?",
    shortAnswer: "The email contains an image of a QR code instead of text links; email filters see only a PNG image, while the victim scans the QR code on their smartphone to reach a phishing site.",
    explanation: "Secure Email Gateways inspect text URLs in email bodies. Quishing replaces clickable text links with a PNG image of a QR code: 'Scan this QR code with your mobile to complete mandatory 2FA authentication.' Because traditional text filters do not perform image QR decoding, the email reaches the user's inbox, shifting the attack to unmanaged personal mobile devices.",
    hint: "Writing the address in a barcode sticker that the security guard's text scanner cannot read.",
    level: "moderate",
    codeExample: `// Quishing Attack Flow:
// [Email Body: "Scan QR Code for MFA"] ➔ [Embedded PNG QR Code] ➔ [Scanned by Employee Mobile] ➔ [Phishing Portal]`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for phishing campaigns compromising enterprise systems?",
    shortAnswer: "All organizations in India must report phishing compromises, unauthorized administrative access, and credential theft to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all credential phishing compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do Zero-Font / CSS Obfuscation Techniques hide Phishing Keywords from Email Gateway Content Scanners?",
    shortAnswer: "By inserting hidden HTML text with `font-size: 0px` or `display: none` between letters of words, breaking keyword matching algorithms while displaying normally to human readers.",
    explanation: "Email filters scan text for keywords like 'password reset' or 'wire transfer'. Attackers inject hidden HTML spans: `P<span style='font-size:0px;'>xyz</span>assword`. The security scanner reads `Pxyzassword` and allows the email; when rendered in the user's browser, the zero-pixel span is invisible, displaying a clean 'Password' to the human victim.",
    hint: "Writing invisible ink letters between regular letters that only human eyes ignore.",
    level: "expert",
    codeExample: `<!-- Zero-Font CSS Obfuscation -->
<p>
  Please verify your P<span style="font-size:0px;color:transparent;">hidden_garbage_text</span>assword 
  to prevent immediate account suspension.
</p>`
  },
  {
    question: "What is URL Shortening & Multi-Hop Redirect Chaining in Phishing Delivery?",
    shortAnswer: "Passing phishing URLs through URL shortening services (bit.ly, tinyurl) and dynamic HTTP 302 redirect chains to conceal the final malicious landing page from static link checkers.",
    explanation: "Static email scanners check the destination IP of links at the time of email arrival. Attackers use shorteners or multi-hop redirect chains: `http://bit.ly/xyz ➔ https://redirect-hub.in ➔ https://c2.phishing-portal.in`. The attacker configures the redirect hub to return a clean Wikipedia page during gateway scanning, flipping the redirect to the live phishing portal only after the email has landed in the victim's inbox.",
    hint: "Sending someone through three different revolving doors before they enter the final locked room.",
    level: "moderate",
    codeExample: `// Multi-Hop Redirect Chain:
// 1. Initial Link   : https://bit.ly/3x8Ab9 (Clean Shortener)
// 2. Hop 1 Proxy    : https://gateway-forwarder.in/route.php (Dynamic Fingerprinting)
// 3. Final Landing  : https://c2.phishing-harvest.in/login.php (Phishing Portal)`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for accessing corporate emails using harvested phishing credentials?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for accessing computer systems without permission.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Accessing corporate email inboxes using stolen phishing credentials
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is a Lookalike / Typo-Squatted Domain (`Typosquatting`), and how do threat actors use it in Phishing Email Addresses?",
    shortAnswer: "Registering domains that look nearly identical to legitimate brand names by adding, omitting, or swapping characters (e.g. `micros0ft.com`, `kolkata-fintech-support.in`).",
    explanation: "Typo-squatting targets human visual skimming. Attackers register domains with subtle misspellings: omitting letters (`paypa.com`), substituting letters with numbers (`0` for `o`, `1` for `l`), or adding plausible suffixes (`icicibank-security.in`). When reading emails quickly, users fail to spot the character substitution, assuming the email originates from the legitimate company.",
    hint: "Selling counterfeit shoes with the logo spelled 'Nkie' instead of 'Nike'.",
    level: "basic",
    codeExample: `// Typo-Squatted Domain Examples:
// Real Domain       : kolkata-fintech.in
// Typo-Squatted #1  : kolkata-f1ntech.in (Substitutes '1' for 'i')
// Typo-Squatted #2  : kolkata-fintech-verify.in (Appends plausible suffix)`
  },
  {
    question: "Synthesize an enterprise-scale Phishing Email Analysis & Gateway Defense Pipeline.",
    shortAnswer: "A multi-layered system combining DMARC `p=reject` Verification, Computer Vision Logo Scanning, URL Sandboxing & Dynamic Link Rewriting, Attachment Content Disarm & Reconstruction (CDR), and FIDO2 Passkeys.",
    explanation: "To achieve complete immunity against email phishing: 1. Gateway Tier: Enforce DMARC `p=reject`, SPF, and DKIM to eliminate exact domain spoofing. 2. Visual AI Tier: Computer Vision OCR to detect brand logo impersonation and decode QR codes. 3. URL Tier: Dynamic link rewriting (Time-of-Click URL inspection). 4. Attachment Tier: Content Disarm & Reconstruction (CDR) stripping active HTML smuggling and macros. 5. Identity Tier: FIDO2 WebAuthn passkeys immune to credential harvesting.",
    hint: "Enforce DMARC p=reject, scan logos with AI, rewrite URLs at Time-of-Click, disarm attachments with CDR, and enforce FIDO2 passkeys.",
    level: "expert",
    codeExample: `// Master Phishing Defense Architecture Blueprint:
// 1. Ingress Layer   : DMARC p=reject + SPF + DKIM Cryptographic Verification
// 2. AI Visual Layer : Headless Browser Rendering + CNN Brand Logo Detection + QR Code OCR
// 3. Link Layer      : Time-of-Click Dynamic URL Rewriting (Sandbox detonation upon click)
// 4. File Layer      : Content Disarm & Reconstruction (CDR) stripping HTML Smuggling Blobs
// 5. Identity Armor  : FIDO2 WebAuthn Passkeys (Mathematical origin binding stops credential theft)`
  },
  {
    question: "What is Time-of-Click URL Rewriting (SafeLinks / Link Protection) in Modern Email Security?",
    shortAnswer: "Replacing all hyperlinks in incoming emails with proxy gateway URLs; when a user clicks the link, the gateway scans the destination in real time before forwarding the user.",
    explanation: "Attackers often send emails with clean links that pass initial gateway inspection, weaponizing the destination URL hours later. Time-of-Click protection rewrites all URLs to: `https://nam01.safelinks.protection.outlook.com/?url=http://target.in`. When the user clicks the link at 5:00 PM, the gateway executes a real-time sandbox scan on the destination page, blocking the site if it was recently weaponized.",
    hint: "A security guard who inspects the ticket not just at the gate, but again right before you walk into the theatre.",
    level: "moderate",
    codeExample: `// Time-of-Click URL Rewriting:
// Original Link in Email : http://invoice-update.in/verify
// Rewritten Link Shown   : https://gateway.safelinks.in/?url=http://invoice-update.in/verify
// Action upon click      : Gateway performs real-time sandbox detonation before allowing connection!`
  },
  {
    question: "How do Image-Only Phishing Emails (Single-Image Emails) attempt to evade Text-Based Spam Filters?",
    shortAnswer: "The entire email body (text, buttons, logos) is rendered as a single large PNG/JPEG image hyperlinked to a phishing portal, leaving zero plaintext body text for spam filters to inspect.",
    explanation: "Because spam filters rely heavily on Natural Language Processing (NLP) to detect trigger words ('urgent', 'password'), attackers design the email in Photoshop and save the entire text message as an image. The email body contains only: `<a href='http://evil.in'><img src='phish.png'></a>`. Modern SEGs counter this by running OCR on all embedded images.",
    hint: "Sending a photograph of a secret letter rather than typing the text into the message box.",
    level: "moderate",
    codeExample: `<!-- Image-Only Phishing Email Body -->
<a href="https://attacker-c2.net/harvest.php">
  <img src="https://attacker-c2.net/fake_invoice_text.png" alt="Invoice Notification" width="600" height="800">
</a>`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for operating phishing infrastructure?",
    shortAnswer: "Dishonestly or fraudulently setting up phishing portals or harvesting user credentials carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer activity: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for operating phishing scams.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Hosting phishing credential harvesting portals and spoofing banking logins
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is DMARC Alignment (SPF Alignment vs DKIM Alignment), and how does it prevent Exact Domain Spoofing?",
    shortAnswer: "DMARC requires that the domain in the visible `From:` header matches (aligns with) the domain verified by SPF (`Return-Path`) or DKIM (`d=` tag); unaligned emails are rejected.",
    explanation: "An attacker could send an email signed with their own DKIM key (`d=attacker.in`) while putting `From: ceo@kolkata-fintech.in`. DMARC Alignment mandates that the visible `From:` domain must match the DKIM signing domain or SPF `Return-Path` domain. With `p=reject`, any mismatch causes the receiving mail server to reject the spoofed email instantly.",
    hint: "Ensuring the signature at the bottom of the check matches the name on the driver's license.",
    level: "expert",
    codeExample: `// DMARC Alignment Check:
// Header From  : From: ceo@kolkata-fintech.in
// DKIM Domain  : d=attacker-server.xyz
// Result       : DMARC ALIGNMENT FAILED ➔ Action: REJECT / DROP (p=reject enforced!)`
  },
  {
    question: "How does the 'Reply-To' Header Manipulation divert Phishing Responses to Attacker Inboxes?",
    shortAnswer: "The email spoofed `From: ceo@company.in`, but sets `Reply-To: attacker@foreign-mail.xyz`; when the victim hits 'Reply', the response is routed directly to the attacker.",
    explanation: "Email clients automatically address replies to the `Reply-To` header if present. An attacker spoofs the display address `From: Mamata <mamata@kolkata-fintech.in>`, but injects `Reply-To: badactor@gmail.com`. When the accounting clerk clicks 'Reply' to confirm an invoice, their email response (containing sensitive financial confirmations) goes directly to the attacker's Gmail inbox.",
    hint: "A letter with the mayor's name on top, but a return envelope addressed to a secret post office box.",
    level: "moderate",
    codeExample: `// Reply-To Header Deception:
From: "Mamata (FinTech Lead)" <mamata@kolkata-fintech.in>
Reply-To: "Finance Support Desk" <kolkata-fintech-support@gmail.com>
Subject: Re: Q4 Financial Settlement Confirmation`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Fraudulent Inducement via Phishing Emails?",
    shortAnswer: "Deceiving an individual through spoofed email lures to dishonestly induce them to transfer funds, share bank OTPs, or surrender corporate property, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Phishing scams designed to extract funds or credentials are prosecuted under Section 420.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for phishing operations.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deploying deceptive phishing emails to fraudulently extract citizen banking funds
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is Reverse DNS (rDNS / PTR Record) Verification in Phishing Triage?",
    shortAnswer: "Querying the PTR record of the connecting mail server's IP address to verify if the hostname matches the claimed sending domain; IP/hostname mismatches indicate unauthorized relaying.",
    explanation: "When a mail server receives an email from IP `103.25.10.50` claiming to be `mail.kolkata-fintech.in`, it performs a reverse DNS PTR query on `103.25.10.50`. If the PTR record resolves to `vps-492.foreign-hosting.xyz` (or has no PTR record), the receiving mail server identifies an unauthorized spoofing attempt and increases the spam score.",
    hint: "Checking if the telephone number on caller ID matches the official phone directory listing.",
    level: "moderate",
    codeExample: `# Reverse DNS (PTR) Verification:
nslookup 103.25.10.50
# Returns: vps492.foreign-host.xyz (MISMATCH! Claimed domain was mail.kolkata-fintech.in)`
  },
  {
    question: "How do Weaponized PDF Attachments use Embedded JavaScript (`/JS`) and `/Launch` Actions in Phishing?",
    shortAnswer: "PDF specifications permit embedded ECMAScript (`/JS`) and operating system command execution (`/Launch`), executing PowerShell stagers or opening credential harvesting portals upon document open.",
    explanation: "A PDF is a structured dictionary of objects. Attackers insert dictionary keys: `/Type /Action /S /Launch /F (powershell.exe) /P (-enc JABh...)`. When opened in unhardened PDF viewers, the viewer executes the command or unpacks embedded malicious binaries from `/EmbeddedFiles` streams, compromising the endpoint.",
    hint: "A pop-up book that contains a hidden electrical wire that triggers a machine when the page is turned.",
    level: "expert",
    codeExample: `% Malicious PDF Object Structure:
10 0 obj
<<
  /Type /Action
  /S /Launch
  /F (powershell.exe)
  /P (-W Hidden -Enc JABhID0g...)
>>
endobj`
  },
  {
    question: "What is In-Line Phishing Sandbox Detonation (Time-of-Delivery Attachment Detonation)?",
    shortAnswer: "The email gateway temporarily holds incoming emails with attachments for 30-90 seconds, detonating the file in a virtual cloud sandbox to observe behavioral actions before delivering the email.",
    explanation: "Traditional antivirus scans file hashes in milliseconds. Advanced email gateways route unknown attachments (`.iso`, `.docx`, `.pdf`) into a temporary detonation queue. A disposable virtual machine opens the file, runs synthetic mouse clicks, and monitors for child process creation or outbound C2 beacons for 60 seconds. If clean, the email is released to the user's inbox; if malicious, it is dropped.",
    hint: "Holding a suspicious package in an isolated quarantine room for 2 minutes to ensure it doesn't emit sparks before handing it to the recipient.",
    level: "moderate",
    codeExample: `// Time-of-Delivery Attachment Detonation Pipeline:
// [Incoming Email with 'Invoice.iso'] ➔ [Held in SEG Queue for 60s] ➔ [Detonates in Cloud KVM Sandbox] ➔ [Result: Spawns PowerShell ➔ DROPPED!]`
  },
  {
    question: "How do Attackers use Dynamic Phishing Landing Page Fingerprinting to Block Security Scanners?",
    shortAnswer: "The phishing web server inspects the visitor's IP address, User-Agent, and browser fingerprint; if it detects an automated security scanner or cloud crawler (VirusTotal, Palo Alto), it serves a benign 200 OK page.",
    explanation: "To evade automated security crawler analysis, phishing landing pages deploy anti-bot fingerprinting scripts. The server checks: 1. Is the visitor's IP registered to AWS, Microsoft, or Google cloud? 2. Is the User-Agent a headless browser (`HeadlessChrome`)? If so, the server displays an innocent Wikipedia page or HTTP 404. If the visitor is an authentic human from West Bengal on Windows 11, it renders the credential theft portal.",
    hint: "A speakeasy door that opens into an ordinary coffee shop when a police officer knocks, but opens into a secret gambling hall when the password is given.",
    level: "expert",
    codeExample: `// Anti-Scanner Dynamic Fingerprinting Script (PHP):
if (is_crawler_or_security_ip($_SERVER['REMOTE_ADDR'])) {
    header("Location: https://en.wikipedia.org"); // Serves clean page to security scanners!
    exit();
} else {
    render_phishing_login_portal(); // Serves credential harvesting portal to real victim!
}`
  },
  {
    question: "Synthesize the mathematical relationship between Phishing Delivery Volume (V_phish), Email Gateway Filter Efficiency (E_gateway), Human Click-Through Rate (R_click), Credential Submission Rate (R_submit), and Enterprise Infection Count (N_compromise).",
    shortAnswer: "Enterprise compromise count is N_compromise = V_phish * (1 - E_gateway) * R_click * R_submit; with gateway efficiency E_gateway = 99.8% and FIDO2 passkeys driving R_submit = 0, compromise count drops to zero.",
    explanation: "Let $V_{\\text{phish}}$ be the total incoming phishing volume (e.g. 100,000 emails/month), $E_{\\text{gateway}} = 0.998$ be the email filter catch rate, $R_{\\text{click}} = 0.03$ (3% human click rate), and $R_{\\text{submit}}$ be the credential submission rate. The number of compromised endpoints is: $N_{\\text{compromise}} = V_{\\text{phish}} \\times (1 - E_{\\text{gateway}}) \\times R_{\\text{click}} \\times R_{\\text{submit}} = 100,000 \\times (0.002) \\times 0.03 \\times R_{\\text{submit}} = 6 \\times R_{\\text{submit}}$. When organizations deploy FIDO2 passkeys, cryptographic origin binding forces $R_{\\text{submit}} = 0$, mathematically guaranteeing $N_{\\text{compromise}} = 0$.",
    hint: "Mathematical proof showing that FIDO2 passkeys drive credential submission rate to zero, resulting in zero enterprise compromises.",
    level: "expert",
    codeExample: `// Phishing Compromise Mathematical Proof:
// V_phish = 100,000 Emails | E_gateway = 99.8% | R_click = 3%
// Without Passkeys (R_submit = 50%) ➔ N_compromise = 100000 * 0.002 * 0.03 * 0.50 = 3 Compromised Accounts!
// With FIDO2 Passkeys (R_submit = 0.0%) ➔ N_compromise = 0 (100% Mathematically Protected!)`
  }
];

export default questions;
