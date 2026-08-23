const questions = [
  {
    question: "What is the Sender Policy Framework (SPF - RFC 7208), and what email header does it validate?",
    shortAnswer: "A DNS-based email authentication protocol that authorizes which IP addresses can send email on behalf of a domain, validating the RFC 5321 Envelope From (Return-Path) address.",
    explanation: "SPF allows domain owners in Kolkata to publish a DNS TXT record listing all legitimate mail servers: `v=spf1 ip4:103.25.10.0/24 include:_spf.google.com -all`. When a receiving mail server receives an email, it inspects the client IP against the SPF record of the domain found in the `Return-Path` (Envelope From). If the sending IP is not authorized, SPF evaluation fails.",
    hint: "An official list of authorized delivery trucks published on the company billboard.",
    level: "basic",
    codeExample: `// Sample SPF DNS TXT Record:
kolkata-fintech.in. IN TXT "v=spf1 ip4:103.25.10.50/28 include:_spf.protection.outlook.com -all"
// -all = Hard Fail (Reject unauthorized sending IPs immediately!)`
  },
  {
    question: "What is DomainKeys Identified Mail (DKIM - RFC 6376), and how does Asymmetric Cryptography protect Email Integrity?",
    shortAnswer: "DKIM attaches an asymmetric cryptographic digital signature to the email header (`DKIM-Signature`), allowing the recipient to verify that the message body and key headers were not altered in transit.",
    explanation: "The sending mail server in Salt Lake signs selected headers (`From`, `To`, `Subject`, `Date`) and the body hash (`bh=`) using its private RSA-2048 or Ed25519 key. It attaches the signature (`b=`) in the `DKIM-Signature` header. The recipient fetches the domain's public key from DNS (`selector._domainkey.domain.com`) and verifies the signature. If a malicious relay modified the wire transfer account in transit, the DKIM signature breaks.",
    hint: "A wax seal stamped with the king's private signet ring that breaks if anyone opens the envelope.",
    level: "basic",
    codeExample: `// Sample DKIM-Signature Header:
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=kolkata-fintech.in;
  s=s1-kolkata; t=1724400000;
  h=from:to:subject:date:message-id;
  bh=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;
  b=d2F0ZXJpbmdob2xlMTIzNDU2Nzg5MGFiY2RlZg==`
  },
  {
    question: "What is DMARC (RFC 7489), and what are the 3 Policy Directives (`p=none`, `p=quarantine`, `p=reject`)?",
    shortAnswer: "A policy and reporting layer requiring alignment between the Header From domain and SPF/DKIM domains; `p=none` monitors without action, `p=quarantine` delivers to spam, and `p=reject` blocks unauthorized spoofed emails completely at the gateway.",
    explanation: "DMARC bridges SPF and DKIM. It enforces that the visible `From:` header domain must match (align with) the domain verified by SPF or DKIM. The 3 policies are: 1. `p=none` (Monitoring mode: deliver email normally and generate XML reports); 2. `p=quarantine` (Spam folder delivery); 3. `p=reject` (Hard rejection: bounce spoofed emails before they reach inboxes).",
    hint: "Monitoring (none) ➔ Spam folder (quarantine) ➔ Iron door blocking (reject).",
    level: "basic",
    codeExample: `// Production DMARC DNS TXT Record:
_dmarc.kolkata-fintech.in. IN TXT "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@kolkata-fintech.in; ruf=mailto:dmarc-ruf@kolkata-fintech.in; aspf=r; adkim=r"`
  },
  {
    question: "What is 'DMARC Alignment' (Strict vs Relaxed Alignment for SPF and DKIM)?",
    shortAnswer: "Alignment requires the visible Header From domain to match the SPF Return-Path domain and DKIM `d=` domain; Relaxed (`r`) allows subdomains (e.g. `mail.corp.in`), while Strict (`s`) requires exact domain matching (`corp.in`).",
    explanation: "Even if an email passes SPF on `mail.attacker.com`, DMARC fails if the visible `From:` header displays `cfo@kolkata-fintech.in` because the domains do not align. Under Relaxed Alignment (`aspf=r`), `From: cfo@kolkata-fintech.in` aligns with SPF on `sub.kolkata-fintech.in` (same organizational domain). Under Strict Alignment (`aspf=s`), the domain strings must match 100% identically.",
    hint: "Relaxed allows family members with the same last name; Strict requires the exact first and last name.",
    level: "expert",
    codeExample: `// DMARC Alignment Comparison:
// Header From    : From: cfo@kolkata-fintech.in
// SPF Return-Path: Return-Path: bounces@auth.kolkata-fintech.in
// Relaxed Alignment (aspf=r) ➔ PASS (Same Organizational Domain)
// Strict Alignment  (aspf=s) ➔ FAIL (auth.kolkata-fintech.in != kolkata-fintech.in)`
  },
  {
    question: "What is the '10 DNS Lookup Limit' in SPF (RFC 7208), and how does SPF Record Flattening resolve it?",
    shortAnswer: "RFC 7208 mandates that evaluating an SPF record must not exceed 10 nested DNS lookup mechanisms (`include`, `a`, `mx`, `redirect`); exceeding 10 results in `PermError`, which attackers exploit; flattening resolves includes into raw IP ranges.",
    explanation: "When an enterprise in Kolkata includes multiple third-party SaaS vendors (`include:_spf.google.com`, `include:sendgrid.net`, `include:salesforce.com`), the chain can easily exceed 10 DNS queries. If lookup count $>10$, the receiving gateway returns `SPF PermError`, causing DMARC to fail. SPF Flattening tools automatically resolve nested domain lookups into flat static `ip4:` and `ip6:` CIDR blocks.",
    hint: "A phone tree with more than 10 automated transfers that hangs up on the caller.",
    level: "expert",
    codeExample: `// SPF Flattening Transformation:
// Unflattened (12 Lookups - ERROR!) : v=spf1 include:saas1.com include:saas2.com include:saas3.com -all
// Flattened (1 Lookup - SUCCESS!)   : v=spf1 ip4:103.25.10.0/24 ip4:198.51.100.0/24 ip4:203.0.113.0/24 -all`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the criminal penalty for Exact-Domain Email Spoofing?",
    shortAnswer: "Cheating by personating legitimate corporate officers or financial institutions via spoofed email headers carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly covers exact-domain email spoofing: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D penalizes Cheating by Personation via email spoofing with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Spoofing bank domains to send fake KYC notifications and steal NetBanking credentials
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is Brand Indicators for Message Identification (BIMI), and how do Verified Mark Certificates (VMC) work?",
    shortAnswer: "A protocol that displays an organization's trademarked corporate logo next to authenticated emails in supporting inboxes, requiring DMARC `p=quarantine` or `p=reject` and a cryptographically verified VMC SVG certificate.",
    explanation: "BIMI rewards organizations that implement strong DMARC enforcement. When an email passes DMARC with `p=reject`, the webmail client (Gmail, Apple Mail) queries `default._bimi.domain.com`. It fetches a Verified Mark Certificate (VMC) issued by a Certificate Authority (DigiCert/Entrust) containing an SVG of the company's registered trademark. The verified corporate logo is displayed in the recipient's inbox.",
    hint: "A blue verification badge on social media that only appears next to your emails if you have DMARC p=reject enabled.",
    level: "moderate",
    codeExample: `// BIMI DNS TXT Record:
default._bimi.kolkata-fintech.in. IN TXT "v=BIMI1; l=https://kolkata-fintech.in/assets/logo.svg; a=https://kolkata-fintech.in/assets/vmc_cert.pem"`
  },
  {
    question: "What is Authenticated Received Chain (ARC - RFC 8617), and how does it preserve Authentication across Email Forwarders and Mailing Lists?",
    shortAnswer: "ARC cryptographically seals SPF, DKIM, and DMARC authentication results at each intermediate hop in an email's path, allowing destination servers to verify the original sender even if a mailing list modified headers or the body.",
    explanation: "When an email passes through a mailing list or university forwarder in Jadavpur, the list often adds `[List-Topic]` to the subject line or appends an unsubscribe footer, breaking the original DKIM signature and causing SPF to fail. ARC adds three headers: `ARC-Authentication-Results`, `ARC-Message-Signature`, and `ARC-Seal`. The final recipient verifies the ARC chain to trust the original authentication state.",
    hint: "A notarized custody chain that proves the document was genuine before the courier stamped their delivery label on the box.",
    level: "expert",
    codeExample: `// ARC Seal Header Sequence (RFC 8617):
ARC-Seal: i=1; a=rsa-sha256; d=jadavpur.ac.in; s=arc-2026; cv=none; b=...
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=jadavpur.ac.in; ...
ARC-Authentication-Results: i=1; mx.google.com; dkim=pass (kolkata-fintech.in); spf=pass`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities for failing to deploy DMARC `p=reject` to protect consumers from domain spoofing?",
    shortAnswer: "Failure to implement standard email authentication safeguards resulting in systemic phishing and personal data leaks triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical security safeguards. If a major bank or utility in West Bengal fails to configure DMARC `p=reject`, allowing cybercriminals to spoof their domain and trick 100,000 citizens into revealing Aadhaar/PAN data, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to implement DMARC p=reject triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent email domain spoofing controls`
  },
  {
    question: "What is MTA-STS (Mail Transfer Agent Strict Transport Security - RFC 8461)?",
    shortAnswer: "A protocol enabling email domains to declare that all incoming SMTP connections must use TLS encryption with valid public digital certificates, preventing man-in-the-middle STARTTLS downgrade attacks.",
    explanation: "Opportunistic TLS (STARTTLS) can be stripped by attackers using `STARTTLS` stripping proxy tools (downgrading connections to plaintext). MTA-STS publishes a policy via HTTPS: `https://mta-sts.kolkata-fintech.in/.well-known/mta-sts.txt` specifying `mode: enforce` and `max_age: 604800`. Sending MTAs cache this policy and refuse to deliver emails if the connection is downgraded or the TLS certificate is invalid.",
    hint: "HTTPS Strict Transport Security (HSTS) for email servers.",
    level: "expert",
    codeExample: `// MTA-STS Policy File (https://mta-sts.kolkata-fintech.in/.well-known/mta-sts.txt):
version: STSv1
mode: enforce
mx: mail.kolkata-fintech.in
mx: backup-mail.kolkata-fintech.in
max_age: 604800`
  },
  {
    question: "What is DANE (DNS-based Authentication of Named Entities - RFC 7672) for SMTP?",
    shortAnswer: "Using DNSSEC-signed TLSA records in DNS to specify the exact TLS certificate or public key fingerprint that a sending mail server must expect when connecting to an MX host.",
    explanation: "DANE eliminates reliance on centralized Certificate Authorities by binding TLS certificates directly to DNSSEC. A TLSA DNS record (`_25._tcp.mail.kolkata-fintech.in`) contains the SHA-256 hash of the mail server's public key. Connecting MTAs verify that the certificate presented by the mail server matches the DNSSEC-signed TLSA hash, stopping fraudulent CA certificate issuance and MITM attacks.",
    hint: "Pinning your exact certificate fingerprint directly in a tamper-proof DNSSEC record.",
    level: "expert",
    codeExample: `// TLSA DNS Record for DANE SMTP Authentication:
_25._tcp.mail.kolkata-fintech.in. IN TLSA 3 1 1 5f8a9e7d4c2b1a0f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f`
  },
  {
    question: "How do DMARC Aggregate XML Reports (`rua=`) give Visibility into Global Domain Spoofing Campaigns?",
    shortAnswer: "Receiving mail servers globally (Google, Microsoft, Yahoo) send daily automated XML reports summarizing every IP address that sent email claiming to be from your domain, along with SPF/DKIM pass/fail counts.",
    explanation: "By configuring `rua=mailto:dmarc-rua@kolkata-fintech.in`, an organization in Salt Lake receives daily XML summaries from all global email receivers. The reports detail: 1. Sending IP addresses; 2. Message counts; 3. SPF and DKIM authentication outcomes; 4. DMARC disposition (`none`, `quarantine`, `reject`). This allows security teams to identify legitimate SaaS senders before enforcing `p=reject`.",
    hint: "A daily worldwide police report listing every delivery driver who claimed to work for your company.",
    level: "moderate",
    codeExample: `<!-- Sample DMARC Aggregate XML Report Snippet -->
<record>
  <row>
    <source_ip>185.220.101.5</source_ip>
    <count>4820</count>
    <policy_evaluated>
      <disposition>reject</disposition>
      <dkim>fail</dkim>
      <spf>fail</spf>
    </policy_evaluated>
  </row>
</record>`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for large-scale email spoofing and phishing campaigns targeting Indian infrastructure?",
    shortAnswer: "All organizations in India must report domain spoofing compromises and mass phishing outbreaks to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including mass phishing and domain spoofing attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of mass phishing and domain spoofing outbreaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "Why does DMARC `p=reject` NOT Protect against 'Cousin / Lookalike Domains' (e.g. `c1sco.com` vs `cisco.com`)?",
    shortAnswer: "DMARC only protects the exact domain string for which it is published; an attacker registering a different typo-squatted domain will configure valid SPF/DKIM/DMARC on their own domain, passing all checks.",
    explanation: "DMARC on `cisco.com` protects only emails claiming to be from `@cisco.com`. If an attacker registers `c1sco.com`, they configure their own valid SPF, DKIM, and DMARC (`p=reject`) on `c1sco.com`. When they send phishing emails from `c1sco.com`, DMARC evaluates to 100% PASS because Header From and SPF/DKIM align on `c1sco.com`. Defense requires lookalike domain monitoring and inbound display name mail flow rules.",
    hint: "A trademark lock on your own house does not prevent someone from building an identical-looking house down the street with a misspelled street sign.",
    level: "expert",
    codeExample: `// Cousin Domain Evaluation:
// Attacker Registers : c1sco.com
// Attacker Sends     : From: ceo@c1sco.com
// DMARC on c1sco.com : 100% PASS! (Attacker owns the domain!)
// Mitigation         : Inbound Exchange Transport Rule blocking executive display names!`
  },
  {
    question: "What is 'DKIM Key Rotation', and why should Cryptographic Selectors be Rotated Every 6 Months?",
    shortAnswer: "Periodically generating new public/private key pairs and updating DNS selectors, ensuring that if an old private key is compromised or cryptographically factored, its window of vulnerability is closed.",
    explanation: "Long-lived RSA keys risk exposure through server backups or insider leaks. Best practice mandates rotating DKIM selectors every 6 months: 1. Deploy new selector `s2-2026` with a fresh 2048-bit RSA key pair in DNS; 2. Configure mail servers to sign outbound emails with `s2-2026`; 3. Keep the old selector `s1-2026` in DNS for 14 days to validate in-flight emails; 4. Delete `s1-2026`.",
    hint: "Changing the front door lock every 6 months so old lost keys no longer work.",
    level: "moderate",
    codeExample: `# OpenSSL Command to Generate 2048-bit RSA DKIM Key Pair:
openssl genrsa -out dkim_private_s2_2026.pem 2048
openssl rsa -in dkim_private_s2_2026.pem -pubout -out dkim_public_s2_2026.pub`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access achieved via spoofed email authentication bypasses?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for accessing computer resources without permission via email deception.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Gaining unauthorized access to corporate accounts via spoofed executive emails
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is the 'DMARC pct= Tag' (Percentage Enforcement), and how is it used in Phased Rollouts?",
    shortAnswer: "Specifies the percentage of failing messages to which the DMARC policy applies (e.g. `p=reject; pct=25` rejects 25% of failing emails while delivering 75%), allowing safe incremental enforcement.",
    explanation: "Rolling out DMARC directly to `p=reject; pct=100` risks blocking legitimate third-party business emails that were misconfigured. Organizations gradually ramp up enforcement: Week 1: `p=quarantine; pct=25`; Week 2: `p=quarantine; pct=100`; Week 3: `p=reject; pct=50`; Week 4: `p=reject; pct=100` (Full Protection).",
    hint: "Testing the brakes on 25% power before applying 100% emergency brakes.",
    level: "moderate",
    codeExample: `// Phased DMARC Rollout Progression:
// Phase 1 (Monitor) : v=DMARC1; p=none; pct=100; rua=mailto:dmarc@corp.in
// Phase 2 (Partial) : v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@corp.in
// Phase 3 (Full)    : v=DMARC1; p=reject; pct=100; rua=mailto:dmarc@corp.in`
  },
  {
    question: "Synthesize an enterprise-scale Technical Email Authentication Architecture.",
    shortAnswer: "A unified system combining Flattened SPF (`-all`), 2048-bit RSA/Ed25519 DKIM Signatures with 6-month rotation, DMARC `p=reject; pct=100` with strict alignment, BIMI/VMC Branding, MTA-STS Enforcement, and ARC Validation.",
    explanation: "To achieve complete immunity against exact-domain email spoofing: 1. Identity Layer: SPF with `-all` hard fail and flattened CIDR IP ranges. 2. Cryptographic Layer: Dual-selector DKIM signing (`relaxed/relaxed`) with 2048-bit RSA keys rotated every 6 months. 3. Policy Layer: DMARC `p=reject; sp=reject; pct=100` with aggregate `rua` parsing. 4. Transport Layer: MTA-STS `mode: enforce` and DANE TLSA DNSSEC pinning. 5. Brand Layer: BIMI with Verified Mark Certificates. 6. Intermediary Layer: ARC seal verification on all forwarding gateways.",
    hint: "Combine flattened SPF, 2048-bit DKIM, DMARC p=reject, MTA-STS enforce, BIMI/VMC, and ARC validation.",
    level: "expert",
    codeExample: `// Master Technical Email Authentication Blueprint:
// 1. SPF Layer      : v=spf1 ip4:103.25.10.0/24 include:_spf.google.com -all
// 2. DKIM Layer     : 2048-bit RSA Dual Selectors (s1-2026, s2-2026) with automated 6-month rotation
// 3. DMARC Layer    : v=DMARC1; p=reject; sp=reject; pct=100; aspf=r; adkim=r; rua=mailto:...
// 4. Transport Layer: MTA-STS mode: enforce + DANE TLSA (DNSSEC-Signed)
// 5. Brand Layer    : BIMI with VMC Certificate (Verified Trademark Logo in Gmail/Apple Mail)
// 6. Relay Layer    : Authenticated Received Chain (ARC) validation on all inbound forwarders`
  },
  {
    question: "What is 'Canonicalization' (`c=relaxed/relaxed` vs `c=simple/simple`) in DKIM Signing?",
    shortAnswer: "Defines how email whitespace and header formatting are normalized before generating the cryptographic hash; `relaxed` tolerates minor whitespace changes introduced by mail relays, while `simple` tolerates zero modifications.",
    explanation: "Mail relays frequently reformat whitespace (e.g. converting tabs to spaces, trimming trailing whitespace). Under `c=simple/simple`, any single whitespace modification by an intermediate server breaks the DKIM hash. Under `c=relaxed/relaxed`, headers are lowercased and multiple spaces are collapsed to a single space before hashing, ensuring that benign transit formatting does not break DKIM authentication.",
    hint: "Comparing two sentences by ignoring whether words are capitalized or have extra spaces between them.",
    level: "expert",
    codeExample: `// DKIM Canonicalization Header Tag:
DKIM-Signature: ... c=relaxed/relaxed; ...
// Header Canonicalization: relaxed (Lowercases header names, unfolds lines, collapses multiple spaces)
// Body Canonicalization  : relaxed (Collapses whitespace, trims trailing blank lines)`
  },
  {
    question: "How do DMARC Forensic / Failure Reports (`ruf=`) assist in Incident Response?",
    shortAnswer: "By generating real-time individual email failure alerts containing full header and body snippets whenever an email fails DMARC evaluation, allowing immediate analysis of active phishing lures.",
    explanation: "While `rua` reports provide daily aggregate numbers, `ruf=mailto:dmarc-ruf@kolkata-fintech.in` triggers an immediate forensic notification (AFRF format) for every single rejected email. Security operations analysts inspect the raw headers, source IP, and body content of the spoofed email within seconds of delivery attempt, identifying the active phishing lure in real time.",
    hint: "An automated alarm that sends a photo of the burglar to security the exact second they try the door lock.",
    level: "moderate",
    codeExample: `// DMARC Failure Report (AFRF Format):
Feedback-Type: auth-failure
User-Agent: DMARC-Engine/2.4
Source-IP: 185.220.101.5
Reported-Domain: kolkata-fintech.in
Delivery-Result: rejected
Original-Mail-From: cfo@kolkata-fintech.in`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using spoofed email headers to execute financial wire fraud?",
    shortAnswer: "Dishonestly or fraudulently deceiving recipients via forged headers carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer deception: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' Spoofed email wire fraud operations are prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent email spoofing.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Forging corporate email headers to fraudulently divert bank wire transfers
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is the 'Subdomain Policy (`sp=`)' Tag in DMARC Records?",
    shortAnswer: "Defines the specific DMARC policy that applies to all subdomains of the organizational domain (e.g. `sp=reject` blocks spoofed emails from `anything.kolkata-fintech.in`).",
    explanation: "If an organization in Kolkata publishes DMARC `p=reject` on `kolkata-fintech.in` without an `sp=` tag, subdomains default to inheriting the parent policy. However, setting an explicit `sp=reject` ensures that even if attackers create spoofed emails claiming to be from `support.kolkata-fintech.in` or `billing.kolkata-fintech.in`, all subdomains are strictly rejected globally.",
    hint: "A rule that locks both the main house and every garden shed on the property.",
    level: "moderate",
    codeExample: `// DMARC Subdomain Policy Record:
_dmarc.kolkata-fintech.in. IN TXT "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc@kolkata-fintech.in"`
  },
  {
    question: "How does Mailbox Provider DMARC Verification interact with Inbound Email Gateways (Exchange Online Protection / Postfix)?",
    shortAnswer: "The receiving gateway performs DNS lookups for SPF, DKIM, and DMARC upon SMTP receipt; if DMARC fails and policy is `reject`, the gateway issues an SMTP 550 rejection code, dropping the connection.",
    explanation: "When an inbound email arrives at Microsoft 365 or Postfix in Kolkata: 1. Gateway checks SPF on sending IP; 2. Verifies DKIM public key; 3. Compares Header From for DMARC alignment. If DMARC policy is `p=reject` and alignment fails, the gateway responds: `550 5.7.1 Unauthenticated email is not accepted from this domain per DMARC policy` and drops the email immediately.",
    hint: "A bouncer checking the guest list and slamming the door with an official rejection code.",
    level: "expert",
    codeExample: `// SMTP 550 Rejection Log on Inbound Gateway:
<<< MAIL FROM:<cfo@kolkata-fintech.in>
>>> 550 5.7.1 Message rejected: Unauthenticated email from domain kolkata-fintech.in is not accepted per domain owner DMARC policy!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Spoofed Emails?",
    shortAnswer: "Forging email sender identities to deceive accounting staff into transferring corporate funds or sensitive property, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' High-value email spoofing wire fraud cases are prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for email spoofing wire fraud.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via spoofed executive emails to transfer ₹3.5 Crores
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'SPF Macro Syntax' (e.g. `%{i}`, `%{d}`, `%{s}`) for Dynamic Cloud Multi-Tenant SPF Evaluation?",
    shortAnswer: "A dynamic SPF feature that interpolates sender IP (`%{i}`), domain (`%{d}`), or sender localpart (`%{s}`) into DNS lookup queries, allowing massive cloud providers to evaluate SPF without hitting the 10-lookup limit.",
    explanation: "Large email cloud providers handle millions of senders. Rather than publishing massive static records, they use SPF macros: `v=spf1 exists:%{i}._spf.cloud.in -all`. When an email is evaluated, the receiving server resolves `103.25.10.50._spf.cloud.in`. If the DNS record exists, SPF passes. This provides infinite scalability in a single dynamic DNS lookup.",
    hint: "A template variable like {username} that automatically fills in the visitor's real name on their badge.",
    level: "expert",
    codeExample: `// Dynamic SPF Macro Record:
v=spf1 exists:%{i}._spf.%{d}.in -all
// Evaluates to: exists:103.25.10.50._spf.kolkata-fintech.in`
  },
  {
    question: "How does DNSSEC (Domain Name System Security Extensions) provide the Cryptographic Foundation for DANE, MTA-STS, and DKIM?",
    shortAnswer: "By cryptographically signing all DNS records with asymmetric keys (RRSIG records), preventing adversaries from spoofing DNS responses or injecting forged SPF/DKIM/TLSA public keys.",
    explanation: "If an adversary compromises a local DNS cache (DNS Cache Poisoning / Kaminsky attack), they can forge SPF records (`v=spf1 +all`) or forge public DKIM keys. DNSSEC uses a cryptographic chain of trust from the root zone (`.`) to the domain (`kolkata-fintech.in`). Every DNS record is signed with a digital signature (`RRSIG`), ensuring that DNS lookups for SPF, DKIM, and TLSA cannot be intercepted or tampered with.",
    hint: "A government notary seal on every page of the public directory that proves the phone numbers were not altered.",
    level: "expert",
    codeExample: `// DNSSEC Cryptographic Signature Record:
kolkata-fintech.in. IN RRSIG TXT 13 2 300 (
    20260830000000 20260823000000 4920 kolkata-fintech.in.
    dGVzdGRuc3NlY3NpZ25hdHVyZWtleTEyMzQ1Njc4OTA= )`
  },
  {
    question: "What is 'Ed25519 Modern Cryptography' in DKIM Signatures vs Legacy RSA-1024/2048?",
    shortAnswer: "Ed25519 uses Edwards-curve Digital Signature Algorithm (EdDSA), providing stronger 128-bit cryptographic security with tiny 32-byte public keys and faster signature verification than 2048-bit RSA.",
    explanation: "RFC 8463 introduced Ed25519 to DKIM. Traditional RSA-2048 keys require large DNS TXT records (over 250 characters), which can exceed UDP 512-byte packet limits and cause DNS fragmentation. Ed25519 public keys are only 32 bytes (44 base64 characters), fit easily in standard DNS UDP packets, resist side-channel timing attacks, and compute signatures 5x faster.",
    hint: "A tiny titanium lock that is stronger, lighter, and opens faster than a massive cast-iron padlock.",
    level: "expert",
    codeExample: `// Ed25519 DKIM DNS Key Record (RFC 8463):
s2-ed25519._domainkey.kolkata-fintech.in. IN TXT "v=DKIM1; k=ed25519; p=11qYAYKxCrfVS/7TyWQHOg7hcvPapiMlrwIaaPcHURo="`
  },
  {
    question: "What is 'DMARC Quarantine' vs 'DMARC Reject' in Enterprise Risk Management?",
    shortAnswer: "`p=quarantine` routes failing emails to the user's Junk/Spam folder (where users might still open them); `p=reject` drops the email at the border before it ever enters the organization.",
    explanation: "Under `p=quarantine`, spoofed emails are still delivered to employee Junk folders. Non-technical users often check their Junk folder, find an 'urgent invoice', and follow the fraudulent payment instructions. In contrast, `p=reject` enforces complete border rejection: the email is dropped at the SMTP gateway, eliminating 100% of human exposure.",
    hint: "Quarantine puts the dangerous package in the hallway closet; Reject refuses to accept the delivery at the front gate.",
    level: "moderate",
    codeExample: `// DMARC Policy Comparison:
// p=quarantine : Delivered to Spam Folder (User can still click links!)
// p=reject     : Dropped at SMTP Border Gateway (0% User Exposure!)`
  },
  {
    question: "Synthesize the mathematical relationship between Alignment Strictness (A_alignment), DKIM Key Strength (S_dkim), DMARC Policy Enforcement (R_dmarc_policy), and Email Spoofing Vulnerability Probability (P_spoof).",
    shortAnswer: "Email spoofing vulnerability is modeled as P_spoof = 1 - e^(- (A_alignment * S_dkim) / R_dmarc_policy); enforcing DMARC `p=reject` with 2048-bit RSA/Ed25519 (R_dmarc_policy = 1000) drives exact-domain spoofing probability to zero.",
    explanation: "Let $A_{\\text{alignment}} \\ge 1.0$ represent the domain alignment factor, $S_{\\text{dkim}} \\ge 1.0$ represent the signature strength requirement, and $R_{\\text{dmarc\\_policy}}$ represent the DMARC enforcement strength (`p=none` = 1.0, `p=quarantine` = 50, `p=reject` = 1000). The spoofing vulnerability probability is: $P_{\\text{spoof}} = 1 - e^{-\\frac{A_{\\text{alignment}} \\times S_{\\text{dkim}}}{R_{\\text{dmarc\\_policy}}}}$. When organizations enforce strict DMARC `p=reject` ($R_{\\text{dmarc\\_policy}} \\to \\infty$), exact-domain spoofing probability collapses to zero.",
    hint: "Mathematical formula proving that strict DMARC p=reject (R_dmarc_policy -> infinity) eliminates exact-domain spoofing vulnerability.",
    level: "expert",
    codeExample: `// Email Spoofing Mathematical Proof:
// Without DMARC (R_dmarc_policy = 1.0, p=none) ➔ P_spoof = 1 - e^(-16.0) = 100.0% (SPOOFED EMAILS DELIVERED!)
// With DMARC Reject (R_dmarc_policy = 1000, p=reject) ➔ P_spoof = 1 - e^(-0.016) = 1.58% (SPOOFING BLOCKED AT GATEWAY!)`
  }
];

export default questions;
